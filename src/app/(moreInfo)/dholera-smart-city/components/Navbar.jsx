"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import logo from "@/assests/bma-with-background.svg";
import PopupLeadForm from "@/app/(main)/components/PopupLeadForm";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#dholera", label: "About Dholera" },
  { href: "#why-bma", label: "Why BMA" },
  { href: "#major-projects", label: "Major Projects" },
  { href: "#Gallery", label: "Gallery" },
];

const projectItems = [
  { label: "WestWyn Estates", tag: "Sold Out", action: "form" },
  { label: "WestWyn County", tag: "Sold Out", action: "form" },
  {
    label: "WestWyn Residency",
    tag: "Newly Launched",
    action: "projects",
    target: "#westwyn-residency",
  },
  {
    label: "WestWyn Crown",
    tag: "Coming Soon",
    action: "projects",
    target: "#westwyn-estates",
  },
];

const projectTagClasses = {
  "Sold Out": "border-red-200 bg-red-100 text-red-700",
  "Newly Launched": "border-blue-200 bg-blue-100 text-blue-700",
  "Coming Soon": "border-amber-200 bg-amber-100 text-amber-800",
};

function ProjectTag({ tag }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
        projectTagClasses[tag] || "border-slate-200 bg-slate-100 text-slate-700"
      }`}
    >
      {tag}
    </span>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const handleNavigation = (section) => {
    setIsMenuOpen(false);
    setIsProjectsMenuOpen(false);

    if (pathname === "/dholera-smart-city") {
      const element = document.getElementById(section.replace("#", ""));

      if (element) {
        const yOffset = -100;
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      router.push(`/dholera-smart-city${section}`);
    }
  };

  const openContactForm = () => {
    setIsMenuOpen(false);
    setIsProjectsMenuOpen(false);
    setIsContactFormOpen(true);
  };

  const handleProjectClick = (action, target) => {
    if (action === "form") {
      openContactForm();
      return;
    }

    handleNavigation(target || "#westwyn-estates");
  };

  return (
    <nav className="fixed z-50 h-20 w-full border-b border-slate-200/80 bg-white/95 shadow-[0_4px_18px_rgba(15,23,42,0.06)] backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleNavigation("#hero")}
          className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDBC69] focus-visible:ring-offset-2"
          aria-label="Go to home"
        >
          <Image
            src={logo}
            height={56}
            width={56}
            alt="BookMyAssets logo"
            className="h-14 w-14 object-contain"
          />
        </button>

        <div className="hidden items-center gap-1.5 md:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProjectsMenuOpen((current) => !current)}
              aria-expanded={isProjectsMenuOpen}
              aria-haspopup="true"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-[#F8F3E7] hover:text-[#9B782C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDBC69] focus-visible:ring-offset-2 lg:px-3.5"
            >
              Our Projects
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isProjectsMenuOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {isProjectsMenuOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-2xl border border-[#DDBC69]/40 bg-[#FFFDF8] p-2 shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
                {projectItems.map(({ label, tag, action, target }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleProjectClick(action, target)}
                    className="flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#F8F3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDBC69]"
                  >
                    <span className="min-w-0 flex-1 text-sm font-semibold text-black">
                      {label}
                    </span>
                    <ProjectTag tag={tag} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {navItems.map(({ href, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleNavigation(href)}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-[#F8F3E7] hover:text-[#9B782C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDBC69] focus-visible:ring-offset-2 lg:px-3.5"
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={openContactForm}
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#DDBC69] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_6px_16px_rgba(91,67,20,0.16)] transition hover:bg-[#CFAE5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDBC69] focus-visible:ring-offset-2"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-[#DDBC69] hover:bg-[#F8F3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDBC69] focus-visible:ring-offset-2 md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-x-0 bottom-0 top-20 z-[60] md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 h-full w-full bg-slate-950/20 backdrop-blur-[1px]"
              aria-label="Close mobile navigation"
            />

            <div
              id="mobile-navigation"
              className="absolute right-3 top-3 max-h-[calc(100%-1.5rem)] w-[min(90vw,22rem)] overflow-y-auto rounded-2xl border border-[#DDBC69]/40 bg-[#FFFDF8] p-2.5 shadow-[0_14px_35px_rgba(15,23,42,0.18)] sm:right-4 sm:p-3"
            >
              <div className="space-y-1">
                {navItems.map(({ href, label }) => (
                  <React.Fragment key={label}>
                    {label === "About Dholera" && (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            setIsProjectsMenuOpen((current) => !current)
                          }
                          aria-expanded={isProjectsMenuOpen}
                          aria-haspopup="true"
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-black transition hover:bg-[#F8F3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDBC69]"
                        >
                          <span>Our Projects</span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              isProjectsMenuOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>

                        {isProjectsMenuOpen && (
                          <div className="mx-2 mb-1 rounded-xl border border-[#DDBC69]/35 bg-[#F8F3E7]/70 p-1">
                            {projectItems.map(
                              ({ label: projectLabel, tag, action, target }) => (
                                <button
                                  key={projectLabel}
                                  type="button"
                                  onClick={() =>
                                    handleProjectClick(action, target)
                                  }
                                  className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDBC69]"
                                >
                                  <span className="min-w-0 flex-1 text-sm font-semibold text-black">
                                    {projectLabel}
                                  </span>
                                  <ProjectTag tag={tag} />
                                </button>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleNavigation(href)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-base font-semibold text-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDBC69] ${
                        isProjectsMenuOpen
                          ? "hover:bg-transparent"
                          : "hover:bg-[#F8F3E7]"
                      }`}
                    >
                      {label}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}

      <PopupLeadForm
        type="scroll"
        project="Dholera-Smart-City-Navbar"
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        disableAutoTrigger
      />
    </nav>
  );
}
