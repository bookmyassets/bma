import WestWynFAQ from "../components/westwyn/WestwynFAQSection";

const faqs = [
  {
    question:
      "What is WestWyn Residency?",
    answer:
      "WestWyn Residency is a registry-ready residential plot project by BookMyAssets in Pipariya, Dholera. It offers legally verified plots with immediate possession, modern amenities, and excellent connectivity.",
  },

  {
    question:
      "Where is WestWyn Residency located?",
    answer:
      "WestWyn Residency is located in Pipariya with direct access from the Major District Road (MDR). It is close to the DFC, Bhimnath Railway Junction, Dholera SIR, Ahmedabad–Dholera Expressway, Tata Semiconductor Plant, and Dholera International Airport.",
  },

  {
    question:
      "Are the plots at WestWyn Residency legally verified?",
    answer:
      "Yes. All plots at WestWyn Residency are NA/NOC approved, title clear, plan pass approved, and registry-ready for a secure and transparent property purchase.",
  },

  {
    question:
      "What amenities are available at WestWyn Residency?",
    answer:
      "WestWyn Residency offers a gated community, 24×7 security with CCTV, wide internal roads, power and water supply, drainage system, kids play area, yoga deck, jogging track, EV charging station, and senior citizen zone.",
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
      projectName="WestWyn Residency"
      faqs={faqs}
    />
  );
}