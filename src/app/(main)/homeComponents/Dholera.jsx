"use client";
import Image from "next/image";
import React, { useState } from "react";
import ROI from "@/assests/dholera-sir-india-first-semiconductor-hub-image.webp";
import Link from "next/link";

const highlights = [
  {
    title: "India's First Platinum-Rated Smart City",
    body: "Dholera is planned with advanced smart city standards, focusing on sustainability, efficient urban design, and modern infrastructure.",
  },
  {
    title: "Advanced Plug-and-Play Infrastructure",
    body: "The city offers ready-to-use infrastructure like roads, power, water, and ICT systems, making it easier for development and operations.",
  },
  {
    title: "Strong Government-Backed Development",
    body: "The project is supported by both central and state governments, ensuring planned growth, policy support, and long-term development.",
  },
  {
    title: "₹6 Lakh Crore+ Investment by Global & Fortune 500 Companies",
    body: "Large-scale investments are planned and committed, reflecting strong interest from global players and industrial sectors.",
  },
  {
    title: "First City Developed Under the SIR Act in India",
    body: "Dholera is the first project under the Special Investment Region (SIR) Act, enabling structured planning and large-scale development.",
  },
  {
    title: "Global Industrial & Manufacturing Hub (Part of DMIC & DFC)",
    body: "Strategically located within the Delhi-Mumbai Industrial Corridor and Dedicated Freight Corridor, boosting logistics and industrial growth.",
  },
];

function HighlightCard({ title, body }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen((p) => !p)}
      className={`
        text-left w-full rounded-lg border transition-all duration-250 p-[clamp(0.75rem,1.5vw,1rem)]
        ${open
          ? "border-[#deae3c] bg-[#deae3c]/5"
          : "border-gray-200 bg-white hover:border-[#deae3c]/60 hover:bg-[#deae3c]/5"
        }
      `}
    >
      <span className={`text-[clamp(0.75rem,1.2vw,0.875rem)] font-semibold leading-snug transition-colors duration-200 ${open ? "text-[#c49b2e]" : "text-black"}`}>
        {title}
      </span>

      {/* Body — grid-rows trick for smooth expand */}
      <span
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.26s ease",
        }}
      >
        <span className="overflow-hidden">
          <span className="text-[clamp(0.75rem,1.1vw,0.8125rem)] text-gray-500 leading-relaxed mt-2">
            {body}
          </span>
        </span>
      </span>
    </button>
  );
}

export default function DholeraSmartCity() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center px-[calc(1rem+2vw)] py-[calc(0.5rem+2vw)] max-sm:py-[calc(1rem+2vw)]">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-black mb-1 max-sm:pt-4">
          India's First Semiconductor Hub in{" "}
          <span className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-[#deae3c]">
            {" "}Dholera Smart City
          </span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row px-[calc(1rem+2vw)] max-w-7xl mx-auto gap-6 md:gap-8">
        {/* Left — 40% */}
        <div className="w-full md:w-2/5 md:pb-4">
          <div className="relative w-full aspect-[5/4] rounded-lg overflow-hidden ">
            <Image
              src={ROI}
              alt="Dholera SIR — India's first semiconductor hub"
              fill
              sizes=""
              className="object-contain aspect-[5/4] h-full w-auto"
              priority
            />
          </div>
        </div>

        {/* Right — 60% */}
        <div className="w-full md:w-3/5 space-y-6">
          <div>
            <h3 className="text-[clamp(1rem,2vw,1.25rem)] md:text-[clamp(1.5rem,2vw,1.7rem)] font-bold text-black mb-2">
              Why Long-Term Investors Are Watching Dholera
            </h3>
            <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-gray-600 leading-relaxed">
              <Link href="https://www.bookmyassets.com/about-dholera-sir/infrastructure-development" title="Dholera Smart City" className="text-[#deae3c]">Dholera Smart City</Link> is India's first greenfield smart city, designed with world class
              infrastructure and unmatched growth potential. The <Link href="https://www.bookmyassets.com/dholera-sir-blogs/dholera-sir-pm-narendra-modi-dream-smart-city-project" title="Dholera Project" className="text-[#deae3c]">Dholera project</Link> offers prime
              industrial, commercial, and residential opportunities backed by government support and
              rapid development. Invest today to be part of a future ready city built for innovation,
              sustainability, and prosperity.
            </p>
          </div>

          {/* 3×2 highlight cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pb-2 md:pb-4">
            {highlights.map((item) => (
              <HighlightCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}