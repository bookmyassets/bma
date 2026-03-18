import React, { useState, useRef, useEffect } from "react";
import {
  Shield, Baby, Zap, Wifi, Car, Users, Camera, Square, User, Activity,
} from "lucide-react";
import Image from "next/image";
import img from "@/assests/image.webp";

const ProjectAmenities = () => {
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const amenities = [
    {
      icon: <Square className="w-6 h-6" />,
      title: "Project Boundary",
      color: "from-gray-500 to-gray-700",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Gated Community",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Internal Roads",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "24/7 Security & CCTV",
      color: "from-red-500 to-red-700",
    },
    {
      icon: <Baby className="w-6 h-6" />,
      title: "Kids Play Area",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "App-Based Management",
      color: "from-teal-500 to-teal-700",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Power & Water Supply",
      color: "from-yellow-600 to-yellow-800",
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Yoga Deck",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Jogging Track",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Senior Citizen Zone",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "EV Charging Station",
      color: "from-green-600 to-green-800",
    },
  ];

  const visibleAmenities = showAll ? amenities : amenities.slice(0, 12);

  // Auto-scroll for mobile only
  useEffect(() => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const CARD_WIDTH = 142; // card width (130px + 12px gap)
    let interval;

    const startAutoScroll = () => {
      interval = setInterval(() => {
        if (!isPaused && slider) {
          const maxScroll = slider.scrollWidth - slider.clientWidth;
          
          if (slider.scrollLeft >= maxScroll - 5) {
            // Reset to beginning smoothly
            slider.scrollTo({ left: 0, behavior: "smooth" });
            setCurrentIndex(0);
          } else {
            // Calculate next position
            const nextIndex = Math.floor((slider.scrollLeft + CARD_WIDTH) / CARD_WIDTH);
            const nextScroll = nextIndex * CARD_WIDTH;
            
            slider.scrollTo({ left: nextScroll, behavior: "smooth" });
            setCurrentIndex(nextIndex);
          }
        }
      }, 2500); // Scroll every 2.5 seconds
    };

    startAutoScroll();

    // Pause on user interaction
    const handleUserInteraction = () => {
      setIsPaused(true);
      // Resume after 5 seconds of inactivity
      setTimeout(() => {
        setIsPaused(false);
      }, 5000);
    };

    // Track scroll position
    const handleScroll = () => {
      if (slider) {
        const newIndex = Math.round(slider.scrollLeft / CARD_WIDTH);
        setCurrentIndex(newIndex);
      }
    };

    slider.addEventListener("touchstart", handleUserInteraction);
    slider.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      slider.removeEventListener("touchstart", handleUserInteraction);
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [isPaused]);

  // Handle manual dot navigation
  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const CARD_WIDTH = 142;
      sliderRef.current.scrollTo({
        left: index * CARD_WIDTH,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 5000);
    }
  };

  return (
    <div className="bg-white py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p 
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: "#deae3c" }}
          >
            WestWyn Estates
          </p>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#0d0d0d", letterSpacing: "-0.02em" }}
          >
            Amenities
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left panel */}
          <div className="lg:w-[50%]">
            <div className="px-4 sm:px-6 lg:px-8 aspect-[2/1]">
              <Image
                src={img}
                alt="dholera map"
                className="rounded-xl w-full h-auto aspect-[2/1]"
                priority
              />
            </div>
          </div>

          {/* Right panel */}
          <div className="w-full lg:w-[50%]">
            {/* Mobile only: horizontal slider with auto-scroll */}
            <div className="block sm:hidden">
              <div 
                ref={sliderRef} 
                className="flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-4 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {amenities.map((amenity, index) => (
                  <div
                    key={amenity.title}
                    className="flex-none w-[130px] snap-start border-2 rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#deae3c] group"
                    style={{ borderColor: "#e8e8e8" }}
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${amenity.color} rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                    >
                      <div className="text-white">{amenity.icon}</div>
                    </div>
                    <h3
                      className="text-sm font-semibold leading-snug"
                      style={{ color: "#0d0d0d" }}
                    >
                      {amenity.title}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Progress indicator and dots */}
              <div className="flex items-center justify-between mt-2">
                {/* Progress bar */}
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden mr-3">
                  <div 
                    className="h-full bg-[#deae3c] transition-all duration-300"
                    style={{ 
                      width: `${((currentIndex + 1) / amenities.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Auto-scroll indicator */}
              {!isPaused && (
                <div className="mt-3 flex justify-center">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                  </div>
                </div>
              )}
            </div>

            {/* Desktop/Tablet only: static grid */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleAmenities.map((amenity) => (
                <div
                  key={amenity.title}
                  className="border-2 rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#deae3c] group"
                  style={{ borderColor: "#e8e8e8" }}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${amenity.color} rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                  >
                    <div className="text-white">{amenity.icon}</div>
                  </div>
                  <h3
                    className="text-sm font-semibold leading-snug mb-2"
                    style={{ color: "#0d0d0d" }}
                  >
                    {amenity.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAmenities;