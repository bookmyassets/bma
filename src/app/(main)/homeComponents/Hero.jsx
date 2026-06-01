"use client";
import Image from "next/image";
import React from "react";
import img1 from "@/assests/ad-page/hero/residential-plots-in-dholera-bookmyassets-desktop-banner.webp";
import img2 from "@/assests/ad-page/hero/residential-plots-in-dholera-bookmyassets-mobile-banner.webp";
import HeroForm from "./HeroForm";

const points = [
  {
    title: "Registry-Ready",
    desc: "Suitable for buyers exploring high-growth land opportunities in India's first greenfield smart city.",
  },
  {
    title: "Immediate Possession",
    desc: "Focused on long-term planning â€” we guide you through timelines, returns, and exit strategies.",
  },
  {
    title: "High ROI Potential in Next 5 Years",
    desc: "Access maps, master plans, and plot layout walkthroughs before making any decision.",
  },
];

const PointsList = () => (
  <div className="flex flex-col gap-[clamp(0.4rem,1vw,0.75rem)] w-[clamp(480px,44vw,680px)]">
    {/* H1 */}
    <h1 className="text-white font-bold text-[clamp(1.5rem,3vw,3rem)] leading-tight mb-[clamp(0.5rem,1.25vw,1rem)]">
      Govt. Approved Plots in Dholera
      <br />
      <span className="text-[#ddbc69]">Starting from ₹8 Lakh</span>
    </h1>

    {/* Body */}
    <p className="text-white text-[clamp(0.875rem,2vw,1.125rem)] leading-relaxed mb-[clamp(0.4rem,1vw,0.75rem)]">
      Explore premium plotted investment opportunities in Dholera Smart City.
      <br />
      Get brochure, price list, location details, and expert guidance from
      BookMyAssets.
    </p>

    {points.map((point, i) => (
      <div
        key={i}
        className="flex gap-[clamp(0.4rem,1vw,0.75rem)] items-center"
      >
        {/* Icon circle */}
        <div className="shrink-0 w-[clamp(1.1rem,1.5vw,1.35rem)] h-[clamp(1.1rem,1.5vw,1.35rem)] rounded-full border border-[#ddbc69]/60 flex items-center justify-center">
          <span className="text-[#ddbc69] text-[clamp(0.55rem,0.85vw,0.7rem)] font-semibold">
            ➤
          </span>
        </div>
        {/* Point title */}
        <p className="text-white font-medium text-[clamp(0.875rem,2vw,1.125rem)] leading-snug">
          {point.title}
        </p>
      </div>
    ))}
  </div>
);

export default function Hero() {
  return (
    <div id="hero">

      <div className="relative w-full h-screen hidden md:block">
        <Image
          src={img1}
          alt="Dholera Smart City Plots"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-black/30 to-black/55" />

        <div className="absolute inset-0 z-20 flex items-center justify-between max-w-7xl mx-auto px-[clamp(1rem,4vw,2.5rem)]">
          <PointsList />
          <HeroForm />
        </div>
      </div>

      <div className="md:hidden">
        <div className="relative w-full min-h-screen">
          <Image
            src={img2}
            alt="Dholera Smart City Plots"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 z-20 flex flex-col px-[clamp(1rem,4vw,2rem)] py-[clamp(2rem,5vw,3.5rem)] justify-center gap-[clamp(0.4rem,1vw,0.75rem)] overflow-y-auto">
            {/* Visual heading â€” Mobile */}
            <div className="text-white font-bold text-[clamp(1.25rem,4vw,1.75rem)] leading-tight mb-[clamp(0.5rem,1.25vw,1rem)]">
              Dedicated to Dholera
              <br />
              <span className="text-[#ddbc69]">Starting from ₹8 Lakh</span>
            </div>

            {points.map((point, i) => (
              <div
                key={i}
                className="flex gap-[clamp(0.4rem,1.5vw,0.75rem)] items-start"
              >
                <div className="mt-0.5 shrink-0 w-[clamp(1rem,3vw,1.2rem)] h-[clamp(1rem,3vw,1.2rem)] rounded-full border border-[#ddbc69]/60 flex items-center justify-center">
                  <span className="text-[#ddbc69] text-[clamp(0.5rem,1.25vw,0.6rem)] font-semibold">
                    ➤
                  </span>
                </div>
                <p className="mt-0.5 text-white font-medium text-[clamp(0.875rem,2.5vw,1rem)] leading-snug">
                  {point.title}
                </p>
              </div>
            ))}

            <div className="mt-[clamp(0.75rem,2vw,1.25rem)] border-t border-[#ddbc69]/20 pt-[clamp(0.75rem,2vw,1.25rem)]">
              <HeroForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

