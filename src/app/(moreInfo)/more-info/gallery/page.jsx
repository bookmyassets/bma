"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import your images
import sample1 from "@/assests/gallery/sir/abcd-gallery.webp";
import sample3 from "@/assests/gallery/sir/activation-gallery-2.webp";
import sample6 from "@/assests/gallery/sir/airport-gallery.webp";
import sample10 from "@/assests/gallery/sir/renew-gallery.webp";
import sample11 from "@/assests/gallery/sir/solar-2-gallery.webp";
import sample15 from "@/assests/gallery/sir/sprr-gallery.webp";
import sample20 from "@/assests/gallery/sir/toll-gallery.webp";
import sample24 from "@/assests/gallery/sir/wtp-gallery-2.webp";
import sample21 from "@/assests/gallery/sir/torant-gallery.webp";
import sample19 from "@/assests/gallery/sir/tata-gate-gallery.webp";

const galleryItems = [
  { id: 1, title: "ABCD Gallery", image: sample1 },
  { id: 2, title: "Activation Gallery", image: sample3 },
  { id: 3, title: "Airport Gallery", image: sample6 },
  { id: 4, title: "Renew Gallery", image: sample10 },
  { id: 5, title: "Solar Gallery", image: sample11 },
  { id: 6, title: "SPRR Gallery", image: sample15 },
  { id: 7, title: "Toll Gallery", image: sample20 },
  { id: 8, title: "Water Treatment", image: sample24 },
  { id: 9, title: "Torant Gallery", image: sample21 },
  { id: 10, title: "Tata Gate", image: sample19 },
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
                <div key={item.id} className="relative group cursor-pointer" onClick={() => openLightbox(index)}>
                  <div className="overflow-hidden rounded-lg border-2 border-[#deae3c]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                    <div className="text-white opacity-0 group-hover:opacity-100 text-center p-2">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm">Click to view</p>
                    </div>
                  </div>
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