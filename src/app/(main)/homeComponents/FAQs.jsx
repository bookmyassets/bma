"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import TestimonialPagination from "../components/Testimonials";

const faqs = [
  {
    question: "Why should I invest in Dholera Smart City?",
    answer:
      "Dholera Smart City is India's first greenfield smart city with major infrastructure projects like the Dholera International Airport, Ahmedabad–Dholera Expressway, and Tata Semiconductor Plant, making it a promising destination for long-term investment.",
  },
  {
    question: "What types of residential plots does BookMyAssets offer in Dholera?",
    answer:
      "BookMyAssets offers legally verified, registry-ready residential plots in prime locations across Dholera with transparent documentation and modern infrastructure.",
  },
  {
    question: "Are BookMyAssets projects legally verified?",
    answer:
      "Yes, All BookMyAssets residential projects come with NA/NOC approvals, clear title documents, plan pass approval, and registry-ready plots for a secure buying experience.",
  },
  {
    question: "Does BookMyAssets provide support after buying a plot?",
    answer:
      "Yes, We provide complete post-purchase support, including registration assistance, villa construction support, resale assistance, rental support, and dedicated customer service.",
  },
  {
    question: "Is immediate registry available for your plots?",
    answer:
      "Yes, our selected projects offer immediate registry, which means you get ownership transferred quickly, reduced risk compared to long-term commitments, and clear legal standing from day one. This is one of the key reasons many investors prefer our projects.",
  },
  {
    question: "Why choose BookMyAssets for investing in Dholera?",
    answer:
      "BookMyAssets offers verified residential projects, transparent documentation, registry-ready plots, site visit assistance, and end-to-end support from booking to villa construction support.",
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

    // Phone call trigger
    window.location.href = "tel:+918130371647";
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-6 md:py-8 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="contents md:flex md:w-2/5 md:flex-col md:px-2">
            <h2 className="order-1 px-2 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] text-black md:order-none md:px-0 md:mb-4">
              FAQs
            </h2>
            <div className="order-3  md:order-none md:px-0">
              <p className="pb-3">Have More Question?</p>
              <a
                href="#"
                className="px-1 py-2 bg-[#ddbc69] text-white rounded-md"
                onClick={handleCallClick}
              >
                Let's Connect
              </a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="order-2 w-full md:order-none md:w-3/5 md:pl-24 md:pr-4 md:mt-0 space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7] text-gray-900 pr-4">
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
                    <div className="text-gray-600 text-[0.875rem] font-normal leading-[1.5]">
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
