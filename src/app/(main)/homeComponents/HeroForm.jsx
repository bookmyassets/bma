"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";

function FormInput({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  required,
  autoComplete,
  minLength,
  maxLength,
  "aria-label": ariaLabel,
}) {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-[clamp(0.5rem,1vw,0.75rem)] top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon className="w-[10px] h-[10px] text-gray-400" />
        </div>
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        aria-label={ariaLabel}
        className="w-full pl-[clamp(1.75rem,2.5vw,2.25rem)] pr-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.4rem,0.85vw,0.6rem)] text-[0.875rem] leading-[1.5] border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ddbc69] focus:border-[#ddbc69] transition-colors"
      />
    </div>
  );
}

// ← FIX: getLeadSource extracted outside component — no re-creation on every render
function getLeadSource() {
  if (typeof window === "undefined") return "BookMyAssets";
  const params = new URLSearchParams(window.location.search);
  if (params.has("twclid")) return "BookMyAssets Twitter Ads";
  if (params.has("dholera-sir-blogs")) return "BookMyAssets Blogs";
  if (params.has("dholera-sir-updates")) return "BookMyAssets Updates";
  if (params.has("about-dholera-sir")) return "BookMyAssets Dholera SIR";
  if (params.has("gad_source")) return "BookMyAssets Google Ads";
  return "BookMyAssets";
}

export default function HeroForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null); // ← FIX: track widget ID for proper reset
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // ← FIX: Read localStorage on mount so rate limit persists across refreshes
  const [submissionCount, setSubmissionCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    const saved = localStorage.getItem("formSubmissionCount");
    const lastTime = parseInt(
      localStorage.getItem("lastSubmissionTime") || "0",
    );
    const hoursPassed = (Date.now() - lastTime) / (1000 * 60 * 60);
    if (hoursPassed >= 24) return 0;
    return parseInt(saved || "0");
  });
  const [lastSubmissionTime, setLastSubmissionTime] = useState(() => {
    if (typeof window === "undefined") return 0;
    return parseInt(localStorage.getItem("lastSubmissionTime") || "0");
  });

  const loadRecaptcha = useCallback(() => {
    if (recaptchaLoaded) return;

    // ← FIX: Global deduplication — don't inject if already in DOM
    const existing = document.querySelector('script[src*="recaptcha/api.js"]');
    if (existing) {
      setRecaptchaLoaded(true);
      return;
    }

    const s = document.createElement("script");
    // ← FIX: render=explicit prevents auto-rendering phantom widgets
    s.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
    setRecaptchaLoaded(true);
  }, [recaptchaLoaded]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  }, []);

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
        "Maximum submission limit reached. Try again after 24 hours.",
      );
      return false;
    }
    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const now = Date.now();
      setSubmittedName(formData.fullName);
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
              source: getLeadSource(),
            },
            source: "BookMyAssets",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        },
      );

      if (response.ok) {
        setShowPopup(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "lead_form_hero" });
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again.",
      );
    } finally {
      setIsLoading(false);
      // ← FIX: reset by widget ID, not blindly
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

    if (!recaptchaLoaded || !window.grecaptcha) {
      setErrorMessage("reCAPTCHA not loaded. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      // ← FIX: render only once, reuse widget ID on subsequent submits
      if (recaptchaWidgetId.current === null) {
        recaptchaWidgetId.current = window.grecaptcha.render(
          recaptchaRef.current,
          {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "dark",
            size: "invisible", // ← keeps it invisible until execute()
          },
        );
      } else {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }
      window.grecaptcha.execute(recaptchaWidgetId.current);
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      setErrorMessage("Verification error. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl max-w-lg p-[clamp(1rem,2vw,1.5rem)] md:overflow-hidden shadow-lg">
      <div className="text-center mb-[clamp(0.75rem,1.5vw,1.25rem)]">
        <div>
          <h1 className="text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.35] glowing-text px-2">
            Buy Residential Plot in Dholera
          </h1>
          <p className="text-[0.875rem] font-normal leading-[1.5] glowing-text px-2">
            Get Project Details
          </p>
        </div>
      </div>

      {showPopup ? (
        <div
          className="text-center py-[clamp(1rem,2.5vw,1.75rem)]"
          role="alert"
          aria-live="polite"
        >
          <div className="mb-[clamp(0.75rem,1.5vw,1rem)] inline-block">
            <div className="w-[clamp(2.75rem,4vw,3.5rem)] h-[clamp(2.75rem,4vw,3.5rem)] bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[clamp(1.5rem,2.5vw,2rem)] w-[clamp(1.5rem,2.5vw,2rem)] text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
          <h2 className="text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.35] text-black mb-[clamp(0.3rem,0.75vw,0.5rem)]">
            Thank You!
          </h2>
          <p className="text-[0.875rem] font-normal leading-[1.5] text-gray-600 mb-[clamp(0.2rem,0.5vw,0.4rem)]">
            Your request has been submitted successfully.
          </p>
          <p className="text-[0.875rem] text-[#ddbc69] font-semibold leading-[1.5]">
            Our expert will contact you within 24 hours for your free
            consultation.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          onFocus={loadRecaptcha}
          className="space-y-[clamp(0.5rem,1vw,0.75rem)]"
        >
          {errorMessage && (
            <div
              className="p-[clamp(0.5rem,1vw,0.75rem)] bg-red-500/10 border border-red-400 text-red-700 rounded-lg text-[clamp(0.75rem,1vw,0.875rem)]"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-2 gap-[clamp(0.5rem,1.5vw,0.875rem)]">
            <FormInput
              name="fullName"
              placeholder="Enter Name"
              value={formData.fullName}
              onChange={handleChange}
              icon={FaUser}
              required
              autoComplete="name"
              aria-label="Full Name"
            />
            <FormInput
              name="phone"
              type="tel"
              placeholder="Mobile No"
              value={formData.phone}
              onChange={handleChange}
              icon={FaPhoneAlt}
              minLength={10}
              maxLength={15}
              required
              autoComplete="tel"
              aria-label="Phone Number"
            />
          </div>

          {/* ← FIX: invisible reCAPTCHA — no visible widget box, no layout shift */}
          <div ref={recaptchaRef} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-[clamp(0.5rem,1vw,0.75rem)] px-[clamp(1rem,2vw,1.5rem)] bg-gradient-to-r from-[#ddbc69] to-[#ddbc69] text-black text-[0.875rem] md:text-[1rem] font-semibold leading-[1.4] rounded-lg hover:from-[#ddbc69] hover:to-[#ddbc69] transition-all shadow-md hover:shadow-[#ddbc69]/20 disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation"
          >
            {isLoading ? "Submitting..." : "Get A Call Back"}
          </button>
        </form>
      )}
    </div>
  );
}
