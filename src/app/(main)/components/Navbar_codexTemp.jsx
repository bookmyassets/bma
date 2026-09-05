"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import logo from "@/assests/bma-transparent-website.svg";
import dholeraBlogs from "@/assests/dholeraSIR-nav/dholera-sir-blogs-bookmyassets.webp";
import dholeraUpdates from "@/assests/dholeraSIR-nav/dholera-sir-latest-updates-bookmyassets.webp";

import BookButton from "./BookVC";

const whatsappEnquiryLink = `https://wa.me/918130371647?text=${encodeURIComponent(
  "Hi, I need a call back",
)}`;

const RESIDENTIAL_PROJECTS_URL =
  "/data/Residential.json?v=20260803-project-images";

const dholeraItems = [
  {
    projectName: "Dholera Blogs",
    image: dholeraBlogs,
    link: "dholera-sir-blogs",
    location: "Investment insights & guides",
  },
  {
    projectName: "Dholera Latest Updates",
    image: dholeraUpdates,
    link: "dholera-sir-updates",
    location: "Latest infrastructure updates",
  },
];

const utilityLinks = [
  {
    href: "/about-dholera-sir",
    label: "About Dholera",
  },
  {
    href: "/channel-partner",
    label: "Channel Partner",
  },
  {
    href: "/gallery",
    label: "Gallery",
  },
  {
    href: "/about",
    label: "About Us",
  },
  {
    href: "/faqs",
    label: "FAQs",
  },
  {
    label: "Book Video Call",
    calendly: true,
  },
];

const statusClasses = {
  ongoing: "bg-green-500/15 text-green-300 border-green-400/20",
  Ongoing: "bg-green-500/15 text-green-300 border-green-400/20",

  "sold-out": "bg-red-500/15 text-red-300 border-red-400/20",

  "re-sale": "bg-red-500/15 text-red-300 border-red-400/20",
  resale: "bg-red-500/15 text-red-300 border-red-400/20",

  upcoming: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  Upcoming: "bg-blue-500/15 text-blue-300 border-blue-400/20",

  limited: "bg-[#ddbc69]/15 text-[#ddbc69] border-[#ddbc69]/20",
};

function getStatusLabel(status) {
  if (status === "sold-out") return "SOLD OUT";

  if (status === "re-sale" || status === "resale") {
    return "RESALE";
  }

  if (status === "upcoming" || status === "Upcoming") {
    return "UPCOMING";
  }

  if (status === "ongoing" || status === "Ongoing") {
    return "ONGOING";
  }

  return status;
}

/* -------------------------------------------------------------------------- */
/* Chevron                                                                    */
/* -------------------------------------------------------------------------- */

