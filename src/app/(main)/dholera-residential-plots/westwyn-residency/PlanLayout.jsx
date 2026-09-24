"use client";

import {
  FaFileLines,
  FaIndianRupeeSign,
  FaKey,
  FaLayerGroup,
  FaLocationDot,
  FaRoad,
  FaRulerCombined,
  FaUser,
  FaUsers,
} from "react-icons/fa6";

import WestWynPlanLayout from "../components/westwyn/WestwynPlanLayout";

import LivePlotPlan from "./LivePlotPlan";

const overviewCards = [
  {
    title: "Land Parcel",
    value: "8.26 Acres",
    secondaryValue: "40,000 sq. yards",
    icon: FaLayerGroup,
  },
  {
    title: "Location",
    value: "Pipariya",
    icon: FaLocationDot,
  },
  {
    title: "Plot Sizes",
    value: "124, 152 & 187 sq. yards",
    icon: FaRulerCombined,
  },
  {
    title: "Plot Price",
    value: "₹8,000 / sq. Yard",
    icon: FaIndianRupeeSign,
  },
  {
    title: "Prime Connectivity",
    value: "Entry from Major District Road (MDR)",
    icon: FaRoad,
  },
  {
    title: "Total Units",
    value: "290 exclusive plots",
    icon: FaUsers,
  },
  {
    title: "Development",
    value: "Inhouse",
    icon: FaUser,
  },
];

const documentation = [
  {
    title: "Documentation",
    values: [
      "Non-Agricultural Land / No Objection Certificate",
      "Plan Pass Approved",
    ],
    icon: FaFileLines,
  },
  {
    title: "Possession",
    values: ["Immediate"],
    icon: FaKey,
  },
];

const brochureUrl =
  "https://drive.google.com/uc?export=download&id=1tkK2ChBBTtOR5IY31tggzxnnx9djRUlG";

export default function PlanLayout({surface="alt"}) {
  return (
    <WestWynPlanLayout
      surface={surface}
      projectName="WestWyn Residency"
      overviewCards={overviewCards}
      location={{
        name: "Pipariya",
        description: [
          "The project is strategically located in Pipariya.",
          "The development enjoys direct entry from the Major District Road (MDR), providing smooth connectivity to surrounding areas.",
        ],
        mapUrl:
          "https://maps.app.goo.gl/cokFB3ntW2a66ntD7",
      }}
      documentation={documentation}
      brochureUrl={brochureUrl}
      masterPlan={<LivePlotPlan />}
    />
  );
}
