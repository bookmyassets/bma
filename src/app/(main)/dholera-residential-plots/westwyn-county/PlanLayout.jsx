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
    value: "5.99 Acres",
    secondaryValue: "29,000 sq. yards",
    icon: FaLayerGroup,
  },
  {
    title: "Location",
    value: "Fedra-Pipli State Highway",
    icon: FaLocationDot,
  },
  {
    title: "Plot Sizes",
    value: "149-325 sq. yards",
    icon: FaRulerCombined,
  },
  {
    title: "Total Units",
    value: "131 exclusive plots",
    icon: FaUsers,
  },
  {
    title: "Development Status",
    value: "Under Construction",
    icon: FaBuilding,
  },
  {
    title: "Resale Price",
    value: "₹12,000 / sq. Yard",
    icon: FaIndianRupeeSign,
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
  "https://cdn.sanity.io/files/c3e1h345/projects/c28b4a439e3834cddf988bab24774f3f79bb78a9.pdf";

export default function PlanLayout({ surface = "alt" }) {
  return (
    <WestWynPlanLayout
      projectName="WestWyn County"
      overviewCards={overviewCards}
      location={{
        name: "Fedra-Pipli State Highway",
        description: [
          "WestWyn county is located in Fedra-Pipli State Highway, Dholera.",
          "The project enjoys direct Entry/Exit from Fedra-Pipli Highway (SH-40).",
        ],
      }}
      documentation={documentation}
      brochureUrl={brochureUrl}
      masterPlan={<LivePlotPlan />}
    />
  );
}

