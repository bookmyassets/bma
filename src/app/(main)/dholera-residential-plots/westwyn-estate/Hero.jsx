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
    value: "₹8,500 / sq. yd.",
    Icon: CircleDollarSign,
  },
  {
    label: "Plot sizes",
    value: "147–250 sq. yd.",
    Icon: Ruler,
  },
  {
    label: "Documentation",
    value: "Registry Ready",
    Icon: FileCheck2,
  },
  {
    label: "Connectivity",
    value: "Direct SH-117 Entry",
    Icon: MapPin,
  },
];

export default function Hero() {
  return (
    <WestWynProjectHero
      titleId="westwyn-estates-title"
      eyebrow="Registry Ready Plots with Clear Documentation"
      projectName="Estates"
      projectFacts={projectFacts}
      whatsappText="Hi, I'd like the latest WestWyn Estates details"
      documentHref="#westwyn-estates-document-vault"
      inventoryNote="Price and plot availability are subject to current inventory."
    />
  );
}