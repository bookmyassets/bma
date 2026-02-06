"use client";
import { useState } from "react";
import {
  Route,
  Plug,
  BadgePercent,
  Expand,
  Globe2,
  Factory,
  Warehouse,
  Package,
  Droplets,
  GraduationCap,
} from "lucide-react";

export default function IndustrialZoneCards() {
  const [activeBenefit, setActiveBenefit] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const benefits = [
    {
      id: "connectivity",
      icon: Route,
      color: "blue",
      title: "Strategic Connectivity",
      description:
        "Well connected to DMIC, expressways, ports, and the upcoming airport.",
    },
    {
      id: "infrastructure",
      icon: Plug,
      color: "green",
      title: "Plug-and-Play Infrastructure",
      description:
        "Basic infrastructure like roads, power, ICT, and water systems are in place.",
    },
    {
      id: "incentives",
      icon: BadgePercent,
      color: "orange",
      title: "High ROI & Incentives",
      description:
        "Supported by government policies, tax benefits, and industrial incentives.",
    },
    {
      id: "scalable",
      icon: Expand,
      color: "purple",
      title: "Scalable Land Parcels",
      description:
        "Bulk land options available for small, medium, and large industrial projects.",
    },
    {
      id: "global",
      icon: Globe2,
      color: "red",
      title: "Global Investment Magnet",
      description:
        "Developed as a major industrial hub attracting domestic and international companies.",
    },
  ];

  const projects = [
    {
      id: "manufacturing",
      icon: Factory,
      color: "blue",
      title: "Manufacturing & Heavy Industries",
      description:
        "Suitable for large factories, engineering units, and fabrication plants.",
    },
    {
      id: "logistics",
      icon: Warehouse,
      color: "green",
      title: "Warehousing & Logistics",
      description:
        "Can be used for storage facilities, distribution centers, and cold storage units.",
    },
    {
      id: "lightmedium",
      icon: Package,
      color: "purple",
      title: "Light & Medium Industries",
      description:
        "Suitable for consumer goods, packaging units, electronics, and assembly operations.",
    },
    {
      id: "utilities",
      icon: Droplets,
      color: "orange",
      title: "Utilities & Support Services",
      description:
        "Land can be developed for power supply, water treatment, and maintenance services.",
    },
    {
      id: "institutional",
      icon: GraduationCap,
      color: "red",
      title: "Institutional & Ancillary Facilities",
      description:
        "Suitable for training centers, worker housing, dormitories, and canteen facilities.",
    },
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-50", icon: "text-blue-600" },
    green: { bg: "bg-green-50", icon: "text-green-600" },
    purple: { bg: "bg-purple-50", icon: "text-purple-600" },
    orange: { bg: "bg-orange-50", icon: "text-orange-600" },
    red: { bg: "bg-red-50", icon: "text-red-600" },
  };

  const handleBenefitFlip = (id) => {
    setActiveBenefit(activeBenefit === id ? null : id);
  };

  const handleProjectFlip = (id) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      <div className="p-4">
        {/* Benefits Section */}
        <div className="mb-8">
          <p className="text-center text-3xl font-semibold mb-8">
            Benefits of Buying Land in Industrial Zone
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
