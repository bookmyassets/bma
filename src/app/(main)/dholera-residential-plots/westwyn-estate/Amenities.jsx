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

const ProjectAmenities = () => {
  const [showAll, setShowAll] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);

  const amenities = [
    {
      icon: <Square className="w-8 h-8" />,
      title: "Project Boundary",
      color: "from-gray-500 to-gray-700",
      description:
        "The project is fully enclosed with a defined boundary for better security and organized development.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Gated Community",
      color: "from-indigo-500 to-purple-600",
      description:
        "A secure gated entry ensures controlled access and privacy for residents.",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Internal Roads",
      color: "from-blue-500 to-cyan-500",
      description:
        "Well-laid internal roads provide smooth and safe movement within the community.",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "24/7 Security & CCTV Surveillance",
      color: "from-red-500 to-red-700",
      description:
        "Round-the-clock security with CCTV monitoring for a safe and protected living environment.",
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Kids Play Area",
      color: "from-purple-400 to-pink-400",
      description:
        "A dedicated play zone for children with safe and fun recreational equipment.",
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "App-Based Society Management",
      color: "from-teal-500 to-teal-700",
      description:
        "Society services and communication are managed efficiently through a mobile app.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Power & Water Supply",
      color: "from-yellow-600 to-yellow-800",
      description:
        "Reliable and uninterrupted electricity and water supply for daily convenience.",
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Yoga Deck",
      color: "from-pink-500 to-rose-500",
      description:
        "A serene outdoor space designed for yoga and wellness activities.",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Jogging Track",
      color: "from-green-500 to-emerald-500",
      description:
        "A dedicated jogging path for fitness and daily exercise within the project.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Senior Citizen Zone",
      color: "from-purple-500 to-pink-500",
      description:
        "A calm and comfortable area designed for the elderly with seating and leisure spaces.",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "EV Charging Station",
      color: "from-green-600 to-green-800",
      description:
        "A charging facility for electric vehicles to support eco-friendly living.",
    },
  ];

  const toggleFlip = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <div className="bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h4
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#0d0d0d" }}
          >
            Project Features
          </h4>
          <div
            className="w-24 h-1 mx-auto mb-6"
            style={{ backgroundColor: "#deae3c" }}
          ></div>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "#0d0d0d" }}
          >
            At WestWyn Estate, we offer more than just plots – we provide a
            complete lifestyle. Key features include:
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-4">
          {amenities.map((amenity, index) => {
            const isFlipped = flippedCard === index;

            // For mobile, hide items beyond index 5 when showAll is false
            const shouldShowOnMobile = showAll || index < 6;

            return (
              <div
                key={index}
                className={`relative ${shouldShowOnMobile ? "block" : "hidden"} md:block`}
                style={{ perspective: "1000px", minHeight: "16rem" }}
              >
                <div
                  className="relative w-full h-full cursor-pointer transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    height: "100%",
                  }}
                  onClick={() => toggleFlip(index)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleFlip(index);
                    }
                  }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#deae3c] transition-all duration-300 hover:shadow-xl flex flex-col items-center justify-center"
                    style={{ backfaceVisibility: "hidden", height: "100%" }}
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${amenity.color} rounded-2xl mb-6 transition-transform duration-300 hover:scale-110`}
                    >
                      <div className="text-white">{amenity.icon}</div>
                    </div>
                    <h3
                      className="text-lg text-center font-medium mb-3"
                      style={{ color: "#0d0d0d" }}
                    >
                      {amenity.title}
                    </h3>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${amenity.color} border-2 border-transparent rounded-2xl p-6 shadow-lg flex flex-col justify-center items-center text-center`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      height: "100%",
                    }}
                  >
                    <div className="text-white mb-4">{amenity.icon}</div>

                    <p className="text-white text-sm leading-relaxed mb-4">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Less Button - Only show on mobile when there are more than 6 amenities */}
        {amenities.length > 6 && (
          <div className="flex justify-center mt-8 md:hidden">
            <button
              onClick={() => {
                setShowAll(!showAll);
                setFlippedCard(null); // Reset flipped card when toggling show all
              }}
              className="px-6 py-3 bg-[#deae3c] text-white font-medium rounded-lg hover:bg-[#c6992a] transition-colors duration-300"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectAmenities;
