"use client"
import React, { useState } from "react";

export default function ShortsSection() {
  // Sample data for 6 shorts - converting YouTube URLs to embed format
  const shortsData = [
    {
      id: 1,
      title: "Bitcoin vs Real Estate",
      views: "150K",
      embedUrl: "https://www.youtube.com/embed/D3k1SWpMm5A",
    },
    {
      id: 2,
      title: "Residential Plots in Dholera",
      views: "98K",
      embedUrl: "https://www.youtube.com/embed/Z_eAOB62PDk",
    },
    {
      id: 3,
      title: "Dholera Investment",
      views: "210K",
      embedUrl: "https://www.youtube.com/embed/Zp4trZk-Hnw",
    },
    {
      id: 4,
      title: "Real Estate Tips",
      views: "85K",
      embedUrl: "https://www.youtube.com/embed/rHSlc1hhr8Q",
    },
    {
      id: 5,
      title: "Dholera Smart City",
      views: "120K",
      embedUrl: "https://www.youtube.com/embed/sMN4WychUPI",
    },
    {
      id: 6,
      title: "Dholera Smart City",
      views: "175K",
      embedUrl: "https://www.youtube.com/embed/sMN4WychUPI",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to navigate through shorts
  const showNext = () => {
    if (currentIndex < shortsData.length - 3) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const showPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(shortsData.length - 3); // Loop to end
    }
  };

  // Get current visible shorts
  const visibleShorts = shortsData.slice(currentIndex, currentIndex + 3);

  return (
    <div className="bg-black py-12">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl text-white font-bold text-center mb-8">
          Latest Shorts
        </h2>

        {/* Navigation controls */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={showPrev}
            className="bg-[#dfb03c] text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition"
          >
            ← Prev
          </button>
          <span className="text-white">
            {currentIndex + 1}-{currentIndex + 3} of {shortsData.length}
          </span>
          <button
            onClick={showNext}
            className="bg-[#dfb03c] text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition"
          >
            Next →
          </button>
        </div>

        {/* Shorts iframe container */}
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-6">
          {visibleShorts.map((short) => (
            <div key={short.id} className="w-full md:w-1/3 flex flex-col">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg h-full">
                {/* YouTube iframe */}
                <div className="relative w-full" style={{ paddingBottom: "177%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-t-xl"
                    src={`${short.embedUrl}?si=1cZBajlxtve20MFE`}
                    title={short.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Short details */}
                <div className="p-3">
                  <h3 className="text-white font-medium truncate">
                    {short.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{short.views} views</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote section */}
        <p className="text-[#dfb03c] font-light md:text-center mt-24 text-2xl md:text-6xl mx-8">
          ❝ <br /> Don't wait to buy real estate, buy real estate and wait.
          <br />
          <span className="md:text-4xl text-xl block text-right mt-4">
            ~ Will Rogers
          </span>
        </p>
      </div>
    </div>
  );
}