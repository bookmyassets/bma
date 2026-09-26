import "server-only";

import { getRazorpayApiCredentials } from "./razorpayAccounts";

const RAZORPAY_API_BASE_URL = "https://api.razorpay.com/v1";

/**
 * Error thrown when Razorpay returns a non-success response.
 */
export class RazorpayApiError extends Error {
  constructor(
    message,
    {
      status = 500,
      code = "RAZORPAY_API_ERROR",
      details = null,
    } = {},
  ) {
    super(message);

    this.name = "RazorpayApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Creates the HTTP Basic Authorization header Razorpay expects.
 *
 * IMPORTANT:
 * This must only ever run on the server because it uses the Key Secret.
 */
function createAuthorizationHeader(keyId, keySecret) {
  const credentials = Buffer.from(
    `${keyId}:${keySecret}`,
    "utf8",
  ).toString("base64");

  return `Basic ${credentials}`;
}

/**
 * Safely attempts to parse a Razorpay response as JSON.
 */
async function parseResponse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Shared Razorpay API request helper.
 */
async function razorpayRequest({
  merchant,
  path,
  method = "GET",
  body,
}) {
  const { keyId, keySecret } =
    getRazorpayApiCredentials(merchant);

  const response = await fetch(
    `${RAZORPAY_API_BASE_URL}${path}`,
    {
      method,
      headers: {
        Authorization: createAuthorizationHeader(
          keyId,
          keySecret,
        ),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      ...(body
        ? {
            body: JSON.stringify(body),
          }
        : {}),
    },
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    const razorpayError = data?.error;

    throw new RazorpayApiError(
      razorpayError?.description ||
        "Razorpay request failed.",
      {
        status: response.status,
        code:
          razorpayError?.code ||
          "RAZORPAY_API_ERROR",
        details: razorpayError || data,
      },
    );
  }

  return data;
}

/**
 * Creates a single-use, fixed-amount UPI QR code.
 *
 * Razorpay expects payment_amount in paise.
 *
 * Example:
 * Rs. 50,000 = 5,000,000 paise
 */
export async function createRazorpayUpiQr({
  merchant,
  amountPaise,
  name,
  description,
  paymentReference,
  projectName,
  plotNumber,
  closeBy,
}) {
  if (!merchant) {
    throw new Error(
      "Razorpay merchant is required.",
    );
  }

  if (
    !Number.isInteger(amountPaise) ||
    amountPaise <= 0
  ) {
    throw new Error(
      "Razorpay amount must be a positive integer in paise.",
    );
  }

  if (!name?.trim()) {
    throw new Error(
      "QR code name is required.",
    );
  }

  if (
    !Number.isInteger(closeBy) ||
    closeBy <= Math.floor(Date.now() / 1000)
  ) {
    throw new Error(
      "QR expiry time must be a future Unix timestamp.",
    );
  }

  const payload = {
    type: "upi_qr",

    name: name.trim(),

    usage: "single_use",

    fixed_amount: true,

    payment_amount: amountPaise,

    description:
      description?.trim() ||
      "BookMyAssets booking payment",

    close_by: closeBy,

    notes: {
      payment_reference: String(
        paymentReference || "",
      ),
      project: String(projectName || ""),
      plot_number: String(plotNumber || ""),
      source: "bookmyassets_website",
    },
  };

  return razorpayRequest({
    merchant,
    path: "/payments/qr_codes",
    method: "POST",
    body: payload,
  });
}

/**
 * Fetch payments received against a Razorpay QR.
 *
 * For our current implementation every QR is:
 *
 * - single use
 * - fixed amount
 * - generated for one booking payment
 */
export async function fetchRazorpayQrPayments({
  merchant,
  qrId,
}) {
  if (!merchant) {
    throw new Error(
      "Razorpay merchant is required.",
    );
  }

  if (
    typeof qrId !== "string" ||
    !qrId.startsWith("qr_")
  ) {
    throw new Error(
      "A valid Razorpay QR ID is required.",
    );
  }

  const query = new URLSearchParams({
    count: "10",
  });

  return razorpayRequest({
    merchant,
    path: `/payments/qr_codes/${encodeURIComponent(
      qrId,
    )}/payments?${query.toString()}`,
    method: "GET",
  });
}