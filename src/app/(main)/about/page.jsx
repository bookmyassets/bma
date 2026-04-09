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
  ArrowDown,
  Trophy,
  Rocket,
  Building2,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Import images
import img1 from "@/assests/about/charan-meeting.webp";
import img2 from "@/assests/about/full-house-meeting.webp";
import img3 from "@/assests/about/full-house.webp";
import img4 from "@/assests/about/meeting.webp";
import img5 from "@/assests/about/training-back.webp";
import img6 from "@/assests/about/training-front.webp";

// Lazy loaded YouTube embed
const LazyYouTubeEmbed = ({ videoId }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ paddingBottom: "56.25%" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-3 md:p-6 border border-white/20">
        <div className="h-full rounded-2xl overflow-hidden">
          {shouldLoad ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?si=4vAneOtfsagJs4cH`}
              title="YouTube Video"
              className="w-full h-full rounded-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center animate-pulse">
              <Play size={48} className="text-white opacity-50" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Animated counter
const AnimatedCounter = ({ target, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 50;
          const increment = target / steps;
          let currentStep = 0;

          const animate = () => {
            currentStep++;
            setCount(Math.min(Math.ceil(increment * currentStep), target));
            if (currentStep < steps) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
    >
      {count}
      {suffix}
    </div>
  );
};

export default function RealEstateLandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({
    features: false,
    testimonials: false,
    hero: false,
    about: false,
    companies: false,
  });

  const timelineRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const companiesRef = useRef(null);

  const slides = [img1, img2, img3, img4, img5, img6];

  const milestones = [
    {
      date: "13 Dec 2024",
      event: "Started with 5 people as Channel Partner",
      icon: Users,
      position: "top",
    },
    {
      date: "27 Dec 2024",
      event: "First Sale",
      icon: Trophy,
      position: "bottom",
    },
    {
      date: "10 Jan 2025",
      event: "1st Viral Reel - 400 queries/day",
      icon: TrendingUp,
      position: "top",
    },
    {
      date: "Feb & Mar 2025",
      event: "Consistent Sales",
      icon: Rocket,
      position: "bottom",
    },
    {
      date: "May 2025",
      event: "1st Project Launch: Westwyn County",
      icon: Building,
      position: "top",
    },
    {
      date: "Sep 2025",
      event: "2nd Project Launch: Westwyn Estate",
      icon: Building2,
      position: "bottom",
    },
    {
      date: "Nov 2025",
      event: "1st Event: Chandigarh - Record Breaking Sales",
      icon: PartyPopper,
      position: "top",
    },
    {
      date: "13 Dec 2025",
      event: "23+ members | Both Projects 50%+ Sold Out",
      icon: Award,
      position: "bottom",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Mohan Kumar",
      role: "Property Investor",
      comment:
        "BookMyAssets made my investment journey seamless. Their expert guidance helped me find the perfect plot in Dholera.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sanchit Mishra",
      role: "First-time Buyer",
      comment:
        "As a first-time investor, I was nervous, but the team at BookMyAssets walked me through the entire process with patience and expertise.",
      rating: 5,
    },
    {
      id: 3,
      name: "Janvi Goel",
      role: "Entrepreneur",
      comment:
        "The investment opportunities in Dholera through BookMyAssets have significantly boosted my portfolio. Highly recommended!",
      rating: 5,
    },
  ];

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
        "A global network that connects you with verified, high-quality developers in India and internationally.",
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
        "From construction to maintenance to hospitality support, we take care of it all.",
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
        "Our in house marketing and digital performance team that drives leads, creates brand visibility, and builds trust.",
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

  // Image carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Testimonial carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Intersection observers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === timelineRef.current) setTimelineVisible(true);
            if (entry.target === featuresRef.current)
              setIsVisible((prev) => ({ ...prev, features: true }));
            if (entry.target === testimonialsRef.current)
              setIsVisible((prev) => ({ ...prev, testimonials: true }));
            if (entry.target === aboutRef.current)
              setIsVisible((prev) => ({ ...prev, about: true }));
            if (entry.target === companiesRef.current)
              setIsVisible((prev) => ({ ...prev, companies: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "100px" },
    );

    [timelineRef, featuresRef, testimonialsRef, aboutRef, companiesRef].forEach(
      (ref) => {
        if (ref.current) observer.observe(ref.current);
      },
    );

    setIsVisible((prev) => ({ ...prev, hero: true }));

    return () => observer.disconnect();
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <title>
        About BookMyAssets | Trusted Real Estate Investment in Dholera
      </title>
      <meta
        name="description"
        content="Join BMA Group in Dholera Smart City for reliable real estate services. We provide legally verified plots and end-to-end investment support for smart growth."
      />
      <link rel="canonical" href="https://www.bookmyassets.com/about" />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative min-h-screen bg-gray-900 overflow-hidden">
          <div
            ref={heroRef}
            className="relative z-10 container mx-auto px-4 py-8"
          >
            {/* Mobile View */}
            <div className="lg:hidden flex flex-col min-h-screen justify-center space-y-8">
              <div
                className={`w-full text-white space-y-6 transition-all duration-700 ${isVisible.hero ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pt-4">
                    <div className="h-1 w-12 bg-yellow-500 rounded"></div>
                    <span className="text-yellow-500 font-medium tracking-wide text-sm">
                      BMA GROUP OF COMPANIES
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                    Year One: Just the Beginning
                  </h1>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Celebrating one year of turning raw belief into Dholera's
                    boldest success story
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleScrollDown}
                    className="group bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Scroll Down to View More</span>
                    <ArrowDown
                      className="group-hover:translate-x-1 transition-transform"
                      size={20}
                    />
                  </button>
                  <Link href="https://www.youtube.com/@BookMyAssets">
                    <span className="group bg-transparent border-2 border-white/30 hover:border-yellow-500 text-white hover:text-yellow-500 px-6 py-3 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-2">
                      <Play size={20} />
                      <span>Watch Video</span>
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`flex items-center justify-center transition-all duration-700 delay-300 ${isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <div className="w-full max-w-md px-4">
                  <LazyYouTubeEmbed videoId="b6WzvRbsU5I" />
                </div>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:flex lg:items-center lg:justify-center min-h-screen pt-8">
              <div className="grid grid-cols-2 gap-12 xl:gap-16 max-w-7xl w-full items-center">
                <div
                  className={`text-white space-y-6 xl:space-y-8 transition-all duration-700 ${isVisible.hero ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
                >
                  <div className="space-y-4 xl:space-y-6">
                    <div className="flex items-center space-x-2">
                      <div className="h-1 w-12 bg-yellow-500 rounded"></div>
                      <span className="text-yellow-500 font-medium tracking-wide text-sm xl:text-base">
                        BMA GROUP OF COMPANIES
                      </span>
                    </div>
                    <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                      Year One: Just the Beginning
                    </h1>
                    <p className="text-lg xl:text-xl text-gray-300 leading-relaxed">
                      Celebrating one year of turning raw belief into Dholera's
                      boldest success story
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleScrollDown}
                      className="group bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Scroll Down to View More</span>
                      <ArrowDown
                        className="group-hover:translate-x-1 transition-transform"
                        size={20}
                      />
                    </button>
                    <Link href="https://www.youtube.com/@BookMyAssets">
                      <span className="group bg-transparent border-2 border-white/30 hover:border-yellow-500 text-white hover:text-yellow-500 px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-2">
                        <Play size={20} />
                        <span>Watch Video</span>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className={`w-full max-w-4xl transition-all duration-700 delay-500 ${isVisible.hero ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
                  >
                    <LazyYouTubeEmbed videoId="b6WzvRbsU5I" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div
          ref={timelineRef}
          className="bg-gradient-to-b from-gray-50 to-white py-16 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={{ color: "#deae4c" }}
            >
              365 Days That Changed Everything
            </h2>

            {/* Desktop Timeline */}
            <div className="hidden md:block">
              <div className="relative max-w-6xl mx-auto py-16">
                <div className="absolute left-0 right-0 h-0.5 top-1/2 transform -translate-y-1/2 bg-gray-200"></div>
                {timelineVisible && (
                  <div
                    className="absolute left-0 h-0.5 top-1/2 transform -translate-y-1/2 transition-all duration-1000"
                    style={{ backgroundColor: "#deae4c", width: "100%" }}
                  ></div>
                )}
                <div className="flex justify-between items-center relative">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center group flex-1 max-w-[120px] ${milestone.position === "top" ? "flex-col-reverse" : ""}`}
                    >
                      <div className="w-0.5 h-12 bg-[#deae4c]"></div>
                      <div
                        className="relative w-14 h-14 rounded-full border-4 border-white flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg z-10"
                        style={{ backgroundColor: "#deae4c" }}
                      >
                        <milestone.icon
                          className="w-6 h-6 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div className="w-0.5 h-12 bg-[#deae4c]"></div>
                      <div
                        className="bg-white rounded-lg shadow-lg p-3 w-32 text-center border-2"
                        style={{ borderColor: "#deae4c" }}
                      >
                        <p
                          className="text-xs font-bold mb-1"
                          style={{ color: "#deae4c" }}
                        >
                          {milestone.date}
                        </p>
                        <p className="text-xs text-gray-700 font-semibold">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden overflow-x-auto pb-4">
              <div className="relative inline-flex gap-6 min-w-max py-8 px-4">
                <div className="absolute left-0 right-0 h-0.5 top-20 bg-[#deae4c]"></div>
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center group relative"
                  >
                    <div className="w-0.5 h-6 bg-[#deae4c]"></div>
                    <div className="relative w-12 h-12 rounded-full border-4 border-white flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg z-10 bg-[#deae4c]">
                      <milestone.icon
                        className="w-5 h-5 text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="w-0.5 h-6 bg-[#deae4c]"></div>
                    <div className="bg-white rounded-lg shadow-md p-2 w-28 text-center border-2 border-[#deae4c]">
                      <p className="text-xs font-bold mb-1 text-[#deae4c]">
                        {milestone.date}
                      </p>
                      <p className="text-xs text-gray-700 font-semibold leading-tight">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section with Image Slideshow */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-3/5 space-y-6 md:space-y-8">
              <section
                className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4"
                style={{ borderColor: "#deae4c" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ color: "#deae4c" }}
                >
                  The Beginning
                </h2>
                <div className="space-y-3 text-gray-800">
                  <p>
                    <span className="font-bold">On 13th December 2024,</span>{" "}
                    five people started with one small cabin. We had no fancy
                    office, no big investors, just raw hunger and an unshakable
                    belief that we could build something extraordinary in real
                    estate. Most people called it crazy. We called it destiny.
                  </p>
                  <p>
                    The odds were stacked against us, but we did not wait for
                    permission. Our first sale came just 14 days later. Then one
                    viral reel brought 400 queries per day. We did not just
                    handle it but we turned that momentum into our first
                    developer project, WestWyn County. While others were
                    planning, we were building.
                  </p>
                  <p>
                    <span className="font-bold">Today, 365 days later:</span> A
                    passionate team of 23, multiple thriving projects, and
                    families who trust us with their future.
                  </p>
                  <p>
                    Real estate is not just about land, it is about people too.
                  </p>
                  <p>
                    Year One was our audition. Year Two? That's where we prove
                    it was not luck. It was our hunger, heart, and hustle.
                  </p>
                  <p className="font-bold">
                    This is BookMyAssets. And we're just getting started.
                  </p>
                </div>
              </section>

              <section className="bg-white rounded-xl shadow-lg p-6">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "#deae4c" }}
                >
                  What we Believe
                </h2>
                <div className="space-y-4">
                  <div
                    className="border-l-4 pl-4"
                    style={{ borderColor: "#deae4c" }}
                  >
                    <h3 className="font-bold text-base md:text-lg mb-1">
                      People Over Everything
                    </h3>
                    <p className="text-gray-700 text-sm">
                      You can't scale dreams without the right people dreaming
                      with you.
                    </p>
                  </div>
                  <div
                    className="border-l-4 pl-4"
                    style={{ borderColor: "#deae4c" }}
                  >
                    <h3 className="font-bold text-base md:text-lg mb-1">
                      Trust Is Earned Daily
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Every call. Every promise. Every transparent deal.
                    </p>
                  </div>
                  <div
                    className="border-l-4 pl-4"
                    style={{ borderColor: "#deae4c" }}
                  >
                    <h3 className="font-bold text-base md:text-lg mb-1">
                      Speed Meets Wisdom
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Lightning-fast execution. Patient where it counts.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-black rounded-xl shadow-lg p-6 text-center">
                <h2
                  className="text-xl md:text-3xl font-bold mb-4"
                  style={{ color: "#deae4c" }}
                >
                  WE'RE JUST GETTING STARTED
                </h2>
                <p className="text-white text-base md:text-lg">
                  Building legacies, one family at a time.
                </p>
              </section>
            </div>

            {/* Image Slideshow - Desktop & Mobile */}
            <div className="w-full md:w-2/5 md:sticky md:top-24">
              <div
                className="relative rounded-xl overflow-hidden shadow-2xl mx-auto"
                style={{ height: "400px", maxWidth: "500px" }}
              >
                {slides.map((slide, index) => (
                  <Image
                    key={index}
                    src={slide}
                    alt={`Property ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
                    style={{ zIndex: currentSlide === index ? 1 : 0 }}
                    priority={index === 0}
                  />
                ))}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor:
                          currentSlide === index
                            ? "#deae4c"
                            : "rgba(255,255,255,0.5)",
                        width: currentSlide === index ? "8px" : "6px",
                      }}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div
          ref={aboutRef}
          className="py-16 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  About Us
                </h2>
                <div className="flex items-center justify-center mb-6">
                  <div className="h-1 w-16 bg-yellow-500 rounded"></div>
                  <Star className="mx-4 text-yellow-500" size={24} />
                  <div className="h-1 w-16 bg-yellow-500 rounded"></div>
                </div>
                <p className="text-lg text-yellow-600 font-bold">
                  Focused on Your Growth. Driven by Your Trust.
                </p>
              </div>

              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch transition-all duration-700 ${isVisible.about ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <div className="space-y-8">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      Our Vision
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      At BMA (Book My Assets), we are redefining real estate
                      investment by making it transparent, secure, and growth
                      driven. Specializing in AUDA approved projects in Dholera
                      Smart City, India's first greenfield smart city, we offer
                      investors and brokers legally clear, registry ready plots
                      with assured appreciation.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      With a strong focus on trust, timely delivery, and an
                      investor first approach, BMA bridges the gap between
                      opportunity and reliability.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 sm:p-8 border border-blue-200">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
                      Our Mission
                    </h3>
                    <div className="space-y-3">
                      {[
                        "To make property buying hassle-free, transparent, and legally secure.",
                        "To guide investors and channel partners with expert insights and dedicated support.",
                        "To deliver long-term value through premium projects in India's fastest-growing smart cities",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <CheckCircle
                            className="text-green-500 flex-shrink-0"
                            size={20}
                          />
                          <span className="text-blue-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      Our Journey
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Over the years, we have helped thousands of investors
                      across India and overseas invest in the right places:
                      Gurugram, Delhi NCR, Noida, Dubai, Dholera, and more.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      After doing a deep comparison of all our projects, our
                      research proved one thing clearly: Dholera offers better
                      growth, returns, and long-term potential than any other
                      location.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-yellow-200">
                    <h3 className="text-xl sm:text-2xl font-bold text-orange-900 mb-4">
                      Our Promise
                    </h3>
                    <p className="text-orange-800 leading-relaxed">
                      We are Not Just in Real Estate. We are in the Business of
                      Growing People's Wealth, Dreams, and Trust.
                    </p>
                    <p className="text-orange-800 leading-relaxed mt-4">
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

        {/* BMA Group Companies */}
        <div ref={companiesRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                BMA Group of Companies
              </h2>
              <div className="flex items-center justify-center mb-6">
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
                <Star className="mx-4 text-yellow-500" size={24} />
                <div className="h-1 w-16 bg-yellow-500 rounded"></div>
              </div>
              <p className="text-xl text-gray-700 max-w-5xl mx-auto">
                Four strong arms, each one created to serve you better, faster,
                and smarter in your real estate investment journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className={`group transform transition-all duration-500 hover:scale-105 ${isVisible.companies ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gray-900 rounded-3xl p-6 border border-white/20 hover:border-yellow-500 transition-all duration-300 h-full">
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
                        <p className="text-yellow-500 font-medium text-sm">
                          {company.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {company.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {company.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
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

        {/* Milestones Counter */}
        <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
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
                  target: 50,
                  label: "Partners",
                  icon: Users,
                  color: "from-blue-500 to-blue-600",
                },
                {
                  target: 1000,
                  label: "Premium Properties",
                  icon: Building,
                  color: "from-green-500 to-green-600",
                },
                {
                  target: 400,
                  label: "Happy Customers",
                  icon: Heart,
                  color: "from-purple-500 to-purple-600",
                },
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon size={32} className="text-white" />
                    </div>
                    <div className="text-center">
                      <AnimatedCounter target={item.target} />
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

        {/* Why Choose Us */}
        <div ref={featuresRef} className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className={`transform transition-all duration-500 hover:-translate-y-2 ${isVisible.features ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                  style={{ transitionDelay: `${index * 75}ms` }}
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-yellow-500 transition-all duration-300 h-full">
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

        {/* Testimonials */}
        <div
          ref={testimonialsRef}
          className="py-16 bg-gradient-to-br from-gray-50 to-gray-100"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
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
                className={`bg-white rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-500 ${isVisible.testimonials ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mx-auto flex items-center justify-center text-white text-4xl font-bold">
                      {testimonials[testimonialIndex].name.charAt(0)}
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
                        <p className="text-gray-500">
                          {testimonials[testimonialIndex].role}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setTestimonialIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${testimonialIndex === index ? "bg-yellow-500 w-6" : "bg-gray-300"}`}
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
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Invest in Your Future?
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Join hundreds of smart investors who are building wealth through
                strategic real estate investments in Dholera Smart City.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://wa.me/918130371647"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto">
                    <span>Schedule a Consultation</span>
                    <ArrowRight size={20} />
                  </button>
                </a>
                <a href="tel:+918130371647">
                  <button className="border-2 border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-black px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto">
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
}
