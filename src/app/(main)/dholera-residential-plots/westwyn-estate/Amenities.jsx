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
import img from "@/assests/homepage/hero2/test/westwyn-estates-dholera-villas.webp";
import { FaFilter, FaRoad } from "react-icons/fa";

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
    icon: <FaFilter className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    title: "Drainage System",
    color: "from-blue-600 to-blue-800",
  },
];

const ProjectAmenities = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleAmenities = showAll ? amenities : amenities.slice(0, 6);

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

      <div className="bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <p
              className="font-bold tracking-[0.25em] uppercase mb-3
                text-xl sm:text-2xl lg:text-3xl"
              style={{ color: "#deae3c" }}
            >
              WestWyn Estates
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
            <div className="px-4 sm:px-6 lg:px-8 aspect-[5/4]">
              <Image
                src={img}
                alt="dholera map"
                className="rounded-xl w-full aspect-[5/4] md:h-full h-auto"
                priority
              />
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
