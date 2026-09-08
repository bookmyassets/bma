"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";


const faqs = [
  {
    question: "Is Dholera Smart City good for investment?",
    answer:
      "Yes, Dholera can be good for long-term land investors. Check location, approval, registry status, and holding period before investing.",
  },
  {
    question: "Are Dholera plots registry-ready?",
    answer:
      "Some projects are registry-ready. Always verify Approved Layout Plan , title clarity, NA/NOC, and layout plan before booking.",
  },
  {
    question: "Can I visit the Dholera plot before buying?",
    answer:
      "Yes. Site visit helps verify actual location, road access, nearby development, and project suitability.",
  },
  {
    question: "Is Dholera short-term or long-term investment?",
    answer:
      "Dholera is better for long-term investment, not quick resale. Serious investors should plan a multi-year holding period.",
  },
  {
    question: "Which Dholera projects does BookMyAssets offer?",
    answer:
      "BookMyAssets currently offers Dholera investment projects like WestWyn Residency and WestWyn Estates, with focus on registry-ready plots, site visit support, and investor guidance.",
  },
];;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleCallClick = (event) => {
    event.preventDefault();
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
      <section className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:py-8 md:flex-row md:gap-8 md:px-6">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5">
            <h2 className="mb-2 text-2xl font-semibold text-black md:text-[28px]">
              FAQs
            </h2>
            <p className="mb-1 text-sm text-gray-600 sm:text-base">
              More Questions about Dholera Smart City?
            </p>
            <div className="pt-3">
              <a
                href="#"
                className="inline-flex min-h-11 items-center rounded-md bg-[#ddbc69] px-4 py-2.5 text-sm font-medium text-white"
                onClick={handleCallClick}
              >
                Give Us A Missed Call
              </a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full space-y-1 md:w-3/5 md:pl-8 lg:pl-12">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="flex min-h-11 w-full items-center justify-between py-3 text-left transition-all duration-200 hover:bg-gray-50"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="pr-4 text-sm font-medium leading-5 text-gray-900 sm:text-base">
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
                  <div className="px-0 pb-3">
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
      </section>

    </>
  );
}

