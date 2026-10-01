"use client";

import { useState, useEffect, useRef } from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

export default function ChannelPartnerForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    profession: "",
    experience: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const recaptchaRef = useRef(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const professionOptions = [
    "Real Estate Brokers and Agents",
    "Property Consultants",
    "Wealth and Financial Consultants",
    "NRI and Overseas Consultants",
    "Real Estate Companies",
    "Referral Partners",
    "Women Entrepreneurs",
    "Individuals Interested in Real Estate",
  ];

  const experienceOptions = [
    "0-1 Years",
    "1-3 Years",
    "3-5 Years",
    "5-10 Years",
    "10+ Years",
  ];

  useEffect(() => {
    const loadRecaptcha = () => {
      if (
        typeof window !== "undefined" &&
        !window.grecaptcha &&
        siteKey
      ) {
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

    if (typeof window !== "undefined") {
      const storedCount = parseInt(
        localStorage.getItem("channelPartnerSubmissionCount") || "0",
        10
      );

      const lastSubmissionTime = parseInt(
        localStorage.getItem("channelPartnerLastSubmissionTime") || "0",
        10
      );

      if (lastSubmissionTime) {
        const timeDifference = Date.now() - lastSubmissionTime;

        const hoursPassed =
          timeDifference / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          setSubmissionCount(0);

          localStorage.setItem(
            "channelPartnerSubmissionCount",
            "0"
          );

          localStorage.setItem(
            "channelPartnerLastSubmissionTime",
            Date.now().toString()
          );
        } else {
          setSubmissionCount(storedCount);

          if (storedCount >= 20) {
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
        } catch (e) {
          console.log("reCAPTCHA cleanup error:", e);
        }
      }
    };
  }, [siteKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const validateForm = () => {
    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.profession ||
      !formData.experience
    ) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (
      !/^\d{10,15}$/.test(
        formData.phone.replace(/\D/g, "")
      )
    ) {
      setErrorMessage(
        "Please enter a valid phone number (10-15 digits)"
      );
      return false;
    }

    if (submissionCount >= 20) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );

      setIsDisabled(true);

      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fields: {
            name: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            source: "BookMyAssets Channel Partner",
            profession: formData.profession,
            experience: formData.experience,
          },

          source: "Channel Partner Program",

          tags: [
            "Channel Partner",
            "Business Partner",
            "Broker Program",
          ],

          recaptchaToken: token,
        }),
      });

      const responseText = await response.text();

      console.log("TeleCRM Response:", responseText);

      if (response.ok) {
        if (
          responseText === "OK" ||
          responseText.toLowerCase().includes("success")
        ) {
          setFormData({
            fullName: "",
            phone: "",
            email: "",
            profession: "",
            experience: "",
          });

          setShowPopup(true);

          const newCount = submissionCount + 1;

          setSubmissionCount(newCount);

          if (typeof window !== "undefined") {
            localStorage.setItem(
              "channelPartnerSubmissionCount",
              newCount.toString()
            );

            localStorage.setItem(
              "channelPartnerLastSubmissionTime",
              Date.now().toString()
            );
          }

          setTimeout(() => {
            setShowPopup(false);
          }, 5000);
        } else {
          console.log("Response Text:", responseText);

          setErrorMessage(
            "Submission received but with unexpected response"
          );
        }
      } else {
        console.error("Server Error:", responseText);

        throw new Error(
          responseText || "Submission failed"
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      setErrorMessage(
        `Error submitting form: ${error.message}`
      );
    } finally {
      setIsLoading(false);

      if (
        window.grecaptcha &&
        recaptchaRef.current
      ) {
        try {
          window.grecaptcha.reset();
        } catch (err) {
          console.error(
            "Error resetting reCAPTCHA:",
            err
          );
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

    if (
      !recaptchaLoaded ||
      !window.grecaptcha
    ) {
      setErrorMessage(
        "Security verification not loaded. Please refresh the page."
      );

      setIsLoading(false);

      return;
    }

    if (!recaptchaRef.current.innerHTML) {
      try {
        window.grecaptcha.render(
          recaptchaRef.current,
          {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "dark",
            size: "compact",
          }
        );
      } catch (error) {
        console.error(
          "Error rendering reCAPTCHA:",
          error
        );

        setErrorMessage(
          "Error with verification. Please try again."
        );

        setIsLoading(false);
      }
    } else {
      window.grecaptcha.execute();
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* ambient color */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-24 -top-24
          h-56 w-56
          rounded-full
          bg-violet-500/[0.08]
          blur-[90px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-24 -left-24
          h-56 w-56
          rounded-full
          bg-sky-500/[0.07]
          blur-[90px]
        "
      />

      <div className="relative">
        {/* ===================================================
            FORM HEADER
        =================================================== */}

        <div className="mb-7 border-b border-white/[0.08] pb-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Sparkles
                  size={20}
                  strokeWidth={1.7}
                  className="text-violet-300"
                />

                <span className="text-[15px] font-semibold uppercase tracking-[0.22em] text-violet-300">
                  Application
                </span>
              </div>

              <h3 className="text-2xl font-medium font-playfair-display tracking-[-0.03em] text-white sm:text-3xl">
                Partner registration
              </h3>

            </div>

            <div
              className="
                hidden
                h-11 w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border border-emerald-400/20
                bg-emerald-400/10
                sm:flex
              "
            >
              <ShieldCheck
                size={20}
                strokeWidth={1.6}
                className="text-emerald-300"
              />
            </div>
          </div>
        </div>

        {/* ===================================================
            SUCCESS
        =================================================== */}

        {showPopup && (
          <div
            className="
              mb-6
              flex items-start gap-3
              rounded-2xl
              border border-emerald-400/20
              bg-emerald-400/[0.08]
              p-4
            "
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15">
              <Check
                size={17}
                strokeWidth={2}
                className="text-emerald-300"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-200">
                Application submitted
              </p>

              <p className="mt-1 text-sm leading-6 text-white/65">
                Thank you. Our team will contact you
                shortly.
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            DISABLED STATE
        =================================================== */}

        {isDisabled ? (
          <div
            className="
              rounded-2xl
              border border-red-400/20
              bg-red-400/[0.07]
              p-5
              text-center
            "
          >
            <p className="text-sm font-medium leading-6 text-red-300">
              You have reached the maximum submission
              limit. Try again after 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* error */}
            {errorMessage && (
              <div
                className="
                  rounded-xl
                  border border-red-400/20
                  bg-red-400/[0.07]
                  px-4 py-3
                  text-sm leading-6
                  text-red-300
                "
              >
                {errorMessage}
              </div>
            )}

            {/* ===============================================
                CONTACT INFORMATION
            =============================================== */}

            <div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* NAME */}
                <FormField
                  icon={UserRound}
                  iconColor="text-sky-300"
                  iconBg="bg-sky-400/10"
                  iconBorder="border-sky-400/20"
                  label="Full name"
                >
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </FormField>

                {/* PHONE */}
                <FormField
                  icon={Phone}
                  iconColor="text-emerald-300"
                  iconBg="bg-emerald-400/10"
                  iconBorder="border-emerald-400/20"
                  label="Phone number"
                >
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </FormField>
              </div>

              {/* EMAIL FULL WIDTH */}
              <div className="mt-4">
                <FormField
                  icon={Mail}
                  iconColor="text-violet-300"
                  iconBg="bg-violet-400/10"
                  iconBorder="border-violet-400/20"
                  label="Email address"
                >
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </FormField>
              </div>
            </div>

            {/* ===============================================
                PROFESSIONAL INFORMATION
            =============================================== */}

            <div className="pt-2">

              <div className="grid gap-4 sm:grid-cols-2">
                {/* PROFESSION */}
                <FormField
                  icon={BriefcaseBusiness}
                  iconColor="text-orange-300"
                  iconBg="bg-orange-400/10"
                  iconBorder="border-orange-400/20"
                  label="Profession"
                >
                  <div className="relative">
                    <select
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none pr-11`}
                    >
                      <option
                        value=""
                        className="bg-[#111113]"
                      >
                        Select profession
                      </option>

                      {professionOptions.map(
                        (option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#111113]"
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        pointer-events-none
                        absolute right-4 top-1/2
                        -translate-y-1/2
                        text-white/40
                      "
                    />
                  </div>
                </FormField>

                {/* EXPERIENCE */}
                <FormField
                  icon={Clock3}
                  iconColor="text-pink-300"
                  iconBg="bg-pink-400/10"
                  iconBorder="border-pink-400/20"
                  label="Experience"
                >
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none pr-11`}
                    >
                      <option
                        value=""
                        className="bg-[#111113]"
                      >
                        Select experience
                      </option>

                      {experienceOptions.map(
                        (option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#111113]"
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        pointer-events-none
                        absolute right-4 top-1/2
                        -translate-y-1/2
                        text-white/40
                      "
                    />
                  </div>
                </FormField>
              </div>
            </div>

            {/* ===============================================
                SECURITY
            =============================================== */}

            <div className="pt-2">
              <div
                className="
                  flex items-center justify-between gap-4
                  rounded-2xl
                  border border-white/[0.08]
                  bg-white/[0.025]
                  px-4 py-3
                "
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/10">
                    <ShieldCheck
                      size={16}
                      className="text-emerald-300"
                    />
                  </div>

                  <div>
                    <p className="text-md font-medium text-white">
                      Secure submission
                    </p>

                    <p className="mt-0.5 text-[15px] text-white">
                      Protected by verification
                    </p>
                  </div>
                </div>

                <span
                  className={`h-2 w-2 rounded-full ${
                    recaptchaLoaded
                      ? "bg-emerald-400"
                      : "bg-amber-400"
                  }`}
                />
              </div>

              <div className="mt-4 flex justify-center overflow-hidden">
                <div ref={recaptchaRef} />
              </div>
            </div>

            {/* ===============================================
                SUBMIT
            =============================================== */}

            <button
              type="submit"
              disabled={
                isLoading ||
                isDisabled ||
                !recaptchaLoaded
              }
              className={`
                group
                relative
                mt-2
                flex
                min-h-14
                w-full
                items-center
                justify-center
                gap-3
                overflow-hidden
                px-6 py-4
                text-sm
                font-semibold
                transition-all
                duration-300

                ${
                  isLoading ||
                  isDisabled ||
                  !recaptchaLoaded
                    ? `
                      cursor-not-allowed
                      bg-white/[0.08]
                      text-white/35
                    `
                    : `
                      bg-[#ddbc69]
                      text-[#080808]
                      shadow-[0_14px_40px_rgba(221,188,105,0.12)]
                      hover:-translate-y-0.5
                      hover:bg-[#ecd17e]
                      hover:shadow-[0_18px_48px_rgba(221,188,105,0.18)]
                    `
                }
              `}
            >
              {!isLoading &&
                !isDisabled &&
                recaptchaLoaded && (
                  <span
                    aria-hidden="true"
                    className="
                      absolute inset-y-0
                      -left-1/2
                      w-1/3
                      skew-x-[-20deg]
                      bg-white/20
                      transition-all
                      duration-700
                      group-hover:left-[120%]
                    "
                  />
                )}

              <span className="relative">
                {isLoading
                  ? "Submitting..."
                  : "Join the Partner Program"}
              </span>

              {!isLoading && (
                <ArrowRight
                  size={17}
                  className="relative transition-transform group-hover:translate-x-1"
                />
              )}
            </button>

            <p className="text-center text-[15px] leading-5 text-white">
              By submitting this form, you agree to be
              contacted regarding the Channel Partner
              Program.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SHARED FIELD
========================================================= */

function FormField({
  icon: Icon,
  iconColor,
  iconBg,
  iconBorder,
  label,
  children,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-white lg:text-base">
        {label}
        <span className="ml-1 text-[#ddbc69]">*</span>
      </span>

      <div
        className="
          group
          flex
          items-center
          gap-3
          rounded-2xl
          border border-white/[0.09]
          bg-[#0c0c0e]
          px-3
          transition-all
          duration-200

          focus-within:border-[#ddbc69]/45
          focus-within:bg-[#101011]
          focus-within:shadow-[0_0_0_3px_rgba(221,188,105,0.045)]
        "
      >
        <div
          className={`
            flex h-9 w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            ${iconBg}
            ${iconBorder}
          `}
        >
          <Icon
            size={16}
            strokeWidth={1.7}
            className={iconColor}
          />
        </div>

        <div className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </label>
  );
}

/* =========================================================
   INPUT STYLE
========================================================= */

const inputClass = `
  min-h-[54px]
  w-full
  border-0
  bg-transparent
  px-1
  py-3
  text-base
  lg:text-lg
  text-white
  outline-none

  placeholder:text-white/30

  focus:outline-none
  focus:ring-0

  disabled:cursor-not-allowed
  disabled:opacity-50
`;
