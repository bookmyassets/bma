import { projectInfo } from "@/sanity/lib/api";
import React from "react";
import BlogCard from "./BlogCard";
import hero from "@/assests/dholeraSIR.webp";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";

export default async function page() {
  let posts = [];
  try {
    const postsData = await projectInfo();
    posts = Array.isArray(postsData) ? postsData : [];
    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching project info:", error);
  }

  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: post.slug?.current
      ? { current: post.slug.current }
      : { current: "#" },
  }));

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex items-center justify-center overflow-hidden">
          {/* Decorative blurred blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF9933] opacity-20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#138808] opacity-20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#000080] opacity-10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4">
            {/* Replace with actual Dholera SIR image */}
            {/* <div className="mb-8">
              <div className="w-48 h-48 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
                <Image
                  src={hero}
                  alt="Dholera SIR Logo"
                  className="w-32 h-32 object-contain rounded-full"
                />
              </div>
            </div> */}

            <h1 className="text-6xl max-sm:pt-8 md:text-8xl font-bold text-blue-800 mb-4 drop-shadow-lg">
              DHOLERA SIR
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-8 drop-shadow-md">
              India's First Greenfield Smart City
            </h2>

            {/* <div className="flex justify-center">
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/30">
                Explore Opportunities
              </button>
            </div> */}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-[#FF9933] pb-4">
                    About Dholera SIR
                  </h2>

                  <div className="prose prose-lg text-gray-700 space-y-6">
                    <p>
                      Dholera Special Investment Region (SIR) is India's first
                      greenfield smart city, strategically located in Gujarat.
                      Spanning over 920 square kilometers, it represents the
                      future of urban development in India with world-class
                      infrastructure and sustainable planning.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 my-8">
                      <div className="bg-gradient-to-r from-[#FF9933]/10 to-[#138808]/10 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>• World-class infrastructure</li>
                          <li>• Smart governance systems</li>
                          <li>• Sustainable development</li>
                          <li>• Strategic location</li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-[#138808]/10 to-[#000080]/10 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                          Investment Benefits
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>• High growth potential</li>
                          <li>• Government support</li>
                          <li>• Excellent connectivity</li>
                          <li>• Modern amenities</li>
                        </ul>
                      </div>
                    </div>

                    <p>
                      Located near Ahmedabad and connected to major ports,
                      Dholera SIR offers unparalleled investment opportunities
                      in residential, commercial, and industrial sectors. The
                      project is backed by the Gujarat government and follows
                      international standards for urban planning and
                      development.
                    </p>

                    <div className="bg-gradient-to-r from-[#FF9933]/5 via-white/50 to-[#138808]/5 p-8 rounded-xl border-l-4 border-[#FF9933]">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Why Invest in Dholera SIR?
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Dholera SIR presents a unique opportunity to be part of
                        India's urban transformation. With planned
                        infrastructure development, including metro
                        connectivity, international airport, and smart
                        utilities, it's positioned to become a major economic
                        hub.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-[#deae3c] text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Smart Infrastructure
                        </span>
                        <span className="bg-[#deae3c] text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Strategic Location
                        </span>
                        <span className="bg-[#deae3c] text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Government Backed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-[#FF9933] pb-4">
                      Latest Updates
                    </h3>

                    {safePosts.length > 0 ? (
                      <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {safePosts.map((post) => (
                          <div
                            key={post._id}
                            className="border-b border-gray-100 pb-4 last:border-b-0"
                          >
                            <BlogCard post={post} compact={true} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#FF9933] to-[#138808] rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v6m0 0l-3-3m3 3l3-3"
                            />
                          </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          No Updates Available
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Check back soon for the latest information about
                          Dholera SIR investment opportunities.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Contact CTA */}
                  <div className="bg-[#deae3c] rounded-2xl p-4 mt-6 text-white">
                    <h4 className="text-xl font-bold mb-3">Ready to Invest?</h4>
                    <p className="text-sm mb-4 opacity-90">
                      Get expert guidance on Dholera SIR investment
                      opportunities.
                    </p>
                    <a
                      href="https://wa.me/918130371647"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="flex justify-center items-center gap-2 w-full bg-white text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <FaWhatsapp className=""/> Get Free Investment Advice
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FF9933, #138808);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #e8851f, #0f6b06);
        }
      `}</style> */}
    </>
  );
}
