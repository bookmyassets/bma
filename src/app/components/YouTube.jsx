"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";

export default function ShortsSection() {
  const shortsData = useMemo(() => [
    { id: 1, title: "Bitcoin vs Real Estate", views: "150K", embedUrl: "https://www.youtube.com/embed/D3k1SWpMm5A" },
    { id: 2, title: "Residential Plots in Dholera", views: "98K", embedUrl: "https://www.youtube.com/embed/Z_eAOB62PDk" },
    { id: 3, title: "Dholera Investment", views: "210K", embedUrl: "https://www.youtube.com/embed/Zp4trZk-Hnw" },
    { id: 4, title: "Real Estate Tips", views: "85K", embedUrl: "https://www.youtube.com/embed/rHSlc1hhr8Q" },
    { id: 5, title: "Dholera Smart City", views: "120K", embedUrl: "https://www.youtube.com/embed/sMN4WychUPI" },
    { id: 6, title: "Dholera Smart City", views: "175K", embedUrl: "https://www.youtube.com/embed/sMN4WychUPI" },
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Track if any video is playing
  const handleVideoPlay = useCallback(() => {
    setIsPlaying(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false);
    startAutoSlide();
  }, []);

  // Set up event listeners for videos
  useEffect(() => {
    const videos = document.querySelectorAll('iframe');
    videos.forEach(video => {
      // Note: Due to YouTube iframe restrictions, we can't directly detect play/pause
      // This is a workaround using mouse events
      video.addEventListener('mouseenter', handleVideoPlay);
      video.addEventListener('mouseleave', handleVideoPause);
      video.addEventListener('touchstart', handleVideoPlay);
    });

    return () => {
      videos.forEach(video => {
        video.removeEventListener('mouseenter', handleVideoPlay);
        video.removeEventListener('mouseleave', handleVideoPause);
        video.removeEventListener('touchstart', handleVideoPlay);
      });
    };
  }, [handleVideoPlay, handleVideoPause]);

  // Check mobile view
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const showNext = useCallback(() => {
    if (!isPlaying) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shortsData.length);
    }
  }, [shortsData.length, isPlaying]);

  const showPrev = useCallback(() => {
    if (!isPlaying) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + shortsData.length) % shortsData.length);
    }
  }, [shortsData.length, isPlaying]);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(showNext, 7000);
  }, [showNext]);

  // Auto slide effect
  useEffect(() => {
    if (!isPlaying) {
      startAutoSlide();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoSlide, isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPrev, showNext]);

  // Calculate the offset to center the current short
  const calculateOffset = () => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const shortWidth = isMobile ? 350 : 470;
    return (containerWidth - shortWidth) / 2 - currentIndex * shortWidth;
  };

  return (
    <section 
      className="bg-black py-12 overflow-hidden" 
      aria-label="YouTube Shorts Carousel"
    >
      <div className="p-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-white font-bold text-center mb-8">
          Latest Shorts
        </h2>
        
        <div 
          className="relative overflow-hidden"
          ref={containerRef}
        >
          <motion.div 
            className="flex gap-4 md:gap-6"
            animate={{ x: calculateOffset() }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15 
            }}
          >
            {shortsData.map((short) => (
              <div 
                key={short.id} 
                className={`w-[350px] md:w-[470px] flex-shrink-0 transition-opacity ${
                  shortsData[currentIndex].id === short.id ? 'opacity-100' : 'opacity-70'
                }`}
                role="group" 
                aria-roledescription="Short video"
              >
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl p-2 md:p-4">
                  <iframe 
                    className="w-full h-[500px] md:h-[750px] rounded-xl" 
                    src={short.embedUrl} 
                    title={short.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="lazy"
                  ></iframe>
                  <div className="p-2 md:p-4 text-center">
                    <h3 className="text-white font-semibold text-base md:text-lg line-clamp-2">
                      {short.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm mt-1">
                      {short.views} views
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={showPrev} 
            aria-label="Previous short"
            className="bg-[#dfb03c] text-black px-6 py-2 md:py-3 rounded-full hover:bg-yellow-500 transition text-lg"
          >
            ←
          </button>
          <button 
            onClick={showNext} 
            aria-label="Next short"
            className="bg-[#dfb03c] text-black px-6 py-2 md:py-3 rounded-full hover:bg-yellow-500 transition text-lg"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}