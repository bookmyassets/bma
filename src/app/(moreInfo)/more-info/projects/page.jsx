"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Home,
  IndianRupee,
} from "lucide-react";
import GetinTouch from "../components/GetinTouch";
import Image from "next/image";

export default function ProjectSlider() {
  const [projectForm, setProjectForm] = useState(false);
  const [residentialProjects, setResidentialProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const openProjectForm = (project) => {
    setSelectedProject(project);
    setProjectForm(true);
  };

  const closeProjectForm = () => {
    setProjectForm(false);
    setSelectedProject(null);
  };

  // Function to get status badge info
  const getStatusBadge = (project) => {
    const status = project.status?.toLowerCase() || "featured";

    switch (status) {
      case "sold-out":
      case "soldout":
        return {
          text: "Sold Out",
          bgColor: "bg-red-600",
          textColor: "text-white",
        };
      case "ongoing":
      case "available":
        return {
          text: "Available",
          bgColor: "bg-green-600",
          textColor: "text-white",
        };
      case "featured":
      default:
        return {
          text: "Featured",
          bgColor: "bg-[#deae3c]",
          textColor: "text-black",
        };
    }
  };

  useEffect(() => {
    // Function to update cards per view based on screen size
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else if (window.innerWidth < 1280) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    // Set initial value
    updateCardsPerView();

    // Add event listener
    window.addEventListener("resize", updateCardsPerView);

    // Clean up
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    async function fetchResidentialProjects() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/data/Residential.json");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const projects = await response.json();
        setResidentialProjects(projects);
      } catch (error) {
        console.error("Error fetching residential projects:", error);
        setError("Failed to load projects");
        setResidentialProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResidentialProjects();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, residentialProjects.length - cardsPerView);
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, residentialProjects.length - cardsPerView);
      return prev === 0 ? maxSlide : prev - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
    }

    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Calculate the number of slides needed
  const totalSlides = Math.max(
    1,
    residentialProjects.length - cardsPerView + 1
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-black">
        <div className="w-8 h-8 border-4 border-[#deae3c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-black text-[#deae3c]">
        <p>{error}</p>
      </div>
    );
  }

  if (residentialProjects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-black text-[#deae3c]">
        <p>No projects available</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative  py-4 px-4" id="ourProjects">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-[32px] font-bold text-[#deae3c] ">
              Our Premium Projects
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Discover exceptional residential opportunities crafted for modern
              living
            </p>
          </div>

          {/* Slider Container */}
          <div
            className="overflow-hidden"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
              }}
            >
              {residentialProjects.map((project, index) => {
                const statusBadge = getStatusBadge(project);

                return (
                  <div
                    key={index}
                    className="px-3 flex-shrink-0"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <motion.div
                      className="bg-white border-2 border-[#deae3c] rounded-2xl overflow-hidden shadow-2xl  transition-all duration-300 group flex flex-col h-[450px]"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Project Image */}
                      <div className="relative h-48 bg-gradient-to-r from-[#deae3c]/20 to-[#deae3c]/10 flex items-center justify-center overflow-hidden">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.projectName || `Project ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Home className="w-16 h-16 text-[#deae3c] opacity-50" />
                        )}
                        <div
                          className={`absolute top-4 right-4 ${statusBadge.bgColor} ${statusBadge.textColor} px-3 py-1 rounded-full text-sm font-semibold z-10`}
                        >
                          {statusBadge.text}
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                      </div>

                      {/* Project Details */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-[#deae3c] mb-3 group-hover:text-yellow-600 transition-colors line-clamp-1">
                          {project.projectName || `Project ${index + 1}`}
                        </h3>

                        <div className="space-y-2 mb-2">
                          <div className="flex items-center text-gray-800">
                            <IndianRupee className="w-4 h-4 text-[#deae3c] mr-2 flex-shrink-0" />
                            <span className="font-semibold text-sm">
                              ₹{project.price || "Price on Request"}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-800">
                            <Home className="w-4 h-4 text-[#deae3c] mr-2 flex-shrink-0" />
                            <span className="text-sm">
                              {project.plots ||
                                project.numberOfPlots ||
                                "Multiple"}{" "}
                              Plots
                            </span>
                          </div>

                          <div className="flex items-start text-gray-800">
                            <MapPin className="w-4 h-4 text-[#deae3c] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-xs line-clamp-2">
                              {project.location || "Prime Location"}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {project.description ||
                            "Experience luxury living with modern amenities and exceptional design in this premium residential project."}
                        </p>

                        <button
                          onClick={() => openProjectForm(project)}
                          className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-300 mt-auto ${project.status?.toLowerCase() === "sold-out" ||
                              project.status?.toLowerCase() === "soldout"
                              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                              : "bg-[#deae3c] hover:bg-yellow-600 text-white"
                            }`}
                          disabled={
                            project.status?.toLowerCase() === "sold out" ||
                            project.status?.toLowerCase() === "soldout"
                          }
                        >
                          {project.status?.toLowerCase() === "sold out" ||
                            project.status?.toLowerCase() === "soldout"
                            ? "Sold Out"
                            : "More Info"}
                        </button>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#deae3c] hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-colors duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#deae3c] hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-colors duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array(totalSlides)
              .fill(0)
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                      ? "bg-[#deae3c] scale-125"
                      : "bg-gray-600 hover:bg-gray-400"
                    }`}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {projectForm && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md mx-4"
            >
              <GetinTouch
                title={`Free Site Visit - ${selectedProject?.projectName || "Project"}`}
                buttonName="Book Site Visit"
                onClose={closeProjectForm}
                onSuccess={() => {
                  setIsFormSubmitted(true);
                  closeProjectForm();
                }}
                projectDetails={selectedProject}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
