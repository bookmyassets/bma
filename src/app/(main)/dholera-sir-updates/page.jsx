import { getUpdates } from "@/sanity/lib/api";
import React from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default async function page() {
  let posts = [];
  try {
    const postsData = await getUpdates();
    posts = Array.isArray(postsData) ? postsData : [];
    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching project info:", error);
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
      <div className="min-h-screen bg-gradient-to-br from-[#FF9933] via-white to-[#138808] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF9933] opacity-20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#138808] opacity-20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#000080] opacity-10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column - Blog Posts */}
            <div className="lg:col-span-2 space-y-8">
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
                  {/* Featured Blog Post */}
                  <article className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {safePosts[0].mainImage ? (
                        <Image
                          src={urlFor(safePosts[0].mainImage)
                            .width(800)
                            .height(400)
                            .url()}
                          alt={safePosts[0].title || "Dholera SIR Blog Post"}
                          width={800}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#FF9933]/20 to-[#138808]/20 flex items-center justify-center">
                          <div className="text-6xl">📰</div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <Link href={`/blog/${safePosts[0].slug.current}`}>
                        <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-[#FF9933] cursor-pointer transition-colors">
                          {safePosts[0].title ||
                            "Latest Dholera SIR Investment Updates"}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-4">
                        {safePosts[0].description ||
                          "Discover the latest developments and investment opportunities in India's first planned smart city - Dholera Special Investment Region."}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">5 min read</p>
                        <Link href={`/blog/${safePosts[0].slug.current}`}>
                          <button className="text-[#FF9933] font-medium hover:underline">
                            Read More →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </article>

                  {/* Smaller Blog Posts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {safePosts.slice(1).map((post, index) => (
                      <article
                        key={post._id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                      >
                        <div className="h-32 bg-gray-200 flex items-center justify-center">
                          {post.mainImage ? (
                            <Image
                              src={urlFor(post.mainImage)
                                .width(800)
                                .height(400)
                                .url()}
                              alt={post.title || "Dholera SIR Blog Post"}
                              width={800}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#FF9933]/20 to-[#138808]/20 flex items-center justify-center">
                              <div className="text-6xl">📰</div>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <Link
                            href={`/dholera-sir-updates/${post.slug.current}`}
                          >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-[#FF9933] cursor-pointer transition-colors">
                              {post.title ||
                                `Dholera Investment Guide ${index + 2}`}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500">
                            {index + 4} min read
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="h-48 bg-gradient-to-br from-[#FF9933]/20 to-[#138808]/20 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-6xl">🏙️</div>
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

            {/* Right Column - Sidebar */}
            <aside className="lg:sticky lg:top-24 space-y-6">
              {/* Get Our Free Guide Widget */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Get Free Dholera Investment Guide
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Download our comprehensive guide covering investment
                  opportunities, infrastructure development, and future
                  prospects in Dholera SIR.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-[#FF9933]"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FF9933] to-[#138808] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    Download Free Guide
                  </button>
                </form>
              </div>

              {/* Popular Articles Widget */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Popular Articles
                </h3>
                <div className="space-y-4">
                  <article className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <Link href="/blog/why-invest-dholera" className="block group">
                      <h4 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-[#FF9933] transition-colors">
                        Why Invest in Dholera SIR?
                      </h4>
                      <p className="text-sm text-gray-500">6 min read</p>
                    </Link>
                  </article>
                  <article className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <Link href="/blog/dholera-master-plan" className="block group">
                      <h4 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-[#FF9933] transition-colors">
                        Dholera Master Plan 2025
                      </h4>
                      <p className="text-sm text-gray-500">8 min read</p>
                    </Link>
                  </article>
                  <article className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <Link href="/blog/infrastructure-development" className="block group">
                      <h4 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-[#FF9933] transition-colors">
                        Infrastructure Development Progress
                      </h4>
                      <p className="text-sm text-gray-500">5 min read</p>
                    </Link>
                  </article>
                </div>
              </div>

              {/* Schedule a Consultation */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Schedule Investment Consultation
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Ready to invest in Dholera SIR? Get personalized guidance from
                  our investment experts.
                </p>
                <button className="w-full bg-[#FF9933] text-white py-3 rounded-lg font-medium hover:bg-[#e8851f] transition-all duration-300 hover:shadow-md">
                  Book Free Consultation
                </button>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-[#FF9933]/10 to-[#138808]/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Get weekly updates about Dholera SIR developments directly in your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-[#FF9933]"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full bg-[#138808] text-white py-2 rounded-lg font-medium hover:bg-[#0f7006] transition-colors text-sm"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}