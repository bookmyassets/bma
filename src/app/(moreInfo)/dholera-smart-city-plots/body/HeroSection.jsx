"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  Phone,
  UserRound,
} from "lucide-react";
import logo from "@/assests/ad-page/dholera-govt-logo.webp";
import bannerImage from "@/assests/ad-page/hero/dholera-smart-city-plots.webp";

const MAX_SUBMISSIONS = 3;
const SUBMISSION_WINDOW_HOURS = 24;

export default function HeroSection() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  useEffect(() => {
    const storedCount = Number.parseInt(
      window.localStorage.getItem("formSubmissionCount") || "0",
      10
    );

    const storedTime = Number.parseInt(
      window.localStorage.getItem("lastSubmissionTime") || "0",
      10
    );

    setSubmissionCount(Number.isNaN(storedCount) ? 0 : storedCount);
    setLastSubmissionTime(Number.isNaN(storedTime) ? 0 : storedTime);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const nextValue =
      name === "phone"
        ? value.replace(/\D/g, "")
        : value;

    setFormData((currentData) => ({
      ...currentData,
      [name]: nextValue,
    }));

    setErrorMessage("");
  };

  const validateForm = () => {
    const trimmedName = formData.fullName.trim();

    if (!trimmedName || !formData.phone) {
      setErrorMessage(
        "Please enter your name and mobile number."
      );
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage(
        "Please enter a valid mobile number."
      );
      return false;
    }

    const now = Date.now();

    const hoursPassed =
      (now - lastSubmissionTime) /
      (1000 * 60 * 60);

    if (hoursPassed >= SUBMISSION_WINDOW_HOURS) {
      setSubmissionCount(0);
      setLastSubmissionTime(now);

      window.localStorage.setItem(
        "formSubmissionCount",
        "0"
      );

      window.localStorage.setItem(
        "lastSubmissionTime",
        now.toString()
      );
    } else if (submissionCount >= MAX_SUBMISSIONS) {
      setErrorMessage(
        "You have reached the maximum submission limit. Please try again after 24 hours."
      );

      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const now = Date.now();

      const response = await fetch(
        "/api/submit-form-re",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fields: {
              name: formData.fullName.trim(),
              phone: formData.phone,
              source: "BookMyAssets Google Ads",
            },

            source: "BookMyAssets Google Ads",

            tags: [
              "Dholera Investment",
              "Website Lead",
              "BookMyAssets",
            ],
          }),
        }
      );

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Error submitting form (${response.status})`
        );
      }

      const submissionWindowExpired =
        (now - lastSubmissionTime) /
          (1000 * 60 * 60) >=
        SUBMISSION_WINDOW_HOURS;

      const nextSubmissionCount =
        submissionWindowExpired
          ? 1
          : submissionCount + 1;

      setSubmissionCount(nextSubmissionCount);

      setLastSubmissionTime(now);

      setFormData({
        fullName: "",
        phone: "",
      });

      window.localStorage.setItem(
        "formSubmissionCount",
        nextSubmissionCount.toString()
      );

      window.localStorage.setItem(
        "lastSubmissionTime",
        now.toString()
      );

      window.dataLayer =
        window.dataLayer || [];

      window.dataLayer.push({
        event: "lead_form_hero",
        lead_type: "call_back",
      });

      setIsSubmitted(true);

      window.setTimeout(() => {
        router.push("/thankyou");
      }, 1800);
    } catch (error) {
      console.error(
        "Form submission error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Unable to submit the form. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <section
    id="hero"
    className="
      relative
      isolate
      overflow-hidden
      bg-[#0b0f14]
      pt-16
      sm:pt-20
    "
  >
    <div
      className="
        relative
        flex
        min-h-[720px]
        w-full
        items-end

        sm:min-h-[760px]

        lg:h-[calc(100svh-5rem)]
        lg:min-h-[700px]
        lg:max-h-[900px]
        lg:items-center
      "
    >
      {/* =====================================================
          FULL HERO BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage}
          alt="Dholera Smart City residential plots and connectivity"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="
            object-cover

            object-[48%_center]

            sm:object-[48%_center]

            lg:object-fill
            lg:object-center
          "
        />

        {/* Mobile readability gradient */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-b
            from-black/5
            via-black/10
            to-black/65

            lg:bg-transparent
          "
        />
      </div>

      {/* =====================================================
          FORM WRAPPER
      ====================================================== */}

      <div
        className="
          relative
          z-20

          mx-auto
          mb-5
          w-[calc(100%-24px)]
          max-w-[390px]

          sm:mb-7
          sm:w-[calc(100%-32px)]
          sm:max-w-[430px]

          lg:absolute
          lg:right-[5.5%]
          lg:top-1/2
          lg:m-0
          lg:w-[31%]
          lg:max-w-[515px]
          lg:-translate-y-1/2
        "
      >
        <div
          className="
            rounded-[18px]
            border
            border-white/70
            bg-white
            px-4
            py-4

            shadow-[0_18px_55px_rgba(0,0,0,0.28)]

            sm:rounded-2xl
            sm:px-5
            sm:py-5

            lg:p-6
            xl:p-7
          "
        >
          {/* =================================================
              FORM HEADER
          ================================================== */}

          <div className="mb-4 lg:mb-5">
            <h1
              className="
                text-[21px]
                font-bold
                leading-[1.1]
                tracking-[-0.025em]
                text-[#111820]

                min-[390px]:text-[22px]

                sm:text-[25px]

                lg:text-[clamp(1.8rem,2.4vw,2.65rem)]
              "
            >
              Residential Plots in Dholera from{" "}
              <span className="whitespace-nowrap">
                &#8377;8 Lakh
              </span>
            </h1>

            <p
              className="
                mt-2
                text-[13px]
                leading-5
                text-slate-600

                sm:text-sm

                lg:text-base
                lg:leading-6
              "
            >
              Get verified project details and a call from our RM
            </p>
          </div>

          {/* =================================================
              SUCCESS STATE
          ================================================== */}

          {isSubmitted ? (
            <div
              className="py-5 text-center sm:py-7"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2
                className="
                  mx-auto
                  h-10
                  w-10
                  text-emerald-600
                  sm:h-12
                  sm:w-12
                "
              />

              <h2
                className="
                  mt-3
                  text-xl
                  font-bold
                  text-[#111820]
                  sm:text-2xl
                "
              >
                Thank you!
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:text-sm">
                Your request has been received. We will contact you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="
                w-full
                space-y-3

                sm:space-y-3.5

                lg:space-y-4
              "
            >
              {/* ERROR */}

              {errorMessage && (
                <p
                  className="
                    rounded-lg
                    border
                    border-red-200
                    bg-red-50
                    px-3
                    py-2
                    text-xs
                    leading-5
                    text-red-700
                    sm:text-sm
                  "
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}

              {/* =================================================
                  NAME
              ================================================== */}

              <div className="relative">
                <label
                  htmlFor="hero-full-name"
                  className="sr-only"
                >
                  Full name
                </label>

                <UserRound
                  aria-hidden="true"
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    h-[18px]
                    w-[18px]
                    -translate-y-1/2
                    text-slate-600

                    sm:left-4
                    sm:h-5
                    sm:w-5
                  "
                />

                <input
                  id="hero-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="
                    h-11
                    w-full
                    rounded-[11px]
                    border
                    border-slate-300
                    bg-white
                    pl-10
                    pr-3
                    text-sm
                    text-[#111820]
                    outline-none
                    transition

                    placeholder:text-slate-400

                    focus:border-[#B58435]
                    focus:ring-2
                    focus:ring-[#DDBC69]/30

                    sm:h-12
                    sm:rounded-xl
                    sm:pl-11
                    sm:pr-4
                    sm:text-[15px]

                    lg:h-14
                    lg:text-base
                  "
                />
              </div>

              {/* =================================================
                  PHONE
              ================================================== */}

              <div className="relative">
                <label
                  htmlFor="hero-phone"
                  className="sr-only"
                >
                  Mobile number
                </label>

                <Phone
                  aria-hidden="true"
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    h-[18px]
                    w-[18px]
                    -translate-y-1/2
                    text-slate-600

                    sm:left-4
                    sm:h-5
                    sm:w-5
                  "
                />

                <input
                  id="hero-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  minLength={10}
                  maxLength={15}
                  required
                  className="
                    h-11
                    w-full
                    rounded-[11px]
                    border
                    border-slate-300
                    bg-white
                    pl-10
                    pr-3
                    text-sm
                    text-[#111820]
                    outline-none
                    transition

                    placeholder:text-slate-400

                    focus:border-[#B58435]
                    focus:ring-2
                    focus:ring-[#DDBC69]/30

                    sm:h-12
                    sm:rounded-xl
                    sm:pl-11
                    sm:pr-4
                    sm:text-[15px]

                    lg:h-14
                    lg:text-base
                  "
                />
              </div>

              {/* =================================================
                  CTA
              ================================================== */}

              <button
                type="submit"
                disabled={isLoading}
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[11px]

                  bg-gradient-to-r
                  from-[#C49332]
                  to-[#A87523]

                  px-4
                  text-sm
                  font-semibold
                  text-white

                  shadow-md
                  shadow-[#A87523]/20

                  transition

                  hover:from-[#D3A846]
                  hover:to-[#B58435]

                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#DDBC69]
                  focus:ring-offset-2

                  disabled:cursor-not-allowed
                  disabled:opacity-70

                  sm:h-12
                  sm:text-[15px]

                  lg:h-14
                  lg:text-base
                "
              >
                {isLoading ? (
                  <>
                    <LoaderCircle
                      className="h-4 w-4 animate-spin sm:h-5 sm:w-5"
                      aria-hidden="true"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get A Call Back

                    <ArrowRight
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>

              {/* =================================================
                  PRIVACY
              ================================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  pt-0.5
                  text-[10px]
                  leading-4
                  text-slate-500

                  sm:gap-2
                  sm:text-xs
                "
              >
                <LockKeyhole
                  aria-hidden="true"
                  className="
                    h-3.5
                    w-3.5
                    shrink-0
                    text-[#A87523]
                    sm:h-4
                    sm:w-4
                  "
                />

                <p>We respect your privacy.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </section>
);
}
