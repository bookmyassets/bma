"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/assests/ad-page/dholera-govt-logo.webp";
import {
  Home,
  CheckCircle,
  CalendarCheck,
  Download,
  ChevronRight,
  ChevronLeft,
  FileCheck,
  ShieldCheck,
  FileText,
  MapPin,
  Landmark,
  HomeIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import img1 from "@/assests/ad-page/hero/dholera-activation-area-banner.webp";
import img2 from "@/assests/ad-page/hero/dholera-activation-area-banner2.webp";
import img3 from "@/assests/ad-page/hero/dholera-activation-area-banner3.webp";
import img4 from "@/assests/ad-page/hero/dholera-international-airport-landing-page-desktop.webp";
import img5 from "@/assests/ad-page/hero/dholera-tata-semiconductor-plant-landing-page-desktop.webp";
import img6 from "@/assests/ad-page/hero/dholera-tata-solar-park-landing-page-desktop.webp";

import BrochureDownload from "../components/BrochureDownload";
import MobilePropertyGrid from "./MobileGrid";

const trustItems = [
  { icon: ShieldCheck, label: "NA/NOC Available" },
  { icon: FileText, label: "Plan Layout" },
  { icon: MapPin, label: "Location Map" },
  { icon: Landmark, label: "Near SIR Boundary" },
];

const stats = [
  { icon: HomeIcon, label: "Immediate Possession" },
  { icon: CheckCircle, label: "Govt Approved" },
  { icon: CalendarCheck, label: "365 Days Visit" },
  { icon: FileCheck, label: "Due Diligence" },
];

export default function LandingPage({ openForm }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDownload, setIsDownload] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const desktopImages = [
    { src: img1, alt: "Dholera Investment Opportunity 1" },
    { src: img2, alt: "Dholera Investment Opportunity 2" },
    { src: img3, alt: "Dholera Investment Opportunity 3" },
    { src: img4, alt: "Dholera International Airport" },
    { src: img5, alt: "Dholera TATA Semiconductor Plant" },
    { src: img6, alt: "Dholera TATA Solar Park" },
  ];

  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        script.onload = () => setRecaptchaLoaded(true);
        script.onerror = () => setRecaptchaLoaded(true);
        document.head.appendChild(script);
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };
    loadRecaptcha();
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10),
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10),
      );
    }
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === desktopImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [desktopImages.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }
    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Enter a valid phone number (10-15 digits)");
      return false;
    }
    const now = Date.now();
    if ((now - lastSubmissionTime) / (1000 * 60 * 60) >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    } else if (submissionCount >= 50) {
      setErrorMessage("Max submissions reached. Try after 24 hours.");
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
        },
      );
      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setSubmissionCount((prev) => {
          const n = prev + 1;
          localStorage.setItem("formSubmissionCount", n.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return n;
        });
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "lead_form_hero" });
        setShowThankYou(true);
        setTimeout(() => {
          setShowThankYou(false);
          router.push("/more-info/thankyou");
        }, 2000);
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      setErrorMessage(error.message || "Error submitting. Please try again.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      if (window.grecaptcha && recaptchaRef.current)
        window.grecaptcha.reset(recaptchaRef.current);
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
        setErrorMessage("Verification error. Please try again.");
        setIsLoading(false);
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please refresh.");
      setIsLoading(false);
    }
  };

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50)
      setCurrentSlide((p) => (p === desktopImages.length - 1 ? 0 : p + 1));
    else if (touchEnd - touchStart > 50)
      setCurrentSlide((p) => (p === 0 ? desktopImages.length - 1 : p - 1));
  };
  const nextSlide = () =>
    setCurrentSlide((p) => (p === desktopImages.length - 1 ? 0 : p + 1));
  const prevSlide = () =>
    setCurrentSlide((p) => (p === 0 ? desktopImages.length - 1 : p - 1));

  return (
    <div id="hero" className="relative bg-gray-100">
      {/* ── Thank You Overlay ── */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-green-900 to-green-800 flex justify-center items-center z-[1001]"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-center text-white px-8"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
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
              <h1 className="text-4xl font-bold mb-2">Thank You!</h1>
              <p className="text-lg opacity-90">We'll call you shortly.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT (lg+)
          60% image | 40% form — unchanged feel
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:h-screen lg:flex-col">
        <div className="bg-[#1a1209] text-[#deae3c] text-center text-[11px] tracking-widest uppercase py-1.5 font-medium">
          Dholera, Gujarat Land Investment Opportunity
        </div>
        <div className="flex flex-1 min-h-0">
          {/* Left slider */}
          <div className="relative w-[60%] flex-shrink-0">
            <div
              className="absolute inset-0 overflow-hidden bg-black"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {desktopImages.map((img, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    opacity: i === currentSlide ? 1 : 0,
                    pointerEvents: i === currentSlide ? "auto" : "none",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain pt-8"
                    priority={i === 0}
                  />
                </div>
              ))}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {desktopImages.map((_, i) => (
                  <span
                    key={i}
                    className={`block rounded-full transition-all duration-300 ${i === currentSlide ? "w-4 h-1.5 bg-[#deae3c]" : "w-1.5 h-1.5 bg-white/60"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Right form */}
          <div className="w-[40%] bg-gray-100 flex items-center justify-center p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="w-full max-w-md"
            >
              <div className="text-center mb-5">
                <Image
                  src={logo}
                  alt="BookMyAssets Logo"
                  className="mx-auto mb-3 h-auto w-64"
                />
                <h1 className="text-xl font-bold text-gray-900 leading-snug">
                  Govt Approved Plots Near{" "}
                  <span className="text-[#b8892a]">Dholera SIR Boundary</span>
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Starting From{" "}
                  <span className="text-[#b8892a] font-bold">₹8 Lakh</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {trustItems.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 bg-white border border-[#deae3c]/30 rounded-lg px-2 py-2"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#b8892a] flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-700">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <form noValidate>
                <div className="space-y-3">
                  {errorMessage && (
                    <div className="p-2.5 bg-red-50 border border-red-300 text-red-700 rounded-lg text-xs">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b8892a] w-4 h-4"
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
                        placeholder="Your Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full py-2.5 pl-9 pr-3 bg-white text-gray-900 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#deae3c]/50 focus:border-[#deae3c]"
                      />
                    </div>
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b8892a] w-4 h-4"
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
                        className="w-full py-2.5 pl-9 pr-3 bg-white text-gray-900 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#deae3c]/50 focus:border-[#deae3c]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div ref={recaptchaRef} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-[#deae3c] to-[#c8962a] text-white font-bold text-sm rounded-lg hover:from-[#c8962a] hover:to-[#b07e20] disabled:opacity-60 transition-all shadow-md"
                  >
                    {isLoading ? "Submitting…" : "Get A Free Call Back"}
                  </motion.button>
                  <p className="text-center text-[10px] text-gray-400">
                    No spam. Our team will call you within 24 hours.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
        {/* Desktop bottom stats */}
        <div className="bg-white border-t border-gray-200">
          <div className="grid grid-cols-5 divide-x divide-gray-200">
            {stats.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="p-3 text-center hover:bg-amber-50 transition-colors"
              >
                <div className="w-8 h-8 bg-[#deae3c] rounded-full flex items-center justify-center mx-auto mb-1.5">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-semibold text-[#8a6218]">{label}</p>
              </div>
            ))}
            <div className="p-3 flex flex-col items-center justify-center hover:bg-amber-50 transition-colors">
              <div className="w-8 h-8 bg-[#deae3c] rounded-full flex items-center justify-center mb-1.5">
                <Download className="w-4 h-4 text-white" />
              </div>
              <button
                onClick={() => setIsDownload(true)}
                className="bg-[#deae3c] hover:bg-[#c8962a] text-white font-semibold py-1 px-3 rounded-lg text-sm transition-colors"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT (< lg)
          Compact card-style single-column
      ══════════════════════════════════════════ */}
      <div className="lg:hidden">
        {/* ── 1. Image Slider — short fixed-height banner ── */}
        <div
          className="relative w-full h-[335px] bg-black overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {desktopImages.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: i === currentSlide ? 1 : 0,
                pointerEvents: i === currentSlide ? "auto" : "none",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-fit object-center w-full pt-16"
                priority={i === 0}
              />
            </div>
          ))}
          {/* Dark overlay at bottom for dots */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-1.5 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-1.5 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {desktopImages.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all duration-300 ${i === currentSlide ? "w-3 h-1 bg-[#deae3c]" : "w-1 h-1 bg-white/60"}`}
              />
            ))}
          </div>
        </div>

        {/* ── 2. Form Card ── */}
        <div className="bg-white px-4 pt-4 pb-3 space-y-3">
          {/* Logo + Title row */}
         
          <div className="text-center gap-3 mb-3">
            <div>
              <p className="text-lg font-semibold text-[#b8892a] uppercase tracking-wide leading-none mb-0.5">
                PLOTS Starting From ₹8 Lakh
              </p>
              <h1 className=" font-bold text-gray-900 leading-tight">
                Govt Approved Plots Near{" "}
                <span className="text-[#b8892a]">Dholera SIR Boundary</span>
              </h1>
            </div>
          </div>

          {/* Trust pills — horizontal scroll, no wrap */}
          <div
            className="grid grid-cols-2 gap-1.5 overflow-x-auto pb-1 mb-3 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center  gap-1 bg-amber-50 border border-[#deae3c]/40 rounded-full px-2.5 py-1 flex-shrink-0"
              >
                <Icon className="w-3 h-3 text-[#b8892a]" />
                <span className="text-[14px] font-semibold text-center text-[#7a5510] whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form noValidate>
            <div className="space-y-2">
              {errorMessage && (
                <div className="p-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[11px]">
                  {errorMessage}
                </div>
              )}

              {/* Name + Phone always side by side */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#b8892a] w-3.5 h-3.5"
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
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full py-2.5 pl-8 pr-2 bg-gray-50 text-gray-900 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#deae3c]/50 focus:border-[#deae3c]"
                  />
                </div>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#b8892a] w-3.5 h-3.5"
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
                    className="w-full py-2.5 pl-8 pr-2 bg-gray-50 text-gray-900 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#deae3c]/50 focus:border-[#deae3c]"
                  />
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-center">
                <div ref={recaptchaRef} />
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-[#deae3c] to-[#c8962a] text-white font-bold text-sm rounded-lg disabled:opacity-60 transition-all shadow-sm"
              >
                {isLoading ? "Submitting…" : "📞 Get A Free Call Back"}
              </motion.button>

              <p className="text-center text-[10px] text-gray-400">
                No spam · We call within 24 hours
              </p>
            </div>
          </form>
        </div>

        {/* ── 3. Stats — single horizontal scroll strip ── */}
        <div className="bg-white border-t border-gray-100">
          <div
            className="flex overflow-x-auto gap-0 divide-x divide-gray-100"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {stats.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center flex-shrink-0 px-3 py-2.5 min-w-[80px]"
              >
                <div className="w-6 h-6 bg-[#deae3c] rounded-full flex items-center justify-center mb-1">
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-[#8a6218] text-center leading-tight whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
            {/* Download brochure as last item */}
            <div className="flex flex-col items-center justify-center flex-shrink-0 px-3 py-2.5 min-w-[90px]">
              <button
                onClick={() => setIsDownload(true)}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-6 h-6 bg-[#deae3c] rounded-full flex items-center justify-center">
                  <Download className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] font-bold text-[#8a6218] text-center whitespace-nowrap">
                  Brochure
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ── End mobile layout ── */}

      <AnimatePresence>
        {isDownload && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Want Verified Project Details?"
              buttonName="Get A Call Back"
              onClose={() => setIsDownload(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
