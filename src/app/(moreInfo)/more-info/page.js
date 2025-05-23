import React from "react";
import LandingPage from "./body/HeroSlider";
import img1 from "@/assests/heroBMA.webp";
import mimg1 from "@/assests/landing/heroMobile.webp";
import WhyInvest from "./body/WhyInvest";
import WhyDholera from "./body/WhyDholera";
import Westwyn from "./body/Westwyn";
import FAQSection from "./body/FAQ";
import About from "./body/About";
import TestimonialPagination from "./body/Testimonials";
import Ammenties from "./body/Ammenties";
import EndSection from "./body/EndSection";

export default function page() {
  return (
    <>
      <div>
        <section>
          <LandingPage img1={img1} mimg1={mimg1} />
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
    </>
  );
}