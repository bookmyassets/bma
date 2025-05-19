"use client";
import React, { useState } from "react";
import ContactForm from "../components/BrochureForm";
import { AnimatePresence } from "framer-motion";

export default function WhyInvest() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const downloadBrochure = () => {
    // Replace with your actual brochure URL
    const brochureUrl = "https://shorturl.at/t7uyU";
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.download = "Dholera-Smart-City-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <style jsx global>
        {`
          .animate-shimmer {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
          }

          @keyframes shimmer {
            0% {
              background-position: -100px 0;
            }
            100% {
              background-position: 100px 0;
            }
          }
        `}
      </style>
      <section id="WhyInvest" className=" py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Investment Returns Section */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-lg p-8 animate-on-scroll">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 animate-on-scroll from-left">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 font-poppins mb-4">
                  Investment Returns
                </h3>
                <div className="w-20 h-1 bg-[#d7b36c] mb-6"></div>
                <p className="text-lg md:text-xl text-gray-700 font-poppins mb-6">
                  Be a part of Dholera's growth story! With the region set to
                  become a hub for industries like aviation, electronics, and
                  renewable energy, your investment in Emerald City promises not
                  just a home but a future full of possibilities.
                </p>
                <div className="flex flex-col md:text-xl sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      if (isFormSubmitted) {
                        downloadBrochure();
                      } else {
                        openContactForm();
                      }
                    }}
                    className={`inline-flex items-center px-6 py-3 ${
                      isFormSubmitted
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-[#d7b36c] hover:bg-[#c2a05e]"
                    } text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 font-poppins shadow-md animate-float`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          isFormSubmitted
                            ? "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            : "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                        }
                      />
                    </svg>
                    {isFormSubmitted ? "Download Brochure" : "Get Brochure"}
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 animate-on-scroll from-right">
                <div className="bg-white rounded-lg p-8 shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-semibold text-gray-800">
                      ROI Projection
                    </div>
                    <div className="text-[#d7b36c] font-bold text-3xl">10x</div>
                  </div>
                  <div className="w-full bg-[#d7b36c] rounded-full h-3 mb-4">
                    <div
                      className="bg-[#d7b36c] h-3 rounded-full transition-all duration-1000 animate-shimmer"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-8">
                    <span>Current Value</span>
                    <span>Projected by 2030</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600 mb-1">
                        Starting From
                      </div>
                      <div className="text-xl font-bold text-gray-800">
                        ₹9,000/sq.ft
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600 mb-1">
                        Investment Period
                      </div>
                      <div className="text-xl font-bold text-gray-800">
                        5-7 Years
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000]">
            <ContactForm
              title="Book A Free Consultation Today"
              buttonName="Get A Call Back"
              onClose={closeContactForm}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
