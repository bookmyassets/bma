import "server-only";

import {
  createHmac,
  timingSafeEqual,
} from "crypto";

/**
 * Return the webhook secret for the Razorpay
 * merchant/account receiving the webhook.
 */
export function getRazorpayWebhookSecret(
  merchant,
) {
  let envName;

  switch (merchant) {
    case "residency":
      envName =
        "RAZORPAY_RESIDENCY_WEBHOOK_SECRET";
      break;

    case "estates":
      envName =
        "RAZORPAY_ESTATES_WEBHOOK_SECRET";
      break;

    default:
      throw new Error(
        `Unsupported Razorpay merchant: ${merchant}`,
      );
  }

  const secret = process.env[envName];

  if (!secret) {
    throw new Error(
      `${envName} environment variable is missing.`,
    );
  }

  return secret;
}

/**
 * Verify Razorpay's X-Razorpay-Signature header.
 *
 * IMPORTANT:
 * rawBody must be request.text().
 * Do not JSON.parse() before verification.
 */
export function verifyRazorpayWebhookSignature({
  rawBody,
  signature,
  secret,
}) {
  if (
    typeof rawBody !== "string" ||
    !rawBody
  ) {
    return false;
  }

  if (
    typeof signature !== "string" ||
    !signature
  ) {
    return false;
  }

  if (
    typeof secret !== "string" ||
    !secret
  ) {
    return false;
  }

  const expectedSignature = createHmac(
    "sha256",
    secret,
  )
    .update(rawBody, "utf8")
    .digest("hex");

  const expectedBuffer = Buffer.from(
    expectedSignature,
    "utf8",
  );

  const receivedBuffer = Buffer.from(
    signature,
    "utf8",
  );

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    expectedBuffer,
    receivedBuffer,
  );
}