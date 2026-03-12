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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import img from "@/assests/image.webp";

const ProjectAmenities = () => {
  const [showAll, setShowAll] = useState(false);

  const amenities = [
    {
      icon: <Square className="w-6 h-6" />,
      title: "Project Boundary",
      color: "from-gray-500 to-gray-700",
      description:
        "Fully enclosed with a defined boundary for better security and organized development.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Gated Community",
      color: "from-indigo-500 to-purple-600",
      description:
        "A secure gated entry ensures controlled access and privacy for residents.",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Internal Roads",
      color: "from-blue-500 to-cyan-500",
      description:
        "Well-laid internal roads for smooth and safe movement within the community.",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "24/7 Security & CCTV",
      color: "from-red-500 to-red-700",
      description:
        "Round-the-clock security with CCTV monitoring for a safe living environment.",
    },
    {
      icon: <Baby className="w-6 h-6" />,
      title: "Kids Play Area",
      color: "from-purple-400 to-pink-400",
      description:
        "A dedicated play zone for children with safe and fun recreational equipment.",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "App-Based Management",
      color: "from-teal-500 to-teal-700",
      description:
        "Society services and communication managed efficiently through a mobile app.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Power & Water Supply",
      color: "from-yellow-600 to-yellow-800",
      description:
        "Reliable and uninterrupted electricity and water supply for daily convenience.",
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Yoga Deck",
      color: "from-pink-500 to-rose-500",
      description:
        "A serene outdoor space designed for yoga and wellness activities.",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Jogging Track",
      color: "from-green-500 to-emerald-500",
      description:
        "A dedicated jogging path for fitness and daily exercise within the project.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Senior Citizen Zone",
      color: "from-purple-500 to-pink-500",
      description:
        "A calm and comfortable area for the elderly with seating and leisure spaces.",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "EV Charging Station",
      color: "from-green-600 to-green-800",
      description:
        "A charging facility for electric vehicles to support eco-friendly living.",
    },
  ];

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
        .card-icon {
          transition: transform 0.3s ease;
        }
        .card-new {
          animation: fadeInUp 0.4s ease forwards;
        }
        .stat-pill {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .stat-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(222,174,60,0.2);
        }
        .show-btn {
          transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }
        .show-btn:hover {
          box-shadow: 0 8px 24px rgba(222,174,60,0.3);
        }
      `}</style>

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
              Project Features
            </h2>
            <div
              className="w-20 h-[3px] mx-auto mb-5 rounded-full"
              style={{ backgroundColor: "#deae3c" }}
            />
            <p
              className="text-base max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#555" }}
            >
              At WestWyn Estates, we offer more than just plots – we provide a
              complete lifestyle. Key features include:
            </p>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="lg:w-[50%]">

            {/* Left panel — desktop only */}
            <div className="px-4 sm:px-6 lg:px-8  aspect-[2/1]">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {visibleAmenities.map((amenity, index) => (
                  <div
                    key={amenity.title}
                    className={`amenity-card border-2 rounded-2xl p-5 flex flex-col items-center text-center ${index >= 6 ? "card-new" : ""}`}
                    style={{ borderColor: "#e8e8e8" }}
                  >
                    <div
                      className={`card-icon flex items-center justify-center w-12 h-12 bg-gradient-to-br ${amenity.color} rounded-xl mb-4`}
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

              {/* Show More / Show Less */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="show-btn flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border-2"
                  style={{
                    borderColor: "#deae3c",
                    background: showAll ? "#deae3c" : "transparent",
                    color: showAll ? "#fff" : "#0d0d0d",
                  }}
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="w-4 h-4" /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" /> Show All{" "}
                      {amenities.length} Features
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectAmenities;
