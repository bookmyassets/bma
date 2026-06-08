"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_TAGS = ["Dholera Investment", "Website Lead", "Bulk Land"];

const FORM_VARIANTS = {
  common: {
    title: "Invest in Dholera Residential Plots",
    subtitle: "",
    buttonText: "Get A Call Back",
    includeEmail: false,
    maxSubmissions: 20,
    source: "BookMyAssets Website",
    tags: ["Dholera Investment", "Website Lead", "Common Form"],
    dataLayerEvent: null,
    headingTag: "h3",
  },
  bulkLand: {
    title: "Bulk Land",
    subtitle: "Scale Your Portfolio with High-Growth Land Opportunities",
    buttonText: "Get A Call Back",
    includeEmail: false,
    maxSubmissions: 20,
    source: "BookMyAssets Website",
    tags: DEFAULT_TAGS,
    dataLayerEvent: "lead_form",
    headingTag: "h4",
  },
  lead: {
    title: "Registry Ready Plots in Dholera",
    subtitle: "",
    buttonText: "Get A Call Back",
    includeEmail: true,
    maxSubmissions: 20,
    source: "BookMyAssets Website",
    tags: DEFAULT_TAGS,
    dataLayerEvent: "lead_form_other",
    headingTag: "h4",
  },
};

function getLeadSource() {
  if (typeof window === "undefined") return "BookMyAssets";

  const params = new URLSearchParams(window.location.search);

  if (params.has("twclid")) return "BookMyAssets Twitter Ads";
  if (params.has("paid")) return "BookMyAssets Twitter Ads";

  if (params.has("fbclid")) {
    const source = params.get("utm_source")?.toLowerCase();
    if (source === "instagram") return "BookMyAssets Meta IG";
    return "BookMyAssets Meta FB";
  }

  const slugParam = (key) => {
    const value = params.get(key) || "";
    const words = value.split("-").filter(Boolean).slice(0, 2).join(" ");
    return words || null;
  };

  if (params.has("dholera-sir-blogs")) {
    const slug = slugParam("dholera-sir-blogs");
    return slug ? `BookMyAssets Blogs ${slug}` : "BookMyAssets Blogs";
  }

  if (params.has("dholera-sir-updates")) {
    const slug = slugParam("dholera-sir-updates");
    return slug ? `BookMyAssets Updates ${slug}` : "BookMyAssets Updates";
  }

  if (params.has("about-dholera-sir")) {
    const slug = slugParam("about-dholera-sir");
    return slug
      ? `BookMyAssets Dholera SIR ${slug}`
      : "BookMyAssets Dholera SIR";
  }

  if (params.has("gad_source")) return "BookMyAssets Google Ads";

  return "BookMyAssets";
}

