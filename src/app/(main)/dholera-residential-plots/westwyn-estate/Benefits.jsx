import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img from "@/assests/image.webp";
import Image from "next/image";

export default function InvestmentBenefits() {
  const [openId, setOpenId] = useState(null);
  const contentRefs = useRef({});

  const benefits = [
    { id: 1, text: "Direct entry from State Highway-117" },
    { id: 2, text: "Minutes from Bhimnath Railway Station" },
    { id: 3, text: "Close approximately to Dholera SIR boundary" },
    { id: 4, text: "High ROI potential in next 5 years" },
  ];

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto py-4">
        <motion.h2
          className="text-2xl md:text-[32px] lg:text-[40px] font-semibold text-center text-[#deae3c] mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Invest in WestWyn Estates?
        </motion.h2>
      </div>

      <div className="pt-8 py-4 bg-gray-50 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="px-4 sm:px-6 lg:px-8 md:w-1/2 aspect-[2/1]">
          <Image
            src={img}
            alt="dholera map"
            className="rounded-xl w-full h-auto aspect-[2/1]"
            priority
          />
        </div>

        {/* Benefits Section */}
        <div className="px-4 sm:px-6 lg:px-8 md:w-1/2 space-y-4">
          {benefits.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg bg-white p-2 text-lg leading-loose shadow-sm overflow-hidden"
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
