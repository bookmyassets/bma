import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCheck,
  TrendingUp,
  Scale,
  RefreshCcw,
  CalendarCheck2,
  ShieldCheck,
} from "lucide-react";

export default function InvestmentBenefits() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openModal = (benefit, index) => {
    setSelectedBenefit({...benefit, index});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBenefit(null);
  };

const benefits = [
  {
    title: "Immediate Sale Registry",
    icon: <FileCheck className="w-6 h-6 text-blue-600" />,
    description: "Own your dream plot instantly with a quick, transparent registry process",
    body: "BMA ensures immediate registration with clear documentation, so buyers don’t face delays or hidden legal issues. This transparency builds trust and gives you instant ownership security."
  },
  {
    title: "High ROI Projects",
    icon: <TrendingUp className="w-6 h-6 text-green-600" />,
    description: "Invest in future-ready projects designed to deliver maximum returns.",
    body: "Located in fast-growing zones like Dholera Smart City, BMA’s projects are strategically planned near major infrastructure, ensuring higher appreciation and strong ROI for long-term investors."
  },
  {
    title: "In-house Due Diligence Team",
    icon: <Scale className="w-6 h-6 text-orange-600" />,
    description: "Every plot is verified by BMA’s expert in-house due diligence team.",
    body: "BMA’s internal legal and technical experts conduct thorough due diligence on every project. This guarantees that the land you invest in is safe, approved, and free from disputes."
  },
  {
    title: "Resale Support & Buyback Option",
    icon: <RefreshCcw className="w-6 h-6 text-purple-600" />,
    description: "Secure investment with guaranteed resale support and buyback options.",
    body: "Investors enjoy flexibility with dedicated resale assistance and a buyback option from BMA. This ensures liquidity and gives confidence that your investment won’t get stuck."
  },
  {
    title: "365 Days Site Visit Assistance",
    icon: <CalendarCheck2 className="w-6 h-6 text-pink-600" />,
    description: "Visit your property anytime with year-round site visit support.",
    body: "BMA offers 365-day site visits so investors can personally check progress, infrastructure, and surroundings before and after purchase, adding to reliability and transparency."
  },
  {
    title: "Government Approved AUDA Plots",
    icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
    description: "Invest in 100% safe, government-approved AUDA verified plots.",
    body: "All plots are AUDA-approved with proper government verification. This ensures your investment is legally safe, future-ready, and eligible for planned development benefits in Dholera."
  }
];


  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(222, 174, 60, 0.1), 0 8px 10px -6px rgba(222, 174, 60, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const modalContentVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 180,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className="pt-8 py-4 bg-gray-50" id='westwyn-county'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl md:text-[32px] lg:text-[40px] font-light text-center text-[#deae3c] mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Invest with BookMyAssets?
          </motion.h2>

          {/* Desktop: 5 cards in a row, Mobile: 1 card per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group border border-gray-200 rounded-xl p-4 md:p-5 bg-white cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={() => openModal(benefit, index)}
                transition={{ delay: index * 0.1 }}
              >
                {/* Card Header */}
                <div className="text-center mb-4">
                  <motion.div 
                    className="text-3xl md:text-4xl mb-3"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-[#deae3c] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description - Always Visible */}
                <div className="mb-3">
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center">
                    {benefit.description}
                  </p>
                </div>

                {/* Expand Button */}
                <button
                  className="w-full focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFAQ(index);
                  }}
                  aria-expanded={openIndex === index}
                  aria-controls={`benefit-${index}`}
                >
                  <div className="flex justify-center">
                    <motion.div 
                      className="p-2 rounded-full bg-gray-100 group-hover:bg-[#deae3c]/10 transition-colors duration-300"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      
                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-[#deae3c]" onClick={() => openModal(benefit, index)} />
                     
                    </motion.div>
                  </div>
                </button>

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
                  <p className="text-gray-600">
                    {selectedBenefit.description}
                  </p>
                </motion.div>
                
                <motion.div 
                  className="border-t border-gray-200 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="font-medium text-gray-800 mb-2">Detailed Information:</h4>
                  <p className="text-gray-600">
                    {selectedBenefit.body}
                  </p>
                </motion.div>
                
                <motion.div 
                  className="mt-6 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={closeModal}
                    className="bg-[#deae3c] hover:bg-[#c9992a] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}