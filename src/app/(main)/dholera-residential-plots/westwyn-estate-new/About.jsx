import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import BrochureDownload from "../../components/BrochureDownload";

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
    <div className="bg-black relative overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 py-[clamp(0.75rem,1.5vw,1.25rem)]">
        {/* Location Advantage */}
        <div className="max-w-7xl mx-auto rounded-[1.5rem] bg-[#050505] px-[clamp(0.75rem,2vw,1rem)] py-[clamp(1.25rem,2.5vw,2rem)] shadow-2xl">
          <div className="mx-auto max-w-[42rem] text-center">
            <p className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#deae3c]">
              Location Advantage
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] text-white">
              Prime Location
            </h2>
          </div>

          <div className="mt-[clamp(1rem,2vw,1.5rem)] overflow-hidden rounded-[1.25rem] bg-[#080808] p-[clamp(0.75rem,1.5vw,1rem)] ring-1 ring-[#deae3c]/20">
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.4fr]">
              <div className="relative overflow-hidden rounded-2xl border border-[#deae3c]/25 bg-[linear-gradient(145deg,#0d0d0d_0%,#050505_55%,#171105_100%)] p-[clamp(1.25rem,2.5vw,2rem)] text-white">
                <div className="relative">
                  <div className="mb-[clamp(1rem,2vw,1.5rem)] inline-flex items-center gap-2 rounded-full border border-[#deae3c]/35 bg-[#deae3c]/10 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#deae3c]">
                    <span className="text-[1rem] leading-none">&#8226;</span>
                    Location Clarity
                  </div>

                  <h3 className="max-w-[20rem] text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.25]">
                    Connected to Dholera's key growth corridors
                  </h3>

                  <p className="mt-3 text-[0.95rem] leading-[1.65] text-white/70">
                    A clear location snapshot for rail, expressway, industrial,
                    and airport connectivity around WestWyn Estates.
                  </p>
                </div>

                <ul className="relative mt-[clamp(1rem,2vw,1.5rem)] space-y-3">
                  <li className="grid grid-cols-[4.25rem_1fr] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <span className="text-[1.05rem] font-bold text-[#deae3c]">
                      5 min
                    </span>
                    <span className="text-[0.95rem] leading-[1.4] text-white/85">
                      Bhimnath Railway Junction
                    </span>
                  </li>
                  <li className="grid grid-cols-[4.25rem_1fr] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <span className="text-[1.05rem] font-bold text-[#deae3c]">
                      15 min
                    </span>
                    <span className="text-[0.95rem] leading-[1.4] text-white/85">
                      Dholera SIR boundary
                    </span>
                  </li>
                  <li className="grid grid-cols-[4.25rem_1fr] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <span className="text-[1.05rem] font-bold text-[#deae3c]">
                      18 min
                    </span>
                    <span className="text-[0.95rem] leading-[1.4] text-white/85">
                      Ahmedabad Dholera Expressway
                    </span>
                  </li>
                  <li className="grid grid-cols-[4.25rem_1fr] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <span className="text-[1.05rem] font-bold text-[#deae3c]">
                      30 min
                    </span>
                    <span className="text-[0.95rem] leading-[1.4] text-white/85">
                      Tata Semiconductor Plant
                    </span>
                  </li>
                  <li className="grid grid-cols-[4.25rem_1fr] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <span className="text-[1.05rem] font-bold text-[#deae3c]">
                      45 min
                    </span>
                    <span className="text-[0.95rem] leading-[1.4] text-white/85">
                      Dholera International Airport
                    </span>
                  </li>
                </ul>
              </div>

              <div className="relative min-h-[19rem] overflow-hidden rounded-2xl border border-white/10 bg-black sm:min-h-[23rem] lg:min-h-[27rem]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.878172212779!2d71.91529182071378!3d22.2353352510217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f33007987615f%3A0x28c9c473efaffc7c!2sWestWyn%20Estates!5e1!3m2!1sen!2sin!4v1779431027763!5m2!1sen!2sin"
                  title="WestWyn Estates location on Google Maps"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
                <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-[#deae3c]/30 bg-black/75 px-4 py-2 text-[0.8rem] font-semibold text-white shadow-lg backdrop-blur-sm">
                  WestWyn Estates, Polarpur
                </div>
                <div className="pointer-events-none absolute bottom-4 right-4 hidden rounded-xl border border-white/15 bg-black/75 px-4 py-3 text-right shadow-lg backdrop-blur-sm sm:block">
                  <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[#deae3c]">
                    Map View
                  </p>
                  <p className="mt-1 text-[0.9rem] font-medium text-white">
                    Google Maps embedded location
                  </p>
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
