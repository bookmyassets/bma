"use client";
import { useState } from "react";
import {
  Eye,
  Layers,
  Users,
  Plug,
  Landmark,
  ShoppingBag,
  BedDouble,
  Building2,
  Hospital,
  Home,
} from "lucide-react";

export default function HighAccessCorridorCards() {
  const [activeBenefit, setActiveBenefit] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const handleBenefitFlip = (id) => {
    setActiveBenefit(activeBenefit === id ? null : id);
  };

  const handleProjectFlip = (id) => {
    setActiveProject(activeProject === id ? null : id);
  };

  const benefits = [
    {
      id: "visibility",
      icon: Eye,
      color: "blue",
      title: "Prime Visibility & Frontage",
      description:
        "The land has a good road-facing location and clear visibility.",
    },
    {
      id: "versatile",
      icon: Layers,
      color: "green",
      title: "Versatile Development Options",
      description: "The land can be used for different types of projects.",
    },
    {
      id: "footfall",
      icon: Users,
      color: "purple",
      title: "High Footfall Potential",
      description:
        "The area can attract more people due to planned activity and movement.",
    },
    {
      id: "infrastructure",
      icon: Plug,
      color: "orange",
      title: "Plug & Play Infrastructure",
      description:
        "Basic infrastructure like roads, power, and utilities are available or planned.",
    },
    {
      id: "incentives",
      icon: Landmark,
      color: "red",
      title: "Government Incentives & Flexibility",
      description:
        "Development is supported by government policies and flexible rules.",
    },
  ];

  const projects = [
    {
      id: "retail",
      icon: ShoppingBag,
      color: "blue",
      title: "Retail & Shopping Complexes",
      description: "Suitable for malls, local shops, food plazas, and markets.",
    },
    {
      id: "hospitality",
      icon: BedDouble,
      color: "orange",
      title: "Hospitality & Accommodation",
      description:
        "Can be developed for hotels, serviced apartments, dormitories, or dharamshalas.",
    },
    {
      id: "offices",
      icon: Building2,
      color: "purple",
      title: "Corporate & Commercial Offices",
      description:
        "Suitable for business centres, coworking spaces, and service offices.",
    },
    {
      id: "health",
      icon: Hospital,
      color: "red",
      title: "Healthcare & Wellness Facilities",
      description:
        "Can be used for hospitals, nursing homes, diagnostic centres, and fitness clubs.",
    },
    {
      id: "housing",
      icon: Home,
      color: "green",
      title: "Residential & Mixed-Use Housing",
      description:
        "Suitable for apartments, worker housing, and high-density residential projects.",
    },
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-50", icon: "text-blue-600" },
    green: { bg: "bg-green-50", icon: "text-green-600" },
    purple: { bg: "bg-purple-50", icon: "text-purple-600" },
    orange: { bg: "bg-orange-50", icon: "text-orange-600" },
    red: { bg: "bg-red-50", icon: "text-red-600" },
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      <div className="p-4">
        {/* Benefits Section */}
        <div className="mb-8">
          <p className="text-center text-3xl font-semibold mb-8">
            Benefits of Buying Land in High Access Corridor Zone
          </p>

          <div className={`flex flex-wrap justify-center gap-8 pt-4`}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              const isFlipped = activeBenefit === benefit.id;
              const colors = colorClasses[benefit.color];

              return (
                <div
                  key={benefit.id}
                  className="relative h-48 sm:h-64 cursor-pointer w-full sm:w-5/12 md:w-64"
                  style={{ perspective: "1000px" }}
                  onClick={() => handleBenefitFlip(benefit.id)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                  >
                    {/* Front of card */}
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Icon
                        className={`w-12 h-12 sm:w-16 sm:h-16 ${colors.icon}`}
                      />
                      <p className="text-base sm:text-lg font-medium text-gray-800">
                        {benefit.title}
                      </p>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} ${colors.hover} rounded-lg transition-colors`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projects Section */}
        <div className="pb-8 pt-4">
          <p className="text-center text-3xl font-semibold mb-8">
            Types of Projects Allowed
          </p>

          <div className={`flex flex-wrap justify-center gap-8`}>
            {projects.map((project) => {
              const Icon = project.icon;
              const isFlipped = activeProject === project.id;
              const colors = colorClasses[project.color];

              return (
                <div
                  key={project.id}
                  className="relative h-48 sm:h-64 cursor-pointer w-full sm:w-5/12 md:w-64"
                  style={{ perspective: "1000px" }}
                  onClick={() => handleProjectFlip(project.id)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                  >
                    {/* Front of card */}
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-4 p-6 ${colors.bg} rounded-lg ${colors.hover} transition-colors`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Icon
                        className={`w-12 h-12 sm:w-16 sm:h-16 ${colors.icon}`}
                      />
                      <p className="text-base sm:text-lg font-medium text-gray-800">
                        {project.title}
                      </p>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} ${colors.hover} rounded-lg transition-colors`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
