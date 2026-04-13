"use client";
import React, { useState } from "react";
import PopupForm from "./components/PopUpForm";
import Dholeravideos from "./body/Videos";
import Ribbon from "./body/Ribbon";
import Gallery from "./gallery/page";
import AboutBMA from "./body/About_BMA";
import DholeraLandingPage from "./body/DholeraSIR";
import MegaIndustries from "./body/MegaIndustries";
import TestimonialPagination from "./components/Testimonials";
import NewSection from "./body/NewSection";
import LegalClarity from "./body/LegalClarity";
import WhyNCRInvestors from "./body/WhyNCR";
import Hero from "./body/Hero";
import Whatsapp from "./components/WhatsAppCirle";
import FAQSection from "./body/FAQs";

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
          <Hero />
        </section>
        {/*About Dholera + Major Projects in Dholera + Why Invest in Dholera with BookMyAssets */}
        <DholeraLandingPage />
        <NewSection />
        <Ribbon />
        <AboutBMA />
        {/*  <LegalClarity/> */}
        {/* Mega Industries crousel */}
        <MegaIndustries />
        {/* <WhyNCRInvestors/> */}
        {/* Lead Form */}
        <Gallery />

        <TestimonialPagination />
        <FAQSection />
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
