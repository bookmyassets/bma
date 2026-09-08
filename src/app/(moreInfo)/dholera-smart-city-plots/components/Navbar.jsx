"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/assests/bma-with-background.svg";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GetinTouch from "./GetinTouch";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  
  const openContactForm = () => {
    setIsMenuOpen(false);
    setIsContactFormOpen(true);
  };

  const handleNavigation = (section) => {
    setIsMenuOpen(false);

    if (pathname === '/dholera-smart-city-plots') {
      const element = document.getElementById(section.replace('#', ''));
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      router.push(`/dholera-smart-city-plots${section}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation items
  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#dholera", label: "Dholera" },
    { href: "#westwyn-residency", label: "Westwyn Residency" },
    { href: "#why-bma", label: "Why BMA" },


  ];

  return (
    <nav className="bg-white h-20 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation("#hero")} 
            className="flex-shrink-0"
          >
            <Image
              src={logo}
              height={60}
              width={60}
              alt="Logo"
              className="cursor-pointer"
            />
          </button>

          {/* Desktop Navigation Links */}
          <div className="text-black hidden md:flex items-center gap-6">
            {navItems.map(({ href, label }) => (
              <button
                key={label}
                onClick={() => handleNavigation(href)}
                className="text-xl font-medium hover:text-[#e1b24c] transition duration-200"
              >
                {label}
              </button>
            ))}
            
            <button
              type="button"
              onClick={openContactForm}
              aria-haspopup="dialog"
              className="ml-auto px-3 py-2 text-xl text-black transition-colors hover:text-[#e1b24c]"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile menu section */}
          <div className="md:hidden flex items-center gap-4">
            <button
              type="button"
              onClick={openContactForm}
              aria-haspopup="dialog"
              className="px-3 py-2 text-xl font-semibold text-black"
            >
              Get in Touch
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 font-semibold">
              {navItems.map(({ href, label }) => (
                <button
                  key={label}
                  onClick={() => handleNavigation(href)}
                  className="text-black hover:text-[#e1b24c] transition duration-200 text-left px-4 py-2"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <GetinTouch
              title="Best Investment-Ready Locations in Dholera"
              buttonName="Get A Call Back"
              onClose={() => setIsContactFormOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
