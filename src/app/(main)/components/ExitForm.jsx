"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";

export default function ExitPopup({
  title = "Wait! Before You Go...",
  subtitle = "Get exclusive updates",
  mobileStrategy = "scroll" // Options: "scroll", "time", "back", "all"
}) {
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Detect if device is mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;
  };

  // Load reCAPTCHA script
  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha && siteKey) {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        script.onload = () => setRecaptchaLoaded(true);
        script.onerror = () => setRecaptchaLoaded(true);
        document.head.appendChild(script);
      } else if (window.grecaptcha || !siteKey) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();
  }, [siteKey]);

  // Desktop exit intent detection
  useEffect(() => {
    if (isMobile()) return;

    const handleExitIntent = (e) => {
      if (e.clientY <= 0 && !popupShown) {
        setShowFormPopup(true);
        setPopupShown(true);
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === "w") || (e.altKey && e.key === "F4")) {
        if (!popupShown) {
          e.preventDefault();
          setShowFormPopup(true);
          setPopupShown(true);
        }
      }
    };

    document.addEventListener("mouseleave", handleExitIntent);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseleave", handleExitIntent);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupShown]);

  // Mobile: Back button detection
  useEffect(() => {
    if (!isMobile() || (mobileStrategy !== "back" && mobileStrategy !== "all")) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (!popupShown) {
        setShowFormPopup(true);
        setPopupShown(true);
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [popupShown, mobileStrategy]);

  // Mobile: Scroll-based detection
  useEffect(() => {
    if (!isMobile() || (mobileStrategy !== "scroll" && mobileStrategy !== "all")) return;

    const handleScroll = () => {
      if (popupShown) return;

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent > 50) {
        setShowFormPopup(true);
        setPopupShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [popupShown, mobileStrategy]);

  // Mobile: Time-based detection
  useEffect(() => {
    if (!isMobile() || (mobileStrategy !== "time" && mobileStrategy !== "all")) return;

    const timer = setTimeout(() => {
      if (!popupShown) {
        setShowFormPopup(true);
        setPopupShown(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [popupShown, mobileStrategy]);

  // Escape key handler
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && showFormPopup) {
        handlePopupClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showFormPopup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid mobile number (10-15 digits)");
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const response = await fetch(
         "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },
          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: formData.mobileNumber,
              email: formData.email || undefined,
              source: "BookMyAssets Exit Popup",
            },
            source: "BookMyAssets Exit Popup",
            tags: ["Exit Intent", "Popup Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        }
      );

      if (response.ok) {
        setFormData({ fullName: "", mobileNumber: "", email: "" });
        setShowThankYou(true);

        setTimeout(() => {
          setShowThankYou(false);
          setShowFormPopup(false);
        }, 3000);
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        } catch (err) {
          console.error("Error resetting reCAPTCHA:", err);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (!recaptchaLoaded || !window.grecaptcha) {
      setErrorMessage("Security verification not loaded. Please refresh the page.");
      setIsLoading(false);
      return;
    }

    try {
      if (!recaptchaRef.current.innerHTML || recaptchaWidgetId.current === null) {
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onRecaptchaSuccess,
          theme: "light",
        });
      } else {
        window.grecaptcha.execute(recaptchaWidgetId.current);
      }
    } catch (error) {
      console.error("Error with reCAPTCHA:", error);
      setErrorMessage("Error with verification. Please try again.");
      setIsLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowFormPopup(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handlePopupClose();
    }
  };

  if (!showFormPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl relative transform transition-all animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {showThankYou ? (
          <div className="text-center py-4">
            <div className="mb-6 animate-scale-in">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600">
              Our team will contact you shortly with exclusive details.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <button
                onClick={handlePopupClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors w-8 h-8 flex items-center justify-center"
                aria-label="Close popup"
              >
                ×
              </button>
              <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 pr-8">
                {title}
              </h1>
              <p className="text-base md:text-lg text-gray-700 font-semibold">
                {subtitle}
              </p>
            </div>

            <div>
              {errorMessage && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm mb-4">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobileNumber"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Hidden reCAPTCHA container */}
              <div ref={recaptchaRef} className="flex justify-center mb-4"></div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 text-base ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5"
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
                  "Get A Call Back"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  🔒 We respect your privacy. Your details are safe with us.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

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
  );
}