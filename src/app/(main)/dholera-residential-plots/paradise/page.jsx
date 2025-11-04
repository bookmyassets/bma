"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import westwyn1 from "@/assests/residential/Paradise-1-dholera-plan-layout.webp";
import banner from "@/assests/residential/paradise-hero-desktopview.webp";
import bannerMob from "@/assests/residential/paradise-hero-mob.view-webp.webp";
import { Plus, Minus } from "lucide-react";
import CommonForm from "../../components/CommonForm";
import { AnimatePresence } from "framer-motion";
import ContactForm from "../../components/Contactform";
import CostSheet from "../costsheet2";
import ActiveProjectsSection from "../ActiveProject";
import BrochureDownload from "../../components/BrochureDownload";
import { FaWhatsapp } from "react-icons/fa6";

export default function HeroCarousel() {
  const images = [{ src: westwyn1, alt: "Westwyn County View 1" }];

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

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Auto-increment counters for section 3
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start counters when section comes into view
            const sqYardsInterval = setInterval(() => {
              setSqYards((prev) => {
                if (prev >= 150) {
                  clearInterval(sqYardsInterval);
                  return 150;
                }
                /* return parseFloat((prev + 0.05).toFixed(2)); */
                return prev + 2;
              });
            }, 20);

            const plotsInterval = setInterval(() => {
              setPlots((prev) => {
                if (prev >= 9250) {
                  clearInterval(plotsInterval);
                  return 9250;
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
      { threshold: 0.5 }
    );

    const countersSection = document.getElementById("counters-section");
    if (countersSection) {
      observer.observe(countersSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <title>
        Paradise Dholera – Premium Residential Plots for Smart Investment
      </title>
      <meta
        name="description"
        content="Discover Invest in Paradise Dholera: premium residential plots with smart infrastructure, promising ROI, and excellent connectivity in Dholera SIR."
      />
      {/* Hero Section with Carousel */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[100vh] overflow-hidden">
        {/* Carousel Images */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
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
            Paradise
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
                  "Title Clear Plots Under ₹10 Lakhs",
                  "Please fill out the form to get exclusive details of Orchid. Fields marked with * are mandatory.",
                  "Get A Call Back",
                  ""
                )
              }
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full transition-colors duration-300 w-full"
            >
              Book Your Plot In Dholera under ₹10 Lakhs
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
      </div>

      {/* Section 2 - About */}
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-black mb-4">
              About <br /> Paradise
            </h2>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6">
            <p className="text-base md:text-lg font-light leading-relaxed text-gray-600">
              Paradise is a premium plotting project located in Village Shela,
              Taluka Dholera, District Ahmedabad, right within the fast
              developing Dholera Smart City (Dholera SIR). Strategically
              positioned near the upcoming Ahmedabad Dholera Expressway and
              Dholera International Airport, Paradise offers a rare blend of
              smart planning, modern infrastructure, and legally secure plots
              making it an ideal choice for buyers seeking premium Dholera
              residential plots in India’s First Greenfield Smart City.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  openContactForm(
                    "Get Verified Project Details",
                    "Please fill out the form to download our brochure. Fields marked with * are mandatory.",
                    "Get Plot Details",
                    "brochure"
                  )
                }
                className="bg-[#deae3c] text-black px-6 py-3 rounded-md font-medium hover:bg-[#f3bb39] transition duration-300 shadow-md"
              >
                Download Brochure
              </button>

              <a href="https://wa.me/918130371647">
                <button className="bg-white border w-full border-[#deae3c] text-[#deae3c] px-6 py-3 rounded-xl font-medium hover:bg-[#f8f5e6] transition-colors flex items-center justify-center gap-2">
                  <FaWhatsapp />
                  Book Site Visit
                </button>
              </a>
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
                    title: "High Growth Potential",
                    icon: "📈",
                  },
                  {
                    title: "Fully Approved and Legal",
                    icon: "🌿",
                  },
                  {
                    title: "Premium Lifestyle Infrastructure",
                    icon: "✅",
                  },
                  {
                    title: "Investor Friendly Plans",
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
                            "Inside Dholera sir, with seamless connectivity to the Ahmedabad Dholera Expressway, Dholera International Airport, and industrial hubs of Dholera Metro City."}
                          {index === 1 &&
                            "Entry at an early stage in the Dholera Smart City project, offering excellent appreciation prospects."}
                          {index === 2 &&
                            "NA/NOC approved, clear titles, and registry ready plots ensure a safe and worry free investment."}
                          {index === 3 &&
                            "Gated entry, wide internal roads, electrification, water supply, and landscaped green zones."}
                          {index === 4 &&
                            "Flexible plot sizes and convenient payment options for every budget."}
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
        {/* <CostSheet /> */}

        <CostSheet projectSlug="paradise" showProjectSelector={false} />
      </div>

      {/* Form */}
      <CommonForm title="Claim Your Spot in Gujarat’s Next Investment Hub" />

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
              <BrochureDownload
                onClose={closeContactForm}
                title={formTitle}
                headline={formHeadline}
                buttonName={buttonName}
                onAfterSubmit={handleAfterSubmit}
                link="https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
