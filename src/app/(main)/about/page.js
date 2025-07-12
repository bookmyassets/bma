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
} from "lucide-react";

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
  });

  const featuresRef = useRef(null);
  const propertiesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const heroRef = useRef(null);

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
    },
    {
      id: 2,
      name: "Jatin Saini",
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
    <div className="bg-white">
      {/* Hero Section - Modern Gradient Design */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
        </div>

        <div
    ref={heroRef}
    className="relative z-10 container mx-auto px-4 py-20"
  >
    {/* Mobile View - Stacked (Text first then Video) */}
    <div className="lg:hidden flex flex-col min-h-screen pt-20 pb-10">
      {/* Text Content */}
      <div
        className={`w-full text-white space-y-8 transform transition-all duration-1000 ${
          isVisible.hero ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="space-y-6 px-4">
          <div className="flex items-center space-x-2">
            <div className="h-1 w-12 bg-yellow-500 rounded"></div>
            <span className="text-yellow-500 font-medium tracking-wide">
              BOOKMYASSETS
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Invest in{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Tomorrow's
            </span>{' '}
            Smart City
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Discover premium, legally verified plots in Dholera Smart
            City. We don't just offer land—we offer a vision of the
            future.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mx-4">
          <h3 className="text-xl font-bold text-yellow-500 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-200 leading-relaxed">
            Empower investors by connecting them with high-appreciation
            real estate opportunities in Dholera, ensuring maximum returns
            and long-term value.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 pt-4 px-4">
          <button className="group bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
            <span>Explore Properties</span>
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </button>
          <button className="group bg-transparent border-2 border-white/30 hover:border-yellow-500 text-white hover:text-yellow-500 px-6 py-3 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-2">
            <Play size={20} />
            <span>Watch Video</span>
          </button>
        </div>
      </div>

      {/* Video */}
      <div
        className={`flex-1 flex items-center justify-center p-4 transform transition-all duration-1000 delay-300 ${
          isVisible.hero
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="w-full max-w-sm" style={{ aspectRatio: "9/16" }}>
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/20 h-full flex flex-col justify-center">
              <div className="flex-1 rounded-2xl overflow-hidden">
                <iframe
                 src="https://www.youtube.com/embed/NzvDr2GyL9Y?si=YpXIPEx8AsODmara?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0"
                  title="YouTube Shorts Video"
                  className="w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    {/* Desktop View - Side by Side */}
    <div className="hidden lg:flex flex-row space-x-16 items-center min-h-screen">
      {/* Left Content */}
      <div
        className={`w-full lg:w-1/2 text-white space-y-8 transform transition-all duration-1000 px-6 lg:px-12 ${
          isVisible.hero ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="h-1 w-12 bg-yellow-500 rounded"></div>
            <span className="text-yellow-500 font-medium tracking-wide">
              BOOKMYASSETS
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Invest in <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Tomorrow's
            </span>
            <br />
            Smart City
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed">
            Discover premium, legally verified plots in Dholera Smart
            City. We don't just offer land—we offer a vision of the
            future.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-200 leading-relaxed">
            Empower investors by connecting them with high-appreciation
            real estate opportunities in Dholera, ensuring maximum returns
            and long-term value.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="group bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
            <span>Explore Properties</span>
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </button>
          <button className="group bg-transparent border-2 border-white/30 hover:border-yellow-500 text-white hover:text-yellow-500 px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-2">
            <Play size={20} />
            <span>Watch Video</span>
          </button>
        </div>
      </div>

      {/* Right Content - YouTube Shorts Video */}
      <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-6">
        <div
          className={`w-full max-w-md transform transition-all duration-1000 delay-500 ${
            isVisible.hero
              ? "translate-x-0 opacity-100"
              : "translate-x-20 opacity-0"
          }`}
          style={{ aspectRatio: "9/16" }}
        >
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/20 h-full flex flex-col justify-center">
              <div className="flex-1 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/NzvDr2GyL9Y?si=YpXIPEx8AsODmara?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0"
                  title="YouTube Shorts Video"
                  className="w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

      {/* Milestones Section - Glassmorphism Design */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
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
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {item.count}+
                    </div>
                    <div className="text-xl text-gray-600">{item.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section - Cards with Hover Effects */}
      <div ref={featuresRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Why Choose Us?
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="h-1 w-16 bg-yellow-500 rounded"></div>
              <Star className="mx-4 text-yellow-500" size={24} />
              <div className="h-1 w-16 bg-yellow-500 rounded"></div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We go beyond just selling properties – we create investment
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
                  "Our team provides data-driven insights to help you make informed investment decisions.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Shield,
                title: "Legally Verified Properties",
                description:
                  "We ensure all listings are legally compliant, minimizing risks and ensuring smooth transactions.",
                color: "from-blue-500 to-blue-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 hover:scale-105 ${
                  isVisible.features
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 hover:border-yellow-500 transition-all duration-500">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <feature.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section - Modern Slider */}
      <div
        ref={testimonialsRef}
        className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center">
              <div className="h-1 w-16 bg-yellow-500 rounded"></div>
              <Star className="mx-4 text-yellow-500" size={24} />
              <div className="h-1 w-16 bg-yellow-500 rounded"></div>
            </div>
          </div>

          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full -translate-y-16 translate-x-16"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className="text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-2xl text-gray-700 text-center mb-8 italic font-medium leading-relaxed">
                  "{testimonials[testimonialIndex].comment}"
                </blockquote>

                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900">
                    {testimonials[testimonialIndex].name}
                  </h4>
                  <p className="text-yellow-600 font-medium">
                    {testimonials[testimonialIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === testimonialIndex
                      ? "bg-yellow-500 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Invest in Your Future?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join hundreds of satisfied investors who chose BookMyAssets for
              their real estate journey. Your dream property in Dholera Smart
              City awaits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateLandingPage;