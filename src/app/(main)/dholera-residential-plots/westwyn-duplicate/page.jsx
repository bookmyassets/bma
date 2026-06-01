import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynResidencyClient from "./WestWynResidencyClient";

export const metadata = buildMeta({
  title: "WestWyn Residency - Premium Residential Plots Dholera",
  description: "Book govt approved residential plots at WestWyn Residency, Pipariya Dholera. Registry-ready plots with NA/NOC, immediate possession & expert support.",
  keywords:"westwyn residency dholera, dholera residential plots, plots near dholera sir, dholera smart city plots, buy plot in dholera, residential plots in dholera sir, dholera investment plots, plots near dholera expressway, dholera smart city investment, buy land in dholera gujarat, gated community plots dholera, dholera airport nearby plots",
  slug: "dholera-residential-plots/westwyn-duplicate",
  canonicalUrl: "https://www.bookmyassets.com/dholera-residential-plots/westwyn-residency",
  noIndex: true,
  type: "website",
});

export default function Page() {
  return <WestWynResidencyClient />;
}
