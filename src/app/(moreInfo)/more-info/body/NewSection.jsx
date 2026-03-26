import React, { useState } from "react";
import img1 from "@/assests/ad-page/ad-img-test.png";
import img2 from "@/assests/ad-page/ad-img-test.png";
import img3 from "@/assests/ad-page/ad-img-test.png";
import Image from "next/image";
import {
  Fence, Building2, Cctv, Baby, Car, Users,
  Zap, Leaf, PersonStanding, MapPin, Factory, Plane, Clock,
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
          {(sections[activeSection].title === "Amenities" ? essentials : location).map(
            ({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={24} strokeWidth={1.5} className="text-black shrink-0" />
                <span className="text-sm font-medium text-gray-800">{label}</span>
              </div>
            )
          )}
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
              i === activeSection ? "w-16 bg-gray-900" : "w-8 bg-gray-300 hover:bg-gray-400"
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

  const sections = [
    {
      title: "About WestWyn Estate",
      content: `WestWyn Estates is a well-located residential plot in Polarpur, Dholera...`,
      image: img1,
    },
    { title: "Amenities", content: essentials, image: img2 },
    { title: "Location Advantage", content: location, image: img3 },
  ];

  // ✅ Project 2 can have its own different sections/data
  const sections2 = [
    {
      title: "About WestWyn Estate",
      content: `Project 2 description goes here...`,
      image: img1,
    },
    { title: "Amenities", content: essentials, image: img2 },
    { title: "Location Advantage", content: location, image: img3 },
  ];

  return (
    <div className="w-full bg-white" id="westwyn-estate">
      {/* Desktop: Two independent project columns */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 max-w-7xl mx-auto px-8 py-12">
        <ProjectCard
          projectName="WestWyn Estate"
          sections={sections}
          essentials={essentials}
          location={location}
        />
        <ProjectCard
          projectName="WestWyn Estate"   
          sections={sections2}
          essentials={essentials}
          location={location}
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
          projectName="WestWyn Estate"
          sections={sections2}
          essentials={essentials}
          location={location}
        />
      </div>
    </div>
  );
}