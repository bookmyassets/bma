"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/assests/bma-dedicated-to-dholera.svg";

const POPUP_TYPES = {
  time: {
    title: "Book Your Plot in Dholera",
    trigger: "time",
    delay: 10000,
    sessionKey: "popupShownThisSession",
    source: "BookMyAssets Popup",
    tags: ["Dholera Investment", "Popup Lead", "BookMyAssets"],
    dataLayerEvent: "lead_form",
    leadSource: null,
    includeEmail: false,
  },
  scroll: {
    title: "Registry Ready Plots in Dholera",
    trigger: "scroll",
    sessionKey: "popupShownThisSession",
    source: "BookMyAssets Popup",
    tags: ["Dholera Investment", "Popup Lead", "BookMyAssets"],
    dataLayerEvent: "lead_form",
    leadSource: null,
    includeEmail: false,
  },
  rage: {
    title: "Get Govt Approved Plots Starting from Rs 8 Lakh",
    trigger: "rage",
    source: "BookMyAssets Exit Popup",
    tags: ["Exit Intent", "Popup Lead", "BookMyAssets"],
    dataLayerEvent: "lead_form",
    leadSource: "BookMyAssets Rage clicks",
    includeEmail: false,
  },
  exit: {
    title: "Wait! Before You Go...",
    subtitle: "Get exclusive updates",
    trigger: "exit",
    source: "BookMyAssets Exit Popup",
    tags: ["Exit Intent", "Popup Lead", "BookMyAssets"],
    dataLayerEvent: null,
    leadSource: "BookMyAssets Exit Popup",
    includeEmail: true,
  },
  slug: {
    title: "Get Investment Details",
    trigger: "time",
    delay: 3000,
    sessionKey: "popupShown",
    source: "BookMyAssets christmas Popup",
    tags: ["Dholera Investment", "Popup Lead", "BookMyAssets"],
    dataLayerEvent: "lead_form",
    leadSource: null,
    includeEmail: false,
  },
};

const POPUP_COOLDOWN_KEY = "bmaLeadPopupLastClosedAt";
const POPUP_COOLDOWN_MS = 11000;
const COOLDOWN_TYPES = new Set(["time", "scroll", "slug"]);

function getPopupCooldownRemaining(type) {
  if (typeof window === "undefined" || !COOLDOWN_TYPES.has(type)) return 0;

  const lastClosedAt = parseInt(
    sessionStorage.getItem(POPUP_COOLDOWN_KEY) || "0",
    10,
  );

  if (!lastClosedAt) return 0;

  const elapsed = Date.now() - lastClosedAt;
  return Math.max(POPUP_COOLDOWN_MS - elapsed, 0);
}

function markPopupClosed(type) {
  if (typeof window === "undefined" || !COOLDOWN_TYPES.has(type)) return;

  sessionStorage.setItem(POPUP_COOLDOWN_KEY, Date.now().toString());
}

function getLeadSource() {
  if (typeof window === "undefined") return "BookMyAssets";

  const params = new URLSearchParams(window.location.search);

  if (params.has("twclid")) return "BookMyAssets Twitter Ads";
  if (params.has("paid")) return "BookMyAssets Twitter Ads";

  if (params.has("fbclid")) {
    const source = params.get("utm_source")?.toLowerCase();
    if (source === "instagram") return "BookMyAssets Meta IG";
    return "BookMyAssets Meta FB";
  }

  const slugParam = (key) => {
    const value = params.get(key) || "";
    const words = value.split("-").filter(Boolean).slice(0, 2).join(" ");
    return words || null;
  };

  if (params.has("dholera-sir-blogs")) {
    const slug = slugParam("dholera-sir-blogs");
    return slug ? `BookMyAssets Blogs ${slug}` : "BookMyAssets Blogs";
  }

  if (params.has("dholera-sir-updates")) {
    const slug = slugParam("dholera-sir-updates");
    return slug ? `BookMyAssets Updates ${slug}` : "BookMyAssets Updates";
  }

  if (params.has("about-dholera-sir")) {
    const slug = slugParam("about-dholera-sir");
    return slug
      ? `BookMyAssets Dholera SIR ${slug}`
      : "BookMyAssets Dholera SIR";
  }

  if (params.has("gad_source")) return "BookMyAssets Google Ads";

  return "BookMyAssets";
}

