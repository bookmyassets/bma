"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is WestWyn Residency?",
    answer:
      "WestWyn Residency is a registry-ready residential plot project by BookMyAssets in Pipariya, Dholera. It offers legally verified plots with immediate possession, modern amenities, and excellent connectivity.",
  },
  {
    question: "Where is WestWyn Residency located?",
    answer:
      "WestWyn Residency is located in Pipariya with direct access from the Major District Road (MDR). It is close to the DFC, Bhimnath Railway Junction, Dholera SIR, Ahmedabad–Dholera Expressway, Tata Semiconductor Plant, and Dholera International Airport.",
  },
  {
    question: "Are the plots at WestWyn Residency legally verified?",
    answer:
      "Yes. All plots at WestWyn Residency are NA/NOC approved, title clear, plan pass approved, and registry-ready for a secure and transparent property purchase.",
  },
  {
    question: "What amenities are available at WestWyn Residency?",
    answer:
      "WestWyn Residency offers a gated community, 24×7 security with CCTV, wide internal roads, power and water supply, drainage system, kids play area, yoga deck, jogging track, EV charging station, and senior citizen zone.",
  },
  {
    question: "Does BookMyAssets provide support after buying a plot?",
    answer:
      "Yes. BookMyAssets provides complete support including site visits, documentation assistance, villa construction, resale support, rental support, and post-purchase guidance.",
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
    </>
  );
}
