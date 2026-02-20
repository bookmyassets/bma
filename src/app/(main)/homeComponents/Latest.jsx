"use client";
import { getblogs, getUpdates } from "@/sanity/lib/api";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

// Related Blog Card Component
const RelatedBlogCard = ({ item, type }) => {
  const slug =
    type === "blog"
      ? `/dholera-sir-blogs/${item.slug?.current || "#"}`
      : `/dholera-sir-updates/${item.slug?.current || "#"}`;

  return (
    <div className="flex-shrink-0 w-56 md:w-72 mx-3 snap-center cursor-pointer transform transition-all duration-300 hover:scale-100 md:hover:scale-105 ">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative w-full h-36 md:h-48">
          {item.mainImage ? (
            <Image
              src={urlFor(item.mainImage)
                .width(1200)
                .height(800)
                .format("webp")
                .quality(60)
                .url()}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="aspect-video object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <Link href={slug} className="block">
            {/* Title */}
            <h3 className="text-base font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-[#deae3c] transition-colors duration-300">
              {item.title}
            </h3>

            {/* Meta info */}
            <div className="text-xs text-gray-500 mb-3">
              <time className="block mb-1">
                {new Date(
                  item.publishedAt || item._createdAt,
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="font-medium">BookMyAssets</span>
            </div>
            {/* 16/9 */}
            {/* CTA */}
            <span className="text-[#deae3c] hover:text-[#deae4c] text-sm font-medium inline-flex items-center group">
              Read More
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton component
const BlogSkeleton = () => (
  <div className="flex-shrink-0 w-64 md:w-80 mx-3 snap-center">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="w-full h-48 md:h-56 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function LatestUpdates() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const sliderRef = React.useRef(null);
  const autoPlayIntervalRef = React.useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);

        const [blogsData, updatesData] = await Promise.allSettled([
          getblogs(),
          getUpdates(),
        ]);

        const blogs = blogsData.status === "fulfilled" ? blogsData.value : [];
        const updates =
          updatesData.status === "fulfilled" ? updatesData.value : [];

        const combined = [];

        if (blogs && Array.isArray(blogs)) {
          blogs.forEach((post) => {
            if (post && post._id) {
              combined.push({
                ...post,
                type: "blog",
                author: post.author || "BookMyAssets",
                mainImage: post.mainImage || null,
                slug: post.slug || { current: "#" },
                publishedAt: post.publishedAt || post._createdAt,
              });
            }
          });
        }

        if (updates && Array.isArray(updates)) {
          updates.forEach((post) => {
            if (post && post._id) {
              combined.push({
                ...post,
                type: "update",
                author: post.author || "BookMyAssets",
                mainImage: post.mainImage || null,
                slug: post.slug || { current: "#" },
                publishedAt: post.publishedAt || post._createdAt,
              });
            }
          });
        }

        const latest4 = combined
          .filter((item) => item.publishedAt)
          .sort((a, b) => {
            const dateA = new Date(a.publishedAt);
            const dateB = new Date(b.publishedAt);
            return dateB - dateA;
          })
          .slice(0, 4);

        setContent(latest4);
      } catch (err) {
        setError(err.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Scroll to current index
  useEffect(() => {
    if (sliderRef.current && isClient) {
      const cardWidth = window.innerWidth < 768 ? 256 + 24 : 320 + 24;
      sliderRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex, isClient]);

  // Auto slide
  useEffect(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    if (!loading && content.length > 0) {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === content.length - 1 ? 0 : prev + 1));
      }, 4000);
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [loading, content.length]);

  const handleArrowClick = (direction) => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    if (direction === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? content.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === content.length - 1 ? 0 : prev + 1));
    }

    setTimeout(() => {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === content.length - 1 ? 0 : prev + 1));
      }, 4000);
    }, 10000);
  };

  const handleDotClick = (index) => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    setCurrentIndex(index);

    setTimeout(() => {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === content.length - 1 ? 0 : prev + 1));
      }, 4000);
    }, 10000);
  };

  if (error) {
    return (
      <div className="py-12 bg-white min-h-[480px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl md:text-4xl text-center font-bold text-gray-800 mb-4">
            Featured Content
          </p>
          <div className="text-center text-red-500">
            <p>Error loading content. Please try again later.</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-12 bg-white min-h-[480px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl md:text-4xl text-center font-bold text-gray-800 mb-4">
            Featured Content
          </p>
          <p className="text-gray-600 text-sm md:text-lg text-center mb-12 max-w-5xl mx-auto">
            Stay updated with the latest insights and developments from
            BookMyAssets
          </p>

          {/* Slider Container */}
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            >
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

            {/* Navigation Arrows */}
            {isClient && !loading && content.length > 0 && (
              <>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hidden md:flex items-center justify-center z-10 transition-all duration-300 hover:scale-110"
                  onClick={() => handleArrowClick("prev")}
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hidden md:flex items-center justify-center z-10 transition-all duration-300 hover:scale-110"
                  onClick={() => handleArrowClick("next")}
                  aria-label="Next slide"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {!loading && content.length > 0 && (
            <div className="flex justify-center mt-8 space-x-3">
              {content.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
