"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      alt: "Event gathering 1"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
      alt: "Event gathering 2"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
      alt: "Event gathering 3"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
      alt: "Event gathering 4"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
      alt: "Event gathering 5"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
      alt: "Event gathering 6"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      alt: "Event gathering 7"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
      alt: "Event gathering 8"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
      alt: "Event gathering 9"
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop",
      alt: "Event gathering 10"
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
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-semibold mb-8">Event Gallery</h2>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
            <div className="max-w-5xl max-h-[90vh] flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg"
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