import Image from "next/image";
import React from "react";
import ROI from "@/assests/dholera-sir-india-first-semiconductor-hub-image.webp";
import Link from "next/link";

const highlights = [
  {
    title: "India's First Special Investment Region (SIR)",
    body: "Dholera is planned with advanced smart city standards, focusing on sustainability, efficient urban design, and modern infrastructure.",
  },
  {
    title: "Backed by State and Central Governments",
    body: "The city offers ready-to-use infrastructure like roads, power, water, and ICT systems, making it easier for development and operations.",
  },
  {
    title: "₹6 Lakh Crore Investment by Fortune 500 Companies",
    body: "The project is supported by both central and state governments, ensuring planned growth, policy support, and long-term development.",
  },
  {
    title: "Plug-and-Play Infra for Quick Industrial Setup",
    body: "Large-scale investments are planned and committed, reflecting strong interest from global players and industrial sectors.",
  },
  {
    title: "Planned to be a Global Manufacturing Hub",
    body: "Dholera is the first project under the Special Investment Region (SIR) Act, enabling structured planning and large-scale development.",
  },
  {
    title: "100% Land Appreciation in Last 5 Years",
    body: "Strategically located within the Delhi-Mumbai Industrial Corridor and Dedicated Freight Corridor, boosting logistics and industrial growth.",
  },
];

function HighlightCard({ title }) {
  return (
    <button
      className="
        text-left w-full rounded-lg border transition-all duration-250
        p-[clamp(0.5rem,1.25vw,0.875rem)]
        border-[#deae3c] bg-[#deae3c]/5 hover:bg-[#deae3c]/10 hover:border-[#deae3c]/70
      "
    >
      <span className="text-[clamp(0.875rem,2vw,1.125rem)] font-bold leading-snug text-gray-800 transition-colors duration-200">
        {title}
      </span>
    </button>
  );
}

export default function DholeraSmartCity() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2.5rem)] py-[clamp(2rem,5vw,3.5rem)]">
        {/* Section heading */}
        <h2 className="text-[clamp(1.25rem,2.5vw,2rem)] font-semibold text-black text-center mb-[clamp(1rem,2.5vw,1.75rem)] leading-snug">
          Invest in India's First Semiconductor City:{" "}
          <span className="text-[#deae3c]">Dholera Smart City</span>
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-[clamp(1.25rem,3vw,2rem)]">
          {/* Left — image 40% */}
          <div className="w-full md:w-2/5">
            <div className="relative w-full aspect-[5/4] rounded-lg overflow-hidden">
              <Image
                src={ROI}
                alt="Dholera SIR — India's first semiconductor hub"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-contain h-full w-auto"
                priority
              />
            </div>
          </div>

          {/* Right — content 60% */}
          <div className="w-full md:w-3/5 flex flex-col justify-center gap-[clamp(0.75rem,2vw,1.25rem)]">
            {/* Body paragraph */}
            <p className="text-[clamp(0.875rem,2vw,1.125rem)] text-gray-600 leading-relaxed">
              <Link
                href="https://www.bookmyassets.com/about-dholera-sir/infrastructure-development"
                title="Dholera Smart City"
                className="text-[#deae3c] hover:underline"
              >
                Dholera Smart City
              </Link>{" "}
              is India's first platinum-rated greenfield smart city, designed
              with world-class infrastructure and planned to become a global
              manufacturing and exports hub. For long-term investors, the{" "}
              <Link
                href="https://www.bookmyassets.com/dholera-sir-blogs/dholera-sir-pm-narendra-modi-dream-smart-city-project"
                title="Dholera Project"
                className="text-[#deae3c] hover:underline"
              >
                Dholera project
              </Link>{" "}
              offers an excellent opportunity to invest in residential plots and
              earn consistent land appreciation. Here is what makes Dholera
              Smart City different from other investments:
            </p>

            {/* 3×2 highlight cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(0.5rem,1.5vw,0.875rem)]">
              {highlights.map((item) => (
                <HighlightCard
                  key={item.title}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
