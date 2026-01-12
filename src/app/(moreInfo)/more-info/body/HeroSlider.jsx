"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/assests/ad-page/dholera-govt-logo.webp"
/* import logo from "@/assests/festival-images/dholera-diwali.webp" */
import { Home, CheckCircle, CalendarCheck, Download, ChevronRight, ChevronLeft, FileCheck } from 'lucide-react';
import { useRouter, usePathname } from "next/navigation";

//images import
import img1 from "@/assests/ad-page/hero/dholera-activation-area-banner.webp";
import img2 from "@/assests/ad-page/hero/dholera-activation-area-banner2.webp";
import img3 from "@/assests/ad-page/hero/dholera-activation-area-banner3.webp";
import img4 from "@/assests/ad-page/hero/dholera-international-airport-landing-page-desktop.webp";
import img5 from "@/assests/ad-page/hero/dholera-tata-semiconductor-plant-landing-page-desktop.webp";
import img6 from "@/assests/ad-page/hero/dholera-tata-solar-park-landing-page-desktop.webp";

import imgM1 from "@/assests/ad-page/hero/dholera-activation-area-mobile1.webp";
import imgM2 from "@/assests/ad-page/hero/dholera-activation-area-mobile2.webp";
import imgM3 from "@/assests/ad-page/hero/dholera-activation-area-mobile3.webp";
import imgM4 from "@/assests/ad-page/hero/dholera-international-airport-landing-page-mobile.webp";
import imgM5 from "@/assests/ad-page/hero/dholera-tata-semiconductor-plant-landing-page-mobile.webp";
import imgM6 from "@/assests/ad-page/hero/dholera-tata-solar-park-landing-page-mobile.webp";
import BrochureDownload from "../components/BrochureDownload";
import MobilePropertyGrid from "./MobileGrid";


