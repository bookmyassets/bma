import { getblogs } from "@/sanity/lib/api";
import Link from "next/link";
import { BookOpen, FileText, TriangleAlert } from "lucide-react";

import BlogCard from "./BlogCard";
import MobileBlogPagination from "./MobileBlogPagination";

export default async function Page() {
  let posts = [];
  let fetchError = false;

  try {
    const postsData = await getblogs();
    posts = Array.isArray(postsData) ? [...postsData] : [];

    const getPostDate = (post) => {
      const timestamp = Date.parse(
        post.publishedAt || post._createdAt || "",
      );

      return Number.isFinite(timestamp) ? timestamp : 0;
    };

    posts.sort((a, b) => getPostDate(b) - getPostDate(a));
  } catch (error) {
    fetchError = true;
    console.error("Error fetching blog posts:", error);
  }

  const safePosts = posts.map((post) => ({
    ...post,
    author:
      typeof post.author === "object" && post.author?.name
        ? post.author.name
        : typeof post.author === "string"
          ? post.author
          : "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: {
      current:
        typeof post.slug === "string"
          ? post.slug
          : post.slug?.current || "#",
    },
  }));

  return (
    <>
      <title>
        Dholera Smart City Blog | Investment Guides, News & Updates
      </title>

      <meta
        name="description"
        content="Expert Dholera SIR blogs on plot prices, investment strategy, infrastructure progress and buying guides, updated regularly by BookMyAssets."
      />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="BookMyAssets" />
      <meta name="publisher" content="BookMyAssets" />
      <link
        rel="canonical"
        href="https://www.bookmyassets.com/dholera-sir-blogs"
      />

      <div className="min-h-screen bg-black px-4 pb-10 pt-[88px] sm:px-6 lg:px-8 lg:pt-[102px]">
        <section
          aria-labelledby="bma-blogs-heading"
          className="mx-auto max-w-7xl"
        >
          {/* Compact Blog Banner */}
          <header className="group relative mb-6 mt-5 overflow-hidden rounded-[20px] border border-[#ddbc69]/25 bg-gradient-to-br from-[#15243b] via-[#183745] to-[#194a47] px-5 py-5 md:mb-8 md:px-8 md:py-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-[#ddbc69]/10 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#ddbc69]/70 to-transparent"
            />

            <div className="relative flex min-w-0 items-center gap-3 md:gap-5">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-[#ddbc69]/30 bg-[#ddbc69]/10 text-[#ddbc69] md:h-14 md:w-14 md:rounded-[16px]"
              >
                <BookOpen
                  strokeWidth={1.5}
                  className="h-6 w-6 transition-transform duration-300 group-hover:-rotate-6 motion-reduce:transform-none motion-reduce:transition-none md:h-7 md:w-7"
                />
              </span>

              <h1
                id="bma-blogs-heading"
                className="min-w-0 font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.035em] text-[#f4eee2] md:text-[40px]"
              >
                Dholera Smart City{" "}
                <span className="text-[#ddbc69]">Blogs</span>
              </h1>
            </div>
          </header>

          {safePosts.length > 0 ? (
            <MobileBlogPagination>
              {safePosts.map((post, index) => (
                <BlogCard
                  key={post._id || `${post.slug.current}-${index}`}
                  post={post}
                  isLatest={index === 0}
                />
              ))}
            </MobileBlogPagination>
          ) : (
            <div className="mx-auto max-w-2xl rounded-[20px] border border-white/10 bg-[#151514] px-6 py-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#ddbc69]/20 bg-[#ddbc69]/10 text-[#ddbc69]">
                {fetchError ? (
                  <TriangleAlert
                    size={25}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ) : (
                  <FileText
                    size={25}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                )}
              </div>

              <h2 className="font-playfair-display text-[26px] leading-tight text-[#f4eee2] md:text-[30px]">
                {fetchError
                  ? "Unable to Load Blogs"
                  : "Expert Content Coming Soon!"}
              </h2>

              <p className="mt-4 text-[15px] leading-[1.8] text-[#bcbab3] md:text-[18px]">
                {fetchError
                  ? "We're experiencing some technical difficulties loading the blog posts. Please try refreshing the page or contact support if the issue persists."
                  : "We're preparing comprehensive investment guides, market analysis, and expert insights about Dholera SIR opportunities. Stay tuned!"}
              </p>

              <Link
                href="/dholera-residential-plots"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#ddbc69] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#ecd18b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69]"
              >
                Explore Projects
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
}