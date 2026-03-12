import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import BrochureDownload from "../../components/BrochureDownload";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";

const WestWynAboutSection = () => {
  const [counters, setCounters] = useState({
    plotSize: 0,
    price: 0,
    amenities: 0,
  });

  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  // New state for brochure form
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");

  // Animation for counters
  useEffect(() => {
    const animateCounters = () => {
      const targets = { plotSize: 151, price: 10, amenities: 5 };
      const duration = 100;
      const steps = 60;
      const stepTime = duration / steps;

      let current = { plotSize: 0, price: 0, amenities: 0 };

      const timer = setInterval(() => {
        current.plotSize = Math.min(
          current.plotSize + targets.plotSize / steps,
          targets.plotSize,
        );
        current.price = Math.min(
          current.price + targets.price / steps,
          targets.price,
        );
        current.amenities = Math.min(
          current.amenities + targets.amenities / steps,
          targets.amenities,
        );

        setCounters({
          plotSize: Math.floor(current.plotSize),
          price: Math.floor(current.price),
          amenities: Math.floor(current.amenities),
        });

        if (
          current.plotSize >= targets.plotSize &&
          current.price >= targets.price &&
          current.amenities >= targets.amenities
        ) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    const counterSection = document.getElementById("counters-section");
    if (counterSection) {
      observer.observe(counterSection);
    }

    return () => observer.disconnect();
  }, []);

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
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23deae3c' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-[#deae3c]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#deae3c]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-4">
        {/* Header Section */}
        <div className="text-center mb-4">
          {/*                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f8f5e6] mb-6">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full"></div>
                        <span className="text-sm font-medium text-[#deae3c] uppercase">About Project</span>
                    </div> */}

          <h1 className="text-[32px] font-bold text-gray-900 ">
            About <span className="text-[#deae3c]">WestWyn Estates</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
             Westwyn Estates is a premium plotted society located directly on
                State Highway-117 at Dholera Smart City. The project offers
                strong connectivity and thoughtfully planned layout ensuring
                high growth potential in future.
          </p>
        </div>

        <div className=" gap-12 items-stretch space-y-4">
          {/* Left Content */}
          <div className="space-y-8 h-full">
          

              <div className="flex flex-col justify-center items-center sm:flex-row gap-4">
                <button
                  onClick={openBrochureForm}
                  className="bg-[#deae3c] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#c9992a] transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Brochure
                </button>

                <Link href="https://wa.me/918130371647">
                  <button className="bg-white border border-[#deae3c] text-[#deae3c] px-10 py-3 rounded-xl font-medium hover:bg-[#f8f5e6] transition-colors flex items-center justify-center gap-2">
                    <FaWhatsapp />
                    Book Site Visit
                  </button>
                </Link>
              </div>
          </div>

          {/* Right Content - Stats Section */}
          <div className="space-y-4 md:space-y-8  h-full">
            <div
              id="counters-section"
              className="bg-black rounded-2xl overflow-hidden shadow-lg h-full"
            >
              <div className="p-4 md:p-10">
                

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="text-center p-3 md:p-6  bg-white/5 rounded-xl">
                      <div className="text-xl md:text-3xl font-bold text-[#deae3c] mb-3">
                        7.83 Acres
                      </div>
                      <div className="text-lg font-medium text-white mb-1"></div>
                      <div className="text-gray-300 text-sm">
                        Total Land Parcel
                      </div>
                    </div>

                    <div className="text-center p-3 md:p-6 bg-white/5 rounded-xl">
                      <div className="text-xl md:text-3xl  font-bold text-[#deae3c] mb-3">
                        231
                      </div>
                      <div className="text-gray-300 text-sm">Total Units</div>
                    </div>
                    <div>
                      <div className="text-center p-3 md:p-6 bg-white/5 rounded-xl">
                        <div className="text-xl md:text-3xl font-bold text-[#deae3c] mb-3">
                          151-198 <span className="text-lg">sq. yd</span>
                        </div>
                        <div className="text-gray-300 text-sm">
                          {" "}
                          Plot Sizes{" "}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-center p-3 md:p-6 bg-white/5 rounded-xl">
                        <div className="text-xl md:text-3xl font-bold text-[#deae3c] mb-3">
                          ₹ 10 Lakh
                        </div>
                        <div className="text-gray-300 text-sm">
                          {" "}
                          Starting Price{" "}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-center p-3 md:p-6 bg-white/5 rounded-xl">
                        <div className="text-xl md:text-3xl font-bold text-[#deae3c] mb-3">
                          Min 300%
                        </div>
                        <div className="text-gray-300 text-sm">
                          Returns In 5 years{" "}
                        </div>
                      </div>
                    </div>
                  </div>
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

export default WestWynAboutSection;
