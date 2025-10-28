"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";

export default function ExitPopup({title = "Wait! Before You Go...", subtitle = "Get exclusive updates"}) {
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({ 
    fullName: "", 
    mobileNumber: "", 
    email: "", 
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  
  // Exit intent detection
  useEffect(() => {
    const handleExitIntent = (e) => {
      if (e.clientY <= 0 && !popupShown) {
        setShowFormPopup(true);
        setPopupShown(true);
        document.removeEventListener('mouseleave', handleExitIntent);
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === 'w') || (e.altKey && e.key === 'F4')) {
        if (!popupShown) {
          e.preventDefault();
          setShowFormPopup(true);
          setPopupShown(true);
        }
      }
    };

    document.addEventListener('mouseleave', handleExitIntent);
    document.addEventListener('keydown', handleKeyDown);

    // Mobile swipe detection
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].screenY;
      if (touchStartY - touchEndY > 100 && window.innerHeight - touchStartY < 50) {
        if (!popupShown) {
          setShowFormPopup(true);
          setPopupShown(true);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mouseleave', handleExitIntent);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [popupShown]);

  // Escape key handler
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && showFormPopup) {
        handlePopupClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showFormPopup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      setErrorMessage("Please enter a valid mobile number (10-15 digits)");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // Simulate API call (replace with your actual API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setFormData({ fullName: "", mobileNumber: "", email: "" });
      setShowThankYou(true);
      
      setTimeout(() => {
        setShowThankYou(false);
        setShowFormPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowFormPopup(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handlePopupClose();
    }
  };

  if (!showFormPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl relative transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {showThankYou ? (
          <div className="text-center">
            <div className="mb-6 animate-scale-in">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600">We will contact you shortly.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <button
                onClick={handlePopupClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
                aria-label="Close popup"
              >
                ×
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
              <p className="text-lg text-gray-700 font-semibold">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm mb-4">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-medium mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Get Started Now"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  🔒 We respect your privacy. Your details are safe with us.
                </p>
              </div>
            </form>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}