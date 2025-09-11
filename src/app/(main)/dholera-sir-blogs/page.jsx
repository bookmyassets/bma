import { getblogs, projectInfo } from "@/sanity/lib/api";
import React from "react";
import BlogCard from "./BlogCard";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import FormComponent from "./FormComponent";
import hero from "@/assests/sir-hero.webp"

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
        {/* Enhanced Hero Section */}
        <div className="relative h-[70vh] flex items-center justify-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={hero}
              alt="Dholera SIR Development"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Dholera SIR
                <span className="block bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                  Investment Blog
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg p-2 md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Expert insights, market analysis, and investment opportunities in India's most promising smart city
              </p>
            </div>

            <div className="relative z-10 mt-8">
          <div className="max-w-7xl  mx-auto px-4">
            <FormComponent/>
          </div>
        </div>

            {/* CTA Section */}
            {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">Ready to Invest?</h3>
                  <p className="text-white/80 text-sm">Get expert guidance & exclusive opportunities</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap">
                    Free Consultation
                  </button>
                  <button className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Form Component Section */}
{/*         <div className="relative z-10 -mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <FormComponent/>
          </div>
        </div> */}

        {/* Blog Posts Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-16">
            {safePosts.length > 0 ? (
              <>
                {/* All Posts Grid */}
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Latest Investment Insights
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Stay updated with expert analysis and market trends from Dholera SIR
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      {safePosts.length} Article{safePosts.length !== 1 ? 's' : ''} Available
                    </div>
                  </div>
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
                <div className="bg-white/95 backdrop-blur-sm p-12 rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-200">
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
                        Expert Content Coming Soon!
                      </h3>
                      <p className="text-gray-600 text-lg mb-8">
                        We're preparing comprehensive investment guides, market analysis, and expert insights about Dholera SIR opportunities. Stay tuned!
                      </p>
                    </>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                      Get Notified
                    </button>
                    <button className="border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
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