"use client";
import React, { useEffect, useState } from "react";
import { IoInformationCircleOutline, IoClose } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import "./SidePop.css";

export default function InfoPopup() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const callNow = "tel:+918130371647";

  const messages = [
    "📢 TATA Semiconductor Plant in Dholera is driving major industrial growth!",
    "🏗️ Dholera Smart City is becoming a hub for electronics and manufacturing.",
    "💼 Thousands of jobs are being created through this mega investment project.",
    "🏘️ Real estate in Dholera is seeing a sharp rise in demand.",
    "🌏 Dholera is emerging as a global center for semiconductors and innovation.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
      setOpen(true);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Info Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-16 md:bottom-8 right-5 md:right-52 bg-yellow-500 text-black p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
      >
        <IoInformationCircleOutline size={24} />
      </button>

      {/* Popup */}
      {open && (
        <div
          className="
          fixed bottom-28 right-3
          sm:right-5 sm:bottom-24
          md:right-52 md:bottom-24
          bg-white rounded-xl shadow-xl 
          w-[90%] sm:w-80 
          p-4 border border-gray-200 
          z-50 animate-slideUp
          transition-all
        "
        >
          {/* ❌ Close Icon */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-black transition"
          >
            <IoClose size={20} />
          </button>

          {/* Popup Text */}
          <p className="text-gray-800 text-sm leading-relaxed pr-6">
            {messages[index]}
          </p>

          {/* Call Button */}
          <a
            href={callNow}
            className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline"
          >
            <FaPhoneAlt /> Call Now
          </a>
        </div>
      )}
    </>
  );
}
