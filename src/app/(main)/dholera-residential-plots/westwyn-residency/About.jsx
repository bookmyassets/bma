import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import BrochureDownload from "../../components/BrochureDownload";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import img from "@/assests/residential/residency/Residency.webp";

const WestWynAboutSection = () => {
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
        {/* Header Section */}
        <div className="text-center mb-4 space-y-2">
          <h1 className="text-[32px] font-bold text-[#deae3c]">
            WestWyn Residency
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-7xl mx-auto">
            WestWyn Residency a premium residential plotted soceity in Pipariya,
            Dholera, designed for buyers who value location, connectivity, and
            long term Investment Growth. With easy access to the Dholera SIR
            boundary, Bhimnath Railway station, Activation Area, Dholera
            expressway, and airport corridor, the project offers residential
            plots with immediate registry in the most connected and developed
            region in Dholera.
          </p>
        </div>

        <div className=" gap-12 items-stretch space-y-4">
          {/* Left Content */}
          <div className=" h-full">
            <div className="flex justify-center items-center flex-row gap-4 ">
              <button
                onClick={openBrochureForm}
                className="bg-[#deae3c] text-white px-4 whitespace-nowrap py-3 rounded-xl font-medium hover:bg-[#c9992a] transition-colors flex items-center justify-center gap-2"
              >
                <FaDownload />
                Download Brochure
              </button>

              <Link href="https://wa.me/918130371647">
                <button className="bg-white border border-[#deae3c] whitespace-nowrap text-[#deae3c] px-4 py-3 rounded-xl font-medium hover:bg-[#f8f5e6] transition-colors flex items-center justify-center gap-2">
                  <FaWhatsapp />
                  Book Site Visit
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Location Advantage */}
        <div className="max-w-7xl mx-auto py-4">
          <div>
            <h3 className="text-[32px] font-semibold text-center ">
              Prime Location
            </h3>
          </div>
          <div className="grid md:grid-cols-2 py-4 max-sm:space-y-4">
            <div className="px-4 sm:px-6 lg:px-8 ">
              <Image
                src={img}
                alt="dholera map"
                className="rounded-xl w-full h-auto md:h-full"
                priority
              />
            </div>
            <div className="bg-gray-100 text-base md:text-lg p-4 rounded-xl">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start justify-start gap-2 font-semibold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>Premium residential plots in Pipariya, Dholera</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>Direct Entry from Major District Road(MDR)</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>2 Minutes from Railway Connectivity</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>5 Minutes from Dholera SIR boundary</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>12 minutes from Ahmedabad Dholera Expressway</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>17 Minutes from RMS Multi-Specialty Hospital</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>22 minutes from Tata Semiconductor Plant</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>30 minutes from Dholera International Airport</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>
                    Close proximity to public facilities and transport: Bus
                    stand, school, hospital, shopping complex, park, food
                    courts.
                  </span>
                </li>

                <li className="flex items-start gap-2 font-bold">
                  <span className="text-[#deae4c] mt-1">•</span>
                  <span>
                    Industrial proximity: Seamless connectivity to the TATA
                    Semiconductor Plant & ReNew Solar Plant, with Hebatpur
                    Industrial Area just 25 minutes away.
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
                title="Get Full Project Details"
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

export default WestWynAboutSection;
