"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt, FaBriefcase, FaClock } from "react-icons/fa";

export default function EventForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;



  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha && siteKey) {
        try {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => setRecaptchaLoaded(true);
          script.onerror = () => {
            console.error("Failed to load reCAPTCHA script");
            setRecaptchaLoaded(true);
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true);
        }
      } else if (window.grecaptcha || !siteKey) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      const storedCount = parseInt(localStorage.getItem("EventSubmissionCount") || "0", 10);
      const lastSubmissionTime = parseInt(localStorage.getItem("EventLastSubmissionTime") || "0", 10);
      
      // Check if 24 hours have passed since the last submission
      if (lastSubmissionTime) {
        const timeDifference = Date.now() - lastSubmissionTime;
        const hoursPassed = timeDifference / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          // Reset submission count after 24 hours
          setSubmissionCount(0);
          localStorage.setItem("EventSubmissionCount", "0");
          localStorage.setItem("EventLastSubmissionTime", Date.now().toString());
        } else {
          setSubmissionCount(storedCount);
          // Check if limit reached
          if (storedCount >= 20) {
            setIsDisabled(true);
          }
        }
      } else {
        setSubmissionCount(storedCount);
      }
    }

    // Cleanup function
    return () => {
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          window.grecaptcha.reset();
        } catch (e) {
          console.log("reCAPTCHA cleanup error:", e);
        }
      }
    };
  }, [siteKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(""); // Clear error messages on input change
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim() ) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    // Phone validation - accept various formats (10-15 digits)
    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    // Check submission limits
    if (submissionCount >= 3) {
      setErrorMessage("You have reached the maximum submission limit. Try again after 24 hours.");
      setIsDisabled(true);
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      // API Request using the new endpoint and format
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
              source: "BookMyAssets Event Page",
            },
            source: "Channel Partner Program",
            tags: ["Channel Partner", "Business Partner", "Broker Program"],
            recaptchaToken: token,
          }),
        }
      );

      // Store response text before parsing
      const responseText = await response.text();
      console.log("TeleCRM Response:", responseText);

      // Check response status and handle accordingly
      if (response.ok) {
        if (
          responseText === "OK" ||
          responseText.toLowerCase().includes("success")
        ) {
          // Success handling
          setFormData({ 
            fullName: "", 
            phone: "", 
          });
          setShowPopup(true);

          // Update submission count
          const newCount = submissionCount + 1;
          setSubmissionCount(newCount);
          if (typeof window !== "undefined") {
            localStorage.setItem("EventSubmissionCount", newCount.toString());
            localStorage.setItem("EventLastSubmissionTime", Date.now().toString());
          }

          // Auto-hide popup after 5 seconds
          setTimeout(() => {
            setShowPopup(false);
          }, 5000);

        } else {
          console.log("Response Text:", responseText);
          setErrorMessage("Submission received but with unexpected response");
        }
      } else {
        console.error("Server Error:", responseText);
        throw new Error(responseText || "Submission failed");
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);
      
      // Reset reCAPTCHA
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          window.grecaptcha.reset();
        } catch (err) {
          console.error("Error resetting reCAPTCHA:", err);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (!recaptchaLoaded || !window.grecaptcha) {
      setErrorMessage("Security verification not loaded. Please refresh the page.");
      setIsLoading(false);
      return;
    }

    // Render reCAPTCHA if not already rendered
    if (!recaptchaRef.current.innerHTML) {
      try {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onRecaptchaSuccess,
          theme: "dark",
          size: "compact"
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      // Execute existing reCAPTCHA
      window.grecaptcha.execute();
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 sticky top-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Dholera : Now or Never
      </h3>

      {showPopup && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Thank You!</span>
          </div>
          <p className="text-sm">
            Your Event Details have been Registered Succcessfully You Will Get a Confirmation Message soon.
          </p>
        </div>
      )}

      {isDisabled ? (
        <div className="text-center py-8">
          <p className="text-red-600 font-semibold">
            You have reached the maximum submission limit. Try again after 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-4 text-gray-500" />
            <input
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhoneAlt className="absolute left-4 top-4 text-gray-500" />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
            />
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <div ref={recaptchaRef}></div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isDisabled || !recaptchaLoaded}
            className={`w-full p-4 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300 ${
              isLoading || isDisabled || !recaptchaLoaded
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#be9233] hover:bg-[#dbaf51] hover:shadow-lg active:scale-95"
            }`}
          >
            {isLoading ? "Confirming Registration..." : "Register Now"}
          </button>
        </form>
      )}
    </div>
  );
}