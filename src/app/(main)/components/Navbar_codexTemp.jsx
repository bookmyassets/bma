"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import logo from "@/assests/bma-transparent-website.svg";
import dholeraBlogs from "@/assests/dholeraSIR-nav/dholera-sir-blogs-bookmyassets.webp";
import dholeraUpdates from "@/assests/dholeraSIR-nav/dholera-sir-latest-updates-bookmyassets.webp";
import residential from "@/assests/bulkLand/residential-zone-cover.webp";
import hac from "@/assests/bulkLand/high-access-corridor-cover.webp";
import cityCenter from "@/assests/bulkLand/city-centre-cover.webp";
import industrial from "@/assests/bulkLand/industrial-cover.webp";
import sport from "@/assests/bulkLand/recreation-sports-map.webp";
import knowledgeIT from "@/assests/bulkLand/knowledge-it-cover.webp";
import BookButton from "./BookVC";

const whatsappEnquiryLink = `https://wa.me/918130371647?text=${encodeURIComponent(
  "Hi, I need a call back",
)}`;

const bulkLandItems = [
  {
    projectName: "Residential Zone",

    image: residential,
    link: "/residential",
  },
  {
    projectName: "High Access Corridor",

    image: hac,
    link: "/high-access-corridor",
  },
  {
    projectName: "City Centre",

    image: cityCenter,
    link: "/city-centre-land",
  },
  {
    projectName: "Knowledge and IT",

    image: knowledgeIT,
    link: "/knowledge-it-land",
  },
  {
    projectName: "Industrial",

    image: industrial,
    link: "/industrial-land",
  },
  {
    projectName: "Recreation Sports & Entertainment",

    image: sport,
    link: "/recreation-sports-land",
  },
];

const dholeraItems = [
  {
    projectName: "Dholera Blogs",

    image: dholeraBlogs,
    link: "dholera-sir-blogs",
  },
  {
    projectName: "Dholera Latest Updates",

    image: dholeraUpdates,
    link: "dholera-sir-updates",
  },
];

