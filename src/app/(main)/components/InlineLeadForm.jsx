"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Home,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

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
  theme = "light",
  showSubtitle = false,
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
  const isDark = theme === "dark";
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
        "/api/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: formData.mobileNumber,
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
  <section
    aria-label={config.title}
    className="
      bg-[#F7F3EB]
      px-4
      py-5

      sm:px-6
      sm:py-6

      lg:px-8
      lg:py-8
    "
  >
    <div
      className="
        relative
        mx-auto
        max-w-7xl
        overflow-hidden

        rounded-[22px]

        border
        border-[#B8924F]/55

        bg-[#F7F3EB]

        px-3
        py-4

        shadow-[0_16px_45px_rgba(89,72,42,0.05)]

        sm:px-5
        sm:py-5

        lg:px-6
        lg:py-6
      "
    >

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mx-auto max-w-4xl text-center">
          
          <HeadingTag
            className="
              mt-1

              font-serif
              text-[26px]
              font-medium
              leading-[1.08]
              tracking-[-0.025em]
              text-[#202020]

              sm:text-[30px]

              lg:text-[34px]

              xl:text-[38px]
            "
          >
            {config.title}
          </HeadingTag>

          {showSubtitle && config.subtitle && (
            <p
              className="
                mx-auto
                mt-2.5
                max-w-3xl

                text-[15px]
                leading-[1.6]
                text-[#6F6A62]

                sm:text-base
              "
            >
              {config.subtitle}
            </p>
          )}
        </div>

        {/* =====================================================
            SUCCESS
        ====================================================== */}
        {showPopup ? (
          <div className="py-5 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-4 inline-block"
            >
              <div
                className="
                  mx-auto
                  flex
                  size-14
                  items-center
                  justify-center

                  rounded-full

                  bg-[#B8924F]/15
                "
              >
                <svg
                  className="size-7 text-[#B8924F]"
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

            <h3
              className="
                font-serif
                text-[28px]
                font-medium
                text-[#202020]
              "
            >
              Thank You!
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-lg

                text-[15px]
                leading-6
                text-[#6F6A62]
              "
            >
              Your request has been submitted successfully. We&apos;ll contact
              you shortly.
            </p>
          </div>
        ) : isDisabled ? (
          <div className="py-5 text-center">
            <p className="text-sm font-semibold text-red-600">
              You have reached the maximum submission limit. Try again after 24
              hours.
            </p>
          </div>
        ) : (
          /* =====================================================
              FORM
          ====================================================== */
          <form
            onSubmit={handleSubmit}
            className="
              mt-4

              sm:mt-5

              lg:mt-6
            "
          >
            {/* Error */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  mb-3

                  rounded-lg

                  border
                  border-red-300

                  bg-red-50

                  px-3
                  py-2

                  text-sm
                  text-red-700
                "
              >
                {errorMessage}
              </motion.div>
            )}

            {/* =================================================
                FIELDS + CTA
            ================================================== */}
            <div
              className="
                grid
                grid-cols-1
                gap-3

                md:grid-cols-2

                lg:grid-cols-[1fr_1fr_210px]
                lg:items-end
              "
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="
                    mb-1.5
                    block

                    text-[14px]
                    font-medium
                    text-[#202020]

                    sm:text-[15px]
                  "
                >
                  Full Name *
                </label>

                <div className="relative">
                  <UserRound
                    strokeWidth={1.7}
                    className="
                      pointer-events-none

                      absolute
                      left-4
                      top-1/2

                      size-5
                      -translate-y-1/2

                      text-[#8B857C]
                    "
                  />

                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="
                      h-12
                      w-full

                      rounded-lg

                      border
                      border-[#DED4C4]

                      bg-[#FBF8F2]

                      pl-12
                      pr-4

                      text-[15px]
                      text-[#202020]

                      outline-none

                      transition-all
                      duration-200

                      placeholder:text-[#918B82]

                      hover:border-[#C9B995]

                      focus:border-[#B8924F]
                      focus:ring-2
                      focus:ring-[#B8924F]/15

                      sm:h-[50px]
                      sm:text-base
                    "
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="
                    mb-1.5
                    block

                    text-[14px]
                    font-medium
                    text-[#202020]

                    sm:text-[15px]
                  "
                >
                  Mobile Number *
                </label>

                <div className="relative">
                  <Phone
                    strokeWidth={1.7}
                    className="
                      pointer-events-none

                      absolute
                      left-4
                      top-1/2

                      size-5
                      -translate-y-1/2

                      text-[#8B857C]
                    "
                  />

                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="Enter your mobile number"
                    className="
                      h-12
                      w-full

                      rounded-lg

                      border
                      border-[#DED4C4]

                      bg-[#FBF8F2]

                      pl-12
                      pr-4

                      text-[15px]
                      text-[#202020]

                      outline-none

                      transition-all
                      duration-200

                      placeholder:text-[#918B82]

                      hover:border-[#C9B995]

                      focus:border-[#B8924F]
                      focus:ring-2
                      focus:ring-[#B8924F]/15

                      sm:h-[50px]
                      sm:text-base
                    "
                  />
                </div>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={isLoading || isDisabled || !recaptchaLoaded}
                className={`
                  group

                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-3

                  rounded-lg

                  px-5

                  text-[15px]
                  font-semibold

                  transition-all
                  duration-300

                  sm:h-[50px]
                  sm:text-base

                  md:col-span-2

                  lg:col-span-1

                  ${
                    isLoading || isDisabled || !recaptchaLoaded
                      ? `
                        cursor-not-allowed
                        border
                        border-[#DED4C4]
                        bg-[#E8E2D8]
                        text-[#938D83]
                      `
                      : `
                        border
                        border-[#B8924F]

                        bg-[linear-gradient(90deg,#D0AD62,#E3C578)]

                        text-[#202020]

                        shadow-[0_10px_25px_rgba(184,146,79,0.18)]

                        hover:-translate-y-0.5
                        hover:shadow-[0_14px_30px_rgba(184,146,79,0.26)]
                      `
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="size-5 animate-spin"
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
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>

                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>{config.buttonText}</span>

                    <ArrowRight
                      strokeWidth={1.8}
                      className="
                        size-[18px]

                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </button>
            </div>

            {/* reCAPTCHA */}
            <div className="mt-2 flex justify-center">
              <div ref={recaptchaRef} />
            </div>

            {/* =================================================
                SECURITY MESSAGE
            ================================================== */}
            <div
              className="
                mt-2

                flex
                items-center
                justify-center
                gap-2

                text-[12px]
                text-[#6F6A62]

                sm:text-[13px]
              "
            >
              <ShieldCheck
                strokeWidth={1.7}
                className="size-[18px] text-[#B8924F]"
              />

              <span className="text-black text-[15px]">Your details are safe with us</span>
            </div>
          </form>
        )}
      </div>
    </div>
  </section>
);
}
