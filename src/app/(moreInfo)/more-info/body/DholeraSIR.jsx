import React from "react";

import dholera from "@/assests/ad-page/section/dholera-smart-city-latest-updates.webp";
import Image from "next/image";

const distances = [
  /*  {
    label: "India’s First Planned Smart City",
    value: "Dholera SIR is being developed as a government-planned smart city under the Delhi Mumbai Industrial Corridor.",
    icon: "🛤️",
  },
  {
    label: "Early Mover Advantage",
    value: "Many investors are investing in Dholera right now to secure their land at affordable rates and gain high returns in long-term investment.",
    icon: "✈️",
  }, */
  {
    label: "Global Connectivity",
    value:
      "Dholera International Airport, Ahmedabad-Dholera Expressway, Dedicated Seaport have enabled seamless connectivity of Dholera SIR across India and globe.",
    icon: "🛣️",
  },
  {
    label: "₹6 Lakh Crore Global Investment",
    value:
      "Major industry giants including Fortune 500 companies have already invested in Dholera including mega projects like the Tata Semiconductor Plant and Dholera Solar Park.",
    icon: "🏙️",
  },
  {
    label: "Early Mover Advantage",
    value:
      "Many investors are investing in Dholera right now to secure their land at affordable rates and gain high returns in long-term investment.",
    icon: "🏙️",
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
            <h1
              className="text-xl md:text-3xl max-w-7xl mx-auto font-bold mb-4 text-center"
              style={{ color: "#deae3c" }}
            >
              Invest in India's First Planned Smart City: Dholera SIR
            </h1>

            <div className=" text-black max-w-7xl mx-auto leading-relaxed md:text-lg text-center">
              <p>
                Dholera Special Investment Region (SIR) is India's first planned
                smart city located in Gujarat, designed as a global
                manufacturing hub. With seamless connectivity including
                Ahmedabad-Dholera Expressway, Dholera International Airport, and
                Dedicated Seaport; the city has gained over ₹6 Lakh Crore
                investment from Government and Industry Giants. Dholera Smart
                City is currently the top choice for investors securing land
                investment with high appreciation potential.
              </p>
            </div>
            <div className="grid grid-cols-2 pt-8 max-w-6xl mx-auto">
              <div>
                <Image src={dholera} alt="Dholera Smart City" />
              </div>
              {/* Distance Grid */}
              <div className=" space-y-4 gap-3 text-black">
                {distances.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-[14px] flex flex-col gap-1"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.07)",
                      border: "2px solid rgba(222,174,60,0.2)",
                    }}
                  >
                    <p
                      className="text-lg font-semibold leading-tight "
                      style={{ color: "#deae3c" }}
                    >
                      {item.label}
                    </p>
                    <p className="text-black font-bold text-sm md:text-base">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
