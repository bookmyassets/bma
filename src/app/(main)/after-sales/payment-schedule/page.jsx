"use client";

import { useState } from "react";

const PROJECT_OPTIONS = ["WestWyn Residency", "WestWyn Estates"];

const PROJECT_ABBREVIATIONS = {
  "WestWyn Residency": "WWR",
  "WestWyn Estates": "WWE",
};

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

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  return new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0]),
  );
};

const formatDateForInput = (date) => {
  if (!date) return "";
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
};

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
  
  // Alternative: Distribute remainder more evenly
  const baseInterval = Math.floor(totalDays / 3);
  const remainder = totalDays % 3;
  
  let m1Days = baseInterval;
  let m2Days = baseInterval;
  let m3Days = baseInterval;
  
  // Distribute remainder days starting from earliest milestones
  if (remainder === 1) {
    m1Days += 1;
  } else if (remainder === 2) {
    m1Days += 1;
    m2Days += 1;
  }
  
  const m1Cumulative = m1Days;
  const m2Cumulative = m1Days + m2Days;
  const m3Cumulative = m1Days + m2Days + m3Days;
  
  return {
    m1DueTimeline: `${m1Days} days`,
    m1PaymentDueDate: formatDateForInput(addDays(tokenDate, m1Cumulative)),
    m2DueTimeline: `${m2Days} days`,
    m2PaymentDueDate: formatDateForInput(addDays(tokenDate, m2Cumulative)),
    m3DueTimeline: `${m3Days} days`,
    m3PaymentDueDate: formatDateForInput(addDays(tokenDate, m3Cumulative)),
    totalDueTimeline: `${totalDays} days`,
    totalPaymentDueDate: formatDateForInput(addDays(tokenDate, totalDays)),
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
      if (name === "tokenPaymentDueDate" || name === "paymentPlanDays") {
        const tokenDate =
          name === "tokenPaymentDueDate" ? value : newForm.tokenPaymentDueDate;
        const planDays = parseInt(
          name === "paymentPlanDays" ? value : newForm.paymentPlanDays,
        );
        if (tokenDate && planDays && planDays > 0) {
          Object.assign(newForm, calculateDates(tokenDate, planDays));
        } else {
          Object.assign(newForm, {
            m1DueTimeline: "",
            m1PaymentDueDate: "",
            m2DueTimeline: "",
            m2PaymentDueDate: "",
            m3DueTimeline: "",
            m3PaymentDueDate: "",
            totalDueTimeline: "",
            totalPaymentDueDate: "",
          });
        }
      }
      return newForm;
    });
    setError("");
  };

  const handleSubmit = async () => {
    const requiredFields = FIELDS.filter((f) => !f.readonly);
    const empty = requiredFields.filter((f) => !form[f.key]);
    if (empty.length) {
      setError(
        `Please fill all required fields. Missing: ${empty.map((f) => `${f.section} › ${f.label}`).join(", ")}`,
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
      a.download = `Payment-Schedule-Unit-${form.plotNumber}-${PROJECT_ABBREVIATIONS[form.projectName] || form.projectName}-${form.paymentPlanDays}.pdf`;
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
      <meta name="robots" content="noindex, nofollow" />
      <main className="min-h-screen bg-white text-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="mb-8 pt-16">
            <p className="text-base uppercase tracking-widest text-amber-500 font-semibold mb-1">
              BookMyAssets
            </p>
            <h1 className="text-2xl font-bold">Payment Schedule Generator</h1>
            <p className="text-base text-black mt-1">
              Set token payment date and payment plan days — milestone dates
              will auto-calculate
            </p>
          </div>

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
                    className={`grid gap-3 ${sectionFields.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
                  >
                    {sectionFields.map(
                      ({
                        key,
                        label,
                        type = "text",
                        placeholder,
                        readonly,
                      }) => {
                        // ✅ Bold only the Total section's Payment Due Date
                        const isTotalDueDate =
                          section === "Total" && key === "totalPaymentDueDate";
                        return (
                          <div key={key}>
                            <label
                              className={`block text-base text-black mb-1.5 ${isTotalDueDate ? "font-bold" : ""}`}
                            >
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
                                className="w-full bg-white border border-neutral-800 rounded-lg px-3 py-2.5 text-base text-black focus:outline-none focus:border-amber-500 transition-colors"
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
                                className={`w-full bg-white border border-neutral-800 rounded-lg px-3 py-2.5 text-base text-black placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors ${readonly ? "opacity-70 cursor-not-allowed" : ""} ${isTotalDueDate ? "font-bold" : ""}`}
                                min={type === "number" ? "1" : undefined}
                                step={type === "number" ? "1" : undefined}
                              />
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-base text-amber-400">
              💡 <span className="font-semibold">How it works:</span> Enter
              Token Payment Due Date (DD/MM/YYYY) and Payment Plan Days. The
              total days will be divided into 3 equal intervals to calculate all
              milestone due dates automatically.
            </p>
          </div>

          {error && (
            <div className="mt-5 text-base text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-7 w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:bg-amber-900 disabled:cursor-not-allowed text-black font-semibold text-base rounded-lg py-3 transition-colors"
          >
            {loading ? "Generating…" : "Generate & Download PDF"}
          </button>

          <p className="text-center text-base text-neutral-600 mt-4">
            Token Amount (₹50,000) is pre-filled in the template
          </p>
        </div>
      </main>
    </>
  );
}

