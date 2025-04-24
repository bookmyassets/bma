import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getPostBySlug } from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }) {
  // Ensure the slug is properly resolved before using it
  const { slug } = await params; // params is already available, but use destructuring
  
  // Fetch the post using the slug
  const post = await getPostBySlug(slug); 
  

  return {
    title: post.title,  // Use the fetched post's title for dynamic title
    description: post.metaDescription, // Same for description
    
  };
}

export default async function Post({ params }) {
  const post = await getPostBySlug(params.slug);

  // Calculate read time (rough estimate)
  const wordCount = JSON.stringify(post.body).split(" ").length;
  const readTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
  const isProject = post.categories?.some(
    (category) => category.title.toLowerCase() === "project"
  );

  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <figure className="my-8">
            <img
              alt={value.alt || " "}
              src={urlFor(value).width(800).url()}
              width={800}
              height={600}
              className="w-full rounded-xl shadow-lg"
            />
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <Link
            href={value.href}
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
          >
            {children}
          </Link>
        );
      },
    },
    block: {
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700">
          {children}
        </blockquote>
      ),
    },
  };
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "alternativeHeadline": post.altHeadline || post.title,
    "image": post.mainImage?.url,
    "author": {
      "@type": "Organization",
      "name": "BookMyAssets"
    },
    "editor": "BookMyAssets Editorial Team",
    "genre": post.genre || "General",
    "keywords": post.keywords?.join(", "),
    "wordcount": post.wordCount?.toString() || "1000",
    "publisher": {
      "@type": "Organization",
      "name": "BookMyAssets",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bookmyassets.com/assets/images/logo.png"
      }
    },
    "url": `https://www.bookmyassets.com/blogs/${post.slug.current}`,
    "mainEntityOfPage": `https://www.bookmyassets.com/blogs/${post.slug.current}`,
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt || post.publishedAt,
    "description": post.metaDescription
  };

  const canonicalUrl = `https://www.bookmyassets.com/blogs/${post.slug.current}`
  return (
    <div>
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <link rel="canonical" href={canonicalUrl}/>
        
      <main className="  pt-44 py-12">
        <article className="md:w-[70vw] mx-auto max-sm:pl-4 max-sm:pr-2 w-full md:h-[55vh] bg-white shadow-2xl scale-105 overflow-hidden">
          {post.mainImage && (
            <div className="relative w-full">
              <Image
                src={urlFor(post.mainImage)?.url() || ""}
                alt={post.title}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </article>
        <div className="max-w-5xl mx-auto">
          <div className="px-8 py-10">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 mb-6">
                {post.categories.map((category) => (
                  <span
                    key={category.title}
                    className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta information */}

            {/* Content */}
            <div
              className="text-lg antialiased md:subpixel-antialiased tracking-wide decoration-inherit
 max-w-none"
            >
              <PortableText value={post.body} components={components} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
