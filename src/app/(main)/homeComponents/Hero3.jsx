"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import logo from "@/assests/ad-page/dholera-govt-logo.webp";
import { ChevronRight, ChevronLeft } from "lucide-react";

//images import
import img1 from "@/assests/homepage/hero/westwyn-estate-dholera-residential-plots-desktop.webp";
import img2 from "@/assests/homepage/hero/dholera-international-airport-desktop.webp";
import img3 from "@/assests/homepage/hero/silk-route-park-dholera-desktop.webp";
import img4 from "@/assests/homepage/hero/expressway_hero.webp";
import img5 from "@/assests/homepage/hero/river_front_hero.webp";
import img6 from "@/assests/homepage/hero/tata_gate_hero.webp";

// Lazy load non-critical component
const Running = dynamic(() => import("./Running"), {
  ssr: false,
  loading: () => <div className="h-12" />,
});

// Memoized slider image component - OPTIMIZED
const SliderImage = memo(({ src, alt, isActive, priority, className }) => (
  <div
    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${className || ""}`}
    style={{
      opacity: isActive ? 1 : 0,
      pointerEvents: isActive ? "auto" : "none",
    }}
  >
    <Image
      src={src}
      alt={alt}
      className="object-cover"
      fill
      quality={85}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
    />
  </div>
));

SliderImage.displayName = "SliderImage";

// Memoized navigation button
const NavButton = memo(({ onClick, direction, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`absolute ${direction === "left" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors touch-manipulation`}
    type="button"
  >
    {direction === "left" ? (
      <ChevronLeft className="w-6 h-6" />
    ) : (
      <ChevronRight className="w-6 h-6" />
    )}
  </button>
));

NavButton.displayName = "NavButton";

// Memoized form input component
const FormInput = memo(
  ({
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    icon: Icon,
    ...props
  }) => (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500 pointer-events-none">
        <Icon />
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 pl-10 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-300 hover:border-yellow-400 transition-colors text-sm"
        {...props}
      />
    </div>
  ),
);

FormInput.displayName = "FormInput";

// Icon components
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export default function LandingPage({ openForm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [submittedName, setSubmittedName] = useState(""); // Store submitted name
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const slideContainerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const desktopImages = [
    {
      src: img1,
      alt: "Westwyn Estate Dholera Residential Plots - Premium Investment Opportunity",
    },
    {
      src: img2,
      alt: "Dholera International Airport - Smart City Infrastructure Development",
    },
    { src: img3, alt: "Silk Route Park Dholera - Modern Urban Development" },
    { src: img4, alt: "Dholera Ahmedabad Expressway" },
    { src: img5, alt: "River Front" },
    { src: img6, alt: "Tata Semicon" },
  ];

  useEffect(() => {
    setIsClient(true);

    // Defer reCAPTCHA loading
    const loadRecaptchaTimeout = setTimeout(() => {
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
    }, 2000); // Delay reCAPTCHA load by 2 seconds

    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10),
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10),
      );
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      clearTimeout(loadRecaptchaTimeout);
      document.removeEventListener("keydown", handleEscapeKey);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  }, []);

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    } else if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const now = Date.now();

      setSubmittedName(formData.fullName);

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
            source: "BookMyAssets",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        },
      );

      if (response.ok) {
        setShowPopup(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });

        /* Google Tag */
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form_hero",
        });
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again.",
      );
    } finally {
      setIsLoading(false);
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.reset(recaptchaRef.current);
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

    if (window.grecaptcha && recaptchaLoaded) {
      try {
        if (recaptchaRef.current && !recaptchaRef.current.innerHTML) {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "dark",
          });
        } else {
          window.grecaptcha.reset();
          window.grecaptcha.execute();
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

  const transitionSlide = useCallback((nextSlide) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setCurrentSlide(nextSlide);
    });
  }, []);

  // Auto-advance slider - only after component mounts
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      transitionSlide((prev) =>
        prev === desktopImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [desktopImages.length, transitionSlide, isClient]);

  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeThreshold = 50;
    if (touchStart - touchEnd > swipeThreshold) {
      transitionSlide((prev) =>
        prev === desktopImages.length - 1 ? 0 : prev + 1,
      );
    } else if (touchEnd - touchStart > swipeThreshold) {
      transitionSlide((prev) =>
        prev === 0 ? desktopImages.length - 1 : prev - 1,
      );
    }
  }, [touchStart, touchEnd, desktopImages.length, transitionSlide]);

  const nextSlide = useCallback(() => {
    transitionSlide((prev) =>
      prev === desktopImages.length - 1 ? 0 : prev + 1,
    );
  }, [desktopImages.length, transitionSlide]);

  const prevSlide = useCallback(() => {
    transitionSlide((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1,
    );
  }, [desktopImages.length, transitionSlide]);

  const handleClose = useCallback(() => {
    setShowPopup(false);
  }, []);

  return (
    <>
      {/* Inline critical CSS */}
      <div id="hero" className="relative min-h-screen bg-white">
        <div className="h-screen max-sm:h-[70vh] flex flex-col">
          {/* Main Content Section */}
          <div className="flex-1 flex flex-col lg:flex-row md:min-h-0">
            {/* Left Side - Slider Section (60%) */}
            <div className="w-full lg:w-[60%] relative flex-1 max-sm:min-h-[40vh]">
              {/* Desktop Slider */}
              <div className="absolute inset-0 hidden lg:block">
                <div className="relative w-full h-full overflow-hidden">
                  {desktopImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="md:object-contain md:pt-8"
                        priority 
                        fetchPriority="high"
                      />
                    </div>
                  ))}
                  {/* Navigation */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 z-20">
                    <Running />
                  </div>
                </div>
              </div>

              {/* Mobile Slider */}
              <div
                className="absolute inset-0 block lg:hidden overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="region"
                aria-label="Mobile image carousel"
              >
                {desktopImages.map((image, index) => (
                  <div
                    key={`mobile-${index}`}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      pointerEvents: index === currentSlide ? "auto" : "none",
                    }}
                  >
                    <div className="h-full flex items-center justify-center px-1 pt-16 pb-4">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={675}
                        className="w-full h-auto object-contain rounded-lg shadow-lg"
                        quality={85}
                        priority 
                        fetchPriority="high"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                ))}
                {/* Navigation buttons for mobile */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Side - Lead Form Section (40%) */}
            <div className="w-full lg:w-[40%] bg-white flex md:items-center md:justify-center p-4 sm:p-6 lg:p-8">
              <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-4 sm:mb-6 max-sm:space-y-6">
                  <Image
                    src={logo}
                    alt="BookMyAssets - Dholera Property Investment"
                    className="mx-auto mb-2 sm:mb-3"
                    fetchPriority="high"
                    height={120}
                  />

                  <div className="relative max-sm:space-y-8">
                    <style jsx>{`
                      @keyframes textGlow {
                        0%,
                        100% {
                          text-shadow: 0 0 50px rgba(222, 174, 60, 0.8);
                          color: black;
                        }
                        50% {
                          text-shadow:
                            0 0 20px rgba(255, 255, 255, 1),
                            0 0 30px rgba(255, 255, 255, 0.8);
                          color: black;
                        }
                      }

                      .flashy-blink {
                        animation: flashyBlink 3s infinite ease-in-out;
                        padding: 4px;
                        border-radius: 1rem;
                        border: 3px solid #deae3c;
                      }

                      .glowing-text {
                        animation: textGlow 1s infinite ease-in-out;
                      }
                    `}</style>

                    <div className="flashy-blink">
                      <h1 className="text-xl sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 glowing-text px-2">
                        Dholera Plots under ₹10 Lakh
                      </h1>
                      <p className="text-sm md:text-base glowing-text px-2">
                        0 KM from Dholera SIR Boundary
                      </p>
                    </div>
                  </div>
                </div>

                {/* Two-Step Progress Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 sm:gap-4">
                    {/* Step 1 */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                          !showPopup
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {showPopup ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 sm:h-6 sm:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          "1"
                        )}
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-semibold ${!showPopup ? "text-yellow-600" : "text-green-600"}`}
                      >
                        Submit Details
                      </span>
                    </div>

                    {/* Connector Line */}
                    <div
                      className={`h-0.5 w-8 sm:w-12 transition-all ${showPopup ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>

                    {/* Step 2 */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                          showPopup
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        2
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-semibold ${showPopup ? "text-yellow-600" : "text-gray-400"}`}
                      >
                        {!showPopup
                        ? "Free consultation"
                        : `Free consultation booked`}
                      </span>
                    </div>
                  </div>

                  {/* Step Description */}
                  <div className="text-center mt-3">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                      {!showPopup
                        ? "Fill the form to get started"
                        : `Free consultation booked ${submittedName} in 24 hours`}
                    </p>
                  </div>
                </div>

                {showPopup ? (
                  <div
                    className="text-center py-6"
                    role="alert"
                    aria-live="polite"
                  >
                    <div className="mb-4 inline-block">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-black mb-2">
                      Thank You!
                    </h2>
                    <p className="text-gray-600 text-sm mb-1">
                      Your request has been submitted successfully.
                    </p>
                    <p className="text-yellow-600 text-sm font-semibold">
                      Our expert will contact you within 24 hours for your free
                      consultation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-1">
                    {errorMessage && (
                      <div
                        className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-700 rounded-lg text-sm"
                        role="alert"
                      >
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 items-center">
                      <FormInput
                        name="fullName"
                        placeholder="Enter Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        icon={UserIcon}
                        required
                        autoComplete="name"
                        aria-label="Full Name"
                      />
                      <FormInput
                        name="phone"
                        type="tel"
                        placeholder="Mobile No"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={PhoneIcon}
                        minLength={10}
                        maxLength={15}
                        required
                        autoComplete="tel"
                        aria-label="Phone Number"
                      />
                    </div>

                    {/* reCAPTCHA container */}
                    <div className="flex justify-center">
                      <div ref={recaptchaRef}></div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm sm:text-base rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation"
                    >
                      {isLoading ? "Submitting..." : "Get A Call Back"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
