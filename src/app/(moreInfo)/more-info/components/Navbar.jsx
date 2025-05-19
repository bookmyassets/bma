"use client";
import React, { useState } from 'react';
import logo from '@/assests/Bmalogo.png';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-black text-[#e1b24c] fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex-shrink-0">
            <Image
              src={logo}
              height={60}
              width={60}
              alt="Logo"
              className="cursor-pointer"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-lg font-semibold">
            <a href="#hero" className="hover:text-white transition duration-200">Home</a>
            <a href="#about" className="hover:text-white transition duration-200">About</a>
            <a href="#WhyInvest" className="hover:text-white transition duration-200">Why Invest</a>
            <a href="#WhyDholera" className="hover:text-white transition duration-200">Why Dholera</a>
            <a href="#westwyn-county" className="hover:text-white transition duration-200">Westwyn County</a>
            <a href="#gallery" className="hover:text-white transition duration-200">Gallery</a>
            <a href="#Faqs" className="hover:text-white transition duration-200">FAQ</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#e1b24c] hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4 font-semibold">
              {[
                { href: '#hero', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#WhyInvest', label: 'Why Invest' },
                { href: '#WhyDholera', label: 'Why Dholera' },
                { href: '#westwyn-county', label: 'Westwyn County' },
                { href: '#gallery', label: 'Gallery' },
                { href: '#Faqs', label: 'FAQ' },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={handleScrollClick}
                  className="hover:text-white transition duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
