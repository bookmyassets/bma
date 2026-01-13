"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/assests/bma-logo-black.png";

export default function ContactForm({
  onClose,
  title = "Get In Touch",
  buttonName = "Book Consultation",
  project
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
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
      const storedCount = parseInt(
        localStorage.getItem("formSubmissionCount") || "0",
        10
      );
      const lastSubmissionTime = parseInt(
        localStorage.getItem("lastSubmissionTime") || "0",
        10
      );

      // Check if 24 hours have passed since the last submission
      if (lastSubmissionTime) {
        const timeDifference = Date.now() - lastSubmissionTime;
        const hoursPassed = timeDifference / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          // Reset submission count after 24 hours
          setSubmissionCount(0);
          localStorage.setItem("formSubmissionCount", "0");
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        } else {
          setSubmissionCount(storedCount);
          // Check if limit reached
          if (storedCount >= 20) {
            setIsDisabled(true);
          }
        }
      } else {
        setSubmissionCount(storedCount);
      }
    }

    // Cleanup function
    return () => {
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          window.grecaptcha.reset();
        } catch (e) {
          console.log("reCAPTCHA cleanup error:", e);
        }
      }
    };
  }, [siteKey]);

  // Handle close function
  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop, not the form content
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle form container click (prevent closing)
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(""); // Clear error messages on input change
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    // Email validation (optional field)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    // Phone validation - accept various formats (10-15 digits)
    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    // Check submission limits
    if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      setIsDisabled(true);
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      // API Request using the new endpoint and format
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
              source: "BookMyAssets",
            },
            source: "BookMyAssets Website",
            tags: ["Dholera Investment", "Website Lead"],
            recaptchaToken: token,
          }),
        }
      );

      // Store response text before parsing
      const responseText = await response.text();
      console.log("TeleCRM Response:", responseText);

      // Check response status and handle accordingly
      if (response.ok) {
        if (
          responseText === "OK" ||
          responseText.toLowerCase().includes("success")
        ) {
          // Success handling
          setFormData({ fullName: "", phone: "" });
          setShowPopup(true);

          // Update submission count
          const newCount = submissionCount + 1;
          setSubmissionCount(newCount);
          if (typeof window !== "undefined") {
            localStorage.setItem("formSubmissionCount", newCount.toString());
            localStorage.setItem("lastSubmissionTime", Date.now().toString());
          }

          /* Google Tag */
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "lead_form",
            page_name : project,
          });

          // Auto close after 3 seconds
          setTimeout(() => {
            handleClose();
          }, 3000);
        } else {
          console.log("Response Text:", responseText);
          setErrorMessage("Submission received but with unexpected response");
        }
      } else {
        console.error("Server Error:", responseText);
        throw new Error(responseText || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);

      // Reset reCAPTCHA
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          window.grecaptcha.reset();
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
      setErrorMessage(
        "Security verification not loaded. Please refresh the page."
      );
      setIsLoading(false);
      return;
    }

    // Render reCAPTCHA if not already rendered
    if (!recaptchaRef.current.innerHTML) {
      try {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onRecaptchaSuccess,
          theme: "dark",
          size: "compact",
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      // Execute existing reCAPTCHA
      window.grecaptcha.execute();
    }
  };

  return (
    <div
  className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4 z-[1000]"
  onClick={handleBackdropClick}
>
  <motion.div
    id="contact-form-container"
    initial={{ scale: 0.9, y: 50 }}
    animate={{ scale: 1, y: 0 }}
    exit={{ scale: 0.9, y: 50 }}
    className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full relative mx-2"
    onClick={handleFormClick}
  >
    {/* Close Button */}
    <button
      type="button"
      onClick={handleClose}
      className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white focus:outline-none transition-colors z-10 p-1"
      aria-label="Close form"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 sm:h-7 sm:w-7"
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
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg"
      >
        <Image
          src={logo}
          alt="Logo"
          width={60}
          height={60}
          className="rounded-lg"
        />
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-center mb-6 mt-12 sm:mt-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">{title}</h2>
    </motion.div>

    {showPopup ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6 sm:py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 inline-block"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 sm:h-10 sm:w-10 text-white"
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
        <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Thank You!</h3>
        <p className="text-gray-600 text-center px-2">
          Your request has been submitted successfully. We'll contact you
          shortly.
        </p>
      </motion.div>
    ) : isDisabled ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6 sm:py-8"
      >
        <p className="text-center text-red-400 font-semibold px-2">
          You have reached the maximum submission limit. Try again after 24
          hours.
        </p>
      </motion.div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors text-base"
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
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors text-base"
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
          disabled={isLoading || isDisabled || !recaptchaLoaded}
          className={`w-full py-3 px-6 text-black rounded-lg font-semibold transition-all shadow-lg transform active:scale-95 text-base ${
            isLoading || isDisabled || !recaptchaLoaded
              ? "bg-gray-600 cursor-not-allowed opacity-70"
              : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 hover:shadow-yellow-500/20 hover:scale-105"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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
            </span>
          ) : (
            "Get A Call Back"
          )}
        </motion.button>
      </form>
    )}
  </motion.div>
</div>
  );
}
