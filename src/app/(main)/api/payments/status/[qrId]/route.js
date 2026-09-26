import { NextResponse } from "next/server";

import {
  fetchRazorpayQrPayments,
  RazorpayApiError,
} from "@/lib/payments/razorpay";

import {
  getPaymentTransactionByQrId,
  markPaymentExpired,
  markPaymentPaid,
  markPaymentProcessing,
} from "@/lib/payments/sanityPayments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Convert Razorpay Unix timestamp to ISO date.
 */
function razorpayTimestampToIso(timestamp) {
  if (
    !Number.isInteger(timestamp) ||
    timestamp <= 0
  ) {
    return new Date().toISOString();
  }

  return new Date(
    timestamp * 1000,
  ).toISOString();
}

export async function GET(
  request,
  context,
) {
  try {
    /**
     * Next.js 15 dynamic params.
     */
    const params = await context.params;

    const qrId = params?.qrId;

    /**
     * -------------------------------------------------------
     * 1. Validate QR ID
     * -------------------------------------------------------
     */

    if (
      typeof qrId !== "string" ||
      !qrId.startsWith("qr_")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment QR.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 2. Find our transaction in Sanity
     * -------------------------------------------------------
     *
     * The browser no longer tells us which project or
     * merchant account to use.
     *
     * We determine everything from the QR ID.
     */

    const transaction =
      await getPaymentTransactionByQrId({
        qrId,
      });

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Payment transaction was not found.",
        },
        {
          status: 404,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 3. Already paid
     * -------------------------------------------------------
     *
     * If Sanity already contains a verified paid status,
     * don't keep calling Razorpay unnecessarily.
     */

    if (
      transaction.status === "paid" &&
      transaction.razorpayPaymentId
    ) {
      return NextResponse.json(
        {
          success: true,

          status: "paid",

          paymentReference:
            transaction.paymentReference,

          project: {
            id: transaction.projectId,
            name: transaction.projectName,
            code: transaction.projectCode,
          },

          amount: {
            currency:
              transaction.currency || "INR",

            rupees:
              transaction.amountRupees,

            paise:
              transaction.amountPaise,
          },

          payment: {
            id:
              transaction.razorpayPaymentId,

            status: "captured",

            method:
              transaction.paymentMethod ||
              null,
          },
        },
        {
          status: 200,

          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 4. Check QR expiry
     * -------------------------------------------------------
     */

    if (transaction.qrExpiresAt) {
      const expiryTime = new Date(
        transaction.qrExpiresAt,
      ).getTime();

      if (
        Number.isFinite(expiryTime) &&
        Date.now() >= expiryTime
      ) {
        if (
          transaction.status !== "expired"
        ) {
          try {
            await markPaymentExpired({
              paymentReference:
                transaction.paymentReference,
            });
          } catch (error) {
            console.error(
              "Unable to mark payment expired:",
              error,
            );
          }
        }

        return NextResponse.json(
          {
            success: true,
            status: "expired",

            paymentReference:
              transaction.paymentReference,
          },
          {
            status: 200,

            headers: {
              "Cache-Control":
                "no-store",
            },
          },
        );
      }
    }

    /**
     * -------------------------------------------------------
     * 5. Ask Razorpay for payments against this QR
     * -------------------------------------------------------
     *
     * transaction.merchant comes from our Sanity record,
     * not from the browser.
     */

    const result =
      await fetchRazorpayQrPayments({
        merchant:
          transaction.merchant,

        qrId:
          transaction.razorpayQrId,
      });

    const payments = Array.isArray(
      result?.items,
    )
      ? result.items
      : [];

    /**
     * -------------------------------------------------------
     * 6. Find captured payment
     * -------------------------------------------------------
     *
     * Payment must:
     *
     * - be captured
     * - match the exact server-recorded amount
     */

    const capturedPayment =
      payments.find(
        (payment) =>
          payment?.status ===
            "captured" &&
          Number(payment?.amount) ===
            Number(
              transaction.amountPaise,
            ),
      );

    if (capturedPayment) {
      /**
       * Update our BMA transaction record.
       */
      if (
        transaction.status !== "paid" ||
        transaction.razorpayPaymentId !==
          capturedPayment.id
      ) {
        await markPaymentPaid({
          paymentReference:
            transaction.paymentReference,

          razorpayPaymentId:
            capturedPayment.id,

          paymentMethod:
            capturedPayment.method ||
            null,

          paidAt:
            razorpayTimestampToIso(
              capturedPayment.created_at,
            ),
        });
      }

      return NextResponse.json(
        {
          success: true,

          status: "paid",

          paymentReference:
            transaction.paymentReference,

          project: {
            id:
              transaction.projectId,

            name:
              transaction.projectName,

            code:
              transaction.projectCode,
          },

          amount: {
            currency:
              capturedPayment.currency ||
              transaction.currency ||
              "INR",

            rupees:
              transaction.amountRupees,

            paise:
              transaction.amountPaise,
          },

          payment: {
            id:
              capturedPayment.id,

            status:
              capturedPayment.status,

            method:
              capturedPayment.method ||
              null,

            captured:
              Boolean(
                capturedPayment.captured,
              ),

            createdAt:
              capturedPayment.created_at ||
              null,
          },
        },
        {
          status: 200,

          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 7. Authorized but not captured yet
     * -------------------------------------------------------
     */

    const processingPayment =
      payments.find(
        (payment) =>
          payment?.status ===
            "authorized" &&
          Number(payment?.amount) ===
            Number(
              transaction.amountPaise,
            ),
      );

    if (processingPayment) {
      if (
        transaction.status !==
        "processing"
      ) {
        try {
          await markPaymentProcessing({
            paymentReference:
              transaction.paymentReference,
          });
        } catch (error) {
          console.error(
            "Unable to mark payment processing:",
            error,
          );
        }
      }

      return NextResponse.json(
        {
          success: true,

          status: "processing",

          paymentReference:
            transaction.paymentReference,
        },
        {
          status: 200,

          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 8. Still waiting
     * -------------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,

        status: "pending",

        paymentReference:
          transaction.paymentReference,
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    /**
     * -------------------------------------------------------
     * Sanity configuration
     * -------------------------------------------------------
     */

    if (
      error?.message?.includes(
        "SANITY_API_WRITE_TOKEN",
      )
    ) {
      console.error(
        "Payment storage configuration error:",
        error,
      );

      return NextResponse.json(
        {
          success: false,

          code:
            "PAYMENT_STORAGE_NOT_CONFIGURED",

          error:
            "Payment storage is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * Razorpay configuration
     * -------------------------------------------------------
     */

    if (
      error?.message?.includes(
        "Razorpay credentials",
      ) ||
      error?.message?.includes(
        "RAZORPAY_",
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          code:
            "PAYMENT_GATEWAY_NOT_CONFIGURED",

          error:
            "Payment gateway is not configured for this project yet.",
        },
        {
          status: 503,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * Razorpay API error
     * -------------------------------------------------------
     */

    if (
      error instanceof
      RazorpayApiError
    ) {
      console.error(
        "Razorpay payment status error:",
        {
          status:
            error.status,

          code:
            error.code,

          message:
            error.message,

          details:
            error.details,
        },
      );

      return NextResponse.json(
        {
          success: false,

          code:
            error.code ||
            "RAZORPAY_STATUS_ERROR",

          error:
            "Unable to verify the payment status right now.",

          ...(process.env.NODE_ENV ===
          "development"
            ? {
                details:
                  error.message,
              }
            : {}),
        },
        {
          status: 502,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * Unexpected error
     * -------------------------------------------------------
     */

    console.error(
      "Payment status error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "Unable to verify the payment status.",
      },
      {
        status: 500,
      },
    );
  }
}