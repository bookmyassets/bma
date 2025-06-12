"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import logo from "@/assests/Bmalogo.png";

export default function LandingPage({ img1, mimg1, openForm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Check localStorage to see if popup was already shown
      const popupShown = localStorage.getItem('popupShown');
      
      if (!popupShown) {
        const timer = setTimeout(() => {
          openForm();
          localStorage.setItem('popupShown', 'true');
        }, 2000); // 5 seconds

        const handleScroll = () => {
          if (window.scrollY > window.innerHeight * 0.05) {
            openForm();
            localStorage.setItem('popupShown', 'true');
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
          }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
          clearTimeout(timer);
        };
      }
    }
  }, [openForm]);

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
        try {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => setRecaptchaLoaded(true);
          script.onerror = () => {
            console.error("Failed to load reCAPTCHA script");
            setRecaptchaLoaded(true); // Fallback
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true); // Fallback
        }
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    return true;
  };

  const checkSubmissionLimit = () => {
    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    }

    if (submissionCount >= 3) {
      setErrorMessage("You have reached the maximum submission limit. Try again after 24 hours.");
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const now = Date.now();
      
      const response = await fetch(
        "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },
          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: formData.phone,
              source: "BookMyAssets Website Home",
            },
            source: "BookMyAssets Website",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        }
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
        setShowFormPopup(false);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(error.message || "Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
      
      // Reset reCAPTCHA
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.reset(recaptchaRef.current);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm() || !checkSubmissionLimit()) {
      setIsLoading(false);
      return;
    }

    // If reCAPTCHA is loaded, render it in the ref
    if (window.grecaptcha && recaptchaLoaded) {
      try {
        if (recaptchaRef.current && !recaptchaRef.current.innerHTML) {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "dark",
          });
        } else {
          window.grecaptcha.reset();
          window.grecaptcha.execute();
        }
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  // Animation variants (unchanged from your original)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#FDB913",
      color: "#000",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative pt-12 md:pt-16 h-[85vh] md:h-[78vh]">
      {/* Background Images (unchanged) */}
      <div className="absolute inset-0 hidden lg:block">
        <Image src={img1} alt="Investment Opportunity" className="w-full pt-[54px]" priority />
      </div>
      <div className="absolute inset-0 block lg:hidden">
        <Image src={mimg1} alt="Investment Opportunity Mobile" fill className="pt-12 bg-black" priority />
      </div>

      {/* Contact Us Button - Bottom-Centered & Responsive */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center items-center pb-2 max-sm:pb-0">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={buttonVariants}>
            <motion.button
              whileHover="hover"
              onClick={() => setShowFormPopup(true)}
              className="font-semibold px-8 py-3 border border-white rounded-full bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black text-sm md:text-base shadow-lg"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Popup (unchanged) */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
          >
            {/* Success popup content */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Popup with reCAPTCHA */}
      <AnimatePresence>
        {showFormPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full relative"
            >
              {/* Logo */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black p-2  shadow-lg"
                >
                  <Image
                    src={logo}
                    alt="Logo"
                    width={60}
                    height={60}
                    className=""
                  />
                </motion.div>
              </div>  

              <button
                onClick={() => setShowFormPopup(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-6 pt-4"
              >
                {/* <h2 className="text-3xl font-bold text-white mb-2">
                  Book Free Consultation
                </h2>
                <p className="text-gray-300 text-sm">
                  Fill this form to explore premium investment opportunities
                </p> */}
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <p className="text-2xl font-semibold text-white">Get Expert Guidance on Dholera Investment</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
                  <input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
                  />
                </motion.div>

                {/* reCAPTCHA container */}
                <div className="flex justify-center">
                  <div ref={recaptchaRef}></div>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || !recaptchaLoaded}
                  className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Book Consultation"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}