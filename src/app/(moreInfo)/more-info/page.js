"use client";
import React, { useState, useEffect } from "react";
import LandingPage from "./body/HeroSlider";
import img1 from "@/assests/ad-page/BenefitsofInvestinginDholeraSIR.webp";
import mimg1 from "@/assests/landing/heroMobile.webp";
/* import WhyInvest from "./body/WhyInvest";
import WhyDholera from "./body/WhyDholera";
import Westwyn from "./body/Westwyn";
import FAQSection from "./body/FAQ"; */
import About from "./body/About";
/* import TestimonialPagination from "./body/Testimonials";
import Ammenties from "./body/Ammenties";
import EndSection from "./body/EndSection"; */
import PopupForm from "./components/PopUpForm";
import Dholeravideos from "./body/Videos";
import Ribbon from "./body/Ribbon";
import ProjectSlider from "./projects/page";
import Gallery from "./gallery/page";
import AboutBMA from "./body/AboutBMA";

export default function Page() {
  const [showForm, setShowForm] = useState(false);

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
        <Dholeravideos/>
        <About />
        <Ribbon/>
        <ProjectSlider/>
        <Gallery/>
        <AboutBMA/>
        {/* <Westwyn />
        <Ammenties />
        <WhyDholera />
        <WhyInvest />
        <TestimonialPagination />
        <FAQSection />
        <EndSection /> */}
      </div>

      {showForm && (
        <PopupForm
          onClose={() => setShowForm(false)}
          title={`Exclusive Deal: Own a plot at ₹9,250/sq. yard — hurry, limited units! –  left`}
          buttonName="Speak with a Plot Specialist"
          className="font-medium"
        />
      )}
    </>
  );
}