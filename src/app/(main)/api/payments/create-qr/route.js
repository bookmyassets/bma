import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { getPaymentProject } from "@/lib/payments/projects";

import {
  createRazorpayUpiQr,
  RazorpayApiError,
} from "@/lib/payments/razorpay";

import {
  attachRazorpayQr,
  createPendingPaymentTransaction,
  markPaymentFailed,
} from "@/lib/payments/sanityPayments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QR_EXPIRY_SECONDS = 15 * 60;

const MAX_NAME_LENGTH = 100;
const MAX_PLOT_LENGTH = 40;
const MAX_EMAIL_LENGTH = 150;

/**
 * Clean normal text input.
 */
function cleanString(value, maxLength = 100) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

/**
 * Keep only numbers in mobile number.
 */
function cleanPhone(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\D/g, "").slice(0, 15);
}

/**
 * Allow different frontend values while resolving
 * everything to the project IDs used by projects.js.
 */
function normalizeProjectId(value) {
  const project = cleanString(
    value,
    80,
  ).toLowerCase();

  const aliases = {
    residency: "residency",
    "westwyn-residency": "residency",

    estate: "estates",
    estates: "estates",
    "westwyn-estate": "estates",
    "westwyn-estates": "estates",
  };

  return aliases[project] || project;
}

/**
 * Generate our own BMA payment reference.
 *
 * Example:
 * BMA-WWE-MGX82JK-3A92FE
 */
function createPaymentReference(projectCode) {
  const timestamp = Date.now()
    .toString(36)
    .toUpperCase();

  const randomPart = randomUUID()
    .replace(/-/g, "")
    .slice(0, 6)
    .toUpperCase();

  return `BMA-${projectCode}-${timestamp}-${randomPart}`;
}

/**
 * Try to mark a transaction failed without hiding
 * the original error that caused payment creation
 * to fail.
 */
async function safelyMarkPaymentFailed(
  paymentReference,
) {
  if (!paymentReference) {
    return;
  }

  try {
    await markPaymentFailed({
      paymentReference,
    });
  } catch (sanityError) {
    console.error(
      "Unable to mark payment transaction as failed:",
      sanityError,
    );
  }
}

export async function POST(request) {
  let paymentReference = "";

  try {
    /**
     * -------------------------------------------------------
     * 1. Read request
     * -------------------------------------------------------
     */

    const body = await request.json();

    const name = cleanString(
      body?.name,
      MAX_NAME_LENGTH,
    );

    const phone = cleanPhone(body?.phone);

    const email = cleanString(
      body?.email,
      MAX_EMAIL_LENGTH,
    );

    const plotNumber = cleanString(
      body?.plotNumber,
      MAX_PLOT_LENGTH,
    );

    const projectId = normalizeProjectId(
      body?.projectId ||
        body?.projectSlug ||
        body?.project,
    );

    /**
     * -------------------------------------------------------
     * 2. Validate customer details
     * -------------------------------------------------------
     */

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide the client name.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/^\d{10,15}$/.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid mobile number.",
        },
        {
          status: 400,
        },
      );
    }

    if (!plotNumber) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide the plot number.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * Optional email validation.
     *
     * Empty email is allowed.
     */
    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 3. Resolve project from server configuration
     * -------------------------------------------------------
     *
     * This prevents the browser from deciding:
     *
     * - booking amount
     * - Razorpay merchant account
     * - project code
     */

    const project =
      getPaymentProject(projectId);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please select a valid payment project.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * IMPORTANT:
     *
     * We DO NOT accept amount from the frontend.
     *
     * The booking amount comes only from projects.js.
     */

    const amountPaise =
      project.bookingAmountPaise;

    const amountRupees =
      project.bookingAmountRupees;

    if (
      !Number.isInteger(amountPaise) ||
      amountPaise <= 0
    ) {
      console.error(
        `Invalid booking amount configured for ${project.id}`,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Booking amount is not configured correctly.",
        },
        {
          status: 500,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * 4. Generate internal payment reference
     * -------------------------------------------------------
     */

    paymentReference =
      createPaymentReference(project.code);

    /**
     * -------------------------------------------------------
     * 5. Set QR expiry
     * -------------------------------------------------------
     */

    const currentTime = Math.floor(
      Date.now() / 1000,
    );

    const closeBy =
      currentTime + QR_EXPIRY_SECONDS;

    /**
     * -------------------------------------------------------
     * 6. Create Sanity payment transaction
     * -------------------------------------------------------
     *
     * Sanity becomes our internal record of the
     * payment attempt.
     *
     * Initial status:
     *
     * pending
     */

    await createPendingPaymentTransaction({
      paymentReference,

      clientName: name,
      mobileNumber: phone,
      email,

      projectId: project.id,
      projectName: project.name,
      projectCode: project.code,

      plotNumber,

      merchant: project.merchant,

      amountRupees,
      amountPaise,
    });

    /**
     * -------------------------------------------------------
     * 7. Create Razorpay dynamic QR
     * -------------------------------------------------------
     *
     * project.merchant decides which Razorpay credentials
     * are used:
     *
     * residency -> Residency Razorpay account
     * estates   -> Estates Razorpay account
     */

    let razorpayQr;

    try {
      razorpayQr =
        await createRazorpayUpiQr({
          merchant:
            project.merchant,

          amountPaise,

          name: `${project.code} Booking ${plotNumber}`,

          description:
            `${project.name} booking payment`,

          paymentReference,

          projectName:
            project.name,

          plotNumber,

          closeBy,
        });
    } catch (error) {
      /**
       * Sanity transaction exists already.
       *
       * If Razorpay QR creation fails, the payment
       * attempt must not remain "pending".
       */

      await safelyMarkPaymentFailed(
        paymentReference,
      );

      throw error;
    }

    /**
     * -------------------------------------------------------
     * 8. Save Razorpay QR details in Sanity
     * -------------------------------------------------------
     */

    try {
      await attachRazorpayQr({
        paymentReference,

        qrId:
          razorpayQr.id,

        qrImageUrl:
          razorpayQr.image_url || null,

        /**
         * Use the value returned by Razorpay when available.
         * Otherwise use the value we requested.
         */
        closeBy:
          razorpayQr.close_by ||
          closeBy,
      });
    } catch (error) {
      /**
       * We don't want a transaction with an untracked QR
       * to remain marked pending.
       */

      await safelyMarkPaymentFailed(
        paymentReference,
      );

      throw error;
    }

    /**
     * -------------------------------------------------------
     * 9. Return safe frontend response
     * -------------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,

        paymentReference,

        client: {
          name,
          phone,
          email,
          plotNumber,
        },

        project: {
          id: project.id,
          name: project.name,
          code: project.code,
        },

        amount: {
          currency: "INR",

          rupees:
            amountRupees,

          paise:
            amountPaise,
        },

        qr: {
          id:
            razorpayQr.id,

          imageUrl:
            razorpayQr.image_url,

          status:
            razorpayQr.status ||
            "active",

          usage:
            razorpayQr.usage ||
            "single_use",

          fixedAmount:
            razorpayQr.fixed_amount ??
            true,

          paymentAmount:
            razorpayQr.payment_amount ??
            amountPaise,

          closeBy:
            razorpayQr.close_by ||
            closeBy,
        },
      },
      {
        status: 201,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    /**
     * -------------------------------------------------------
     * Bad JSON
     * -------------------------------------------------------
     */

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid payment request.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * -------------------------------------------------------
     * Sanity write configuration error
     * -------------------------------------------------------
     *
     * Keep this separate from Razorpay configuration.
     */

    if (
      error?.message?.includes(
        "SANITY_API_WRITE_TOKEN",
      )
    ) {
      console.error(
        "Sanity payment storage is not configured:",
        error.message,
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
     * Razorpay credentials not configured
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
      console.warn(
        "Razorpay configuration missing:",
        error.message,
      );

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
        "Razorpay QR creation failed:",
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
            "RAZORPAY_API_ERROR",

          error:
            "Unable to create the payment QR right now.",

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
     * Unexpected server error
     * -------------------------------------------------------
     */

    console.error(
      "Create payment QR error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "Unable to start the payment. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}