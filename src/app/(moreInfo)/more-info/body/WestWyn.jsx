import React, { useState } from "react";
import img1 from "@/assests/ad-page/estate/westwyn-estate-dholera-residential-plots-1.webp";
import img2 from "@/assests/ad-page/estate/westwyn-estate-dholera-residential-plots-2.webp";
import img3 from "@/assests/ad-page/estate/westwyn-estate-dholera-smart-city-map.webp";
import Image from "next/image";
import {
  Fence,
  Building2,
  Road,
  Cctv,
  Baby,
  Car,
  Users,
  Droplets,
  Zap,
  Leaf,
  Footprints,
  PersonStanding,
} from "lucide-react";

import { MapPin, Route, Factory, Plane, Clock } from "lucide-react";

import { FaRoad } from "react-icons/fa6";

export default function WestWyn() {
  const [activeSection, setActiveSection] = useState(0);

  const essentials = [
    { label: "Project Boundary", icon: Fence },
    { label: "Gated Community", icon: Building2 },
    { label: "Internal Roads", icon: FaRoad },
    { label: "24/7 Security & CCTV", icon: Cctv },
    { label: "Kids Play Area", icon: Baby }, // FIXED
    { label: "EV Charging Station", icon: Car },
    { label: "App-Based Society Management", icon: Users },
    { label: "Power & Water Supply", icon: Zap },
    { label: "Yoga Deck", icon: Leaf },
    { label: "Senior Citizen Zone", icon: PersonStanding }, // SAFE
  ];
  const location = [
    {
      label: "0 km from Dholera SIR Boundary",
      icon: MapPin,
    },
    {
      label: "5 Minutes from Dholera–Ahmedabad Expressway",
      icon: Route,
    },
    {
      label: "20 Minutes from Activation Area",
      icon: Clock,
    },
    {
      label: "20 Minutes from Tata Semiconductor Plant",
      icon: Factory,
    },
    {
      label: "30 Minutes from Dholera International Airport",
      icon: Plane,
    },
  ];

  const sections = [
    {
      title: "About WestWyn Estate",
      content: `WestWyn Estate is strategically positioned at the epicenter of Dholera's rapid transformation: 0 kilometers from the SIR boundary, offering unmatched proximity to every major infrastructure milestone.

This is not just about buying land. It is about securing the only location in Dholera that delivers all four critical advantages: prime connectivity to industrial and infrastructure projects, immediate possession and registry, verified legal documentation, and accessible entry below ₹10 lakh.

While other projects force you to choose between location, affordability or instant ownership, WestWyn Estate is the only project offering the complete package. AUDA-approved plots with clear titles, ready for immediate registry, positioned at Dholera's most connected intersection, with high appreciation potential at an entry point most investors can access.

This is your opportunity to own premium land at Dholera's industrial core before production begins and demand surges.`,
      image: img1,
    },
    {
      title: "Amenities",
      content: essentials,
      image: img2,
    },
    {
      title: "Location Advantage",
      content: location,
      image: img3,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white" id="westwyn-estate">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-center text-black mb-4">
              WestWyn Estate - Investment Goldmine of Dholera
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-12 border-b border-gray-200">
            {sections.map((section, index) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(index)}
                className={`pb-4 px-6 font-semibold transition-all relative ${
                  activeSection === index
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {section.title}
                {activeSection === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="sticky top-8">
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={sections[activeSection].image}
                  alt={sections[activeSection].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="py-8">
              <h2 className="text-4xl font-bold text-black mb-6">
                {sections[activeSection].title}
              </h2>
              {sections[activeSection].title === "Amenities" ||
              sections[activeSection].title === "Location Advantage" ? (
                <div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-6">
                  {(sections[activeSection].title === "Amenities"
                    ? essentials
                    : location
                  ).map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-4">
                      <Icon
                        size={28}
                        strokeWidth={1.5}
                        className="text-black"
                      />
                      <span className="text-lg font-medium text-gray-800">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                  {sections[activeSection].content}
                </p>
              )}

              {/* Section Indicators */}
              <div className="flex gap-3 mt-12">
                {sections.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSection(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeSection
                        ? "w-16 bg-gray-900"
                        : "w-8 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl text-center font-bold text-black mb-2">
              WestWyn Estate
            </h1>
          </div>

          {/* Tab Navigation */}

          {/* Image */}
          <div className="mb-6">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={sections[activeSection].image}
                alt={sections[activeSection].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {sections.map((section, index) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(index)}
                className={`px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeSection === index
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">
              {sections[activeSection].title}
            </h2>
            {sections[activeSection].title === "Amenities" ||
            sections[activeSection].title === "Location Advantage" ? (
              <div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-6">
                {(sections[activeSection].title === "Amenities"
                  ? essentials
                  : location
                ).map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-4">
                    <Icon size={28} strokeWidth={1.5} className="text-black" />
                    <span className="text-lg font-medium text-gray-800">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                {sections[activeSection].content}
              </p>
            )}

            {/* Section Indicators */}
            <div className="flex gap-2 justify-center">
              {sections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSection(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeSection ? "w-12 bg-gray-900" : "w-6 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
