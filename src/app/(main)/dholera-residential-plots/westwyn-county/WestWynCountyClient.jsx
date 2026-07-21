"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import westwyn1 from "@/assests/westwyn-county/westwyn-county-1.webp";
import logo from "@/assests/ad-page/dholera-govt-logo.webp";
import InlineLeadForm from "../../components/InlineLeadForm";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "../../components/Contactform";
import ProjectAmenities from "./Amenities";
import FAQSection from "./FAQs";
import CostSheet from "../costsheet2";
import { FaFile, FaPhone, FaWhatsapp } from "react-icons/fa6";
import PopupLeadForm from "../../components/PopupLeadForm";
import ActiveProjectsSection from "../ActiveProject";
import { breadcrumbSchema, faqSchema, realEstateSchema } from "@/lib/schema";
import SchemaMarkup from "../../components/SchemaMarkup";
import Link from "next/link";
import WestWynAboutSection from "./About";
import PlanLayout from "./PlanLayout";

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
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
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
      <div id="hero" className="relative min-h-screen bg-white">
        <div className="h-screen max-sm:h-auto flex flex-col">
          {/* Main Content Section */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
            {/* Left Side - Project Image (60%) */}
            <div className="relative w-full flex-1 bg-white lg:w-[60%] max-sm:min-h-[50vh]">
              <Image
                src={westwyn1}
                alt="WestWyn County residential plot project in Dholera SIR"
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                quality={85}
                className="object-contain lg:object-cover"
              />
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
                        border: 3px solid #ddbc69;
                      }

                      .glowing-text {
                        animation: textGlow 1s infinite ease-in-out;
                      }
                    `}</style>

                    <div className="flashy-blink">
                      <h2 className="text-xl sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 glowing-text px-2">
                        WestWyn County
                      </h2>
                      <p className="text-sm md:text-base glowing-text px-2">
                        Residential Plots on - Fedra-Pipli State Highway
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
                    className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-[#ddbc69] to-[#ddbc69] text-white text-sm sm:text-base rounded-lg hover:from-[#ddbc69] hover:to-[#ddbc69] transition-all shadow-lg hover:shadow-[#ddbc69]/20 font-semibold"
                  >
                    Unbeatable Price in Dholera
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
            <h1 className="text-[32px] font-semibold text-black mb-4">
              About{" "}
              <span className="max-sm:hidden">
                <br />
              </span>{" "}
              WestWyn County
            </h1>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6">
            <p className="text-base md:text-lg font-light leading-relaxed text-gray-600">
              WestWyn County, located on the Fedra-Pipli State Highway, is one
              of BookMyAssets's successfully sold-out residential plot projects
              in Dholera. Due to high demand, we are now offering verified
              resale plots in WestWyn County. If you missed the original launch,
              this is your chance to own a plot in one of Dholera's most trusted
              residential projects.
            </p>

            {/* CTA Buttons */}
            <div className=" gap-12 items-stretch space-y-4 py-4 max-sm:-px-4">
              {/* Left Content */}
              <div className=" h-full">
                <div className="flex flex-row gap-4 ">
                  <Link href="https://wa.me/918130371647">
                    <p className="bg-[#ddbc69] border border-[#ddbc69] whitespace-nowrap text-white text-base px-2 md:px-4 py-3 rounded-xl font-medium hover:bg-[#eecb71] transition-colors flex items-center justify-center gap-2">
                      <FaFile />
                      Get Brochure
                    </p>
                  </Link>

                  <Link href="tel:+918130371647">
                    <p className="bg-white border border-[#ddbc69] whitespace-nowrap text-[#ddbc69] text-base px-2 md:px-4 py-3 rounded-xl font-medium hover:bg-[#f8f5e6] transition-colors flex items-center justify-center gap-2">
                      <FaPhone />
                      Connect with our RM
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <WestWynAboutSection/>
      </div>

      <div>
        <PlanLayout/>
      </div>

      

      <div className="">
        <InlineLeadForm
          variant="common"
          title="Invest in Dholera Residential Plots"
          button="Talk to an Advisor"
        />
      </div>

      

      <ProjectAmenities />

      <div className="pt-4 pb-4">
        <CostSheet projectSlug="westwyn-county" showProjectSelector={false} />
      </div>
      <FAQSection />
      <PopupLeadForm type="scroll" title="Get Verified Project Details" />
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
    </>
  );
}
