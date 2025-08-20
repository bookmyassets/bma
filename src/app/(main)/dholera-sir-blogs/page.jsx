import { getblogs, projectInfo } from "@/sanity/lib/api";
import React from "react";
import BlogCard from "./BlogCard";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default async function page() {
  let posts = [];
  try {
    const postsData = await getblogs();
    posts = Array.isArray(postsData) ? postsData : [];
    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching project info:", error);
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
      <title>Dholera Blog | Investment Tips, News & Smart City Insights</title>
      <meta
        name="description"
        content="Stay ahead in Dholera SIR investments! Read expert blogs on development, market trends, and project reviews, all curated by BookMyAssets for you."
      />
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background decorative elements */}

        <div className="relative z-10">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                Dholera SIR
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808]">
                  Investment Blog
                </span>
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Stay updated with the latest insights, market trends, and
                investment opportunities in India's first planned greenfield
                smart city
              </p>
            </div>

            {/* CTA Banner */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16 border border-white/20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    🚀 Ready to Invest in Dholera SIR?
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Get expert guidance and exclusive investment opportunities
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-[#FF9933] to-[#138808] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    Get Free Consultation
                  </button>
                  <button className="border-2 border-[#FF9933] text-[#FF9933] px-8 py-3 rounded-xl font-semibold hover:bg-[#FF9933] hover:text-white transition-all duration-300">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Section */}
          <div className="max-w-7xl mx-auto px-4 pb-16">
            {safePosts.length > 0 ? (
              <>
                {/* All Posts Grid */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Latest Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {safePosts.map((post, index) => (
                      <div
                        key={post._id}
                        className={`transform hover:-translate-y-2 transition-all duration-300 ${index === 0 ? "lg:hidden" : ""}`}
                      >
                        <BlogCard post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="bg-white/95 backdrop-blur-sm p-12 rounded-2xl shadow-xl max-w-2xl mx-auto border border-white/20">
                  <div className="text-6xl mb-6">📝</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Blog Coming Soon!
                  </h3>
                  <p className="text-gray-600 text-lg mb-8">
                    We're preparing valuable content about Dholera SIR
                    investment opportunities. Stay tuned for expert insights and
                    market analysis.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-[#FF9933] to-[#138808] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                      Get Notified
                    </button>
                    <button className="border-2 border-[#FF9933] text-[#FF9933] px-8 py-3 rounded-xl font-semibold hover:bg-[#FF9933] hover:text-white transition-all duration-300">
                      Explore Projects
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Newsletter Signup Section */}
          {/* <div className="max-w-7xl mx-auto px-4 pb-16">
            <div className="bg-gradient-to-r from-[#FF9933]/90 to-[#138808]/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-12 text-center border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated with Dholera SIR News
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Get the latest updates on investment opportunities,
                infrastructure developments, and market insights delivered to
                your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-xl border-none outline-none text-gray-800"
                />
                <button className="bg-white text-[#FF9933] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
