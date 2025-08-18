import React, { useState } from "react";
import {
  Home,
  Shield,
  Waves,
  Car,
  Lightbulb,
  Trees,
  Activity,
  Users,
  Zap,
  MapPin,
  Heart,
  Baby,
  Globe,
} from "lucide-react";

const ProjectAmenities = () => {
  const [showAll, setShowAll] = useState(false);

  const amenities = [
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Indoor Games & Gymnasium",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Automated Street Light",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Internal Roads",
      color: "from-gray-600 to-gray-800",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Hall & Co-Working Space",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "EV Charging Station",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Swimming Pool",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Gated Community",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "24/7 Security & CCTV Surveillance",
     color: "from-red-500 to-red-700",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Project Boundary",
      color: "from-gray-500 to-gray-700",
    },
    {
      icon: <Trees className="w-8 h-8" />,
      title: "Tree Plantation",
       color: "from-green-600 to-green-800",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Yoga Deck & Senior Citizen Zone",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "App-based Society Management",
      color: "from-teal-500 to-teal-700",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Power & Water Supply",
      color: "from-yellow-600 to-yellow-800",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Jogging Track",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Kids Play Area",
      color: "from-purple-400 to-pink-400",
    },
  ];

  const visibleAmenities = showAll ? amenities : amenities.slice(0, 6);

  return (
    <div className="bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h4 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#0d0d0d" }}>
            Amenities
          </h4>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: "#deae3c" }}></div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: "#0d0d0d" }}>
            Discover world-class amenities designed to elevate your lifestyle
            with luxury, comfort, and convenience at every step.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-4">
          {visibleAmenities.map((amenity, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ "--hover-border": "#deae3c" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#deae3c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              {/* Icon Container */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${amenity.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{amenity.icon}</div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-medium mb-3 transition-colors duration-300" style={{ color: "#0d0d0d" }}>
                  {amenity.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Less Button */}
        <div className="text-center mt-10">
          <button
            className="px-6 py-3 bg-[#deae3c] text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectAmenities;