function ChevronIcon({ open, className = "h-4 w-4" }) {
  return (
    <svg
      className={`${className} transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
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

/* -------------------------------------------------------------------------- */
/* Status                                                                     */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }) {
  if (!status || status === "available") return null;

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-2
        py-1
        text-[11px]
        font-semibold
        tracking-[0.08em]
        whitespace-nowrap
        ${statusClasses[status] || "border-white/10 bg-white/10 text-white/70"}
      `}
    >
      {getStatusLabel(status)}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop project card                                                       */
/* -------------------------------------------------------------------------- */

function ResidentialCard({ project, index, href, onClick }) {
  const isSoldOut = project.status === "sold-out";

  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        flex
        items-center
        gap-3
        rounded-xl
        p-2
        transition-all
        duration-300
        hover:bg-white/[0.07]
      "
    >
      <div
        className="
          relative
          h-[64px]
          w-[86px]
          shrink-0
          overflow-hidden
          rounded-lg
          bg-white/5
        "
      >
        <Image
          src={project.image}
          alt={project.projectName}
          fill
          sizes="86px"
          className={`
            object-cover
            transition-transform
            duration-700
            ${isSoldOut ? "grayscale" : "group-hover:scale-105"}
          `}
          priority={index < 4}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
      </div>

      <div className="min-w-0 flex-1">
        <StatusBadge status={project.status} />

        <h3
          className="
            mt-1.5
            truncate
            text-base
            font-semibold
            text-white
            transition-colors
            group-hover:text-[#ddbc69]
          "
        >
          {project.projectName}
        </h3>

        {project.location && (
          <p
            className="
              mt-1
              truncate
              text-[13px]
              text-white/45
            "
          >
            {project.location}
          </p>
        )}
      </div>

      <ArrowUpRight
        className="
          h-4
          w-4
          shrink-0
          text-white/30
          transition-all
          duration-300
          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
          group-hover:text-[#ddbc69]
        "
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Blog card                                                                  */
/* -------------------------------------------------------------------------- */

function ImageCard({ project, index, href, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        flex
        items-center
        gap-3
        rounded-xl
        p-2
        transition-all
        duration-300
        hover:bg-white/[0.07]
      "
    >
      <div
        className="
          relative
          h-[64px]
          w-[86px]
          shrink-0
          overflow-hidden
          rounded-lg
          bg-white/5
        "
      >
        <Image
          src={project.image}
          alt={project.projectName}
          fill
          sizes="86px"
          priority={index === 0}
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className="
            truncate
            text-base
            font-semibold
            text-white
            transition-colors
            group-hover:text-[#ddbc69]
          "
        >
          {project.projectName}
        </h3>

        <p
          className="
            mt-1
            truncate
            text-[13px]
            text-white/45
          "
        >
          {project.location}
        </p>
      </div>

      <ArrowUpRight
        className="
          h-4
          w-4
          text-white/30
          transition-all
          duration-300
          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
          group-hover:text-[#ddbc69]
        "
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop nav button                                                         */
/* -------------------------------------------------------------------------- */

function DesktopNavButton({ label, open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-expanded={open}
      aria-haspopup="true"
      type="button"
      className={`
        flex
        h-11
        items-center
        gap-1.5
        whitespace-nowrap
        rounded-lg
        px-3
        text-[17px]
        font-semibold
        transition-all
        duration-300
        xl:px-3.5
        2xl:text-lg
        ${
          open
            ? "bg-white/10 text-white"
            : "text-white/80 hover:bg-white/[0.07] hover:text-white"
        }
      `}
    >
      {label}

      <ChevronIcon open={open} className="h-3.5 w-3.5" />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop dropdown                                                           */
/* -------------------------------------------------------------------------- */

function DesktopDropdownShell({ children, className = "", align = "left" }) {
  const alignment = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  return (
    <div
      className={`
        absolute
        top-[calc(100%+14px)]
        z-[90]
        hidden
        w-[370px]
        min-[1180px]:block
        ${alignment[align]}
        ${className}
      `}
    >
      <div
        className="
          max-h-[min(520px,calc(100vh-120px))]
          overflow-y-auto
          rounded-[22px]
          border
          border-white/10
          bg-[#101010]/95
          p-2.5
          shadow-[0_24px_80px_rgba(0,0,0,0.45)]
          backdrop-blur-2xl
        "
      >
        {children}
      </div>
    </div>
  );
}

function DropdownNotice({ children, tone = "muted" }) {
  return (
    <div
      className={`
        flex
        min-h-[110px]
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        px-6
        text-center
        text-sm
        ${tone === "error" ? "text-red-300" : "text-white/50"}
      `}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile project                                                             */
/* -------------------------------------------------------------------------- */

function MobileProjectLink({ project, href, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        flex
        items-center
        gap-2
        rounded-xl
        px-1.5
        py-2.5
        transition-colors
        hover:bg-white/[0.06]
        min-[640px]:gap-3
        min-[640px]:px-2
      "
    >
      <div
        className="
          relative
          h-12
          w-12
          shrink-0
          overflow-hidden
          rounded-lg
          bg-white/5
          max-[639px]:hidden
        "
      >
        <Image
          src={project.image}
          alt={project.projectName}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div
          className="
            break-words
            text-base
            font-medium
            leading-snug
            text-white
          "
        >
          {project.projectName}
        </div>

        <div className="mt-1.5">
          <StatusBadge status={project.status} />
        </div>

        {project.location && (
          <div
            className="
              mt-0.5
              truncate
              text-xs
              text-white/40
              max-[639px]:hidden
            "
          >
            {project.location}
          </div>
        )}
      </div>

      <ChevronRight
        className="
          h-4
          w-4
          text-white/30
          transition-transform
          group-hover:translate-x-0.5
        "
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isResidentialMenuOpen, setIsResidentialMenuOpen] = useState(false);

  const [isDholeraMenuOpen, setIsDholeraMenuOpen] = useState(false);

  const [isUtilityMenuOpen, setIsUtilityMenuOpen] = useState(false);

  const [residentialProjects, setResidentialProjects] = useState([]);

  const [dholeraProjects, setDholeraProjects] = useState([]);

  const [loading, setLoading] = useState(false);
  const [dholeraLoading, setDholeraLoading] = useState(false);

  const [error, setError] = useState(null);
  const [dholeraError, setDholeraError] = useState(null);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const drawerRef = useRef(null);
  const drawerCloseButtonRef = useRef(null);

  /* ------------------------------------------------------------------------ */
  /* Smart hide/show navbar                                                   */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 24);

      /*
       * Drawer open:
       * navbar must remain visible.
       */
      if (isMobileMenuOpen) {
        setIsNavbarVisible(true);
        lastScrollY.current = currentScrollY;
        ticking.current = false;
        return;
      }

      /*
       * Always visible near page top.
       */
      if (currentScrollY < 90) {
        setIsNavbarVisible(true);
      } else if (difference > 8) {
        /*
         * User is scrolling DOWN.
         */
        setIsNavbarVisible(false);

        setIsResidentialMenuOpen(false);
        setIsDholeraMenuOpen(false);
        setIsUtilityMenuOpen(false);
      } else if (difference < -8) {
        /*
         * User is scrolling UP.
         */
        setIsNavbarVisible(true);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    updateNavbar();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  /* ------------------------------------------------------------------------ */
  /* Lock body when drawer is open                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const currentOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement;

    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() =>
      drawerCloseButtonRef.current?.focus(),
    );

    const keepFocusInsideDrawer = (event) => {
      if (event.key !== "Tab" || !drawerRef.current) {
        return;
      }

      const focusableElements = [
        ...drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((element) => !element.closest("[inert]"));

      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", keepFocusInsideDrawer);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", keepFocusInsideDrawer);
      document.body.style.overflow = currentOverflow;

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isMobileMenuOpen]);

  /* ------------------------------------------------------------------------ */
  /* Close navigation after a route change                                   */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
    setIsUtilityMenuOpen(false);
  }, [pathname]);

  /* ------------------------------------------------------------------------ */
  /* Residential projects                                                     */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    async function fetchProjects() {
      if (!isResidentialMenuOpen || residentialProjects.length > 0) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(RESIDENTIAL_PROJECTS_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch residential projects");
        }

        const data = await response.json();

        setResidentialProjects(data);
      } catch (err) {
        console.error(err);

        setError("Unable to load projects");
        setResidentialProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [isResidentialMenuOpen, residentialProjects.length]);

  /* ------------------------------------------------------------------------ */
  /* Blog items                                                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    async function fetchDholeraItems() {
      if (!isDholeraMenuOpen || dholeraProjects.length > 0) {
        return;
      }

      try {
        setDholeraLoading(true);
        setDholeraError(null);

        setDholeraProjects(dholeraItems);
      } catch (err) {
        console.error(err);

        setDholeraError("Unable to load Dholera content");

        setDholeraProjects([]);
      } finally {
        setDholeraLoading(false);
      }
    }

    fetchDholeraItems();
  }, [isDholeraMenuOpen, dholeraProjects.length]);

  /* ------------------------------------------------------------------------ */
  /* Close dropdown on outside click / Esc                                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const closeDesktopMenus = () => {
      setIsResidentialMenuOpen(false);
      setIsDholeraMenuOpen(false);
      setIsUtilityMenuOpen(false);
    };

    const handleMouseDown = (event) => {
      if (window.innerWidth < 1180) return;

      if (!event.target.closest("[data-navbar-dropdown]")) {
        closeDesktopMenus();
      }
    };

    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      closeDesktopMenus();
      setIsMobileMenuOpen(false);
    };

    document.addEventListener("mousedown", handleMouseDown);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ------------------------------------------------------------------------ */

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
    setIsUtilityMenuOpen(false);
  };

  const toggleResidentialMenu = () => {
    setIsNavbarVisible(true);

    setIsResidentialMenuOpen((previous) => {
      return !previous;
    });

    setIsDholeraMenuOpen(false);
    setIsUtilityMenuOpen(false);
  };

  const toggleDholeraMenu = () => {
    setIsNavbarVisible(true);

    setIsDholeraMenuOpen((previous) => {
      return !previous;
    });

    setIsResidentialMenuOpen(false);
    setIsUtilityMenuOpen(false);
  };

  const toggleUtilityMenu = () => {
    setIsNavbarVisible(true);

    setIsUtilityMenuOpen((previous) => {
      return !previous;
    });

    setIsResidentialMenuOpen(false);
    setIsDholeraMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsNavbarVisible(true);

    setIsMobileMenuOpen((previous) => {
      const next = !previous;

      if (next) {
        setIsResidentialMenuOpen(false);
        setIsDholeraMenuOpen(false);
        setIsUtilityMenuOpen(false);
      }

      return next;
    });
  };

  /* ------------------------------------------------------------------------ */
  /* Desktop dropdown content                                                 */
  /* ------------------------------------------------------------------------ */

  const renderResidentialProjects = () => {
    if (loading) {
      return <DropdownNotice>Loading projects...</DropdownNotice>;
    }

    if (error) {
      return <DropdownNotice tone="error">{error}</DropdownNotice>;
    }

    if (!residentialProjects.length) {
      return <DropdownNotice>No projects available</DropdownNotice>;
    }

    return (
      <div className="space-y-1">
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
  };

  const renderDholeraProjects = () => {
    if (dholeraLoading) {
      return <DropdownNotice>Loading insights...</DropdownNotice>;
    }

    if (dholeraError) {
      return <DropdownNotice tone="error">{dholeraError}</DropdownNotice>;
    }

    return (
      <div className="space-y-1">
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
      {/* ================================================================ */}
      {/* MAIN NAVBAR                                                      */}
      {/* ================================================================ */}

      <header
        className={`
          fixed
          inset-x-0
          z-[80]
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isNavbarVisible ? "translate-y-0" : "-translate-y-[115%]"}
          ${
            isScrolled
              ? `
                border-b
                border-[#ddbc69]/20
                bg-[linear-gradient(105deg,rgba(8,16,23,0.97)_0%,rgba(29,48,61,0.96)_50%,rgba(10,21,29,0.97)_100%)]
                shadow-[0_14px_45px_rgba(0,0,0,0.32)]
                backdrop-blur-2xl
              `
              : `
                border-b
                border-[#ddbc69]/20
                bg-[linear-gradient(105deg,rgba(8,16,23,0.94)_0%,rgba(35,55,68,0.88)_50%,rgba(10,21,29,0.94)_100%)]
                shadow-[0_10px_32px_rgba(0,0,0,0.2)]
                backdrop-blur-xl
              `
          }
        `}
        style={{
          top: "var(--nav-offset-top, 0px)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_-90%,rgba(221,188,105,0.28),transparent_38%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ddbc69]/55 to-transparent"
        />

        <nav
          className="
            relative
            z-10
            mx-auto
            flex
            h-[72px]
            w-full
            max-w-[1680px]
            items-center
            px-4
            sm:px-6
            lg:h-[86px]
            lg:px-8
            xl:px-12
          "
          aria-label="Main navigation"
        >
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeAllMenus}
            className="
              relative
              z-10
              flex
              shrink-0
              items-center
              transition-transform
              duration-300
              hover:scale-[1.02]
            "
            aria-label="BookMyAssets home"
          >
            <Image
              src={logo}
              width={170}
              height={55}
              alt="BookMyAssets"
              priority
              className="
                h-[38px]
                w-auto
                object-contain
                sm:h-[42px]
                lg:h-[48px]
              "
            />
          </Link>

          {/* ============================================================ */}
          {/* DESKTOP NAVIGATION                                           */}
          {/* ============================================================ */}

          <div
            className="
              ml-auto
              hidden
              items-center
              min-[1180px]:flex
            "
          >
            <div
              className="
                flex
                items-center
                gap-0.5
                xl:gap-1
              "
            >
              <Link
                href="/"
                onClick={closeAllMenus}
                className="
                  flex
                  h-11
                  items-center
                  rounded-lg
                  px-3
                  text-[17px]
                  font-semibold
                  text-white/80
                  transition-all
                  duration-300
                  hover:bg-white/[0.07]
                  hover:text-white
                  xl:px-3.5
                  2xl:text-lg
                "
              >
                Home
              </Link>

              {/* Residential */}

              <div className="relative" data-navbar-dropdown>
                <DesktopNavButton
                  label="Residential Projects"
                  open={isResidentialMenuOpen}
                  onClick={toggleResidentialMenu}
                />

                {isResidentialMenuOpen && (
                  <DesktopDropdownShell align="left">
                    <div
                      className="
                        border-b
                        border-white/[0.08]
                        px-3
                        pb-3
                        pt-2
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-[#ddbc69]
                        "
                      >
                        Residential
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-white/40
                        "
                      >
                        Explore BMA plotted developments
                      </p>
                    </div>

                    <div className="mt-2">{renderResidentialProjects()}</div>
                  </DesktopDropdownShell>
                )}
              </div>

              {/* Blogs */}

              <div className="relative" data-navbar-dropdown>
                <DesktopNavButton
                  label="Blogs"
                  open={isDholeraMenuOpen}
                  onClick={toggleDholeraMenu}
                />

                {isDholeraMenuOpen && (
                  <DesktopDropdownShell align="center">
                    <div
                      className="
                        border-b
                        border-white/[0.08]
                        px-3
                        pb-3
                        pt-2
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-[#ddbc69]
                        "
                      >
                        Dholera Insights
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-white/40
                        "
                      >
                        Research, updates and market insights
                      </p>
                    </div>

                    <div className="mt-2">{renderDholeraProjects()}</div>
                  </DesktopDropdownShell>
                )}
              </div>

              <Link
                href="/bulk-land"
                onClick={closeAllMenus}
                className="
                  flex
                  h-11
                  items-center
                  rounded-lg
                  px-3
                  text-[17px]
                  font-semibold
                  text-white/80
                  transition-all
                  duration-300
                  hover:bg-white/[0.07]
                  hover:text-white
                  xl:px-3.5
                  2xl:text-lg
                "
              >
                Bulk Land Deals
              </Link>

              <Link
                href="/contact"
                onClick={closeAllMenus}
                className="
                  flex
                  h-11
                  items-center
                  rounded-lg
                  px-3
                  text-[17px]
                  font-semibold
                  text-white/80
                  transition-all
                  duration-300
                  hover:bg-white/[0.07]
                  hover:text-white
                  xl:px-3.5
                  2xl:text-lg
                "
              >
                Contact Us
              </Link>
            </div>

            {/* Utility hamburger */}

            <div
              className="
                relative
                ml-1
                xl:ml-2
              "
              data-navbar-dropdown
            >
              <button
                onClick={toggleUtilityMenu}
                type="button"
                aria-expanded={isUtilityMenuOpen}
                aria-label="Open more navigation links"
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  transition-all
                  duration-300
                  ${
                    isUtilityMenuOpen
                      ? "border-[#ddbc69]/60 bg-[#ddbc69]/10 text-[#ddbc69]"
                      : "border-white/10 text-white/75 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                  }
                `}
              >
                <Menu className="h-5 w-5" />
              </button>

              {isUtilityMenuOpen && (
                <DesktopDropdownShell align="right" className="w-[270px]">
                  <div className="p-1">
                    {utilityLinks.map(({ href, label, calendly }) => {
                      if (calendly) {
                        return (
                          <BookButton
                            key={label}
                            className="
                                block
                                w-full
                                rounded-lg
                                px-3
                                py-3
                                text-left
                                text-base
                                font-medium
                                text-white/75
                                transition-colors
                                hover:bg-white/[0.07]
                                hover:text-[#ddbc69]
                              "
                          />
                        );
                      }

                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeAllMenus}
                          className="
                              flex
                              items-center
                              justify-between
                              rounded-lg
                              px-3
                              py-3
                              text-base
                              font-medium
                              text-white/75
                              transition-colors
                              hover:bg-white/[0.07]
                              hover:text-[#ddbc69]
                            "
                        >
                          {label}

                          <ChevronRight className="h-4 w-4 opacity-40" />
                        </Link>
                      );
                    })}
                  </div>
                </DesktopDropdownShell>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* MOBILE HEADER                                                */}
          {/* ============================================================ */}

          <div
            className="
              ml-auto
              flex
              items-center
              gap-2
              min-[1180px]:hidden
            "
          >
            <Link
              href={whatsappEnquiryLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-full
                border
                border-[#ddbc69]/50
                bg-[#ddbc69]/10
                px-3
                text-xs
                font-semibold
                text-[#efd27a]
                transition-colors
                hover:bg-[#ddbc69]
                hover:text-black
                sm:px-4
                sm:text-sm
              "
            >
              <FaWhatsapp className="h-4 w-4" />

              <span className="hidden min-[380px]:inline">Enquire</span>
            </Link>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/[0.07]
                text-white
                backdrop-blur-xl
                transition-colors
                hover:bg-white/10
              "
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ================================================================ */}
      {/* MOBILE / TABLET DRAWER                                           */}
      {/* ================================================================ */}

      <div
        className={`
          fixed
          inset-0
          z-[100]
          min-[1180px]:hidden
          ${
            isMobileMenuOpen
              ? "pointer-events-auto visible"
              : "pointer-events-none invisible"
          }
        `}
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
      >
        {/* Backdrop */}

        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeAllMenus}
          className={`
            absolute
            inset-0
            bg-black/70
            backdrop-blur-[5px]
            transition-opacity
            duration-500
            ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Drawer */}

        <aside
          id="mobile-navigation-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="BookMyAssets navigation menu"
          className={`
    absolute
    bottom-0
    right-0
    top-0
    flex

    w-[92vw]
    max-w-[430px]
    sm:w-[72vw]
    sm:max-w-[520px]
    md:w-[60vw]
    md:max-w-[580px]
    lg:w-[52vw]
    lg:max-w-[620px]

    flex-col
    overflow-hidden

    rounded-l-[24px]
    border
    border-[#ddbc69]/25

    bg-[radial-gradient(circle_at_100%_0%,rgba(221,188,105,0.14),transparent_30%),linear-gradient(145deg,rgba(27,44,56,0.99)_0%,rgba(11,21,29,0.99)_52%,rgba(8,15,21,0.99)_100%)]

    shadow-[-22px_30px_90px_rgba(0,0,0,0.62)]
    backdrop-blur-2xl

    transition-transform
    duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]

    sm:rounded-l-[30px]

    ${isMobileMenuOpen ? "translate-x-0" : "translate-x-[110%]"}
  `}
        ></aside>
      </div>
    </>
  );
}
