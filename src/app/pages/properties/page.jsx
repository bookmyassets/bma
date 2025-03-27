import Link from "next/link";
import {  getPosts } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import "../properties/project.css";
import Image from "next/image";
import { CalendarDays, MessageSquare, User } from "lucide-react";
import { PortableText } from "next-sanity";

export default async function Home() {
  const posts = await getPosts();

  // For debugging purposes only
  console.log("Posts data:", JSON.stringify(posts, null, 2));

  return (
    <div className="min-h-screen bg-gradient-to-b pt-20 from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center"></div>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            LOCATIONS
          </h1>
          <p className="text-lg text-center max-w-2xl mx-auto text-gray-200">
            
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Posts */}
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post._id} className="mb-12">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <div className="md:flex">
                  <div className="md:w-1/2 relative">
                    {post.mainImage && (
                      <div className="relative h-64 md:h-full">
                        <Link
                        href={
                          post.slug?.current
                            ? `/posts/${post.slug.current}`
                            : "#"
                        }>

                        <Image
                          src={
                            urlFor(post.mainImage)
                            .width(800)
                            .height(600)
                            .url() || "/placeholder.svg"
                          }
                          alt={post.title}
                          fill
                          className="object-cover"
                          />
                          </Link>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>

                        {/* Position categories in the top-left corner of the image */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                          {post.categories && Array.isArray(post.categories) ? (
                            post.categories.map((category, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1 text-sm font-bold rounded-full shadow-lg ${
                                  category.title === "Sold Out"
                                    ? "bg-red-600 text-white"
                                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                }`}
                              >
                                {category.title}
                              </span>
                            ))
                          ) : post.categories ? (
                            <span
                              className={`px-3 py-1 text-sm font-bold rounded-full shadow-lg ${
                                post.categories.title.toLowerCase() ===
                                "soldout"
                                  ? "bg-red-600 text-white"
                                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              }`}
                            >
                              {post.categories.title}
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-white text-sm font-bold rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600">
                              Project
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2 bg-gray-300 text-[#151f28] p-6 md:p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-3 flex items-center flex-wrap">
                      <Link
                        href={
                          post.slug?.current
                            ? `/posts/${post.slug.current}`
                            : "#"
                        }>
                      {post.title}
                        <span className="bg-blue-500 rounded-lg ml-3 text-sm text-white  font-thin w-16 h-14">
                          {" "}
                          Details Here{" "}
                        </span>
                      </Link>
                    </h2>

                    <p className="text-gray-600 mb-4">{post.description}</p>
                    <div className="line-clamp-2 overflow-hidden mb-4">
                      <PortableText value={post.body} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
