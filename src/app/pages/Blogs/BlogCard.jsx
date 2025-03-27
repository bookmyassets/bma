// components/BlogCard.jsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function BlogCard({ post }) {
  // Ensure post exists and has required properties
  if (!post) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 h-full">
      {/* Image */}
      <div className="relative h-48">
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title || "Blog post"}
            fill
            className="object-cover"
          />
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
        
        {/* Author - ensure this is properly formatted */}
        {post.author && (
          <p className="text-sm text-gray-500">
            {typeof post.author === 'object' ? post.author.name : post.author}
          </p>
        )}
        
        {/* Read More button */}
        <Link 
          href={`/posts/${post.slug?.current}`}
          className="mt-4 inline-block px-4 py-2 bg-[#d3ab45]  font-semibold text-white rounded hover:bg-[#FDB913]"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}