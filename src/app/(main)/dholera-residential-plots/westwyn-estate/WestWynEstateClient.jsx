"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InlineLeadForm from "../../components/InlineLeadForm";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import SoldOutProjectsSection from "../SoldOutProjects";
import WestWynAboutSection from "./About";

//images import
import img1 from "@/assests/residential/estates/westwyn-estates-dholera-entry-gate.webp";

import img1M from "@/assests/residential/estates/westwyn-estates-dholera-entry-gate-mobile.webp";

import PopupLeadForm from "../../components/PopupLeadForm";
import CostSheet from "../costsheet2";
import OurCommits from "./OurCommits";
import PlanLayout from "./PlanLayout";
import SchemaMarkup from "../../components/SchemaMarkup";
import { breadcrumbSchema, realEstateSchema } from "@/lib/schema";

export default function WestWynEstateClient() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
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
      <div id="hero" className="relative w-full overflow-hidden">
        {/* ── DESKTOP (lg+): translateX sliding ──────────────────────────── */}
        <div
          className="hidden lg:flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="w-full flex-shrink-0 relative">
            <div className="relative w-full md:h-[70vh] aspect-[3/1]">
              <Image
                src={img1}
                alt="WestWyn Estates, Dholera Premium Residential Plots"
                fill
                className="object-fill aspect-[3/1]"
                fetchPriority="high"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* ── MOBILE (< lg): opacity-fade + swipe ────────────────────────── */}
        <div
          className="relative block lg:hidden w-full"
          style={{ aspectRatio: "5/4" }}
          role="region"
          aria-label="Mobile image carousel"
        >
          <div>
            <Image
              src={img1M}
              alt="WestWyn Estates, Dholera Premium Residential Plots"
              fill
              className="object-cover"
              fetchPriority="high"
              sizes="100vw"
              quality={85}
            />
          </div>
        </div>
      </div>
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

      <ProjectAmenities />

      <div className=" ">
        <OurCommits />
      </div>

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
