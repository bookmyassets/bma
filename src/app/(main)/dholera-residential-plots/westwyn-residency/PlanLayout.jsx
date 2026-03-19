import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import BrochureDownload from "../../components/BrochureDownload";
import Image from "next/image";
import img from "@/assests/image.webp";

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
        <div className="max-w-7xl mx-auto py-6">
          <div>
            <h3 className="text-[32px] font-semibold text-center ">
              Plan Layout
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
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col shadow-lg h-48 p-4 rounded-xl text-base md:text-lg text-gray-700">
                <span className="text-[#deae4c] font-bold text-center w-full mb-2">
                  Land Parcel
                </span>
                <div className="flex flex-1 items-center">
                  <span className="font-semibold text-left">
                    4.45 Acres (21,500 sq. yards)
                  </span>
                </div>
              </div>

              <div className="flex flex-col shadow-lg h-48 p-4 rounded-xl text-base md:text-lg text-gray-700">
                <span className="text-[#deae4c] font-bold text-center w-full mb-2">
                  Location
                </span>
                <div className="flex flex-1 items-center">
                  <span className="font-semibold text-left">
                    Polarpur, near Bhimnath Railway Station
                  </span>
                </div>
              </div>

              <div className="flex flex-col shadow-lg h-48 p-4 rounded-xl text-base md:text-lg text-gray-700">
                <span className="text-[#deae4c] font-bold text-center w-full mb-2">
                  Highway Access
                </span>
                <div className="flex flex-1 items-center">
                  <span className="font-semibold text-left">
                    Entry from 4-Lane State Highway (SH-117) (150-Feet Road)
                  </span>
                </div>
              </div>

              <div className="flex flex-col shadow-lg h-48 p-4 rounded-xl text-base md:text-lg text-gray-700">
                <span className="text-[#deae4c] font-bold text-center w-full mb-2">
                  Plot Sizes
                </span>
                <div className="flex flex-1 items-center">
                  <span className="font-semibold text-left">
                    152 & 200 sq. yards
                  </span>
                </div>
              </div>

              <div className="flex flex-col shadow-lg h-48 p-4 rounded-xl text-base md:text-lg text-gray-700">
                <span className="text-[#deae4c] font-bold text-center w-full mb-2">
                  Total Units
                </span>
                <div className="flex flex-1 items-center">
                  <span className="font-semibold text-left">
                    131 exclusive plots
                  </span>
                </div>
              </div>

              <div className="flex flex-col shadow-lg h-48 p-4 rounded-xl text-base md:text-lg text-gray-700">
                <span className="text-[#deae4c] font-bold text-center w-full mb-2">
                  Possession
                </span>
                <div className="flex flex-1 items-center">
                  <span className="font-semibold text-left">Immediate</span>
                </div>
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
