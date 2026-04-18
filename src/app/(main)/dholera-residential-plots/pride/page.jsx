import { generateMetadata as buildMeta } from "@/lib/seo";
import PrideClient from "./PrideClient";

export const metadata = buildMeta({
  title: "Buy Pride the Premium Residentail plots in Dholera with BookMyAssets",
  description: "Invest in residentail plotting project located in Dholera,a rapidly developing Smart City in Gujarat.",
  slug: "dholera-residential-plots/pride",
  type: "website",
});

export default function Page() {
  return <PrideClient />;
}
