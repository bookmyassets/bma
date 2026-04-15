"use client";

import { useState } from "react";

// Predefined project options
const PROJECT_OPTIONS = ["WestWyn Residency", "WestWyn Estates"];

// Token Amount (₹50,000) is pre-printed in the PDF — not editable
const FIELDS = [
  {
    key: "projectName",
    label: "Project Name",
    section: "Client Details",
    type: "dropdown",
  },
  {
    key: "clientName",
    label: "Client Name",
    section: "Client Details",
    type: "text",
  },
  {
    key: "plotNumber",
    label: "Plot Number",
    section: "Client Details",
    type: "text",
  },
  {
    key: "tokenPaymentDueDate",
    label: "Token Payment Due Date",
    section: "Token Details",
    type: "text",
  },
  {
    key: "paymentPlanDays",
    label: "Payment Plan Days",
    section: "Payment Plan",
    type: "number",
    placeholder: "e.g. 90",
  },
  {
    key: "m1DueTimeline",
    label: "Due Timeline",
    section: "Milestone 1",
    type: "text",
    readonly: true,
  },
  {
    key: "m1PaymentDueDate",
    label: "Payment Due Date",
    section: "Milestone 1",
    type: "text",
    readonly: true,
  },
  {
    key: "m2DueTimeline",
    label: "Due Timeline",
    section: "Milestone 2",
    type: "text",
    readonly: true,
  },
  {
    key: "m2PaymentDueDate",
    label: "Payment Due Date",
    section: "Milestone 2",
    type: "text",
    readonly: true,
  },
  {
    key: "m3DueTimeline",
    label: "Due Timeline",
    section: "Milestone 3",
    type: "text",
    readonly: true,
  },
  {
    key: "m3PaymentDueDate",
    label: "Payment Due Date",
    section: "Milestone 3",
    type: "text",
    readonly: true,
  },
  {
    key: "totalDueTimeline",
    label: "Due Timeline",
    section: "Total",
    type: "text",
    readonly: true,
  },
  {
    key: "totalPaymentDueDate",
    label: "Payment Due Date",
    section: "Total",
    type: "text",
    readonly: true,
  },
];

const SECTIONS = [...new Set(FIELDS.map((f) => f.section))];
const defaultForm = Object.fromEntries(FIELDS.map((f) => [f.key, ""]));

// Helper function to add days to a date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Parse date from DD/MM/YYYY string
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // Months are 0-indexed
  const year = parseInt(parts[2]);
  return new Date(year, month, day);
};

// Format date as DD/MM/YYYY
const formatDateForInput = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Calculate all dates based on token date and payment plan days
const calculateDates = (tokenDateStr, totalDays) => {
  if (!tokenDateStr || !totalDays || totalDays <= 0) {
    return {
      m1DueTimeline: "",
      m1PaymentDueDate: "",
      m2DueTimeline: "",
      m2PaymentDueDate: "",
      m3DueTimeline: "",
      m3PaymentDueDate: "",
      totalDueTimeline: "",
      totalPaymentDueDate: "",
    };
  }

  const tokenDate = parseDate(tokenDateStr);
  if (!tokenDate) return {};

  const intervalDays = Math.floor(totalDays / 3);

  // Calculate milestone dates
  const m1Date = addDays(tokenDate, intervalDays);
  const m2Date = addDays(tokenDate, intervalDays * 2);
  const m3Date = addDays(tokenDate, intervalDays * 3);
  const totalDate = addDays(tokenDate, totalDays);

  // Format due timelines
  const formatTimeline = (days) => `${days} days`;

  return {
    m1DueTimeline: formatTimeline(intervalDays),
    m1PaymentDueDate: formatDateForInput(m1Date),
    m2DueTimeline: formatTimeline(intervalDays),
    m2PaymentDueDate: formatDateForInput(m2Date),
    m3DueTimeline: formatTimeline(intervalDays),
    m3PaymentDueDate: formatDateForInput(m3Date),
    totalDueTimeline: formatTimeline(totalDays),
    totalPaymentDueDate: formatDateForInput(totalDate),
  };
};

