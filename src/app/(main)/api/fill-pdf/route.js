import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const FIELD_MAP = [
  { key: "projectName",         x: 130,  y: 664, fontSize: 12 },  
  { key: "clientName",          x: 130,  y: 643, fontSize: 12 },  
  { key: "plotNumber",          x: 130,  y: 622, fontSize: 12 }, 
  { key: "tokenPaymentDueDate", x: 479,  y: 513 },
  { key: "m1DueTimeline",       x: 384,  y: 471 },
  { key: "m1PaymentDueDate",    x: 480,  y: 471 },
  { key: "m2DueTimeline",       x: 384,  y: 433 },
  { key: "m2PaymentDueDate",    x: 479,  y: 433 },
  { key: "m3DueTimeline",       x: 384,  y: 395 },
  { key: "m3PaymentDueDate",    x: 478,  y: 395 },
  { key: "totalDueTimeline",    x: 384,  y: 361, bold: true },
];

function formatValue(key, value) {
  if (key.toLowerCase().includes("date") && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
  }
  return value;
}

// Calculate payment due dates based on booking date
function calculatePaymentDates(bookingDate, paymentPlanDays) {
  const bookingDateTime = new Date(bookingDate);
  const dates = {};
  
  // Token payment due date (typically on booking)
  dates.tokenPaymentDueDate = bookingDateTime;
  
  // Milestone 1: 25% payment due after first paymentPlanDays days
  dates.m1DueTimeline = `${paymentPlanDays} days from booking`;
  dates.m1PaymentDueDate = new Date(bookingDateTime);
  dates.m1PaymentDueDate.setDate(bookingDateTime.getDate() + paymentPlanDays);
  
  // Milestone 2: 50% payment due after 2 * paymentPlanDays days
  dates.m2DueTimeline = `${paymentPlanDays * 2} days from booking`;
  dates.m2PaymentDueDate = new Date(bookingDateTime);
  dates.m2PaymentDueDate.setDate(bookingDateTime.getDate() + (paymentPlanDays * 2));
  
  // Milestone 3: 25% payment due after 3 * paymentPlanDays days
  dates.m3DueTimeline = `${paymentPlanDays * 3} days from booking`;
  dates.m3PaymentDueDate = new Date(bookingDateTime);
  dates.m3PaymentDueDate.setDate(bookingDateTime.getDate() + (paymentPlanDays * 3));
  
  // Total timeline - same as milestone 3 completion
  dates.totalDueTimeline = `${paymentPlanDays * 3} days from booking`;
  
  return dates;
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Calculate payment dates if booking date and payment plan days are provided
    let calculatedDates = {};
    if (body.bookingDate && body.paymentPlanDays) {
      calculatedDates = calculatePaymentDates(body.bookingDate, parseInt(body.paymentPlanDays));
    }

    const pdfPath = path.join(process.cwd(), "public", "assets","new", "Payment Schedule Template.pdf");
    const templateBytes = await readFile(pdfPath);

    const pdfDoc = await PDFDocument.load(templateBytes);

    const font     = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const page = pdfDoc.getPages()[0];

    for (const field of FIELD_MAP) {
      let raw;
      
      if (field.key === "totalPaymentDueDate") {
        // Skip - this is automatically calculated and not in FIELD_MAP anymore
        continue;
      } else if (field.key === "totalDueTimeline") {
        // Use calculated total timeline
        raw = calculatedDates.totalDueTimeline || body[field.key];
      } else if (calculatedDates[field.key]) {
        // Use calculated date
        raw = calculatedDates[field.key];
      } else {
        // Use provided value
        raw = body[field.key];
      }
      
      if (!raw) continue;

      // Special handling for date objects
      let displayValue;
      if (raw instanceof Date) {
        const d = raw;
        displayValue = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
      } else {
        displayValue = formatValue(field.key, String(raw));
      }

      // Use field-specific font size or default to 9
      const fontSize = field.fontSize || 9;

      page.drawText(displayValue, {
        x: field.x,
        y: field.y,
        size: fontSize,
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