import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import dholeraMapM from "@/assests/interactiveMap/dholera-map-3.png";
import dholeraMapD from "@/assests/interactiveMap/mapResize.webp";
import solarPark from "@/assests/interactiveMap/solar-park-img.png"
import monorail from "@/assests/interactiveMap/monorail-img.png"

export default function InteractiveMap() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalStyle, setModalStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null);
  const modalRef = useRef(null);

  const videos = [
    {
      id: "6_BYJo1_HFU",
      title: "[2025] PROGRESS: TATA Semiconductor Plant in Dholera",
      duration: "4:55"
    },
    {
      id: "3iiF6Oix5Fc",
      title: "ReNew's Solar Cell Manufacturing Plant",
      duration: "unknown"
    },
    {
      id: "RITjLu6hRxc",
      title: "Dholera International Airport",
      duration: "unknown"
    },
    {
      id: "5DaF8tljkkU",
      title: "Ahmedabad-Dholera Expressway",
      duration: "unknown"
    },
    {
      id: "3u8yJ5XYNns",
      title: "ABCD Building",
      duration: "unknown"
    },
  ];

  /* 📍 Mobile and Desktop coordinates with detailed descriptions */
  const mobileAreas = [
    {
      id: "metro",
      title: "Dholera Monorail",
      coords: [343, 201, 376, 236],
      desktopCoords: [825, 131, 863, 167],
      description: "109 km long Monorail along Dholera Ahmedabad Expressway",
      details: [
        "Approved in August 2025",
        "Construction begins in 2026",
        "Expected completion: 2029",
      ],
      image: monorail, // Use image instead of video
      type: "image"
    },
    {
      id: "airport",
      title: "Dholera International Airport",
      coords: [464, 252, 496, 285],
      desktopCoords: [941, 172, 979, 211],
      description: "Greenfield International Airport Project",
      details: [
        "India's Second Largest Airport",
        "Spread Across 1400+ hectares",
        "Construction work to be Completed in December 2025"
      ],
      videoId: "RITjLu6hRxc",
      type: "video"
    },
    {
      id: "expressway",
      title: "Fedra-Pipil State Highway",
      coords: [330, 289, 366, 325],
      desktopCoords: [820, 217, 858, 254],
      description: "Expressway connecting Dholera to major industrial hubs",
      details: [
        "109km Expressway, cuts Travel Time to Under 45 minutes",
        "Reduces travel time to Ahmedabad by 40%",
        "Critical logistics corridor for industries"
      ],
      videoId: "5DaF8tljkkU",
      type: "video"
    },
    {
      id: "abcd",
      title: "ABCD Building Complex",
      coords: [235, 365, 271, 402],
      desktopCoords: [728, 278, 764, 316],
      description: "Administrative and Business Centre Development",
      details: [
        "One Stop Hub for all Administrative & Construction",
        "Smart city command and control centre",
        "Real Time Control of Roads & Electricity",
      ],
      videoId: "3u8yJ5XYNns",
      type: "video"
    },
    {
      id: "tata",
      title: "Tata Semiconductor",
      coords: [274, 417, 308, 452],
      desktopCoords: [766, 325, 804, 367],
      description: "Tata Semiconductor Manufacturing Facility",
      details: [
        "₹91,000 Crore Investment",
        "Will create 20,000+ Direct and Indirect Jobs",
        "First semiconductor fab in India"
      ],
      videoId: "6_BYJo1_HFU",
      type: "video"
    },
    {
      id: "renew",
      title: "ReNew Power Plant",
      coords: [319, 455, 355, 492],
      desktopCoords: [811, 367, 849, 406],
      description: "ReNew Solar Cell & Module Manufacturing Plant",
      details: [
        "₹1,200 crore investment",
        "Solar Module & Cell Manufacturing",
        "2.5 GW Solar Cell Manufacturing",
        "Currently Employs 1000+ Professionals"
      ],
      videoId: "3iiF6Oix5Fc",
      type: "video"
    },
    {
      id: "solar",
      title: "Solar Energy Park",
      coords: [367, 562, 403, 597],
      desktopCoords: [851,436,893,473],
      description: "Dholera Solar Energy Park",
      details: [
        "5,000 MW Solar Power Generation Capacity",
        "Asia's Largest Solar Park",
        "Currently Operating at 400MW Capacity in 1650 acres",
      ],
      image: solarPark, // Use image instead of video
      type: "image"
    },
  ];

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* 🧠 Handle area click with proper positioning */
  const handleAreaClick = (area, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Modal dimensions based on screen size
    const modalWidth = isMobile ? Math.min(350, viewportWidth - 40) : Math.min(450, viewportWidth - 100);
    const modalHeight = isMobile ? 500 : 600;
    
    // Calculate modal position - always centered
    const left = (viewportWidth - modalWidth) / 2;
    
    // For top position, ensure modal doesn't go off screen
    let top = (viewportHeight - modalHeight) / 2;
    top = Math.max(20, Math.min(top, viewportHeight - modalHeight - 20));
    
    setModalStyle({
      left: `${left}px`,
      top: `${top}px`,
      width: `${modalWidth}px`,
      maxHeight: `${viewportHeight - 40}px`,
    });
    
    setSelectedArea(area);
    setModalOpen(true);
  };

  /* 🎯 Render clickable areas */
  const renderAreas = () => {
    if (!imageRef.current || !imageLoaded) return null;

    return mobileAreas.map((area) => {
      let x1, y1, x2, y2;
      
      if (isMobile) {
        [x1, y1, x2, y2] = area.coords;
      } else {
        [x1, y1, x2, y2] = area.desktopCoords;
      }

      // Convert coordinates to percentages
      // Desktop image actual dimensions: ~1200x640 (based on coordinate map)
      const leftPercent = (x1 / (isMobile ? 590 : 1200)) * 100;
      const topPercent = (y1 / (isMobile ? 800 : 640)) * 100;
      const widthPercent = ((x2 - x1) / (isMobile ? 590 : 1200)) * 100;
      const heightPercent = ((y2 - y1) / (isMobile ? 800 : 640)) * 100;

      return (
        <button
          key={area.id}
          onClick={(e) => handleAreaClick(area, e)}
          className="absolute  transition-all duration-300 rounded-full active:scale-95 touch-manipulation"
          style={{
            left: `${leftPercent}%`,
            top: `${topPercent}%`,
            width: `${widthPercent}%`,
            height: `${heightPercent}%`,
          }}
          aria-label={area.title}
          title={area.title}
        > 
        </button>
      );
    });
  };

  /* 🪄 Close modal when clicking outside */
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !e.target.closest("button[aria-label]")
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (modalOpen && selectedArea) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const modalWidth = isMobile ? Math.min(350, viewportWidth - 40) : Math.min(450, viewportWidth - 100);
        const modalHeight = isMobile ? 500 : 600;
        
        const left = (viewportWidth - modalWidth) / 2;
        let top = (viewportHeight - modalHeight) / 2;
        top = Math.max(20, Math.min(top, viewportHeight - modalHeight - 20));
        
        setModalStyle({
          left: `${left}px`,
          top: `${top}px`,
          width: `${modalWidth}px`,
          maxHeight: `${viewportHeight - 40}px`,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [modalOpen, selectedArea, isMobile]);

  // Get video for selected area
  const getAreaVideo = (areaId) => {
    const area = mobileAreas.find(a => a.id === areaId);
    if (area && area.videoId) {
      return videos.find(v => v.id === area.videoId);
    }
    return null;
  };

  return (
    <div className="block bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className={`mx-auto ${isMobile ? 'max-w-md' : 'max-w-6xl'}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            8 Mega Projects Powering
          </h2>
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">Dholera</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>Fedra-Pipil State Highway</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Navda</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
          <div className={`relative ${isMobile ? 'aspect-[590/800]' : 'aspect-[1200/675]'}`}>
            <Image
              ref={imageRef}
              src={isMobile ? dholeraMapM : dholeraMapD}
              alt="Dholera Mega Projects Map"
              className="absolute inset-0 w-full h-full object-cover select-none"
              onLoad={() => setImageLoaded(true)}
              draggable={false}
            />

            {/* 🔵 Clickable Areas */}
            {imageLoaded && (
              <div className="absolute inset-0">{renderAreas()}</div>
            )}
          </div>
        </div>

        {/* Instruction */}
        <p className="text-center text-gray-600 mt-6 text-lg font-medium">
          <span className="inline-block w-3 h-3 rounded-full animate-pulse mr-2"></span>
          {isMobile ? 'Tap' : 'Click'} on highlighted areas to explore details
        </p>

        {/* 🧩 Modal for Project Details */}
        {modalOpen && selectedArea && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setModalOpen(false)}
            />
            
            {/* Modal Card */}
            <div
              ref={modalRef}
              className="fixed z-50 modal-content bg-white rounded-2xl shadow-2xl overflow-hidden"
              style={modalStyle}
            >
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="relative h-12 bg-black flex items-center justify-between px-4 flex-shrink-0">
                  <h3 className="text-[#deae3c] font-bold text-lg truncate pr-10">
                    {selectedArea.title}
                  </h3>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="absolute right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xl hover:bg-white/30 transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1">
                  {/* Video Embed or Image based on type */}
                  {selectedArea.type === "video" && getAreaVideo(selectedArea.id) && (
                    <div className="p-4 pb-0">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${getAreaVideo(selectedArea.id).id}`}
                          title={getAreaVideo(selectedArea.id).title}
                          frameBorder="0"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        {getAreaVideo(selectedArea.id).title}
                      </p>
                    </div>
                  )}

                  {/* Image for solar and monorail */}
                  {selectedArea.type === "image" && selectedArea.image && (
                    <div className="p-4 pb-0">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <Image
                          src={selectedArea.image}
                          alt={selectedArea.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Project Overview
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {selectedArea.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Key Highlights
                      </h4>
                      <ul className="space-y-2">
                        {selectedArea.details.map((detail, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}