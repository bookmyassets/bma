"use client";

import { useState } from "react";
import {
  Minus,
  Plus,
  Phone,
  MessageCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getWestwynSectionSurface } from "../dholera-residential-plots/components/westwyn/WestwynTheme";

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

export default function FAQSection({ surface = "base" }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className={cn(
        getWestwynSectionSurface(surface),
        "relative overflow-hidden text-white",
      )}
      aria-labelledby="about-dholera-faq-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          {/* ====================================================== */}
          {/* LEFT INTRO                                             */}
          {/* ====================================================== */}

          <div>
            <div className="mb-4 flex items-center gap-3">
            </div>

            <h2
              id="about-dholera-faq-heading"
              className="max-w-xl font-playfair-display text-[30px] font-medium leading-[1.08] tracking-[-0.035em] text-[#ddbc69] lg:text-[40px]"
            >
              Frequently Asked{" "}
              <span className="text-[#ddbc69]">
                Questions
              </span>
            </h2>

            <p className="mt-5 max-w-md text-[16px] leading-[1.7] text-[#f5f1e8]/58 lg:text-[18px]">
              Find quick answers to common questions about Dholera SIR,
              infrastructure, planning and investment.
            </p>

            {/* DESKTOP CONTACT CARD */}
            <div className="mt-8 hidden lg:block">
              <div className="relative overflow-hidden rounded-[20px] border border-[#ddbc69]/18 bg-[#101010] p-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#ddbc69]/[0.07] blur-[45px]"
                />

                <div className="relative">

                  <p className="mt-4 text-[17px] font-semibold text-[#f5f1e8]">
                    Still have questions?
                  </p>

                  <a
                    href="tel:+918130371647"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#ddbc69] px-4 py-2.5 text-sm font-semibold text-[#101010] transition hover:bg-[#ebcb7a]"
                  >
                    <Phone
                      className="h-4 w-4"
                      aria-hidden="true"
                    />

                    Talk to RM
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* FAQ LIST                                               */}
          {/* ====================================================== */}

          <div className="w-full">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={cn(
                    "group border-b transition-colors duration-300",
                    isOpen
                      ? "border-[#ddbc69]/28"
                      : "border-white/[0.08]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={`about-dholera-faq-answer-${index}`}
                    className="flex w-full items-center gap-4 py-5 text-left lg:py-6"
                  >
                    {/* NUMBER */}
                    <span
                      className={cn(
                        "shrink-0 font-serif text-[14px] transition-colors duration-300 lg:text-[16px]",
                        isOpen
                          ? "text-[#ddbc69]"
                          : "text-white/22",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* QUESTION */}
                    <span
                      className={cn(
                        "flex-1 text-[16px] font-semibold leading-[1.45] transition-colors duration-300 lg:text-[18px]",
                        isOpen
                          ? "text-[#f5f1e8]"
                          : "text-[#f5f1e8]/78",
                      )}
                    >
                      {faq.question}
                    </span>

                    {/* ICON */}
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "rotate-0 border-[#ddbc69]/40 bg-[#ddbc69]/10 text-[#ddbc69]"
                          : "border-white/[0.10] bg-white/[0.02] text-white/40 group-hover:border-[#ddbc69]/25 group-hover:text-[#ddbc69]",
                      )}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {/* ANSWER */}
                  <div
                    id={`about-dholera-faq-answer-${index}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-5 pl-[38px] pr-12 lg:pb-6 lg:pl-[48px]">
                        <p className="max-w-2xl text-[15px] leading-[1.7] text-[#f5f1e8]/52 lg:text-[16px]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ====================================================== */}
          {/* MOBILE CTA                                             */}
          {/* ====================================================== */}

          <div className="lg:hidden">
            <div className="flex items-center justify-between gap-4 rounded-[18px] border border-[#ddbc69]/18 bg-[#101010] p-4">
              <div>
                <p className="text-[15px] font-semibold text-[#f5f1e8]">
                  Need more help?
                </p>

                <p className="mt-1 text-[13px] text-white/40">
                  Talk to RM
                </p>
              </div>

              <a
                href="tel:+918130371647"
                className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl bg-[#ddbc69] px-3.5 py-2 text-[13px] font-semibold text-[#101010]"
              >
                <Phone
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />

                Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}