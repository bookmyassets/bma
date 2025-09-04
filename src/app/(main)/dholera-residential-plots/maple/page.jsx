"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import westwyn1 from "@/assests/residential/Maple-Township-dholera-plan-layout.webp";
import banner from "@/assests/residential/maple-hero-desktop.webp";
import bannerMob from "@/assests/residential/maple-hero-mob.view-webp.webp";
import { Plus, Minus } from "lucide-react";
import CommonForm from "../../components/CommonForm";
import { AnimatePresence } from "framer-motion";
import ContactForm from "../../components/Contactform";
import CostSheet from "../../components/costSheet";
import ActiveProjectsSection from "../ActiveProject";

export default function HeroCarousel() {
  

  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Counter states for new section 3
  const [sqYards, setSqYards] = useState(0);
  const [plots, setPlots] = useState(0);
  const [amenities, setAmenities] = useState(0);

  // New state for brochure form
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

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const handleAfterSubmit = () => {
    console.log("Form submitted successfully, type:", formType);

    if (formType === "brochure") {
      try {
        console.log("Initiating brochure download");

        // Using setTimeout to ensure the popup closes before download starts
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = "https://shorturl.at/Dv00M";
          link.target = "_blank";
          link.download = "brochure.pdf"; // Add download attribute
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("Download link clicked");
        }, 300);
      } catch (error) {
        console.error("Error downloading brochure:", error);
        window.open("https://shorturl.at/Dv00M", "_blank");
      }
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* <title>Residential Plots in Dholera SIR | Secure High-ROI Investments</title>
    <meta
        name="description"
        content="Invest in AUDA-approved residential plots in Dholera SIR! Enjoy buy-back with high growth potential in India's smart city."
      /> */}
      <title>
         Maple Township Dholera: Smart Living Plots in Gujarat
      </title>
      <meta
        name="description"
        content=" Discover your ideal plot in Maple Township Dholera! Embrace modern living with lush greenery and a prime location set for future growth."
      />
      {/* Hero Section with Carousel */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[100vh] overflow-hidden">
        {/* Carousel Images */}
        <div className="relative w-full h-full">
          
            <div
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            >
              <Image
                src={banner}
                alt="maple"
                fill
                className="w-full h-full max-sm:hidden"
                priority // Only prioritize first image
              />
              <Image
                src={bannerMob}
                alt="maple"
                fill
                className="w-full h-full md:hidden"
                priority // Only prioritize first image
              />
            </div>
        </div>

        {/* Overlay with Title and Details */}
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
          {/* Main Title */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4">
            Maple
          </h1>

          {/* Property Details */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 max-w-md w-full">
            <div className="gap-4 text-white">
              {/* Plot Information */}
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold">167</span>
                <span className="text-sm sm:text-base">plots sold</span>
              </div>

              {/* Acreage Information */}
            </div>

            {/* CTA Button */}
            <button
              onClick={() =>
                openContactForm(
                  "Maple - Premium Plots",
                  "Please fill out the form to get exclusive details of Paradise. Fields marked with * are mandatory.",
                  "Enquire Now",
                  ""
                )
              }
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full transition-colors duration-300 w-full"
            >
              Secure Your Spot at Maple
            </button>
          </div>
        </div>
      </div>

      {/* Section 2 - About */}
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-black mb-4">
              About <br /> Maple
            </h2>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6">
            <p className="text-base md:text-lg font-light leading-relaxed text-gray-600">
              Maple Township is a premium plotting project located in Village
              Gamph, Tehsil Dholera, District Ahmedabad, within the upcoming
              Dholera Smart City (Dholera SIR). Positioned strategically near
              the Ahmedabad-Dholera Expressway and close to the proposed Dholera
              International Airport, Maple Township offers a modern lifestyle
              with legally secure Dholera residential plots backed by clear
              titles and approvals. Designed with investor trust and future
              growth in mind, this township blends location advantage with
              premium infrastructure inside India’s first Greenfield Smart City.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  openContactForm(
                    "Download Brochure",
                    "Please fill out the form to download our brochure. Fields marked with * are mandatory.",
                    "Download Now",
                    "brochure"
                  )
                }
                className="bg-[#deae3c] text-black px-6 py-3 rounded-md font-medium hover:bg-[#f3bb39] transition duration-300 shadow-md"
              >
                Download Brochure
              </button>

              <button
                onClick={() =>
                  openContactForm(
                    "Book Free Site Visit",
                    "Fill the form below to schedule a site visit. Fields marked with * are mandatory.",
                    "Submit",
                    "siteVisit"
                  )
                }
                className="px-6 py-3 hover:bg-[#deae3c] bg-white border-[#deae3c] border-2 text-[#deae3c] hover:text-black   font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
              >
                Book Free Site Visit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 - Why Invest in Dholera Forest Estate */}
      <div className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-center text-[#deae3c] mb-12 md:mb-16">
            Why Invest in Paradise?
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <Image
                  src={westwyn1}
                  alt="Dholera Forest Estate Entrance"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Right Column - Investment Benefits */}
            <div className="w-full  lg:w-1/2">
              <div className="space-y-4">
                {[
                  {
                    title: "Prime Location",
                    icon: "📍",
                  },
                  {
                    title: "High Appreciation Potential",
                    icon: "📈",
                  },
                  {
                    title: "Safe and Legal",
                    icon: "🌿",
                  },
                  {
                    title: "Lifestyle Infrastructure",
                    icon: "✅",
                  },
                  {
                    title: "Investor Friendly",
                    icon: "🏆",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="group border border-gray-200 rounded-xl p-6 bg-white  transition-all duration-300 hover:shadow-lg"
                  >
                    <button
                      className="w-full flex justify-between items-center text-left focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={openIndex === index}
                      aria-controls={`benefit-${index}`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{benefit.icon}</span>
                        <span className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-[#deae3c]">
                          {benefit.title}
                        </span>
                      </div>
                      <div className="flex-shrink-0 transition-transform duration-200">
                        {openIndex === index ? (
                          <Minus className="w-6 h-6 text-[#deae3c]" />
                        ) : (
                          <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#deae3c]" />
                        )}
                      </div>
                    </button>

                    <div
                      id={`benefit-${index}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index
                          ? "max-h-96 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-10">
                        <p className="text-black leading-relaxed">
                          {index === 0 &&
                            "Located inside Dholera Sir, ensuring excellent connectivity to the Ahmedabad-Dholera Expressway, Dholera International Airport, and industrial hubs of Dholera Metro City."}
                          {index === 1 &&
                            "Early entry in the Dholera Smart City project ensures long-term value and strong ROI."}
                          {index === 2 &&
                            "Plots are NA NOC approved, registry ready, and come with clear titles."}
                          {index === 3 &&
                            "Planned township with wide internal roads, electrification, water supply, drainage system, and landscaped green spaces."}
                          {index === 4 &&
                            "Flexible plot sizes and easy payment options make it suitable for both investors and homebuyers."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-4">
        <CostSheet />
      </div>

      {/* Form */}
      <CommonForm title="Claim Your Spot in Gujarat’s Next Investment Hub" />

      <ActiveProjectsSection/>

      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeContactForm}
                title={formTitle}
                headline={formHeadline}
                buttonName={buttonName}
                /*  onAfterSubmit={handleAfterSubmit} */
              />
            </div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeContactForm}
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
