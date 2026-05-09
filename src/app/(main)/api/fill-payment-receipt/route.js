import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const counterPath = path.join(
  process.cwd(),
  "public",
  "assets",
  "receipt-counter.json",
);

// GET — returns the last saved receipt number string
export async function GET() {
  try {
    if (!fs.existsSync(counterPath)) {
      return NextResponse.json({ lastReceiptNumber: "" });
    }
    const data = JSON.parse(fs.readFileSync(counterPath, "utf-8"));
    return NextResponse.json({
      lastReceiptNumber: data.lastReceiptNumber ?? "",
    });
  } catch {
    return NextResponse.json({ lastReceiptNumber: "" });
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
    if (formData.receiptNumber) {
      fs.writeFileSync(
        counterPath,
        JSON.stringify({ lastReceiptNumber: formData.receiptNumber }),
      );
    }

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
