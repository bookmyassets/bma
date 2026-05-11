"use client";

import { useState, useEffect } from "react";

const PROJECT_OPTIONS = [
  { name: "WestWyn Residency", code: "WWR" },
  { name: "WestWyn Estates", code: "WWE" },
];

const COORDINATES = {
  receiptNumber: {
    page: 1,
    x: 175,
    y: 500,
    width: 100,
    fontSize: 9,
    align: "left",
  },
  receivedFrom: {
    page: 1,
    x: 420,
    y: 500,
    width: 130,
    fontSize: 9,
    align: "left",
  },
  projectName: {
    page: 1,
    x: 175,
    y: 465,
    width: 130,
    fontSize: 9,
    align: "left",
  },
  plotNumber: {
    page: 1,
    x: 420,
    y: 465,
    width: 100,
    fontSize: 9,
    align: "left",
  },
  paymentDate: {
    page: 1,
    x: 175,
    y: 430,
    width: 100,
    fontSize: 9,
    align: "left",
  },
  referenceNo: {
    page: 1,
    x: 420,
    y: 430,
    width: 130,
    fontSize: 9,
    align: "left",
  },
  modeOfPayment: {
    page: 1,
    x: 175,
    y: 395,
    width: 120,
    fontSize: 9,
    align: "left",
  },
  amountInNumbers: {
    page: 1,
    x: 420,
    y: 395,
    width: 130,
    fontSize: 9,
    align: "left",
  },
  amountInWords: {
    page: 1,
    x: 175,
    y: 360,
    width: 380,
    fontSize: 9,
    align: "left",
  },
  remarks: { page: 1, x: 175, y: 325, width: 380, fontSize: 9, align: "left" },
};

const FIELDS = [
  {
    key: "receiptNumber",
    label: "Receipt Number",
    type: "text",
    placeholder: "e.g. BMA/001/2026-27",
    maxLength: 30,
  },
  {
    key: "receivedFrom",
    label: "Received From",
    type: "text",
    placeholder: "Client/Party name",
    maxLength: 25,
  },
  { key: "projectName", label: "Project Name", type: "dropdown" },
  {
    key: "plotNumber",
    label: "Plot Number",
    type: "text",
    placeholder: "e.g. 202",
    maxLength: 10,
  },
  {
    key: "paymentDate",
    label: "Payment Date",
    type: "text",
    placeholder: "DD/MM/YYYY",
    maxLength: 10,
  },
  {
    key: "referenceNo",
    label: "Reference No",
    type: "text",
    placeholder: "e.g. TRANS-001",
    maxLength: 20,
  },
  {
    key: "modeOfPayment",
    label: "Mode of Payment",
    type: "text",
    placeholder: "e.g. UPI/Cash/Transfer",
    maxLength: 15,
  },
  {
    key: "amountInNumbers",
    label: "Amount (in numbers)",
    type: "text",
    placeholder: "e.g. 49,999",
    maxLength: 15,
  },
  {
    key: "amountInWords",
    label: "Amount (in words)",
    type: "text",
    readonly: true,
  },
  {
    key: "remarks",
    label: "Remarks",
    type: "text",
    placeholder: "Optional remarks",
    maxLength: 50,
  },
];

const defaultForm = Object.fromEntries(FIELDS.map((f) => [f.key, ""]));

const fetchReceiptCounter = async (projectName, paymentDate, signal) => {
  if (!projectName) {
    return { lastReceiptNumber: "", nextReceiptNumber: "" };
  }

  const params = new URLSearchParams({ projectName });
  if (paymentDate) {
    params.set("paymentDate", paymentDate);
  }

  const res = await fetch(`/api/fill-payment-receipt?${params.toString()}`, {
    signal,
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to load receipt counter");
  }

  return data;
};

// Convert number to words in Indian Rupees format
const numberToWords = (num) => {
  if (!num || num === 0) return "";

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

  const numToWords = (n) => {
    if (n < 20) return ones[n];
    if (n < 100)
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000)
      return (
        ones[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + numToWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        numToWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + numToWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        numToWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + numToWords(n % 100000) : "")
      );
    return (
      numToWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + numToWords(n % 10000000) : "")
    );
  };

  const cleanNumber = parseFloat(num.toString().replace(/[^0-9.]/g, ""));
  if (isNaN(cleanNumber)) return "";

  const amount = Math.floor(cleanNumber);
  const result = numToWords(amount);
  return result ? `${result} Rupees Only` : "";
};

