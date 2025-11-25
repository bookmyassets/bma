"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import img1 from "@/assests/bma-events/event-gallery/event-1.webp"
import img2 from "@/assests/bma-events/event-gallery/event-2.webp"
import img3 from "@/assests/bma-events/event-gallery/event-3.webp"
import img4 from "@/assests/bma-events/event-gallery/event-4.webp"
import img5 from "@/assests/bma-events/event-gallery/event-5.webp"
import img6 from "@/assests/bma-events/event-gallery/event-6.webp"
import img7 from "@/assests/bma-events/event-gallery/event-7.webp"
import img8 from "@/assests/bma-events/event-gallery/event-8.webp"
import img9 from "@/assests/bma-events/event-gallery/event-9.webp"
import img10 from "@/assests/bma-events/event-gallery/event-10.webp"
import img11 from "@/assests/bma-events/event-gallery/event-11.webp"
import img12 from "@/assests/bma-events/event-gallery/event-12.webp"

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      url: img1,
      alt: "Event gathering 1"
    },
    {
      id: 2,
      url: img2,
      alt: "Event gathering 2"
    },
    {
      id: 3,
      url: img3,
      alt: "Event gathering 3"
    },
    {
      id: 4,
      url: img4,
      alt: "Event gathering 4"
    },
    {
      id: 5,
      url: img5,
      alt: "Event gathering 5"
    },
    {
      id: 6,
      url: img6,
      alt: "Event gathering 6"
    },
    {
      id: 7,
      url: img7,
      alt: "Event gathering 7"
    },
    {
      id: 8,
      url: img8,
      alt: "Event gathering 8"
    },
    {
      id: 9,
      url: img9,
      alt: "Event gathering 9"
    },
    {
      id: 10,
      url: img10,
      alt: "Event gathering 10"
    },
    {
      id: 11,
      url: img11,
      alt: "Event gathering 11"
    },
    {
      id: 12,
      url: img12,
      alt: "Event gathering 12"
    }
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-center text-3xl font-semibold mb-8">Event Gallery</h2>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openLightbox(image)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous Button */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative max-w-3xl w-full h-[90vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                sizes="100vw"
                className="object-contain rounded-lg"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-20 px-4 py-2 rounded-full text-white text-sm">
              {galleryImages.findIndex(img => img.id === selectedImage.id) + 1} / {galleryImages.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}