import React from "react";
import LandingPage from "./body/HeroSlider";
import img1 from "@/assests/heroBMA.webp";
import mimg1 from "@/assests/heroMobile.webp";
import WhyInvest from "./body/WhyInvest";
import WhyDholera from "./body/WhyDholera";
import Westwyn from "./body/Westwyn";
import FAQSection from "./body/FAQ";

export default function page() {
  return (
    <>
      <div>
        <section>
          <LandingPage img1={img1} mimg1={mimg1} />
        </section>
        <WhyInvest/>
        <WhyDholera/>
        <Westwyn/>
        <FAQSection/>
      </div>
    </>
  );
}
