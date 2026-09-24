"use client";

import { useState } from "react";

import {
  Minus,
  Phone,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getWestwynSectionSurface } from "./WestwynTheme";
import { FaWhatsapp } from "react-icons/fa6";

export default function WestWynFAQ({
  projectName = "WestWyn Project",
  faqs = [],
  heading = "Have More Questions?",
  description = "Our relationship managers are here to help you.",
  ctaLabel = "Connect with RM",
  phoneNumber = "+918130371647",
  surface = "base",
}) {
  const [openIndex, setOpenIndex] =
    useState(null);

  const faqList = Array.isArray(faqs)
    ? faqs.filter(
        (faq) =>
          faq &&
          faq.question &&
          faq.answer,
      )
    : [];

  const project =
    typeof projectName === "string" &&
    projectName.trim()
      ? projectName.trim()
      : "WestWyn Project";

  const handleCallClick = () => {
    if (typeof window === "undefined") return;

    window.dataLayer =
      window.dataLayer || [];

    window.dataLayer.push({
      event: "call_click_Faq",
      lead_type: "phone",
      device: "all",
      project_name: project,
    });

    window.location.href = `tel:${phoneNumber}`;
  };

  const toggleFAQ = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index
        ? null
        : index,
    );
  };

  return (
    <section
      aria-label={`${project} frequently asked questions`}
      className={cn(
          `relative
        overflow-hidden

        w-full

        bg-[#24231F]

        px-4
        py-6

        text-white

        sm:px-6
        sm:py-7

        lg:px-8
        lg:py-10`,
        getWestwynSectionSurface(surface)
      )}
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-40
          top-0

          h-[420px]
          w-[420px]

          rounded-full

          bg-[#C9A65D]/[0.04]

          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-40
          right-0

          h-[420px]
          w-[500px]

          rounded-full

          bg-[#C9A65D]/[0.025]

          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-7xl
        "
      >
        <div
          className="
            grid
            gap-7

            lg:grid-cols-[0.75fr_1.5fr]
            lg:gap-8

            xl:gap-10
          "
        >
          {/* =========================================
              LEFT CONTENT
          ========================================== */}

          <div
            className="
              flex
              flex-col

              items-center
              justify-start

              text-center

              lg:items-start
              lg:text-left
            "
          >
            <div>
              <h2
                className="
                  max-w-md

                  font-playfair-display

                  text-[30px]
                  font-semibold

                  leading-[1.1]

                  tracking-[-0.04em]

                  text-[#DDBC69]

                  lg:text-[40px]
                  lg:leading-[0.98]
                "
              >
                {heading}
              </h2>

              <p
                className="
                  mt-5

                  max-w-sm

                  text-[16px]
                  leading-[1.5]

                  text-white

                  lg:mt-7
                  lg:text-[18px]
                "
              >
                {description}
              </p>
            </div>

            {/* CTA */}

            <div className="mt-4 lg:mt-5">
              <button
                type="button"
                onClick={handleCallClick}
                className="
                  inline-flex
                  min-h-11

                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  border
                  border-[#C9A65D]

                  bg-[#C9A65D]

                  px-4
                  py-2.5

                  text-[16px]
                  font-semibold

                  text-[#24231F]

                  shadow-[0_8px_24px_rgba(201,166,93,0.12)]

                  lg:text-[18px]
                "
              >
                <FaWhatsapp
                              aria-hidden="true"
                              className="
                                size-[20px]
                                shrink-0
                               text-green-700
                              "
                />

                <span>{ctaLabel}</span>

                <span
                  aria-hidden="true"
                  className="text-lg leading-none"
                >
                  →
                </span>
              </button>
            </div>
          </div>

          {/* =========================================
              FAQ ACCORDION
          ========================================== */}

          <div className="space-y-2">
            {faqList.map(
              (faq, index) => {
                const isOpen =
                  openIndex === index;

                const faqId = `faq-${project
                  .toLowerCase()
                  .replace(
                    /[^a-z0-9]+/g,
                    "-",
                  )
                  .replace(
                    /(^-|-$)/g,
                    "",
                  )}-${index}`;

                return (
                  <article
                    key={
                      faq.id ||
                      `${faq.question}-${index}`
                    }
                    className={`
                      overflow-hidden

                      rounded-xl

                      border

                      ${
                        isOpen
                          ? "border-[#C9A65D]/70 bg-[#34312B]"
                          : "border-[#4C463C] bg-[#2D2B26]"
                      }
                    `}
                  >
                    {/* Question */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleFAQ(index)
                      }
                      aria-expanded={
                        isOpen
                      }
                      aria-controls={`${faqId}-answer`}
                      className="
                        flex
                        min-h-[58px]
                        w-full

                        items-center
                        gap-3

                        px-3
                        py-3

                        text-left

                        sm:min-h-[64px]
                        sm:px-4
                      "
                    >
                      {/* Number */}

                      <span
                        className="
                          flex
                          w-7
                          shrink-0

                          items-center
                          justify-center

                          text-[15px]
                          font-semibold

                          text-[#DDBC69]

                          lg:text-[17px]
                        "
                      >
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      {/* Question text */}

                      <span
                        className="
                          min-w-0
                          flex-1

                          pr-2

                          text-[16px]
                          font-medium

                          leading-6

                          text-white

                          lg:text-[18px]
                        "
                      >
                        {faq.question}
                      </span>

                      {/* Plus / Minus */}

                      <span
                        aria-hidden="true"
                        className={`
                          flex
                          size-8
                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          border

                          ${
                            isOpen
                              ? `
                                border-[#C9A65D]
                                bg-[#C9A65D]
                                text-[#24231F]
                              `
                              : `
                                border-[#4C463C]
                                bg-[#34312B]
                                text-white
                              `
                          }
                        `}
                      >
                        {isOpen ? (
                          <Minus className="size-4" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                      </span>
                    </button>

                    {/* Answer */}

                    <div
                      id={`${faqId}-answer`}
                      className={`
                        grid

                        transition-[grid-template-rows,opacity]
                        duration-300
                        ease-in-out

                        ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }
                      `}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="
                            border-t
                            border-[#4C463C]

                            px-3
                            pb-4
                            pt-3

                            sm:px-4
                          "
                        >
                          <div
                            className="
                              pl-10
                              pr-2

                              text-[15px]
                              leading-7

                              text-white/75

                              sm:pr-6

                              lg:text-[17px]
                            "
                          >
                            {Array.isArray(
                              faq.answer,
                            ) ? (
                              <ul
                                className="
                                  list-disc
                                  space-y-2
                                  pl-5
                                "
                              >
                                {faq.answer.map(
                                  (
                                    point,
                                    answerIndex,
                                  ) => (
                                    <li
                                      key={`${point}-${answerIndex}`}
                                    >
                                      {
                                        point
                                      }
                                    </li>
                                  ),
                                )}
                              </ul>
                            ) : (
                              <p>
                                {
                                  faq.answer
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}