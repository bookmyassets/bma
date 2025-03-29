import Link from "next/link";
import { getPosts } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { FaMap, FaMapLocation } from "react-icons/fa6";
import hero from "@/assests/BmaInvest.webp";
import { FaLocationArrow } from "react-icons/fa";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b pt-20 from-gray-50 to-gray-100">
      {/* Hero Section */}
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

      {/* Projects Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 &&
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
            >
              {/* Image Section */}
              <div className="relative h-60">
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).width(800).height(600).url() || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Content Section */}
              <div className="p-4">
                <h2 className="text-2xl font-semibold truncate">{post.title}</h2>
                <div className="flex items-center gap-2 mt-8">
                  <FaLocationArrow className="text-[#FDB913]"/>
                  <p className="text-gray-500 text-md">{post.location || "Location not available"}</p>
                </div>

                {/* Invest Button */}
                <div className="mt-4">
                  <Link href={post.slug?.current ? `/posts/${post.slug.current}` : "#"}>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-bold">
                      Invest Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
}
