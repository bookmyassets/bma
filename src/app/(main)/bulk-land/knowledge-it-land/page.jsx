import Image from "next/image";
import React from "react";
import banner from "@/assests/banner.webp";
import {
  Cpu, FlaskConical, GraduationCap, Building2, Home,
  Lightbulb, Globe2, Server, TrendingUp
} from "lucide-react";
import CommonForm from "../../components/CommonForm";

export default function page() {
  return (
    <>
      <div className="relative h-[50vh] w-full mb-20">
        {/* Banner Image */}
        <Image
          src={banner}
          alt="banner"
          className="h-full w-full object-cover"
          fill
          priority
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Main Title - Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold tracking-wide mb-2 md:mb-4">
              Knowledge & IT ZONE
            </h1>
            <p className="text-white text-lg font-light tracking-wider">
              Where Smart Living Begins
            </p>
          </div>
        </div>

        {/* Bottom Info Card */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-10">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-4 md:p-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Zone Area
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  22 Sq. Km
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Key Permissions
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  Residential Development
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Future Growth
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  High Potential
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Proximity
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  To Main Metro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            The Knowledge & IT Zone in Dholera SIR is envisioned as a hub for
            innovation, research, and technology-driven businesses. It is
            designed for IT parks, educational institutions, R&D centers, and
            knowledge-based industries. This zone is meant for universities,
            training institutes, IT companies, startups, and technology
            investors seeking a future-ready ecosystem. As part of Dholera’s
            master plan, it plays a vital role in building a skilled workforce,
            nurturing innovation, and driving the smart city’s digital and
            intellectual growth.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src="/api/placeholder/300x400.png"
            alt="residential land plots"
            className="w-full h-full object-cover"
            width={400}
            height={400}
            priority
          />
        </div>

        {/* Benefits Grid */}
        <div>
          <p className="text-center text-3xl font-semibold mb-8">
            Benefits of Buying Bulk Land in Knowledge & IT ZONE
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {/* High Appreciation Potential */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Cpu className="w-16 h-16 text-blue-600" />
              <p className="text-lg font-medium text-gray-800">
                IT & Technology Parks
              </p>
            </div>

            {/* Mixed-Use Flexibility */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FlaskConical className="w-16 h-16 text-green-600" />
              <p className="text-lg font-medium text-gray-800">
                Research & Development Facilities
              </p>
            </div>

            {/* Plug & Play Infrastructure */}
            <div className=" flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <GraduationCap className="w-16 h-16 text-purple-600" />
              <p className="text-lg font-medium text-gray-800">
                Educational Institutions
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex justify-center items-center pt-4 max-sm:space-y-4 md:space-x-8">
          {/* Community-Centric Planning */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Building2 className="w-16 h-16 text-orange-600" />
            <p className="text-lg font-medium text-gray-800">
              Corporate & Office Spaces
            </p>
          </div>

          {/* Government-Backed Development */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Home className="w-16 h-16 text-red-600" />
            <p className="text-lg font-medium text-gray-800">
              Supporting Residential & Mixed-Use
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pb-8 pt-12 p-4">
        <p className="text-center text-3xl font-semibold mb-8">
          Types of Knowledge & IT Projects Allowed
        </p>

        {/* Project Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Retail & Commercial Services */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Lightbulb className="w-16 h-16 text-blue-600" />
            <p className="text-lg font-medium text-gray-800">
              Retail & Commercial Services
            </p>
          </div>

          {/* Hospitality & Food Services */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <GraduationCap className="w-16 h-16 text-red-600" />
            <p className="text-lg font-medium text-gray-800">
              Innovation Ecosystem
            </p>
          </div>

          {/* Healthcare & Wellness */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Globe2 className="w-16 h-16 text-green-600" />
            <p className="text-lg font-medium text-gray-800">
              Global Competitiveness
            </p>
          </div>
        </div>
        <div className="md:flex justify-center items-center pt-4 max-sm:space-y-4 md:space-x-8">
          {/* Education & Community Facilities */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Server className="w-16 h-16 text-purple-600" />
            <p className="text-lg font-medium text-gray-800">
              Modern Infrastructure
            </p>
          </div>

          {/* Residential & Housing Projects */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <TrendingUp className="w-16 h-16 text-orange-600" />
            <p className="text-lg font-medium text-gray-800">
              Long-Term Value Growth
            </p>
          </div>
        </div>
      </div>
      <CommonForm title="Bulk Land Parcels Starting from Rs. 1.75 Cr." />
    </>
  );
}
