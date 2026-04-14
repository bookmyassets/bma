"use client";
import Image from "next/image";
import React, { useState } from "react";
import img from "@/assests/residential/residency/Residency.webp";
import img2 from "@/assests/taboola/section/westwyn-residency-dholera-residential-plots-bookmyassets.webp";
import {
  FaMapMarkerAlt,
  FaRoad,
  FaTrain,
  FaIndustry,
  FaPlane,
  FaClock,
  FaLocation,
  FaLocationArrow
} from "react-icons/fa";

import icon1 from "@/assests/taboola/Amenities/app-based-society-management.svg";
import icon2 from "@/assests/taboola/Amenities/boundary-wall.svg";
import icon3 from "@/assests/taboola/Amenities/cctv-security.svg";
import icon4 from "@/assests/taboola/Amenities/clubhouse-lite.svg";
import icon5 from "@/assests/taboola/Amenities/daily-essentials-store.svg";
import icon6 from "@/assests/taboola/Amenities/drainage-system.svg";
import icon7 from "@/assests/taboola/Amenities/ev-charging-station.svg";
import icon8 from "@/assests/taboola/Amenities/gated-community.svg";
import icon9 from "@/assests/taboola/Amenities/internal-roads.svg";
import icon10 from "@/assests/taboola/Amenities/jogging-track.svg";
import icon11 from "@/assests/taboola/Amenities/kids-play-area.svg";
import icon12 from "@/assests/taboola/Amenities/power-and-water-supply.svg";
import icon13 from "@/assests/taboola/Amenities/senior-citizen-zone.svg";
import icon14 from "@/assests/taboola/Amenities/yoga-deck.svg";
import { MapPin } from "lucide-react";

const carouselImages = [
  { src: img, alt: "WestWyn Estates - Kids Play Area" },
  { src: img2, alt: "WestWyn Estates - Project Boundary" },
];

const amenities = [
  {
    icon: icon2,
    title: "Signature Project Boundary",
  },
  {
    icon: icon8,
    title: "Controlled Access Gated Community",
  },
  {
    icon: icon9,
    title: "Wide Internal Road Network",
  },
  {
    icon: icon3,
    title: "24/7 Security & CCTV Surveillance",
  },
  {
    icon: icon1,
    title: "App-Based Society Management",
  },
  {
    icon: icon6,
    title: "Drainage System",
  },
  {
    icon: icon12,
    title: "Power & Water Supply",
  },
  {
    icon: icon7,
    title: "EV Charging Station",
  },
  
  {
    icon: icon4,
    title: "Clubhouse Lite",
  },
  {
    icon: icon14,
    title: "Yoga Deck",
  },
  {
    icon: icon10,
    title: "Jogging Track",
  },
  {
    icon: icon13,
    title: "Senior Citizen Zone",
  },
  {
    icon: icon11,
    title: "Kids Play Area",
  },
  {
    icon: icon5,
    title: "Daily Essentials & Utilities Store",
  },
];

const points = [
  {
    icon: MapPin,
    text: "Location : Pipariya, Dholera",
  },
  {
    icon: FaLocationArrow,
    text: "Direct entry from Major District Road (MDR)",
  },
  { icon: FaTrain, text: "2 mins from Railway Connectivity" },
  { icon: FaClock, text: "5 mins from Dholera SIR boundary" },
  { icon: FaRoad, text: "12 mins from Ahmedabad-Dholera Expressway" },
  {
    icon: FaIndustry,
    text: "22 mins from Tata Semiconductor Plant & Industrial Zones",
  },
  { icon: FaPlane, text: "30 mins from Dholera International Airport" },
];

const projectFeatures = [
  { icon: "🏗️", title: "Project Type", value: "Residential" },
  {
    icon: "🌏",
    title: "Land Parcel",
    value: "40,000 Sq.Yd",
  },
  {
    icon: "📍",
    title: "Total Units",
    value: "290 Plots",
  },
  { icon: "🏠", title: "Plot Sizes", value: "124 Sq.Yd Onwards" },
  { icon: "💰", title: "Price", value: "₹6,500*/Sq.Yd" },
];

const FeatureCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl p-3 md:p-4 border hover:bg-[#deae3c] group border-gray-200 text-center transition-colors duration-300 ease-in-out">
    
    <h4 className="group-hover:text-white font-semibold text-gray-900 text-xs md:text-sm mb-1 transition-all duration-300 ease-in-out">
      {title}
    </h4>
    <p className="group-hover:text-white text-[#151f28] font-bold text-base md:text-lg transition-all duration-300 ease-in-out">
      {value}
    </p>
  </div>
);

