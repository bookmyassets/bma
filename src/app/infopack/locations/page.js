"use client"
import React, { useState, useEffect, useRef } from "react";


const locations = [
  {
    name: "Orchid Township",
    coordinates: "22°21'50.2\"N 72°11'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3689.7267443410783!2d72.1885556!3d22.363944399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDIxJzUwLjIiTiA3MsKwMTEnMTguOCJF!5e0!3m2!1sen!2sin!4v1742204914354!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/WkCLTWstRABSY6jA7?g_st=iw",
  },
  {
    name: "Dholera International Airport",
    coordinates: "22°31'50.2\"N 72°02'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57812.81960503426!2d72.29363084274443!3d22.343902600491873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f210061a11ded%3A0xd9b68d7064988291!2sYashnand%20Engineers%20and%20Contractors%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1742205039372!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/zmuKb7sAwUt1cimp9",
  },
  {
    name: "TATA Semiconductor",
    coordinates: "22°41'50.2\"N 72°21'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.300263675601!2d72.1980051!3d22.2286835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f25005f33eaa3%3A0x15756b95b1ebde4a!2sTata%20Electronics%20Private%20Limited!5e0!3m2!1sen!2sin!4v1742205122068!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/j7QTwgdeFNBF4Fer9",
  },
];

const generateMetadata = () => {

  return {
    title: "BookMyAssets Info Pack: Exclusive Investment Opportunities in Dholera Smart City",
    description:
      "Request your exclusive Info Pack from BookMyAssets to explore premium residential and commercial investment opportunities in Dholera Smart City. Get expert guidance and insights today.", 
    keywords:
      "BookMyAssets, Info Pack",
  };
}

export default function LocationsComponent() {
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [heights, setHeights] = useState({});
  const contentRefs = useRef(locations.map(() => React.createRef()));

  

  const canonicalUrl = `https://www.bookmyassets.com/infopack/locations`

  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode("list");
      }
    };

    // Set initial value
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Calculate heights for smooth animations
  useEffect(() => {
    const newHeights = {};
    contentRefs.current.forEach((ref, index) => {
      if (ref.current) {
        newHeights[index] = ref.current.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, [expandedLocation]);

  const toggleLocation = (index) => {
    if (expandedLocation === index) {
      setExpandedLocation(null);
    } else {
      setExpandedLocation(index);
    }
  };

  // List view for mobile
  const renderListView = () => {
    return (
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <link rel="canonical" href={canonicalUrl}/>
        {locations.map((location, index) => (
          <div key={index} className="border-b last:border-b-0 border-gray-300">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-300"
              onClick={() => toggleLocation(index)}
            >
              <h2 className="text-2xl font-semibold text-gray-900 transition-colors duration-300">
                {location.name}
              </h2>
              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                expandedLocation === index ? 'bg-[#d8b66d] text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-transform duration-500 ${expandedLocation === index ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </span>
            </div>
            
            <div 
              className="overflow-hidden transition-all duration-500 ease-in-out" 
              style={{ 
                maxHeight: expandedLocation === index ? `${heights[index]}px` : '0px',
                opacity: expandedLocation === index ? 1 : 0
              }}
            >
              <div 
                ref={contentRefs.current[index]} 
                className="p-4 bg-gray-50"
              >
                <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-4 transform transition-transform duration-500 ease-out">
                  <iframe
                    src={location.mapSrc}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={location.name}
                  />
                </div>
                <div className="flex justify-center transform transition-all duration-500 ease-out">
                  <a
                    href={location.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full text-center"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Grid view for desktop
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 pt-40">
        <link rel="canonical" href={canonicalUrl}/>
        {locations.map((location, index) => (
          <div
            key={index}
            className="bg-[#151f28] rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl text-center font-semibold text-[#f1cf86]">
                {location.name}
              </h2>
            </div>
            <div className="relative w-full">
              <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-[21/9]">
                <iframe
                  src={location.mapSrc}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={location.name}
                />
              </div>
            </div>
            <div className="p-4 bg-[#151f28] flex justify-center items-center">
              <a
                href={location.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-center font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-3 px-4 py-40 sm:px-6 lg:px-8">
      <link rel="canonical" href={canonicalUrl}/>
     {/*  <h1 className="md:text-5xl font-bold text-3xl text-center text-gray-500 p-4 animate-fadeIn">DHOLERA LOCATIONS</h1> */}
      <p className="text-center md:text-xl md:font-medium font-semibold mb-6 animate-fadeIn">
        Know more about nearby landmarks and our project's location on Google Maps
      </p>
      
      {/* Toggle view buttons for desktop */}
      {!isMobile && (
        <div className="flex justify-center mb-6 animate-fadeIn">
          <div className="inline-flex rounded-md shadow-2xl" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-[#d8b66d] text-white border-[#d8b66d]"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid View
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-[#d8b66d] text-white border-[#d8b66d]"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              List View
            </button>
          </div>
        </div>
      )}
      
      {/* Add animation for the container */}
      <div className="animate-fadeIn">
        {isMobile || viewMode === "list" ? renderListView() : renderGridView()}
      </div>
      
      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}