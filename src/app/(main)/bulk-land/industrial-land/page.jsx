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
import FAQSection from "./FAQs";
import IndustrialZoneCards from "./Cards";

export default function page() {
  return (
    <>
      <title>Industrial Zone in Dholera SIR | BookMyAssets</title>
      <meta
        name="description"
        content="Industrial land in Dholera designed for factories, warehouses and long term growth."
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
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Zone Area
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  28311.75<span className="md:hidden"><br /></span> sq. yards
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Key Permissions
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  Industrial Development
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
            and modern logistics networks
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
      <div>
        <IndustrialZoneCards/>
      </div>
      <div>
        <Table />
      </div>
      <BulkLand title="Want to invest in high growth bulk land parcels starting ₹1.75 CR" />
      <FAQSection/>
      <Interlink
        properties={getIndustrialLinks()}
        title="Explore Other Zones in Dholera SIR"
      />
    </>
  );
}
