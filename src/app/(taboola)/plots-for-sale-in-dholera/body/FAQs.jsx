"use client";

import { useId, useState } from "react";
import { Plus, Minus, MessageCircleQuestion, Phone, Headset } from "lucide-react";

const faqs = [
  {
    question: " Is WestWyn Residency a near Dholera SIR plot project in Dholera?",
    answer:
      "Yes, WestWyn Residency is a near Dholera SIR plotted project in Dholera with registry-ready plots and clear documentation.",
  },
  {
    question: "Where is WestWyn Residency located?",
    answer:
      "WestWyn Residency is located in Pipariya, Dholera, near the Dholera SIR boundary.",
  },
  {
    question: "Is this suitable for long-term investors?",
    answer:
      "Yes, this opportunity is primarily designed for buyers exploring long-term plotted investment options in Dholera rather than short-term gains.",
  },
  {
    question: "Can I review project layout and location before deciding?",
    answer:
      "Yes, our team provides complete assistance in understanding:\n• Project layout\n• Plot positioning\n• Location insights\nbefore you make any decision.",
  },
  {
    question: "Can I schedule a site visit?",
    answer:
      "Yes, BookMyAssets offers year-round site visit support along with step-by-step guidance based on your interest and availability.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionId = useId();

  const handleCallClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "call_click_Faq", lead_type: "phone", device: "all" });
  };

  return (
    <section aria-labelledby={`${sectionId}-heading`} className="bg-[#faf9f5] px-4 py-6 text-[14px] md:text-[16px] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
        <div>
          <h2 id={`${sectionId}-heading`} className="text-[28px] font-bold leading-tight tracking-tight text-[#ddbc69] sm:text-[34px] lg:text-[38px]">FAQs</h2>
          <div className="mt-4 rounded-2xl border border-[#e7dfce] bg-white p-3 sm:p-4">
            <div className="flex items-center gap-2 font-semibold text-[#263b30]"><Headset aria-hidden="true" size={19} strokeWidth={1.6} className="text-[#a78337]" />Still have a question?</div>
            <a href="tel:+918130371647" onClick={handleCallClick} className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ddbc69] px-4 py-2 font-semibold text-black transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78337] focus-visible:ring-offset-2"><Phone aria-hidden="true" size={17} strokeWidth={1.7} />Talk with Our RM</a>
          </div>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${sectionId}-question-${index}`;
            const panelId = `${sectionId}-answer-${index}`;
            return (
              <div key={faq.question} className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? "border-[#d9be7d] bg-[#fffdf7] shadow-[0_4px_16px_rgba(80,62,20,0.04)]" : "border-[#e7e1d5] bg-white hover:border-[#d9be7d]"}`}>
                <h3>
                  <button id={triggerId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between gap-3 p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ddbc69] sm:p-4">
                    <span className="font-semibold leading-relaxed text-[#283a30]">{faq.question.trim()}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${isOpen ? "border-[#ddbc69] bg-[#ddbc69] text-black" : "border-[#e8ddc2] bg-[#faf5e8] text-[#9c782e]"}`}>{isOpen ? <Minus aria-hidden="true" size={16} /> : <Plus aria-hidden="true" size={16} />}</span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
                  <div className="mx-3 border-t border-[#ece4d3] pb-3 pt-3 leading-relaxed text-[#6a756d] sm:mx-4 sm:pb-4">
                    {Array.isArray(faq.answer) ? <ul className="list-disc space-y-1 pl-5">{faq.answer.map((point) => <li key={point}>{point}</li>)}</ul> : <p className="whitespace-pre-line">{faq.answer}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
