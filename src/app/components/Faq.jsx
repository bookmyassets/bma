"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Is Dholera Smart City Completed?",
    answer:
      "Dholera Smart City is still under development, with Phase 1 expected to be completed by 2025. The city is being developed as India’s first greenfield smart city under the Delhi-Mumbai Industrial Corridor (DMIC). Infrastructure like roads, power, and water supply is progressing rapidly. Full-scale completion is expected by 2040.",
  },
  {
    question: "Is Dholera Smart City a good investment?",
    answer: 
      "Yes, Dholera can be a good investment because it is growing fast with government support. Many industries and IT companies are planning to come here. Land prices are low now so early investment may give good returns.",
  },
  {
    question: "Is Dholera bigger than Delhi?",
    answer: 
      "Yes, Dholera Smart City is planned to be larger than Delhi in terms of area. It spans approximately 920 sq km, while Delhi covers around 1,484 sq km, but Delhi includes built-up urban areas. Dholera’s planned urban development area is around 500 sq km, making it one of India’s largest planned cities.",
      
  },
  {
    question: "Is Tata investing in Dholera?",
    answer: 
      "Yes, the Tata Group has invested in Dholera, particularly in the semiconductor, power, defence, and electronics manufacturing sectors. Tata Power has also expressed interest in renewable energy projects within the smart city. The investments align with the government's push to make Dholera an industrial and tech hub. However, official announcements on the exact scale are still awaited.",
     
  },
  {
    question: "What is the distance between Dholera Smart City to Ahmedabad?  ",
    answer: 
      "Dholera Smart City is approximately 100 km from Ahmedabad. The upcoming Ahmedabad-Dholera Expressway will reduce travel time to around an hour. Additionally, a proposed metro and high-speed rail will further improve connectivity. The region is expected to become a major economic corridor.",
     
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-black text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 relative">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="border rounded-lg p-4 shadow-2xl bg-gray-900 bg-opacity-80"
            >
              <button
                className="w-full flex justify-between items-center text-[#edc46b] text-left text-xl font-bold"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 text-lg text-[#f6d99a] overflow-hidden border-t-2 border-[#edc46b] border-opacity-50 py-5"
                  >
                    {Array.isArray(faq.answer) ? (
                      <ul className="list-disc pl-5 ">
                        {faq.answer.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}