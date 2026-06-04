import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  hasSanityWriteToken,
  receiptCounterClient,
} from "@/sanity/lib/writeClient";

const RECEIPT_PREFIX = "BMA";
const PROJECT_INITIAL_RECEIPTS = {
  "westwyn-residency": "BMA/28/2026-27",
  "westwyn-estates": "BMA/201/2026-27",
};

function getProjectKey(projectName) {
  return (projectName || "default")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFinancialYear(dateValue) {
  let date = new Date();

  if (dateValue) {
    const parts = dateValue.split("/");
    if (parts.length === 3) {
      const day = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const year = Number(parts[2]);
      const parsedDate = new Date(year, month, day);

      if (!isNaN(parsedDate.getTime())) {
        date = parsedDate;
      }
    }
  }

  const startYear =
    date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
  const endYear = String((startYear + 1) % 100).padStart(2, "0");

  return `${startYear}-${endYear}`;
}

function getCounterId(projectKey, financialYear) {
  return `receiptCounter.bma.${projectKey}.${financialYear}`;
}

function getInitialReceiptNumber(projectKey, financialYear) {
  const projectInitial = PROJECT_INITIAL_RECEIPTS[projectKey];

  if (projectInitial?.endsWith(`/${financialYear}`)) {
    return projectInitial;
  }

  return `${RECEIPT_PREFIX}/001/${financialYear}`;
}

function getNextReceiptNumber(lastReceiptNumber, projectKey, financialYear) {
  if (!lastReceiptNumber) {
    return getInitialReceiptNumber(projectKey, financialYear);
  }

  const match = lastReceiptNumber.match(/^([A-Z]+)\/(\d+)\/(\d{4}-\d{2})$/);

  if (!match) {
    return getInitialReceiptNumber(projectKey, financialYear);
  }

  const [, prefix, number, year] = match;
  if (year !== financialYear) {
    return `${prefix}/001/${financialYear}`;
  }

  const nextNumber = Number(number) + 1;
  const width = number.length >= 3 ? number.length : 0;
  const formattedNumber = width
    ? String(nextNumber).padStart(width, "0")
    : String(nextNumber);

  return `${prefix}/${formattedNumber}/${financialYear}`;
}

async function getProjectReceiptCounter(projectName, paymentDate) {
  const projectKey = getProjectKey(projectName);
  const financialYear = getFinancialYear(paymentDate);
  const counterId = getCounterId(projectKey, financialYear);
  const data = await receiptCounterClient.fetch(
    `*[_id == $id][0]{lastReceiptNumber}`,
    { id: counterId },
  );
  const lastReceiptNumber = data?.lastReceiptNumber || "";

  return {
    financialYear,
    lastReceiptNumber,
    nextReceiptNumber: getNextReceiptNumber(
      lastReceiptNumber,
      projectKey,
      financialYear,
    ),
    projectKey,
  };
}

async function saveLastReceiptNumber(receiptNumber, projectName, paymentDate) {
  if (!receiptNumber) return;

  if (!hasSanityWriteToken()) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN for receipt counter update");
  }

  const projectKey = getProjectKey(projectName);
  const financialYear = getFinancialYear(paymentDate);
  const counterId = getCounterId(projectKey, financialYear);

  await receiptCounterClient.createIfNotExists({
    _id: counterId,
    _type: "receiptCounter",
    title: `BMA Receipt Counter - ${projectName || "Default"} - ${financialYear}`,
    projectName: projectName || "",
    projectKey,
    financialYear,
    lastReceiptNumber: getInitialReceiptNumber(projectKey, financialYear),
  });

  await receiptCounterClient
    .patch(counterId)
    .set({
      projectName: projectName || "",
      projectKey,
      financialYear,
      lastReceiptNumber: receiptNumber,
      updatedAt: new Date().toISOString(),
    })
    .commit();
}

// GET — returns the last saved receipt number string
export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const projectName = searchParams.get("projectName") || "";
    const paymentDate = searchParams.get("paymentDate") || "";

    if (!projectName) {
      return NextResponse.json({
        lastReceiptNumber: "",
        nextReceiptNumber: "",
      });
    }

    return NextResponse.json(
      await getProjectReceiptCounter(projectName, paymentDate),
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to load receipt counter" },
      { status: 500 },
    );
  }
}

// POST — generates the PDF. Preview requests can skip saving the counter.
export async function POST(request) {
  try {
    const {
      formData = {},
      coordinates = {},
      paymentDate,
      saveCounter = true,
    } = await request.json();

    // Load the PDF template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "assets",
      "new",
      "Payment Receipt Template.pdf",
    );
    const existingPdfBytes = fs.readFileSync(templatePath);

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const page = pages[0];

    // Embed fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Fill all fields based on coordinates
    for (const [fieldKey, fieldData] of Object.entries(coordinates)) {
      const value = String(formData[fieldKey] || "");
      if (value.trim()) {
        let fontSize = fieldData.fontSize || 9;
        const displayValue = value;

        // Adjust font size for long text
        if (fieldKey === "amountInWords" && value.length > 50) {
          fontSize = 9;
        }

        const pageIndex = Math.max(0, Number(fieldData.page || 1) - 1);
        const targetPage = pages[pageIndex] || page;

        targetPage.drawText(displayValue, {
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

    if (saveCounter) {
      // Persist the receipt number exactly as provided (no transformation)
      await saveLastReceiptNumber(
        formData.receiptNumber,
        formData.projectName,
        paymentDate,
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
