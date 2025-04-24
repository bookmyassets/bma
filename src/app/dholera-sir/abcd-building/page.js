// app/abcd-building/page.js
"use client";

import Image from "next/image";
import React, { useState } from "react";
import hero from "@/assests/BmaInvest.webp";

export default function ABCDPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  const handleScroll = (id) => {
    setActiveTab(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buttonStyle = (id) =>
    `px-6 py-4 rounded-lg font-semibold transition-all duration-300 shadow ${
      activeTab === id
        ? "bg-[#d8b66d] text-white"
        : "bg-white text-gray-800 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center bg-black text-white">
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt="ABCD Building"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <h1 className="relative text-4xl md:text-5xl font-bold z-10">
          ABCD Building Dholera
        </h1>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-4 overflow-x-auto pb-2 flex-wrap md:flex-nowrap">
            {[
              "Overview",
              "Importance",
              "Location",
              "Features",
              "Investment",
              "Conclusion",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => handleScroll(tab)}
                className={buttonStyle(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-20">
        <section id="Overview">
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="text-gray-700 text-lg ">
            The ABCD Building Dholera is the center for managing and running
            Dholera Smart City. The Dholera's (ABCD) building of the
            Administrative and Business Center is innovative and has all the
            stuff required to keep the city proceeding smoothly.
            <br />
            Calling the ABCD Building in Dholera Smart City the city's brain is
            not wrong because different parts work together to make Dholera an
            innovative and efficient place to live.
            <br />
            The area of ABCD Building Dholera is straight next to the large road
            of 55m, which will take you directly to the expressway. Agencies of
            house expansion in Dholera Smart City development will have an
            office, a command, and a control center with a skill development
            center area of 36,000 sq.
            <br />
            The Dholera infrastructure project is innovative smart and
            adjustable for all RDA staff, hence, RDA's building (Regional
            Development Authority) wants to lead this.
          </p>
        </section>

        <section id="Importance">
          <h2 className="text-3xl font-bold mb-4">
            Importance of ABCD Building
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Single-window clearance system for approvals.</li>
            <li>Centralized control using ICT & SCADA systems.</li>
            <li>Part of the Activation Area (TP2 West – Phase 1).</li>
          </ul>
        </section>

        <section id="Location">
          <h2 className="text-3xl font-bold mb-4">Location & Connectivity</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Connected via Dholera Expressway.</li>
            <li>Close proximity to Dholera International Airport.</li>
            <li>Upcoming metro rail and smart road access.</li>
          </ul>
        </section>

        <section id="Features">
          <h2 className="text-3xl font-bold mb-4">Facilities & Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Advanced Smart City Command Center with IoT-based monitoring.
            </li>
            <li>
              Sustainable infrastructure with solar, rainwater harvesting, and
              recycling systems.
            </li>
            <li>
              Business hub with co-working spaces, lounges, and incubation
              centers.
            </li>
          </ul>
        </section>

        <section id="Investment">
          <h2 className="text-3xl font-bold mb-4">Why Invest Near ABCD?</h2>
          <p className="text-gray-700">
            The strategic location and role in city operations make ABCD
            Building a key hotspot for investors. Boosts real estate value and
            provides essential administrative functions.
          </p>
        </section>

        <section id="Conclusion">
          <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
          <p className="text-gray-700">
            The ABCD Building stands as a symbol of smart urban development.
            Investors and businesses are encouraged to explore this opportunity
            as Dholera transforms into a global smart city.
          </p>
        </section>
      </div>
    </>
  );
}
