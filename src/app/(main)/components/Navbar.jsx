"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "@/assests/bma-logo.png";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import aboutDholera from "@/assests/dholeraSIR-nav/about-dholera-sir-bookmyassets.webp";
import dholeraBlogs from "@/assests/dholeraSIR-nav/dholera-sir-blogs-bookmyassets.webp";
import dholeraUpdates from "@/assests/dholeraSIR-nav/dholera-sir-latest-updates-bookmyassets.webp";
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
  const [isBulkLandMenuOpen, setIsBulkLandMenuOpen] = useState(false);
  const [residentialProjects, setResidentialProjects] = useState([]);
  const [dholeraProjects, setDholeraProjects] = useState([]);
  const [bulkLandProjects, setBulkLandProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dholeraLoading, setDholeraLoading] = useState(false);
  const [bulkLandLoading, setBulkLandLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dholeraError, setDholeraError] = useState(null);
  const [bulkLandError, setBulkLandError] = useState(null);
  const [isSoldOutOpen, setIsSoldOutOpen] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const shouldUseWhiteBackground =
    isScrolled ||
    !isHomePage ||
    isResidentialMenuOpen ||
    isDholeraMenuOpen ||
    isBulkLandMenuOpen;
  const textColor = "text-black";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch residential projects
  useEffect(() => {
    async function fetchResidentialProjects() {
      if (!isResidentialMenuOpen || residentialProjects.length > 0) return;
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/data/Residential.json");
        if (!response.ok) throw new Error("Failed to fetch projects");
        setResidentialProjects(await response.json());
      } catch (err) {
        console.error(err);
        setError("Failed to load projects");
        setResidentialProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchResidentialProjects();
  }, [isResidentialMenuOpen, residentialProjects.length]);

  // Fetch bulk land projects
  useEffect(() => {
    async function fetchBulkLandProjects() {
      if (!isBulkLandMenuOpen || bulkLandProjects.length > 0) return;
      try {
        setBulkLandLoading(true);
        setBulkLandError(null);
        const mockBulkLandProjects = [
          {
            projectName: "Residential Zone",
            location: "Prime locations across Gujarat",
            image: residential,
            link: "/residential",
            status: "available",
          },
          {
            projectName: "High Access Corridor",
            location: "Major highways and arterial roads",
            image: hac,
            link: "/high-access-corridor",
            status: "available",
          },
          {
            projectName: "City Centre",
            location: "Urban commercial districts",
            image: cityCenter,
            link: "/city-centre-land",
            status: "limited",
          },
          {
            projectName: "Knowledge and IT",
            location: "IT parks and tech corridors",
            image: knowledgeIT,
            link: "/knowledge-it-land",
            status: "available",
          },
          {
            projectName: "Industrial",
            location: "Industrial zones and SEZs",
            image: industrial,
            link: "/industrial-land",
            status: "available",
          },
          {
            projectName: "Recreation Sports & Entertainment",
            location: "Entertainment districts",
            image: sport,
            link: "/recreation-sports-land",
            status: "upcoming",
          },
        ];
        await new Promise((r) => setTimeout(r, 500));
        setBulkLandProjects(mockBulkLandProjects);
      } catch (err) {
        console.error(err);
        setBulkLandError("Failed to load projects");
        setBulkLandProjects([]);
      } finally {
        setBulkLandLoading(false);
      }
    }
    fetchBulkLandProjects();
  }, [isBulkLandMenuOpen, bulkLandProjects.length]);

  // Fetch dholera projects
  useEffect(() => {
    async function fetchDholeraProjects() {
      if (!isDholeraMenuOpen || dholeraProjects.length > 0) return;
      try {
        setDholeraLoading(true);
        setDholeraError(null);
        const mockDholeraProjects = [
          {
            projectName: "About Dholera SIR",
            location: "Dholera SIR, Gujarat",
            image: aboutDholera,
            link: "about-dholera-sir",
            status: "ongoing",
          },
          {
            projectName: "Dholera Blogs",
            location: "Dholera SIR, Gujarat",
            image: dholeraBlogs,
            link: "dholera-sir-blogs",
            status: "upcoming",
          },
          {
            projectName: "Dholera Latest Updates",
            location: "Dholera SIR, Gujarat",
            image: dholeraUpdates,
            link: "dholera-sir-updates",
            status: "ongoing",
          },
        ];
        await new Promise((r) => setTimeout(r, 500));
        setDholeraProjects(mockDholeraProjects);
      } catch (err) {
        console.error(err);
        setDholeraError("Failed to load projects");
        setDholeraProjects([]);
      } finally {
        setDholeraLoading(false);
      }
    }
    fetchDholeraProjects();
  }, [isDholeraMenuOpen, dholeraProjects.length]);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
    setIsBulkLandMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      if (!prev) {
        setIsResidentialMenuOpen(false);
        setIsDholeraMenuOpen(false);
        setIsBulkLandMenuOpen(false);
      }
      return !prev;
    });
  };

  const toggleResidentialMenu = () => {
    setIsResidentialMenuOpen((p) => !p);
    setIsDholeraMenuOpen(false);
    setIsBulkLandMenuOpen(false);
  };
  const toggleBulkLandMenu = () => {
    setIsBulkLandMenuOpen((p) => !p);
    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
  };
  const toggleDholeraMenu = () => {
    setIsDholeraMenuOpen((p) => !p);
    setIsResidentialMenuOpen(false);
    setIsBulkLandMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth < 768) return;
      if (
        !e.target.closest(".dropdown-container") &&
        !e.target.closest(".residential-dropdown") &&
        !e.target.closest(".dholera-dropdown") &&
        !e.target.closest(".bulk-land-dropdown")
      ) {
        setIsResidentialMenuOpen(false);
        setIsDholeraMenuOpen(false);
        setIsBulkLandMenuOpen(false);
      }
    };
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      setIsResidentialMenuOpen(false);
      setIsDholeraMenuOpen(false);
      setIsBulkLandMenuOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
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

  // Shared loading / error / empty states
  const LoadingSpinner = ({ color = "yellow" }) => (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div
          className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-${color}-500`}
        />
        <p className="text-gray-500 mt-4">Loading...</p>
      </div>
    </div>
  );
  const ErrorState = ({ msg }) => (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500 text-lg">{msg}</p>
    </div>
  );
  const EmptyState = () => (
    <div className="flex justify-center items-center h-64">
      <div className="text-gray-500 text-center">
        <p className="text-lg">No projects available at the moment</p>
        <p className="text-sm mt-2">Please check back later</p>
      </div>
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white">
        {/* ✅ calc() — horizontal padding scales with viewport */}
        <div className="max-w-7xl mx-auto px-[calc(1rem+1vw)]">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" onClick={closeAllMenus}>
                {/* Logo keeps fixed dimensions — it's a brand mark, not content imagery */}
                <Image
                  src={logo}
                  height={75}
                  width={75}
                  alt="BookMyAssets logo"
                  className="p-1"
                />
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-12">
              {[
                {
                  label: "Our Residential Projects",
                  toggle: toggleResidentialMenu,
                  open: isResidentialMenuOpen,
                },
                {
                  label: "Bulk Land Projects",
                  toggle: toggleBulkLandMenu,
                  open: isBulkLandMenuOpen,
                },
                {
                  label: "Dholera SIR",
                  toggle: toggleDholeraMenu,
                  open: isDholeraMenuOpen,
                },
              ].map(({ label, toggle, open }) => (
                <div key={label} className="relative group dropdown-container">
                  <button
                    className={`font-medium transition-colors duration-300 hover:text-yellow-500 flex items-center text-[clamp(0.8rem,1.2vw,1rem)] ${textColor}`}
                    onClick={toggle}
                  >
                    {label}
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""}`}
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
              ))}

              <div className="flex items-center space-x-6">
                <Link
                  href="/contact"
                  className="bg-[#deae3c] text-black px-6 py-2 rounded-md font-medium hover:bg-[#f3bb39] transition duration-300 shadow-md text-[clamp(0.8rem,1.2vw,1rem)]"
                >
                  Contact Us
                </Link>
                <div className="relative group">
                  <button
                    className={`font-medium transition-colors duration-300 hover:text-yellow-500 ${textColor}`}
                  >
                    <Menu
                      className={`inline-block mr-1 h-8 w-8 p-1 rounded-sm ${shouldUseWhiteBackground ? "bg-gray-100 text-black" : "bg-white text-black"}`}
                    />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {[
                        { href: "/career", label: "Careers" },
                        { href: "/channel-partner", label: "Channel Partner" },
                        { href: "/dholera-events", label: "Events" },
                        { href: "/gallery", label: "Gallery" },
                        { href: "/about", label: "About" },
                      ].map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeAllMenus}
                          className="block px-4 py-3 text-black hover:bg-gray-50 hover:text-yellow-600 transition-colors text-[clamp(0.8rem,1.2vw,0.875rem)]"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-md transition-colors duration-300 ${shouldUseWhiteBackground ? "text-black hover:bg-gray-100" : "hover:bg-white/10"}`}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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

      {/* ── Residential Dropdown ─────────────────────────────────────────── */}
      {isResidentialMenuOpen && (
        <div
          className="residential-dropdown hidden md:flex fixed left-0 top-20 w-screen bg-white shadow-2xl border-t border-gray-200 z-40 animate-in slide-in-from-top-4 duration-300
          
          h-[calc(100dvh-5rem)]"
        >
          <div className="w-1/3 flex flex-col  p-[calc(2rem+1vw)] h-full bg-gradient-to-br from-gray-50 to-white">
            {/* clamp() — heading scales between 36px and 48px */}
            <h3 className="text-[clamp(2.25rem,4vw,3rem)] font-light text-gray-900 leading-tight">
              Residential <br /> Projects
            </h3>
            <p className="text-gray-600 mt-4 text-[clamp(1rem,1.5vw,1.25rem)]">
              Discover premium residential developments with world-class
              amenities
            </p>
          </div>

          <div className="w-2/3 p-[calc(1rem+0.5vw)] h-full overflow-y-auto">
            {loading ? (
              <LoadingSpinner color="yellow" />
            ) : error ? (
              <ErrorState msg={error} />
            ) : residentialProjects.length > 0 ? (
              (() => {
                const activeProjects = residentialProjects.filter(
                  (p) => p.status !== "sold-out",
                );
                const soldOutProjects = residentialProjects.filter(
                  (p) => p.status === "sold-out",
                );

                const ProjectCard = ({ project, index, href }) => (
                  <Link
                    key={index}
                    href={href}
                    onClick={closeAllMenus}
                    className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={project.projectName}
                        fill
                        sizes="(min-width: 1024px) 15vw, 25vw"
                        className={`object-fit transition-transform duration-700 ease-out ${
                          project.status === "sold-out"
                            ? "grayscale"
                            : "group-hover:scale-110"
                        }`}
                        priority={index < 6}
                      />
                      <div
                        className={`absolute inset-0 transition-all duration-500 ${
                          project.status === "sold-out"
                            ? "bg-gradient-to-t from-red-900/50 via-red-900/20 to-transparent"
                            : ""
                        }`}
                      />

                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {project.status === "ongoing" && (
                          <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold uppercase rounded-full shadow-lg animate-pulse">
                            ONGOING
                          </span>
                        )}
                        {project.status === "sold-out" && (
                          <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold uppercase rounded-full shadow-lg">
                            SOLD OUT
                          </span>
                        )}
                        {project.status === "upcoming" && (
                          <span className="bg-blue-500 text-white px-2 py-1 text-xs font-semibold uppercase rounded-full shadow-lg">
                            UPCOMING
                          </span>
                        )}
                        {project.status === "limited" && (
                          <span className="bg-orange-500 text-white px-2 py-1 text-xs font-semibold uppercase rounded-full shadow-lg animate-pulse">
                            LIMITED
                          </span>
                        )}
                      </div>

                      {project.status === "sold-out" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                          <div className="text-white text-2xl font-bold transform -rotate-12 bg-red-600/80 px-6 py-2 rounded-lg border-2 border-red-400">
                            SOLD OUT
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-5 left-0 right-0 p-4 text-white space-y-2">
                        <h3
                          className={`text-[clamp(0.875rem,1.2vw,1.125rem)] font-semibold group-hover:text-[#deae3c] transition-colors duration-300 leading-tight ${
                            project.status === "sold-out" ? "text-gray-300" : ""
                          }`}
                        >
                          {project.projectName}
                        </h3>
                        <div className="flex items-center">
                          <svg
                            className="w-3 h-3 mr-2 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span
                            className={`text-xs opacity-90 ${project.status === "sold-out" ? "text-gray-400" : ""}`}
                          >
                            {project.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );

                return (
                  <div className="flex flex-col gap-6 pb-6">
                    {/* ── Active projects ── */}
                    {activeProjects.length > 0 && (
                      <div className="grid grid-cols-4 gap-[calc(0.5rem+0.5vw)]">
                        {activeProjects.map((project, index) => (
                          <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            href={`/dholera-residential-plots/${project.link}`}
                          />
                        ))}
                      </div>
                    )}

                    {/* ── Sold Out collapsible ── */}
                    {soldOutProjects.length > 0 && (
                      <div
                        className={`mt-2 rounded-xl border border-red-200 overflow-hidden transition-colors duration-200 ${isSoldOutOpen ? "bg-red-50/40" : "bg-red-50"}`}
                      >
                        <button
                          onClick={() => setIsSoldOutOpen((prev) => !prev)}
                          className="w-full flex items-center justify-between px-5 py-3 hover:bg-red-100 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">
                              Sold Out Projects
                            </span>
                            <span className="bg-red-200 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                              {soldOutProjects.length}
                            </span>
                          </div>
                          <svg
                            className={`w-4 h-4 text-red-400 transition-transform duration-300 flex-shrink-0 ${isSoldOutOpen ? "rotate-180" : ""}`}
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

                        <div
                          className={`grid grid-cols-4 gap-[calc(0.5rem+0.5vw)] overflow-hidden transition-all duration-500 ease-in-out ${
                            isSoldOutOpen
                              ? "max-h-[2000px] opacity-100 p-4"
                              : "max-h-0 opacity-0 px-4"
                          }`}
                        >
                          {soldOutProjects.map((project, index) => (
                            <ProjectCard
                              key={index}
                              project={project}
                              index={index}
                              href={`/dholera-residential-plots/${project.link}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      )}

      {/* ── Bulk Land Dropdown ───────────────────────────────────────────── */}
      {isBulkLandMenuOpen && (
        <div
          className="bulk-land-dropdown hidden md:flex fixed left-0 top-20 w-screen bg-white shadow-2xl border-t border-gray-200 z-40 animate-in slide-in-from-top-4 duration-300
          h-[calc(100dvh-5rem)]"
        >
          <div className="w-1/3 flex flex-col justify-between p-[calc(2rem+1vw)] h-full bg-gradient-to-br from-orange-50 to-white">
            <div>
              <h3 className="text-[clamp(2.25rem,4vw,3rem)] font-light text-gray-900 leading-tight">
                Bulk Land <br /> Opportunities
              </h3>
              <p className="text-gray-600 mt-4 text-[clamp(1rem,1.5vw,1.25rem)]">
                Strategic land parcels for commercial and industrial development
              </p>
            </div>
          </div>

          <div className="w-2/3 p-[calc(1rem+0.5vw)] h-full overflow-y-auto">
            {bulkLandLoading ? (
              <LoadingSpinner color="orange" />
            ) : bulkLandError ? (
              <ErrorState msg={bulkLandError} />
            ) : bulkLandProjects.length > 0 ? (
              <div className="grid grid-cols-4 gap-[calc(0.5rem+0.5vw)] pb-6 h-full">
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
                        sizes="(min-width: 1024px) 15vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        priority={index < 6}
                      />
                      <div className="absolute bottom-5 left-0 right-0 p-4 text-white">
                        <h3 className="text-[clamp(0.875rem,1.2vw,1.125rem)] font-semibold group-hover:text-orange-300 transition-colors duration-300 leading-tight">
                          {project.projectName}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      )}

      {/* ── Dholera Dropdown ─────────────────────────────────────────────── */}
      {isDholeraMenuOpen && (
        <div
          className="dholera-dropdown hidden md:flex fixed left-0 top-20 w-screen bg-white shadow-2xl border-t border-gray-200 z-40 animate-in slide-in-from-top-4 duration-300
          h-[calc(100dvh-5rem)]"
        >
          <div className="w-1/3 flex flex-col justify-between p-[calc(2rem+1vw)] h-full bg-gradient-to-br from-blue-50 to-white">
            <div>
              <h3 className="text-[clamp(2.25rem,4vw,3rem)] font-light text-gray-900 leading-tight">
                DHOLERA SIR
              </h3>
              <p className="text-gray-600 mt-4 text-[clamp(1rem,1.5vw,1.25rem)]">
                India's first planned smart city with futuristic infrastructure
              </p>
            </div>
          </div>

          <div className="w-2/3 p-[calc(1rem+0.5vw)] h-full overflow-y-auto">
            {dholeraLoading ? (
              <LoadingSpinner color="blue" />
            ) : dholeraError ? (
              <ErrorState msg={dholeraError} />
            ) : dholeraProjects.length > 0 ? (
              <div className="grid grid-cols-4 gap-[calc(0.5rem+0.5vw)] pb-6 h-full">
                {dholeraProjects.map((project, index) => {
                  const words = project.projectName.split(" ");
                  const firstLine = words
                    .slice(0, Math.ceil(words.length / 2))
                    .join(" ");
                  const secondLine = words
                    .slice(Math.ceil(words.length / 2))
                    .join(" ");
                  return (
                    <Link
                      key={index}
                      href={`/${project.link}`}
                      onClick={closeAllMenus}
                      className={`group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col ${project.status === "sold-out" ? "opacity-75 cursor-not-allowed" : ""}`}
                    >
                      {/* ✅ responsive image — fill + sizes instead of fixed width/height */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl flex-shrink-0">
                        <Image
                          src={project.image}
                          alt={project.projectName}
                          fill
                          sizes="(min-width: 1024px) 15vw, 25vw"
                          className={`object-cover transition-transform duration-700 ease-out ${project.status === "sold-out" ? "grayscale" : "group-hover:scale-110"}`}
                          priority={index < 6}
                        />
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <div
                            className={`font-semibold group-hover:text-[#deae3c] transition-colors duration-300 leading-tight ${project.status === "sold-out" ? "text-gray-300" : ""}`}
                          >
                            {/* ✅ clamp() — two-line title scales fluidly */}
                            <div className="text-[clamp(1rem,1.5vw,1.25rem)]">
                              {firstLine}
                            </div>
                            {secondLine && (
                              <div className="text-[clamp(1.125rem,1.8vw,1.5rem)]">
                                {secondLine}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      )}

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      {/* ✅ inert — when menu is closed, all interactive children are fully blocked */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        inert={!isMobileMenuOpen}
      >
        <div
          className={`relative z-50 bg-white h-full w-full transition-all duration-300 overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-[calc(0.75rem+0.5vw)] border-b border-gray-200">
            <p className="text-[clamp(1rem,2vw,1.125rem)] font-semibold text-gray-800">
              Menu
            </p>
            <button
              onClick={closeAllMenus}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
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

          <div className="p-[calc(0.75rem+0.5vw)] space-y-2">
            {/* Mobile — Residential */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={toggleResidentialMenu}
                className="flex items-center justify-between w-full text-left font-medium text-black hover:text-yellow-500 py-3 text-[clamp(0.875rem,2vw,1rem)]"
              >
                <span>Our Residential Projects</span>
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
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500 mr-2" />{" "}
                      Loading...
                    </div>
                  ) : error ? (
                    <div className="text-red-500 text-sm py-2">{error}</div>
                  ) : (
                    residentialProjects.map((project, index) => (
                      <Link
                        key={index}
                        href={`/dholera-residential-plots/${project.link}`}
                        onClick={closeAllMenus}
                        className={`flex items-center py-3 px-2 rounded-lg transition-colors ${project.status === "sold-out" ? "opacity-60 cursor-not-allowed bg-gray-50" : "hover:bg-gray-50"}`}
                      >
                        {/* ✅ responsive image — aspect-square container + fill for mobile thumbnails */}
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          <Image
                            src={project.image}
                            alt={project.projectName}
                            fill
                            sizes="48px"
                            className={`object-cover ${project.status === "sold-out" ? "grayscale" : ""}`}
                          />
                          {project.status === "sold-out" && (
                            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                              <span className="text-[8px] font-bold text-red-600 bg-white/90 px-1 rounded">
                                SOLD
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-medium text-sm ${project.status === "sold-out" ? "text-gray-500" : "text-black"}`}
                            >
                              {project.projectName}
                            </span>
                            {project.status === "sold-out" && (
                              <span className="text-[9px] font-semibold text-red-600    bg-red-50    px-1.5 py-0.5 rounded-full">
                                SOLD OUT
                              </span>
                            )}
                            {project.status === "ongoing" && (
                              <span className="text-[9px] font-semibold text-green-600  bg-green-50  px-1.5 py-0.5 rounded-full">
                                ONGOING
                              </span>
                            )}
                            {project.status === "upcoming" && (
                              <span className="text-[9px] font-semibold text-blue-600   bg-blue-50   px-1.5 py-0.5 rounded-full">
                                UPCOMING
                              </span>
                            )}
                            {project.status === "limited" && (
                              <span className="text-[9px] font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">
                                LIMITED
                              </span>
                            )}
                          </div>
                          <div
                            className={`text-xs mt-1 ${project.status === "sold-out" ? "text-gray-400" : "text-gray-500"}`}
                          >
                            {project.location}
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Mobile — Bulk Land */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={toggleBulkLandMenu}
                className="flex items-center justify-between w-full text-left font-medium text-black hover:text-orange-500 py-3 transition-colors text-[clamp(0.875rem,2vw,1rem)]"
              >
                <span>Bulk Land Projects</span>
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
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2" />{" "}
                      Loading...
                    </div>
                  ) : bulkLandError ? (
                    <div className="text-red-500 text-sm py-2">
                      {bulkLandError}
                    </div>
                  ) : (
                    bulkLandProjects.map((project, index) => (
                      <Link
                        key={index}
                        href={`/bulk-land/${project.link}`}
                        onClick={closeAllMenus}
                        className="flex items-center py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          <Image
                            src={project.image}
                            alt={project.projectName}
                            fill
                            sizes="48px"
                            className="object-cover"
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
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Mobile — static links */}
            {[
              { href: "/dholera-sir-blogs", label: "Blogs" },
              { href: "/dholera-sir-updates", label: "Dholera SIR Updates" },
              { href: "/about-dholera-sir", label: "About Dholera" },
              { href: "/contact", label: "Contact Us" },
              { href: "/about", label: "About Us" },
              { href: "/gallery", label: "Gallery" },
            ].map(({ href, label }, i, arr) => (
              <Link
                key={href}
                href={href}
                onClick={closeAllMenus}
                className={`block font-medium text-[clamp(0.875rem,2vw,1rem)] text-black hover:text-yellow-500 py-3 transition-colors ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
