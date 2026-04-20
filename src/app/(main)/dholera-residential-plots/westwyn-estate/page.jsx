import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynEstateClient from "./WestWynEstateClient";

export const metadata = buildMeta({
  title: "WestWyn Estates, Polarpur | Registry-Ready Residential Plots | BookMyAssets",
  description: "Explore WestWyn Estates in Polarpur near Dholera SIR. Direct developer, legal-clear plots, registry-ready paperwork, 152 and 200 sq yd options, and transparent 30-day payment plan.",
  keywords:"WestWyn Estates, WestWyn Estates Dholera, WestWyn Estates Polarpur, Dholera residential plots, plots in Dholera, residential plots in Polarpur, plots near Dholera SIR, plots near Bhimnath Railway Station, State Highway 117 Dholera plots, NA NOC plots in Dholera, registry ready plots in Dholera, immediate possession plots in Dholera, 152 sq yd plots in Dholera, 200 sq yd plots in Dholera, plots near Ahmedabad Dholera Expressway, plots near Tata Semiconductor Plant, BookMyAssets WestWyn Estates",
  slug: "dholera-residential-plots/westwyn-estate",
  type: "website",
});

export default function Page() {
  return <WestWynEstateClient />;
}
