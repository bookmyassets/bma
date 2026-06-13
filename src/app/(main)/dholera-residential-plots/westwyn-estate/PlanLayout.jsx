import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import BrochureDownload from "../../components/BrochureDownload";
import Image from "next/image";
import img from "@/assests/residential/estates/westwyn-Estates.webp";
import { FaDownload } from "react-icons/fa";
import { FaLocationPin, FaLocationPinLock, FaMapLocation } from "react-icons/fa6";
import Link from "next/link";

const PlanLayout = () => {
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  // New state for brochure form
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");

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
            "https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf";
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
          "https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf",
          "_blank",
        );
      }
    }
  };

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Subtle background pattern */}

      <div className="relative max-w-7xl mx-auto px-4 py-4">
        {/* Location Advantage */}
        <div className="max-w-7xl mx-auto">
          <div>
            <h3 className="text-[32px] font-semibold text-center">
              Plan Layout
            </h3>
          </div>
          <div className="grid md:grid-cols-2 py-4 max-sm:space-y-4">
            <div className="px-4 sm:px-6 lg:px-8 md:order-2">
              <Image
                src={img}
                alt="plan layout of westwyn estates"
                className="rounded-xl w-full md:h-full h-auto md:order-1"
                priority
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Land Parcel",
                  content: (
                    <span>
                      4.45 Acres <br /> (21,500 sq. yards)
                    </span>
                  ),
                  align: "text-center",
                },
                {
                  title: "Location",
                  content: "Polarpur, near Bhimnath Railway Junction",
                  align: "text-left",
                },
                {
                  title: "Highway Access",
                  content: "Direct Entry from 150 ft wide 4-lane State Highway-117",
                  align: "text-left",
                },
                {
                  title: "Plot Sizes",
                  content: "Approx 147-250 sq. yards",
                  align: "text-left",
                },
                {
                  title: "Total Units",
                  content: "129 exclusive plots",
                  align: "text-left",
                },
                {
                  title: "Possession",
                  content: "Immediate",
                  align: "text-left",
                },
                {
                  title: "Developers",
                  content: "BookMyAssets",
                  align: "text-left",
                },
                {
                  title: "Documentation",
                  content: "NA/NOC, Title Clear, Plan Pass Approved",
                  align: "text-left",
                },
                {
                  title: "Plot Price",
                  content: "₹6700/sq. yard",
                  align: "text-left",
                },
              ].map(({ title, content, align }, index, arr) => {
                const isLastOdd =
                  index === arr.length - 1 && arr.length % 2 !== 0;

                return (
                  <div
                    key={title}
                    className={`flex flex-col rounded-2xl text-black overflow-hidden ${
                      isLastOdd ? "col-span-2 sm:col-span-1" : ""
                    }`}
                    style={{
                      border: "1.5px solid #f0f0f0",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* Gold top accent bar */}
                    <div
                      className="h-1 w-full"
                      style={{
                        background: "linear-gradient(90deg, #ddbc69, #f0c96a)",
                      }}
                    />

                    <div className="flex flex-col flex-1 p-3 sm:p-4 lg:p-5">
                      {/* Title */}
                      <span
                        className="font-bold text-center w-full text-xs sm:text-sm lg:text-base"
                        style={{ color: "#ddbc69", letterSpacing: "0.01em" }}
                      >
                        {title}
                      </span>

                      {/* Divider */}
                      <div
                        className="w-2/3 mx-auto mt-2 mb-3 h-[1px]"
                        style={{ background: "#ececec" }}
                      />

                      {/* Content */}
                      <div className="flex flex-1 items-center justify-center">
                        <span
                          className={`font-semibold ${align} text-xs sm:text-sm lg:text-base leading-snug`}
                          style={{ color: "#1a1a1a" }}
                        >
                          {content}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" gap-12 items-stretch space-y-4 px-4 py-4">
            {/* Left Content */}
            <div className=" h-full">
              <div className="flex justify-center items-center flex-row gap-4 ">
                <button
                  onClick={openBrochureForm}
                  className="bg-[#ddbc69] text-white text-base px-2 md:px-4 whitespace-nowrap py-3 rounded-xl font-medium hover:bg-[#c9992a] transition-colors flex items-center justify-center gap-2"
                >
                  <FaDownload />
                  Download Plan Layout
                </button>

                <Link href="https://maps.app.goo.gl/UkvNKmgf1yPF8eKS6">
                  <p className="bg-white border border-[#ddbc69] whitespace-nowrap text-[#ddbc69] text-base px-2 md:px-4 py-3 rounded-xl font-medium hover:bg-[#f8f5e6] transition-colors flex items-center justify-center gap-2">
                    <FaMapLocation />
                    Project Location
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <BrochureDownload
                onClose={closeBrochureForm}
                title="Get Project Plan Layout"
                buttonName="Get Brochure"
                onAfterSubmit={handleAfterSubmit}
                link="https://drive.google.com/file/d/1xJzNlQpyqyDIaSzOCo48s8J44qC3gS2S/view?usp=sharing"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanLayout;

