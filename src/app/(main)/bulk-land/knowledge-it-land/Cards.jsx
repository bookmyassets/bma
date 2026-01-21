"use client";
import { useState } from "react";
import {
  Cpu,
  FlaskConical,
  GraduationCap,
  Building2,
  Home,
  Lightbulb,
  Globe2,
  TrendingUp,
  BrainCircuit,
} from "lucide-react";

export default function KnowledgeITZoneCards() {
  const [activeBenefit, setActiveBenefit] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const benefits = [
    {
      id: "innovation",
      icon: BrainCircuit,
      color: "red",
      title: "Innovation Ecosystem",
      description:
        "The zone is planned for IT, research, and knowledge-based industries.",
    },
    {
      id: "talent",
      icon: GraduationCap,
      color: "purple",
      title: "Talent Magnet",
      description:
        "Nearby universities and institutes provide skilled professionals.",
    },
    {
      id: "global",
      icon: Globe2,
      color: "green",
      title: "Global Competitiveness",
      description:
        "Suitable for multinational companies, startups, and tech-driven businesses.",
    },
    {
      id: "infra",
      icon: Lightbulb,
      color: "blue",
      title: "Modern Infrastructure",
      description:
        "Planned with high-speed digital networks, smart utilities, and green spaces.",
    },
    {
      id: "value",
      icon: TrendingUp,
      color: "orange",
      title: "Long-Term Value Growth",
      description:
        "Supported by government planning with steady demand from the IT and education sectors.",
    },
  ];

  const projects = [
    {
      id: "itparks",
      icon: Cpu,
      color: "blue",
      title: "IT & Technology Parks",
      description:
        "Suitable for software companies, BPOs, data centers, and tech campuses.",
    },
    {
      id: "rnd",
      icon: FlaskConical,
      color: "green",
      title: "Research & Development Facilities",
      description:
        "Can be developed for R&D labs, biotech parks, and innovation hubs.",
    },
    {
      id: "education",
      icon: GraduationCap,
      color: "purple",
      title: "Educational Institutions",
      description:
        "Suitable for universities, colleges, schools, and training centers.",
    },
    {
      id: "corporate",
      icon: Building2,
      color: "orange",
      title: "Corporate & Office Spaces",
      description:
        "Can be used for service-based offices and coworking hubs.",
    },
    {
      id: "mixeduse",
      icon: Home,
      color: "red",
      title: "Supporting Residential & Mixed-Use",
      description:
        "Suitable for housing, hostels, and support facilities for students and professionals.",
    },
  ];

  const handleBenefitFlip = (id) => {
    setActiveBenefit(activeBenefit === id ? null : id);
  };

  const handleProjectFlip = (id) => {
    setActiveProject(activeProject === id ? null : id);
  };

  const colorClasses = {
    blue: { bg: "bg-blue-50", hover: "hover:bg-blue-100", icon: "text-blue-600" },
    green: { bg: "bg-green-50", hover: "hover:bg-green-100", icon: "text-green-600" },
    purple: { bg: "bg-purple-50", hover: "hover:bg-purple-100", icon: "text-purple-600" },
    orange: { bg: "bg-orange-50", hover: "hover:bg-orange-100", icon: "text-orange-600" },
    red: { bg: "bg-red-50", hover: "hover:bg-red-100", icon: "text-red-600" },
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      {/* Benefits Section */}
      <div className="mb-8">
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-900">
          Key Benefits of Buying Land in the Knowledge & IT Zone
        </h2>

        <div className="flex flex-col items-center gap-8">
          {/* First row - 3 cards */}
          <div className="flex justify-center gap-8 w-full flex-wrap">
            {benefits.slice(0, 3).map((benefit) => {
              const Icon = benefit.icon;
              const isFlipped = activeBenefit === benefit.id;
              const colors = colorClasses[benefit.color];

              return (
                <div
                  key={benefit.id}
                  className="relative h-44 cursor-pointer w-56"
                  style={{ perspective: "1000px" }}
                  onClick={() => handleBenefitFlip(benefit.id)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front */}
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-3 p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Icon className={`w-12 h-12 ${colors.icon}`} />
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {benefit.title}
                      </p>
                    </div>

                    {/* Back */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second row - 2 cards */}
          <div className="flex justify-center gap-8 w-full flex-wrap">
            {benefits.slice(3, 5).map((benefit) => {
              const Icon = benefit.icon;
              const isFlipped = activeBenefit === benefit.id;
              const colors = colorClasses[benefit.color];

              return (
                <div
                  key={benefit.id}
                  className="relative h-44 cursor-pointer w-56"
                  style={{ perspective: "1000px" }}
                  onClick={() => handleBenefitFlip(benefit.id)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front */}
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-3 p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Icon className={`w-12 h-12 ${colors.icon}`} />
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {benefit.title}
                      </p>
                    </div>

                    {/* Back */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="pb-8 pt-8">
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-900">
          5 Major Business Categories Allowed in the Knowledge & IT Zone
        </h2>

        <div className="flex flex-col items-center gap-8">
          {/* First row - 3 cards */}
          <div className="flex justify-center gap-8 w-full flex-wrap">
            {projects.slice(0, 3).map((project) => {
              const Icon = project.icon;
              const isFlipped = activeProject === project.id;
              const colors = colorClasses[project.color];

              return (
                <div
                  key={project.id}
                  className="relative h-44 cursor-pointer w-56"
                  style={{ perspective: "1000px" }}
                  onClick={() => handleProjectFlip(project.id)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front */}
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-3 p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Icon className={`w-12 h-12 ${colors.icon}`} />
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {project.title}
                      </p>
                    </div>

                    {/* Back */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second row - 2 cards */}
          <div className="flex justify-center gap-8 w-full flex-wrap">
            {projects.slice(3, 5).map((project) => {
              const Icon = project.icon;
              const isFlipped = activeProject === project.id;
              const colors = colorClasses[project.color];

              return (
                <div
                  key={project.id}
                  className="relative h-44 cursor-pointer w-56"
                  style={{ perspective: "1000px" }}
                  onClick={() => handleProjectFlip(project.id)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front */}
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-3 p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Icon className={`w-12 h-12 ${colors.icon}`} />
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {project.title}
                      </p>
                    </div>

                    {/* Back */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
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
