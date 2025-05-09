"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import img from "@/assests/about.webp";
import Link from "next/link";
import {
  MapPin,
  Star,
  Shield,
  TrendingUp,
  Phone,
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
  });

  const featuresRef = useRef(null);
  const propertiesRef = useRef(null);
  const testimonialsRef = useRef(null);

  const targets = {
    partners: 50,
    properties: 1000,
    customers: 400,
  };

  // Sample properties data
  const properties = [
    {
      id: 1,
      title: "Premium Villa Plot",
      location: "North Dholera",
      price: "₹45L",
      area: "1200 sq.ft",
      image: "/api/placeholder/600/400",
    },
    {
      id: 2,
      title: "Commercial Land",
      location: "Central Business District",
      price: "₹75L",
      area: "2000 sq.ft",
      image: "/api/placeholder/600/400",
    },
    {
      id: 3,
      title: "Residential Plot",
      location: "South Dholera",
      price: "₹35L",
      area: "1000 sq.ft",
      image: "/api/placeholder/600/400",
    },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Mohan Kumar",
      role: "Property Investor",
      comment:
        "BookMyAssets made my investment journey seamless. Their expert guidance helped me find the perfect plot in Dholera.",
      image: "/api/placeholder/100/100",
    },
    {
      id: 2,
      name: "Jatin Saini",
      role: "First-time Buyer",
      comment:
        "As a first-time investor, I was nervous, but the team at BookMyAssets walked me through the entire process with patience and expertise.",
      image: "/api/placeholder/100/100",
    },
    {
      id: 3,
      name: "Janvi Goel",
      role: "Entrepreneur",
      comment:
        "The investment opportunities in Dholera through BookMyAssets have significantly boosted my portfolio. Highly recommended!",
      image: "/api/placeholder/100/100",
    },
  ];

  useEffect(() => {
    const duration = 2000; // Animation duration in milliseconds
    const steps = 50; // Number of steps to reach the target
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

    // Setup testimonial rotation
    const testimonialTimer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Setup intersection observer for animations
    const observerOptions = {
      threshold: 0.2,
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

    return () => {
      clearInterval(timer);
      clearInterval(testimonialTimer);
      observer.disconnect();
    };
  }, []);

  const canonicalUrl = `https://www.bookmyassets.com/about`

  return (
    <div>
      <link rel="canonical" href={canonicalUrl}/>
      {/* Hero Section with Gradient Background */}
      <div className=" bg-gradient-to-b from-gray-900 to-black text-white relative">
        {/* Floating Contact Button */}
        

        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full mt-28 md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Invest in Tomorrow's{" "}
                <span className="text-yellow-500">Smart City</span>
              </h1>
              <div className="flex items-center mb-8">
                <div className="w-24 h-1 bg-gray-500"></div>
                <div className="mx-2 text-yellow-500">★</div>
                <div className="w-24 h-1 bg-gray-500"></div>
              </div>

              <p className="mb-6 text-lg">
                At BookMyAssets, we don't just offer land—we offer a vision of
                the future.
              </p>
              <br />
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p className="mb-6 text-lg">
                Our mission is to empower investors by connecting them with
                high-appreciation real estate opportunities in Dholera. We aim
                to simplify land investment by providing verified, legally
                secure, and high-potential plots, ensuring maximum returns and
                long-term value for our clients.
              </p>

              <div className="flex gap-4 mt-8">
                <button className="bg-yellow-500 text-black py-4 px-8 font-bold hover:bg-yellow-400 transition-colors rounded-md">
                  <Link href="/projects">Explore Properties</Link>
                </button>
                <button className="bg-transparent border-2 border-white text-white py-4 px-8 font-bold hover:bg-white/10 transition-colors rounded-md">
                  <Link href="/contact">Contact Us</Link>
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="rounded-lg mt-28 overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src={img}
                  alt="Painted Ladies Victorian houses in San Francisco"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Our Milestones</h2>
            <div className="flex items-center justify-center mt-2">
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="mx-2 text-yellow-500">★</div>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-0">
            {/* Milestone Cards with Better Animation */}
            <div className="w-full md:w-1/3 text-center px-4">
              <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl font-bold text-gray-900">
                  {counts.partners}+
                </div>
                <div className="text-lg text-gray-600 mt-2">Partners</div>
              </div>
            </div>

            <div className="w-full md:w-1/3 text-center px-4">
              <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl font-bold text-gray-900">
                  {counts.properties}+
                </div>
                <div className="text-lg text-gray-600 mt-2">
                  Premium Properties
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 text-center px-4">
              <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl font-bold text-gray-900">
                  {counts.customers}+
                </div>
                <div className="text-lg text-gray-600 mt-2">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section with Icons */}
      <div ref={featuresRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Why Choose Us?</h2>
            <div className="flex items-center justify-center mt-2">
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="mx-2 text-yellow-500">★</div>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We go beyond just selling properties – we create investment
              opportunities that build your future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-700 ${isVisible.features ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center text-yellow-600 mb-4 mx-auto">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Exclusive Locations
              </h3>
              <p className="text-gray-600 text-center">
                We focus solely on prime plots in Dholera, ensuring you get the
                best options in this futuristic city.
              </p>
            </div>

            <div
              className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-700 ${isVisible.features ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center text-yellow-600 mb-4 mx-auto">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Expert Market Insights
              </h3>
              <p className="text-gray-600 text-center">
                Our team of professionals provides data-driven insights to help
                you make informed investment decisions.
              </p>
            </div>

            <div
              className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-700 ${isVisible.features ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center text-yellow-600 mb-4 mx-auto">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Legally Verified Properties
              </h3>
              <p className="text-gray-600 text-center">
                We ensure all listings are legally compliant, minimizing risks
                and ensuring a smooth transaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      {/* <div ref={propertiesRef} className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Featured Properties
            </h2>
            <div className="flex items-center justify-center mt-2">
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="mx-2 text-yellow-500">★</div>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-700 ${isVisible.properties ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative h-64">
                  <Image
                    src={property.image}
                    alt={property.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black py-1 px-3 rounded-full font-semibold">
                    {property.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{property.area}</span>
                    <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-8 rounded-md font-bold inline-flex items-center">
              <Home className="mr-2" />
              View All Properties
            </button>
          </div>
        </div>
      </div> */}

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">What Our Clients Say</h2>
            <div className="flex items-center justify-center mt-2">
              <div className="w-16 h-px bg-gray-600"></div>
              <div className="mx-2 text-yellow-500">★</div>
              <div className="w-16 h-px bg-gray-600"></div>
            </div>
          </div>

          <div
            className={`max-w-3xl mx-auto transition-opacity duration-500 ${isVisible.testimonials ? "opacity-100" : "opacity-0"}`}
          >
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl relative">
              <div className="flex items-center mb-6">
                
                <div>
                  <h4 className="text-xl font-semibold">
                    {testimonials[testimonialIndex].name}
                  </h4>
                  <p className="text-yellow-500">
                    {testimonials[testimonialIndex].role}
                  </p>
                </div>
              </div>
              <p className="text-lg italic">
                "{testimonials[testimonialIndex].comment}"
              </p>
              <div className="text-yellow-500 flex mt-6">
                <Star size={20} fill="#facc15" />
                <Star size={20} fill="#facc15" />
                <Star size={20} fill="#facc15" />
                <Star size={20} fill="#facc15" />
                <Star size={20} fill="#facc15" />
              </div>
              <div className="absolute top-4 right-4 text-6xl text-gray-700 opacity-20">
                "
              </div>
            </div>

            <div className="flex justify-center mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${index === testimonialIndex ? "bg-yellow-500" : "bg-gray-600"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      
    </div>
  );
};

export default RealEstateLandingPage;
