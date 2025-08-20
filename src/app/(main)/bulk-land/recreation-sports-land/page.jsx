import Image from "next/image";
import React from "react";
import banner from "@/assests/banner.webp";
import {
 Trophy, FerrisWheel, Theater, BedDouble, HeartPulse,
  Users, Plane, Landmark, Layers, Train
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
              Recreation, Sports & Entertainment Zone
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
            The Recreation, Sports & Entertainment Zone in Dholera SIR is
            envisioned as the lifestyle and leisure hub of the smart city.
            Designed to host world-class sports complexes, stadiums, amusement
            parks, cultural centers, and entertainment hubs, this zone caters to
            developers, investors, tourism operators, and institutions focusing
            on leisure and sports infrastructure. As part of the master plan, it
            creates a vibrant urban ecosystem that promotes wellness, community
            engagement, and global-standard recreation facilities, positioning
            Dholera as a destination city for both residents and visitors.
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
            Benefits of Buying Bulk Land in Recreation, Sports & Entertainment Zone Zone
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {/* High Appreciation Potential */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Trophy className="w-16 h-16 text-blue-600" />
              <p className="text-lg font-medium text-gray-800">
                Sports Infrastructure
              </p>
            </div>

            {/* Mixed-Use Flexibility */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FerrisWheel className="w-16 h-16 text-green-600" />
              <p className="text-lg font-medium text-gray-800">
                Amusement & Theme Parks
              </p>
            </div>

            {/* Plug & Play Infrastructure */}
            <div className=" flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Theater className="w-16 h-16 text-purple-600" />
              <p className="text-lg font-medium text-gray-800">
                Cultural & Event Venues
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex justify-center items-center pt-4 max-sm:space-y-4 md:space-x-8">
          {/* Community-Centric Planning */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <BedDouble className="w-16 h-16 text-orange-600" />
            <p className="text-lg font-medium text-gray-800">
              Hospitality & Tourism
            </p>
          </div>

          {/* Government-Backed Development */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <HeartPulse className="w-16 h-16 text-red-600" />
            <p className="text-lg font-medium text-gray-800">
              Wellness & Lifestyle Facilities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pb-8 pt-12 p-4">
        <p className="text-center text-3xl font-semibold mb-8">
          Types of Recreation, Sports & Entertainment Projects Allowed
        </p>

        {/* Project Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Retail & Commercial Services */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Users className="w-16 h-16 text-blue-600" />
            <p className="text-lg font-medium text-gray-800">
              High Footfall Potential 
            </p>
          </div>

          {/* Hospitality & Food Services */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <Plane className="w-16 h-16 text-red-600" />
            <p className="text-lg font-medium text-gray-800">
              Tourism & Hospitality Growth
            </p>
          </div>

          {/* Healthcare & Wellness */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Landmark className="w-16 h-16 text-green-600" />
            <p className="text-lg font-medium text-gray-800">
              Community & Cultural Hub
            </p>
          </div>
        </div>
        <div className="md:flex justify-center items-center pt-4 max-sm:space-y-4 md:space-x-8">
          {/* Education & Community Facilities */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Layers className="w-16 h-16 text-purple-600" />
            <p className="text-lg font-medium text-gray-800">
              Diverse Development Options
            </p>
          </div>

          {/* Residential & Housing Projects */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Train className="w-16 h-16 text-orange-600" />
            <p className="text-lg font-medium text-gray-800">
              Future-Ready Infrastructure 
            </p>
          </div>
        </div>
      </div>
      <CommonForm title="Bulk Land Parcels Starting from Rs. 1.75 Cr." />
    </>
  );
}
