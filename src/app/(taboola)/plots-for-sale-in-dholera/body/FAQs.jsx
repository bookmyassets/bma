"use client";

import { useId, useState } from "react";
import { Plus, Minus, Phone, Headset } from "lucide-react";

const faqs = [
  {
    question: "Is Dholera a good investment?",
    answer:
      "Yes, Dholera is a promising long-term real estate investment opportunity, driven by major infrastructure development, industrial growth, improved connectivity and increasing demand for residential and commercial properties.",
  },
  {
    question: "Are WestWyn Residency plots legally approved and registry-ready?",
    answer:
      "Yes. WestWyn Residency plots are legally approved and come with NA/NOC, clear-title, registry-ready and approved Plan Pass documentation. Buyers can review and independently verify the relevant documents before making a purchase.",
  },
  {
    question: "Can I visit the project before buying?",
    answer:
      "Yes, you can visit the project and see the plots for yourself. A ₹50,000 booking amount is required to schedule the site visit. Our team will coordinate the visit and help you explore the location and available plots.",
  },
  {
    question: "Can NRIs buy residential plots in Dholera?",
    answer:
      "Yes, NRIs can buy residential plots in Dholera, subject to applicable Indian laws and FEMA/RBI regulations. BookMyAssets also offers a convenient process for NRIs to explore, select and purchase residential plots remotely.",
  },
  {
    question: "Why choose BookMyAssets for investing in Dholera?",
    answer:
      "BookMyAssets offers verified residential projects, transparent documentation, registry-ready plots, site visit assistance, and end-to-end support from booking to villa construction support.",
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
    <section id="faqs" aria-labelledby={`${sectionId}-heading`} className="scroll-mt-24 bg-[#faf9f5] px-4 py-6 text-[14px] md:text-[16px] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
        <div>
          <h2 id={`${sectionId}-heading`} className="text-[28px] font-bold leading-tight tracking-tight text-[#ddbc69] sm:text-[34px] lg:text-[38px]">FAQs</h2>
          <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl border border-[#e7dfce] bg-white p-3 sm:p-4 lg:block lg:max-w-[320px]">
            <div className="flex min-w-0 items-center gap-1.5 text-[12px] font-semibold leading-snug text-[#263b30] sm:gap-2 sm:text-[14px] lg:text-[16px]"><Headset aria-hidden="true" size={19} strokeWidth={1.6} className="shrink-0 text-[#a78337]" /><span>Still have a question?</span></div>
            <a href="tel:+918130371647" onClick={handleCallClick} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#ddbc69] px-2.5 py-2 text-[12px] font-semibold text-black transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78337] focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:text-[14px] lg:mt-3 lg:text-[16px]"><Phone aria-hidden="true" size={17} strokeWidth={1.7} />Talk with Our RM</a>
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
