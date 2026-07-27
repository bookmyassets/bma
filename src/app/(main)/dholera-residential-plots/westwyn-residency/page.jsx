import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynResidencyClient from "./WestWynResidencyClient";

export const metadata = buildMeta({
  title: "WestWyn Residency Dholera | Plots from Rs 8 Lakh, Registry-Ready",
  description: "WestWyn Residency, Pipariya Dholera: 290 registry-ready plots of 124-187 sq yd from Rs 8 Lakh. NA/NOC approved, MDR entry, 1.5 km from DFC.",
  slug: "dholera-residential-plots/westwyn-residency",
  type: "website",
});

export default function Page() {
  return <WestWynResidencyClient />;
}
