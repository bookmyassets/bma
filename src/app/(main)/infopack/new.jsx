import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaDownload } from "react-icons/fa";
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

// Enhanced Feature card component with modern styling
const FeatureCard = ({ href, image, alt, title }) => (
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
      className="relative py-16 px-4 sm:px-6 pt-28 lg:px-8 min-h-[70vh] overflow-auto"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Enhanced Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h1
              id="hero-heading"
              className="font-extrabold text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight"
            >
              Secure Your Future in
              <br />
              <span className="text-amber-600">Dholera Smart City</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
          </div>
          
          <p className="text-gray-800 font-medium text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            <span className="bg-white/80 px-3 py-1 rounded-lg shadow-sm">
              Verified Residential Plots • Immediate Registry • Trusted by 400+ Investors
            </span>
          </p>

          <div className="pt-6">
            <Link
              href="https://shorturl.at/8OD6u"
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-gray-900 to-gray-800 text-amber-400 text-lg md:text-2xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
              aria-label="Download Dholera Times Brochure"
            >
              <FaDownload className="group-hover:animate-bounce" aria-hidden="true" />
              Download WestWyn County Brochure
            </Link>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section aria-labelledby="features-heading" className="pt-8">
          <h2 id="features-heading" className="sr-only">
            Dholera Information Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <FeatureCard
              href="/infopack/locations"
              image={maps}
              alt="Map of Dholera Smart City locations"
              title="Locations"
            />
            <FeatureCard
              href="/infopack/videos"
              image={videos}
              alt="Videos about Dholera Smart City"
              title="Videos"
            />
            <FeatureCard
              href="/infopack/inventory"
              image={inventory}
              alt="Available plots in Dholera Smart City"
              title="Available Plots"
            />
          </div>
        </section>

        {/* Enhanced WestWyn County Section */}
        <section aria-labelledby="updates-heading" className="pt-12">
          <div className="text-center mb-12">
            <h2
              id="updates-heading"
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-2xl md:text-4xl lg:text-5xl font-black px-8 py-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              Know More About{" "}
              <span className="text-gray-800">WestWyn County</span>
              <br />
              <span className="text-lg md:text-2xl font-semibold">by BookMyAssets</span>
            </h2>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {subProjectInventory.length > 0 ? (
              subProjectInventory.map((west, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 border border-amber-200/50"
                >
                  <div className="flex flex-col h-full">
                    {/* Enhanced image container */}
                    <div className="h-64 w-full relative overflow-hidden">
                      <Image
                        src={urlFor(west.mainImage)?.url() || ""}
                        alt={west.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Enhanced content section */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-black text-3xl md:text-4xl mb-4 text-gray-800 leading-tight">
                        {west.title}
                      </h3>
                      <div className="line-clamp-3 text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                        <PortableText value={west.body} />
                      </div>

                      {/* Enhanced read more button */}
                      <div className="mt-auto">
                        <Link
                          href={`/projects/${proj.slug.current}/${west.slug?.current || ""}`}
                          className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold py-4 px-8 rounded-2xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center p-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-200/50">
                <p className="text-gray-700 text-xl font-medium">
                  No sub-projects available at the moment. Please check back later.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Dholera Section */}
        <section className="pt-12">
          <div className="text-center mb-12">
            <h2
              id="dholera-heading"
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-2xl md:text-4xl lg:text-5xl font-black px-8 py-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              About <span className="text-gray-800">Dholera-SIR</span>
            </h2>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-amber-200/50">
            <Dholera />
          </div>
        </section>

        {/* Enhanced Blogs Section */}
        <section className="pt-12">
          <div className="text-center mb-12">
            <h2
              id="blogs-heading"
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-2xl md:text-4xl lg:text-5xl font-black px-8 py-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              Dholera <span className="text-gray-800">Blogs</span>
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