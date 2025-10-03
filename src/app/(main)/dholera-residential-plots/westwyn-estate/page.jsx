"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import westwyn1 from "@/assests/westwyn-county/westwyn-gate-cover.webp";
import westwyn2 from "@/assests/westwyn-county/westwyn-1.webp";
import westwyn3 from "@/assests/westwyn-county/westwyn-2.webp";
import { Plus, Minus, ChevronLeft, ChevronRight, Scroll } from "lucide-react";
import CommonForm from "../../components/CommonForm";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import SoldOutProjectsSection from "../SoldOutProjects";
import InvestmentBenefits from "./Benefits";
import WestWynAboutSection from "./About";

//images import
import img1 from "@/assests/residential/estate1.webp";
import img2 from "@/assests/residential/estate2.webp";
import img3 from "@/assests/residential/estate3.webp";
import logo from "@/assests/ad-page/dholera-govt-logo.webp";
import imgM1 from "@/assests/residential/estate1M.webp";
import imgM2 from "@/assests/residential/estate2M.webp";
import imgM3 from "@/assests/residential/estate3M.webp";
import PopupScroll from "../../components/PopUpScroll";
import CostSheet from "../costsheet2";


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
    { src: westwyn1, alt: "Westwyn Estate View 1" },
    { src: westwyn2, alt: "Westwyn Estate View 2" },
    { src: westwyn3, alt: "Westwyn Estate View 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);

  // Counter states for new section 3
  const [sqYards, setSqYards] = useState(0);
  const [plots, setPlots] = useState(0);
  const [amenities, setAmenities] = useState(0);

  // New state for brochure form
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const desktopImages = [
    { src: img1, alt: "Dholera Investment Opportunity 1" },
    { src: img2, alt: "Dholera Investment Opportunity 2" },
    { src: img3, alt: "Dholera Investment Opportunity 3" },
  ];

  const mobileImages = [
    { src: imgM1, alt: "Dholera Mobile 1" },
    { src: imgM2, alt: "Dholera Mobile 2" },
    { src: imgM3, alt: "Dholera Mobile 3" },
  ];

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentSlide((prev) =>
        prev === mobileImages.length - 1 ? 0 : prev + 1
      );
    } else if (touchEnd - touchStart > 50) {
      setCurrentSlide((prev) =>
        prev === 0 ? mobileImages.length - 1 : prev - 1
      );
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === desktopImages.length - 1 ? 0 : prev + 1
    );
  };
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1
    );
  };

  const openContactForm = (title, headline, btnName, type) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen();
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
      <title>WestWyn Estate – Secure Plots Near Dholera SIR</title>
      <meta
        name="description"
        content="Invest in plots in Dholera at WestWyn Estate, 0 km from Dholera SIR, and close to proximity to the activation area at an unbeatable price."
      />
      {/* Hero Section with Carousel */}
      <div className="h-screen flex flex-col">
        {" "}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* Left Side - Slider Section (60%) */}
          <div className="w-full lg:w-[60%] relative flex-1">
            {/* Desktop Slider */}
            <div className="absolute inset-0 hidden lg:block">
              <div className="relative w-full h-full overflow-hidden">
                {desktopImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Navigation */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Marquee at bottom of carousel */}
              </div>
            </div>

            {/* Mobile Slider */}
            <div
              className="absolute inset-0 block lg:hidden overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {mobileImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Marquee at bottom of mobile carousel */}
            </div>
          </div>

          {/* Right Side - Lead Form Section (40%) */}

          <div className="w-full lg:w-[40%] bg-gray-100 flex items-center justify-center p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full max-w-md"
            >
              {/* Logo Section */}
              <div className="text-center mb-4 lg:mb-6 h-auto w-auto">
                <Image
                  src={logo}
                  alt="BookMyAssets Logo"
                  className="mx-auto mb-2 lg:mb-3 h-8 sm:h-10 md:h-12 lg:h-auto w-auto"
                />
              </div>

              {/* CTA Buttons Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="space-y-4"
              >
                {/* Primary CTA - Unbeatable Price */}
                <button
                  onClick={openContactForm}
                  className="relative w-full bg-[#deae3c] hover:bg-opacity-90 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden group"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-sm lg:text-xl font-extrabold mb-1 leading-tight">
                      Unbeatable Price in Dholera:{" "}
                      <span className="text-lg">
                        <br />
                        Plots Under ₹10 Lakhs | 0 km from Dholera SIR
                      </span>
                    </div>
                  </div>

                  {/* Pulse animation */}
                  <div className="absolute inset-0 rounded-xl bg-[#deae3c] opacity-30 animate-pulse"></div>
                </button>

           
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Bottom Stats Section - Compact */}
      </div>

      <div className="pt-4 pb-4">
        {/* Section 2 - About */}
        <WestWynAboutSection />
      </div>

      <div className="pt-4 pb-4">
        {/* Section 4 - Why Invest in Dholera Forest Estate */}
        <InvestmentBenefits />
      </div>

      <CommonForm title="Get Plots Under from ₹10 Lakhs at 0 KM from Dholera SIR " />
      <ProjectAmenities />

      <div className="pt-4 pb-4">
        {/* <CostSheet /> */}

        <CostSheet projectSlug="westwyn-estate" 
        showProjectSelector={false} 
      />
      </div>
      <FAQSection />
      {/* Form */}

      <SoldOutProjectsSection />
      <PopupScroll
        title={
          <>
            Navratri Special: <br />
            Flat 5% off on Dholera Plots
          </>
        }
        subtitle="(Hurry Offer valid for 9 days only)"
      />
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeContactForm}
                title="Unbeatable Price in Dholera"
                headline="Plots starting 10 Lakh at 0 km from Dholera SIR "
                buttonName="Book Now"
                /*  onAfterSubmit={handleAfterSubmit} */
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