export default function InlineLeadForm({
  variant = "lead",
  title,
  subtitle,
  buttonText,
  includeEmail,
  maxSubmissions,
  source,
  tags,
  dataLayerEvent,
  pageName,
  headingTag,
}) {
  const variantConfig = FORM_VARIANTS[variant] || FORM_VARIANTS.lead;
  const config = {
    ...variantConfig,
    ...(title !== undefined ? { title } : {}),
    ...(subtitle !== undefined ? { subtitle } : {}),
    ...(buttonText !== undefined ? { buttonText } : {}),
    ...(includeEmail !== undefined ? { includeEmail } : {}),
    ...(maxSubmissions !== undefined ? { maxSubmissions } : {}),
    ...(source !== undefined ? { source } : {}),
    ...(tags !== undefined ? { tags } : {}),
    ...(dataLayerEvent !== undefined ? { dataLayerEvent } : {}),
    ...(headingTag !== undefined ? { headingTag } : {}),
  };
  const HeadingTag = config.headingTag;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha && siteKey) {
        try {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => setRecaptchaLoaded(true);
          script.onerror = () => setRecaptchaLoaded(true);
          document.head.appendChild(script);
        } catch (error) {
          console.error("reCAPTCHA script loading error:", error);
          setRecaptchaLoaded(true);
        }
      } else if (window.grecaptcha || !siteKey) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    if (typeof window !== "undefined") {
      const storedCount = parseInt(
        localStorage.getItem("formSubmissionCount") || "0",
        10,
      );
      const lastSubmissionTime = parseInt(
        localStorage.getItem("lastSubmissionTime") || "0",
        10,
      );

      if (lastSubmissionTime) {
        const hoursPassed =
          (Date.now() - lastSubmissionTime) / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          setSubmissionCount(0);
          localStorage.setItem("formSubmissionCount", "0");
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        } else {
          setSubmissionCount(storedCount);
          if (storedCount >= config.maxSubmissions) {
            setIsDisabled(true);
          }
        }
      } else {
        setSubmissionCount(storedCount);
      }
    }

    return () => {
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          window.grecaptcha.reset();
        } catch (error) {
          console.error("reCAPTCHA cleanup error:", error);
        }
      }
    };
  }, [config.maxSubmissions, siteKey]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid mobile number (10-15 digits)");
      return false;
    }

    if (submissionCount >= config.maxSubmissions) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );
      setIsDisabled(true);
      return false;
    }

    return true;
  };

  const submitVerifiedLead = async (token) => {
    try {
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
              phone: formData.mobileNumber,
              email: formData.email || undefined,
              source: getLeadSource(),
            },
            source: config.source,
            tags: config.tags,
            recaptchaToken: token,
          }),
        },
      );

      const responseText = await response.text();

      if (
        response.ok &&
        (responseText === "OK" || responseText.toLowerCase().includes("success"))
      ) {
        setFormData({ fullName: "", mobileNumber: "", email: "" });
        setShowPopup(true);

        const newCount = submissionCount + 1;
        setSubmissionCount(newCount);

        if (typeof window !== "undefined") {
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", Date.now().toString());

          if (config.dataLayerEvent) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: config.dataLayerEvent,
              ...(pageName ? { page_name: pageName } : {}),
            });
          }
        }
      } else {
        setErrorMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);

      if (window.grecaptcha && recaptchaRef.current) {
        try {
          window.grecaptcha.reset();
        } catch (error) {
          console.error("Error resetting reCAPTCHA:", error);
        }
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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

    try {
      if (!recaptchaRef.current.innerHTML) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: submitVerifiedLead,
          theme: "dark",
        });
      } else {
        window.grecaptcha.execute();
      }
    } catch (error) {
      console.error("Error rendering reCAPTCHA:", error);
      setErrorMessage("Error with verification. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <section className="py-[clamp(2rem,4vw,3.5rem)] bg-white rounded-lg">
      <div className="container mx-auto px-[clamp(1rem,4vw,3rem)]">
        <div className="max-w-5xl mx-auto">
          <HeadingTag className="text-black text-[clamp(1.375rem,2.5vw,2rem)] leading-[1.25] font-bold text-center">
            {config.title}
          </HeadingTag>

          

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
                    className="h-10 w-10 text-black"
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
              <h3 className="text-2xl font-bold text-black mb-2">
                Thank You!
              </h3>
              <p className="text-gray-300">
                Your request has been submitted successfully. We'll contact you
                shortly.
              </p>
            </div>
          ) : isDisabled ? (
            <div className="text-center py-8">
              <p className="text-center text-red-400 font-semibold">
                You have reached the maximum submission limit. Try again after
                24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-[clamp(1.5rem,3vw,2rem)] space-y-[clamp(1rem,2vw,1.5rem)]"
            >
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm"
                >
                  {errorMessage}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)]">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-black text-sm font-medium mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ddbc69] placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobileNumber"
                    className="block text-black text-sm font-medium mb-2"
                  >
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ddbc69] placeholder-gray-400"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>

              {config.includeEmail && (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-black text-sm font-medium mb-2"
                  >
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg bg-gray-800 border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-[#ddbc69] placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                </div>
              )}

              <div className="flex justify-center">
                <div ref={recaptchaRef}></div>
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  disabled={isLoading || isDisabled || !recaptchaLoaded}
                  className={`w-auto font-bold px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.6rem,1.2vw,0.75rem)] rounded-lg transition-all duration-300 ${
                    isLoading || isDisabled || !recaptchaLoaded
                      ? "bg-gray-600 cursor-not-allowed text-gray-400"
                      : "bg-[#ddbc69] hover:bg-[#c99a2d] text-black shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
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
                    </span>
                  ) : (
                    "Get A Call Back"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
