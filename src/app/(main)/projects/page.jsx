import Link from "next/link";
import { getPosts } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import "./project.css";
import Image from "next/image";
import { PortableText } from "next-sanity";

export default async function Home() {
  const posts = await getPosts();

  const sortedPosts = posts.sort((a, b) => {
    const aIsSoldOut = checkIfSoldOut(a);
    const bIsSoldOut = checkIfSoldOut(b);
    
    if (aIsSoldOut && !bIsSoldOut) return 1;
    if (!aIsSoldOut && bIsSoldOut) return -1;
    
    return 0;
  });

  function checkIfSoldOut(post) {
    if (!post.categories) return false;
    
    if (Array.isArray(post.categories)) {
      return post.categories.some(category => 
        category.title && category.title.toLowerCase() === "sold out"
      );
    } else {
      return post.categories.title && post.categories.title.toLowerCase() === "sold out";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <link rel="canonical" href="https://www.dholeratimes.com/projects" />
      <meta name="robots" content="index, dofollow"/>

      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/sv%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">
                Investment Opportunities
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Our <span className="text-blue-400">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover premium investment opportunities, market insights, and strategic wealth-building projects designed for sophisticated investors.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post, index) => (
              <div key={post._id} className="group">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative">
                      {post.mainImage && (
                        <div className="relative h-80 lg:h-96">
                          <Image
                            src={
                              urlFor(post.mainImage)
                                .width(800)
                                .height(600)
                                .url() || "/placeholder.svg"
                            }
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          

                          {/* Enhanced Categories */}
                          <div className="absolute top-6 left-6 flex flex-wrap gap-3 z-20">
                            {post.categories && Array.isArray(post.categories) ? (
                              post.categories
                                .filter(category => category.title !== "Sub-Project")
                                .slice(0, 2)
                                .map((category, index) => (
                                  <span
                                    key={index}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300 ${
                                      category.title === "Sold Out"
                                        ? "bg-red-500/90 text-white border-red-400/50 shadow-red-500/25"
                                        : "bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white border-blue-400/50 shadow-blue-500/25"
                                    }`}
                                  >
                                    {category.title}
                                  </span>
                                ))
                            ) : post.categories ? (
                              post.categories.title !== "Sub-Project" && (
                                <span
                                  className={`px-4 py-2 text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300 ${
                                    post.categories.title.toLowerCase() === "sold out"
                                      ? "bg-red-500/90 text-white border-red-400/50 shadow-red-500/25"
                                      : "bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white border-blue-400/50 shadow-blue-500/25"
                                  }`}
                                >
                                  {post.categories.title}
                                </span>
                              )
                            ) : (
                              <span className="px-4 py-2 text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm border bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white border-blue-400/50 shadow-blue-500/25">
                                Project
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="space-y-6">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                          <Link
                            href={
                              post.slug?.current
                                ? `/projects/${post.slug.current}`
                                : "#"
                            }
                            className="hover:text-blue-600 transition-colors duration-200"
                          >
                            {post.title}
                          </Link>
                        </h2>

                        {post.description && (
                          <p className="text-lg text-slate-600 leading-relaxed">
                            {post.description}
                          </p>
                        )}

                        <div className="prose prose-slate max-w-none">
                          <div className="line-clamp-3 text-slate-700">
                            <PortableText value={post.body} />
                          </div>
                        </div>

                        <div className="pt-4">
                          <Link
                            href={
                              post.slug?.current
                                ? `/projects/${post.slug.current}`
                                : "#"
                            }
                            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                          >
                            <span>View Details</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No Projects Available</h3>
              <p className="text-slate-600">Check back soon for exciting new investment opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}