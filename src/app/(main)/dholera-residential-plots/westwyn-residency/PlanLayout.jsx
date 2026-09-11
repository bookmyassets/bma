"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  FaDownload,
  FaMapLocation,
  FaHouse,
  FaLocationDot,
  FaFileLines,
  FaLayerGroup,
  FaRulerCombined,
  FaRoad,
  FaUsers,
  FaKey,
  FaUser,
} from "react-icons/fa6";

import BrochureDownload from "../../components/BrochureDownload";

import img from "@/assests/residential/residency/westwyn-Residency.webp";

const PlanLayout = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };

  const handleAfterSubmit = () => {
    console.log("Form submitted successfully");

    setTimeout(() => {
      const link = document.createElement("a");

      link.href =
        "https://drive.google.com/file/d/1tkK2ChBBTtOR5IY31tggzxnnx9djRUlG/view?usp=sharing";

      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 300);
  };

  const overviewCards = [
    {
      title: "Land Parcel",
      value: (
        <>
          8.26 Acres
          <span className="block text-sm font-normal text-[#6F6A62] mt-0.5">
            (40,000 sq. yards)
          </span>
        </>
      ),
      icon: FaLayerGroup,
    },
    {
      title: "Location",
      value: "Pipariya",
      icon: FaLocationDot,
    },
    {
      title: "Plot Sizes",
      value: "124, 152 & 187 sq. yards",
      icon: FaRulerCombined,
    },
    {
      title: "Prime Connectivity",
      value: (
        <>
          Entry from Major
          <span className="block">District Road (MDR)</span>
        </>
      ),
      icon: FaRoad,
    },
    {
      title: "Total Units",
      value: "290 exclusive plots",
      icon: FaUsers,
    },
    {
      title: "Developer",
      value: (
        <Link
          href="/contact"
          className="hover:text-[#B8924F] transition-colors"
        >
          BookMyAssets
        </Link>
      ),
      icon: FaUser,
    },
  ];

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

  return (
    <>
      <style jsx global>{`
        .westwyn-residency-dark .plan-layout-heading {
          color: #ddbc69 !important;
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#F7F3EB] py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================
            SECTION HEADER
        ========================== */}

        <div className="mx-auto mb-4 max-w-4xl text-center sm:mb-6">
          <h2 className="plan-layout-heading font-serif text-[2rem] leading-[1.12] tracking-[-0.025em] text-[#ddbc69] sm:text-[2.25rem] lg:text-[2.55rem] xl:text-[2.75rem]">
            Plan Layout
          </h2>
        </div>

        {/* =========================
            MAIN LAYOUT
        ========================== */}

        <div className="grid overflow-hidden rounded-2xl border border-[#DED4C4] bg-white lg:grid-cols-[1fr_1.02fr]">

          {/* =========================
              LEFT CONTENT
          ========================== */}

          <div className="p-2.5 sm:p-3 lg:flex lg:flex-col lg:justify-center lg:p-4">

            {/* Tabs */}

            <div className="mb-5 grid grid-cols-3 overflow-hidden rounded-xl bg-[#F7F3EB]">

              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium transition-all duration-200 sm:text-base ${
                      isActive
                        ? "bg-[#F0E8D8] text-[#B8924F]"
                        : "text-[#6F6A62] hover:text-[#202020]"
                    }`}
                  >
                    <Icon
                      aria-hidden="true"
                      className="hidden size-4 shrink-0 sm:block sm:size-5"
                    />

                    <span>{tab.label}</span>

                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#B8924F]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* =========================
                TAB CONTENT
            ========================== */}

            <AnimatePresence mode="wait">

              {/* OVERVIEW */}

              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#202020] sm:text-2xl">
                      Project Highlights
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {overviewCards.map((card) => {
                      const Icon = card.icon;

                      return (
                        <div
                          key={card.title}
                          className="flex min-h-[74px] items-center gap-3 rounded-xl border border-[#DED4C4] bg-white px-3 py-2.5 transition-all duration-200 hover:border-[#B8924F]/60 hover:shadow-sm"
                        >
                          {/* Icon */}

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F3EB] text-[#B8924F]">
                            <Icon className="text-lg" />
                          </div>

                          {/* Content */}

                          <div className="min-w-0">
                            <p className="text-xs font-medium text-black sm:text-md">
                              {card.title}
                            </p>

                            <div className="mt-1 text-sm font-semibold leading-5 text-[#202020] sm:text-base">
                              {card.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* LOCATION */}

              {activeTab === "location" && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[240px]"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#202020] sm:text-2xl">
                      Project Location
                    </h3>
                  </div>

                  <div className="rounded-xl border border-[#ddbc69] bg-[#F7F3EB] p-4 sm:p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#B8924F]">
                        <FaLocationDot className="text-xl" />
                      </div>

                      <div>
                        <p className="text-md font-medium text-black">
                          Location
                        </p>

                        <p className="mt-1 text-lg font-semibold text-[#202020]">
                          Pipariya
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-md leading-6 text-black">
                      <p>
                        The project is strategically located in Pipariya 
                      </p>

                      <p>
                        The development enjoys direct entry from the Major
                        District Road (MDR), providing smooth connectivity to
                        surrounding areas.
                      </p>
                    </div>

                    <Link
                      href="https://maps.app.goo.gl/cokFB3ntW2a66ntD7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#B8924F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#a47e40]"
                    >
                      <FaMapLocation />
                      View Project Location
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* DOCUMENTATION */}

              {activeTab === "documentation" && (
                <motion.div
                  key="documentation"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[240px]"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-black sm:text-xl">
                      Documentation
                    </h3>

                    <p className="mt-1 text-[14px] leading-[1.6] text-black sm:text-sm">
                      Project documentation and registration details.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#ddbc69] bg-[#F7F3EB] p-2">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#B8924F]">
                          <FaFileLines />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-black">
                            Documentation
                          </p>

                          <p className="mt-1 text-md font-semibold text-black">
                            Non-Agricultural Land / No Objection Certificate
                          </p>
                          <p className="mt-1 text-md font-semibold text-black">
                            Plan Pass Approved
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#ddbc69] bg-[#F7F3EB] p-2">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#B8924F]">
                          <FaKey />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-black">
                            Possession
                          </p>

                          <p className="mt-1 text-md font-semibold text-black">
                            Immediate
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* =========================
                ACTION BUTTONS
            ========================== */}

            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">

              <button
                type="button"
                onClick={openBrochureForm}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#B8924F] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a47e40]"
              >
                <FaDownload />
                Download Plan Layout
              </button>

              <Link
                href="https://maps.app.goo.gl/cokFB3ntW2a66ntD7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#B8924F] bg-white px-4 py-3 text-sm font-medium text-[#B8924F] transition-colors hover:bg-[#F7F3EB]"
              >
                <FaMapLocation />
                Project Location
              </Link>

            </div>

          </div>

          {/* =========================
              RIGHT — MASTER PLAN
          ========================== */}

          <div className="border-t border-[#DED4C4] bg-[#F7F3EB] p-2.5 sm:p-3 lg:border-l lg:border-t-0 lg:p-4">

            <div className="flex h-full flex-col rounded-xl border border-[#DED4C4] bg-white p-2.5 sm:p-3">

              {/* Image Header */}

              <div className="mb-2 px-1 sm:px-2">

                <h3 className="text-xl font-semibold text-[#202020] sm:text-2xl">
                  Master Plan
                </h3>

                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#6F6A62]">
                  A vision for a brighter tomorrow
                </p>

                <div className="mt-2 h-[2px] w-12 bg-[#B8924F]" />

              </div>

              {/* Plan Image */}

              <div className="relative flex-1 overflow-hidden rounded-lg border border-[#DED4C4] bg-white">

                <Image
                  src={img}
                  alt="WestWyn Residency master plan layout"
                  width={1200}
                  height={900}
                  className="h-auto w-full object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =========================
          BROCHURE MODAL
      ========================== */}

      <AnimatePresence>
        {isBrochureFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-md"
            >
              <BrochureDownload
                onClose={closeBrochureForm}
                title="Get Project Plan Layout"
                buttonName="Get Brochure"
                onAfterSubmit={handleAfterSubmit}
                link="https://drive.google.com/file/d/1tkK2ChBBTtOR5IY31tggzxnnx9djRUlG/view?usp=sharing"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </section>
    </>
  );
};

export default PlanLayout;
