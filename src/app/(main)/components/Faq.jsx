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
    question: "Is it safe to invest in Dholera SIR?",
    answer:
      "Yes, investing in Dholera SIR (Special Investment Region) is considered safe and forward-looking, especially for long-term investors. Backed by the Government of Gujarat and supported by central government initiatives under the Delhi-Mumbai Industrial Corridor (DMIC), Dholera SIR is India's first Greenfield smart city. The area has been planned with world-class infrastructure, including plug-and-play industrial zones, an international airport, metro connectivity, and expressways — all driven by a master plan with clear legal and administrative backing. Additionally, Dholera has Title Clear land parcels, NA/NOC approved zones, and robust due diligence frameworks in place. Investors can choose from residential plots, commercial land, or industrial spaces with clarity and legal transparency. With thousands of acres already under active development and big corporate players entering the region, it offers a rare opportunity where government trust, smart infrastructure, and futuristic planning align."
  },
  {
    question: "Is TATA invested in Dholera Smart City?",
    answer:
      "Absolutely. Tata Group has made one of the largest industrial investments in India right within Dholera Smart City, setting up a ₹91,000 crore semiconductor fabrication plant through Tata Electronics in collaboration with Taiwan's PSMC (Powerchip Semiconductor Manufacturing Corp). This project is part of India’s larger Semiconductor Mission and places Dholera on the global tech map as a hub for advanced electronics manufacturing. The project is not just a factory — it's a smart, AI-integrated chip manufacturing ecosystem that reflects the scale and vision of what Dholera Smart City is set to become. With Tata's involvement, confidence among investors, both institutional and individual, has surged. It validates the region’s potential, infrastructure readiness, and government commitment, making it one of the most secure and exciting places to invest in 2025 and beyond."
  },
  {
    question: "Why is Dholera so famous?",
    answer:
      "Dholera is famous for being India’s first Greenfield smart city, planned from scratch with integrated infrastructure, global urban planning standards, and scalable zoning for industries, housing, and technology. Located in Gujarat, it forms a key node in the Delhi-Mumbai Industrial Corridor (DMIC), offering unmatched connectivity through expressways, a dedicated freight corridor, and a proposed international airport. It is a symbol of India’s future — combining technology, sustainability, and industrial growth in one ecosystem. What sets Dholera apart is its Activation Area — a 22.5 sq. km zone where roads, drainage, ICT, and utility infrastructure are already functional. Major companies are now building projects here, and the city has become a magnet for the semiconductor, renewable energy, electric mobility, and logistics sectors. The ambition to make it the \"next Dubai or Shanghai\" is not just hype — it’s backed by real progress on the ground."
  },
  {
    question: "When will Dholera Smart City be fully ready?",
    answer:
      "Dholera Smart City is being developed in well-phased stages, with the Activation Area (22.5 sq km) already in advanced stages of completion as of May 2025. Roads, ICT networks, water management, and other core infrastructure are ready, and companies like Tata Electronics, Avaada Energy, and ReNew Power have already begun construction or signed MoUs. In simpler terms, the city isn’t a dream anymore — it’s already breathing. The entire Dholera SIR spans over 920 sq. km, and full-scale development is expected to continue till 2040. However, investors and industrial players are already taking positions in Phase 1 zones like the Fedra-Pipli Highway. By 2027–2030, Dholera is expected to become a fully functional industrial and residential hub, with global-scale manufacturing, export-ready infrastructure, and thousands of residents living in smart homes. Investing now is like investing in Gurgaon before it became Gurgaon."
  },
  {
    question: "Which companies have invested in Dholera?",
    answer:
      "The most headline-grabbing investment in Dholera is by the Tata Group, which is building a ₹91,000 crore semiconductor plant in collaboration with Taiwan’s PSMC. This plant will manufacture 50,000 wafers per month and represents a massive leap in India’s journey toward becoming a tech manufacturing powerhouse. Tata’s involvement gives immense credibility to Dholera’s future and reinforces the city’s strategic importance. Apart from Tata, several major players have committed to Dholera. These include Grew Energy's solar cell manufacturing unit under Tata Chemicals, HPCL’s hydrogen energy facility, Vedanta’s proposed semiconductor plant, Polycab’s cable manufacturing, Chiripal Industries' textile investments, Avaada Energy’s renewable parks, and ReNew Power’s energy expansion. Even Torrent Power is developing the power infrastructure for the city. With such a lineup of blue-chip names, Dholera is no longer just a smart city — it’s India’s new industrial epicentre."
  }
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
            id="Faq-form"
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
