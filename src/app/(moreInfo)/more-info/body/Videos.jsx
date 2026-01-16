"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Dholera Recap",
    youtubeId: "7XXb9IsHfqE?si=dAGd0bmx2URgdLf2",
  },
  {
    id: 2,
    title: "Top 5 Infrastructure Projects in Dholera",
    youtubeId: "7sDjRg2YxJE?si=ibQa2suEahioK8IM",
  },
  {
    id: 3,
    title: "Dholera Smart City",
    youtubeId: "hSc-pwOCu6Q?si=vdlRKEgrRHTV-Id_",
  },
];

export default function Dholeravideos() {
  const [videoStates, setVideoStates] = useState(
    videos.map(() => ({ isPlaying: false, isLoading: false }))
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Math.ceil(videos.length / (isMobile ? 1 : 3)));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoplay, isMobile]);

  const handlePlay = (index) => {
    setVideoStates((prev) =>
      prev.map((v, i) =>
        i === index ? { isPlaying: true, isLoading: true } : v
      )
    );
    setIsAutoplay(false);
  };

  const handleLoad = (index) => {
    setVideoStates((prev) =>
      prev.map((v, i) => (i === index ? { ...v, isLoading: false } : v))
    );
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % Math.ceil(videos.length / (isMobile ? 1 : 3)));
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? Math.ceil(videos.length / (isMobile ? 1 : 3)) - 1 : prev - 1);
    setIsAutoplay(false);
  };

  const goToSlide = (slide) => {
    setCurrentSlide(slide);
    setIsAutoplay(false);
  };

  const totalSlides = Math.ceil(videos.length / (isMobile ? 1 : 3));

  return (
    <div className="bg-white" id="videos">
      <div className="space-y-4">
        <div className="relative pt-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-xl font-bold md:text-[32px] mb-2 text-[#deae3c]">
             Popular Videos About Dholera on YouTube
            </h2>
            <p className="text-center text-xl text-black mb-8">
              Watch our expert videos covering infrastructure updates, major companies investing in Dholera, investment safety checklists, and more.
            </p>

            <div className="relative">
              <div className="overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }, (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6 px-4 md:px-12`}>
                        {(isMobile ? [videos[slideIndex]] : videos.slice(slideIndex * 3, (slideIndex * 3) + 3)).map((video, index) => {
                          const globalIndex = isMobile ? slideIndex : slideIndex * 3 + index;
                          return (
                            <div key={video.id} className="w-full h-80">
                              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#deae3c] via-[#deae3c] to-[#c49a2f]"></div>
                                
                                <div className="p-4">
                                  <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                                      <>
                                   
                                        {videoStates[globalIndex]?.isLoading && (
                                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                            <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-[#deae3c] animate-spin"></div>
                                          </div>
                                        )}
                                        <iframe
                                          className="w-full h-full"
                                          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                                          title={video.title}
                                          frameBorder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                          referrerPolicy="strict-origin-when-cross-origin"
                                          allowFullScreen
                                          onLoad={() => handleLoad(globalIndex)}
                                        />
                                      </>
                                    
                                  </div>

                                  <h3 className="mt-4 text-lg font-semibold text-gray-800 line-clamp-2">
                                    {video.title}
                                  </h3>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-100">
                                  <div className="text-sm text-gray-500">
                                    BookMyAssets
                                  </div>
                                  <div className="flex space-x-3">
                                    <button className="text-gray-500 hover:text-[#deae3c] transition-colors">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                      </svg>
                                    </button>
                                    <button className="text-gray-500 hover:text-[#deae3c] transition-colors">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6 md:hidden">
                <button
                  onClick={prevSlide}
                  className="bg-[#deae3c] hover:bg-[#c49a2f] text-white p-3 rounded-full shadow-lg transition-all duration-300 mx-2"
                  disabled={totalSlides <= 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-[#deae3c] hover:bg-[#c49a2f] text-white p-3 rounded-full shadow-lg transition-all duration-300 mx-2"
                  disabled={totalSlides <= 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {totalSlides > 1 && (
                <div className="flex justify-center space-x-2 mt-8">
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                        ? 'bg-[#deae3c] scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}