"use client"
import React, { useState } from "react";
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
import ContactForm from "./components/BrochureForm";

export default function page() {

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div>
        <section>
          <LandingPage img1={img1} mimg1={mimg1} openForm={() => setShowForm(true)} />
        </section>
        <About/>
        <Westwyn/>
        <WhyInvest/>
        <WhyDholera/>
        <Ammenties/>
        <TestimonialPagination/>
        <FAQSection/>
        <EndSection/>
      </div>
      {showForm && (
          <ContactForm
            onClose={() => setShowForm(false)}
            title="Talk to Us Before Plots Run Out!"
            buttonName="Speak with a Plot Specialist"
          />
        )}
    </>
  );
}