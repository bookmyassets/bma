import React, { useState } from "react";
import GetinTouch from "../components/GetinTouch";

const helpVerify = [
  "Title review & approval status",
  "Government approval documents",
  "Registry process guidance",
  "Plot layout & zone maps",
  "Due diligence documentation review",
];

const inspectBefore = [
  "Micro-location map",
  "Plot layout document",
  "Legal checklist",
  "Registry steps walkthrough",
  "Booking process explained",
];

const steps = [
  {
    num: 1,
    title: "Enquiry",
    desc: "Submit your details",
  },
  {
    num: 2,
    title: "Price & Map",
    desc: "Receive price sheet & location map",
  },
  {
    num: 3,
    title: "Doc Review",
    desc: "Review documents & site visit",
  },
  {
    num: 4,
    title: "Booking",
    desc: "Book with registry support",
  },
];

export default function LegalClarity() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");

  const openContactForm = (title) => {
    setFormTitle(title);
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <>
      <section
        className="w-full py-8 px-4 md:px-10 lg:px-20"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="max-w-7xl mx-auto space-y-4">

          {/* ── Header ── */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "#ddbc69" }}
            >
              Legal Clarity & Documentation Support
            </h2>
            <p className="text-sm md:text-base text-gray-400">
              Before you enquire, here is what you can review and what we support.
            </p>
          </div>

          {/* ── Two Cards ── */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Card 1 */}
            <div
              className="rounded-2xl p-6 md:p-8 space-y-4"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(222,174,60,0.2)",
              }}
            >
              <h3
                className="text-base md:text-lg font-semibold"
                style={{ color: "#ddbc69" }}
              >
                What we help verify
              </h3>
              <ul className="space-y-3">
                {helpVerify.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: "rgba(222,174,60,0.15)",
                        color: "#ddbc69",
                      }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 */}
            <div
              className="rounded-2xl p-6 md:p-8 space-y-4"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3 className="text-base md:text-lg font-semibold text-white">
                What you can inspect before booking
              </h3>
              <ul className="space-y-3">
                {inspectBefore.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "#ffffff",
                      }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Process Strip ── */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#ddbc69" }}
            >
              Process — Enquiry to Registry
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {steps.map((step, index) => (
                <div key={step.num} className="flex flex-col gap-2">

                  {/* Step number + connector line */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        backgroundColor: "#ddbc69",
                        color: "#111111",
                      }}
                    >
                      {step.num}
                    </div>
                    {/* connector — hidden on last item and on mobile */}
                    {index < steps.length - 1 && (
                      <div
                        className="hidden md:block flex-1 h-px"
                        style={{ backgroundColor: "rgba(222,174,60,0.25)" }}
                      />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 leading-snug mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div>
            <button
              onClick={() => openContactForm("Get Legal Checklist")}
              className="text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#ddbc69",
                color: "#111111",
              }}
            >
              Get Legal Checklist
            </button>
          </div>

        </div>
      </section>

      {/* ── Popup ── */}
      {isContactFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000] p-4">
          <div className="w-full max-w-md">
            <GetinTouch onClose={closeContactForm} title={formTitle} buttonName="Get A Call Back    " />
          </div>
        </div>
      )}
    </>
  );
}
