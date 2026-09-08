import PopupForm from "./components/PopUpForm";
import Ribbon from "./body/Ribbon";
import AboutBMA from "./body/About_BMA";
import DholeraLandingPage from "./body/DholeraSIR";
import MegaIndustries from "./body/MegaIndustries";
import TestimonialPagination from "./components/Testimonials";
import NewSection from "./body/NewSection";
import FAQSection from "./body/FAQs";
import LandingPage from "./body/HeroSection";

export default function Page() {
  return (
    <>
      <title>Dholera Smart City Plots | 100% Govt. Verified | Immediate Possession</title>
      <meta
        name="description"
        content="Invest in AUDA-approved Dholera plots with registry-ready paperwork, site visit assistance, resale support, and expert guidance from BookMyAssets."
      />
      <meta name="robots" content="noindex,nofollow" />

      <meta
        name="keywords"
        content="Dholera Smart City, Dholera plots, plots in Dholera, Dholera SIR plots, Dholera land investment, Dholera Smart City investment, residential plots in Dholera, industrial plots in Dholera, Dholera real estate, Dholera investment opportunities, dholerainsider, Gujarat smart city plots, DMIC corridor, Investments in Dholera Smart City, dholera latest news, Dholera International Airport, Dholera Solar Park,  Ahmedabad Dholera Expressway, Dholera SIR, Dholera plot prices, Dholera Smart City Projects"
      />
      <main className="overflow-hidden bg-[#f8f8f8]">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          <LandingPage />
          <DholeraLandingPage />
          <NewSection />
          <div>
            <Ribbon />
            <AboutBMA />
          </div>
          <MegaIndustries />
          <TestimonialPagination />
          <FAQSection />
          <PopupForm title="Registry Ready Plots Under ₹10 Lakh in Dholera" />
        </div>
      </main>
    </>
  );
}
