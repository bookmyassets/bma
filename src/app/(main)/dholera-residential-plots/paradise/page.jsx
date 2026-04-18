import { generateMetadata as buildMeta } from "@/lib/seo";
import ParadiseClient from "./ParadiseClient";

export const metadata = buildMeta({
  title: "Paradise Dholera – Premium Residential Plots for Smart Investment",
  description: "Discover Invest in Paradise Dholera: premium residential plots with smart infrastructure, promising ROI, and excellent connectivity in Dholera SIR.",
  slug: "dholera-residential-plots/paradise",
  type: "website",
});

export default function Page() {
  return <ParadiseClient />;
}
