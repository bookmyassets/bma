"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Where is WestWyn Estate located?",
    answer:
      "WestWyn Estate is located on State Highway, 0 km from Dholera SIR, close to TP 5, in the heart of Dholera’s fastest-growing corridor, and it is only 25 minutes away from the activation area.",
  },
  {
    question: "What is the price of WestWyn Estate?",
    answer:
      "WestWyn Estate in Dholera start from ₹10 Lakh, with plot size ranging between 170–250 per sq. yd.",
  },
  {
    question: "Are the plots legally approved?",
    answer:
      "Yes, all plots are NA/NOC cleared, AUDA registered and title-cleared, ensuring a safe and transparent investment.",
  },
  {
    question: "What is the booking process?",
    answer:
      "You can reserve your plot with a token amount of ₹50,000. After booking, clients get a free site visit. Once the payment is complete, we initiate the legal process and send the registry papers via speed post.",
  },
  {
    question: "Why should I invest in WestWyn Estate now?",
    answer:
      "With the upcoming Dholera International Airport and the Tata Semiconductor Plant, Dholera is becoming India’s new Semiconductor hub. Land values are expected to rise rapidly, and residential demand is projected to grow quickly, making it a smart early Dholera SIR investment.",
  },
  {
    question: "How can BookMyAssets help you invest?",
    answer:
      "BMA assists you with plot selection in Dholera, legal verification, and the complete booking process. Our experts guide you step-by-step to ensure a safe, hassle-free investment.",
  },
];


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

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
              Got questions about WestWyn Estate?
            </p>
            <div className="pt-4">
              <a className="px-2 py-3 bg-[#deae3c] rounded-md" href="tel:+918130371647">Give Us A Missed Call</a>
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
                  <div className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 px-0">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
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
