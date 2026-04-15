"use client";

import { useState } from "react";

// Predefined project options with codes
const PROJECT_OPTIONS = [
  { name: "WestWyn Residency", code: "WWR" },
  { name: "WestWyn Estates", code: "WWE" },
];

// Adjusted coordinates based on your template layout
// These coordinates position text within the table cells properly
const COORDINATES = {
  receiptNumber: { page: 1, x: 175, y: 500, width: 100, fontSize: 9, align: "left" },
  receivedFrom: { page: 1, x: 420, y: 500, width: 130, fontSize: 9, align: "left" },
  projectName: { page: 1, x: 175, y: 465, width: 130, fontSize: 9, align: "left" },
  plotNumber: { page: 1, x: 420, y: 465, width: 100, fontSize: 9, align: "left" },
  paymentDate: { page: 1, x: 175, y: 430, width: 100, fontSize: 9, align: "left" },
  referenceNo: { page: 1, x: 420, y: 430, width: 130, fontSize: 9, align: "left" },
  modeOfPayment: { page: 1, x: 175, y: 395, width: 120, fontSize: 9, align: "left" },
  amountInNumbers: { page: 1, x: 420, y: 395, width: 130, fontSize: 9, align: "left" },
  amountInWords: { page: 1, x: 175, y: 360, width: 380, fontSize: 9, align: "left" },
  remarks: { page: 1, x: 175, y: 325, width: 380, fontSize: 9, align: "left" },
};

const FIELDS = [
  { key: "receiptNumber",      label: "Receipt Number",        type: "text", placeholder: "e.g. REC-001", maxLength: 15 },
  { key: "receivedFrom",       label: "Received From",         type: "text", placeholder: "Client/Party name", maxLength: 25 },
  { key: "projectName",        label: "Project Name",          type: "dropdown" },
  { key: "plotNumber",         label: "Plot Number",           type: "text", placeholder: "e.g. 202", maxLength: 10 },
  { key: "paymentDate",        label: "Payment Date",          type: "text", placeholder: "DD/MM/YYYY", maxLength: 10 },
  { key: "referenceNo",        label: "Reference No",          type: "text", placeholder: "e.g. TRANS-001", maxLength: 20 },
  { key: "modeOfPayment",      label: "Mode of Payment",       type: "text", placeholder: "e.g. UPI/Cash/Transfer", maxLength: 15 },
  { key: "amountInNumbers",    label: "Amount (in numbers)",   type: "number", placeholder: "e.g. 49999", maxLength: 10 },
  { key: "amountInWords",      label: "Amount (in words)",     type: "text", readonly: true },
  { key: "remarks",            label: "Remarks",               type: "text", placeholder: "Optional remarks", maxLength: 50 },
];

const defaultForm = Object.fromEntries(FIELDS.map((f) => [f.key, ""]));

// Convert number to words in Indian Rupees format
const numberToWords = (num) => {
  if (!num || num === 0) return "";
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const numToWords = (n) => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
    if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
    return numToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
  };
  
  const amount = Math.floor(num);
  const result = numToWords(amount);
  return result;
};


