"use client"
import React, { useState } from 'react'
import Hero from './homeComponents/Hero'
import Dholera from './homeComponents/Dholera'
import BMA from './homeComponents/BMA'
import ShortsSection from './homeComponents/YouTube'
import FAQSection from './homeComponents/FAQs'
import WestWyn from './homeComponents/WestWyn'
import PopupForm from './components/PopUpForm'
import LandingPage from './homeComponents/Hero3'
import InteractiveMap from './homeComponents/InteractiveMap'
import Groundzero from './homeComponents/Groundzero'


export default function page() {

  const [showpopForm, setpopShowForm] = useState(false);

  return (
    <>
    <title>Discover Investment-Ready Plots in Dholera Smart City | BookMyAssets</title>
    
    <meta
        name="description"
        content="Secure your future with BookMyAssets! Hassle-free residential property investment with clear titles and N.A. NOC. Start your journey today!"
      />
   <link
            rel="canonical"
            href={`https://www.bookmyassets.com/`}
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
            priceRange: "from ₹10 Lakh",
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
            mainEntity: [
              {
                "@type": "Question",
                name: "Why is Dholera Smart City the best investment option in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Dholera Smart City Project is part of the ambitious Dholera project in Gujarat, offering world class infrastructure, government backed mega projects, and high appreciation potential, making it one of the best investment options in India.",
                },
              },
              {
                "@type": "Question",
                name: "When will Dholera International Airport start operations?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:       "The Dholera International Airport, a key milestone in the Dholera city development, is expected to start operations by December 2025, boosting passenger and cargo connectivity across India and abroad.",
                },
              },
              {
                "@type": "Question",
                name: "When is the Ahmedabad Dholera Expressway inauguration?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Ahmedabad Dholera Expressway, connecting Ahmedabad to Dholera Smart City in under an hour, is expected to be inaugurated by mid-2025, enhancing accessibility and investment appeal.",
                },
              },
              {
                "@type": "Question",
                name: "What legal documents are required to buy plots in Dholera?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To buy plots in Dholera city, you need a sale deed, NA/NOC clearance, title deed, and valid identification proofs, ensuring secure ownership.",
                },
              },
              {
                "@type": "Question",
                name: "How much do I need to invest in Dholera Smart City?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Investment in Dholera residential plots starts from around ₹8 lakhs, depending on plot size, location, and the stage of project development.",
                },
              },
            ],
          }),
        }}
      /> 
      
    <div>
       <LandingPage openForm={() => setpopShowForm(true)} />
       {/* <Hero openForm={() => setpopShowForm(true)} /> */}
       <Dholera/>
       <BMA/>
       <WestWyn/>
       <div>

       <InteractiveMap/>
       </div>
       <ShortsSection/>
       <Groundzero/>
       <FAQSection/>
    </div>
    {/* {showpopForm && (
        <PopupForm
          onClose={() => setpopShowForm(false)}
          title={`Dholera – India’s Safest Investment`}
          buttonName="Limited Plots – Booking Closing Soon"
          className="font-medium"
        />
        )} */}
        <PopupForm title="Identify the best investment-ready locations in Dholera."/>
    </>
  )
}