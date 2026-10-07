import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import { urlFor } from "@/sanity/lib/image";
import { getVisibleBlogDate } from "@/lib/blogDates";
import { getReadingTime } from "@/lib/blogReadingTime";

export default function BlogCard({ post, featured = false, isLatest = false }) {
  const visibleDate = getVisibleBlogDate(post);
  const readingTime = getReadingTime(post.body);
  const slug = post.slug?.current;
  const hasSlug = Boolean(slug && slug !== "#");

  const authorName =
    typeof post.author === "string"
      ? post.author
      : post.author?.name || "BookMyAssets";

  const excerpt = typeof post.excerpt === "string" ? post.excerpt.trim() : "";

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage)
        .width(featured ? 1200 : 480)
        .height(featured ? 675 : 360)
        .fit("crop")
        .auto("format")
        .quality(80)
        .url()
    : null;

  const image = imageUrl ? (
    <Image
      src={imageUrl}
      alt={post.mainImage?.alt || ""}
      fill
      sizes={
        featured
          ? "(max-width: 767px) 100vw, 720px"
          : "(max-width: 639px) 96px, (max-width: 767px) 112px, (max-width: 1023px) 150px, 160px"
      }
      className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
    />
  ) : (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-br from-[#183745] to-[#34545e]"
    />
  );

  const readingTimeBadge = (
    <span
      className={`absolute top-1.5 left-1.5 z-10 whitespace-nowrap rounded-full border border-white/20 bg-black/80 px-2 py-1 text-[10px] font-semibold leading-tight text-white shadow-sm backdrop-blur-sm md:text-[11px] ${featured ? "sm:top-3 sm:left-3 sm:px-3 sm:py-1.5" : ""}`}
      aria-label={`Estimated reading time ${readingTime} minutes`}
    >
      <span className="text-[#ddbc69]">{readingTime}</span> min read
    </span>
  );

  const date = (
    <div className="flex items-start gap-2 text-[16px] leading-relaxed text-[#a6afb8] lg:text-[18px]">
      <CalendarDays
        size={18}
        strokeWidth={1.5}
        aria-hidden="true"
        className="mt-1 shrink-0 text-[#ddbc69]/70"
      />
      <p>
        {visibleDate?.wasModified && (
          <span className="text-[#ddbc69]">Updated: </span>
        )}
        {visibleDate?.formatted || "Date not available"}
      </p>
    </div>
  );

  const content = featured ? (
    <article className="grid overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-[#15243b] to-[#11282d] md:grid-cols-[1.15fr_0.85fr]">
      <div className="relative aspect-video overflow-hidden bg-[#17263b] md:aspect-auto md:min-h-[300px]">
        {image}
        {readingTimeBadge}
      </div>

      <div className="flex min-w-0 flex-col items-start p-5 md:p-7 lg:p-8">
        {isLatest && (
          <span className="mb-4 rounded-full border border-[#ddbc69]/25 bg-[#ddbc69]/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#ddbc69]">
            Latest article
          </span>
        )}

        <h2 className="text-[22px] font-semibold leading-[1.35] tracking-[-0.025em] text-[#f4eee2] transition-colors group-hover:text-[#ddbc69] md:text-[28px]">
          {post.title}
        </h2>

        {excerpt && (
          <p className="mt-3 line-clamp-3 text-[15px] leading-[1.8] text-[#b8c3cc] md:text-[18px]">
            {excerpt}
          </p>
        )}

        <div className="mt-auto w-full pt-5">
          <p className="mb-2 text-xs text-[#bdc6cd]">By {authorName}</p>

          {date}

          {hasSlug && (
            <span className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#ddbc69] px-4 py-2 text-[16px] font-semibold text-[#18232c] lg:text-[18px]">
              Read article
              <ArrowUpRight
                size={17}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </span>
          )}
        </div>
      </div>
    </article>
  ) : (
    <article className="flex h-full min-w-0 items-stretch gap-4 border-b border-white/10 py-6 lg:gap-5 lg:py-8">
      <div className="relative min-h-[100px] w-[96px] shrink-0 self-stretch overflow-hidden rounded-[12px] bg-[#17263b] sm:w-[112px] md:min-h-[120px] md:w-[150px] lg:w-[160px]">
        {image}
        {readingTimeBadge}
      </div>

      <div className="flex min-w-0 flex-1 flex-col self-stretch">
        <h2 className="text-[16px] font-semibold leading-[1.45] tracking-[-0.015em] text-[#eeeae2] transition-colors group-hover:text-[#ddbc69] motion-reduce:transition-none lg:text-[18px]">
          {post.title}
        </h2>

        <div className="mt-auto pt-3">
          {date}

          {hasSlug && (
            <span className="mt-2 inline-flex items-center gap-1.5 text-[16px] font-medium leading-relaxed text-[#ddbc69] lg:text-[18px]">
              Read article
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (!hasSlug) {
    return <div className="h-full min-w-0">{content}</div>;
  }

  return (
    <Link
      href={`/dholera-sir-blogs/${slug}`}
      className={`group block h-full min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69] ${
        featured ? "rounded-[20px]" : "rounded-sm"
      }`}
    >
      {content}
    </Link>
  );
}
