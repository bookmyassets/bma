"use client";
import React, { useState, useEffect } from "react";
import LandingPage from "./body/HeroSlider";
import img1 from "@/assests/landing/heroDesktop.webp";
import mimg1 from "@/assests/landing/heroMobile.webp";
import WhyInvest from "./body/WhyInvest";
import WhyDholera from "./body/WhyDholera";
import Westwyn from "./body/Westwyn";
import FAQSection from "./body/FAQ";
import About from "./body/About";
import TestimonialPagination from "./body/Testimonials";
import Ammenties from "./body/Ammenties";
import EndSection from "./body/EndSection";
import PopupForm from "./components/PopUpForm";

export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); 

  useEffect(() => {
  let timer; 

  if (showForm) {
    setTimeLeft(1800);

    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => clearInterval(timer); // Cleanup
}, [showForm]);


  const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};


  return (
    <>
      <div>
        <section>
          <LandingPage
            img1={img1}
            mimg1={mimg1}
            openForm={() => setShowForm(true)}
          />
        </section>
        <About />
        <Westwyn />
        <WhyInvest />
        <WhyDholera />
        <Ammenties />
        <TestimonialPagination />
        <FAQSection />
        <EndSection />
      </div>

      {showForm && (
        <PopupForm
          onClose={() => setShowForm(false)}
          title={`Exclusive Deal: Own a plot at ₹9,250/sq. yard — hurry, limited units! – ${formatTime(timeLeft)} left`}
          buttonName="Speak with a Plot Specialist"
          className="font-medium"
        />
      )}
    </>
  );
}