"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import img from "@/assests/contact.webp";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeIndianRupee,
  CalendarCheck,
  ClipboardCheck,
  FileCheck,
  Handshake,
  Info,
  LandPlot,
  Layers3,
  Mail,
  MapPin,
  MapPinned,
  Phone,
  ShieldCheck,
} from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bookmyassetss",
    icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bookmyassets/",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1AXGEEX1M8/",
    icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@BookMyAssets",
    icon: FaYoutube,
  },
  {
    label: "X",
    href: "https://x.com/BookMyAssets",
    icon: FaXTwitter,
  },
];

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=BookMyAssets%20620%20JMD%20Megapolis%20Sohna%20Road%20Gurugram";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });

  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const recaptchaRef = useRef(null);
  const formRef = useRef(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const helpItems = [
    {
      icon: Info,
      title: "Dholera Project Information",
    },
    {
      icon: LandPlot,
      title: "Residential Plots in Dholera",
    },
    {
      icon: BadgeIndianRupee,
      title: "Current Prices & Payment Plans",
    },
    {
      icon: MapPinned,
      title: "Project Location Details",
    },
    {
      icon: FileCheck,
      title: "Legal Documents",
    },
    {
      icon: CalendarCheck,
      title: "Site Visit Bookings",
    },
    {
      icon: ClipboardCheck,
      title: "Booking & Registration",
    },
    {
      icon: Layers3,
      title: "Bulk Land Requirements",
    },
    {
      icon: Handshake,
      title: "Channel Partner Enquiries",
    },
  ];

  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window === "undefined") return;

      if (window.grecaptcha) {
        setRecaptchaLoaded(true);
        return;
      }

      try {
        const existingScript = document.querySelector(
          'script[src="https://www.google.com/recaptcha/api.js"]'
        );

        if (existingScript) {
          existingScript.addEventListener("load", () =>
            setRecaptchaLoaded(true)
          );

          return;
        }

        const script = document.createElement("script");

        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;

        script.onload = () => {
          setRecaptchaLoaded(true);
        };

        script.onerror = () => {
          console.error("Failed to load reCAPTCHA script");
          setRecaptchaLoaded(true);
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error("reCAPTCHA script loading error:", error);
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
      );

      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please fill all required fields.",
      });

      return false;
    }

    const cleanPhone = formData.phone.replace(/\s+/g, "");

    if (!/^\d{10,15}$/.test(cleanPhone)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid phone number (10-15 digits).",
      });

      return false;
    }

    return true;
  };

  const checkSubmissionLimit = () => {
    const now = Date.now();

    const hoursPassed =
      (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);

      localStorage.setItem("formSubmissionCount", "0");

      localStorage.setItem(
        "lastSubmissionTime",
        now.toString()
      );
    }

    if (submissionCount >= 3 && hoursPassed < 24) {
      setSubmitStatus({
        type: "error",
        message:
          "You have reached the maximum submission limit. Try again after 24 hours.",
      });

      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const now = Date.now();

      const response = await fetch("/api/submit-form", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fields: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,

            source:
              "BookMyAssets Website Contact Page",
          },

          source: "BookMyAssets Website",

          tags: [
            "Website Lead",
            "Contact Form",
            "BookMyAssets",
          ],

          recaptchaToken: token,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to submit to TeleCRM"
        );
      }

      setSubmitStatus({
        type: "success",
        message:
          "Message sent successfully! We'll contact you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setSubmissionCount((prev) => {
        const newCount = prev + 1;

        localStorage.setItem(
          "formSubmissionCount",
          newCount.toString()
        );

        localStorage.setItem(
          "lastSubmissionTime",
          now.toString()
        );

        return newCount;
      });
    } catch (error) {
      console.error(
        "Form submission error:",
        error
      );

      setSubmitStatus({
        type: "error",

        message:
          error.message ||
          "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);

      if (
        window.grecaptcha &&
        recaptchaRef.current
      ) {
        window.grecaptcha.reset(
          recaptchaRef.current
        );
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    setSubmitStatus({
      type: "",
      message: "",
    });

    if (
      !validateForm() ||
      !checkSubmissionLimit()
    ) {
      setIsSubmitting(false);
      return;
    }

    if (
      window.grecaptcha &&
      recaptchaLoaded
    ) {
      try {
        if (recaptchaRef.current) {
          recaptchaRef.current.innerHTML = "";

          window.grecaptcha.render(
            recaptchaRef.current,
            {
              sitekey: siteKey,

              callback:
                onRecaptchaSuccess,

              theme: "light",
            }
          );
        }
      } catch (error) {
        console.error(
          "reCAPTCHA execution error:",
          error
        );

        setSubmitStatus({
          type: "error",

          message:
            "Verification error. Please try again.",
        });

        setIsSubmitting(false);
      }
    } else {
      setSubmitStatus({
        type: "error",

        message:
          "Security verification not loaded. Please refresh the page.",
      });

      setIsSubmitting(false);
    }
  };

  const chooseHelpTopic = (title) => {
    setFormData((prev) => ({
      ...prev,
      subject: title,
    }));

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const canonicalUrl =
    "https://www.bookmyassets.com/contact";

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#0d1b2a]">
      <link
        rel="canonical"
        href={canonicalUrl}
      />

      <title>
        Contact BookMyAssets | Dholera Plot
        Enquiry & Site Visit
      </title>

      <meta
        name="description"
        content="Contact BookMyAssets for Dholera residential plot prices, legal documents and free site visits. Call +91 81303 71647 or request a callback today."
      />

      <main className="overflow-hidden pt-20">
        <section className="relative border-b border-[#e9e1d3] bg-[#f8f6f1]">
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-40
              [background-image:radial-gradient(circle_at_1px_1px,rgba(13,27,42,0.055)_1px,transparent_0)]
              [background-size:28px_28px]
            "
          />

          <div className="pointer-events-none absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#ddbc69]/15 blur-3xl" />

          <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-[#0d1b2a]/8 blur-3xl" />

          <div
            className="
              relative
              mx-auto
              max-w-[1500px]
              px-4
              pb-10
              pt-8
              sm:px-6
              lg:px-8
              lg:pb-12
              lg:pt-10
            "
          >
            <div
              className="
                grid
                gap-6
                xl:grid-cols-[0.86fr_1.12fr_0.98fr]
                xl:items-stretch
              "
            >
              {/* LEFT SIDE */}
              <div className="contents xl:block">
                <div className="order-1 xl:order-none xl:pr-2">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-9 bg-[#ddbc69]" />

                    <span
                      className="
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.28em]
                        text-[#7e692f]
                      "
                    >
                      Contact Us
                    </span>
                  </div>

                  <h1
                    className="
                      max-w-[620px]
                      text-[42px]
                      font-bold
                      leading-[0.98]
                      tracking-[-0.045em]
                      text-[#0d1b2a]
                      sm:text-5xl
                      xl:text-[58px]
                    "
                  >
                    We&apos;re Here
                    <br />
                    To{" "}
                    <span className="text-[#bd902b]">
                      Help You
                    </span>
                  </h1>

                  <p
                    className="
                      mt-4
                      max-w-xl
                      text-[15px]
                      leading-7
                      text-[#58616d]
                    "
                  >
                    Connect with our team for expert
                    guidance on Dholera investments,
                    project details, bookings,
                    documentation and site visits.
                  </p>
                </div>

                {/* CONTACT ACTIONS */}
                <div
                  className="
                    order-3
                    mt-1
                    space-y-3
                    xl:order-none
                    xl:mt-6
                  "
                >
                  <a
                    href="tel:+918130371647"
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-[#ebe5d8]
                      bg-white
                      px-4
                      py-3.5
                      shadow-[0_10px_30px_rgba(13,27,42,0.045)]
                      transition
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-[#ddbc69]
                      hover:shadow-[0_16px_35px_rgba(13,27,42,0.09)]
                    "
                  >
                    <span
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#ddbc69]
                        text-[#0d1b2a]
                      "
                    >
                      <Phone className="h-[18px] w-[18px]" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-[#75808c]">
                        Call Us
                      </span>

                      <span className="mt-0.5 block text-sm font-bold text-[#0d1b2a] sm:text-[15px]">
                        +91 81 30 37 1647
                      </span>
                    </span>

                    <ArrowUpRight className="ml-auto h-4 w-4 text-[#8c949d] transition group-hover:text-[#bd902b]" />
                  </a>

                  <a
                    href="mailto:info@bookmyassets.com"
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-[#ebe5d8]
                      bg-white
                      px-4
                      py-3.5
                      shadow-[0_10px_30px_rgba(13,27,42,0.045)]
                      transition
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-[#ddbc69]
                      hover:shadow-[0_16px_35px_rgba(13,27,42,0.09)]
                    "
                  >
                    <span
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#ddbc69]
                        text-[#0d1b2a]
                      "
                    >
                      <Mail className="h-[18px] w-[18px]" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-[#75808c]">
                        Email Us
                      </span>

                      <span className="mt-0.5 block truncate text-sm font-bold text-[#0d1b2a] sm:text-[15px]">
                        info@bookmyassets.com
                      </span>
                    </span>

                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[#8c949d] transition group-hover:text-[#bd902b]" />
                  </a>

                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-[#ebe5d8]
                      bg-white
                      px-4
                      py-3.5
                      shadow-[0_10px_30px_rgba(13,27,42,0.045)]
                      transition
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-[#ddbc69]
                      hover:shadow-[0_16px_35px_rgba(13,27,42,0.09)]
                    "
                  >
                    <span
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#ddbc69]
                        text-[#0d1b2a]
                      "
                    >
                      <MapPin className="h-[18px] w-[18px]" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-[#75808c]">
                        Visit Our Office
                      </span>

                      <span className="mt-0.5 block text-sm font-semibold leading-5 text-[#0d1b2a]">
                        620, JMD Megapolis, Sohna Rd,
                        <br className="hidden sm:block" />
                        Sector 48, Gurugram, Haryana
                        122018
                      </span>
                    </span>

                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[#8c949d] transition group-hover:text-[#bd902b]" />
                  </a>

                  <a
                    href="https://wa.me/918130371647"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-[#ddbc69]
                      px-5
                      py-3.5
                      text-sm
                      font-bold
                      text-[#0d1b2a]
                      shadow-[0_12px_28px_rgba(221,188,105,0.3)]
                      transition
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#d3ae51]
                      hover:shadow-[0_16px_32px_rgba(221,188,105,0.4)]
                    "
                  >
                    <FaWhatsapp className="h-[18px] w-[18px]" />

                    Chat on WhatsApp

                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>

                  {/* SOCIAL ICONS */}
                  <div className="pt-2">
                    <p className="mb-3 text-xs font-medium text-[#7a838d]">
                      Follow Us
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                      {SOCIAL_LINKS.map(
                        ({
                          label,
                          href,
                          icon: Icon,
                        }) => (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Visit ${label}`}
                            title={label}
                            className="
                              group
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-[#e8e1d4]
                              bg-white
                              text-[#0d1b2a]
                              shadow-sm
                              transition
                              duration-300
                              hover:-translate-y-1
                              hover:border-[#ddbc69]
                              hover:bg-[#ddbc69]
                            "
                          >
                            <Icon className="h-4 w-4" />
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* OFFICE IMAGE */}
              <div className="order-2 xl:order-none">
                <div
                  className="
                    group
                    relative
                    h-[330px]
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-white/70
                    bg-[#d9d9d9]
                    shadow-[0_24px_55px_rgba(13,27,42,0.13)]
                    sm:h-[430px]
                    xl:h-full
                    xl:min-h-[610px]
                  "
                >
                  <Image
                    src={img}
                    alt="BookMyAssets office at JMD Megapolis, Gurugram"
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 38vw"
                    className="
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-[1.025]
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#081521]/70 via-transparent to-transparent" />

                  {/* OFFICE OVERLAY */}
                  <div
                    className="
                      absolute
                      bottom-4
                      left-4
                      right-4
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/25
                      bg-[#0d1b2a]/82
                      p-3.5
                      text-white
                      shadow-2xl
                      backdrop-blur-md
                      sm:bottom-5
                      sm:left-5
                      sm:right-5
                      sm:p-4
                    "
                  >
                    <span
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-[#0d1b2a]
                      "
                    >
                      <MapPin className="h-5 w-5 fill-[#0d1b2a]" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-bold">
                        Our Office
                      </p>

                      <p className="mt-0.5 truncate text-xs text-white/75">
                        620, JMD Megapolis, Gurugram
                      </p>
                    </div>

                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open BookMyAssets office in Google Maps"
                      className="
                        ml-auto
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-white/10
                        transition
                        hover:bg-[#ddbc69]
                        hover:text-[#0d1b2a]
                      "
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* CONTACT FORM */}
              <div
                ref={formRef}
                id="contact-form-container"
                className="
                  order-4
                  rounded-[26px]
                  border
                  border-[#e9e1d4]
                  bg-white
                  p-5
                  shadow-[0_24px_55px_rgba(13,27,42,0.085)]
                  sm:p-6
                  xl:order-none
                  xl:p-7
                "
              >
                <div className="mb-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#ddbc69]" />

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-[#80682f]
                      "
                    >
                      Send Us a Message
                    </span>
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      tracking-[-0.03em]
                      text-[#0d1b2a]
                      sm:text-[28px]
                    "
                  >
                    Get in Touch
                  </h2>

                  <p className="mt-1.5 text-sm leading-6 text-[#6d7680]">
                    Share your requirement and our
                    team will get back to you.
                  </p>
                </div>

                {submitStatus.message && (
                  <div
                    className={`mb-4 rounded-xl border p-3 text-sm ${
                      submitStatus.type ===
                      "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3.5"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-semibold text-[#313b46]"
                    >
                      Name *
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#d9dde2]
                        bg-[#fcfcfb]
                        px-3.5
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        focus:border-[#ddbc69]
                        focus:ring-4
                        focus:ring-[#ddbc69]/15
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-semibold text-[#313b46]"
                    >
                      Phone *
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#d9dde2]
                        bg-[#fcfcfb]
                        px-3.5
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        focus:border-[#ddbc69]
                        focus:ring-4
                        focus:ring-[#ddbc69]/15
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold text-[#313b46]"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#d9dde2]
                        bg-[#fcfcfb]
                        px-3.5
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        focus:border-[#ddbc69]
                        focus:ring-4
                        focus:ring-[#ddbc69]/15
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-xs font-semibold text-[#313b46]"
                    >
                      Enquiry Type *
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#d9dde2]
                        bg-[#fcfcfb]
                        px-3.5
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        focus:border-[#ddbc69]
                        focus:ring-4
                        focus:ring-[#ddbc69]/15
                      "
                    >
                      <option value="">
                        Select enquiry type
                      </option>

                      {helpItems.map((item) => (
                        <option
                          key={item.title}
                          value={item.title}
                        >
                          {item.title}
                        </option>
                      ))}

                      <option value="Other Enquiry">
                        Other Enquiry
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold text-[#313b46]"
                    >
                      Message *
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what you need help with"
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-[#d9dde2]
                        bg-[#fcfcfb]
                        px-3.5
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        focus:border-[#ddbc69]
                        focus:ring-4
                        focus:ring-[#ddbc69]/15
                      "
                    />
                  </div>

                  {/* RECAPTCHA */}
                  <div className="overflow-x-auto py-1">
                    <div ref={recaptchaRef} />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !recaptchaLoaded
                    }
                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition duration-300 ${
                      isSubmitting ||
                      !recaptchaLoaded
                        ? "cursor-not-allowed bg-gray-300 text-gray-600"
                        : "bg-[#ddbc69] text-[#0d1b2a] hover:-translate-y-0.5 hover:bg-[#d3ae51] hover:shadow-lg"
                    }`}
                  >
                    {!recaptchaLoaded
                      ? "Loading security..."
                      : isSubmitting
                        ? "Sending..."
                        : "Send Message"}

                    {!isSubmitting &&
                      recaptchaLoaded && (
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      )}
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-center text-[10px] leading-4 text-[#9299a1]">
                    <ShieldCheck className="h-3.5 w-3.5" />

                    Your information is safe with us.
                    We typically respond within 24
                    hours.
                  </p>
                </form>
              </div>
            </div>

            {/* QUICK HELP */}
            <div className="mt-10 lg:mt-12">
              <div className="mb-6 text-center">
                <div className="mb-3 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-[#ddbc69]" />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-[#80682f]
                    "
                  >
                    How Can We Help You?
                  </span>

                  <span className="h-px w-8 bg-[#ddbc69]" />
                </div>

                <h2
                  className="
                    text-2xl
                    font-bold
                    tracking-[-0.03em]
                    text-[#0d1b2a]
                    sm:text-3xl
                  "
                >
                  Choose a topic to get{" "}
                  <span className="text-[#bd902b]">
                    quick assistance
                  </span>
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#6c7580]">
                  Select a category and the enquiry
                  form will automatically use it as
                  your subject.
                </p>
              </div>

              <div
                className="
                  grid
                  gap-3
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-5
                "
              >
                {helpItems.map(
                  ({
                    icon: Icon,
                    title,
                  }) => {
                    const selected =
                      formData.subject === title;

                    return (
                      <button
                        key={title}
                        type="button"
                        onClick={() =>
                          chooseHelpTopic(title)
                        }
                        className={`group flex min-h-[92px] items-center gap-3 rounded-2xl border p-3.5 text-left shadow-[0_8px_22px_rgba(13,27,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#ddbc69] hover:shadow-[0_14px_28px_rgba(13,27,42,0.08)] ${
                          selected
                            ? "border-[#ddbc69] bg-[#fff8e6]"
                            : "border-[#e9e3d8] bg-white"
                        }`}
                      >
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${
                            selected
                              ? "bg-[#ddbc69] text-[#0d1b2a]"
                              : "bg-[#f5ecd4] text-[#a47d26] group-hover:bg-[#ddbc69] group-hover:text-[#0d1b2a]"
                          }`}
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </span>

                        <span className="text-xs font-bold leading-5 text-[#26313c] sm:text-sm">
                          {title}
                        </span>

                        <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[#7f8993] transition group-hover:translate-x-1 group-hover:text-[#bd902b]" />
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PERSONAL ASSISTANCE */}
        <section className="relative overflow-hidden bg-[#0d1b2a]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(221,188,105,0.16),transparent_35%)]" />

          <div
            className="
              relative
              mx-auto
              flex
              max-w-[1500px]
              flex-col
              gap-5
              px-4
              py-8
              sm:px-6
              md:flex-row
              md:items-center
              md:justify-between
              lg:px-8
            "
          >
            <div className="flex items-center gap-4">
              <span
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#ddbc69]/60
                  text-[#ddbc69]
                "
              >
                <Handshake className="h-6 w-6" />
              </span>

              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Looking for personalised
                  assistance?
                </h2>

                <p className="mt-1 text-sm leading-6 text-white/65">
                  Talk to our investment experts and
                  get guidance suited to your
                  requirement.
                </p>
              </div>
            </div>

            <a
              href="tel:+918130371647"
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#ddbc69]
                px-6
                py-3.5
                text-sm
                font-bold
                text-[#0d1b2a]
                transition
                hover:-translate-y-0.5
                hover:bg-[#d3ae51]
              "
            >
              Talk to an Expert

              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;