const utilityLinks = [
  { href: "/about-dholera-sir", label: "About Dholera" },
  { href: "/career", label: "Careers" },
  { href: "/channel-partner", label: "Channel Partner" },
  { href: "/dholera-events", label: "Investor Meetups" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { label: "Book Video Call", calendly: true },
];

const mobileLinks = [
  { href: "/dholera-sir-blogs", label: "Dholera Blogs" },
  { href: "/dholera-sir-updates", label: "Dholera SIR Updates" },
  { href: "/about-dholera-sir", label: "About Dholera" },
  { href: "/dholera-events", label: "Investor Meetups" },
  { href: "/contact", label: "Contact Us" },
  { href: "/career", label: "Careers" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { label: "Book Video Call", calendly: true },
];

const statusClasses = {
  ongoing: "bg-green-500 text-white",
  "sold-out": "bg-red-500 text-white",
  "re-sale": "bg-[#ddbc69] text-black",
  resale: "bg-[#ddbc69] text-black",
  upcoming: "bg-blue-500 text-white",
  limited: "bg-orange-500 text-white",
};

const getStatusLabel = (status) => {
  if (status === "sold-out") return "SOLD OUT";
  if (status === "re-sale" || status === "resale") return "RESALE";

  return status.toUpperCase();
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

function StatusBadge({ status }) {
  if (!status || status === "available") return null;

  return (
    <span
      className={`rounded-lg px-[0.5rem] py-[0.25rem] text-[clamp(0.625rem,0.5rem_+_0.3vw,0.8125rem)] font-semibold uppercase shadow-lg ${
        statusClasses[status] || "bg-gray-500 text-white"
      } ${status === "ongoing" || status === "limited" ? "animate-pulse" : ""}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

function ResidentialCard({ project, index, href, onClick }) {
  const isSoldOut = project.status === "sold-out";
  const isReSale = project.status === "re-sale" || project.status === "resale";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex min-h-[4.75rem] items-center gap-[0.75rem]  p-[0.45rem] text-white shadow-sm transition-all duration-200 hover:-translate-y-[0.0625rem]  `}
    >
      <div className="relative h-[3.875rem] w-[5.125rem] shrink-0 overflow-hidden rounded-md bg-[#111713]">
        <Image
          src={project.image}
          alt={project.projectName}
          fill
          sizes="5.25rem"
          className={`object-cover transition-transform duration-700 ease-out ${
            isSoldOut ? "grayscale" : "group-hover:scale-110"
          }`}
          priority={index < 6}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent transition-all duration-500 ${
            isSoldOut ? "from-red-950/70" : ""
          }`}
        />

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="-rotate-6 rounded-md border border-red-300 bg-red-600/85 px-[0.5rem] py-[0.125rem] text-[0.5625rem] font-bold uppercase text-white">
              Sold
            </span>
          </div>
        )}

        {isReSale && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="-rotate-6 rounded-md border border-[#f3bb39] bg-[#ddbc69]/90 px-[0.5rem] py-[0.125rem] text-[0.5625rem] font-bold uppercase text-black">
              Resale
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-[0.375rem]">
          <StatusBadge status={project.status} />
        </div>

        <h3
          className={`mt-[0.25rem] truncate text-[0.9375rem] font-semibold leading-snug transition-colors duration-200 text-white `}
        >
          {project.projectName}
        </h3>

        <div
          className={`mt-[0.25rem] flex items-start text-[0.75rem] leading-snug text-white`}
        >
          <svg
            className="mr-[0.375rem] mt-[0.125rem] h-[0.75rem] w-[0.75rem] shrink-0"
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

          <span className="min-w-0 text-white">{project.location}</span>
        </div>
      </div>

      <ArrowUpRight
        className={`h-[1rem] w-[1rem] shrink-0 transition-transform duration-300 group-hover:-translate-y-[0.125rem] group-hover:translate-x-[0.125rem] ${
          isSoldOut ? "text-[#171717]/25" : "text-[#8a6d24]"
        }`}
        aria-hidden="true"
      />
    </Link>
  );
}

function ImageCard({ project, index, href, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex min-h-[4.75rem] items-center gap-[0.75rem] p-[0.45rem] text-white shadow-sm transition-all duration-200 hover:-translate-y-[0.0625rem] "
    >
      <div className="relative h-[3.875rem] w-[5.125rem] shrink-0 overflow-hidden rounded-md bg-[#111713]">
        <Image
          src={project.image}
          alt={project.projectName}
          fill
          sizes="5.25rem"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          priority={index < 6}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-[0.375rem]">
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-[0.25rem] truncate text-[0.9375rem] font-semibold leading-snug text-white transition-colors duration-200 ">
          {project.projectName}
        </h3>
        <p className="mt-[0.25rem] truncate text-[0.75rem] leading-snug text-white">
          {project.location}
        </p>
      </div>

      <ArrowUpRight
        className="h-[1rem] w-[1rem] shrink-0 text-[#8a6d24] transition-transform duration-300 group-hover:-translate-y-[0.125rem] group-hover:translate-x-[0.125rem]"
        aria-hidden="true"
      />
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
              className={`rounded-lg px-[0.375rem] py-[0.125rem] text-[0.5625rem] font-semibold ${
                project.status === "sold-out"
                  ? "bg-red-500/15 text-red-300"
                  : project.status === "re-sale" || project.status === "resale"
                    ? "bg-[#ddbc69]/15 text-[#ddbc69]"
                  : project.status === "ongoing"
                    ? "bg-green-500/15 text-green-300"
                    : project.status === "limited"
                      ? "bg-[#ddbc69]/15 text-[#ddbc69]"
                      : "bg-blue-500/15 text-blue-300"
              }`}
            >
              {getStatusLabel(project.status)}
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

function DesktopNavButton({ label, open, onClick }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="relative flex min-h-[2rem] touch-manipulation items-center font-medium"
        role="menuitem"
        aria-expanded={open}
        aria-haspopup="true"
        type="button"
      >
        <span
          className={`relative z-10 flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent px-[clamp(0.625rem,0.45rem_+_0.6vw,1rem)] py-[clamp(0.375rem,0.25rem_+_0.35vw,0.625rem)] text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] transition-all duration-200 ${
            open
              ? "border-[#ddbc69] bg-[#ddbc69] font-semibold text-black shadow-[0_0.75rem_2rem_rgba(222,174,60,0.22)]"
              : "text-white/85 hover:border-white/20 hover:bg-white/10 hover:text-white"
          }`}
        >
          {label}
          <ChevronIcon
            open={open}
            className="ml-[0.25rem] h-[0.85rem] w-[0.85rem]"
          />
        </span>
      </button>
    </div>
  );
}

function DesktopDropdownShell({ className, align = "left", children }) {
  const alignClasses = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };
  const pointerClasses = {
    left: "left-[2.25rem]",
    center: "left-1/2 -translate-x-1/2",
    right: "right-[2.25rem]",
  };

  return (
    <div
      className={`${className} absolute top-full z-50 mt-[0.75rem] hidden w-[22.5rem] origin-top animate-in fade-in-0 slide-in-from-top-2 zoom-in-95 duration-200 lg:block ${alignClasses[align] || alignClasses.left}`}
    >
      <span
        className={`absolute -top-[0.375rem] h-[0.75rem] w-[0.75rem] rotate-45 border-l border-t border-white/15 bg-[#111713] ${pointerClasses[align] || pointerClasses.left}`}
        aria-hidden="true"
      />

      <div className="max-h-[min(31rem,calc(100dvh_-_7rem))] overflow-y-auto rounded-xl border border-white/15 bg-[#111713]/95 p-[0.625rem] shadow-[0_1.25rem_3rem_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}

function DropdownNotice({ children, tone = "muted" }) {
  const toneClass = tone === "error" ? "text-red-300" : "text-white/60";

  return (
    <div
      className={`flex min-h-[7rem] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-[1rem] text-center text-[0.875rem] ${toneClass}`}
    >
      {children}
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
  const [isUtilityMenuOpen, setIsUtilityMenuOpen] = useState(false);

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
      setIsUtilityMenuOpen(false);
    };

    const handleClickOutside = (event) => {
      if (window.innerWidth < 1024) return;

      if (
        !event.target.closest(".dropdown-container") &&
        !event.target.closest(".residential-dropdown") &&
        !event.target.closest(".bulk-land-dropdown") &&
        !event.target.closest(".dholera-dropdown") &&
        !event.target.closest(".utility-dropdown")
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
    setIsUtilityMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      if (!prev) {
        setIsResidentialMenuOpen(false);
        setIsBulkLandMenuOpen(false);
        setIsDholeraMenuOpen(false);
        setIsUtilityMenuOpen(false);
      }

      return !prev;
    });
  };

  const toggleResidentialMenu = () => {
    setIsResidentialMenuOpen((prev) => !prev);
    setIsBulkLandMenuOpen(false);
    setIsDholeraMenuOpen(false);
    setIsUtilityMenuOpen(false);
  };

  const toggleBulkLandMenu = () => {
    setIsBulkLandMenuOpen((prev) => !prev);
    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
    setIsUtilityMenuOpen(false);
  };

  const toggleDholeraMenu = () => {
    setIsDholeraMenuOpen((prev) => !prev);
    setIsResidentialMenuOpen(false);
    setIsBulkLandMenuOpen(false);
    setIsUtilityMenuOpen(false);
  };

  const toggleUtilityMenu = () => {
    setIsUtilityMenuOpen((prev) => !prev);
    setIsResidentialMenuOpen(false);
    setIsBulkLandMenuOpen(false);
    setIsDholeraMenuOpen(false);
  };

  const desktopDropdowns = [
    {
      menu: "residential",
      label: "Residential Projects",
      open: isResidentialMenuOpen,
      onClick: toggleResidentialMenu,
      dropdownClass: "residential-dropdown",
      align: "left",
    },
    {
      menu: "dholera",
      label: "Blogs",
      open: isDholeraMenuOpen,
      onClick: toggleDholeraMenu,
      dropdownClass: "dholera-dropdown",
      align: "center",
    },
    {
      menu: "bulk-land",
      label: "Bulk Land Deals",
      open: isBulkLandMenuOpen,
      onClick: toggleBulkLandMenu,
      dropdownClass: "bulk-land-dropdown",
      align: "right",
    },
  ];

  const renderDesktopDropdownContent = (menu) => {
    if (menu === "residential") {
      if (loading) return <DropdownNotice>Loading projects...</DropdownNotice>;
      if (error) return <DropdownNotice tone="error">{error}</DropdownNotice>;
      if (residentialProjects.length === 0) {
        return (
          <DropdownNotice>No projects available at the moment</DropdownNotice>
        );
      }

      return (
        <div className="space-y-[0.5rem]">
          {residentialProjects.map((project, index) => (
            <ResidentialCard
              key={project.link || index}
              project={project}
              index={index}
              href={`/dholera-residential-plots/${project.link}`}
              onClick={closeAllMenus}
            />
          ))}
        </div>
      );
    }

    if (menu === "bulk-land") {
      if (bulkLandLoading) {
        return <DropdownNotice>Loading land deals...</DropdownNotice>;
      }
      if (bulkLandError) {
        return <DropdownNotice tone="error">{bulkLandError}</DropdownNotice>;
      }
      if (bulkLandProjects.length === 0) {
        return (
          <DropdownNotice>No projects available at the moment</DropdownNotice>
        );
      }

      return (
        <div className="space-y-[0.5rem]">
          {bulkLandProjects.map((project, index) => (
            <ImageCard
              key={project.link}
              project={project}
              index={index}
              href={`/bulk-land/${project.link}`}
              onClick={closeAllMenus}
              eyebrow="Bulk land"
            />
          ))}
        </div>
      );
    }

    if (dholeraLoading) {
      return <DropdownNotice>Loading insights...</DropdownNotice>;
    }
    if (dholeraError) {
      return <DropdownNotice tone="error">{dholeraError}</DropdownNotice>;
    }
    if (dholeraProjects.length === 0) {
      return (
        <DropdownNotice>No projects available at the moment</DropdownNotice>
      );
    }

    return (
      <div className="space-y-[0.5rem]">
        {dholeraProjects.map((project, index) => (
          <ImageCard
            key={project.link}
            project={project}
            index={index}
            href={`/${project.link}`}
            onClick={closeAllMenus}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50"
        role="navigation"
        aria-label="Main navigation"
        style={{ top: "var(--nav-offset-top, 0px)" }}
      >
        <div className=" px-3 py-3 sm:px-4 md:px-6 md:py-4 lg:px-8">
          <div
            className={` relative isolate flex h-[4.25rem] items-center gap-3 overflow-visible rounded-lg border bg-[#1b1b1b] px-4 shadow-xl backdrop-blur-2xl transition-all duration-300 md:h-[3.5rem] md:px-5 lg:h-[4rem] lg:gap-4 lg:px-6 xl:gap-6`}
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
                  className="h-[2.5rem] w-auto max-sm:-translate-x-6 object-contain md:h-[2rem] lg:h-[3rem]"
                  priority
                />
              </Link>
            </div>

            <div className="relative text-black z-10 ml-auto hidden flex-1 justify-end lg:flex">
              <nav
                className="flex h-full items-center justify-end"
                role="menubar"
              >
                <Link
                  href="/"
                  onClick={closeAllMenus}
                  className="relative flex min-h-[2.75rem] touch-manipulation items-center font-medium"
                >
                  <span className="relative z-10 flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent px-[clamp(0.625rem,0.45rem_+_0.6vw,1rem)] py-[clamp(0.375rem,0.25rem_+_0.35vw,0.625rem)] text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] text-white/85 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white">
                    Home
                  </span>
                </Link>

                {desktopDropdowns.map(
                  ({ menu, label, open, onClick, dropdownClass, align }) => (
                    <div key={label} className="dropdown-container relative">
                      <DesktopNavButton
                        label={label}
                        open={open}
                        onClick={onClick}
                      />
                      {open && (
                        <DesktopDropdownShell
                          className={dropdownClass}
                          align={align}
                        >
                          {renderDesktopDropdownContent(menu)}
                        </DesktopDropdownShell>
                      )}
                    </div>
                  ),
                )}
              </nav>
            </div>

            <div className="relative z-10 hidden shrink-0 lg:flex">
              <div className="flex items-center gap-2">
                <Link
                  href="/contact"
                  onClick={closeAllMenus}
                  className="rounded-lg border border-transparent px-[clamp(0.625rem,0.45rem_+_0.6vw,1rem)] py-[clamp(0.375rem,0.25rem_+_0.35vw,0.625rem)] text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] text-white/85  hover:border-white/20 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  Contact Us
                </Link>

                <div className="dropdown-container relative z-50">
                  <button
                    onClick={toggleUtilityMenu}
                    className=" gap-2 rounded-lg border border-transparent bg-transparent px-4 py-2 text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] font-medium text-white/85 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ddbc69]/40"
                    aria-label="Open secondary menu"
                    aria-expanded={isUtilityMenuOpen}
                    type="button"
                  >
                    <Menu
                      className="h-[1.5rem] w-[1.5rem]"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="z-10 ml-auto flex items-center justify-end lg:hidden">
              <Link
                href={whatsappEnquiryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-1/2 z-10 inline-flex min-h-[2.75rem] min-w-[2.75rem] -translate-x-1/2 items-center justify-center gap-2 rounded-lg border border-[#ddbc69]/45 bg-[#ddbc69]/90 px-2 text-black shadow-sm transition duration-300 hover:bg-[#f3bb39] md:min-h-[2rem] md:min-w-[2rem]"
                aria-label="Enquire Now on WhatsApp"
              >
                <FaWhatsapp className="h-[1.25rem] w-[1.25rem] shrink-0" /> Know
                More
              </Link>

              <button
                onClick={toggleMobileMenu}
                className="flex min-h-[3rem] min-w-[3rem] touch-manipulation items-center justify-center rounded-lg border border-white/15 bg-white/10 p-3 text-white transition-all duration-200 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#ddbc69]/40"
                aria-label={
                  isMobileMenuOpen ? "Close menu" : "Open mobile menu"
                }
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

      {isUtilityMenuOpen && (
        <div
          className="utility-dropdown fixed right-[clamp(1rem,4vw,2rem)] z-40 hidden w-[min(calc(100vw_-_8rem),16rem)] origin-top animate-in fade-in-0 slide-in-from-top-2 zoom-in-95 overflow-hidden rounded-lg border border-white/15 bg-[#f3f5f2] text-[#171717] shadow-[0_1.25rem_3rem_rgba(0,0,0,0.35)] duration-200 lg:block"
          style={{ top: "calc(var(--nav-offset-top, 0px) + 6rem)" }}
        >
          <div className="grid grid-cols-1 gap-[0.375rem] p-[0.625rem]">
            {utilityLinks.map(({ href, label, calendly }) =>
              calendly ? (
                <BookButton
                  key="book-vc-desktop"
                  className="block w-full px-[calc(0.875rem_+_0.25vw)] py-[calc(0.625rem_+_0.125vw)] text-left text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-black transition-colors hover:bg-gray-50 hover:text-[#ddbc69]"
                />
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={closeAllMenus}
                  className="block px-[calc(0.875rem_+_0.25vw)] py-[calc(0.625rem_+_0.125vw)] text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-black transition-colors hover:bg-gray-50 hover:text-[#ddbc69]"
                >
                  {label}
                </Link>
              ),
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
            <div className="border-b border-white pb-[0.5rem]">
              <button
                onClick={toggleResidentialMenu}
                className={`flex w-full items-center justify-between rounded-md py-[0.75rem] text-left text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium transition-colors ${
                  isResidentialMenuOpen
                    ? "border border-[#ddbc69]/45 bg-white/15 text-white shadow-[0_0.75rem_2rem_rgba(222,174,60,0.14)]"
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
                <div className="mt-[0.5rem] max-h-[20rem] space-y-[0.5rem] overflow-y-auto border-l-[0.125rem] border-[#ddbc69] pl-[1rem]">
                  {loading ? (
                    <div className="py-[1rem] text-center text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-white/60">
                      <div className="mr-[0.5rem] inline-block h-[1rem] w-[1rem] animate-spin rounded-lg border-b-[0.125rem] border-[#ddbc69]" />{" "}
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

            <div className="border-b border-white pb-[0.5rem]">
              <button
                onClick={toggleBulkLandMenu}
                className={`flex w-full items-center justify-between rounded-md  py-[0.75rem] text-left text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium transition-colors ${
                  isBulkLandMenuOpen
                    ? "border border-[#ddbc69]/45 bg-white/15 text-white shadow-[0_0.75rem_2rem_rgba(222,174,60,0.14)]"
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
                <div className="mt-[0.5rem] max-h-[20rem] space-y-[0.5rem] overflow-y-auto border-l-[0.125rem] border-[#ddbc69] ">
                  {bulkLandLoading ? (
                    <div className="py-[1rem] text-center text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-white/60">
                      <div className="mr-[0.5rem] inline-block h-[1rem] w-[1rem] animate-spin rounded-lg border-b-[0.125rem] border-[#ddbc69]" />{" "}
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

            {mobileLinks.map(({ href, label, calendly }, index) =>
              calendly ? (
                <BookButton
                  key="book-vc-mobile"
                  className="block w-full py-[0.75rem] text-left text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium text-white transition-colors hover:text-[#ddbc69]"
                />
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={closeAllMenus}
                  className={`block py-[0.75rem] text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium text-white transition-colors hover:text-[#ddbc69] ${
                    index < mobileLinks.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  {label}
                </Link>
              ),
            )}

            <Link
              href={whatsappEnquiryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[1rem] hidden w-full items-center justify-center gap-[0.5rem] rounded-lg bg-[#ddbc69] px-[1rem] py-[0.875rem] text-[0.9375rem] font-semibold text-black transition duration-300 hover:bg-[#f3bb39]"
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
