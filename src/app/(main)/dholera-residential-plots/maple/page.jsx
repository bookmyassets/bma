import { generateMetadata as buildMeta } from "@/lib/seo";
import MapleClient from "./MapleClient";

export const metadata = buildMeta({
  title: "Maple Township Dholera: Smart Living Plots in Gujarat",
  description: "Discover your ideal plot in Maple Township Dholera! Embrace modern living with lush greenery and a prime location set for future growth.",
  slug: "dholera-residential-plots/maple",
  type: "website",
});

export default function Page() {
  return <MapleClient />;
}
