"use client";
import React, { useEffect, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import "./SidePop.css"
import { FaPhoneAlt } from "react-icons/fa";

export default function InfoPopup() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const callNow = "tel:+918130371647"

  // Messages to display
  const messages = [
    "📢 TATA Semiconductor Plant in Dholera is driving major industrial growth! ",
    "🏗️ Dholera Smart City is becoming a hub for electronics and manufacturing.",
    "💼 Thousands of jobs are being created through this mega investment project.",
    "🏘️ Real estate in Dholera is seeing a sharp rise in demand.",
    "🌏 Dholera is emerging as a global center for semiconductors and innovation.",
  ];

  // Auto-rotate messages every 4 seconds
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
        className="fixed bottom-12 md:bottom-8 right-5 md:right-52 bg-yellow-500 text-black p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
      >
        <IoInformationCircleOutline size={24} />
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-24 right-5 bg-white rounded-xl shadow-lg w-72 p-4 border border-gray-200 z-50 animate-slideUp">
          <p className="text-gray-800 text-sm leading-relaxed transition-opacity duration-500">
            {messages[index]}
          </p>
          <a href="tel:+918130371647"
            className="mt-2 text-sm text-blue-600 font-medium flex justify-start items-center gap-1"
          >
           <FaPhoneAlt/> Call Now 
          </a>
        </div>
      )}
    </>
  );
}
