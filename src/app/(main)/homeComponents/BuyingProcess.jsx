"use client";
import React, { useState } from "react";
import ContactForm from "../components/Contactform";

const steps = [
  {
    num: "1",
    title: "Enquire & Get a Call Back",
    desc: "Get a quick call or video consultation Share your interest and budget to shortlist the right project, along with plan layout & pricing.",
  },
  {
    num: "2",
    title: "Reserve your Plot with a Token Amount",
    desc: "Secure your preferred plot with a ₹50,000 token and complete your kyc verification process.",
  },
  {
    num: "3",
    title: "Site Visit Assistance",
    desc: "Plan your site visit, guided by our team and get on-ground updates of Dholera.",
  },
  {
    num: "4",
    title: "Complete Payment & Get Your Plot Registry",
    desc: "Follow the Payment schedule and complete documentation with guided support and Own a plot in India's first Greenfield smart city.",
  },
];

export default function HowToBuy() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const openContactForm = (title, headline, btnName, type, project) => {;
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-[clamp(0.75rem,2vw,1rem)]">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="group relative  border border-white/10 p-[clamp(1.25rem,3vw,2rem)] hover:border-[#deae3c]/60 transition-colors duration-300 bg-black hover:bg-white/[0.03]"
            >
              {/* Step number */}
              <span className="block text-[#deae3c] text-[clamp(1.5rem,3vw,2rem)] font-black leading-none mb-[clamp(1rem,2.5vw,1.5rem)] opacity-90 select-none">
                Step-{step.num}
              </span>

              {/* Gold divider */}
              <div className="w-8 h-[2px] bg-[#deae3c] mb-[clamp(0.75rem,2vw,1rem)] " />

              {/* Title */}
              <h3 className="text-white text-[clamp(0.95rem,1.8vw,1.125rem)] font-semibold leading-snug mb-[clamp(0.5rem,1.2vw,0.75rem)]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-[clamp(0.8rem,1.4vw,0.9rem)] leading-relaxed">
                {step.desc}
              </p>

              {/* Corner accent on hover */}
              </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-white/40 text-[clamp(0.75rem,1.3vw,0.85rem)]"> 
         
          </p>
          <button
            onClick={() => openContactForm()}
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
