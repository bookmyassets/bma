"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";


const faqs = [
  {
    question: "Is WestWyn Residency an AUDA approved project in Dholera?",
    answer:
      "Yes, WestWyn Residency offers plots with NA/NOC and clear title documentation. Buyers can review all approval-related documents before making a decision.",
  },
  {
    question: "Is Dholera a good option for long-term investment?",
    answer:
      "Dholera is being developed as India’s first Greenfield Smart City with strong government backing and large-scale infrastructure projects. It is primarily considered by investors looking for long-term growth potential.",
  },
  {
    question: "What major developments are happening in Dholera?",
    answer:
      "Dholera is witnessing multiple large-scale developments such as the Dholera International Airport, Ahmedabad–Dholera Expressway, semiconductor manufacturing projects, and one of the largest solar parks in India.",
  },
  {
    question: "How long does it take to get possession of the plot?",
    answer:
      "Plots are typically registry-ready. Possession can be initiated after full payment, and registry documentation is generally completed within 7–15 working days.",
  },
  {
    question: "Does BookMyAssets provide support after purchase?",
    answer:
      "Yes, BookMyAssets offers ongoing support including site visit coordination, resale assistance, and general guidance for your investment in Dholera.",
  },
  {
    question: "Can I visit the project before making a decision?",
    answer:
      "Yes, site visits can be arranged based on your availability. You can explore the location, layout, and surrounding development before proceeding.",
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

    </>
  );
}
