import { urlFor } from "@/sanity/lib/image";

// Blog Schema Markup Component
const BlogSchemaMarkup = ({ post, relatedBlogs = [] }) => {
  if (!post) return null;

  // Helper function to extract plain text from Portable Text
  const extractPlainText = (portableText) => {
    if (!portableText || !Array.isArray(portableText)) return '';
    
    return portableText
      .map(block => {
        if (block._type === 'block' && block.children) {
          return block.children
            .map(child => child.text || '')
            .join('');
        }
        return '';
      })
      .join(' ')
      .trim()
      .substring(0, 160); // Limit for meta description
  };

  // Helper function to get reading time estimate
  const getReadingTime = (portableText) => {
    const plainText = extractPlainText(portableText);
    const wordsPerMinute = 200;
    const wordCount = plainText.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Helper function to extract all images from portable text
  const extractImages = (portableText) => {
    if (!portableText || !Array.isArray(portableText)) return [];
    
    const images = [];
    
    const traverse = (blocks) => {
      blocks.forEach(block => {
        if (block._type === 'image' && block.asset) {
          images.push(urlFor(block).width(1200).height(630).url());
        }
        // Handle nested blocks if any
        if (block.children && Array.isArray(block.children)) {
          traverse(block.children);
        }
      });
    };
    
    traverse(portableText);
    return images;
  };

  const baseUrl = "https://bookmyassets.com"; // Replace with your actual domain
  const postUrl = `${baseUrl}/dholera-sir-blogs/${post.slug.current}`;
  
  // Main blog post schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description || extractPlainText(post.body),
    "url": postUrl,
    "datePublished": post.publishedAt || post._createdAt,
    "dateModified": post._updatedAt,
    "author": {
      "@type": "Organization", // Change to "Person" if you want individual author
      "name": "BookMyAssets", // Replace with your organization/author name
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`, // Replace with your logo URL
        "width": 300,
        "height": 100
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "BookMyAssets", // Replace with your organization name
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`, // Replace with your logo URL
        "width": 300,
        "height": 100
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": post.categories?.length > 0 ? post.categories[0].title : "Blog",
    "articleBody": extractPlainText(post.body),
    "wordCount": extractPlainText(post.body).split(/\s+/).length,
    "timeRequired": `PT${getReadingTime(post.body)}M`,
    "inLanguage": "en-US", // Adjust based on your content language
    "isAccessibleForFree": true,
    "isPartOf": {
      "@type": "Blog",
      "name": "BookMyAssets Blog", // Replace with your blog name
      "url": `${baseUrl}/dholera-sir-blogs`
    }
  };

  // Add main image if available
  if (post.mainImage) {
    const mainImageUrl = urlFor(post.mainImage).width(1200).height(630).url();
    blogSchema.image = {
      "@type": "ImageObject",
      "url": mainImageUrl,
      "width": 1200,
      "height": 630,
      "caption": post.mainImage.alt || post.title
    };
  }

  // Add categories/keywords
  if (post.categories && post.categories.length > 0) {
    blogSchema.about = post.categories.map(category => ({
      "@type": "Thing",
      "name": category.title
    }));
  }

  // Add tags as keywords
  if (post.tags && post.tags.length > 0) {
    blogSchema.keywords = post.tags.join(", ");
  }

  // Add content images
  const contentImages = extractImages(post.body);
  if (contentImages.length > 0) {
    blogSchema.associatedMedia = contentImages.map(imageUrl => ({
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    }));
  }

  // Organization schema (for your company/website)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BookMyAssets",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`, // Replace with your actual logo URL
      "width": 300,
      "height": 100
    },
    "sameAs": [
      // Add your social media URLs
      "https://www.facebook.com/bookmyassets",
      "https://www.linkedin.com/company/bookmyassets",
      "https://x.com/bookmyassets"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8130371647",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  // Website/Blog schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BookMyAssets Blog",
    "url": `${baseUrl}/dholera-sir-blogs`,
    "publisher": {
      "@type": "Organization",
      "name": "BookMyAssets",
      "url": baseUrl
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blogs",
        "item": `${baseUrl}/dholera-sir-blogs`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl
      }
    ]
  };

  // FAQ Schema (if you have FAQ content in your blog)
  const faqSchema = post.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Collection of all schemas
  const allSchemas = [
    blogSchema,
    organizationSchema,
    websiteSchema,
    breadcrumbSchema
  ];

  // Add FAQ schema if available
  if (faqSchema) {
    allSchemas.push(faqSchema);
  }

  // If there are related blogs, add ItemList schema
  if (relatedBlogs && relatedBlogs.length > 0) {
    const relatedBlogsSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Related Blog Posts",
      "itemListElement": relatedBlogs.map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": blog.title,
          "url": `${baseUrl}/dholera-sir-blogs/${blog.slug.current}`,
          "description": blog.description,
          "image": blog.mainImage ? urlFor(blog.mainImage).width(400).height(250).url() : undefined,
          "datePublished": blog.publishedAt || blog._createdAt
        }
      }))
    };
    allSchemas.push(relatedBlogsSchema);
  }

  return (
    <>
      {/* Main structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allSchemas, null, 2)
        }}
      />
      
      {/* Additional meta tags for better SEO */}
      <meta name="description" content={post.description || extractPlainText(post.body)} />
      <meta name="keywords" content={post.tags?.join(", ") || ""} />
      <meta name="author" content="BookMyAssets" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph meta tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.description || extractPlainText(post.body)} />
      <meta property="og:url" content={postUrl} />
      <meta property="og:site_name" content="BookMyAssets" />
      {post.mainImage && (
        <meta property="og:image" content={urlFor(post.mainImage).width(1200).height(630).url()} />
      )}
      <meta property="article:published_time" content={post.publishedAt || post._createdAt} />
      <meta property="article:modified_time" content={post._updatedAt} />
      {post.tags && post.tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card meta tags */}
      <meta name="x:card" content="summary_large_image" />
      <meta name="x:title" content={post.title} />
      <meta name="x:description" content={post.description || extractPlainText(post.body)} />
      {post.mainImage && (
        <meta name="x:image" content={urlFor(post.mainImage).width(1200).height(630).url()} />
      )}
      <meta name="x:site" content="@bookmyassets" /> {/* Replace with your Twitter handle */}
    </>
  );
};

export default BlogSchemaMarkup;