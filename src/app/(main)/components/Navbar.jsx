"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assests/bma-logo.png";
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
    yellow: "border-yellow-500",
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
        <p className="mt-[calc(0.75rem_+_0.25vw)] text-[clamp(0.875rem,0.78rem_+_0.45vw,1.0625rem)] text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="flex h-[16rem] items-center justify-center">
      <p className="text-[clamp(1rem,0.875rem_+_0.55vw,1.1875rem)] text-red-500">
        {message}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-[16rem] items-center justify-center">
      <div className="text-center text-gray-500">
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
          className={`absolute inset-0 transition-all duration-500 ${
            isSoldOut
              ? "bg-gradient-to-t from-red-900/50 via-red-900/20 to-transparent"
              : ""
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

function ImageCard({ project, index, href, onClick, color = "yellow" }) {
  const hoverColor =
    color === "orange"
      ? "group-hover:text-orange-300"
      : "group-hover:text-[#deae3c]";

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

        <div className="absolute bottom-[1.25rem] left-0 right-0 p-[1rem] text-white">
          <h3
            className={`text-[clamp(0.9375rem,0.78rem_+_0.65vw,1.25rem)] font-semibold leading-tight transition-colors duration-300 ${hoverColor}`}
          >
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
          ? "cursor-not-allowed bg-gray-50 opacity-60"
          : "hover:bg-gray-50"
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
              isSoldOut ? "text-gray-500" : "text-black"
            }`}
          >
            {project.projectName}
          </span>

          {project.status && project.status !== "available" && (
            <span
              className={`rounded-full px-[0.375rem] py-[0.125rem] text-[0.5625rem] font-semibold ${
                project.status === "sold-out"
                  ? "bg-red-50 text-red-600"
                  : project.status === "ongoing"
                    ? "bg-green-50 text-green-600"
                    : project.status === "limited"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-blue-50 text-blue-600"
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
            isSoldOut ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {project.location}
        </div>
      </div>
    </Link>
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
  const isHomePage = pathname === "/";
  const shouldUseWhiteBackground =
    isScrolled ||
    !isHomePage ||
    isResidentialMenuOpen ||
    isBulkLandMenuOpen ||
    isDholeraMenuOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      if (window.innerWidth < 768) return;

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
      if (window.innerWidth >= 768) closeDesktopDropdowns();
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
      onClick: toggleResidentialMenu,
    },
    {
      label: "Bulk Land Deals",
      open: isBulkLandMenuOpen,
      onClick: toggleBulkLandMenu,
    },
    {
      label: "Dholera SIR Blogs",
      open: isDholeraMenuOpen,
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
      <nav className="fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300">
        <div className="mx-auto max-w-7xl px-[calc(1rem_+_1vw)]">
          <div className="flex h-[5rem] items-center justify-between">
            <div className="shrink-0">
              <Link href="/" onClick={closeAllMenus}>
                <Image
                  src={logo}
                  height={75}
                  width={75}
                  alt="BookMyAssets logo"
                  className="p-[0.25rem]"
                />
              </Link>
            </div>

            <div className="hidden items-center gap-[calc(1.25rem_+_0.8vw)] md:flex">
              {desktopDropdowns.map(({ label, open, onClick }) => (
                <div key={label} className="dropdown-container relative group">
                  <button
                    onClick={onClick}
                    className={`flex items-center rounded-md px-[clamp(0.625rem,0.45rem_+_0.6vw,1rem)] py-[clamp(0.375rem,0.25rem_+_0.35vw,0.625rem)] text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] font-medium transition-colors duration-300 ${
                      open
                        ? "bg-[#deae3c] text-black"
                        : "text-black hover:text-yellow-500"
                    }`}
                    aria-expanded={open}
                  >
                    {label}
                    <ChevronIcon
                      open={open}
                      className="ml-[0.25rem] h-[1rem] w-[1rem]"
                    />
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-[calc(0.75rem_+_0.5vw)]">
                <Link
                  href="/contact"
                  className="rounded-md bg-[#deae3c] px-[calc(0.875rem_+_0.5vw)] py-[calc(0.375rem_+_0.25vw)] text-[clamp(0.9375rem,0.76rem_+_0.55vw,1.125rem)] font-medium text-black shadow-md transition duration-300 hover:bg-[#f3bb39]"
                >
                  Contact Us
                </Link>

                <div className="relative group">
                  <button
                    className="font-medium text-black transition-colors duration-300 hover:text-yellow-500"
                    aria-label="Open secondary menu"
                  >
                    <Menu
                      className={`mr-[0.25rem] inline-block h-[2rem] w-[2rem] rounded-sm p-[0.25rem] ${
                        shouldUseWhiteBackground
                          ? "bg-gray-100 text-black"
                          : "bg-white text-black"
                      }`}
                    />
                  </button>

                  <div className="invisible absolute right-0 top-full z-50 mt-[calc(0.5rem_+_0.25vw)] w-[12rem] rounded-lg border border-gray-200 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="py-[calc(0.375rem_+_0.125vw)]">
                      {utilityLinks.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeAllMenus}
                          className="block px-[calc(0.875rem_+_0.25vw)] py-[calc(0.625rem_+_0.125vw)] text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-black transition-colors hover:bg-gray-50 hover:text-yellow-600"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[0.5rem] md:hidden">
              <a
                href={whatsappEnquiryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[0.375rem] whitespace-nowrap rounded-md bg-[#deae3c] px-[0.75rem] py-[0.5rem] text-[0.875rem] font-medium text-black shadow-sm transition duration-300 hover:bg-[#f3bb39]"
                aria-label="Enquire Now on WhatsApp"
              >
                <FaWhatsapp className="h-[1rem] w-[1rem] shrink-0" />
                <span>Enquire Now</span>
              </a>

              <button
                onClick={toggleMobileMenu}
                className={`rounded-md p-[0.5rem] transition-colors duration-300 ${
                  shouldUseWhiteBackground
                    ? "text-black hover:bg-gray-100"
                    : "hover:bg-white/10"
                }`}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <svg
                  className={`h-[1.5rem] w-[1.5rem] transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-90" : ""
                  }`}
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

      {isResidentialMenuOpen && (
        <div className="residential-dropdown fixed left-0 top-[5rem] z-40 hidden h-[calc(100dvh_-_5rem)] w-screen animate-in border-t border-gray-200 bg-white shadow-2xl slide-in-from-top-4 duration-300 md:flex">
          <div className="flex h-full w-1/3 flex-col bg-gradient-to-br from-gray-50 to-white p-[calc(2rem_+_1vw)]">
            <h3 className="text-[clamp(2.25rem,1.75rem_+_1.5vw,3rem)] font-light leading-tight text-gray-900">
              Residential <br /> Projects
            </h3>
            <p className="mt-[calc(0.75rem_+_0.25vw)] text-[clamp(1rem,0.875rem_+_0.5vw,1.25rem)] text-gray-600">
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
                  <div className="grid grid-cols-4 gap-[calc(0.5rem_+_0.5vw)]">
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
                    className={`mt-[calc(0.375rem_+_0.125vw)] overflow-hidden rounded-xl border border-red-200 transition-colors duration-200 ${
                      isSoldOutOpen ? "bg-red-50/40" : "bg-red-50"
                    }`}
                  >
                    <button
                      onClick={() => setIsSoldOutOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between px-[calc(1rem_+_0.25vw)] py-[calc(0.625rem_+_0.125vw)] transition-colors duration-200 hover:bg-red-100"
                    >
                      <div className="flex items-center gap-[0.75rem]">
                        <span className="h-[0.5rem] w-[0.5rem] rounded-full bg-red-400" />
                        <span className="text-[clamp(0.8125rem,0.72rem_+_0.38vw,0.9375rem)] font-semibold uppercase tracking-widest text-red-600">
                          Sold Out Projects
                        </span>
                        <span className="rounded-full bg-red-200 px-[0.5rem] py-[0.125rem] text-[clamp(0.6875rem,0.6rem_+_0.3vw,0.8125rem)] font-bold text-red-700">
                          {soldOutProjects.length}
                        </span>
                      </div>
                      <ChevronIcon
                        open={isSoldOutOpen}
                        className="h-[1rem] w-[1rem] shrink-0 text-red-400"
                      />
                    </button>

                    <div
                      className={`grid grid-cols-4 gap-[calc(0.5rem_+_0.5vw)] overflow-hidden transition-all duration-500 ease-in-out ${
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
        <div className="bulk-land-dropdown fixed left-0 top-[5rem] z-40 hidden h-[calc(100dvh_-_5rem)] w-screen animate-in border-t border-gray-200 bg-white shadow-2xl slide-in-from-top-4 duration-300 md:flex">
          <div className="flex h-full w-1/3 flex-col justify-between bg-gradient-to-br from-orange-50 to-white p-[calc(2rem_+_1vw)]">
            <div>
              <h3 className="text-[clamp(2.25rem,1.75rem_+_1.5vw,3rem)] font-light leading-tight text-gray-900">
                Bulk Land <br /> Deals
              </h3>
              <p className="mt-[calc(0.75rem_+_0.25vw)] text-[clamp(1rem,0.875rem_+_0.5vw,1.25rem)] text-gray-600">
                Strategic land parcels for commercial and industrial development
              </p>
            </div>
          </div>

          <div className="h-full w-2/3 overflow-y-auto p-[calc(1rem_+_0.5vw)]">
            {bulkLandLoading ? (
              <LoadingState color="orange" />
            ) : bulkLandError ? (
              <ErrorState message={bulkLandError} />
            ) : bulkLandProjects.length > 0 ? (
              <div className="grid h-full grid-cols-4 gap-[calc(0.5rem_+_0.5vw)] pb-[calc(1rem_+_0.5vw)]">
                {bulkLandProjects.map((project, index) => (
                  <ImageCard
                    key={project.link}
                    project={project}
                    index={index}
                    href={`/bulk-land/${project.link}`}
                    onClick={closeAllMenus}
                    color="orange"
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
        <div className="dholera-dropdown fixed left-0 top-[5rem] z-40 hidden h-[calc(100dvh_-_5rem)] w-screen animate-in border-t border-gray-200 bg-white shadow-2xl slide-in-from-top-4 duration-300 md:flex">
          <div className="flex h-full w-1/3 flex-col justify-between bg-gradient-to-br from-blue-50 to-white p-[calc(2rem_+_1vw)]">
            <div>
              <h3 className="text-[clamp(2.25rem,1.75rem_+_1.5vw,3rem)] font-light leading-tight text-gray-900">
                DHOLERA SIR
              </h3>
              <p className="mt-[calc(0.75rem_+_0.25vw)] text-[clamp(1rem,0.875rem_+_0.5vw,1.25rem)] text-gray-600">
                India's first planned smart city with futuristic infrastructure
              </p>
            </div>
          </div>

          <div className="h-full w-2/3 overflow-y-auto p-[calc(1rem_+_0.5vw)]">
            {dholeraLoading ? (
              <LoadingState color="blue" />
            ) : dholeraError ? (
              <ErrorState message={dholeraError} />
            ) : dholeraProjects.length > 0 ? (
              <div className="grid h-full grid-cols-4 gap-[calc(0.5rem_+_0.5vw)] pb-[calc(1rem_+_0.5vw)]">
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
        className={`fixed inset-0 z-30 transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        inert={!isMobileMenuOpen}
      >
        <div
          className={`relative z-50 h-full w-full overflow-y-auto bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-[calc(0.75rem_+_0.5vw)]">
            <p className="text-[clamp(1rem,0.875rem_+_0.55vw,1.1875rem)] font-semibold text-gray-800">
              Menu
            </p>

            <button
              onClick={closeAllMenus}
              className="rounded-full p-[0.5rem] text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close menu"
            >
              <svg
                className="h-[1.5rem] w-[1.5rem]"
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

          <div className="space-y-[0.5rem] p-[calc(0.75rem_+_0.5vw)]">
            <div className="border-b border-gray-100 pb-[0.5rem]">
              <button
                onClick={toggleResidentialMenu}
                className={`flex w-full items-center justify-between rounded-md px-[0.75rem] py-[0.75rem] text-left text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium transition-colors ${
                  isResidentialMenuOpen
                    ? "bg-[#deae3c] text-black"
                    : "text-black hover:text-yellow-500"
                }`}
                aria-expanded={isResidentialMenuOpen}
              >
                <span>Residential Projects</span>
                <ChevronIcon
                  open={isResidentialMenuOpen}
                  className="h-[1.25rem] w-[1.25rem]"
                />
              </button>

              {isResidentialMenuOpen && (
                <div className="mt-[0.5rem] max-h-[20rem] space-y-[0.5rem] overflow-y-auto border-l-[0.125rem] border-yellow-500 pl-[1rem]">
                  {loading ? (
                    <div className="py-[1rem] text-center text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-gray-500">
                      <div className="mr-[0.5rem] inline-block h-[1rem] w-[1rem] animate-spin rounded-full border-b-[0.125rem] border-yellow-500" />{" "}
                      Loading...
                    </div>
                  ) : error ? (
                    <div className="py-[0.5rem] text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-red-500">
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

            <div className="border-b border-gray-100 pb-[0.5rem]">
              <button
                onClick={toggleBulkLandMenu}
                className={`flex w-full items-center justify-between rounded-md px-[0.75rem] py-[0.75rem] text-left text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium transition-colors ${
                  isBulkLandMenuOpen
                    ? "bg-[#deae3c] text-black"
                    : "text-black hover:text-orange-500"
                }`}
                aria-expanded={isBulkLandMenuOpen}
              >
                <span>Bulk Land Deals</span>
                <ChevronIcon
                  open={isBulkLandMenuOpen}
                  className="h-[1.25rem] w-[1.25rem]"
                />
              </button>

              {isBulkLandMenuOpen && (
                <div className="mt-[0.5rem] max-h-[20rem] space-y-[0.5rem] overflow-y-auto border-l-[0.125rem] border-orange-500 pl-[1rem]">
                  {bulkLandLoading ? (
                    <div className="py-[1rem] text-center text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-gray-500">
                      <div className="mr-[0.5rem] inline-block h-[1rem] w-[1rem] animate-spin rounded-full border-b-[0.125rem] border-orange-500" />{" "}
                      Loading...
                    </div>
                  ) : bulkLandError ? (
                    <div className="py-[0.5rem] text-[clamp(0.8125rem,0.72rem_+_0.38vw,1rem)] text-red-500">
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

            {mobileLinks.map(({ href, label }, index) => (
              <Link
                key={href}
                href={href}
                onClick={closeAllMenus}
                className={`block py-[0.75rem] text-[clamp(0.9375rem,0.78rem_+_0.55vw,1.125rem)] font-medium text-black transition-colors hover:text-yellow-500 ${
                  index < mobileLinks.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
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
