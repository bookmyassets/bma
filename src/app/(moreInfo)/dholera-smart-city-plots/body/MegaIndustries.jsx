"use client";

"use client";

import React from "react";
import Avaada from "@/assests/ad-page/crousel/Avaada.webp";
import Chiripal from "@/assests/ad-page/crousel/Chiripal.webp";
import Dawat from "@/assests/ad-page/crousel/Dawat.webp";
import HP from "@/assests/ad-page/crousel/HP.webp";
import Polycab from "@/assests/ad-page/crousel/Polyacab.webp";
import Renew from "@/assests/ad-page/crousel/Renew.webp";
import TATA from "@/assests/ad-page/crousel/TATA chemical.webp";
import Torrent from "@/assests/ad-page/crousel/Torrent.webp";
import Vedanta from "@/assests/ad-page/crousel/Vedanta.webp";
import Image from "next/image";
import Cubic from "@/assests/ad-page/crousel/Cubic.webp";

export default function MegaIndustries() {
  const companies = [
    { name: "Avaada", logo: Avaada },
    { name: "Chiripal", logo: Chiripal },
    { name: "Cubic", logo: Cubic },
    { name: "Dawat", logo: Dawat },
    { name: "HP", logo: HP },
    { name: "Polycab", logo: Polycab },
    { name: "Renew", logo: Renew },
    { name: "TATA Chemicals", logo: TATA },
    { name: "Torrent", logo: Torrent },
    { name: "Vedanta", logo: Vedanta },
  ];

  // Duplicate the array to create seamless looping
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          width: max-content;
        }
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
      `}</style>
      <div className="relative">
        <div className="mx-auto max-w-7xl pt-5 sm:pt-6">
          <div className="text-center">
            <h3 className="text-lg font-bold text-[#151f28] sm:text-xl md:text-2xl">
              Global Giants Building in Dholera
            </h3>
            <div className="mx-auto mb-1 mt-2 h-0.5 w-16 bg-[#ddbc69]"></div>
          </div>

          <div className="marquee-container py-3 sm:py-4">
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {duplicatedCompanies.map((company, index) => (
                <div
                  key={index}
                  className="mx-4 flex flex-shrink-0 items-center justify-center sm:mx-6"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    /*   width={160}
                    height={80} */
                    className="h-16 w-28 object-contain sm:h-20 sm:w-32"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

