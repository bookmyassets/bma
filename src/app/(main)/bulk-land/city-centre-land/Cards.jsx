"use client";
import { useState } from "react";
import {
  MapPin,
  Users,
  Award,
  Layers,
  Route,
  ShoppingBag,
  Film,
  Building2,
  Landmark,
  Home,
} from "lucide-react";

export default function CityCentreZoneCards() {
  const [activeBenefit, setActiveBenefit] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const benefits = [
    {
      id: "central",
      icon: MapPin,
      color: "blue",
      title: "Prime Central Location",
      description:
        "Located at the core of Dholera with high visibility and access.",
    },
    {
      id: "footfall",
      icon: Users,
      color: "green",
      title: "High Footfall & Business Potential",
      description:
        "Continuous movement due to retail, hospitality, and public activities.",
    },
    {
      id: "prestige",
      icon: Award,
      color: "purple",
      title: "Prestige & Landmark Value",
      description:
        "Considered a key and premium zone within the smart city.",
    },
    {
      id: "versatile",
      icon: Layers,
      color: "orange",
      title: "Versatility of Development",
      description:
        "Suitable for multiple types of mixed-use developments.",
    },
    {
      id: "connectivity",
      icon: Route,
      color: "red",
      title: "Seamless Connectivity",
      description:
        "Well-connected through planned metro, roads, and smart infrastructure.",
    },
  ];

  const projects = [
    {
      id: "retail",
      icon: ShoppingBag,
      color: "blue",
      title: "Retail & Shopping Districts",
      description:
        "Suitable for malls, showrooms, markets, and high-street retail.",
    },
    {
      id: "hospitality",
      icon: Film,
      color: "orange",
      title: "Hospitality & Entertainment",
      description:
        "Can be developed for hotels, restaurants, multiplexes, and convention centers.",
    },
    {
      id: "offices",
      icon: Building2,
      color: "purple",
      title: "Corporate & Administrative Offices",
      description:
        "Suitable for corporate offices, banks, and government buildings.",
    },
    {
      id: "civic",
      icon: Landmark,
      color: "red",
      title: "Cultural & Civic Spaces",
      description:
        "Can be used for libraries, museums, auditoriums, and exhibition halls.",
    },
    {
      id: "living",
      icon: Home,
      color: "green",
      title: "Residential & Mixed-Use Living",
      description:
        "Suitable for apartments, serviced residences, and integrated projects.",
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
          5 Key Benefits of Buying Land in the City Centre Zone
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
          5 Major Business Categories Allowed in the City Centre
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
