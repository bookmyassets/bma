"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Where is WestWyn Residency located?",
    answer:
      "WestWyn Residency is located in Pipariya, Dholera, in a strategically connected area with access to key infrastructure and nearby development zones.",
  },
  {
    question: "Is WestWyn Residency a residential plot project?",
    answer:
      "Yes, WestWyn Residency is a premium residential plotted development designed for buyers looking at long-term investment potential as well as future residential use.",
  },
  {
    question: "Is the project registry-ready?",
    answer:
      "The project is positioned as a registry-ready residential plot offering. Serious buyers should connect with the BookMyAssets team to understand the buying process and next-step support in detail.",
  },
  {
    question: "What kind of support does BookMyAssets provide to buyers?",
    answer:
      "BookMyAssets assists serious buyers with project understanding, plot guidance, site visit support, and next-step coordination through the buying journey.",
  },
  {
    question: "Can buyers from Delhi NCR plan a guided site visit?",
    answer:
      "Yes, buyers from Delhi NCR, Gurugram, Noida, and nearby regions can connect with the team for guided site visit coordination.",
  },
  {
    question: "What plot sizes are available in WestWyn Residency?",
    answer:
      "The project offers multiple residential plot sizes. Buyers can request the latest availability, price sheet, and layout details directly from the team.",
  },
  {
    question: "Is this project suitable only for investors?",
    answer:
      "No. WestWyn Residency may appeal to both investment-focused buyers and those planning for future residential use, depending on their goals and timeline.",
  },
  {
    question: "How do I get brochure, layout, and pricing details?",
    answer:
      "You can submit your details on the page or connect with BookMyAssets on WhatsApp to receive brochure, layout, and project guidance.",
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
              Got questions about WestWyn Residency?
            </p>
            <div className="pt-4">
              <a
                className="px-2 py-3 bg-[#deae3c] rounded-md"
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
