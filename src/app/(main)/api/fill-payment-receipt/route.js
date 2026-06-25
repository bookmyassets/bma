import { NextResponse } from "next/server";
import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import {
  hasSanityWriteToken,
  receiptCounterClient,
} from "@/sanity/lib/writeClient";

const RECEIPT_PREFIX = "BMA";
const PROJECT_INITIAL_RECEIPTS = {
  "westwyn-residency": "BMA/28/2026-27",
  "westwyn-estates": "BMA/201/2026-27",
};
const PROJECT_RECEIPT_TEMPLATES = {
  "westwyn-estates": "Payment Receipt Template.pdf",
};
const DEFAULT_RECEIPT_TEMPLATE = "Payment Receipt Template.pdf";
const RECEIPT_TEMPLATES = {
  "payment-receipt": DEFAULT_RECEIPT_TEMPLATE,
  "token-receipt": "Token Receipt.pdf",
};
const PROJECT_COMPANY_NAMES = {
  "westwyn-estates": "WestWyn Partners LLP",
  "westwyn-residency": "BookMyAssets Projects",
};
const COMPANY_NAME_COORDINATE = {
  page: 1,
  x: 40 ,
  y: 655,
  width: 349,
  height: 35,
  fontName: "Montserrat",
  fontSize: 20,
  bold: true,
  align: "left",
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

function getPaymentReceiptTemplate(projectName, documentType) {
  if (documentType && documentType !== "payment-receipt") {
    return RECEIPT_TEMPLATES[documentType] || DEFAULT_RECEIPT_TEMPLATE;
  }

  const projectKey = getProjectKey(projectName);
  return PROJECT_RECEIPT_TEMPLATES[projectKey] || DEFAULT_RECEIPT_TEMPLATE;
}

async function embedFontFromPaths(pdfDoc, fontPaths) {
  for (const fontPath of fontPaths) {
    try {
      const fontBytes = await readFile(fontPath);
      return pdfDoc.embedFont(fontBytes);
    } catch {
      // Try the next configured font path.
    }
  }

  return null;
}

function getFieldX(value, fieldData, font, fontSize) {
  const x = Number(fieldData.x || 0);
  const width = Number(fieldData.width || 0);

  if (!width || !fieldData.align || fieldData.align === "left") {
    return x;
  }

  const textWidth = font.widthOfTextAtSize(value, fontSize);

  if (fieldData.align === "right") {
    return x + Math.max(0, width - textWidth);
  }

  if (fieldData.align === "center") {
    return x + Math.max(0, (width - textWidth) / 2);
  }

  return x;
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
      documentType = "payment-receipt",
      formData = {},
      coordinates = {},
      filename = "payment-receipt.pdf",
      paymentDate,
      saveCounter = true,
    } = await request.json();
    const projectKey = getProjectKey(formData.projectName);
    const pdfFormData = {
      ...formData,
      companyName:
        formData.companyName || PROJECT_COMPANY_NAMES[projectKey] || "",
    };
    const pdfCoordinates = pdfFormData.companyName
      ? { companyName: COMPANY_NAME_COORDINATE, ...coordinates }
      : coordinates;

    // Load the project-specific PDF template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "assets",
      "new",
      getPaymentReceiptTemplate(pdfFormData.projectName, documentType),
    );
    const existingPdfBytes = fs.readFileSync(templatePath);

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const pages = pdfDoc.getPages();
    const page = pages[0];

    // Embed fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const montserratRegular =
      (await embedFontFromPaths(pdfDoc, [
        path.join(
          process.cwd(),
          "public",
          "assets",
          "fonts",
          "Montserrat-Regular.ttf",
        ),
        "C:\\Windows\\Fonts\\Montserrat-Regular.ttf",
        "C:\\Windows\\Fonts\\Montserrat.ttf",
      ])) || font;
    const montserratBold =
      (await embedFontFromPaths(pdfDoc, [
        path.join(
          process.cwd(),
          "public",
          "assets",
          "fonts",
          "Montserrat-Bold.ttf",
        ),
        "C:\\Windows\\Fonts\\Montserrat-Bold.ttf",
        "C:\\Windows\\Fonts\\Montserrat-SemiBold.ttf",
        "C:\\Windows\\Fonts\\Montserrat-ExtraBold.ttf",
      ])) || fontBold;

    // Fill all fields based on coordinates
    for (const [fieldKey, fieldData] of Object.entries(pdfCoordinates)) {
      const value = String(pdfFormData[fieldKey] || "");
      if (value.trim()) {
        let fontSize = Number(fieldData.fontSize || 9);
        const displayValue = value;
        const wantsMontserrat =
          String(fieldData.fontName || "").toLowerCase() === "montserrat";
        const selectedFont = wantsMontserrat
          ? fieldData.bold
            ? montserratBold
            : montserratRegular
          : fieldData.bold
            ? fontBold
            : font;

        // Adjust font size for long text
        if (fieldKey === "amountInWords" && value.length > 50) {
          fontSize = 9;
        }

        const pageIndex = Math.max(0, Number(fieldData.page || 1) - 1);
        const targetPage = pages[pageIndex] || page;

        targetPage.drawText(displayValue, {
          x: getFieldX(displayValue, fieldData, selectedFont, fontSize),
          y: fieldData.y,
          size: fontSize,
          font: selectedFont,
          color: rgb(0, 0, 0),
        });
      }
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    if (saveCounter) {
      // Persist the receipt number exactly as provided (no transformation)
      await saveLastReceiptNumber(
        pdfFormData.receiptNumber,
        pdfFormData.projectName,
        paymentDate,
      );
    }

    // Return the PDF as a download
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
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
