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
          5 Key Benefits of Buying Land in the Industrial Zone
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
          5 Major Business Categories Allowed in the Industrial Zone
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
