import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function BlogCard({ post }) {
  // Handle author object properly
  const authorName =
    typeof post.author === "object"
      ? post.author.name || "Unknown"
      : post.author;

  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105">
      {/* Image */}
      <div className="relative w-full h-48">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow ">
        {/* Title */}
        <Link
          href={`/blogs/${post.slug.current}`}
          className="w-full px-4 py-2 transition-all font-semibold hover:bg-[#FDB913] bg-white text-lg md:text-base text-black mt-auto"
        >
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 h-14">
            {post.title}
          </h3>

          <div className="space-y-4">
            {/* Author & Date */}
            <div className="text-sm text-gray-600  mt-8">
              <span>{authorName}</span>
            </div>

            {/* Read More Button - Fixed at bottom */}
            <p>Read More</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
