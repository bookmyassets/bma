import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { twEvent, TW_EVENTS } from "../lib/twitterPixel"; // 👈 add this

const FloatingButtons = () => {
  const handleCallClick = () => {
    // 🐦 Twitter Pixel event
    twEvent(TW_EVENTS.CALL_CLICK); // 👈 add this

    // 📞 Call trigger
    window.location.href = "tel:+918130371647";
  };

  const handleWhatsAppClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      lead_type: "whatsapp",
      device: "mobile",
    });

    // 🐦 Twitter Pixel event
    twEvent(TW_EVENTS.WHATSAPP_CLICK); // 👈 add this

    window.open("https://wa.me/918130371647", "_blank");
  };

  return (
    <>
      {/* Mobile View - Fixed Box at Bottom */}
      <div className="trackerx fixed bottom-0 left-0 w-full bg-white shadow-md p-3 flex justify-around lg:hidden z-50">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center text-green-500 text-lg font-semibold"
          id="whatsapp-mobile"
        >
          <FaWhatsapp size={24} className="mr-2" /> WhatsApp
        </button>

        {/* Call Button */}
        <button
          onClick={handleCallClick}
          className="flex items-center justify-center text-blue-500 text-lg font-semibold"
          id="call-now-mobile"
        >
          <FaPhoneAlt size={24} className="mr-2" /> Call
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
