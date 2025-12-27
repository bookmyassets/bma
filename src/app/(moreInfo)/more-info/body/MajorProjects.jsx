import Image from "next/image";
import React, { useState } from "react";
import mapD from "@/assests/ad-page/dholera-map-2.webp"
import mapM from "@/assests/ad-page/dholera-map-1.webp"

const projects = [
  {
    id: 1,
    name: "Tata Semiconductor",
    youtubeId: "sYONhrTYBTg",
    content:
      "The Tata Semiconductor fab is one of the most significant developments in Dholera, strengthening India's semiconductor manufacturing ecosystem. This state-of-the-art facility represents a major investment in India's technology infrastructure and positions Dholera as a key player in the global semiconductor supply chain.",
  },
  {
    id: 2,
    name: "ReNew Power Solar Park",
    youtubeId: "129oXwderKU",
    content:
      "Renewable energy leaders like ReNew Power are part of the massive Dholera Solar Park, one of the largest in the world. This project demonstrates Dholera's commitment to sustainable development and clean energy, contributing significantly to India's renewable energy targets.",
  },
  {
    id: 3,
    name: "Dholera International Airport",
    youtubeId: "PuLWU9DYV_c",
    content:
      "The Dholera International Airport, currently under development, will enhance global connectivity and support industrial cargo movement. This strategic infrastructure project will serve as a major gateway for both passengers and freight, facilitating international trade and tourism.",
  },
  {
    id: 4,
    name: "ABCD Building - City Control Center",
    youtubeId: "faSgawUZWeY",
    content:
      "The ABCD Building serves as the brain of Dholera, housing the city's command and control center. This smart infrastructure hub manages the city's operations, from utilities to security, showcasing the integration of technology in urban planning.",
  },
  {
    id: 5,
    name: "Dholera-Ahmedabad Expressway",
    youtubeId: "NdH1zHVGTcQ",
    content:
      "The Dholera-Ahmedabad Expressway provides seamless connectivity between the smart city and Gujarat's largest metropolitan area. This six-lane expressway significantly reduces travel time and facilitates the movement of goods and people.",
  },
  {
    id: 6,
    name: "Water Treatment Plant",
    youtubeId: "fHLqa6YM1Aw",
    content:
      "The Water Treatment Plant ensures sustainable water management for the entire Dholera Special Investment Region. This advanced facility uses cutting-edge technology to provide clean, treated water to residential, commercial, and industrial areas.",
  },
];

