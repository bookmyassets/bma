"use client";
import React, { useState, useEffect } from "react";

const videos = [
  { id: 1, title: "Dholera ReNew Power", youtubeId: "129oXwderKU" },
  { id: 2, title: "Brain Of Dholera - ABCD Building", youtubeId: "faSgawUZWeY" },
  { id: 3, title: "Dholera International Airport", youtubeId: "PuLWU9DYV_c" },
  { id: 4, title: "Dholera - Ahmedabad Expressway", youtubeId: "NdH1zHVGTcQ" },
  { id: 5, title: "Dholera Semiconductor - TATA Semicon", youtubeId: "sYONhrTYBTg" },
  { id: 6, title: "Water Treatment Plant - Dholera", youtubeId: "fHLqa6YM1Aw" },
  { id: 7, title: "WestWyn County - Premium Residential Plots in Dholera", youtubeId: "0lAocID2crU" },
  { id: 8, title: "Dholera Activation Area", youtubeId: "P0a8LCMQHqI" },
];

export default function VideoSwiper() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative overflow-hidden rounded-2xl shadow-lg">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {videos.map((video) => (
          <div key={video.id} className="min-w-full flex flex-col items-center">
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full rounded-t-2xl"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-center p-4 bg-white w-full">
              {video.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        ❯
      </button>

      {/* Dots / Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {videos.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