export default function LandingPage({ openForm }) {

    const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: ""
  });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;


  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const desktopImages = [
    { src: img1, alt: "Dholera Investment Opportunity 1" },
    { src: img2, alt: "Dholera Investment Opportunity 2" },
    { src: img3, alt: "Dholera Investment Opportunity 3" },
    { src: img4, alt: "Dholera Investment Opportunity 3" },
    { src: img5, alt: "Dholera Investment Opportunity 3" },
    { src: img6, alt: "Dholera Investment Opportunity 3" },
  ];

  const mobileImages = [
    { src: imgM1, alt: "Dholera Mobile 1" },
    { src: imgM2, alt: "Dholera Mobile 2" },
    { src: imgM3, alt: "Dholera Mobile 3" },
    { src: imgM4, alt: "Dholera Mobile 3" },
    { src: imgM5, alt: "Dholera Mobile 3" },
    { src: imgM6, alt: "Dholera Mobile 3" },
  ]


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
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
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
    } else if (submissionCount >= 50) {
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
            source: "BookMyAssets Google Ads",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        }
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });

        // Push event to Google Tag Manager
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "lead_form_hero",
      });

        // Show thank you popup
        setShowThankYou(true);
        
        // Navigate after delay
        setTimeout(() => {
          setShowThankYou(false); // Hide the overlay before navigation
          console.log("Navigating to thank you page..."); // Debug log
          router.push('/more-info/thankyou');
        }, 2000);


      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again."
      );
      setIsLoading(false);
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  //Slider Logic

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === desktopImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [desktopImages.length]);

  // Touch handlers for swipe (mobile)
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentSlide((prev) =>
        prev === mobileImages.length - 1 ? 0 : prev + 1
      );
    } else if (touchEnd - touchStart > 50) {
      setCurrentSlide((prev) =>
        prev === 0 ? mobileImages.length - 1 : prev - 1
      );
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === desktopImages.length - 1 ? 0 : prev + 1
    );
  };
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1
    );
  };


  const [isDownload, setIsDownload] = useState(false);

  const openBrochure = () => {
    setIsDownload(true);
  }

  const closeBrochure = () => {
    setIsDownload(false);
  }


  return (
    <div id="hero" className="relative min-h-screen bg-gray-100">
      {/* Thank You Overlay */}
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
                Thank You!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl"
              >
                Your request has been submitted successfully.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout - Desktop */}
      <div className="h-screen max-sm:h-[95vh] flex flex-col">
        {/* Main Content Section - Takes most of the screen */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* Left Side - Slider Section (60%) */}
          <div className="w-full lg:w-[60%] relative flex-1">
            {/* Desktop Slider */}
            <div className="absolute inset-0 hidden lg:block">
              <div className="relative w-full h-full overflow-hidden">
                {desktopImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className=""
                      priority={index === 0}
                    />

                  </div>
                ))}
                {/* Navigation */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Mobile Slider */}
            <div
              className="absolute inset-0 block lg:hidden overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {mobileImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />

                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Lead Form Section (40%) */}
          <div className="w-full lg:w-[40%] bg-gray-100 flex items-center justify-center p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full max-w-md"
            >
              {/* Logo */}
              <div className="text-center mb-6">
                <Image
                  src={logo}
                  alt="BookMyAssets Logo"
                  className="mx-auto mb-3"
                />
                <h2 className="text-xl lg:text-2xl font-bold text-black mb-2">
                  Registry-Ready Plots under ₹10 Lakh
                </h2>
                
              </div>

              {showPopup ? (
                <div className="text-center py-6">
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
                  <h3 className="text-xl font-bold text-black mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your request has been submitted successfully. We'll contact you shortly.
                  </p>
                </div>
              ) : (
                <form id="lead-form-1">

                <div className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-700 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}


                  <div className="grid grid-cols-2 gap-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="relative"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-4 w-4"
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
                        placeholder="Enter Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 pl-10 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-300 hover:border-yellow-400 transition-colors text-sm"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="relative"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-4 w-4"
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
                        placeholder="Mobile No"
                        value={formData.phone}
                        onChange={handleChange}
                        minLength={10}
                        maxLength={15}
                        required
                        className="w-full p-3 pl-10 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-300 hover:border-yellow-400 transition-colors text-sm"
                      />
                    </motion.div>
                  </div>

                  {/* reCAPTCHA container */}
                  <div className="flex justify-center">
                    <div ref={recaptchaRef}></div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    id=""
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Submitting..." : "Get A Call Back"}
                  </motion.button>
                </div>
                </form>
                
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats Section - Compact */}
        <div className="bg-white border-t border-gray-200 py-4">
          <div className=" px-4">
            {/* desktop view */}
            <div className="grid max-sm:hidden md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Land Parcel */}
              <div className="p-3 text-center hover:bg-orange-50 transition-colors duration-300">
                <div className="w-8 h-8 bg-[#deae3c] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold flex items-center justify-center text-[#deae3c]">Immediate Possession</h3>
                <p className="text-lg font-bold text-[#deae3c]"></p>
              </div>

              {/* Type */}
              <div className="p-3 text-center hover:bg-orange-50 transition-colors duration-300">
                <div className="w-8 h-8 bg-[#deae3c] rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold flex items-center justify-center text-[#deae3c]">Government Approved</h3>
                <p className="text-lg font-bold text-[#deae3c]"></p>
              </div>

              {/* Amenities */}
              <div className="p-3 text-center hover:bg-orange-50 transition-colors duration-300">
                <div className="w-8 h-8 bg-[#deae3c] rounded-full flex items-center justify-center mx-auto mb-2">
                  <CalendarCheck className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold flex items-center justify-center text-[#deae3c]">365 Days Site Visit</h3>
                <p className="text-lg font-bold text-[#deae3c]"></p>
              </div>

              {/* Price */}
              <div className="p-3 text-center hover:bg-orange-50 transition-colors duration-300">
                <div className="w-8 h-8 bg-[#deae3c] rounded-full flex items-center justify-center mx-auto mb-2">
                  <FileCheck className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold flex items-center justify-center text-[#deae3c]">Due Diligence</h3>
                <p className="text-lg font-bold text-[#deae3c]"></p>
                <p className="text-xs text-gray-500"></p>
              </div>

              {/* Download Brochure */}
              <div className="p-3 text-center hover:bg-orange-50 transition-colors duration-300">
                <div className="w-8 h-8 bg-[#deae3c] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1"></h3>
                <button onClick={openBrochure} className="bg-[#deae3c] hover:bg-[#f3bb39] text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-300 text-sm">
                  Download Brochure
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
            <MobilePropertyGrid/>
      <AnimatePresence>
        {isDownload && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Get the Dholera Brochure"
              buttonName="Download Brochure"
              onClose={() => closeBrochure()}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}