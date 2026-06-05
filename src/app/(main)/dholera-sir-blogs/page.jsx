import { getblogs } from "@/sanity/lib/api";
import React from "react";
import BlogCard from "./BlogCard";
import MobileBlogPagination from "./MobileBlogPagination";
import BlogHeroCarousel from "./BlogHeroCarousel";

export default async function page() {
  let posts = [];
  let fetchError = null;

  try {
    const postsData = await getblogs();
    posts = Array.isArray(postsData) ? postsData : [];

    // Sort by publishedAt date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a._createdAt || 0);
      const dateB = new Date(b.publishedAt || b._createdAt || 0);
      return dateB - dateA; // Descending order (newest first)
    });

    console.log("Posts data fetched:", posts.length);
  } catch (error) {
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
    authorImage:
      typeof post.author === "object" && post.author?.image
        ? post.author.image
        : null,
    mainImage: post.mainImage || null,
    slug: post.slug?.current
      ? { current: post.slug.current }
      : { current: "#" },
  }));

  return (
    <>
      <title>
        Dholera Smart City Blogs, News, Plot Guides & Investment Updates
      </title>
      <meta
        name="description"
        content="Read Dholera Smart City blogs, plot buying guides, price insights, and investor-focused analysis from BookMyAssets"
      />
      <meta
        name="keywords"
        content="Dholera latest updates,Dholera investment blog, Dholera plot guides, Dholera Smart City news, Dholera SIR updates, Dholera Smart City blog"
      />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="BookMyAssets" />
      <meta name="publisher" content="BookMyAssets" />
      <link
        rel="canonical"
        href="https://www.bookmyassets.com/dholera-sir-blogs"
      />
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Hero Section */}
        <div className="bg-black relative ">
          <div className="mx-auto w-full max-w-[calc(100vw-0rem)] overflow-hidden">
            <BlogHeroCarousel />
          </div>

          <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-4 text-center">
            <h1 className="text-2xl md:text-5xl leading-[1.15] font-bold text-white">
              Dholera SIR Blogs
            </h1>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {safePosts.length > 0 ? (
              <>
                {/* Mobile paginated grid */}
                <div className="md:hidden">
                  <MobileBlogPagination>
                    {safePosts.map((post) => (
                      <div
                        key={post._id}
                        className="transform hover:-translate-y-2  transition-all duration-300"
                      >
                        <BlogCard post={post} />
                      </div>
                    ))}
                  </MobileBlogPagination>
                </div>

                {/* Tablet and desktop full grid */}
                <div>
                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 space-x-4 sm:gap-8">
                    {safePosts.map((post) => (
                      <div
                        key={post._id}
                        className="transform hover:-translate-y-2 transition-all duration-300"
                      >
                        <BlogCard post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 sm:py-20">
                <div className="bg-white/95 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-200">
                  {fetchError ? (
                    <>
                      <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">
                        ⚠️
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                        Unable to Load Blogs
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                        We're experiencing some technical difficulties loading
                        the blog posts. Please try refreshing the page or
                        contact support if the issue persists.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">
                        📝
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                        Expert Content Coming Soon!
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                        We're preparing comprehensive investment guides, market
                        analysis, and expert insights about Dholera SIR
                        opportunities. Stay tuned!
                      </p>
                    </>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                    <button className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
                      Get Notified
                    </button>
                    <button className="border-2 border-orange-500 text-orange-600 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm sm:text-base">
                      Explore Projects
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
