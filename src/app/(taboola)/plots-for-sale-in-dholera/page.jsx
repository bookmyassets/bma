import React from "react";
import Hero from "./body/Hero";
import WhyDholera from "./body/WhyDholera";
import DholeraScaleConnectivity from "./body/DholeraScaleConnectivity";
import Residency from "./body/Residency";
import Amenities from "./body/Amenities";
import Form from "./components/Form";
import CTAsection from "./body/CTAsection";
import WhyBMA from "./body/WhyBMA";
import MegaIndustries from "@/components/MegaIndustries";
import TestimonialPagination from "./body/Testimonials";
import Footer from "./body/Footer";
import FAQSection from "./body/FAQs";
import PopupScroll from "./components/PopupScroll";

export default function page() {
  return (
    <>

      <div>
        <Hero />
        <Residency />
        <Amenities />
        <WhyDholera />
        <DholeraScaleConnectivity />
        <WhyBMA />
        <MegaIndustries variant="light" />
        <CTAsection
          text1="Get Expert Guidance for"
          text2="Dholera Plots"
          subTitle="Have questions about Dholera investments? Our team is here to guide you."
        />

        <TestimonialPagination />
        <FAQSection />
        <Footer />
      </div>
      <PopupScroll />
      <Form title="Registry Ready Plots Under ₹10 Lakh in Dholera" />
    </>
  );
}
