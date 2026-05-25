import Image from "next/image";
import React from "react";
import ROI from "@/assests/dholera-sir-india-first-semiconductor-hub-image.webp";
import Link from "next/link";

const highlights = [
  {
    title: "India’s first Special Investment Region (SIR)",
    body: "Dholera is planned with advanced smart city standards, focusing on sustainability, efficient urban design, and modern infrastructure.",
  },
  {
    title: "Smart planned city",
    body: "The city offers ready-to-use infrastructure like roads, power, water, and ICT systems, making it easier for development and operations.",
  },
  {
    title: "Govt-backed project",
    body: "The project is supported by both central and state governments, ensuring planned growth, policy support, and long-term development.",
  },
  {
    title: "Near Dholera International Airport",
    body: "Large-scale investments are planned and committed, reflecting strong interest from global players and industrial sectors.",
  },
  {
    title: "Connected by Ahmedabad-Dholera Expressway",
    body: "Dholera is the first project under the Special Investment Region (SIR) Act, enabling structured planning and large-scale development.",
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
      <span className="text-[clamp(0.875rem,2vw,1.125rem)] font-bold leading-snug text-gray-300 transition-colors duration-200">
        {title}
      </span>
    </button>
  );
}

export default function DholeraSmartCity() {

   const locationFeatures = [
     { text: "India’s First Special Investment Region" },
     { text: "Smart planned city" },
     { text: "Govt-backed project" },
     { text: "Near Dholera International Airport" },
     { text: "Connected by Ahmedabad-Dholera Expressway" },
  ];

  return (
    <section className="bg-black">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2.5rem)] py-[clamp(2rem,5vw,3.5rem)]">
        {/* Section heading */}
        <h2 className="text-[clamp(1.25rem,2.5vw,2rem)] font-semibold text-white text-center mb-[clamp(1rem,2.5vw,1.75rem)] leading-snug">
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
            <p className="text-[clamp(0.875rem,2vw,1.125rem)] text-gray-300 leading-relaxed">
              <Link
                href="https://www.bookmyassets.com/about-dholera-sir"
                title="Dholera Smart City"
                className="text-[#deae3c] hover:underline"
              >
                Dholera Smart City
              </Link>{" "}
              is a planned smart city in Gujarat, India, developed as part of
              the Delhi-Mumbai Industrial Corridor (DMIC). It is India’s first
              greenfield smart city, building from scratch with modern
              infrastructure and proper planning. The city is designed to become
              a major industrial, manufacturing, and technology hub, with
              sectors like semiconductors, renewable energy, data centres, and
              logistics.
              
            </p>

            {/* 3×2 highlight cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left mb-6">
                  {locationFeatures.map((feature, index) => {
                    const isLast = index === locationFeatures.length - 1;
                    const isOdd = locationFeatures.length % 2 !== 0;

                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 ${isLast && isOdd ? "md:col-span-2" : ""}`}
                      >
                        <span className="text-base text-black leading-snug">
                          ➣ {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
          </div>
        </div>
      </div>
    </section>
  );
}
