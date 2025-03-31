"use client";
import { useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/assests/Bmalogo.png";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.fullName || !formData.phone) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },
          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: formData.phone,
              source: "BookMyAssets",
            },
            source: "Dholera Times Website",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
          }),
        }
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        alert("Thank you! We'll contact you shortly.");
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto p-4">
      {/* Contact Form Section */}
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl shadow-2xl border border-gray-700 w-full md:w-1/2">
        <div className="mb-6">
          <Image
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Get Started
          </h2>
          <p className="text-gray-300 text-sm text-center">
            Fill this form to explore premium investment opportunities
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
            />
          </div>

          <div className="relative">
            <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              min="10"
              max="11"
              required
              className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold"
          >
            {isLoading ? "Submitting..." : "Request Exclusive Consultation"}
          </button>
        </form>
      </div>

      {/* Google Maps Section */}
      <div className="w-full md:w-1/2 h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4203.481970734832!2d77.03394468685377!3d28.41944811333691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23d440cffedd%3A0x77e4afa67247493e!2sBookMyAssets!5e1!3m2!1sen!2sin!4v1743427563302!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '455px', borderRadius: '0.75rem' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}