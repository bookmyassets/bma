import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, CheckCircle, Star } from "lucide-react";

const SoldOutProjectsSection = () => {
  const [soldOutProjects, setSoldOutProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSoldOutProjects() {
      try {
        const response = await fetch("/data/Residential.json");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projects = await response.json();
        // Filter only sold-out projects
        const soldOutProjectsList = projects.filter(
          (project) => project.status === "sold-out"
        );
        setSoldOutProjects(soldOutProjectsList);
      } catch (error) {
        console.error("Error fetching sold-out projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSoldOutProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (soldOutProjects.length === 0) {
    return null; // Don't render if no sold-out projects
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#0d0d0d" }}
          >
            Our Successful Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our successful projects that have been completely sold out -
            a testament to our quality and investor confidence
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {soldOutProjects.map((project, index) => (
            <Link
              href={`/dholera-residential-plots/${project.link}`}
              key={index}
              className="group block"
            >
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:scale-105 relative">
                {/* Success Ribbon */}
                <div className="absolute top-0 right-0 z-10">
                  <div
                    className="px-4 py-2 text-xs font-bold text-white transform rotate-45 translate-x-6 translate-y-2 shadow-lg"
                    style={{ backgroundColor: "#deae3c" }}
                  >
                    SUCCESS
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.projectName}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay for sold-out effect */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold text-black border-2 bg-white flex items-center gap-2"
                      style={{ borderColor: "#deae3c" }}
                    >
                      <CheckCircle
                        className="w-4 h-4"
                        style={{ color: "#deae3c" }}
                      />
                      Sold Out
                    </span>
                  </div>

                  {/* Star Icon for Success */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Star
                        className="w-5 h-5 fill-current"
                        style={{ color: "#deae3c" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-3 group-hover:text-yellow-600 transition-colors duration-300"
                    style={{ color: "#0d0d0d" }}
                  >
                    {project.projectName}
                  </h3>

                  <div className="flex items-start gap-2 mb-3">
                    <MapPin
                      className="w-4 h-4 mt-1 flex-shrink-0"
                      style={{ color: "#deae3c" }}
                    />
                    <p className="text-gray-600 text-sm">{project.location}</p>
                  </div>

                  {/* Success Indicator */}
                  {/* <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <Star
                        className="w-4 h-4 fill-current"
                        style={{ color: "#deae3c" }}
                      />
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#deae3c" }}
                      >
                        100% SOLD OUT
                      </span>
                      <Star
                        className="w-4 h-4 fill-current"
                        style={{ color: "#deae3c" }}
                      />
                    </div>
                  </div> */}

                  {/* CTA Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span
                      className="font-semibold"
                      style={{ color: "#deae3c" }}
                    >
                      View Success Story
                    </span>
                    <ArrowRight
                      className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2"
                      style={{ color: "#deae3c" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoldOutProjectsSection;
