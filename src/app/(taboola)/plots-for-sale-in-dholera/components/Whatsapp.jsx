"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const PHONE = "+918130371647";
const WA_URL = `https://wa.me/918130371647?text=${encodeURIComponent("Hi, I need a call back")}`;

// Safe GTM push — won't throw if dataLayer isn't ready yet
function pushEvent(payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}
  
const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCallClick = () => {
      _tfa.push({notify: 'event', name: 'Whatsapp', id: 2018249})
    window.location.href = `tel:${PHONE}`;
  };

  const handleWhatsAppClick = () => {
      _tfa.push({notify: 'event', name: 'Whatsapp', id: 2018249})
    // noopener,noreferrer — security best practice for _blank links
    window.open(WA_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`trackerx fixed bottom-0 left-0 z-50 flex w-full justify-around bg-white p-3 shadow-md transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none lg:hidden ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}
      role="toolbar"
      aria-label="Quick contact options"
      aria-hidden={!isVisible}
    >
      <button
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center gap-2 text-green-500 text-lg font-semibold touch-manipulation"
        id="whatsapp-mobile"
        type="button"
        tabIndex={isVisible ? 0 : -1}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} aria-hidden="true" />
        WhatsApp
      </button>

      <button
        onClick={handleCallClick}
        className="flex items-center justify-center gap-2 text-blue-500 text-lg font-semibold touch-manipulation"
        id="call-now-mobile"
        type="button"
        tabIndex={isVisible ? 0 : -1}
        aria-label="Call us now"
      >
        <FaPhoneAlt size={24} aria-hidden="true" />
        Call
      </button>
    </div>
  );
};

export default FloatingButtons;
