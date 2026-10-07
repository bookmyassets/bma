"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Star,
  Shield,
  Phone,
  ArrowRight,
  Building,
  Users,
  Heart,
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
import { FaWhatsapp } from "react-icons/fa6";

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

  const whyChooseFeatures = [
    {
      "title": "Dholera-Focused Developer",
      "description": "Focused real estate development and property support in and around Dholera."
    },
    {
      "title": "Plots and Bulk Land",
      "description": "Residential plot options and bulk land support for different requirements."
    },
    {
      "title": "Project and Legal Documents",
      "description": "Available project information and legal documents for buyer review."
    },
    {
      "title": "Transparent Process",
      "description": "Clear pricing, project information and a straightforward buying process."
    },
    {
      "title": "In-House Services",
      "description": "Construction and fabrication support coordinated within the BMA Group."
    },
    {
      "title": "Site Visit and Registry Support",
      "description": "Assistance with site visits, documentation and registry coordination."
    },
    {
      "title": "Property Support",
      "description": "Rental, resale and maintenance assistance after property purchase."
    },
    {
      "title": "Indian and NRI Buyers",
      "description": "Practical guidance for buyers based in India and overseas."
    },
    {
      "title": "Liveable, Future-Ready Development",
      "description": "A long-term focus on planned communities, habitation and buyer support."
    }
  ];

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

  const milestonesRef = useRef(null);

  useEffect(() => {
    const section = milestonesRef.current;
    if (!section) return;

    const finalCounts = {
      partners: 50,
      properties: 1000,
      customers: 400,
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let animationFrame;
    let hasStarted = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || hasStarted) {
          return;
        }

        hasStarted = true;
        observer.disconnect();

        if (motionQuery.matches) {
          setCounts(finalCounts);
          return;
        }

        const duration = 1800;
        let startTime;

        const animate = (timestamp) => {
          if (startTime === undefined) startTime = timestamp;

          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setCounts({
            partners: Math.round(finalCounts.partners * easedProgress),
            properties: Math.round(finalCounts.properties * easedProgress),
            customers: Math.round(finalCounts.customers * easedProgress),
          });

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(animate);
          }
        };

        animationFrame = window.requestAnimationFrame(animate);
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <title>
        About BookMyAssets | Trusted Real Estate Developer in Dholera
      </title>
      <meta
        name="description"
        content="BookMyAssets is a Dholera-focused real estate developer founded in 2024. Meet our founders, BMA Group companies, projects and end-to-end buyer support."
      />
      <link rel="canonical" href="https://www.bookmyassets.com/about" />
      <div className="bg-white pt-[72px] lg:pt-[86px]">
        <div className="">
          <BookMyAssets />
        </div>

                {/* CTA Banner */}
        <section
          aria-labelledby="bma-cta-heading"
          className="bg-white px-5 py-10 sm:px-8 md:py-14 lg:px-10"
        >
          <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[24px] border border-[#ddbc69]/20 bg-gradient-to-br from-[#111d35] via-[#17394b] to-[#14534f] px-6 py-9 shadow-[0_18px_45px_rgba(17,40,53,0.18)] sm:px-9 md:py-12 lg:px-12">
            {/* Decorative lighting */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#6bc9b0]/10 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#ddbc69]/10 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ddbc69]/70 to-transparent"
            />

            <div className="relative grid items-center gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
              {/* Content */}
              <div>
                <h2
                  id="bma-cta-heading"
                  className="max-w-xl font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.035em] text-[#f5f1e8] md:text-[40px]"
                >
                  Ready to Invest in
                  <span className="block text-[#ddbc69]">Your Future?</span>
                </h2>

                <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-[#c4d1d6] md:text-[18px]">
                  Join hundreds of smart investors who are building wealth
                  through strategic real estate investments in Dholera Smart
                  City.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <a
                  href="https://wa.me/918130371647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-center justify-center gap-3 rounded-[14px] border border-[#ddbc69] bg-[#ddbc69] px-5 py-3.5 text-[15px] font-semibold text-[#172122] shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-colors hover:border-[#ecd18b] hover:bg-[#ecd18b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69] motion-reduce:transition-none md:text-[18px]"
                >
                  <FaWhatsapp
                    size={23}
                    aria-hidden="true"
                    className="shrink-0"
                  />

                  <span>Schedule a Consultation</span>

                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </a>

                <a
                  href="tel:+918130371647"
                  className="flex min-h-14 items-center justify-center gap-3 rounded-[14px] border border-white/30 bg-white/[0.04] px-5 py-3.5 text-[15px] font-medium text-[#f5f1e8] transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69] motion-reduce:transition-none md:text-[18px]"
                >
                  <Phone
                    size={20}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className="shrink-0 text-[#ddbc69]"
                  />

                  <span>Call Us Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Anniversary video banner */}
        <section
          aria-labelledby="bma-film-banner-heading"
          className="relative overflow-hidden bg-gray-900 px-5 py-10 text-white sm:px-8 sm:py-14 lg:px-10 lg:py-16"
        >
          <div ref={heroRef} className="relative z-10 mx-auto max-w-7xl">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div
                className={`space-y-5 transition-all duration-1000 lg:space-y-6 ${
                  isVisible.hero
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-[#ddbc69]">
                  <span aria-hidden="true" className="h-1 w-12 rounded bg-[#ddbc69]" />
                  BMA Group of Companies
                </p>

                <h2
                  id="bma-film-banner-heading"
                  className="text-3xl font-bold leading-tight sm:text-4xl"
                >
                  Year One: Just the Beginning
                </h2>

                <p className="max-w-xl text-lg leading-relaxed text-gray-300">
                  Celebrating one year of turning raw belief into Dholera&apos;s
                  boldest success story.
                </p>
              </div>

              <div
                className={`transition-all delay-300 duration-1000 ${
                  isVisible.hero
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                <div className="relative isolate rounded-2xl p-[2px]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1 rounded-[18px] bg-gradient-to-r from-[#8c6721] via-[#f0d996] to-[#8c6721] opacity-75 blur-[2px] motion-safe:animate-pulse motion-reduce:animate-none"
                  />

                  <div className="relative aspect-video overflow-hidden rounded-[14px] border border-[#ddbc69]/75 bg-black shadow-2xl">
                  <iframe
                    id="bma-journey-video-banner"
                    src="https://www.youtube.com/embed/b6WzvRbsU5I?si=4vAneOtfsagJs4cH"
                    title="BookMyAssets — Our First Year"
                    className="absolute inset-0 h-full w-full border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#ddbc69]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {false && (
          <section
          aria-labelledby="bma-film-heading"
          className="overflow-hidden bg-[#0c0c0b] px-6 py-14 sm:px-10 sm:py-20"
        >
          <div className="bma-film-scene mx-auto w-full max-w-[600px]">
            <div className="bma-film-shadow" aria-hidden="true" />

            <article className="bma-film-card">
              {/* Slim card header */}
              <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
                <div>
                  <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.18em] text-[#ddbc69] sm:text-[9px]">
                    The BookMyAssets Film
                  </p>

                  <h2
                    id="bma-film-heading"
                    className="font-playfair-display text-[17px] font-normal leading-tight text-[#f4eee2] sm:text-[21px]"
                  >
                    Year One. Just the Beginning.
                  </h2>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 rounded-full border border-[#ddbc69]/30 px-2.5 py-1 text-[9px] tracking-wider text-[#ddbc69]"
                >
                  YEAR 01
                </span>
              </header>

              {/* Video */}
              <div className="px-2 pb-2 sm:px-2.5 sm:pb-2.5">
                <div className="relative aspect-video overflow-hidden rounded-[12px] bg-black sm:rounded-[15px]">
                  <iframe
                    id="bma-journey-video"
                    src="https://www.youtube.com/embed/b6WzvRbsU5I?rel=0"
                    title="BookMyAssets — Our First Year"
                    className="absolute inset-0 h-full w-full border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#ddbc69]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </article>
          </div>

          <style jsx>{`
            .bma-film-scene {
              position: relative;
              perspective: 1200px;
              perspective-origin: 50% 40%;
            }

            .bma-film-shadow {
              position: absolute;
              bottom: -23px;
              left: 10%;
              width: 80%;
              height: 35px;
              border-radius: 50%;
              background: rgba(0, 0, 0, 0.75);
              filter: blur(18px);
              pointer-events: none;
            }

            .bma-film-card {
              position: relative;
              overflow: hidden;
              border: 1px solid rgba(221, 188, 105, 0.4);
              border-radius: 22px;
              background: linear-gradient(
                135deg,
                #24334e 0%,
                #15233b 45%,
                #0e1729 100%
              );

              transform: rotateX(8deg) rotateY(-7deg) rotateZ(-1deg);
              transform-origin: center;

              box-shadow:
                2px 3px 0 #283750,
                4px 6px 0 #0b1220,
                0 28px 55px rgba(0, 0, 0, 0.55),
                inset 0 1px 0 rgba(255, 255, 255, 0.15);

              transition:
                transform 650ms ease,
                border-color 650ms ease,
                box-shadow 650ms ease;
            }

            /* Upper-edge reflection */
            .bma-film-card::before {
              content: "";
              position: absolute;
              top: 0;
              left: 10%;
              right: 10%;
              height: 1px;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.65),
                transparent
              );
              pointer-events: none;
            }

            /* Steady, face-on player for keyboard interaction */
            .bma-film-scene:focus-within .bma-film-card {
              transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
              border-color: rgba(221, 188, 105, 0.7);
            }

            @media (hover: hover) and (pointer: fine) {
              .bma-film-scene:hover .bma-film-card {
                transform: translateY(-5px) rotateX(0deg) rotateY(0deg)
                  rotateZ(0deg);
                border-color: rgba(221, 188, 105, 0.7);
                box-shadow:
                  1px 2px 0 #283750,
                  2px 4px 0 #0b1220,
                  0 34px 65px rgba(0, 0, 0, 0.6),
                  inset 0 1px 0 rgba(255, 255, 255, 0.15);
              }
            }

            @media (max-width: 639px) {
              .bma-film-card {
                border-radius: 18px;
                transform: rotateX(5deg) rotateY(-3deg);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .bma-film-card {
                transform: none;
                transition: none;
              }

              .bma-film-scene:hover .bma-film-card,
              .bma-film-scene:focus-within .bma-film-card {
                transform: none;
              }
            }
          `}</style>
          </section>
        )}

        {/* About Us Section */}
        <section
          ref={aboutRef}
          aria-labelledby="bma-about-heading"
          className="bg-white px-5 py-12 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
        >
          <div className="mx-auto max-w-6xl">
            {/* Section heading */}
            <header className="mb-8 text-center sm:mb-10">
              <h2
                id="bma-about-heading"
                className="font-playfair-display text-[38px] font-normal leading-tight tracking-[-0.035em] text-gray-900 sm:text-[46px] lg:text-[54px]"
              >
                About Us
              </h2>

              <div
                aria-hidden="true"
                className="mt-5 flex items-center justify-center gap-3"
              >
                <span className="h-px w-12 bg-[#ddbc69] sm:w-16" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#ddbc69]" />
                <span className="h-px w-12 bg-[#ddbc69] sm:w-16" />
              </div>
            </header>

            <div>
              {/* Company introduction */}
              <article className="grid gap-5 border-b border-gray-200 pb-9 sm:pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
                <div>
                  <h3 className="font-playfair-display text-[28px] font-normal leading-tight tracking-[-0.025em] text-gray-900 sm:text-[34px]">
                    BookMyAssets
                  </h3>

                  <div
                    aria-hidden="true"
                    className="mt-4 h-0.5 w-12 bg-[#ddbc69]"
                  />
                </div>

                <div className="space-y-4 text-[15px] leading-[1.85] text-gray-600 sm:text-base">
                  <p>
                    BookMyAssets started its journey in December 2024. We began
                    developing our own residential plotted projects in and
                    around Dholera.
                  </p>

                  <p>
                    Our projects include WestWyn County, WestWyn Estates and
                    WestWyn Residency.
                  </p>

                  <p>
                    We focus on practical, liveable and future-ready
                    development. Our aim is to support organised habitation as
                    Dholera grows.
                  </p>
                </div>
              </article>

              {/* Mission and Vision */}
              <div className="grid grid-cols-1 gap-9 py-9 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:gap-0">
                <article className="min-w-0 lg:pr-10 xl:pr-14">
                  <h3 className="font-playfair-display text-[27px] font-normal tracking-[-0.025em] text-gray-900 sm:text-[32px]">
                    Our Mission
                  </h3>

                  <p className="mb-6 mt-4 text-[15px] leading-[1.85] text-gray-600 sm:text-base">
                    Our mission is to make property investment in Dholera
                    simple, clear and transparent. We focus on:
                  </p>

                  <ul className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
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
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-[1.7] text-gray-700"
                      >
                        <CheckCircle
                          size={17}
                          strokeWidth={1.6}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-[#9a772e]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="min-w-0 border-t border-gray-200 pt-9 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:pl-14">
                  <h3 className="font-playfair-display text-[27px] font-normal tracking-[-0.025em] text-gray-900 sm:text-[32px]">
                    Our Vision
                  </h3>

                  <p className="mb-6 mt-4 text-[15px] leading-[1.85] text-gray-600 sm:text-base">
                    Our vision is to create planned and liveable residential
                    communities in Dholera. We aim to:
                  </p>

                  <ul className="space-y-4">
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
                        className="flex items-start gap-2.5 text-sm leading-[1.7] text-gray-700"
                      >
                        <CheckCircle
                          size={17}
                          strokeWidth={1.6}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-[#9a772e]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>

              {/* Property support */}
              <article className="grid gap-6 border-t border-gray-200 py-9 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                  <h3 className="max-w-md font-playfair-display text-[27px] font-normal leading-[1.2] tracking-[-0.025em] text-gray-900 sm:text-[32px]">
                    Trusted Real Estate Developer in Dholera
                  </h3>

                  <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-gray-600 sm:text-base">
                    BookMyAssets provides complete property support through:
                  </p>
                </div>

                <ul className="grid content-start gap-x-6 gap-y-4 sm:grid-cols-2">
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
                      className="flex items-start gap-2.5 text-sm leading-[1.7] text-gray-700"
                    >
                      <CheckCircle
                        size={17}
                        strokeWidth={1.6}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-[#9a772e]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Living standards */}
              <article className="grid gap-6 border-t border-[#ddbc69]/60 pt-9 sm:pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                  <h3 className="max-w-md font-playfair-display text-[27px] font-normal leading-[1.2] tracking-[-0.025em] text-gray-900 sm:text-[32px]">
                    Setting a New Standard for Living in Dholera
                  </h3>

                  <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-gray-600 sm:text-base">
                    BookMyAssets is not focused on selling empty plots alone. We
                    aim to create places where people can build homes, live
                    comfortably and generate future rental opportunities.
                  </p>
                </div>

                <div>
                  <p className="mb-5 text-[15px] font-semibold leading-relaxed text-gray-900">
                    We are working to set a new standard for:
                  </p>

                  <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
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
                        className="flex items-start gap-2.5 text-sm leading-[1.7] text-gray-700"
                      >
                        <CheckCircle
                          size={17}
                          strokeWidth={1.6}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-[#9a772e]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* BMA Group Companies Section */}
        <section
          ref={companiesRef}
          aria-labelledby="bma-companies-heading"
          className="relative overflow-hidden bg-[#0d0d0d] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(221,188,105,0.05),transparent_60%)]"
          />

          <div className="relative mx-auto max-w-6xl">
            {/* Section introduction */}
            <header className="mx-auto mb-10 max-w-4xl text-center sm:mb-14">
              <h2
                id="bma-companies-heading"
                className="font-playfair-display text-[36px] font-normal leading-[1.12] tracking-[-0.035em] text-[#ddbc69] sm:text-[46px] lg:text-[54px]"
              >
                BMA Group of Companies
              </h2>

              <div
                aria-hidden="true"
                className="my-6 flex items-center justify-center gap-3"
              >
                <span className="h-px w-12 bg-[#ddbc69]/60 sm:w-16" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#ddbc69]" />
                <span className="h-px w-12 bg-[#ddbc69]/60 sm:w-16" />
              </div>

              <p className="lg:text-[18px] leading-[1.15] text-white sm:text-[15px]">
                BookMyAssets is more than a real estate developer in Dholera.
                Through the BMA Group of Companies, we provide support for land
                purchase, project development, villa construction, fabrication,
                property management, hospitality and marketing.
              </p>
            </header>

            {/* Company cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
              {companies.map((company, index) => {
                const Icon = company.icon;

                const themes = [
                  {
                    icon: "text-[#99c6ff]",
                    gradient: "from-[#294a77] to-[#17263f]",
                    border: "border-[#80b5ff]/25",
                    glow: "bg-[#6ca9ff]/15",
                    dot: "bg-[#99c6ff]",
                  },
                  {
                    icon: "text-[#9be0bf]",
                    gradient: "from-[#245941] to-[#152e24]",
                    border: "border-[#8cdbb2]/25",
                    glow: "bg-[#75d3a5]/15",
                    dot: "bg-[#9be0bf]",
                  },
                  {
                    icon: "text-[#c5cfe0]",
                    gradient: "from-[#46536b] to-[#242b39]",
                    border: "border-[#bac9e0]/25",
                    glow: "bg-[#b0c1df]/15",
                    dot: "bg-[#c5cfe0]",
                  },
                  {
                    icon: "text-[#cbb0f8]",
                    gradient: "from-[#503776] to-[#2b203e]",
                    border: "border-[#c4a2f5]/25",
                    glow: "bg-[#b28bea]/15",
                    dot: "bg-[#cbb0f8]",
                  },
                  {
                    icon: "text-[#f5bf91]",
                    gradient: "from-[#754629] to-[#38271c]",
                    border: "border-[#f2b582]/25",
                    glow: "bg-[#edaa70]/15",
                    dot: "bg-[#f5bf91]",
                  },
                ];

                const theme = themes[index % themes.length];
                const isWide =
                  companies.length % 2 !== 0 && index === companies.length - 1;

                return (
                  <article
                    key={company.name}
                    aria-labelledby={`bma-company-${index}`}
                    className={`group relative min-w-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#151514] p-6 transition-colors duration-300 hover:border-[#ddbc69]/35 hover:bg-[#191918] motion-reduce:transition-none sm:p-8 ${
                      isWide ? "md:col-span-2" : ""
                    }`}
                  >
                    {/* Subtle accent in the corner */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${theme.glow}`}
                    />

                    <div
                      className={
                        isWide
                          ? "relative lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
                          : "relative"
                      }
                    >
                      {/* Company identity */}
                      <div>
                        <div className="mb-6 flex items-center justify-between">
                          {/* Colored icon tile */}
                          <div
                            className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] border bg-gradient-to-br shadow-[0_8px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-16 sm:w-16 ${theme.gradient} ${theme.border} ${theme.icon}`}
                          >
                            <Icon
                              size={29}
                              strokeWidth={1.6}
                              aria-hidden="true"
                            />

                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            />
                          </div>
                        </div>

                        <h3
                          id={`bma-company-${index}`}
                          className="text-[22px] font-medium leading-[1.3] tracking-[-0.025em] text-[#f4eee2] sm:text-[25px]"
                        >
                          {company.name}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-relaxed tracking-wide text-[#ddbc69] sm:text-sm">
                          {company.subtitle}
                        </p>

                        <p className="mt-5 lg:text-[18px] text-white sm:text-[14px]">
                          {company.description}
                        </p>
                      </div>

                      {/* Services */}
                      <div
                        className={
                          isWide
                            ? "mt-6 border-t border-white/10 pt-6 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1"
                            : "mt-6 border-t border-white/10 pt-6"
                        }
                      >
                        <ul className="grid gap-x-5 gap-y-3.5 sm:grid-cols-2">
                          {company.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2.5 lg:text-[18px] leading-[1.15] text-[#c9c7bf] sm:text-[10px]"
                            >
                              <span
                                aria-hidden="true"
                                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${theme.dot}`}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {false && (
          <section
          ref={milestonesRef}
          aria-labelledby="bma-milestones-heading"
          className="relative isolate overflow-hidden bg-[#ddbc69] px-5 py-7 sm:px-8 md:py-9 lg:px-10"
        >
          {/* Background details */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.25),transparent_65%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-black/[0.06]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full border border-black/[0.06]"
          />

          <div className="relative mx-auto max-w-6xl">
            {/* Heading */}
            <header className="mb-5 md:mb-7">
              <h2
                id="bma-milestones-heading"
                className="font-playfair-display text-[20px] font-normal leading-tight tracking-[-0.035em] text-[#211b10] md:text-[30px]"
              >
                Our Milestones
              </h2>
            </header>

            {/* Metric cards */}
            <div className="grid gap-3 md:grid-cols-3 md:gap-5">
              {[
                {
                  count: counts.partners,
                  finalCount: 50,
                  label: "Partners",
                  icon: Users,
                  iconColor: "text-[#3568a8]",
                  iconSurface: "bg-[#3568a8]/10",
                  accent: "bg-[#3568a8]",
                },
                {
                  count: counts.properties,
                  finalCount: 1000,
                  label: "Premium Properties",
                  icon: Building,
                  iconColor: "text-[#287759]",
                  iconSurface: "bg-[#287759]/10",
                  accent: "bg-[#287759]",
                },
                {
                  count: counts.customers,
                  finalCount: 400,
                  label: "Happy Customers",
                  icon: Heart,
                  iconColor: "text-[#ad5265]",
                  iconSurface: "bg-[#ad5265]/10",
                  accent: "bg-[#ad5265]",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className={`group relative min-w-0 overflow-hidden rounded-[16px] border border-white/70 bg-[#fffdf7] p-4 shadow-[0_8px_20px_rgba(87,64,17,0.12)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(87,64,17,0.2)] motion-reduce:transition-none md:p-5 ${
                      index === 1 ? "md:-translate-y-2" : ""
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full ${item.iconSurface}`}
                    />

                    <span className="sr-only">
                      {item.finalCount.toLocaleString("en-IN")}+ {item.label}
                    </span>

                    {/* Compact horizontal layout on mobile */}
                    <div className="relative flex items-center gap-4 md:block">
                      <Icon
                        size={26}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className={`shrink-0 ${item.iconColor}`}
                      />

                      <div aria-hidden="true" className="md:mt-4">
                        <p className="flex items-start gap-1 font-sans text-[20px] font-semibold leading-none tracking-[-0.04em] text-[#24221c] tabular-nums md:text-[30px]">
                          {item.count.toLocaleString("en-IN")}

                          <span className="text-[14px] font-normal tracking-normal text-[#a18543] md:text-[18px]">
                            +
                          </span>
                        </p>

                        <p className="mt-1.5 font-sans text-[14px] font-medium leading-snug text-[#696355] md:mt-2 md:text-[18px]">
                          {item.label}
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-3 h-px bg-[#24221c]/10 md:mt-4">
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-10 ${item.accent}`}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          </section>
        )}

        {/* Why Choose Us Section */}
        <section
          ref={featuresRef}
          aria-labelledby="bma-why-choose-heading"
          className="relative overflow-hidden bg-[#10100e] px-5 py-12 text-white sm:px-8 lg:px-10 lg:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(221,188,105,0.07),transparent_65%)]"
          />

          <div className="relative mx-auto max-w-7xl">
            <header className="grid gap-5 border-b border-[#ddbc69]/20 pb-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-12 lg:pb-10">
              <div>
                <h2
                  id="bma-why-choose-heading"
                  className="max-w-xl font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.035em] text-[#ddbc69] lg:text-[40px]"
                >
                  Why Choose BookMyAssets?
                </h2>
              </div>
            </header>

            <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:mt-10 xl:grid-cols-3 xl:gap-x-12 xl:gap-y-10">
              {whyChooseFeatures.map((feature) => (
                <li key={feature.title} className="flex min-w-0 items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#ddbc69]"
                  />
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-medium leading-[1.4] tracking-[-0.02em] text-[#ddbc69] lg:text-[23px]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-[1.75] text-white lg:text-[20px]">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          ref={testimonialsRef}
          aria-labelledby="bma-testimonials-heading"
          className="overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 px-5 py-12 sm:px-8 md:py-16 lg:px-10"
        >
          <div className="mx-auto max-w-6xl">
            {/* Section heading */}
            <header className="mx-auto mb-9 max-w-3xl text-center md:mb-12">
              <h2
                id="bma-testimonials-heading"
                className="font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.035em] text-gray-900 md:text-[40px]"
              >
                What Our Clients Say
              </h2>

              <div
                aria-hidden="true"
                className="my-5 flex items-center justify-center gap-3"
              >
                <span className="h-px w-12 bg-[#ddbc69]" />
                <Star
                  size={17}
                  strokeWidth={1.5}
                  className="fill-[#ddbc69]/20 text-[#a18037]"
                />
                <span className="h-px w-12 bg-[#ddbc69]" />
              </div>
            </header>

            {/* Layered testimonial card */}
            <div className="relative mx-auto max-w-4xl">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-y-2 scale-x-[0.96] rounded-[24px] border border-[#ddbc69]/30 bg-[#eee8db] md:translate-y-3"
              />

              <article
                aria-label={`Testimonial from ${testimonials[testimonialIndex].name}`}
                className="relative overflow-hidden rounded-[24px] border border-[#ddbc69]/25 bg-white shadow-[0_16px_45px_rgba(31,35,40,0.08)]"
              >
                {/* Fine gold highlight */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#ddbc69] to-transparent"
                />

                <div className="grid md:grid-cols-[220px_1fr]">
                  {/* Client portrait */}
                  <div className="relative flex items-center gap-4 border-b border-gray-100 bg-gradient-to-br from-[#f7f4ec] to-white p-5 sm:p-6 md:flex-col md:justify-center md:border-b-0 md:border-r md:px-6 md:py-9">
                    <div className="relative h-20 w-20 shrink-0 rounded-full border border-[#ddbc69]/50 bg-white p-1.5 shadow-[0_8px_24px_rgba(92,73,29,0.08)] md:h-32 md:w-32 md:p-2">
                      <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-100">
                        <Image
                          src={testimonials[testimonialIndex].image}
                          alt={testimonials[testimonialIndex].name}
                          fill
                          sizes="(max-width: 767px) 80px, 128px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="min-w-0 md:text-center">
                      <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-gray-900 md:text-[20px]">
                        {testimonials[testimonialIndex].name}
                      </h3>

                      <p className="mt-1 text-[15px] leading-relaxed text-gray-600 md:mt-2 md:text-[18px]">
                        {testimonials[testimonialIndex].role}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative flex min-w-0 flex-col p-5 sm:p-6 md:p-9">
                    <div className="mb-5 flex items-center justify-between">
                      <div
                        role="img"
                        aria-label={`${testimonials[testimonialIndex].rating} out of 5 stars`}
                        className="flex gap-1"
                      >
                        {Array.from({
                          length: testimonials[testimonialIndex].rating,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            size={17}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="fill-[#ddbc69] text-[#a18037]"
                          />
                        ))}
                      </div>

                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-9 w-9 text-[#ddbc69]/40 md:h-11 md:w-11"
                      >
                        <path d="M10 4H4v8h4c0 3-1 5-4 7l1 2c4-2 6-5 6-9V4h-1Zm10 0h-6v8h4c0 3-1 5-4 7l1 2c4-2 6-5 6-9V4h-1Z" />
                      </svg>
                    </div>

                    <blockquote className="flex-1">
                      <p className="text-[15px] leading-[1.85] text-gray-700 md:text-[18px]">
                        &ldquo;{testimonials[testimonialIndex].comment}&rdquo;
                      </p>
                    </blockquote>

                    {/* Carousel navigation */}
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-gray-100 pt-3 md:mt-8">
                      <span
                        aria-hidden="true"
                        className="text-xs tracking-wider text-gray-400 tabular-nums"
                      >
                        {String(testimonialIndex + 1).padStart(2, "0")}
                        <span className="mx-2 text-gray-300">/</span>
                        {String(testimonials.length).padStart(2, "0")}
                      </span>

                      <div
                        role="group"
                        aria-label="Choose a testimonial"
                        className="flex gap-1"
                      >
                        {testimonials.map((testimonial, index) => (
                          <button
                            key={testimonial.id}
                            type="button"
                            aria-label={`Show testimonial from ${testimonial.name}`}
                            aria-current={
                              testimonialIndex === index ? "true" : undefined
                            }
                            onClick={() => setTestimonialIndex(index)}
                            className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a18037]"
                          >
                            <span
                              aria-hidden="true"
                              className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                                testimonialIndex === index
                                  ? "w-7 bg-[#a18037]"
                                  : "w-2 bg-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default RealEstateLandingPage;
