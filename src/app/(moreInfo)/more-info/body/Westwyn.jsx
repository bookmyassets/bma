"use client";
import React, { useState, useEffect } from "react";
import govtApprovedProject from "@/assests/landing/govt-approved-project.webp";
import salesDeed from "@/assests/landing/immediate-sale-deed.webp";
import afterSales from "@/assests/landing/after-sales.webp";
import nanoc from "@/assests/landing/naNoc.webp";
import residential from "@/assests/landing/residentialPlot.webp";
import hidden from "@/assests/landing/hiddenCharges.webp";
import Image from "next/image";
import projectImage from "@/assests/landing/westwyn-project.webp"; 
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "../components/BrochureForm";

// Icons for new features
import { Dumbbell, ShieldCheck, Waves, Battery } from "lucide-react";

const features = [
  {
    icon: nanoc,
    title: "NA/NOC Plots",
    description: "Approved plots with all necessary clearances",
  },
  {
    icon: residential,
    title: "Residential Plots",
    description: "Premium residential plotting options",
  },
  {
    icon: hidden,
    title: "Transparent Pricing",
    description: "No hidden charges, clear pricing structure",
  },
  {
    icon: govtApprovedProject,
    title: "Govt Approved Projects",
    description: "Fully government approved and verified",
  },
  {
    icon: salesDeed,
    title: "Immediate Sale Deed",
    description: "Quick documentation and registration",
  },
  {
    icon: afterSales,
    title: "After Sales Support",
    description: "Comprehensive post-purchase assistance",
  },
];

