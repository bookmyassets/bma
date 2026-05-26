import Image from "next/image";
import React from "react";
import ROI from "@/assests/dholera-on-gujarat-map-bookmyassets.webp";
import Link from "next/link";


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
            <div className=" gap-3 text-left ">
              {locationFeatures.map((feature, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-1 rounded-lg text-white hover:border-amber-300 hover:shadow-md transition-all duration-200 `}
                  >
                    <span className="text-base  leading-snug">
                      <span className="text-green-500 px-2">✓</span>{" "}
                      {feature.text}
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
