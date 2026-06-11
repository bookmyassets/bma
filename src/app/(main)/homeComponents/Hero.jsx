"use client";
import Image from "next/image";
import React from "react";
import img1 from "@/assests/ad-page/hero/residential-plots-in-dholera-bookmyassets-desktop-banner.webp";
import img2 from "@/assests/ad-page/hero/residential-plots-in-dholera-bookmyassets-mobile-banner.webp";
import HeroForm from "./HeroForm";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

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
  <>
    <div className="flex flex-col gap-[clamp(0.4rem,1vw,0.75rem)] w-[clamp(480px,44vw,680px)]">
      {/* H1 */}
      <h2 className="text-white text-[clamp(1.5rem,5vw,3.75rem)] font-bold leading-[1.1] mb-[clamp(0.5rem,1.25vw,1rem)]">
        Dedicated to Dholera
        <br />
      </h2>

      {/* Body */}
      <p className="text-white text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7] mb-[clamp(0.4rem,1vw,0.75rem)]">
        Simplifying Dholera Before You Book A Plot.
      </p>

      <Link href="/about">
        <p className="bg-[#ddbc69] text-black p-2 w-48 rounded-lg">
          Know More About Us <FaArrowRight className="inline-block ml-1" />
        </p>
      </Link>
    </div>
  </>
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
            <div className="text-white text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] mb-[clamp(0.5rem,1.25vw,1rem)]">
              Dedicated to Dholera
              <br />
            </div>

            <div className="flex gap-[clamp(0.4rem,1.5vw,0.75rem)] items-start">
              <p className="mt-0.5 text-white text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7]">
                Simplifying Dholera Before You Book A Plot.
              </p>
            </div>

            <Link href="/about">
              <p className="bg-[#ddbc69] text-black p-1 w-44 text-[0.875rem] md:text-[1rem] font-semibold leading-[1.4] rounded-lg">
                Know More About Us{" "}
                <FaArrowRight className="inline-block ml-1" />
              </p>
            </Link>

            {/* {points.map((point, i) => (
              <div
                key={i}
                className="flex gap-[clamp(0.4rem,1.5vw,0.75rem)] items-start"
              >
                <div className="mt-0.5 shrink-0 w-[clamp(1rem,3vw,1.2rem)] h-[clamp(1rem,3vw,1.2rem)] rounded-full border border-[#ddbc69]/60 flex items-center justify-center">
                  <span className="text-[#ddbc69] text-[clamp(0.5rem,1.25vw,0.6rem)] font-semibold">
                    ➤
                  </span>
                </div>
                <p className="mt-0.5 text-white text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7]">
                  {point.title}
                </p>
              </div>
            ))} */}

            <div className="mt-[clamp(0.75rem,2vw,1.25rem)] border-t border-[#ddbc69]/20 pt-[clamp(0.75rem,2vw,1.25rem)]">
              <HeroForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

