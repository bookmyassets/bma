import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const FIELD_MAP = [
  { key: "projectName",         x: 125,  y: 675.3 },
  { key: "clientName",          x: 125,  y: 654.3 },
  { key: "plotNumber",          x: 125,  y: 633.3 },
  { key: "tokenPaymentDueDate", x: 456,  y: 527.0 },
  { key: "m1DueTimeline",       x: 365,  y: 497.6 },
  { key: "m1PaymentDueDate",    x: 458,  y: 497.6 },
  { key: "m2DueTimeline",       x: 365,  y: 467.9 },
  { key: "m2PaymentDueDate",    x: 456,  y: 467.9 },
  { key: "m3DueTimeline",       x: 365,  y: 438.2 },
  { key: "m3PaymentDueDate",    x: 456,  y: 438.2 },
  { key: "totalDueTimeline",    x: 365,  y: 408.5, bold: true },
  { key: "totalPaymentDueDate", x: 456,  y: 408.5, bold: true },
];

function formatValue(key, value) {
  if (key.toLowerCase().includes("date") && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
  }
  return value;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const pdfPath = path.join(process.cwd(), "public", "assets", "Payment_Schedule.pdf");
    const templateBytes = await readFile(pdfPath);

    const pdfDoc = await PDFDocument.load(templateBytes);

    const font     = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const page = pdfDoc.getPages()[0];

    for (const field of FIELD_MAP) {
      const raw = body[field.key];
      if (!raw) continue;

      page.drawText(formatValue(field.key, String(raw)), {
        x: field.x,
        y: field.y,
        size: 9,
        font: field.bold ? fontBold : font, 
        color: rgb(0, 0, 0),
      });
    }

    const filledPdfBytes = await pdfDoc.save();
    const plotNumber     = (body.plotNumber     || "client").replace(/\s+/g, "-");
    const projectName    = (body.projectName    || "client").replace(/\s+/g, "-");
    const paymentPlanDays = (body.paymentPlanDays || "client").replace(/\s+/g, "-");

    return new NextResponse(filledPdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Payment-Schedule-Unit-${plotNumber}-${projectName}-${paymentPlanDays}.pdf"`,
      },
    });
  } catch (err) {
    console.error("[fill-pdf]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}