"use client"
import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

export default function ExitPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let timeoutId;
    let hasShownPopup = false;

    // Desktop: Mouse leave detection
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !submitted && !hasShownPopup) {
        setShowPopup(true);
        hasShownPopup = true;
      }
    };

    // Mobile: Time-based trigger (after 10 seconds)
    const startMobileTimer = () => {
      timeoutId = setTimeout(() => {
        if (!submitted && !hasShownPopup) {
          setShowPopup(true);
          hasShownPopup = true;
        }
      }, 10000); // 10 seconds
    };

    // Mobile: Back button detection (Android)
    const handleBackButton = (e) => {
      if (!submitted && !hasShownPopup) {
        e.preventDefault();
        setShowPopup(true);
        hasShownPopup = true;
        window.history.pushState(null, '', window.location.href);
      }
    };

    // Mobile: Scroll to top detection
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If user scrolls to very top quickly (attempting to leave)
      if (currentScrollY === 0 && lastScrollY > 100 && !submitted && !hasShownPopup) {
        setShowPopup(true);
        hasShownPopup = true;
      }
      lastScrollY = currentScrollY;
    };

    // Detect if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    if (isMobile) {
      // Mobile triggers
      startMobileTimer();
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handleBackButton);
      window.addEventListener('scroll', handleScroll);
    } else {
      // Desktop trigger
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('popstate', handleBackButton);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [submitted]);

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4 md:p-8">
        <div className="text-center text-white max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Welcome to Our Site</h1>
          <p className="text-base md:text-xl mb-6 md:mb-8 px-4">
            <span className="hidden md:inline">Move your mouse towards the top of the browser to trigger the exit popup</span>
            <span className="md:hidden">The popup will appear after 10 seconds, when you scroll to top quickly, or press back button</span>
          </p>
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 md:p-8 mx-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Sample Content</h2>
            <p className="text-sm md:text-lg leading-relaxed">
              This is a demo page with exit-intent detection for both desktop and mobile devices.
            </p>
            <div className="mt-6 space-y-4 text-left">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Desktop Trigger:</h3>
                <p className="text-sm">Move cursor to top of browser window</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Mobile Triggers:</h3>
                <p className="text-sm">• Automatic after 10 seconds</p>
                <p className="text-sm">• Press back button</p>
                <p className="text-sm">• Scroll quickly to top</p>
              </div>
            </div>
          </div>
          
          {/* Extra content for scrolling on mobile */}
          <div className="mt-8 space-y-4 px-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">More Content</h3>
              <p className="text-sm">Scroll down to see more...</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
              <p className="text-sm">Amazing features await you</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
              <p className="text-sm">Exclusive benefits for members</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
              <p className="text-sm">Try scrolling back to top quickly!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4 md:p-8">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Welcome to Our Site</h1>
          <p className="text-lg md:text-xl">Sample content here...</p>
        </div>
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Popup Modal */}
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Close popup"
          >
            <X size={24} />
          </button>

          {!submitted ? (
            <div className="p-6 md:p-8">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 md:p-4 rounded-full">
                  <Gift size={28} className="text-white md:w-8 md:h-8" />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
                Wait! Don't Go Yet!
              </h2>
              <p className="text-sm md:text-base text-gray-600 text-center mb-6">
                Get <span className="font-bold text-purple-600">20% OFF</span> your first order + exclusive tips!
              </p>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 md:py-3.5 rounded-lg hover:from-purple-700 hover:to-pink-700 active:scale-95 transition-all duration-200 shadow-lg text-base md:text-lg"
                >
                  Claim My Discount
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          ) : (
            <div className="p-6 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 md:p-4 rounded-full">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-sm md:text-base text-gray-600">Check your email for your exclusive discount code.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}