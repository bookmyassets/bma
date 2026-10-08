// HeroForm.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";

const HeroForm = ({ isDisabled: parentIsDisabled, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
  });

  const [isLoading, setIsLoading] = useState(false);
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
            setRecaptchaLoaded(true);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.city.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    // Phone validation
    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    if (parentIsDisabled) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      // Prepare notes from additional fields (same as before)
      const notesArray = [];
      if (formData.city) notesArray.push(`City: ${formData.city}`);
      const notes = notesArray.join(" | ");

      // Using GetinTouch's TeleCRM API endpoint
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
              notes: notes,
              source: "BookMyAssets Taboola Hero Section",
            },
            tags: ["Dholera Investment", "Website Lead", "Taboola Hero"],
            recaptchaToken: token,
          }),
        },
      );

      if (response.ok) {
        setFormData({
          fullName: "",
          phone: "",
          city: "",
        });

        // Notify parent component of successful submission
        if (onSuccess) {
          onSuccess();
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "submit-lead-form",
        });
      } else {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        setErrorMessage(
          `Submission failed (${response.status}). Please try again.`,
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
      if (
        typeof window !== "undefined" &&
        window.grecaptcha &&
        recaptchaRef.current
      ) {
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
        "Security verification not loaded. Please refresh the page.",
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
          theme: "light", // Using light theme to match form background
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      // Execute existing reCAPTCHA
      try {
        window.grecaptcha.execute();
      } catch (error) {
        console.error("Error executing reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="hero-form-title" className="w-full overflow-hidden rounded-2xl border border-white/60 bg-[#fffdf8]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-md sm:rounded-3xl sm:p-8">
      <div className="mb-4 sm:mb-6">
        <span className="mb-2 block h-1 w-10 rounded-full bg-[#ddbc69] sm:mb-4" />
        <h2 id="hero-form-title" className="mt-2 text-xl font-semibold tracking-tight text-[#151f28] sm:text-2xl">Get project details</h2>
      </div>
      {errorMessage && (
        <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</div>
      )}
      <div className="space-y-2.5 sm:space-y-4">
        {[
          { name: "fullName", label: "Full name", placeholder: "Enter your full name", type: "text", autoComplete: "name" },
          { name: "phone", label: "Phone number", placeholder: "Enter your phone number", type: "tel", autoComplete: "tel" },
          { name: "city", label: "City", placeholder: "Enter your city", type: "text", autoComplete: "address-level2" },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={`hero-${field.name}`} className="mb-1 block text-xs font-semibold text-[#37424a] sm:mb-1.5">{field.label} <span className="text-[#92702b]">*</span></label>
            <input
              id={`hero-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="h-10 w-full rounded-lg border border-[#e4dfd2] bg-white px-3 text-sm text-[#151f28] outline-none transition-colors placeholder:text-[#93999c] focus:border-[#bc9743] focus:ring-2 focus:ring-[#ddbc69]/20 sm:h-12 sm:rounded-xl sm:px-4"
            />
          </div>
        ))}
      </div>
      <div ref={recaptchaRef} className="recaptcha-container mt-2 overflow-x-auto sm:mt-4" />
      <button type="submit" disabled={isLoading || parentIsDisabled || !recaptchaLoaded} className="mt-2 flex min-h-10 w-full items-center justify-center rounded-lg bg-[#ddbc69] px-4 py-2 text-sm font-semibold text-[#17130b] shadow-sm transition-colors hover:bg-[#d2ae54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#92702b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#e5dfcf] disabled:text-[#827b6b] sm:min-h-12 sm:rounded-xl sm:px-5 sm:py-3">
        {isLoading ? "Submitting..." : "Get Pricing & Brochure"}
      </button>
      <p className="mt-2 text-center text-[11px] leading-snug text-black sm:mt-4 sm:text-[13px] sm:leading-relaxed">Your details stay private. Our team will contact you shortly.</p>
    </form>
  );
};

export default HeroForm;
