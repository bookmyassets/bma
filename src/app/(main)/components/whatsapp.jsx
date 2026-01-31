import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingButtons = () => {

  const handleCallClick = () => {
    // 🔥 Google Tag Manager event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "call_click_organic",
      lead_type: "phone",
      device: "mobile",
    });

    // 📞 Call trigger
    window.location.href = "tel:+918130371647";
  };

  const handleWhatsAppClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click_organic",
      lead_type: "whatsapp",
      device: "mobile",
    });

    window.open("https://wa.me/918130371647?text=Hi%20I%20need%20a%20call%20back", "_blank");
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