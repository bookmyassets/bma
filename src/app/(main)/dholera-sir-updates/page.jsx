import { getblogs, getUpdates } from "@/sanity/lib/api";
import React from "react";
import SidebarWithForm from "./Sidebar";
import MobileUpdatesPagination from "./MobileUpdatesPagination";
import BlogCard from "./BlogCard";

export default async function page() {
  let posts = [];
  let popularArticles = [];

  try {
    const [postsData, blogsData] = await Promise.all([
      getUpdates(),
      getblogs(),
    ]);

    posts = Array.isArray(postsData) ? postsData : [];

    // Sort by publishedAt date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a._createdAt || 0);
      const dateB = new Date(b.publishedAt || b._createdAt || 0);
      return dateB - dateA;
    });

    const combinedPopularArticles = [
      ...(Array.isArray(blogsData)
        ? blogsData.map((post) => ({ ...post, type: "blog" }))
        : []),
      ...posts.map((post) => ({ ...post, type: "update" })),
    ].filter(
      (post, index, self) =>
        post?._id && self.findIndex((item) => item._id === post._id) === index
    );

    popularArticles = [...combinedPopularArticles]
      .sort(
        (a, b) =>
          new Date(b.publishedAt || b._createdAt || 0) -
          new Date(a.publishedAt || a._createdAt || 0)
      )
      .slice(0, 3);

    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  const safePosts = posts.map((post) => ({
    ...post,
    mainImage: post.mainImage || null,
    slug: post.slug?.current
      ? { current: post.slug.current }
      : { current: "#" },
  }));

  return (
    <>
      <title>Dholera Latest News & Project Updates | Smart City Progress</title>
      <meta
        name="description"
        content=" Discover the latest on Dholera SIR! Get real-time updates on airport, metro, expressways, and industrial projects to help you make smart investment choices."
      />
      <link
        rel="canonical"
        href="https://www.bookmyassets.com/dholera-sir-updates"
      />
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Blog Posts (comes first on mobile) */}
            <div className="lg:w-2/3 space-y-8 order-1 lg:order-2">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Dholera SIR Latest Updates
                </h1>
                <p className="text-gray-600 mb-8">
                  Stay updated with the latest insights about Dholera Special
                  Investment Region, infrastructure developments, and smart city
                  investment opportunities.
                </p>
              </div>

              {safePosts.length > 0 ? (
                <div className="space-y-8">
                  {/* Mobile paginated updates */}
                  <div className="md:hidden">
                    <MobileUpdatesPagination>
                      {safePosts.map((post) => (
                        <div
                          key={post._id}
                          className="transform hover:-translate-y-2 transition-all duration-300"
                        >
                          <BlogCard post={post} />
                        </div>
                      ))}
                    </MobileUpdatesPagination>
                  </div>

                  {/* Tablet and desktop full updates grid */}
                  <div className="hidden md:grid md:grid-cols-2 gap-6">
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
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
                  <div className="h-48 bg-gradient-to-br from-[#FF9933]/20 to-[#138808]/20 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-6xl">ðŸ™ï¸</div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Dholera SIR Investment Updates Coming Soon
                  </h2>
                  <p className="text-gray-600 mb-4">
                    We're preparing comprehensive guides about investment
                    opportunities in Dholera Special Investment Region. Stay
                    tuned for expert insights on India's first smart city.
                  </p>
                  <p className="text-sm text-gray-500">
                    Content will be available soon
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar (comes second on mobile) */}
            <div className="lg:w-1/3 order-2 lg:order-1">
              <SidebarWithForm
                popularArticles={popularArticles}
                className="lg:sticky lg:top-24 space-y-6"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
