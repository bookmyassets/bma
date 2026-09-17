import React from "react";
import Link from "next/link";

import {
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

import TrackedPhoneLink from "./TrackedPhoneLink";

const Footer = () => {
  return (
    <footer id="footer" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold text-[#ddbc69] mb-4 border-b border-[#ddbc69] pb-2">
              About Us
            </h3>

            <p className="text-black mb-4">
              Book My Assets delivers verified, AUDA-approved projects in
              Dholera — trusted by 1000+ investors for transparent,
              expert-led investments.
            </p>

            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/share/1AXGEEX1M8/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BookMyAssets on Facebook"
                className="text-gray-500 hover:text-[#ddbc69] transition"
              >
                <Facebook size={20} aria-hidden="true" />
              </a>

              <a
                href="https://x.com/BookMyAssets"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BookMyAssets on X"
                className="text-gray-500 hover:text-[#ddbc69] transition"
              >
                <Twitter size={20} aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/bookmyassets/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BookMyAssets on Instagram"
                className="text-gray-500 hover:text-[#ddbc69] transition"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/company/bookmyassetss"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BookMyAssets on LinkedIn"
                className="text-gray-500 hover:text-[#ddbc69] transition"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-xl font-semibold text-[#ddbc69] mb-4 border-b border-[#ddbc69] pb-2">
              Policies
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/dholera-smart-city/policy/copyright"
                  className="text-black hover:text-[#ddbc69] transition flex items-center"
                >
                  <span className="mr-2">›</span>
                  Copyright Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/dholera-smart-city/policy/terms"
                  className="text-black hover:text-[#ddbc69] transition flex items-center"
                >
                  <span className="mr-2">›</span>
                  Terms of Use
                </Link>
              </li>

              <li>
                <Link
                  href="/dholera-smart-city/policy/privacy"
                  className="text-black hover:text-[#ddbc69] transition flex items-center"
                >
                  <span className="mr-2">›</span>
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/dholera-smart-city/policy/refund-and-cancellation"
                  className="text-black hover:text-[#ddbc69] transition flex items-center"
                >
                  <span className="mr-2">›</span>
                  Refund & Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-[#ddbc69] mb-4 border-b border-[#ddbc69] pb-2">
              Reach Our Head Office
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 text-[#ddbc69] mr-3 mt-1">
                  <MapPin size={18} aria-hidden="true" />
                </span>

                <span className="text-black">
                  620, JMD Megapolis, Sohna Rd, Sector 48, Gurugram,
                  India 122018
                </span>
              </li>

              <li className="flex items-center">
                <span className="flex-shrink-0 text-[#ddbc69] mr-3">
                  <Mail size={18} aria-hidden="true" />
                </span>

                <a
                  href="mailto:info@bookmyassets.com"
                  className="text-black hover:text-[#ddbc69] transition"
                >
                  info@bookmyassets.com
                </a>
              </li>

              <li>
                <TrackedPhoneLink />
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} BookMyAssets™. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;