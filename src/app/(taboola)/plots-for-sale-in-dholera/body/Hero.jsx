"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import img1 from "@/assests/taboola/hero/dholera-sir-residential-plots-bookmyassets-desktop-banner.webp";
import img2 from "@/assests/taboola/hero/dholera-sir-residential-plots-bookmyassets-mobile-banner.webp";

const points = [
  {
    title: "Registry ready with Immediate Possession",
    desc: "Suitable for buyers exploring high-growth land opportunities in India's first greenfield smart city.",
  },
  {
    title: "Plots in Dholera's fastest-growing corridors",
    desc: "Focused on long-term planning — we guide you through timelines, returns, and exit strategies.",
  },
  {
    title: "High ROI Potential in Next 5 Years",
    desc: "Access maps, master plans, and plot layout walkthroughs before making any decision.",
  },
];

const FormCard = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  isDisabled,
  errorMessage,
  recaptchaRef,
  recaptchaLoaded,
}) => (
  <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)] bg-[#fafafa] border border-yellow-600/20 rounded-xl backdrop-blur-md p-4 md:p-[clamp(2rem,3.5vw,2.75rem)] w-full md:w-[clamp(500px,22vw,660px)]">
    <div>
      <h3 className="text-black font-semibold text-center text-lg md:text-[clamp(1.25rem,1.85vw,1.7rem)] leading-tight">
        Invest in India's First Smart City
      </h3>
    </div>

    <input
      name="fullName"
      placeholder="Full Name*"
      className="w-full h-10 md:h-[clamp(2.25rem,3.45vw,2.85rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
      value={formData.fullName}
      onChange={handleChange}
    />
    <input
      name="phone"
      placeholder="Phone Number*"
      type="tel"
      className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
      value={formData.phone}
      onChange={handleChange}
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
    />
    <select
      name="investmentAmt"
      className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
      value={formData.investmentAmt}
      onChange={handleChange}
    >
      <option value="" disabled>
        Budget*
      </option>
      <option value="8-15">₹5 Lakh - ₹15 Lakh</option>
      <option value="15-25">₹15 Lakh - ₹25 Lakh</option>
      <option value="25+">₹25 Lakh +</option>
    </select>

    {errorMessage && (
      <p className="text-red-500 text-xs text-center">{errorMessage}</p>
    )}
    <div ref={recaptchaRef} className="hidden" />

    <button
      onClick={handleSubmit}
      disabled={isLoading || isDisabled || !recaptchaLoaded}
      className={`w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] font-bold px-6 rounded-lg transition-all duration-300 text-xs md:text-[clamp(0.7rem,0.9vw,0.82rem)] uppercase tracking-widest ${
        isLoading || isDisabled || !recaptchaLoaded
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
        "Talk to Dholera Expert"
      )}
    </button>
  </div>
);

const PointsList = () => (
  <div className="flex flex-col gap-[clamp(1rem,1.75vw,1.5rem)] w-[clamp(500px,45vw,700px)]">
    <h1 className="text-white font-bold text-[clamp(1.5rem,2.7vw,2.45rem)] leading-tight mb-[clamp(0.25rem,0.75vw,0.75rem)]">
      Govt. Approved Plots in Dholera
      <br />
      <span className="text-[#deae3c]">Starting from ₹8 Lakh</span>
    </h1>

    <p className="text-white text-[clamp(0.75rem,1.5vw,1.2rem)] mb-[clamp(0.25rem,0.75vw,0.75rem)]">
      Explore premium plotted investment opportunities in Dholera Smart City.
      <br />
      Get brochure, price list, location details, and expert guidance from
      BookMyAssets.
    </p>

    {points.map((point, i) => (
      <div
        key={i}
        className="flex gap-[clamp(0.5rem,1vw,0.875rem)] items-center"
      >
        <div className="shrink-0 w-[clamp(1.5rem,2.15vw,1.8rem)] h-[clamp(1.5rem,2.15vw,1.8rem)] rounded-full border border-yellow-500/60 flex items-center justify-center">
          <span className="text-[#deae3c] text-[clamp(0.8rem,1.2vw,1rem)] font-semibold">
            ➤
          </span>
        </div>
        <p className="text-white font-medium text-[clamp(0.35rem,1.35vw,1.5rem)] leading-snug">
          {point.title}
        </p>
      </div>
    ))}
  </div>
);

export default function Hero() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    investmentAmt: "",
    city: "",
  });

  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  // Add this - to track if reCAPTCHA is already rendered
  const recaptchaRendered = useRef(false);

  useEffect(() => {
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
        const timeDifference = Date.now() - lastSubmissionTime;
        const hoursPassed = timeDifference / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          setSubmissionCount(0);
          localStorage.setItem("formSubmissionCount", "0");
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        } else {
          setSubmissionCount(storedCount);
          if (storedCount >= 3) {
            setIsDisabled(true);
          }
        }
      } else {
        setSubmissionCount(storedCount);
      }
    }

    return () => {
      // Cleanup script if needed
      const script = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
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

    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );
      setIsDisabled(true);
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
  // Don't set isLoading false here yet - we'll do it after API call
  
  try {
    const notesArray = [];
    if (formData.city) notesArray.push(`City: ${formData.city}`);
    if (formData.investmentAmt)
      notesArray.push(`Investment Amount: ${formData.investmentAmt}`);
    const notes = notesArray.join(" | ");

    const response = await fetch("https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
      },
      body: JSON.stringify({
        fields: {
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          notes: notes,
          source: "BookMyAssets Taboola Ads",
        },
        source: "BookMyAssets Taboola Ads",
        tags: ["Dholera Investment", "Website Lead", "Bulk Land"],
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
          investmentAmt: "",
          city: "",
        });
        setShowPopup(true);

        const newCount = submissionCount + 1;
        setSubmissionCount(newCount);
        if (typeof window !== "undefined") {
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form",
          page_name: "BookMyAssets Taboola Page",
        });
      } else {
        console.log("Response Text:", responseText);
        setErrorMessage("Submission received but with unexpected response");
      }
    } else {
      console.error("Server Error:", responseText);
      throw new Error(responseText || "Submission failed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setErrorMessage(`Error submitting form: ${error.message}`);
  } finally {
    setIsLoading(false);

    if (window.grecaptcha && recaptchaRef.current) {
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

  // FIX: Check if reCAPTCHA is already rendered by checking innerHTML
  if (!recaptchaRef.current.innerHTML) {
    try {
      window.grecaptcha.render(recaptchaRef.current, {
        sitekey: siteKey,
        callback: onRecaptchaSuccess,
        size: "invisible",
        theme: "dark",
      });
      // Execute after a small delay to ensure rendering is complete
      setTimeout(() => {
        window.grecaptcha.execute();
      }, 100);
    } catch (error) {
      console.error("Error rendering reCAPTCHA:", error);
      setErrorMessage("Error with verification. Please try again.");
      setIsLoading(false);
    }
  } else {
    // Already rendered, just execute
    window.grecaptcha.execute();
  }
};

  const formProps = {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    isDisabled,
    errorMessage,
    recaptchaRef,
    recaptchaLoaded,
  };

  return (
    <div id="hero">
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-xl">
            <h2 className="text-xl font-bold text-black mb-2">Thank You!</h2>
            <p className="text-gray-600 text-sm mb-4">
              Our team will get back to you shortly.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="relative w-full h-screen aspect-[3/1] hidden md:block">
        <Image
          src={img1}
          alt="Dholera Smart City Plots"
          fill
          className="object-cover w-full h-screen"
          priority
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/30 to-black/75" />
        <div className="absolute inset-0 z-20 flex items-center justify-between max-w-7xl mx-auto px-[clamp(.7rem,3.2vw,3.2rem)]">
          <PointsList />
          <FormCard {...formProps} />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="relative w-full min-h-screen">
          <Image
            src={img2}
            alt="Dholera Smart City Plots"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 z-20 flex flex-col px-4 py-6 justify-center gap-4 overflow-y-auto">
            <h1 className="text-white font-bold text-[clamp(1.5rem,6vw,2rem)] leading-tight mb-2">
              Govt Approved Plots in Dholera
              <br />
              <span className="text-[#deae3c]">Starting from ₹8 Lakh</span>
            </h1>

            {points.map((point, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full border border-yellow-500/60 flex items-center justify-center">
                  <span className="text-[#deae3c] text-[0.6rem] font-semibold">
                    ➤
                  </span>
                </div>
                <div>
                  <p className="mt-1 text-white font-medium text-sm leading-snug">
                    {point.title}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-2 border-t border-yellow-600/20 pt-4">
              <FormCard {...formProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}