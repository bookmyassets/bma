import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getPostBySlug } from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.metaDescription,
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
  
  // Format the publication date if available
  const formattedDate = post.publishedAt ? 
    format(new Date(post.publishedAt), "MMMM dd, yyyy") : null;

  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <figure className="my-12">
            <div className="overflow-hidden rounded-xl shadow-xl">
              <img
                alt={value.alt || " "}
                src={urlFor(value).width(1200).url()}
                width={1200}
                height={800}
                className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
            {value.caption && (
              <figcaption className="mt-3 text-center text-sm italic text-gray-500">
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
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors font-medium"
          >
            {children}
          </Link>
        );
      },
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-800">{children}</em>
      ),
    },
    block: {
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-16 mb-6 text-gray-800 border-b border-gray-200 pb-2">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-yellow-500 pl-6 my-8 italic text-gray-700 py-2 bg-gray-50 rounded-r-lg shadow-sm">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
      number: ({ children }) => (
        <li className="text-lg leading-relaxed">{children}</li>
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
    "url": `https://www.bookmyassets.com/dholera-sir/${post.slug.current}`,
    "mainEntityOfPage": `https://www.bookmyassets.com/dholera-sir/${post.slug.current}`,
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt || post.publishedAt,
    "description": post.metaDescription
  };

  const canonicalUrl = `https://www.bookmyassets.com/dholera-sir/${post.slug.current}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords} />
      <link rel="canonical" href={canonicalUrl}/>
      
      {/* Hero Section with Image */}
      <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="max-w-7xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
          

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          {/* Metadata row */}
          <div className="flex items-center text-gray-300 text-sm md:text-base mb-8">
            {formattedDate && (
              <div className="flex items-center mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formattedDate}</span>
              </div>
            )}
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        {/* Featured Image Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
          {post.mainImage && (
            <div className="relative w-full h-[50vh] md:h-[60vh]">
              <Image
                src={urlFor(post.mainImage)?.url() || ""}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
        
        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} components={components} />
            </div>
            
            {/* Tags Section */}
            {post.keywords && post.keywords.length > 0 && (
              <div className="mt-12 pt-6 border-t border-gray-200">
                <h4 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">Related Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Call to Action */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Want to learn more?</h3>
              <p className="text-gray-600 mb-6">Discover more investment opportunities with BookMyAssets™ today.</p>
              <Link 
                href="/contact" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Space */}
      <div className="py-16"></div>
    </div>
  );
}