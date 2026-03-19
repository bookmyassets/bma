import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import logo from "@/assests/ad-page/dholera-govt-logo.webp";

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const FormInput = memo(
  ({
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    icon: Icon,
    ...props
  }) => (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500 pointer-events-none">
        <Icon />
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // ✅ clamp() — input text scales between 12px and 14px
        className="w-full p-3 pl-10 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-300 hover:border-yellow-400 transition-colors text-[clamp(0.75rem,1.5vw,0.875rem)]"
        {...props}
      />
    </div>
  ),
);
FormInput.displayName = "FormInput";

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

  useEffect(() => {
    const loadRecaptchaTimeout = setTimeout(() => {
      if (typeof window === "undefined") return;
      if (!window.grecaptcha) {
        try {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => setRecaptchaLoaded(true);
          script.onerror = () => {
            console.error("Failed to load reCAPTCHA");
            setRecaptchaLoaded(true);
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA error:", err);
          setRecaptchaLoaded(true);
        }
      } else {
        setRecaptchaLoaded(true);
      }
    }, 2000);

    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10),
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10),
      );
    }

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") setShowPopup(false);
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      clearTimeout(loadRecaptchaTimeout);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

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
    <div className="w-full max-w-md p-[calc(0.5rem+1vw)]">
      {/* Logo */}
      <div className="text-center mb-[calc(0.75rem+0.5vw)]">
        {/* ✅ responsive image — aspect-ratio + fill instead of unsized bare <Image> */}
        <div className="relative w-[clamp(240px,20vw,300px)] aspect-[3/1] mx-auto mb-[calc(0.5rem+0.25vw)] hidden md:block">
          <Image
            src={logo}
            alt="BookMyAssets - Dholera Property Investment"
            fill
            sizes="(min-width: 768px) 20vw, 0px"
            className="object-contain"
            fetchPriority="high"
          />
        </div>

        <div className="relative max-sm:space-y-2">
          <style jsx>{`
            @keyframes textGlow {
              0%,
              100% {
                text-shadow: 0 0 50px rgba(222, 174, 60, 0.8);
                color: black;
              }
              50% {
                text-shadow:
                  0 0 20px rgba(255, 255, 255, 1),
                  0 0 30px rgba(255, 255, 255, 0.8);
                color: black;
              }
            }
            .flashy-blink {
              animation: flashyBlink 3s infinite ease-in-out;
              padding: 4px;
              border-radius: 1rem;
              border: 3px solid #deae3c;
            }
            .glowing-text {
              animation: textGlow 1s infinite ease-in-out;
            }
          `}</style>

          <div className="flashy-blink">
            {/* ✅ clamp() — hero headline scales between 18px and 24px */}
            <h1 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-bold mb-1 glowing-text px-2">
              Dholera Plots Starting From ₹10 Lakh
            </h1>
            {/* ✅ clamp() — subline scales between 13px and 16px */}
            <p className="text-[clamp(0.8125rem,1.5vw,1rem)] glowing-text px-2">
              Direct Entry from Gujarat State Highway 117
            </p>
          </div>
        </div>
      </div>

      {/* Two-Step Progress Indicator */}
      <div className="mb-[calc(1rem+0.5vw)]">
        <div className="flex items-center justify-center gap-[calc(0.5rem+0.5vw)]">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-[clamp(0.75rem,1.5vw,1rem)] transition-all ${
                !showPopup
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
                  : "bg-green-500 text-white"
              }`}
            >
              {showPopup ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              ) : (
                "1"
              )}
            </div>
            <span
              className={`text-[clamp(0.7rem,1.2vw,0.875rem)] font-semibold ${!showPopup ? "text-yellow-600" : "text-green-600"}`}
            >
              Submit Details
            </span>
          </div>

          {/* Connector */}
          <div
            className={`h-0.5 w-[calc(2rem+1vw)] transition-all ${showPopup ? "bg-green-500" : "bg-gray-300"}`}
          />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-[clamp(0.75rem,1.5vw,1rem)] transition-all ${
                showPopup
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
            <span
              className={`text-[clamp(0.7rem,1.2vw,0.875rem)] font-semibold ${showPopup ? "text-yellow-600" : "text-gray-400"}`}
            >
              {!showPopup ? "Free consultation" : "Free consultation booked"}
            </span>
          </div>
        </div>

        <div className="text-center mt-3">
          <p className="text-[clamp(0.7rem,1.2vw,0.875rem)] text-gray-600 font-medium">
            {!showPopup
              ? "Fill the form to get started"
              : `Free consultation booked for ${submittedName} within 24 hours`}
          </p>
        </div>
      </div>

      {/* Success state — ✅ inert on the form when success is shown */}
      {showPopup ? (
        <div className="text-center py-6" role="alert" aria-live="polite">
          <div className="mb-4 inline-block">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
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
          {/* ✅ clamp() — success text scales fluidly */}
          <h2 className="text-[clamp(1.125rem,2.5vw,1.25rem)] font-bold text-black mb-2">
            Thank You!
          </h2>
          <p className="text-[clamp(0.8125rem,1.5vw,0.875rem)] text-gray-600 mb-1">
            Your request has been submitted successfully.
          </p>
          <p className="text-[clamp(0.8125rem,1.5vw,0.875rem)] text-yellow-600 font-semibold">
            Our expert will contact you within 24 hours for your free
            consultation.
          </p>
        </div>
      ) : (
        // ✅ inert={false} explicitly when form is active (no warning)
        <form onSubmit={handleSubmit} className="space-y-1" inert={false}>
          {errorMessage && (
            <div
              className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-700 rounded-lg text-[clamp(0.75rem,1.5vw,0.875rem)]"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 items-center">
            <FormInput
              name="fullName"
              placeholder="Enter Name"
              value={formData.fullName}
              onChange={handleChange}
              icon={UserIcon}
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
              icon={PhoneIcon}
              minLength={10}
              maxLength={15}
              required
              autoComplete="tel"
              aria-label="Phone Number"
            />
          </div>

          <div className="flex justify-center">
            <div ref={recaptchaRef} />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full
              py-[calc(0.5rem+0.25vw)]
              px-[calc(1rem+1vw)]
              bg-gradient-to-r from-yellow-500 to-yellow-600
              text-white text-[clamp(0.875rem,1.5vw,1rem)]
              rounded-lg hover:from-yellow-600 hover:to-yellow-700
              transition-all shadow-lg hover:shadow-yellow-500/20
              font-semibold disabled:opacity-70 disabled:cursor-not-allowed
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
