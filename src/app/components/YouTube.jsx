"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const showNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shortsData.length);
  }, [shortsData.length]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shortsData.length) % shortsData.length);
  }, [shortsData.length]);

  useEffect(() => {
    const interval = setInterval(showNext, 7000);
    return () => clearInterval(interval);
  }, [showNext]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPrev, showNext]);

  return (
    <section 
      className="bg-black py-12 overflow-hidden " 
      aria-label="YouTube Shorts Carousel"
    >
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-4xl text-white font-bold text-center mb-8">
          Latest Shorts
        </h2>
        
        <div className="relative flex justify-center items-center">
          <motion.div 
            className="flex gap-4 md:gap-10" 
            animate={{ x: -currentIndex * (isMobile ? 360 : 480) }} 
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15 
            }}
          >
            {shortsData.map((short) => (
              <div 
                key={short.id} 
                className="w-[350px] md:w-[470px] flex-shrink-0"
                role="group" 
                aria-roledescription="Short video"
              >
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl p-4">
                  <iframe 
                    className="w-full h-[620px] md:h-[750px] rounded-xl" 
                    src={short.embedUrl} 
                    title={short.title} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="lazy"
                  ></iframe>
                  <div className="p-4 text-center">
                    <h3 className="text-white font-semibold text-lg line-clamp-2">
                      {short.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
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
            className="bg-[#dfb03c] text-black px-6 py-3 rounded-full hover:bg-yellow-500 transition text-lg"
          >
            ←
          </button>
          <button 
            onClick={showNext} 
            aria-label="Next short"
            className="bg-[#dfb03c] text-black px-6 py-3 rounded-full hover:bg-yellow-500 transition text-lg"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}