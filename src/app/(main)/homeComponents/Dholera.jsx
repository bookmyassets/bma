import React from "react";

export default function DholeraSmartCity() {
  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
        
        {/* Left Section (40%) */}
        <div className="w-full md:w-2/5 pl-2 pr-2">
          <h1 className="text-[32px] font-semibold text-black mb-4">
            Secure Your Future in Dholera
          </h1>
          <h2 className="text-xl font-semibold text-[#deae3c] mb-8">
            India’s #1 Smart City Investment Hub
          </h2>
        </div>

        {/* Right Section (60%) */}
        <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-black mb-2">
              Dholera Smart City
            </h3>
            <p className="text-gray-600">
              Dholera Smart City is India’s first greenfield smart city, designed
              with world-class infrastructure and unmatched growth potential.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-2">
              Dholera Project
            </h3>
            <p className="text-gray-600">
              Located in Dholera SIR – India’s first Greenfield Smart City, projects
              enjoy prime connectivity to the expressway, Metro, and airport. With
              AUDA approvals, clear titles, gated security, and modern amenities,
              they offer both lifestyle and investment value.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-2">
              Strategic Location
            </h3>
            <p className="text-gray-600">
              Dholera is located at the heart of Gujarat, located in Ahmedabad
              district about 109 km by road (45 minutes via Ahmedabad Expressway).
              It is part of the Dholera Special Investment Region (SIR) under the
              Delhi–Mumbai Industrial Corridor (DMIC) project, with excellent
              connectivity — Rajkot 170 km, Bhavnagar 65 km, and Vadodara 130 km.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}