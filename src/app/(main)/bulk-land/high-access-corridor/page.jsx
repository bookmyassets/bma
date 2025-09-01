import Image from "next/image";
import React from "react";
import banner from "@/assests/bulkLand/HighAccess corridor-hero.webp";
import bannerMob from "@/assests/bulkLand/high-access-hero-mob-webp.webp";
import icon from "@/assests/svg/building-and-house.svg";
import icon2 from "@/assests/svg/human-resources.svg";
import {
  Eye,
  Layers,
  Footprints,
  Plug,
  Landmark,
  ShoppingBag,
  BedDouble,
  Building2,
  Hospital,
  Home,
} from "lucide-react";
import hacMap from "@/assests/bulkLand/high-access-corridor-map.webp"
import { TbGardenCart } from "react-icons/tb";
import Table from "./table";
import BulkLand from "../../components/BulkLandForm";
import Interlink, { getHACLinks } from "../Interlink";

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
              High Access Corridor Zone
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
                  6091.41 sq. yards
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
            The High Access Corridor in Dholera SIR is planned as a dynamic
            mixed-use zone with high visibility and connectivity, ideal for
            large-scale commercial, hospitality, and residential developments.
            Designed for businesses that thrive on accessibility such as malls,
            hotels, corporate offices, retail hubs, and high-density housing. It
            serves as a vibrant economic artery within the smart city’s
            masterplan. With prime frontage along major roads, modern
            infrastructure, and flexible development permissions, this corridor
            is positioned to become a landmark destination for commerce, living,
            and leisure in Dholera.
          </p>
        </div>
      </div>

      <div className="max-w-96 mx-auto p-4">
        <div className="relative flex justify-center items-center rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={hacMap}
            alt="High Access Corridor Zone Dholera SIR land plots"
            className="w-96 h-96"
            priority
            />

        </div>
        </div>
            <div className="max-w-6xl mx-auto p-4">
        {/* Benefits Grid */}
        <div>
          <p className="text-center text-3xl font-semibold mb-8">
            Benefits of Buying Bulk Land in High Access Corridor Zones
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {/* High Appreciation Potential */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Image src={icon} alt="Prime Visibility & Frontage" className="w-16 h-16 text-blue-600" />
              <p className="text-lg font-medium text-gray-800">
                Prime Visibility & Frontage
              </p>
            </div>

            {/* Mixed-Use Flexibility */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Layers className="w-16 h-16 text-green-600" />
              <p className="text-lg font-medium text-gray-800">
                Versatile Development Options
              </p>
            </div>

            {/* Plug & Play Infrastructure */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
            <Image src={icon2} alt="High Footfall Potential" className="w-16 h-16 text-blue-600" />
            <p className="text-lg font-medium text-gray-800">
              High Footfall Potential
            </p>
          </div>

          {/* Government-Backed Development */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Landmark className="w-16 h-16 text-red-600" />
            <p className="text-lg font-medium text-gray-800">
              Government Incentives & Flexibility
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pb-8 pt-12 p-4">
        <p className="text-center text-3xl font-semibold mb-8">
          Types of High Access Corridor Projects Allowed
        </p>

        {/* Project Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Retail & Commercial Services */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <TbGardenCart className="w-16 h-16 text-blue-600" />
            <p className="text-lg font-medium text-gray-800">
              Retail & Shopping Complexes
            </p>
          </div>

          {/* Hospitality & Food Services */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <BedDouble className="w-16 h-16 text-red-600" />
            <p className="text-lg font-medium text-gray-800">
              Hospitality & Accommodation
            </p>
          </div>

          {/* Healthcare & Wellness */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Building2 className="w-16 h-16 text-green-600" />
            <p className="text-lg font-medium text-gray-800">
              Corporate & Commercial Offices
            </p>
          </div>
        </div>
        <div className="md:flex justify-center items-center pt-4 max-sm:space-y-4 md:space-x-8">
          {/* Education & Community Facilities */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Hospital className="w-16 h-16 text-purple-600" />
            <p className="text-lg font-medium text-gray-800">
              Healthcare & Wellness Facilities
            </p>
          </div>

          {/* Residential & Housing Projects */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Home className="w-16 h-16 text-orange-600" />
            <p className="text-lg font-medium text-gray-800">
              Residential & Mixed-Use Housing
            </p>
          </div>
        </div>
      </div>
      <div>
        <Table/>
      </div>
      <BulkLand title="Bulk Land Parcels Starting from Rs. 1.75 Cr." />
      <Interlink
        properties={getHACLinks()}
        title="Explore Other Zones in Dholera SIR"
      />
    </>
  );
}
