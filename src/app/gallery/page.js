import React from "react";
import hero from "@/assests/DIA.webp";
import ABCD from "@/assests/DIA.webp";
import dholeraMap from "@/assests/DIA.webp";
import expressway from "@/assests/DIA.webp";
import dholeraSIR from "@/assests/DIA.webp";
import DIA from "@/assests/DIA.webp";
import abt from "@/assests/DIA.webp";
import Image from "next/image";

export default function DholeraProgressPage() {
  const galleryImages = [
    { id: 1, src: ABCD, alt: "Dholera Infrastructure Development", caption: "State-of-the-art infrastructure development in progress" },
    { id: 2, src: dholeraMap, alt: "Dholera Smart City Project", caption: "Master plan of India's first greenfield smart city" },
    { id: 3, src: expressway, alt: "Dholera Expressway", caption: "High-speed connectivity via the Ahmedabad-Dholera Expressway" },
    { id: 4, src: dholeraSIR, alt: "Dholera SIR Overview", caption: "Aerial view of the Special Investment Region" },
    { id: 5, src: DIA, alt: "Dholera International Airport", caption: "Upcoming international airport boosting connectivity" },
    { id: 6, src: abt, alt: "Dholera Smart City Vision", caption: "Sustainable urban planning with smart technology" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
      {/* Hero Section with Enhanced Overlay */}
      <div className="relative h-[70vh] overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">{image.alt}</h3>
                <p className="text-white/80 text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation with Category Tags */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-200 transition-colors font-medium">All Images</span>
          <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors font-medium">Infrastructure</span>
          <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors font-medium">Transportation</span>
          <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors font-medium">Urban Planning</span>
        </div>
      </div>
    </div>
  );
}