"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export default function BlogSlider({ posts = [] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardsPerPage = 3;
  const totalPages = Math.ceil(posts.length / cardsPerPage);

  // Auto-slide every 4 seconds - only on desktop
  useEffect(() => {
    if (isMobile || !isAutoPlaying || totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages, isMobile]);

  const goToPage = (page) => {
    setCurrentPage(page);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setIsAutoPlaying(false);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No blog posts available</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";

    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // For mobile: show all posts in a single column
  if (isMobile) {
    return (
      <div className="mb-8">
        {/* Mobile: Show all posts in a single column */}
        <div className="flex flex-col gap-6">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="transform hover:-translate-y-1 transition-all duration-300"
              style={{
                animation: `fadeIn 0.5s ease-in ${index * 0.1}s both`,
              }}
            >
              <Link
                href={
                  post.slug?.current
                    ? `/about-dholera-sir/${post.slug.current}`
                    : "#"
                }
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
                  {/* Blog Image */}
                  <div className="relative h-52">
                    {post.mainImage ? (
                      <Image
                        src={
                          urlFor(post.mainImage)
                            .width(1200)
                            .height(675)
                            .url() || "/placeholder.svg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-[#FDB913] to-[#C69C21]"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] line-clamp-2 transition-colors">
                      {post.title}
                    </h2>

                    {/* Footer with "Read More" */}
                    <div className="border-t border-gray-200 pt-4 mt-auto">
                      <div className="flex justify-between text-sm">
                        <p className="text-sm text-gray-400">
                          {formatDate(post.publishedAt || post._createdAt)}
                        </p>
                        <button className="font-medium hover:underline text-[#deae3c]">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  // Desktop: Show slider with 3 posts per page
  const currentPosts = posts.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage,
  );

  return (
    <div className="mb-8">
      <div className="relative">
        {/* Desktop Grid Container */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
          {currentPosts.map((post, index) => (
            <div
              key={post._id}
              className="transform hover:-translate-y-2 transition-all duration-300"
              style={{
                animation: `fadeIn 0.5s ease-in ${index * 0.1}s both`,
              }}
            >
              <Link
                href={
                  post.slug?.current
                    ? `/about-dholera-sir/${post.slug.current}`
                    : "#"
                }
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
                  {/* Blog Image */}
                  <div className="relative h-52">
                    {post.mainImage ? (
                      <Image
                        src={
                          urlFor(post.mainImage)
                            .width(1200)
                            .height(675)
                            .url() || "/placeholder.svg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-[#FDB913] to-[#C69C21]"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] line-clamp-2 transition-colors">
                      {post.title}
                    </h2>

                    {/* Footer with "Read More" */}
                    <div className="border-t border-gray-200 pt-4 mt-auto">
                      <div className="flex justify-between text-sm">
                        <p className="text-sm text-gray-400">
                          {formatDate(post.publishedAt || post._createdAt)}
                        </p>
                        <button className="font-medium hover:underline text-[#deae3c]">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Only show if more than one page */}
        {totalPages > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-[#deae3c] hover:text-white transition-all duration-300 z-10 hidden md:block"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-[#deae3c] hover:text-white transition-all duration-300 z-10 hidden md:block"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Controls - Only show if more than one page */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentPage
                    ? "bg-[#deae3c] w-8 h-2"
                    : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation Buttons (Hidden since we're not showing slider on mobile) */}
          <div className="flex gap-3 md:hidden">
            <button
              onClick={goToPrevious}
              className="bg-white rounded-full p-2 shadow-md hover:bg-[#deae3c] hover:text-white transition-all duration-300"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="bg-white rounded-full p-2 shadow-md hover:bg-[#deae3c] hover:text-white transition-all duration-300"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
