// HeroForm.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";

const HeroForm = ({ isDisabled: parentIsDisabled, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    investmentAmt: "",
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
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    // Email validation (optional field)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
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
      if (formData.investmentAmt)
        notesArray.push(`Budget: ${formData.investmentAmt}`);
      const notes = notesArray.join(" | ");

      // Using GetinTouch's TeleCRM API endpoint
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
              email: formData.email || "",
              notes: notes,
              source: "BookMyAssets Google Ads",
            },
            tags: ["Dholera Investment", "Website Lead", "Taboola Hero"],
            recaptchaToken: token,
          }),
        }
      );

      if (response.ok) {
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          investmentAmt: "",
          city: "",
        });

        // Notify parent component of successful submission
        if (onSuccess) {
          onSuccess();
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form",
          page_name: "Dholera Hero Section",
        });
      } else {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        setErrorMessage(
          `Submission failed (${response.status}). Please try again.`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
      if (typeof window !== "undefined" && window.grecaptcha && recaptchaRef.current) {
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
    <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)] bg-[#fafafa] border border-yellow-600/20 rounded-xl backdrop-blur-md p-4 md:p-[clamp(2rem,3.5vw,2.75rem)] w-full md:w-[clamp(500px,22vw,660px)]">
      <div>
        <h3 className="text-black font-semibold text-center text-lg md:text-[clamp(1.25rem,1.85vw,1.7rem)] leading-tight">
          Invest in India's First Smart City
        </h3>
      </div>

      {errorMessage && (
        <div className="p-2 bg-red-500 bg-opacity-20 border border-red-400 text-red-700 rounded-lg text-sm text-center">
          {errorMessage}
        </div>
      )}

      <input
        name="fullName"
        placeholder="Full Name*"
        className="w-full h-10 md:h-[clamp(2.25rem,3.45vw,2.85rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone Number*"
        type="tel"
        className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email (Optional)"
        type="email"
        className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="City*"
        type="text"
        className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <select
        name="investmentAmt"
        className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
        value={formData.investmentAmt}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Budget*
        </option>
        <option value="5-15">₹5 Lakh - ₹15 Lakh</option>
        <option value="15-25">₹15 Lakh - ₹25 Lakh</option>
        <option value="25+">₹25 Lakh +</option>
      </select>

      <div ref={recaptchaRef} className="recaptcha-container"></div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || parentIsDisabled || !recaptchaLoaded}
        className={`w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] font-bold px-6 rounded-lg transition-all duration-300 text-xs md:text-[clamp(0.7rem,0.9vw,0.82rem)] uppercase tracking-widest ${isLoading || parentIsDisabled || !recaptchaLoaded
            ? "bg-gray-600 cursor-not-allowed text-gray-400"
            : "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
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
          </div>
        ) : (
          "Get Price Details"
        )}
      </button>
      <div className="text-center mt-4">
        <p className="text-sm font-bold text-gray-500">
          Fill Up the Form To Get Project Price
        </p>
      </div>
    </div>
  );
};

export default HeroForm;