import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynCrownClient from "./WestWynCrownClient";

export const metadata = buildMeta({
  title: "WestWyn Crown Dholera | Residential Plots Coming Soon",
  description:
    "WestWyn Crown by BookMyAssets is an upcoming residential plotted development in Dholera, Gujarat. View project launch updates and availability.",
  slug: "dholera-residential-plots/westwyn-crown",
  noIndex: true,
  type: "website",
});

export default function Page() {
  return <WestWynCrownClient />;
}
