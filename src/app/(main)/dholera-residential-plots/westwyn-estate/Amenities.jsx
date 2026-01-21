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
} from "lucide-react";

const ProjectAmenities = () => {
  const [showAll, setShowAll] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null); // Track only one flipped card

  const amenities = [
    {
      icon: Square,
      title: "Project Boundary",
      color: "from-gray-500 to-gray-700",
      description:
        "The project is fully enclosed with a defined boundary for better security and organized development.",
    },
    {
      icon: Shield,
      title: "Gated Community",
      color: "from-indigo-500 to-purple-600",
      description:
        "A secure gated entry ensures controlled access and privacy for residents.",
    },
    {
      icon: Car,
      title: "Internal Roads",
      color: "from-blue-500 to-cyan-500",
      description:
        "Well-laid internal roads provide smooth and safe movement within the community.",
    },
    {
      icon: Camera,
      title: "24/7 Security & CCTV Surveillance",
      color: "from-red-500 to-red-700",
      description:
        "Round-the-clock security with CCTV monitoring for a safe and protected living environment.",
    },
    {
      icon: Baby,
      title: "Kids Play Area",
      color: "from-purple-400 to-pink-400",
      description:
        "A dedicated play zone for children with safe and fun recreational equipment.",
    },
    {
      icon: Wifi,
      title: "App-Based Society Management",
      color: "from-teal-500 to-teal-700",
      description:
        "Society services and communication are managed efficiently through a mobile app.",
    },
    {
      icon: Zap,
      title: "Power & Water Supply",
      color: "from-yellow-600 to-yellow-800",
      description:
        "Reliable and uninterrupted electricity and water supply for daily convenience.",
    },
    {
      icon: User,
      title: "Yoga Deck",
      color: "from-pink-500 to-rose-500",
      description:
        "A serene outdoor space designed for yoga and wellness activities.",
    },
    {
      icon: User,
      title: "Jogging Track",
      color: "from-green-500 to-emerald-500",
      description:
        "A dedicated jogging path for fitness and daily exercise within the project.",
    },
    {
      icon: Users,
      title: "Senior Citizen Zone",
      color: "from-purple-500 to-pink-500",
      description:
        "A calm and comfortable area designed for the elderly with seating and leisure spaces.",
    },
    {
      icon: Car,
      title: "EV Charging Station",
      color: "from-green-600 to-green-800",
      description:
        "A charging facility for electric vehicles to support eco-friendly living.",
    },
  ];

  const toggleFlip = (index) => {
    // If clicking the already flipped card, unflip it
    // Otherwise, flip the clicked card and unflip any other
    setFlippedCard(flippedCard === index ? null : index);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const initialMobileItems = 6;
  const initialDesktopItems = 6;

  const visibleAmenities = showAll
    ? amenities
    : amenities.slice(0, isMobile ? initialMobileItems : initialDesktopItems);

  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-white py-16 px-4"
      aria-labelledby="amenities-heading"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h2
            id="amenities-heading"
            className="text-4xl font-bold mb-4 text-gray-900"
          >
           Project Features
          </h2>
          <div
            className="w-20 h-1 bg-amber-500 mx-auto mb-6"
            aria-hidden="true"
          ></div>
          <p className="text-xl max-w-5xl mx-auto text-gray-600 leading-relaxed">
            At WestWyn Estate, we offer more than just plots – we provide a
            complete lifestyle. Key features include:
          </p>
        </header>

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Property amenities and features"
        >
          {visibleAmenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            const isFlipped = flippedCard === index;

            return (
              <article
                key={index}
                className="relative h-56 cursor-pointer"
                style={{ perspective: "1000px" }}
                onClick={() => toggleFlip(index)}
                role="listitem"
                aria-label={`${amenity.title}: ${isFlipped ? amenity.description : "Click to learn more"}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip(index);
                  }
                }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                  aria-live="polite"
                >
                  <div
                    className="absolute inset-0 bg-white  flex flex-col items-center justify-center rounded-xl p-6 shadow-sm border border-gray-400 hover:shadow-lg transition-all duration-300"
                    style={{ backfaceVisibility: "hidden" }}
                    aria-hidden={isFlipped}
                  >
                    <div
                      className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${amenity.color} mb-4`}
                      aria-hidden="true"
                    >
                      <IconComponent className="w-6 md:w-12 h-6 md:h-12 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {amenity.title}
                    </h3>
                  </div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${amenity.color} rounded-xl p-6 shadow-lg flex flex-col justify-center items-center text-center`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    aria-hidden={!isFlipped}
                  >
                    <h3 className="text-lg font-bold text-white mb-3">
                      {amenity.title}
                    </h3>
                    <p className="text-white text-sm leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {amenities.length > initialMobileItems && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                setShowAll(!showAll);
                setFlippedCard(null); // Reset flipped card when toggling show all
              }}
              className="px-8 py-3 bg-[#deae3c] hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
              aria-expanded={showAll}
              aria-controls="amenities-grid"
            >
              <span>
                {showAll
                  ? "Show Less Amenities"
                  : "View All 11 Property Amenities"}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectAmenities;
