"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CommonForm from "../../components/CommonForm";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import SoldOutProjectsSection from "../SoldOutProjects";

import WestWynAboutSection from "./About";

//images import
import img1 from "@/assests/residential/residency/westwyn-residency-dholera-entry-gate.webp";
import img2 from "@/assests/residential/residency/westwyn-residency-dholera-sir-clubhouse-hero.webp";
import img3 from "@/assests/residential/residency/westwyn-residency-dholera-sir-kids-play-area-hero.webp";
import img1M from "@/assests/residential/residency/westwyn-residency-dholera-entry-gate-mobile.webp";
import img2M from "@/assests/residential/residency/westwyn-residency-dholera-sir-clubhouse-lite-mobile.webp";
import img3M from "@/assests/residential/residency/westwyn-residency-dholera-sir-kids-play-area-mobile.webp";
import PopupScroll from "../../components/PopUpScroll";
import CostSheet from "../costsheet2";
import OurCommits from "./OurCommits";
import PlanLayout from "./PlanLayout";

export default function WestWynResidencyClient() {
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
    { src: img3, alt: "Dholera Investment Opportunity 3" },
    { src: img2, alt: "Dholera Investment Opportunity 2" },
    { src: img1, alt: "Dholera Investment Opportunity 1" },
  ];

  const mobileImages = [
    { src: img1M, alt: "Dholera Investment Opportunity 1" },
    { src: img2M, alt: "Dholera Investment Opportunity 2" },
    { src: img3M, alt: "Dholera Investment Opportunity 3" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === desktopImages.length - 1 ? 0 : prev + 1,
    );
  }, [desktopImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1,
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
    [nextSlide, prevSlide],
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
          "_blank",
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
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Westwyn Residency",
            image:
              "https://www.bookmyassets.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwestwyn-residency-dholera-entry-gate-hero.117c5f91.webp&w=1920&q=75&dpl=dpl_7qHQ2s7hGsjaNs7PGckW61725kmB",
            description:
              "Explore WestWyn Residency in Pipariya, Dholera premium registry-ready residential plots with strong connectivity, document support, and guided site visit assistance for serious buyers.",
            brand: {
              "@type": "Brand",
              name: "BookMyAssets",
            },
            offers: {
              "@type": "Offer",
              url: "https://www.bookmyassets.com/dholera-residential-plots/westwyn-residency",
              priceCurrency: "INR",
              price: "850000",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "4",
              ratingCount: "4",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "1",
                item: "https://www.bookmyassets.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "2",
                item: "https://www.bookmyassets.com/dholera-residential-plots/westwyn-residency",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "3",
                item: "https://www.bookmyassets.com/dholera-residential-plots/westwyn-estate",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Where is WestWyn Residency located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WestWyn Residency is located in Pipariya, Dholera, with connectivity to the Dholera SIR boundary, Bhimnath Railway Station, Ahmedabad-Dholera Expressway, the activation area, and the airport corridor.",
                },
              },
              {
                "@type": "Question",
                name: "Is WestWyn Residency a residential plot project?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, WestWyn Residency is a premium residential plotted project designed for buyers looking for long-term investment potential as well as future residential use.",
                },
              },
              {
                "@type": "Question",
                name: "Is WestWyn Residency registry-ready?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, WestWyn Residency is presented as a registry-ready residential plot project with immediate possession, which makes it suitable for buyers who want greater clarity and quicker ownership transfer.",
                },
              },
              {
                "@type": "Question",
                name: "What documentation is available for WestWyn Residency?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The project highlights NA/NOC documentation and also lists NA/NOC/Title Clearance among its commitments. Buyers should still review all documents carefully before proceeding, and BookMyAssets offers support during that process.",
                },
              },
              {
                "@type": "Question",
                name: "What plot sizes are available in WestWyn Residency?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WestWyn Residency offers residential plots in 124, 152, and 187 sq. yards, subject to current availability.",
                },
              },
              {
                "@type": "Question",
                name: "What is the price of plots in WestWyn Residency?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The page currently lists the project price at ₹6500 per sq. yard. Final costing may vary depending on plot selection and charges, so buyers should request the latest price sheet and cost estimate.",
                },
              },
              {
                "@type": "Question",
                name: "What amenities are available in WestWyn Residency?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The project highlights amenities such as a gated community, 24/7 security with CCTV, kids play area, app-based management, power and water supply, yoga deck, jogging track, senior citizen zone, EV charging station, wide internal roads, drainage system, and clubhouse lite",
                },
              },
              {
                "@type": "Question",
                name: "Can I plan a site visit before buying?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. BookMyAssets offers 365 days site visit assistance, and the page also invites buyers to book a site visit for project guidance and on-ground understanding.",
                },
              },
              {
                "@type": "Question",
                name: "What support does BookMyAssets provide to buyers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "BookMyAssets highlights support with project understanding, plot guidance, site visit assistance, next-step coordination, immediate registry support, resale support, and buyback assistance.",
                },
              },
              {
                "@type": "Question",
                name: "Is WestWyn Residency suitable for both investors and future end users?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The page positions WestWyn Residency for both investment-focused buyers and those considering future residential use, depending on their timeline and goals.",
                },
              },
            ],
          }),
        }}
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <div id="hero" className="relative w-full overflow-hidden">
        {/* ── DESKTOP (lg+): translateX sliding ──────────────────────────── */}
        <div
          className="hidden lg:flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {desktopImages.map((image, index) => (
            <div
              key={`desktop-${index}`}
              className="w-full flex-shrink-0 relative"
            >
              <div className="relative w-full md:h-[70vh] aspect-[3/1]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="aspect-[3/1]"
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
          className="relative block lg:hidden w-full"
          style={{ aspectRatio: "5/4" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Mobile image carousel"
        >
          {mobileImages.map((image, index) => (
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
                className="object-cover"
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

      <div className="">
        <CommonForm
          title="Get Brochure, Price Sheet & Project Guidance"
          button="Connect with an Expert"
        />
      </div>

      <PlanLayout />

      <ProjectAmenities />

      <div className=" ">
        <OurCommits />
      </div>

      <FAQSection />

      <div className=" ">
        <CostSheet
          projectSlug="westwyn-residency"
          showProjectSelector={false}
        />
      </div>

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
