"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export default function Ribbon() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
        try {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => setRecaptchaLoaded(true);
          script.onerror = () => {
            console.error("Failed to load reCAPTCHA script");
            setRecaptchaLoaded(true);
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true);
        }
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };
    
    loadRecaptcha();

    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    
    document.addEventListener("keydown", handleEscapeKey);
    
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    setShowThankYou(false);
    setFormData({ fullName: "", phone: "" });
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }
    
    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);
    
    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    } else if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      return false;
    }
    
    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const now = Date.now();
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
              phone: formData.phone,
              source: "BookMyAssets Google Ads",
            },
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        }
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
        
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form_hero",
        });

        setShowThankYou(true);
        
        setTimeout(() => {
          setShowThankYou(false);
          handleClose();
          const currentPath = pathname || window.location.pathname;
          router.push("/dholera-smart-city/thankyou");
        }, 2000);
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again."
      );
    } finally {
      setIsLoading(false);
      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
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

    if (window.grecaptcha && recaptchaLoaded) {
      try {
        if (recaptchaWidgetId.current === null && recaptchaRef.current) {
          recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "dark",
          });
        } else if (recaptchaWidgetId.current !== null) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
          window.grecaptcha.execute(recaptchaWidgetId.current);
        }
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
  <div className="bg-gray-100 border-t-4 border-b-4 border-[#deae3c] py-8">
  {/* Header */}
  <div className="text-center px-6 mb-6">
    <h2 className="text-[#deae3c] font-bold text-xl md:text-2xl mb-2">
      Verified plots under ₹10 Lakh only, 5 Minute from the Expressway
    </h2>
    <p className="text-white text-base"></p>
  </div>

  {/* Form */}
  <div className="max-w-lg mx-auto px-6">
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Your Name *
          </label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-3.5 h-5 w-5 text-[#deae3c]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <input
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 pl-11 text-base bg-white text-gray-800 rounded-md border-2 border-gray-300 focus:border-[#deae3c] focus:outline-none"
            />
          </div>
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Mobile Number *
          </label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-3.5 h-5 w-5 text-[#deae3c]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <input
              name="phone"
              type="tel"
              placeholder="Enter mobile number"
              value={formData.phone}
              onChange={handleChange}
              minLength={10}
              maxLength={15}
              required
              className="w-full p-3 pl-11 text-base bg-white text-gray-800 rounded-md border-2 border-gray-300 focus:border-[#deae3c] focus:outline-none"
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-300 rounded-md p-3 text-center">
            <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* ReCAPTCHA */}
        <div className="flex justify-center py-2">
          <div ref={recaptchaRef}></div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          id="ribbion-form"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3.5 bg-[#deae3c] text-black font-bold text-lg rounded-md hover:bg-[#c99a2e] transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Please Wait..." : "Get A Call Back"}
        </button>

        <p className="text-gray-500 text-xs text-center pt-2">
          We respect your privacy. Your information is secure.
        </p>
      </div>
    </div>
  </div>

  {/* Thank You Modal */}
  {showThankYou && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
      <div className="bg-white rounded-lg p-8 shadow-xl text-center max-w-sm border-4 border-[#deae3c]">
        <div className="w-16 h-16 bg-[#deae3c] rounded-full flex items-center justify-center mx-auto mb-4">
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
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 text-base">We will call you shortly.</p>
      </div>
    </div>
  )}
</div>
    </>
  );
}