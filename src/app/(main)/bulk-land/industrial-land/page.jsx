import Image from "next/image";
import React from "react";
import banner from "@/assests/bulkLand/industrial zone-hero.webp";
import bannerMob from "@/assests/bulkLand/industrial-hero-mob-webp.webp";
import {
  Factory,
  Truck,
  Wrench,
  Zap,
  School,
  Network,
  Construction,
  Banknote,
  Ruler,
  Globe2,
} from "lucide-react";
import CommonForm from "../../components/CommonForm";
import industrialMap from "@/assests/bulkLand/industrial-map.webp";
import icon2 from "@/assests/svg/plug-and-plug-connection.svg";
import Table from "./table";
import BulkLand from "../../components/BulkLandForm";
import Interlink, { getIndustrialLinks } from "../Interlink";

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
              Industrial Zone
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
                  28311.75 sq. yards
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
            The Industrial Zone in Dholera SIR is dedicated to large-scale
            manufacturing, logistics, and production-led growth. It is meant for
            industries, factories, warehouses, and allied businesses that
            require well-planned infrastructure and direct connectivity to
            highways, ports, and the upcoming international airport. As the
            backbone of Dholera’s economic masterplan, this zone enables global
            and domestic companies to establish operations in a world-class
            industrial ecosystem supported by smart utilities, reliable power,
            and modern logistics networks.
          </p>
        </div>
      </div>

      <div className="max-w-96 mx-auto p-4">
        <div className="relative flex justify-center items-center rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={industrialMap}
            alt="Industrial Zone Dholera SIR land plots"
            className="w-96 h-96"
            priority
          />
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        {/* Benefits Grid */}
        <div>
          <p className="text-center text-3xl font-semibold mb-8">
            Benefits of Buying Bulk Land in Industrial Zones
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {/* High Appreciation Potential */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Factory className="w-16 h-16 text-blue-600" />
              <p className="text-lg font-medium text-gray-800">
                Manufacturing & Heavy Industries
              </p>
            </div>

            {/* Mixed-Use Flexibility */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Truck className="w-16 h-16 text-green-600" />
              <p className="text-lg font-medium text-gray-800">
                Warehousing & Logistics
              </p>
            </div>

            {/* Plug & Play Infrastructure */}
            <div className=" flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Wrench className="w-16 h-16 text-purple-600" />
              <p className="text-lg font-medium text-gray-800">
                Light & Medium Industries
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex justify-center items-center pt-4 max-sm:space-y-4 md:space-x-8">
          {/* Community-Centric Planning */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Zap className="w-16 h-16 text-orange-600" />
            <p className="text-lg font-medium text-gray-800">
              Utilities & Support Services
            </p>
          </div>

          {/* Government-Backed Development */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <School className="w-16 h-16 text-red-600" />
            <p className="text-lg font-medium text-gray-800">
              Institutional & Ancillary Facilities
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
            <Network className="w-16 h-16 text-blue-600" />
            <p className="text-lg font-medium text-gray-800">
              Strategic Connectivity
            </p>
          </div>

          {/* Hospitality & Food Services */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <Image
              src={icon2}
              alt="Plug-and-Play Infrastructure"
              className="w-16 h-16 text-red-600"
            />
            <p className="text-lg font-medium text-gray-800">
              Plug-and-Play Infrastructure
            </p>
          </div>

          {/* Healthcare & Wellness */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Banknote className="w-16 h-16 text-green-600" />
            <p className="text-lg font-medium text-gray-800">
              High ROI & Incentives
            </p>
          </div>
        </div>
        <div className="md:flex justify-center items-center pt-4 max-sm:space-y-4 md:space-x-8">
          {/* Education & Community Facilities */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Ruler className="w-16 h-16 text-purple-600" />
            <p className="text-lg font-medium text-gray-800">
              Scalable Land Parcels
            </p>
          </div>

          {/* Residential & Housing Projects */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Globe2 className="w-16 h-16 text-orange-600" />
            <p className="text-lg font-medium text-gray-800">
              Global Investment Magnet
            </p>
          </div>
        </div>
      </div>
      <div>
        <Table />
      </div>
      <BulkLand title="Bulk Land Parcels Starting from Rs. 1.75 Cr." />
      <Interlink
        properties={getIndustrialLinks()}
        title="Explore Other Zones in Dholera SIR"
      />
    </>
  );
}
