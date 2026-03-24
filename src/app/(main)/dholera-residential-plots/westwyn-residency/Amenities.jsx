import React, { useState } from "react";
import {
  Shield,
  Baby,
  Zap,
  Wifi,
  Car,
  Users,
  Camera,
  Square,
  User,
  Activity,
} from "lucide-react";
import Image from "next/image";

import { FaFilter, FaRoad, FaStore } from "react-icons/fa";

import img1 from "@/assests/residential/residency/clubresidency.webp";
import img2 from "@/assests/residential/residency/kidsplayresidency.webp";
import img3 from "@/assests/residential/residency/Villaresidency.webp";
import img4 from "@/assests/residential/residency/yogaresidency.webp";
import { FaCcDinersClub, FaHouse } from "react-icons/fa6";

const carouselImages = [
  { src: img1, alt: "WestWyn Estates - Kids Play Area" },
  { src: img2, alt: "WestWyn Estates - Project Boundary" },
  { src: img3, alt: "WestWyn Estates - Villa" },
  { src: img4, alt: "WestWyn Estates - Yoga Deck" },
];
// ✅ Moved OUTSIDE the component — not recreated on every render
const AmenityCard = ({ amenity }) => (
  <div
    className="amenity-card border-2 rounded-2xl
    p-2 sm:p-3 lg:p-4
    flex flex-col items-center justify-center text-center aspect-square"
    style={{ borderColor: "#e8e8e8" }}
  >
    <div
      className={`card-icon flex items-center justify-center
        w-8 h-8 md:w-10 md:h-10  lg:w-12 lg:h-12
        bg-gradient-to-br ${amenity.color}
        rounded-xl
        mb-2 sm:mb-3 lg:mb-4`}
    >
      <div className="text-white">{amenity.icon}</div>
    </div>
    <h3
      className="font-semibold leading-snug text-[10px] sm:text-xs lg:text-sm"
      style={{ color: "#0d0d0d" }}
    >
      {amenity.title}
    </h3>
  </div>
);

const amenities = [
  {
    icon: <Square className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Project Boundary",
    color: "from-gray-500 to-gray-700",
  },
  {
    icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Gated Community",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "24/7 Security & CCTV",
    color: "from-red-500 to-red-700",
  },
  {
    icon: <Baby className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Kids Play Area",
    color: "from-purple-400 to-pink-400",
  },
  {
    icon: <Wifi className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "App-Based Management",
    color: "from-teal-500 to-teal-700",
  },
  {
    icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Power & Water Supply",
    color: "from-yellow-600 to-yellow-800",
  },
  {
    icon: <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Yoga Deck",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Jogging Track",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Senior Citizen Zone",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Car className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "EV Charging Station",
    color: "from-green-600 to-green-800",
  },
  {
    icon: <FaRoad className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Wide Internal Roads",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: <FaStore className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Clubhouse Lite",
    color: "from-blue-600 to-blue-800",
  },
];

const ProjectAmenities = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleAmenities = showAll ? amenities : amenities.slice(0, 6);
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);
  const next = () => setCurrent((c) => (c + 1) % carouselImages.length);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .amenity-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .amenity-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(222,174,60,0.14);
          border-color: #deae3c !important;
        }
        .amenity-card:hover .card-icon {
          transform: scale(1.12) rotate(-4deg);
        }
        .card-icon { transition: transform 0.3s ease; }
        .show-btn {
          transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }
        .show-btn:hover {
          box-shadow: 0 8px 24px rgba(222,174,60,0.3);
        }
      `}</style>

      <div className="bg-white py-4 sm:py-10 lg:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-4 lg:mb-8">
            <p
              className="font-bold tracking-[0.25em] uppercase mb-3
                text-xl sm:text-2xl lg:text-3xl"
              style={{ color: "#deae3c" }}
            >
              WestWyn Residency
            </p>
            <h2
              className="font-bold mb-4 text-lg sm:text-2xl lg:text-3xl"
              style={{ color: "#0d0d0d", letterSpacing: "-0.02em" }}
            >
              Amenities
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
            {/* Left — Image */}
            {/* Left — Carousel */}
            <div className="relative px-4 sm:px-6 lg:px-8 aspect-[5/4] w-full h-full group">
              {/* Original image — style completely unchanged */}
              <Image
                src={carouselImages[current].src}
                alt={carouselImages[current].alt}
                className="rounded-xl w-full aspect-[5/4] md:h-full h-auto overflow-hidden object-fit"
                priority
              />

              {/* Prev button */}
              <button
                onClick={prev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30
      w-8 h-8 sm:w-10 sm:h-10
      bg-white/80 hover:bg-white
      rounded-full shadow-lg
      flex items-center justify-center
      transition-all duration-200 hover:scale-110
      opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <svg
                  className="w-4 h-4 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next button */}
              <button
                onClick={next}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30
      w-8 h-8 sm:w-10 sm:h-10
      bg-white/80 hover:bg-white
      rounded-full shadow-lg
      flex items-center justify-center
      transition-all duration-200 hover:scale-110
      opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <svg
                  className="w-4 h-4 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                {carouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-6 h-2 bg-[#deae3c]"
                        : "w-2 h-2 bg-white/70 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right — Amenities */}
            <div className="w-full">
              {/* Mobile */}
              <div className="block lg:hidden">
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                  {visibleAmenities.map((amenity) => (
                    <AmenityCard key={amenity.title} amenity={amenity} />
                  ))}
                </div>
                {amenities.length > 6 && (
                  <div className="flex justify-center mt-6 sm:mt-8">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="show-btn bg-[#deae3c] text-white
                        px-6 sm:px-8 py-2 sm:py-3
                        rounded-full font-semibold
                        text-xs sm:text-sm
                        hover:bg-opacity-90 transition-all"
                    >
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-4 gap-4">
                  {amenities.map((amenity) => (
                    <AmenityCard key={amenity.title} amenity={amenity} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectAmenities;
