import Image from "next/image";
import React from "react";
import banner from "@/assests/bulkLand/citycentre-hero-desktop.webp";
import bannerMob from "@/assests/bulkLand/citycentre-hero-mob.webp";
import {
  ShoppingBag,
  Clapperboard,
  Building2,
  Landmark,
  Building,
  MapPin,
  Users,
  Star,
  Layers,
  Train,
} from "lucide-react";
import cityCenterMap from "@/assests/bulkLand/city-centre-map.webp";
import Table from "./table";
import BulkLand from "../../components/BulkLandForm";
import Interlink, { getCityCenterLinks } from "../Interlink";
import FAQSection from "./FAQs";
import CityCentreZoneCards from "./Cards";

export default function page() {
  return (
    <>
      <title>
        Invest in Bulk Land City Centre in Dholera SIR | BookMyAssets
      </title>
      <meta
        name="description"
        content="Find investor friendly bulk land in Dholera City Centre with full support and clean paperwork."
      />

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
              City Centre Zone
            </h1>
            <p className="text-white text-lg font-light tracking-wider">
              Where Opportunities Multiply
            </p>
          </div>
        </div>

        {/* Bottom Info Card */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-10">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-4 md:p-6 mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Zone Area
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  1678.045<span className="md:hidden"><br /></span> sq. yards
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Key Permissions
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  Commercial & Hospitality Development
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
            The City Centre in Dholera SIR is designed as the urban core of the
            smart city, bringing together commerce, culture, administration, and
            lifestyle in one vibrant hub. This zone is meant for retail,
            hospitality, corporate offices, and civic institutions, along with
            high-density residential and mixed-use projects. As the focal point
            of Dholera’s master plan, the City Centre offers maximum visibility,
            footfall, and prestige - making it the prime location for businesses
            and investors seeking a landmark presence in India’s first
            greenfield smart city.
          </p>
        </div>
      </div>

      <div className="max-w-96 mx-auto p-4">
        <div className="relative flex justify-center items-center rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={cityCenterMap}
            alt="City Center Zone Dholera SIR land plots"
            className="w-96 h-96"
            priority
          />
        </div>
      </div>
<div>
  <CityCentreZoneCards/>
</div>
      <div>
        <Table />
      </div>
     <BulkLand title="Want to invest in high growth bulk land parcels starting ₹1.75 CR" />
      <div>
        <FAQSection/>
      </div>
      <Interlink
        properties={getCityCenterLinks()}
        title="Explore Other Zones in Dholera SIR"
      />
    </>
  );
}
