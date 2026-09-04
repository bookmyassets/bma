"use client";
import Image from "next/image";
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

//images import
import img1 from "@/assests/residential/estates/westwyn-estates-dholera-entry-gate.webp";

import PopupLeadForm from "../../components/PopupLeadForm";
import CostSheet from "../costsheet2";
import OurCommits from "./OurCommits";
import DevelopmentProgress from "./DevelopmentProgress";
import PlanLayout from "./PlanLayout";
import SchemaMarkup from "../../components/SchemaMarkup";
import { breadcrumbSchema, realEstateSchema } from "@/lib/schema";
import ProjectPlotAvailability from "../ProjectPlotAvailability";
import DocumentVault from "../westwyn-residency/DocumentVault";

const estateDocuments = [
  "NA / NOC Documents",
  "Title Documents",
  "Encumbrance Details",
  "Approved Plan Details",
  "Registry Information",
];

export default function WestWynEstateClient() {
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
      <SchemaMarkup
        schema={realEstateSchema({
          name: "WestWyn Estates - Residential Plots in Dholera SIR",
          description: "Buy residential plots in WestWyn Estates, Dholera SIR.",
          url: "/dholera-residential-plots/westwyn-estates",
        })}
      />

      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Residential Plots", path: "/dholera-residential-plots" },
          {
            name: "WestWyn Estates",
            path: "/dholera-residential-plots/westwyn-estates",
          },
        ])}
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section
        id="hero"
        aria-labelledby="westwyn-estates-title"
        className="relative min-h-screen min-h-[100svh] overflow-hidden bg-black text-white"
      >
        {/* ── DESKTOP (lg+): translateX sliding ──────────────────────────── */}
        <Image
          src={img1}
          alt="Entrance gate of WestWyn Estates in Polarpur, Dholera"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[58%_center] lg:object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.64)_38%,#000_100%)] lg:bg-[linear-gradient(90deg,#000_0%,#000_12%,rgba(0,0,0,0.86)_35%,rgba(0,0,0,0.12)_68%,transparent_100%)]"
        />

        <div className="relative z-10 flex min-h-screen min-h-[100dvh] w-full items-end px-5 pb-8 pt-28 sm:px-8 sm:pb-10 lg:items-center lg:px-10 lg:py-24 xl:px-16">
          <div className="w-full lg:w-[40%] lg:max-w-[620px]">
            <h1
              id="westwyn-estates-title"
              className="text-[clamp(2.65rem,5vw,4rem)] font-semibold uppercase leading-[0.9] text-[#ddbc69]"
            >
              WestWyn
              <span className="mt-3 block text-[0.47em] font-medium tracking-[0.32em] text-[#ddbc69]">
                Estates
              </span>
            </h1>

            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-white/85 sm:text-base">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5 shrink-0 text-[#ddbc69]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Direct Entry from State Highway-117, Polarpur
            </p>

            <div className="my-6 h-px w-20 bg-[#ddbc69] sm:my-7" />

            <h2 className="max-w-xl text-[clamp(1.65rem,3vw,2.7rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-white">
              Registry Ready. Future Ready.
            </h2>

            <div className="mt-7 grid grid-cols-2 gap-2 sm:gap-3">
              <Link
                href="https://wa.me/918130371647?text=Hi%2C%20I%27d%20like%20the%20latest%20WestWyn%20Estates%20price%20sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_28px_rgba(37,211,102,0.25)] transition-transform hover:-translate-y-0.5 sm:gap-3 sm:px-4 sm:text-base"
              >
                <FaWhatsapp className="size-6 shrink-0" aria-hidden="true" />
                <span className="leading-tight">Get Details on WhatsApp</span>
              </Link>

              <Link
                href="#westwyn-estates-document-vault"
                className="group flex min-h-14 max-sm:hidden items-center justify-center gap-2 rounded-xl border border-[#ddbc69]/70 bg-black/70 px-3 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-[#ddbc69] hover:text-black sm:gap-3 sm:text-base"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 text-[#ddbc69] transition-colors group-hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3h9l3 3v15H6z" />
                  <path d="M14 3v4h4M9 12h6M9 16h6" />
                </svg>
                <span className="leading-tight">Get Legal Documents</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── MOBILE (< lg): opacity-fade + swipe ────────────────────────── */}
      </section>
      {/* ── End Hero Section ───────────────────────────────────────────────── */}

      <div className="pt-4 pb-4">
        <WestWynAboutSection />
      </div>

      <div className="">
        <InlineLeadForm
          variant="common"
          title="Invest in Dholera Residential Plots"
          button="Connect with an Expert"
        />
      </div>

      <PlanLayout />

      <ProjectPlotAvailability
        projectName="WestWyn Estates"
        minSize={147}
        maxSize={250}
        percentage={90}
        percentageLabel="Sold"
        statusText="Limited Plots Left"
      />
        <DocumentVault
          projectName="WestWyn Estates"
          documents={estateDocuments}
          sectionId="westwyn-estates-document-vault"
        />

      <ProjectAmenities />

      <div className=" ">
        <OurCommits />
      </div>

      <DevelopmentProgress />


      <FAQSection />

      <div className=" ">
        <CostSheet projectSlug="westwyn-estate" showProjectSelector={false} />
      </div>

      <SoldOutProjectsSection />
      <PopupLeadForm type="scroll" title="Get Verified Project Details" />

      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeContactForm}
                title="Best value plots in Dholera"
                buttonName="Book a Site Visit"
                project="WestWyn Estates"
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
