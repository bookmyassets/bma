import Image from "next/image";
import React from "react";
import sample1 from "@/assests/residential/westwyn-county-hero-section-desktop.webp";
import Link from "next/link";


export default function WestWyn() {
  return (
    <>
      <div className="flex flex-col max-sm:flex-col-reverse max-w-7xl mx-auto pt-8 md:flex-row md:pt-20 px-4 py-12 gap-8 overflow-hidden">
        {/* Left Section (40%) */}
        <div className="w-full md:w-2/5 max-w-2xl mx-auto md:pt-4 pl-4 pr-4">
          <div className="w-full h-full">
            <Image src={sample1} alt="sample1" />
          </div>
          <div className="pt-4 max-sm:flex max-sm:justify-center max-sm:items-center md:hidden">
            <a
              href="/dholera-residential-plots/westwyn-county"
              className="text-lg hover:bg-[#deae3c] hover:text-white p-4 border-2 border-[#deae3c] rounded-lg bg-black text-[#deae3c]"
            >
              About WestWyn County
            </a>
          </div>
        </div>

        {/* Right Section (60%) */}
        <div className="w-full md:w-3/5 md:pl-24 md:pr-4  md:mt-0 ">
          <h3 className="text-[32px] font-semibold text-black">
            Westwyn County
          </h3>
          <h2 className="text-xl font-semibold text-[#deae3c] ">
            Discover Premium Plots in Dholera's Prime Zone
          </h2>
          <div className="space-y-6 pt-4">
            <div className="">
              <p className="text-lg mb-2 "></p>
              <p className="text-gray-600 ">
                Westwyn County ensures high growth potential as part of Dholera
                Smart City India’s first and largest greenfield smart city.
                The project offers government-approved planning, world-class
                infrastructure, and long-term appreciation, along with modern
                amenities such as landscaped gardens, wide internal roads, 24x7
                power supply, and drainage system, gated security, and sports
                facilities. Strategically located near Fedra, Pipli Highway, and
                the upcoming Dholera International Airport, and backed by strong
                investor interest including the Tata Semiconductor Plant,
                Westwyn County stands as a secure and future-ready investment
                opportunity.
              </p>
            </div>
          </div>
          <div className="md:pt-12 max-sm:hidden">
            <Link
              href="/dholera-residential-plots/westwyn-county"
              className="bg-[#deae3c] text-black px-6 py-3 rounded-md font-medium hover:bg-[#f3bb39] transition duration-300 shadow-md"
            >
              About WestWyn County
            </Link>
          </div>
        </div>
      </div>
      
    </>
  );
}
