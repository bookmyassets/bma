import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function BlogCard({ post }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";

    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Link
      href={
        post.slug?.current ? `/about-dholera-sir/${post.slug.current}` : "#"
      }
      className="group"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
        {/* Blog Image */}
        <div className="relative h-52">
          {post.mainImage ? (
            <Image
              src={
                urlFor(post.mainImage).width(1200).height(675).url() ||
                "/placeholder.svg"
              }
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-[#FDB913] to-[#C69C21]"></div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] line-clamp-2 transition-colors">
            {post.title}
          </h2>

          {/* Footer with "Read More" */}
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <div className="flex justify-between text-sm">
                <button className="font-medium hover:underline text-[#deae3c]">
                  Read More →
                </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
