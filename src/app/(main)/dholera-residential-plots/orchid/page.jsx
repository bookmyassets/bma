import { generateMetadata as buildMeta } from "@/lib/seo";
import OrchidClient from "./OrchidClient";

export const metadata = buildMeta({
  title: "Orchid Township Dholera | Exclusive Residential Plots",
  description:
    "Explore Orchid Township in Dholera SIR. Discover plotted opportunities with modern infrastructure and future growth potential.",
  slug: "dholera-residential-plots/orchid",
  type: "website",
});

export default function Page() {
  return <OrchidClient />;
}
