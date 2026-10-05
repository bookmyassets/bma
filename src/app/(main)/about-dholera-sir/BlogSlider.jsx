"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export default function BlogSlider({ posts = [] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardsPerPage = isMobile ? 1 : 3;

  const totalPages = Math.ceil(posts.length / cardsPerPage);

  useEffect(() => {
    if (!isAutoPlaying || totalPages <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4500);

    return () => window.clearInterval(interval);
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

  const formatDate = (dateString) => {
    if (!dateString) return null;

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const currentPosts = useMemo(
    () =>
      posts.slice(
        currentPage * cardsPerPage,
        (currentPage + 1) * cardsPerPage,
      ),
    [posts, currentPage, cardsPerPage],
  );

  if (posts.length === 0) {
    return (
      <div
        className="
          rounded-[22px]
          border
          border-white/[0.08]
          bg-[#101010]/60
          py-12
          text-center
        "
      >
        <p className="text-white/50">
          No project stories available
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ========================================================== */}
      {/* TOP CONTROL BAR                                           */}
      {/* ========================================================== */}

      <div
        className="
          mb-6
          flex
          items-end
          justify-between
          gap-5

          lg:mb-8
        "
      >

        {totalPages > 1 && (
          <div
            className="
              hidden
              items-center
              gap-2

              md:flex
            "
          >
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous projects"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.10]
                bg-white/[0.03]
                text-white/65
                transition-all

                hover:border-[#ddbc69]/40
                hover:bg-[#ddbc69]/[0.08]
                hover:text-[#ddbc69]
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next projects"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[#ddbc69]/35
                bg-[#ddbc69]/10
                text-[#ddbc69]
                transition-all

                hover:bg-[#ddbc69]
                hover:text-[#101010]
              "
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* ========================================================== */}
      {/* DESKTOP EDITORIAL LAYOUT                                  */}
      {/* ========================================================== */}

      <div className="hidden md:grid md:grid-cols-[1.35fr_0.65fr] md:gap-5">
        {currentPosts.length > 0 && (
          <ProjectFeatureCard
            post={currentPosts[0]}
            formatDate={formatDate}
          />
        )}

        <div className="grid gap-5">
          {currentPosts.slice(1, 3).map((post) => (
            <ProjectCompactCard
              key={post._id}
              post={post}
              formatDate={formatDate}
            />
          ))}
        </div>
      </div>

      {/* ========================================================== */}
      {/* MOBILE                                                    */}
      {/* ========================================================== */}

      <div className="md:hidden">
        {currentPosts.map((post) => (
          <ProjectMobileCard
            key={post._id}
            post={post}
            formatDate={formatDate}
          />
        ))}
      </div>

      {/* ========================================================== */}
      {/* PAGINATION                                                */}
      {/* ========================================================== */}

      {totalPages > 1 && (
        <div
          className="
            mt-6
            flex
            items-center
            justify-between

            md:justify-center
          "
        >
          {/* MOBILE ARROWS */}
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous project"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.10]
              text-white/65

              md:hidden
            "
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* DOTS */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToPage(index)}
                aria-label={`Go to project page ${index + 1}`}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    index === currentPage
                      ? "w-8 bg-[#ddbc69]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }
                `}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next project"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#ddbc69]/30
              bg-[#ddbc69]/10
              text-[#ddbc69]

              md:hidden
            "
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/* FEATURE CARD                                                               */
/* ========================================================================== */

function ProjectFeatureCard({ post, formatDate }) {
  const date = formatDate(post.publishedAt || post._createdAt);

  return (
    <Link
      href={
        post.slug?.current
          ? `/about-dholera-sir/${post.slug.current}`
          : "#"
      }
      className="
        group
        relative
        min-h-[430px]
        overflow-hidden
        rounded-[24px]
        border
        border-white/[0.08]
        bg-[#101010]
      "
    >
      {post.mainImage ? (
        <Image
          src={
            urlFor(post.mainImage)
              .width(1400)
              .height(900)
              .url() || "/placeholder.svg"
          }
          alt={post.mainImage?.alt || post.title}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            ease-out

            group-hover:scale-[1.035]
          "
          sizes="(min-width: 768px) 65vw, 100vw"
        />
      ) : (
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(221,188,105,0.22),transparent_38%),linear-gradient(135deg,#24231f,#101010)]
          "
        />
      )}

      {/* IMAGE OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/40
          to-black/10
        "
      />

      {/* TOP BADGE */}
      <div
        className="
          absolute
          left-5
          top-5
          rounded-full
          border
          border-[#ddbc69]/30
          bg-black/45
          px-3
          py-1.5
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-[#ddbc69]
          backdrop-blur-md
        "
      >
        Mega Project
      </div>

      {/* CONTENT */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-6

          lg:p-7
        "
      >
        {date && (
          <div
            className="
              mb-3
              flex
              items-center
              gap-2
              text-[12px]
              text-white/45
            "
          >
            <CalendarDays className="h-3.5 w-3.5" />

            {date}
          </div>
        )}

        <h3
          className="
            max-w-xl
            font-serif
            text-[28px]
            font-medium
            leading-[1.12]
            tracking-[-0.025em]
            text-white

            lg:text-[32px]
          "
        >
          {post.title}
        </h3>

        <div
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            text-[14px]
            font-semibold
            text-[#ddbc69]
          "
        >
          Explore Project

          <ArrowUpRight
            className="
              h-4
              w-4
              transition-transform
              duration-300

              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </div>
      </div>
    </Link>
  );
}

/* ========================================================================== */
/* COMPACT CARD                                                               */
/* ========================================================================== */

function ProjectCompactCard({ post, formatDate }) {
  const date = formatDate(post.publishedAt || post._createdAt);

  return (
    <Link
      href={
        post.slug?.current
          ? `/about-dholera-sir/${post.slug.current}`
          : "#"
      }
      className="
        group
        grid
        min-h-[205px]
        grid-cols-[0.92fr_1.08fr]
        overflow-hidden
        rounded-[20px]
        border
        border-white/[0.08]
        bg-[#101010]
        transition-all
        duration-300

        hover:border-[#ddbc69]/30
        hover:bg-[#121212]
      "
    >
      <div className="relative min-h-[205px] overflow-hidden">
        {post.mainImage ? (
          <Image
            src={
              urlFor(post.mainImage)
                .width(700)
                .height(700)
                .url() || "/placeholder.svg"
            }
            alt={post.mainImage?.alt || post.title}
            fill
            className="
              object-cover
              transition-transform
              duration-700

              group-hover:scale-105
            "
            sizes="30vw"
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top_right,rgba(221,188,105,0.22),transparent_40%),linear-gradient(135deg,#24231f,#101010)]
            "
          />
        )}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-transparent
            to-[#101010]/35
          "
        />
      </div>

      <div
        className="
          flex
          flex-col
          justify-between
          p-5
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#ddbc69]
            "
          >
            Mega Project
          </p>

          <h3
            className="
              mt-3
              line-clamp-3
              text-[18px]
              font-semibold
              leading-[1.35]
              text-[#f5f1e8]
            "
          >
            {post.title}
          </h3>

          {date && (
            <p
              className="
                mt-3
                text-[12px]
                text-white/35
              "
            >
              {date}
            </p>
          )}
        </div>

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            border-t
            border-white/[0.07]
            pt-4
          "
        >
          <span
            className="
              text-[13px]
              font-semibold
              text-[#ddbc69]
            "
          >
            Explore
          </span>

          <ArrowUpRight
            className="
              h-4
              w-4
              text-[#ddbc69]
              transition-transform
              duration-300

              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </div>
      </div>
    </Link>
  );
}

/* ========================================================================== */
/* MOBILE CARD                                                                */
/* ========================================================================== */

function ProjectMobileCard({ post, formatDate }) {
  const date = formatDate(post.publishedAt || post._createdAt);

  return (
    <Link
      href={
        post.slug?.current
          ? `/about-dholera-sir/${post.slug.current}`
          : "#"
      }
      className="
        group
        block
        overflow-hidden
        rounded-[20px]
        border
        border-white/[0.08]
        bg-[#101010]
      "
    >
      <div
        className="
          relative
          aspect-[1.35/1]
          overflow-hidden
        "
      >
        {post.mainImage ? (
          <Image
            src={
              urlFor(post.mainImage)
                .width(900)
                .height(650)
                .url() || "/placeholder.svg"
            }
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top_right,rgba(221,188,105,0.25),transparent_40%),linear-gradient(135deg,#24231f,#101010)]
            "
          />
        )}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/65
            to-transparent
          "
        />

        <span
          className="
            absolute
            bottom-4
            left-4
            rounded-full
            border
            border-[#ddbc69]/30
            bg-black/50
            px-3
            py-1.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.17em]
            text-[#ddbc69]
            backdrop-blur-md
          "
        >
          Mega Project
        </span>
      </div>

      <div className="p-5">
        {date && (
          <p
            className="
              text-[12px]
              text-white/35
            "
          >
            {date}
          </p>
        )}

        <h3
          className="
            mt-2
            line-clamp-2
            font-serif
            text-[22px]
            font-medium
            leading-[1.2]
            text-[#f5f1e8]
          "
        >
          {post.title}
        </h3>

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            border-t
            border-white/[0.07]
            pt-4
          "
        >
          <span
            className="
              text-[14px]
              font-semibold
              text-[#ddbc69]
            "
          >
            Explore Project
          </span>

          <ArrowUpRight
            className="h-4 w-4 text-[#ddbc69]"
          />
        </div>
      </div>
    </Link>
  );
}