"use client";

import {
  FaBuilding,
  FaFileCircleCheck,
  FaIndianRupeeSign,
  FaLayerGroup,
  FaLocationDot,
  FaMoneyCheckDollar,
  FaRulerCombined,
  FaUser,
  FaUsers,
} from "react-icons/fa6";

import WestWynPlanLayout from "../components/westwyn/WestwynPlanLayout";

import LivePlotPlan from "./LivePlotPlan";

const overviewCards = [
  {
    title: "Land Parcel",
    value: "4.45 Acres",
    secondaryValue: "21,500 sq. yards",
    icon: FaLayerGroup,
  },
  {
    title: "Location",
    value: "Polarpur",
    icon: FaLocationDot,
  },
  {
    title: "Plot Sizes",
    value: "147–250 sq. yards",
    icon: FaRulerCombined,
  },
  {
    title: "Total Units",
    value: "129 exclusive plots",
    icon: FaUsers,
  },
  {
    title: "Development Status",
    value: "Nearing Completion",
    icon: FaBuilding,
  },
  {
    title: "Resale Price",
    value: "₹8,500 / sq. Yard",
    icon: FaIndianRupeeSign,
  },
  {
    title: "Payment Plan",
    value: "Full Payment within 15 Days",
    icon: FaMoneyCheckDollar,
  },
  {
    title: "Developer",
    value: "BookMyAssets",
    icon: FaUser,
  },
];

const documentation = [
  {
    title: "Land Documentation",
    values: [
      "Non-Agricultural Land / No Objection Certificate",
      "Title Clear",
      "Plan Pass Approved",
    ],
    icon: FaFileCircleCheck,
  },
  {
    title: "Registration",
    values: ["Registry Ready", "Immediate Possession"],
    icon: FaFileCircleCheck,
  },
];

const brochureUrl =
  "https://cdn.sanity.io/files/c3e1h345/projects/24ba597843bad573b68919de9391499bd8ceb4f8.pdf";

export default function PlanLayout({ surface = "alt" }) {
  return (
    <WestWynPlanLayout
      projectName="WestWyn Estates"
      overviewCards={overviewCards}
      location={{
        name: "Polarpur",
        description: [
          "WestWyn Estates is located in Polarpur, Dholera.",
          "The project enjoys direct entry from the 150 ft wide State Highway 117.",
        ],
      }}
      documentation={documentation}
      brochureUrl={brochureUrl}
      masterPlan={<LivePlotPlan />}
    />
  );
}
