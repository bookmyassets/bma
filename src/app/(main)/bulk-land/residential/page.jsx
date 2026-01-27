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
import residentialMap from "@/assests/bulkLand/residential-zone-map.webp";
import Table from "./table";
import BulkLand from "../../components/BulkLandForm";
import Interlink, { getResidentialLinks } from "../Interlink";
import FAQSection from "./FAQs";
import ResidentialZoneCards from "./Cards";

export default function page() {
  return (
    <>
      <title>
        Residential Bulk Land for Sale | Dholera SIR smart Investment
      </title>
      <meta
        name="description"
        content="Buy bulk residential land in Dholera SIR. Best for long-term investors. High ROI, prime locations & future-ready infrastructure."
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
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Zone Area
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  24167.55 <span className="md:hidden"><br /></span> Sq. Yards
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

      <div>
        <ResidentialZoneCards/>
      </div>
      <div>
        <Table />
      </div>
      <BulkLand title="Want to invest in high growth bulk land parcels starting ₹1.75 CR" />
      <div>
        <FAQSection/>
      </div>
      <Interlink
        properties={getResidentialLinks()}
        title="Explore Other Zones in Dholera SIR"
      />

    </>
  );
}
