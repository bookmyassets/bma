"use client"
import React from "react";
import Link from "next/link";

import { MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, PhoneCall, Copyright, FileText, ShieldCheck, RotateCcw } from "lucide-react";

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
    <footer id="footer" className="border-t border-[#ddbc69]/15 bg-[#101a16] pb-24 pt-8 text-[14px] text-white/75 md:pb-8 md:text-[16px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Us Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#ddbc69] mb-4 border-b border-[#ddbc69]/20 pb-2">
              About Us
            </h3>
            <p className="text-white/75 mb-4">
              BookMyAssets delivers verified, clear documentation and project details in Dholera - trusted by 500+ investors for transparent, expert-led investments.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/share/1AXGEEX1M8/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-400 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]"><Facebook aria-hidden="true" size={20} /></a>
              <a href="https://x.com/BookMyAssets" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-400 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]"><Twitter aria-hidden="true" size={20} /></a>
              <a href="https://www.instagram.com/bookmyassets/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-pink-400/20 bg-pink-400/10 text-pink-400 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]"><Instagram aria-hidden="true" size={20} /></a>
              <a href="https://www.linkedin.com/company/bookmyassetss" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-300/10 text-blue-300 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]"><Linkedin aria-hidden="true" size={20} /></a>
            </div>
          </div>
          
          {/* Policies Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#ddbc69] mb-4 border-b border-[#ddbc69]/20 pb-2">
              Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/plots-for-sale-in-dholera/policy/copyright"
                  className="text-white/75 hover:text-[#ddbc69] transition flex items-center"
                >
                  <Copyright aria-hidden="true" size={17} strokeWidth={1.6} className="mr-2 shrink-0 text-blue-400" /> Copyright Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/plots-for-sale-in-dholera/policy/terms"
                  className="text-white/75 hover:text-[#ddbc69] transition flex items-center"
                >
                  <FileText aria-hidden="true" size={17} strokeWidth={1.6} className="mr-2 shrink-0 text-violet-400" /> Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/plots-for-sale-in-dholera/policy/privacy"
                  className="text-white/75 hover:text-[#ddbc69] transition flex items-center"
                >
                  <ShieldCheck aria-hidden="true" size={17} strokeWidth={1.6} className="mr-2 shrink-0 text-emerald-400" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/plots-for-sale-in-dholera/policy/refund-and-cancellation"
                  className="text-white/75 hover:text-[#ddbc69] transition flex items-center"
                >
                  <RotateCcw aria-hidden="true" size={17} strokeWidth={1.6} className="mr-2 shrink-0 text-amber-400" /> Refund & Cancellation Policy
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#ddbc69] mb-4 border-b border-[#ddbc69]/20 pb-2">
              Reach Our Head Office
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-400/10 text-rose-400">
                  <MapPin size={18} />
                </div>
                <span className="text-white/75">
                  620, JMD Megapolis, Sohna Rd, Sector 48, Gurugram, India
                  122018
                </span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-400">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:info@bookmyassets.com"
                  className="text-white/75 hover:text-[#ddbc69] transition"
                >
                  info@bookmyassets.com
                </a>
              </li>
              <li className="flex items-center" onClick={handleCallClick}>
                <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                  <PhoneCall size={18} />
                </div>
                <a
                  href="tel:+918130371647"
                  className="text-white/75 hover:text-[#ddbc69] transition"
                >
                  +91 81 30 37 16 47
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/45 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} BookMyAssets™. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
