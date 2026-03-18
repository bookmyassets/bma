import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import BrochureDownload from "../../components/BrochureDownload";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import img from "@/assests/image.webp";

const PlanLayout = () => {
  const [counters, setCounters] = useState({
    plotSize: 0,
    price: 0,
    amenities: 0,
  });

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
        <div className="max-w-7xl mx-auto py-6">
          <div>
            <h3 className="text-[32px] font-semibold text-center ">
              Location Advantage
            </h3>
          </div>
          <div className="grid md:grid-cols-2 py-4">
            <div className="px-4 sm:px-6 lg:px-8 aspect-[2/1] md:order-2">
              <Image
                src={img}
                alt="dholera map"
                className="rounded-xl w-full h-auto aspect-[2/1] md:order-1"
                priority
              />
            </div>
            <div className="bg-gray-100 max-sm:pt-4 text-base md:text-lg p-4 rounded-xl">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start justify-start gap-2 font-semibold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>Premium residential plots in Polarpur, Dholera</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>5 Minutes from Bhimnath Railway Junction</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>15 Minutes from Dholera SIR boundary</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>15 Minutes from RMS Multi-Specialty Hospital</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>17 minutes from Ahmedabad Dholera Expressway</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>30 minutes from Tata Semiconductor Plant</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>45 minutes from Dholera International Airport</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>
                    Close proximity to Public Facilities and Transport: Bus
                    stand, school, hospital, shopping complex, park, food
                    courts.
                  </span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>
                    Industrial proximity: Seamless connectivity to TATA
                    Semiconductor Plant & ReNew Solar Plant. 25 minutes to
                    Hebatpur Industrial Area.
                  </span>
                </li>
              </ul>
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
                title="Want Verified Project Details?"
                buttonName="Get Brochure"
                onAfterSubmit={handleAfterSubmit}
                link="https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanLayout;