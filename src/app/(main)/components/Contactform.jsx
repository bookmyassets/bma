"use client";
import { useState, useEffect, useRef } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha && siteKey) {
        try {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => setRecaptchaLoaded(true);
          script.onerror = () => {
            console.error("Failed to load reCAPTCHA script");
            setRecaptchaLoaded(true); // Allow form submission without reCAPTCHA as fallback
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true);
        }
      } else if (window.grecaptcha || !siteKey) {
        setRecaptchaLoaded(true);
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

    // Prevent modal close when clicking inside
    const handleClickInside = (e) => {
      e.stopPropagation();
    };

    const formElement = document.getElementById("contact-form-container");
    if (formElement) {
      formElement.addEventListener("click", handleClickInside);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("click", handleClickInside);
      }
    };
  }, [siteKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(""); // Clear error messages on input change
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    // Phone validation - accept various formats
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setErrorMessage("Please enter a valid phone number");
      return false;
    }

    // Check submission limits
    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      // Reset counter if 24 hours have passed
      setSubmissionCount(0);
      if (typeof window !== "undefined") {
        localStorage.setItem("formSubmissionCount", "0");
        localStorage.setItem("lastSubmissionTime", now.toString());
      }
    } else if (submissionCount >= 3) {
      setErrorMessage("You have reached the maximum submission limit. Try again after 24 hours.");
      return false;
    }

    return true;
  };

  const submitForm = async (recaptchaToken = null) => {
    try {
      const now = Date.now();
      
      // Create the submission data in the format TeleCRM expects
      const submissionData = {
        name: formData.fullName.trim(),
        mobile: formData.phone.trim(),
        source: "BookMyAssets",
        // Add any other fields that TeleCRM might expect
        email: "", // Empty email if not collected
        message: "Lead from BookMyAssets contact form",
      };

      // Get the API key and construct the correct endpoint
      const apiKey = process.env.NEXT_PUBLIC_TELECRM_API_KEY;
      if (!apiKey) {
        throw new Error("TeleCRM API key not configured");
      }

      // Try the autoupdatelead endpoint based on the error URL pattern
      const apiUrl = `https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead`;

      console.log("Submitting to TeleCRM:", { url: apiUrl, data: submissionData });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // Try without Authorization header first, as the API key is in URL
        },
        body: JSON.stringify(submissionData),
      });

      console.log("TeleCRM Response status:", response.status);

      // Handle different response scenarios
      let data = {};
      if (response.status !== 204) {
        try {
          data = await response.json();
          console.log("TeleCRM Response data:", data);
        } catch (jsonError) {
          console.log("Response is not JSON, proceeding...");
        }
      }

      if (response.ok) {
        // Success - store locally for backup/tracking
        if (typeof window !== "undefined") {
          const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
          submissions.push({
            ...submissionData,
            submissionId: `BMA_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            status: "sent_to_telecrm",
            response: data,
            id: Date.now()
          });
          localStorage.setItem("contactSubmissions", JSON.stringify(submissions));
        }

        // Success handling
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
        
        // Update submission count
        const newCount = submissionCount + 1;
        setSubmissionCount(newCount);
        if (typeof window !== "undefined") {
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
        }

        // Auto close after 3 seconds
        setTimeout(() => {
          if (onClose) onClose();
        }, 3000);

      } else {
        // Handle API errors
        const errorMessage = data.message || data.error || data.msg || `API Error: ${response.status}`;
        console.error("TeleCRM API Error Details:", {
          status: response.status,
          statusText: response.statusText,
          data: data,
          url: apiUrl,
          sentData: submissionData
        });
        throw new Error(errorMessage);
      }

    } catch (error) {
      console.error("TeleCRM API submission error:", error);
      
      // Show user-friendly error messages
      if (error.message.includes('API key not configured')) {
        setErrorMessage("Configuration error. Please contact support.");
      } else if (error.message.includes('INVALID_DATA') || error.message.includes('400')) {
        setErrorMessage("Invalid data format. Please check your input and try again.");
      } else if (error.message.includes('Authorization') || error.message.includes('401')) {
        setErrorMessage("Authentication error. Please contact support.");
      } else if (error.message.includes('Network') || error.name === 'TypeError') {
        setErrorMessage("Network error. Please check your connection and try again.");
      } else if (error.message.includes('Rate limit') || error.message.includes('429')) {
        setErrorMessage("Too many requests. Please try again later.");
      } else {
        setErrorMessage("Error submitting form. Please try again later.");
      }
      
      // Store failed submission for retry later
      if (typeof window !== "undefined") {
        const failedSubmissions = JSON.parse(localStorage.getItem("failedSubmissions") || "[]");
        failedSubmissions.push({
          name: formData.fullName.trim(),
          mobile: formData.phone.trim(),
          source: "BookMyAssets",
          timestamp: new Date().toISOString(),
          error: error.message,
          retryCount: 0
        });
        localStorage.setItem("failedSubmissions", JSON.stringify(failedSubmissions));
      }
      
    } finally {
      setIsLoading(false);
      
      // Reset reCAPTCHA
      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        } catch (err) {
          console.error("Error resetting reCAPTCHA:", err);
        }
      }
    }
  };

  const onRecaptchaSuccess = (token) => {
    submitForm(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // If reCAPTCHA is configured and loaded
    if (window.grecaptcha && recaptchaLoaded && siteKey) {
      try {
        // Render reCAPTCHA if not already rendered
        if (recaptchaWidgetId.current === null && recaptchaRef.current) {
          recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "dark",
            size: "compact"
          });
        }
        
        // Execute reCAPTCHA
        if (recaptchaWidgetId.current !== null) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
          const token = await new Promise((resolve, reject) => {
            window.grecaptcha.ready(() => {
              window.grecaptcha.execute(recaptchaWidgetId.current, { action: 'submit' })
                .then(resolve)
                .catch(reject);
            });
          });
          onRecaptchaSuccess(token);
        }
      } catch (error) {
        console.error("reCAPTCHA error:", error);
        // Proceed without reCAPTCHA if there's an error
        submitForm();
      }
    } else {
      // Submit without reCAPTCHA if not configured
      submitForm();
    }
  };

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
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none transition-colors"
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
          className="text-center mb-6 mt-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Get In Touch</h2>
          <p className="text-gray-300 text-sm">
            Get Expert Guidance on Dholera Investment
          </p>
        </motion.div>

        {showPopup ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
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
            <p className="text-gray-300 text-center">
              Your request has been submitted successfully. We'll contact you shortly.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm"
              >
                {errorMessage}
              </motion.div>
            )}
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
              />
            </motion.div>

            {/* reCAPTCHA container */}
            {siteKey && (
              <div className="flex justify-center">
                <div ref={recaptchaRef}></div>
              </div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Book Consultation"
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}