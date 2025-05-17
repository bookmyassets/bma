"use client";
import { useState, useEffect } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/assests/Bmalogo.png";

export default function ContactForm({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined") {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setRecaptchaLoaded(true);
          console.log("reCAPTCHA loaded");
        };
        script.onerror = () => {
          console.error("Failed to load reCAPTCHA");
          setRecaptchaLoaded(false);
        };
        document.body.appendChild(script);
      }
    };

    loadRecaptcha();

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

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

    return true;
  };

  const checkSubmissionLimit = () => {
    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    }

    if (submissionCount >= 8) {
      setErrorMessage("You have reached the maximum submission limit. Try again after 24 hours.");
      return false;
    }

    return true;
  };

  const sendToTeleCRM = async (token) => {
    try {
      // TeleCRM API endpoint (replace with your actual TeleCRM endpoint)
      const telecrmEndpoint = process.env.NEXT_PUBLIC_TELECRM_API_ENDPOINT;
      
      // Prepare the data for TeleCRM
      const leadData = {
        name: formData.fullName,
        phone: formData.phone,
        source: "Website Form",
        recaptcha_token: token,
        // Add any additional fields required by TeleCRM
      };

      const response = await fetch(telecrmEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any required authentication headers
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit to TeleCRM");
      }

      return true;
    } catch (error) {
      console.error("TeleCRM API error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Validate form
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // Check submission limits
    if (!checkSubmissionLimit()) {
      setIsLoading(false);
      return;
    }

    try {
      // Execute reCAPTCHA
      if (!window.grecaptcha) {
        throw new Error("reCAPTCHA not loaded");
      }

      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "submit" }
      );

      // Send data to TeleCRM
      await sendToTeleCRM(token);

      // On success
      setFormData({ fullName: "", phone: "" });
      setShowPopup(true);
      
      // Update submission count
      const now = Date.now();
      setSubmissionCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("formSubmissionCount", newCount.toString());
        localStorage.setItem("lastSubmissionTime", now.toString());
        return newCount;
      });

      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(error.message || "Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ... (rest of your component JSX remains the same)
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4 z-[1000]"
      onClick={onClose}
    >
      <motion.div
        id="contact-form-container"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose?.();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
          aria-label="Close form"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black p-2 rounded-full shadow-lg"
          >
            <Image
              src={logo}
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6 "
        >
          <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
          <p className="text-gray-300 text-sm">
            Fill this form to explore premium investment opportunities
          </p>
        </motion.div>

        {showPopup ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-4 inline-block"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
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
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-gray-300">
              Your request has been submitted successfully. We'll contact you
              shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}
            
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
              />
            </div>

            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                minLength="10"
                maxLength="15"
                required
                className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !recaptchaLoaded}
              className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : recaptchaLoaded ? "Request Exclusive Consultation" : "Loading..."}
            </button>
            
            {/* Invisible reCAPTCHA badge */}
            <div className="text-xs text-gray-500 text-center mt-2">
              This site is protected by reCAPTCHA Enterprise
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}