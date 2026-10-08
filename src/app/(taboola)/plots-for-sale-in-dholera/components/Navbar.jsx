
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import logo from "@/assests/bma-with-background.svg";
import GetinTouch from "./GetinTouch";

const projects = [
  {
    name: "Westwyn Residency",
    status: "Newly Launched",
    badge: "bg-yellow-100 text-yellow-800",
    dot: "bg-yellow-500",
    href: "#westwyn-residency",
  },
  {
    name: "Westwyn Estates",
    status: "Sold Out",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    href: null,
  },
  {
    name: "Westwyn County",
    status: "Sold Out",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    href: null,
  },
  {
    name: "Westwyn Crown",
    status: "Coming Soon",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    href: "#westwyn-crown",
  },
];

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#dholera", label: "About Dholera" },
  { href: "#Why-BMA", label: "Why BookMyAssets" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const projectsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        projectsRef.current &&
        !projectsRef.current.contains(event.target)
      ) {
        setIsProjectsOpen(false);
      }

    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProjectsOpen(false);
    setIsMobileProjectsOpen(false);
  }, [pathname]);

  const handleNavigation = (section) => {
    setIsMenuOpen(false);
    setIsProjectsOpen(false);
    setIsMobileProjectsOpen(false);

    if (pathname === "/plots-for-sale-in-dholera") {
      const isProject = ["#westwyn-residency", "#westwyn-crown"].includes(section);
      if (isProject) {
        window.dispatchEvent(new CustomEvent("westwyn-project-select", {
          detail: section === "#westwyn-crown" ? "crown" : "residency",
        }));
      }
      const element = document.getElementById(isProject ? "westwyn-residency" : section.replace("#", ""));

      if (element) {
        const offset = -90;
        const y =
          element.getBoundingClientRect().top +
          window.scrollY +
          offset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      router.push(`/plots-for-sale-in-dholera${section}`);
    }
  };

  const openContactForm = () => {
    setIsMenuOpen(false);
    setIsProjectsOpen(false);
    setIsMobileProjectsOpen(false);
    setIsContactFormOpen(true);
  };

  const renderProject = (project, mobile = false) => {
    return (
      <button
        key={project.name}
        type="button"
        onClick={() => {
          if (project.href) handleNavigation(project.href);
          else openContactForm();
        }}
        className={`
          group/item flex w-full items-center justify-between
          gap-3 rounded-xl border border-[#eee8dc] bg-white px-3.5 py-3.5 text-left
          transition-all duration-200
          cursor-pointer hover:border-[#ddbc69] hover:bg-[#faf7ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a04a]
          ${mobile ? "py-3" : ""}
        `}
      >
        <span className="min-w-0 text-[13px] font-semibold text-[#252525] sm:text-[14px]">{project.name}</span>
          <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${project.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${project.dot}`} />
            {project.status}
          </span>
      </button>
    );
  };

  return (
    <>
      <nav
        className={`
          fixed inset-x-0 top-0 z-[100]
          border-b border-[#eae5da]
          bg-white/95 backdrop-blur-xl
          transition-shadow duration-300
          ${
            isScrolled
              ? "shadow-[0_8px_30px_rgba(0,0,0,0.07)]"
              : "shadow-none"
          }
        `}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex h-[76px] items-center justify-between gap-6 lg:h-[84px]">
            {/* Logo */}
            <button
              type="button"
              aria-label="Go to homepage"
              onClick={() => handleNavigation("#hero")}
              className="relative z-10 shrink-0"
            >
              <Image
                src={logo}
                alt="BookMyAssets"
                width={62}
                height={62}
                priority
                className="h-[54px] w-[54px] object-contain transition-transform duration-300 hover:scale-[1.04] lg:h-[62px] lg:w-[62px]"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-5 lg:flex xl:gap-9">
              {navItems.slice(0, 2).map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavigation(item.href)}
                  className="
                    group relative whitespace-nowrap py-3
                    text-[13px] font-medium text-[#292929]
                    transition-colors duration-300
                    hover:text-[#a78235] xl:text-[14px]
                  "
                >
                  {item.label}

                  <span className="absolute bottom-1 left-0 h-[1.5px] w-0 bg-[#c5a04a] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}

              {/* Projects Dropdown */}
              <div
                ref={projectsRef}
                className="relative"
                onMouseEnter={() => setIsProjectsOpen(true)}
                onMouseLeave={() => setIsProjectsOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={isProjectsOpen}
                  aria-haspopup="true"
                  onClick={() => {
                    setIsProjectsOpen((prev) => !prev);
                  }}
                  className={`
                    group relative flex items-center gap-1.5
                    whitespace-nowrap py-3 text-[13px]
                    font-medium transition-colors duration-300
                    xl:text-[14px]
                    ${
                      isProjectsOpen
                        ? "text-[#a78235]"
                        : "text-[#292929] hover:text-[#a78235]"
                    }
                  `}
                >
                  Our Projects

                  <ChevronDown
                    size={15}
                    strokeWidth={1.8}
                    className={`transition-transform duration-300 ${
                      isProjectsOpen ? "rotate-180" : ""
                    }`}
                  />

                  <span
                    className={`
                      absolute bottom-1 left-0 h-[1.5px]
                      bg-[#c5a04a] transition-all duration-300
                      ${
                        isProjectsOpen
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </button>

                <AnimatePresence>
                  {isProjectsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="
                        absolute left-1/2 top-full w-[365px]
                        -translate-x-1/2 pt-3
                      "
                    >
                      <div className="overflow-hidden rounded-[18px] border border-[#e9e2d4] bg-[#fcfaf5] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.13)]">
                        <div className="space-y-2">
                          {projects.map((project) =>
                            renderProject(project)
                          )}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Why BookMyAssets */}
              <button
                type="button"
                onClick={() => handleNavigation("#Why-BMA")}
                className="
                  group relative whitespace-nowrap py-3
                  text-[13px] font-medium text-[#292929]
                  transition-colors duration-300
                  hover:text-[#a78235] xl:text-[14px]
                "
              >
                Why BookMyAssets

                <span className="absolute bottom-1 left-0 h-[1.5px] w-0 bg-[#c5a04a] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Contact CTA */}
                <button
                  type="button"
                  onClick={openContactForm}
                  className="
                    group flex items-center justify-center gap-2
                    whitespace-nowrap rounded-full
                    bg-[#ddbc69] px-5 py-3
                    text-[12px] font-semibold tracking-[0.01em]
                    text-[#17130b]
                    shadow-[0_4px_14px_rgba(221,188,105,0.18)]
                    transition-all duration-300
                    hover:-translate-y-[2px]
                    hover:bg-[#d2ae54]
                    hover:shadow-[0_9px_24px_rgba(221,188,105,0.3)]
                    xl:px-6 xl:text-[13px]
                  "
                >
                  Get in Touch
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
            </div>

            {/* Mobile Header */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={openContactForm}
                className="
                  rounded-full bg-[#ddbc69] px-4 py-2.5
                  text-[12px] font-semibold text-[#17130b]
                  transition-colors hover:bg-[#d2ae54]
                  sm:px-5
                "
              >
                Get in Touch
              </button>

              <button
                type="button"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                onClick={() => {
                  setIsMenuOpen((prev) => !prev);
                }}
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full border border-[#eae5da]
                  text-[#252525] transition-colors
                  hover:bg-[#faf7ef]
                "
              >
                {isMenuOpen ? (
                  <X size={21} strokeWidth={1.8} />
                ) : (
                  <Menu size={21} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="
                overflow-hidden border-t border-[#f0ece4]
                bg-white lg:hidden
              "
            >
              <div className="max-h-[calc(100dvh-76px)] overflow-y-auto px-5 pb-7 pt-4 sm:px-8">
                <div className="space-y-1">
                  {navItems.slice(0, 2).map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleNavigation(item.href)}
                      className="
                        flex w-full items-center justify-between
                        rounded-xl px-3 py-3.5 text-left
                        text-[15px] font-medium text-[#252525]
                        transition-colors hover:bg-[#faf7ef]
                      "
                    >
                      {item.label}
                      <ArrowUpRight size={17} className="text-[#aaa]" />
                    </button>
                  ))}

                  {/* Mobile Projects Accordion */}
                  <div>
                    <button
                      type="button"
                      aria-expanded={isMobileProjectsOpen}
                      onClick={() =>
                        setIsMobileProjectsOpen((prev) => !prev)
                      }
                      className="
                        flex w-full items-center justify-between
                        rounded-xl px-3 py-3.5
                        text-left text-[15px] font-medium
                        text-[#252525] hover:bg-[#faf7ef]
                      "
                    >
                      Our Projects
                      <ChevronDown
                        size={18}
                        className={`text-[#a78235] transition-transform duration-300 ${
                          isMobileProjectsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isMobileProjectsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1 space-y-2 rounded-2xl bg-[#fcfaf5] p-2">
                            {projects.map((project) =>
                              renderProject(project, true)
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavigation("#Why-BMA")}
                    className="
                      flex w-full items-center justify-between
                      rounded-xl px-3 py-3.5 text-left
                      text-[15px] font-medium text-[#252525]
                      hover:bg-[#faf7ef]
                    "
                  >
                    Why BookMyAssets
                    <ArrowUpRight size={17} className="text-[#aaa]" />
                  </button>
                </div>

                <div className="mt-5 border-t border-[#eee8dc] pt-5">
                  <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a88b4d]">
                    Let's Connect
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:+918130371647"
                      className="
                        flex items-center justify-center gap-2
                        rounded-xl border border-[#e8e0d0]
                        px-3 py-3.5 text-[13px]
                        font-medium text-[#252525]
                      "
                    >
                      <Phone size={16} />
                      Call Now
                    </a>

                    <a
                      href="https://wa.me/918130371647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center justify-center gap-2
                        rounded-xl border border-[#e8e0d0]
                        px-3 py-3.5 text-[13px]
                        font-medium text-[#252525]
                      "
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={openContactForm}
                    className="
                      mt-3 flex w-full items-center
                      justify-center gap-2 rounded-xl
                      bg-[#ddbc69] px-5 py-4
                      text-[13px] font-semibold text-[#17130b]
                      transition-colors hover:bg-[#d2ae54]
                    "
                  >
                    Book a Free Site Visit
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Existing Contact Modal */}
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
            <GetinTouch
              title="Best Investment-Ready Locations in Dholera"
              buttonName="Get A Call Back"
              onClose={() => setIsContactFormOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
