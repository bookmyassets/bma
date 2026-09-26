import { NextResponse } from "next/server";

import {
  getRazorpayWebhookSecret,
  verifyRazorpayWebhookSignature,
} from "@/lib/payments/razorpayWebhook";

import {
  getPaymentTransactionByQrId,
  markPaymentPaid,
} from "@/lib/payments/sanityPayments";

import {
  syncEstatesPaymentToTelecrm,
} from "@/lib/payments/telecrmPayments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MERCHANT = "estates";

function razorpayTimestampToIso(timestamp) {
  const value = Number(timestamp);

  if (!Number.isFinite(value) || value <= 0) {
    return new Date().toISOString();
  }

  return new Date(value * 1000).toISOString();
}

export async function POST(request) {
  try {
    /**
     * -------------------------------------------------------
     * 1. Read RAW webhook body
     * -------------------------------------------------------
     *
     * Razorpay signature verification must use the exact
     * raw request body.
     */
    const rawBody = await request.text();

    const signature = request.headers.get(
      "x-razorpay-signature",
    );

    /**
     * -------------------------------------------------------
     * 2. Get Estates Razorpay webhook secret
     * -------------------------------------------------------
     */
    const secret = getRazorpayWebhookSecret(MERCHANT);

    /**
     * -------------------------------------------------------
     * 3. Verify Razorpay webhook signature
     * -------------------------------------------------------
     */
    const validSignature =
      verifyRazorpayWebhookSignature({
        rawBody,
        signature,
        secret,
      });

    if (!validSignature) {
      console.warn(
        "Rejected invalid Estates Razorpay webhook signature.",
      );

      return NextResponse.json(
        {
          success: false,
          error: "Invalid webhook signature.",
        },
        {
          status: 401,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 4. Parse verified webhook
     * -------------------------------------------------------
     */
    let event;

    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid webhook payload.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 5. Ignore unrelated events
     * -------------------------------------------------------
     */
    if (event?.event !== "qr_code.credited") {
      return NextResponse.json(
        {
          success: true,
          ignored: true,
          event: event?.event || null,
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 6. Extract Razorpay QR + payment
     * -------------------------------------------------------
     */
    const qr = event?.payload?.qr_code?.entity;
    const payment = event?.payload?.payment?.entity;

    const qrId = qr?.id;
    const paymentId = payment?.id;

    if (
      typeof qrId !== "string" ||
      !qrId.startsWith("qr_")
    ) {
      console.error(
        "Estates webhook missing valid QR ID.",
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Webhook does not contain a valid QR ID.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      typeof paymentId !== "string" ||
      !paymentId.startsWith("pay_")
    ) {
      console.error(
        "Estates webhook missing valid payment ID.",
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Webhook does not contain a valid payment ID.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 7. Find BMA transaction using Razorpay QR ID
     * -------------------------------------------------------
     */
    const transaction =
      await getPaymentTransactionByQrId({
        qrId,
      });

    if (!transaction) {
      console.error(
        "No BMA payment transaction found for Estates QR:",
        qrId,
      );

      // Acknowledge so Razorpay does not repeatedly retry
      // an event that cannot be associated with BMA.
      return NextResponse.json(
        {
          success: true,
          ignored: true,
          reason: "Payment transaction not found.",
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 8. Confirm this QR belongs to Estates
     * -------------------------------------------------------
     */
    if (transaction.merchant !== MERCHANT) {
      console.error(
        "Estates webhook merchant mismatch:",
        {
          qrId,
          transactionMerchant:
            transaction.merchant,
        },
      );

      return NextResponse.json(
        {
          success: true,
          ignored: true,
          reason: "Payment merchant mismatch.",
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 9. Validate captured payment
     * -------------------------------------------------------
     */
    if (
      payment?.status !== "captured" ||
      payment?.captured !== true
    ) {
      console.warn(
        "Estates QR credited event contained non-captured payment:",
        {
          qrId,
          paymentId,
          status: payment?.status,
          captured: payment?.captured,
        },
      );

      return NextResponse.json(
        {
          success: true,
          ignored: true,
          reason: "Payment is not captured.",
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 10. Verify amount
     * -------------------------------------------------------
     */
    const receivedAmount = Number(
      payment?.amount,
    );

    const expectedAmount = Number(
      transaction.amountPaise,
    );

    if (
      !Number.isInteger(receivedAmount) ||
      receivedAmount !== expectedAmount
    ) {
      console.error(
        "Estates webhook amount mismatch:",
        {
          qrId,
          paymentId,
          receivedAmount,
          expectedAmount,
        },
      );

      return NextResponse.json(
        {
          success: true,
          ignored: true,
          reason: "Payment amount mismatch.",
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 11. Verify currency
     * -------------------------------------------------------
     */
    if (
      payment?.currency &&
      payment.currency !== "INR"
    ) {
      console.error(
        "Estates webhook currency mismatch:",
        {
          qrId,
          paymentId,
          currency: payment.currency,
        },
      );

      return NextResponse.json(
        {
          success: true,
          ignored: true,
          reason: "Payment currency mismatch.",
        },
        {
          status: 200,
        },
      );
    }

    const now = new Date().toISOString();

    const paidAt =
      transaction.paidAt ||
      razorpayTimestampToIso(
        payment?.created_at,
      );

    const paymentMethod =
      payment?.method ||
      transaction.paymentMethod ||
      "upi";

    /**
     * -------------------------------------------------------
     * 12. Idempotency - same payment already marked PAID
     * -------------------------------------------------------
     *
     * Important:
     *
     * We DO NOT immediately return here anymore.
     *
     * Sanity may already be PAID while TeleCRM failed during
     * an earlier webhook request. Razorpay retrying the webhook
     * gives us another chance to sync TeleCRM.
     */
    if (
      transaction.status === "paid" &&
      transaction.razorpayPaymentId ===
        paymentId
    ) {
      /**
       * Refresh webhook metadata in Sanity.
       *
       * This is also useful if status polling marked the
       * transaction paid before the actual Razorpay webhook
       * arrived.
       */
      await markPaymentPaid({
        paymentReference:
          transaction.paymentReference,

        razorpayPaymentId: paymentId,

        paymentMethod,

        paidAt,

        webhookReceivedAt: now,
      });

      /**
       * Retry / confirm TeleCRM sync.
       *
       * TeleCRM itself uses razorpayPaymentId for duplicate
       * detection, so safely sending the same payment again
       * will not create duplicate payment records.
       */
      await syncEstatesPaymentToTelecrm({
        transaction,
        razorpayPaymentId: paymentId,
        paymentMethod,
        paidAt,
      });

      return NextResponse.json(
        {
          success: true,
          duplicate: true,

          paymentReference:
            transaction.paymentReference,

          paymentId,

          telecrmSynced: true,
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 13. Already paid with a DIFFERENT payment ID
     * -------------------------------------------------------
     *
     * Never overwrite one successful payment with another.
     */
    if (
      transaction.status === "paid" &&
      transaction.razorpayPaymentId &&
      transaction.razorpayPaymentId !==
        paymentId
    ) {
      console.error(
        "Estates transaction already paid with different payment ID:",
        {
          paymentReference:
            transaction.paymentReference,

          existingPaymentId:
            transaction.razorpayPaymentId,

          incomingPaymentId: paymentId,
        },
      );

      return NextResponse.json(
        {
          success: true,
          ignored: true,
          reason:
            "Transaction is already paid.",
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 14. Mark Sanity transaction PAID
     * -------------------------------------------------------
     *
     * Sanity remains our payment-state record.
     */
    await markPaymentPaid({
      paymentReference:
        transaction.paymentReference,

      razorpayPaymentId: paymentId,

      paymentMethod,

      paidAt,

      webhookReceivedAt: now,
    });

    /**
     * -------------------------------------------------------
     * 15. Sync verified payment to TeleCRM
     * -------------------------------------------------------
     *
     * This happens ONLY after:
     *
     * - Razorpay signature is valid
     * - payment is captured
     * - QR belongs to Estates
     * - amount matches
     * - currency is valid
     * - Sanity has been marked PAID
     */
    await syncEstatesPaymentToTelecrm({
      transaction,
      razorpayPaymentId: paymentId,
      paymentMethod,
      paidAt,
    });

    /**
     * -------------------------------------------------------
     * 16. Acknowledge Razorpay webhook
     * -------------------------------------------------------
     */
    return NextResponse.json(
      {
        success: true,
        status: "paid",

        paymentReference:
          transaction.paymentReference,

        paymentId,

        telecrmSynced: true,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    /**
     * -------------------------------------------------------
     * Missing Razorpay webhook secret
     * -------------------------------------------------------
     */
    if (
      error?.message?.includes(
        "RAZORPAY_ESTATES_WEBHOOK_SECRET",
      )
    ) {
      console.error(
        "Estates Razorpay webhook secret is not configured.",
      );

      return NextResponse.json(
        {
          success: false,
          code: "WEBHOOK_NOT_CONFIGURED",
          error: "Webhook is not configured.",
        },
        {
          status: 503,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * TeleCRM configuration / delivery failure
     * -------------------------------------------------------
     *
     * Return non-200 so Razorpay can retry the webhook.
     *
     * Sanity may already be PAID. On the retry, the
     * idempotency branch above will attempt TeleCRM again.
     */
    if (
      error?.message?.includes("TELECRM_") ||
      error?.message?.includes(
        "TeleCRM payment webhook failed",
      ) ||
      error?.name === "AbortError"
    ) {
      console.error(
        "Estates TeleCRM payment sync failed:",
        error,
      );

      return NextResponse.json(
        {
          success: false,
          code: "TELECRM_SYNC_FAILED",
          error:
            "Payment was verified but CRM sync failed.",
        },
        {
          status: 500,
        },
      );
    }

    console.error(
      "Estates Razorpay webhook error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to process webhook.",
      },
      {
        status: 500,
      },
    );
  }
}