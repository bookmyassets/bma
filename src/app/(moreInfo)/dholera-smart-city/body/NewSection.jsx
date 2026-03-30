import React, { useState } from "react";
import img1a from "@/assests/ad-page/westwyn-residency-dholera-society-gate.webp";
import img1b from "@/assests/ad-page/amenities-residency.webp";
import img1c from "@/assests/ad-page/residency-map.webp";
import img2a from "@/assests/ad-page/westwyn-estates-dholera-society-gate.webp";
import img2b from "@/assests/ad-page/clubhouse-lite-westwyn-estates-dholera-landing-page.webp";
import img2c from "@/assests/ad-page/estates-map.webp";
//import img1b from "@/assests/ad-page/westwyn-estates-dholera-society-gate.webp";

import Image from "next/image";
import {
  Fence,
  Building2,
  Cctv,
  Baby,
  Car,
  Users,
  Zap,
  Leaf,
  PersonStanding,
  MapPin,
  Factory,
  Plane,
  Clock,
} from "lucide-react";
import { FaRoad } from "react-icons/fa6";
import { GiRailway, GiRoad } from "react-icons/gi";

// ✅ Extracted reusable component — each instance has its OWN state
function ProjectCard({ projectName, sections, essentials, location }) {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center">
          <span className="text-[#deae3c]">{projectName}</span>
        </h2>
      </div>

      {/* Image */}
      <div className="rounded-lg shadow-xl overflow-hidden mb-6">
        <Image
          src={sections[activeSection].image}
          alt={sections[activeSection].title}
          className="w-full object-cover"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        {sections.map((section, index) => (
          <button
            key={section.title}
            onClick={() => setActiveSection(index)}
            className={`pb-3 px-6 font-semibold transition-all relative ${
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

      {/* Content */}
      <h3 className="text-xl font-bold text-black mb-4">
        {sections[activeSection].title}
      </h3>

      {sections[activeSection].title === "Amenities" ||
      sections[activeSection].title === "Location Advantage" ? (
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {(sections[activeSection].title === "Amenities"
            ? essentials
            : location
          ).map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon
                size={24}
                strokeWidth={1.5}
                className="text-black shrink-0"
              />
              <span className="text-sm font-medium text-gray-800">{label}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
          {sections[activeSection].content}
        </p>
      )}

      {/* Dot Indicators */}
      <div className="flex gap-2 mt-8">
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
  );
}

export default function WestWyn() {
  const essentials = [
    { label: "Project Boundary", icon: Fence },
    { label: "Gated Community", icon: Building2 },
    { label: "Internal Roads", icon: FaRoad },
    { label: "24/7 Security & CCTV", icon: Cctv },
    { label: "Kids Play Area", icon: Baby },
    { label: "EV Charging Station", icon: Car },
    { label: "App-Based Society Management", icon: Users },
    { label: "Power & Water Supply", icon: Zap },
    { label: "Yoga Deck", icon: Leaf },
    { label: "Senior Citizen Zone", icon: PersonStanding },
  ];

  const location = [
    { label: "Located on SH-117 in Polarpur, Dholera", icon: MapPin },
    { label: "5 minutes from Bhimnath Railway Station", icon: GiRailway },
    { label: "15 minutes from Dholera SIR boundary", icon: Clock },
    { label: "17 minutes from Ahmedabad–Dholera Expressway", icon: GiRoad },
    { label: "30 minutes from Tata Semiconductor Plant", icon: Factory },
    { label: "45 minutes from Dholera International Airport", icon: Plane },
  ];

  const location2 = [
    { label: "Located on Major District Road (MDR) in Pipariya, Dholera", icon: MapPin },
    { label: "2 minutes from Railway Station", icon: GiRailway },
    { label: "5 minutes from Dholera SIR boundary", icon: Clock },
    { label: "12 minutes from Ahmedabad Dholera Expressway", icon: GiRoad },
    { label: "22 minutes from Tata Semiconductor Plant", icon: Factory },
    { label: "30 minutes from Dholera International Airport", icon: Plane },
  ];

  const sections = [
    {
      title: "WestWyn Estate",
      content: `WestWyn Estates brings a refined residential plotted experience in the evolving landscape of Dholera. Developed by BookMyAssets, this premium community is designed for those who value planning, connectivity, and long-term clarity. Strategically located on State Highway-117 and close to Bhimnath Railway Station and the Dholera SIR boundary.
`,
      image: img2a,
    },
    { title: "Amenities", content: essentials, image: img2b },
    { title: "Location Advantage", content: location, image: img2c },
  ];

  // ✅ Project 2 can have its own different sections/data
  const sections2 = [
    {
      title: "WestWyn Residency",
      content: `WestWyn Residency is a well-planned residential plot project in Pipariya, Dholera by BookMyAssets. It offers Direct entry from Major District Road (MDR) and just 5 min from SIR Boundary. The project is designed as a gated community, giving you a peaceful and secure environment. It is a good option for buyers who want a clear, simple, and practical investment.`,
      image: img1a,
    },
    { title: "Amenities", content: essentials, image: img1b },
    { title: "Location Advantage", content: location2, image: img1c },
  ];

  return (
    <div className="w-full bg-white" id="westwyn-estates">
      {/* Desktop: Two independent project columns */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 max-w-7xl mx-auto px-8 py-12">
        <ProjectCard
          projectName="WestWyn Estate"
          sections={sections}
          essentials={essentials}
          location={location}
        />
        <ProjectCard
          projectName="WestWyn Residency"
          sections={sections2}
          essentials={essentials}
          location={location2}
        />
      </div>

      {/* Mobile: stacked */}
      <div className="lg:hidden px-4 py-8 space-y-12">
        <ProjectCard
          projectName="WestWyn Estate"
          sections={sections}
          essentials={essentials}
          location={location}
        />
        <ProjectCard
          projectName="WestWyn Residency"
          sections={sections2}
          essentials={essentials}
          location={location2}
        />
      </div>
    </div>
  );
}
