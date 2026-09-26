import "server-only";

import {
  receiptCounterClient as writeClient,
} from "@/sanity/lib/writeClient";

function assertSanityWriteAccess() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN environment variable is missing.",
    );
  }
}

function cleanReference(value) {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new Error(
      "Payment reference is required.",
    );
  }

  return value.trim();
}

export function getPaymentTransactionId(
  paymentReference,
) {
  const reference =
    cleanReference(paymentReference);

  return `paymentTransaction.${reference}`;
}

export async function createPendingPaymentTransaction({
  paymentReference,
  clientName,
  mobileNumber,
  email = "",
  projectId,
  projectName,
  projectCode,
  plotNumber,
  merchant,
  amountRupees,
  amountPaise,
}) {
  assertSanityWriteAccess();

  const reference =
    cleanReference(paymentReference);

  const now = new Date().toISOString();

  const document = {
    _id: getPaymentTransactionId(
      reference,
    ),

    _type: "paymentTransaction",

    paymentReference: reference,

    clientName: String(
      clientName || "",
    ).trim(),

    mobileNumber: String(
      mobileNumber || "",
    ).trim(),

    email: String(
      email || "",
    ).trim(),

    projectId,
    projectName,
    projectCode,

    plotNumber: String(
      plotNumber || "",
    ).trim(),

    merchant,

    amountRupees,
    amountPaise,

    currency: "INR",

    status: "pending",

    createdAt: now,
    updatedAt: now,
  };

  return writeClient.createIfNotExists(
    document,
  );
}

export async function attachRazorpayQr({
  paymentReference,
  qrId,
  qrImageUrl,
  closeBy,
}) {
  assertSanityWriteAccess();

  const documentId =
    getPaymentTransactionId(
      paymentReference,
    );

  const updates = {
    razorpayQrId: qrId,

    razorpayQrImageUrl:
      qrImageUrl || null,

    updatedAt:
      new Date().toISOString(),
  };

  if (
    Number.isInteger(closeBy) &&
    closeBy > 0
  ) {
    updates.qrExpiresAt = new Date(
      closeBy * 1000,
    ).toISOString();
  }

  return writeClient
    .patch(documentId)
    .set(updates)
    .commit();
}

export async function markPaymentProcessing({
  paymentReference,
}) {
  assertSanityWriteAccess();

  return writeClient
    .patch(
      getPaymentTransactionId(
        paymentReference,
      ),
    )
    .set({
      status: "processing",

      updatedAt:
        new Date().toISOString(),
    })
    .commit();
}

export async function markPaymentPaid({
  paymentReference,
  razorpayPaymentId,
  paymentMethod,
  paidAt,
  webhookReceivedAt,
}) {
  assertSanityWriteAccess();

  const now = new Date().toISOString();

  const updates = {
    status: "paid",

    razorpayPaymentId,

    paymentMethod:
      paymentMethod || null,

    paidAt:
      paidAt || now,

    updatedAt: now,
  };

  if (webhookReceivedAt) {
    updates.lastWebhookReceivedAt =
      webhookReceivedAt;
  }

  return writeClient
    .patch(
      getPaymentTransactionId(
        paymentReference,
      ),
    )
    .set(updates)
    .commit();
}

export async function markPaymentExpired({
  paymentReference,
}) {
  assertSanityWriteAccess();

  return writeClient
    .patch(
      getPaymentTransactionId(
        paymentReference,
      ),
    )
    .set({
      status: "expired",

      updatedAt:
        new Date().toISOString(),
    })
    .commit();
}

export async function markPaymentFailed({
  paymentReference,
}) {
  assertSanityWriteAccess();

  return writeClient
    .patch(
      getPaymentTransactionId(
        paymentReference,
      ),
    )
    .set({
      status: "failed",

      updatedAt:
        new Date().toISOString(),
    })
    .commit();
}

export async function getPaymentTransaction({
  paymentReference,
}) {
  assertSanityWriteAccess();

  const documentId =
    getPaymentTransactionId(
      paymentReference,
    );

  return writeClient.getDocument(
    documentId,
  );
}

export async function getPaymentTransactionByQrId({
  qrId,
}) {
  assertSanityWriteAccess();

  if (
    typeof qrId !== "string" ||
    !qrId.startsWith("qr_")
  ) {
    throw new Error(
      "A valid Razorpay QR ID is required.",
    );
  }

  return writeClient.fetch(
    `
      *[
        _type == "paymentTransaction" &&
        razorpayQrId == $qrId
      ][0]{
        _id,
        paymentReference,

        clientName,
        mobileNumber,
        email,

        projectId,
        projectName,
        projectCode,

        plotNumber,
        merchant,

        amountRupees,
        amountPaise,
        currency,

        status,

        razorpayQrId,
        razorpayQrImageUrl,
        razorpayPaymentId,
        paymentMethod,

        qrExpiresAt,
        createdAt,
        updatedAt,
        paidAt,
        lastWebhookReceivedAt
      }
    `,
    {
      qrId,
    },
  );
}