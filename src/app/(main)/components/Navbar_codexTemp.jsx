"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assests/Bmalogo.png";
import aboutDholera from "@/assests/dholeraSIR-nav/about-dholera-sir-bookmyassets.webp";
import dholeraBlogs from "@/assests/dholeraSIR-nav/dholera-sir-blogs-bookmyassets.webp";
import dholeraUpdates from "@/assests/dholeraSIR-nav/dholera-sir-latest-updates-bookmyassets.webp";
import residential from "@/assests/bulkLand/residential-zone-cover.webp";
import hac from "@/assests/bulkLand/high-access-corridor-cover.webp";
import cityCenter from "@/assests/bulkLand/city-centre-cover.webp";
import industrial from "@/assests/bulkLand/industrial-cover.webp";
import sport from "@/assests/bulkLand/recreation-sports-map.webp";
import knowledgeIT from "@/assests/bulkLand/knowledge-it-cover.webp";

const whatsappEnquiryLink = `https://wa.me/918130371647?text=${encodeURIComponent(
  "Hi, I need a call back",
)}`;

const bulkLandItems = [
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

const dholeraItems = [
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

const utilityLinks = [
  { href: "/career", label: "Careers" },
  { href: "/channel-partner", label: "Channel Partner" },
  { href: "/dholera-events", label: "Investor Meetups" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/dholera-sir-blogs", label: "Dholera Blogs" },
  { href: "/dholera-sir-updates", label: "Dholera SIR Updates" },
  { href: "/about-dholera-sir", label: "About Dholera" },
  { href: "/dholera-events", label: "Investor Meetups" },
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
];

const statusClasses = {
  ongoing: "bg-green-500",
  "sold-out": "bg-red-500",
  upcoming: "bg-blue-500",
  limited: "bg-orange-500",
};

function ChevronIcon({ open, className = "h-[1rem] w-[1rem]" }) {
  return (
    <svg
      className={`${className} transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function LoadingState({ color = "yellow" }) {
  const spinnerColor = {
    yellow: "border-[#deae3c]",
    orange: "border-orange-500",
    blue: "border-blue-500",
  };

  return (
    <div className="flex h-[16rem] items-center justify-center">
      <div className="text-center">
        <div
          className={`inline-block h-[2rem] w-[2rem] animate-spin rounded-full border-b-[0.125rem] ${
            spinnerColor[color] || spinnerColor.yellow
          }`}
        />
        <p className="mt-[calc(0.75rem_+_0.25vw)] text-[clamp(0.875rem,0.78rem_+_0.45vw,1.0625rem)] text-white/60">
          Loading...
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="flex h-[16rem] items-center justify-center">
      <p className="text-[clamp(1rem,0.875rem_+_0.55vw,1.1875rem)] text-red-400">
        {message}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-[16rem] items-center justify-center">
      <div className="text-center text-white/60">
        <p className="text-[clamp(1rem,0.875rem_+_0.55vw,1.1875rem)]">
          No projects available at the moment
        </p>
        <p className="mt-[calc(0.375rem_+_0.125vw)] text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)]">
          Please check back later
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  if (!status || status === "available") return null;

  const label = status === "sold-out" ? "SOLD OUT" : status.toUpperCase();

  return (
    <span
      className={`rounded-full px-[0.5rem] py-[0.25rem] text-[clamp(0.625rem,0.5rem_+_0.3vw,0.8125rem)] font-semibold uppercase text-white shadow-lg ${
        statusClasses[status] || "bg-gray-500"
      } ${status === "ongoing" || status === "limited" ? "animate-pulse" : ""}`}
    >
      {label}
    </span>
  );
}

function ResidentialCard({ project, index, href, onClick }) {
  const isSoldOut = project.status === "sold-out";

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-[0.25rem]"
    >
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-xl">
        <Image
          src={project.image}
          alt={project.projectName}
          fill
          sizes="(min-width: 64rem) 15vw, 25vw"
          className={`object-cover transition-transform duration-700 ease-out ${
            isSoldOut ? "grayscale" : "group-hover:scale-110"
          }`}
          priority={index < 6}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-all duration-500 ${
            isSoldOut ? "from-red-950/70" : ""
          }`}
        />

        <div className="absolute right-[0.75rem] top-[0.75rem] flex flex-col gap-[0.5rem]">
          <StatusBadge status={project.status} />
        </div>

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[0.0625rem]">
            <div className="-rotate-12 rounded-lg border-[0.125rem] border-red-400 bg-red-600/80 px-[1.5rem] py-[0.5rem] text-[clamp(1.25rem,1rem_+_1vw,1.5rem)] font-bold text-white">
              SOLD OUT
            </div>
          </div>
        )}

        <div className="absolute bottom-[1.25rem] left-0 right-0 space-y-[0.5rem] p-[1rem] text-white">
          <h3
            className={`text-[clamp(0.9375rem,0.78rem_+_0.65vw,1.25rem)] font-semibold leading-tight transition-colors duration-300 group-hover:text-[#deae3c] ${
              isSoldOut ? "text-gray-300" : ""
            }`}
          >
            {project.projectName}
          </h3>

          <div className="flex items-center">
            <svg
              className="mr-[0.5rem] h-[0.75rem] w-[0.75rem] shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>

            <span
              className={`text-[clamp(0.6875rem,0.6rem_+_0.3vw,0.8125rem)] opacity-90 ${
                isSoldOut ? "text-gray-400" : ""
              }`}
            >
              {project.location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ImageCard({ project, index, href, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-[0.25rem]"
    >
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-xl">
        <Image
          src={project.image}
          alt={project.projectName}
          fill
          sizes="(min-width: 64rem) 15vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          priority={index < 6}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <div className="absolute bottom-[1.25rem] left-0 right-0 p-[1rem] text-white">
          <h3 className="text-[clamp(0.9375rem,0.78rem_+_0.65vw,1.25rem)] font-semibold leading-tight transition-colors duration-300 group-hover:text-[#deae3c]">
            {project.projectName}
          </h3>
        </div>
      </div>
    </Link>
  );
}

function MobileProjectLink({ project, href, onClick }) {
  const isSoldOut = project.status === "sold-out";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center rounded-lg px-[0.5rem] py-[0.75rem] transition-colors ${
        isSoldOut
          ? "cursor-not-allowed bg-white/5 opacity-60"
          : "hover:bg-white/10"
      }`}
    >
      <div className="relative mr-[0.75rem] h-[3rem] w-[3rem] shrink-0 overflow-hidden rounded-lg">
        <Image
          src={project.image}
          alt={project.projectName}
          fill
          sizes="3rem"
          className={`object-cover ${isSoldOut ? "grayscale" : ""}`}
        />

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
            <span className="rounded bg-white/90 px-[0.25rem] text-[0.5rem] font-bold text-red-600">
              SOLD
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-[0.5rem]">
          <span
            className={`text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] font-medium ${
              isSoldOut ? "text-white/45" : "text-white"
            }`}
          >
            {project.projectName}
          </span>

          {project.status && project.status !== "available" && (
            <span
              className={`rounded-full px-[0.375rem] py-[0.125rem] text-[0.5625rem] font-semibold ${
                project.status === "sold-out"
                  ? "bg-red-500/15 text-red-300"
                  : project.status === "ongoing"
                    ? "bg-green-500/15 text-green-300"
                    : project.status === "limited"
                      ? "bg-[#deae3c]/15 text-[#deae3c]"
                      : "bg-blue-500/15 text-blue-300"
              }`}
            >
              {project.status === "sold-out"
                ? "SOLD OUT"
                : project.status.toUpperCase()}
            </span>
          )}
        </div>

        <div
          className={`mt-[0.25rem] text-[clamp(0.6875rem,0.6rem_+_0.3vw,0.8125rem)] ${
            isSoldOut ? "text-white/35" : "text-white/55"
          }`}
        >
          {project.location}
        </div>
      </div>
    </Link>
  );
}

function DesktopNavButton({ label, open, active, onClick }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="relative flex min-h-[2.75rem] touch-manipulation items-center font-medium"
        role="menuitem"
        aria-expanded={open}
        aria-haspopup="true"
        aria-current={active ? "page" : undefined}
        type="button"
      >
        <span
          className={`relative z-10 flex items-center justify-center whitespace-nowrap rounded-full border border-transparent px-[clamp(0.625rem,0.45rem_+_0.6vw,1rem)] py-[clamp(0.375rem,0.25rem_+_0.35vw,0.625rem)] text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] transition-all duration-200 ${
            open || active
              ? "border-[#deae3c] bg-[#deae3c] font-semibold text-black shadow-[0_0.75rem_2rem_rgba(222,174,60,0.22)]"
              : "text-white/85 hover:border-white/20 hover:bg-white/10 hover:text-white"
          }`}
        >
          {label}
          <ChevronIcon open={open} className="ml-[0.25rem] h-[0.85rem] w-[0.85rem]" />
        </span>
      </button>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResidentialMenuOpen, setIsResidentialMenuOpen] = useState(false);
  const [isDholeraMenuOpen, setIsDholeraMenuOpen] = useState(false);
  const [isBulkLandMenuOpen, setIsBulkLandMenuOpen] = useState(false);
  const [residentialProjects, setResidentialProjects] = useState([]);
  const [bulkLandProjects, setBulkLandProjects] = useState([]);
  const [dholeraProjects, setDholeraProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bulkLandLoading, setBulkLandLoading] = useState(false);
  const [dholeraLoading, setDholeraLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bulkLandError, setBulkLandError] = useState(null);
  const [dholeraError, setDholeraError] = useState(null);
  const [isSoldOutOpen, setIsSoldOutOpen] = useState(false);

  const pathname = usePathname();
  const isHomeActive = pathname === "/";
  const isContactActive = pathname === "/contact";
  const isResidentialActive = pathname?.startsWith("/dholera-residential-plots");
  const isBulkLandActive = pathname?.startsWith("/bulk-land");
  const isDholeraActive =
    pathname?.startsWith("/dholera-sir-blogs") ||
    pathname?.startsWith("/dholera-sir-updates") ||
    pathname?.startsWith("/about-dholera-sir");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

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

  useEffect(() => {
    async function fetchBulkLandProjects() {
      if (!isBulkLandMenuOpen || bulkLandProjects.length > 0) return;

      try {
        setBulkLandLoading(true);
        setBulkLandError(null);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBulkLandProjects(bulkLandItems);
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

  useEffect(() => {
    async function fetchDholeraProjects() {
      if (!isDholeraMenuOpen || dholeraProjects.length > 0) return;

      try {
        setDholeraLoading(true);
        setDholeraError(null);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDholeraProjects(dholeraItems);
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

  useEffect(() => {
    const closeDesktopDropdowns = () => {
      setIsResidentialMenuOpen(false);
      setIsBulkLandMenuOpen(false);
      setIsDholeraMenuOpen(false);
    };

    const handleClickOutside = (event) => {
      if (window.innerWidth < 1024) return;

      if (
        !event.target.closest(".dropdown-container") &&
        !event.target.closest(".residential-dropdown") &&
        !event.target.closest(".bulk-land-dropdown") &&
        !event.target.closest(".dholera-dropdown")
      ) {
        closeDesktopDropdowns();
      }
    };

    const handleScroll = () => {
      if (window.innerWidth >= 1024) closeDesktopDropdowns();
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") closeDesktopDropdowns();
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

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsResidentialMenuOpen(false);
    setIsBulkLandMenuOpen(false);
    setIsDholeraMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      if (!prev) {
        setIsResidentialMenuOpen(false);
        setIsBulkLandMenuOpen(false);
        setIsDholeraMenuOpen(false);
      }

      return !prev;
    });
  };

  const toggleResidentialMenu = () => {
    setIsResidentialMenuOpen((prev) => !prev);
    setIsBulkLandMenuOpen(false);
    setIsDholeraMenuOpen(false);
  };

  const toggleBulkLandMenu = () => {
    setIsBulkLandMenuOpen((prev) => !prev);
    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
  };

  const toggleDholeraMenu = () => {
    setIsDholeraMenuOpen((prev) => !prev);
    setIsResidentialMenuOpen(false);
    setIsBulkLandMenuOpen(false);
  };

  const desktopDropdowns = [
    {
      label: "Residential Projects",
      open: isResidentialMenuOpen,
      active: isResidentialActive,
      onClick: toggleResidentialMenu,
    },
    {
      label: "Bulk Land Deals",
      open: isBulkLandMenuOpen,
      active: isBulkLandActive,
      onClick: toggleBulkLandMenu,
    },
    {
      label: "Dholera Blogs",
      open: isDholeraMenuOpen,
      active: isDholeraActive,
      onClick: toggleDholeraMenu,
    },
  ];

  const activeProjects = residentialProjects.filter(
    (project) => project.status !== "sold-out",
  );
  const soldOutProjects = residentialProjects.filter(
    (project) => project.status === "sold-out",
  );

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50"
        role="navigation"
        aria-label="Main navigation"
        style={{ top: "var(--nav-offset-top, 0px)" }}
      >
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 md:px-6 md:py-4 lg:px-8">
          <div
            className={`liquid-glass-container relative isolate flex h-[4.25rem] items-center gap-3 overflow-visible rounded-full border px-4 shadow-xl backdrop-blur-2xl transition-all duration-300 md:h-[4.5rem] md:px-5 lg:h-[5rem] lg:gap-4 lg:px-6 xl:gap-6 ${
              isScrolled
                ? "border-white/25 bg-[#121212]/60 shadow-[0_1.25rem_3rem_rgba(0,0,0,0.28)]"
                : "border-white/25 bg-[#121212]/60 shadow-[0_1.25rem_3rem_rgba(0,0,0,0.28)]"
            }`}
          >
              <div className="relative z-10 shrink-0">
                <Link
                  href="/"
                onClick={closeAllMenus}
                className="block  px-[0.75rem] py-[0.4375rem] shadow-sm transition-all duration-300 hover:scale-105 "
                aria-label="BookMyAssets home"
              >
                <Image
                  src={logo}
                  height={100}
                  width={100}
                  alt="BookMyAssets logo"
                  className="h-[2.5rem] w-auto object-contain md:h-[2.875rem] lg:h-[3.25rem]"
                  priority
                />
              </Link>
            </div>

            <div className="relative text-black z-10 ml-auto hidden flex-1 justify-end lg:flex">
              <nav className="flex h-full items-center justify-end" role="menubar">
                  <Link
                    href="/"
                    onClick={closeAllMenus}
                    className="relative flex min-h-[2.75rem] touch-manipulation items-center font-medium"
                    aria-current={isHomeActive ? "page" : undefined}
                  >
                    <span
                      className={`relative z-10 flex items-center justify-center whitespace-nowrap rounded-full border px-[clamp(0.625rem,0.45rem_+_0.6vw,1rem)] py-[clamp(0.375rem,0.25rem_+_0.35vw,0.625rem)] text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] transition-all duration-200 ${
                        isHomeActive
                          ? "border-[#deae3c] bg-[#deae3c] font-semibold text-black shadow-[0_0.75rem_2rem_rgba(222,174,60,0.22)]"
                            : "border-transparent text-white/85 hover:border-white/20 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      Home
                    </span>
                  </Link>

                  {desktopDropdowns.map(({ label, open, active, onClick }) => (
                  <div key={label} className="dropdown-container relative">
                      <DesktopNavButton
                        label={label}
                        open={open}
                        active={active}
                        onClick={onClick}
                      />
                  </div>
                ))}
              </nav>
            </div>

            <div className="relative z-10 hidden shrink-0 lg:flex">
              <div className="flex items-center gap-2">
                <Link
                  href="/contact"
                  onClick={closeAllMenus}
                  className={`ml-2 rounded-full border px-[calc(0.875rem_+_0.5vw)] py-[calc(0.375rem_+_0.25vw)] text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] font-medium shadow-sm transition-all duration-200 active:scale-[0.98] ${
                    isContactActive
                      ? "border-[#deae3c]/70 bg-[#deae3c] text-black"
                      : "border-[#deae3c]/45 bg-[#deae3c]/90 text-black hover:border-[#f3bb39]/70 hover:bg-[#f3bb39]"
                  }`}
                >
                  Contact Us
                </Link>

                <div className="group relative">
                  <button
                    className="inline-flex touch-manipulation items-center gap-2 rounded-full border border-transparent bg-transparent px-4 py-2 text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] font-medium text-white/85 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#deae3c]/40"
                    aria-label="Open secondary menu"
                    type="button"
                  >
                    <Menu className="h-[1.5rem] w-[1.5rem]" aria-hidden="true" />
                  </button>

                  <div className="invisible absolute right-0 top-full z-50 mt-[0.5rem] w-[12rem] rounded-xl border border-white/15 bg-[#111111]/75 opacity-0 shadow-xl shadow-black/30 backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="py-[0.5rem]">
                      {utilityLinks.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeAllMenus}
                          className="block px-[1rem] py-[0.75rem] text-[0.875rem] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 ml-auto flex items-center gap-[0.5rem] lg:hidden">
              <Link
                href={whatsappEnquiryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center gap-2 rounded-full border border-[#deae3c]/45 bg-[#deae3c]/90 px-2 text-black shadow-sm transition duration-300 hover:bg-[#f3bb39]"
                aria-label="Enquire Now on WhatsApp"
              >
                <FaWhatsapp className="h-[1.25rem] w-[1.25rem] shrink-0" /> Know More
              </Link>

              <button
                onClick={toggleMobileMenu}
                className="flex min-h-[3rem] min-w-[3rem] touch-manipulation items-center justify-center rounded-full border border-white/15 bg-white/10 p-3 text-white transition-all duration-200 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#deae3c]/40 active:bg-white/20"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                type="button"
              >
                <svg
                  className={`h-6 w-6 pointer-events-none transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isResidentialMenuOpen && (
        <div
          className="residential-dropdown fixed left-1/2 z-40 hidden h-[min(38rem,calc(100dvh_-_7rem))] w-[min(calc(100vw_-_2rem),80rem)] -translate-x-1/2 animate-in overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#101010]/75 shadow-2xl shadow-black/40 backdrop-blur-2xl slide-in-from-top-4 duration-300 lg:flex"
          style={{ top: "calc(var(--nav-offset-top, 0px) + 6.5rem)" }}
        >
          <div className="flex h-full w-1/3 flex-col border-r border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-[#deae3c]/10 p-[calc(2rem_+_1vw)]">
            <h3 className="text-[clamp(2.25rem,1.75rem_+_1.5vw,3rem)] font-light leading-tight text-white">
              Residential <br /> Projects
            </h3>
            <p className="mt-[calc(0.75rem_+_0.25vw)] text-[clamp(1rem,0.875rem_+_0.5vw,1.25rem)] text-white/60">
              Discover premium residential developments with world-class
              amenities
            </p>
          </div>

          <div className="h-full w-2/3 overflow-y-auto p-[calc(1rem_+_0.5vw)]">
            {loading ? (
              <LoadingState color="yellow" />
            ) : error ? (
              <ErrorState message={error} />
            ) : residentialProjects.length > 0 ? (
              <div className="flex flex-col gap-[calc(1rem_+_0.5vw)] pb-[calc(1rem_+_0.5vw)]">
                {activeProjects.length > 0 && (
                  <div className="grid grid-cols-2 gap-[calc(0.5rem_+_0.5vw)] xl:grid-cols-4">
                    {activeProjects.map((project, index) => (
                      <ResidentialCard
                        key={project.link || index}
                        project={project}
                        index={index}
                        href={`/dholera-residential-plots/${project.link}`}
                        onClick={closeAllMenus}
                      />
                    ))}
                  </div>
                )}

                {soldOutProjects.length > 0 && (
                  <div
                    className={`mt-[calc(0.375rem_+_0.125vw)] overflow-hidden rounded-xl border border-red-500/25 transition-colors duration-200 ${
                      isSoldOutOpen ? "bg-red-500/10" : "bg-red-500/5"
                    }`}
                  >
                    <button
                      onClick={() => setIsSoldOutOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between px-[calc(1rem_+_0.25vw)] py-[calc(0.625rem_+_0.125vw)] transition-colors duration-200 hover:bg-red-500/10"
                      type="button"
                    >
                      <div className="flex items-center gap-[0.75rem]">
                        <span className="h-[0.5rem] w-[0.5rem] rounded-full bg-red-400" />
                        <span className="text-[clamp(0.8125rem,0.72rem_+_0.38vw,0.9375rem)] font-semibold uppercase tracking-widest text-red-300">
                          Sold Out Projects
                        </span>
                        <span className="rounded-full bg-red-500/20 px-[0.5rem] py-[0.125rem] text-[clamp(0.6875rem,0.6rem_+_0.3vw,0.8125rem)] font-bold text-red-200">
                          {soldOutProjects.length}
                        </span>
                      </div>
                      <ChevronIcon
                        open={isSoldOutOpen}
                        className="h-[1rem] w-[1rem] shrink-0 text-red-300"
                      />
                    </button>

                    <div
                      className={`grid grid-cols-2 gap-[calc(0.5rem_+_0.5vw)] overflow-hidden transition-all duration-500 ease-in-out xl:grid-cols-4 ${
                        isSoldOutOpen
                          ? "max-h-[125rem] p-[1rem] opacity-100"
                          : "max-h-0 px-[1rem] opacity-0"
                      }`}
                    >
                      {soldOutProjects.map((project, index) => (
                        <ResidentialCard
                          key={project.link || index}
                          project={project}
                          index={index}
                          href={`/dholera-residential-plots/${project.link}`}
                          onClick={closeAllMenus}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      )}

      {isBulkLandMenuOpen && (
        <div
          className="bulk-land-dropdown fixed left-1/2 z-40 hidden h-[min(38rem,calc(100dvh_-_7rem))] w-[min(calc(100vw_-_2rem),80rem)] -translate-x-1/2 animate-in overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#101010]/75 shadow-2xl shadow-black/40 backdrop-blur-2xl slide-in-from-top-4 duration-300 lg:flex"
          style={{ top: "calc(var(--nav-offset-top, 0px) + 6.5rem)" }}
        >
          <div className="flex h-full w-1/3 flex-col justify-between border-r border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-[#deae3c]/10 p-[calc(2rem_+_1vw)]">
            <div>
              <h3 className="text-[clamp(2.25rem,1.75rem_+_1.5vw,3rem)] font-light leading-tight text-white">
                Bulk Land <br /> Deals
              </h3>
              <p className="mt-[calc(0.75rem_+_0.25vw)] text-[clamp(1rem,0.875rem_+_0.5vw,1.25rem)] text-white/60">
                Strategic land parcels for commercial and industrial development
              </p>
            </div>
          </div>

          <div className="h-full w-2/3 overflow-y-auto p-[calc(1rem_+_0.5vw)]">
            {bulkLandLoading ? (
              <LoadingState color="yellow" />
            ) : bulkLandError ? (
              <ErrorState message={bulkLandError} />
            ) : bulkLandProjects.length > 0 ? (
              <div className="grid h-full grid-cols-2 gap-[calc(0.5rem_+_0.5vw)] pb-[calc(1rem_+_0.5vw)] xl:grid-cols-4">
                {bulkLandProjects.map((project, index) => (
                  <ImageCard
                    key={project.link}
                    project={project}
                    index={index}
                    href={`/bulk-land/${project.link}`}
                    onClick={closeAllMenus}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      )}

      {isDholeraMenuOpen && (
        <div
          className="dholera-dropdown fixed left-1/2 z-40 hidden h-[min(38rem,calc(100dvh_-_7rem))] w-[min(calc(100vw_-_2rem),80rem)] -translate-x-1/2 animate-in overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#101010]/75 shadow-2xl shadow-black/40 backdrop-blur-2xl slide-in-from-top-4 duration-300 lg:flex"
          style={{ top: "calc(var(--nav-offset-top, 0px) + 6.5rem)" }}
        >
          <div className="flex h-full w-1/3 flex-col justify-between border-r border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-[#deae3c]/10 p-[calc(2rem_+_1vw)]">
            <div>
              <h3 className="text-[clamp(2.25rem,1.75rem_+_1.5vw,3rem)] font-light leading-tight text-white">
                DHOLERA SIR
              </h3>
              <p className="mt-[calc(0.75rem_+_0.25vw)] text-[clamp(1rem,0.875rem_+_0.5vw,1.25rem)] text-white/60">
                India's first planned smart city with futuristic infrastructure
              </p>
            </div>
          </div>

          <div className="h-full w-2/3 overflow-y-auto p-[calc(1rem_+_0.5vw)]">
            {dholeraLoading ? (
              <LoadingState color="yellow" />
            ) : dholeraError ? (
              <ErrorState message={dholeraError} />
            ) : dholeraProjects.length > 0 ? (
              <div className="grid h-full grid-cols-2 gap-[calc(0.5rem_+_0.5vw)] pb-[calc(1rem_+_0.5vw)] xl:grid-cols-4">
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
                      key={project.link}
                      href={`/${project.link}`}
                      onClick={closeAllMenus}
                      className={`group relative flex h-full flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-[0.25rem] ${
                        project.status === "sold-out"
                          ? "cursor-not-allowed opacity-75"
                          : ""
                      }`}
                    >
                      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={project.image}
                          alt={project.projectName}
                          fill
                          sizes="(min-width: 64rem) 15vw, 25vw"
                          className={`object-cover transition-transform duration-700 ease-out ${
                            project.status === "sold-out"
                              ? "grayscale"
                              : "group-hover:scale-110"
                          }`}
                          priority={index < 6}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-[1rem] text-white">
                          <div
                            className={`font-semibold leading-tight transition-colors duration-300 group-hover:text-[#deae3c] ${
                              project.status === "sold-out"
                                ? "text-gray-300"
                                : ""
                            }`}
                          >
                            <div className="text-[clamp(1rem,0.8rem_+_0.75vw,1.375rem)]">
                              {firstLine}
                            </div>
                            {secondLine && (
                              <div className="text-[clamp(1.125rem,0.875rem_+_0.85vw,1.625rem)]">
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

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-30 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        inert={!isMobileMenuOpen}
      >
        <div
          className={`relative z-50 h-full w-full overflow-y-auto bg-[#0d0d0d]/95 text-white backdrop-blur-2xl transition-all duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-[0.5rem] p-[calc(0.75rem_+_0.5vw)] pt-[calc(5.5rem_+_0.75rem)]">
            <div className="border-b border-white/10 pb-[0.5rem]">
              <button
                onClick={toggleResidentialMenu}
                className={`flex w-full items-center justify-between rounded-md px-[0.75rem] py-[0.75rem] text-left text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium transition-colors ${
                  isResidentialMenuOpen
                    ? "border border-[#deae3c]/45 bg-white/15 text-white shadow-[0_0.75rem_2rem_rgba(222,174,60,0.14)]"
                    : "border border-transparent text-white hover:bg-white/10 hover:text-white"
                }`}
                aria-expanded={isResidentialMenuOpen}
                type="button"
              >
                <span>Residential Projects</span>
                <ChevronIcon
                  open={isResidentialMenuOpen}
                  className="h-[1.25rem] w-[1.25rem]"
                />
              </button>

              {isResidentialMenuOpen && (
                <div className="mt-[0.5rem] max-h-[20rem] space-y-[0.5rem] overflow-y-auto border-l-[0.125rem] border-[#deae3c] pl-[1rem]">
                  {loading ? (
                    <div className="py-[1rem] text-center text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-white/60">
                      <div className="mr-[0.5rem] inline-block h-[1rem] w-[1rem] animate-spin rounded-full border-b-[0.125rem] border-[#deae3c]" />{" "}
                      Loading...
                    </div>
                  ) : error ? (
                    <div className="py-[0.5rem] text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-red-400">
                      {error}
                    </div>
                  ) : (
                    residentialProjects.map((project, index) => (
                      <MobileProjectLink
                        key={project.link || index}
                        project={project}
                        href={`/dholera-residential-plots/${project.link}`}
                        onClick={closeAllMenus}
                      />
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="border-b border-white/10 pb-[0.5rem]">
              <button
                onClick={toggleBulkLandMenu}
                className={`flex w-full items-center justify-between rounded-md px-[0.75rem] py-[0.75rem] text-left text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium transition-colors ${
                  isBulkLandMenuOpen
                    ? "border border-[#deae3c]/45 bg-white/15 text-white shadow-[0_0.75rem_2rem_rgba(222,174,60,0.14)]"
                    : "border border-transparent text-white hover:bg-white/10 hover:text-white"
                }`}
                aria-expanded={isBulkLandMenuOpen}
                type="button"
              >
                <span>Bulk Land Deals</span>
                <ChevronIcon
                  open={isBulkLandMenuOpen}
                  className="h-[1.25rem] w-[1.25rem]"
                />
              </button>

              {isBulkLandMenuOpen && (
                <div className="mt-[0.5rem] max-h-[20rem] space-y-[0.5rem] overflow-y-auto border-l-[0.125rem] border-[#deae3c] pl-[1rem]">
                  {bulkLandLoading ? (
                    <div className="py-[1rem] text-center text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-white/60">
                      <div className="mr-[0.5rem] inline-block h-[1rem] w-[1rem] animate-spin rounded-full border-b-[0.125rem] border-[#deae3c]" />{" "}
                      Loading...
                    </div>
                  ) : bulkLandError ? (
                    <div className="py-[0.5rem] text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-red-400">
                      {bulkLandError}
                    </div>
                  ) : (
                    bulkLandProjects.map((project) => (
                      <MobileProjectLink
                        key={project.link}
                        project={project}
                        href={`/bulk-land/${project.link}`}
                        onClick={closeAllMenus}
                      />
                    ))
                  )}
                </div>
              )}
            </div>

            {mobileLinks.map(({ href, label }, index) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeAllMenus}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-md px-[0.75rem] py-[0.75rem] text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium transition-colors hover:bg-white/10 hover:text-white ${
                    isActive
                      ? "border border-[#deae3c] bg-[#deae3c] text-black shadow-[0_0.75rem_2rem_rgba(222,174,60,0.18)]"
                      : "text-white"
                  } ${
                    !isActive && index < mobileLinks.length - 1
                      ? "border-b border-white/10"
                      : ""
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <Link
              href={whatsappEnquiryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[1rem] hidden w-full items-center justify-center gap-[0.5rem] rounded-full bg-[#deae3c] px-[1rem] py-[0.875rem] text-[0.9375rem] font-semibold text-black transition duration-300 hover:bg-[#f3bb39]"
              aria-label="Enquire Now on WhatsApp"
            >
              <FaWhatsapp className="h-[1rem] w-[1rem] shrink-0" />
              <span>Enquire Now</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
