import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import BrochureDownload from "../../components/BrochureDownload";
import { FaDochub, FaFile, FaPhone, FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import img from "@/assests/westwyn-county/westwyn-county-dholera-plan-layout.webp";
import { File } from "lucide-react";

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
        {/* Location Advantage */}
        <div className="max-w-7xl mx-auto py-4">
          <div>
            <h2 className="text-[32px] font-semibold text-center ">
              Prime Location
            </h2>
          </div>
          <div className="grid md:grid-cols-2 py-4 max-sm:space-y-4">
            <div className="px-4 sm:px-6 lg:px-8 ">
              <Image
                src={img}
                alt="westwyn residency location map"
                className="rounded-xl w-full h-auto md:h-full"
                priority
              />
            </div>
            <div className="bg-gray-100 text-base md:text-lg p-4 rounded-xl">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>
                    Direct Entry/Exit from Fedra-Pipli Highway (SH-40)
                  </span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>Walking Distance from Gallops</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>2 Minutes from Gujarat&apos;s Largest Hotel</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>10 Minutes from Kamiyala Temple</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>10 Minutes from Ahmedabad-Dholera Expressway</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>15 Minutes from Dholera International Airport</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>15 Minutes from Dholera SIR Boundary</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>25 Minutes from Tata Semiconductor Plant</span>
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
