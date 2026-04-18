import { generateMetadata as buildMeta } from "@/lib/seo";
import Paradise2Client from "./Paradise2Client";

export const metadata = buildMeta({
  title: "Paradise 2 Dholera – Modern Residential Plots in Smart City",
  description: "Secure your dream plot in Paradise 2 Dholera.Smart amenities, fast appreciation, and location advantage in a government-backed project.",
  slug: "dholera-residential-plots/paradise-2",
  type: "website",
});

export default function Page() {
  return <Paradise2Client />;
}
