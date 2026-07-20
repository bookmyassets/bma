"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is Dholera SIR?",
    answer:
      "Dholera SIR is a planned industrial smart city in Gujarat. It covers about 920 sq. km and is located around 100 km from Ahmedabad.",
  },
  {
    question: "Where is Dholera SIR located?",
    answer:
      "Dholera SIR is located in the Ahmedabad district of Gujarat. It is connected to Ahmedabad through the Ahmedabad–Dholera Expressway.",
  },
  {
    question: "What is the Dholera SIR Act?",
    answer:
      "The Dholera SIR Act refers to the Gujarat Special Investment Region Act, 2009. It provides the legal framework for planning and developing Dholera SIR.",
  },
  {
    question: "What are the major projects in Dholera SIR?",
    answer:
      "Major Dholera SIR projects include the Ahmedabad–Dholera Expressway, Dholera International Airport, Tata Semiconductor Plant, solar park, and smart city infrastructure.",
  },
  {
    question: "Why invest in Dholera SIR with BookMyAssets?",
    answer:
      "BookMyAssets offers verified residential plots, clear property documents, site visit support, immediate possession options, and assistance with construction, rental, and resale.",
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
      <div className="bg-black">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="contents w-full md:w-2/5 pl-2 pr-2">
            <h5 className=" text-[32px] order-1 md:order-none font-semibold text-white mb-4">
              FAQs
            </h5>
            <div className="order-3 md:order-none md:px-0">
              <p className="pb-3">Have Any Other Question?</p>
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
          <div className="w-full order-2 md:order-none md:w-3/5 md:pl-24 md:pr-4  md:mt-0 space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-4 flex justify-between items-center text-left transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-white font-medium pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
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
                    <div className="text-white text-sm leading-relaxed">
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