export default function PaymentReceiptPage() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlignment, setShowAlignment] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm((prev) => {
      const newForm = { ...prev, [name]: value };
      
      // Auto-convert amount in numbers to words
      if (name === "amountInNumbers") {
        const amount = parseFloat(value);
        if (amount && amount > 0) {
          const words = numberToWords(amount);
          newForm.amountInWords = words ? `${words} Rupees Only` : "";
        } else {
          newForm.amountInWords = "";
        }
      }
      
      return newForm;
    });
    
    setError("");
  };

  const handleSubmit = async () => {
    // Check required fields (excluding readonly fields)
    const requiredFields = FIELDS.filter(f => !f.readonly && f.key !== "remarks");
    const empty = requiredFields.filter((f) => !form[f.key]);
    
    if (empty.length) {
      setError(
        `Please fill all required fields. Missing: ${empty
          .map((f) => f.label)
          .join(", ")}`
      );
      return;
    }

    // Get project code for filename
    const selectedProject = PROJECT_OPTIONS.find(p => p.name === form.projectName);
    const projectCode = selectedProject ? selectedProject.code : "";
    
    // Format date for filename (DDMMYYYY)
    const formatDateForFilename = (dateStr) => {
      if (!dateStr) return "";
      return dateStr.replace(/\//g, "");
    };
    
    // Create filename
    const filename = `Payment Receipt_Unit_${form.plotNumber}_${projectCode}_${formatDateForFilename(form.paymentDate)}.pdf`;

    setLoading(true);
    setError("");

    try {
      // Apply offsets if in alignment mode
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

      // Prepare data with truncation
      const fieldLimits = {
        receiptNumber: 15,
        receivedFrom: 25,
        projectName: 20,
        plotNumber: 10,
        paymentDate: 10,
        referenceNo: 20,
        modeOfPayment: 15,
        amountInNumbers: 10,
        amountInWords: 60,
        remarks: 50,
      };

      const truncatedForm = {};
      for (const [key, value] of Object.entries(form)) {
        const limit = fieldLimits[key];
        truncatedForm[key] = value;
      }

      const res = await fetch("/api/fill-payment-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: truncatedForm,
          coordinates: adjustedCoordinates,
        }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({}));
        throw new Error(msg || "Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProjectCode = () => {
    const selectedProject = PROJECT_OPTIONS.find(p => p.name === form.projectName);
    return selectedProject ? selectedProject.code : "PROJECTCODE";
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-1">
            BookMyAssets
          </p>
          <h1 className="text-2xl font-bold">Payment Receipt Generator</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Fill in the payment details — amount in words will be auto-generated
          </p>
        </div>

        {/* Alignment Toggle */}
        <div className="mb-4 flex items-center justify-between p-3 bg-neutral-900/50 rounded-lg border border-neutral-800">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showAlignment}
              onChange={(e) => setShowAlignment(e.target.checked)}
              className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-amber-500"
            />
            <span>Fine-tune alignment</span>
          </label>
          {showAlignment && (
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <span className="text-xs text-neutral-500">X:</span>
                <input
                  type="number"
                  value={offsetX}
                  onChange={(e) => setOffsetX(parseInt(e.target.value) || 0)}
                  className="w-16 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-neutral-500">Y:</span>
                <input
                  type="number"
                  value={offsetY}
                  onChange={(e) => setOffsetY(parseInt(e.target.value) || 0)}
                  className="w-16 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {FIELDS.map(({ key, label, type, placeholder, readonly, maxLength }) => (
            <div key={key}>
              <label className="block text-xs text-neutral-500 mb-1.5">
                {label}
                {!readonly && key !== "remarks" && (
                  <span className="ml-1 text-red-400 text-[10px]">*</span>
                )}
                {readonly && (
                  <span className="ml-2 text-amber-500 text-[10px]">(auto-calculated)</span>
                )}
                {maxLength && !readonly && (
                  <span className="ml-2 text-neutral-600 text-[10px]">max {maxLength} chars</span>
                )}
              </label>
              
              {type === "dropdown" ? (
                <select
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
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
                  className={`w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors ${
                    readonly ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  placeholder={placeholder}
                  min={type === "number" ? "0" : undefined}
                  step={type === "number" ? "1" : undefined}
                />
              )}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-xs text-amber-400">
            💡 <span className="font-semibold">Note:</span> Text will be automatically truncated if it exceeds the available space in the PDF.
          </p>
        </div>

        {/* Live Preview */}
        {form.plotNumber && form.projectName && form.paymentDate && (
          <div className="mt-4 p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg">
            <p className="text-xs text-neutral-500 mb-1">Preview PDF Name:</p>
            <p className="text-xs text-amber-400 font-mono break-all">
              Payment Receipt_Unit_{form.plotNumber}_{getProjectCode()}_{form.paymentDate.replace(/\//g, "")}.pdf
            </p>
          </div>
        )}

        {/* Data Preview */}
        {form.receiptNumber && (
          <div className="mt-4 p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg">
            <p className="text-xs text-neutral-500 mb-2">Preview Data:</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Receipt No:</span>
                <span className="text-white">{form.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Received From:</span>
                <span className="text-white">{form.receivedFrom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Amount:</span>
                <span className="text-white">₹ {form.amountInNumbers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Amount in Words:</span>
                <span className="text-white text-right break-words max-w-[60%]">{form.amountInWords}</span>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-5 text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-7 w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:bg-amber-900 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-lg py-3 transition-colors"
        >
          {loading ? "Generating…" : "Generate & Download Payment Receipt"}
        </button>

      </div>
    </main>
  );
}