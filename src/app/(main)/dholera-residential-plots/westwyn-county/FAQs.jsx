"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";


const faqs = [
  {
    question: "Where is WestWyn County located?",
    answer:
      "WestWyn County is located on the Fedra-Pipli State Highway (SH-40) with direct entry from the 100-ft-wide state highway.",
  },
  {
    question: "Are resale plots available in WestWyn County?",
    answer:
      "Yes. Verified resale plots are available in WestWyn County after the project was sold out.",
  },
  {
    question: "What plot sizes are available in WestWyn County?",
    answer:
      "WestWyn County offers residential plots ranging from 149 to 325 sq. yards.",
  },
  {
    question: "What is the resale price of plots in WestWyn County?",
    answer:
      "The resale price is ₹12,000 per sq. yard. The final price may depend on the plot size, location, and availability.",
  },
  {
    question: "What amenities are available in WestWyn County?",
    answer: "The project offers a gated boundary, 24/7 security, CCTV, wide roads, drainage, power and water supply, a kids’ play area, yoga deck, senior citizen zone, and EV charging.",
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
            <h5 className="text-[32px] font-semibold text-black mb-4">
              FAQs
            </h5>
             <p className="text-gray-600 mb-2">
              Got questions about WestWyn County?
            </p>
            <div className="pt-4">
              <a
                className="px-2 py-3 bg-[#ddbc69] rounded-md"
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

