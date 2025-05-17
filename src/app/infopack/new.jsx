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



// Feature card component for better reusability
const FeatureCard = ({ href, image, alt, title }) => (
  <Link
    href={href}
    className="space-y-4 block group"
    aria-label={`View ${title}`}
  >
    <div className="overflow-hidden rounded-lg shadow-2xl">
      <Image
        src={image}
        alt={alt}
        className="h-40 md:h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        width={400}
        height={300}
      />
    </div>
    <p className="font-semibold text-center md:text-2xl">{title}</p>
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
      className="py-16 px-4 sm:px-6 pt-28 lg:px-8 min-h-[70vh] overflow-auto relative"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >


      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="text-center space-y-6"
        >
          <h1
            id="hero-heading"
            className="font-bold text-2xl md:text-4xl lg:text-5xl text-gray-800"
          >
            Secure Your Future in Dholera Smart City
          </h1>
          <p className="text-black md:font-semibold text-lg md:text-xl max-w-3xl mx-auto">
            Verified Residential Plots • Immediate Registry • Trusted by 400+
            Investors
          </p>

          <div className="pt-4 flex justify-center ">
            <Link
              href="https://shorturl.at/8OD6u"
              className="bg-gray-800 text-amber-400 md:text-3xl font-semibold flex gap-4 items-center p-4 rounded-md  hover:bg-gray-700 transition-colors"
              aria-label="Download Dholera Times Brochure"
            >
              <FaDownload aria-hidden="true" />
              Download WestWyn County Brochure
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section aria-labelledby="features-heading" className="pt-8">
          <h2 id="features-heading" className="sr-only">
            Dholera Information Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
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

        <section aria-labelledby="updates-heading" className="pt-8">
          <h2
            id="updates-heading"
            className="bg-amber-300 text-gray-900 text-xl md:text-3xl lg:text-4xl text-center p-3 md:p-5 font-semibold mx-auto rounded-md mb-8"
          >
            Know More About WestWyn County <span>by BookMyAssets</span>
          </h2>
          {/* grid grid-cols-1 md:grid-cols-2 use grid for more projects */}
          <div className="max-w-7xl mx-auto  gap-8">
            {subProjectInventory.length > 0 ? (
              subProjectInventory.map((west, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col h-full">
                    {/* Image container with fixed height */}
                    <div className="h-48 w-full relative">
                      <Image
                        src={urlFor(west.mainImage)?.url() || ""}
                        alt={west.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content section */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-3xl mb-2 text-gray-800">
                        {west.title}
                      </h3>
                      <div className="line-clamp-3 text-lg text-gray-600 mb-4">
                        <PortableText value={west.body} />
                      </div>

                      {/* Read more button */}
                      <div className="mt-auto">
                        <Link
                          href={`/projects/${proj.slug.current}/${west.slug?.current || ""}`}
                          className="inline-block bg-amber-400 text-gray-800 font-medium py-2 px-4 rounded hover:bg-amber-500 transition-colors"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center p-8 bg-gray-100 rounded-md">
                <p className="text-gray-600 text-lg">
                  No sub-projects available at the moment. Please check back
                  later.
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2
            id="updates-heading"
            className="bg-amber-300 text-gray-900 text-xl md:text-3xl lg:text-4xl text-center p-3 md:p-5 font-semibold mx-auto rounded-md mb-8"
          >
            About <span>Dholera-SIR</span>
          </h2>
          <div>
            <Dholera />
          </div>
        </section>
        <section>
          <h2
            id="updates-heading"
            className="bg-amber-300 text-gray-900 text-xl md:text-3xl lg:text-4xl text-center p-3 md:p-5 font-semibold mx-auto rounded-md mb-8"
          >
            Dholera Blogs
          </h2>
          <div>
            <BrowseBlogs />
          </div>
        </section>
      </div>
    </main>
  );
}
