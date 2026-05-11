import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  hasSanityWriteToken,
  receiptCounterClient,
} from "@/sanity/lib/writeClient";

const RECEIPT_COUNTER_ID = "receiptCounter.bma";
const INITIAL_RECEIPT_NUMBER = "BMA-027";

async function getLastReceiptNumber() {
  const data = await receiptCounterClient.fetch(
    `*[_id == $id][0]{lastReceiptNumber}`,
    { id: RECEIPT_COUNTER_ID },
  );

  return data?.lastReceiptNumber || INITIAL_RECEIPT_NUMBER;
}

async function saveLastReceiptNumber(receiptNumber) {
  if (!receiptNumber) return;

  if (!hasSanityWriteToken) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN for receipt counter update");
  }

  await receiptCounterClient.createIfNotExists({
    _id: RECEIPT_COUNTER_ID,
    _type: "receiptCounter",
    title: "BMA Receipt Counter",
    lastReceiptNumber: INITIAL_RECEIPT_NUMBER,
  });

  await receiptCounterClient
    .patch(RECEIPT_COUNTER_ID)
    .set({
      lastReceiptNumber: receiptNumber,
      updatedAt: new Date().toISOString(),
    })
    .commit();
}

// GET — returns the last saved receipt number string
export async function GET() {
  try {
    return NextResponse.json({
      lastReceiptNumber: await getLastReceiptNumber(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to load receipt counter" },
      { status: 500 },
    );
  }
}

// POST — generates the PDF and saves the receipt number
export async function POST(request) {
  try {
    const { formData, coordinates } = await request.json();

    // Load the PDF template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "assets",
      "Payment-Receipt.pdf",
    );
    const existingPdfBytes = fs.readFileSync(templatePath);

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];

    // Embed fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Fill all fields based on coordinates
    for (const [fieldKey, fieldData] of Object.entries(coordinates)) {
      const value = formData[fieldKey];
      if (value && value.trim()) {
        let fontSize = 9;
        let displayValue = value;

        // Adjust font size for long text
        if (fieldKey === "amountInWords" && value.length > 50) {
          fontSize = 9;
        }

        page.drawText(displayValue, {
          x: fieldData.x,
          y: fieldData.y,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Persist the receipt number exactly as provided (no transformation)
    await saveLastReceiptNumber(formData.receiptNumber);

    // Return the PDF as a download
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="payment-receipt.pdf"',
      },
    });
  } catch (error) {
    console.error("Error filling PDF:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
