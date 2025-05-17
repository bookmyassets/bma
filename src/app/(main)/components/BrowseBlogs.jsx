"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NotFound from "./ui/NotFound";
import { getblogs } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";

const BrowseBlogsSection = () => {
  // Theme colors
  const themeColors = {
    black: "#000000",
    gold: "#FDB913",
    darkGold: "#C69C21",
    white: "#FFFFFF",
  };

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getblogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section
        className="py-12 md:py-24 px-6 md:px-36 relative"
        style={{
          backgroundColor: themeColors.black,
          minHeight: "60vh",
        }}
      >
        <div className="container flex justify-center items-center" style={{ minHeight: "40vh" }}>
          <div className="text-center">
            <div
              className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: themeColors.gold, borderTopColor: themeColors.darkGold }}
            ></div>
            <p className="text-lg" style={{ color: themeColors.gold }}>
              Loading blogs...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show only 3 featured blogs
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <section className=" px-6 md:px-36 relative bg-white">
      <div className="container mx-auto relative">
        {/* Section Title */}
        <div className="w-full px-2 mb-10 text-center">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-3 text-gold relative inline-block pb-2" style={{ color: themeColors.gold }}>
            Featured Blogs
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 rounded-full" style={{ backgroundColor: themeColors.gold }}></span>
          </h2>
          <p className="text-sm md:text-xl max-w-2xl mx-auto mt-4" style={{ color: themeColors.darkGold }}>
            Discover some of our top blogs in Dholera. Exclusive opportunities await.
          </p>
        </div>

        {featuredBlogs.length > 0 ? (
          <div className=" px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 relative flex flex-col shadow-lg"
                style={{ backgroundColor: `${themeColors.white}E6`, border: `2px solid ${themeColors.gold}`, backdropFilter: "blur(10px)" }}
              >
                {/* Blog Image */}
                <div className="relative h-64">
                  {blog.mainImage && (
                    <img
                      src={urlFor(blog.mainImage).width(600).height(400).url()}
                      alt={blog.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Blog Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: themeColors.black }}>
                    {blog.title}
                  </h3>

                  <div className="flex-grow"></div> {/* Pushes button to bottom */}

                  <Link href={`/blogs/${blog.slug?.current}`} passHref>
                    <button
                      className="w-full px-4 py-2 transition-all font-semibold border-white rounded-full hover:bg-[#FDB913] bg-black hover:text-black text-lg md:text-base text-[#FDB913] mt-auto"
                    >
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NotFound/>
        )}

        {/* Browse More Blogs Button */}
        {blogs.length > 3 && (
          <div className="mt-10 py-8 flex justify-center">
            <Link href="/blogs">
              <button
                className="px-6 text-xl py-3 rounded-md transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: themeColors.gold, color: themeColors.black, boxShadow: `0 4px 0 ${themeColors.darkGold}` }}
              >
                Browse More Blogs
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseBlogsSection;