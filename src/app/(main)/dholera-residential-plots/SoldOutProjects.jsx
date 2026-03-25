"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SoldOutProjectsSection = () => {
  const [soldOutProjects, setSoldOutProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

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
          (project) => project.status === "sold-out",
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

  // Auto-scroll for mobile only
  useEffect(() => {
    if (soldOutProjects.length === 0) return;

    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    setShowArrows(!isMobile);

    if (!isMobile) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const CARD_WIDTH = 320 + 24; // card width + gap (adjust based on your card size)
    let interval;

    const startAutoScroll = () => {
      interval = setInterval(() => {
        if (!isPaused && slider) {
          const maxScroll = slider.scrollWidth - slider.clientWidth;

          if (slider.scrollLeft >= maxScroll - 5) {
            // Reset to beginning smoothly
            slider.scrollTo({ left: 0, behavior: "smooth" });
            setCurrentIndex(0);
          } else {
            // Calculate next position
            const nextIndex = Math.floor(
              (slider.scrollLeft + CARD_WIDTH) / CARD_WIDTH,
            );
            const nextScroll = nextIndex * CARD_WIDTH;

            slider.scrollTo({ left: nextScroll, behavior: "smooth" });
            setCurrentIndex(nextIndex);
          }
        }
      }, 3000); // Scroll every 3 seconds
    };

    startAutoScroll();

    // Pause on user interaction
    const handleUserInteraction = () => {
      setIsPaused(true);
      // Resume after 5 seconds of inactivity
      setTimeout(() => {
        setIsPaused(false);
      }, 5000);
    };

    // Track scroll position
    const handleScroll = () => {
      if (slider) {
        const newIndex = Math.round(slider.scrollLeft / CARD_WIDTH);
        setCurrentIndex(newIndex);
      }
    };

    slider.addEventListener("touchstart", handleUserInteraction);
    slider.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      slider.removeEventListener("touchstart", handleUserInteraction);
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [isPaused, soldOutProjects.length]);

  // Handle dot navigation
  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const CARD_WIDTH = 344; // 320px + 24px gap
      sliderRef.current.scrollTo({
        left: index * CARD_WIDTH,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 5000);
    }
  };

  // Handle arrow navigation for desktop
  const scrollPrev = () => {
    if (sliderRef.current) {
      const CARD_WIDTH = 344;
      const newIndex = Math.max(0, currentIndex - 1);
      sliderRef.current.scrollTo({
        left: newIndex * CARD_WIDTH,
        behavior: "smooth",
      });
      setCurrentIndex(newIndex);
    }
  };

  const scrollNext = () => {
    if (sliderRef.current) {
      const CARD_WIDTH = 344;
      const newIndex = Math.min(soldOutProjects.length - 1, currentIndex + 1);
      sliderRef.current.scrollTo({
        left: newIndex * CARD_WIDTH,
        behavior: "smooth",
      });
      setCurrentIndex(newIndex);
    }
  };

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
    <div className="py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#0d0d0d" }}
          >
            Our Successful Projects
          </h2>
        </div>

        <div className="">
          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Arrows (visible on tablet) */}
            {showArrows && soldOutProjects.length > 2 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentIndex === 0}
                  style={{ color: "#deae3c" }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentIndex === soldOutProjects.length - 1}
                  style={{ color: "#deae3c" }}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Cards Slider */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {soldOutProjects.map((project, index) => (
                <div key={index} className="flex-none w-[320px] snap-start">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted Project Card Component for reusability
const ProjectCard = ({ project }) => (
  <Link
    href={`/dholera-residential-plots/${project.link}`}
    className="group block h-full"
  >
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:scale-105 relative h-full flex flex-col">
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
      <div className="relative h-40 overflow-hidden flex-shrink-0">
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
            <CheckCircle className="w-4 h-4" style={{ color: "#deae3c" }} />
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
      <div className="p-6 flex-grow flex flex-col">
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

        {/* CTA Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <span className="font-semibold" style={{ color: "#deae3c" }}>
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
);

export default SoldOutProjectsSection;
