import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaDownload,
  FaMapMarkerAlt,
  FaVideo,
  FaBuilding,
  FaRocket,
  FaCity,
  FaIndustry,
  FaPlane,
  FaDollarSign,
} from "react-icons/fa";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

// Import images
import maps from "@/assests/locations.webp";
import videos from "@/assests/videos.webp";
import inventory from "@/assests/plot.webp";
import bg from "@/assests/bg-image.webp";
import { getPosts, getSub } from "@/sanity/lib/api";
import Dholera from "./Dholera";
import BrowseBlogs from "./Blogs";
import WhyBMA from "./WhyBMA";
import SoldOutProjectsSection from "../dholera-residential-plots/SoldOutProjects";
import { FaIndianRupeeSign, FaMoneyBill, FaMoneyBillTrendUp, FaPeopleGroup } from "react-icons/fa6";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

// Fixed Navigation Component
const FixedNavigation = () => (
  <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 w-[95%] max-w-2xl">
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-200/50 px-3 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-center gap-2 md:gap-6">
        <Link
          href="/infopack/locations"
          className="group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 md:flex-none justify-center md:justify-start"
        >
          <FaMapMarkerAlt className="text-sm md:text-lg" />
          <span className="font-semibold text-sm md:text-base">Locations</span>
        </Link>

        <Link
          href="/infopack/videos"
          className="group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 md:flex-none justify-center md:justify-start"
        >
          <FaVideo className="text-sm md:text-lg" />
          <span className="font-semibold text-sm md:text-base">Videos</span>
        </Link>

        <Link
          href="/infopack/inventory"
          className="group flex items-center gap-2 px-2 py-2 md:px-4 md:py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 md:flex-none justify-center md:justify-start"
        >
          <FaBuilding className="text-sm md:text-lg" />
          <span className="font-semibold text-xs md:text-base whitespace-nowrap">
            Available Plots
          </span>
        </Link>
      </div>
    </div>
  </div>
);

// Growth Stats Component
const GrowthStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
      <FaRocket className="text-4xl mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">922.5 sq. km</h3>
      <p className="text-blue-100">Smart City Area</p>
    </div>

    <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
      <FaMoneyBillTrendUp className="text-4xl mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">₹3 Lakh Crore+</h3>
      <p className="text-green-100">Investment Potential</p>
    </div>

    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
      <FaIndustry className="text-4xl mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">250+</h3>
      <p className="text-purple-100">Industries Expected</p>
    </div>

    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
      <FaCity className="text-4xl mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">2042</h3>
      <p className="text-orange-100">Full Development</p>
    </div>
  </div>
);

// Why Dholera Growth Component
const WhyDholeraGrowth = () => (
  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-3xl shadow-2xl border border-amber-200 mb-12">
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
        Dholera -{" "}
        <span className="text-amber-600"> The Blueprint of India's Future</span>
      </h2>
      <div className="h-1 w-32 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            🚀 Government Backing
          </h3>
          <p className="text-gray-700">
            First greenfield smart city in India with complete government
            support and infrastructure development.
          </p>
        </div>

        <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            ✈️ International Airport
          </h3>
          <p className="text-gray-700">
            Upcoming international airport making it a global business hub with
            direct connectivity.
          </p>
        </div>

        <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            🏭 Industrial Hub
          </h3>
          <p className="text-gray-700">
            Major industries like automotive, textiles, and IT are setting up
            operations here.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            🌆 Smart Infrastructure
          </h3>
          <p className="text-gray-700">
            World-class infrastructure with smart utilities, metro connectivity,
            and modern amenities.
          </p>
        </div>

        <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            💰 Investment Returns
          </h3>
          <p className="text-gray-700">
            Land prices expected to appreciate 10-15x in the next 5-7 years as
            development progresses.
          </p>
        </div>

        <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            🎯 Strategic Location
          </h3>
          <p className="text-gray-700">
            Located between Delhi-Mumbai Industrial Corridor (DMIC) with
            excellent connectivity.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Feature card component with modern styling
const FeatureCard = ({ href, image, alt, title, icon: Icon, color }) => (
  <Link
    href={href}
    className="block group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
    aria-label={`View ${title}`}
  >
    <div className="relative overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt={alt}
        className="h-48 md:h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        width={400}
        height={300}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon overlay */}
      <div className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl">
        <Icon className={`text-2xl ${color}`} />
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-6">
      <p className="font-bold text-white text-lg md:text-xl drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        {title}
      </p>
    </div>
  </Link>
);

