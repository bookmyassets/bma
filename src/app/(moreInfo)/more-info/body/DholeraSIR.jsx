import React from "react";

import dholeraMap from "@/assests/ad-page/dholera-sir-latest-map-2026-mobile-v2.webp";
import Image from "next/image";

const distances = [
  {
    label: "Railway Connectivity",
    value: "2 Min",
    icon: "🛤️",
  },
  {
    label: "Dholera SIR Boundary",
    value: "5 Min",
    icon: "🏙️",
  },
  {
    label: "Ahmedabad–Dholera Expressway",
    value: "12 Min",
    icon: "🛣️",
  },
  {
    label: "Dholera International Airport",
    value: "30 Min",
    icon: "✈️",
  },
];

export default function DholeraLandingPage() {
  return (
    <div className="bg-white" id="dholera">

      {/* ─────────────────────────────────────────
          Section 1: About Dholera
      ───────────────────────────────────────── */}
      <section className="grid md:grid-cols-2">

        {/* Left: Text */}
        <div className="bg-black text-white p-8 md:p-12 lg:p-16 flex items-center">
          <div className="max-w-3xl mx-auto w-full">
            <h1
              className="text-xl md:text-3xl font-bold mb-6"
              style={{ color: "#deae3c" }}
            >
              Where exactly is this in Dholera, Gujarat?
            </h1>

            <div className="space-y-4 leading-relaxed text-gray-200 md:text-lg">
              <p>
                This plotted investment opportunity is located near the Dholera
                SIR boundary in Gujarat. It is meant for buyers who are
                comfortable evaluating land outside their home city and want to
                understand the location clearly before making a decision.
              </p>
              <p>
                For investors from Delhi NCR, Noida, Gurugram, and other North
                Indian cities, location clarity is often the first concern. That
                is why we make the map and surrounding area understanding easier
                before moving forward.
              </p>
            </div>

            {/* Distance Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {distances.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-3 md:p-4 flex flex-col gap-1"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(222,174,60,0.2)" }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <p
                    className="text-lg font-semibold leading-tight"
                    style={{ color: "#deae3c" }}
                  >
                    {item.label}
                  </p>
                  <p className="text-white font-bold text-sm md:text-base">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Building Image */}
        <div className="flex items-center justify-center bg-gray-100 p-8">
          <Image
            src={dholeraMap}
            alt="Dholera Smart City Building"
            className="h-96 aspect-[3 /4] rounded-xl shadow-2xl w-72 object-contain"
          />
        </div>
      </section>

    </div>
  );
}