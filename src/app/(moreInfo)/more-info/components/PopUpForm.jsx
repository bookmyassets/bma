"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaPhoneAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assests/Bmalogo.png";
import { useRouter, usePathname } from "next/navigation"

export default function PopupForm({
  onClose,
  title,
  subtitle = "",
  buttonName,
  thankYouTitle = "Thank You!",
  thankYouMessage = "Your request has been submitted successfully.",
  source = "BookMyAssets google ads",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false); 
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const router = useRouter();
  const pathname = usePathname();

  const [wasTriggered, setWasTriggered] = useState(false);

  // Parse title to extract price and time info
  const parseTitle = (title) => {
    const priceMatch = title.match(/₹([0-9,]+)/);
    const timeMatch = title.match(/(\d+:\d+:\d+)/);
    const price = priceMatch ? `₹${priceMatch[1]}` : null;
    const timeLeft = timeMatch ? timeMatch[1] : null;
    
    return {
      price,
      timeLeft,
      mainText: title,
      subText: "Limited units available - Don't miss out!"
    };
  };

  const titleInfo = parseTitle(title);

  useEffect(() => {
    // Check if already shown or if user has submitted before
    if (wasTriggered || submissionCount > 0) return;

    // Timer approach (5 seconds)
    const timer = setTimeout(() => {
      if (!wasTriggered && !showThankYou && submissionCount === 0) {
        setShowFormPopup(true);
        setWasTriggered(true);
      }
    }, 5000);

    // Scroll approach (5% of page)
    const handleScroll = () => {
      const scrollThreshold = document.body.scrollHeight * 0.05;
      if (window.scrollY > scrollThreshold && !wasTriggered && !showThankYou && submissionCount === 0) {
        setShowFormPopup(true);
        setWasTriggered(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timer);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [wasTriggered, submissionCount]);

  // Handle close function
  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

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
            setRecaptchaLoaded(true); // Fallback
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true); // Fallback
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

    // Handle Escape key press
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
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
              source: source,
            },
            source: "BookMyAssets Google Ads",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        }
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowSubmissionSuccess(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });

        // Show thank you popup for 2 seconds
        setShowThankYou(true);
        setTimeout(() => {
          setShowThankYou(false);
          handleClose();
          router.push(`/more-info/thankyou`);
        }, 3000);
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
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.reset(recaptchaRef.current);
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

    // If reCAPTCHA is loaded, render it in the ref
    if (window.grecaptcha && recaptchaLoaded) {
      try {
        if (recaptchaRef.current && !recaptchaRef.current.innerHTML) {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "dark",
          });
        } else {
          window.grecaptcha.reset();
          window.grecaptcha.execute();
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

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Prevent modal content click from closing modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Thank You Page */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-green-900 to-green-800 flex justify-center items-center z-[1001]"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="text-center text-white px-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-green-600"
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
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {thankYouTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl"
              >
                {thankYouMessage}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-md opacity-80 mt-2"
              >
                Redirecting you back...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Modal */}
      {showFormPopup && !showThankYou && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 p-4 z-[1000]"
          onClick={handleBackdropClick}
        >
          <motion.div
            id="contact-form-container"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden"
            onClick={handleModalContentClick}
          >
            {/* Header Section with Gradient Background */}
            <div className="bg-black text-white p-6 pb-8 relative">
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-2 transition-all duration-200 hover:bg-white/10 z-10"
                aria-label="Close form"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="bg-black p-3 rounded-full shadow-lg"
                >
                  <Image
                    src={logo}
                    alt="Logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </motion.div>
              </div>

              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="mb-3">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2">
                    <FaClock className="text-xs" />
                    EXCLUSIVE DEAL
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                  {titleInfo.mainText}
                </h2>
                
                {titleInfo.price && (
                  <div className="text-3xl md:text-4xl font-black text-[#d7b36c] mb-2">
                    {titleInfo.price}/sq. yard
                  </div>
                )}
                
                <p className="text-white/90 text-sm mb-3">
                  {titleInfo.subText}
                </p>
                
                {titleInfo.timeLeft && (
                  <div className="bg-[#d7b36c] text-black px-4 py-2 rounded-lg inline-flex items-center gap-2 font-bold">
                    <FaClock className="text-sm" />
                    {titleInfo.timeLeft} left!
                  </div>
                )}
              </motion.div>
            </div>

            {/* Form Section */}
            <div className="p-6">
              {showSubmissionSuccess ? (
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    Your request has been submitted successfully. We'll contact
                    you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Book Now
                    </h3>
                  </div>

                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
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
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                    <input
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full p-2 pl-12 bg-gray-50 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-200 hover:border-red-300 transition-colors"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      minLength="10"
                      maxLength="15"
                      required
                      className="w-full p-2 pl-12 bg-gray-50 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-200 hover:border-red-300 transition-colors"
                    />
                  </motion.div>

                  {/* reCAPTCHA container */}
                  <div className="flex justify-center">
                    <div ref={recaptchaRef}></div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading || !recaptchaLoaded}
                    className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-500/25 font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </>
                    ) : recaptchaLoaded ? (
                      <>
                        <FaPhoneAlt className="text-sm" />
                        {buttonName}
                      </>
                    ) : (
                      "Loading..."
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to receive calls/WhatsApp messages about our services
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}