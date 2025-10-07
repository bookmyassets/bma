import Image from "next/image";
import React from "react";
import ROI from "@/assests/dholera-plots-roi.webp"

export default function DholeraSmartCity() {
  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
        {/* Left Section (40%) */}
        <div className="w-full md:w-2/5 pl-2 pr-2">
          <h1 className="text-[32px] font-semibold text-black mb-4">
            India's First Semiconductor Hub 
          </h1>
          <h2 className="text-xl font-semibold text-[#deae3c] mb-8">
            Goldmine for Investors
          </h2>
          <Image src={ROI} alt="BMA" className="" />
        </div>

        {/* Right Section (60%) */}
        <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6 pt-4">
          <div>
            <h3 className="text-xl font-bold text-black mb-2">
              Dholera Smart City
            </h3>
            <p className="text-gray-600">
              Dholera Smart City is India’s first greenfield smart city,
              designed with world class infrastructure and unmatched growth
              potential. The Dholera project offers prime industrial,
              commercial, and residential opportunities backed by government
              support and rapid development. Invest today to be part of a
              future ready city built for innovation, sustainability, and
              prosperity.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-2">
              Dholera Project
            </h3>
            <p className="text-gray-600">
              Dholera Smart City is designed to be a global hub of innovation
              and infrastructure. It features the India's second largest
              International Airport, seamless connectivity through the
              Ahmedabad–Dholera Expressway, and iconic projects like the ABCD
              Building, TATA’s ₹91,000 crore Semiconductor Plant, ReNew Power’s
              green energy investment, and one of world’s largest
              Solar Power Park.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-2">
              Strategic Location
            </h3>
            <p className="text-gray-600">
              Dholera is located at the heart of Gujarat, located in Ahmedabad
              district about 109 km by road (45 minutes via Ahmedabad
              Expressway). It is part of the Dholera Special Investment Region
              (SIR) under the Delhi–Mumbai Industrial Corridor (DMIC) project,
              with excellent connectivity to Rajkot 170 km, Bhavnagar 65 km, and
              Vadodara 130 km.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
