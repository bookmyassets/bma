import React, { useState } from "react";
import img1 from "@/assests/ad-page/estate/westwyn-estate-dholera-residential-plots-1.webp";
import img2 from "@/assests/ad-page/estate/westwyn-estate-dholera-amenities.webp";
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
      content: `WestWyn Estate is strategically positioned at the epicenter of Dholera’s rapid transformation, located directly at the SIR boundary. This project offers unmatched proximity to major infrastructure milestones, making it one of the most accessible residential plot developments in the region.

      This is not just about buying land. It is about securing a location that combines prime connectivity, immediate possession with registry, verified legal documentation, and an accessible entry point aligned with prevailing Dholera Smart City Plot Price expectations.

      `,
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
            <h2 className="text-3xl font-bold text-center text-black mb-4">
              <span className="text-[#deae3c]">WestWyn Estate</span> -
              Investment Goldmine of Dholera
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
                    ? "text-[#deae3c]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {section.title}
                {activeSection === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#deae3c]" />
                )}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="sticky top-8">
              <div className="rounded-lg overflow-hidden shadow-xl max-w-[800px]">
                <Image
                  src={sections[activeSection].image}
                  alt={sections[activeSection].title}
                  className="w-full h-auto object-contain max-h-[600px]"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="py-8">
              <h2 className="text-xl font-bold text-black mb-6">
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
                <p className=" text-gray-700 leading-relaxed whitespace-pre-line">
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
            <h2 className="text-xl md:text-3xl text-center font-bold text-[#deae3c] mb-2">
              WestWyn Estate
            </h2>
          </div>

          {/* Tab Navigation */}

          {/* Image */}
          <div className="mb-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={sections[activeSection].image}
                alt={sections[activeSection].title}
                className="w-full h-auto object-contain max-h-[500px]"
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
                    ? "bg-black text-[#deae3c]"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            <h2 className=" text-lg md:text-xl font-bold text-black mb-4">
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
              <p className=" text-gray-700 leading-relaxed whitespace-pre-line">
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
