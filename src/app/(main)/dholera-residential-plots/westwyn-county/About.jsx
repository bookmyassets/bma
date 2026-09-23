"use client";

import {
  Building2,
  Factory,
  Landmark,
  MapPinned,
  Milestone,
  Plane,
  Route,
} from "lucide-react";

import WestWynProjectAbout from "../components/westwyn/WestwynProjectAbout";

import mapImage from "@/assests/westwyn-county/westwyn-county-map-by-bookmyassets.webp";

const brochureUrl =
  "https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf?dl=westwyn-estates-brochure.pdf";

const locations = [
  {
    id: "project-location",
    title: "Fedra-Pipli Highway (SH-40)",
    subtitle: "WestWyn County project location",
    value: "Project Location",
    x: 27,
    y: 46,
    Icon: MapPinned,
    markerLabel: "WestWyn County",
    toneClass: "bg-[#10B981] text-white ring-[#34D399]",
  },

  {
    id: "highway",
    title: "Fedra-Pipli Highway (SH-40)",
    value: "Direct Entry / Exit",
    x: 35,
    y: 58,
    Icon: Route,
    markerLabel: "Fedra-Pipli Highway",
    toneClass: "bg-[#0EA5E9] text-white ring-[#38BDF8]",
  },

  {
    id: "gallops",
    title: "Gallops",
    subtitle: "Located close to the project",
    value: "Walking Distance",
    x: 39,
    y: 37,
    Icon: Building2,
    markerLabel: "Gallops",
    toneClass: "bg-[#8B5CF6] text-white ring-[#A78BFA]",
  },

  {
    id: "hotel",
    title: "Gujarat's Largest Hotel",
    value: "2 Minutes",
    x: 47,
    y: 29,
    Icon: Building2,
    markerLabel: "Nearby Hotel",
    toneClass: "bg-[#D946EF] text-white ring-[#E879F9]",
  },

  {
    id: "kamiyala-temple",
    title: "Kamiyala Temple",
    value: "10 Minutes",
    x: 56,
    y: 40,
    Icon: Landmark,
    markerLabel: "Kamiyala Temple",
    toneClass: "bg-[#F97316] text-white ring-[#FB923C]",
  },

  {
    id: "expressway",
    title: "Ahmedabad-Dholera Expressway",
    value: "10 Minutes",
    x: 67,
    y: 51,
    Icon: Milestone,
    markerLabel: "Ahmedabad-Dholera Expressway",
    toneClass: "bg-[#F59E0B] text-white ring-[#FBBF24]",
  },

  {
    id: "sir-boundary",
    title: "Dholera SIR Boundary",
    value: "15 Minutes",
    x: 72,
    y: 31,
    Icon: MapPinned,
    markerLabel: "Dholera SIR Boundary",
    toneClass: "bg-[#10B981] text-white ring-[#34D399]",
  },

  {
    id: "airport",
    title: "Dholera International Airport",
    value: "15 Minutes",
    x: 82,
    y: 65,
    Icon: Plane,
    markerLabel: "Dholera International Airport",
    toneClass: "bg-[#06B6D4] text-white ring-[#22D3EE]",
  },

  {
    id: "semiconductor",
    title: "Tata Semiconductor Plant",
    value: "25 Minutes",
    x: 84,
    y: 28,
    Icon: Factory,
    markerLabel: "Tata Semiconductor Plant",
    toneClass: "bg-[#F43F5E] text-white ring-[#FB7185]",
  },
];

export default function WestWynAboutSection({ surface = "base" }) {
  return (
    <WestWynProjectAbout
      projectName="WestWyn County"
      overviewHeading="परिवार की सुरक्षा के लिए एक मजबूत कदम"
      surface={surface}
      overviewDescription={
        <>
          WestWyn County, located on the Fedra-Pipli State Highway, is one of
          BookMyAssets&apos;s successfully sold-out residential plot projects in
          Dholera. Due to high demand, we are now offering verified resale plots
          in WestWyn County. If you missed the original launch, this is your
          chance to own a plot in one of Dholera&apos;s most trusted residential
          projects.
        </>
      }
      locationHeading="Well Positioned for Future Habitation"
      mapImage={mapImage}
      mapAlt="WestWyn County location map near Dholera"
      mapBadge="Strategic Location"
      locations={locations}
      brochureUrl={brochureUrl}
    />
  );
}
