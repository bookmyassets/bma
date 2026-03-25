import Image from "next/image";
import Link from "next/link";
import React from "react";
import BMAimage from "@/assests/BMA.webp";
import LeadForm from "../components/LeadForm";

const COUNTERS = [
  { value: "2 Lakh+", label: "sq. yards Sold" },
  { value: "957+",   label: "Plots Sold" },
  { value: "561+",    label: "Happy Customers" },
  { value: "9+",      label: "Total Residential Projects" },
];

export default function BMA() {
  return (
    <div className="bg-[#f9f9f9]">
      <div
        className="
          flex flex-col md:flex-row
          px-[calc(1rem+2vw)]
          py-[calc(2rem+2vw)]
          gap-6 md:gap-12
          max-w-7xl mx-auto overflow-hidden
        "
      >
        {/* Left Section (40%) */}
        <div className="w-full md:w-2/5">
          {/* ✅ clamp() — text scales fluidly */}
          <h2 className="text-[clamp(1rem,2vw,1.25rem)] font-semibold text-black">
            Why Invest With
          </h2>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-[#deae3c]">
            BookMyAssets
          </h2>

          {/* ✅ responsive image — aspect ratio container + fill */}
          <div className="relative w-full aspect-[5/4] mt-8 rounded-lg overflow-hidden">
            <Image
              src={BMAimage}
              alt="BookMyAssets — trusted Dholera real estate investment partner"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Section (60%) */}
        <div className="w-full md:w-3/5 space-y-2">

          {/* ✅ clamp() on body text */}
          <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-gray-600 leading-relaxed">
            BookMyAssets offers unmatched expertise and legally verified
            opportunities in the Dholera smart city, India's most ambitious
            smart city development. With prime plots in the rapidly growing
            Dholera city, we provide secure investments backed by government
            support, world class infrastructure, and high future appreciation
            potential. We are proud to be part of Dholera's growth story with
            over 6 successful project units delivered. At BookMyAssets, our
            focus is on building trust driven investments and establishing
            ourselves as the most reliable brand in real estate through our
            strong ecosystem: Truliyo Digital, BMA Developers, BMA Allied
            Services, and our extensive BMA Channel Partners network.
          </p>

          {/* Counters */}
          <div className="py-4">
            {/* ✅ calc() — inner padding scales with viewport */}
            <div className="px-[calc(0.5rem+1vw)]">
              <div className="grid grid-cols-2 gap-[calc(0.75rem+0.5vw)]">
                {COUNTERS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="
                      flex flex-col justify-center items-center
                      p-[calc(0.75rem+0.2vw)]
                      bg-white rounded-2xl shadow-md
                      hover:shadow-xl transition-shadow
                    "
                  >
                    {/* ✅ clamp() — stat number scales fluidly */}
                    <div className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-[#deae3c] mb-2">
                      {value}
                    </div>
                    <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-700 font-medium text-center">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 max-sm:flex max-sm:justify-center max-sm:items-center">
            <Link
              href="/about"
              className="
                bg-[#deae3c] text-white
                px-[calc(1rem+1vw)] py-3
                rounded-md font-medium
                hover:bg-[#f3bb39] transition duration-300 shadow-md
                text-[clamp(0.875rem,1.5vw,1rem)]
              "
            >
              About Us
            </Link>
          </div>
        </div>
      </div>

      <LeadForm
        title="Want to Buy Plots in Dholera But Don't Know How?"
        button="Talk to an Expert"
      />
    </div>
  );
}