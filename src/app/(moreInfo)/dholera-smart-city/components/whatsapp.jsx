"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

import { twEvent, TW_EVENTS } from "../lib/twitterPixel";
import getLeadSource from "../lib/getLeadSource";

const PHONE_NUMBER = "918130371647";

export default function FloatingButtons() {
  const handleCallClick = () => {
    twEvent(TW_EVENTS.CALL_CLICK);
  };

  const handleWhatsAppClick = () => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "whatsapp_click",
      lead_type: "whatsapp",
      device: "mobile",
    });

    twEvent(TW_EVENTS.WHATSAPP_CLICK);

    const source = getLeadSource();
    const normalizedSource = source?.toLowerCase() || "";

    let text = "Hi I'm enquiring about your Dholera plots";

    if (normalizedSource.includes("twitter")) {
      text = "Hi I'm enquiring from twitter";
    }

    const message = encodeURIComponent(text);

    window.open(
      `https://wa.me/${PHONE_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      className="
        trackerx
        fixed
        bottom-0
        left-0
        z-50
        flex
        w-full
        justify-around
        bg-white
        p-3
        shadow-md
        lg:hidden
      "
      aria-label="Contact BookMyAssets"
    >
      <button
        type="button"
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center text-lg font-semibold text-green-500"
        id="whatsapp-mobile"
        aria-label="Contact BookMyAssets on WhatsApp"
      >
        <FaWhatsapp
          size={24}
          className="mr-2"
          aria-hidden="true"
        />

        WhatsApp
      </button>

      <a
        href={`tel:+${PHONE_NUMBER}`}
        onClick={handleCallClick}
        className="flex items-center justify-center text-lg font-semibold text-blue-500"
        id="call-now-mobile"
        aria-label="Call BookMyAssets"
      >
        <FaPhoneAlt
          size={24}
          className="mr-2"
          aria-hidden="true"
        />

        Call
      </a>
    </div>
  );
}