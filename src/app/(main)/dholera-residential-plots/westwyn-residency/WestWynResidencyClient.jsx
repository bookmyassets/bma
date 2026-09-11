"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import InlineLeadForm from "../../components/InlineLeadForm";
import { AnimatePresence } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import SoldOutProjectsSection from "../SoldOutProjects";
import WestWynAboutSection from "./About";
import PopupLeadForm from "../../components/PopupLeadForm";
import CostSheet from "../costsheet2";
import OurCommits from "./OurCommits";
import PlanLayout from "./PlanLayout";
import DocumentVault from "./DocumentVault";
import Hero from "./Hero";
import {
  FileCheck2,
  Home,
  LayoutGrid,
  Ruler,
  Trees,
  UsersRound,
} from "lucide-react";

const availablePlotSizes = [
  {
    size: 124,
    description: "Compact plot for a practical future home",
    Icon: Home,
  },
  {
    size: 152,
    description: "Balanced space for comfortable residential planning",
    Icon: UsersRound,
    popular: true,
  },
  {
    size: 187,
    description: "Larger plot with more flexibility for future use",
    Icon: LayoutGrid,
  },
];

function PlotAvailabilitySection() {
  const soldPercentage = 20;
  const progressRadius = 42;
  const progressCircumference = 2 * Math.PI * progressRadius;

  const progressOffset =
    progressCircumference -
    (progressCircumference * soldPercentage) / 100;

  return (
    <section
      aria-labelledby="plot-availability-title"
      className="
        relative
        overflow-hidden
        bg-[#24231F]
        text-[#F4EFE6]
      "
    >
      {/* Background Glow */}
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
          bg-[#C9A65D]/[0.05]
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
          bg-[#C9A65D]/[0.035]
          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1400px]

          px-3
          py-4

          sm:px-6
          sm:py-5

          lg:px-6
          lg:py-6

          xl:px-7
          xl:py-7
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto max-w-[900px] text-center">
          <h2
            id="plot-availability-title"
            className="
              font-serif
              font-medium
              leading-[1.1]
              tracking-[-0.025em]
              text-[#ca8a04]

              text-[1.6rem]

              sm:text-[1.9rem]

              lg:text-[2.15rem]

              xl:text-[2.3rem]
            "
          >
            Choose the Plot Size
          </h2>
        </div>

        {/* =====================================================
            PLOT SIZE CARDS
        ====================================================== */}

        <div
          className="
            mt-3
            grid
            grid-cols-3
            gap-1.5

            sm:mt-4
            sm:gap-3

            md:gap-3

            lg:mt-4
            lg:gap-4
          "
        >
          {availablePlotSizes.map(
            ({ size, description, Icon, popular }) => (
              <div
                key={size}
                className={`
                  group
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

                  transition-colors
                  duration-300

                  sm:px-2
                  sm:py-2.5

                  md:rounded-xl
                  md:p-2.5

                  lg:p-2.5

                  ${
                    popular
                      ? "pt-4 sm:pt-4 md:pt-4 lg:pt-4"
                      : ""
                  }
                `}
              >
                {/* =================================================
                    POPULAR TAG
                ================================================== */}

                {popular && (
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
                      {/* top highlight */}
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

                      {/* indicator */}
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
                        Popular
                      </span>
                    </div>
                  </div>
                )}

                {/* Subtle card glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10

                    hidden
                    size-28

                    rounded-full
                    bg-[#C9A65D]/[0.035]
                    blur-2xl

                    md:block
                  "
                />

                {/* ================= MOBILE ================= */}

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
                    {size}
                  </p>

                  <p
                    className="
                      mt-1
                      text-[15px]
                      font-medium
                      text-white
                    "
                  >
                    Sq. Yd.
                  </p>
                </div>

                {/* ================= TABLET / DESKTOP ================= */}

                <div className="hidden md:block">
                  {/* Size Header */}
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
                    {/* Icon */}
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

                    {/* Number */}
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
                        {size}
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
                        Sq. Yd.
                      </p>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="my-2.5 h-px w-full bg-[#4C463C]" />

                  {/* Description */}
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
                    <Icon
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

                        lg:text-[15px]
                      "
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Mobile note */}
        <p
          className="
            mt-2

            text-center
            text-[12px]
            leading-4
            text-white

            md:hidden
          "
        >
          Plot sizes are subject to current availability.
        </p>

        {/* =====================================================
            PROJECT AVAILABILITY
        ====================================================== */}

        <div
          className="
            mx-auto
            mt-3
            overflow-hidden

            rounded-xl

            border
            border-[#C9A65D]/50

            bg-[linear-gradient(
              120deg,
              rgba(0,0,0,0.12),
              rgba(201,166,93,0.03),
              rgba(0,0,0,0.08)
            )]

            p-2.5

            shadow-[0_14px_40px_rgba(0,0,0,0.12)]

            sm:mt-3
            sm:p-3

            lg:mt-4
            lg:max-w-[900px]
            lg:px-4
            lg:py-3

            xl:max-w-[900px]
          "
        >
          <div
            className="
              grid
              w-full
              gap-3

              lg:grid-cols-[180px_minmax(360px,440px)]
              lg:items-center
              lg:justify-center
              lg:gap-8

              xl:grid-cols-[190px_minmax(380px,460px)]
              xl:gap-10
            "
          >
            {/* =================================================
                AVAILABILITY DATA
            ================================================== */}

            <div
              className="
                text-center

                lg:flex
                lg:flex-col
                lg:items-center
                lg:justify-center
              "
            >
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#C9A65D]

                  sm:text-xs

                  lg:text-sm
                "
              >
                Availability Status
              </p>

              {/* Circular progress */}
              <div
                className="
                  mt-1.5
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  role="progressbar"
                  aria-label={`${soldPercentage} percent of plots sold`}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={soldPercentage}
                  className="
                    relative
                    size-[96px]

                    sm:size-[102px]

                    lg:size-[100px]
                  "
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="size-full -rotate-90"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="availability-progress-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#C9A65D"
                        />

                        <stop
                          offset="100%"
                          stopColor="#F0CB70"
                        />
                      </linearGradient>
                    </defs>

                    <circle
                      cx="50"
                      cy="50"
                      r={progressRadius}
                      fill="none"
                      stroke="#6A665F"
                      strokeOpacity="0.45"
                      strokeWidth="7"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r={progressRadius}
                      fill="none"
                      stroke="url(#availability-progress-gradient)"
                      strokeLinecap="round"
                      strokeWidth="7"
                      strokeDasharray={progressCircumference}
                      strokeDashoffset={progressOffset}
                      className="
                        transition-[stroke-dashoffset]
                        duration-700
                        ease-out
                      "
                    />
                  </svg>

                  {/* Centered percentage */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2

                      -translate-x-1/2
                      -translate-y-1/2

                      text-center
                    "
                  >
                    <span
                      className="
                        block
                        whitespace-nowrap

                        font-sans
                        text-[1.5rem]
                        font-bold
                        leading-none
                        tracking-tight
                        text-[#D5B468]

                        sm:text-[1.65rem]
                      "
                    >
                      {soldPercentage}%
                    </span>

                    <span
                      className="
                        mt-1
                        block

                        font-sans
                        text-[8px]
                        font-semibold
                        uppercase
                        leading-none
                        tracking-[0.18em]
                        text-[#F4EFE6]

                        sm:text-[9px]
                      "
                    >
                      Sold
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                WHATSAPP CTA
            ================================================== */}

            <div
              className="
                flex
                items-center
                justify-center

                border-t
                border-[#4C463C]

                pt-3

                lg:min-h-[115px]
                lg:border-l
                lg:border-t-0
                lg:pl-4
                lg:pr-0
                lg:pt-0
              "
            >
              <div
                className="
                  w-full

                  lg:max-w-[520px]
                "
              >
                <Link
                  href="https://wa.me/918130371647?text=Hi%2C%20I%27d%20like%20to%20check%20the%20current%20availability%20of%20plots%20in%20WestWyn%20Residency."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group

                    mx-auto
                    flex
                    min-h-[40px]
                    w-full
                    items-center
                    justify-center
                    gap-2

                    rounded-lg

                    border
                    border-[#C9A65D]

                    bg-[linear-gradient(90deg,#C9A65D,#E0BE72)]

                    px-3
                    py-1

                    text-[15px]
                    font-semibold
                    text-[#24231F]

                    shadow-[0_10px_26px_rgba(201,166,93,0.15)]

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:shadow-[0_14px_32px_rgba(201,166,93,0.22)]

                    sm:min-h-[40px]
                    sm:text-md

                    lg:min-h-[46px]
                    lg:max-w-[400px]
                  "
                >
                  <FaWhatsapp
                    aria-hidden="true"
                    className="
                      size-[25px]
                      shrink-0

                      text-green-700

                      transition-transform
                      duration-300

                      group-hover:scale-105

                      sm:size-[25px]
                    "
                  />

                  <span>Check Availability</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WestWynResidencyClient() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");
  const [eventVar, setEventVar] = useState("");

  const openContactForm = (title, headline, btnName, type, project) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsContactFormOpen(true);
    setEventVar(project);
  };

  const closeContactForm = () => setIsContactFormOpen(false);

  const openBrochureForm = (title, headline, btnName, type) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => setIsBrochureFormOpen(false);

  const handleAfterSubmit = () => {
    console.log("Form submitted successfully, type:", formType);
    if (formType === "brochure") {
      try {
        setTimeout(() => {
          const link = document.createElement("a");
          link.href =
            "https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf";
          link.target = "_blank";
          link.download = "brochure.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 300);
      } catch (error) {
        console.error("Error downloading brochure:", error);
        window.open(
          "https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf",
          "_blank",
        );
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Westwyn Residency",
            image:
              "https://www.bookmyassets.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwestwyn-residency-dholera-entry-gate-hero.117c5f91.webp&w=1920&q=75&dpl=dpl_7qHQ2s7hGsjaNs7PGckW61725kmB",
            description:
              "Explore WestWyn Residency in Pipariya, Dholera premium registry-ready residential plots with strong connectivity, document support, and guided site visit assistance for serious buyers.",
            brand: {
              "@type": "Brand",
              name: "BookMyAssets",
            },
            offers: {
              "@type": "Offer",
              url: "https://www.bookmyassets.com/dholera-residential-plots/westwyn-residency",
              priceCurrency: "INR",
              price: "850000",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "4",
              ratingCount: "4",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "1",
                item: "https://www.bookmyassets.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "2",
                item: "https://www.bookmyassets.com/dholera-residential-plots/westwyn-residency",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "3",
                item: "https://www.bookmyassets.com/dholera-residential-plots/westwyn-estate",
              },
            ],
          }),
        }}
      />
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
                  text: "WestWyn Residency is located in Pipariya, Dholera, with connectivity to the Dholera SIR boundary, Bhimnath Railway Station, Ahmedabad-Dholera Expressway, the activation area, and the airport corridor.",
                },
              },
              {
                "@type": "Question",
                name: "Is WestWyn Residency a residential plot project?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, WestWyn Residency is a premium residential plotted project designed for buyers looking for long-term investment potential as well as future residential use.",
                },
              },
              {
                "@type": "Question",
                name: "Is WestWyn Residency registry-ready?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, WestWyn Residency is presented as a registry-ready residential plot project with immediate possession, which makes it suitable for buyers who want greater clarity and quicker ownership transfer.",
                },
              },
              {
                "@type": "Question",
                name: "What documentation is available for WestWyn Residency?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The project highlights NA/NOC documentation and also lists NA/NOC/Title Clearance among its commitments. Buyers should still review all documents carefully before proceeding, and BookMyAssets offers support during that process.",
                },
              },
              {
                "@type": "Question",
                name: "What plot sizes are available in WestWyn Residency?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WestWyn Residency offers residential plots in 124, 152, and 187 sq. yards, subject to current availability.",
                },
              },
              {
                "@type": "Question",
                name: "What is the price of plots in WestWyn Residency?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The page currently lists the project price at ₹6500 per sq. yard. Final costing may vary depending on plot selection and charges, so buyers should request the latest price sheet and cost estimate.",
                },
              },
              {
                "@type": "Question",
                name: "What amenities are available in WestWyn Residency?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The project highlights amenities such as a gated community, 24/7 security with CCTV, kids play area, app-based management, power and water supply, yoga deck, jogging track, senior citizen zone, EV charging station, wide internal roads, drainage system, and clubhouse lite",
                },
              },
              {
                "@type": "Question",
                name: "Can I plan a site visit before buying?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. BookMyAssets offers 365 days site visit assistance, and the page also invites buyers to book a site visit for project guidance and on-ground understanding.",
                },
              },
              {
                "@type": "Question",
                name: "What support does BookMyAssets provide to buyers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "BookMyAssets highlights support with project understanding, plot guidance, site visit assistance, next-step coordination, immediate registry support, resale support, and buyback assistance.",
                },
              },
              {
                "@type": "Question",
                name: "Is WestWyn Residency suitable for both investors and future end users?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The page positions WestWyn Residency for both investment-focused buyers and those considering future residential use, depending on their timeline and goals.",
                },
              },
            ],
          }),
        }}
      />

      <style jsx global>{`
        .westwyn-residency-dark {
          background-color: #000;
          color: #fff;
        }

        .westwyn-residency-dark section {
          background-color: #000 !important;
          color: #fff !important;
        }

        .westwyn-residency-dark [class~="bg-[#F7F3EB]"],
        .westwyn-residency-dark [class*="bg-[#F7F3EB]/"],
        .westwyn-residency-dark [class~="bg-[#FBF8F2]"],
        .westwyn-residency-dark [class*="bg-[#FBF8F2]/"],
        .westwyn-residency-dark [class~="bg-[#FCFAF6]"],
        .westwyn-residency-dark [class*="bg-[#FCFAF6]/"],
        .westwyn-residency-dark [class~="bg-[#F0E8D8]"],
        .westwyn-residency-dark [class~="bg-[#F8F3E9]"],
        .westwyn-residency-dark [class~="bg-[#F2EBDD]"],
        .westwyn-residency-dark [class*="bg-[#F2EBDD]/"],
        .westwyn-residency-dark [class~="bg-[#F3EEE4]"],
        .westwyn-residency-dark [class~="bg-white"],
        .westwyn-residency-dark [class*="bg-white/"],
        .westwyn-residency-dark [class~="bg-gray-50"],
        .westwyn-residency-dark [class~="bg-gray-100"] {
          background-color: #0d0d0d !important;
        }

        .westwyn-residency-dark [class~="text-[#202020]"],
        .westwyn-residency-dark [class~="text-[#303030]"],
        .westwyn-residency-dark [class~="text-black"],
        .westwyn-residency-dark [class~="text-gray-600"],
        .westwyn-residency-dark [class~="text-gray-700"],
        .westwyn-residency-dark [class~="text-[#6F6A62]"],
        .westwyn-residency-dark [class~="text-[#777067]"],
        .westwyn-residency-dark [class~="text-[#8B857C]"],
        .westwyn-residency-dark [class~="text-[#918B82]"],
        .westwyn-residency-dark [class~="text-[#938D83]"] {
          color: #fff !important;
        }

        .westwyn-residency-dark h2,
        .westwyn-residency-dark h3 {
          color: #fff !important;
        }

        .westwyn-residency-dark [class~="border-[#DED4C4]"],
        .westwyn-residency-dark [class*="border-[#DED4C4]/"],
        .westwyn-residency-dark [class~="border-gray-100"],
        .westwyn-residency-dark [class~="border-gray-200"] {
          border-color: rgba(255, 255, 255, 0.14) !important;
        }

        .westwyn-residency-dark [class~="text-[#B8924F]"],
        .westwyn-residency-dark [class~="text-[#9D6C20]"],
        .westwyn-residency-dark [class~="text-[#9D7839]"],
        .westwyn-residency-dark [class~="text-[#8B6B35]"],
        .westwyn-residency-dark [class~="text-[#ca8a04]"],
        .westwyn-residency-dark [class~="hover:text-[#202020]"]:hover,
        .westwyn-residency-dark [class~="hover:text-[#7D5B27]"]:hover {
          color: #ddbc69 !important;
        }

        .westwyn-residency-dark [class~="border-[#B8924F]"],
        .westwyn-residency-dark [class*="border-[#B8924F]/"] {
          border-color: #ddbc69 !important;
        }

        .westwyn-residency-dark [class~="bg-[#B8924F]"],
        .westwyn-residency-dark [class~="bg-blue-600"] {
          background-color: #ddbc69 !important;
        }

        .westwyn-residency-dark [class~="text-emerald-600"],
        .westwyn-residency-dark [class~="text-blue-600"],
        .westwyn-residency-dark [class~="text-violet-600"],
        .westwyn-residency-dark [class~="text-rose-600"],
        .westwyn-residency-dark [class~="text-orange-500"] {
          color: #ddbc69 !important;
        }

        .westwyn-residency-dark [class~="text-sky-700"],
        .westwyn-residency-dark [class~="text-violet-700"],
        .westwyn-residency-dark [class~="text-indigo-700"],
        .westwyn-residency-dark [class~="text-emerald-700"],
        .westwyn-residency-dark [class~="text-amber-700"],
        .westwyn-residency-dark [class~="text-rose-700"],
        .westwyn-residency-dark [class~="text-orange-700"],
        .westwyn-residency-dark [class~="text-cyan-700"],
        .westwyn-residency-dark [class~="text-teal-700"],
        .westwyn-residency-dark [class~="text-fuchsia-700"] {
          color: #ddbc69 !important;
        }

        .westwyn-residency-dark [class~="bg-sky-100"],
        .westwyn-residency-dark [class~="bg-violet-100"],
        .westwyn-residency-dark [class~="bg-indigo-100"],
        .westwyn-residency-dark [class~="bg-emerald-100"],
        .westwyn-residency-dark [class~="bg-amber-100"],
        .westwyn-residency-dark [class~="bg-rose-100"],
        .westwyn-residency-dark [class~="bg-orange-100"],
        .westwyn-residency-dark [class~="bg-cyan-100"],
        .westwyn-residency-dark [class~="bg-teal-100"],
        .westwyn-residency-dark [class~="bg-fuchsia-100"] {
          background-color: rgba(221, 188, 105, 0.1) !important;
        }

        .westwyn-residency-dark [class~="bg-emerald-50"],
        .westwyn-residency-dark [class~="bg-blue-50"],
        .westwyn-residency-dark [class~="bg-violet-50"],
        .westwyn-residency-dark [class~="bg-rose-50"],
        .westwyn-residency-dark [class~="bg-orange-50"] {
          background-color: rgba(221, 188, 105, 0.1) !important;
        }

        .westwyn-residency-dark [class~="border-emerald-100"],
        .westwyn-residency-dark [class~="border-blue-100"],
        .westwyn-residency-dark [class~="border-violet-100"],
        .westwyn-residency-dark [class~="border-rose-100"],
        .westwyn-residency-dark [class~="border-orange-100"] {
          border-color: rgba(221, 188, 105, 0.3) !important;
        }

        .westwyn-residency-dark h2 {
          font-size: 2rem !important;
          line-height: 1.12 !important;
        }

        .westwyn-residency-dark p,
        .westwyn-residency-dark li,
        .westwyn-residency-dark button,
        .westwyn-residency-dark a {
          font-size: 1rem !important;
          line-height: 1.5 !important;
        }

        @media (min-width: 640px) {
          .westwyn-residency-dark h2 {
            font-size: 2.25rem !important;
          }
        }

        @media (min-width: 1024px) {
          .westwyn-residency-dark h2 {
            font-size: 2.55rem !important;
          }
        }

        @media (min-width: 1280px) {
          .westwyn-residency-dark h2 {
            font-size: 2.75rem !important;
          }
        }
      `}</style>

      <Hero />

      <div className="westwyn-residency-dark">
        <WestWynAboutSection />

        <PlotAvailabilitySection />
        <PlanLayout />

        <div className="-mt-4 sm:-mt-2">
          <InlineLeadForm
            variant="common"
            title="Invest in Dholera Residential Plots"
            button="Connect with an Expert"
          />
        </div>

        <ProjectAmenities />

        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-[#ddbc69]/50 to-transparent"
        />

        <DocumentVault />

        <div className=" ">
          <OurCommits />
        </div>

        <FAQSection />

        <div className=" ">
          <CostSheet
            projectSlug="westwyn-residency"
            showProjectSelector={false}
          />
        </div>

        <SoldOutProjectsSection />
      </div>
      <PopupLeadForm type="scroll" title="Get Verified Project Details" />

      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeContactForm}
                title={formTitle || "Book a WestWyn Residency Site Visit"}
                headline={formHeadline}
                buttonName={buttonName || "Book Site Visit"}
                project="WestWyn Residency"
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeBrochureForm}
                title={formTitle}
                headline={formHeadline}
                buttonName={buttonName}
                onAfterSubmit={handleAfterSubmit}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
