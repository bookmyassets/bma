"use client";

import { PhoneCall } from "lucide-react";

export default function TrackedPhoneLink() {
  const handleCallClick = () => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "click_to_call",
      lead_type: "phone",
      device: "mobile",
    });
  };

  return (
    <a
      href="tel:+918130371647"
      onClick={handleCallClick}
      className="flex items-center text-black hover:text-[#ddbc69] transition"
      aria-label="Call BookMyAssets at +91 81 30 37 16 47"
    >
      <span className="flex-shrink-0 text-[#ddbc69] mr-3">
        <PhoneCall size={18} aria-hidden="true" />
      </span>

      <span>+91 81 30 37 16 47</span>
    </a>
  );
}