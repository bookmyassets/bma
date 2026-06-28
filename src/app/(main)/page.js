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

const homeFaqs = [
  {
    question: "What type of plots does BookMyAssets offer in Dholera?",
    answer:
      "We help buyers explore verified residential plot options in and around relevant Dholera growth zones, depending on project availability and buyer requirements.",
  },
  {
    question: "Are these government approved plots?",
    answer:
      "BookMyAssets focuses on plotted opportunities where buyers can review project documents, layout details, and approval-related information before making a decision.",
  },
  {
    question: "Who usually considers buying plots in Dholera?",
    answer:
      "Most enquiries come from long-term investors, retirement-focused buyers, Delhi NCR families, and NRIs who want a clear land-holding option.",
  },
  {
    question: "What should I check before buying a plot in Dholera?",
    answer:
      "You should evaluate project location, documentation process, layout planning, road access, pricing structure, and registry process before booking.",
  },
  {
    question: "Is Dholera suitable for short-term investment?",
    answer:
      "Most buyers evaluate Dholera as a long-term land holding opportunity rather than a short-term flip market.",
  },
  {
    question: "Is it safe to invest in Dholera plots right now?",
    answer:
      "Dholera is India's first Greenfield Smart City with strong government backing. Important factors include airport development, expressway connectivity, industrial growth, approval status, title clarity, and immediate registry. Buyers should verify documents carefully before deciding.",
  },
  {
    question: "What is the future potential of Dholera Smart City?",
    answer:
      "Dholera is planned as a major industrial and infrastructure hub with airport, expressway, industrial zones, and manufacturing investments. Future potential depends on development progress, location, approvals, demand, and holding period.",
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
      <title>Buy Residential Plots in Dholera Smart City</title>

      <meta
        name="description"
        content="Buy residential plots in Dholera Smart City, Gujarat. Review project documents, location clarity, and registry-ready plot options with BookMyAssets."
      />
      <link rel="canonical" href={`${SITE_URL}/`} />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "BookMyAssets",
          url: `${SITE_URL}/`,
        }}
      />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BookMyAssets",
          url: `${SITE_URL}/`,
          logo: LOGO_URL,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-8130371647",
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
          sameAs: [
            "https://www.facebook.com/profile.php?id=61583265159985",
            "https://x.com/BookMyAssets",
            "https://www.instagram.com/bookmyassets",
            "https://www.youtube.com/@BookMyAssets",
            "https://www.linkedin.com/company/bookmyassetss/",
          ],
        }}
      />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "BookMyAssets",
          url: SITE_URL,
          logo: LOGO_URL,
          image: LOGO_URL,
          priceRange: "INR",
          telephone: "+91-8130371647",
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
        }}
      />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "BookMyAssets",
          image: LOGO_URL,
          "@id": `${SITE_URL}/#localbusiness`,
          url: SITE_URL,
          telephone: "+91-8130371647",
          priceRange: "INR",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "6th Floor, Unit 620, JMD Megapolis, Badshahpur Sohna Road, Sector 48",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
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
            "https://www.instagram.com/bookmyassets",
            "https://www.youtube.com/@BookMyAssets",
            "https://www.facebook.com/profile.php?id=61583265159985",
            "https://x.com/BookMyAssets",
          ],
        }}
      />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name: "BookMyAssets",
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
        <BMA />
        <HowToBuy />
        <div id="contact">
          <InlineLeadForm
            variant="lead"
            title="Registry Ready Plots in Dholera"
            buttonText="Get A Call Back"
          />
        </div>
        <LatestUpdates />
        <FAQSection />
      </div>

      <PopupLeadForm
        type="time"
        title="Best Investment-Ready Locations in Dholera"
        project="Home-Page"
      />
    </>
  );
}
