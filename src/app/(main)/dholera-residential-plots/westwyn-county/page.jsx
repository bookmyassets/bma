"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import westwyn1 from "@/assests/westwyn-county/westwyn-gate-cover.webp";
import westwyn2 from "@/assests/westwyn-county/westwyn-gate-cover-2.webp";
import westwyn3 from "@/assests/westwyn-county/westwyn-gate-cover-3.webp";
import { Plus, Minus } from "lucide-react";
import CommonForm from "../../components/CommonForm";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import CostSheet from "../../components/costSheet";

export default function HeroCarousel() {
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

  const images = [
    { src: westwyn1, alt: "Westwyn County View 1" },
    { src: westwyn2, alt: "Westwyn County View 2" },
    { src: westwyn3, alt: "Westwyn County View 3" },
  ];

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
                if (prev >= 2.66) {
                  clearInterval(sqYardsInterval);
                  return 2.66;
                }
                return parseFloat((prev + 0.05).toFixed(2));
              });
            }, 30);

            const plotsInterval = setInterval(() => {
              setPlots((prev) => {
                if (prev >= 130) {
                  clearInterval(plotsInterval);
                  return 130;
                }
                return prev + 2;
              });
            }, 25);

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
      {/* Hero Section with Carousel */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[100vh] overflow-hidden">
        {/* Carousel Images */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="w-full h-full "
                priority={index === 0} // Only prioritize first image
              />
            </div>
          ))}
        </div>

        {/* Overlay with Title and Details */}
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
          {/* Main Title */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4">
            WestWyn County
          </h1>

          {/* Property Details */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 max-w-md w-full">
            <div className="grid grid-cols-2 gap-4 text-white">
              {/* Plot Information */}
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold">130</span>
                <span className="text-sm sm:text-base">Plots Available</span>
              </div>

              {/* Acreage Information */}
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold">55</span>
                <span className="text-sm sm:text-base">Total Acres</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full transition-colors duration-300 w-full">
              Enquire Now
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
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Section 2 - About */}
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-black mb-4">
              About <br /> WestWyn County
            </h2>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6">
            <p className="text-base md:text-lg font-light leading-relaxed text-gray-600">
              WestWyn County by BookMyAssets is a premium plotted development in
              Dholera Smart City. Located on the Fedra–Pipli State Highway, our
              project is just 12 minutes away from Dholera International
              Airport. We offer smart amenities and secure investment
              opportunities with a strategic location.
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

      {/* New Section 3 - Auto-Incrementing Counters */}
      <div
        id="counters-section"
        className="py-12 md:py-20 bg-gradient-to-r from-blue-50 to-indigo-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              WestWyn County by Numbers
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the impressive scale and premium amenities that make
              WestWyn County your ideal investment destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Square Yards Counter */}
            <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-3xl md:text-5xl font-bold text-[#deae3c] mb-2 md:mb-4">
                {sqYards.toFixed(2)}
              </div>
              <div className="text-base md:text-xl font-semibold text-gray-800 mb-2">
                Acre
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Premium Residential Project
              </div>
            </div>

            {/* Plots Counter */}
            <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-3xl md:text-5xl font-bold text-[#deae3c] mb-2 md:mb-4">
                {plots}
              </div>
              <div className="text-base md:text-xl font-semibold text-gray-800 mb-2">
                Plots
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Available for Investment
              </div>
            </div>

            {/* Amenities Counter */}
            <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-3xl md:text-5xl font-bold text-[#deae3c] mb-2 md:mb-4">
                {amenities}
              </div>
              <div className="text-base md:text-xl font-semibold text-gray-800 mb-2">
                Amenities
              </div>
              <div className="text-sm md:text-base text-gray-600">
                World-Class Facilities
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 - Why Invest in Dholera Forest Estate */}
      <div className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-center text-[#deae3c] mb-12 md:mb-16">
            Why Invest in WestWyn County?
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <Image
                  src={westwyn3}
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
                    title: "Investment-Friendly",
                    icon: "📈",
                  },
                  {
                    title: "100% Government-Verified",
                    icon: "🌿",
                  },
                  {
                    title: "High ROI Potential",
                    icon: "✅",
                  },
                  {
                    title: "Smart Infrastructure",
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
                            "Located on Fedra-Pipli State Highway, just 12 minutes from Ahmedabad-Dholera Expressway, Dholera International Airport, Metro, and industrial hubs, including the TATA Semiconductor Plant (25 minutes away) and Dedicated Freight Corridor."}
                          {index === 1 &&
                            "Investment We offer registry-ready plots with flexible payment plans on Dholera residential plots. Our team ensures end-to-end assistance with resale support and buyback assistance*."}
                          {index === 2 &&
                            "We offer immediate registry on Dholera plots with NA/NOC clearance and clear titles."}
                          {index === 3 &&
                            "Early-stage entry in a developing future-ready city, with potential for 3-10x appreciation by 2030."}
                          {index === 4 &&
                            "9 meter and 12 meter internal roads, underground trunk infrastructure for wire cables, and water and drainage systems."}
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

      {/* Section 5 - Features */}
      {/* <div className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-[#deae3c] mb-12 md:mb-16">
            Features
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="space-y-4">
                {[
                  {
                    title: "Forest-Themed Living",
                    icon: "🌲",
                  },
                  {
                    title: "Plots and Villas",
                    icon: "🏡",
                  },
                  {
                    title: "Family-Friendly Spaces",
                    icon: "👨‍👩‍👧‍👦",
                  },
                  {
                    title: "Commercial Hub",
                    icon: "🏢",
                  },
                  {
                    title: "Eco-Friendly Design",
                    icon: "♻️",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group border border-gray-200 rounded-xl p-6 bg-white hover:bg-black hover:border-[#deae3c] transition-all duration-300 hover:shadow-lg"
                  >
                    <button
                      className="w-full flex justify-between items-center text-left focus:outline-none"
                      onClick={() => toggleFAQ(index + 10)}
                      aria-expanded={openIndex === index + 10}
                      aria-controls={`feature-${index}`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{feature.icon}</span>
                        <span className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-[#deae3c]">
                          {feature.title}
                        </span>
                      </div>
                      <div className="flex-shrink-0 transition-transform duration-200">
                        {openIndex === index + 10 ? (
                          <Minus className="w-6 h-6 text-[#deae3c]" />
                        ) : (
                          <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#deae3c]" />
                        )}
                      </div>
                    </button>

                    <div
                      id={`feature-${index}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index + 10
                          ? "max-h-96 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-10">
                        <p className="text-black hover:text-[#deae3c] leading-relaxed">
                          {index === 0 &&
                            "Experience living surrounded by nature with thoughtfully designed green spaces and forest aesthetics."}
                          {index === 1 &&
                            "Choose from premium plots for custom homes or ready-to-move villas with modern amenities."}
                          {index === 2 &&
                            "Dedicated children's play areas, parks, and recreational facilities for the entire family."}
                          {index === 3 &&
                            "Integrated commercial spaces for shopping, dining, and essential services within the community."}
                          {index === 4 &&
                            "Sustainable development practices with solar power, rainwater harvesting, and waste management systems."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative">
                <Image
                  src={westwyn3}
                  alt="WestWyn County Master Plan"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <ProjectAmenities />
      <div className="pt-4 pb-4">
        <CostSheet />
      </div>
      <FAQSection/>
      {/* Form */}
      <CommonForm title="Claim Your Spot in Gujarat’s Next Investment Hub" />

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
