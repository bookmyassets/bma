"use client";
import WestWynFAQ from "../components/westwyn/WestwynFAQSection";


const faqs = [
  {
    question: "Where is WestWyn County located?",
    answer:
      "WestWyn County is located on the Fedra-Pipli State Highway (SH-40) with direct entry from the 100-ft-wide state highway.",
  },
  {
    question: "Are resale plots available in WestWyn County?",
    answer:
      "Yes. Verified resale plots are available in WestWyn County after the project was sold out.",
  },
  {
    question: "What plot sizes are available in WestWyn County?",
    answer:
      "WestWyn County offers residential plots ranging from 149 to 325 sq. yards.",
  },
  {
    question: "What is the resale price of plots in WestWyn County?",
    answer:
      "The resale price is ₹12,000 per sq. yard. The final price may depend on the plot size, location, and availability.",
  },
  {
    question: "What amenities are available in WestWyn County?",
    answer: "The project offers a gated boundary, 24/7 security, CCTV, wide roads, drainage, power and water supply, a kids’ play area, yoga deck, senior citizen zone, and EV charging.",
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

