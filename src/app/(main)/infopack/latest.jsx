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

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

// Fixed Navigation Component
const FixedNavigation = () => (
  <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-200/50 px-6 py-4">
    <div className="flex items-center gap-6">
      <Link
        href="/infopack/locations"
        className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <FaMapMarkerAlt className="text-lg" />
        <span className="font-semibold">Locations</span>
      </Link>

      <Link
        href="/infopack/videos"
        className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <FaVideo className="text-lg" />
        <span className="font-semibold">Videos</span>
      </Link>

      <Link
        href="/infopack/inventory"
        className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <FaBuilding className="text-lg" />
        <span className="font-semibold">Available Plots</span>
      </Link>
    </div>
  </div>
);

// Growth Stats Component
const GrowthStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
      <FaRocket className="text-4xl mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">920 sq km</h3>
      <p className="text-blue-100">Smart City Area</p>
    </div>

    <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
      <FaCity className="text-4xl mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">₹2 Lakh Cr</h3>
      <p className="text-green-100">Investment Potential</p>
    </div>

    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
      <FaIndustry className="text-4xl mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">800+</h3>
      <p className="text-purple-100">Industries Expected</p>
    </div>

    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
      <FaPlane className="text-4xl mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">2030</h3>
      <p className="text-orange-100">Full Development</p>
    </div>
  </div>
);

// Why Dholera Growth Component
const WhyDholeraGrowth = () => (
  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-3xl shadow-2xl border border-amber-200 mb-12">
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
        Why Dholera is the{" "}
        <span className="text-amber-600">Future of India</span>
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
      (cat) => cat && cat.title && cat.title.toLowerCase() === "sold out"
    );

    return !isSoldOut;
  });

  return (
    <main
      className="relative py-16 px-4 sm:px-6 pt-32 lg:px-8 min-h-[70vh] overflow-auto"
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

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Enhanced Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="text-center space-y-8 mt-12"
        >
          <div className="space-y-6">
            <h1
              id="hero-heading"
              className="font-extrabold text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight"
            >
              Invest in India's First
              <br />
              <span className="text-amber-600 animate-pulse">Smart City</span>
            </h1>
            <div className="h-2 w-32 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
            <p className="text-gray-800 font-bold text-2xl md:text-3xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
                Dholera Special Investment Region
              </span>
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
            <p className="text-gray-800 font-medium text-xl md:text-2xl leading-relaxed">
              🏆 Verified Residential Plots • 📋 Immediate Registry • 👥 Trusted
              by 400+ Investors
            </p>
          </div>

          <div className="pt-6">
            <Link
              href="https://shorturl.at/8OD6u"
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-gray-900 to-gray-800 text-amber-400 text-lg md:text-2xl font-bold px-10 py-6 rounded-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
              aria-label="Download WestWyn County Brochure"
            >
              <FaDownload
                className="group-hover:animate-bounce text-2xl"
                aria-hidden="true"
              />
              Download WestWyn County Brochure
            </Link>
          </div>
        </section>

        {/* Growth Statistics */}
        <section className="pt-16">
          <GrowthStats />
        </section>

        {/* Why Dholera Growth */}
        <section className="pt-8">
          <WhyDholeraGrowth />
        </section>

        {/* Enhanced Features Section */}
        <section aria-labelledby="features-heading" className="pt-8">
          <div className="text-center mb-12">
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
        <section aria-labelledby="updates-heading" className="pt-16">
          <div className="text-center mb-12">
            <h2
              id="updates-heading"
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-2xl md:text-4xl lg:text-5xl font-black px-8 py-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              Discover <span className="text-gray-800">WestWyn County</span>
              <br />
              <span className="text-lg md:text-2xl font-semibold">
                Premium Residential Plots
              </span>
            </h2>
          </div>

          <div className="max-w-7xl mx-auto">
            {subProjectInventory.length > 0 ? (
              subProjectInventory.map((west, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 border border-amber-200/50 mb-8"
                >
                  <div className="flex flex-col lg:flex-row h-full">
                    {/* Enhanced image container */}
                    <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
                      <Image
                        src={urlFor(west.mainImage)?.url() || ""}
                        alt={west.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </div>

                    {/* Enhanced content section with truncated content */}
                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                      <h3 className="font-black text-3xl md:text-4xl mb-6 text-gray-800 leading-tight">
                        {west.title}
                      </h3>
                      <div className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed line-clamp-4">
                        <PortableText value={west.body} />
                      </div>

                      {/* Enhanced read more button */}
                      <div className="mt-auto">
                        <Link
                          href={`/projects/${proj.slug.current}/${west.slug?.current || ""}`}
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
                  New projects coming soon. Stay tuned for exciting
                  opportunities!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Dholera Section */}
        <section className="pt-16">
          <div className="text-center mb-12">
            <h2
              id="dholera-heading"
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-2xl md:text-4xl lg:text-5xl font-black px-8 py-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              About <span className="text-gray-800">Dholera-SIR</span>
              <br />
              <span className="text-lg md:text-2xl font-semibold">
                India's Smart City Vision
              </span>
            </h2>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-amber-200/50">
            <Dholera />
          </div>
        </section>

        {/* Enhanced Blogs Section */}
        <section className="pt-16">
          <div className="text-center mb-12">
            <h2
              id="blogs-heading"
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-2xl md:text-4xl lg:text-5xl font-black px-8 py-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              Latest <span className="text-gray-800">Insights</span>
              <br />
              <span className="text-lg md:text-2xl font-semibold">
                Dholera Development Updates
              </span>
            </h2>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-amber-200/50">
            <BrowseBlogs />
          </div>
        </section>
      </div>
    </main>
  );
}
