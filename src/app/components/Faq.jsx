"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import clickBaitm from "@/assests/dholeraClickBaitm.webp";
import clickBait from "@/assests/dholeraClickBait.webp";
import PopupForm from "./PopupForm";
import Link from "next/link";

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
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const colors = {
    black: "#000000",
    gold: "#FDB913",
    darkGold: "#C69C21",
    white: "#FFFFFF",
  };

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
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

      {/* Mobile Version */}
      <div className="block md:hidden relative w-full">
        <Image
          src={clickBait}
          alt="clickbait mobile"
          className=" h-auto"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 px-4">
          <button
            onClick={openBrochureForm}
            className="bg-gray-800 text-white text-center px-4 py-2 rounded-lg flex-1"
          >
            Free Site Visit
          </button>
          <Link href="/infopack" className="bg-gray-800 text-white text-center px-4 py-2 rounded-lg flex-1">
            Project Info
          </Link>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block relative w-full">
        <Image
          src={clickBaitm}
          alt="clickbait desktop"
          className="w-full h-auto"
        />
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-6 px-8">
          <button
            onClick={openBrochureForm}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg text-2xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Free Site Visit
          </button>
          <Link href="/infopack" className="bg-gray-800 text-white px-6 py-3 rounded-lg text-2xl font-semibold hover:bg-gray-900 transition-colors">
            Project Info
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000]">
            <PopupForm
              title="Free Site Visit"
              buttonName="Submit"
              onClose={closeBrochureForm}
              onSuccess={() => setIsFormSubmitted(true)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
