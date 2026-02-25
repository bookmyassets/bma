// app/api/submit-lead/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fields, source, tags, recaptchaToken } = body;

    // --- 1. Validate required fields ---
    if (!fields?.name || !fields?.phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // --- 2. Verify reCAPTCHA token with Google ---
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!recaptchaSecretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const recaptchaRes = await fetch(recaptchaVerifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: recaptchaSecretKey,
        response: recaptchaToken,
      }),
    });

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      console.error("reCAPTCHA verification failed:", recaptchaData["error-codes"]);
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Optional: enforce minimum score for v3 (skip for v2 checkbox)
    // if (recaptchaData.score < 0.5) {
    //   return NextResponse.json({ error: "Low reCAPTCHA score" }, { status: 400 });
    // }

    // --- 3. Forward lead to TeleCRM ---
    const telecrm_api_key = process.env.NEXT_PUBLIC_TELECRM_API_KEY;
    const telecrm_endpoint =  "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead";

    if (!telecrm_api_key || !telecrm_endpoint) {
      console.error("TeleCRM config missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const telecrmRes = await fetch(telecrm_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${telecrm_api_key}`,
      },
      body: JSON.stringify({
        fields: {
          name: fields.name,
          phone: fields.phone,
          email: fields.email || "",
          source: "BookMyAssets",
        },
        source: "BookMyAssets",
      }),
    });

    const telecrmText = await telecrmRes.text();

    if (!telecrmRes.ok) {
      console.error("TeleCRM error:", telecrmText);
      return NextResponse.json(
        { error: "Failed to submit lead. Please try again." },
        { status: 500 }
      );
    }

    // TeleCRM returns "OK" on success
    if (telecrmText === "OK" || telecrmText.toLowerCase().includes("success")) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Unexpected but non-error response
    console.warn("Unexpected TeleCRM response:", telecrmText);
    return NextResponse.json(
      { success: true, note: "Submitted with unexpected response" },
      { status: 200 }
    );

  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}