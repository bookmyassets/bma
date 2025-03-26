"use client"
import { useState, useEffect } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import Image from 'next/image';

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSubmissionCount(parseInt(localStorage.getItem("formSubmissionCount") || "0", 10));
      setLastSubmissionTime(parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);
    
    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    }
    
    if (submissionCount >= 3) {
      alert("You have reached the maximum submission limit. Try again after 24 hours.");
      setIsLoading(false);
      return;
    }

    if (!formData.fullName || !formData.phone) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
        },
        body: JSON.stringify({
          fields: { name: formData.fullName, phone: formData.phone, source:"BookMyAssets" },
          source: "Dholera Times Website",
          tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
        }),
      });

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });
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
    <div className="relative h-screen w-full flex">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/api/placeholder/1080/1920" 
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-50"
        />
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-sm m-auto bg-black bg-opacity-70 p-8 rounded-xl shadow-2xl">
        {/* Logo Placeholder */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gold p-4 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="black">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 text-gold">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-4 top-4 text-darkGold" />
            <input 
              name="fullName" 
              placeholder="Full Name" 
              value={formData.fullName} 
              onChange={handleChange} 
              className="w-full p-3 pl-12 bg-transparent border-b border-darkGold text-gold focus:outline-none focus:border-gold" 
            />
          </div>
          
          <div className="relative">
            <FaPhoneAlt className="absolute left-4 top-4 text-darkGold" />
            <input 
              name="phone" 
              type="tel" 
              placeholder="Phone Number" 
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full p-3 pl-12 bg-transparent border-b border-darkGold text-gold focus:outline-none focus:border-gold" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full p-3 bg-gold text-black font-semibold rounded-full mt-4 shadow-md hover:bg-darkGold transition-all"
          >
            {isLoading ? "Submitting..." : "Sign In"}
          </button>
        </form>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-black border border-gold p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold text-gold">Success!</h3>
              <p className="text-gold">Your form has been submitted successfully.</p>
              <button 
                onClick={() => setShowPopup(false)} 
                className="mt-4 px-4 py-2 bg-gold text-black rounded-md hover:bg-darkGold"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}