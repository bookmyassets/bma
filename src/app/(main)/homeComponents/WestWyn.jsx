import Image from "next/image";
import React from "react";
import sample1 from "@/assests/homepage/section-images/westwyn-estates-dholera-sir-homepage.webp";
import Link from "next/link";
import LatestUpdates from "./Latest";
import { MdLocationOn, MdApartment } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import { PiLeafFill } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";

const POINTS = [
  {
    icon: MdLocationOn,
    title: "Strategic Location",
    body: "Near Dholera SIR boundary with access from State Highway-117",
  },
  {
    icon: GiTwoCoins,
    title: "Long-Term Investment Fit",
    body: "Suitable for buyers looking at plotted land with patient holding potential",
  },
  {
    icon: MdApartment,
    title: "Planned Community",
    body: "A structured plotted development designed for orderly growth and better living",
  },
  {
    icon: FaCheck,
    title: "NA/NOC & Title-Clarity Support",
    body: "Assistance with approvals and clear title verification for safe buying.",
  },
];

export default function WestWyn() {
  return (
    <>
      <LatestUpdates />

      <div
        className="
          flex flex-col max-sm:flex-col-reverse md:flex-row
          max-w-7xl mx-auto
          px-[calc(1rem+2vw)] py-4
          gap-[calc(1.5rem+1vw)]
          overflow-hidden
        "
      >
        {/* Left Section (40%) */}
        <div className="w-full md:w-2/5 max-w-2xl mx-auto md:pt-4">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={sample1}
              alt="WestWyn Estates — premium plotted community in Dholera SIR"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="pt-4 max-sm:flex max-sm:justify-center max-sm:items-center md:hidden">
            <a
              href="/dholera-residential-plots/westwyn-estate"
              className="text-[clamp(0.875rem,2vw,1.125rem)] text-white p-4 border-2 border-[#deae3c] rounded-lg bg-[#deae3c]"
            >
              About WestWyn Estates
            </a>
          </div>
        </div>

        {/* Right Section (60%) */}
        <div className="w-full md:w-3/5 md:pl-[calc(3rem+2vw)] md:pr-4">
          <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-black">
            Westwyn Estates
          </h3>
          <h2 className="text-[clamp(1rem,2vw,1.25rem)] font-semibold text-[#deae3c]">
            Verified Residential Plots Near Dholera SIR
          </h2>

          <div className="space-y-6 pt-4">
            <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-gray-600 leading-relaxed">
              <Link href='/dholera-residential-plots/westwyn-estate' title="WestWyn Estates" className="text-[#deae3c]">WestWyn Estates</Link> is a planned community for buyers looking at a
              well-connected location near <Link href='/about-dholera-sir' title="Dholera SIR" className="text-[#deae3c]">Dholera SIR</Link>. It offers access from
              State Highway-117 and is positioned for investors who want a
              practical plotted option with long-term holding potential.
            </p>

            {/* 4 pointer cards */}
            <div className="grid grid-cols-2 gap-3">
              {POINTS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="flex gap-3 items-start bg-white rounded-xl p-[clamp(0.65rem,1.2vw,0.875rem)] shadow-sm border border-gray-100"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-[#deae3c]/10 flex items-center justify-center">
                    <Icon className="text-[#deae3c] text-lg" />
                  </div>
                  <div>
                    <p className="text-[clamp(0.8125rem,1.2vw,0.9375rem)] font-semibold text-black leading-snug mb-0.5">
                      {title}
                    </p>
                    <p className="text-[clamp(0.75rem,1vw,0.8125rem)] text-gray-500 leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
        </div>
        
      </div>
       <div className="md:pt-[calc(1rem+1vw)] flex justify-center items-center max-sm:hidden">
            <Link
              href="/dholera-residential-plots/westwyn-estate"
              className="
                bg-[#deae3c] text-white
                px-[calc(1rem+1vw)] py-3
                rounded-md font-medium
                hover:bg-[#f3bb39] transition duration-300 shadow-md
                text-[clamp(0.875rem,1.5vw,1rem)]
              "
            >
              About WestWyn Estates
            </Link>
          </div>
    </>
  );
}