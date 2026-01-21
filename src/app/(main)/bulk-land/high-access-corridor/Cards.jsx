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
      description:
        "Suitable for malls, local shops, food plazas, and markets.",
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

  const FlipCard = ({ item, activeId, onToggle }) => {
    const Icon = item.icon;
    const isFlipped = activeId === item.id;
    const colors = colorClasses[item.color];

    return (
      <div
        className="relative h-44 cursor-pointer w-56"
        style={{ perspective: "1000px" }}
        onClick={() => onToggle(item.id)}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div
            className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-3 p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <Icon className={`w-12 h-12 ${colors.icon}`} />
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {item.title}
            </p>
          </div>

          <div
            className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      <div className="mb-10">
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-900">
          Benefits of Buying Land in This Zone
        </h2>

        <div className="flex flex-col items-center gap-8">
          <div className="flex justify-center gap-8 w-full flex-wrap">
            {benefits.slice(0, 3).map((b) => (
              <FlipCard
                key={b.id}
                item={b}
                activeId={activeBenefit}
                onToggle={(id) =>
                  setActiveBenefit(activeBenefit === id ? null : id)
                }
              />
            ))}
          </div>

          <div className="flex justify-center gap-8 w-full flex-wrap">
            {benefits.slice(3, 5).map((b) => (
              <FlipCard
                key={b.id}
                item={b}
                activeId={activeBenefit}
                onToggle={(id) =>
                  setActiveBenefit(activeBenefit === id ? null : id)
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-900">
          Types of Projects Allowed
        </h2>

        <div className="flex flex-col items-center gap-8">
          <div className="flex justify-center gap-8 w-full flex-wrap">
            {projects.slice(0, 3).map((p) => (
              <FlipCard
                key={p.id}
                item={p}
                activeId={activeProject}
                onToggle={(id) =>
                  setActiveProject(activeProject === id ? null : id)
                }
              />
            ))}
          </div>

          <div className="flex justify-center gap-8 w-full flex-wrap">
            {projects.slice(3, 5).map((p) => (
              <FlipCard
                key={p.id}
                item={p}
                activeId={activeProject}
                onToggle={(id) =>
                  setActiveProject(activeProject === id ? null : id)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
