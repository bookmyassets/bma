import React, { useState } from "react";
import {
  MapPin,
  Shield,
  Waves,
  Baby,
  Activity,
  Zap,
  Heart,
  Wifi,
  Home,
  Car,
  Users,
  Clock,
  Camera,
} from "lucide-react";
import { FaRoad } from "react-icons/fa6";

const ProjectAmenities = () => {
  const [showAll, setShowAll] = useState(false);

  const amenities = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Project Boundary",
      color: "from-gray-500 to-gray-700",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Gated Community",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <FaRoad className="w-6 h-6" />,
      title: "Internal Roads",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "24/7 Security & CCTV Surveillance",
      color: "from-red-500 to-red-700",
    },
    {
      icon: <Waves className="w-6 h-6" />,
      title: "Swimming Pool",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Baby className="w-6 h-6" />,
      title: "Kids Play Area",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Indoor Games & Gymnasium",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "App-Based Society Management",
      color: "from-teal-500 to-teal-700",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Power & Water Supply",
      color: "from-yellow-600 to-yellow-800",
    },
    {
      icon: <Heart className="w-6 h-6" />,
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

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const initialMobileItems = 6;
  const initialDesktopItems = 6;
  
  const visibleAmenities = showAll 
    ? amenities 
    : amenities.slice(0, isMobile ? initialMobileItems : initialDesktopItems);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Premium Amenities
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-xl max-w-5xl mx-auto text-gray-600 leading-relaxed">
            At WestWyn Estate, we offer more than just plots – we provide a complete lifestyle. Key amenities include:
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {visibleAmenities.map((amenity, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon with gradient background */}
              <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${amenity.color} mb-4`}>
                <div className="text-white">{amenity.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#deae3c] transition-colors duration-300">
                {amenity.title}
              </h3>
              
              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#deae3c] group-hover:opacity-30 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {amenities.length > initialMobileItems && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-[#deae3c] hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <span>View All Amenities</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectAmenities;