import { useState } from "react";
import { MapPin, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck,
  TrendingUp,
  Scale,
  RefreshCcw,
  CalendarCheck2,
  ShieldCheck,
} from "lucide-react";

export default function AboutBMA() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openModal = (benefit, index) => {
    setSelectedBenefit({ ...benefit, index });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBenefit(null);
  };

  const benefits = [
    {
      title: "Prime Location Projects",
      icon: <MapPin className="w-6 h-6 text-indigo-600" />,
      body: "We curate investment opportunities in Dholera’s most strategically positioned zones near expressways, airports, and major industrial hubs. Each location is carefully selected to offer strong connectivity while maintaining reasonable entry pricing, ensuring optimal long-term value.",
    },
    {
      title: "Resale Support & Buyback Option",
      icon: <RefreshCcw className="w-6 h-6 text-purple-600" />,
      body: "Our structured resale assistance and buyback option provide investors with enhanced liquidity and exit flexibility. Supported by BookMyAssets’ active investor network, this ensures confidence that your investment remains marketable when required.",
    },
    {
      title: "In-house Due Diligence Team",
      icon: <Scale className="w-6 h-6 text-orange-600" />,
      body: "Every project undergoes comprehensive legal and technical verification by our in-house experts. Title checks, government approvals, NOCs, and land records are thoroughly validated before any opportunity is introduced to investors.",
    },
    {
      title: "Immediate Sale Registry",
      icon: <FileCheck className="w-6 h-6 text-blue-600" />,
      body: "All properties are offered with complete and verified documentation, enabling immediate sale registration. This eliminates uncertainty, approval delays, and post-purchase legal complications for buyers.",
    },
    {
      title: "365 Days Site Visit Assistance",
      icon: <CalendarCheck2 className="w-6 h-6 text-pink-600" />,
      body: "We provide year-round site visit assistance, allowing investors to physically verify projects at their convenience. This approach reflects our commitment to transparency and informed decision-making.",
    },
    {
      title: "Government Approved AUDA Plots",
      icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
      body: "All plots are AUDA-approved and fully aligned with Dholera’s official master plan. Government approval ensures regulatory compliance, legal clarity, and long-term development security.",
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 25px -5px rgba(222, 174, 60, 0.1), 0 8px 10px -6px rgba(222, 174, 60, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const modalContentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  const iconVariants = {
    hover: {
      rotate: 180,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div className="pt-8 py-4 bg-gray-50" id="why-bma">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl md:text-[32px] lg:text-[40px] font-semibold text-center text-[#deae3c] mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Trust BookMyAssets?
          </motion.h2>

          {/* Desktop: 5 cards in a row, Mobile: 1 card per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group border-2 border-gray-300 rounded-2xl p-6 md:p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#deae3c]"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                {/* Card Header */}
                <div className="text-center mb-6">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex justify-center items-center border-2 border-gray-200 group-hover:border-[#deae3c] transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="scale-125">{benefit.icon}</div>
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#deae3c] transition-colors duration-300 leading-snug">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description - Always Visible */}
                <div className="mb-3">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
                    {benefit.body}
                  </p>
                </div>
                {/* Expandable Content */}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal with AnimatePresence */}
      <AnimatePresence>
        {showModal && selectedBenefit && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <motion.div
                      className="text-3xl mr-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      {selectedBenefit.icon}
                    </motion.div>
                    <motion.h3
                      className="text-xl font-semibold text-gray-800"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedBenefit.title}
                    </motion.h3>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-gray-600">{selectedBenefit.description}</p>
                </motion.div>

                <motion.div
                  className="border-t border-gray-200 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="font-medium text-gray-800 mb-2">
                    Detailed Information:
                  </h4>
                  <p className="text-gray-600">{selectedBenefit.body}</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
