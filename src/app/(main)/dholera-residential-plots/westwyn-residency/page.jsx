import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynResidencyClient from "./WestWynResidencyClient";

export const metadata = buildMeta({
  title: "WestWyn Residency - Premium Residential Plots Dholera",
  description: "Book govt approved residential plots at WestWyn Residency, Pipariya Dholera. Registry-ready plots with NA/NOC, immediate possession & expert support.",
  slug: "dholera-residential-plots/westwyn-residency",
  type: "website",
});

export default function Page() {
  return <WestWynResidencyClient />;
}
