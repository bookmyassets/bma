import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynCountyClient from "./WestWynCountyClient";

export const metadata = buildMeta({
  title: "Westwyn County Dholera SIR | Smart Residential Plots by BookMyAssets",
  description: "Discover Smart Residential Plots in Dholera With Great connectivity, smart infrastructure & high ROI.",
  slug: "dholera-residential-plots/westwyn-county",
  type: "website",
});

export default function Page() {
  return <WestWynCountyClient />;
}
