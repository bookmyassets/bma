"use client";

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

import mapImage from "@/assests/homepage/hero2/test/westwyn-estates-dholera-google-maps-location.webp";

const brochureUrl =
  "https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf?dl=westwyn-estates-brochure.pdf";

const locations = [
  {
    id: "polarpur",
    title: "Polarpur, Dholera",
    subtitle: "Premium residential plot location",
    value: "Project Location",

    x: 31,
    y: 36,

    Icon: MapPinned,
    markerLabel: "WestWyn Estates",

    toneClass:
      "bg-[#10B981] text-white ring-[#34D399]",
  },

  {
    id: "highway",
    title: "State Highway 117 (150 ft Road)",
    value: "Direct Entry",

    x: 30,
    y: 46,

    Icon: Route,
    markerLabel: "Direct SH-117 Entry",

    toneClass:
      "bg-[#0EA5E9] text-white ring-[#38BDF8]",
  },

  {
    id: "railway",
    title: "Bhimnath Railway Junction",
    value: "5 Minutes",

    x: 21,
    y: 22,

    Icon: TrainFront,
    markerLabel: "Bhimnath Railway Junction",

    toneClass:
      "bg-[#3B82F6] text-white ring-[#60A5FA]",
  },

  {
    id: "boundary",
    title: "Dholera SIR Boundary",
    value: "15 Minutes",

    x: 77,
    y: 31,

    Icon: MapPinned,
    markerLabel: "Dholera SIR Boundary",

    toneClass:
      "bg-[#10B981] text-white ring-[#34D399]",
  },

  {
    id: "hospital",
    title: "RMS Multi-Specialty Hospital",
    value: "15 Minutes",

    x: 69,
    y: 54,

    Icon: Hospital,
    markerLabel: "RMS Hospital",

    toneClass:
      "bg-[#F43F5E] text-white ring-[#FB7185]",
  },

  {
    id: "expressway",
    title: "Ahmedabad Dholera Expressway",
    value: "18 Minutes",

    x: 82,
    y: 47,

    Icon: Milestone,
    markerLabel: "Ahmedabad Dholera Expressway",

    toneClass:
      "bg-[#F59E0B] text-white ring-[#FBBF24]",
  },

  {
    id: "semiconductor",
    title: "Tata Semiconductor Plant",
    value: "30 Minutes",

    x: 79,
    y: 70,

    Icon: Factory,
    markerLabel: "Tata Semiconductor Plant",

    toneClass:
      "bg-[#F97316] text-white ring-[#FB923C]",
  },

  {
    id: "airport",
    title: "Dholera International Airport",
    value: "45 Minutes",

    x: 88,
    y: 82,

    Icon: Plane,
    markerLabel: "Dholera International Airport",

    toneClass:
      "bg-[#06B6D4] text-white ring-[#22D3EE]",
  },

  {
    id: "facilities",
    title: "Nearby Public Facilities",
    subtitle:
      "Bus stand, school, hospital, shopping complex, park and food courts.",
    value: "Close By",

    x: 34,
    y: 62,

    Icon: Building2,
    markerLabel: "Nearby Public Facilities",

    toneClass:
      "bg-[#14B8A6] text-white ring-[#2DD4BF]",
  },

  {
    id: "industrial",
    title: "Industrial Proximity",
    subtitle:
      "Tata Semiconductor Plant, ReNew Solar Plant and Hebatpur Industrial Area.",
    value: "Well Connected",

    x: 74,
    y: 85,

    Icon: Factory,
    markerLabel: "Hebatpur Industrial Area",

    toneClass:
      "bg-[#D946EF] text-white ring-[#E879F9]",
  },
];

export default function WestWynAboutSection({
  surface = "base",
}) {
  return (
    <WestWynProjectAbout
      projectName="WestWyn Estates"
      overviewHeading="परिवार की सुरक्षा के लिए एक मजबूत कदम"
      surface={surface}
      overviewDescription={
        <>
          WestWyn Estates is a registry-ready residential plot
          project located on Dholera&apos;s widest road, with
          direct entry from the 150 ft State Highway 117. With
          clear documentation, strategic location and strong
          development potential, it offers a transparent buying
          experience and an opportunity to participate in
          Dholera&apos;s long-term growth.
        </>
      }
      locationHeading="Well Positioned for Future Habitation"
      mapImage={mapImage}
      mapAlt="WestWyn Estates location map near Polarpur and Dholera SIR"
      mapBadge="Strategic Location"
      locations={locations}
      brochureUrl={brochureUrl}
    />
  );
}
