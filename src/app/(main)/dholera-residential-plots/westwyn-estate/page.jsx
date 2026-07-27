import { generateMetadata as buildMeta } from "@/lib/seo";
import WestWynEstateClient from "./WestWynEstateClient";

export const metadata = buildMeta({
  title: "WestWyn Estates Residentail plots on State Highway",
  description: "WestWyn Estates by BookMyAssets on State Highway 117, Dholera. Registry-ready residential plots from Rs 10 Lakh with NA/NOC, plan pass approved.",
  slug: "dholera-residential-plots/westwyn-estate",
  type: "website",
});

export default function Page() {
  return <WestWynEstateClient />;
}
