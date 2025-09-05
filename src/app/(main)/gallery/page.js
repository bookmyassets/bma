"use client";
import React, { useState } from "react";
import Image from "next/image";
import hero from "@/assests/news.webp";
import sample1 from "@/assests/gallery/sir/abcd-gallery.webp";
import sample2 from "@/assests/gallery/sir/activation-gallery.webp";
import sample3 from "@/assests/gallery/sir/activation-gallery-2.webp";
import sample4 from "@/assests/gallery/sir/activation-road-2-gallery.webp";
import sample5 from "@/assests/gallery/sir/activation-road-gallery.webp";
import sample6 from "@/assests/gallery/sir/airport-gallery.webp";
import sample7 from "@/assests/gallery/sir/butterfly-gallery.webp";
import sample8 from "@/assests/gallery/sir/expressway-gallery.webp";
import sample9 from "@/assests/gallery/sir/renew-2-gallery.webp";
import sample10 from "@/assests/gallery/sir/renew-gallery.webp";
import sample11 from "@/assests/gallery/sir/solar-2-gallery.webp";
import sample12 from "@/assests/gallery/sir/solar-3-gallery.webp";
import sample13 from "@/assests/gallery/sir/solar-gallery.webp";
import sample14 from "@/assests/gallery/sir/spr-gallery.webp";
import sample15 from "@/assests/gallery/sir/sprr-gallery.webp";
import sample16 from "@/assests/gallery/sir/tata-2-gallery.webp";
import sample17 from "@/assests/gallery/sir/tata-gallery.webp";
import sample18 from "@/assests/gallery/sir/tata-gallery-1.webp";
import sample19 from "@/assests/gallery/sir/tata-gate-gallery.webp";
import sample20 from "@/assests/gallery/sir/toll-gallery.webp";
import sample21 from "@/assests/gallery/sir/torant-gallery.webp";
import sample22 from "@/assests/gallery/sir/torrent-gallery.webp";
import sample23 from "@/assests/gallery/sir/wtp-gallery.webp";
import sample24 from "@/assests/gallery/sir/wtp-gallery-2.webp";

export default function DholeraProgressPage() {
  const galleryImages = [
    { id: 1, src: sample1, alt: "Dholera Abcd building", caption: "Dholera Abcd building" },
    { id: 2, src: sample2, alt: "Dholera Abcd building auditorium", caption: "Dholera Abcd building auditorium" },
    { id: 3, src: sample3, alt: "Dholera Abcd building  inside", caption: "Dholera Abcd building  inside" },
    { id: 4, src: sample4, alt: "Dholera Ahmedabad Expressway After & Before Contruction (1)", caption: "Dholera Ahmedabad Expressway After & Before Contruction (1)" },
    { id: 5, src: sample5, alt: "Dholera Ahmedabad Expressway After & Before Contruction (1)", caption: "Dholera Ahmedabad Expressway After & Before Contruction (1)" },
    { id: 6, src: sample6, alt: "Dholera Ahmedabad Expressway Final", caption: "Dholera Ahmedabad Expressway Final" },
    { id: 7, src: sample7, alt: "Dholera Ahmedabad Expressway Night view", caption: "Dholera Ahmedabad Expressway Night view" },
    { id: 8, src: sample8, alt: "Dholera Canal Front Final View", caption: "Dholera Canal Front Final View" },
    { id: 9, src: sample9, alt: "Dholera Cannel front view daytime & nighttime", caption: "Dholera Cannel front view daytime & nighttime" },
    { id: 10, src: sample10, alt: "Dholera Common Effluent Treatement Plant 1", caption: "Dholera Common Effluent Treatement Plant 1" },
    { id: 11, src: sample11, alt: "Dholera Common Effluent Treatement Plant", caption: "Dholera Common Effluent Treatement Plant 1" },
    { id: 12, src: sample12, alt: "Dholera Sewage Treatment Plant outer view", caption: "Dholera Sewage Treatment Plant outer view" },
    { id: 13, src: sample13, alt: "Dholera Sewage Treatment Plant", caption: "Dholera Sewage Treatment Plant" },
    { id: 14, src: sample14, alt: "Dholera Solar Power Plant", caption: "Dholera Solar Power Plant" },
    { id: 15, src: sample15, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
    { id: 16, src: sample16, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
    { id: 17, src: sample17, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
    { id: 18, src: sample18, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
    { id: 19, src: sample19, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
    { id: 20, src: sample20, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
    { id: 21, src: sample21, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
    { id: 22, src: sample22, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
    { id: 23, src: sample23, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
    { id: 24, src: sample24, alt: "Dholera Solar Power Plant 2", caption: "Dholera Solar Power Plant 2" },
   
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
             <link rel="canonical" href="https://www.dholeratimes.com/gallery/dholera-sir-progress" />
      <meta name="robots" content="index, dofollow"/>

      {/* Hero Section with Enhanced Overlay */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src={hero}
          alt="Dholera SIR Progress"
          fill
          className="object-cover"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 shadow-2xl h-80 cursor-pointer"
              onClick={() => openPopup(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0  group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                {/* <h3 className="text-black text-xl font-bold mb-2">{image.alt}</h3> */}
                
              </div>
            </div>
          ))}
        </div>

        {/* Navigation with Category Tags */}
        {/* <div className="mt-16 flex flex-wrap justify-center gap-3">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-200 transition-colors font-medium">All Images</span>
          <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors font-medium">Infrastructure</span>
          <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors font-medium">Transportation</span>
          <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors font-medium">Urban Planning</span>
        </div> */}
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
{/*             <div className="bg-white p-4 text-center">
              <h3 className="text-lg font-bold">{selectedImage.alt}</h3>
              <p className="text-gray-600">{selectedImage.caption}</p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}