export default function PaymentSchedulePage() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const newForm = { ...prev, [name]: value };

      // Auto-calculate dates when token date or payment plan days change
      if (name === "tokenPaymentDueDate" || name === "paymentPlanDays") {
        const tokenDate =
          name === "tokenPaymentDueDate" ? value : newForm.tokenPaymentDueDate;
        const planDays =
          name === "paymentPlanDays"
            ? parseInt(value)
            : parseInt(newForm.paymentPlanDays);

        if (tokenDate && planDays && planDays > 0) {
          const calculatedDates = calculateDates(tokenDate, planDays);
          Object.assign(newForm, calculatedDates);
        } else {
          // Clear calculated fields if inputs are invalid
          const clearedFields = {
            m1DueTimeline: "",
            m1PaymentDueDate: "",
            m2DueTimeline: "",
            m2PaymentDueDate: "",
            m3DueTimeline: "",
            m3PaymentDueDate: "",
            totalDueTimeline: "",
            totalPaymentDueDate: "",
          };
          Object.assign(newForm, clearedFields);
        }
      }

      return newForm;
    });

    setError("");
  };

  const handleSubmit = async () => {
    // Check required fields (excluding auto-calculated ones)
    const requiredFields = FIELDS.filter(
      (f) =>
        !f.readonly &&
        f.key !== "m1DueTimeline" &&
        f.key !== "m2DueTimeline" &&
        f.key !== "m3DueTimeline" &&
        f.key !== "totalDueTimeline" &&
        f.key !== "m1PaymentDueDate" &&
        f.key !== "m2PaymentDueDate" &&
        f.key !== "m3PaymentDueDate" &&
        f.key !== "totalPaymentDueDate",
    );

    const empty = requiredFields.filter((f) => !form[f.key]);
    if (empty.length) {
      setError(
        `Please fill all required fields. Missing: ${empty
          .map((f) => `${f.section} › ${f.label}`)
          .join(", ")}`,
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/fill-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({}));
        throw new Error(msg || "Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Payment-Schedule-Unit-${form.plotNumber}-${form.projectName}-${form.paymentPlanDays}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <meta name="robots" content="noindex, nofollow"/>
      <main className="min-h-screen bg-neutral-950 text-white  flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Header */}
          <div className="mb-8 pt-16">
            <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-1">
              BookMyAssets
            </p>
            <h1 className="text-2xl font-bold">Payment Schedule Generator</h1>
            <p className="text-sm text-neutral-400 mt-1">
              Set token payment date and payment plan days — milestone dates
              will auto-calculate
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-7">
            {SECTIONS.map((section) => {
              const sectionFields = FIELDS.filter((f) => f.section === section);
              return (
                <div key={section}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                      {section}
                    </span>
                    <span className="flex-1 border-t border-neutral-800" />
                  </div>

                  <div
                    className={`grid gap-3 ${
                      sectionFields.length === 2 ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {sectionFields.map(
                      ({
                        key,
                        label,
                        type = "text",
                        placeholder,
                        readonly,
                      }) => (
                        <div key={key}>
                          <label className="block text-xs text-neutral-500 mb-1.5">
                            {label}
                            {readonly && (
                              <span className="ml-2 text-amber-500 text-[10px]">
                                (auto-calculated)
                              </span>
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
                                <option key={project} value={project}>
                                  {project}
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
                              placeholder={
                                placeholder ||
                                (type === "text" && key.includes("Date")
                                  ? "DD/MM/YYYY"
                                  : "Enter value")
                              }
                              className={`w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors ${
                                readonly ? "opacity-70 cursor-not-allowed" : ""
                              }`}
                              min={type === "number" ? "1" : undefined}
                              step={type === "number" ? "1" : undefined}
                            />
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-xs text-amber-400">
              💡 <span className="font-semibold">How it works:</span> Enter
              Token Payment Due Date (DD/MM/YYYY) and Payment Plan Days. The
              total days will be divided into 3 equal intervals to calculate all
              milestone due dates automatically.
            </p>
          </div>

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
            {loading ? "Generating…" : "Generate & Download PDF"}
          </button>

          <p className="text-center text-xs text-neutral-600 mt-4">
            Token Amount (₹50,000) is pre-filled in the template
          </p>
        </div>
      </main>
    </>
  );
}
