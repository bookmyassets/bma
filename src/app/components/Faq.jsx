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

  const colors = {
    black: "#000000",
    gold: "#FDB913",
    darkGold: "#C69C21",
    white: "#FFFFFF",
  };


  return (
    <>
   
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-5xl font-extrabold text-black text-center mb-6">
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
                className="w-full flex justify-between items-center text-[#edc46b] text-left text-lg font-bold"
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
                      <ul className="list-disc pl-2 ">
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

    <div 
  className="text-center border border-b-2 border-white"
  style={{
    background: `linear-gradient(135deg, ${colors.gold}, ${colors.darkGold})`,
    color: colors.black,
    padding: "1.5rem 2rem",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
    border: `3px solid ${colors.darkGold}`,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textTransform: "uppercase",
    position: "relative",
    overflow: "hidden"
  }}
  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
  onClick={() => window.open("https://www.bookmyassets.com/contact")}
>
  <div style={{
    position: "absolute",
    top: "10px",
    right: "-30px",
    background: "red",
    color: "white",
    padding: "0.2rem 2rem",
    transform: "rotate(45deg)",
    fontSize: "0.8rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
  }}>
    ONLY FEW LEFT!
  </div>

  
  <span style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
    🏡 <span style={{ color: "#d10000" }}>DHOLERA PLOTS</span> @ <span style={{ fontSize: "1.4rem" }}>₹10 LAKH*</span> 🏙️
  </span>
  <br />
  <span  style={{ fontSize: "0.9rem", opacity: 0.9 }}>
    ⚡ INSTANT REGISTRATION | ❌ NO HIDDEN COSTS | ⏳ OFFER ENDS SOON!
  </span>
</div>
          </>
  );
}