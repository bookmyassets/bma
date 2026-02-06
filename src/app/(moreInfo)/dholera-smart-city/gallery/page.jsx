"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import your images
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
  { id: 1, src: abcd, alt: "ABCD Building in Dholera SIR", caption: "ABCD Building – Administrative hub of Dholera SIR" },
  { id: 2, src: activationZone, alt: "Activation Zone Dholera SIR", caption: "Activation Zone – First development phase of Dholera" },
  { id: 3, src: airportCargo, alt: "Dholera Airport Cargo Terminal", caption: "Cargo terminal at Dholera International Airport" },
  { id: 4, src: dholeraBoard, alt: "Dholera Smart City Entry Board", caption: "Official Dholera Smart City signage" },
  { id: 5, src: expressway, alt: "Ahmedabad Dholera Expressway", caption: "High-speed Ahmedabad–Dholera Expressway" },
  { id: 6, src: expresswayBoard, alt: "Expressway Direction Board", caption: "Ahmedabad–Dholera Expressway signage" },
  { id: 7, src: expresswayNight, alt: "Dholera Expressway Night View", caption: "Night view of expressway infrastructure" },
  { id: 8, src: renew, alt: "ReNew Power Project Dholera", caption: "ReNew Power renewable energy project" },
  { id: 9, src: riverFront, alt: "Riverfront Development Dholera", caption: "Planned riverfront in Dholera Smart City" },
  { id: 10, src: runway, alt: "Dholera Airport Runway", caption: "Runway construction at Dholera International Airport" },
  { id: 11, src: silkRoute, alt: "Silk Route Connectivity Dholera", caption: "Strategic Silk Route industrial corridor" },
  { id: 12, src: solar, alt: "Solar Power Plant Dholera", caption: "Large-scale solar energy infrastructure" },
  { id: 13, src: solarBoard, alt: "Solar Project Information Board", caption: "Solar park project signage" },
  { id: 14, src: tata, alt: "TATA Semiconductor Plant Dholera", caption: "TATA semiconductor manufacturing facility" },
  { id: 15, src: tataGate, alt: "TATA Semiconductor Main Gate", caption: "Front gate of TATA semiconductor campus" },
  { id: 16, src: tataNight, alt: "TATA Plant Night View", caption: "Night view of TATA semiconductor project" },
  { id: 17, src: tataRenew, alt: "TATA & ReNew Power Collaboration", caption: "Renewable energy integration with TATA plant" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setSelectedImage(galleryItems[index].image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (lightboxIndex + 1) % galleryItems.length;
    } else {
      newIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    }
    setLightboxIndex(newIndex);
    setSelectedImage(galleryItems[newIndex].image);
  };

  return (
    <div className="bg-white py-8 px-4" id="Gallery">
      <div className="max-w-7xl mx-auto">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <h3 className="text-4xl font-bold text-[#deae3c] mb-4 text-center">Dholera Gallery</h3>
          </div>
          <div className="col-lg-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               {galleryItems.map((item, index) => (
                <div key={item.id} className="group cursor-pointer" onClick={() => openLightbox(index)}>
                  <div className="overflow-hidden rounded-lg border-2 border-[#deae3c]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2 text-center font-semibold text-gray-800">{item.alt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-[#deae3c] rounded-full p-2 hover:bg-yellow-500 transition-colors"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-[#deae3c] rounded-full p-2 hover:bg-yellow-500 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-[#deae3c] rounded-full p-2 hover:bg-yellow-500 transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative max-w-4xl w-full max-h-full">
            <Image
              src={selectedImage}
              alt={galleryItems[lightboxIndex].title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-white text-center mt-4">
              <p className="text-xl font-semibold">{galleryItems[lightboxIndex].title}</p>
              <p className="text-sm">{lightboxIndex + 1} of {galleryItems.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}