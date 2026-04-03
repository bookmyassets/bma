"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Where is WestWyn Estates located?",
    answer:
      "WestWyn Estates is located in Polarpur, Dholera, with direct access from State Highway-117 and close proximity to Bhimnath Railway Station, within the Dholera Smart City corridor.",
  },
  {
    question: "What plot sizes are available?",
    answer:
      "The project currently offers plot sizes of 152 sq. yards and 200 sq. yards, suitable for both compact investment and long-term holding.",
  },
  {
    question: "What is the starting price of plots?",
    answer:
      "Plots start from approximately ₹10 lakh, with a current indicative rate of around ₹6,700 per sq. yard. Final pricing and availability should be confirmed with the team.",
  },
  {
    question: "Is documentation support available before booking?",
    answer:
      "Yes. Buyers can review project details, layout, location context, and receive guidance on documentation before making any booking decision.",
  },
  {
    question: "What is the booking process?",
    answer:
      "Plots can be reserved with a token amount. Post booking, site visits can be arranged, followed by payment completion and initiation of registry and documentation procedures.",
  },
  {
    question: "Who is this project best suited for?",
    answer:
      "This project is ideal for long-term buyers and investors who prioritize connectivity, documentation clarity, and guided support over short-term speculative opportunities.",
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
              Got questions about WestWyn Estates?
            </p>
            <div className="pt-4">
              <a
                className="px-2 py-3 bg-[#deae3c] rounded-md"
                href="tel:+918130371647"
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
