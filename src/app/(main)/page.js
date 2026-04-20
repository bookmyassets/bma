"use client";
import React, { useState } from "react";
import Dholera from "./homeComponents/Dholera";
import BMA from "./homeComponents/BMA";
import ShortsSection from "./homeComponents/YouTube";
import FAQSection from "./homeComponents/FAQs";
import WestWyn from "./homeComponents/WestWyn";
import PopupForm from "./components/PopUpForm";
import Hero from "./homeComponents/Hero";
import LatestUpdates from "./homeComponents/Latest";
import LeadForm from "./components/LeadForm";
import MegaIndustries from "./homeComponents/MegaIndustries";
import HowToBuy from "./homeComponents/BuyingProcess";

export default function page() {
  const [showpopForm, setpopShowForm] = useState(false);

  return (
    <>
      <title>
        Discover Investment-Ready Plots in Dholera Smart City | BookMyAssets
      </title>

      <meta
        name="description"
        content="Secure your future with BookMyAssets! Hassle-free residential property investment with clear titles and N.A. NOC. Start your journey today!"
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera plots, plots in Dholera, Dholera SIR plots, Dholera land investment, Dholera Smart City investment, residential plots in Dholera, industrial plots in Dholera, Dholera real estate, Dholera investment opportunities, BookMyAssets, Gujarat smart city plots, DMIC corridor, Investments in Dholera Smart City, dholera latest news, Dholera International Airport, Dholera Solar Park,  Ahmedabad Dholera Expressway, Dholera SIR, Dholera plot prices,Dholera Smart City Project"
      />
      <link rel="canonical" href={`https://www.bookmyassets.com/`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "BookMyAssets",
            url: "https://www.bookmyassets.com/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.bookmyassets.com/dholera-residential-plots/westwyn-residency{search_term_string}",
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
            "@type": "Organization",
            name: "BookMyAssets",
            url: "https://www.bookmyassets.com/",
            logo: "",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "8130371647",
              contactType: "sales",
              areaServed: "IN",
              availableLanguage: ["en", "Hindi"],
            },
            sameAs: [
              "https://www.bookmyassets.com/",
              "https://www.facebook.com/profile.php?id=61583265159985",
              "https://x.com/BookMyAssets",
              "https://www.instagram.com/bookmyassets",
              "https://www.youtube.com/@BookMyAssets",
              "https://www.linkedin.com/company/bookmyassetss/",
            ],
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
            priceRange: "from ₹8 Lakh",
            telephone: "+91 81 30 37 16 47",
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
            name: "BookMyAssets",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is it safe to invest in Dholera plots right now?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera is India’s first Greenfield Smart City with strong government backing, including the international airport, expressway, and industrial developments like the semiconductor ecosystem. However, safety depends on where and how you invest. Many buyers face issues due to unclear titles or unapproved layouts. At BookMyAssets, we focus only on legally verified plots with NA, NOC, Title clearance, and immediate registry, reducing risk significantly. You can also request a full document walkthrough before making any decision.",
                },
              },
              {
                "@type": "Question",
                name: "How do I verify if a plot in Dholera is legally clear?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You should always check NA (Non-Agricultural) status, title clearance, NOC approvals, chain of ownership, and layout approvals. We provide complete documentation support and verification assistance, so you do not have to rely on assumptions or broker claims. Our team can walk you through each document step-by-step.",
                },
              },
              {
                "@type": "Question",
                name: "What documents should I check before buying a plot?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Before investing, you should verify the NA order copy, title clearance report, sale deed history, layout plan approval, and applicable government approvals. We ensure all required documents are available, verified, and transparently shared with every buyer",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide legal verification and documentation support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Documentation clarity is a core part of our process. We assist you with document explanation, legal clarity, registry process, and ownership verification. Our goal is to make sure you invest with full confidence, not confusion.",
                },
              },
              {
                "@type": "Question",
                name: "Is immediate registry available for your plots?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, our selected projects offer immediate registry, which means you get ownership transferred quickly, reduced risk compared to long-term commitments, and clear legal standing from day one. This is one of the key reasons many investors prefer our projects.",
                },
              },
              {
                "@type": "Question",
                name: "What is the future potential of Dholera Smart City?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera is planned as a major industrial and infrastructure hub with an international airport, expressway connectivity, industrial zones, and semiconductor and manufacturing investments. These developments are expected to drive long-term demand and value appreciation.",
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Local Business",
            name: "BookMyAssets",
            image: "",
            "@id": "",
            url: "https://www.bookmyassets.com",
            telephone: "8130371647",
            priceRange: "₹₹",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "6th Floor, Unit - 620, JMD MEGAPOLIS, Badshahpur Sohna Rd Hwy, Sector 48",
              addressLocality: "Gurgaon",
              postalCode: "122018",
              addressCountry: "IN",
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "09:00",
              closes: "21:00",
            },
            sameAs: [
              "https://www.bookmyassets.com/",
              "https://www.instagram.com/bookmyassets",
              "https://www.youtube.com/@BookMyAssets",
              "https://www.facebook.com/profile.php?id=61583265159985",
              "https://x.com/BookMyAssets",
            ],
          }),
        }}
      />

      <div>
        <Hero />
        <Dholera />
        <BMA />
        <WestWyn />
        <HowToBuy/>
        <MegaIndustries/>
        <div className="max-w-7xl mx-auto" id="contact">
          <LeadForm
            title="Invest in Registry Ready Plots in Dholera"
            button="Talk to an Expert"
          />
        </div>
        <LatestUpdates />
        <ShortsSection />
        <FAQSection />
      </div>

      <PopupForm
        title="Best Investment-Ready Locations in Dholera"
        project="Home-Page"
      />
    </>
  );
}
