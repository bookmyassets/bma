import React from "react";
import hero from "@/assests/DIA.webp";
import road from "@/assests/gallery/Dholera Road.webp"
import roads from "@/assests/gallery/Dholera Roads.webp"
import solarPlant from "@/assests/gallery/Dholera Solar Plant.webp"
import solarProject from "@/assests/gallery/Dholera Solar Project.webp"
import semiconductor from "@/assests/gallery/TATA Semiconductor.webp"
import tata from "@/assests/gallery/TATA.webp"
import connectivity from "@/assests/gallery/public_transport_and_connectivity.webp"
import skillDevelopment from "@/assests/gallery/LocalEmployment_and_SkillDevelopment.webp"
import investment from "@/assests/gallery/Investment_Opportunities_DholeraSmartCity.webp"
import Image from "next/image";

export async function generateMetadata() {

  return {
    title: "Explore Stunning Real Estate Dholera Projects | BookMyAssets Gallery",
    description:
      "Discover a curated gallery of premium real estate projects with BookMyAssets. Explore high-quality images of residential and commercial properties to find your perfect investment opportunity.", 
    keywords:
      "Dholera Smart City, Dholera Smart City Project, Dholera Gujarat India, Dholera SIR, Dholera Residential Plots, Dholera SIR Residential Plots, Special Investment Region, Dholera Land Price, Investment in Dholera Smart City",
  };
}

export default function DholeraProgressPage() {
  const galleryImages = [
    { id: 1, src: road, alt: "Dholera Infrastructure", caption: "State-of-the-art infrastructure development in progress" },
    { id: 2, src: roads, alt: "Dholera Smart City Project", caption: "Master plan of India's first greenfield smart city" },
    { id: 3, src: solarPlant, alt: "Dholera Solar Plant", caption: "High-speed connectivity via the Ahmedabad-Dholera Expressway" },
    { id: 4, src: solarProject, alt: "Dholera Solar Project", caption: "Aerial view of the Special Investment Region" },
    { id: 5, src: semiconductor, alt: "Dholera Semicon", caption: "Upcoming international airport boosting connectivity" },
    { id: 6, src: tata, alt: "TATA", caption: "Sustainable urban planning with smart technology" },
    { id: 7, src: connectivity, alt: "Public Transport and connectivity", caption: "Sustainable urban planning with smart technology" },
    { id: 8, src: skillDevelopment, alt: "Local Employment and Skill Development", caption: "Sustainable urban planning with smart technology" },
    { id: 9, src: investment, alt: "Investment Opportunities Dholera SmartCity", caption: "Sustainable urban planning with smart technology" },
  ];
const canonicalUrl = `https://www.bookmyassets.com/gallery`
  return (
    <>
    <link rel="canonical" href={canonicalUrl}/>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">{image.alt}</h3>
               
              </div>
            </div>
          ))}
        </div>

        {/* Navigation with Category Tags */}
        
      </div>
    </div>
                </>
  );
}