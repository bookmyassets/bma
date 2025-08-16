import React from 'react'
import logo from "@/assests/bma-logo-black.png";
import Image from "next/image";
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo + Contact Info */}
          <div className="col-span-1 space-y-4">
            <Link href="/">
              <Image
                src={logo}
                height={80}
                width={80}
                alt="BookMyAssets Logo"
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><FaPhone className=' rotate-90' /> +91 81 30 37 16 47</p>
              <p className="flex items-center gap-2"><FaEnvelope /> info@bookmyassets.com</p>
              <p className="flex items-center gap-2"><FaMapMarkerAlt /> 620, 6th Floor, JMD Megapolis,<br /> Sector 48, Gurugram, Haryana 122001</p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-4 text-xl mt-4">
              <Link href="#"><FaFacebook className="text-blue-600" /></Link>
              <Link href="https://www.instagram.com/bookmyassets/"><FaInstagram className="text-pink-500" /></Link>
              <Link href="https://x.com/BookMyAssets"><FaXTwitter className="text-black" /></Link>
              <Link href="#"><FaLinkedin className="text-blue-700" /></Link>
              <Link href="https://www.youtube.com/@BookMyAssets"><FaYoutube className="text-red-600" /></Link>
            </div>
          </div>

          {/* Residential */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Residential</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/new/dholera-residential-plots/westwyn-county" className="hover:text-yellow-500">WestWyn County</Link></li>
              <li><Link href="/new/dholera-residential-plots/westwyn-county">Pride</Link></li>
              <li><Link href="/new/dholera-residential-plots/westwyn-county">Paradise</Link></li>
              <li><Link href="/new/dholera-residential-plots/westwyn-county">Paradise 2</Link></li>
              <li><Link href="/new/dholera-residential-plots/westwyn-county">Orchid</Link></li>
              <li><Link href="/new/dholera-residential-plots/westwyn-county">Maple Bay</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/customers">Bulk Land</Link></li>
              <li><Link href="/brand">Channel Partner</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/community">Community</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/dpa">DPA</Link></li>
              <li><Link href="/terms">Terms of service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-t border-gray-300"></div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 space-y-2 md:space-y-0">
          <p>© {new Date().getFullYear()} BookMyAssets. All rights reserved</p>
          <div className="flex gap-4">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/policy">Policy service</Link>
            <Link href="/cookie">Cookie Policy</Link>
            <Link href="/partners">Partners</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
