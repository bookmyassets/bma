"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Where is WestWyn Residency located?",
    answer:
      "WestWyn Residency is located in Pipariya, Dholera, within a fast-developing investment corridor near Dholera Smart City.",
  },
  {
    question: "How far is the project from the Dholera SIR boundary?",
    answer:
      "The project is approximately 7 km from the Dholera SIR boundary, ensuring close proximity to the main development zone.",
  },
  {
    question: "Is the project close to the expressway?",
    answer:
      "Yes, WestWyn Residency is around 12 minutes away from the Ahmedabad–Dholera Expressway, providing excellent connectivity.",
  },
  {
    question: "How far is the Activation Area from the project?",
    answer:
      "The Activation Area is approximately 15 minutes from the project, making it a strategically located investment option.",
  },
  {
    question: "Is this a residential plot project?",
    answer:
      "Yes, WestWyn Residency is a premium residential plotted development designed for both investment and future living.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Where is WestWyn Residency located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WestWyn Residency is located in Pipariya, Dholera, within a fast-developing investment corridor near Dholera Smart City.",
                },
              },
              {
                "@type": "Question",
                name: "How far is the project from the Dholera SIR boundary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The project is approximately 7 km from the Dholera SIR boundary, ensuring close proximity to the main development zone.",
                },
              },
              {
                "@type": "Question",
                name: "Is the project close to the expressway?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, WestWyn Residency is around 12 minutes away from the Ahmedabad–Dholera Expressway, providing excellent connectivity.",
                },
              },
              {
                "@type": "Question",
                name: "How far is the Activation Area from the project?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Activation Area is approximately 15 minutes from the project, making it a strategically located investment option.",
                },
              },
              {
                "@type": "Question",
                name: "Is this a residential plot project?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, WestWyn Residency is a premium residential plotted development designed for both investment and future living.",
                },
              },
            ],
          }),
        }}
      />

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
