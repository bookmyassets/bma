import { getblogs, projectInfo } from "@/sanity/lib/api";
import React from "react";
import BlogCard from "./BlogCard";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import FormComponent from "./FormComponent";

export default async function page() {
  let posts = [];
  let fetchError = null;
  
  try {
    const postsData = await getblogs();
    posts = Array.isArray(postsData) ? postsData : [];
    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    fetchError = error;
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
            <FormComponent/>
          </div>

          {/* Blog Posts Section */}
          <div className="max-w-7xl mx-auto px-4 pb-16">
            {safePosts.length > 0 ? (
              <>
                {/* All Posts Grid */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Latest Articles ({safePosts.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {safePosts.map((post, index) => (
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
              <div className="text-center py-20">
                <div className="bg-white/95 backdrop-blur-sm p-12 rounded-2xl shadow-xl max-w-2xl mx-auto border border-white/20">
                  {fetchError ? (
                    <>
                      <div className="text-6xl mb-6">⚠️</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Unable to Load Blogs
                      </h3>
                      <p className="text-gray-600 text-lg mb-8">
                        We're experiencing some technical difficulties loading the blog posts. 
                        Please try refreshing the page or contact support if the issue persists.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl mb-6">📝</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Blog Coming Soon!
                      </h3>
                      <p className="text-gray-600 text-lg mb-8">
                        We're preparing valuable content about Dholera SIR
                        investment opportunities. Stay tuned for expert insights and
                        market analysis.
                      </p>
                    </>
                  )}
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
        </div>
      </div>
    </>
  );
}