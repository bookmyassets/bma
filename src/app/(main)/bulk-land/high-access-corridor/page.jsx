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
import hacMap from "@/assests/bulkLand/high-access-corridor-map.webp";
import { TbGardenCart } from "react-icons/tb";
import Table from "./table";
import BulkLand from "../../components/BulkLandForm";
import Interlink, { getHACLinks } from "../Interlink";
import FAQSection from "./FAQs";
import HighAccessCorridorCards from "./Cards";

export default function page() {
  return (
    <>
      <title>High Access Corridor in Dholera SIR by BookMyAssets</title>
      <meta
        name="description"
        content="Invest in bulk land at Dholera High Access Corridor with verified documents and high growth prospects."
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
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Zone Area
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  6091.41<span className="md:hidden"><br /></span> sq. yards
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Key Permissions
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  Residential and Commercial Development
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
            serves as a vibrant economic artery within the smart city’s master
            plan. With prime frontage along major roads, modern infrastructure,
            and flexible development permissions, this corridor is positioned to
            become a landmark destination for commerce, living, and leisure in
            Dholera.
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
      <div>
        <HighAccessCorridorCards/>
      </div>
      <div>
        <Table />
      </div>
      <BulkLand title="Want to invest in high growth bulk land parcels starting ₹1.75 CR" />
      <div>
        <FAQSection/>
      </div>
      <Interlink
        properties={getHACLinks()}
        title="Explore Other Zones in Dholera SIR"
      />
    </>
  );
}
