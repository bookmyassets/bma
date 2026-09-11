"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const faqs = [
  {
    question: "What is WestWyn Residency?",
    answer:
      "WestWyn Residency is a registry-ready residential plot project by BookMyAssets in Pipariya, Dholera. It offers legally verified plots with immediate possession, modern amenities, and excellent connectivity.",
  },
  {
    question: "Where is WestWyn Residency located?",
    answer:
      "WestWyn Residency is located in Pipariya with direct access from the Major District Road (MDR). It is close to the DFC, Bhimnath Railway Junction, Dholera SIR, Ahmedabad–Dholera Expressway, Tata Semiconductor Plant, and Dholera International Airport.",
  },
  {
    question: "Are the plots at WestWyn Residency legally verified?",
    answer:
      "Yes. All plots at WestWyn Residency are NA/NOC approved, title clear, plan pass approved, and registry-ready for a secure and transparent property purchase.",
  },
  {
    question: "What amenities are available at WestWyn Residency?",
    answer:
      "WestWyn Residency offers a gated community, 24×7 security with CCTV, wide internal roads, power and water supply, drainage system, kids play area, yoga deck, jogging track, EV charging station, and senior citizen zone.",
  },
  {
    question: "Does BookMyAssets provide support after buying a plot?",
    answer:
      "Yes. BookMyAssets provides complete support including site visits, documentation assistance, villa construction, resale support, rental support, and post-purchase guidance.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleCallClick = () => {
    // Google Tag Manager event
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "call_click_Faq",
      lead_type: "phone",
      device: "all",
    });

    // Call trigger
    window.location.href = "tel:+918130371647";
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#24231F] px-3 py-5 sm:px-5 sm:py-6 lg:px-7 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Main FAQ Layout */}
        <div className="grid gap-4 lg:grid-cols-[0.75fr_1.5fr] lg:gap-6 xl:gap-8">

          {/* =========================================
              LEFT CONTENT
          ========================================= */}
          <div className="flex flex-col items-center justify-start text-center">

            <div>

              {/* Heading */}
              <h2 className="max-w-md font-serif text-[1.5rem] font-medium leading-[1.1] tracking-[-0.025em] text-white sm:text-[1.75rem] lg:text-[1.95rem] xl:text-[2.1rem]">
                Have More Questions?
              </h2>

              {/* Short supporting text */}
              <p className="mt-2 max-w-sm text-md leading-[1.5] text-white sm:text-sm sm:leading-[1.6]">
                Our relationship managers are here to help you.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-3 lg:mt-4">
              <button
                type="button"
                onClick={handleCallClick}
                className="
                  inline-flex
                  min-h-10
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#C9A65D]
                  bg-[#C9A65D]
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#24231F]
                  shadow-[0_8px_24px_rgba(201,166,93,0.12)]
                  transition-all
                  duration-200
                  hover:bg-[#D5B673]
                  active:scale-[0.98]
                  sm:w-auto
                  sm:text-sm
                "
              >
                <FaWhatsapp className="h-4 w-4 text-[#075E54] sm:h-5 sm:w-5" aria-hidden="true" />

                <span>Connect with Our RM</span>

                <span className="text-lg leading-none">→</span>
              </button>
            </div>
          </div>

          {/* =========================================
              RIGHT FAQ ACCORDION
          ========================================= */}
          <div className="space-y-2">

            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`
                    overflow-hidden
                    rounded-xl
                    border
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "border-[#C9A65D]/70 bg-[#34312B]"
                        : "border-[#4C463C] bg-[#2D2B26] hover:border-[#C9A65D]/40"
                    }
                  `}
                >
                  {/* Question */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="
                      flex
                      min-h-[58px]
                      w-full
                      items-center
                      gap-3
                      px-2.5
                      py-2.5
                      text-left
                      sm:min-h-[64px]
                      sm:px-3
                      sm:py-3
                    "
                  >
                    {/* Number */}
                    <span
                      className={`
                        flex
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        text-xs
                        font-semibold
                        transition-colors
                        duration-200
                        ${
                          isOpen
                            ? "text-white"
                            : "text-white"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span
                      className={`
                        min-w-0
                        flex-1
                        pr-2
                        text-[13px]
                        font-semibold
                        leading-5
                        transition-colors
                        duration-200
                        sm:text-sm
                        lg:text-[15px]
                        ${
                          isOpen
                            ? "text-white"
                            : "text-white"
                        }
                      `}
                    >
                      {faq.question}
                    </span>

                    {/* Plus / Minus */}
                    <span
                      className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-all
                        duration-200
                        ${
                          isOpen
                            ? "border-[#C9A65D] bg-[#C9A65D] text-[#24231F]"
                            : "border-[#4C463C] bg-[#34312B] text-white"
                        }
                      `}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {/* =================================
                      ANSWER
                  ================================= */}
                  <div
                    className={`
                      grid transition-all duration-300 ease-in-out
                      ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#4C463C] px-3 pb-3 pt-2.5 sm:px-3 sm:pb-4 sm:pt-3">

                        <div className="pl-10 pr-2 sm:pl-10 sm:pr-6">
                          <div className="text-xs leading-[1.5] text-white sm:text-sm sm:leading-[1.6]">

                            {Array.isArray(faq.answer) ? (
                              <ul className="list-disc space-y-2 pl-5">
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
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}
