import React from "react";
import Link from "next/link";

import { MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, PhoneCall } from "lucide-react";

const Footer = () => {

  const handleCallClick = () => {
    // 🔥 Google Tag Manager event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "click_to_call",
      lead_type: "phone",
      device: "mobile",
    });

    // 📞 Call trigger
    window.location.href = "tel:+918130371647";
  };

  return (
    <footer id="footer" className="bg-black py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* About Us Column */}
          <div>
            <h3 className="mb-3 border-b border-[#DDBC69] pb-1.5 text-lg font-semibold text-[#DDBC69]">
              About Us
            </h3>
            <p className="mb-3 text-sm leading-6 text-white sm:text-base">
              BookMyAssets delivers verified, AUDA-approved projects in Dholera, trusted by 1000+ investors for transparent, expert-led investments.
            </p>
            
            {/* Social Media Icons */}
            <div className="mt-4 flex space-x-4">
              <a href="https://www.facebook.com/share/1AXGEEX1M8/" className="text-white hover:text-[#DDBC69] transition">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/BookMyAssets" className="text-white hover:text-[#DDBC69] transition">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/bookmyassets/" className="text-white hover:text-[#DDBC69] transition">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/bookmyassetss" className="text-white hover:text-[#DDBC69] transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Policies Column */}
          <div>
            <h3 className="mb-3 border-b border-[#DDBC69] pb-1.5 text-lg font-semibold text-[#DDBC69]">
              Policies
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/dholera-smart-city-plots/policy/copyright"
                  className="text-white hover:text-[#DDBC69] transition flex items-center"
                >
                  <span className="mr-2">›</span> Copyright Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-smart-city-plots/policy/terms"
                  className="text-white hover:text-[#DDBC69] transition flex items-center"
                >
                  <span className="mr-2">›</span> Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-smart-city-plots/policy/privacy"
                  className="text-white hover:text-[#DDBC69] transition flex items-center"
                >
                  <span className="mr-2">›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-smart-city-plots/policy/refund-and-cancellation"
                  className="text-white hover:text-[#DDBC69] transition flex items-center"
                >
                  <span className="mr-2">›</span> Refund & Cancellation Policy
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-3 border-b border-[#DDBC69] pb-1.5 text-lg font-semibold text-[#DDBC69]">
              Reach Our Head office
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start">
                <div className="flex-shrink-0 text-[#DDBC69] mr-3 mt-1">
                  <MapPin size={18} />
                </div>
                <span className="text-white">
                  620, JMD Megapolis, Sohna Rd, Sector 48, Gurugram, India
                  122018
                </span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 text-[#DDBC69] mr-3">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:info@bookmyassets.com"
                  className="text-white hover:text-[#DDBC69] transition"
                >
                  info@bookmyassets.com
                </a>
              </li>
              <li className="flex items-center" onClick={handleCallClick}>
                <div className="flex-shrink-0 text-[#DDBC69] mr-3">
                  <PhoneCall size={18} />
                </div>
                <a
                  href="tel:+918130371647"
                  className="text-white hover:text-[#DDBC69] transition"
                >
                  +91 81 30 37 16 47
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} BookMyAssets™. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
