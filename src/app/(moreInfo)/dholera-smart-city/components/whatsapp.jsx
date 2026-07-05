import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { twEvent, TW_EVENTS } from "../lib/twitterPixel";
import getLeadSource from "../lib/getLeadSource";

const SOURCE_MESSAGES = {
  twitter: "Hi I'm enquiring from twitter",
  google: "Hi I'm enquiring from google",
  meta: "Hi I'm enquiring from facebook",
  default: "Hi I'm enquiring about your Dholera plots",
};

const FloatingButtons = () => {
  const handleCallClick = () => {
    twEvent(TW_EVENTS.CALL_CLICK);
    window.location.href = "tel:+918130371647";
  };

  const handleWhatsAppClick = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    lead_type: "whatsapp",
    device: "mobile",
  });

  twEvent(TW_EVENTS.WHATSAPP_CLICK);

  const source = getLeadSource(); // e.g. "BookMyAssets Twitter Ads"
  const isTwitter = source.toLowerCase().includes("twitter");
  const text = isTwitter
    ? "Hi I'm enquiring from twitter"
    : "Hi I'm enquiring about your Dholera plots";

  const message = encodeURIComponent(text);
  window.open(`https://wa.me/918130371647?text=${message}`, "_blank");
};

  return (
    <>
      <div className="trackerx fixed bottom-0 left-0 w-full bg-white shadow-md p-3 flex justify-around lg:hidden z-50">
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center text-green-500 text-lg font-semibold"
          id="whatsapp-mobile"
        >
          <FaWhatsapp size={24} className="mr-2" /> WhatsApp
        </button>

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