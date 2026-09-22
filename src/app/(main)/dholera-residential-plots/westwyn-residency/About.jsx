"use client";

import Link from "next/link";

import {
  Building2,
  Factory,
  Hospital,
  MapPinned,
  Milestone,
  Plane,
  Route,
  TrainFront,
} from "lucide-react";

import WestWynProjectAbout from "../components/westwyn/WestwynProjectAbout";

import mapImage from "@/assests/residential/residency/Residency.webp";

const brochureUrl =
  "https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf";

const locations = [
  {
    id: "mdr",
    title: "Direct Entry from Major District Road (MDR)",
    value: "Direct Access",
    x: 18,
    y: 70,
    Icon: Route,
    markerLabel: "Direct MDR Entry",
    toneClass:
      "bg-[#0EA5E9] text-white ring-[#38BDF8]",
  },

  {
    id: "dfc",
    title: "Dedicated Freight Corridor (DFC)",
    value: "2 Minutes",
    x: 39,
    y: 38,
    Icon: TrainFront,
    markerLabel: "Dedicated Freight Corridor",
    toneClass:
      "bg-[#8B5CF6] text-white ring-[#A78BFA]",
  },

  {
    id: "railway",
    title: "Railway Connectivity",
    value: "2 Minutes",
    x: 32,
    y: 56,
    Icon: TrainFront,
    markerLabel: "Railway Connectivity",
    toneClass:
      "bg-[#3B82F6] text-white ring-[#60A5FA]",
  },

  {
    id: "boundary",
    title: "Dholera SIR Boundary",
    value: "5 Minutes",
    x: 58,
    y: 22,
    Icon: MapPinned,
    markerLabel: "Dholera SIR Boundary",
    toneClass:
      "bg-[#10B981] text-white ring-[#34D399]",
  },

  {
    id: "expressway",
    title: "Ahmedabad Dholera Expressway",
    value: "12 Minutes",
    x: 75,
    y: 51,
    Icon: Milestone,
    markerLabel: "Ahmedabad Dholera Expressway",
    toneClass:
      "bg-[#F59E0B] text-white ring-[#FBBF24]",
  },

  {
    id: "hospital",
    title: "RMS Multi-Specialty Hospital",
    value: "17 Minutes",
    x: 70,
    y: 76,
    Icon: Hospital,
    markerLabel: "RMS Hospital",
    toneClass:
      "bg-[#F43F5E] text-white ring-[#FB7185]",
  },

  {
    id: "semiconductor",
    title: "Tata Semiconductor Plant",
    value: "22 Minutes",
    x: 84,
    y: 28,
    Icon: Factory,
    markerLabel: "Tata Semiconductor Plant",
    toneClass:
      "bg-[#F97316] text-white ring-[#FB923C]",
  },

  {
    id: "airport",
    title: "Dholera International Airport",
    value: "30 Minutes",
    x: 88,
    y: 87,
    Icon: Plane,
    markerLabel: "Dholera International Airport",
    toneClass:
      "bg-[#06B6D4] text-white ring-[#22D3EE]",
  },

  {
    id: "facilities",
    title: "Nearby Public Facilities",
    subtitle:
      "Bus stand, school, hospital, shopping complex, park, food courts.",
    value: "Close By",
    x: 48,
    y: 76,
    Icon: Building2,
    markerLabel: "Nearby Public Facilities",
    toneClass:
      "bg-[#14B8A6] text-white ring-[#2DD4BF]",
  },

  {
    id: "industrial",
    title: "Industrial Proximity",
    subtitle:
      "Tata Semiconductor Plant & Hebatpur Industrial Area",
    value: "Just 25 Minutes",
    x: 65,
    y: 38,
    Icon: Factory,
    markerLabel: "Industrial Proximity",
    toneClass:
      "bg-[#D946EF] text-white ring-[#E879F9]",
  },
];

export default function WestWynAboutSection({
  surface = "base",
}) {
  return (
    <WestWynProjectAbout
      projectName="WestWyn Residency"
      surface={surface}
      overviewHeading="परिवार की सुरक्षा के लिए एक मजबूत कदम"
      overviewDescription={
        <>
          WestWyn Residency is a{" "}
          <span className="font-medium text-white">
            40,000 sq. yard residential plot project
          </span>{" "}
          in Pipariya developed by BookMyAssets. Located on a
          Major District Road in Dholera, the project is just
          1.5 km from the{" "}
          <Link
            href="https://www.bookmyassets.com/dholera-sir-blogs/dedicated-freight-corridor-dholera-delhi-mumbai-connectivity"
            className="
              font-medium
              text-[#DDBC69]
              underline
              decoration-[#DDBC69]/35
              underline-offset-4

              transition-colors

              hover:text-[#E8CB83]
            "
          >
            Dedicated Freight Corridor
          </Link>{" "}
          and close to Bhimnath Railway Junction, with convenient
          access to daily public facilities and transport.
        </>
      }
      locationHeading="Well Positioned for Future Habitation"
      mapImage={mapImage}
      mapAlt="WestWyn Residency location map near Pipariya, Dholera"
      mapBadge="Strategic Location"
      locations={locations}
      brochureUrl={brochureUrl}
    />
  );
}