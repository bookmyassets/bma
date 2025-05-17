"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/assests/Bmalogo.png";

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (typeof window !== "undefined" && !window.grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const onRecaptchaSuccess = (token) => {
    setRecaptchaToken(token);
    submitForm(token);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formData.fullName && /^\d{10,15}$/.test(formData.phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill all fields correctly.");
      return;
    }

    setShowRecaptcha(true);

    // Execute reCAPTCHA when shown
    setTimeout(() => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onRecaptchaSuccess,
          theme: "dark",
        });
      }
    }, 500);
  };

  const submitForm = async (token) => {
    try {
      const response = await fetch("/api/submitContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      alert("Submission successful!");
      setFormData({ fullName: "", phone: "" });
      setShowRecaptcha(false);
      setRecaptchaToken(null);
      onClose?.();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 rounded">
      <input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 text-white"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 text-white"
      />
      <button type="submit" className="bg-yellow-500 px-4 py-2 rounded">
        Submit
      </button>

      {showRecaptcha && <div ref={recaptchaRef} className="mt-4" />}
    </form>
  );
}
