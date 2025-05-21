import React from "react";
import LandingPage from "./body/HeroSlider";
import img1 from "@/assests/heroBMA.webp";
import mimg1 from "@/assests/landing/heroMobile.webp";
import WhyInvest from "./body/WhyInvest";
import WhyDholera from "./body/WhyDholera";
import Westwyn from "./body/Westwyn";
import FAQSection from "./body/FAQ";
import About from "./body/About";

export default function page() {
  return (
    <>
      <div>
        <section>
          <LandingPage img1={img1} mimg1={mimg1} />
        </section>
        <About/>
        <WhyInvest/>
        <WhyDholera/>
        <Westwyn/>
        <FAQSection/>
      </div>
    </>
  );
}