"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getWestwynSectionSurface } from "./WestwynTheme";

import { AnimatePresence, motion } from "framer-motion";

import {
  FaDownload,
  FaFileLines,
  FaHouse,
  FaLocationDot,
  FaMapLocation,
} from "react-icons/fa6";

import { Maximize2, X } from "lucide-react";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: FaHouse,
  },
  {
    id: "location",
    label: "Location",
    icon: FaLocationDot,
  },
  {
    id: "documentation",
    label: "Documentation",
    icon: FaFileLines,
  },
];

export default function WestWynPlanLayout({
  projectName,
  overviewCards = [],
  location,
  documentation = [],
  brochureUrl,
  masterPlan = null,
  planImage = null,
  planAlt = "Project master plan",
  masterPlanSubtitle = "A vision for a brighter tomorrow",
  surface = "base",
}) {
  const [activeTab, setActiveTab] = useState("overview");

  const [isPlanOpen, setIsPlanOpen] = useState(false);

  const OverviewCards = Array.isArray(overviewCards)
    ? overviewCards.filter(Boolean)
    : [];

  const Documentation = Array.isArray(documentation)
    ? documentation.filter(Boolean)
    : [];

  const locationDescription = Array.isArray(location?.description)
    ? location.description
    : location?.description
      ? [location.description]
      : [];

  const handleBrochureDownload = () => {
    if (!brochureUrl) return;

    try {
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = `${projectName || "project"}-brochure.pdf`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading brochure:", error);
      window.open(brochureUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <section
        id="plan-layout"
        className={cn(
          `
      relative
      overflow-hidden
      border-t
      border-white/10
      py-10
      text-white
      sm:py-12
      lg:py-16
    `,
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
            top-20

            h-[420px]
            w-[420px]

            rounded-full

            bg-[#DDBC69]/[0.035]

            blur-[120px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -right-40
            bottom-0

            h-[420px]
            w-[420px]

            rounded-full

            bg-[#DDBC69]/[0.025]

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

            sm:px-6

            lg:px-8
          "
        >
          {/* =====================================================
              HEADER
          ====================================================== */}

          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="
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
              Plan Layout
            </h2>
          </div>

          {/* =====================================================
              PROJECT INFORMATION
          ====================================================== */}

          <div
            className="
              mt-7
              overflow-hidden

              rounded-[22px]

              border
              border-white/10

              bg-[#11100E]

              shadow-[0_20px_55px_rgba(0,0,0,0.28)]

              sm:mt-8

              lg:mt-10
            "
          >
            <div className="p-3 sm:p-4 lg:p-6">
              {/* Tabs */}

              <div
                className="
                  grid
                  grid-cols-3

                  overflow-hidden

                  rounded-xl

                  border
                  border-white/10

                  bg-[#080808]

                  lg:mx-auto
                  lg:max-w-3xl
                "
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;

                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative

                        flex
                        min-h-[48px]

                        items-center
                        justify-center
                        gap-2

                        px-2
                        py-2.5

                        text-[13px]
                        font-semibold

                        transition-all
                        duration-200

                        sm:text-[15px]

                        ${
                          isActive
                            ? `
                              bg-[#DDBC69]/10
                              text-[#DDBC69]
                            `
                            : `
                              text-white/65

                              hover:bg-white/[0.03]
                              hover:text-white
                            `
                        }
                      `}
                    >
                      <Icon
                        aria-hidden="true"
                        className="
                          hidden
                          size-4

                          shrink-0

                          sm:block
                          sm:size-[18px]
                        "
                      />

                      <span>{tab.label}</span>

                      {isActive ? (
                        <span
                          className="
                            absolute
                            inset-x-0
                            bottom-0

                            h-[2px]

                            bg-[#DDBC69]
                          "
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* =================================================
                  TAB CONTENT
              ================================================== */}

              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {/* OVERVIEW */}

                  {activeTab === "overview" ? (
                    <motion.div
                      key="overview"
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      <div className="mb-4">
                        <h3
                          className="
                            text-xl
                            font-semibold
                            text-white

                            sm:text-2xl
                          "
                        >
                          Project Highlights
                        </h3>
                      </div>

                      <div
                        className="
                          grid
                          grid-cols-1
                          gap-3

                          sm:grid-cols-2

                          lg:grid-cols-4
                        "
                      >
                        {OverviewCards.map((card) => {
                          const Icon = card.icon;

                          return (
                            <div
                              key={card.title}
                              className="
        pointer-events-none
        select-none

        flex
        min-h-[86px]

        items-center
        gap-3

        rounded-xl

        border
        border-white/10

        bg-[#0B0B0B]

        px-3
        py-3

        shadow-none

        hover:translate-y-0
        hover:border-white/10
        hover:bg-[#0B0B0B]
        hover:shadow-none
      "
                            >
                              {Icon ? (
                                <div
                                  className="
                                flex
                                size-10
                                shrink-0

                                items-center
                                justify-center

                                 rounded-full

                                border
                              border-[#DDBC69]/20

                                bg-[#DDBC69]/10

                               text-[#DDBC69]
                                "
                                >
                                  <Icon className="text-[17px]" />
                                </div>
                              ) : null}

                              <div className="min-w-0">
                                <p
                                  className="
                                      text-[13px]
                                      font-medium
                                      text-white/60

                                      sm:text-sm
                                    "
                                >
                                  {card.title}
                                </p>

                                <p
                                  className="
                                      mt-1

                                      text-[15px]
                                      font-semibold
                                      leading-5
                                      text-white

                                      sm:text-base
                                    "
                                >
                                  {card.value}
                                </p>

                                {card.secondaryValue ? (
                                  <p
                                    className="
                                        mt-0.5

                                        text-xs
                                        leading-5
                                        text-white/55

                                        sm:text-[13px]
                                      "
                                  >
                                    {card.secondaryValue}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : null}

                  {/* LOCATION */}

                  {activeTab === "location" ? (
                    <motion.div
                      key="location"
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white sm:text-2xl">
                          Project Location
                        </h3>
                      </div>

                      <div
                        className="
                          rounded-xl

                          border
                          border-[#DDBC69]/35

                          bg-[#0B0B0B]

                          p-4

                          sm:p-5
                        "
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="
                              flex
                              size-11
                              shrink-0

                              items-center
                              justify-center

                              rounded-full

                              border
                              border-[#DDBC69]/25

                              bg-[#DDBC69]/10

                              text-[#DDBC69]
                            "
                          >
                            <FaLocationDot className="text-xl" />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-white/60">
                              Location
                            </p>

                            <p className="mt-1 text-lg font-semibold text-white">
                              {location?.name}
                            </p>
                          </div>
                        </div>

                        {locationDescription.length > 0 ? (
                          <div
                            className="
                              mt-4
                              space-y-2.5

                              text-[15px]
                              leading-7
                              text-white/80

                              lg:text-[17px]
                              lg:leading-8
                            "
                          >
                            {locationDescription.map((paragraph, index) => (
                              <p key={`${paragraph}-${index}`}>{paragraph}</p>
                            ))}
                          </div>
                        ) : null}

                        {location?.mapUrl ? (
                          <Link
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              gold-cta-button

                              mt-5

                              inline-flex

                              items-center
                              gap-2

                              rounded-lg

                              border
                              border-[#DDBC69]

                              bg-[#DDBC69]

                              px-4
                              py-2.5

                              text-sm
                              font-semibold
                              text-black

                              transition-all
                              duration-300

                              hover:-translate-y-0.5
                              hover:bg-[#E1C474]
                            "
                          >
                            <FaMapLocation />
                            View Project Location
                          </Link>
                        ) : null}
                      </div>
                    </motion.div>
                  ) : null}

                  {/* DOCUMENTATION */}

                  {activeTab === "documentation" ? (
                    <motion.div
                      key="documentation"
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white sm:text-2xl">
                          Documentation
                        </h3>

                        <p
                          className="
                            mt-1

                            text-[15px]
                            leading-7
                            text-white/65

                            lg:text-[17px]
                          "
                        >
                          Project documentation and registration details.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {Documentation.map((item, index) => {
                          const Icon = item.icon || FaFileLines;

                          const values = Array.isArray(item.values)
                            ? item.values
                            : [item.values];

                          return (
                            <div
                              key={`${item.title}-${index}`}
                              className="
                                  rounded-xl

                                  border
                                  border-[#DDBC69]/30

                                  bg-[#0B0B0B]

                                  p-4
                                "
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className="
                                      flex
                                      size-10
                                      shrink-0

                                      items-center
                                      justify-center

                                      rounded-full

                                      bg-[#DDBC69]/10

                                      text-[#DDBC69]
                                    "
                                >
                                  <Icon />
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-white/55">
                                    {item.title}
                                  </p>

                                  <div className="mt-1 space-y-1">
                                    {values
                                      .filter(Boolean)
                                      .map((value, valueIndex) => (
                                        <p
                                          key={`${value}-${valueIndex}`}
                                          className="
                                                text-[15px]
                                                font-semibold
                                                leading-6
                                                text-white
                                              "
                                        >
                                          {value}
                                        </p>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* =================================================
                  ACTIONS
              ================================================== */}

              {(brochureUrl || location?.mapUrl) && (
                <div
                  className="
                    mt-6

                    grid
                    grid-cols-1
                    gap-3

                    sm:grid-cols-2

                    lg:max-w-2xl
                  "
                >
                  {brochureUrl ? (
                    <button
                      type="button"
                      onClick={handleBrochureDownload}
                      className="
                        gold-cta-button

                        flex

                        items-center
                        justify-center
                        gap-2

                        rounded-lg

                        border
                        border-[#DDBC69]

                        bg-[#DDBC69]

                        px-4
                        py-3

                        text-[15px]
                        font-semibold
                        text-black

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-[#E1C474]
                      "
                    >
                      <FaDownload />
                      Download Plan Layout
                    </button>
                  ) : null}

                  {location?.mapUrl ? (
                    <Link
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex

                        items-center
                        justify-center
                        gap-2

                        rounded-lg

                        border
                        border-[#DDBC69]/65

                        bg-transparent

                        px-4
                        py-3

                        text-[15px]
                        font-semibold
                        text-[#DDBC69]

                        transition-all
                        duration-300

                        hover:bg-[#DDBC69]/10
                      "
                    >
                      <FaMapLocation />
                      Project Location
                    </Link>
                  ) : null}
                </div>
              )}
            </div>

            {/* =====================================================
                MASTER PLAN
            ====================================================== */}

            <div
              className="
                border-t
                border-white/10

                bg-[#080808]

                p-3

                sm:p-4

                lg:p-6
              "
            >
              <div
                className="
                  rounded-xl

                  border
                  border-white/10

                  bg-[#101010]

                  p-3

                  sm:p-4

                  lg:p-5
                "
              >
                <div className="mb-4 px-1 sm:px-2">
                  <h3
                    className="
                      text-xl
                      font-semibold
                      text-white

                      sm:text-2xl

                      lg:text-[28px]
                    "
                  >
                    Master Plan
                  </h3>

                  <p
                    className="
                      mt-1

                      text-xs
                      uppercase

                      tracking-[0.15em]

                      text-white/45
                    "
                  >
                    {masterPlanSubtitle}
                  </p>

                  <div className="mt-2 h-[2px] w-12 bg-[#DDBC69]" />
                </div>

                {/* Residency interactive plan */}
                {masterPlan ? masterPlan : null}

                {/* Estate / County static plan */}
                {!masterPlan && planImage ? (
                  <div
                    className="
    relative

    overflow-hidden

    rounded-xl

    border
    border-white/10

    bg-white
  "
                  >
                    <Image
                      src={planImage}
                      alt={planAlt}
                      className="
    h-auto
    w-full

    object-contain
  "
                      sizes="(max-width: 1024px) 100vw, 1200px"
                    />

                    <button
                      type="button"
                      onClick={() => setIsPlanOpen(true)}
                      aria-label={`Expand ${projectName} master plan`}
                      className="
                        absolute
                        right-3
                        top-3

                        flex
                        size-10

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/15

                        bg-black/75

                        text-white

                        shadow-lg

                        backdrop-blur-md

                        transition-all

                        hover:bg-[#DDBC69]
                        hover:text-black
                      "
                    >
                      <Maximize2 className="size-4" />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATIC PLAN FULLSCREEN
      ========================================================== */}

      <AnimatePresence>
        {isPlanOpen && planImage ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setIsPlanOpen(false)}
            className="
              fixed
              inset-0
              z-[1100]

              flex
              items-center
              justify-center

              bg-black/90

              p-3

              backdrop-blur-md

              sm:p-6
            "
          >
            <button
              type="button"
              onClick={() => setIsPlanOpen(false)}
              aria-label="Close master plan"
              className="
                absolute
                right-4
                top-4
                z-20

                flex
                size-11

                items-center
                justify-center

                rounded-full

                border
                border-white/15

                bg-black/70

                text-white

                transition-all

                hover:bg-[#DDBC69]
                hover:text-black
              "
            >
              <X className="size-5" />
            </button>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              onClick={(event) => event.stopPropagation()}
              className="
                relative

                h-[84vh]
                w-[95vw]

                max-w-[1500px]

                overflow-hidden

                rounded-xl

                bg-white
              "
            >
              <Image
                src={planImage}
                alt={planAlt}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
