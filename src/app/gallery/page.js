import React from "react";
import hero from "@/assests/DIA.webp";
import abcd from "@/assests/gallery/abcd-building-dholera.webp";
import artificialRiver from "@/assests/gallery/artificial-revier.webp";
import artificialRiver2 from "@/assests/gallery/artificial-revier-dholera.webp";
import dholeraMetro from "@/assests/gallery/dholera-metro.webp";
import outerRoad from "@/assests/gallery/outer-ring-road.webp";
import rVilla from "@/assests/gallery/renamed_villa.webp";
import renew from "@/assests/gallery/renew-dholera.webp";
import runwayDIA from "@/assests/gallery/runway-of-dholera-international-airport.webp";
import tata from "@/assests/gallery/tata-plant-under-construction-dholera.webp";
import semicon from "@/assests/gallery/tata-semiconductor-plant.webp";
import waterPlant from "@/assests/gallery/water-treatment-plant.webp";
import westwyn from "@/assests/gallery/westwyn-dholera.webp";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title:
      "Explore Stunning Real Estate Dholera Projects | BookMyAssets Gallery",
    description:
      "Discover a curated gallery of premium real estate projects with BookMyAssets. Explore high-quality images of residential and commercial properties to find your perfect investment opportunity.",
    keywords:
      "Dholera Smart City, Dholera Smart City Project, Dholera Gujarat India, Dholera SIR, Dholera Residential Plots, Dholera SIR Residential Plots, Special Investment Region, Dholera Land Price, Investment in Dholera Smart City",
  };
}

export default function DholeraProgressPage() {
  const galleryImages = [
    {
      id: 1,
      src: abcd,
      alt: "ABCD Building",
      caption: "State-of-the-art infrastructure development in progress",
    },
    {
      id: 2,
      src: artificialRiver,
      alt: "Dholera Smart City Project",
      caption: "Master plan of India's first greenfield smart city",
    },
    {
      id: 3,
      src: artificialRiver2,
      alt: "Dholera Solar Plant",
      caption: "High-speed connectivity via the Ahmedabad-Dholera Expressway",
    },
    {
      id: 4,
      src: dholeraMetro,
      alt: "Dholera Solar Project",
      caption: "Aerial view of the Special Investment Region",
    },
    {
      id: 5,
      src: outerRoad,
      alt: "Dholera Semicon",
      caption: "Upcoming international airport boosting connectivity",
    },
    {
      id: 6,
      src: rVilla,
      alt: "TATA",
      caption: "Sustainable urban planning with smart technology",
    },
    {
      id: 7,
      src: renew,
      alt: "Public Transport and connectivity",
      caption: "Sustainable urban planning with smart technology",
    },
    {
      id: 8,
      src: runwayDIA,
      alt: "Local Employment and Skill Development",
      caption: "Sustainable urban planning with smart technology",
    },
    {
      id: 9,
      src: tata,
      alt: "Investment Opportunities Dholera SmartCity",
      caption: "Sustainable urban planning with smart technology",
    },
    {
      id: 10,
      src: semicon,
      alt: "Investment Opportunities Dholera SmartCity",
      caption: "Sustainable urban planning with smart technology",
    },
    {
      id: 11,
      src: waterPlant,
      alt: "Investment Opportunities Dholera SmartCity",
      caption: "Sustainable urban planning with smart technology",
    },
    {
      id: 12,
      src: westwyn,
      alt: "Investment Opportunities Dholera SmartCity",
      caption: "Sustainable urban planning with smart technology",
    },
  ];
  const canonicalUrl = `https://www.bookmyassets.com/gallery`;
  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <div className="min-h-screen pt-12 bg-gradient-to-b from-slate-50 to-slate-200">
        {/* Hero Section with Enhanced Overlay */}
        <div className="relative h-[40vh] overflow-hidden">
          <Image
            src={hero}
            alt="Dholera Skyline"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center justify-center">
            <div className="text-center px-6 py-10 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Dholera SIR Progress in Every Frame
              </h1>
            </div>
          </div>
        </div>

        {/* Gallery Section with Enhanced Design */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
              Explore Dholera Growth through Images
            </h2>
          </div>

          {/* Gallery Grid with Enhanced Hover Effects */}
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className=" group relative overflow-hidden rounded-xl transition-all duration-300 shadow-2xl h-80"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={image.id <= 3}
                />
                {/* <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {image.alt}
                  </h3>
                </div> */}
              </div>
            ))}
          </div>

          {/* Navigation with Category Tags */}
        </div>
      </div>
    </>
  );
}
