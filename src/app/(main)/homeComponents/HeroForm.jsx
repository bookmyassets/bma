"use client";
import React, { useCallback, useState } from "react";
import {
  FaArrowRight,
  FaBolt,
  FaLock,
  FaPhoneAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

export function FormInput({
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <div className="relative">
      <Icon
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          z-10
          -translate-y-1/2
          text-[0.8rem]
          text-[#ddbc69]/80
          transition-colors
        "
      />

      <input
        {...props}
        className={`
          h-[3.15rem]
          w-full
          rounded-xl
          border
          border-white/[0.14]
          bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(231,234,235,0.86))]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-5px_12px_rgba(0,0,0,0.18)]

          pl-11
          pr-4

          text-[0.88rem]
          font-normal
          text-slate-800

          outline-none

          backdrop-blur-md

          transition-all
          duration-300

          placeholder:text-slate-500

          hover:border-white/25
          hover:bg-white

          focus:border-[#ddbc69]/70
          focus:bg-white
          focus:shadow-[0_0_0_3px_rgba(221,188,105,0.08)]

          md:h-[3.35rem]
          md:text-[0.94rem]

          ${className}
        `}
      />
    </div>
  );
}

// getLeadSource extracted outside component — no re-creation on every render
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

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  /* =========================================================
     RATE LIMIT
  ========================================================= */
  const [submissionCount, setSubmissionCount] = useState(() => {
    if (typeof window === "undefined") return 0;

    const saved = localStorage.getItem("formSubmissionCount");

    const lastTime = parseInt(
      localStorage.getItem("lastSubmissionTime") || "0",
      10,
    );

    const hoursPassed = (Date.now() - lastTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      return 0;
    }

    return parseInt(saved || "0", 10);
  });

  const [lastSubmissionTime, setLastSubmissionTime] = useState(() => {
    if (typeof window === "undefined") return 0;

    return parseInt(
      localStorage.getItem("lastSubmissionTime") || "0",
      10,
    );
  });

  /* =========================================================
     INPUT CHANGE
  ========================================================= */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  }, []);

  /* =========================================================
     VALIDATION
  ========================================================= */
  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage(
        "Please enter a valid phone number (10-15 digits)",
      );
      return false;
    }

    const now = Date.now();

    const hoursPassed =
      (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);

      localStorage.setItem("formSubmissionCount", "0");

      localStorage.setItem(
        "lastSubmissionTime",
        now.toString(),
      );

      setLastSubmissionTime(now);
    } else if (submissionCount >= 3) {
      setErrorMessage(
        "Maximum submission limit reached. Try again after 24 hours.",
      );

      return false;
    }

    return true;
  };

  /* =========================================================
     SUBMIT
  ========================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const now = Date.now();

      setSubmittedName(formData.fullName);

      const response = await fetch("/api/submit-form-re", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fields: {
            name: formData.fullName,
            phone: formData.phone,
            source: getLeadSource(),
          },

          source: "BookMyAssets",

          tags: [
            "Dholera Investment",
            "Website Lead",
            "BookMyAssets",
          ],
        }),
      });

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Error submitting form (${response.status})`,
        );
      }

      /* Success state */
      setShowPopup(true);

      setSubmissionCount((prev) => {
        const newCount = prev + 1;

        localStorage.setItem(
          "formSubmissionCount",
          newCount.toString(),
        );

        localStorage.setItem(
          "lastSubmissionTime",
          now.toString(),
        );

        return newCount;
      });

      setLastSubmissionTime(now);

      /* =====================================================
         GTM EVENT
      ===================================================== */
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "lead_form_hero",
      });
    } catch (error) {
      console.error(
        "Form submission error:",
        error,
      );

      setErrorMessage(
        error.message ||
          "Error submitting form. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        w-full
        max-w-[22.5rem]
        overflow-hidden
        rounded-[1.35rem]
        border
        border-[#ddbc69]/65

        bg-[radial-gradient(circle_at_18%_0%,rgba(221,188,105,0.14),transparent_30%),linear-gradient(135deg,rgba(47,53,56,0.94)_0%,rgba(22,34,41,0.9)_48%,rgba(7,15,20,0.96)_100%)]

        p-5

        shadow-[0_20px_48px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.38),0_0_26px_rgba(221,188,105,0.16)]

        ring-1
        ring-white/10

        backdrop-blur-[18px]
        backdrop-saturate-[120%]

        sm:max-w-[24rem]
        sm:p-6

        md:max-w-[27rem]
        md:rounded-[1.5rem]
        md:p-7
      "
    >
      {/* =====================================================
          SUBTLE GLASS TOP LIGHT
      ===================================================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-8
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#f0d47d]/80
          to-transparent
        "
      />

      {/* =====================================================
          SUBTLE INNER LIGHT
      ===================================================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-48
          w-48
          rounded-full
          bg-[#ddbc69]/[0.06]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-cyan-300/[0.05] blur-3xl"
      />

      <div className="relative z-10">
        {/* ===================================================
            FORM HEADING
        =================================================== */}
        <div className="mb-5 text-center md:mb-6">
          <div
            className="
              mb-3
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span className="h-px w-7 bg-[#ddbc69]/75" />

            <span
              className="
                text-[0.62rem]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#e4c76f]
                sm:text-[0.65rem]
              "
            >
              Project Enquiry
            </span>

            <span className="h-px w-7 bg-[#ddbc69]/75" />
          </div>

          <h2
            className="
              text-[1.45rem]
              font-semibold
              leading-[1.2]
              tracking-[-0.02em]
              text-white

              md:text-[1.7rem]
            "
            style={{
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.55)",
            }}
          >
            Get Project Details
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-[18rem]
              text-[0.78rem]
              font-normal
              leading-[1.5]
              text-white

              sm:text-[0.82rem]
              md:text-[0.875rem]
            "
          >
            Our team will get in touch with you shortly
          </p>
        </div>

        {/* ===================================================
            SUCCESS
        =================================================== */}
        {showPopup ? (
          <div
            className="
              py-[clamp(1.25rem,3vw,2rem)]
              text-center
            "
            role="alert"
            aria-live="polite"
          >
            <div className="mb-4">
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-green-500
                  shadow-lg
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
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

            <h2
              className="
                mb-2
                text-xl
                font-semibold
                text-white
              "
            >
              Thank You!
            </h2>

            <p
              className="
                text-sm
                leading-[1.55]
                text-white/65
              "
            >
              Your request has been submitted successfully.
            </p>

            <p
              className="
                mt-1
                text-sm
                font-semibold
                text-[#ddbc69]
              "
            >
              Our expert will contact you within 24 hours.
            </p>
          </div>
        ) : (
          /* =================================================
             FORM
          ================================================= */
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {errorMessage && (
              <div
                className="
                  rounded-lg
                  border
                  border-red-400/40
                  bg-red-500/10
                  px-3
                  py-2.5
                  text-xs
                  leading-[1.45]
                  text-red-200
                "
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 gap-3">
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

            {/* =================================================
                CTA
            ================================================= */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                group
                flex
                h-[3.2rem]
                w-full
                touch-manipulation
                items-center
                justify-center
                gap-3
                rounded-xl

                bg-gradient-to-r
                from-[#f0cf70]
                via-[#ddbc69]
                to-[#cfa84e]

                px-5

                text-[0.9rem]
                font-semibold
                text-[#101010]

                shadow-[0_12px_28px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-2px_0_rgba(142,101,22,0.4)]

                transition-all
                duration-300

                hover:-translate-y-[1px]
                hover:brightness-105
                hover:shadow-[0_12px_28px_rgba(221,188,105,0.17)]

                active:translate-y-0

                disabled:cursor-not-allowed
                disabled:opacity-60

                md:h-14
                md:text-base
              "
            >
              <span>
                {isLoading
                  ? "Submitting..."
                  : "Get A Call Back"}
              </span>

              {!isLoading && (
                <FaArrowRight
                  aria-hidden="true"
                  className="
                    text-sm
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              )}
            </button>
          </form>
        )}

        {/* ===================================================
            TRUST ROW
        =================================================== */}
        {!showPopup && (
          <div
            className="
              mt-5
              grid
              grid-cols-3
              divide-x
              divide-white/10
              border-t
              border-white/10
              pt-4
              text-white/70
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                gap-1.5
                px-1
                text-center
              "
            >
              <FaBolt
                className="
                  shrink-0
                  text-[0.85rem]
                  text-[#e6c96f]
                "
                aria-hidden="true"
              />

              <span
                className="
                  text-[0.8rem]
                  leading-[1.25]

                  sm:text-[0.64rem]
                "
              >
                Quick
                <br />
                Response
              </span>
            </div>

            <div
              className="
                flex
                items-center
                justify-center
                gap-1.5
                px-1
                text-center
              "
            >
              <FaUsers
                className="
                  shrink-0
                  text-[0.85rem]
                  text-[#e6c96f]
                "
                aria-hidden="true"
              />

              <span
                className="
                  text-[0.8rem]
                  leading-[1.25]

                  sm:text-[0.64rem]
                "
              >
                Expert
                <br />
                Guidance
              </span>
            </div>

            <div
              className="
                flex
                items-center
                justify-center
                gap-1.5
                px-1
                text-center
              "
            >
              <FaLock
                className="
                  shrink-0
                  text-[0.85rem]
                  text-[#e6c96f]
                "
                aria-hidden="true"
              />

              <span
                className="
                  text-[0.8rem]
                  leading-[1.25]

                  sm:text-[0.64rem]
                "
              >
                100%
                <br />
                Confidential
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
