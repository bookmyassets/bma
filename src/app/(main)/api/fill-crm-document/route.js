import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const DOCUMENT_TEMPLATES = {
  "welcome-letter": {
    fileName: "Welcome Letter.pdf",
    downloadName: "Welcome-Letter.pdf",
  },
  "plot-details": {
    fileName: "Plot Details.pdf",
    downloadName: "Plot-Details.pdf",
  },
  "allotment-letter": {
    fileName: "ALLOTMENT LETTER.pdf",
    downloadName: "Allotment-Letter.pdf",
  },
};

function sanitizePdfValue(value) {
  if (value === null || value === undefined) return "";

  return String(value).replace(/\s+\n/g, "\n").trim();
}

function splitTextToLines(text, font, fontSize, maxWidth) {
  const manualLines = text.split(/\r?\n/);

  if (!maxWidth) {
    return manualLines;
  }

  return manualLines.flatMap((line) => {
    const words = line.split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";

    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      const width = font.widthOfTextAtSize(candidate, fontSize);

      if (width <= maxWidth || !current) {
        current = candidate;
        return;
      }

      lines.push(current);
      current = word;
    });

    if (current) {
      lines.push(current);
    }

    return lines.length ? lines : [line];
  });
}

async function embedUnicodeFont(pdfDoc, bold = false) {
  const fontPaths = bold
    ? [
        "C:\\Windows\\Fonts\\arialbd.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
      ]
    : [
        "C:\\Windows\\Fonts\\arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
      ];

  for (const fontPath of fontPaths) {
    try {
      const fontBytes = await readFile(fontPath);
      return pdfDoc.embedFont(fontBytes);
    } catch {
      // Try the next common system font path.
    }
  }

  return null;
}

function resolveSegmentText(segment, formData) {
  if (segment.key) {
    return sanitizePdfValue(formData[segment.key]);
  }

  if (segment.text === null || segment.text === undefined) return "";

  return String(segment.text).replace(/\s+\n/g, "\n");
}

function drawRichText(page, fieldData, formData, font, fontBold) {
  const fontSize = Number(fieldData.fontSize || 10);
  const lineHeight = Number(fieldData.lineHeight || fontSize + 4);
  const maxWidth = Number(fieldData.maxWidth || 0);
  let cursorX = Number(fieldData.x || 0);
  let cursorY = Number(fieldData.y || 0);
  const startX = cursorX;

  fieldData.segments.forEach((segment) => {
    const segmentText = resolveSegmentText(segment, formData);
    if (!segmentText) return;

    const selectedFont = segment.bold ? fontBold : font;
    const tokens = segmentText.match(/\s+|\S+/g) || [];

    tokens.forEach((token) => {
      const isWhitespace = /^\s+$/.test(token);
      const tokenWidth = selectedFont.widthOfTextAtSize(token, fontSize);
      const usedWidth = cursorX - startX;

      if (maxWidth && usedWidth > 0 && usedWidth + tokenWidth > maxWidth) {
        cursorX = startX;
        cursorY -= lineHeight;

        if (isWhitespace) return;
      }

      if (isWhitespace) {
        if (cursorX !== startX) {
          cursorX += tokenWidth;
        }

        return;
      }

      page.drawText(token, {
        x: cursorX,
        y: cursorY,
        size: fontSize,
        font: selectedFont,
        color: rgb(0, 0, 0),
      });

      cursorX += tokenWidth;
    });
  });
}

export async function POST(request) {
  try {
    const {
      documentType,
      formData = {},
      coordinates = {},
      filename,
    } = await request.json();

    const template = DOCUMENT_TEMPLATES[documentType];

    if (!template) {
      return NextResponse.json(
        { error: "Unsupported document type" },
        { status: 400 },
      );
    }

    const templatePath = path.join(
      process.cwd(),
      "public",
      "assets",
      template.fileName,
    );
    const templateBytes = await readFile(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    pdfDoc.registerFontkit(fontkit);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const unicodeFont = (await embedUnicodeFont(pdfDoc)) || font;
    const unicodeFontBold = (await embedUnicodeFont(pdfDoc, true)) || fontBold;
    const pages = pdfDoc.getPages();
    const flowTextState = new Map();

    Object.entries(coordinates).forEach(([fieldKey, fieldData]) => {
      if (fieldData.requiredKey && !sanitizePdfValue(formData[fieldData.requiredKey])) {
        return;
      }

      if (fieldData.segments?.length) {
        const pageIndex = Math.max(0, Number(fieldData.page || 1) - 1);
        const page = pages[pageIndex] || pages[0];
        drawRichText(page, fieldData, formData, font, fontBold);
        return;
      }

      const valueKey = fieldData.key || fieldKey;
      const flowKey = fieldData.flowKey || "";
      const rawValue = flowKey
        ? flowTextState.get(flowKey) ?? sanitizePdfValue(formData[valueKey])
        : fieldData.text
          ? sanitizePdfValue(fieldData.text)
          : sanitizePdfValue(formData[valueKey]);

      if (!rawValue) return;

      const pageIndex = Math.max(0, Number(fieldData.page || 1) - 1);
      const page = pages[pageIndex] || pages[0];
      const fontSize = Number(fieldData.fontSize || 10);
      const selectedFont = fieldData.unicode
        ? fieldData.bold
          ? unicodeFontBold
          : unicodeFont
        : fieldData.bold
          ? fontBold
          : font;
      const lineHeight = Number(fieldData.lineHeight || fontSize + 3);
      const valueX = Number(fieldData.valueX || fieldData.x || 0);

      if (fieldData.label) {
        page.drawText(fieldData.label, {
          x: Number(fieldData.x || 0),
          y: Number(fieldData.y || 0),
          size: fontSize,
          font: fontBold,
          color: rgb(0, 0, 0),
        });
      }

      const allLines = splitTextToLines(
        rawValue,
        selectedFont,
        fontSize,
        fieldData.maxWidth,
      );
      const maxLines = fieldData.maxLines || 6;
      const lines = allLines.slice(0, maxLines);

      if (flowKey) {
        flowTextState.set(flowKey, allLines.slice(maxLines).join(" "));
      }

      lines.forEach((line, index) => {
        page.drawText(line, {
          x: valueX,
          y: Number(fieldData.y || 0) - index * lineHeight,
          size: fontSize,
          font: selectedFont,
          color: rgb(0, 0, 0),
        });
      });
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename || template.downloadName}"`,
      },
    });
  } catch (error) {
    console.error("[fill-crm-document]", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate document" },
      { status: 500 },
    );
  }
}
