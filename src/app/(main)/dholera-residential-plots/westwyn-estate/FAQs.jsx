"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is WestWyn Estates legally clear and safe to invest in?",
    answer:
      "Yes, WestWyn Estates offers plots with Approved Layout Plan and title clarity, ensuring that your investment is legally secure. We provide full documentation support so you can verify everything before making a decision.",
  },
  {
    question: "Is immediate registry available in WestWyn Estates?",
    answer:
      "Yes, plots in WestWyn Estates come with immediate registry, allowing you to secure ownership quickly without long waiting periods or uncertainty.",
  },
  {
    question: "What documents will I receive when I buy a plot?",
    answer: [
      "Sale deed",
      "NA approval documents",
      "Title clearance details",
      "Layout plan",
    ],
  },
  {
    question: "Where exactly is WestWyn Estates located in Dholera?",
    answer:
      "WestWyn Estates is strategically located in a developing zone of Dholera with proximity to key infrastructure such as planned roads, industrial areas, and future connectivity projects.",
  },
  {
    question:
      "How close is WestWyn Estates to the Dholera SIR activation area?",
    answer:
      "The project is positioned with access to the broader Dholera SIR development zone, making it relevant for long-term growth aligned with infrastructure expansion.",
  },
  {
    question: "What plot sizes are available in WestWyn Estates?",
    answer:
      "WestWyn Estates offers multiple plot sizes suitable for different investment and usage needs. Detailed size options and availability are shared based on current inventory.",
  },
  {
    question: "What infrastructure and amenities are planned in the project?",
    answer: [
      "Internal roads",
      "Gated layout planning",
      "Basic infrastructure readiness",
      "Planned development structure",
      "Full project layout is explained before booking",
    ],
  },
  {
    question: "Can I visit WestWyn Estates before buying?",
    answer: [
      "Complete site visit planning",
      "On-ground assistance",
      "Project walkthrough",
      "Especially helpful for buyers traveling from Delhi NCR",
    ],
  },
  {
    question: "What is the process to book a plot in WestWyn Estates?",
    answer: [
      "Consultation",
      "Project selection",
      "Document verification",
      "Token booking",
      "Registry completion",
      "Our team guides you step-by-step",
    ],
  },
  {
    question: "Do you provide support after purchase?",
    answer: [
      "Registry assistance",
      "Documentation support",
      "Site visit coordination",
      "Ongoing guidance",
      "You are supported even after the transaction is complete",
    ],
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleCallClick = () => {
    //  Google Tag Manager event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "call_click_Faq",
      lead_type: "phone",
      device: "all",
    });

    // 📞 Call trigger
    window.location.href = "tel:+918130371647";
  };
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-6 md:py-8 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="contents md:flex md:w-2/5 md:flex-col md:px-2">
            <h2 className="order-1 px-2 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] text-black md:order-none md:px-0 md:mb-4">
              FAQs
            </h2>
            <div className="order-3  md:order-none md:px-0">
              <p className="pb-3">Have Any Other Question?</p>
              <a
                href="#"
                className="px-1 py-2 bg-[#ddbc69] text-white rounded-md"
                onClick={handleCallClick}
              >
                Let's Connect
              </a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="order-2 w-full md:order-none md:w-3/5 md:pl-24 md:pr-4 md:mt-0 space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7] text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600" />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 px-0">
                    <div className="text-gray-600 text-[0.875rem] font-normal leading-[1.5]">
                      {Array.isArray(faq.answer) ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {faq.answer.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{faq.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
