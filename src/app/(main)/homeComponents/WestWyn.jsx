import Image from "next/image";
import React from "react";
import sample1 from "@/assests/residential/estates.webp";
import Link from "next/link";
import LatestUpdates from "./Latest";

export default function WestWyn() {
  return (
    <>
      <LatestUpdates />

      <div
        className="
          flex flex-col max-sm:flex-col-reverse md:flex-row
          max-w-7xl mx-auto
          px-[calc(1rem+2vw)]
          py-[calc(2rem+2vw)]
          gap-[calc(1.5rem+1vw)]
          overflow-hidden
        "
      >
        {/* Left Section (40%) */}
        <div className="w-full md:w-2/5 max-w-2xl mx-auto md:pt-4">
          {/* ✅ responsive image — aspect-ratio container + fill */}
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
          {/* ✅ clamp() — heading scales fluidly */}
          <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-black">
            Westwyn Estates
          </h3>
          <h2 className="text-[clamp(1rem,2vw,1.25rem)] font-semibold text-[#deae3c]">
            The Next Chapter in Dholera's Growth Story
          </h2>

          <div className="space-y-6 pt-4">
            {/* ✅ clamp() — body text scales between 14px and 16px */}
            <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-gray-600 leading-relaxed">
              After the success of WestWyn County, BookMyAssets introduced
              WestWyn Estates, a thoughtfully planned premium plotted community
              built on trust and long-term value. With direct entry from State
              Highway-117, minutes from Bhimnath Railway Station, and close to
              the Dholera SIR boundary, the location offers strong connectivity
              while maintaining a calm environment.
              <br />
              Planned as a secure gated community, WestWyn Estates reflects the
              comfort of premium estates living, designed for a peaceful and
              secure lifestyle.
              <br />
              Whether you're looking for long-term growth or planning your own
              space near Dholera SIR, WestWyn Estates offers a well-connected
              location close to upcoming development.
            </p>
          </div>

          <div className="md:pt-[calc(2rem+2vw)] max-sm:hidden">
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
        </div>
      </div>
    </>
  );
}