"use client";

import { useState } from "react";

// Predefined project options with codes
const PROJECT_OPTIONS = [
  { name: "WestWyn Residency", code: "WWR" },
  { name: "WestWyn Estates", code: "WWE" },
];

// Payment Receipt Fields with coordinates
const FIELDS = [
  { key: "receiptNumber",      label: "Receipt Number",        type: "text", placeholder: "e.g. REC-001" },
  { key: "receivedFrom",       label: "Received From",         type: "text", placeholder: "Client/Party name" },
  { key: "projectName",        label: "Project Name",          type: "dropdown" },
  { key: "plotNumber",         label: "Plot Number",           type: "text", placeholder: "e.g. Plot 123" },
  { key: "paymentDate",        label: "Payment Date",          type: "text", placeholder: "DD/MM/YYYY" },
  { key: "referenceNo",        label: "Reference No",          type: "text", placeholder: "e.g. TRANS-001" },
  { key: "modeOfPayment",      label: "Mode of Payment",       type: "text", placeholder: "e.g. Bank Transfer/Cash" },
  { key: "amountInNumbers",    label: "Amount (in numbers)",   type: "number", placeholder: "e.g. 50000" },
  { key: "amountInWords",      label: "Amount (in words)",     type: "text", readonly: true },
  { key: "remarks",            label: "Remarks",               type: "text", placeholder: "Optional remarks" },
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
  return result + ' Rupees Only';
};

export default function PaymentReceiptPage() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm((prev) => {
      const newForm = { ...prev, [name]: value };
      
      // Auto-convert amount in numbers to words
      if (name === "amountInNumbers") {
        const amount = parseFloat(value);
        if (amount && amount > 0) {
          newForm.amountInWords = numberToWords(amount);
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
    
    // Create filename: Payment Receipt_Unit_{plotNumber}_{projectCode}_{date}
    const filename = `Payment Receipt_Unit_${form.plotNumber}_${projectCode}_${formatDateForFilename(form.paymentDate)}.pdf`;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/fill-payment-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: form,
          coordinates: {
            receiptNumber: { page: 1, x: 171, y: 496, width: 116, height: 10 },
            receivedFrom: { page: 1, x: 416, y: 497, width: 141, height: 10 },
            projectName: { page: 1, x: 168, y: 462, width: 116, height: 10 },
            plotNumber: { page: 1, x: 407, y: 462, width: 145, height: 10 },
            paymentDate: { page: 1, x: 172, y: 428, width: 110, height: 9 },
            referenceNo: { page: 1, x: 414, y: 428, width: 135, height: 9 },
            modeOfPayment: { page: 1, x: 172, y: 393, width: 111, height: 10 },
            amountInNumbers: { page: 1, x: 414, y: 393, width: 134, height: 10 },
            amountInWords: { page: 1, x: 175, y: 357, width: 371, height: 12 },
            remarks: { page: 1, x: 174, y: 321, width: 382, height: 20 },
          }
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

  // Get project code for display
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

        {/* Form Fields */}
        <div className="space-y-5">
          {FIELDS.map(({ key, label, type, placeholder, readonly }) => (
            <div key={key}>
              <label className="block text-xs text-neutral-500 mb-1.5">
                {label}
                {!readonly && key !== "remarks" && (
                  <span className="ml-1 text-red-400 text-[10px]">*</span>
                )}
                {readonly && (
                  <span className="ml-2 text-amber-500 text-[10px]">(auto-calculated)</span>
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
            💡 <span className="font-semibold">How it works:</span> Enter amount in numbers and the amount in words will be automatically generated in Indian Rupees format.
          </p>
        </div>

        {/* Live Preview of Filename */}
        {form.plotNumber && form.projectName && form.paymentDate && (
          <div className="mt-4 p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg">
            <p className="text-xs text-neutral-500 mb-1">Preview PDF Name:</p>
            <p className="text-xs text-amber-400 font-mono break-all">
              Payment Receipt_Unit_{form.plotNumber}_{getProjectCode()}_{form.paymentDate.replace(/\//g, "")}.pdf
            </p>
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
{/* 
        <p className="text-center text-xs text-neutral-600 mt-4">
          PDF will be named: Payment Receipt_Unit_{{plot number}}_{{project code}}_{{date}}.pdf
        </p> */}
      </div>
    </main>
  );
}