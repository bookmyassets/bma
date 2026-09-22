import WestWynFAQ from "../components/westwyn/WestwynFAQSection";

const faqs = [
  {
    question:
      "What is WestWyn Estates?",
    answer:
      "WestWyn Estates is a registry-ready residential plot project by BookMyAssets in Polarpur, Dholera. It offers legally verified plots with immediate possession, modern amenities, and excellent connectivity.",
  },

  {
    question:
      "Where is WestWyn Estates located?",
    answer:
      "WestWyn Estates is located in Polarpur with direct entry from the 150 ft wide State Highway 117. It is close to Bhimnath Railway Junction, Dholera SIR, Ahmedabad-Dholera Expressway, Tata Semiconductor Plant, and Dholera International Airport.",
  },

  {
    question:
      "Are the plots at WestWyn Estates legally verified?",
    answer:
      "Yes. All plots at WestWyn Estates are NA/NOC approved, title clear, plan pass approved, and registry-ready for a safe and transparent property purchase.",
  },

  {
    question:
      "What amenities are available at WestWyn Estates?",
    answer:
      "WestWyn Estates offers a gated community, 24×7 security, CCTV surveillance, wide internal roads, power and water supply, drainage system, kids play area, yoga deck, jogging track, EV charging station, and senior citizen zone.",
  },

  {
    question:
      "Does BookMyAssets provide support after buying a plot?",
    answer:
      "Yes. BookMyAssets provides complete support including site visits, documentation assistance, villa construction, resale support, rental support, and post-purchase guidance.",
  },
];

export default function FAQSection({surface = "base",}) {
  return (
    <WestWynFAQ
      surface={surface}
      projectName="WestWyn Estates"
      faqs={faqs}
    />
  );
}