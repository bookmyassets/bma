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
    <div className="" id="dholera">
      {/* ─────────────────────────────────────────
          Section 1: About Dholera
      ───────────────────────────────────────── */}
      <section className="pt-3">
        {/* Left: Text */}
        <div className=" bg-white p-4">
          <div className=" w-full">
            <h1 className="text-xl md:text-3xl max-w-7xl mx-auto font-bold md:mb-4 text-center">
              Invest in India's First Planned Smart City:{" "}
              <span className="text-[#deae3c]">Dholera SIR</span>
            </h1>

            <div className="md:grid md:grid-cols-2 pt-8 max-w-6xl mx-auto  space-y-4">
              <div>
                <Image src={dholera} alt="Dholera Smart City" />
              </div>
              {/* Distance Grid */}
              <div className="bg-gray-100 text-base md:text-lg p-4 rounded-xl">
                <ul className="space-y-4 text-gray-700 ">
                  <li className="flex items-start justify-start gap-2 font-semibold">
                    <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                      •
                    </span>
                    <span>Special Investment Region (SIR) Act implemented in 2009</span>
                  </li>

                  <li className="flex items-start gap-2 font-bold">
                    <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                      •
                    </span>
                    <span>
                      Vision of Hon'ble Prime Minister Shri Narendra Modi
                    </span>
                  </li>
                  <li className="flex items-start gap-2 font-bold">
                    <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                      •
                    </span>
                    <span>
                      India's First Semiconductor City: TATA Semiconductor Plant  
                    </span>
                  </li>

                  <li className="flex items-start gap-2 font-bold">
                    <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                      •
                    </span>
                    <span>35+ Global Companies already Invested</span>
                  </li>

                  <li className="flex items-start gap-2 font-bold">
                    <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                      •
                    </span>
                    <span>
                      ₹6 Lakh Crore Investment by Government & Industries
                    </span>
                  </li>

                  <li className="flex items-start gap-2 font-bold">
                    <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                      •
                    </span>
                    <span>
                      Seamless Connectivity: International Airport, Expressway,
                      Railways, Monorail & Seaport
                    </span>
                  </li>

                  <li className="flex items-start gap-2 font-bold">
                    <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                      •
                    </span>
                    <span>
                      #1 Choice of Investors due to High Return Potential
                    </span>
                  </li>

                  <li className="flex items-start gap-2 font-bold">
                    <span className="text-[#deae4c] leading-none shrink-0 mt-1">
                      •
                    </span>
                    <span>500% Appreciation in Last 5 Years</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
