"use client";
import { getblogs, getUpdates } from "@/sanity/lib/api";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

// Related Blog Card Component
const RelatedBlogCard = ({ item, type }) => {
  const slug = type === 'blog' 
    ? `/dholera-sir-blogs/${item.slug?.current || '#'}`
    : `/dholera-sir-updates/${item.slug?.current || '#'}`;

  return (
    <div className="bg-white rounded-lg shadow-2xl  overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105 md:flex-col">
      {/* Mobile: Horizontal Layout | Desktop: Vertical Layout */}
      <div className="flex flex-row md:flex-col h-full">
        {/* Image */}
        <div className="relative w-32 h-32 md:w-full md:h-64 flex-shrink-0">
          {item.mainImage ? (
            <Image
              src={`${urlFor(item.mainImage).url()}`}
              alt={item.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs md:text-base">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow max-sm:w-32 max-sm:h-32">
          <Link
            href={slug}
            className="w-full px-4 py-2 transition-all font-semibold border-white hover:bg-[#deae3c] bg-black hover:text-black text-lg md:text-base text-[#deae3c] h-full flex flex-col justify-between space-y-2 md:space-y-3"
          >
            {/* Title */}
            <h3 className="text-base md:text-xl font-semibold line-clamp-2 md:line-clamp-2 md:h-14">
              {item.title}
            </h3>

            {/* Meta info */}
            <div className="text-xs md:text-sm text-gray-400">
              <time>
                {new Date(item.publishedAt || item._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <div>
                <span className="font-medium text-white">BookMyAssets</span>
              </div>
            </div>

            {/* CTA */}
            <div className="underline underline-offset-4 text-sm md:text-lg">
              Read More
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton component
const BlogSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
    {/* Mobile: Horizontal | Desktop: Vertical */}
    <div className="flex flex-row md:flex-col">
      <div className="w-32 h-32 md:w-full md:h-48 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse flex-shrink-0"></div>
      <div className="p-4 md:p-6 flex-grow">
        <div className="h-3 md:h-4 bg-gray-200 rounded w-1/4 mb-2 md:mb-3 animate-pulse"></div>
        <div className="h-4 md:h-6 bg-gray-200 rounded w-3/4 mb-2 md:mb-3 animate-pulse"></div>
        <div className="h-3 md:h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-3 md:h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function LatestUpdates() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch both blogs and updates in parallel
        const [blogsData, updatesData] = await Promise.allSettled([
          getblogs(),
          getUpdates()
        ]);

        // Handle the results
        const blogs = blogsData.status === 'fulfilled' ? blogsData.value : [];
        const updates = updatesData.status === 'fulfilled' ? updatesData.value : [];

        console.log("Blogs fetched:", blogs?.length || 0);
        console.log("Updates fetched:", updates?.length || 0);

        // Normalize and combine data
        const combined = [];

        // Add blogs with type identifier
        if (blogs && Array.isArray(blogs)) {
          blogs.forEach(post => {
            if (post && post._id) {
              combined.push({
                ...post,
                type: 'blog',
                author: post.author || "BookMyAssets",
                mainImage: post.mainImage || null,
                slug: post.slug || { current: "#" },
                publishedAt: post.publishedAt || post._createdAt,
              });
            }
          });
        }

        // Add updates with type identifier
        if (updates && Array.isArray(updates)) {
          updates.forEach(post => {
            if (post && post._id) {
              combined.push({
                ...post,
                type: 'update',
                author: post.author || "BookMyAssets",
                mainImage: post.mainImage || null,
                slug: post.slug || { current: "#" },
                publishedAt: post.publishedAt || post._createdAt,
              });
            }
          });
        }

        console.log("Combined content:", combined.length);

        // Sort by date (most recent first) and take only 4
        const latest4 = combined
          .filter(item => item.publishedAt) // Filter out items without dates
          .sort((a, b) => {
            const dateA = new Date(a.publishedAt);
            const dateB = new Date(b.publishedAt);
            return dateB - dateA; // Most recent first
          })
          .slice(0, 4);

        console.log("Latest 4 items:", latest4.map(item => ({
          title: item.title,
          type: item.type,
          date: item.publishedAt,
          id: item._id
        })));

        setContent(latest4);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-4 md:py-16 px-4">
        <p className="text-[28px] font-semibold mb-6">Featured Content</p>
        <div className="text-center text-red-500">
          <p>Error loading content. Please try again later.</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-4 md:py-16 px-4">
      <p className="text-[28px] font-semibold mb-6 text-center">
        Featured Content
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => <BlogSkeleton key={i} />)
          : content.length > 0
            ? content.map((item) => (
                <RelatedBlogCard 
                  key={`${item.type}-${item._id}`} 
                  item={item} 
                  type={item.type} 
                />
              ))
            : Array(4)
                .fill(0)
                .map((_, i) => <BlogSkeleton key={i} />)}
      </div>
    </div>
  );
}