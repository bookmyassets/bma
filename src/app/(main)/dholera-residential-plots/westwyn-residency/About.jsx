import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import BrochureDownload from "../../components/BrochureDownload";
import { FaFile, FaPhone, FaWhatsapp } from "react-icons/fa6";
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
          <h1 className="text-xl md:text-[32px] font-bold text-[#ddbc69]">
            WestWyn Residency{" "}
          </h1>
            <p className="text-black mt-4 text-lg">
              Residential Plots in Dholera

            </p>

          <p className="text-base md:text-lg text-gray-600 max-w-7xl mx-auto">
            WestWyn Residency is a 40,000 sq. yard residential plot project in
            Pipariya Developed by BookMyAssets. Located on Major District Road
            in Dholera. 1.5 km from DFC (Dedicated Freight Corridor) further it
            is close to the Bhimnath Railway Junction, and within reach of
            everyday needs a bus stand, school, hospital, shopping complex,
            park, and food courts.
          </p>
        </div>

        <div className="gap-12 items-stretch space-y-4 px-4 py-4">
          {/* Left Content */}
          <div className="h-full">
            <div className="flex justify-center items-center flex-row gap-[clamp(0.5rem,2vw,1rem)]">
              <Link href="https://wa.me/918130371647">
                <p
                  className="bg-[#ddbc69] border border-[#ddbc69] whitespace-nowrap text-white rounded-xl font-medium hover:bg-[#eecb71] transition-colors flex items-center justify-center gap-[clamp(0.375rem,1vw,0.5rem)]
                    text-[clamp(0.8rem,1.8vw,1rem)]
                    px-[clamp(0.75rem,3vw,1.25rem)]
                    py-[clamp(0.5rem,2vw,0.75rem)]"
                >
                  <FaFile className="text-[clamp(0.8rem,2vw,1.1rem)]" />
                  Get Brochure
                </p>
              </Link>

              <Link href="tel:+918130371647">
                <p
                  className="bg-white border border-[#ddbc69] whitespace-nowrap text-[#ddbc69] rounded-xl font-medium hover:bg-[#f8f5e6] transition-colors flex items-center justify-center gap-[clamp(0.375rem,1vw,0.5rem)]
                    text-[clamp(0.8rem,1.8vw,1rem)]
                    px-[clamp(0.75rem,3vw,1.25rem)]
                    py-[clamp(0.5rem,2vw,0.75rem)]"
                >
                  <FaPhone className="text-[clamp(0.8rem,2vw,1.1rem)]" />
                  Connect with our RM
                </p>
              </Link>
            </div>
          </div>
        </div>

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
                  <span>Direct Entry from Major District Road (MDR)</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>2 Minutes from DFC (Dedicated Freight Corridor)</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>2 Minutes from Railway Connectivity</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>5 Minutes from Dholera SIR boundary</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>12 minutes from Ahmedabad Dholera Expressway</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>17 Minutes from RMS Multi-Specialty Hospital</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>22 minutes from Tata Semiconductor Plant</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>30 minutes from Dholera International Airport</span>
                </li>

                <li className="flex items-start justify-start gap-2 font-bold">
                  <span className="text-[#ddbc69] leading-none shrink-0 mt-1">
                    •
                  </span>
                  <span>
                    Close proximity to public facilities and transport: Bus
                    stand, school, hospital, shopping complex, park, food
                    courts.
                  </span>
                </li>

                <li className="flex items-start gap-2 font-bold">
                  <span className="text-[#ddbc69] mt-1">•</span>
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
