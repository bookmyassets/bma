// Hero.jsx
"use client";
import React, { useEffect, useState } from "react";
import HeroForm from "./HeroForm";

const PointsList = () => (
  <div className="min-w-0 max-w-2xl [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3dc9c] sm:text-sm">Your next investment in Dholera</p>
    <h1 id="hero-title" className="text-[clamp(2.25rem,4.2vw,4rem)] font-semibold leading-[1.12] tracking-tight text-white">
      Residential Plots<br className="hidden sm:block" /> in Dholera
      <span className="mt-4 block text-[clamp(1.5rem,2.8vw,2.5rem)] text-[#ddbc69]">Starting from &#8377;10 Lakh</span>
    </h1>
    <p className="mt-6 max-w-lg text-base leading-relaxed text-white sm:text-lg">
      Explore premium plotted opportunities with BookMyAssets. Get the brochure, pricing and location details to plan your investment.
    </p>
  </div>
);

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

      <section aria-labelledby="hero-title" className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#151f28]">
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

        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-10 pt-[116px] sm:px-8 sm:pb-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16 lg:px-10 lg:pb-16 lg:pt-[140px]">
          <PointsList />
          <div className="w-full min-w-0 max-w-lg justify-self-center lg:justify-self-end">
            <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
          </div>
        </div>
      </section>
    </div>
  );
}
