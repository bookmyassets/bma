import Link from "next/link";

import {
  ArrowRight,
  CircleDollarSign,
  FileCheck2,
  MapPin,
  Ruler,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

export default function WestWynProjectHero({
  titleId,
  eyebrow = "Registry Ready Plots with Clear Documentation",
  brandName = "WestWyn",
  projectName = "Project",

  startingPrice,
  plotSizes,
  documentation = "Registry Ready",
  connectivity,

  projectFacts,

  whatsappHref,
  whatsappText,

  documentHref = "#document-vault-slider",

  inventoryNote = "Price and plot availability are subject to current inventory.",
}) {
  /*
   * ============================================================
   * PROJECT NAME
   * ============================================================
   */

  const safeProjectName =
    typeof projectName === "string" && projectName.trim()
      ? projectName.trim()
      : "Project";

  /*
   * ============================================================
   * ACCESSIBLE TITLE ID
   * ============================================================
   */

  const generatedTitleId = `westwyn-${safeProjectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-title`;

  const resolvedTitleId =
    typeof titleId === "string" && titleId.trim()
      ? titleId
      : generatedTitleId;

  /*
   * ============================================================
   * DEFAULT PROJECT FACTS
   * ============================================================
   */

  const defaultProjectFacts = [
    {
      label: "Starting price",
      value: startingPrice,
      Icon: CircleDollarSign,
    },
    {
      label: "Plot sizes",
      value: plotSizes,
      Icon: Ruler,
    },
    {
      label: "Documentation",
      value: documentation,
      Icon: FileCheck2,
    },
    {
      label: "Connectivity",
      value: connectivity,
      Icon: MapPin,
    },
  ].filter(
    (fact) =>
      fact &&
      fact.value !== undefined &&
      fact.value !== null &&
      fact.value !== "",
  );

  /*
   * ============================================================
   * RESOLVED PROJECT FACTS
   * ============================================================
   */

  const resolvedProjectFacts =
    Array.isArray(projectFacts) && projectFacts.length > 0
      ? projectFacts.filter(Boolean)
      : defaultProjectFacts;

  /*
   * ============================================================
   * WHATSAPP URL
   * ============================================================
   */

  const defaultWhatsappText =
    typeof whatsappText === "string" && whatsappText.trim()
      ? whatsappText
      : `Hi, I'd like the latest WestWyn ${safeProjectName} details`;

  const resolvedWhatsappHref =
    typeof whatsappHref === "string" && whatsappHref.trim()
      ? whatsappHref
      : `https://wa.me/918130371647?text=${encodeURIComponent(
          defaultWhatsappText,
        )}`;

  /*
   * ============================================================
   * DOCUMENT LINK
   * ============================================================
   */

  const resolvedDocumentHref =
    typeof documentHref === "string" && documentHref.trim()
      ? documentHref
      : "#document-vault-slider";

  return (
    <section
      id="hero"
      aria-labelledby={resolvedTitleId}
      className="relative isolate min-h-[680px] overflow-hidden bg-[#071018] text-white sm:min-h-[740px] lg:min-h-[calc(100svh+96px)]"
    >
      {/* ========================================= */}
      {/* CSS HERO BACKGROUND */}
      {/* ========================================= */}

      {/* Base deep navy background */}
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-[#06111d]" />

      {/* Main premium navy gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background: `
      linear-gradient(
        110deg,
        #04101a 0%,
        #071827 34%,
        #082039 66%,
        #061523 100%
      )
    `,
        }}
      />

      {/* Soft central blue illumination */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background: `
      radial-gradient(
        ellipse 65% 75% at 52% 38%,
        rgba(23, 67, 108, 0.25) 0%,
        rgba(10, 35, 58, 0.12) 42%,
        transparent 72%
      )
    `,
        }}
      />

      {/* Subtle upper-left lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background: `
      radial-gradient(
        ellipse 48% 45% at 15% 8%,
        rgba(35, 73, 104, 0.23) 0%,
        transparent 68%
      )
    `,
        }}
      />

      {/* Bottom-left gold ambient glow */}
      <div
        aria-hidden="true"
        className="
    absolute
    -bottom-[250px]
    -left-[260px]
    z-[2]
    h-[620px]
    w-[620px]
    rounded-full
    opacity-70
    blur-[3px]

    sm:-bottom-[290px]
    sm:-left-[280px]

    lg:h-[760px]
    lg:w-[760px]
  "
        style={{
          background:
            "radial-gradient(circle, rgba(221,188,105,0.26) 0%, rgba(184,146,79,0.10) 36%, transparent 67%)",
        }}
      />

      {/* Bottom-left gold architectural arcs */}
      <div
        aria-hidden="true"
        className="
    absolute
    -bottom-[315px]
    -left-[390px]
    z-[3]
    h-[680px]
    w-[680px]
    rounded-full
    border
    border-[#B8924F]/30

    sm:h-[780px]
    sm:w-[780px]

    lg:-bottom-[390px]
    lg:-left-[470px]
    lg:h-[930px]
    lg:w-[930px]
  "
      />

      <div
        aria-hidden="true"
        className="
    absolute
    -bottom-[330px]
    -left-[425px]
    z-[3]
    h-[730px]
    w-[730px]
    rounded-full
    border
    border-[#B8924F]/15

    sm:h-[840px]
    sm:w-[840px]

    lg:-bottom-[420px]
    lg:-left-[505px]
    lg:h-[1010px]
    lg:w-[1010px]
  "
      />

      {/* Right architectural panel - desktop only */}
      <div
        aria-hidden="true"
        className="
    absolute
    bottom-0
    right-[20%]
    top-0
    z-[2]
    hidden
    w-px
    bg-gradient-to-b
    from-[#B8924F]/10
    via-[#B8924F]/30
    to-[#B8924F]/10

    xl:block
  "
      />

      <div
        aria-hidden="true"
        className="
    absolute
    bottom-0
    right-[17.5%]
    top-0
    z-[2]
    hidden
    w-px
    bg-gradient-to-b
    from-transparent
    via-[#B8924F]/50
    to-transparent

    xl:block
  "
      />

      {/* Right-side gold illumination */}
      <div
        aria-hidden="true"
        className="
    absolute
    -right-[300px]
    top-[5%]
    z-[1]
    hidden
    h-[780px]
    w-[620px]
    rounded-full

    lg:block
  "
        style={{
          background:
            "radial-gradient(ellipse at left center, rgba(221,188,105,0.13) 0%, rgba(221,188,105,0.045) 34%, transparent 66%)",
        }}
      />

      {/* Large right gold arc */}
      <div
        aria-hidden="true"
        className="
    absolute
    -right-[390px]
    top-[7%]
    z-[3]
    hidden
    h-[900px]
    w-[720px]
    rounded-[50%]
    border
    border-[#D8AE52]/70

    lg:block

    2xl:-right-[340px]
    2xl:h-[980px]
    2xl:w-[790px]
  "
      />

      {/* Right upper thin curve */}
      <div
        aria-hidden="true"
        className="
    absolute
    -right-[100px]
    -top-[520px]
    z-[2]
    hidden
    h-[900px]
    w-[780px]
    rounded-full
    border
    border-[#B8924F]/25

    xl:block
  "
      />

      {/* Small glow on right arc */}
      <div
        aria-hidden="true"
        className="
    absolute
    right-[8.6%]
    top-[37%]
    z-[4]
    hidden
    h-28
    w-8
    blur-xl

    xl:block
  "
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,208,88,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Slight bottom vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[4]"
        style={{
          background:
            "linear-gradient(180deg, transparent 52%, rgba(2,9,15,0.12) 75%, rgba(1,6,11,0.42) 100%)",
        }}
      />

      {/* Subtle top depth */}
      <div
        aria-hidden="true"
        className="
    absolute
    inset-x-0
    top-0
    z-[4]
    h-36
    bg-gradient-to-b
    from-black/30
    via-black/10
    to-transparent
  "
      />

      {/* Decorative right-side statement */}
      <div
        className="
    absolute
    right-[4.5%]
    top-1/2
    z-[6]
    hidden
    -translate-y-1/2

    xl:block
  "
      >
        <div className="flex flex-col gap-4 text-[16px] font-medium uppercase tracking-[0.42em] text-white">
          <span>A</span>
          <span>Brighter</span>
          <span>Tomorrow</span>
          <span>Begins Here</span>
        </div>

        <div
          aria-hidden="true"
          className="
      mt-7
      h-px
      w-16
      bg-gradient-to-r
      from-[#D8AE52]
      to-transparent
    "
        />
      </div>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[680px]
          w-full
          max-w-[1700px]
          items-center
          px-4
          pb-12
          pt-[76px]

          sm:min-h-[740px]
          sm:px-6
          sm:pb-14
          sm:pt-24

          lg:min-h-[calc(100svh+96px)]
          lg:px-8
          lg:pb-28
          lg:pt-36
          lg:translate-y-0

          xl:px-8
        "
      >
        <div className="w-full max-w-[720px] lg:w-[58%] xl:w-[54%]">
          {/* ========================================= */}
          {/* EYEBROW / PROJECT LINE */}
          {/* ========================================= */}

          <div className="mb-8 sm:mb-8 lg:mb-7">
            <p
              className="
      text-[11px]
      font-semibold
      uppercase
      leading-[1.5]
      tracking-[0.16em]
      text-[#DDBC69]

      sm:text-xs
      sm:tracking-[0.2em]

      lg:text-[18px]
    "
            >
              {eyebrow}
            </p>

            <div
              aria-hidden="true"
              className="
      mt-3
      h-px
      w-14
      bg-gradient-to-r
      from-[#DDBC69]
      via-[#DDBC69]/70
      to-transparent

      sm:w-16
    "
            />
          </div>

          {/* ========================================= */}
          {/* HEADING */}
          {/* ========================================= */}
          <h1
            id={resolvedTitleId}
            className="
              mt-14
              font-montserrat
              leading-[0.9]
              tracking-[0.015em]
              drop-shadow-[0_5px_24px_rgba(0,0,0,0.7)]
              font-semibold
              text-[38px]
              lg:text-[56px]
              sm:mt-10
            "
          >
            <span
              className="
                block
                font-montserrat
                font-semibold
                text-[38px]
                text-[#DDBC69]
                lg:text-[56px]
              "
            >
              {brandName}
            </span>

            <span
              className="
                mt-2.5
                block
                text-[38px]
                font-semibold
                tracking-[0.2em]
                text-white
                drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]
                sm:mt-3
                font-montserrat
                lg:text-[56px]
              "
            >
              {safeProjectName}
            </span>
          </h1>

          {/* Divider */}
          <div
            className="
              mt-7
              h-px
              w-28
              bg-gradient-to-r
              from-[#ddbc69]
              via-[#ddbc69]/65
              to-transparent

              sm:w-36

                lg:mt-8
            "
          />

          {/* ========================================= */}
          {/* PROJECT FACTS */}
          {/* ========================================= */}
          <div
            className="
              mt-14
              grid
              max-w-[470px]
              grid-cols-2
              gap-x-3
              gap-y-4

              sm:mt-10
              sm:gap-x-4
              sm:gap-y-4

              lg:mt-12
              lg:max-w-none
              lg:grid-cols-4
              lg:gap-0
              lg:overflow-hidden
              lg:rounded-2xl
              lg:border
              lg:border-white/15
              lg:bg-black/45
              lg:shadow-[0_18px_45px_rgba(0,0,0,0.3)]
              lg:backdrop-blur-md
            "
          >
            {resolvedProjectFacts.map(({ label, value, Icon }, index) => (
                <div
                  key={label}
                  className={`
                  group
                  relative
                  flex
                  min-h-[50px]
                  cursor-default
                  items-center
                  gap-2.5

                  transition-all
                  duration-300
                  ease-out

                  sm:min-h-[54px]
                  sm:gap-3

                  lg:min-h-[110px]
                  lg:flex-col
                  lg:items-start
                  lg:justify-center
                  lg:gap-3
                  lg:p-4

                  lg:bg-transparent
                  lg:shadow-none

                  lg:hover:z-10
                  lg:hover:-translate-y-1
                  lg:hover:bg-[#ddbc69]/10
                  lg:hover:shadow-[0_10px_35px_rgba(221,188,105,0.12)]

                  ${index > 0 ? "lg:border-l lg:border-white/10" : ""}
                `}
                >
                  {/* Desktop Hover Accent */}
                  <span
                    aria-hidden="true"
                    className="
                    absolute
                    inset-x-0
                    bottom-0
                    hidden
                    h-[2px]
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-transparent
                    via-[#ddbc69]
                    to-transparent
                    opacity-60
                    transition-transform
                    duration-300

                    lg:block
                    lg:group-hover:scale-x-100
                  "
                  />

                  {/* Icon */}
                  <span
                    className="
                    flex
                    size-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full

                    border
                    border-[#ddbc69]/45

                    bg-black/35
                    text-[#f0cf75]

                    shadow-[0_0_18px_rgba(221,188,105,0.12)]

                    backdrop-blur-sm

                    transition-all
                    duration-300

                    lg:size-12
                    lg:bg-[#ddbc69]/15

                    lg:group-hover:scale-105
                    lg:group-hover:bg-[#ddbc69]
                    lg:group-hover:text-[#101010]
                    lg:group-hover:shadow-[0_0_24px_rgba(221,188,105,0.25)]
                  "
                  >
                    {Icon && (
                      <Icon
                        className="size-4 sm:size-[18px] lg:size-5"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    )}
                  </span>

                  {/* Mobile divider */}
                  <span
                    aria-hidden="true"
                    className="h-9 w-px shrink-0 bg-[#ddbc69]/55 lg:hidden"
                  />

                  {/* Text */}
                  <div className="min-w-0">
                    <p
                      className={`
                      text-[14px]
                      font-medium
                      leading-4
                      text-white
                      drop-shadow-[0_2px_7px_rgba(0,0,0,0.9)]

                      sm:text-[12px]
                      lg:text-[16px]
                      lg:leading-5
                      ${index >= 2 ? "hidden lg:block" : ""}
                    `}
                    >
                      {label}
                    </p>

                    <p
                      className="
                      mt-0.5
                      text-[14px]
                      font-bold
                      leading-4
                      text-white
                      drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]

                      sm:text-[16px]
                      lg:text-[18px]
                      lg:leading-5
                    "
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* ========================================= */}
          {/* CTA BUTTONS */}
          {/* ========================================= */}
          <div
            className="
              mt-9
              grid
              grid-cols-1
              gap-3

              min-[360px]:grid-cols-2

              sm:mt-8
              sm:gap-2.5

              lg:mt-7
              lg:gap-3
            "
          >
            {/* Price CTA */}
            <Link
              href={resolvedWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                min-h-[46px]
                items-center
                justify-center
                gap-1.5

                rounded-lg

                bg-gradient-to-r
                from-[#d5aa4e]
                via-[#efd170]
                to-[#d7ae55]

                px-2.5

                text-[15px]
                font-bold
                text-[#101010]

                shadow-[0_10px_24px_rgba(0,0,0,0.3)]

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:brightness-110

                focus:outline-none
                focus:ring-2
                focus:ring-[#f0d68f]

                sm:min-h-[50px]
                sm:text-[16px]

                lg:min-h-[58px]
                lg:gap-2
                lg:rounded-xl
                lg:px-3
                lg:text-[18px]
              "
            >
              <FaWhatsapp
                className="size-[18px] shrink-0 text-[#176b3a] lg:size-5"
                aria-hidden="true"
              />
              Price
              <ArrowRight
                className="
                  size-3.5
                  shrink-0
                  transition-transform
                  duration-300
                  group-hover:translate-x-1

                  lg:size-4
                "
                aria-hidden="true"
              />
            </Link>

            {/* Legal Documents */}
            <Link
              href={resolvedDocumentHref}
              className="
                group
                inline-flex
                min-h-[46px]
                items-center
                justify-center
                gap-1.5

                rounded-lg

                border
                border-[#ddbc69]/65

                bg-black/65

                px-2.5

                text-[15px]
                font-bold
                text-white

                shadow-[0_10px_24px_rgba(0,0,0,0.25)]
                backdrop-blur-md

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-[#ddbc69]
                hover:bg-[#ddbc69]
                hover:text-[#101010]

                focus:outline-none
                focus:ring-2
                focus:ring-[#ddbc69]

                sm:min-h-[50px]
                sm:text-[16px]

                lg:min-h-[58px]
                lg:gap-2
                lg:rounded-xl
                lg:px-3
                lg:text-[18px]
              "
            >
              <FileCheck2
                className="
                  size-[18px]
                  shrink-0
                  text-[#ddbc69]

                  transition-all
                  duration-300

                  group-hover:scale-110
                  group-hover:text-[#101010]

                  lg:size-5
                "
                strokeWidth={1.8}
                aria-hidden="true"
              />
              Legal Documents
            </Link>
          </div>

          {/* ========================================= */}
          {/* INVENTORY NOTE */}
          {/* ========================================= */}
          <p
            className="
              mt-6
              text-center
              text-[13px]
              font-medium
              leading-4
              text-white
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]

              sm:mt-4
              lg:mt-3
              lg:text-left
              lg:text-[18px]
            "
          >
            {inventoryNote}
          </p>
        </div>
      </div>
    </section>
  );
}
