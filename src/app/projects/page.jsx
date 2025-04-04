import Link from "next/link";
import { getPosts } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "next-sanity";
import hero from "@/assests/BmaInvest.webp";

export default async function Projects() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Black Background */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative w-full h-[300px]">
        <Image
          src={hero}
          alt="hero"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">LOCATION</h1>
        </div>
      </div>
      </div>

      {/* Project Filters (Optional) */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-3">
          <button className="px-5 py-2 bg-[#FDB913] text-black rounded-lg font-medium hover:bg-[#C69C21] transition-colors">
            All Projects
          </button>
          <button className="px-5 py-2 bg-white text-black hover:bg-gray-100 rounded-lg font-medium border border-black">
            Active
          </button>
          <button className="px-5 py-2 bg-white text-black hover:bg-gray-100 rounded-lg font-medium border border-black">
            Sold Out
          </button>
          <button className="px-5 py-2 bg-white text-black hover:bg-gray-100 rounded-lg font-medium border border-black">
            Coming Soon
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                href={post.slug?.current ? `/projects/${post.slug.current}` : "#"}
                key={post._id}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
                  {/* Project Image */}
                  <div className="relative h-52">
                    {post.mainImage ? (
                      <Image
                        src={
                          urlFor(post.mainImage).width(800).height(400).url() ||
                          "/placeholder.svg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-[#FDB913] to-[#C69C21]"></div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {post.categories && Array.isArray(post.categories) ? (
                        post.categories.map((category, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 text-sm font-semibold rounded-full shadow-md ${
                              category.title.toLowerCase() === "sold out"
                                ? "bg-red-600 text-white"
                                : category.title.toLowerCase() === "active"
                                  ? "bg-[#FDB913] text-black"
                                  : category.title.toLowerCase() ===
                                      "coming soon"
                                    ? "bg-black text-[#FDB913]"
                                    : "bg-[#FDB913] text-black"
                            }`}
                          >
                            {category.title}
                          </span>
                        ))
                      ) : (
                        <span className="px-3 py-1 text-sm font-semibold rounded-full shadow-md bg-[#FDB913] text-black">
                          Project
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>

                    {/* Key Info */}
                    <div className="border-t border-gray-200 pt-4 mt-auto">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#FDB913] mr-2"></span>
                          <span className="text-black font-medium">
                            View Details
                          </span>
                        </div>
                        <span className="text-[#C69C21] font-medium">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p className="text-lg">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Invest in Our Projects?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of investors who have already secured their financial
            future with us.
          </p>
          <button className="bg-[#FDB913] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#C69C21] transition-colors shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
