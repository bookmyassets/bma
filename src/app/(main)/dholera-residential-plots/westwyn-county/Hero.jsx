import {
  CircleDollarSign,
  FileCheck2,
  MapPin,
  Ruler,
} from "lucide-react";

import WestWynProjectHero from "../components/westwyn/WestwynProjectHero";

const projectFacts = [
  {
    label: "Resale price",
    value: "₹12,000 / sq. yd.",
    Icon: CircleDollarSign,
  },
  {
    label: "Plot sizes",
    value: "149–325 sq. yd.",
    Icon: Ruler,
  },
  {
    label: "Documentation",
    value: "Registry Ready",
    Icon: FileCheck2,
  },
  {
    label: "Connectivity",
    value: "Direct SH-40 Entry/Exit",
    Icon: MapPin,
  },
];

export default function Hero() {
  return (
    <WestWynProjectHero
      titleId="westwyn-county-title"
      eyebrow="Registry Ready Plots with Clear Documentation"
      projectName="County"
      projectFacts={projectFacts}
      whatsappText="Hi, I'd like the latest WestWyn County details"
      documentHref="#westwyn-county-document-vault"
      inventoryNote="Price and plot availability are subject to current inventory."
    />
  );
}
