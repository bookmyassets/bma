import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, recaptchaToken } = body;

    // --- 1. Validate required fields ---
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 }
      );
    }

    // --- 2. Validate reCAPTCHA token with Google ---
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!recaptchaSecretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not set.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api.js",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      console.error("reCAPTCHA verification failed:", recaptchaData["error-codes"]);
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 403 }
      );
    }

    // --- 3. Forward lead to TeleCRM ---
    const teleResponse = await fetch(
      "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead", // ← replace with your actual TeleCRM endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TELECRM_API_KEY}`, // server-side env var (no NEXT_PUBLIC_)
        },
        body: JSON.stringify({
          fields: {
            name,
            phone,
            email: email || "",
            source: "BookMyAssets Bulk Land",
          },
          source: "BookMyAssets Website",
          tags: ["Dholera Investment", "Website Lead", "Bulk Land"],
        }),
      }
    );

    const teleText = await teleResponse.text();
    console.log("TeleCRM response:", teleText);

    if (!teleResponse.ok) {
      throw new Error(`TeleCRM error: ${teleText}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}