"use client";
import React, { useState } from "react";
import ContactForm from "../components/Contactform";

const steps = [
  {
    num: "1",
    title: "Get a Call Back",
    desc: ["Share your details", "Our team will guide you"],
  },
  {
    num: "2",
    title: "Token & KYC",
    desc: ["Pay ₹50,000 token amount", "Complete basic KYC"],
  },
  {
    num: "3",
    title: "Site Visit",
    desc: ["Schedule your visit"],
  },
  {
    num: "4",
    title: "Get Your Plot",
    desc: ["Pay in full within 45 days", "Get your plot registered"],
  },
];

export default function HowToBuy() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => setIsContactFormOpen(true);
  const closeContactForm = () => setIsContactFormOpen(false);

  return (
    <section className="bg-black py-[calc(2rem+2vw)] px-[clamp(1rem,5vw,2rem)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-[clamp(2rem,5vw,4rem)]">
          <p className="text-[#deae3c] uppercase tracking-[0.2em] text-[clamp(0.65rem,1.5vw,0.75rem)] font-semibold mb-3">
            Simple. Transparent. Guided.
          </p>
          <h2 className="text-white text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight">
            Buying Process
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(0.75rem,2vw,1rem)]">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative border border-white/10 p-[clamp(1.25rem,3vw,2rem)] hover:border-[#deae3c]/60 transition-colors duration-300 bg-black hover:bg-white/[0.03]"
            >
              {/* Step number */}
              <span className="block text-[#deae3c] text-[clamp(.8rem,2vw,1rem)] font-black leading-none mb-[clamp(1rem,2.5vw,1.5rem)] opacity-90 select-none">
                Step-{step.num}
              </span>

              {/* Gold divider */}
              <div className="w-8 h-[2px] bg-[#deae3c] mb-[clamp(0.75rem,2vw,1rem)]" />

              {/* Title */}
              <h3 className="text-white text-[clamp(0.95rem,1.8vw,1.125rem)] font-semibold leading-snug mb-[clamp(0.4rem,1vw,0.6rem)]">
                {step.title}
              </h3>

              {/* Description list */}
              <ul className="space-y-1">
                {step.desc.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-white/70 text-[clamp(0.75rem,1.3vw,0.825rem)] leading-snug"
                  >
                    <span className="mt-[0.35em] w-1 h-1 rounded-full bg-[#deae3c] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-white/40 text-[clamp(0.75rem,1.3vw,0.85rem)]"></p>
          <button
            onClick={openContactForm}
            className="self-start sm:self-auto bg-[#deae3c] hover:bg-[#c89b2e] text-black font-semibold rounded-lg text-[clamp(0.8rem,1.4vw,0.875rem)] px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.6rem,1.2vw,0.75rem)] transition-colors duration-200"
          >
            Get A Call Back
          </button>
        </div>
      </div>

      {isContactFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
          <div className="w-full max-w-md">
            <ContactForm onClose={closeContactForm} />
          </div>
        </div>
      )}
    </section>
  );
}