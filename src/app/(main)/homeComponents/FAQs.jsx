"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import TestimonialPagination from "../components/Testimonials";

const faqs = [
  {
    question: "What type of plots does BookMyAssets offer in Dholera?",
    answer:
      "We help buyers explore verified residential plot options in and around relevant Dholera growth zones, depending on project availability and buyer requirements.",
  },
  {
    question: "Are these government approved plots?",
    answer:
      "BookMyAssets focuses on plotted opportunities where buyers can review:\n• Project documents\n• Layout details\n• Approval-related information\nbefore making a decision.",
  },
  {
    question: "Who usually considers buying plots in Dholera?",
    answer:
      "Most enquiries come from:\n• Long-term investors\n• Retirement-focused buyers\n• Delhi NCR families\n• NRIs",
  },
  {
    question: "What should I check before buying a plot in Dholera?",
    answer:
      "You should evaluate:\n• Project location\n• Documentation process\n• Layout planning\n• Road access\n• Pricing structure\n• Registry process\nbefore booking.",
  },
  {
    question: "Is Dholera suitable for short-term investment?",
    answer:
      "Most buyers evaluate Dholera as a long-term land holding opportunity rather than a short-term flip market.",
  },
  {
    question: "Is it safe to invest in Dholera plots right now?",
    answer:
      "Dholera is India’s first Greenfield Smart City with strong government backing. Key factors include:\n• International airport development\n• Expressway connectivity\n• Industrial growth including semiconductor ecosystem\n\nAt BookMyAssets, we focus on:\n• NA-approved plots\n• NOC clearance\n• Clear title verification\n• Immediate registry\n\nThese factors significantly reduce investment risk.",
  },
  {
    question: "What is the future potential of Dholera Smart City?",
    answer:
      "Dholera is planned as a major industrial and infrastructure hub with:\n• International airport\n• Expressway connectivity\n• Industrial zones\n• Semiconductor and manufacturing investments\n\nThese developments are expected to drive long-term demand and value appreciation.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleCallClick = () => {
    //  Google Tag Manager event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "call_click_Faq",
      lead_type: "phone",
      device: "all",
    });

    // 📞 Call trigger
    window.location.href = "tel:+918130371647";
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-2">
              More Questions about Dholera Smart City?
            </p>
            <div className="pt-4">
              <a
                href="#"
                className="px-2 py-3 bg-[#deae3c] text-white rounded-md"
                onClick={handleCallClick}
              >
                Give Us A Missed Call
              </a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 md:pl-24 md:pr-4  md:mt-0 space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-gray-900 font-medium pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600" />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 px-0">
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {Array.isArray(faq.answer) ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {faq.answer.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{faq.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TestimonialPagination />
    </>
  );
}
