import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynResidencyClient from "./WestWynResidencyClient";

export const metadata = buildMeta({
  title: "WestWyn Residency, Pipariya | Registry-Ready Residential Plots | BookMyAssets",
  description: "Explore WestWyn Residency in Pipariya near Dholera SIR. Direct developer, legal-clear plots, registry-ready paperwork, 124 / 152 / 187 sq yd options, and transparent payment plan.",
  keywords:"westwyn residency dholera, dholera residential plots, plots near dholera sir, dholera smart city plots, buy plot in dholera, residential plots in dholera sir, dholera investment plots, plots near dholera expressway, dholera smart city investment, buy land in dholera gujarat, gated community plots dholera, dholera airport nearby plots",
  slug: "dholera-residential-plots/westwyn-residency",
  type: "website",
});

export default function Page() {
  return <WestWynResidencyClient />;
}
