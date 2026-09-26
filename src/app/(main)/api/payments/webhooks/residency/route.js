import { NextResponse } from "next/server";

import {
  getRazorpayWebhookSecret,
  verifyRazorpayWebhookSignature,
} from "@/lib/payments/razorpayWebhook";

import {
  getPaymentTransactionByQrId,
  markPaymentPaid,
} from "@/lib/payments/sanityPayments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MERCHANT = "residency";

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
     * Do not call request.json() before signature
     * verification.
     */

    const rawBody = await request.text();

    const signature = request.headers.get(
      "x-razorpay-signature",
    );

    /**
     * -------------------------------------------------------
     * 2. Get Residency webhook secret
     * -------------------------------------------------------
     */

    const secret =
      getRazorpayWebhookSecret(MERCHANT);

    /**
     * -------------------------------------------------------
     * 3. Verify Razorpay signature
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
        "Rejected invalid Residency Razorpay webhook signature.",
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
     *
     * Our QR success event is qr_code.credited.
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

    const qr =
      event?.payload?.qr_code?.entity;

    const payment =
      event?.payload?.payment?.entity;

    const qrId = qr?.id;
    const paymentId = payment?.id;

    if (
      typeof qrId !== "string" ||
      !qrId.startsWith("qr_")
    ) {
      console.error(
        "Residency webhook missing valid QR ID.",
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
        "Residency webhook missing valid payment ID.",
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
     * 7. Resolve BMA payment from Sanity using QR ID
     * -------------------------------------------------------
     */

    const transaction =
      await getPaymentTransactionByQrId({
        qrId,
      });

    if (!transaction) {
      console.error(
        "No BMA payment transaction found for Residency QR:",
        qrId,
      );

      /**
       * Return 200 so Razorpay does not keep retrying
       * an event we cannot associate with our system.
       */
      return NextResponse.json(
        {
          success: true,
          ignored: true,
          reason:
            "Payment transaction not found.",
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 8. Confirm this QR belongs to Residency
     * -------------------------------------------------------
     */

    if (
      transaction.merchant !== MERCHANT
    ) {
      console.error(
        "Residency webhook merchant mismatch:",
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
          reason:
            "Payment merchant mismatch.",
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 9. Validate payment state
     * -------------------------------------------------------
     */

    if (
      payment?.status !== "captured" ||
      payment?.captured !== true
    ) {
      console.warn(
        "Residency QR credited event contained non-captured payment:",
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
          reason:
            "Payment is not captured.",
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
        "Residency webhook amount mismatch:",
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
          reason:
            "Payment amount mismatch.",
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
        "Residency webhook currency mismatch:",
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
          reason:
            "Payment currency mismatch.",
        },
        {
          status: 200,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 12. Idempotency
     * -------------------------------------------------------
     *
     * Razorpay can retry webhook delivery.
     */

    if (
      transaction.status === "paid" &&
      transaction.razorpayPaymentId ===
        paymentId
    ) {
      return NextResponse.json(
        {
          success: true,
          duplicate: true,

          paymentReference:
            transaction.paymentReference,

          paymentId,
        },
        {
          status: 200,
        },
      );
    }

    /**
     * If the transaction is already paid using a
     * different payment ID, don't overwrite it.
     */
    if (
      transaction.status === "paid" &&
      transaction.razorpayPaymentId &&
      transaction.razorpayPaymentId !==
        paymentId
    ) {
      console.error(
        "Residency transaction already paid with different payment ID:",
        {
          paymentReference:
            transaction.paymentReference,

          existingPaymentId:
            transaction.razorpayPaymentId,

          incomingPaymentId:
            paymentId,
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
     * 13. Mark BMA transaction PAID
     * -------------------------------------------------------
     */

    const now = new Date().toISOString();

    await markPaymentPaid({
      paymentReference:
        transaction.paymentReference,

      razorpayPaymentId:
        paymentId,

      paymentMethod:
        payment?.method || "upi",

      paidAt:
        razorpayTimestampToIso(
          payment?.created_at,
        ),

      webhookReceivedAt:
        now,
    });

    /**
     * -------------------------------------------------------
     * 14. Acknowledge webhook
     * -------------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,

        status: "paid",

        paymentReference:
          transaction.paymentReference,

        paymentId,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    /**
     * Missing webhook secret.
     */
    if (
      error?.message?.includes(
        "RAZORPAY_RESIDENCY_WEBHOOK_SECRET",
      )
    ) {
      console.error(
        "Residency Razorpay webhook secret is not configured.",
      );

      return NextResponse.json(
        {
          success: false,

          code:
            "WEBHOOK_NOT_CONFIGURED",

          error:
            "Webhook is not configured.",
        },
        {
          status: 503,
        },
      );
    }

    console.error(
      "Residency Razorpay webhook error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to process webhook.",
      },
      {
        status: 500,
      },
    );
  }
}