"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/assests/ad-page/dholera-govt-logo.webp";
/* import logo from "@/assests/festival-images/dholera-diwali.webp" */
import {
  CheckCircle,
  CalendarCheck,
  Download,
  ChevronRight,
  ChevronLeft,
  FileCheck,
  Phone,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

//images import
import img1 from "@/assests/ad-page/hero/dholera-activation-area-banner.webp";
import img2 from "@/assests/ad-page/hero/dholera-activation-area-banner2.webp";
import img3 from "@/assests/ad-page/hero/dholera-activation-area-banner3.webp";
import img4 from "@/assests/ad-page/hero/dholera-international-airport-landing-page-desktop.webp";
import img5 from "@/assests/ad-page/hero/dholera-tata-semiconductor-plant-landing-page-desktop.webp";
import img6 from "@/assests/ad-page/hero/dholera-tata-solar-park-landing-page-desktop.webp";

import BrochureDownload from "../components/BrochureDownload";

export default function LandingPage({ openForm }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetIdRef = useRef(null);
  const recaptchaTokenRef = useRef("");
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

  useEffect(() => {
    if (!siteKey) {
      console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set");
      setErrorMessage("Verification is temporarily unavailable.");
      return;
    }

    let isMounted = true;
    const scriptId = "google-recaptcha-script";

    const markRecaptchaReady = () => {
      if (!window.grecaptcha?.ready) return;

      window.grecaptcha.ready(() => {
        if (isMounted) setRecaptchaLoaded(true);
      });
    };

    let script = document.getElementById(scriptId);

    if (window.grecaptcha?.ready) {
      markRecaptchaReady();
    } else if (script) {
      script.addEventListener("load", markRecaptchaReady);
    } else {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", markRecaptchaReady);
      script.addEventListener("error", () => {
        if (isMounted) {
          setErrorMessage("Verification failed to load. Please refresh and try again.");
        }
      });
      document.head.appendChild(script);
    }

    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10),
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10),
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
      isMounted = false;
      script?.removeEventListener("load", markRecaptchaReady);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [siteKey]);

  useEffect(() => {
    if (!recaptchaLoaded || !showRecaptcha || !recaptchaRef.current || !window.grecaptcha) return;

    window.grecaptcha.ready(() => {
      if (recaptchaWidgetIdRef.current !== null || !recaptchaRef.current) return;

      recaptchaWidgetIdRef.current = window.grecaptcha.render(
        recaptchaRef.current,
        {
          sitekey: siteKey,
          theme: "light",
          callback: (token) => {
            recaptchaTokenRef.current = token;
            setErrorMessage("");
            // Auto-submit the form after reCAPTCHA is verified
            setTimeout(() => onRecaptchaSuccess(token), 300);
          },
          "expired-callback": () => {
            recaptchaTokenRef.current = "";
          },
          "error-callback": () => {
            recaptchaTokenRef.current = "";
            setErrorMessage("Verification failed. Please try again.");
          },
        },
      );
    });
  }, [recaptchaLoaded, showRecaptcha, siteKey]);

  useEffect(() => {
    if (!showRecaptcha) {
      recaptchaWidgetIdRef.current = null;
      recaptchaTokenRef.current = "";
    }
  }, [showRecaptcha]);

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
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const now = Date.now();

      const response = await fetch(
        "/api/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: formData.phone,
              source: "BookMyAssets Twitter Ads",
            },
            source: "BookMyAssets Twitter Ads",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        },
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowRecaptcha(false);
        recaptchaTokenRef.current = "";
        recaptchaWidgetIdRef.current = null;
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });

        // Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form_hero",
        });

        // ✅ Twitter Conversion Event — add this
        if (window.twq) {
          window.twq("event", "tw-oxi2l-rbwwv", {
            email_address: null,
            phone_number: `+91${formData.phone}`,
          });
        }

        // Show thank you popup
        setShowThankYou(true);

        // Navigate after delay
        setTimeout(() => {
          setShowThankYou(false); // Hide the overlay before navigation
          console.log("Navigating to thank you page..."); // Debug log
          router.push("/dholera-smart-city/thankyou");
        }, 2000);
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again.",
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      if (
        window.grecaptcha &&
        recaptchaWidgetIdRef.current !== null
      ) {
        window.grecaptcha.reset(recaptchaWidgetIdRef.current);
        recaptchaTokenRef.current = "";
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // First, validate the form
    if (!validateForm()) {
      return;
    }

    // If reCAPTCHA is not shown yet, show it
    if (!showRecaptcha) {
      setShowRecaptcha(true);
      setIsLoading(false);
      return;
    }

    // If reCAPTCHA is shown but not verified yet, wait for verification
    if (!recaptchaTokenRef.current) {
      setErrorMessage("Please complete the reCAPTCHA verification.");
      setIsLoading(false);
      return;
    }

    // If token exists, proceed with submission
    setIsLoading(true);
    await onRecaptchaSuccess(recaptchaTokenRef.current);
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
        prev === desktopImages.length - 1 ? 0 : prev + 1,
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
        prev === desktopImages.length - 1 ? 0 : prev + 1,
      );
    } else if (touchEnd - touchStart > 50) {
      setCurrentSlide((prev) =>
        prev === 0 ? desktopImages.length - 1 : prev - 1,
      );
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === desktopImages.length - 1 ? 0 : prev + 1,
    );
  };
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1,
    );
  };

  const [isDownload, setIsDownload] = useState(false);

  const openBrochure = () => {
    setIsDownload(true);
  };

  const closeBrochure = () => {
    setIsDownload(false);
  };

  const handleBookVisit = () => {
    if (typeof openForm === "function") {
      openForm();
      return;
    }

    openBrochure();
  };

  const heroStats = [
    { label: "Activation Area", value: "20 min" },
    { label: "Expressway Access", value: "5 min" },
    { label: "Airport Corridor", value: "30 min" },
  ];

  const trustPoints = [
    { label: "Approved layouts", icon: FileCheck },
    { label: "Immediate registry", icon: CheckCircle },
    { label: "Site visit support", icon: CalendarCheck },
  ];

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

      <section
        className="relative min-h-[100svh] overflow-hidden bg-[#101820] text-white"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Dholera Smart City investment hero"
      >
        {desktopImages.map((image, index) => (
          <div
            key={`hero-slide-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,12,18,0.72)_0%,rgba(7,12,18,0.55)_20%,rgba(7,12,18,0.24)_40%,rgba(7,12,18,0.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#202830] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_26rem]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl "
            >
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-flex max-sm:hidden items-center gap-3 border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-md"
              >
                <Image
                  src={logo}
                  alt="Government of Gujarat"
                  className="h-10 w-auto"
                />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ddbc69]">
                  Dholera Smart City
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="max-w-3xl text-3xl font-bold  leading-[1.05] text-white sm:text-4xl lg:text-5xl"
              >
                Invest In Dholera Plots
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-5 max-w-2xl text-base max-sm:hidden leading-7 text-white/78 sm:text-lg"
              >
                Invest in verified, Registry-Ready Residential Projects, Expressway Access, Industrial Hubs, and the
                upcoming International Airport.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 grid max-w-2xl grid-cols-3 border border-white/15 bg-black/25 backdrop-blur-md"
              >
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-r border-white/10 px-4 py-4 last:border-r-0"
                  >
                    <div className="text-2xl font-bold text-[#ddbc69]">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <button
                  type="button"
                  onClick={openBrochure}
                  className="inline-flex items-center justify-center gap-2 bg-[#ddbc69] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#f0cf78]"
                >
                  <CalendarCheck className="h-4 w-4" />
                  Book Site Visit
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="border border-white/15 rounded-xl bg-white/95 p-4 text-black shadow-2xl shadow-black/30 backdrop-blur-md sm:p-6"
            >
              <div className="mb-5">
                <h2 className="mt-2 text-2xl font-bold leading-tight text-[#101820]">
                  Premium residential plots in Dholera
                </h2>
              </div>

              {showPopup ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Thank You!</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Your request has been submitted successfully.
                  </p>
                </div>
              ) : (
                <form id="lead-form-1" onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    {errorMessage && (
                      <div className="border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a782f]" />
                      <input
                        name="fullName"
                        placeholder="Enter name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 bg-white p-3 pl-10 text-sm text-black outline-none transition focus:border-[#ddbc69] focus:ring-2 focus:ring-[#ddbc69]/30"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a782f]" />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Mobile no"
                        value={formData.phone}
                        onChange={handleChange}
                        minLength={10}
                        maxLength={15}
                        required
                        className="w-full border border-gray-300 bg-white p-3 pl-10 text-sm text-black outline-none transition focus:border-[#ddbc69] focus:ring-2 focus:ring-[#ddbc69]/30"
                      />
                    </div>

                    {showRecaptcha && (
                      <div className="flex justify-center">
                        <div ref={recaptchaRef}></div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex w-full items-center justify-center gap-2 bg-[#101820] px-5 py-3 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isLoading ? "Submitting..." : "Get A Call Back"}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {desktopImages.map((image, index) => (
                <button
                  key={`hero-indicator-${index}`}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 transition-all ${
                    index === currentSlide
                      ? "w-12 bg-[#ddbc69]"
                      : "w-6 bg-white/35 hover:bg-white/70"
                  }`}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-11 w-11 items-center justify-center border border-white/20 bg-black/25 text-white transition hover:border-[#ddbc69] hover:text-[#ddbc69]"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex h-11 w-11 items-center justify-center border border-white/20 bg-black/25 text-white transition hover:border-[#ddbc69] hover:text-[#ddbc69]"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isDownload && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Want Verified Project Details?"
              buttonName="Get A Call Back"
              onClose={() => closeBrochure()}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
