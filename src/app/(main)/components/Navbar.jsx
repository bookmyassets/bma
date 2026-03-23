"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import logo from "@/assests/bma-logo.png";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import aboutDholera from "@/assests/dholeraSIR/about-dholera-sir.webp";
import dholeraBlogs from "@/assests/dholeraSIR/dholera-blogs.webp";
import dholeraUpdates from "@/assests/dholeraSIR/dholera-latest-update.webp";
import residential from "@/assests/bulkLand/residential-zone-cover.webp";
import hac from "@/assests/bulkLand/high-access-corridor-cover.webp";
import cityCenter from "@/assests/bulkLand/city-centre-cover.webp";
import industrial from "@/assests/bulkLand/industrial-cover.webp";
import sport from "@/assests/bulkLand/recreation-sports-map.webp";
import knowledgeIT from "@/assests/bulkLand/knowledge-it-cover.webp";

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  ongoing:   { label: "Ongoing",   cls: "bg-emerald-500/15 text-emerald-600 border-emerald-200" },
  upcoming:  { label: "Upcoming",  cls: "bg-blue-500/15 text-blue-600 border-blue-200"          },
  limited:   { label: "Limited",   cls: "bg-amber-500/15 text-amber-600 border-amber-200"       },
  "sold-out":{ label: "Sold Out",  cls: "bg-red-500/15 text-red-600 border-red-200"             },
  available: { label: "Available", cls: "bg-emerald-500/15 text-emerald-600 border-emerald-200" },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status];
  if (!s) return null;
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${s.cls}`}>
      {s.label}
    </span>
  );
};

// ── Editorial dropdown ────────────────────────────────────────────────────────
function EditorialDropdown({ projects, loading, error, hrefPrefix, accentColor = "#deae3c", onClose }) {
  const activeProjects  = projects.filter((p) => p.status !== "sold-out");
  const soldOutProjects = projects.filter((p) => p.status === "sold-out");

  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [soldOutOpen, setSoldOutOpen] = useState(false);
  const previewProject = activeProjects[hoveredIndex] ?? activeProjects[0];

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 border-2 border-gray-200 rounded-full animate-spin"
          style={{ borderTopColor: accentColor }}
        />
        <span className="text-xs text-gray-400 tracking-widest uppercase">Loading</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );

  if (!projects.length) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-400 text-sm">No projects available</p>
    </div>
  );

  const buildHref = (project) =>
    hrefPrefix === "/"
      ? `/${project.link}`
      : project.link.startsWith("/")
      ? `${hrefPrefix}${project.link}`
      : `${hrefPrefix}/${project.link}`;

  return (
    <div className="flex h-full">

      {/* Left — full-height image preview (only active projects cycle here) */}
      <div className="w-[42%] relative overflow-hidden flex-shrink-0 bg-gray-950">
        {activeProjects.map((p, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: i === hoveredIndex ? 1 : 0 }}
          >
            <Image
              src={p.image}
              alt={p.projectName}
              fill
              sizes="42vw"
              className="object-cover scale-105"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          </div>
        ))}

        {/* Counter — only counts active */}
        <div className="absolute top-8 left-8 z-10">
          <span className="text-white/40 font-mono text-xs tracking-[0.2em]">
            {String(hoveredIndex + 1).padStart(2, "0")} / {String(activeProjects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Active project label bottom-left */}
        {previewProject && (
          <div className="absolute bottom-8 left-8 right-6 z-10">
            <p className="text-white/50 text-xs tracking-[0.18em] uppercase mb-2">
              {previewProject.location ?? ""}
            </p>
            <h2 className="text-white text-2xl font-light leading-snug mb-3">
              {previewProject.projectName}
            </h2>
            <StatusBadge status={previewProject.status} />
          </div>
        )}
      </div>

      {/* Right — two sections: active on top, sold-out below */}
      <div className="flex-1 flex flex-col px-10 overflow-y-auto py-8 justify-center">

        {/* ── Active / Available projects ── */}
        {activeProjects.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[30px] font-semibold uppercase tracking-[0.2em] text-green-800">
                Ongoing
              </span>
              <div className="flex-1 h-px border-t border-dashed border-gray-200" />
            </div>
            <ul className="divide-y divide-gray-100">
              {activeProjects.map((project, i) => {
                const isHovered = i === hoveredIndex;
                return (
                  <li key={i}>
                    <Link
                      href={buildHref(project)}
                      onClick={onClose}
                      onMouseEnter={() => setHoveredIndex(i)}
                      className="group flex items-center justify-between py-4 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <span
                          className="font-mono tabular-nums w-6 transition-colors duration-200"
                          style={{ color: isHovered ? accentColor : "#d1d5db" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-black/5">
                          <Image
                            src={project.image}
                            alt={project.projectName}
                            fill
                            sizes="48px"
                            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
                          />
                        </div>
                        <div>
                          <p
                            className="font-semibold leading-tight transition-colors duration-200"
                            style={{ color: isHovered ? "#111827" : "#6b7280" }}
                          >
                            {project.projectName}
                          </p>
                          {project.location && (
                            <p className="text-sm text-gray-400 mt-0.5 leading-tight">{project.location}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        <StatusBadge status={project.status} />
                        <ArrowUpRight
                          className="w-4 h-4 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          style={{ color: accentColor }}
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* ── Sold Out accordion ── */}
        {soldOutProjects.length > 0 && (
          <div className="mt-6">
            {/* Clickable header */}
            <button
              onClick={() => setSoldOutOpen((p) => !p)}
              className="flex items-center gap-3 w-full group"
            >
              <span className="text-[30px] font-semibold uppercase tracking-[0.2em] text-red-800">
                Sold Out
              </span>
              <div className="flex-1 h-px border-t border-dashed border-gray-200" />
              <span className="text-xs font-medium text-red-300 tracking-widest uppercase ml-1 flex-shrink-0">
                {soldOutOpen ? "hide" : `${soldOutProjects.length} projects`}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-red-400 flex-shrink-0 transition-transform duration-300 ${soldOutOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Collapsible body */}
            <div
              className={`overflow-hidden transition-all duration-400 ease-in-out ${
                soldOutOpen ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="divide-y divide-gray-100">
                {soldOutProjects.map((project, i) => (
                  <li key={i}>
                    <div className="flex items-center justify-between py-3 opacity-40 cursor-not-allowed">
                      <div className="flex items-center gap-5">
                        <span className="font-mono tabular-nums w-6 text-gray-300">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-black/5">
                          <Image
                            src={project.image}
                            alt={project.projectName}
                            fill
                            sizes="48px"
                            className="object-cover grayscale"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-400 leading-tight line-through decoration-gray-300">
                            {project.projectName}
                          </p>
                          {project.location && (
                            <p className="text-sm text-gray-300 mt-0.5 leading-tight">{project.location}</p>
                          )}
                        </div>
                      </div>
                      <StatusBadge status="sold-out" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setMobileOpen]   = useState(false);
  const [activeMenu, setActiveMenu]         = useState(null); // "residential"|"bulk"|"dholera"|null
  const [residentialProjects, setRP]        = useState([]);
  const [bulkLandProjects, setBP]           = useState([]);
  const [dholeraProjects, setDP]            = useState([]);
  const [loadingMap, setLoadingMap]         = useState({});
  const [errorMap, setErrorMap]             = useState({});
  const navRef = useRef(null);

  // Scroll
  useEffect(() => {
    const fn = () => { setIsScrolled(window.scrollY > 50); setActiveMenu(null); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Click outside
  useEffect(() => {
    const fn = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setActiveMenu(null); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setActiveMenu(null); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  // Fetch residential
  useEffect(() => {
    if (activeMenu !== "residential" || residentialProjects.length) return;
    setLoadingMap((p) => ({ ...p, residential: true }));
    fetch("/data/Residential.json")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setRP)
      .catch(() => setErrorMap((p) => ({ ...p, residential: "Failed to load" })))
      .finally(() => setLoadingMap((p) => ({ ...p, residential: false })));
  }, [activeMenu]);

  // Fetch bulk
  useEffect(() => {
    if (activeMenu !== "bulk" || bulkLandProjects.length) return;
    setLoadingMap((p) => ({ ...p, bulk: true }));
    setTimeout(() => {
      setBP([
        { projectName: "Residential Zone",                  location: "Prime locations across Gujarat",   image: residential, link: "/residential",            status: "" },
        { projectName: "High Access Corridor",              location: "Major highways and arterial roads",image: hac,         link: "/high-access-corridor",   status: "" },
        { projectName: "City Centre",                       location: "Urban commercial districts",       image: cityCenter,  link: "/city-centre-land",       status: ""   },
        { projectName: "Knowledge and IT",                  location: "IT parks and tech corridors",      image: knowledgeIT, link: "/knowledge-it-land",      status: "" },
        { projectName: "Industrial",                        location: "Industrial zones and SEZs",        image: industrial,  link: "/industrial-land",         status: "" },
        { projectName: "Recreation Sports & Entertainment", location: "Entertainment districts",          image: sport,       link: "/recreation-sports-land", status: ""  },
      ]);
      setLoadingMap((p) => ({ ...p, bulk: false }));
    }, 400);
  }, [activeMenu]);

  // Fetch dholera
  useEffect(() => {
    if (activeMenu !== "dholera" || dholeraProjects.length) return;
    setLoadingMap((p) => ({ ...p, dholera: true }));
    setTimeout(() => {
      setDP([
        { projectName: "About Dholera SIR",     location: "Dholera SIR, Gujarat", image: aboutDholera,   link: "about-dholera-sir",   status: ""  },
        { projectName: "Dholera Blogs",          location: "Dholera SIR, Gujarat", image: dholeraBlogs,   link: "dholera-sir-blogs",   status: "" },
        { projectName: "Dholera Latest Updates", location: "Dholera SIR, Gujarat", image: dholeraUpdates, link: "dholera-sir-updates", status: ""  },
      ]);
      setLoadingMap((p) => ({ ...p, dholera: false }));
    }, 400);
  }, [activeMenu]);

  const closeAll = () => { setActiveMenu(null); setMobileOpen(false); };
  const toggle   = (key) => setActiveMenu((prev) => (prev === key ? null : key));

  const NAV_ITEMS = [
    { key: "residential", label: "Residential Projects" },
    { key: "bulk",        label: "Bulk Land"            },
    { key: "dholera",     label: "Dholera SIR"          },
  ];

  const DROPDOWN_CONFIG = {
    residential: { projects: residentialProjects, hrefPrefix: "/dholera-residential-plots", accentColor: "#deae3c" },
    bulk:        { projects: bulkLandProjects,    hrefPrefix: "/bulk-land",                 accentColor: "#f97316" },
    dholera:     { projects: dholeraProjects,     hrefPrefix: "/",                          accentColor: "#3b82f6" },
  };

  return (
    <div ref={navRef}>
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${isScrolled || activeMenu ? "shadow-sm" : ""}`}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" onClick={closeAll} className="flex-shrink-0">
              <Image src={logo} height={72} width={72} alt="BookMyAssets" className="p-1" />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeMenu === key
                      ? "text-black bg-gray-100"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === key ? "rotate-180" : ""}`} />
                  {activeMenu === key && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{ backgroundColor: DROPDOWN_CONFIG[key]?.accentColor }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-3">
              {/* Misc dropdown */}
              <div className="relative group">
                <button className="p-2.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  {[
                    { href: "/career",          label: "Careers"         },
                    { href: "/channel-partner", label: "Channel Partner" },
                    { href: "/dholera-events",  label: "Events"          },
                    { href: "/gallery",         label: "Gallery"         },
                    { href: "/about",           label: "About"           },
                  ].map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeAll}
                      className="flex items-center justify-between px-5 py-3.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                    >
                      {label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-30" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                onClick={closeAll}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all duration-200 hover:brightness-105 active:scale-95"
                style={{ backgroundColor: "#deae3c" }}
              >
                Contact Us
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="p-2 rounded-md text-black hover:bg-gray-100 transition-colors duration-300"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <svg
                  className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Backdrop ────────────────────────────────────────────────────────── */}
      <div
        onClick={() => setActiveMenu(null)}
        className={`fixed inset-0 z-30 hidden md:block bg-black/20 backdrop-blur-sm transition-all duration-300 ${
          activeMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* ── Dropdown panel ──────────────────────────────────────────────────── */}
      <div
        className={`fixed left-0 right-0 top-20 z-40 bg-white border-t border-gray-100 shadow-2xl hidden md:block transition-all duration-300 ease-out ${
          activeMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
        style={{ height: "calc(100dvh - 5rem)" }}
      >
        {activeMenu && DROPDOWN_CONFIG[activeMenu] && (
          <EditorialDropdown
            key={activeMenu}
            projects={DROPDOWN_CONFIG[activeMenu].projects}
            loading={loadingMap[activeMenu]}
            error={errorMap[activeMenu]}
            hrefPrefix={DROPDOWN_CONFIG[activeMenu].hrefPrefix}
            accentColor={DROPDOWN_CONFIG[activeMenu].accentColor}
            onClose={closeAll}
          />
        )}
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        inert={!isMobileMenuOpen}
      >
        <div
          className={`relative z-50 bg-white h-full w-full transition-all duration-300 overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-[calc(0.75rem+0.5vw)] border-b border-gray-200">
            <h2 className="text-[clamp(1rem,2vw,1.125rem)] font-semibold text-gray-800">Menu</h2>
            <button
              onClick={closeAll}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-[calc(0.75rem+0.5vw)] space-y-2">

            {/* Mobile — Residential */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => toggle("residential")}
                className="flex items-center justify-between w-full text-left font-medium text-black hover:text-yellow-500 py-3 text-[clamp(0.875rem,2vw,1rem)]"
              >
                <span>Our Residential Projects</span>
                <svg
                  className={`w-5 h-5 transition-transform ${activeMenu === "residential" ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeMenu === "residential" && (
                <div className="pl-4 mt-2 space-y-2 max-h-80 overflow-y-auto border-l-2 border-yellow-500">
                  {loadingMap.residential ? (
                    <div className="text-gray-500 text-sm py-4 text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500 mr-2" /> Loading...
                    </div>
                  ) : errorMap.residential ? (
                    <div className="text-red-500 text-sm py-2">{errorMap.residential}</div>
                  ) : (
                    residentialProjects.map((project, index) => (
                      <Link
                        key={index}
                        href={`/dholera-residential-plots/${project.link}`}
                        onClick={closeAll}
                        className={`flex items-center py-3 px-2 rounded-lg transition-colors ${
                          project.status === "sold-out" ? "opacity-60 cursor-not-allowed bg-gray-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          <Image
                            src={project.image} alt={project.projectName}
                            fill sizes="48px"
                            className={`object-cover ${project.status === "sold-out" ? "grayscale" : ""}`}
                          />
                          {project.status === "sold-out" && (
                            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                              <span className="text-[8px] font-bold text-red-600 bg-white/90 px-1 rounded">SOLD</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium text-sm ${project.status === "sold-out" ? "text-gray-500" : "text-black"}`}>
                              {project.projectName}
                            </span>
                            {project.status === "sold-out" && <span className="text-[9px] font-semibold text-red-600    bg-red-50    px-1.5 py-0.5 rounded-full">SOLD OUT</span>}
                            {project.status === "ongoing"  && <span className="text-[9px] font-semibold text-green-600  bg-green-50  px-1.5 py-0.5 rounded-full">ONGOING</span>}
                            {project.status === "upcoming" && <span className="text-[9px] font-semibold text-blue-600   bg-blue-50   px-1.5 py-0.5 rounded-full">UPCOMING</span>}
                            {project.status === "limited"  && <span className="text-[9px] font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">LIMITED</span>}
                          </div>
                          <div className={`text-xs mt-1 ${project.status === "sold-out" ? "text-gray-400" : "text-gray-500"}`}>
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
                onClick={() => toggle("bulk")}
                className="flex items-center justify-between w-full text-left font-medium text-black hover:text-orange-500 py-3 transition-colors text-[clamp(0.875rem,2vw,1rem)]"
              >
                <span>Bulk Land Projects</span>
                <svg
                  className={`w-5 h-5 transition-transform ${activeMenu === "bulk" ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeMenu === "bulk" && (
                <div className="pl-4 mt-2 space-y-2 max-h-80 overflow-y-auto border-l-2 border-orange-500">
                  {loadingMap.bulk ? (
                    <div className="text-gray-500 text-sm py-4 text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2" /> Loading...
                    </div>
                  ) : errorMap.bulk ? (
                    <div className="text-red-500 text-sm py-2">{errorMap.bulk}</div>
                  ) : (
                    bulkLandProjects.map((project, index) => (
                      <Link
                        key={index}
                        href={`/bulk-land/${project.link}`}
                        onClick={closeAll}
                        className="flex items-center py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          <Image src={project.image} alt={project.projectName} fill sizes="48px" className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="text-black font-medium text-sm">{project.projectName}</div>
                          <div className="text-xs text-gray-500 mt-1">{project.location}</div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Mobile — static links */}
            {[
              { href: "/dholera-sir-blogs",   label: "Blogs"               },
              { href: "/dholera-sir-updates", label: "Dholera SIR Updates" },
              { href: "/about-dholera-sir",   label: "About Dholera"       },
              { href: "/contact",             label: "Contact Us"          },
              { href: "/about",               label: "About Us"            },
              { href: "/gallery",             label: "Gallery"             },
            ].map(({ href, label }, i, arr) => (
              <Link
                key={href}
                href={href}
                onClick={closeAll}
                className={`block font-medium text-[clamp(0.875rem,2vw,1rem)] text-black hover:text-yellow-500 py-3 transition-colors ${
                  i < arr.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}