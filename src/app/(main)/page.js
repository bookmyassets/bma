import React from "react";
import bmaLogo from "@/assests/bma-logo.png";
import Dholera from "./homeComponents/Dholera";
import BMA from "./homeComponents/BMA";
import FAQSection from "./homeComponents/FAQs";
import WestWyn from "./homeComponents/WestWyn";
import PopupLeadForm from "./components/PopupLeadForm";
import Hero from "./homeComponents/Hero";
import LatestUpdates from "./homeComponents/Latest";
import InlineLeadForm from "./components/InlineLeadForm";
import HowToBuy from "./homeComponents/BuyingProcess";

const SITE_URL = "https://www.bookmyassets.com";
const LOGO_URL = `${SITE_URL}${bmaLogo.src}`;
const SOCIAL_PROFILES = [
  "https://www.facebook.com/profile.php?id=61583265159985",
  "https://x.com/BookMyAssets",
  "https://www.instagram.com/bookmyassets",
  "https://www.youtube.com/@BookMyAssets",
  "https://www.linkedin.com/company/bookmyassetss/",
];

const homeFaqs = [
  {
    question: "Why should I invest in Dholera Smart City?",
    answer:
      "Dholera Smart City is India's first greenfield smart city with major infrastructure projects like the Dholera International Airport, Ahmedabad–Dholera Expressway, and Tata Semiconductor Plant, making it a promising destination for long-term investment.",
  },
  {
    question: "What types of residential plots does BookMyAssets offer in Dholera?",
    answer:
      "BookMyAssets offers legally verified, registry-ready residential plots in prime locations across Dholera with transparent documentation and modern infrastructure.",
  },
  {
    question: "Are BookMyAssets projects legally verified?",
    answer:
      "Yes. All BookMyAssets residential projects come with NA/NOC approvals, clear title documents, plan pass approval, and registry-ready plots for a secure buying experience.",
  },
  {
    question: "Does BookMyAssets provide support after buying a plot?",
    answer:
      "Yes. We provide complete post-purchase support, including registration assistance, villa construction support, resale assistance, rental support, and dedicated customer service.",
  },
  {
    question: "Is immediate registry available for your plots?",
    answer:
      "Yes, our selected projects offer immediate registry, which means you get ownership transferred quickly, reduced risk compared to long-term commitments, and clear legal standing from day one. This is one of the key reasons many investors prefer our projects.",
  },
  {
    question: "Why choose BookMyAssets for investing in Dholera?",
    answer:
      "BookMyAssets offers verified residential projects, transparent documentation, registry-ready plots, site visit assistance, and end-to-end support from booking to villa construction support.",
  },
];

function JsonLd({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function page() {
  return (
    <>
      <title>BookMyAssets | Dholera Smart City Real Estate Developer</title>

      <meta
        name="description"
        content="BookMyAssets is a Dholera-focused real estate developer offering legally verified residential plotted projects, bulk land opportunities and end-to-end support."
      />
      <link rel="canonical" href={`${SITE_URL}/`} />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "BookMyAssets",
          url: `${SITE_URL}/`,
          publisher: {
            "@id": `${SITE_URL}/#organization`,
          },
        }}
      />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "BookMyAssets",
          url: `${SITE_URL}/`,
          logo: {
            "@type": "ImageObject",
            url: LOGO_URL,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-8130371647",
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
          sameAs: SOCIAL_PROFILES,
        }}
      />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": `${SITE_URL}/#real-estate-agent`,
          name: "BookMyAssets",
          image: LOGO_URL,
          logo: LOGO_URL,
          url: `${SITE_URL}/`,
          telephone: "+91-8130371647",
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "6th Floor, Unit 620, JMD Megapolis, Badshahpur Sohna Road, Sector 48",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            postalCode: "122018",
            addressCountry: "IN",
          },
          areaServed: {
            "@type": "Place",
            name: "Dholera Smart City",
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
          sameAs: SOCIAL_PROFILES,
        }}
      />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE_URL}/#faq`,
          mainEntity: homeFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />

      <div>
        <Hero />
        <Dholera />
        <WestWyn />
        {/* <BMA /> */}
        <HowToBuy />
        <LatestUpdates />
        <FAQSection />
      </div>
    </>
  );
}
