import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import img from "@/assests/strategic-location-dholera.webp"
import infra from "@/assests/residential/dholera-strong-connectivity.webp"
import govtSupport from "@/assests/residential/government-support-dholera.webp"
import safe from "@/assests/residential/safe-investment.webp"
import growth from "@/assests/residential/exceptional-growth.webp"
import Image from "next/image";

export default function InvestmentBenefits() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState(0); // Default to first benefit
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate benefits every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle swipe for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // Minimum swipe distance
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setHoveredBenefit((prev) => (prev + 1) % benefits.length);
    } else if (isRightSwipe) {
      setHoveredBenefit(
        (prev) => (prev - 1 + benefits.length) % benefits.length
      );
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  const updateHoveredBenefit = (index) => {
    setHoveredBenefit(index);
  };

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
      title: "Prime Location Advantage",
      icon: "📍",
      description:
        "Situated 0 km from Dholera SIR on the state highway, right at the city’s growth center.",
      body: "Strategically positioned on Navda Highway, 0 km from Dholera SIR and close to TP 5, ensuring you are at the heart of the region's fastest development zone. Just 25 minutes away from the activation area.",
      image:
        img,
    },
    {
      title: "Connectivity to Mega Infrastructure",
      icon: "🏗️",
      description: "Close to Hebatpur Industrial Zone, Expressway and Proposed Monorail.",
      body: "Minutes from the upcoming Dholera International Airport, Ahmedabad–Dholera Expressway, and proposed monorail, making it a future hub of connectivity in Dholera.",
      image:
        infra,
    },
    {
      title: "Government-Backed Smart City Growth",
      icon: "⚖️",
      description: "Part of the DMIC project, supported by the Central and State Governments.",
      body: "Part of Dholera Smart City under the Delhi–Mumbai Industrial Corridor (DMIC), a project supported by both Central and State Governments.",
      image:
        govtSupport,
    },
    {
      title: "Secure & Approved Investment",
      icon: "📈",
      description: "NA/NOC cleared, AUDA-registered, and title-clear plots for safe ownership.",
      body: "NA/NOC cleared, AUDA-registered, and title-clear plots in Dholera, ensuring complete legal transparency and a safe investment.",
      image:
        safe,
    },
    {
      title: "High Appreciation Potential",
      icon: "✅",
      description:
        "Early buyers benefit from rising demand in India’s upcoming semiconductor hub.",
      body: "Early investors benefit from rapid value growth as residential, industrial, and commercial projects shape the region. This makes it a smart Dholera SIR investment opportunity.",
      image:
        growth,
    },
  ];

  // Create reordered benefits array for mobile
  const getReorderedBenefits = () => {
    if (!isMobile) return benefits;

    const reordered = [...benefits];
    if (hoveredBenefit !== 0) {
      const selectedBenefit = reordered.splice(hoveredBenefit, 1)[0];
      reordered.unshift(selectedBenefit);
    }
    return reordered;
  };

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
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
          Why WestWyn Estate?
        </motion.h2>

        {/* Desktop: Dynamic Image Display */}
        {!isMobile && (
          <motion.div
            className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl "
            key={hoveredBenefit} // Key change triggers re-render
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={benefits[hoveredBenefit].image}
              alt={benefits[hoveredBenefit].title}
              className="w-full h-full object-cover "
            />
            {/* Image overlay with benefit title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg md:text-xl text-center font-semibold">
                  {benefits[hoveredBenefit].title}
                </p>
                
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile: Single Image with Swipe */}
        {isMobile && (
          <div
            className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Single Image Container */}
            <div className="w-full h-full relative ">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredBenefit}
                  className="w-full h-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={benefits[hoveredBenefit].image}
                    alt={benefits[hoveredBenefit].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Animated Title Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 text-white"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <motion.div
                        className="flex items-center mb-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <span className="text-2xl mr-3">
                          {benefits[hoveredBenefit].icon}
                        </span>
                        <h3 className="text-xl font-bold">
                          {benefits[hoveredBenefit].title}
                        </h3>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {benefits.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    hoveredBenefit === index
                      ? "bg-white scale-125"
                      : "bg-white/50"
                  }`}
                  onClick={() => updateHoveredBenefit(index)}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
              onClick={() =>
                updateHoveredBenefit(
                  hoveredBenefit > 0 ? hoveredBenefit - 1 : benefits.length - 1
                )
              }
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
              onClick={() =>
                updateHoveredBenefit(
                  hoveredBenefit < benefits.length - 1 ? hoveredBenefit + 1 : 0
                )
              }
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="pt-8 py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: 5 cards in a row, Mobile: Reordered cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 ">
            <AnimatePresence mode="popLayout">
              {(isMobile
                ? benefits.filter((_, idx) => idx === hoveredBenefit) // 1 card on mobile
                : getReorderedBenefits()
              ) // all cards on desktop
                .map((benefit, displayIndex) => {
                  const originalIndex = benefits.findIndex(
                    (b) => b.title === benefit.title
                  );
                  const isHighlighted = hoveredBenefit === originalIndex;

                  return (
                    <motion.div
                      key={benefit.title}
                      layout
                      className={`group border-2 rounded-xl p-4 md:p-5 bg-white cursor-pointer transition-all duration-300 
            ${
              isHighlighted
                ? "border-[#deae3c] bg-[#deae3c]/5 transform scale-105"
                : "border-gray-200 hover:border-[#deae3c]/30"
            }`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                      onClick={() => openModal(benefit, originalIndex)}
                      onMouseEnter={() =>
                        !isMobile && setHoveredBenefit(originalIndex)
                      }
                    >
                      <div className="text-center mb-4">
                        <motion.div
                          className="text-3xl md:text-4xl mb-3"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {benefit.icon}
                        </motion.div>
                        <h3 className="text-lg md:text-xl font-semibold text-[#deae3c]">
                          {benefit.title}
                        </h3>
                      </div>

                      <motion.div
                        className="mb-4 text-sm text-gray-600 text-center"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ delay: 0.4 }}
                      >
                        {benefit.description}
                      </motion.div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
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
                {/* Modal Header with Image */}
                <div className="mb-6">
                  <motion.div
                    className="w-full h-48 md:h-64 rounded-lg overflow-hidden mb-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Image
                      src={selectedBenefit.image}
                      alt={selectedBenefit.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

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