"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is Dholera SIR?",
    answer:
      "Dholera SIR, or Dholera Special Investment Region, is India’s first and largest greenfield smart city. It is being developed in Gujarat as a large-scale industrial and urban hub under the Delhi-Mumbai Industrial Corridor.",
  },
  {
    question: "Where is Dholera SIR located?",
    answer:
      "Dholera SIR is located in Gujarat, around 100 km from Ahmedabad. Its location gives it strong strategic importance for industrial, infrastructure, and long-term urban development.",
  },
  {
    question: "Is Dholera SIR government approved?",
    answer:
      "Yes, Dholera SIR is a government-backed development. It is being developed with support from the Government of Gujarat and the Government of India under a planned policy and infrastructure framework.",
  },
  {
    question: "Why is Dholera called a smart city?",
    answer:
      "Dholera is called a smart city because it is being planned with:\n• Modern infrastructure\n• Underground utilities\n• Digital governance\n• Smart mobility planning\n• Sustainable zoning\n• Future-ready urban design",
  },
  {
    question: "What makes Dholera different from other developing cities?",
    answer:
      "Dholera stands out due to:\n• Greenfield smart city development (built from scratch)\n• Planned infrastructure-first approach\n• Strong industrial vision\n• Government policy support\n• Structured urban growth instead of unplanned expansion",
  },
  {
    question: "What major infrastructure projects are planned in Dholera?",
    answer:
      "Major infrastructure projects include:\n• Ahmedabad-Dholera Expressway\n• Dholera International Airport\n• Activation Area development\n• Industrial zones\n• Large-scale power and connectivity infrastructure",
  },
  {
    question: "What is Dholera’s role in India’s semiconductor ecosystem?",
    answer:
      "Dholera is emerging as an important destination in India’s semiconductor and advanced manufacturing ecosystem. This strengthens its long-term industrial relevance and increases investor interest in the region.",
  },
  {
    question: "What is the Activation Area in Dholera?",
    answer:
      "The Activation Area is the early operational zone of Dholera where:\n• Core infrastructure is being developed first\n• Residential and commercial zones are becoming ready\n• Initial economic and urban activity is expected to begin",
  },
  {
    question: "Is Dholera suitable for long-term investment?",
    answer:
      "Dholera is generally seen as a long-term growth destination because its value is linked to:\n• Phased infrastructure development\n• Industrial expansion\n• Planned urban growth\nrather than short-term speculation.",
  },
  {
    question: "Who governs and plans Dholera SIR?",
    answer:
      "Dholera SIR is administered by the Dholera Special Investment Region Development Authority, which oversees planning, infrastructure, and development implementation for the region.",
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
              Frequently Asked Questions
            </h5>
            <p className="text-gray-600 mb-2">
              Got questions about WestWyn Estates?
            </p>
            <div className="pt-4">
              <a
                className="px-2 py-3 bg-[#ddbc69] rounded-md"
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

