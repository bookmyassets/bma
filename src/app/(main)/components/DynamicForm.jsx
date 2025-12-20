"use client";
import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import img from "@/assests/homepage/form-img.png";
import Image from "next/image";

export default function DholeraPopupForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", mobileNumber: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auto-popup after 3 seconds
  useEffect(() => {
    const hasShown = sessionStorage.getItem("popupShown");

    if (!hasShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("popupShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showPopup) {
        setShowPopup(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showPopup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your name");
      return false;
    }
    if (!/^\d{10,15}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid mobile number (10-15 digits)");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - replace with your actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Your actual API call would go here following your TeleCRM pattern:
      /*
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${YOUR_API_KEY}`,
        },
        body: JSON.stringify({
          fields: {
            name: formData.fullName,
            phone: formData.mobileNumber,
            source: "Dholera Landing Page",
          },
          source: "Dholera Popup",
          tags: ["Dholera Investment", "Popup Lead"],
        }),
      });
      */

      setFormData({ fullName: "", mobileNumber: "" });
      setShowThankYou(true);

      setTimeout(() => {
        setShowThankYou(false);
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false);
    }
  };

  return (
  <>
    
  <div className="max-sm:hidden">
    {showPopup && (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={handleBackdropClick}
      >
        {/* Main container with equal height sections */}
        <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl w-full">
          {/* Image container - fixed aspect ratio */}
          <div className="w-full md:w-auto flex-shrink-0">
            <div 
              className="relative overflow-hidden rounded-l-lg shadow-xl"
              style={{
                width: "450px",
                height: "350px",
                maxWidth: "min(450px, 90vw)",
                maxHeight: "min(350px, 70vh)"
              }}
            >
              <Image
                src={img}
                alt="The Future of India's Urban and Industrial Growth - Dholera"
                className="object-cover w-full h-full"
                fill
                sizes="(max-width: 768px) 90vw, 450px"
              />
            </div>
          </div>

          {/* Form container - matches image height */}
          <div 
            className="bg-white rounded-r-lg p-6 md:p-8 shadow-2xl relative transform transition-all animate-scale-in w-full max-w-[450px]"
            style={{
              minHeight: "350px",
              height: "350px",
              maxHeight: "min(350px, 70vh)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {showThankYou ? (
              <div className="text-center py-6 md:py-8 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-scale-in">
                  <Check
                    className="h-8 w-8 md:h-10 md:w-10 text-white"
                    strokeWidth={3}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
                  Thank You!
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Our team will contact you shortly with exclusive Dholera
                  investment details.
                </p>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                  aria-label="Close popup"
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </button>

                {/* Scrollable form area */}
                <div className="h-full overflow-y-auto pr-2 -mr-2">
                  <div className="space-y-4 pb-2">
                    {errorMessage && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs md:text-sm">
                        {errorMessage}
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm md:text-base"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mobileNumber"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                      >
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm md:text-base"
                        placeholder="Enter your mobile number"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className={`w-full font-bold py-2.5 md:py-3 px-6 rounded-lg transition-all duration-300 text-sm md:text-base ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        "Get Investment Details"
                      )}
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-3">
                      🔒 Your details are safe and secure with us
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )}

      {/* Popup Form */}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>

<div className="md:hidden">

  <div className="">
  <div className="">
    {showPopup && (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={handleBackdropClick}
      >
        <div className="flex flex-col items-center w-full">
          <div className="relative max-w-[450px] w-full">
            <Image
              src={img}
              alt="The Future of India's Urban and Industrial Growth - Dholera"
              className="w-full h-auto shadow-xl"
              style={{ maxWidth: "450px", aspectRatio: "450/350" }}
            />
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 z-50 right-3 md:top-4 md:right-4 text-red-900 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
          <div
            className="bg-white p-6 md:p-8 max-w-[450px] w-full shadow-2xl relative transform transition-all animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {showThankYou ? (
              <div className="text-center py-6 md:py-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-scale-in">
                  <Check
                    className="h-8 w-8 md:h-10 md:w-10 text-white"
                    strokeWidth={3}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
                  Thank You!
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Our team will contact you shortly with exclusive Dholera
                  investment details.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs md:text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex justify-center items-center gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm md:text-base"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mobileNumber"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                      >
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm md:text-base"
                        placeholder="Enter your mobile number"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`w-full font-bold py-2.5 md:py-3 px-6 rounded-lg transition-all duration-300 text-sm md:text-base ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      "Get Investment Details"
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-500 mt-3">
                    🔒 Your details are safe and secure with us
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
</div>
</div>
  </>

  );
}
