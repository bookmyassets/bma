"use client";
import { getblogs, getUpdates } from "@/sanity/lib/api";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

const RelatedBlogCard = ({ item, type }) => {
  const slug =
    type === "blog"
      ? `/dholera-sir-blogs/${item.slug?.current || "#"}`
      : `/dholera-sir-updates/${item.slug?.current || "#"}`;

  return (
    <div className="flex-shrink-0 w-56 md:w-72 mx-3 snap-center cursor-pointer transform transition-all duration-300 hover:scale-100 md:hover:scale-105">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        {/* ✅ responsive image — aspect-video container + fill replaces fixed h-36/h-48 */}
        <div className="relative w-full aspect-video">
          {item.mainImage ? (
            <Image
              src={urlFor(item.mainImage)
                .width(1200)
                .height(800)
                .format("webp")
                .quality(60)
                .url()}
              alt={item.mainImage?.alt || item.title || "Blog post image"}
              fill
              sizes="(max-width: 768px) 56vw, 72vw"
              loading="lazy"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-[0.875rem] font-normal leading-[1.5]">No image</span>
            </div>
          )}
        </div>

        {/* ✅ calc() — card padding breathes with viewport */}
        <div className="p-[calc(0.75rem+0.25vw)]">
          <Link href={slug} className="block">
            {/* ✅ clamp() — title scales between 13px and 16px */}
            <h3 className="text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.35] text-gray-800 line-clamp-2 mb-2 hover:text-[#ddbc69] transition-colors duration-300">
              {item.title}
            </h3>

            <div className="text-[0.875rem] font-normal leading-[1.5] text-black mb-3">
              <time className="block mb-1">
                {new Date(
                  item.publishedAt || item._createdAt,
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>

            <span className="text-[#ddbc69] hover:text-[#ddbc69] text-[0.875rem] font-normal leading-[1.5] inline-flex items-center group">
              Explore More
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

const BlogSkeleton = () => (
  <div className="flex-shrink-0 w-56 md:w-72 mx-3 snap-center">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="w-full aspect-video bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
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
        if (Array.isArray(blogs))
          blogs.forEach((p) => {
            if (p?._id)
              combined.push({
                ...p,
                type: "blog",
                author: p.author || "BookMyAssets",
                mainImage: p.mainImage || null,
                slug: p.slug || { current: "#" },
                publishedAt: p.publishedAt || p._createdAt,
              });
          });
        if (Array.isArray(updates))
          updates.forEach((p) => {
            if (p?._id)
              combined.push({
                ...p,
                type: "update",
                author: p.author || "BookMyAssets",
                mainImage: p.mainImage || null,
                slug: p.slug || { current: "#" },
                publishedAt: p.publishedAt || p._createdAt,
              });
          });

        setContent(
          combined
            .filter((i) => i.publishedAt)
            .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            .slice(0, 4),
        );
      } catch (err) {
        setError(err.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    if (sliderRef.current && isClient) {
      const cardWidth = window.innerWidth < 768 ? 224 + 24 : 288 + 24; // matches w-56/w-72 + mx-3*2
      sliderRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex, isClient]);

  const startAutoplay = () => {
    clearInterval(autoPlayIntervalRef.current);
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === content.length - 1 ? 0 : prev + 1));
    }, 4000);
  };

  useEffect(() => {
    if (!loading && content.length > 0) startAutoplay();
    return () => clearInterval(autoPlayIntervalRef.current);
  }, [loading, content.length]);

  const handleArrowClick = (direction) => {
    clearInterval(autoPlayIntervalRef.current);
    setCurrentIndex((prev) =>
      direction === "prev"
        ? prev === 0
          ? content.length - 1
          : prev - 1
        : prev === content.length - 1
          ? 0
          : prev + 1,
    );
    setTimeout(startAutoplay, 10000);
  };

  const handleDotClick = (index) => {
    clearInterval(autoPlayIntervalRef.current);
    setCurrentIndex(index);
    setTimeout(startAutoplay, 10000);
  };

  if (error) {
    return (
      <div className="py-[clamp(2rem,5vw,3.5rem)] bg-white min-h-[480px]">
        <div className="max-w-7xl mx-auto px-[calc(1rem+2vw)]">
          <p className="text-[clamp(1.5rem,3vw,2.25rem)] text-center font-semibold leading-[1.2] text-gray-800 mb-4">
            Everything about Dholera Smart City
          </p>
          <p className="text-[0.875rem] text-center font-normal leading-[1.5] text-gray-800 mb-4">
            Stay updated with the latest developments, project updates, dholera
            plots for sale, and important insights from Dholera Smart City.
          </p>
          <div className="text-center text-red-500">
            <p>Error loading content. Please try again later.</p>
            <p className="text-[0.875rem] font-normal leading-[1.5]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ calc() — section padding scales with viewport */}
      <div className="py-[calc(2rem+2vw)] bg-black min-h-[480px]">
        <div className="max-w-7xl mx-auto px-[calc(1rem+2vw)]">
          {/* ✅ clamp() — section heading scales between 20px and 36px */}
          <p className="text-[clamp(1.5rem,3vw,2.25rem)] text-center font-semibold leading-[1.2] text-white mb-4">
            Dholera Smart City Updates & Blogs
          </p>
          {/* ✅ clamp() — subheading scales between 14px and 18px */}
          <p className="text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7] text-white text-center mb-8 max-w-5xl mx-auto">
            Stay updated with the latest developments, project updates and
            important investment insights from Dholera Smart City.
          </p>

          {/* Slider */}
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

            {/* Nav arrows */}
            {isClient && !loading && content.length > 0 && (
              <>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hidden md:flex items-center justify-center z-10 transition-all duration-300 hover:scale-110"
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hidden md:flex items-center justify-center z-10 transition-all duration-300 hover:scale-110"
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
        </div>
      </div>

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

