"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "@/assests/bma-logo.png";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
//Dholera SIR
import aboutDholera from "@/assests/dholeraSIR/about-dholera-sir.webp";
import dholeraBlogs from "@/assests/dholeraSIR/dholera-blogs.webp";
import dholeraUpdates from "@/assests/dholeraSIR/dholera-latest-update.webp";
//Bulk Land
import residential from "@/assests/bulkLand/residential-zone-cover.webp";
import hac from "@/assests/bulkLand/high-access-corridor-cover.webp";
import cityCenter from "@/assests/bulkLand/city-centre-cover.webp";
import industrial from "@/assests/bulkLand/industrial-cover.webp";
import sport from "@/assests/bulkLand/recreation-sports-map.webp";
import knowledgeIT from "@/assests/bulkLand/knowledge-it-cover.webp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResidentialMenuOpen, setIsResidentialMenuOpen] = useState(false);
  const [isDholeraMenuOpen, setIsDholeraMenuOpen] = useState(false);
  const [isBulkLandMenuOpen, setIsBulkLandMenuOpen] = useState(false); // New state for Bulk Land dropdown
  const [residentialProjects, setResidentialProjects] = useState([]);
  const [dholeraProjects, setDholeraProjects] = useState([]);
  const [bulkLandProjects, setBulkLandProjects] = useState([]); // New state for Bulk Land projects
  const [loading, setLoading] = useState(false);
  const [dholeraLoading, setDholeraLoading] = useState(false);
  const [bulkLandLoading, setBulkLandLoading] = useState(false); // New loading state
  const [error, setError] = useState(null);
  const [dholeraError, setDholeraError] = useState(null);
  const [bulkLandError, setBulkLandError] = useState(null); // New error state

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar background and text colors
  const shouldUseWhiteBackground =
    isScrolled ||
    !isHomePage ||
    isResidentialMenuOpen ||
    isDholeraMenuOpen ||
    isBulkLandMenuOpen;
  const textColor = "text-black";
  /* const textColor = shouldUseWhiteBackground ? "text-black" : "text-white"; */

  // Fetch residential projects from JSON when dropdown is opened
  useEffect(() => {
    async function fetchResidentialProjects() {
      if (!isResidentialMenuOpen || residentialProjects.length > 0) return;

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
  }, [isResidentialMenuOpen, residentialProjects.length]);

  // Fetch bulk land projects (new function)
  useEffect(() => {
    async function fetchBulkLandProjects() {
      if (!isBulkLandMenuOpen || bulkLandProjects.length > 0) return;

      try {
        setBulkLandLoading(true);
        setBulkLandError(null);

        // Mock data for Bulk Land projects - replace with actual API call or JSON file
        const mockBulkLandProjects = [
          {
            projectName: "Residential Zone",
            location: "Prime locations across Gujarat",
            image: residential, // Required size: 400x500px
            link: "/residential",
            status: "available",
            description:
              "Premium residential land parcels for housing developments",
          },
          {
            projectName: "High Access Corridor",
            location: "Major highways and arterial roads",
            image: hac, // Required size: 400x500px
            link: "/high-access-corridor",
            status: "available",
            description: "Strategic land along high-traffic corridors",
          },
          {
            projectName: "City Centre",
            location: "Urban commercial districts",
            image: cityCenter, // Required size: 400x500px
            link: "/city-centre-land",
            status: "limited",
            description: "Prime city center commercial land opportunities",
          },
          {
            projectName: "Knowledge and IT",
            location: "IT parks and tech corridors",
            image: knowledgeIT, // Required size: 400x500px
            link: "/knowledge-it-land",
            status: "available",
            description: "Land for IT parks and knowledge-based industries",
          },
          {
            projectName: "Industrial",
            location: "Industrial zones and SEZs",
            image: industrial, // Required size: 400x500px
            link: "/industrial-land",
            status: "available",
            description: "Industrial land for manufacturing and logistics",
          },
          {
            projectName: "Recreation Sports & Entertainment",
            location: "Entertainment districts",
            image: sport, // Required size: 400x500px
            link: "/recreation-sports-land",
            status: "upcoming",
            description: "Land for sports complexes and entertainment venues",
          },
        ];

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBulkLandProjects(mockBulkLandProjects);
      } catch (error) {
        console.error("Error fetching bulk land projects:", error);
        setBulkLandError("Failed to load projects");
        setBulkLandProjects([]);
      } finally {
        setBulkLandLoading(false);
      }
    }

    fetchBulkLandProjects();
  }, [isBulkLandMenuOpen, bulkLandProjects.length]);

  // Fetch dholera projects (you can replace this with actual data)
  useEffect(() => {
    async function fetchDholeraProjects() {
      if (!isDholeraMenuOpen || dholeraProjects.length > 0) return;

      try {
        setDholeraLoading(true);
        setDholeraError(null);

        // Mock data for Dholera projects - replace with actual API call
        const mockDholeraProjects = [
          {
            projectName: "About Dholera SIR", // This will split as "About" (first line) and "Dholera SIR" (second line)
            location: "Dholera SIR, Gujarat",
            image: aboutDholera,
            link: "about-dholera-sir",
            status: "ongoing",
            constructionStatus: "Under Development",
          },
          {
            projectName: "Dholera Blogs",
            location: "Dholera SIR, Gujarat",
            image: dholeraBlogs,
            link: "dholera-sir-blogs",
            status: "upcoming",
            constructionStatus: "Planning Stage",
          },
          {
            projectName: "Dholera Latest Updates",
            location: "Dholera SIR, Gujarat",
            image: dholeraUpdates,
            link: "dholera-sir-updates",
            status: "ongoing",
            constructionStatus: "Under Construction",
          },
        ];

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDholeraProjects(mockDholeraProjects);
      } catch (error) {
        console.error("Error fetching dholera projects:", error);
        setDholeraError("Failed to load projects");
        setDholeraProjects([]);
      } finally {
        setDholeraLoading(false);
      }
    }

    fetchDholeraProjects();
  }, [isDholeraMenuOpen, dholeraProjects.length]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsResidentialMenuOpen(false);
      setIsDholeraMenuOpen(false);
      setIsBulkLandMenuOpen(false);
    }
  };

  const toggleResidentialMenu = () => {
    setIsResidentialMenuOpen(!isResidentialMenuOpen);
    setIsDholeraMenuOpen(false);
    setIsBulkLandMenuOpen(false);
  };

  const toggleBulkLandMenu = () => {
    setIsBulkLandMenuOpen(!isBulkLandMenuOpen);
    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
  };

  const toggleDholeraMenu = () => {
    setIsDholeraMenuOpen(!isDholeraMenuOpen);
    setIsResidentialMenuOpen(false);
    setIsBulkLandMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
    setIsBulkLandMenuOpen(false);
  };

  // Close dropdowns when clicking outside or on scroll
