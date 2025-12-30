import { useState } from 'react';
import { MapPin, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    setSelectedBenefit({...benefit, index});
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
    description:
      "Strategically selected projects near major infrastructure for maximum growth.",
    body:
      "BookMyAssets specializes in curating investment opportunities at Dholera’s most strategic locations. Our projects are chosen for proximity to expressways, airports, and industrial hubs, ensuring superior connectivity and appreciation potential. We focus on locations that balance prime positioning with affordable entry points, so investors gain long-term growth without compromising on budget. Every project is evaluated for future infrastructure impact and sustained value creation."
  },
  {
    title: "Immediate Sale Registry",
    icon: <FileCheck className="w-6 h-6 text-blue-600" />,
    description:
      "Verified documentation and instant registry with no delays or uncertainty.",
    body:
      "BookMyAssets ensures immediate registration with clear and verified documentation, eliminating delays and hidden legal risks. Unlike projects with pending approvals or unclear timelines, our properties are registry-ready from day one. There are no waiting periods, no surprises, and no ambiguity—only straightforward ownership that provides peace of mind the moment you invest."
  },
  {
    title: "In-house Due Diligence Team",
    icon: <Scale className="w-6 h-6 text-orange-600" />,
    description:
      "Every project is vetted by internal legal and technical experts.",
    body:
      "BookMyAssets’ in-house legal and technical professionals conduct comprehensive due diligence before any project is offered to investors. We verify land titles, government approvals, NOCs, and historical records to ensure the property is legally sound and dispute-free. This rigorous verification process removes complexity for investors and ensures your capital is protected through professional scrutiny."
  },
  {
    title: "Resale Support & Buyback Option",
    icon: <RefreshCcw className="w-6 h-6 text-purple-600" />,
    description:
      "Flexible exit options with resale assistance and buyback assurance.",
    body:
      "Investors benefit from dedicated resale support and a buyback option from BookMyAssets, ensuring liquidity and financial flexibility. Whether market conditions evolve or personal goals change, our structured exit support protects your investment. Our resale network helps connect buyers, while the buyback option provides an added safety net—demonstrating our commitment beyond the initial sale."
  },
  {
    title: "365 Days Site Visit Assistance",
    icon: <CalendarCheck2 className="w-6 h-6 text-pink-600" />,
    description:
      "Visit your plot anytime with complete transparency and on-ground access.",
    body:
      "BookMyAssets offers 365-day site visit assistance so investors can personally verify development progress, infrastructure, and surroundings at any stage. We believe land investment decisions should be based on ground reality, not just brochures. This year-round access reinforces transparency, builds trust, and allows you to monitor the evolution of your investment with confidence."
  },
  {
    title: "Government Approved AUDA Plots",
    icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
    description:
      "Legally secure plots approved under AUDA and the Dholera master plan.",
    body:
      "All plots offered by BookMyAssets are AUDA-approved and backed by proper government verification. AUDA approval confirms compliance with regulatory norms and inclusion in Dholera’s official master plan. This safeguards your investment from legal complications, ensures access to planned infrastructure, and aligns your property with smart city development benefits."
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
      <div className="pt-8 py-4 bg-gray-50" id='why-bma' >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl md:text-[32px] lg:text-[40px] font-semibold text-center text-[#deae3c] mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Invest with BookMyAssets?
          </motion.h2>

          {/* Desktop: 5 cards in a row, Mobile: 1 card per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group border border-gray-200 rounded-xl p-4 md:p-5 bg-white cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                /* onClick={() => openModal(benefit, index)} */
                transition={{ delay: index * 0.1 }}
              >
                {/* Card Header */}
                <div className="text-center mb-4">
                  <motion.div 
                    className="text-3xl md:text-4xl flex justify-center items-center mb-3"
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
                 {/*  <p className="text-sm md:text-base text-gray-600 line-clamp-3 text-center">
                    {benefit.description}
                  </p> */}
                  <p className="text-sm md:text-base text-black  text-center">
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
                
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}