import Image from "next/image";
import React from "react";
import banner from "@/assests/bulkLand/recreation-sports-entertainment-Zone-hero.webp";
import bannerMob from "@/assests/bulkLand/knowledgeIT-hero-mob-webp.webp";
import {
  Trophy,
  FerrisWheel,
  Theater,
  BedDouble,
  HeartPulse,
  Users,
  Plane,
  Landmark,
  Layers,
  Train,
} from "lucide-react";
import CommonForm from "../../components/CommonForm";
import recreationmap from "@/assests/bulkLand/recreation-sports-map.webp";
import Table from "./table";
import BulkLand from "../../components/BulkLandForm";
import Interlink, { getSportLinks } from "../Interlink";
import FAQSection from "./FAQs";
import RecreationZoneCards from "./Cards";

export default function page() {
  return (
    <>
      <title>
        Buy bulk recreation sports land in Dholera SIR With BookMyAssets
      </title>
      <meta
        name="description"
        content="Explore premium bulk land in Dholera SIR for sale. In India’s first smart city Dholera Gujarat."
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
              Recreation, Sports & Entertainment Zone
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
                  11120.45 <span className="md:hidden"><br /></span>sq. yards
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Key Permissions
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  Commercial Development
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

      <div className="max-w-96 mx-auto p-4">
        <div className="relative flex justify-center items-center rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={recreationmap}
            alt="recreation sports entertainment zone Dholera SIR land plots"
            className="w-96 h-96"
          />
        </div>
      </div>

      <div>
        <RecreationZoneCards/>
      </div>
      <div>
        <Table />
      </div>
      <BulkLand title="Want to invest in high growth bulk land parcels starting ₹1.75 CR" />
      <div>
        <FAQSection/>
      </div>
      <Interlink
        properties={getSportLinks()}
        title="Explore Other Zones in Dholera SIR"
      />
    </>
  );
}
