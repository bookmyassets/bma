"use client";
import React, { useState } from "react";
import InlineLeadForm from "../../components/InlineLeadForm";
import { AnimatePresence } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import SoldOutProjectsSection from "../SoldOutProjects";
import WestWynAboutSection from "./About";
import Hero from "./Hero";
import { Home, LayoutGrid } from "lucide-react";

import WestWynPlotAvailability from "../components/westwyn/WestwynPlotAvailability";

import PopupLeadForm from "../../components/PopupLeadForm";
import CostSheet from "../costsheet2";
import DevelopmentProgress from "./DevelopmentProgress";
import PlanLayout from "./PlanLayout";
import SchemaMarkup from "../../components/SchemaMarkup";
import { breadcrumbSchema, realEstateSchema } from "@/lib/schema";
import DocumentVault from "../westwyn-estate/DocumentVault";
import WestWynCommitments from "../components/westwyn/WestwynCommitments";

const estateDocuments = [
  "NA / NOC Documents",
  "Title Documents",
  "Encumbrance Details",
  "Approved Plan Details",
  "Registry Information",
];

const plotOptions = [
  {
    size: 147,
    unit: "Sq. Yd.",
    Icon: Home,
    badge: "Popular"
  },

  {
    size: 250,
    unit: "Sq. Yd.",
    Icon: LayoutGrid,
  },
];

export default function WestWynEstateClient() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");

  const openContactForm = (title, headline, btnName, type) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => setIsContactFormOpen(false);

  return (
    <>
      <SchemaMarkup
        schema={realEstateSchema({
          name: "WestWyn Estates - Residential Plots in Dholera SIR",
          description: "Buy residential plots in WestWyn Estates, Dholera SIR.",
          url: "/dholera-residential-plots/westwyn-estate",
        })}
      />

      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Residential Plots", path: "/dholera-residential-plots" },
          {
            name: "WestWyn Estates",
            path: "/dholera-residential-plots/westwyn-estate",
          },
        ])}
      />

      <Hero />

       <main className="bg-[#101010] text-white">
        <DocumentVault
        projectName="WestWyn Estates"
        documents={estateDocuments}
        sectionId="westwyn-estates-document-vault"
        surface="base"
        />

        <PlanLayout surface="alt"/>

        <WestWynAboutSection surface="base" />

        <WestWynPlotAvailability
        surface="alt"
        projectName="WestWyn Estates"
        plotOptions={plotOptions}
        whatsappText="Hi, I'd like to check the current availability of plots in WestWyn Estates."
      />

      <ProjectAmenities surface="base" />

       <InlineLeadForm
        variant="common"
        theme="dark"
        title="Invest in Dholera Residential Plots"
        buttonText="Get A Call Back"
        pageName="WestWyn Estates"
      />

      <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-[#ddbc69]/50 to-transparent"
      />

      <WestWynCommitments surface="alt"/>
      
      <DevelopmentProgress />

      <FAQSection surface="base"/>
       </main>

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

    </>
  );
}
