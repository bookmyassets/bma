"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import westwyn1 from "@/assests/westwyn-county/westwyn-3.webp";
import westwyn2 from "@/assests/westwyn-county/westwyn-1.webp";
import westwyn3 from "@/assests/westwyn-county/westwyn-2.webp";
import westwynmob1 from "@/assests/westwyn-county/westwyn-county-mob1.webp";
import westwynmob2 from "@/assests/westwyn-county/westwyn-county-mob2.webp";
import westwynmob3 from "@/assests/westwyn-county/westwyn-county-mob3.webp";
import logo from "@/assests/ad-page/dholera-govt-logo.webp";
import { Plus, Minus } from "lucide-react";
import CommonForm from "../../components/CommonForm";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import CostSheet from "../costsheet2";
import SoldOutProjectsSection from "../SoldOutProjects";
import BrochureDownload from "../../components/BrochureDownload";
import { FaWhatsapp } from "react-icons/fa6";
import PopupScroll from "../../components/PopUpScroll";
import ActiveProjectsSection from "../ActiveProject";

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

  const desktopImages = [
    { src: westwyn1, alt: "Dholera Investment Opportunity 1" },
    { src: westwyn2, alt: "Dholera Investment Opportunity 2" },
    { src: westwyn3, alt: "Dholera Investment Opportunity 3" },
  ];

  const mobileImages = [
    { src: westwynmob1, alt: "Dholera Mobile 1" },
    { src: westwynmob2, alt: "Dholera Mobile 2" },
    { src: westwynmob3, alt: "Dholera Mobile 3" },
  ];

  const [sqYards, setSqYards] = useState(0);
  const [plots, setPlots] = useState(0);
  const [amenities, setAmenities] = useState(0);

  // New state for brochure form
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  const [eventVar, setEventVar] = useState("");

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === desktopImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [desktopImages.length]);

  // Touch handlers for swipe (mobile)
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentSlide((prev) =>
        prev === mobileImages.length - 1 ? 0 : prev + 1,
      );
    } else if (touchEnd - touchStart > 50) {
      setCurrentSlide((prev) =>
        prev === 0 ? mobileImages.length - 1 : prev - 1,
      );
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === desktopImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1,
    );
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
      <title>
        Westwyn County Dholera SIR | Smart Residential Plots by BookMyAssets
      </title>
      <meta
        name="description"
        content="Discover Smart Residential Plots in Dholera With Great connectivity, smart infrastructure & high ROI."
      />
      {/* Hero Section with Carousel - Matching Hero3 Design */}
      <div id="hero" className="relative min-h-screen bg-white">
        <div className="h-screen max-sm:h-[87vh] flex flex-col">
          {/* Main Content Section */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
            {/* Left Side - Slider Section (60%) */}
            <div className="w-full lg:w-[60%] relative flex-1">
              {/* Desktop Slider */}
              <div className="absolute inset-0 hidden lg:block">
                <div className="relative w-full md:h-[100vh] overflow-hidden">
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
                        fill
                        className="max-sm:object-cover pt-8"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                  {/* Navigation */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Mobile Slider */}
              <div
                className="absolute inset-0 block lg:hidden overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="region"
                aria-label="Mobile image carousel"
              >
                {desktopImages.map((image, index) => (
                  <div
                    key={`mobile-${index}`}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      pointerEvents: index === currentSlide ? "auto" : "none",
                    }}
                  >
                    <div className="mb-10 overflow-hidden shadow-lg pt-20">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={675}
                        className="w-full h-auto object-contain"
                        quality={85}
                        fetchPriority={index === 0 ? "high" : "low"}
                        sizes="100vw"
                      />
                    </div>
                  </div>
                ))}
                {/* Navigation buttons for mobile */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Right Side - Lead Form Section (40%) */}
            <div className="w-full lg:w-[40%] bg-white flex items-center justify-center p-4 lg:p-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full max-w-md"
              >
                {/* Logo */}
                <div className="text-center mb-6">
                  <Image
                    src={logo}
                    alt="BookMyAssets Logo"
                    className="mx-auto mb-3"
                  />

                  <div className="relative">
                    <style jsx>{`
                      @keyframes textGlow {
                        0%,
                        100% {
                          text-shadow: 0 0 50px rgba(222, 174, 60, 0.8);
                          color: black;
                        }
                        50% {
                          text-shadow:
                            0 0 20px rgba(255, 255, 255, 1),
                            0 0 30px rgba(255, 255, 255, 0.8);
                          color: black;
                        }
                      }

                      .flashy-blink {
                        animation: flashyBlink 3s infinite ease-in-out;
                        padding: 4px;
                        border-radius: 1rem;
                        border: 3px solid #deae3c;
                      }

                      .glowing-text {
                        animation: textGlow 1s infinite ease-in-out;
                      }
                    `}</style>

                    <div className="flashy-blink">
                      <h2 className="text-xl lg:text-2xl font-bold mb-2 glowing-text">
                        WestWyn County - Premium Plots
                      </h2>
                      <p className="text-sm lg:text-base glowing-text">
                        Get Residential Plots on - Fedra-Pipli State Highway
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="space-y-4"
                >
                  {/* Primary CTA */}
                  <motion.button
                    onClick={() =>
                      openContactForm(
                        "Get Exclusive Pricing",
                        "Fill the form to get the best prices",
                        "Get Pricing",
                        "contact",
                      )
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold"
                  >
                    Unbeatable Price in Dholera
                  </motion.button>

                  {/* Secondary CTA */}
                  <motion.button
                    onClick={() =>
                      openBrochureForm(
                        "Get Verified Project Details",
                        "Please fill out the form to download our brochure",
                        "Get Project Details",
                        "brochure",
                      )
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-6 bg-white border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-all shadow-md font-semibold"
                  >
                    Download Brochure
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

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
                  openBrochureForm(
                    "Get Verified Project Details",
                    "Please fill out the form to download our brochure. Fields marked with * are mandatory.",
                    "Get Project Details",
                    "brochure",
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
                {sqYards}
              </div>
              <div className="text-base md:text-xl font-semibold text-gray-800 mb-2">
                sq. Yards
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Minimum plot size
              </div>
            </div>

            {/* Plots Counter */}
            <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-3xl md:text-5xl font-bold text-[#deae3c] mb-2 md:mb-4">
                ₹ 11000
              </div>
              <div className="text-base md:text-xl font-semibold text-gray-800 mb-2">
                Price
              </div>
              <div className="text-sm md:text-base text-gray-600">
                per sq. yards
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

      <div className="md:hidden">
        <CommonForm
          title="Invest on Dholera’s widest road:Fedra-Pipli Highway"
          button="Talk to an Advisor"
        />
      </div>

      {/* Section 4 - Why Invest in WestWyn Estate */}
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
            <div className="w-full lg:w-1/2">
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
                    className="group border border-gray-200 rounded-xl p-6 bg-white transition-all duration-300 hover:shadow-lg"
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

      <ProjectAmenities />
      <div className="max-sm:hidden">
        <CommonForm
          title="Invest on Dholera’s widest road:Fedra-Pipli Highway"
          button="Talk to an Advisor"
        />
      </div>
      <div className="pt-4 pb-4">
        <CostSheet projectSlug="westwyn-county" showProjectSelector={false} />
      </div>
      <FAQSection />
      <PopupScroll title="Get Verified Project Details" />
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
      <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <BrochureDownload
                onClose={closeBrochureForm}
                title={formTitle}
                headline={formHeadline}
                buttonName={buttonName}
                onAfterSubmit={handleAfterSubmit}
                link="https://cdn.sanity.io/files/c3e1h345/projects/4fe6c7629f7f8caf78eb2b65074a0a439726b608.pdf"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
