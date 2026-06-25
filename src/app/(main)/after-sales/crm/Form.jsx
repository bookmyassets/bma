"use client";

import { useEffect, useMemo, useState } from "react";

const PROJECT_OPTIONS = [
  { name: "WestWyn Residency", code: "WWR" },
  { name: "WestWyn Estates", code: "WWE" },
];

const DOCUMENT_OPTIONS = [
  { id: "welcome-letter", label: "Welcome Letter" },
  { id: "plot-details", label: "Plot Details" },
  { id: "allotment-letter", label: "Allotment Letter" },
  { id: "payment-receipt", label: "Payment Receipt" },
  { id: "token-receipt", label: "Token Receipt" },
];

const DOCUMENT_WORKFLOWS = {
  "welcome-letter": {
    label: "Welcome Letter",
    description: "Generate welcome letter, plot details, and allotment letter.",
    documents: ["welcome-letter", "plot-details", "allotment-letter"],
  },
  "payment-receipt": {
    label: "Payment Receipt",
    description: "Generate payment receipt separately.",
    documents: ["payment-receipt"],
  },
  "token-receipt": {
    label: "Token Receipt",
    description: "Generate token receipt separately.",
    documents: ["token-receipt"],
  },
};

const DOCUMENT_FIELD_REQUIREMENTS = {
  "welcome-letter": {
    client: ["name", "phone", "email", "address"],
    booking: ["projectName", "plotNumber", "bookingDate"],
    receipt: [],
  },
  "plot-details": {
    client: ["name", "phone", "email"],
    booking: [
      "projectName",
      "plotNumber",
      "plotArea",
      "paymentSchedule",
      "associateName",
      "bookingDate",
    ],
    receipt: [],
  },
  "allotment-letter": {
    client: ["name"],
    booking: ["projectName", "plotNumber", "plotArea", "totalConsideration"],
    receipt: [],
  },
  "payment-receipt": {
    client: ["name"],
    booking: ["projectName", "plotNumber"],
    receipt: [
      "receiptNumber",
      "paymentDate",
      "referenceNo",
      "modeOfPayment",
      "amountInNumbers",
      "remarks",
    ],
  },
  "token-receipt": {
    client: ["name"],
    booking: ["projectName", "plotNumber"],
    receipt: [
      "receiptNumber",
      "paymentDate",
      "referenceNo",
      "modeOfPayment",
      "amountInNumbers",
      "remarks",
    ],
  },
};

const CLIENT_FIELD_LABELS = {
  name: "name",
  phone: "phone",
  email: "email",
  address: "address",
};

const BOOKING_FIELD_LABELS = {
  projectName: "Project name",
  plotNumber: "Plot number",
  plotArea: "Plot area",
  totalConsideration: "Total consideration",
  paymentSchedule: "Payment schedule",
  associateName: "Associate name",
  bookingDate: "Booking date",
};

const RECEIPT_FIELD_LABELS = {
  receiptNumber: "Receipt number",
  paymentDate: "Payment date",
  referenceNo: "Reference number",
  modeOfPayment: "Mode of payment",
  amountInNumbers: "Amount",
  remarks: "Remarks",
};

const EMPTY_CLIENT = {
  salutation: "Mr.",
  name: "",
  phone: "",
  email: "",
  address: "",
};

const INITIAL_BOOKING = {
  projectName: "",
  plotNumber: "",
  plotArea: "",
  totalConsideration: "",
  paymentSchedule: "",
  associateName: "",
  bookingDate: "",
  bookingAmount: "",
  projectAdvisor: "",
};

const INITIAL_RECEIPT = {
  receiptNumber: "",
  paymentDate: "",
  referenceNo: "",
  modeOfPayment: "",
  amountInNumbers: "",
  remarks: "",
};

const RECEIPT_COORDINATES = {
  receiptNumber: { page: 1, x: 175, y: 502, fontSize: 10 },
  receivedFrom: { page: 1, x: 420, y: 502, fontSize: 10 },
  projectName: { page: 1, x: 175, y: 468, fontSize: 10 },
  plotNumber: { page: 1, x: 420, y: 468, fontSize: 10 },
  paymentDate: { page: 1, x: 175, y: 435, fontSize: 10 },
  referenceNo: { page: 1, x: 420, y: 435, fontSize: 10 },
  modeOfPayment: { page: 1, x: 175, y: 400, fontSize: 10 },
  amountInNumbers: { page: 1, x: 420, y: 400, fontSize: 10 },
  amountInWords: { page: 1, x: 175, y: 364, fontSize: 10 },
  remarks: { page: 1, x: 175, y: 331, fontSize: 10 },
};

const TOKEN_COORDINATES = {
  receiptNumber: { page: 1, x: 175, y: 502, fontSize: 10 },
  receivedFrom: { page: 1, x: 420, y: 502, fontSize: 10 },
  projectName: { page: 1, x: 175, y: 468, fontSize: 10 },
  plotNumber: { page: 1, x: 420, y: 468, fontSize: 10 },
  paymentDate: { page: 1, x: 175, y: 435, fontSize: 10 },
  referenceNo: { page: 1, x: 420, y: 435, fontSize: 10 },
  modeOfPayment: { page: 1, x: 175, y: 400, fontSize: 10 },
  amountInNumbers: { page: 1, x: 420, y: 400, fontSize: 10 },
  amountInWords: { page: 1, x: 175, y: 364, fontSize: 10 },
  remarks: { page: 1, x: 175, y: 331, fontSize: 10 },
};

