// Hero.jsx
"use client";
import React, { useEffect, useState } from "react";
import HeroForm from "./HeroForm";

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  // Check submission limit on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCount = parseInt(
        localStorage.getItem("heroFormSubmissionCount") || "0",
        10,
      );
      const lastSubmissionTime = parseInt(
        localStorage.getItem("heroFormLastSubmissionTime") || "0",
        10,
      );

      if (lastSubmissionTime) {
        const timeDifference = Date.now() - lastSubmissionTime;
        const hoursPassed = timeDifference / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          setSubmissionCount(0);
          localStorage.setItem("heroFormSubmissionCount", "0");
          localStorage.setItem(
            "heroFormLastSubmissionTime",
            Date.now().toString(),
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
  }, []);

  const updateSubmissionCount = () => {
    const newCount = submissionCount + 1;
    setSubmissionCount(newCount);
    if (typeof window !== "undefined") {
      localStorage.setItem("heroFormSubmissionCount", newCount.toString());
      localStorage.setItem("heroFormLastSubmissionTime", Date.now().toString());
    }
    if (newCount >= 20) {
      setIsDisabled(true);
    }
  };

  const handleFormSuccess = () => {
    setShowPopup(true);
    updateSubmissionCount();
  };

  return (
    <div id="hero">
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-xl">
            <h2 className="text-xl font-bold text-black mb-2">Thank You!</h2>
            <p className="text-gray-600 text-sm mb-4">
              Our team will get back to you shortly.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#ddbc69] hover:bg-[#ddbc69] text-black font-semibold px-6 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <section aria-labelledby="hero-form-title" className="relative isolate mt-4 min-h-[100svh] w-full overflow-hidden bg-[#151f28] sm:mt-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/videos/landing-page-hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20 md:bg-gradient-to-r md:from-black/35 md:via-black/10 md:to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 content-normal items-end px-4 pb-[calc(72px+env(safe-area-inset-bottom))] pt-[88px] sm:px-8 sm:pt-[120px] lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-16 lg:px-10 lg:pb-16 lg:pt-[140px]">
          <div className="hidden min-w-0 max-w-2xl [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] lg:block">
            <h1 id="hero-title" className="text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-[1.12] tracking-tight text-white">Buy a Plot in Dholera &amp; Earn Up to ₹30,000 Monthly Rental Income</h1>
            <p className="mt-5 text-[clamp(1.5rem,2.8vw,2.5rem)] font-semibold text-[#ddbc69]">Starting from ₹8,000/sq. yd.</p>
            <p className="mt-4 max-w-lg text-md leading-relaxed text-white">Clear Title | NA/NOC | Plan Pass | Immediate Possession | Registry Ready</p>
            <a href="#hero-form-title" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#ddbc69] px-5 py-3 font-semibold text-black [text-shadow:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Get Plot Details</a>
          </div>
          <div className="mt-auto w-full min-w-0 max-w-lg justify-self-center lg:mt-0 lg:max-w-[420px] lg:justify-self-end">
            <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
          </div>
        </div>
      </section>
    </div>
  );
}
