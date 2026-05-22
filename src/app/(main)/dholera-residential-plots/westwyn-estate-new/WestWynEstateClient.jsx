"use client";
import Image from "next/image";
import React, { useState } from "react";
import CommonForm from "../../components/CommonForm";
import { AnimatePresence } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import SoldOutProjectsSection from "../SoldOutProjects";
import WestWynAboutSection from "./About";
import WhyInvestBookMyAssets from "./WhyInvestBookMyAssets";

//images import
import img1 from "@/assests/residential/estates/westwyn-estates-dholera-entry-gate.webp";

import img1M from "@/assests/residential/estates/westwyn-estates-dholera-entry-gate-mobile.webp";

import PopupScroll from "../../components/PopUpScroll";
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
        className="relative w-full overflow-hidden bg-black text-white"
        aria-label="WestWyn Estates hero"
      >
        {/* ── DESKTOP (lg+): translateX sliding ──────────────────────────── */}
        <div className="mx-auto grid w-full max-w-[120rem] lg:min-h-[40rem] lg:grid-cols-[40%_60%]">
          <div className="relative z-10 flex flex-col justify-center px-[clamp(1rem,4vw,3rem)] py-[clamp(3rem,7vw,6rem)] lg:py-[clamp(4rem,8vw,7rem)]">
            <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#deae3c]">
              Invest in Dholera. Invest in Tomorrow.
            </p>
            <h1 className="max-w-[42rem] text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] text-white">
              Dholera Residential Plots Starting From{" "}
              <span className="block text-[#deae3c]">₹10 Lakh</span>
            </h1>
            <p className="mt-4 max-w-[34rem] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-white/80">
              Premium residential plots in prime locations of Dholera SIR.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() =>
                  openBrochureForm(
                    "Get WestWyn Estates Price List",
                    "Share your details to receive the latest price list.",
                    "Get Price List",
                    "brochure",
                  )
                }
                className="inline-flex min-h-[3rem] items-center justify-center rounded-[0.375rem] bg-[#deae3c] px-6 text-[0.95rem] font-semibold text-black transition-colors hover:bg-[#f0c65a] focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:ring-offset-2 focus:ring-offset-black"
              >
                Get Price List
              </button>
              <button
                type="button"
                onClick={() =>
                  openContactForm(
                    "Talk to Advisor",
                    "Speak with a project advisor about WestWyn Estates.",
                    "Talk To Advisor",
                    "contact",
                    "WestWyn Estates",
                  )
                }
                className="inline-flex min-h-[3rem] items-center justify-center rounded-[0.375rem] border border-[#deae3c] px-6 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#deae3c] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:ring-offset-2 focus:ring-offset-black"
              >
                Talk To Advisor
              </button>
            </div>
          </div>

          <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[24rem] lg:min-h-full">
            <div className="relative h-full min-h-[18rem] sm:min-h-[24rem] lg:min-h-full">
              <Image
                src={img1}
                alt="WestWyn Estates, Dholera Premium Residential Plots"
                fill
                className="hidden object-cover lg:block"
                fetchPriority="high"
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
              />
              <Image
                src={img1M}
                alt="WestWyn Estates, Dholera Premium Residential Plots"
                fill
                className="object-cover lg:hidden"
                fetchPriority="high"
                sizes="100vw"
                quality={85}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-black/20 lg:to-transparent" />
            </div>
          </div>
        </div>

        {/* ── MOBILE (< lg): opacity-fade + swipe ────────────────────────── */}
      </section>
      {/* ── End Hero Section ───────────────────────────────────────────────── */}

      <WhyInvestBookMyAssets />

      <div className="pt-4 pb-4">
        <WestWynAboutSection />
      </div>

      <div className="">
        <CommonForm
          title="Want to Know More About WestWyn Estates?"
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
      <PopupScroll title="Get Verified Project Details" />

      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeContactForm}
                title={formTitle || "Best value plots in Dholera"}
                headline={formHeadline}
                buttonName={buttonName || "Book a Site Visit"}
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
