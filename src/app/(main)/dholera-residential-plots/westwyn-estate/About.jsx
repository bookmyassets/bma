import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import ContactForm from "../../components/Contactform";
import BrochureDownload from "../../components/BrochureDownload";
import { FaWhatsapp } from "react-icons/fa6";

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
      const targets = { plotSize: 170, price: 10, amenities: 5 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let current = { plotSize: 0, price: 0, amenities: 0 };

      const timer = setInterval(() => {
        current.plotSize = Math.min(
          current.plotSize + targets.plotSize / steps,
          targets.plotSize
        );
        current.price = Math.min(
          current.price + targets.price / steps,
          targets.price
        );
        current.amenities = Math.min(
          current.amenities + targets.amenities / steps,
          targets.amenities
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
      { threshold: 0.3 }
    );

    const counterSection = document.getElementById("counters-section");
    if (counterSection) {
      observer.observe(counterSection);
    }

    return () => observer.disconnect();
  }, []);

  const openContactForm = (title, headline, btnName, type) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen();
  };

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
          link.href = "https://shorturl.at/Dv00M";
          link.target = "_blank";
          link.download = "brochure.pdf"; // Add download attribute
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("Download link clicked");
        }, 300);
      } catch (error) {
        console.error("Error downloading brochure:", error);
        window.open("https://shorturl.at/Dv00M", "_blank");
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

          <h2 className="text-[32px] font-bold text-gray-900 ">
            About <span className="text-[#deae3c]">WestWyn Estate</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Premium plotted development in Dholera Smart City with strategic location and high ROI potential
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Content */}
          <div className="space-y-8 h-full">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#f8f5e6] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#deae3c]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Premium Development
                </h3>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                After the resounding success of WestWyn County, we proudly
                present the next chapter in our journey – WestWyn Estate.
                Trusted by investors and inspired by the strong response to our
                earlier project, this new launch carries forward the same vision
                of excellence, growth, and reliability at a prime location.
                <br />
                Located on Navda Highway, right at the entrance of Dholera SIR
                (0 km) and close to TP 5, WestWyn Estate places you at the
                center of a rapidly developing smart city corridor. Every plot
                here is designed to be more than land – it is a secure,
                future-ready investment that grows as Dholera transforms.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={openBrochureForm} className="bg-[#deae3c] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#c9992a] transition-colors flex items-center justify-center gap-2">
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

                  <a href="https://wa.me/918130371647">
                <button className="bg-white border w-full border-[#deae3c] text-[#deae3c] px-6 py-3 rounded-xl font-medium hover:bg-[#f8f5e6] transition-colors flex items-center justify-center gap-2">
                  <FaWhatsapp/>
                  Book Site Visit
                </button>
                      </a>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Section */}
          <div className="space-y-4 md:space-y-8  h-full">
            <div
              id="counters-section"
              className="bg-black rounded-2xl overflow-hidden shadow-lg h-full"
            >
              <div className="p-4 md:p-10">
                <div className="text-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#deae3c] mb-4">
                    WestWyn Estate{" "}
                    <span className="text-white">by Numbers</span>
                  </h3>
                  <p className="text-gray-300">
                    Designed for investors who value scale, location, and returns
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-3 md:p-6  bg-white/5 rounded-xl">
                      <div className="text-xl md:text-3xl font-bold text-[#deae3c] mb-3">
                        {counters.plotSize} sq yd
                      </div>
                      <div className="text-lg font-medium text-white mb-1"></div>
                      <div className="text-gray-300 text-sm">
                        Minimum plot size
                      </div>
                    </div>

                    <div className="text-center p-3 md:p-6 bg-white/5 rounded-xl">
                      <div className="text-xl md:text-3xl  font-bold text-[#deae3c] mb-3">
                        ₹ {counters.price.toLocaleString()} Lakh
                      </div>
                      <div className="text-gray-300 text-sm">
                        Starting Price
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-center p-3 md:p-6 bg-white/5 rounded-xl">
                      <div className="text-xl md:text-3xl font-bold text-[#deae3c] mb-3">
                        {counters.amenities}x ROI
                      </div>
                      <div className="text-gray-300 text-sm"> In 5 years </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-[#f8f5e6] p-6 rounded-2xl">
              <h4 className="font-semibold text-gray-900 mb-4">Why Choose WestWyn Estate?</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#deae3c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Strategic location near Dholera International Airport</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#deae3c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Part of Dholera Smart City development</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#deae3c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Modern infrastructure and amenities</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#deae3c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Secure investment with high appreciation potential</span>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <BrochureDownload
                onClose={closeBrochureForm}
                title="Get the Brochure"
                headline="Plots starting 10 Lakh at 0 km from Dholera SIR "
                buttonName="Download Now"
                onAfterSubmit={handleAfterSubmit}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WestWynAboutSection;
