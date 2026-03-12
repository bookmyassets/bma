"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import westwyn1 from "@/assests/westwyn-county/westwyn-gate-cover.webp";
import westwyn2 from "@/assests/westwyn-county/westwyn-1.webp";
import westwyn3 from "@/assests/westwyn-county/westwyn-2.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import img2 from "@/assests/residential/estate2a.webp";
import img3 from "@/assests/residential/estate3a.webp";
import logo from "@/assests/ad-page/dholera-govt-logo.webp";
import PopupScroll from "../../components/PopUpScroll";
import CostSheet from "../costsheet2";

export default function HeroCarousel() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [eventVar, setEventVar] = useState("");

  // Touch refs (no re-render on touch move)
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const desktopImages = [
    { src: img1, alt: "Dholera Investment Opportunity 1" },
    { src: img2, alt: "Dholera Investment Opportunity 2" },
    { src: img3, alt: "Dholera Investment Opportunity 3" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === desktopImages.length - 1 ? 0 : prev + 1
    );
  }, [desktopImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1
    );
  }, [desktopImages.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      touchEndX.current = e.changedTouches[0].clientX;
      const delta = touchStartX.current - touchEndX.current;
      if (Math.abs(delta) > 50) delta > 0 ? nextSlide() : prevSlide();
    },
    [nextSlide, prevSlide]
  );

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
          "_blank"
        );
      }
    }
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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

      <title>WestWyn Estates – Secure Plots Near Dholera SIR</title>
      <meta
        name="description"
        content="Invest in WestWyn Estates: Premium Plots at Dholera Smart City, just 5 minutes from Bhimnath Railway Station with strong connectivity and high growth potential in future."
      />
      <link
        rel="canonical"
        href="https://www.bookmyassets.com/dholera-residential-plots/westwyn-estate"
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <div id="hero" className="relative w-full overflow-hidden">

        {/* ── DESKTOP (lg+): translateX sliding ──────────────────────────── */}
        <div
          className="hidden lg:flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }} 
        >
          {desktopImages.map((image, index) => (
            <div key={`desktop-${index}`} className="w-full flex-shrink-0 relative">
              <div className="relative w-full md:h-[70vh] aspect-[3/1]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain aspect-[3/1]"
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "low"}
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop nav arrows — outside the sliding track so they stay fixed */}
        <button
          onClick={prevSlide}
          className="hidden lg:flex absolute left-4 top-[40vh] -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden lg:flex absolute right-4 top-[40vh] -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* ── MOBILE (< lg): opacity-fade + swipe ────────────────────────── */}
        <div
          className="relative block lg:hidden w-full h-[40vh]"
          onTouchStart={handleTouchStart}
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
              aria-hidden={index !== currentSlide}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "low"}
                sizes="100vw"
                quality={85}
              />
            </div>
          ))}

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
      {/* ── End Hero Section ───────────────────────────────────────────────── */}

      <div className="pt-4 pb-4">
        <WestWynAboutSection />
      </div>

      <div className="md:hidden">
        <CommonForm
          title="Want to Verify Plot Documents Before Booking?"
          button="Connect with an Expert"
        />
      </div>

      <div className="pt-4 pb-4">
        <InvestmentBenefits />
      </div>

      <div className="max-sm:hidden">
        <CommonForm
          title="Want to Verify Plot Documents Before Booking?"
          button="Connect with an Expert"
        />
      </div>

      <ProjectAmenities />

      <div className="pt-4 pb-4">
        <CostSheet projectSlug="westwyn-estate" showProjectSelector={false} />
      </div>

      <FAQSection />

      <SoldOutProjectsSection />
      <PopupScroll title="Get Verified Project Details" />

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