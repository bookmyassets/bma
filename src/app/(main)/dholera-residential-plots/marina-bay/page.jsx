import { generateMetadata as buildMeta } from "@/lib/seo";
import MarinaBayClient from "./MarinaBayClient";

export const metadata = buildMeta({
  title: "Marina Bay Dholera: Waterfront Living in Smart City",
  description: "Discover the future of living at Marina Bay Dholera! Invest in a prime waterfront property in India's smart city, close to all essential amenities.",
  slug: "dholera-residential-plots/marina-bay",
  type: "website",
});

export default function Page() {
  return <MarinaBayClient />;
}
