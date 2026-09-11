"use client";

import { FaChartLine, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import GetinTouch from "./GetinTouch";

const westwynFormCtas = [
  { label: "Get Investment Details", icon: FaChartLine },
  { label: "Get Plot Details", icon: FaMapMarkedAlt },
  { label: "Get A Call Back", icon: FaPhoneAlt },
];

export default function WestwynContactForm({ onClose }) {
  return (
    <GetinTouch
      title="Register Ready Plots In Dholera From 8 Lakh"
      buttonName="Get A Call Back"
      ctaItems={westwynFormCtas}
      onClose={onClose}

      // GTM tracking
      buttonClickEvent="dscp_popup_get_call_back_click"
      formSubmitEvent="dscp_popup_form_submit"
      trackingFormName="westwyn_residency_popup"
      trackingFormLocation="westwyn_residency_section"
      trackingCtaLocation="westwyn_residency_popup"
    />

  );
}
