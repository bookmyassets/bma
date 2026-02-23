"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SUBMISSION_LIMIT = 3;
const RESET_HOURS = 24;

export default function BulkLand({ title }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // ── Load reCAPTCHA script & restore submission count from localStorage ──
  useEffect(() => {
    // Load script
    if (typeof window !== "undefined" && siteKey) {
      if (!window.grecaptcha) {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        script.onload = () => setRecaptchaLoaded(true);
        script.onerror = () => setRecaptchaLoaded(true); // fail open so user sees an error
        document.head.appendChild(script);
      } else {
        setRecaptchaLoaded(true);
      }
    }

    // Restore submission count, resetting after RESET_HOURS
    const storedCount = parseInt(localStorage.getItem("formSubmissionCount") || "0", 10);
    const lastTime = parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10);

    if (lastTime) {
      const hoursPassed = (Date.now() - lastTime) / (1000 * 60 * 60);
      if (hoursPassed >= RESET_HOURS) {
        localStorage.setItem("formSubmissionCount", "0");
        localStorage.removeItem("lastSubmissionTime");
      } else {
        setSubmissionCount(storedCount);
        if (storedCount >= SUBMISSION_LIMIT) setIsDisabled(true);
      }
    } else {
      setSubmissionCount(storedCount);
    }

    return () => {
      try { window.grecaptcha?.reset(); } catch (_) {}
    };
  }, [siteKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  // ── Validation (client-side only, server re-validates) ──
  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid phone number (10–15 digits).");
      return false;
    }
    if (submissionCount >= SUBMISSION_LIMIT) {
      setErrorMessage("Maximum submission limit reached. Try again after 24 hours.");
      setIsDisabled(true);
      return false;
    }
    return true;
  };

  // ── Called by reCAPTCHA after user solves the challenge ──
  const onRecaptchaSuccess = async (token) => {
    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          recaptchaToken: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      // ── Success ──
      setFormData({ fullName: "", email: "", phone: "" });
      setShowPopup(true);

      const newCount = submissionCount + 1;
      setSubmissionCount(newCount);
      localStorage.setItem("formSubmissionCount", newCount.toString());
      localStorage.setItem("lastSubmissionTime", Date.now().toString());

      // GTM event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form", page_name: "Bulk Land" });

    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      try { window.grecaptcha?.reset(); } catch (_) {}
    }
  };

  // ── Form submit handler ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (!recaptchaLoaded || !window.grecaptcha) {
      setErrorMessage("Security verification not loaded. Please refresh the page.");
      setIsLoading(false);
      return;
    }

    const container = recaptchaRef.current;

    try {
      if (!container.innerHTML) {
        // First render
        window.grecaptcha.render(container, {
          sitekey: siteKey,
          callback: onRecaptchaSuccess,
          theme: "dark",
          size: "invisible", // use invisible so the widget executes immediately
        });
        window.grecaptcha.execute();
      } else {
        window.grecaptcha.execute();
      }
    } catch (error) {
      console.error("reCAPTCHA render/execute error:", error);
      setErrorMessage("Verification error. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  // ─────────────────────────── Render ───────────────────────────
  return (
    <div>
      <section className="py-12 bg-black">
        <div className="container mx-auto px-6 sm:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-white text-xl md:text-3xl font-bold text-center">
              {title}
            </h2>
            <p className="text-gray-300 mt-4 text-center">
              Scale Your Portfolio with High-Growth Land Opportunities
            </p>

            {showPopup ? (
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
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-300">
                  Your request has been submitted successfully. We'll contact you shortly.
                </p>
              </div>
            ) : isDisabled ? (
              <div className="text-center py-8">
                <p className="text-red-400 font-semibold">
                  You have reached the maximum submission limit. Try again after 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-12 space-y-6">
                {errorMessage && (
                  <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}

                <div className="max-sm:space-y-4 md:flex justify-center items-center gap-6">
                  <div className="w-full">
                    <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Invisible reCAPTCHA mounts here */}
                <div ref={recaptchaRef} />

                <div>
                  <button
                    type="submit"
                    disabled={isLoading || isDisabled || !recaptchaLoaded}
                    className={`w-full font-bold py-3 px-6 rounded-lg transition duration-300 ${
                      isLoading || isDisabled || !recaptchaLoaded
                        ? "bg-gray-600 cursor-not-allowed text-gray-400"
                        : "bg-yellow-600 hover:bg-yellow-700 text-white shadow-md"
                    }`}
                  >
                    {isLoading ? "Submitting..." : "Get A Call Back"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}