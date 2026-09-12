"use client";

import { getblogs, getUpdates } from "@/sanity/lib/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

const RelatedBlogCard = ({ item, type }) => {
  const slug =
    type === "blog"
      ? `/dholera-sir-blogs/${item.slug?.current || "#"}`
      : `/dholera-sir-updates/${item.slug?.current || "#"}`;

  return (
    <div
      data-slider-card="true"
      className="flex-shrink-0 w-56 mx-3 snap-center cursor-pointer transform transition-all duration-300 md:w-72 md:mx-0 md:hover:scale-[1.03]"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        {/* Image */}
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
              sizes="(max-width: 768px) 56vw, 288px"
              loading="lazy"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-[0.875rem] font-normal leading-[1.5]">
                No image
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-[calc(0.75rem+0.25vw)]">
          <Link href={slug} className="block">
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

            <span className="text-[#ddbc69] text-[0.875rem] font-normal leading-[1.5] inline-flex items-center group">
              Explore More

              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
  <div
    data-slider-card="true"
    className="flex-shrink-0 w-56 mx-3 snap-center md:w-72 md:mx-0"
  >
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

  const sliderRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);
  const restartTimeoutRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  /* ==========================================================
     FETCH BLOGS + UPDATES
  ========================================================== */
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);

        const [blogsData, updatesData] = await Promise.allSettled([
          getblogs(),
          getUpdates(),
        ]);

        const blogs =
          blogsData.status === "fulfilled" ? blogsData.value : [];

        const updates =
          updatesData.status === "fulfilled" ? updatesData.value : [];

        const combined = [];

        if (Array.isArray(blogs)) {
          blogs.forEach((post) => {
            if (!post?._id) return;

            combined.push({
              ...post,
              type: "blog",
              author: post.author || "BookMyAssets",
              mainImage: post.mainImage || null,
              slug: post.slug || { current: "#" },
              publishedAt: post.publishedAt || post._createdAt,
            });
          });
        }

        if (Array.isArray(updates)) {
          updates.forEach((post) => {
            if (!post?._id) return;

            combined.push({
              ...post,
              type: "update",
              author: post.author || "BookMyAssets",
              mainImage: post.mainImage || null,
              slug: post.slug || { current: "#" },
              publishedAt: post.publishedAt || post._createdAt,
            });
          });
        }

        const sortedContent = combined
          .filter((item) => item.publishedAt)
          .sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime(),
          )
          .slice(0, 4);

        setContent(sortedContent);
      } catch (err) {
        console.error("Failed to fetch latest content:", err);

        setError(err?.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  /* ==========================================================
     SCROLL TO ACTIVE CARD

     MOBILE:
     Original behaviour retained.

     DESKTOP:
     Reads actual card offset so CSS gap can change safely.
  ========================================================== */
  useEffect(() => {
    if (!isClient || !sliderRef.current) return;

    const slider = sliderRef.current;

    if (window.innerWidth < 768) {
      const mobileCardWidth = 224 + 24;

      slider.scrollTo({
        left: currentIndex * mobileCardWidth,
        behavior: "smooth",
      });

      return;
    }

    const cards = slider.querySelectorAll('[data-slider-card="true"]');
    const selectedCard = cards[currentIndex];

    if (!selectedCard) return;

    slider.scrollTo({
      left: selectedCard.offsetLeft,
      behavior: "smooth",
    });
  }, [currentIndex, isClient]);

  /* ==========================================================
     AUTOPLAY
  ========================================================== */
  const startAutoplay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    if (content.length <= 1) return;

    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= content.length - 1 ? 0 : prev + 1,
      );
    }, 4000);
  };

  useEffect(() => {
    if (!loading && content.length > 1) {
      startAutoplay();
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }

      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [loading, content.length]);

  /* ==========================================================
     ARROW CLICK
  ========================================================== */
  const handleArrowClick = (direction) => {
    if (!content.length) return;

    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }

    setCurrentIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? content.length - 1 : prev - 1;
      }

      return prev === content.length - 1 ? 0 : prev + 1;
    });

    restartTimeoutRef.current = setTimeout(() => {
      startAutoplay();
    }, 10000);
  };

  /* ==========================================================
     ERROR STATE
  ========================================================== */
  if (error) {
    return (
      <div className="py-[clamp(2rem,5vw,3.5rem)] bg-white min-h-[480px]">
        <div className="max-w-7xl mx-auto px-[calc(1rem+2vw)]">
          <p className="text-[clamp(1.5rem,3vw,2.25rem)] text-center font-semibold leading-[1.2] text-gray-800 mb-4">
            Everything about Dholera Smart City
          </p>

          <p className="text-[0.875rem] text-center font-normal leading-[1.5] text-gray-800 mb-4">
            Stay updated with the latest developments, project updates,
            Dholera plots for sale, and important insights from Dholera Smart
            City.
          </p>

          <div className="text-center text-red-500">
            <p>Error loading content. Please try again later.</p>

            <p className="text-[0.875rem] font-normal leading-[1.5]">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-[calc(2rem+2vw)] bg-black min-h-[480px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-[calc(1rem+2vw)]">
          {/* Heading */}
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] text-center font-semibold leading-[1.2] text-white mb-4">
            Dholera Smart City
            <br />
            Updates & Blogs
          </h2>

          {/* Description */}
          <p className="text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7] text-white text-center mb-8 max-w-5xl mx-auto">
            Stay updated with{" "}
            <Link
              href="/dholera-sir-updates"
              className="transition-colors hover:text-[#ddbc69]"
            >
              Dholera latest developments
            </Link>
            .
          </p>

          {/* ======================================================
              CAROUSEL WRAPPER

              Mobile:
              No extra arrow gutters.

              Desktop:
              Dedicated space left/right for navigation.
          ====================================================== */}
          <div className="relative md:px-14 lg:px-16">
            {/* Slider */}
            <div
              ref={sliderRef}
              className="relative flex snap-x snap-mandatory overflow-x-auto pb-6 scrollbar-hide md:gap-8 lg:gap-10 xl:gap-12"
            >
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <BlogSkeleton key={`skeleton-${index}`} />
                ))
              ) : content.length > 0 ? (
                content.map((item) => (
                  <RelatedBlogCard
                    key={`${item.type}-${item._id}`}
                    item={item}
                    type={item.type}
                  />
                ))
              ) : (
                Array.from({ length: 4 }).map((_, index) => (
                  <BlogSkeleton key={`fallback-${index}`} />
                ))
              )}
            </div>

            {/* ======================================================
                DESKTOP NAVIGATION ARROWS
            ====================================================== */}
            {isClient && !loading && content.length > 1 && (
              <>
                {/* Previous */}
                <button
                  type="button"
                  onClick={() => handleArrowClick("prev")}
                  aria-label="Previous slide"
                  className="absolute left-1 lg:left-2 top-1/2 -translate-y-1/2 hidden md:flex w-11 h-11 items-center justify-center rounded-full bg-white text-gray-800 shadow-[0_6px_25px_rgba(0,0,0,0.25)] z-20 transition-all duration-300 hover:scale-110 hover:bg-[#ddbc69] hover:text-black"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={() => handleArrowClick("next")}
                  aria-label="Next slide"
                  className="absolute right-1 lg:right-2 top-1/2 -translate-y-1/2 hidden md:flex w-11 h-11 items-center justify-center rounded-full bg-white text-gray-800 shadow-[0_6px_25px_rgba(0,0,0,0.25)] z-20 transition-all duration-300 hover:scale-110 hover:bg-[#ddbc69] hover:text-black"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
      </section>

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