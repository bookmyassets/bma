"use client";
import React, { useState } from "react";
import govtApprovedProject from "@/assests/landing/govt-approved-project.webp";
import salesDeed from "@/assests/landing/immediate-sale-deed.webp";
import afterSales from "@/assests/landing/after-sales.webp";
import nanoc from "@/assests/landing/naNoc.webp";
import residential from "@/assests/landing/residentialPlot.webp";
import hidden from "@/assests/landing/hiddenCharges.webp";
import Image from "next/image";
import projectImage from "@/assests/landing/westwyn-project.webp"; 
import { AnimatePresence } from "framer-motion";
import ContactForm from "../components/BrochureForm";

const features = [
  {
    icon: nanoc,
    title: "NA/NOC Plots",
    description: "Approved plots with all necessary clearances",
  },
  {
    icon: residential,
    title: "Residential Plots",
    description: "Premium residential plotting options",
  },
  {
    icon: hidden,
    title: "Transparent Pricing",
    description: "No hidden charges, clear pricing structure",
  },
  {
    icon: govtApprovedProject,
    title: "Govt Approved Projects",
    description: "Fully government approved and verified",
  },
  {
    icon: salesDeed,
    title: "Immediate Sale Deed",
    description: "Quick documentation and registration",
  },
  {
    icon: afterSales,
    title: "After Sales Support",
    description: "Comprehensive post-purchase assistance",
  },
];

export default function Westwyn() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <>
      <style jsx global>
        {`
          /* Fade in animation */
          .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition:
              opacity 0.6s ease,
              transform 0.6s ease;
          }

          .fade-in-up.animate-visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Staggered animation for feature items */
          .feature-item {
            opacity: 0;
            transform: translateX(-30px);
            transition:
              opacity 0.5s ease,
              transform 0.5s ease;
          }

          .feature-item.animate-visible {
            opacity: 1;
            transform: translateX(0);
          }

          .feature-item:nth-child(1) {
            transition-delay: 0.1s;
          }
          .feature-item:nth-child(2) {
            transition-delay: 0.2s;
          }
          .feature-item:nth-child(3) {
            transition-delay: 0.3s;
          }
          .feature-item:nth-child(4) {
            transition-delay: 0.4s;
          }
          .feature-item:nth-child(5) {
            transition-delay: 0.5s;
          }
          .feature-item:nth-child(6) {
            transition-delay: 0.6s;
          }

          /* Project image animation */
          .project-image {
            opacity: 0;
            transform: translateX(50px);
            transition:
              opacity 0.8s ease,
              transform 0.8s ease;
          }

          .project-image.animate-visible {
            opacity: 1;
            transform: translateX(0);
          }
        `}
      </style>

      <div id="Westwyn" className="westwyn-container bg-gray-50">
        {/* Header Section */}
        <div className="max-w-7xl pt-8 mx-auto px-4 mb-8">
          <div className="text-center space-y-4">
            <h1 className="text-xl md:text-4xl font-bold text-gray-800">
              WestWyn County
            </h1>
            <div className="bg-[#d7b36c] w-48 mx-auto h-1"></div>
            <p className="font-light italic text-gray-600 text-lg max-w-2xl mx-auto">
              A Premium Verified Plot on Fedra-Pipli Highway - Your Gateway to
              Smart City Living
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <div className="space-y-8">
              <div className="">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Why Choose WestWyn County?
                </h2>
                <p className="text-gray-600 mb-8">
                  Experience premium living with world-class amenities and
                  modern infrastructure in Dholera's most sought-after
                  residential project.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="westwyn-feature-card flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Project Image */}
            <div className="lg:pl-8">
              <div className="relative">
                {/* Main Project Image */}
                <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                  {/* Replace with actual project image */}
                  <Image
                    src={projectImage}
                    alt="WestWyn County Project"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Overlay with project details */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">WestWyn County</h3>
                    <p className="text-sm opacity-90">
                      Premium Plotting Project
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="bg-[#d7b36c] px-3 py-1 rounded-full text-sm font-semibold">
                        AUDA Approved
                      </span>
                      <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                        Possession Ready
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Info Cards */}
                <div className="westwyn-floating-card absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-48">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#d7b36c]">
                      ₹25L+
                    </div>
                    <div className="text-sm text-gray-600">Starting Price</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Row for Ready to Invest and Statistics */}
        <div className="max-w-7xl mx-auto px-4 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ready to Invest Section - Takes 1/3 of row */}
            <div className="westwyn-feature-card p-6 bg-gradient-to-r from-[#d7b36c] to-[#c4a055] rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-3">Ready to Invest?</h3>
              <p className="mb-4 opacity-90">
                Don't miss this opportunity to be part of India's first smart
                city.
              </p>
              <button
                onClick={openContactForm}
                className="westwyn-cta-button bg-white text-[#d7b36c] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us Today
              </button>

              {/* Contact form would be opened here */}
              <AnimatePresence>
                {isContactFormOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000]">
                    {/* The form would be rendered here when component is added */}
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">
                          Book A Free Consultation Today
                        </h3>
                        <button
                          onClick={closeContactForm}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>
                      <ContactForm
                        title="Book A Free Consultation Today"
                        buttonName="Get A Call Back"
                        onClose={closeContactForm}
                      />
                      <button
                        onClick={closeContactForm}
                        className="bg-[#d7b36c] text-white px-4 py-2 rounded w-full"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Statistics Section - Takes 2/3 of row */}
            <div className="lg:col-span-2 bg-black rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="">
                  <div className="text-3xl font-bold text-[#d7b36c] mb-2">
                    200+
                  </div>
                  <div className="text-white text-sm">Sq. Yards Plots</div>
                </div>
                <div className="">
                  <div className="text-3xl font-bold text-[#d7b36c] mb-2">
                    24x7
                  </div>
                  <div className="text-white text-sm">Security</div>
                </div>
                <div className="">
                  <div className="text-3xl font-bold text-[#d7b36c] mb-2">
                    100%
                  </div>
                  <div className="text-white text-sm">Legal Approval</div>
                </div>
                <div className="">
                  <div className="text-3xl font-bold text-[#d7b36c] mb-2">
                    70+
                  </div>
                  <div className="text-white text-sm">Plots</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