export default async function Info() {
  const westwyn = await getSub();
  const posts = await getPosts();
  const proj = posts[0];

  const subProjectInventory = westwyn.filter((item) => {
    if (!item || !item.categories || !Array.isArray(item.categories)) {
      return false;
    }

    const isSoldOut = item.categories.some(
      (cat) => cat && cat.title && cat.title.toLowerCase() === "sold out",
    );

    return !isSoldOut;
  });

  return (
    <main
      className="relative py-8 px-4 sm:px-6 pt-32 lg:px-8 min-h-[70vh] overflow-auto"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Fixed Navigation */}
      <FixedNavigation />

      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-4">
        {/* Enhanced Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="text-center space-y-4 pt-16"
        >
          <div className="space-y-6">
            <h1
              id="hero-heading"
              className="font-extrabold text-4xl md:text-5xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight"
            >
              Dholera Special Investment Region
              <br />
              <span className="text-amber-600 animate-pulse"></span>
            </h1>
            <div className="h-2 w-32 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
            <p className="text-gray-800 font-bold text-2xl md:text-3xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
                India's First Greenfield Smart City
              </span>
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-7xl flex justify-center items-center mx-auto">
            <p className="text-gray-800 font-semibold text-lg leading-relaxed text-left">
              Dholera Smart City is India’s first planned greenfield smart city,
              developed under the Delhi–Mumbai Industrial Corridor. It is
              designed as a major hub for manufacturing, logistics, and future
              industries like semiconductors. The city is supported by
              large-scale infrastructure including expressways, an international
              airport, and renewable energy projects. With strong government
              backing, Dholera is emerging as a key destination for long-term
              investment and growth.
            </p>
          </div>
        </section>

        {/* Growth Statistics */}
        <section className="pt-8">
          <GrowthStats />
        </section>

        {/* Why Dholera Growth */}
        <section className="pt-8">
          <WhyDholeraGrowth />
        </section>

        {/* Enhanced Features Section */}
        <section aria-labelledby="features-heading" className="pt-8">
          <div className="text-center mb-4">
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl font-black text-gray-800 mb-4"
            >
              Explore <span className="text-amber-600">Dholera Resources</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <FeatureCard
              href="/infopack/locations"
              image={maps}
              alt="Strategic locations in Dholera Smart City"
              title="Prime Locations"
              icon={FaMapMarkerAlt}
              color="text-blue-400"
            />
            <FeatureCard
              href="/infopack/videos"
              image={videos}
              alt="Development progress videos of Dholera"
              title="Progress Videos"
              icon={FaVideo}
              color="text-red-400"
            />
            <FeatureCard
              href="/infopack/inventory"
              image={inventory}
              alt="Available investment plots in Dholera"
              title="Investment Plots"
              icon={FaBuilding}
              color="text-green-400"
            />
          </div>
        </section>

        {/* Enhanced WestWyn County Section */}
        <section aria-labelledby="updates-heading" className="pt-8">
          <div className="text-center mb-8">
            <h2
              id="updates-heading"
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-2xl md:text-4xl lg:text-5xl font-black w-[250px] md:w-[450px]  md:h-[130px] p-4 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              Our Offerings
              <br />
              <span className="text-lg md:text-2xl font-semibold">
                Premium Residential Plots
              </span>
            </h2>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 space-x-4">
            {subProjectInventory.length > 0 ? (
              subProjectInventory
                .filter(
                  (project) =>
                    project.title.includes(
                      "WestWyn Residency" && "WestWyn Estate",
                    ) ||
                    (project.slug?.current === "westwyn-residency" &&
                      "westwyn-estate"),
                )
                .map((west, index) => (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 border border-amber-200/50 mb-8"
                  >
                    <div className="flex flex-col h-auto">
                      <div className="relative overflow-hidden h-64">
                        <Image
                          src={urlFor(west.mainImage)?.url() || ""}
                          alt={west.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                      </div>

                      {/* Enhanced content section with truncated content */}
                      <div className="p-4 flex flex-col justify-center">
                        <h3 className="font-black text-xl md:text-2xl mb-2 text-gray-800 leading-tight">
                          {west.title}
                        </h3>
                        <div className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed line-clamp-4">
                          <PortableText value={west.body} />
                        </div>

                        {/* Enhanced read more button */}
                        <div className="mt-auto">
                          <Link
                            href={`/dholera-residential-plots/${west.slug?.current}`} // ✅ was: project.slug?.current
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold py-4 px-8 rounded-2xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            Explore Details
                            <span className="text-xl">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-full text-center p-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-200/50">
                <p className="text-gray-700 text-xl font-medium">
                  Westwyn Estate project information coming soon. Stay tuned for
                  exciting opportunities!
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <WhyBMA />
        </section>

        {/* Enhanced Dholera Section */}
        <section className="pt-8">
          <div className="text-center mb-4">
            <h2
              id="dholera-heading"
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-2xl md:text-4xl lg:text-5xl font-black w-[250px] md:w-[450px]  md:h-[130px] p-4 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              Mega Projects
              <br />
              <span className="text-lg md:text-2xl font-semibold">
                India's Smart City Vision
              </span>
            </h2>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-2 border border-amber-200/50">
            <Dholera />
          </div>
        </section>

        {/* Enhanced Blogs Section */}
        <section className="pt-8">
          <div className="text-center mb-4">
            <h2
              id="blogs-heading"
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-2xl md:text-4xl lg:text-5xl font-black w-[250px] md:w-[450px]  md:h-[130px] p-4 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              Latest <span className="text-gray-800">Insights</span>
              <br />
              <span className="text-lg md:text-2xl font-semibold">
                Dholera Development Updates
              </span>
            </h2>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-2 border border-amber-200/50">
            <BrowseBlogs />
          </div>
        </section>

        <section>
          <SoldOutProjectsSection/>
        </section>
      </div>
    </main>
  );
}