const RECEIPT_DOCUMENT_IDS = ["payment-receipt", "token-receipt"];
const RECEIPT_DOCUMENT_COORDINATES = {
  "payment-receipt": RECEIPT_COORDINATES,
  "token-receipt": TOKEN_COORDINATES,
};

const DOCUMENT_COORDINATES = {
  "welcome-letter": {
    client1To: {
      text: "To,",
      requiredKey: "client1Name",
      page: 1,
      x: 36,
      y: 612,
      fontSize: 10,
      maxLines: 1,
    },
    client1Name: {
      key: "client1FullName",
      page: 1,
      x: 36,
      y: 592,
      fontSize: 10,
      bold: true,
      maxWidth: 222,
      maxLines: 1,
    },
    client1Phone: {
      label: "Contact Number:",
      page: 1,
      x: 36,
      valueX: 119,
      y: 561,
      fontSize: 10,
      maxWidth: 103,
      maxLines: 1,
    },
    client1Email: {
      label: "Email ID:",
      page: 1,
      x: 36,
      valueX: 81,
      y: 540,
      fontSize: 10,
      maxWidth: 184,
      maxLines: 1,
    },
    client1AddressLine1: {
      label: "Address:",
      key: "client1Address",
      flowKey: "client1Address",
      page: 1,
      x: 36,
      valueX: 81,
      y: 519,
      fontSize: 10,
      maxWidth: 222,
      lineHeight: 12,
      maxLines: 1,
    },
    client1AddressLine2: {
      key: "client1Address",
      flowKey: "client1Address",
      page: 1,
      x: 36,
      y: 505,
      fontSize: 10,
      maxWidth: 267,
      lineHeight: 14,
      maxLines: 2,
    },
    client2To: {
      text: "To,",
      requiredKey: "client2Name",
      page: 1,
      x: 331,
      y: 611,
      fontSize: 10,
      maxLines: 1,
    },
    client2Name: {
      key: "client2FullName",
      page: 1,
      x: 331,
      y: 591,
      fontSize: 10,
      bold: true,
      maxWidth: 232,
      maxLines: 1,
    },
    client2Phone: {
      label: "Contact Number:",
      page: 1,
      x: 331,
      valueX: 412,
      y: 561,
      fontSize: 10,
      maxWidth: 132,
      maxLines: 1,
    },
    client2Email: {
      label: "Email ID:",
      page: 1,
      x: 331,
      valueX: 374,
      y: 539,
      fontSize: 10,
      maxWidth: 190,
      maxLines: 1,
    },
    client2AddressLine1: {
      label: "Address:",
      key: "client2Address",
      flowKey: "client2Address",
      page: 1,
      x: 331,
      valueX: 375,
      y: 518,
      fontSize: 10,
      maxWidth: 188,
      lineHeight: 12,
      maxLines: 1,
    },
    client2AddressLine2: {
      key: "client2Address",
      flowKey: "client2Address",
      page: 1,
      x: 331,
      y: 504,
      fontSize: 10,
      maxWidth: 240,
      lineHeight: 14,
      maxLines: 2,
    },
    dearLine: {
      key: "welcomeGreeting",
      page: 1,
      x: 36,
      y: 438,
      fontSize: 10,
      bold: true,
      maxLines: 1,
    },
    thankLine: {
      text: "Thank you for choosing BookMyAssets.",
      page: 1,
      x: 36,
      y: 418,
      fontSize: 10,
      maxLines: 1,
    },
    welcomeParagraph: {
      page: 1,
      x: 36,
      y: 394,
      fontSize: 10,
      lineHeight: 14,
      maxWidth: 537,
      segments: [
        { text: "We are happy to welcome you to " },
        { key: "projectName", bold: true },
        { text: ", Dholera", bold: true },
        {
          text: ". Your association with us is important, and we are committed to making your experience smooth, clear, and well-supported.",
        },
      ],
    },
    detailsIntro: {
      text: "We are pleased to share your booking details:",
      page: 1,
      x: 36,
      y: 343,
      fontSize: 10,
      maxLines: 1,
    },
    projectName: {
      label: "Project Name:",
      page: 1,
      x: 36,
      valueX: 121,
      y: 322,
      fontSize: 10,
      maxWidth: 452,
      maxLines: 1,
    },
    plotNumber: {
      label: "Plot Number:",
      page: 1,
      x: 36,
      valueX: 121,
      y: 304,
      fontSize: 10,
      maxWidth: 452,
      maxLines: 1,
    },
    bookingDate: {
      label: "Booking Date:",
      page: 1,
      x: 36,
      valueX: 121,
      y: 284,
      fontSize: 10,
      maxWidth: 452,
      maxLines: 1,
    },
    closingParagraph: {
      text: "Thank you for placing your trust in us. We are committed to supporting you with documentation, project updates, and complete customer assistance throughout your ownership journey.",
      page: 1,
      x: 36,
      y: 250,
      fontSize: 10,
      lineHeight: 14,
      maxWidth: 537,
    },
  },
  "plot-details": {
    clientNames: {
      page: 1,
      x: 311,
      y: 581,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
    client1Phone: {
      page: 1,
      x: 311,
      y: 542,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
    client1Email: {
      page: 1,
      x: 311,
      y: 502,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
    bookingDate: {
      page: 1,
      x: 311,
      y: 463,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
    projectName: {
      page: 1,
      x: 311,
      y: 424,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
    plotNumber: {
      page: 1,
      x: 311,
      y: 385,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
    plotArea: {
      page: 1,
      x: 311,
      y: 347,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
    plotAreaSqFeet: {
      page: 1,
      x: 311,
      y: 307,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
    paymentSchedule: {
      page: 1,
      x: 311,
      y: 268,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
    associateName: {
      page: 1,
      x: 311,
      y: 229,
      fontSize: 12,
      maxWidth: 218,
      maxLines: 1,
    },
  },
  "allotment-letter": {
    allotmentClientNames: {
      page: 1,
      x: 49,
      y: 604,
      fontSize: 12,
      bold: true,
      maxWidth: 154,
      maxLines: 1,
    },
    date: {
      page: 1,
      x: 441,
      y: 613,
      fontSize: 12,
      maxWidth: 116,
      maxLines: 1,
    },
    dearLine: {
      key: "welcomeGreeting",
      page: 1,
      x: 50,
      y: 540,
      fontSize: 12,
      bold: true,
      maxWidth: 149,
      maxLines: 1,
    },
    allotmentBody: {
      page: 1,
      x: 70,
      y: 490,
      fontSize: 12,
      lineHeight: 18,
      maxWidth: 445,
      segments: [
        { text: "This is to confirm provisional allotment of " },
        { text: "Plot No. ", bold: true },
        { key: "plotNumber", bold: true },
        { text: ", " },
        { key: "plotAreaSqYardsText", bold: true },
        { text: "  at " },
        { key: "projectName", bold: true },
        {
          text: ", subject to receipt of payments as per the attached payment schedule and compliance with all booking terms.",
        },
      ],
    },
    plotConsideration: {
      page: 1,
      x: 347,
      y: 380,
      fontSize: 12,
      maxWidth: 166,
      maxLines: 1,
      unicode: true,
    },
  },
};

function cleanFilePart(value) {
  return (value || "document")
    .toString()
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function getActiveClients(clients, clientCount) {
  return clients.slice(0, Number(clientCount));
}

function getFullName(client) {
  return [client.salutation, client.name].filter(Boolean).join(" ").trim();
}

function getClientName(client) {
  return (client.name || "").trim();
}

function getGreetingTitle(client) {
  return client.salutation === "Mr." ? "Sir" : "Ma'am";
}

function getWelcomeGreeting(clients) {
  const titles = [...new Set(clients.map(getGreetingTitle))];

  return `Dear ${titles.join("/")},`;
}

function getRequiredFieldSets(documentIds) {
  const fieldSets = {
    client: new Set(),
    booking: new Set(),
    receipt: new Set(),
  };

  documentIds.forEach((documentId) => {
    const requirements = DOCUMENT_FIELD_REQUIREMENTS[documentId];

    if (!requirements) return;

    requirements.client.forEach((field) => fieldSets.client.add(field));
    requirements.booking.forEach((field) => fieldSets.booking.add(field));
    requirements.receipt.forEach((field) => fieldSets.receipt.add(field));
  });

  return fieldSets;
}

function formatDateSlash(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  if (!year || !month || !day) return dateValue;
  return `${day}/${month}/${year}`;
}

function formatDisplayDate(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  if (!year || !month || !day) return dateValue;

  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

async function fetchReceiptCounter(projectName, paymentDate, signal) {
  if (!projectName) {
    return { lastReceiptNumber: "", nextReceiptNumber: "" };
  }

  const params = new URLSearchParams({ projectName });

  if (paymentDate) {
    params.set("paymentDate", paymentDate);
  }

  const response = await fetch(
    `/api/fill-payment-receipt?${params.toString()}`,
    {
      signal,
    },
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load receipt counter");
  }

  return data;
}

function formatIndianCurrency(value) {
  if (!value) return "";

  const cleanValue = value.toString().replace(/[^0-9.]/g, "");
  if (!cleanValue) return "";

  const amount = Number(cleanValue);
  if (Number.isNaN(amount)) return "";

  return Math.floor(amount).toLocaleString("en-IN");
}

function calculateSqFeetFromSqYards(value) {
  const cleanValue = value?.toString().replace(/[^0-9.]/g, "");
  if (!cleanValue) return "";

  const sqYards = Number(cleanValue);
  if (Number.isNaN(sqYards)) return "";

  const sqFeet = sqYards * 9;

  return Number.isInteger(sqFeet)
    ? sqFeet.toLocaleString("en-IN")
    : sqFeet.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function formatPlotAreaSqYards(value) {
  const cleanValue = value?.toString().replace(/[^0-9.]/g, "");
  if (!cleanValue) return "";

  const sqYards = Number(cleanValue);
  if (Number.isNaN(sqYards)) return "";

  const formattedArea = Number.isInteger(sqYards)
    ? sqYards.toLocaleString("en-IN")
    : sqYards.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return `${formattedArea} sq. yds`;
}

function formatTotalConsideration(value) {
  const cleanValue = value?.toString().replace(/[^0-9.]/g, "");
  if (!cleanValue) return value || "";

  const amount = Number(cleanValue);
  if (Number.isNaN(amount)) return value || "";

  const formattedAmount = Number.isInteger(amount)
    ? amount.toLocaleString("en-IN")
    : amount.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return `₹ ${formattedAmount}`;
}

function numberToWords(value) {
  const cleanValue = value?.toString().replace(/[^0-9.]/g, "");
  if (!cleanValue) return "";

  const amount = Math.floor(Number(cleanValue));
  if (!amount || Number.isNaN(amount)) return "";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const toWords = (num) => {
    if (num < 20) return ones[num];
    if (num < 100) {
      return (
        tens[Math.floor(num / 10)] + (num % 10 ? ` ${ones[num % 10]}` : "")
      );
    }
    if (num < 1000) {
      return `${ones[Math.floor(num / 100)]} Hundred${
        num % 100 ? ` ${toWords(num % 100)}` : ""
      }`;
    }
    if (num < 100000) {
      return `${toWords(Math.floor(num / 1000))} Thousand${
        num % 1000 ? ` ${toWords(num % 1000)}` : ""
      }`;
    }
    if (num < 10000000) {
      return `${toWords(Math.floor(num / 100000))} Lakh${
        num % 100000 ? ` ${toWords(num % 100000)}` : ""
      }`;
    }
    return `${toWords(Math.floor(num / 10000000))} Crore${
      num % 10000000 ? ` ${toWords(num % 10000000)}` : ""
    }`;
  };

  return `${toWords(amount)} Rupees Only`;
}

function downloadUrl(url, filename) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export default function Form() {
  const [activeTool, setActiveTool] = useState("");
  const [clientCount, setClientCount] = useState("1");
  const [clients, setClients] = useState([
    { ...EMPTY_CLIENT },
    { ...EMPTY_CLIENT, salutation: "Ms." },
  ]);
  const [booking, setBooking] = useState(INITIAL_BOOKING);
  const [receipt, setReceipt] = useState(INITIAL_RECEIPT);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [error, setError] = useState("");
  const [lastReceiptNumber, setLastReceiptNumber] = useState("");

  const selectedProject = useMemo(
    () =>
      PROJECT_OPTIONS.find((project) => project.name === booking.projectName),
    [booking.projectName],
  );

  const amountInWords = useMemo(
    () => numberToWords(receipt.amountInNumbers || booking.bookingAmount),
    [booking.bookingAmount, receipt.amountInNumbers],
  );
  const activeWorkflow = DOCUMENT_WORKFLOWS[activeTool];
  const requiredFields = useMemo(
    () => getRequiredFieldSets(selectedDocuments),
    [selectedDocuments],
  );
  const hasClientFields = requiredFields.client.size > 0;
  const hasBookingFields = requiredFields.booking.size > 0;
  const hasReceiptFields = requiredFields.receipt.size > 0;
  const hasReceiptDocument = selectedDocuments.some((documentId) =>
    RECEIPT_DOCUMENT_IDS.includes(documentId),
  );
  const showSalutationFields = !hasReceiptDocument;

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  useEffect(() => {
    if (!hasReceiptDocument || !booking.projectName) {
      setLastReceiptNumber("");
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({ projectName: booking.projectName });
    const paymentDate = formatDateSlash(receipt.paymentDate);

    if (paymentDate) {
      params.set("paymentDate", paymentDate);
    }

    fetchReceiptCounter(
      booking.projectName,
      params.get("paymentDate"),
      controller.signal,
    )
      .then(({ lastReceiptNumber, nextReceiptNumber }) => {
        setLastReceiptNumber(lastReceiptNumber || "");
        if (nextReceiptNumber) {
          setReceipt((current) => ({
            ...current,
            receiptNumber: nextReceiptNumber,
          }));
        }
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message);
        }
      });

    return () => controller.abort();
  }, [booking.projectName, hasReceiptDocument, receipt.paymentDate]);

  const updateClient = (index, field, value) => {
    setClients((current) =>
      current.map((client, clientIndex) =>
        clientIndex === index ? { ...client, [field]: value } : client,
      ),
    );
    setError("");
  };

  const updateBooking = (field, value) => {
    setBooking((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const updateReceipt = (field, value) => {
    setReceipt((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const selectWorkflow = (workflowId) => {
    const workflow = DOCUMENT_WORKFLOWS[workflowId];

    if (!workflow) return;

    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    setActiveTool(workflowId);
    setSelectedDocuments(workflow.documents);
    setPreviews([]);
    setError("");
  };

  const toggleSelectedDocument = (documentId) => {
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    setSelectedDocuments((current) => {
      const nextDocuments = new Set(current);

      if (nextDocuments.has(documentId)) {
        nextDocuments.delete(documentId);
      } else {
        nextDocuments.add(documentId);
      }

      return activeWorkflow.documents.filter((id) => nextDocuments.has(id));
    });
    setPreviews([]);
    setError("");
  };

  const returnToDashboard = () => {
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    setActiveTool("");
    setSelectedDocuments([]);
    setPreviews([]);
    setError("");
  };

  const getDocumentLabel = (documentId) =>
    DOCUMENT_OPTIONS.find((document) => document.id === documentId)?.label ||
    documentId;

  const buildPayload = () => {
    const activeClients = getActiveClients(clients, clientCount);
    const clientNames = activeClients.map(getFullName).filter(Boolean);
    const receiptClientNames = activeClients.map(getClientName).filter(Boolean);
    const allotmentClientNames = activeClients
      .map((client) => client.name)
      .filter(Boolean)
      .join(" & ");
    const [client1 = EMPTY_CLIENT, client2 = EMPTY_CLIENT] = activeClients;
    const hasClient2 = activeClients.length > 1;

    return {
      date: formatDisplayDate(new Date().toISOString().slice(0, 10)),
      clientCount,
      clientNames: clientNames.join(" and "),
      receiptClientNames: receiptClientNames.join(" and "),
      allotmentClientNames,
      welcomeGreeting: activeClients.length
        ? getWelcomeGreeting(activeClients)
        : "",
      salutationLine: clientNames.length
        ? `Dear ${clientNames.join(" and ")},`
        : "",
      client1FullName: getFullName(client1),
      client1Name: client1.name,
      client1Phone: client1.phone,
      client1Email: client1.email,
      client1Address: client1.address,
      client2FullName: hasClient2 ? getFullName(client2) : "",
      client2Name: hasClient2 ? client2.name : "",
      client2Phone: hasClient2 ? client2.phone : "",
      client2Email: hasClient2 ? client2.email : "",
      client2Address: hasClient2 ? client2.address : "",
      projectName: booking.projectName,
      projectCode: selectedProject?.code || "",
      plotNumber: booking.plotNumber,
      plotArea: booking.plotArea,
      plotAreaSqYardsText: formatPlotAreaSqYards(booking.plotArea),
      plotAreaSqFeet: calculateSqFeetFromSqYards(booking.plotArea),
      plotConsideration: formatTotalConsideration(booking.totalConsideration),
      totalConsideration: booking.totalConsideration,
      paymentSchedule: booking.paymentSchedule,
      associateName: booking.associateName,
      bookingDate: formatDisplayDate(booking.bookingDate),
      bookingAmount: booking.bookingAmount
        ? `Rs. ${formatIndianCurrency(booking.bookingAmount)}`
        : "",
      bookingAmountInWords: numberToWords(booking.bookingAmount),
      projectAdvisor: booking.projectAdvisor,
    };
  };

  const buildReceiptData = (payload) => ({
    receiptNumber: receipt.receiptNumber,
    receivedFrom: payload.receiptClientNames,
    projectName: booking.projectName,
    plotNumber: booking.plotNumber,
    paymentDate: formatDisplayDate(receipt.paymentDate),
    referenceNo: receipt.referenceNo,
    modeOfPayment: receipt.modeOfPayment,
    amountInNumbers: receipt.amountInNumbers
      ? `Rs. ${formatIndianCurrency(receipt.amountInNumbers)}`
      : "",
    amountInWords,
    remarks: receipt.remarks,
  });

  const getFilename = (documentId) => {
    const label = cleanFilePart(getDocumentLabel(documentId));
    const plot = cleanFilePart(booking.plotNumber || "unit");
    const project = cleanFilePart(selectedProject?.code || booking.projectName);

    if (RECEIPT_DOCUMENT_IDS.includes(documentId)) {
      const date = formatDateSlash(receipt.paymentDate).replace(/\//g, "");
      return `${label}-Unit-${plot}-${project}-${date || "date"}.pdf`;
    }

    return `${label}-Unit-${plot}-${project}.pdf`;
  };

  const validate = () => {
    const activeClients = getActiveClients(clients, clientCount);
    const missingClients = activeClients.flatMap((client, index) =>
      Object.entries(CLIENT_FIELD_LABELS)
        .map(([field, label]) =>
          requiredFields.client.has(field) && !client[field]
            ? `Client ${index + 1} ${label}`
            : "",
        )
        .filter(Boolean),
    );
    const missingBooking = Object.entries(BOOKING_FIELD_LABELS)
      .map(([field, label]) =>
        requiredFields.booking.has(field) && !booking[field] ? label : "",
      )
      .filter(Boolean);
    const missingReceipt = Object.entries(RECEIPT_FIELD_LABELS)
      .map(([field, label]) =>
        requiredFields.receipt.has(field) && !receipt[field] ? label : "",
      )
      .filter(Boolean);

    const missing = [
      ...missingClients,
      ...missingBooking,
      ...missingReceipt,
      selectedDocuments.length === 0 ? "At least one document" : "",
    ].filter(Boolean);

    if (missing.length) {
      setError(`Missing required fields: ${missing.join(", ")}`);
      return false;
    }

    return true;
  };

  const requestDocument = async (documentId, payload, saveCounter = false) => {
    const filename = getFilename(documentId);
    const isReceipt = RECEIPT_DOCUMENT_IDS.includes(documentId);
    const response = await fetch(
      isReceipt ? "/api/fill-payment-receipt" : "/api/fill-crm-document",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isReceipt
            ? {
                documentType: documentId,
                formData: buildReceiptData(payload),
                coordinates: RECEIPT_DOCUMENT_COORDINATES[documentId],
                filename,
                paymentDate: formatDateSlash(receipt.paymentDate),
                saveCounter,
              }
            : {
                documentType: documentId,
                formData: payload,
                coordinates: DOCUMENT_COORDINATES[documentId],
                filename,
              },
        ),
      },
    );

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(
        data.error || `Failed to generate ${getDocumentLabel(documentId)}`,
      );
    }

    return {
      blob: await response.blob(),
      filename,
    };
  };

  const handlePreview = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setError("");
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    setPreviews([]);

    try {
      const payload = buildPayload();
      const generated = [];

      for (const documentId of selectedDocuments) {
        const { blob, filename } = await requestDocument(
          documentId,
          payload,
          false,
        );
        generated.push({
          documentId,
          label: getDocumentLabel(documentId),
          filename,
          url: URL.createObjectURL(blob),
        });
      }

      setPreviews(generated);
    } catch (previewError) {
      setError(previewError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalDownload = async () => {
    if (!previews.length) return;

    setFinalizing(true);
    setError("");

    try {
      const payload = buildPayload();

      for (const preview of previews) {
        if (RECEIPT_DOCUMENT_IDS.includes(preview.documentId)) {
          const { blob, filename } = await requestDocument(
            preview.documentId,
            payload,
            true,
          );
          const url = URL.createObjectURL(blob);
          downloadUrl(url, filename);
          URL.revokeObjectURL(url);
          continue;
        }

        downloadUrl(preview.url, preview.filename);
      }

      if (hasReceiptDocument) {
        const counter = await fetchReceiptCounter(
          booking.projectName,
          formatDateSlash(receipt.paymentDate),
        );

        setLastReceiptNumber(
          counter.lastReceiptNumber || receipt.receiptNumber,
        );
        if (counter.nextReceiptNumber) {
          setReceipt((current) => ({
            ...current,
            receiptNumber: counter.nextReceiptNumber,
          }));
        }
      }
    } catch (downloadError) {
      setError(downloadError.message);
    } finally {
      setFinalizing(false);
    }
  };

  if (!activeWorkflow) {
    return (
      <main className="min-h-screen bg-[#151f28] px-[clamp(1rem,4vw,3rem)] py-[clamp(5rem,8vw,7rem)] text-white">
        <div className="mx-auto max-w-[64rem]">
          <div className="mb-[clamp(1.5rem,3vw,2.5rem)]">
            <p className="mb-[0.5rem] text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#ddbc69]">
              After Sales
            </p>
            <h1 className="text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.1]">
              CRM Document Generator
            </h1>
          </div>

          <div className="grid gap-[1rem] md:grid-cols-2">
            {Object.entries(DOCUMENT_WORKFLOWS).map(
              ([workflowId, workflow]) => (
                <button
                  key={workflowId}
                  type="button"
                  onClick={() => selectWorkflow(workflowId)}
                  className="rounded-lg border border-white/10 bg-[#1a2733] p-[clamp(1rem,2vw,1.5rem)] text-left transition hover:border-[#ddbc69]/60 hover:bg-[#203140]"
                >
                  <span className="block text-[clamp(1.125rem,2vw,1.5rem)] font-semibold text-white">
                    {workflow.label}
                  </span>
                  <span className="mt-[0.5rem] block text-[0.9375rem] leading-[1.6] text-white/65">
                    {workflow.description}
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#151f28] px-[clamp(1rem,4vw,3rem)] py-[clamp(5rem,8vw,7rem)] text-white">
      <div className="mx-auto max-w-[76rem]">
        <div className="mb-[clamp(1.5rem,3vw,2.5rem)]">
          <p className="mb-[0.5rem] text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#ddbc69]">
            After Sales
          </p>
          <div className="flex flex-wrap items-center justify-between gap-[1rem]">
            <h1 className="text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.1]">
              {activeWorkflow.label}
            </h1>
            <button
              type="button"
              onClick={returnToDashboard}
              className="rounded-lg border border-white/15 px-[1rem] py-[0.625rem] text-[0.875rem] font-semibold text-white/80 transition hover:border-[#ddbc69]/60 hover:text-[#ddbc69]"
            >
              Back To Dashboard
            </button>
          </div>
        </div>

        <form
          onSubmit={handlePreview}
          className="grid gap-[clamp(1rem,2vw,2rem)] xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)]"
        >
          <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
            {hasClientFields && (
              <section className="rounded-lg border border-white/10 bg-[#1a2733] p-[clamp(1rem,2vw,1.5rem)]">
                <div className="mb-[1rem] flex flex-wrap items-center justify-between gap-[0.75rem]">
                  <h2 className="text-[clamp(1.125rem,2vw,1.5rem)] font-semibold">
                    Client Details
                  </h2>
                  <div className="inline-flex rounded-lg border border-white/15 bg-white/5 p-[0.25rem]">
                    {["1", "2"].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setClientCount(count)}
                        className={`rounded-md px-[0.875rem] py-[0.5rem] text-[0.875rem] font-medium transition ${
                          clientCount === count
                            ? "bg-[#ddbc69] text-black"
                            : "text-white/75 hover:bg-white/10"
                        }`}
                      >
                        {count} Client{count === "2" ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-[1rem] lg:grid-cols-2">
                  {getActiveClients(clients, clientCount).map(
                    (client, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-white/10 bg-white/[0.03] p-[1rem]"
                      >
                        <h3 className="mb-[0.875rem] text-[1rem] font-semibold text-white">
                          Client {index + 1}
                        </h3>
                        <div className="grid gap-[0.875rem]">
                          {showSalutationFields &&
                            requiredFields.client.has("name") && (
                              <label className="grid gap-[0.375rem] text-[0.875rem] text-white/75">
                                Salutation
                                <select
                                  value={client.salutation}
                                  onChange={(event) =>
                                    updateClient(
                                      index,
                                      "salutation",
                                      event.target.value,
                                    )
                                  }
                                  className="rounded-lg border border-white/15 bg-[#101820] px-[0.75rem] py-[0.625rem] text-white outline-none focus:border-[#ddbc69]"
                                >
                                  <option value="Mr.">Mr.</option>
                                  <option value="Ms.">Ms.</option>
                                  <option value="Mrs.">Mrs.</option>
                                </select>
                              </label>
                            )}
                          {requiredFields.client.has("name") && (
                            <Input
                              label="Name"
                              value={client.name}
                              onChange={(value) =>
                                updateClient(index, "name", value)
                              }
                            />
                          )}
                          {requiredFields.client.has("phone") && (
                            <Input
                              label="Phone"
                              value={client.phone}
                              onChange={(value) =>
                                updateClient(index, "phone", value)
                              }
                            />
                          )}
                          {requiredFields.client.has("email") && (
                            <Input
                              label="Email"
                              type="email"
                              value={client.email}
                              onChange={(value) =>
                                updateClient(index, "email", value)
                              }
                            />
                          )}
                          {requiredFields.client.has("address") && (
                            <Textarea
                              label="Address"
                              value={client.address}
                              onChange={(value) =>
                                updateClient(index, "address", value)
                              }
                            />
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}

            {hasBookingFields && (
              <section className="rounded-lg border border-white/10 bg-[#1a2733] p-[clamp(1rem,2vw,1.5rem)]">
                <h2 className="mb-[1rem] text-[clamp(1.125rem,2vw,1.5rem)] font-semibold">
                  Plot And Booking Details
                </h2>
                <div className="grid gap-[1rem] md:grid-cols-2">
                  {requiredFields.booking.has("projectName") && (
                    <label className="grid gap-[0.375rem] text-[0.875rem] text-white/75">
                      Project Name
                      <select
                        value={booking.projectName}
                        onChange={(event) =>
                          updateBooking("projectName", event.target.value)
                        }
                        className="rounded-lg border border-white/15 bg-[#101820] px-[0.75rem] py-[0.625rem] text-white outline-none focus:border-[#ddbc69]"
                      >
                        <option value="">Select project</option>
                        {PROJECT_OPTIONS.map((project) => (
                          <option key={project.code} value={project.name}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  {requiredFields.booking.has("plotNumber") && (
                    <Input
                      label="Plot Number"
                      value={booking.plotNumber}
                      onChange={(value) => updateBooking("plotNumber", value)}
                    />
                  )}
                  {requiredFields.booking.has("plotArea") && (
                    <Input
                      label="Plot Area (sq yards)"
                      value={booking.plotArea}
                      onChange={(value) => updateBooking("plotArea", value)}
                    />
                  )}
                  {requiredFields.booking.has("totalConsideration") && (
                    <Input
                      label="Total Consideration"
                      value={booking.totalConsideration}
                      onChange={(value) =>
                        updateBooking("totalConsideration", value)
                      }
                    />
                  )}
                  {requiredFields.booking.has("paymentSchedule") && (
                    <Input
                      label="Payment Schedule"
                      value={booking.paymentSchedule}
                      onChange={(value) =>
                        updateBooking("paymentSchedule", value)
                      }
                    />
                  )}
                  {requiredFields.booking.has("associateName") && (
                    <Input
                      label="Associate Name"
                      value={booking.associateName}
                      onChange={(value) =>
                        updateBooking("associateName", value)
                      }
                    />
                  )}
                  {requiredFields.booking.has("bookingDate") && (
                    <Input
                      label="Booking Date"
                      type="date"
                      value={booking.bookingDate}
                      onChange={(value) => updateBooking("bookingDate", value)}
                    />
                  )}
                </div>
              </section>
            )}

            {hasReceiptFields && (
              <section className="rounded-lg border border-white/10 bg-[#1a2733] p-[clamp(1rem,2vw,1.5rem)]">
                <h2 className="mb-[1rem] text-[clamp(1.125rem,2vw,1.5rem)] font-semibold">
                  Receipt Details
                </h2>
                {lastReceiptNumber && (
                  <div className="mb-[1rem] rounded-lg border border-[#ddbc69]/30 bg-[#ddbc69]/10 px-[0.875rem] py-[0.625rem] text-[0.875rem] text-[#ddbc69]">
                    Last generated receipt:{" "}
                    <span className="font-mono font-semibold">
                      {lastReceiptNumber}
                    </span>
                  </div>
                )}
                <div className="grid gap-[1rem] md:grid-cols-2">
                  {requiredFields.receipt.has("receiptNumber") && (
                    <Input
                      label="Receipt Number"
                      value={receipt.receiptNumber}
                      onChange={(value) =>
                        updateReceipt("receiptNumber", value)
                      }
                    />
                  )}
                  {requiredFields.receipt.has("paymentDate") && (
                    <Input
                      label="Payment Date"
                      type="date"
                      value={receipt.paymentDate}
                      onChange={(value) => updateReceipt("paymentDate", value)}
                    />
                  )}
                  {requiredFields.receipt.has("referenceNo") && (
                    <Input
                      label="Reference Number"
                      value={receipt.referenceNo}
                      onChange={(value) => updateReceipt("referenceNo", value)}
                    />
                  )}
                  {requiredFields.receipt.has("modeOfPayment") && (
                    <Input
                      label="Mode Of Payment"
                      value={receipt.modeOfPayment}
                      onChange={(value) =>
                        updateReceipt("modeOfPayment", value)
                      }
                    />
                  )}
                  {requiredFields.receipt.has("amountInNumbers") && (
                    <Input
                      label="Amount"
                      value={receipt.amountInNumbers}
                      onChange={(value) =>
                        updateReceipt("amountInNumbers", value)
                      }
                    />
                  )}
                  {requiredFields.receipt.has("amountInNumbers") && (
                    <Input
                      label="Amount In Words"
                      value={amountInWords}
                      readOnly
                    />
                  )}
                  {requiredFields.receipt.has("remarks") && (
                    <div className="md:col-span-2">
                      <Input
                        label="Remarks"
                        value={receipt.remarks}
                        onChange={(value) => updateReceipt("remarks", value)}
                      />
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-[clamp(1rem,2vw,1.5rem)]">
            <section className="rounded-lg border border-white/10 bg-[#1a2733] p-[clamp(1rem,2vw,1.5rem)]">
              <h2 className="mb-[1rem] text-[clamp(1.125rem,2vw,1.5rem)] font-semibold">
                Selected Workflow
              </h2>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-[0.875rem] py-[0.75rem]">
                <p className="text-[0.9375rem] font-semibold text-white">
                  {activeWorkflow.label}
                </p>
                <p className="mt-[0.25rem] text-[0.8125rem] leading-[1.5] text-white/55">
                  {activeWorkflow.description}
                </p>
              </div>
              <div className="mt-[0.75rem] space-y-[0.5rem]">
                {activeWorkflow.documents.map((documentId) => (
                  <label
                    key={documentId}
                    className="flex cursor-pointer items-center gap-[0.625rem] rounded-lg border border-white/10 bg-white/[0.03] px-[0.875rem] py-[0.625rem] text-[0.875rem] text-white/80 transition hover:border-[#ddbc69]/50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(documentId)}
                      onChange={() => toggleSelectedDocument(documentId)}
                      className="h-[1rem] w-[1rem] accent-[#ddbc69]"
                    />
                    {getDocumentLabel(documentId)}
                  </label>
                ))}
              </div>

              {error && (
                <div className="mt-[1rem] rounded-lg border border-red-500/30 bg-red-500/10 px-[0.875rem] py-[0.75rem] text-[0.875rem] text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-[1rem] w-full rounded-lg bg-[#ddbc69] px-[1rem] py-[0.875rem] text-[0.9375rem] font-semibold text-black transition hover:bg-[#f1cf78] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Preparing Preview..."
                  : "Preview Selected Documents"}
              </button>

              <button
                type="button"
                onClick={handleFinalDownload}
                disabled={!previews.length || finalizing}
                className="mt-[0.75rem] w-full rounded-lg border border-[#ddbc69]/50 px-[1rem] py-[0.875rem] text-[0.9375rem] font-semibold text-[#ddbc69] transition hover:bg-[#ddbc69]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {finalizing ? "Downloading..." : "Confirm And Download"}
              </button>
            </section>

            <section className="rounded-lg border border-white/10 bg-[#1a2733] p-[clamp(1rem,2vw,1.5rem)]">
              <h2 className="mb-[1rem] text-[clamp(1.125rem,2vw,1.5rem)] font-semibold">
                Preview
              </h2>
              {previews.length ? (
                <div className="space-y-[1rem]">
                  {previews.map((preview) => (
                    <div
                      key={preview.documentId}
                      className="overflow-hidden rounded-lg border border-white/10 bg-white"
                    >
                      <div className="flex items-center justify-between gap-[0.75rem] border-b border-black/10 bg-neutral-100 px-[0.75rem] py-[0.5rem] text-black">
                        <span className="text-[0.875rem] font-semibold">
                          {preview.label}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            downloadUrl(preview.url, preview.filename)
                          }
                          className="rounded-md border border-black/15 px-[0.625rem] py-[0.375rem] text-[0.75rem] font-semibold hover:bg-black/5"
                        >
                          Download Preview
                        </button>
                      </div>
                      <iframe
                        src={preview.url}
                        title={`${preview.label} preview`}
                        className="h-[28rem] w-full"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-white/20 px-[1rem] py-[2rem] text-center text-[0.9375rem] text-white/55">
                  No preview generated yet.
                </div>
              )}
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}

function Input({ label, value, onChange, type = "text", readOnly = false }) {
  return (
    <label className="grid gap-[0.375rem] text-[0.875rem] text-white/75">
      {label}
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(event) => onChange?.(event.target.value)}
        className={`rounded-lg border border-white/15 bg-[#101820] px-[0.75rem] py-[0.625rem] text-white outline-none transition focus:border-[#ddbc69] ${
          readOnly ? "cursor-not-allowed opacity-70" : ""
        }`}
      />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="grid gap-[0.375rem] text-[0.875rem] text-white/75">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="rounded-lg border border-white/15 bg-[#101820] px-[0.75rem] py-[0.625rem] text-white outline-none transition focus:border-[#ddbc69]"
      />
    </label>
  );
}
