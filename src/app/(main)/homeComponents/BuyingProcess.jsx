"use client";
import React, { useState } from "react";
import ContactForm from "../components/Contactform";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

const steps = [
  {
    num: "1",
    title: "Connect with Our RM",
    desc: ["Get Project Details"],
  },
  {
    num: "2",
    title: "Book Your Plot",
    desc: ["Pay Booking Amount ₹50,000", "Complete KYC"],
  },
  {
    num: "3",
    title: "Complete Payment",
    desc: ["Complete Your Payment in 15 days", "Get Your Plot Registry"],
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
          <h2 className="text-white mb-2 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2]">
            Buying Process
          </h2>
          <p className="text-[#ddbc69] uppercase tracking-[0.2em] text-[0.875rem] font-normal leading-[1.5] mb-3">
            Simple. Transparent. Guided.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3  gap-[clamp(0.75rem,2vw,1rem)]">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative border p-[clamp(1.25rem,3vw,2rem)] border-[#ddbc69] transition-colors duration-300 bg-black hover:bg-white/[0.03]"
            >
              {/* Step number */}
              <span className="block text-[#ddbc69] text-[0.875rem] font-semibold leading-[1.5] mb-[clamp(1rem,2.5vw,1.5rem)] opacity-90 select-none">
                Step-{step.num}
              </span>

              {/* Gold divider */}
              <div className="w-8 h-[2px] bg-[#ddbc69] mb-[clamp(0.75rem,2vw,1rem)]" />

              {/* Title */}
              <h3 className="text-white text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.35] mb-[clamp(0.4rem,1vw,0.6rem)]">
                {step.title}
              </h3>

              {/* Description list */}
              <ul className="grid grid-cols-1 gap-x-2 gap-y-1">
                {step.desc.map((point, i) => {
                  const isLastOdd =
                    step.desc.length % 2 !== 0 && i === step.desc.length - 1;
                  return (
                    <li
                      key={i}
                      className={`flex items-center gap-1.5 text-white/70 text-[0.875rem] font-normal leading-[1.5] ${
                        isLastOdd ? "col-span-2" : ""
                      }`}
                    >
                      <span className="mt-[0.35em] w-1 h-1 rounded-full bg-[#ddbc69] shrink-0" />
                      {point}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-white/40 text-[clamp(0.75rem,1.3vw,0.85rem)]"></p>
          <Link
            href="https://wa.me/918130371647"
            className="flex justify-center items-center gap-2 self-start sm:self-auto bg-[#ddbc69] hover:bg-[#c89b2e] text-black font-semibold rounded-lg text-[0.875rem] md:text-[1rem] leading-[1.4] px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.6rem,1.2vw,0.75rem)] transition-colors duration-200"
          >
            {/* <FaWhatsapp className="w-6 h-6"/> */} Connect with Our RM
          </Link>
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