useEffect(() => {
  const handleClickOutside = (event) => {
    if (window.innerWidth < 768) return; // ignore clicks outside on mobile

    if (
      !event.target.closest(".dropdown-container") &&
      !event.target.closest(".residential-dropdown") &&
      !event.target.closest(".dholera-dropdown") &&
      !event.target.closest(".bulk-land-dropdown")
    ) {
      setIsResidentialMenuOpen(false);
      setIsDholeraMenuOpen(false);
      setIsBulkLandMenuOpen(false);
    }
  };

  const handleScroll = () => {
    if (window.innerWidth < 768) return; // ignore scroll on mobile
    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
    setIsBulkLandMenuOpen(false);
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setIsResidentialMenuOpen(false);
      setIsDholeraMenuOpen(false);
      setIsBulkLandMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("keydown", handleEscape);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("keydown", handleEscape);
  };
}, []);



  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white`}
      >
     {/*  <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          shouldUseWhiteBackground
            ? "bg-white border-b border-gray-200/50 shadow-lg"
            : "bg-transparent"
        }`}
      > */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" onClick={closeAllMenus}>
                <Image
                  src={logo}
                  height={75}
                  width={75}
                  alt="logo"
                  className="p-1"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-12">
              {/* Residential Dropdown */}
              <div className="relative group dropdown-container">
                <button
                  className={`font-medium transition-colors duration-300 hover:text-yellow-500 flex items-center ${textColor}`}
                  onClick={toggleResidentialMenu}
                >
                  Residential
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isResidentialMenuOpen ? "rotate-180" : ""}`}
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
                </button>
              </div>

              {/* Bulk Land Dropdown */}
              <div className="relative group dropdown-container">
                <button
                  className={`font-medium transition-colors duration-300 hover:text-yellow-500 flex items-center ${textColor}`}
                  onClick={toggleBulkLandMenu}
                >
                  Bulk Land
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isBulkLandMenuOpen ? "rotate-180" : ""}`}
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
                </button>
              </div>

              {/* Dholera SIR Dropdown */}
              <div className="relative group dropdown-container">
                <button
                  className={`font-medium transition-colors duration-300 hover:text-yellow-500 flex items-center ${textColor}`}
                  onClick={toggleDholeraMenu}
                >
                  Dholera SIR
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isDholeraMenuOpen ? "rotate-180" : ""}`}
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
                </button>
              </div>

              {/* Desktop Action Buttons */}
              <div className="flex items-center space-x-6">
                <Link
                  href="/contact"
                  className="bg-[#deae3c] text-black px-6 py-2 rounded-md font-medium hover:bg-[#f3bb39] transition duration-300 shadow-md"
                >
                  Contact Us
                </Link>

                {/* Menu Dropdown for additional links */}
                <div className="relative group ">
                  <button
                    className={`font-medium transition-colors duration-300 hover:text-yellow-500 ${textColor}`}
                  >
                    <Menu
                      className={`inline-block mr-1 h-8 w-8 p-1 rounded-sm ${shouldUseWhiteBackground ? "bg-gray-100 text-black" : "bg-white text-black"}`}
                    />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <Link
                        href="/career"
                        onClick={closeAllMenus}
                        className="block px-4 py-3 text-black hover:bg-gray-50 hover:text-yellow-600 transition-colors"
                      >
                        Careers
                      </Link>
                      <Link
                        href="/channel-partner"
                        onClick={closeAllMenus}
                        className="block px-4 py-3 text-black hover:bg-gray-50 hover:text-yellow-600 transition-colors"
                      >
                        Channel Partner
                      </Link>
                      <Link
                        href="/gallery"
                        onClick={closeAllMenus}
                        className="block px-4 py-3 text-black hover:bg-gray-50 hover:text-yellow-600 transition-colors"
                      >
                        Gallery
                      </Link>
                      <Link
                        href="/about"
                        onClick={closeAllMenus}
                        className="block px-4 py-3 text-black hover:bg-gray-50 hover:text-yellow-600 transition-colors"
                      >
                        About
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  shouldUseWhiteBackground
                    ? "text-black hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <svg
                  className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Residential Dropdown Menu */}
      {isResidentialMenuOpen && (
        <div className="residential-dropdown hidden md:flex fixed left-0 top-20 w-screen h-[calc(100vh-5rem)] bg-white shadow-2xl border-t border-gray-200 z-40 animate-in slide-in-from-top-4 duration-300">
          {/* Left Side - Title */}
          <div className="w-1/3 flex flex-col justify-between p-8 lg:p-12 h-full bg-gradient-to-br from-gray-50 to-white">
            <div>
              <h3 className="text-5xl font-light text-gray-900 leading-tight">
                Residential <br /> Projects
              </h3>
              <p className="text-gray-600 mt-4 text-xl">
                Discover premium residential developments with <br />
                world-class amenities
              </p>
            </div>
{/*             <div className="mt-auto">
              <Link
                href="/residential"
                onClick={closeAllMenus}
                className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition duration-200 shadow-md"
              >
                View All Projects
              </Link>
            </div> */}
          </div>

          {/* Right Side - Content */}
          <div className="w-2/3 p-4 lg:p-6 h-full overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                  <p className="text-gray-500 mt-4">Loading projects...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-red-500 text-center">
                  <p className="text-lg">{error}</p>
                </div>
              </div>
            ) : residentialProjects.length > 0 ? (
              <div className="grid grid-cols-4 gap-4 pb-6 h-full">
                {residentialProjects.map((project, index) => (
                  <Link
                    key={index}
                    href={`/dholera-residential-plots/${project.link}`}
                    onClick={closeAllMenus}
                    className={`group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col ${
                      project.status === "sold-out"
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={project.projectName}
                        fill
                        className={`object-cover transition-transform duration-700 ease-out ${
                          project.status === "sold-out"
                            ? "grayscale group-hover:grayscale"
                            : "group-hover:scale-110"
                        }`}
                        priority={index < 6}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />

                      {/* Enhanced Overlay with gradient */}
                      <div
                        className={`absolute inset-0  transition-all duration-500 ${
                          project.status === "sold-out"
                            ? "bg-gradient-to-t from-red-900/50 via-red-900/20 to-transparent"
                            : ""
                        }`}
                      ></div>

                      {/* Status Badges */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {project.status === "ongoing" && (
                          <div className="bg-green-500 text-white px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded-full shadow-lg animate-pulse">
                            ONGOING
                          </div>
                        )}
                        {project.status === "sold-out" && (
                          <div className="bg-red-500 text-white px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded-full shadow-lg">
                            SOLD OUT
                          </div>
                        )}
                        {project.status === "upcoming" && (
                          <div className="bg-blue-500 text-white px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded-full shadow-lg">
                            UPCOMING
                          </div>
                        )}
                        {project.status === "limited" && (
                          <div className="bg-orange-500 text-white px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded-full shadow-lg animate-pulse">
                            LIMITED
                          </div>
                        )}
                      </div>

                      {/* Sold Out Overlay */}
                      {project.status === "sold-out" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                          <div className="text-white text-2xl font-bold transform -rotate-12 bg-red-600/80 px-6 py-2 rounded-lg border-2 border-red-400">
                            SOLD OUT
                          </div>
                        </div>
                      )}

                      {/* Project Name and Location at Bottom */}
                      <div className="absolute bottom-5 left-0 right-0 p-4 text-white space-y-2">
                        <div className="space-y-2">
                          {/* Project Name */}
                          <h3
                            className={`text-lg font-semibold group-hover:text-[#deae3c] transition-colors duration-300 leading-tight ${
                              project.status === "sold-out"
                                ? "text-gray-300"
                                : ""
                            }`}
                          >
                            {project.projectName}
                          </h3>

                          {/* Location */}
                          <div className="flex items-center">
                            <svg
                              className={`w-3 h-3 mr-2 flex-shrink-0 ${
                                project.status === "sold-out"
                                  ? "text-gray-400"
                                  : ""
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span
                              className={`text-xs opacity-90 ${
                                project.status === "sold-out"
                                  ? "text-gray-400"
                                  : ""
                              }`}
                            >
                              {project.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-500 text-center">
                  <p className="text-lg">No projects available at the moment</p>
                  <p className="text-sm mt-2">Please check back later</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bulk Land Dropdown Menu */}
      {isBulkLandMenuOpen && (
        <div className="bulk-land-dropdown hidden md:flex fixed left-0 top-20 w-screen h-[calc(100vh-5rem)] bg-white shadow-2xl border-t border-gray-200 z-40 animate-in slide-in-from-top-4 duration-300">
          {/* Left Side - Title */}
          <div className="w-1/3 flex flex-col justify-between p-8 lg:p-12 h-full bg-gradient-to-br from-orange-50 to-white">
            <div>
              <h3 className="text-5xl font-light text-gray-900 leading-tight">
                Bulk Land <br /> Opportunities
              </h3>
              <p className="text-gray-600 mt-4 text-xl">
                Strategic land parcels for <br />
                commercial and industrial development
              </p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-2/3 p-4 lg:p-6 h-full overflow-y-auto">
            {bulkLandLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  <p className="text-gray-500 mt-4">Loading opportunities...</p>
                </div>
              </div>
            ) : bulkLandError ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-red-500 text-center">
                  <p className="text-lg">{bulkLandError}</p>
                </div>
              </div>
            ) : bulkLandProjects.length > 0 ? (
              <div className="grid grid-cols-4 gap-4 pb-6 h-full">
                {bulkLandProjects.map((project, index) => (
                  <Link
                    key={index}
                    href={`/bulk-land/${project.link}`}
                    onClick={closeAllMenus}
                    className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={project.projectName}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        priority={index < 6}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />

                      {/* Project Name and Location at Bottom */}
                      <div className="absolute bottom-5 left-0 right-0 p-4 text-white space-y-2">
                        <div className="space-y-2">
                          {/* Project Name */}
                          <h3 className="text-lg font-semibold group-hover:text-orange-300 transition-colors duration-300 leading-tight">
                            {project.projectName}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-500 text-center">
                  <p className="text-lg">
                    No opportunities available at the moment
                  </p>
                  <p className="text-sm mt-2">Please check back later</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dholera SIR Dropdown Menu */}
      {isDholeraMenuOpen && (
        <div className="dholera-dropdown hidden md:flex fixed left-0 top-20 w-screen h-[calc(100vh-5rem)] bg-white shadow-2xl border-t border-gray-200 z-40 animate-in slide-in-from-top-4 duration-300">
          {/* Left Side - Title */}
          <div className="w-1/3 flex flex-col justify-between p-8 lg:p-12 h-full bg-gradient-to-br from-blue-50 to-white">
            <div>
              <h3 className="text-5xl font-light text-gray-900 leading-tight">
                DHOLERA SIR
              </h3>
              <p className="text-gray-600 mt-4 text-xl">
                India's first planned smart city with futuristic infrastructure
              </p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-2/3 p-4 lg:p-6 h-full overflow-y-auto">
            {dholeraLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <p className="text-gray-500 mt-4">Loading projects...</p>
                </div>
              </div>
            ) : dholeraError ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-red-500 text-center">
                  <p className="text-lg">{dholeraError}</p>
                </div>
              </div>
            ) : dholeraProjects.length > 0 ? (
              <div className="grid grid-cols-4 gap-4 pb-6 h-full">
                {dholeraProjects.map((project, index) => {
                  // Split project name for two lines
                  const titleWords = project.projectName.split(" ");
                  const firstLine = titleWords
                    .slice(0, Math.ceil(titleWords.length / 2))
                    .join(" ");
                  const secondLine = titleWords
                    .slice(Math.ceil(titleWords.length / 2))
                    .join(" ");

                  return (
                    <Link
                      key={index}
                      href={`/${project.link}`}
                      onClick={closeAllMenus}
                      className={`group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col ${
                        project.status === "sold-out"
                          ? "opacity-75 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl flex-shrink-0">
                        <Image
                          src={project.image}
                          alt={project.projectName}
                          height={300}
                          width={400}
                          className={`object-cover w-full h-full transition-transform duration-700 ease-out ${
                            project.status === "sold-out"
                              ? "grayscale group-hover:grayscale"
                              : "group-hover:scale-110"
                          }`}
                          priority={index < 6}
                        />

                        {/* Project Title and Location at Bottom */}
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <div className="text-left space-y-2">
                            {/* Two-Line Project Title */}
                            <div
                              className={`font-semibold group-hover:text-[#deae3c] transition-colors duration-300 leading-tight ${
                                project.status === "sold-out"
                                  ? "text-gray-300"
                                  : ""
                              }`}
                            >
                              <div className="text-[20px]">{firstLine}</div>
                              {secondLine && (
                                <div className="text-[24px]">{secondLine}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-500 text-center">
                  <p className="text-lg">No projects available at the moment</p>
                  <p className="text-sm mt-2">Please check back later</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* <div
          className=" bg-black/60"
          onClick={closeAllMenus}
        ></div> */}

        <div
          className={`relative z-50 bg-white h-full w-full transition-all duration-300 overflow-y-auto ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={closeAllMenus}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-2">
            {/* Mobile Residential Dropdown */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={toggleResidentialMenu}
                className="flex items-center justify-between w-full text-left font-medium text-black hover:text-yellow-500 py-3 "
              >
                <span>Residential</span>
                <svg
                  className={`w-5 h-5 transition-transform ${isResidentialMenuOpen ? "rotate-180" : ""}`}
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
              </button>

              {isResidentialMenuOpen && (
                <div className="pl-4 mt-2 space-y-2 max-h-80 overflow-y-auto border-l-2 border-yellow-500">
                  {loading ? (
                    <div className="text-gray-500 text-sm py-4 text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500 mr-2"></div>
                      Loading projects...
                    </div>
                  ) : error ? (
                    <div className="text-red-500 text-sm py-2">{error}</div>
                  ) : (
                    <>
                      {residentialProjects.map((project, index) => (
                        <Link
                          key={index}
                          href={`/dholera-residential-plots/${project.link}`}
                          onClick={closeAllMenus}
                          className="flex items-center py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                            <Image
                              src={project.image}
                              alt={project.projectName}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-black font-medium text-sm">
                              {project.projectName}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {project.location}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Bulk Land Dropdown */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={toggleBulkLandMenu}
                className="flex items-center justify-between w-full text-left font-medium text-black hover:text-orange-500 py-3 transition-colors"
              >
                <span>Bulk Land</span>
                <svg
                  className={`w-5 h-5 transition-transform ${isBulkLandMenuOpen ? "rotate-180" : ""}`}
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
              </button>

              {isBulkLandMenuOpen && (
                <div className="pl-4 mt-2 space-y-2 max-h-80 overflow-y-auto border-l-2 border-orange-500">
                  {bulkLandLoading ? (
                    <div className="text-gray-500 text-sm py-4 text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                      Loading opportunities...
                    </div>
                  ) : bulkLandError ? (
                    <div className="text-red-500 text-sm py-2">
                      {bulkLandError}
                    </div>
                  ) : (
                    <>
                      {bulkLandProjects.map((project, index) => (
                        <Link
                          key={index}
                          href={`/bulk-land/${project.link}`}
                          onClick={closeAllMenus}
                          className="flex items-center py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                            <Image
                              src={project.image}
                              alt={project.projectName}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-black font-medium text-sm">
                              {project.projectName}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {project.location}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Dholera SIR Dropdown */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={toggleDholeraMenu}
                className="flex items-center justify-between w-full text-left font-medium text-black hover:text-blue-500 py-3 transition-colors"
              >
                <span>Dholera SIR</span>
                <svg
                  className={`w-5 h-5 transition-transform ${isDholeraMenuOpen ? "rotate-180" : ""}`}
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
              </button>

              {isDholeraMenuOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-blue-500">
                  {/* Dholera Projects in Mobile */}
                  {dholeraLoading ? (
                    <div className="text-gray-500 text-sm py-4 text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                      Loading projects...
                    </div>
                  ) : dholeraError ? (
                    <div className="text-red-500 text-sm py-2">
                      {dholeraError}
                    </div>
                  ) : dholeraProjects.length > 0 ? (
                    <div className="space-y-2 mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        Projects
                      </p>
                      {dholeraProjects.map((project, index) => (
                        <Link
                          key={index}
                          href={`/${project.link}`}
                          onClick={closeAllMenus}
                          className="flex items-center py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                            <Image
                              src={project.image}
                              alt={project.projectName}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-black font-medium text-sm">
                              {project.projectName}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {project.location}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={closeAllMenus}
              className="block font-medium text-black hover:text-yellow-500 py-3 border-b border-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              onClick={closeAllMenus}
              className="block font-medium text-black hover:text-yellow-500 py-3 border-b border-gray-100 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/career"
              onClick={closeAllMenus}
              className="block font-medium text-black hover:text-yellow-500 py-3 border-b border-gray-100 transition-colors"
            >
              Careers
            </Link>
            <Link
              href="/channel-partner"
              onClick={closeAllMenus}
              className="block font-medium text-black hover:text-yellow-500 py-3 border-b border-gray-100 transition-colors"
            >
              Channel Partner
            </Link>
            <Link
              href="/gallery"
              onClick={closeAllMenus}
              className="block font-medium text-black hover:text-yellow-500 py-3 transition-colors"
            >
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
