"use client";
import React, { useState, useEffect } from "react";
import LandingPage from "./body/HeroSlider";
import img1 from "@/assests/ad-page/BenefitsofInvestinginDholeraSIR.webp";
import mimg1 from "@/assests/landing/heroMobile.webp";
import PopupForm from "./components/PopUpForm";
import Dholeravideos from "./body/Videos";
import Ribbon from "./body/Ribbon";
import ProjectSlider from "./projects/page";
import Gallery from "./gallery/page";
import AboutBMA from "./body/About_BMA";
import DholeraLandingPage from "./body/DholeraSIR";
import MegaIndustries from "./body/MegaIndustries";
import WestWyn from "./body/WestWyn";
import TestimonialPagination from "./components/Testimonials";
import ImageZoom from "./components/ImageZoom";

export default function Page() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <title>Get Verified Dholera Smart City Plots with BookMyAssets</title>
      <meta
        name="description"
        content="Secure your Dholera Smart City plot today. Verified AUDA-approved land, future-ready infrastructure, and expert assistance from BookMyAssets."
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera plots, plots in Dholera, Dholera SIR plots, Dholera land investment, Dholera Smart City investment, residential plots in Dholera, industrial plots in Dholera, Dholera real estate, Dholera investment opportunities, dholerainsider, Gujarat smart city plots, DMIC corridor, Investments in Dholera Smart City, dholera latest news, Dholera International Airport, Dholera Solar Park,  Ahmedabad Dholera Expressway, Dholera SIR, Dholera plot prices, Dholera Smart City Projects"
      />
      <div className="overflow-hidden">
        <section>
          <LandingPage
            img1={img1}
            mimg1={mimg1}
            openForm={() => setShowForm(true)}
          />
        </section>
        {/*About Dholera + Major Projects in Dholera + Why Invest in Dholera with BookMyAssets */}
        <DholeraLandingPage />
        {/* Mega Industries crousel */}
        <MegaIndustries />
        {/* Westwyn Estate */}
        {/*         <ProjectSlider/> */}
        <WestWyn />
        {/* About BookMyAssets */}
        <AboutBMA />
        {/* Lead Form */}
        <Ribbon />
        <Gallery />
        <Dholeravideos />
        <TestimonialPagination />
        {/*  <AboutBMA/> */}
        {/* <Westwyn />
        <Ammenties />
        <WhyDholera />
        <WhyInvest />
        <TestimonialPagination />
        <FAQSection />
        <EndSection /> */}
        <PopupForm title="Registry Ready Plots Under ₹10 Lakh in Dholera" />
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
