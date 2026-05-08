"use client";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import logo from "@/assests/ad-page/dholera-govt-logo.webp"; // adjust path as needed
import { Phone } from "@/assests/icons/call-icon.svg"; // adjust if using different icon lib
import { User } from "@/assests/icons/user-icon.svg"; // adjust if using different icon lib
// ── FormInput sub-component (kept inline for portability) ──────────────────
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
          <Icon className="w-[20px] h-[20px] text-gray-400" />
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
        className="
          w-full
          pl-[clamp(1.75rem,2.5vw,2.25rem)]
          pr-[clamp(0.5rem,1vw,0.75rem)]
          py-[clamp(0.4rem,0.85vw,0.6rem)]
          text-[clamp(0.8rem,1.1vw,0.875rem)]
          border border-gray-200
          rounded-lg
          bg-gray-50
          text-gray-800
          placeholder:text-gray-400
          focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400
          transition-colors
        "
      />
    </div>
  );
}

export default function HeroForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const loadRecaptcha = useCallback(() => {
    if (recaptchaLoaded) return;
    const s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js";
    s.async = true;
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
              source: "BookMyAssets",
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
        console.error("reCAPTCHA render error:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  return (
    // ✅ calc() — padding scales with viewport instead of hard breakpoint jumps
    <div className="w-full bg-white rounded-xl max-w-lg p-[clamp(1rem,2vw,1.5rem)] md:overflow-hidden shadow-lg">
      {/* ── Logo + Headline ── */}
      <div className="text-center mb-[clamp(0.75rem,1.5vw,1.25rem)]">
        {/* Logo — desktop only */}
        <div className="relative w-[clamp(200px,18vw,280px)] aspect-[3/1] mx-auto mb-[clamp(0.4rem,0.85vw,0.75rem)] hidden md:block">
          <Image
            src={logo}
            alt="BookMyAssets - Dholera Property Investment"
            fill
            sizes="(min-width: 768px) 18vw, 0px"
            className="object-contain"
            fetchPriority="high"
          />
        </div>

        {/* Headline */}
        <div className="flashy-blink space-y-[clamp(0.2rem,0.5vw,0.4rem)]">
          <h2 className="text-[clamp(1.1rem,2vw,1.35rem)] font-bold glowing-text px-2 leading-snug">
            Buy Residential Plots in Dholera
          </h2>
          <p className="text-[clamp(0.875rem,1.25vw,1rem)] glowing-text px-2">
            Get Project Details{" "}
          </p>
        </div>
      </div>

      {/* ── Success State ── */}
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

          <h2 className="text-[clamp(1.1rem,2vw,1.35rem)] font-bold text-black mb-[clamp(0.3rem,0.75vw,0.5rem)]">
            Thank You!
          </h2>
          <p className="text-[clamp(0.8rem,1.1vw,0.875rem)] text-gray-600 mb-[clamp(0.2rem,0.5vw,0.4rem)]">
            Your request has been submitted successfully.
          </p>
          <p className="text-[clamp(0.8rem,1.1vw,0.875rem)] text-yellow-600 font-semibold">
            Our expert will contact you within 24 hours for your free
            consultation.
          </p>
        </div>
      ) : (
        /* ── Form ── */
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

          {/* Name + Phone */}
          <div className="grid grid-cols-2 gap-[clamp(0.5rem,1.5vw,0.875rem)]">
            <FormInput
              name="fullName"
              placeholder="Enter Name"
              value={formData.fullName}
              onChange={handleChange}
              icon={User}
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
              icon={Phone}
              minLength={10}
              maxLength={15}
              required
              autoComplete="tel"
              aria-label="Phone Number"
            />
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <div ref={recaptchaRef} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full
              py-[clamp(0.5rem,1vw,0.75rem)]
              px-[clamp(1rem,2vw,1.5rem)]
              bg-gradient-to-r from-yellow-500 to-yellow-600
              text-white
              text-[clamp(0.875rem,1.25vw,1rem)]
              font-semibold
              rounded-lg
              hover:from-yellow-600 hover:to-yellow-700
              transition-all
              shadow-md hover:shadow-yellow-500/20
              disabled:opacity-70 disabled:cursor-not-allowed
              touch-manipulation
            "
          >
            {isLoading ? "Submitting..." : "Get A Call Back"}
          </button>
        </form>
      )}
    </div>
  );
}
