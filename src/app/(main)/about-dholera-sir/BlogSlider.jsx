"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export default function BlogSlider({ posts = [] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cardsPerPage = 3;
  const totalPages = Math.ceil(posts.length / cardsPerPage);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying || totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

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

  const currentPosts = posts.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <div className="mb-8">
      <div className="relative">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentPosts.map((post, index) => (
            <div
              key={post._id}
              className="transform hover:-translate-y-2 transition-all duration-300"
              style={{
                animation: `fadeIn 0.5s ease-in ${index * 0.1}s both`,
              }}
            >
              <Link
                href={`/about-dholera-sir/${post.slug.current}`}
                className="group block h-full"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 border border-gray-200">
                  {/* Blog Post Image */}
                  <div className="relative h-52">
                    {post.mainImage ? (
                      <Image
                        src={
                          urlFor(post.mainImage)
                            .width(1200)
                            .height(400)
                            .url() || "/placeholder.svg"
                        }
                        alt={post.title || "Blog post"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-[#FDB913] to-[#C69C21] flex items-center justify-center">
                        <span className="text-white text-4xl font-bold opacity-20">
                          BMA
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="border-t border-gray-200 pt-4 mt-auto">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#FDB913] mr-2"></span>
                          <span className="text-black font-medium">
                            Read More
                          </span>
                        </div>
                        <span className="text-[#C69C21] font-medium group-hover:translate-x-1 transition-transform inline-block">
                          &rarr;
                        </span>
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
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-[#deae3c] hover:text-white transition-all duration-300 z-10 hidden lg:block"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-[#deae3c] hover:text-white transition-all duration-300 z-10 hidden lg:block"
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

          {/* Mobile Navigation Buttons */}
          <div className="flex gap-3 lg:hidden">
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
