import Image from "next/image";
import React from "react";
import ROI from "@/assests/dholera-sir-india-first-semiconductor-hub-image.webp";

export default function DholeraSmartCity() {
  return (
    <div className="bg-white">
      <div
        className="
          flex flex-col md:flex-row
          px-[calc(1rem+2vw)]
          py-[calc(2rem+2vw)]
          gap-6 md:gap-12
          max-w-7xl mx-auto
        "
      >
        {/* Left Section (40%) */}
        <div className="w-full md:w-2/5">
          {/* ✅ clamp() — heading scales fluidly, no breakpoint jumps */}
          <h2
            className="
              text-[clamp(1.5rem,3vw,2rem)]
              font-semibold text-black mb-1 max-sm:pt-4
            "
          >
            India's First Semiconductor Hub
          </h2>
          <h2
            className="
              text-[clamp(1rem,2vw,1.25rem)]
              font-semibold text-[#deae3c] mb-8
            "
          >
            Goldmine for Investors
          </h2>

          {/* ✅ responsive image — aspect-ratio container + fill instead of auto size */}
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={ROI}
              alt="Dholera SIR — India's first semiconductor hub"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Section (60%) */}
        <div className="w-full md:w-3/5 space-y-6 pt-4">
          {[
            {
              title: "Dholera Smart City",
              body: "Dholera Smart City is India's first greenfield smart city, designed with world class infrastructure and unmatched growth potential. The Dholera project offers prime industrial, commercial, and residential opportunities backed by government support and rapid development. Invest today to be part of a future ready city built for innovation, sustainability, and prosperity.",
            },
            {
              title: "Dholera Project",
              body: "Dholera Smart City is designed to be a global hub of innovation and infrastructure. It features India's second largest International Airport, seamless connectivity through the Ahmedabad–Dholera Expressway, and iconic projects like the ABCD Building, TATA's ₹91,000 crore Semiconductor Plant, ReNew Power's green energy investment, and one of the world's largest Solar Power Parks.",
            },
            {
              title: "Strategic Location",
              body: "Dholera is located at the heart of Gujarat, in Ahmedabad district about 109 km by road (45 minutes via Ahmedabad Expressway). It is part of the Dholera Special Investment Region (SIR) under the Delhi–Mumbai Industrial Corridor (DMIC) project, with excellent connectivity to Rajkot 170 km, Bhavnagar 65 km, and Vadodara 130 km.",
            },
          ].map(({ title, body }) => (
            <div key={title}>
              {/* ✅ clamp() — subheadings scale between 1rem and 1.25rem */}
              <h3
                className="
                  text-[clamp(1rem,2vw,1.25rem)]
                  font-bold text-black mb-2
                "
              >
                {title}
              </h3>
              {/* ✅ clamp() — body text stays readable on all screen sizes */}
              <p
                className="
                  text-[clamp(0.875rem,1.5vw,1rem)]
                  text-gray-600 leading-relaxed
                "
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}