import React from "react";
import Hero from "./body/Hero";
import WhyDholera from "./body/WhyDholera";
import DholeraScaleConnectivity from "./body/DholeraScaleConnectivity";
import Residency from "./body/Residency";
import Amenities from "./body/Amenities";
import Form from "./components/Form";
import InlineLeadForm from "@/app/(main)/components/InlineLeadForm";
import WhyBMA from "./body/WhyBMA";
import MegaIndustries from "@/components/MegaIndustries";
import TestimonialPagination from "./body/Testimonials";
import Footer from "./body/Footer";
import FAQSection from "./body/FAQs";

export default function page() {
  return (
    <>

      <div>
        <Hero />
        <Residency />
        <Amenities />
        <WhyDholera />
        <DholeraScaleConnectivity />
        <div id="expert-guidance" className="scroll-mt-24">
          <InlineLeadForm
            variant="common"
            theme="light"
            layout="inline"
            size="compact"
            headingTag="h2"
            title="Own a Plot in Dholera & Unlock Up to ₹30,000/Month"
            buttonText="Get Verified Plot Details"
            source="BookMyAssets Taboola Inline Form"
            tags={["Dholera Investment", "Website Lead", "Taboola Inline"]}
            pageName="Plots for Sale in Dholera"
          />
        </div>
        <WhyBMA />
        <MegaIndustries id="industries" variant="light" />
        <TestimonialPagination />
        <FAQSection />
        <Footer />
      </div>
      <Form title="Own a Plot in Dholera & Unlock Up to ₹30K/Month" />
    </>
  );
}
