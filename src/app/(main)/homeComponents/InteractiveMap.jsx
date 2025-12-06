"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Assets */
import dholeraMapM from "@/assests/interactiveMap/dholera-map-3.png";
import metro from "@/assests/interactiveMap/metro.png";
import abcd from "@/assests/interactiveMap/abcd-building.png";
import dia from "@/assests/interactiveMap/dholera-international-airport.png";
import expressway from "@/assests/interactiveMap/expressway.png";
import renew from "@/assests/interactiveMap/ReNew-power.png";
import solarPark from "@/assests/interactiveMap/solar-park.png";
import tata from "@/assests/interactiveMap/tata-semicon.png";


export default function InteractiveMap() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalStyle, setModalStyle] = useState({});
  const imageRef = useRef(null);
  const modalRef = useRef(null);

  /* 📍 Mobile coordinates with detailed descriptions */
  const mobileAreas = [
    {
      id: "metro",
      title: "Dholera Monorail",
      coords: [343, 201, 376, 236],
      image: metro,
      description: "109 km long Monorail connecting Dholera to Ahmedabad Express",
      details: [
        "Approved in August 2024",
        "Construction begins in 2025",
        "Expected completion: 2027",
        "Will connect Dholera International Airport to Ahmedabad"
      ]
    },
    {
      id: "airport",
      title: "Dholera International Airport",
      coords: [464, 252, 496, 285],
      image: dia,
      description: "Greenfield International Airport Project",
      details: [
        "6,000+ acres land acquisition completed",
        "Phase 1 capacity: 30 million passengers annually",
        "Strategic location near Delhi-Mumbai Industrial Corridor",
        "Expected operational by 2027-28"
      ]
    },
    {
      id: "expressway",
      title: "Fedra-Pipil State Highway",
      coords: [330, 289, 366, 325],
      image: expressway,
      description: "Expressway connecting Dholera to major industrial hubs",
      details: [
        "8-lane access controlled expressway",
        "Connects to NH-48 and Delhi-Mumbai Expressway",
        "Reduces travel time to Ahmedabad by 40%",
        "Critical logistics corridor for industries"
      ]
    },
    {
      id: "abcd",
      title: "ABCD Building Complex",
      coords: [235, 365, 271, 402],
      image: abcd,
      description: "Administrative and Business Centre Development",
      details: [
        "Government administrative headquarters",
        "Smart city command and control centre",
        "Commercial office spaces for MNCs",
        "Integrated with smart utilities"
      ]
    },
    {
      id: "tata",
      title: "Tata Semiconductor",
      coords: [274, 417, 308, 452],
      image: tata,
      description: "Tata Semiconductor Manufacturing Facility",
      details: [
        "₹91,000 crore investment",
        "Advanced chip manufacturing plant",
        "Will create 20,000+ direct and indirect jobs",
        "First semiconductor fab in Gujarat"
      ]
    },
    {
      id: "renew",
      title: "ReNew Power Plant",
      coords: [319, 455, 355, 492],
      image: renew,
      description: "ReNew Solar Cell Manufacturing Facility",
      details: [
        "₹1,200 crore investment",
        "Solar module & cell manufacturing",
        "2.5 GW annual production capacity",
        "Currently employs 500+ skilled workers"
      ]
    },
    {
      id: "solar",
      title: "Solar Energy Park",
      coords: [367, 562, 403, 597],
      image: solarPark,
      description: "Dholera Solar Energy Park",
      details: [
        "5,000 MW solar power generation capacity",
        "One of Asia's largest solar parks",
        "Power for entire Dholera SIR",
        "Green energy for industrial and residential use"
      ]
    },
  ];

  /* 🧠 Handle area click with proper positioning */
  const handleAreaClick = (area, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Modal dimensions (adjust as needed)
    const modalWidth = Math.min(350, viewportWidth - 40);
    const modalHeight = 500; // Approximate modal height
    
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

  /* 🎯 Render clickable areas for mobile */
  const renderMobileAreas = () => {
    if (!imageRef.current || !imageLoaded) return null;

    return mobileAreas.map((area) => {
      const [x1, y1, x2, y2] = area.coords;

      // Convert coordinates to percentages
      const leftPercent = (x1 / 590) * 100;
      const topPercent = (y1 / 800) * 100;
      const widthPercent = ((x2 - x1) / 590) * 100;
      const heightPercent = ((y2 - y1) / 800) * 100;

      return (
        <button
          key={area.id}
          onClick={(e) => handleAreaClick(area, e)}
          className="absolute bg-blue-500/20 hover:bg-blue-500/30 transition-all duration-300 rounded-full border-2 border-blue-500/50 active:scale-95 touch-manipulation"
          style={{
            left: `${leftPercent}%`,
            top: `${topPercent}%`,
            width: `${widthPercent}%`,
            height: `${heightPercent}%`,
          }}
          aria-label={area.title}
          title={area.title}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
          </div>
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
    
    // Prevent body scroll when modal is open
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
        // Recalculate position on resize
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const modalWidth = Math.min(350, viewportWidth - 40);
        const modalHeight = 500;
        
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
  }, [modalOpen, selectedArea]);

  return (
    <div className="block sm:hidden max-sm:hidden bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            8 Mega Projects Powering
          </h1>
          <h2 className="text-4xl font-extrabold text-blue-700 mb-4">Dholera</h2>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
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
          <div className="relative w-full aspect-[590/800]">
            <Image
              ref={imageRef}
              src={dholeraMapM}
              alt="Dholera Mega Projects Map"
              fill
              priority
              className="object-contain select-none"
              onLoad={() => setImageLoaded(true)}
              draggable={false}
              sizes="100vw"
            />

            {/* 🔵 Clickable Areas */}
            {imageLoaded && (
              <div className="absolute inset-0">{renderMobileAreas()}</div>
            )}
          </div>
        </div>

        {/* Instruction */}
        <p className="text-center text-gray-600 mt-6 text-lg font-medium">
          <span className="inline-block w-3 h-3 bg-blue-600 rounded-full animate-pulse mr-2"></span>
          Tap on highlighted areas to explore details
        </p>

        {/* 🧩 Modal for Project Details */}
        <AnimatePresence>
          {modalOpen && selectedArea && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/80 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalOpen(false)}
              />
              
              {/* Modal Card - Fixed positioning */}
              <motion.div
                ref={modalRef}
                className="fixed z-50 modal-content bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={modalStyle}
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="flex flex-col h-full">
                  {/* Header with close button */}
                  <div className="relative h-12 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-between px-4 flex-shrink-0">
                    <h3 className="text-white font-bold text-lg truncate pr-10">
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

                      {/* Status Badge */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          Active Project • Under Development
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}