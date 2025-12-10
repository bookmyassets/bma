import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Import all your images
import img1 from "@/assests/homepage/ahmedabad-dholera-expressway.webp"
import img2 from "@/assests/homepage/ahmedabad-dholera-expressway-board.webp"
import img3 from "@/assests/homepage/ahmedabad-dholera-expressway-butterfly.webp"
import img4 from "@/assests/homepage/dholera-airport-cargo-terminal.webp"
import img5 from "@/assests/homepage/dholera-smart-city-signboard.webp"
import img6 from "@/assests/homepage/dholera-smart-city-toll.webp"
import img7 from "@/assests/homepage/infrastructure-activation-area-dholera.webp"
import img8 from "@/assests/homepage/nhai-circle-dholera.webp"
import img9 from "@/assests/homepage/renew-dholera-operational.webp"
import img10 from "@/assests/homepage/renew-solar-plant-dholera.webp"
import img11 from "@/assests/homepage/tata-semiconductor-dholera-gate.webp"
import img12 from "@/assests/homepage/water-reservoir-dholera.webp"
import img13 from "@/assests/homepage/westwyn-county-dholera-construction.webp"
import img14 from "@/assests/homepage/westwyn-estate-dholera.webp"

const images = [
  { src: img1, alt: "Ahmedabad Dholera Expressway" },
  { src: img2, alt: "Ahmedabad Dholera Expressway Board" },
  { src: img3, alt: "Ahmedabad Dholera Expressway Butterfly" },
  { src: img4, alt: "Dholera Airport Cargo Terminal" },
  { src: img5, alt: "Dholera Smart City Signboard" },
  { src: img6, alt: "Dholera Smart City Toll" },
  { src: img7, alt: "Infrastructure Activation Area Dholera" },
  { src: img8, alt: "NHAI Circle Dholera" },
  { src: img9, alt: "Renew Dholera Operational" },
  { src: img10, alt: "Renew Solar Plant Dholera" },
  { src: img11, alt: "Tata Semiconductor Dholera Gate" },
  { src: img12, alt: "Water Reservoir Dholera" },
  { src: img13, alt: "Westwyn County Dholera Construction" },
  { src: img14, alt: "Westwyn Estate Dholera" }
];

export default function Groundzero() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  // Scroll to current index
  useEffect(() => {
    if (sliderRef.current && isClient) {
      const cardWidth = window.innerWidth < 768 ? 256 + 24 : 320 + 24;
      sliderRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isClient]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowLeft') {
          setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
        } else if (e.key === 'ArrowRight') {
          setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Auto slide - Fixed version
  useEffect(() => {
    // Clear any existing interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    // Only run auto-slide when modal is closed
    if (selectedImage === null) {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 4000);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [selectedImage]);

  const handleArrowClick = (direction) => {
    // Clear the auto-play interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    // Update index
    if (direction === 'prev') {
      setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    } else {
      setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    }
    
    // Resume autoplay after 10 seconds
    setTimeout(() => {
      if (selectedImage === null) {
        autoPlayIntervalRef.current = setInterval(() => {
          setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);
      }
    }, 10000);
  };

  const handleDotClick = (index) => {
    // Clear the auto-play interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    setCurrentIndex(index);
    
    // Resume autoplay after 10 seconds
    setTimeout(() => {
      if (selectedImage === null) {
        autoPlayIntervalRef.current = setInterval(() => {
          setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);
      }
    }, 10000);
  };

  return (
    <>
      <div className='py-12 bg-white min-h-[480px]'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className='text-3xl md:text-4xl text-center font-bold text-gray-800 mb-4'>
            BookMyAssets on Ground Zero
          </p>
          <p className='text-gray-600 text-center mb-12 max-w-3xl mx-auto'>
            Explore our exclusive collection of premium properties and development sites in Dholera Smart City
          </p>
          
          {/* Slider Container */}
          <div className="relative">
            <div 
              ref={sliderRef}
              className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            >
              {images.map((image, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-64 md:w-80 mx-3 snap-center cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative w-full h-48 md:h-56">
                      <Image 
                        src={image.src} 
                        alt={image.alt}
                        fill
                        style={{objectFit: 'cover'}}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 truncate font-medium">{image.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows for larger screens */}
            {isClient && (
              <>
                <button 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hidden md:flex items-center justify-center z-10 transition-all duration-300 hover:scale-110"
                  onClick={() => handleArrowClick('prev')}
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hidden md:flex items-center justify-center z-10 transition-all duration-300 hover:scale-110"
                  onClick={() => handleArrowClick('next')}
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Expanded Image */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full animate-scaleUp">
            <button 
              className="absolute -right-12 top-0 text-white hover:text-gray-300 text-4xl transition-colors duration-300"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/40 hover:bg-black/60 p-4 rounded-full transition-all duration-300 z-10"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="relative w-full h-[70vh]">
              <Image 
                src={images[currentIndex].src} 
                alt={images[currentIndex].alt}
                fill
                style={{objectFit: 'contain'}}
                sizes="100vw"
                priority
              />
            </div>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/40 hover:bg-black/60 p-4 rounded-full transition-all duration-300 z-10"
              onClick={goToNext}
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white text-lg font-medium bg-black/50 inline-block px-6 py-3 rounded-lg backdrop-blur-sm">
                {images[currentIndex].alt}
              </p>
            </div>

            {/* Counter */}
            <div className="absolute top-4 left-4 text-white bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations and scrollbar hiding */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}