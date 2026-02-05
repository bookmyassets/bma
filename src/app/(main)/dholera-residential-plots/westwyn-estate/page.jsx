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
  const [eventVar, setEventVar] = useState("");

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

  const openContactForm = (title, headline, btnName, type, project) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsContactFormOpen(true);
    setEventVar(project);
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
          link.href =
            "https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf";
          link.target = "_blank";
          link.download = "brochure.pdf"; // Add download attribute
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("Download link clicked");
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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            name: "BookMyAssets",
            alternateName: "BMA",
            url: "https://www.bookmyassets.com/",
            logo: "https://www.bookmyassets.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBmalogo.ab09adfe.png&w=96&q=75",
            address: {
              "@type": "PostalAddress",
              streetAddress: "620, JMD Megapolis, Sohna Rd, Sector 48,",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.facebook.com/people/Bookmyassets/61556534554379/",
              "https://www.instagram.com/bookmyassets/",
              "https://www.youtube.com/@BookMyAssets",
              "https://x.com/BookMyAssets",
              "https://www.linkedin.com/company/bookmyassetss",
            ],
          }),
        }}
      />

      <title>WestWyn Estate – Secure Plots Near Dholera SIR</title>
      <meta
        name="description"
        content="Invest in plots in Dholera at WestWyn Estate, 0 km from Dholera SIR, and close to proximity to the activation area at an unbeatable price."
      />
      {/* Hero Section with Carousel */}
      <div id="hero" className="relative min-h-screen bg-white">
        <div className="h-screen max-sm:h-auto flex flex-col">
          {/* Main Content Section */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
            {/* Left Side - Slider Section (60%) */}
            <div className="w-full lg:w-[60%] relative flex-1 max-sm:min-h-[50vh]">
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
                        fill
                        className="object-cover"
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
                    <div className="h-full flex items-center justify-center px-1 pt-16 pb-4">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={675}
                        className="w-full h-auto object-contain rounded-lg shadow-lg"
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Side - Lead Form Section (40%) */}
            <div className="w-full lg:w-[40%] bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 ">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full max-w-md"
              >
                {/* Logo */}
                <div className="text-center mb-4 sm:mb-6 max-sm:space-y-6">
                  <Image
                    src={logo}
                    alt="BookMyAssets Logo"
                    className="mx-auto mb-2 sm:mb-3"
                  />

                  <div className="relative max-sm:space-y-8">
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
                      <h2 className="text-xl sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 glowing-text px-2">
                        WestWyn Estate
                      </h2>
                      <p className="text-sm md:text-base glowing-text px-2">
                        Residential Plots Under ₹10 Lakh | 0 km from SIR
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="space-y-3 md:space-y-4"
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
                    className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm sm:text-base rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold"
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
                    className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-white border-2 border-yellow-500 text-yellow-600 text-sm sm:text-base rounded-lg hover:bg-yellow-50 transition-all shadow-md font-semibold"
                  >
                    Download Brochure
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-4">
        {/* Section 2 - About */}
        <WestWynAboutSection />
      </div>

      <div className="md:hidden">
        <CommonForm
          title="Want to verify plot documents before booking?"
          button="Connect with an Expert"
        />
      </div>

      <div className="pt-4 pb-4">
        {/* Section 4 - Why Invest in Dholera Forest Estate */}
        <InvestmentBenefits />
      </div>

      <div className="max-sm:hidden">
        <CommonForm
          title="Want to verify plot documents before booking?"
          button="Connect with an Expert"
        />
      </div>
      <ProjectAmenities />

      <div className="pt-4 pb-4">
        {/* <CostSheet /> */}

        <CostSheet projectSlug="westwyn-estate" showProjectSelector={false} />
      </div>
      <FAQSection />
      {/* Form */}

      <SoldOutProjectsSection />
      <PopupScroll title="Get Verified Project Details" />
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeContactForm}
                title="Best value plots in Dholera"
                headline="Plots starting 10 Lakh at 0 km from Dholera SIR "
                buttonName="Book a Site Visit"
                project="WestWyn Estate"
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
