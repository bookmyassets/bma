"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Who should choose WestWyn Residency?",
    answer:
      "WestWyn Residency is best for buyers who want a lower-entry plotted option with practical ticket size and location clarity.",
  },
  {
    question: "What are the available plot sizes?",
    answer:
      "124, 152, and 187 sq. yards plots are available in WestWyn Residency.",
  },
  {
    question: "What is the token amount?",
    answer: "The token amount is ₹50,000.",
  },
  {
    question: "Is the project registry-ready?",
    answer:
      "Yes, WestWyn Residency is presented as a registry-ready residential plot project with immediate possession, suitable for buyers seeking clarity and quicker ownership transfer.",
  },
  {
    question: "Can I plan a site visit before buying?",
    answer:
      "Yes. BookMyAssets offers 365-day site visit assistance and also allows buyers to book a visit for on-ground guidance and better understanding of the project.",
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
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-4 md:py-8 gap-4 md:gap-8 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h4 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-black mb-4">
              Frequently Asked Questions
            </h4>
            <p className="text-[clamp(0.95rem,1.4vw,1.125rem)] text-gray-600 mb-2">
              Got questions about WestWyn Residency?
            </p>
            <div className="pt-4">
              <a
                className="px-2 py-3 bg-[#ddbc69] rounded-md"
                href="tel:+918130371647"
              >
                Request a Call Back
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
                  <span className="text-[clamp(0.95rem,1.4vw,1.125rem)] text-gray-900 font-medium pr-4 leading-relaxed">
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
                    <p className="text-gray-600 text-[clamp(0.875rem,1.25vw,1rem)] leading-relaxed">
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

