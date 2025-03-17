import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingButtons = () => {
  return (
    <>
      {/* Desktop View - Floating Buttons on Bottom Right */}
      <div className="hidden md:flex flex-col fixed bottom-6 right-6 space-y-3 z-50">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919717671112"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
        >
          <FaWhatsapp size={24} />
        </a>
        {/* Call Button */}
        <a
          href="tel:+919876543210"
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
        >
          <FaPhoneAlt size={24} />
        </a>
      </div>

      {/* Mobile View - Fixed Box at Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-3 flex justify-around md:hidden z-50">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-green-500 text-lg font-semibold"
        >
          <FaWhatsapp size={24} className="mr-2" /> WhatsApp
        </a>
        {/* Call Button */}
        <a
          href="tel:+919876543210"
          className="flex items-center justify-center text-blue-500 text-lg font-semibold"
        >
          <FaPhoneAlt size={24} className="mr-2" /> Call
        </a>
      </div>
    </>
  );
};

export default FloatingButtons;
