import FloatingButtons from "./components/whatsapp";
import HomeSlider from "./components/HeroSlider";
import img1 from "@/assests/banner.webp";
import img2 from "@/assests/banner2.webp";
import img3 from "@/assests/banner3.webp";
import img4 from "@/assests/banner4.webp";
import mimg1 from "@/assests/mb1.webp";
import mimg2 from "@/assests/mb2.webp";
import mimg3 from "@/assests/mb3.webp";
import mimg4 from "@/assests/mb4.webp";
import ShortsSection from "./components/YouTube";
import ParallaxSection from "./components/Parallex";
import FAQSection from "./components/Faq";
import BrowseBlogsSection from "./components/BrowseBlogs";
import TestimonialPagination from "./components/Testimonials";
import WhyChooseSection from "./components/Why";
import DholeraInvestmentPage from "./components/BMA";

export async function generateMetadata() {
  return {
    title: "Dholera Smart City - Invest in Affordable Plots Today", // Use the fetched post's title for dynamic title
    description:
      "Explore the Dholera Smart City and find affordable plot prices. Invest in Gujarat's first smart city for high ROI and future growth.", // Same for description
    canonical: `https://www.bookmyassets.com/`,
    keywords:
      "Dholera Smart City, Dholera Smart City Project, Dholera Gujarat India, Dholera SIR, Dholera Residential Plots, Dholera SIR Residential Plots, Special Investment Region, Dholera Land Price, Investment in Dholera Smart City",
  };
}

export default async function Home() {

   const canonicalUrl = `https://www.bookmyassets.com/`

  return (
    <>
      <link rel="canonical" href={canonicalUrl}/>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BookMyAssets",
            alternateName: "BMA",
            url: "https://www.bookmyassets.com",
            logo: "https://www.bookmyassets.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBmalogo.ab09adfe.png&w=96&q=75",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91 81 3037 1647",
              contactType: "sales",
              areaServed: "IN",
              availableLanguage: "en",
            },
            sameAs: [
              "https://www.facebook.com/people/Bookmyassets/61556534554379/",
              "https://www.instagram.com/bookmyassets/",
              "https://www.youtube.com/@BookMyAssets",
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
            description:
              "Preferred real estate IPA in Gurgaon offering commercial and residential properties in Dholera Smart City.",
            areaServed: "IN",
            telephone: "+91 97 1767 1112",
            email: "info@bookmyassets.com",
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
      <div className=" overflow-hidden">
        <section>
          <HomeSlider
            img1={img1}
            img2={img2}
            img3={img3}
            img4={img4}
            mimg1={mimg1}
            mimg2={mimg2}
            mimg3={mimg3}
            mimg4={mimg4}
          />
        </section>

        <section>
          <FAQSection />
        </section>

        <section>
          <ShortsSection />
        </section>

        <section>
          <DholeraInvestmentPage />
        </section>

        {/* Parallax section appears here, after ShortsSection */}
        <section className="my-12">
          {" "}
          {/* Add margin as needed */}
          <ParallaxSection />
        </section>
        <section className="my-12">
          {" "}
          {/* Add margin as needed */}
          <WhyChooseSection />
        </section>

        <section>
          <BrowseBlogsSection />
        </section>
        <TestimonialPagination />
        <FloatingButtons />
      </div>
    </>
  );
}