"use client";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import ContactForm from "../components/Contactform";

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

// Create a separate client component for the sidebar with form
export default function SidebarWithForm({ popularArticles }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState("");

  const openContactForm = (title, headline, btnName, type) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
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
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }

    // Prevent modal close when clicking inside
    const handleClickInside = (e) => {
      e.stopPropagation();
    };

    const formElement = document.getElementById("contact-form-container");
    if (formElement) {
      formElement.addEventListener("click", handleClickInside);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("click", handleClickInside);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(""); // Clear error messages on input change
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    // Simple phone validation
    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    // Check submission limits
    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      // Reset counter if 24 hours have passed
      setSubmissionCount(0);
      if (typeof window !== "undefined") {
        localStorage.setItem("formSubmissionCount", "0");
        localStorage.setItem("lastSubmissionTime", now.toString());
      }
    } else if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      return false;
    }
    return true;
  };
const onRecaptchaSuccess = async (token) => {
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
          source: "BookMyAssets Website",
          tags: ["Dholera Investment", "Website Lead"],
        }),
      }
    );

    const responseText = await response.text();

    if (response.ok) {
      // Success handling
      setFormData({ fullName: "", phone: "" });
      setShowPopup(true);
      setSubmissionCount((prev) => {
        const newCount = prev + 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        }
        return newCount;
      });
      
      // Call handleAfterSubmit after successful submission
      handleAfterSubmit();
      
    } else {
      // Parse response as JSON if possible, otherwise use text
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { message: responseText };
      }
      throw new Error(errorData.message || "Error submitting form");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    setErrorMessage(
      error.message || "Error submitting form. Please try again."
    );
  } finally {
    setIsLoading(false);

    // Reset reCAPTCHA
    if (window.grecaptcha && recaptchaWidgetId.current !== null) {
      try {
        window.grecaptcha.reset(recaptchaWidgetId.current);
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

    // If reCAPTCHA is loaded, render it in the ref
    if (window.grecaptcha && recaptchaLoaded && siteKey) {
      try {
        // Check if reCAPTCHA widget is already rendered
        if (recaptchaWidgetId.current === null && recaptchaRef.current) {
          recaptchaWidgetId.current = window.grecaptcha.render(
            recaptchaRef.current,
            {
              sitekey: siteKey,
              callback: onRecaptchaSuccess,
              theme: "dark",
            }
          );
        } else if (recaptchaWidgetId.current !== null) {
          // Reset and execute existing widget
          window.grecaptcha.reset(recaptchaWidgetId.current);
          window.grecaptcha.execute(recaptchaWidgetId.current);
        }
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  const handleAfterSubmit = () => {
    console.log("Form submitted successfully, type:", formType);

    if (formType === "brochure") {
      try {
        console.log("Initiating brochure download");

        // Using setTimeout to ensure the popup closes before download starts
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = "https://shorturl.at/Dv00M";
          link.target = "_blank";
          link.download = "brochure.pdf"; // Add download attribute
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("Download link clicked");
        }, 300);
      } catch (error) {
        console.error("Error downloading brochure:", error);
        window.open("https://shorturl.at/Dv00M", "_blank");
      }
    }
  };

  return (
    <aside className="lg:sticky lg:top-24 space-y-6">
      {/* Get Our Free Guide Widget */}
      <div className="bg-[#f9f9f9] rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Get Free Dholera Investment Guide
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Download our comprehensive guide covering investment opportunities,
          infrastructure development, and future prospects in Dholera SIR.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:border-[#deae3c]"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:border-[#deae3c]"
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div ref={recaptchaRef}></div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#deae3c] text-gray-900 py-3 rounded-lg font-bold hover:bg-[#d0a235] transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Get Free Guide"}
          </button>
        </form>
      </div>

      {/* Popular Articles Widget */}
      <div className="bg-[#f9f9f9] rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Popular Articles
        </h3>
        <div className="space-y-4">
          {popularArticles.map((article, index) => (
            <article
              key={index}
              className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
            >
              <Link
                href={`/dholera-sir-updates/${article.slug.current}`}
                className="block group"
              >
                <h4 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-[#deae3c] transition-colors">
                  {article.title || `Dholera Update ${index + 1}`}
                </h4>
                <p className="text-sm text-gray-500">
                  {formatDate(article.publishedAt || article._createdAt)}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Schedule a Consultation */}
      <div className="bg-[#f9f9f9] rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Schedule Investment Consultation
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Ready to invest in Dholera SIR? Get personalized guidance from our
          investment experts.
        </p>
        <button
          onClick={() =>
            openContactForm(
              "Get Free Advice from Dholera Investment Adviser",
              "Please fill out the form to get exclusive details of WestWyn County. Fields marked with * are mandatory.",
              "Enquire Now",
              ""
            )
          }
          className="w-full bg-[#deae3c] text-gray-900 py-3 rounded-lg font-bold hover:bg-[#d0a235] transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Book Free Consultation
        </button>
      </div>

      {/* Newsletter Signup */}
      {/* <div className="bg-gradient-to-br from-[#deae3c]/10 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Stay Updated
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Get weekly updates about Dholera SIR developments directly in your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:border-[#deae3c]"
            required
          />
          <button 
            type="submit"
            className="w-full bg-[#deae3c] text-gray-900 py-3 rounded-lg font-bold hover:bg-[#d0a235] transition-colors shadow-sm hover:shadow-md"
          >
            Subscribe Now
          </button>
        </form>
      </div> */}

      {/* Form Popup */}
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <ContactForm
                onClose={closeContactForm}
                title={formTitle}
                headline={formHeadline}
                buttonName={buttonName}
                /*  onAfterSubmit={handleAfterSubmit} */
              />
            </div>
          </div>
        )}
      </AnimatePresence>
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            id="contact-form-container"
            className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              Your information has been submitted successfully. Our investment
              expert will contact you shortly.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#deae3c] text-gray-900 py-2 rounded-lg font-bold hover:bg-[#d0a235]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
