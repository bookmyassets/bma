// app/api/submit-form/route.js
import { NextResponse } from "next/server";

const TELECRM_ENDPOINT =
  "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead";

const OPTIONAL_FIELD_LIMITS = {
  email: 254,
  source: 100,
  profession: 100,
  experience: 100,
  subject: 150,
  message: 2000,
  notes: 1000,
};

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const fields =
      body?.fields && typeof body.fields === "object" ? body.fields : {};

    const name = cleanString(fields.name, 100);
    const phone =
      typeof fields.phone === "string"
        ? fields.phone.replace(/\D/g, "").slice(0, 15)
        : "";

    if (!name || !/^\d{10,15}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please provide a valid name and phone number" },
        { status: 400 },
      );
    }

    const email = cleanString(fields.email, OPTIONAL_FIELD_LIMITS.email);
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    const telecrmApiKey = process.env.TELECRM_API_KEY;

    if (!telecrmApiKey) {
      console.error("TELECRM_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const leadSource =
      cleanString(fields.source, OPTIONAL_FIELD_LIMITS.source) ||
      "BookMyAssets";
    const formSource =
      cleanString(body.source, OPTIONAL_FIELD_LIMITS.source) || leadSource;
    const safeTags = Array.isArray(body.tags)
      ? body.tags
          .filter((tag) => typeof tag === "string" && tag.trim())
          .map((tag) => tag.trim().slice(0, 50))
          .slice(0, 10)
      : [];

    const safeFields = {
      name,
      phone,
      source: leadSource,
    };

    for (const [fieldName, maxLength] of Object.entries(
      OPTIONAL_FIELD_LIMITS,
    )) {
      if (fieldName === "source") continue;

      const value =
        fieldName === "email"
          ? email
          : cleanString(fields[fieldName], maxLength);

      if (value) {
        safeFields[fieldName] = value;
      }
    }

    const telecrmPayload = {
      fields: safeFields,
      source: formSource,
      tags: safeTags,
    };

    const phoneNumber = cleanString(body.phoneNumber, 20).replace(
      /[^\d+]/g,
      "",
    );
    if (phoneNumber) {
      telecrmPayload.phoneNumber = phoneNumber;
    }

    const telecrmRes = await fetch(TELECRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${telecrmApiKey}`,
      },
      body: JSON.stringify(telecrmPayload),
    });

    const telecrmText = await telecrmRes.text();

    if (!telecrmRes.ok) {
      console.error("TeleCRM request failed with status:", telecrmRes.status);
      return NextResponse.json(
        { error: "Failed to submit lead. Please try again." },
        { status: 502 },
      );
    }

    const normalizedResponse = telecrmText.trim().toLowerCase();
    const responseWasExpected =
      normalizedResponse === "ok" || normalizedResponse.includes("success");

    return NextResponse.json(
      {
        success: true,
        ...(!responseWasExpected
          ? { note: "Submitted with an unexpected CRM response" }
          : {}),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lead API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}