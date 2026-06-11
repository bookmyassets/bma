import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynEstateClient from "./WestWynEstateClient";

export const metadata = buildMeta({
  title: "Invest in WestWyn Estates Residential Plots in Dholera",
  description: "Registry-ready residential plots at WestWyn Estates, Polarpur Dholera. Entry from State Highway-117, NA/NOC, immediate registry & possession.",
  slug: "dholera-residential-plots/westwyn-estate",
  type: "website",
});

export default function Page() {
  return <WestWynEstateClient />;
}
