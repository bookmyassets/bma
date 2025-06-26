"use client";
import HomeSlider from "./components/HeroSlider";
import img1 from "@/assests/heroBMA.webp";
import mimg1 from "@/assests/heroMobile.webp";
import ShortsSection from "./components/YouTube";
import ParallaxSection from "./components/Parallex";
import FAQSection from "./components/Faq";
import BrowseBlogsSection from "./components/BrowseBlogs";
import TestimonialPagination from "./components/Testimonials";
import WhyChooseSection from "./components/Why";
import DholeraInvestmentPage from "./components/BMA";
import Link from "next/link";
import { useState } from "react";
import Popup from "./components/Pop";


export default function Home() {
  const canonicalUrl = `https://www.bookmyassets.com/`;
  const [showpopForm, setpopShowForm] = useState(false);

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <title>Register-Ready Plots | Secure Investments – BookMyAssets</title>
      <meta
        name="description"
        content="Invest securely with BookMyAssets – register-ready plots with N.A. NOC & title clearance. Hassle-free residential property investment awaits you"
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera Smart City Project, Dholera Gujarat India, Dholera SIR, Dholera Residential Plots, Dholera SIR Residential Plots, Special Investment Region, Dholera Land Price, Investment in Dholera Smart City"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            name: "BookMyAssets",
            alternateName: "BMA",
            url: "https://www.bookmyassets.com/",
            logo: "https://www.bookmyassets.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBmalogo.ab09adfe.png&w=96&q=75",
            address: {
              "@type": "PostalAddress",
              streetAddress: "620, JMD Megapolis, Sohna Rd, Sector 48,",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.facebook.com/people/Bookmyassets/61556534554379/",
              "https://www.instagram.com/bookmyassets/",
              "https://www.youtube.com/@BookMyAssets",
              "https://x.com/BookMyAssets",
              "https://www.linkedin.com/company/bookmyassetss",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Book My Assets",
            url: "https://www.bookmyassets.com/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.bookmyassets.com/search?q={search_term_string}{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "BookMyAssets",
            url: "https://www.bookmyassets.com",
            logo: "https://www.bookmyassets.com/assets/images/logo.png",
            image:
              "https://www.bookmyassets.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout.d8188d06.webp&w=640&q=75",
            priceRange: "from ₹10 Lakhs",
            telephone: "+91 97 1767 1112",
            address: {
              "@type": "PostalAddress",
              streetAddress: "620, JMD Megapolis, Sohna Rd, Sector 48,",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            areaServed: {
              "@type": "Place",
              name: "Dholera Smart City",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is Dholera Smart City Completed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera Smart City is still under development, with Phase 1 expected to be completed by 2025. The city is being developed as India’s first greenfield smart city under the Delhi-Mumbai Industrial Corridor (DMIC). Infrastructure like roads, power, and water supply is progressing rapidly. Full-scale completion is expected by 2040.",
                },
              },
              {
                "@type": "Question",
                name: "Is Dholera Smart City a good investment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Dholera can be a good investment because it is growing fast with government support. Many industries and IT companies are planning to come here. Land prices are low now so early investment may give good returns.",
                },
              },
              {
                "@type": "Question",
                name: "Is Dholera bigger than Delhi?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Dholera Smart City is planned to be larger than Delhi in terms of area. It spans approximately 920 sq km, while Delhi covers around 1,484 sq km, but Delhi includes built-up urban areas. Dholera’s planned urban development area is around 500 sq km, making it one of India’s largest planned cities.",
                },
              },
              {
                "@type": "Question",
                name: "Is Tata investing in Dholera?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the Tata Group has invested in Dholera, particularly in the semiconductor, power, defence, and electronics manufacturing sectors. Tata Power has also expressed interest in renewable energy projects within the smart city. The investments align with the government's push to make Dholera an industrial and tech hub. However, official announcements on the exact scale are still awaited.",
                },
              },
              {
                "@type": "Question",
                name: "What is the distance between Dholera Smart City to Ahmedabad?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera Smart City is approximately 100 km from Ahmedabad. The upcoming Ahmedabad-Dholera Expressway will reduce travel time to around an hour. Additionally, a proposed metro and high-speed rail will further improve connectivity. The region is expected to become a major economic corridor.",
                },
              },
            ],
          }),
        }}
      />
      <div className="">
        <section>
          <HomeSlider img1={img1} mimg1={mimg1} openForm={() => setpopShowForm(true)} />
          
        
          <FAQSection />
        
          <ShortsSection />
        
          <DholeraInvestmentPage />
        </section>
        <section className="my-12">
          {" "}
          <ParallaxSection />
        </section>
        <section>
          <div className="py-16 bg-[#e9b30a] text-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Invest in Your Future?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join the hundreds of satisfied investors who have secured their
                future with prime Dholera properties.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-black text-white py-4 px-8 rounded-md font-bold hover:bg-gray-800 transition-colors">
                  <Link href="/projects/dholera/westwyn-county-wc">
                    Explore Properties
                  </Link>
                </button>
                <button className="bg-white text-black py-4 px-8 rounded-md font-bold hover:bg-gray-100 transition-colors">
                  <Link href="https://wa.me/918130371647">
                    Schedule Consultation
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="my-12">
          {" "}
          {/* Add margin as needed */}
          <WhyChooseSection />
        
          <BrowseBlogsSection />
        </section>

        <TestimonialPagination />
      </div>
      {showpopForm && (
        <Popup
          onClose={() => setpopShowForm(false)}
          title={`Dholera – India’s Safest Investment`}
          buttonName="Limited Plots – Booking Closing Soon"
          className="font-medium"
        />
      )}

    </>
  );
}