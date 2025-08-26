import Image from "next/image";
import React from "react";
import banner from "@/assests/bulkLand/residential plot-hero.webp";
import bannerMob from "@/assests/bulkLand/residential-hero-mob.-webp.webp";
import {
  TrendingUp,
  LayoutGrid,
  Plug,
  Users,
  Landmark,
  ShoppingBag,
  UtensilsCrossed,
  HeartPulse,
  GraduationCap,
  Home,
  HomeIcon,
} from "lucide-react";
import CommonForm from "../../components/CommonForm";
import residentialMap from "@/assests/bulkLand/residential-zone-map.webp";
import Table from "./table";
import BulkLand from "../../components/BulkLandForm";

export default function page() {
  return (
    <>
      <div className="relative h-[50vh] w-full mb-20">
        {/* Banner Image */}
        <Image
          src={banner}
          alt="banner"
          className="h-full w-full object-cover max-sm:hidden"
          fill
          priority
        />
        <Image
          src={bannerMob}
          alt="banner"
          className="h-full w-full object-cover md:hidden"
          fill
          priority
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Main Title - Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold tracking-wide mb-2 md:mb-4">
              RESIDENTIAL ZONE
            </h1>
            <p className="text-white text-lg font-light tracking-wider">
              Where Opportunities Multiply
            </p>
          </div>
        </div>

        {/* Bottom Info Card */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-10">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-4 md:p-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Zone Area
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  24167.55 Sq. Yards
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
                  High ROI
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
            The Residential Zone in Dholera SIR is designed to foster vibrant
            living communities while integrating essential urban amenities.
            Catering to homebuyers, real estate developers, and investors, it
            allows for a variety of residential formats and supporting
            facilities like schools, healthcare centers, retail spaces, and
            recreational hubs. As a key component of Dholera’s smart city
            masterplan, this zone ensures balanced growth by blending
            high-quality housing with commercial and public infrastructure,
            making it a hub for sustainable and future-ready living.
          </p>
        </div>
      </div>

      <div className="max-w-96 mx-auto p-4">
        <div className="relative flex justify-center items-center rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={residentialMap}
            alt="residential Zone Dholera SIR land plots"
            className="w-96 h-96 object-cover"
            priority
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Benefits Grid */}
        <div>
          <p className="text-center text-3xl font-semibold mb-8">
            Benefits of Buying Bulk Land in Residential Zones
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {/* High Appreciation Potential */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <TrendingUp className="w-16 h-16 text-blue-600" />
              <p className="text-lg font-medium text-gray-800">
                High Appreciation Potential
              </p>
            </div>

            {/* Mixed-Use Flexibility */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <HomeIcon className="w-16 h-16 text-green-600" />
              <p className="text-lg font-medium text-gray-800">
                Mixed-Use Flexibility
              </p>
            </div>

            {/* Plug & Play Infrastructure */}
            <div className=" flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Plug className="w-16 h-16 text-purple-600" />
              <p className="text-lg font-medium text-gray-800">
                Plug & Play Infrastructure
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex justify-center items-center pt-4 max-sm:space-y-4 md:space-x-8">
          {/* Community-Centric Planning */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Users className="w-16 h-16 text-orange-600" />
            <p className="text-lg font-medium text-gray-800">
              Community-Centric Planning
            </p>
          </div>

          {/* Government-Backed Development */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Landmark className="w-16 h-16 text-red-600" />
            <p className="text-lg font-medium text-gray-800">
              Government-Backed Development
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pb-8 pt-12 p-4">
        <p className="text-center text-3xl font-semibold mb-8">
          Types of Residential Projects Allowed
        </p>

        {/* Project Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Retail & Commercial Services */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <ShoppingBag className="w-16 h-16 text-blue-600" />
            <p className="text-lg font-medium text-gray-800">
              Retail & Commercial Services
            </p>
          </div>

          {/* Hospitality & Food Services */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <UtensilsCrossed className="w-16 h-16 text-red-600" />
            <p className="text-lg font-medium text-gray-800">
              Hospitality & Food Services
            </p>
          </div>

          {/* Healthcare & Wellness */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <HeartPulse className="w-16 h-16 text-green-600" />
            <p className="text-lg font-medium text-gray-800">
              Healthcare & Wellness
            </p>
          </div>
        </div>
        <div className="md:flex justify-center items-center pt-4 max-sm:space-y-4 md:space-x-8">
          {/* Education & Community Facilities */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <GraduationCap className="w-16 h-16 text-purple-600" />
            <p className="text-lg font-medium text-gray-800">
              Education & Community Facilities
            </p>
          </div>

          {/* Residential & Housing Projects */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <HomeIcon className="w-16 h-16 text-orange-600" />
            <p className="text-lg font-medium text-gray-800">
              Residential & Housing Projects
            </p>
          </div>
        </div>
      </div>
      <div>
        <Table />
      </div>
      <BulkLand title="Bulk Land Parcels Starting from Rs. 1.75 Cr." />
    </>
  );
}
