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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black" aria-labelledby="about-dholera-faq-heading">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:gap-12 md:px-8 md:py-8">
          {/* Left Section (40%) */}
          <div className="contents md:flex md:w-2/5 md:flex-col md:px-2">
            <h2
              id="about-dholera-faq-heading"
              className="order-1 px-2 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] text-white md:order-none md:mb-4 md:px-0"
            >
              FAQs
            </h2>
            <div className="order-3 md:order-none md:px-0">
              <p className="pb-3 text-white">Have More Question?</p>
              <a
                href="tel:+918130371647"
                className="inline-flex min-h-11 items-center rounded-md bg-[#ddbc69] px-3 py-2 text-black"
              >
                Give Us A Missed Call
              </a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="order-2 w-full space-y-1 md:order-none md:mt-0 md:w-3/5 md:pl-24 md:pr-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left transition-colors duration-200 hover:bg-white/5"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`about-dholera-faq-answer-${index}`}
                >
                  <span className="pr-4 text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7] text-white">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0" aria-hidden="true">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </span>
                </button>

                <div
                  id={`about-dholera-faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 px-0">
                    <p className="text-[0.875rem] font-normal leading-[1.5] text-white">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
