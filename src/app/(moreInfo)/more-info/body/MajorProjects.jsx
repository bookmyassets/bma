import Image from "next/image";
import React, { useState } from "react";
import mapD from "@/assests/ad-page/dholera-sir-latest-map-2026-desktop-v2.webp";
import mapM from "@/assests/ad-page/dholera-sir-latest-map-2026-mobile-v2.webp";
import PopupForm from "../components/PopUpForm";
import ImageZoom from "../components/ImageZoom";

const projects = [
  {
    id: 1,
    name: "Ahmedabad–Dholera Expressway",
    youtubeId: "56wD3aJIEuA",
    points: [
      "109 km, six-lane access-controlled expressway reducing Ahmedabad–Dholera travel time to under 45 minutes",
      "Strategic logistics corridor under the Delhi–Mumbai Industrial Corridor (DMIC), strengthening regional supply chains",
      "Approved for future monorail integration to improve industrial and passenger mobility along the corridor",
    ],
  },
  {
    id: 2,
    name: "Dholera International Airport",
    youtubeId: "Aih4UJppDbM",
    points: [
      "India’s second-largest airport spread across 1,400+ hectares with passenger and cargo operations",
      "Planned as a global aviation hub to support Dholera’s industrial and manufacturing ecosystem",
      "Phase 1 construction targeted for completion in early 2026",
    ],
  },
  {
    id: 3,
    name: "ABCD Building – City Control Center",
    youtubeId: "jF2U2IWF3yk",
    points: [
      "Centralized administrative hub for industrial approvals, planning, and construction coordination",
      "Home to the Smart City Command & Control Centre enabling real-time city governance",
      "Integrated monitoring of roads, power, traffic, utilities, and core urban infrastructure",
    ],
  },
  {
    id: 4,
    name: "ReNew Power – Manufacturing Facility",
    youtubeId: "_PU0sn6taHQ",
    points: [
      "₹1,200 crore investment in advanced solar module and solar cell manufacturing",
      "2.5 GW solar cell manufacturing capacity supporting India’s renewable energy targets",
      "Employment generation for 1,000+ professionals with scope for future expansion",
    ],
  },
  {
    id: 5,
    name: "Tata Electronics Semiconductor Fab",
    youtubeId: "KxGgxO_GBPY",
    points: [
      "₹91,000 crore investment establishing India’s first semiconductor fabrication facility",
      "Projected to generate over 20,000 direct and indirect employment opportunities",
      "Global technology partnerships with Intel, Tokyo Electron, and PSMC for advanced chip manufacturing",
    ],
  },
  {
    id: 6,
    name: "Dholera Solar Park",
    youtubeId: "v3NNSMaVHb0",
    points: [
      "Asia’s largest solar park with a planned generation capacity of 5,000 MW (5 GW)",
      "More than 1,200 MW already operational, supplying power to industrial infrastructure",
      "Ensures long-term, sustainable, and uninterrupted renewable energy availability",
    ],
  },
  {
    id: 7,
    name: "Water Treatment Plant (WTP)",
    youtubeId: "z40FYyoaU-Y",
    points: [
      "50 MLD water treatment capacity with scalability up to 150 MLD for future requirements",
      "Integrated piped water distribution supported by reservoirs and elevated service reservoirs (ESRs)",
      "Provides reliable water supply to industrial, residential, and commercial zones",
    ],
  },
  {
    id: 8,
    name: "Activation Area",
    youtubeId: "RP9hDShgxhU",
    points: [
      "22.5 sq km plug-and-play industrial zone with approximately 95% infrastructure completion",
      "Fully underground utilities with IoT-enabled monitoring and smart traffic management systems",
      "Developed road network, drainage, power grids, and a landscaped man-made riverfront canal",
    ],
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
              <>
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1`}
                  title={selectedProject.name}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onLoad={handleLoad}
                />
              </>
            </div>

            <div className="p-6 bg-white border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {selectedProject.name}
              </h3>
              <p className="text-gray-600 leading-relaxed px-6">
                {selectedProject.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </p>
            </div>
          </div>
        </div>
        <PopupForm
          title="Invest in India's First Semiconductor City"
          sectionId="major-projects"
        />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      <h2 className="text-xl font-bold text-center mb-2 pt-4 text-[#deae3c]">
        Major Projects
      </h2>
      <PopupForm
        title="Invest in India's First Semiconductor City"
        sectionId="major-projects"
      />

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
          <div className="w-12 h-12 bg-gradient-to-br from-[#deae3c] to-[#c49a2f] rounded-full flex items-center justify-center text-white font-bold">
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
            <div className="relative aspect-[16/9] bg-white">
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
                    <div className="relative group cursor-pointer">
                      {/* Red YouTube background */}
                      <div className="bg-red-600 rounded-xl w-16 h-11 flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors">
                        {/* White play triangle */}
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
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm leading-relaxed ">
                {currentProject.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
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
  const [selectedDesign, setSelectedDesign] = useState(3);

  return (
    <div className="" id="major-projects">
      {/* Design Selector */}

      {/* Render Selected Design */}
      {selectedDesign === 3 && <Design3 />}
      <DesktopDesign />

      <div className="bg-gray-100">
        <p className="text-xl md:text-3xl pt-8 font-semibold text-center">
          The Complete Dholera Blueprint
        </p>
        <div className="w-24 h-1 mt-4 mb-4 bg-[#deae3c] mx-auto"></div>
        <p className=" mb-4  max-w-4xl mx-auto px-8 text-left">
          India’s first Special Investment Region planned with clearly defined
          industrial, residential, commercial, and logistics zones. The master
          plan is divided into Town Planning (TP) schemes and sub-TP zones to
          ensure phased, structured development. This zoning framework allows
          seamless coordination between infrastructure rollout, industrial
          activation, and urban livability, answering common questions such as
          Dholera Project details and the latest update on Dholera Smart City.
        </p>
        <div className="p-4 flex justify-center">
          <ImageZoom/>
        </div>
      </div>
    </div>
  );
}
