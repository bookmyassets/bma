"use client";

import Link from "next/link";

import { Ruler } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { getWestwynSectionSurface } from "./WestwynTheme";

export default function WestWynPlotAvailability({
  projectName = "WestWyn Project",
  heading = "Choose the Plot Size",
  plotOptions = [],
  note = "Plot sizes are subject to current availability.",
  whatsappText,
  surface = "alt",
}) {
  const plots = Array.isArray(plotOptions) ? plotOptions.filter(Boolean) : [];

  const normalizedProjectName =
    typeof projectName === "string" && projectName.trim()
      ? projectName.trim()
      : "WestWyn Project";

  const resolvedWhatsappText =
    typeof whatsappText === "string" && whatsappText.trim()
      ? whatsappText.trim()
      : `Hi, I'd like to check the current availability of plots in ${normalizedProjectName}`;

  const whatsappHref = `https://wa.me/918130371647?text=${encodeURIComponent(
    resolvedWhatsappText,
  )}`;

  const gridClass =
    plots.length === 2
      ? "grid-cols-2 mx-auto max-w-[850px]"
      : plots.length === 1
        ? "grid-cols-1 mx-auto max-w-[420px]"
        : "grid-cols-3";

  const headingId = `${normalizedProjectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-plot-availability`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        `relative
        overflow-hidden
        text-white`,
        getWestwynSectionSurface(surface),
      )}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-[440px]
          w-[440px]
          rounded-full
          blur-[110px]
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
          px-4
          py-6

          sm:px-6
          sm:py-7

          lg:px-8
          lg:py-9
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto max-w-[900px] text-center">
          <h2
            id={headingId}
            className="
              font-playfair-display
              text-[30px]
              font-semibold
              leading-[1.1]
              tracking-[-0.025em]
              text-[#DDBC69]

              lg:text-[40px]
            "
          >
            {heading}
          </h2>
        </div>

        {/* =====================================================
            PLOT SIZE CARDS
        ====================================================== */}

        <div
          className={`
            mt-7
            grid
            gap-1.5

            sm:mt-8
            sm:gap-3

            lg:mt-10
            lg:gap-4

            ${gridClass}
          `}
        >
          {plots.map((plot, index) => {
            const DescriptionIcon = plot.Icon || Ruler;

            return (
              <div
                key={`${plot.size}-${index}`}
                className={`
                  relative
                  overflow-visible
                  rounded-[10px]
                  border
                  border-[#4C463C]

                  bg-[linear-gradient(
                    135deg,
                    rgba(255,255,255,0.03),
                    rgba(255,255,255,0.01)
                  )]

                  px-1
                  py-2
                  text-center

                  sm:px-2
                  sm:py-2.5

                  md:rounded-xl
                  md:p-2.5

                  lg:p-3

                  ${plot.badge ? "pt-4 sm:pt-4 md:pt-4 lg:pt-5" : ""}
                `}
              >
                {/* =================================================
                    BADGE
                ================================================== */}

                {plot.badge ? (
                  <div
                    className="
                      absolute
                      left-1/2
                      top-0
                      z-20
                      -translate-x-1/2
                      -translate-y-1/2
                      whitespace-nowrap
                    "
                  >
                    <div
                      className="
                        relative
                        flex
                        items-center
                        gap-1.5
                        overflow-hidden
                        rounded-full
                        border
                        border-[#D9B967]/45
                        bg-[#191815]/95
                        px-2.5
                        py-[5px]
                        shadow-[0_6px_18px_rgba(0,0,0,0.35)]
                        backdrop-blur-md

                        sm:px-3
                      "
                    >
                      {/* Top highlight */}
                      <span
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          inset-x-3
                          top-0
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-[#F0D47F]/70
                          to-transparent
                        "
                      />

                      {/* Indicator */}
                      <span
                        className="
                          relative
                          flex
                          size-1.5
                          shrink-0
                          items-center
                          justify-center
                        "
                      >
                        <span
                          className="
                            absolute
                            size-2.5
                            rounded-full
                            bg-[#D9B967]/15
                          "
                        />

                        <span
                          className="
                            relative
                            size-1.5
                            rounded-full
                            bg-[#E4C470]
                            shadow-[0_0_7px_rgba(228,196,112,0.75)]
                          "
                        />
                      </span>

                      <span
                        className="
                          bg-gradient-to-r
                          from-[#F0D47F]
                          via-[#E4C470]
                          to-[#C9A65D]
                          bg-clip-text
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-transparent
                        "
                      >
                        {plot.badge}
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* =================================================
                    MOBILE
                ================================================== */}

                <div className="flex flex-col items-center justify-center md:hidden">
                  <p
                    className="
                      font-sans
                      text-[1.3rem]
                      font-bold
                      leading-none
                      tracking-tight
                      text-[#F4EFE6]

                      sm:text-[1.45rem]
                    "
                  >
                    {plot.size}
                  </p>

                  <p
                    className="
                      mt-1
                      text-[14px]
                      font-medium
                      text-white
                    "
                  >
                    {plot.unit || "Sq. Yd."}
                  </p>

                  {plot.label ? (
                    <p
                      className="
                        mt-1
                        text-[11px]
                        font-medium
                        text-white/55
                      "
                    >
                      {plot.label}
                    </p>
                  ) : null}
                </div>

                {/* =================================================
                    TABLET / DESKTOP
                ================================================== */}

                <div className="hidden md:block">
                  <div
                    className="
                      relative
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-1.5
                    "
                  >
                    <div
                      className="
                        flex
                        size-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#C9A65D]/10
                        bg-[#C9A65D]/10

                        lg:size-11
                      "
                    >
                      <Ruler
                        strokeWidth={1.6}
                        className="
                          size-[18px]
                          text-[#D7B66E]

                          lg:size-5
                        "
                      />
                    </div>

                    <div className="text-center">
                      <p
                        className="
                          font-sans
                          text-[1.6rem]
                          font-bold
                          leading-none
                          tracking-tight
                          text-[#F4EFE6]

                          lg:text-[1.75rem]
                        "
                      >
                        {plot.size}
                      </p>

                      <p
                        className="
                          mt-1
                          font-sans
                          text-[11px]
                          font-medium
                          text-white

                          lg:text-xs
                        "
                      >
                        {plot.unit || "Sq. Yd."}
                      </p>

                      {plot.label ? (
                        <p
                          className="
                            mt-1
                            text-[11px]
                            text-white/50
                          "
                        >
                          {plot.label}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {plot.description ? (
                    <>
                      <div className="my-2.5 h-px w-full bg-[#4C463C]" />

                      <div
                        className="
                          relative
                          flex
                          items-start
                          justify-center
                          gap-2.5
                          text-left
                        "
                      >
                        <DescriptionIcon
                          strokeWidth={1.6}
                          className="
                            mt-0.5
                            size-4
                            shrink-0
                            text-[#C9A65D]
                          "
                        />

                        <p
                          className="
                            max-w-[260px]
                            text-[15px]
                            font-medium
                            leading-[1.45]
                            text-white

                            lg:text-[17px]
                          "
                        >
                          {plot.description}
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            AVAILABILITY NOTE
        ====================================================== */}

        {note ? (
          <p
            className="
      mt-3
      text-center
      text-[15px]
      text-white
      lg:text-[16px]
      lg:leading-[22px]
    "
          >
            {note}
          </p>
        ) : null}
        {/* =====================================================
            CTA
        ====================================================== */}

        <div
          className="
            mx-auto
            mt-5
            w-full
            max-w-[400px]
          "
        >
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="
              gold-cta-button

              flex
              min-h-[44px]
              w-full
              items-center
              justify-center
              gap-2

              rounded-lg

              border
              border-[#C9A65D]

              bg-[linear-gradient(90deg,#C9A65D,#E0BE72)]

              px-3
              py-2

              text-[16px]
              font-semibold
              text-[#24231F]

              shadow-[0_10px_26px_rgba(201,166,93,0.15)]

              transition-shadow
              duration-300

              hover:shadow-[0_14px_32px_rgba(201,166,93,0.22)]

              sm:text-[16px]
              lg:min-h-[48px]
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

            <span>Check Availability</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
