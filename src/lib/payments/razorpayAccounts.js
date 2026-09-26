import "server-only";

const ACCOUNT_ENV = Object.freeze({
  residency: {
    keyId: "RAZORPAY_RESIDENCY_KEY_ID",
    keySecret: "RAZORPAY_RESIDENCY_KEY_SECRET",
    webhookSecret: "RAZORPAY_RESIDENCY_WEBHOOK_SECRET",
  },
  estates: {
    keyId: "RAZORPAY_ESTATES_KEY_ID",
    keySecret: "RAZORPAY_ESTATES_KEY_SECRET",
    webhookSecret: "RAZORPAY_ESTATES_WEBHOOK_SECRET",
  },
});

function getAccountEnv(merchant) {
  const envNames = ACCOUNT_ENV[merchant];

  if (!envNames) {
    throw new Error(`Unsupported Razorpay merchant: ${merchant}`);
  }

  return envNames;
}

function readRequiredEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getRazorpayApiCredentials(merchant) {
  const envNames = getAccountEnv(merchant);

  return {
    keyId: readRequiredEnv(envNames.keyId),
    keySecret: readRequiredEnv(envNames.keySecret),
  };
}

export function getRazorpayWebhookSecret(merchant) {
  const envNames = getAccountEnv(merchant);
  return readRequiredEnv(envNames.webhookSecret);
}