function DesktopDesign() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="max-sm:hidden px-4">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Left Side - Video Player */}
        <div className="order-2 md:order-1 bg-white p-6 md:p-8">
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-2xl md:sticky md:top-4">
            <div className="relative aspect-video w-full bg-gray-900">
              {isPlaying ? (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-[#deae3c] animate-spin"></div>
                    </div>
                  )}
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1`}
                    title={selectedProject.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    onLoad={handleLoad}
                  />
                </>
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={handlePlay}
                >
                  <img
                    src={`https://img.youtube.com/vi/${selectedProject.youtubeId}/maxresdefault.jpg`}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#deae3c] rounded-full p-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {selectedProject.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedProject.content}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Project List */}
        <div className="order-1 md:order-2 bg-black p-6 md:p-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-2"
            style={{ color: "#deae3c" }}
          >
            Major Projects in Dholera
          </h2>
          <p className="text-center text-white mb-8">
            Discover the groundbreaking developments shaping India's first
            Greenfield Smart City
          </p>
          <div className="space-y-3">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className={`w-full text-left p-4 md:p-5 rounded-xl transition-all duration-300 transform hover:scale-102 ${
                  selectedProject.id === project.id
                    ? "bg-gradient-to-r from-[#deae3c] to-[#c49a2f] text-white shadow-xl scale-102"
                    : "bg-gray-800 hover:bg-gray-700 text-white shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        selectedProject.id === project.id
                          ? "bg-white text-[#deae3c]"
                          : "bg-[#deae3c] text-white"
                      }`}
                    >
                      {project.id}
                    </div>
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">
                        {project.name}
                      </h4>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      selectedProject.id === project.id ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Design 1: Card-Based Swipeable Layout
function Design1() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="md:hidden bg-black">
      <div className="p-4 pt-6">
        <h2 className="text-3xl font-bold text-center mb-2 text-[#deae3c]">
          Major Projects
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Swipe to explore Dholera's developments
        </p>

        {/* Featured Video Card */}
        <div className="bg-black rounded-3xl overflow-hidden shadow-2xl mb-6">
          <div className="relative aspect-video bg-black">
            {isPlaying ? (
              <iframe
                className=""
                src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1`}
                title={selectedProject.name}
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
              />
            ) : (
              <div
                className="relative  cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={`https://img.youtube.com/vi/${selectedProject.youtubeId}/maxresdefault.jpg`}
                  alt={selectedProject.name}
                  className=" object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-[#deae3c] text-white px-3 py-1 rounded-full text-xs font-semibold inline-block mb-2">
                    #{selectedProject.id}
                  </div>
                  <h3 className="text-white text-xl font-bold">
                    {selectedProject.name}
                  </h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#deae3c] rounded-full p-4 shadow-lg group-active:scale-95 transition-transform">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-5">
            <p className="text-gray-300 text-sm leading-relaxed">
              {selectedProject.content}
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Project Pills */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex space-x-3 min-w-max">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setIsPlaying(false);
                }}
                className={`flex-shrink-0 px-5 py-3 rounded-full font-semibold text-sm transition-all ${
                  selectedProject.id === project.id
                    ? "bg-[#deae3c] text-white shadow-lg"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Design 2: Stacked Cards with Expand
function Design2() {
  const [expandedId, setExpandedId] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  return (
    <div className="md:hidden bg-white">
      <div className="p-4 pt-6">
        <h2 className="text-3xl font-bold text-center mb-2 text-[#deae3c]">
          Major Projects in Dholera
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Tap to explore each project
        </p>

        <div className="space-y-4">
          {projects.map((project) => {
            const isExpanded = expandedId === project.id;
            const isPlaying = playingId === project.id;

            return (
              <div
                key={project.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  className="w-full text-left"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#deae3c] rounded-full flex items-center justify-center text-white font-bold">
                        {project.id}
                      </div>
                      <h3 className="text-white font-semibold text-base">
                        {project.name}
                      </h3>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#deae3c] transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? "max-h-[600px]" : "max-h-0"
                  }`}
                >
                  <div className="px-4 pb-4">
                    <div className="bg-black rounded-xl overflow-hidden mb-3">
                      <div className="relative aspect-video">
                        {isPlaying ? (
                          <iframe
                            className=""
                            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
                            title={project.name}
                            frameBorder="0"
                            allow="autoplay"
                            allowFullScreen
                          />
                        ) : (
                          <div
                            onClick={() => setPlayingId(project.id)}
                            className="relative  cursor-pointer group"
                          >
                            <img
                              src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                              alt={project.name}
                              className=" object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-[#deae3c] rounded-full p-3">
                                <svg
                                  className="w-6 h-6 text-white ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Design 3: Instagram Stories Style
function Design3() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentProject = projects[currentIndex];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setIsPlaying(false);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setIsPlaying(false);
  };

  return (
    <div className="md:hidden bg-black flex flex-col">
      <h2 className="text-3xl font-bold text-center mb-2 pt-4 text-[#deae3c]">
        Major Projects
      </h2>
      {/* Progress Bars */}
      <div className="flex gap-1 p-4 pb-2">
        {projects.map((_, idx) => (
          <div
            key={idx}
            className="h-1 bg-gray-700 rounded-full flex-1 overflow-hidden"
          >
            <div
              className={`h-full bg-[#deae3c] transition-all duration-300 ${
                idx === currentIndex
                  ? "w-full"
                  : idx < currentIndex
                    ? "w-full"
                    : "w-0"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="px-4 py-2">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#deae3c] to-[#c49a2f] rounded-full flex items-center justify-center text-white font-bold text-lg">
            {currentProject.id}
          </div>
          <div>
            <h3 className="text-white font-semibold">{currentProject.name}</h3>
            <p className="text-gray-400 text-xs">Dholera Smart City</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video bg-white">
              {isPlaying ? (
                <iframe
                  className=""
                  src={`https://www.youtube.com/embed/${currentProject.youtubeId}?autoplay=1`}
                  title={currentProject.name}
                  frameBorder="0"
                  allow="autoplay"
                  allowFullScreen
                />
              ) : (
                <div
                  onClick={() => setIsPlaying(true)}
                  className="relative  cursor-pointer"
                >
                  <img
                    src={`https://img.youtube.com/vi/${currentProject.youtubeId}/maxresdefault.jpg`}
                    alt={currentProject.name}
                    className=" object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#deae3c] rounded-full p-5 shadow-lg">
                      <svg
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                {currentProject.content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 flex justify-center gap-4">
        <button
          onClick={prevProject}
          className="bg-gray-800 text-white p-4 rounded-full shadow-lg active:scale-95 transition-transform"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextProject}
          className="bg-[#deae3c] text-white p-4 rounded-full shadow-lg active:scale-95 transition-transform"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Main Component with Design Selector
export default function MobileDesignShowcase() {
  const [selectedDesign, setSelectedDesign] = useState(1);

  return (
    <div className="">
      {/* Design Selector */}
      <div className="bg-gray-900 md:hidden p-4 sticky top-0 border-b border-gray-700">
        <div className="flex gap-2  justify-center">
          <button
            onClick={() => setSelectedDesign(1)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedDesign === 1
                ? "bg-[#deae3c] text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Card Swipe
          </button>
          <button   
            onClick={() => setSelectedDesign(2)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedDesign === 2
                ? "bg-[#deae3c] text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Accordion
          </button>
          <button
            onClick={() => setSelectedDesign(3)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedDesign === 3
                ? "bg-[#deae3c] text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Stories
          </button>
        </div>
      </div>

      {/* Render Selected Design */}
      {selectedDesign === 1 && <Design1 />}
      {selectedDesign === 2 && <Design2 />}
      {selectedDesign === 3 && <Design3 />}
      <DesktopDesign />

        <p className="text-2xl md:text-3xl pt-8 font-semibold bg-gray-100 pb-4 text-center">Dholera Map</p>
      <div className="p-4 bg-gray-100 flex justify-center">
        <Image
          src={mapM}
          alt="Map"
          className="md:hidden  rounded-2xl"
        />
        <Image
          src={mapD}
          alt="Map"
          className="max-sm:hidden  rounded-2xl"
        />
      </div>
    </div>
  );
}
