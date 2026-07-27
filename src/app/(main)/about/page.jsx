"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  MapPin,
  Star,
  Shield,
  Phone,
  ArrowRight,
  Building,
  Users,
  Heart,
  Target,
  Globe,
  Settings,
  CheckCircle,
  LandPlot,
  HardHat,
  Wrench,
  Handshake,
  Megaphone,
} from "lucide-react";
import Image from "next/image";
import c1 from "@/assests/testimonials/sanchit-mishra.webp";
import c2 from "@/assests/testimonials/janvi-goel.webp";
import c3 from "@/assests/testimonials/mohan-kumar.webp";
import BookMyAssets from "./OneYear";

const RealEstateLandingPage = () => {
  const [counts, setCounts] = useState({
    partners: 0,
    properties: 0,
    customers: 0,
  });

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({
    features: false,
    properties: false,
    testimonials: false,
    hero: false,
    about: false,
    companies: false,
  });
  // Scroll down function
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const featuresRef = useRef(null);
  const propertiesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const companiesRef = useRef(null);

  const targets = {
    partners: 50,
    properties: 1000,
    customers: 400,
  };

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Mohan Kumar",
      role: "Property Investor",
      comment:
        "BookMyAssets made my investment journey seamless. Their expert guidance helped me find the perfect plot in Dholera.",
      rating: 5,
      image: c3,
    },
    {
      id: 2,
      name: "Sanchit Mishra",
      role: "First-time Buyer",
      comment:
        "As a first-time investor, I was nervous, but the team at BookMyAssets walked me through the entire process with patience and expertise.",
      rating: 5,
      image: c1,
    },
    {
      id: 3,
      name: "Janvi Goel",
      role: "Entrepreneur",
      comment:
        "The investment opportunities in Dholera through BookMyAssets have significantly boosted my portfolio. Highly recommended!",
      rating: 5,
      image: c2,
    },
  ];

  // BMA Group Companies
  const companies = [
    {
      name: "BMA Developers",
      subtitle: "Land and Plotted Project Support",
      description:
        "BMA Developers helps buyers, investors and businesses explore land and plotted projects in and around Dholera.",
      icon: LandPlot,
      color: "from-blue-500 to-blue-600",
      features: [
        "Purchase and sale of land",
        "Residential plots in Dholera",
        "Bulk land deals",
        "Project location and pricing information",
        "NA, NOC and title-document support",
        "Approved layout and plan-pass details",
        "Site visit and transaction coordination",
      ],
    },
    {
      name: "BMA Construction Services",
      subtitle: "Planning to Final Handover",
      description:
        "BMA Construction provides support for land development and villa construction, from planning to final handover.",
      icon: HardHat,
      color: "from-green-500 to-green-600",
      features: [
        "Land development",
        "Villa planning and design",
        "Complete construction services",
        "Interior and finishing support",
        "Planned 1 BHK and 2 BHK villa options",
        "Construction updates and project coordination",
      ],
    },
    {
      name: "BMA Fabrication",
      subtitle: "Practical Custom Structures",
      description:
        "BMA Fabrication develops practical structures for residential, commercial and temporary use.",
      icon: Wrench,
      color: "from-slate-500 to-slate-600",
      features: [
        "Container homes",
        "Container offices",
        "Portable structures",
        "Custom fabrication",
        "Site installation support",
      ],
    },
    {
      name: "BMA Allied Services",
      subtitle: "Property Support After Purchase",
      description:
        "BMA Allied Services helps property owners maintain, manage and use their properties after purchase.",
      icon: Handshake,
      color: "from-purple-500 to-purple-600",
      features: [
        "Property maintenance",
        "Hospitality management",
        "Rental management",
        "Resale assistance",
        "Property-care support",
      ],
    },
    {
      name: "Truliyo Digital",
      subtitle: "Marketing and Online Trust Building",
      description:
        "Truliyo Digital provides marketing solutions for developers, businesses and real estate projects.",
      icon: Megaphone,
      color: "from-orange-500 to-orange-600",
      features: [
        "Digital Marketing",
        "Brand Visibility",
        "Lead Generation",
        "Social media marketing",
        "Website and content support",
        "Online trust building",
      ],
    },
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    const incrementCounter = (key, target, step) => {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [key]: Math.min(Math.ceil((target * step) / steps), target),
      }));
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      incrementCounter("partners", targets.partners, currentStep);
      incrementCounter("properties", targets.properties, currentStep);
      incrementCounter("customers", targets.customers, currentStep);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    const testimonialTimer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === featuresRef.current) {
            setIsVisible((prev) => ({ ...prev, features: true }));
          } else if (entry.target === propertiesRef.current) {
            setIsVisible((prev) => ({ ...prev, properties: true }));
          } else if (entry.target === testimonialsRef.current) {
            setIsVisible((prev) => ({ ...prev, testimonials: true }));
          } else if (entry.target === heroRef.current) {
            setIsVisible((prev) => ({ ...prev, hero: true }));
          } else if (entry.target === aboutRef.current) {
            setIsVisible((prev) => ({ ...prev, about: true }));
          } else if (entry.target === companiesRef.current) {
            setIsVisible((prev) => ({ ...prev, companies: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (propertiesRef.current) observer.observe(propertiesRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (heroRef.current) observer.observe(heroRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (companiesRef.current) observer.observe(companiesRef.current);

    // Trigger hero animation on load
    setTimeout(() => {
      setIsVisible((prev) => ({ ...prev, hero: true }));
    }, 300);

    return () => {
      clearInterval(timer);
      clearInterval(testimonialTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <title>About BookMyAssets | Trusted Real Estate Developer in Dholera</title>
      <meta
        name="description"
        content="BookMyAssets is a Dholera-focused real estate developer founded in 2024. Meet our founders, BMA Group companies, projects and end-to-end buyer support."
      />
      <link rel="canonical" href="https://www.bookmyassets.com/about" />
      <div className="bg-white">
        <div className="">
          <BookMyAssets />
        </div>
        {/* Hero Section - Fixed Layout */}
        <div className="relative bg-gray-900 overflow-hidden">
          <div
            ref={heroRef}
            className="relative z-10 container mx-auto px-4 py-8"
          >
            {/* Mobile View - Stacked (Text first then Video) */}
            <div className="lg:hidden flex flex-col justify-center space-y-8">
              {/* Text Content */}
              <div
                className={`w-full text-white space-y-6 transform transition-all duration-1000 ${
                  isVisible.hero
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pt-4">
                    <div className="h-1 w-12 bg-[#ddbc69] rounded"></div>
                    <span className="text-[#ddbc69] font-medium tracking-wide text-sm">
                      BMA GROUP OF COMPANIES
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                    Year One: Just the Beginning
                    <br />
                    {/* <span className="bg-[#ddbc69] bg-clip-text text-transparent">
                      India’s First Greenfield Smart City
                    </span>{" "}
                    <br />
                    Dholera with BookMyAssets */}
                  </h1>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    {/*  Discover premium, legally verified plots in Dholera Smart
                    City. We don't just offer land-we offer a vision of the
                    future. */}
                    Celebrating one year of turning raw belief into Dholera's
                    boldest success story
                  </p>
                </div>

                {/* CTA Buttons */}
              </div>

              {/* Video */}
              <div
                className={`flex items-center justify-center transform transition-all duration-1000 delay-300 ${
                  isVisible.hero
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="w-full max-w-md px-4">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ddbc69] to-blue-500 rounded-3xl blur-2xl opacity-20 animate-pulse -z-10"></div>

                    {/* Glass container */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-3 border border-white/20">
                      <div className="h-full rounded-2xl overflow-hidden">
                        <iframe
                          src="https://www.youtube.com/embed/b6WzvRbsU5I?si=4vAneOtfsagJs4cH"
                          title="YouTube Video"
                          className="w-full h-full rounded-2xl"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop View - Side by Side */}
            <div className="hidden lg:flex lg:items-center lg:justify-center pt-8">
              <div className="grid grid-cols-2 gap-12 xl:gap-16 max-w-7xl w-full items-center">
                {/* Left Content */}
                <div
                  className={`text-white space-y-6 xl:space-y-8 transform transition-all duration-1000 ${
                    isVisible.hero
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-20 opacity-0"
                  }`}
                >
                  <div className="space-y-4 xl:space-y-6">
                    <div className="flex items-center space-x-2">
                      <div className="h-1 w-12 bg-[#ddbc69] rounded"></div>
                      <span className="text-[#ddbc69] font-medium tracking-wide text-sm xl:text-base">
                        BMA GROUP OF COMPANIES
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                      Year One: Just the Beginning
                      <br />
                      {/* <span className="bg-gradient-to-r from-[#ddbc69] to-[#ddbc69] bg-clip-text text-transparent">
                        India’s First Greenfield Smart City
                      </span>{" "}
                      Dholera with BookMyAssets */}
                    </h1>

                    <p className="text-lg xl:text-xl text-gray-300 leading-relaxed">
                      {/* Discover premium, legally verified plots in Dholera Smart
                      City. We don't just offer land-we offer a vision of the
                      future. */}
                      Celebrating one year of turning raw belief into Dholera's
                      boldest success story
                    </p>
                  </div>

                  {/* CTA Buttons */}
                </div>

                {/* Right Content - YouTube Shorts Video */}
                <div className="flex items-center justify-center">
                  <div
                    className={`w-full max-w-4xl transform transition-all duration-1000 delay-500 ${
                      isVisible.hero
                        ? "translate-x-0 opacity-100"
                        : "translate-x-20 opacity-0"
                    }`}
                  >
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      {/* Animated background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#ddbc69] to-blue-500 rounded-3xl blur-2xl opacity-20 animate-pulse -z-10"></div>

                      {/* Glass container */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-3 md:p-6 border border-white/20">
                        <div className="h-full rounded-2xl overflow-hidden">
                          <iframe
                            src="https://www.youtube.com/embed/b6WzvRbsU5I?si=4vAneOtfsagJs4cH"
                            title="YouTube Video"
                            className="w-full h-full rounded-2xl"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div ref={aboutRef} className="bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  About Us
                </h2>
                <div className="flex items-center justify-center mb-6">
                  <div className="h-1 w-16 bg-[#ddbc69] rounded"></div>
                  <span className="mx-4 size-2 rotate-45 bg-[#ddbc69]" />
                  <div className="h-1 w-16 bg-[#ddbc69] rounded"></div>
                </div>
                <p className="text-lg  text-[#ddbc69] font-bold mb-4">
                  Company Profile
                </p>
              </div>

              <div
                className={`grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2 transform transition-all duration-1000 ${
                  isVisible.about
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {/* Left Content */}
                <div className="order-1 lg:col-span-2">
                  <div className="border-l-4 border-[#ddbc69] pl-5 sm:pl-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      BookMyAssets
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      BookMyAssets started its journey in December 2024. We
                      began developing our own residential plotted projects in
                      and around Dholera.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Our projects include WestWyn County, WestWyn Estates and
                      WestWyn Residency.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      We focus on practical, liveable and future-ready
                      development. Our aim is to support organised habitation as
                      Dholera grows.
                    </p>
                  </div>
                </div>

                <div className="order-2 border-t border-black/15 pt-10">
                    <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                      Our Mission
                    </h3>
                    <p className="mb-5 leading-relaxed text-gray-700">
                      Our mission is to make property investment in Dholera
                      simple, clear and transparent. We focus on:
                    </p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {[
                        "Clear project information",
                        "Transparent pricing",
                        "Available legal documents",
                        "Easy booking process",
                        "Registry-ready plot options",
                        "Site visit support",
                        "Construction assistance",
                        "Rental and resale support",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-700">
                          <CheckCircle
                            className="mt-0.5 flex-shrink-0 text-[#b28d38]"
                            size={20}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                {/* Right Content */}
                <div className="contents">
                  <div className="order-4 border-t border-black/15 pt-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      Trusted Real Estate Developer in Dholera
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-5">
                      BookMyAssets provides complete property support through:
                    </p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {[
                        "Residential plots in Dholera",
                        "Bulk land deals",
                        "Clear project information",
                        "Legal document support",
                        "Site visit assistance",
                        "After-sales support",
                        "Villa construction",
                        "Rental and resale assistance",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle
                            className="mt-0.5 flex-shrink-0 text-[#b28d38]"
                            size={20}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-3 border-t-2 border-[#ddbc69] pt-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-4">
                      Our Vision
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-5">
                      Our vision is to create planned and liveable residential
                      communities in Dholera. We aim to:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Develop practical residential projects",
                        "Support home and villa construction",
                        "Create future rental opportunities",
                        "Promote organised habitation",
                        "Build long-term relationships with buyers",
                        "Support the growth of Dholera as a residential destination",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle
                            className="mt-0.5 flex-shrink-0 text-[#b28d38]"
                            size={20}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-5 border-t border-black/15 pt-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-4">
                      Setting a New Standard for Living in Dholera
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-5">
                      BookMyAssets is not focused on selling empty plots alone.
                      We aim to create places where people can build homes, live
                      comfortably and generate future rental opportunities.
                    </p>
                    <p className="font-semibold text-black mb-3">
                      We are working to set a new standard for:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Liveable homes in and around Dholera",
                        "Planned residential communities",
                        "Villa construction and ready housing",
                        "Rental-ready properties",
                        "Long-term habitation in Dholera",
                        "Complete support after plot purchase",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle
                            className="mt-0.5 flex-shrink-0 text-[#b28d38]"
                            size={20}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BMA Group Companies Section */}
        <div
          ref={companiesRef}
          className="bg-[#0d0d0d] py-16 text-white lg:py-24"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                BMA Group of Companies
              </h2>
              <div className="flex items-center justify-center mb-6">
                <div className="h-1 w-16 bg-[#ddbc69] rounded"></div>
                <span className="mx-4 size-2 rotate-45 bg-[#ddbc69]" />
                <div className="h-1 w-16 bg-[#ddbc69] rounded"></div>
              </div>
              <p className="text-xl text-white/80 max-w-5xl mx-auto">
                BookMyAssets is more than a real estate developer in Dholera.
                Through the BMA Group of Companies, we provide support for land
                purchase, project development, villa construction, fabrication,
                property management, hospitality and marketing.
              </p>
              <p className="mt-4 text-base text-[#ddbc69] max-w-4xl mx-auto">
                One group, multiple services, and fewer vendors turning a
                straightforward project into a group-chat crisis.
              </p>
            </div>

            <div className="mt-12">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 ${
                    isVisible.companies
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="border-t border-[#ddbc69]/35 py-8 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:py-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex size-12 items-center justify-center text-[#ddbc69]">
                        <company.icon size={32} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {company.name}
                        </h3>
                        <p className="text-[#ddbc69] font-medium">
                          {company.subtitle}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {company.description}
                      </p>

                      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {company.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-2 text-sm text-gray-300"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ddbc69]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="bg-[#ddbc69] py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                Our Milestones
              </h2>
              <div className="flex items-center justify-center">
                <div className="h-px w-16 bg-black/60"></div>
                <span className="mx-4 size-2 rotate-45 bg-black" />
                <div className="h-px w-16 bg-black/60"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 divide-y divide-black/25 border-y border-black/25 md:grid-cols-3 md:divide-x md:divide-y-0">
              {[
                {
                  count: counts.partners,
                  label: "Partners",
                  icon: Users,
                  color: "from-blue-500 to-blue-600",
                },
                {
                  count: counts.properties,
                  label: "Premium Properties",
                  icon: Building,
                  color: "from-green-500 to-green-600",
                },
                {
                  count: counts.customers,
                  label: "Happy Customers",
                  icon: Heart,
                  color: "from-purple-500 to-purple-600",
                },
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-center gap-5 py-8 md:px-8 md:py-10">
                    <div className="flex size-14 shrink-0 items-center justify-center text-black">
                      <item.icon size={34} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-4xl lg:text-5xl font-bold text-black mb-1">
                        {item.count}+
                      </div>
                      <div className="text-base font-medium text-black/70 lg:text-lg">
                        {item.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div ref={featuresRef} className="bg-black py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Why Choose BookMyAssets?
              </h2>
              <div className="flex items-center justify-center mb-6">
                <div className="h-1 w-16 bg-[#ddbc69] rounded"></div>
                <span className="mx-4 size-2 rotate-45 bg-[#ddbc69]" />
                <div className="h-1 w-16 bg-[#ddbc69] rounded"></div>
              </div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                BookMyAssets provides complete property support in Dholera under
                one group.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: MapPin,
                  title: "Dholera-Focused Developer",
                  description:
                    "Focused real estate development and property support in and around Dholera.",
                  color: "from-red-500 to-red-600",
                },
                {
                  icon: Building,
                  title: "Plots and Bulk Land",
                  description:
                    "Residential plot options and bulk land support for different requirements.",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: Shield,
                  title: "Project and Legal Documents",
                  description:
                    "Available project information and legal documents for buyer review.",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: Target,
                  title: "Transparent Process",
                  description:
                    "Clear pricing, project information and a straightforward buying process.",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: Settings,
                  title: "In-House Services",
                  description:
                    "Construction and fabrication support coordinated within the BMA Group.",
                  color: "from-[#ddbc69] to-[#ddbc69]",
                },
                {
                  icon: Phone,
                  title: "Site Visit and Registry Support",
                  description:
                    "Assistance with site visits, documentation and registry coordination.",
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  icon: Heart,
                  title: "Property Support",
                  description:
                    "Rental, resale and maintenance assistance after property purchase.",
                  color: "from-pink-500 to-pink-600",
                },
                {
                  icon: Globe,
                  title: "Indian and NRI Buyers",
                  description:
                    "Practical guidance for buyers based in India and overseas.",
                  color: "from-cyan-500 to-cyan-600",
                },
                {
                  icon: CheckCircle,
                  title: "Liveable, Future-Ready Development",
                  description:
                    "A long-term focus on planned communities, habitation and buyer support.",
                  color: "from-emerald-500 to-emerald-600",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-500 ${
                    isVisible.features
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-full border-t border-white/20 py-7">
                    <div className="mb-5 flex size-10 items-center justify-start text-[#ddbc69]">
                      <feature.icon size={28} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div
          ref={testimonialsRef}
          className="py-12 bg-gradient-to-br from-gray-50 to-gray-100"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <div className="flex items-center justify-center mb-6">
                <div className="h-1 w-16 bg-[#ddbc69] rounded"></div>
                <Star className="mx-4 text-[#ddbc69]" size={24} />
                <div className="h-1 w-16 bg-[#ddbc69] rounded"></div>
              </div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Don't just take our word for it. Here's what our investors have
                to say about their experience with us.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div
                className={`bg-white rounded-3xl shadow-xl p-8 md:p-12 transform transition-all duration-500 ${
                  isVisible.testimonials
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#ddbc69] to-[#ddbc69] mx-auto flex items-center justify-center text-white text-4xl font-bold">
                        <Image
                          src={testimonials[testimonialIndex].image}
                          alt={testimonials[testimonialIndex].name}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex mb-4">
                      {[...Array(testimonials[testimonialIndex].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="text-[#ddbc69] fill-[#ddbc69]"
                            size={20}
                          />
                        ),
                      )}
                    </div>
                    <p className="text-gray-700 text-lg italic mb-6">
                      "{testimonials[testimonialIndex].comment}"
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">
                          {testimonials[testimonialIndex].name}
                        </h4>
                      </div>
                      <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setTestimonialIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              testimonialIndex === index
                                ? "bg-[#ddbc69] w-6"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Ready to Invest in Your Future?
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Join hundreds of smart investors who are building wealth through
                strategic real estate investments in Dholera Smart City.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="https://wa.me/918130371647">
                  <button className="bg-[#ddbc69] hover:bg-[#ddbc69] text-black px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Schedule a Consultation</span>
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={20}
                    />
                  </button>
                </a>
                <a href="tel:+918130371647">
                  <button className="border-2 border-[#ddbc69] hover:bg-[#ddbc69] text-[#ddbc69] hover:text-black px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Phone size={20} />
                    <span>Call Us Now</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RealEstateLandingPage;