// Format date to Indian format (e.g., 24 April 2026)
const formatIndianDate = (dateStr) => {
  if (!dateStr) return "";

  const parts = dateStr.split("/");
  if (parts.length !== 3) return dateStr;

  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const year = parseInt(parts[2]);

  const date = new Date(year, month, day);
  if (isNaN(date.getTime())) return dateStr;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${day} ${months[month]} ${year}`;
};

// Format number to Indian currency format (e.g., 49,999)
const formatIndianCurrency = (numStr) => {
  if (!numStr) return "";

  const cleanNum = numStr.toString().replace(/[^0-9.]/g, "");
  if (!cleanNum) return "";

  const num = parseFloat(cleanNum);
  if (isNaN(num)) return "";

  const integerPart = Math.floor(num).toString();
  const lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);
  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (otherNumbers ? "," : "") +
    lastThree;

  return formatted;
};

export default function PaymentReceiptPage() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlignment, setShowAlignment] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [lastReceiptNumber, setLastReceiptNumber] = useState("");

  // Fetch the project-specific receipt number and prefill the field.
  useEffect(() => {
    if (!form.projectName) {
      setLastReceiptNumber("");
      setForm((prev) =>
        prev.receiptNumber ? { ...prev, receiptNumber: "" } : prev,
      );
      return;
    }

    const controller = new AbortController();

    fetchReceiptCounter(form.projectName, form.paymentDate, controller.signal)
      .then(({ lastReceiptNumber, nextReceiptNumber }) => {
        setLastReceiptNumber(lastReceiptNumber || "");

        if (nextReceiptNumber) {
          setForm((prev) => ({
            ...prev,
            receiptNumber: nextReceiptNumber,
          }));
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, [form.projectName, form.paymentDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const newForm = { ...prev, [name]: value };

      if (name === "amountInNumbers") {
        newForm.amountInWords = numberToWords(value);
      }

      return newForm;
    });

    setError("");
  };

  const handleSubmit = async () => {
    const requiredFields = FIELDS.filter(
      (f) => !f.readonly && f.key !== "remarks",
    );
    const empty = requiredFields.filter((f) => !form[f.key]);

    if (empty.length) {
      setError(
        `Please fill all required fields. Missing: ${empty.map((f) => f.label).join(", ")}`,
      );
      return;
    }

    const selectedProject = PROJECT_OPTIONS.find(
      (p) => p.name === form.projectName,
    );
    const projectCode = selectedProject ? selectedProject.code : "";

    const formatDateForFilename = (dateStr) => {
      if (!dateStr) return "";
      return dateStr.replace(/\//g, "");
    };

    const formattedDate = formatIndianDate(form.paymentDate);
    const formattedAmount = formatIndianCurrency(form.amountInNumbers);
    const filename = `Payment Receipt_Unit_${form.plotNumber}_${projectCode}_${formatDateForFilename(form.paymentDate)}.pdf`;

    setLoading(true);
    setError("");

    try {
      let adjustedCoordinates = { ...COORDINATES };
      if (showAlignment) {
        adjustedCoordinates = Object.keys(COORDINATES).reduce((acc, key) => {
          acc[key] = {
            ...COORDINATES[key],
            x: COORDINATES[key].x + offsetX,
            y: COORDINATES[key].y + offsetY,
          };
          return acc;
        }, {});
      }

      const formattedFormData = {
        receiptNumber: form.receiptNumber, // stamped exactly as typed — no transformation
        receivedFrom: form.receivedFrom,
        projectName: form.projectName,
        plotNumber: form.plotNumber,
        paymentDate: formattedDate,
        referenceNo: form.referenceNo,
        modeOfPayment: form.modeOfPayment,
        amountInNumbers: `Rs. ${formattedAmount}`,
        amountInWords: form.amountInWords,
        remarks: form.remarks,
      };

      const res = await fetch("/api/fill-payment-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: formattedFormData,
          coordinates: adjustedCoordinates,
          paymentDate: form.paymentDate,
        }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({}));
        throw new Error(msg || "Failed to generate PDF");
      }

      // Update badge after successful generation
      setLastReceiptNumber(form.receiptNumber);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      const counter = await fetchReceiptCounter(
        form.projectName,
        form.paymentDate,
      );
      setLastReceiptNumber(counter.lastReceiptNumber || form.receiptNumber);
      if (counter.nextReceiptNumber) {
        setForm((prev) => ({
          ...prev,
          receiptNumber: counter.nextReceiptNumber,
        }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProjectCode = () => {
    const selectedProject = PROJECT_OPTIONS.find(
      (p) => p.name === form.projectName,
    );
    return selectedProject ? selectedProject.code : "PROJECTCODE";
  };

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <main className="min-h-screen bg-white text-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Header */}
          <div className="mb-8">
            <p className="text-base uppercase tracking-widest text-amber-500 font-semibold mb-1">
              BookMyAssets
            </p>
            <h1 className="text-2xl font-bold">Payment Receipt Generator</h1>
            <p className="text-base text-neutral-600 mt-1">
              Fill in the payment details — amount in words will be
              auto-generated
            </p>
          </div>

          {/* Last receipt number badge */}
          {lastReceiptNumber && (
            <div className="mb-5 flex items-center gap-2 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-600">
              <span>🧾 Last generated receipt:</span>
              <span className="font-mono font-semibold text-black">
                {lastReceiptNumber}
              </span>
            </div>
          )}

          {/* Alignment Toggle */}
          <div className="mb-4 flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-800">
            <label className="flex items-center gap-2 text-base">
              <input
                type="checkbox"
                checked={showAlignment}
                onChange={(e) => setShowAlignment(e.target.checked)}
                className="rounded bg-white border-neutral-700 text-amber-500 focus:ring-amber-500"
              />
              <span>Fine-tune alignment</span>
            </label>
            {showAlignment && (
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-base text-black">X:</span>
                  <input
                    type="number"
                    value={offsetX}
                    onChange={(e) => setOffsetX(parseInt(e.target.value) || 0)}
                    className="w-16 bg-white border border-neutral-700 rounded px-2 py-1 text-base"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base text-black">Y:</span>
                  <input
                    type="number"
                    value={offsetY}
                    onChange={(e) => setOffsetY(parseInt(e.target.value) || 0)}
                    className="w-16 bg-white border border-neutral-700 rounded px-2 py-1 text-base"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {FIELDS.map(
              ({ key, label, type, placeholder, readonly, maxLength }) => (
                <div key={key}>
                  <label className="block text-base text-black mb-1.5">
                    {label}
                    {!readonly && key !== "remarks" && (
                      <span className="ml-1 text-red-400 text-[10px]">*</span>
                    )}
                    {readonly && (
                      <span className="ml-2 text-amber-500 text-[10px]">
                        (auto-calculated)
                      </span>
                    )}
                    {maxLength && !readonly && (
                      <span className="ml-2 text-neutral-600 text-[10px]">
                        max {maxLength} chars
                      </span>
                    )}
                  </label>

                  {type === "dropdown" ? (
                    <select
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      className="w-full bg-white border border-neutral-800 rounded-lg px-3 py-2.5 text-base text-black focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="">Select project...</option>
                      {PROJECT_OPTIONS.map((project) => (
                        <option key={project.code} value={project.name}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      readOnly={readonly}
                      maxLength={maxLength}
                      className={`w-full bg-white border border-neutral-800 rounded-lg px-3 py-2.5 text-base text-black placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors ${
                        readonly ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      placeholder={placeholder}
                    />
                  )}
                </div>
              ),
            )}
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-base text-amber-400">
              💡 <span className="font-semibold">Note:</span>
            </p>
            <ul className="text-base text-amber-400 mt-2 space-y-1 list-disc list-inside">
              <li>Receipt number is stamped exactly as you type it</li>
              <li>Payment date will be formatted as: 24 April 2026</li>
              <li>Amount will be formatted in Indian currency: Rs. 49,999</li>
              <li>Amount in words auto-generates with "Rupees Only" suffix</li>
            </ul>
          </div>

          {/* Live Preview */}
          {(form.plotNumber ||
            form.projectName ||
            form.paymentDate ||
            form.receiptNumber ||
            form.amountInNumbers) && (
            <div className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
              <p className="text-base font-semibold text-black mb-3">
                Preview:
              </p>
              <div className="space-y-2 text-base">
                {form.receiptNumber && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Receipt Number:</span>
                    <span className="text-black font-mono">
                      {form.receiptNumber}
                    </span>
                  </div>
                )}
                {form.paymentDate && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Payment Date:</span>
                    <span className="text-black">
                      {formatIndianDate(form.paymentDate)}
                    </span>
                  </div>
                )}
                {form.amountInNumbers && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Amount:</span>
                    <span className="text-black font-semibold">
                      Rs. {formatIndianCurrency(form.amountInNumbers)}
                    </span>
                  </div>
                )}
                {form.amountInWords && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Amount in Words:</span>
                    <span className="text-black text-right break-words max-w-[60%]">
                      {form.amountInWords}
                    </span>
                  </div>
                )}
                {form.plotNumber && form.projectName && (
                  <div className="flex justify-between pt-2 border-t border-neutral-200">
                    <span className="text-neutral-600">PDF Filename:</span>
                    <span className="text-amber-600 font-mono text-sm break-all text-right max-w-[60%]">
                      Payment Receipt_Unit_{form.plotNumber}_{getProjectCode()}_
                      {form.paymentDate?.replace(/\//g, "") || ""}.pdf
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 text-base text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-7 w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:bg-amber-900 disabled:cursor-not-allowed text-black font-semibold text-base rounded-lg py-3 transition-colors"
          >
            {loading ? "Generating…" : "Generate & Download Payment Receipt"}
          </button>
        </div>
      </main>
    </>
  );
}
