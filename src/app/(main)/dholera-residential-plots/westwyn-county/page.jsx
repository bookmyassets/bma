import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynCountyClient from "./WestWynCountyClient";

export const metadata = buildMeta({
  title: "WestWyn County Dholera | Resale Plots from Rs 20 Lakh",
  description: "WestWyn County, BookMyAssets's sold-out Dholera project on Fedra-Pipli Highway. Resale plots from Rs 20 Lakh with villa construction already underway.",
  slug: "dholera-residential-plots/westwyn-county",
  type: "website",
});

export default function Page() {
  return <WestWynCountyClient />;
}
