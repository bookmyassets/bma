"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";


const faqs = [
  {
    question: "Is WestWyn County a good investment for NRIs?",
    answer:
      "WestWyn County offers clear-title, government-approved Dholera residential plots in the government and industry-backed Dholera metro city, making it a secure choice for NRIs. With flexible payment plans, registry-ready plots, resale support, and buy-back assistance*, investing is hassle-free even from abroad.",
  },
  {
    question: "Where exactly is it located?",
    answer:
      "WestWyn County is located on Fedra-Pipli State Highway (100 ft road) which is the most lively location of Dholera SIR, just 12 minutes from the Dholera International Airport and Ahmedabad-Dholera Expressway.",
  },
  {
    question: "How can BookMyAssets (BMA) help me buy a plot in WestWyn County easily?",
    answer:
      "With a global presence and fully focusing on Dholera Smart City, BookMyAssets offers 365-day site visit assistance, immediate sale deed registration, and an in-house due diligence team, along with resale support and buyback assistance*.",
  },
  {
    question: "How does WestWyn County compare to other projects in Dholera?",
    answer:
      "WestWyn County stands apart with its strategic location near the upcoming Dholera International Airport and Expressway, ensuring unmatched connectivity and growth potential. Unlike many projects, it offers government approved plots backed by premium amenities and future ready infrastructure. This combination not only elevates lifestyle but also makes WestWyn County a high yield investment opportunity in one of India’s fastest growing smart city zones.",
  },
  {
    question: "What legal approvals does WestWyn County have?",
    answer:
      "WestWyn County is government-approved, with NA (Non-Agricultural) and NOC clearance, ensuring 100% legal compliance and title clear plots.",
  },
  {
    question: "Is WestWyn County an eco-friendly project?",
    answer:
      "It features landscaped gardens, green zones, EV charging stations, lush green surroundings, jogging track, and automated street lights.",
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
              Got questions about WestWyn County?
            </p>
            <div className="pt-4">
              <a
                className="px-2 py-3 bg-[#deae3c] rounded-md"
                href="tel:+918130371647"
              >
                Give Us A Missed Call
              </a>
            </div>
            {/* <p className="text-gray-600">
              We’ve answered the most common ones here
            </p> */}
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
