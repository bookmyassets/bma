"use client";
import { getImageProps } from "next/image";
import React, { useState, useEffect } from "react";
import westwyn1 from "@/assests/westwyn-county/westwyn-county-1.webp";
import westwynMobile from "@/assests/westwyn-county/westwyn-county-mob1.webp";
import InlineLeadForm from "../../components/InlineLeadForm";
import { AnimatePresence } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import CostSheet from "../costsheet2";
import { FaFile, FaPhone, FaWhatsapp } from "react-icons/fa6";
import PopupLeadForm from "../../components/PopupLeadForm";
import ActiveProjectsSection from "../ActiveProject";
import { breadcrumbSchema, faqSchema, realEstateSchema } from "@/lib/schema";
import SchemaMarkup from "../../components/SchemaMarkup";
import Link from "next/link";
import WestWynAboutSection from "./About";
import PlanLayout from "./PlanLayout";
import ProjectPlotAvailability from "../ProjectPlotAvailability";
import DocumentVault from "../westwyn-residency/DocumentVault";

const countyDocuments = [
  "NA / NOC Documents",
  "Title Documents",
  "Approved Layout",
  "Plan Pass Details",
  "Registry Information",
];

const countyHeroAlt =
  "Entrance gate of WestWyn County on Fedra-Pipli State Highway";

const { props: countyDesktopHeroProps } = getImageProps({
  src: westwyn1,
  alt: countyHeroAlt,
  sizes: "100vw",
  quality: 90,
  priority: true,
});

const {
  props: { srcSet: countyMobileHeroSrcSet },
} = getImageProps({
  src: westwynMobile,
  alt: countyHeroAlt,
  sizes: "100vw",
  quality: 90,
});

export default function WestWynCountyClient() {
  const faqs = [
    {
      question: "What is cluster housing perumnas?",
      answer:
        "Cluster housing perumnas is a housing concept that consists of several houses in a gated cluster. Cluster housing perumnas offers comfortable, secure, and affordable housing with various complete and modern facilities.",
      isOpen: true,
    },
    {
      question: "Where is the location of cluster housing perumnas?",
      answer: "Location details would go here...",
      isOpen: false,
    },
    {
      question:
        "How much are the prices and types of houses in cluster housing perumnas?",
      answer: "Pricing and house type information would go here...",
      isOpen: false,
    },
    {
      question: "What are the facilities provided in cluster housing perumnas?",
      answer: "Facilities list would go here...",
      isOpen: false,
    },
  ];

  const [sqYards, setSqYards] = useState(0);
  const [plots, setPlots] = useState(0);
  const [amenities, setAmenities] = useState(0);

  // New state for brochure form
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");

  const [openIndex, setOpenIndex] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  const [eventVar, setEventVar] = useState("");

  const openContactForm = (title, headline, btnName, type, project) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsContactFormOpen(true);
    setEventVar(project);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const openBrochureForm = (title, headline, btnName, type) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };

  const handleAfterSubmit = () => {
    console.log("Form submitted successfully, type:", formType);

    if (formType === "brochure") {
      try {
        console.log("Initiating brochure download");

        setTimeout(() => {
          const link = document.createElement("a");
          link.href =
            "https://cdn.sanity.io/files/c3e1h345/projects/4fe6c7629f7f8caf78eb2b65074a0a439726b608.pdf";
          link.target = "_blank";
          link.download = "brochure.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("Download link clicked");
        }, 300);
      } catch (error) {
        console.error("Error downloading brochure:", error);
        window.open(
          "https://cdn.sanity.io/files/c3e1h345/projects/4fe6c7629f7f8caf78eb2b65074a0a439726b608.pdf",
          "_blank",
        );
      }
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Auto-increment counters for section 3
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sqYardsInterval = setInterval(() => {
              setSqYards((prev) => {
                if (prev >= 150) {
                  clearInterval(sqYardsInterval);
                  return 150;
                }
                return prev + 2;
              });
            }, 20);

            const plotsInterval = setInterval(() => {
              setPlots((prev) => {
                if (prev >= 11000) {
                  clearInterval(plotsInterval);
                  return 11000;
                }
                return prev + 2;
              });
            }, 1);

            const amenitiesInterval = setInterval(() => {
              setAmenities((prev) => {
                if (prev >= 15) {
                  clearInterval(amenitiesInterval);
                  return 15;
                }
                return prev + 1;
              });
            }, 60);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    const countersSection = document.getElementById("counters-section");
    if (countersSection) {
      observer.observe(countersSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SchemaMarkup
        schema={realEstateSchema({
          name: "WestWyn County - Residential Plots in Dholera SIR",
          description: "Buy residential plots in WestWyn County, Dholera SIR.",
          url: "/dholera-residential-plots/westwyn-county",
        })}
      />

      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Residential Plots", path: "/dholera-residential-plots" },
          {
            name: "WestWyn County",
            path: "/dholera-residential-plots/westwyn-county",
          },
        ])}
      />

      <SchemaMarkup
        schema={faqSchema([
          {
            question: "Is WestWyn County a good investment for NRIs?",
            answer:
              "WestWyn County offers clear-title, government-approved Dholera residential plots in a government and industry-backed smart city location. NRIs should review project documents, registry details, resale support, and due diligence before deciding.",
          },
          {
            question: "Where exactly is WestWyn County located?",
            answer:
              "WestWyn County is located on Fedra-Pipli State Highway near Dholera SIR, with connectivity toward Dholera International Airport and the Ahmedabad-Dholera Expressway.",
          },
          {
            question:
              "How can BookMyAssets help me buy a plot in WestWyn County?",
            answer:
              "BookMyAssets helps buyers with project guidance, site visit support, document review coordination, registry support, and resale assistance where applicable.",
          },
        ])}
      />
      {/* Hero Section */}
      <section
        id="hero"
        aria-labelledby="westwyn-county-title"
        className="relative md:min-h-screen  overflow-hidden bg-black text-white"
      >
        <picture className="absolute inset-0 block">
          <source
            media="(max-width: 767px)"
            srcSet={countyMobileHeroSrcSet}
            sizes="100vw"
          />
          <img
            {...countyDesktopHeroProps}
            className="absolute inset-0 h-auto w-full  object-center"
          />
        </picture>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.64)_38%,#000_100%)] lg:bg-[linear-gradient(90deg,#000_0%,#000_12%,rgba(0,0,0,0.86)_35%,rgba(0,0,0,0.12)_68%,transparent_100%)]"
        />

        <div className="relative z-10 flex min-h-screen min-h-[100dvh] w-full items-end px-5 pb-8 pt-28 sm:px-8 sm:pb-10 lg:items-center lg:px-10 lg:py-24 xl:px-16">
          <div className="w-full lg:w-[40%] lg:max-w-[620px]">
            <h1
              id="westwyn-county-title"
              className="text-[clamp(2.65rem,5vw,4rem)] font-semibold uppercase leading-[0.9] text-[#ddbc69]"
            >
              WestWyn
              <span className="mt-3 block text-[0.47em] font-medium tracking-[0.32em] text-[#ddbc69]">
                County
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
              Fedra-Pipli State Highway, Dholera
            </p>

            <div className="my-6 h-px w-20 bg-[#ddbc69] sm:my-7" />

            <h2 className="max-w-xl text-[clamp(1.65rem,3vw,2.7rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-white">
              Verified Resale Plots in Dholera.
            </h2>

            <div className="mt-7 grid grid-cols-2 gap-2 sm:gap-3">
              <Link
                href="https://wa.me/918130371647?text=Hi%2C%20I%27d%20like%20to%20check%20WestWyn%20County%20resale%20plot%20availability"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_28px_rgba(37,211,102,0.25)] transition-transform hover:-translate-y-0.5 sm:gap-3 sm:px-4 sm:text-base"
              >
                <FaWhatsapp className="size-6 shrink-0" aria-hidden="true" />
                <span className="leading-tight">Check Resale Availability</span>
              </Link>

              <Link
                href="#westwyn-county-document-vault"
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
      </section>

      {/* Section 2 - About */}
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-black mb-4">
              About{" "}
              <span className="max-sm:hidden">
                <br />
              </span>{" "}
              WestWyn County
            </h2>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6">
            <p className="text-base md:text-lg font-light leading-relaxed text-gray-600">
              WestWyn County, located on the Fedra-Pipli State Highway, is one
              of BookMyAssets's successfully sold-out residential plot projects
              in Dholera. Due to high demand, we are now offering verified
              resale plots in WestWyn County. If you missed the original launch,
              this is your chance to own a plot in one of Dholera's most trusted
              residential projects.
            </p>

            {/* CTA Buttons */}
            <div className=" gap-12 items-stretch space-y-4 py-4 max-sm:-px-4">
              {/* Left Content */}
              <div className=" h-full">
                <div className="flex flex-row gap-4 ">
                  <Link href="https://wa.me/918130371647">
                    <p className="bg-[#ddbc69] border border-[#ddbc69] whitespace-nowrap text-white text-base px-2 md:px-4 py-3 rounded-xl font-medium hover:bg-[#eecb71] transition-colors flex items-center justify-center gap-2">
                      <FaFile />
                      Get Brochure
                    </p>
                  </Link>

                  <Link href="tel:+918130371647">
                    <p className="bg-white border border-[#ddbc69] whitespace-nowrap text-[#ddbc69] text-base px-2 md:px-4 py-3 rounded-xl font-medium hover:bg-[#f8f5e6] transition-colors flex items-center justify-center gap-2">
                      <FaPhone />
                      Connect with our RM
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <WestWynAboutSection />
      </div>

      <ProjectPlotAvailability
        projectName="WestWyn County"
        minSize={149}
        maxSize={325}
        percentage={68}
        percentageLabel="Resale"
        statusText="Resale Plots Available"
        inventoryLabel="Resale plot sizes and availability vary by current inventory."
      />

      <div>
        <PlanLayout />
      </div>

      <DocumentVault
        projectName="WestWyn County"
        documents={countyDocuments}
        sectionId="westwyn-county-document-vault"
      />

      <div className="">
        <InlineLeadForm
          variant="common"
          title="Invest in Dholera Residential Plots"
          button="Talk to an Advisor"
        />
      </div>

      <ProjectAmenities />

      <div className="pt-4 pb-4">
        <CostSheet projectSlug="westwyn-county" showProjectSelector={false} />
      </div>
      <FAQSection />
      <PopupLeadForm type="scroll" title="Get Verified Project Details" />
      {/* <SoldOutProjectsSection /> */}
      <ActiveProjectsSection />

      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeContactForm}
                title={formTitle}
                headline={formHeadline}
                buttonName={buttonName}
                project="WestWyn County"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
