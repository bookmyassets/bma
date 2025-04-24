"use client";

import Image from "next/image";
import React, { useState } from "react";
import hero from "@/assests/BmaInvest.webp";

export default function ConnectivityPage() {
  const [activeTab, setActiveTab] = useState("RoadConnectivity");

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
      {/* Hero Section */}
      <section className="relative h-[30vh] flex items-center justify-center text-center bg-black">
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt="Dholera Connectivity Aerial View"
            className="w-full h-full object-cover opacity-60"
            priority
          />
        </div>
      </section>

      <div className="relative z-10 max-w-4xl mx-auto pt-6 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Connectivity in Dholera
        </h1>
      </div>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <p className="text-center text-lg md:text-xl font-medium text-gray-700">
            Dholera Smart City offers world-class connectivity through roads, air, rail, and sea. 
            Strategically located as part of the Delhi-Mumbai Industrial Corridor (DMIC), 
            Dholera is transforming into a global hub for trade and commerce with its 
            state-of-the-art infrastructure.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-20 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-4 overflow-x-auto pb-2 flex-wrap md:flex-nowrap">
            <button
              className={buttonStyle("RoadConnectivity")}
              onClick={() => handleScroll("RoadConnectivity")}
              aria-label="Road Connectivity"
            >
              Road Connectivity
            </button>
            <button
              className={buttonStyle("AirConnectivity")}
              onClick={() => handleScroll("AirConnectivity")}
              aria-label="Air Connectivity"
            >
              Air Connectivity
            </button>
            <button
              className={buttonStyle("RailConnectivity")}
              onClick={() => handleScroll("RailConnectivity")}
              aria-label="Rail Connectivity"
            >
              Rail Connectivity
            </button>
            <button
              className={buttonStyle("SeaConnectivity")}
              onClick={() => handleScroll("SeaConnectivity")}
              aria-label="Sea Connectivity"
            >
              Sea Connectivity
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <section className="py-16 leading-relaxed bg-gray-50">
        {/* Road Connectivity Section */}
        <div id="RoadConnectivity" className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:w-20 after:h-1 after:bg-[#d8b66d] after:-translate-x-1/2">
              Road Connectivity in Dholera
            </span>
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    NH 8 connects Dholera with Ahmedabad, Bhavnagar, and Mumbai
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Dholera Expressway (500 km Mumbai-Ahmedabad-Vadodara Expressway) 
                    connects the region as part of the Golden Quadrilateral
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Dholera-Ahmedabad Expressway is planned to improve accessibility
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Expressway has access to the Dedicated Freight Corridor (DFC)
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Dholera Road Connectivity Map"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Air Connectivity Section */}
        <div id="AirConnectivity" className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:w-20 after:h-1 after:bg-[#d8b66d] after:-translate-x-1/2">
              Dholera International Airport
            </span>
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Located near DSIR, about 80 km southwest of Ahmedabad
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Spread over 1,426 hectares with 75 hectares for commercial development
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Will serve as a second airport for Ahmedabad
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    International air cargo operations expected to start by mid-2025
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Expected to handle 20 million passengers by 2040
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Dholera Airport Map"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rail Connectivity Section */}
        <div id="RailConnectivity" className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:w-20 after:h-1 after:bg-[#d8b66d] after:-translate-x-1/2">
              Rail Connectivity in Dholera
            </span>
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Bhavnagar is the nearest rail connection (34 km)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Tarapur is the nearest broad gauge station (103 km)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Vande Metro planned to connect Ahmedabad to Dholera Smart City
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Dholera Rail Connectivity Map"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sea Connectivity Section */}
        <div id="SeaConnectivity" className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:w-20 after:h-1 after:bg-[#d8b66d] after:-translate-x-1/2">
              Sea Connectivity in Dholera
            </span>
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Well-connected to major ports of Kandla (334 km) and Mundra (376 km)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Coastal location makes Dholera a gateway to the west
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d8b66d] mr-2 text-xl">●</span>
                  <span className="text-gray-700">
                    Port connectivity enhances international trade opportunities
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Dholera Sea Connectivity Map"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Importance Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:w-20 after:h-1 after:bg-[#d8b66d] after:-translate-x-1/2">
              Strategic Importance of Dholera's Location
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 mb-6">
              Dholera's strategic location is crucial in Gujarat as it's close to major industrial hubs and ports. 
              Its role in the Delhi-Mumbai Industrial Corridor (DMIC) positions it as a key node for economic 
              growth and development in India.
            </p>
            <p className="text-gray-700 mb-6">
              Located near vibrant cities like Ahmedabad and Surat, and the bustling ports of the Arabian Sea, 
              Dholera offers quick access to key transportation networks including the DMIC, highways, and 
              upcoming international airport.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}