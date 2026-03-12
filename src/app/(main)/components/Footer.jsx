import React from "react";
import logo from "@/assests/bma-logo-black.png";
import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-8 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Contact Info */}
          <div className="col-span-1 space-y-5">
            <Link href="/">
              <Image
                src={logo}
                height={80}
                width={80}
                alt="BookMyAssets Logo"
                className="hover:opacity-80 transition-opacity"
              />
            </Link>

            <div className="space-y-4 text-sm text-gray-600">
              {/* Phone */}
              <a
                className="flex items-center gap-3 hover:text-yellow-500 transition-colors"
                aria-label="BookMyAssets Phone"
                href="tel:+918130371647"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500">
                  <FaPhone className="rotate-90 text-xs" />
                </span>
                +91 81 30 37 16 47
              </a>

              {/* Email */}
              <a
                className="flex items-center gap-3 hover:text-yellow-500 transition-colors"
                aria-label="BookMyAssets Email"
                href="mailto:info@bookmyassets.com"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500">
                  <FaEnvelope className="text-xs" />
                </span>
                info@bookmyassets.com
              </a>

              {/* Head Office */}
              <a
                className="flex items-start gap-3 hover:text-yellow-500 transition-colors"
                aria-label="BookMyAssets Head Office"
                href="https://maps.app.goo.gl/oD7yWuDQTtRUyiPx7"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500 mt-0.5">
                  <FaMapMarkerAlt className="text-xs" />
                </span>
                <div>
                  <p className="font-semibold text-gray-800 mb-0.5">
                    Head Office
                  </p>
                  <p className="leading-relaxed">
                    620, 6th Floor, JMD Megapolis,
                    <br />
                    Sector 48, Gurugram, Haryana 122001
                  </p>
                </div>
              </a>

              {/* Branch Office */}
              <a
                className="flex items-start gap-3 hover:text-yellow-500 transition-colors"
                aria-label="BookMyAssets Branch Office"
                href="https://maps.app.goo.gl/MsdYUzz3WuUD4ZWb6"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500 mt-0.5">
                  <FaMapMarkerAlt className="text-xs" />
                </span>
                <div>
                  <p className="font-semibold text-gray-800 mb-0.5">
                    Branch Office
                  </p>
                  <p className="leading-relaxed">
                    303, 3rd Floor H-110, Sector-63,
                    <br /> Noida, Uttar Pradesh 201301
                  </p>
                </div>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-1">
              <Link
                aria-label="Facebook"
                href="https://www.facebook.com/profile.php?id=61583265159985"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
              >
                <FaFacebook className="text-blue-600 text-lg" />
              </Link>
              <Link
                aria-label="Instagram"
                href="https://www.instagram.com/bookmyassets/"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-pink-100 flex items-center justify-center transition-colors"
              >
                <FaInstagram className="text-pink-500 text-lg" />
              </Link>
              <Link
                aria-label="X / Twitter"
                href="https://x.com/BookMyAssets"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <FaXTwitter className="text-black text-lg" />
              </Link>
              <Link
                aria-label="LinkedIn"
                href="https://www.linkedin.com/company/bookmyassetss/"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors"
              >
                <FaLinkedin className="text-blue-700 text-lg" />
              </Link>
              <Link
                aria-label="YouTube"
                href="https://www.youtube.com/@BookMyAssets"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
              >
                <FaYoutube className="text-red-600 text-lg" />
              </Link>
            </div>
          </div>

          {/* Residential */}
          <div>
            <h3 className="text-base font-semibold mb-5 pb-2 border-b border-gray-100">
              Residential
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  href="/dholera-residential-plots/westwyn-estate"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  WestWyn Estates
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-residential-plots/westwyn-county"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  WestWyn County
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-residential-plots/pride"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Pride
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-residential-plots/paradise"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Paradise
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-residential-plots/paradise-2"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Paradise 2
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-residential-plots/orchid"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Orchid
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-residential-plots/marina-bay"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Marina Bay
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-5 pb-2 border-b border-gray-100">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  href="/about"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-sir-blogs"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/bulk-land/residential"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Bulk Land
                </Link>
              </li>
              <li>
                <Link
                  href="/channel-partner"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Channel Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-base font-semibold mb-5 pb-2 border-b border-gray-100">
              Policies
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  href="/policies/terms"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/privacy"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/copyright"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Copyright Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/refund-and-cancellation"
                  className="hover:text-yellow-500 hover:translate-x-1 inline-block transition-all"
                >
                  Refund and Cancellation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="">
          {/* Mobile-only map */}
          <div className="md:hidden w-full h-48 rounded overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4176.067955419303!2d77.03624067613654!3d28.419448675781837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23d440cffedd%3A0x77e4afa67247493e!2sBookMyAssets%20%7C%20Dholera!5e1!3m2!1sen!2sin!4v1773053084204!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
            ></iframe>
          </div>

          {/* Desktop-only map */}
          <div className="hidden md:block rounded overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4176.067955419303!2d77.03624067613654!3d28.419448675781837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23d440cffedd%3A0x77e4afa67247493e!2sBookMyAssets%20%7C%20Dholera!5e1!3m2!1sen!2sin!4v1773053084204!5m2!1sen!2sin"
              className="w-full"
              height={350}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex justify-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BookMyAssets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
