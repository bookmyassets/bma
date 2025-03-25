"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NotFound from "./ui/NotFound";
import { PortableText } from "next-sanity";
import { getblogs } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";

const BrowseBlogsSection = () => {
  // Theme colors
  const themeColors = {
    black: "#000000",
    gold: "#FDB913",
    darkGold: "#C69C21"
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
          background: `
            linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)),
            url('/path/to/background-image.jpg') no-repeat center center/cover
          `
        }}
      >
        <div className="container">
          <div 
            className="flex justify-center items-center" 
            style={{ minHeight: "40vh" }}
          >
            <div className="text-center">
              <div 
                className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin mx-auto mb-4"
                style={{ 
                  borderColor: themeColors.gold, 
                  borderTopColor: themeColors.darkGold 
                }}
              ></div>
              <p 
                className="text-lg" 
                style={{ color: themeColors.gold }}
              >
                Loading blogs...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show only 3 blogs for the featured section
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <section 
      className="py-12 md:py-24 px-6 md:px-36 relative" 
      style={{ 
        backgroundColor: themeColors.black,
        background: `
          linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)),
          url('/path/to/background-image.jpg') no-repeat center center/cover
        `,
        backgroundAttachment: 'fixed',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{ 
          backgroundImage: `
            linear-gradient(rgba(253, 185, 19, 0.1), rgba(253, 185, 19, 0.1)),
            url('/path/to/background-image.jpg')
          `,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Title */}
        <div className="w-full px-2 mb-10 text-center">
          <h1 
            className="font-bold text-2xl md:text-3xl lg:text-4xl mb-3 text-gold relative inline-block pb-2"
            style={{ color: themeColors.gold }}
          >
            Featured Blogs
            <span 
              className="absolute bottom-0 left-1/4 right-1/4 h-1 rounded-full" 
              style={{ backgroundColor: themeColors.gold }}
            ></span>
          </h1>
          <p 
            className="text-sm md:text-base max-w-2xl mx-auto mt-4"
            style={{ color: themeColors.darkGold }}
          >
            Discover some of our top blogs in Dholera. Exclusive opportunities await.
          </p>
        </div>

        {featuredBlogs.length > 0 ? (
          <div className="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 relative"
                style={{ 
                  backgroundColor: `${themeColors.black}E6`, 
                  border: `2px solid ${themeColors.gold}`,
                  backdropFilter: 'blur(10px)'
                }}
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
                  <div 
                    className="absolute inset-0 flex items-end opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(to top, ${themeColors.black}CC, transparent)` 
                    }}
                  >
                    <div className="p-4 text-white w-full">
                      <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Blog Content */}
                <div 
                  className="p-5" 
                  style={{ 
                    backgroundColor: `${themeColors.black}E6`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-3" 
                    style={{ color: themeColors.gold }}
                  >
                    {blog.title}
                  </h3>
                  <div 
                    className="text-sm mb-4 line-clamp-3" 
                    style={{ color: themeColors.darkGold }}
                  >
                    <PortableText value={blog.body} />
                  </div>
                  <Link href={`/post/${blog.slug?.current}`} passHref>
                    <button 
                      className="w-full px-4 py-2 rounded-md transition-all duration-300 hover:opacity-80"
                      style={{ 
                        backgroundColor: themeColors.gold, 
                        color: themeColors.black 
                      }}
                    >
                      View Blog
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NotFound />
        )}

        {/* Browse More Blogs Button */}
        {blogs.length > 3 && (
          <div className="mt-10 flex justify-center">
            <Link href="/post/blogs">
              <button 
                className="px-6 py-3 rounded-md transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: themeColors.gold,
                  color: themeColors.black,
                  boxShadow: `0 4px 0 ${themeColors.darkGold}` 
                }}
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