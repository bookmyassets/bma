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
import PopupLeadForm from "../../components/PopupLeadForm";
import { breadcrumbSchema, faqSchema, realEstateSchema } from "@/lib/schema";
import SchemaMarkup from "../../components/SchemaMarkup";
import PlanLayout from "./PlanLayout";
import Hero from "./Hero";
import DocumentVault from "../westwyn-county/DocumentVault";
import WestWynCommitments from "../components/westwyn/WestwynCommitments";
import ActiveProjectsSection from "../components/westwyn/ActiveProject";
import WestWynAboutSection from "./About";

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
      <Hero />

      <main className="bg-[#101010] text-white">
           <DocumentVault
                   projectName="WestWyn County"
                   documents={countyDocuments}
                   sectionId="westwyn-County-document-vault"
                   surface="base"
           />

           <PlanLayout surface="alt"/>

           <WestWynAboutSection surface="base" />

          <ProjectAmenities surface="base" />

          <InlineLeadForm
                  variant="common"
                  theme="dark"
                  title="Invest in Dholera Residential Plots"
                  buttonText="Get A Call Back"
                  pageName="WestWyn County"
          />

          <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-[#ddbc69]/50 to-transparent"
          />

          <WestWynCommitments surface="alt"/>

          <FAQSection />

          <ActiveProjectsSection />
      </main>

      <div className="pt-4 pb-4">
        <CostSheet projectSlug="westwyn-county" showProjectSelector={false} />
      </div>
      <PopupLeadForm type="scroll" title="Get Verified Project Details" />

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
