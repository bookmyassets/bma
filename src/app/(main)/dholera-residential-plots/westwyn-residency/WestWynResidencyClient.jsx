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

// Hero image
import heroImage from "@/assests/residential/residency/hero-test-1.webp";
import PopupLeadForm from "../../components/PopupLeadForm";
import CostSheet from "../costsheet2";
import OurCommits from "./OurCommits";
import PlanLayout from "./PlanLayout";
import DocumentVault from "./DocumentVault";

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

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section
        id="hero"
        aria-labelledby="westwyn-residency-title"
        className="relative min-h-screen min-h-[100svh] overflow-hidden bg-black text-white"
      >
        <Image
          src={heroImage}
          alt="Entrance gate of WestWyn Residency in Dholera SIR"
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
              id="westwyn-residency-title"
              className="text-[clamp(2.65rem,5vw,4rem)] font-semibold uppercase leading-[0.9] text-[#ddbc69]"
            >
              WestWyn
              <span className="mt-3 block text-[0.47em] font-medium tracking-[0.32em] text-[#ddbc69]">
                Residency
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
              1.5 km From DFC, Polarpur
            </p>

            <div className="my-6 h-px w-20 bg-[#ddbc69] sm:my-7" />

            <h2 className="max-w-xl text-[clamp(1.65rem,3vw,2.7rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-white">
              Registry-Ready. Future-Ready.
              <span className="mt-1 block">Your Legacy Starts Here.</span>
            </h2>

           {/*  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              A premium plotted community in the heart of Dholera SIR -
              India&apos;s first Greenfield Smart City and the next global
              growth engine.
            </p> */}

            <div className="mt-7 grid grid-cols-2 gap-2 sm:gap-3">
              <Link
                href="https://wa.me/918130371647?text=Hi%2C%20I%27d%20like%20the%20latest%20WestWyn%20Residency%20price%20sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_28px_rgba(37,211,102,0.25)] transition-transform hover:-translate-y-0.5 sm:gap-3 sm:px-4 sm:text-base"
              >
                <FaWhatsapp className="size-6 shrink-0" />
                <span className="leading-tight">
                  <span className="block ">Get Details on WhatsApp</span>
                  
                </span>
              </Link>

              <Link
                href="#document-vault-slider"
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
        {/* ── DESKTOP (lg+): translateX sliding ──────────────────────────── */}
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

      <ProjectAmenities />

      <DocumentVault/>

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