export default function Residency() {
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);
  const next = () => setCurrent((c) => (c + 1) % carouselImages.length);

  return (
    <div className="bg-white py-[calc(0.5rem+1.5vw)]" id="westwyn-residency">
      <div className="max-w-7xl mx-auto text-center  px-[calc(1rem+2vw)]">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-black">
          WestWyn Residency : Residential Plots in Dholera
        </h2>
        <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-[#deae3c] font-semibold leading-relaxed">
          Govt. Approved | Immediate Possession | Starting from ₹8 Lakh
        </p>
      </div>

      {/* Main two-column layout */}
      <div className="max-w-7xl mx-auto py-4">
        <div className="grid md:grid-cols-2 py-4 max-sm:space-y-4">
          <div className="relative px-4 sm:px-6 lg:px-8 aspect-[5/5] w-full h-full group">
            {/* Original image — style completely unchanged */}
            <Image
              src={carouselImages[current].src}
              alt={carouselImages[current].alt}
              className="rounded-xl w-full aspect-[5/6] h-full overflow-hidden object-cover max-sm:object-cover"
              priority
            />

            {/* Prev button */}
            <button
              onClick={prev}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30
               w-8 h-8 sm:w-10 sm:h-10
               bg-white/80 hover:bg-white
               rounded-full shadow-lg
               flex items-center justify-center
               transition-all duration-200 hover:scale-110
               opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg
                className="w-4 h-4 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={next}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30
               w-8 h-8 sm:w-10 sm:h-10
               bg-white/80 hover:bg-white
               rounded-full shadow-lg
               flex items-center justify-center
               transition-all duration-200 hover:scale-110
               opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg
                className="w-4 h-4 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {carouselImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-6 h-2 bg-[#deae3c]"
                      : "w-2 h-2 bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="p-2 space-y-2">
            {/* <p className="text-lg md:text-2xl font-semibold ">
              Project Overview
            </p> */}
            <p className="text-base md:text-lg">
              WestWyn Residency by BookMyAssets offers registry-ready
              residential plots in Pipariya, Dholera. With direct entry from
              Major District Road and 5 minute proximity to the SIR boundary.
            </p>
            {/* <p className="text-lg md:text-2xl font-semibold ">
              Location Advantage With WestWyn Residency
            </p> */}
            <p className="text-base md:text-lg space-y-4">
              {points.map((point, i) => {
                const Icon = point.icon;
                return (
                  <span
                    key={i}
                    className="flex items-center justify-start gap-2 bg-white rounded-xl p-[clamp(0.25rem,1vw,0.75rem)] shadow-sm hover:border-[#deae3c] hover:shadow-md transition-all duration-200"
                  >
                    <span className="w-12 h-12 rounded-lg bg-[#deae3c]/10 flex items-center justify-center shrink-0">
                      <Icon className="text-[#deae3c] text-base w-5 h-5" />
                    </span>
                    <span className="text-[clamp(1rem,2vw,0.875rem)] font-semibold text-gray-800 leading-snug">
                      {point.text}
                    </span>
                  </span>
                );
              })}
            </p>
          </div>
          {/* <div className="grid grid-rows-7 gap-3">
            
          </div> */}
        </div>
      </div>

      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {projectFeatures.map((item, index) => {
              const isLastOdd =
                index === projectFeatures.length - 1 &&
                projectFeatures.length % 2 !== 0;
              return (
                <div
                  key={index}
                  className={isLastOdd ? "col-span-2 md:col-span-1" : ""}
                >
                  <FeatureCard
                    icon={item.icon}
                    title={item.title}
                    value={item.value}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-4">
        <h2 className="text-xl md:text-4xl text-center font-bold text-black mb-8">
          Amenities
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="bg-[#deae3c]/5 backdrop-blur-sm rounded-lg p-4 text-center border border-[#deae3c]/30 hover:bg-[#deae3c]/5 transition-all duration-300"
            >
              <div className="text-xl md:text-4xl mb-2 flex items-center justify-center">
                <Image
                  src={amenity.icon}
                  alt={amenity.title}
                  width={48}
                  height={48}
                  className=""
                />
              </div>
              <p className="text-black font-medium text-lg">{amenity.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
