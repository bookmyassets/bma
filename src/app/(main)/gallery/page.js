"use client";
import React, { useState } from "react";
import Image from "next/image";
import hero from "@/assests/gallery/bg-gallery-pc.png";
import abcd from "@/assests/gallery/sir/abcd.webp";
import activationZone from "@/assests/gallery/sir/Activation_zone.webp";
import airportCargo from "@/assests/gallery/sir/Airport_cargo.webp";
import dholeraBoard from "@/assests/gallery/sir/Dholera_board.webp";
import expressway from "@/assests/gallery/sir/expressway.webp";
import expresswayBoard from "@/assests/gallery/sir/expressway_board.webp";
import expresswayNight from "@/assests/gallery/sir/expressway_night_view.webp";
import renew from "@/assests/gallery/sir/Renew.webp";
import riverFront from "@/assests/gallery/sir/River_front.webp";
import runway from "@/assests/gallery/sir/Runway.webp";
import silkRoute from "@/assests/gallery/sir/Silk_route.webp";
import solar from "@/assests/gallery/sir/Solar.webp";
import solarBoard from "@/assests/gallery/sir/Solar_board.webp";
import tata from "@/assests/gallery/sir/TATA.webp";
import tataGate from "@/assests/gallery/sir/tata_gate.webp";
import tataNight from "@/assests/gallery/sir/TATA_night_view.webp";
import tataRenew from "@/assests/gallery/sir/tata_renew.webp";

export default function DholeraProgressPage() {
  const galleryImages = [
    {
      id: 1,
      src: abcd,
      alt: "ABCD Building in Dholera SIR",
      caption: "ABCD Building – Administrative hub of Dholera SIR",
    },
    {
      id: 2,
      src: activationZone,
      alt: "Activation Zone Dholera SIR",
      caption: "Activation Zone – First development phase of Dholera",
    },
    {
      id: 3,
      src: airportCargo,
      alt: "Dholera Airport Cargo Terminal",
      caption: "Cargo terminal at Dholera International Airport",
    },
    {
      id: 4,
      src: dholeraBoard,
      alt: "Dholera Smart City Entry Board",
      caption: "Official Dholera Smart City signage",
    },
    {
      id: 5,
      src: expressway,
      alt: "Ahmedabad Dholera Expressway",
      caption: "High-speed Ahmedabad–Dholera Expressway",
    },
    {
      id: 6,
      src: expresswayBoard,
      alt: "Expressway Direction Board",
      caption: "Ahmedabad–Dholera Expressway signage",
    },
    {
      id: 7,
      src: expresswayNight,
      alt: "Dholera Expressway Night View",
      caption: "Night view of expressway infrastructure",
    },
    {
      id: 8,
      src: renew,
      alt: "ReNew Power Project Dholera",
      caption: "ReNew Power renewable energy project",
    },
    {
      id: 9,
      src: riverFront,
      alt: "Riverfront Development Dholera",
      caption: "Planned riverfront in Dholera Smart City",
    },
    {
      id: 10,
      src: runway,
      alt: "Dholera Airport Runway",
      caption: "Runway construction at Dholera International Airport",
    },
    {
      id: 11,
      src: silkRoute,
      alt: "Silk Route Connectivity Dholera",
      caption: "Strategic Silk Route industrial corridor",
    },
    {
      id: 12,
      src: solar,
      alt: "Solar Power Plant Dholera",
      caption: "Large-scale solar energy infrastructure",
    },
    {
      id: 13,
      src: solarBoard,
      alt: "Solar Project Information Board",
      caption: "Solar park project signage",
    },
    {
      id: 14,
      src: tata,
      alt: "TATA Semiconductor Plant Dholera",
      caption: "TATA semiconductor manufacturing facility",
    },
    {
      id: 15,
      src: tataGate,
      alt: "TATA Semiconductor Main Gate",
      caption: "Front gate of TATA semiconductor campus",
    },
    {
      id: 16,
      src: tataNight,
      alt: "TATA Plant Night View",
      caption: "Night view of TATA semiconductor project",
    },
    {
      id: 17,
      src: tataRenew,
      alt: "TATA & ReNew Power Collaboration",
      caption: "Renewable energy integration with TATA plant",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/gallery/dholera-sir-progress"
      />
      <meta name="robots" content="index, dofollow" />
      <title>Dholera Smart City Site Photos & Project Visual</title>
      <meta
        name="description"
        content="Explore Dholera SIR images, site photos and verified residential plot visuals from Book My Assets."
      />
      <link rel="canonical" href={`https://www.bookmyassets.com/gallery`} />
      
      {/* Hero Section with Enhanced Overlay */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={hero}
          alt="Dholera SIR Progress"
          fill
          className="object-cover max-sm:pt-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center justify-center">
          <div className="text-center px-6 py-10 max-w-5xl">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer bg-white"
              onClick={() => openPopup(image)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Caption */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{image.alt}</h3>
                <p className="text-sm text-gray-600">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* Image Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black font-bold z-10"
            >
              ×
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="bg-white p-4 text-center">
              <h3 className="text-lg font-bold">{selectedImage.alt}</h3>
              <p className="text-gray-600">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}