function isMobileDevice() {
  if (typeof window === "undefined") return false;

  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || window.innerWidth < 768
  );
}

export default function PopupLeadForm({
  type = "time",
  title,
  subtitle,
  project,
  mobileStrategy = "scroll",
  clickThreshold = 5,
  timeWindow = 8000,
}) {
  const typeConfig = POPUP_TYPES[type] || POPUP_TYPES.time;
  const canOverrideTitle = !["time", "scroll"].includes(type);
  const config = {
    ...typeConfig,
    ...(canOverrideTitle && title !== undefined ? { title } : {}),
    ...(subtitle !== undefined ? { subtitle } : {}),
  };

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
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const closePopup = () => {
    markPopupClosed(type);
    setShowFormPopup(false);
  };

  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha && siteKey) {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        script.onload = () => setRecaptchaLoaded(true);
        script.onerror = () => setRecaptchaLoaded(true);
        document.head.appendChild(script);
      } else if (window.grecaptcha || !siteKey) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();
  }, [siteKey]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && showFormPopup) {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showFormPopup]);

  useEffect(() => {
    if (config.trigger !== "time") return undefined;
    if (config.sessionKey && sessionStorage.getItem(config.sessionKey)) {
      return undefined;
    }

    let cooldownTimer;
    const timer = setTimeout(() => {
      const remainingCooldown = getPopupCooldownRemaining(type);
      const openPopup = () => {
        setShowFormPopup(true);
        if (config.sessionKey) {
          sessionStorage.setItem(config.sessionKey, "true");
        }
      };

      if (remainingCooldown > 0) {
        cooldownTimer = setTimeout(openPopup, remainingCooldown);
      } else {
        openPopup();
      }
    }, config.delay || 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(cooldownTimer);
    };
  }, [config.delay, config.sessionKey, config.trigger, type]);

  useEffect(() => {
    if (config.trigger !== "scroll") return undefined;
    if (config.sessionKey && sessionStorage.getItem(config.sessionKey)) {
      return undefined;
    }

    let cooldownTimer;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / documentHeight) * 100;

      if (scrollPercentage >= 50 && scrollPercentage <= 60) {
        const remainingCooldown = getPopupCooldownRemaining(type);
        const openPopup = () => setShowFormPopup(true);

        if (remainingCooldown > 0) {
          cooldownTimer = setTimeout(openPopup, remainingCooldown);
        } else {
          openPopup();
        }

        if (config.sessionKey) {
          sessionStorage.setItem(config.sessionKey, "true");
        }
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(cooldownTimer);
    };
  }, [config.sessionKey, config.trigger, type]);

  useEffect(() => {
    if (config.trigger !== "rage") return undefined;

    const handleRageClick = () => {
      if (popupShown) return;

      clickCount.current += 1;

      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }

      if (clickCount.current >= clickThreshold) {
        setShowFormPopup(true);
        setPopupShown(true);
        clickCount.current = 0;
        return;
      }

      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, timeWindow);
    };

    document.addEventListener("click", handleRageClick);

    return () => {
      document.removeEventListener("click", handleRageClick);
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, [clickThreshold, config.trigger, popupShown, timeWindow]);

  useEffect(() => {
    if (config.trigger !== "exit" || isMobileDevice()) return undefined;

    const showPopup = () => {
      if (!popupShown) {
        setShowFormPopup(true);
        setPopupShown(true);
      }
    };

    const handleExitIntent = (event) => {
      if (event.clientY <= 0) {
        showPopup();
      }
    };

    const handleKeyDown = (event) => {
      if ((event.ctrlKey && event.key === "w") || (event.altKey && event.key === "F4")) {
        event.preventDefault();
        showPopup();
      }
    };

    document.addEventListener("mouseleave", handleExitIntent);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseleave", handleExitIntent);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [config.trigger, popupShown]);

  useEffect(() => {
    if (config.trigger !== "exit" || !isMobileDevice()) return undefined;

    if (mobileStrategy === "back" || mobileStrategy === "all") {
      window.history.pushState(null, "", window.location.href);

      const handlePopState = () => {
        if (!popupShown) {
          setShowFormPopup(true);
          setPopupShown(true);
          window.history.pushState(null, "", window.location.href);
        }
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }

    if (mobileStrategy === "time") {
      const timer = setTimeout(() => {
        if (!popupShown) {
          setShowFormPopup(true);
          setPopupShown(true);
        }
      }, 15000);

      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      if (popupShown) return;

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent > 50) {
        setShowFormPopup(true);
        setPopupShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [config.trigger, mobileStrategy, popupShown]);

  const handleChange = (event) => {
    const { name, value } = event.target;
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

    if (!/^\d{10,15}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid mobile number (10-15 digits)");
      return false;
    }

    return true;
  };

  const submitVerifiedLead = async (token) => {
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
              phone: formData.mobileNumber,
              email: config.includeEmail ? formData.email || undefined : undefined,
              source: config.leadSource || getLeadSource(),
            },
            source: config.source,
            tags: config.tags,
            recaptchaToken: token,
          }),
        },
      );

      if (response.ok) {
        setFormData({ fullName: "", mobileNumber: "", email: "" });
        setShowThankYou(true);

        if (typeof window !== "undefined" && config.dataLayerEvent) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: config.dataLayerEvent,
            ...(project ? { page_name: project } : {}),
          });
        }

        setTimeout(() => {
          setShowThankYou(false);
          closePopup();
        }, 3000);
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);

      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        } catch (error) {
          console.error("Error resetting reCAPTCHA:", error);
        }
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (!recaptchaLoaded || !window.grecaptcha) {
      setErrorMessage(
        "Security verification not loaded. Please refresh the page.",
      );
      setIsLoading(false);
      return;
    }

    try {
      if (!recaptchaRef.current.innerHTML || recaptchaWidgetId.current === null) {
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: submitVerifiedLead,
          theme: "light",
        });
      } else {
        window.grecaptcha.execute(recaptchaWidgetId.current);
      }
    } catch (error) {
      console.error("Error with reCAPTCHA:", error);
      setErrorMessage("Error with verification. Please try again.");
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closePopup();
    }
  };

  if (!showFormPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-xl p-[clamp(1.25rem,3vw,2rem)] max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {showThankYou ? (
          <div className="text-center py-[clamp(1.5rem,4vw,2.5rem)]">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
            <h3 className="text-[clamp(1.375rem,2.5vw,1.75rem)] leading-[1.25] font-bold text-gray-800 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600">We will contact you shortly.</p>
          </div>
        ) : (
          <>
            <button
              onClick={closePopup}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none"
              aria-label="Close popup"
            >
              x
            </button>

            <div className="text-center mb-4 pt-8">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <Image
                  src={logo}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.25] font-bold text-gray-800 mb-2 mt-3 ">
                {config.title}
              </h2>
              
            </div>

            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm mb-4">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-[clamp(1rem,2vw,1.25rem)] mb-[clamp(1.25rem,3vw,1.75rem)]">
                <div>
                  <label
                    htmlFor="popupFullName"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="popupFullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.75rem,1.5vw,1rem)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddbc69] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="popupMobileNumber"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="popupMobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.75rem,1.5vw,1rem)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddbc69] transition-colors"
                    placeholder="Enter your mobile number"
                  />
                </div>

                {config.includeEmail && (
                  <div>
                    <label
                      htmlFor="popupEmail"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      id="popupEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.75rem,1.5vw,1rem)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddbc69] transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-center mb-4">
                <div ref={recaptchaRef}></div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !recaptchaLoaded}
                className={`w-full font-bold py-[clamp(0.75rem,1.5vw,1rem)] px-[clamp(1.25rem,3vw,2rem)] rounded-lg transition-all duration-300 ${
                  isLoading || !recaptchaLoaded
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "bg-[#ddbc69] hover:bg-[#c99a2d] text-black shadow-lg"
                }`}
              >
                {isLoading ? "Submitting..." : "Get A Call Back"}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                We respect your privacy. Your details are safe with us.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
