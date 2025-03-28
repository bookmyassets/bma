"use client";
import { useState, useEffect } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assests/Bmalogo.png"; // Adjust the path to your logo

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(true);

  

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
      alert("You have reached the maximum submission limit. Try again after 24 hours.");
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
            fields: { name: formData.fullName, phone: formData.phone, source: "BookMyAssets" },
            source: "Dholera Times Website",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
          }),
        }
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
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
    isFormOpen && (
  <div className="fixed inset-0 transform translate-y-80 flex justify-center items-center bg-black bg-opacity-50 p-4 z-50">
    <motion.div
      initial={{ scale: 0.9, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 50 }}
      className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full relative"
    >
      {/* Close Button */}
      <button
        onClick={() => setIsFormOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      {/* Logo */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black p-2 rounded-full shadow-lg"
        >
          <Image src={logo} alt="Logo" width={60} height={60} className="rounded-full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-6 pt-4"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
        <p className="text-gray-300 text-sm">Fill this form to explore premium investment opportunities</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
          />
        </div>

        <div className="relative">
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
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold"
        >
          {isLoading ? "Submitting..." : "Request Exclusive Consultation"}
        </button>
      </form>
    </motion.div>
  </div>
)

    
  );
}