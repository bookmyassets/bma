"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaUser, FaPhoneAlt} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import logo from "@/assests/Bmalogo.png"; // Adjust path to your logo

export default function LandingPage({ img1, img2, img3, img4, mimg1, mimg2, mimg3, mimg4 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const sliderImages = [img1, img2, img3, img4];
  const mobilesliderImages = [mimg1, mimg2, mimg3, mimg4];

  useEffect(() => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    }

    if (submissionCount >= 3) {
      alert(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      setIsLoading(false);
      return;
    }

    if (!formData.fullName || !formData.phone) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
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
              source: "BookMyAssets",
            },
            source: "Dholera Times Website",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
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
        alert("Error submitting form");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-[90vh]">
      {/* Slider Section */}
      <div className="absolute inset-0 max-sm:hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop={true}
          pagination={{ clickable: true }}
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[90vh] ">
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="max-sm:object-contain bg-black"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="absolute inset-0 lg:hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop={true}
          pagination={{ clickable: true }}
        >
          {mobilesliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[90vh] ">
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  fill
                  className=" bg-black"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 h-[90vh] flex items-center justify-center">
        {" "}
        {/* Added justify-center */}
        <div className="container mx-auto px-4 w-full">
          {" "}
         
          <div
            className="flex flex-col items-center text-center space-y-4 w-full" /* Added items-center and w-full */
          >
            <h1 className="text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FDB913] to-[#C69C21] px-4">
              Your Perfect Investment Opportunity
            </h1>
            <p className="text-base md:text-xl max-w-2xl bg-clip-text text-white px-4">
              BookMyAssets™ is your trusted real estate partner, offering
              premium commercial and residential investment opportunities with
              unparalleled service.
            </p>
            <div
              className="flex space-x-4 pt-4"
            >
              
              <button
                onClick={() => setShowFormPopup(true)}
                className="px-6 py-2 border border-white rounded-full hover:bg-[#FDB913] bg-black hover:text-black transition text-sm md:text-base text-[#FDB913]"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-6 rounded-xl text-center max-w-md"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-4xl text-green-500 mb-3"
              >
                ✓
              </motion.div>
              <h3 className="text-xl font-bold mb-3">Thank You!</h3>
              <p className="text-gray-600 mb-4 text-sm">
                We've received your details. Our team will contact you shortly
                to discuss your investment opportunities.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPopup(false)}
                className="w-full p-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition text-sm"
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Popup */}
      <AnimatePresence>
        {showFormPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
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
                  className="bg-black  p-2 rounded-full shadow-lg"
                >
                  <Image
                    src={logo}
                    alt="Logo"
                    width={60}
                    height={60}
                    className="rounded-full"
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
                <h2 className="text-3xl font-bold text-white mb-2">
                  Get Started
                </h2>
                <p className="text-gray-300 text-sm">
                  Fill this form to explore premium investment opportunities
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
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

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
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
                    "Request Exclusive Consultation"
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
