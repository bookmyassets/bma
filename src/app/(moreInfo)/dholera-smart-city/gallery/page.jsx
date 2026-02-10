"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Images
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

const galleryItems = [
  { id: 1, src: abcd, alt: "ABCD Building in Dholera SIR" },
  { id: 2, src: activationZone, alt: "Activation Zone Dholera SIR" },
  { id: 3, src: airportCargo, alt: "Dholera Airport Cargo Terminal" },
  { id: 4, src: dholeraBoard, alt: "Dholera Smart City Entry Board" },
  { id: 5, src: expressway, alt: "Ahmedabad Dholera Expressway" },
  { id: 6, src: expresswayBoard, alt: "Expressway Direction Board" },
  { id: 7, src: expresswayNight, alt: "Dholera Expressway Night View" },
  { id: 8, src: renew, alt: "ReNew Power Project Dholera" },
  { id: 9, src: riverFront, alt: "Riverfront Development Dholera" },
  { id: 10, src: runway, alt: "Dholera Airport Runway" },
  { id: 11, src: silkRoute, alt: "Silk Route Connectivity Dholera" },
  { id: 12, src: solar, alt: "Solar Power Plant Dholera" },
  { id: 13, src: solarBoard, alt: "Solar Project Information Board" },
  { id: 14, src: tata, alt: "TATA Semiconductor Plant Dholera" },
  { id: 15, src: tataGate, alt: "TATA Semiconductor Main Gate" },
  { id: 16, src: tataNight, alt: "TATA Plant Night View" },
  { id: 17, src: tataRenew, alt: "TATA & ReNew Power Collaboration" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedImage(galleryItems[index].src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction) => {
    const newIndex =
      direction === "next"
        ? (lightboxIndex + 1) % galleryItems.length
        : (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;

    setLightboxIndex(newIndex);
    setSelectedImage(galleryItems[newIndex].src);
  };

  // Slider navigation functions
  const sliderRef = React.useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -320, // Adjust based on your card width + margin
        behavior: 'smooth'
      });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 320, // Adjust based on your card width + margin
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-12 bg-white" id="Gallery">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-[#deae3c] mb-4">
          Dholera Gallery
        </h2>

        <p className="text-center text-gray-600 mb-12 max-w-4xl mx-auto">
          Explore real on-ground development, infrastructure, and growth of Dholera Smart City
        </p>

        {/* Slider Container with Navigation */}
        <div className="relative">
          {/* Left Navigation Button */}
          <button
            onClick={slideLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-200"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slider */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto max-w-7xl mx-auto snap-x snap-mandatory pb-6 scrollbar-hide scroll-smooth"
          >
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="snap-center flex-shrink-0 w-64 md:w-80 mx-3 cursor-pointer hover:scale-105 transition duration-300"
              >
                <div className="rounded-xl overflow-hidden border border-[#deae3c] shadow-lg">
                  <div className="relative h-56">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, 320px"
                    />
                  </div>
                  <p className="text-center p-3 font-medium text-gray-700">
                    {item.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={slideRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-200"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-4xl z-50 hover:text-gray-300"
          >
            &times;
          </button>

          <button
            onClick={() => navigateLightbox("prev")}
            className="absolute left-6 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full z-50"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="relative w-full max-w-5xl h-[70vh]">
            <Image
              src={selectedImage}
              alt={galleryItems[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          <button
            onClick={() => navigateLightbox("next")}
            className="absolute right-6 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full z-50"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}