const amenities = [
  {
    icon: <Dumbbell className="w-10 h-10 text-[#d7b36c]" />,
    title: "Yoga Center",
    description: "Dedicated space for wellness and meditation"
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-[#d7b36c]" />,
    title: "24/7 CCTV Surveillance",
    description: "Round-the-clock security monitoring"
  },
  {
    icon: <Waves className="w-10 h-10 text-[#d7b36c]" />,
    title: "Swimming Pool",
    description: "Resort-style pool for recreation"
  },
  {
    icon: <Battery className="w-10 h-10 text-[#d7b36c]" />,
    title: "EV Charging Stations",
    description: "Future-ready infrastructure for electric vehicles"
  }
];

export default function Westwyn() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [investmentYear, setInvestmentYear] = useState(5);
  const [plotSize, setPlotSize] = useState(200);
  const [customYear, setCustomYear] = useState("");
  
  const baseRate = 9250; // Current price per sq. yard
  const targetRate = 17000; // Price after 5 years
  const annualGrowthRate = 0.05; // 5% annual growth
  
  const calculateFutureValue = (years) => {
    // If years is 2 or less, use linear interpolation to match exactly 13000 at 2 years
    if (years <= 5) {
      const incrementPerYear = (targetRate - baseRate) / 5;
      return baseRate + (incrementPerYear * years);
    } else {
      // For years > 2, use compound growth at 5% from the 2-year mark
      return targetRate * Math.pow(1 + annualGrowthRate, years - 5);
    }
  };
  
  const calculateInvestment = () => {
    let years = investmentYear;
    if (customYear) {
      years = parseInt(customYear);
    }
    
    const futureRate = calculateFutureValue(years);
    const currentInvestment = baseRate * plotSize;
    const futureValue = futureRate * plotSize;
    const profit = futureValue - currentInvestment;
    const percentageGrowth = ((futureValue / currentInvestment) - 1) * 100;
    
    return {
      currentValue: currentInvestment,
      futureValue: futureValue,
      profit: profit,
      percentageGrowth: percentageGrowth,
      ratePerSqYard: futureRate
    };
  };
  
  const investmentDetails = calculateInvestment();

  const openContactForm = () => {
    setIsContactFormOpen(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
    // Enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };
  
  useEffect(() => {
    // Initialize animation observers when component mounts
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all animation elements
    document.querySelectorAll('.fade-in-up, .feature-item, .project-image, .amenity-item, .investment-calculator')
      .forEach(el => observer.observe(el));
      
    return () => {
      observer.disconnect();
      // Ensure we clean up by enabling scrolling when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <style jsx global>
        {`
          /* Fade in animation */
          .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition:
              opacity 0.6s ease,
              transform 0.6s ease;
          }

          .fade-in-up.animate-visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Staggered animation for feature items */
          .feature-item, .amenity-item {
            opacity: 0;
            transform: translateX(-30px);
            transition:
              opacity 0.5s ease,
              transform 0.5s ease;
          }

          .feature-item.animate-visible, .amenity-item.animate-visible {
            opacity: 1;
            transform: translateX(0);
          }

          .feature-item:nth-child(1), .amenity-item:nth-child(1) {
            transition-delay: 0.1s;
          }
          .feature-item:nth-child(2), .amenity-item:nth-child(2) {
            transition-delay: 0.2s;
          }
          .feature-item:nth-child(3), .amenity-item:nth-child(3) {
            transition-delay: 0.3s;
          }
          .feature-item:nth-child(4), .amenity-item:nth-child(4) {
            transition-delay: 0.4s;
          }
          .feature-item:nth-child(5) {
            transition-delay: 0.5s;
          }
          .feature-item:nth-child(6) {
            transition-delay: 0.6s;
          }

          /* Project image animation */
          .project-image {
            opacity: 0;
            transform: translateX(50px);
            transition:
              opacity 0.8s ease,
              transform 0.8s ease;
          }

          .project-image.animate-visible {
            opacity: 1;
            transform: translateX(0);
          }
          
          /* Calculator animation */
          .investment-calculator {
            opacity: 0;
            transform: translateY(30px);
            transition:
              opacity 0.8s ease,
              transform 0.8s ease;
            transition-delay: 0.3s;
          }
          
          .investment-calculator.animate-visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          /* Modal styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
          }
          
          .modal-content {
            background: white;
            border-radius: 0.5rem;
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }
          
          /* Add spacing between sections */
          .westwyn-container section {
            margin-bottom: 5rem;
          }
        `}
      </style>

      <div id="westwyn-county" className="westwyn-container bg-gray-50 mb-8">
        {/* Header Section */}
        <section className="max-w-7xl pt-8 mx-auto px-4 mb-16">
          <div className="text-center space-y-4">
            <h1 className="text-xl md:text-4xl font-bold text-gray-800">
              WestWyn County
            </h1>
            <div className="bg-[#d7b36c] w-48 mx-auto h-1"></div>
            <p className="font-light italic text-gray-600 text-lg max-w-2xl mx-auto">
              A Premium Verified Plot on Fedra-Pipli Highway - Your Gateway to
              Smart City Living
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <div className="space-y-8">
              <div className="">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Why Choose WestWyn County?
                </h2>
                <p className="text-gray-600 mb-8">
                  Experience premium living with world-class amenities and
                  modern infrastructure in Dholera's most sought-after
                  residential project.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="westwyn-feature-card feature-item flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Project Image */}
            <div className="lg:pl-8">
              <div className="relative">
                {/* Main Project Image */}
                <div className="project-image relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                  {/* Replace with actual project image */}
                  <Image
                    src={projectImage}
                    alt="WestWyn County Project"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Overlay with project details */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">WestWyn County</h3>
                    <p className="text-sm opacity-90">
                      Premium Plotting Project
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="bg-[#d7b36c] px-3 py-1 rounded-full text-sm font-semibold">
                        AUDA Approved
                      </span>
                      <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                        Possession Ready
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Info Cards */}
                <div className="westwyn-floating-card absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-48">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#d7b36c]">
                      ₹18L+
                    </div>
                    <div className="text-sm text-gray-600">Starting Price</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* New Amenities Section */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Premium Amenities</h2>
            <div className="bg-[#d7b36c] w-32 mx-auto h-1 mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience luxury living with our exclusive amenities designed for comfort and convenience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <div 
                key={index} 
                className="amenity-item bg-white rounded-lg shadow-md p-6 text-center transition-all hover:shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  {amenity.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Investment Calculator Section */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="investment-calculator bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#d7b36c] p-6 text-white">
              <h2 className="text-2xl font-bold">Investment Calculator</h2>
              <p>See how your investment grows over time</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Plot Size (sq. yards)</label>
                    <div className="flex space-x-4">
                      {[200, 300, 400].map(size => (
                        <button 
                          key={size}
                          onClick={() => setPlotSize(size)} 
                          className={`py-2 px-4 rounded-md ${
                            plotSize === size 
                              ? 'bg-[#d7b36c] text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Investment Duration</label>
                    <div className="flex space-x-4 mb-4">
                      {[5, 7, 10].map(year => (
                        <button 
                          key={year}
                          onClick={() => {
                            setInvestmentYear(year);
                            setCustomYear("");
                          }} 
                          className={`py-2 px-4 rounded-md ${
                            investmentYear === year && !customYear
                              ? 'bg-[#d7b36c] text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {year} Years
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Investment Growth</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Price per sq. yard:</span>
                      <span className="font-semibold">₹{baseRate.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Future Price per sq. yard:</span>
                      <span className="font-semibold">₹{Math.round(investmentDetails.ratePerSqYard).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Investment:</span>
                      <span className="font-semibold">₹{Math.round(investmentDetails.currentValue).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg text-[#d7b36c]">
                      <span className="font-semibold">Future Value:</span>
                      <span className="font-bold">₹{Math.round(investmentDetails.futureValue).toLocaleString()}</span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Potential Profit:</span>
                        <span className="font-semibold text-green-600">₹{Math.round(investmentDetails.profit).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth:</span>
                        <span className="font-semibold text-green-600">{Math.round(investmentDetails.percentageGrowth)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={openContactForm}
                    className="mt-6 bg-[#d7b36c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c4a055] transition-colors w-full"
                  >
                    Invest Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Combined Row for Ready to Invest and Statistics - Reversed Order */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Statistics Section - Now First */}
            <div className="fade-in-up bg-black rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#d7b36c] mb-2">
                    200+
                  </div>
                  <div className="text-white text-sm">Sq. Yards Plots</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#d7b36c] mb-2">
                    24x7
                  </div>
                  <div className="text-white text-sm">Security</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#d7b36c] mb-2">
                    100%
                  </div>
                  <div className="text-white text-sm">Legal Approval</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#d7b36c] mb-2">
                    70+
                  </div>
                  <div className="text-white text-sm">Plots</div>
                </div>
              </div>
            </div>
            
            {/* Ready to Invest Section - Now Second */}
            <div className="westwyn-feature-card fade-in-up p-6 bg-gradient-to-r from-[#d7b36c] to-[#c4a055] rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-3">Ready to Invest?</h3>
              <p className="mb-4 opacity-90">
                Don't miss this opportunity to be part of India's first smart
                city.
              </p>
              <button
                onClick={openContactForm}
                className="westwyn-cta-button bg-white text-[#d7b36c] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us Today
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Contact Form Modal - Using AnimatePresence for animation */}
      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactForm}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Book A Free Consultation Today
                  </h3>
                  <button
                    onClick={closeContactForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <ContactForm
                  title="Book A Free Consultation Today"
                  buttonName="Get A Call Back"
                  onClose={closeContactForm}
                />
                <button
                  onClick={closeContactForm}
                  className="bg-[#d7b36c] text-white px-4 py-2 rounded w-full mt-4"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}