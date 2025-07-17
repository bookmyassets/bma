"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  MapPin,
  Shield,
  Trophy,
  Users,
  Zap,
  Building,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assests/Bmalogo.png";

const DholeraInvestment = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Premium Plot Selection",
      description:
        "Curated selection of prime residential plots in the heart of Dholera Smart City with guaranteed appreciation potential.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Investment",
      description:
        "Register-ready plots with clear titles, NA NOC compliance, and complete legal documentation for peace of mind.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Guidance",
      description:
        "Dedicated support team providing market insights, investment strategies, and ongoing assistance throughout your journey.",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Proven Track Record",
      description:
        "Successfully delivered 6+ projects with 100% customer satisfaction and timely possession records.",
    },
  ];

  const projects = [
    { name: "WestWyn County", status: "Active", lots: "100+" },
    { name: "Paradise 1 & 2", status: "Sold Out", lots: "250+" },
    { name: "Pride Series", status: "Sold Out", lots: "250+" },
    { name: "Marina", status: "Sold Out", lots: "250+" },
    { name: "Maple", status: "Sold Out", lots: "250+" },
    { name: "Orchid", status: "Sold Out", lots: "250+" },
  ];

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Animated Background */}
     

      <div className="relative py-8 md:py-16">
        {/* Hero Section */}
        <section className=" flex items-center justify-center px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-[#d6b873] to-[#c4a55e] text-black px-6 py-2 rounded-full font-semibold mb-8 animate-pulse">
              <Zap className="w-4 h-4 mr-2" />
              India's Largest Greenfield Smart City
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#d6b873] via-[#c4a55e] to-[#b8944d] bg-clip-text text-transparent leading-tight">
              DHOLERA
              <br />
              <span className="text-black">SMART CITY</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light">
              Unlock the future of urban living with premium investment
              opportunities in Gujarat's most ambitious smart city project
              spanning{" "}
              <span className="text-[#d6b873] font-semibold">920 sq. km</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="tel:+918130371647"
                className="group bg-gradient-to-r from-[#d6b873] to-[#c4a55e] text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#d6b873]/25 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                Call +91 81 3037 1647
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <button className="border-2 border-[#d6b873] text-[#d6b873] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d6b873] hover:text-black transition-all duration-300">
               <Link href="/projects/dholera/westwyn-county-wc">
                                   Explore Properties
                                 </Link>
              </button>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Side - BMA Logo/Image */}
      <div className="flex justify-center lg:justify-start">
        <div className="relative">
          <div className="bg-black p-8 rounded-2xl shadow-xl border border-gray-200">
            <Image
              src={logo}
              alt="BMA Group of Companies Logo" 
              className="w-44 md:w-96 h-44 md:h-96 object-contain"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#d7b36c] rounded-full opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#d7b36c] rounded-full opacity-30"></div>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            About BMA Group of Companies
          </h2>
          <div className="bg-[#d7b36c] w-24 h-1"></div>
          <p className="text-lg font-medium text-[#d7b36c] italic">
            Focused on Your Growth. Driven by Your Trust.
          </p>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p className="text-lg">
            At BMA Group of Companies (BookMyAssets), we believe real estate is more than land—it's about securing your future and building wealth safely and confidently. With expertise across India and globally, we've found unmatched potential in Dholera Smart City, where we're creating premium projects and a complete investment ecosystem.
          </p>
          
          <p className="text-lg">
            Through our four powerful arms—<span className="font-semibold text-gray-800">BMA Developers</span>, <span className="font-semibold text-gray-800">Channel Partners</span>, <span className="font-semibold text-gray-800">Allied Services</span>, and <span className="font-semibold text-gray-800">Truliyo Digital</span>—we guide, protect, and grow your investments, ensuring you always come first.
          </p>
        </div>

        {/* Four Arms of BMA */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#d7b36c]">
            <h4 className="font-semibold text-gray-800 text-lg">BMA Developers</h4>
            <p className="text-xs text-gray-600 mt-1">Premium Project Development</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#d7b36c]">
            <h4 className="font-semibold text-gray-800 text-lg">Channel Partners</h4>
            <p className="text-xs text-gray-600 mt-1">Extensive Network Support</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#d7b36c]">
            <h4 className="font-semibold text-gray-800 text-lg">Allied Services</h4>
            <p className="text-xs text-gray-600 mt-1">Complete Investment Solutions</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#d7b36c]">
            <h4 className="font-semibold text-gray-800 text-lg">Truliyo Digital</h4>
            <p className="text-xs text-gray-600 mt-1">Digital Innovation Platform</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-6">
          <p className="text-lg font-medium text-gray-800 mb-4">
            Discover how we're turning opportunities into lasting value for you.
          </p>
          <Link href="/about" className="bg-[#d7b36c] hover:bg-[#c4a055] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2">
            <span>Learn More About Us</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* About Section */}
        <section className="py-8 md:py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                  Why Choose <br />{" "}
                  <span className="text-[#d6b873]">Book My Assets</span>?
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We're not just selling land; we're crafting tomorrow's
                  opportunities today. With deep market insights and a vision
                  for Gujarat's future, we deliver strategic investment
                  solutions that grow with India's development story.
                </p>
                <div className="flex items-center text-[#d6b873] text-lg font-semibold">
                  <MapPin className="w-5 h-5 mr-2" />
                  Gujarat's Premier Smart City Development
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      activeFeature === index
                        ? "border-[#d6b873] bg-[#d6b873]/10"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div
                      className={`${activeFeature === index ? "text-[#d6b873]" : "text-gray-400"} mb-3`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-sm mb-2 text-black">
                      {feature.title}
                    </h3>
                    {activeFeature === index && (
                      <p className="text-sm text-gray-600 animate-fadeIn">
                        {feature.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Proven <span className="text-[#d6b873]">Success</span> Stories
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Our track record speaks for itself - 6 successful projects, 1500+
              satisfied investors, and 100% delivery commitment
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 p-6 rounded-2xl hover:border-[#d6b873]/50 hover:shadow-lg transition-all duration-300 group hover:transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-3 h-3 rounded-full animate-pulse ${project.status === "Sold Out" ? "bg-red-500" : "bg-green-500"}`}
                    ></div>
                    <span
                      className={`text-sm font-semibold ${project.status === "Sold Out" ? "text-red-600" : "text-green-600"}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black group-hover:text-[#d6b873] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {project.lots} plots delivered
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Benefits */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#d6b873] to-[#c4a55e] text-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                  Smart Investment, <br />
                  Smarter Returns
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-[#d6b873] font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-black">
                        Register-Ready Plots
                      </h3>
                      <p className="text-gray-800">
                        Complete documentation with NA NOC clearance for
                        immediate ownership transfer
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-[#d6b873] font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-black">
                        Prime Locations
                      </h3>
                      <p className="text-gray-800">
                        Strategic positioning in high-growth zones with
                        guaranteed infrastructure development
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-[#d6b873] font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-black">
                        Resale Support
                      </h3>
                      <p className="text-gray-800">
                        Dedicated team to help you maximize returns when you're
                        ready to sell
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#d6b873] mb-6 text-center">
                  Investment Highlights
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">
                      920
                    </div>
                    <div className="text-sm text-gray-600">Sq. Km Area</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">6+</div>
                    <div className="text-sm text-gray-600">
                      Projects Delivered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">
                      1500+
                    </div>
                    <div className="text-sm text-gray-600">Happy Investors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">
                      100%
                    </div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Secure Your Future in{" "}
              <span className="text-[#d6b873]">Dholera</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of smart investors who've chosen Book My Assets for
              their Dholera Smart City investment journey. Your gateway to
              tomorrow starts today.
            </p>
            <a
              href="tel:+918130371647"
              className="inline-flex items-center bg-gradient-to-r from-[#d6b873] to-[#c4a55e] text-black px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-[#d6b873]/25 transition-all duration-300 transform hover:scale-105"
            >
              <span>Start Your Investment Journey</span>
              <ChevronRight className="w-6 h-6 ml-3" />
            </a>
          </div>
        </section>
      </div>

      <style jsx>{``}</style>
    </div>
  );
};

export default DholeraInvestment;
