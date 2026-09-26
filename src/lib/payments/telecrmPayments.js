import "server-only";

import { createHmac } from "crypto";

const TELECRM_TIMEOUT_MS = 10000;

function getEstatesTelecrmConfig() {
  const url =
    process.env.TELECRM_ESTATES_PAYMENT_WEBHOOK_URL?.trim();

  const secret =
    process.env.TELECRM_PAYMENT_WEBHOOK_SECRET?.trim();

  if (!url) {
    throw new Error(
      "TELECRM_ESTATES_PAYMENT_WEBHOOK_URL environment variable is missing.",
    );
  }

  if (!secret) {
    throw new Error(
      "TELECRM_PAYMENT_WEBHOOK_SECRET environment variable is missing.",
    );
  }

  return {
    url,
    secret,
  };
}

function createTelecrmSignature(body, secret) {
  return createHmac("sha256", secret)
    .update(body)
    .digest("hex");
}

export async function syncEstatesPaymentToTelecrm({
  transaction,
  razorpayPaymentId,
  paymentMethod,
  paidAt,
}) {
  if (!transaction) {
    throw new Error(
      "Payment transaction is required for TeleCRM sync.",
    );
  }

  if (transaction.merchant !== "estates") {
    throw new Error(
      `Cannot send merchant "${transaction.merchant}" to the Estates TeleCRM webhook.`,
    );
  }

  if (
    typeof razorpayPaymentId !== "string" ||
    !razorpayPaymentId.startsWith("pay_")
  ) {
    throw new Error(
      "A valid Razorpay payment ID is required for TeleCRM sync.",
    );
  }

  const { url, secret } = getEstatesTelecrmConfig();

  const paymentDate =
    paidAt || new Date().toISOString();

  const payload = {
    event: "payment.completed",

    clientName: transaction.clientName,
    phone: transaction.mobileNumber,

    ...(transaction.email
      ? {
          email: transaction.email,
        }
      : {}),

    projectId: transaction.projectId,
    projectName: transaction.projectName,
    projectCode: transaction.projectCode,

    plotNumber: transaction.plotNumber,

    paymentReference: transaction.paymentReference,

    razorpayPaymentId,
    razorpayQrId: transaction.razorpayQrId,

    amount: transaction.amountRupees,
    currency: transaction.currency || "INR",

    paymentMethod: paymentMethod || "upi",

    paymentStatus: "COMPLETED",

    merchant: transaction.merchant,

    paidAt: paymentDate,

    source: "BMA Website",
  };

  const body = JSON.stringify(payload);

  const signature = createTelecrmSignature(
    body,
    secret,
  );

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, TELECRM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-bma-signature": signature,
      },

      body,

      signal: controller.signal,

      cache: "no-store",
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(
        `TeleCRM payment webhook failed with HTTP ${response.status}: ${responseText}`,
      );
    }

    return {
      success: true,
      status: response.status,
      response: responseText,
    };
  } finally {
    clearTimeout(timeout);
  }
}