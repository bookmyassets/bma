import React from "react";

import dholera from "@/assests/ad-page/section/dholera-smart-city-latest-updates.webp";
import Image from "next/image";

const distances = [
  {
    label: "India's First Planned Smart City",
    value:
      "Dholera SIR is being developed as India's first greenfield smart city under a government-planned initiative.",
  },
  {
    label: "Vision of Hon'ble Prime Minister Shri Narendra Modi",
    value:
      "Dholera SIR is a flagship project envisioned to drive India's next-generation industrial and urban growth.",
  },
  {
    label: "35+ Global Companies already Invested",
    value:
      "Leading global and domestic companies have already committed investments, strengthening Dholera’s industrial ecosystem.",
  },
  {
    label: "₹6 Lakh Crore Investment by Government & Industries",
    value:
      "Massive combined investment by government and private sectors is accelerating infrastructure and economic development.",
  },
  {
    label:
      "Seamless Connectivity through International Airport, Expressway, Railways & Seaport",
    value:
      "Dholera offers world-class connectivity via airport, highways, rail networks, and port access for global trade.",
  },
  {
    label: "#1 Choice of Investors due to High Return Potential",
    value:
      "Dholera is emerging as a preferred destination for investors seeking strong long-term capital appreciation.",
  },
  {
    label: "500% Appreciation in Last 5 Years",
    value:
      "Land values in Dholera have seen significant growth, offering impressive returns for early investors.",
    icon: "🚀",
  },
];

export default function DholeraLandingPage() {
  return (
    <div className="scroll-mt-[100px] bg-white" id="dholera">
      <section className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-4 sm:py-8 md:py-12">
        <div className="mx-auto w-full">
          <h2 className="mb-5 text-center text-[clamp(1.7rem,2.5vw,2.5rem)] font-bold leading-tight tracking-[-0.02em] text-slate-900 sm:mb-6 md:mb-8">
            Invest in India's First Planned Smart City:{" "}
            <span className="text-[#ddbc69]">Dholera SIR</span>
          </h2>

          <div className="grid gap-4 md:gap-5 lg:grid-cols-[1.25fr_0.95fr] lg:items-stretch">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <Image
                src={dholera}
                alt="Dholera Smart City"
                className="h-[270px] w-full object-cover sm:h-[320px] md:h-[360px] lg:h-[420px]"
              />
            </div>

            <div className="rounded-2xl bg-gray-50 p-4 text-base leading-7 text-gray-700 shadow-sm ring-1 ring-slate-200 sm:p-5 lg:p-6">
              <ul className="space-y-3 sm:space-y-3.5">
                <li className="flex items-start gap-3 font-semibold">
                  <span className="mt-1 shrink-0 text-[#ddbc69]">•</span>
                  <span>Special Investment Region (SIR) Act implemented in 2009</span>
                </li>

                <li className="flex items-start gap-3 font-semibold">
                  <span className="mt-1 shrink-0 text-[#ddbc69]">•</span>
                  <span>Vision of Hon'ble Prime Minister Shri Narendra Modi</span>
                </li>

                <li className="flex items-start gap-3 font-semibold">
                  <span className="mt-1 shrink-0 text-[#ddbc69]">•</span>
                  <span>India's First Semiconductor City: TATA Semiconductor Plant</span>
                </li>

                <li className="flex items-start gap-3 font-semibold">
                  <span className="mt-1 shrink-0 text-[#ddbc69]">•</span>
                  <span>35+ Global Companies already Invested</span>
                </li>

                <li className="flex items-start gap-3 font-semibold">
                  <span className="mt-1 shrink-0 text-[#ddbc69]">•</span>
                  <span>₹6 Lakh Crore Investment by Government & Industries</span>
                </li>

                <li className="flex items-start gap-3 font-semibold">
                  <span className="mt-1 shrink-0 text-[#ddbc69]">•</span>
                  <span>
                    Seamless Connectivity: International Airport, Expressway,
                    Railways, Monorail & Seaport
                  </span>
                </li>

                <li className="flex items-start gap-3 font-semibold">
                  <span className="mt-1 shrink-0 text-[#ddbc69]">•</span>
                  <span>#1 Choice of Investors due to High Return Potential</span>
                </li>

                <li className="flex items-start gap-3 font-semibold">
                  <span className="mt-1 shrink-0 text-[#ddbc69]">•</span>
                  <span>500% Appreciation in Last 5 Years</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

