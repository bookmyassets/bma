"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Where is WestWyn Estates located?",
    answer:
      "WestWyn Estates is located on State Highway-117, just 5 minutes from Bhimnath Railway Station, within a rapidly developing corridor at Dholera Smart City.",
  },
  {
    question: "What is the price of plots?",
    answer:
      "Plots at WestWyn Estates start from ₹10 Lakh, with sizes ranging between 151–198 sq. yd.",
  },
  {
    question: "Are the plots legally approved?",
    answer:
      "Yes. The plots are government approved with NA/NOC/Title clearance, AUDA registered, and registry-ready, ensuring transparency and investment security.",
  },
  {
    question: "What is the booking process?",
    answer:
      "You can reserve your plot with a token amount of ₹50,000. After booking, clients can visit the site with our team in Dholera. Once payment is completed, the legal process begins and the registry documents are sent via speed post.",
  },
  {
    question: "Why consider investing in WestWyn Estates now?",
    answer:
      "With over ₹3 Lakh crore global investment and upcoming developments like the Dholera International Airport and Tata Semiconductor Plant, the region is attracting major industrial growth and infrastructure development.",
  },
  {
    question: "How can BookMyAssets (BMA) help you invest?",
    answer:
      "BookMyAssets (BMA) assists investors with free consultation, plot selection, due diligence, and complete legal assistance till registry, ensuring a smooth and seamless investment at Dholera Smart City.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProjectPage",
            name: "BookMyAssets",
            alternateName: "BMA",
            url: "https://www.bookmyassets.com/",
            mainEntity: [
              {
                "@type": "Question",
                name: "Where is WestWyn Estates located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WestWyn Estates is located on State Highway-117, just 5 minutes from Bhimnath Railway Station, within a rapidly developing corridor at Dholera Smart City.",
                },
              },
              {
                "@type": "Question",
                name: "What is the price of plots?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Plots at WestWyn Estates start from ₹10 Lakh, with sizes ranging between 151–198 sq. yd.",
                },
              },
              {
                "@type": "Question",
                name: "Are the plots legally approved?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The plots are government approved with NA/NOC/Title clearance, AUDA registered, and registry-ready, ensuring transparency and investment security.",
                },
              },
              {
                "@type": "Question",
                name: "What is the booking process?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can reserve your plot with a token amount of ₹50,000. After booking, clients can visit the site with our team in Dholera. Once payment is completed, the legal process begins and the registry documents are sent via speed post.",
                },
              },
              {
                "@type": "Question",
                name: "Why consider investing in WestWyn Estates now?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "With over ₹3 Lakh crore global investment and upcoming developments like the Dholera International Airport and Tata Semiconductor Plant, the region is attracting major industrial growth and infrastructure development.",
                },
              },
              {
                "@type": "Question",
                name: "How can BookMyAssets (BMA) help you invest?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "BookMyAssets (BMA) assists investors with free consultation, plot selection, due diligence, and complete legal assistance till registry, ensuring a smooth and seamless investment at Dholera Smart City.",
                },
              },
            ],
          }),
        }}
      />

      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-2">
              Got questions about WestWyn Estates?
            </p>
            <div className="pt-4">
              <a
                className="px-2 py-3 bg-[#deae3c] rounded-md"
                href="tel:+918130371647"
              >
                Give Us A Missed Call
              </a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 md:pl-24 md:pr-4  md:mt-0 space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-gray-900 font-medium pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 px-0">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
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
