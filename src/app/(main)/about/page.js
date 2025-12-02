"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  MapPin,
  Star,
  Shield,
  TrendingUp,
  Phone,
  ArrowRight,
  Building,
  Users,
  Heart,
  Play,
  Target,
  Globe,
  Settings,
  Zap,
  Award,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import c1 from "@/assests/testimonials/sanchit-mishra.webp"
import c2 from "@/assests/testimonials/janvi-goel.webp"
import c3 from "@/assests/testimonials/mohan-kumar.webp"

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
      image:c3
    },
    {
      id: 2,
      name: "Sanchit Mishra",
      role: "First-time Buyer",
      comment:
        "As a first-time investor, I was nervous, but the team at BookMyAssets walked me through the entire process with patience and expertise.",
      rating: 5,
      image:c1
    },
    {
      id: 3,
      name: "Janvi Goel",
      role: "Entrepreneur",
      comment:
        "The investment opportunities in Dholera through BookMyAssets have significantly boosted my portfolio. Highly recommended!",
      rating: 5,
      image:c2
    },
  ];

  // BMA Group Companies
  const companies = [
    {
      name: "BMA Developers",
      subtitle: "From Selling Projects to Creating Landmarks",
      description:
        "BMA has been part of 6 successful projects that have been sold out, selling over 1,00,000 square yards of land in Dholera. We now don't just sell land, we build dreams.",
      icon: Building,
      color: "from-blue-500 to-blue-600",
      features: [
        "8 Successful Projects",
        "1,00,000+ Sq Yards Sold",
        "Premium Communities",
        "WestWyn County Project",
      ],
    },
    {
      name: "BMA Channel Partners",
      subtitle: "Because Your Dreams Have No Borders",
      description:
        "A global network that connects you with verified, high-quality developers in India and internationally. Whether you want to invest in Dubai, Mumbai, or anywhere else, we open every investment door for you.",
      icon: Globe,
      color: "from-green-500 to-green-600",
      features: [
        "Global Network",
        "Verified Developers",
        "International Investments",
        "Client-Centric Approach",
      ],
    },
    {
      name: "BMA Allied Services",
      subtitle: "Helping You Build, Manage & Enjoy Your Investment",
      description:
        "From construction to maintenance to hospitality support, we take care of it all. Whether you're a new investor or an existing one, we've got your back, start to finish.",
      icon: Settings,
      color: "from-purple-500 to-purple-600",
      features: [
        "Construction Services",
        "Maintenance Support",
        "Hospitality Management",
        "End-to-End Solutions",
      ],
    },
    {
      name: "Truliyo Digital",
      subtitle: "Marketing That Creates Trust, Online and Offline",
      description:
        "Our in house marketing and digital performance team that drives leads, creates brand visibility, and builds trust across borders. It's not just about running ads, it's about connecting the right investor with the right opportunity.",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      features: [
        "Digital Marketing",
        "Brand Visibility",
        "Lead Generation",
        "Trust Building",
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
      observerOptions
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
      <title>
        About BookMyAssets | Trusted Real Estate Investment in Dholera
      </title>
      <meta
        name="description"
        content="Join BMA Group in Dholera Smart City for reliable real estate services. We provide legally verified plots and end-to-end investment support for smart growth."
      />
       <link
            rel="canonical"
            href="https://www.bookmyassets.com/about"
          />
      <div className="bg-white">
        {/* Hero Section - Fixed Layout */}
        <div className="relative min-h-screen bg-gray-900 overflow-hidden">
          <div
            ref={heroRef}
            className="relative z-10 container mx-auto px-4 py-8"
          >
            {/* Mobile View - Stacked (Text first then Video) */}
            <div className="lg:hidden flex flex-col min-h-screen justify-center space-y-8">
              {/* Text Content */}
              <div
                className={`w-full text-white space-y-6 transform transition-all duration-1000 ${
                  isVisible.hero
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pt-16">
                    <div className="h-1 w-12 bg-yellow-500 rounded"></div>
                    <span className="text-yellow-500 font-medium tracking-wide text-sm">
                      BMA GROUP OF COMPANIES
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                    Step Into
                    <br />
                    <span className="bg-yellow-400 bg-clip-text text-transparent">
                      India’s First Greenfield Smart City
                    </span>{" "}
                    <br />
                    Dholera with BookMyAssets
                  </h1>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    Discover premium, legally verified plots in Dholera Smart
                    City. We don't just offer land-we offer a vision of the
                    future.
                  </p>
                </div>

                {/* Mission Statement */}
                {/*               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  To help people grow their money safely, confidently, and with maximum returns through strategic real estate investments in India's first greenfield smart city.
                </p>
              </div> */}

                {/* CTA Buttons */}
                
                <div className="flex flex-col gap-4">
                  <Link href="/dholera-residential-plots/westwyn-estate">
                  <button className="group bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Explore Properties</span>
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={20}
                      />
                  </button>
                      </Link>
                      <Link href="https://www.youtube.com/@BookMyAssets">
                  <button className="group bg-transparent border-2 border-white/30 hover:border-yellow-500 text-white hover:text-yellow-500 px-6 py-3 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-2">
                    <Play size={20} />
                    <span>Watch Video</span>
                  </button>
                      </Link>
                </div>
              </div>

              {/* Video */}
              <div
                className={`flex items-center justify-center transform transition-all duration-1000 delay-300 ${
                  isVisible.hero
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div
                  className="w-full max-w-xs"
                  style={{ aspectRatio: "9/16", height: "400px" }}
                >
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/20 h-full">
                      <div className="h-full rounded-2xl overflow-hidden">
                        <iframe
                          src="https://www.youtube.com/embed/NzvDr2GyL9Y?si=YpXIPEx8AsODmara?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0"
                          title="YouTube Shorts Video"
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
            <div className="hidden lg:flex lg:items-center lg:justify-center min-h-screen pt-8">
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
                      <div className="h-1 w-12 bg-yellow-500 rounded"></div>
                      <span className="text-yellow-500 font-medium tracking-wide text-sm xl:text-base">
                        BMA GROUP OF COMPANIES
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                      Step Into
                      <br />
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        India’s First Greenfield Smart City
                      </span>{" "}
                      Dholera with BookMyAssets
                    </h1>

                    <p className="text-lg xl:text-xl text-gray-300 leading-relaxed">
                      Discover premium, legally verified plots in Dholera Smart
                      City. We don't just offer land-we offer a vision of the
                      future.
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dholera-residential-plots/westwyn-estate">
                    <button className="group bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                      <span>Explore Properties</span>
                      <ArrowRight
                        className="group-hover:translate-x-1 transition-transform"
                        size={20}
                        />
                    </button>
                        </Link>
                       <Link href="https://www.youtube.com/@BookMyAssets">
                    <button className="group bg-transparent border-2 border-white/30 hover:border-yellow-500 text-white hover:text-yellow-500 px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-2">
                      <Play size={20} />
                      <span>Watch Video</span>
                    </button>
                        </Link>
                  </div>
                </div>

                {/* Right Content - YouTube Shorts Video */}
                <div className="flex items-center justify-center">
                  <div
                    className={`w-full max-w-sm transform transition-all duration-1000 delay-500 ${
                      isVisible.hero
                        ? "translate-x-0 opacity-100"
                        : "translate-x-20 opacity-0"
                    }`}
                  >
                    <div
                      className="relative"
                      style={{ aspectRatio: "9/16", height: "600px" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 h-full">
                        <div className="h-full rounded-2xl overflow-hidden">
                          <iframe
                            src="https://www.youtube.com/embed/NzvDr2GyL9Y?si=YpXIPEx8AsODmara?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0"
                            title="YouTube Shorts Video"
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
        <div
          ref={aboutRef}
          className="py-12 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  About Us
                </h2>
                <div className="flex items-center justify-center mb-6">
                  <div className="h-1 w-16 bg-yellow-500 rounded"></div>
                  <Star className="mx-4 text-yellow-500" size={24} />
                  <div className="h-1 w-16 bg-yellow-500 rounded"></div>
                </div>
                <p className="text-lg  text-yellow-600 font-bold mb-4">
                  Focused on Your Growth. Driven by Your Trust.
                </p>
              </div>

              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch transform transition-all duration-1000 ${
                  isVisible.about
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {/* Left Content */}
                <div className="space-y-8 flex flex-col">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      Our Vision
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                      At BMA (Book My Assets), we are redefining real estate
                      investment by making it transparent, secure, and growth
                      driven. Specializing in AUDA approved projects in Dholera
                      Smart City, India’s first greenfield smart city, we offer
                      investors and brokers legally clear, registry ready plots
                      with assured appreciation.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                      With a strong focus on trust, timely delivery, and an
                      investor first approach, BMA bridges the gap between
                      opportunity and reliability.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 sm:p-8 border border-blue-200 flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
                      Our Mission
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-blue-800">
                          To make property buying hassle-free, transparent, and
                          legally secure.
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-blue-800">
                          To guide investors and channel partners with expert
                          insights and dedicated support.
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-blue-800">
                          To deliver long-term value through premium projects in
                          India’s fastest-growing smart cities
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="space-y-8 flex flex-col">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      Our Journey
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                      Over the years, we have helped thousands of investors
                      across India and overseas invest in the right places:
                      Gurugram, Delhi NCR, Noida, Dubai, Dholera, and more.
                    </p>
                    <p className="text-gray-700 leading-relaxed flex-1">
                      After doing a deep comparison of all our projects, our
                      research proved one thing clearly: Dholera offers better
                      growth, returns, and long-term potential than any other
                      location.
                    </p>
                    <p className="text-gray-700 leading-relaxed flex-1">
                      After doing a deep comparison of all our projects, our
                      research proved one thing clearly.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-yellow-200 flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-orange-900 mb-4">
                      Our Promise
                    </h3>
                    <p className="text-orange-800 leading-relaxed mb-4 flex-1">
                      We are Not Just in Real Estate. We are in the Business of
                      Growing People's Wealth, Dreams, and Trust.
                    </p>
                    <p className="text-orange-800 leading-relaxed flex-1">
                      Everything we do is built around one core belief:{" "}
                      <strong>"You" come first.</strong> We are here to guide
                      you, protect your money, simplify your journey, and give
                      you investment opportunities that truly change your life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BMA Group Companies Section */}
        <div ref={companiesRef} className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                BMA Group of Companies
              </h2>
              <div className="flex items-center justify-center mb-6">
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
                <Star className="mx-4 text-yellow-500" size={24} />
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
              </div>
              <p className="text-xl text-black max-w-5xl mx-auto">
                Four strong arms, each one created to serve you better, faster,
                and smarter in your real estate investment journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className={`group transform transition-all duration-700 hover:scale-105 ${
                    isVisible.companies
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="bg-gray-900 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:border-yellow-500 transition-all duration-500 h-full">
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}
                      >
                        <company.icon size={28} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {company.name}
                        </h3>
                        <p className="text-yellow-500 font-medium">
                          {company.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      {company.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {company.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle
                            className="text-green-400 flex-shrink-0"
                            size={16}
                          />
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones Section - Glassmorphism Design */}
        <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Milestones
              </h2>
              <div className="flex items-center justify-center">
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
                <Star className="mx-4 text-yellow-500" size={24} />
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon size={32} className="text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                        {item.count}+
                      </div>
                      <div className="text-lg lg:text-xl text-gray-600">
                        {item.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section - Cards with Hover Effects */}
        <div ref={featuresRef} className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Why Choose Us?
              </h2>
              <div className="flex items-center justify-center mb-6">
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
                <Star className="mx-4 text-yellow-500" size={24} />
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
              </div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                We go beyond just selling properties we create investment
                opportunities that build your future.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Exclusive Locations",
                  description:
                    "We focus solely on prime plots in Dholera, ensuring you get the best options in this futuristic city.",
                  color: "from-red-500 to-red-600",
                },
                {
                  icon: TrendingUp,
                  title: "Expert Market Insights",
                  description:
                    "Our team provides data driven insights to help you make informed investment decisions.",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: Shield,
                  title: "Legally Verified Properties",
                  description:
                    "We ensure all listings are legally compliant, minimizing risks and ensuring smooth transactions.",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: Target,
                  title: "Focused Investment Strategy",
                  description:
                    "We specialize in Dholera Smart City, giving you unmatched expertise in this emerging market.",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: Award,
                  title: "Industry Recognition",
                  description:
                    "Award winning real estate consultancy with a proven track record of successful investments.",
                  color: "from-yellow-500 to-yellow-600",
                },
                {
                  icon: Phone,
                  title: "Dedicated Support",
                  description:
                    "Personal relationship managers available 24/7 to assist you at every step of your investment journey.",
                  color: "from-indigo-500 to-indigo-600",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-500 hover:-translate-y-2 ${
                    isVisible.features
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-yellow-500 transition-all duration-300 h-full">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                    >
                      <feature.icon size={28} className="text-white" />
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
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
                <Star className="mx-4 text-yellow-500" size={24} />
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
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
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mx-auto flex items-center justify-center text-white text-4xl font-bold">
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
                            className="text-yellow-500 fill-yellow-500"
                            size={20}
                          />
                        )
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
                                ? "bg-yellow-500 w-6"
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

                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Schedule a Consultation</span>
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                    />
                </button>
                    </a>
                <a href="tel:+918130371647">

                <button className="border-2 border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-black px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
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
