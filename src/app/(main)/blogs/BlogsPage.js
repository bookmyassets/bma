'use client';

import { useState, useMemo } from 'react';
import BlogCard from "./BlogCard";
import TrendingBlogItem from "./TrendingBlog";                         
import Image from "next/image";
import m from "@/assests/test/blogs.png"
import n from "@/assests/mobile_home_blogs.webp"
import { Search, TrendingUp, Calendar, User, Eye, Clock, ChevronRight, Sparkles, X } from 'lucide-react';
import styles from "./blogs.module.css"

function BlogsPage({ initialPosts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);

  const safePosts = useMemo(() => 
  initialPosts.map((post) => ({
    ...post,
    author: typeof post.author === 'string' 
      ? post.author 
      : post.author?.name || "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: post.slug || { current: "#" },
  })),
  [initialPosts]
);

  // Filter blogs based on search query
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) {
      return safePosts;
    }

    const query = searchQuery.toLowerCase().trim();
    return safePosts.filter((post) => {
      // Search in title
      const titleMatch = post.title?.toLowerCase().includes(query);
      
      // Search in description/excerpt
      const descriptionMatch = post.description?.toLowerCase().includes(query);
      
      // Search in author
      const authorMatch = post.author?.toLowerCase().includes(query);
      
      // Search in categories if available
      const categoryMatch = post.categories?.some(cat => 
        cat.title?.toLowerCase().includes(query)
      );

      // Search in tags if available
      const tagMatch = post.tags?.some(tag => 
        tag.toLowerCase().includes(query)
      );

      return titleMatch || descriptionMatch || authorMatch || categoryMatch || tagMatch;
    });
  }, [searchQuery, safePosts]);

  const trendingBlogs = useMemo(() => safePosts.slice(0, 3), [safePosts]);
  const canonicalUrl = `https://www.bookmyassets.com/blogs`;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowClearButton(value.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowClearButton(false);
  };

  return (
    <div className={`grid ${styles.grid} min-h-screen bg-gradient-to-br from-slate-50 to-white`}>
      <link rel="canonical" href={canonicalUrl}/>

      {/* Hero Section with Parallax Effect */}
      <div className="relative pt-28 h-[60vh] w-full overflow-hidden">
        <Image
          src={m}
          alt="Dholera Skyline"
          className="object-cover w-full h-full max-sm:hidden transform scale-105 hover:scale-110 transition-transform duration-700"
          priority
        />
        <Image
          src={n}
          alt="Dholera Skyline"
          className="object-cover w-full h-full md:hidden transform scale-105 hover:scale-110 transition-transform duration-700"
          priority
        />
        
        <div className="absolute inset-0 max-w-6xl mx-auto top-16 flex items-center z-20">
          <div className="text-left px-6 py-10 max-w-2xl">
            <div className="inline-flex items-center bg-[#d6b873]/20 backdrop-blur-sm text-[#d6b873] px-4 py-2 rounded-full font-medium mb-6 border border-[#d6b873]/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Latest Insights & Updates
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Dholera <br/>
              Smart City <br/> 
              <span className="text-[#d6b873] drop-shadow-lg">Blogs</span> 
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
              Discover the latest trends, insights, and opportunities in India's most ambitious smart city project
            </p>
            <div className="flex items-center text-white/80 space-x-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Updated Daily</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                <span>Expert Analysis</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-12 py-3 rounded-full border border-gray-200 focus:border-[#d6b873] focus:ring-2 focus:ring-[#d6b873]/20 outline-none transition-all"
              />
              {showClearButton && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {searchQuery ? (
                  <>
                    {filteredBlogs.length} of {safePosts.length} Articles
                    {filteredBlogs.length === 0 && (
                      <span className="text-red-500 ml-2">No results found</span>
                    )}
                  </>
                ) : (
                  `${safePosts.length} Articles`
                )}
              </span>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center text-[#d6b873] font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                Trending
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 py-12 ml-4 md:ml-12 mr-4 md:mr-12">
        <div className="flex flex-col max-sm:flex-col-reverse lg:flex-row gap-8">
          
          {/* Trending Section - Enhanced Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Trending Blogs Card */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#d6b873] to-[#c4a55e] rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Trending Blogs
                  </h2>
                </div>
                <div className="space-y-4">
                  {trendingBlogs.map((post, index) => (
                    <div key={post._id} className="group">
                      <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#d6b873] to-[#c4a55e] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <TrendingBlogItem post={post} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-[#d6b873] to-[#c4a55e] p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Get the latest insights delivered to your inbox
                </p>
                <button className="w-full bg-white text-[#d6b873] font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Blog Grid - Enhanced */}
          <div className="lg:w-3/4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Articles'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#d6b873] to-[#c4a55e] rounded-full"></div>
            </div>
            
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No blogs found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search terms or browse all articles
                </p>
                <button
                  onClick={clearSearch}
                  className="bg-gradient-to-r from-[#d6b873] to-[#c4a55e] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((post, index) => (
                  <div 
                    key={post._id} 
                    className="group transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full">
                      <BlogCard post={post} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button - Only show if not searching */}
            {!searchQuery && filteredBlogs.length > 0 && (
              <div className="text-center mt-12">
                <button className="group bg-gradient-to-r from-[#d6b873] to-[#c4a55e] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center mx-auto">
                  <span>Load More Articles</span>
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Invest in <span className="text-[#d6b873]">Dholera Smart City</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of smart investors who are already part of India's most ambitious smart city project
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gradient-to-r from-[#d6b873] to-[#c4a55e] text-slate-900 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300">
              Explore Investment Options
            </button>
            <button className="border-2 border-[#d6b873] text-[#d6b873] px-8 py-4 rounded-full font-bold hover:bg-[#d6b873] hover:text-slate-900 transition-all duration-300">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;