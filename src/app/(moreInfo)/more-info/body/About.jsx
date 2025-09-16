import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      title: "Prime Location",
      icon: "📍",
      description: "Near Ahmedabad–Dholera Expressway, Dholera International Airport, and Dholera Port.",
      body: "Located on Fedra-Pipli State Highway, just 12 minutes from Ahmedabad-Dholera Expressway, Dholera International Airport, Metro, and industrial hubs, including the TATA Semiconductor Plant (25 minutes away) and Dedicated Freight Corridor. This strategic positioning ensures excellent connectivity and access to major transportation networks, making it an ideal location for residential and commercial investments."
    },
    {
      title: "Future-Ready Investment",
      icon: "📈",
      description: "Part of India’s first Greenfield Smart City",
      body: "We offer registry-ready plots with flexible payment plans on Dholera residential plots. Our team ensures end-to-end assistance with resale support and buyback assistance*. Our investment-friendly approach includes easy financing options, transparent pricing, and comprehensive documentation support to make your investment journey smooth and hassle-free."
    },
    {
      title: "Government-Verified",
      icon: "🌿",
      description: "100% legal, clear titles, registry-ready",
      body: "We offer immediate registry on Dholera plots with NA/NOC clearance and clear titles. All our properties undergo thorough due diligence and are verified by relevant government authorities. This ensures complete legal security and peace of mind for our investors, with all necessary approvals and documentation in place."
    },
    {
      title: "High Growth Potential",
      icon: "✅",
      description: "Backed by Dholera Customs Port, Solar Power Plant, and ABCD Building.",
      body: "Early-stage entry in a developing future-ready city, with potential for 3-10x appreciation by 2030. Dholera is India's first smart city and is poised to become a major economic hub. Investing now provides the opportunity to capitalize on the growth trajectory as infrastructure develops and property values increase significantly over time."
    },
    {
      title: "Smart Infrastructure",
      icon: "🏆",
      description: "Metro city level planning with next-gen utilities.",
      body: "9 meter and 12 meter internal roads, underground trunk infrastructure for wire cables, and water and drainage systems. The development features modern urban planning with smart city amenities including reliable power supply, efficient waste management, high-speed internet connectivity, and sustainable environmental practices that enhance quality of life."
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
            className="text-3xl md:text-[32px] lg:text-[40px] font-light text-center text-[#deae3c] mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Invest in WestWyn County?
          </motion.h2>

          {/* Desktop: 5 cards in a row, Mobile: 1 card per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
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