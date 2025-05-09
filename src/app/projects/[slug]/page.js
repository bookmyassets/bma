import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getPostBySlug, getProjectBySlug, projectInfo } from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";
import ProjectSlider from "./slider";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  return {
    title: post.title ,
    description: post.metaDescription ,
    keywords: post.keywords?.join(", "),
    robots: {
    index: false,
    follow: true
  }
  };
}

export default async function ProjectDetail({ params }) {
  const { slug } = params;

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-2">
            Missing Project Information
          </h1>
          <p className="text-gray-600">No project slug was provided</p>
          <Link
            href="/projects"
            className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  try {
    const [post, projects] = await Promise.all([
      getPostBySlug(slug),
      getProjectBySlug(slug),
    ]);

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
            <p className="text-gray-600">
              The requested project could not be found
            </p>
            <Link
              href="/projects"
              className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      );
    }

    // Extract the actual slug string values
    const postSlugStr =
      typeof post.slug === "object" ? post.slug.current : post.slug;

    const portableTextComponents = {
      types: {
        image: ({ value }) => {
          if (!value?.asset?._ref) return null;
          return (
            <figure className="my-8">
              <img
                loading="lazy"
                alt={value.alt || "Project image"}
                src={urlFor(value).width(1200).url()}
                width={1200}
                height={800}
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
        link: ({ children, value }) => (
          <a
            href={value.href}
            rel="noopener noreferrer"
            target={value.href.startsWith("http") ? "_blank" : undefined}
            className="text-[#C69C21] hover:text-[#FDB913] underline decoration-[#FDB913]/30 hover:decoration-[#FDB913] transition-colors"
          >
            {children}
          </a>
        ),
      },
      block: {
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold mt-12 mb-6 text-black">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-black">
            {children}
          </h3>
        ),
        normal: ({ children }) => (
          <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#FDB913] pl-4 my-6 italic text-gray-700">
            {children}
          </blockquote>
        ),
      },
    };
    const canonicalUrl = `https://www.bookmyassets.com/projects/${post.slug.current}`;
    return (
      <div className="bg-white min-h-screen">
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription}/>
        <meta name="keywords" content={post.keywords}/>
        <link rel="canonical" href={canonicalUrl} />
        {/* Sticky Nav Placeholder */}
        <div className="bg-white shadow-sm py-8 h-8" />

        {/* Hero Section */}
        <header className="w-full bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
          </div>
        </header>

        {/* Content wrapper */}
        <main className=" max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Article */}
            <article className="lg:w-2/3">
              {post.mainImage && (
                <div className="mb-10 overflow-hidden shadow-2xl pt-4 scale-105">
                  <Image
                    src={urlFor(post.mainImage).width(1200).height(900).url()}
                    alt={post.title}
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              )}

              {/* Mobile view related projects */}
              <div className="lg:hidden mb-10">
                <h3 className="text-xl font-bold mb-4 text-black">
                Our {post.title} Projects
                </h3>
                {projects?.relatedProjects?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {projects.relatedProjects.map((project) => {
                      // Extract project slug string safely
                      const projectSlugStr =
                        typeof project.slug === "object"
                          ? project.slug.current
                          : project.slug;

                      return (
                        <Link
                          key={project._id || projectSlugStr}
                          href={`/projects/${postSlugStr}/${projectSlugStr}`}
                          className="flex gap-3 items-center bg-white hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition"
                        >
                          <div>
                            <h4 className="text-sm font-semibold text-black">
                              {project.title}
                            </h4>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500">No related projects found.</p>
                )}
              </div>

              {/* Main rich text content */}
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                <div className="text-lg leading-relaxed">
                  <PortableText
                    value={post.body}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            <ProjectSlider />
            </article>

            {/* Sidebar */}
            {/* Sidebar */}
            <aside className="lg:w-1/3">
              {/* Related Projects - Fixed on scroll */}
              <div className="sticky top-20">
                {/* Our Dholera Projects */}
                <div className="bg-white rounded-xl max-md:hidden shadow-md p-6 border border-gray-200 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-black">
                  Our {post.title} Projects
                  </h3>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {projects?.relatedProjects?.length > 0 ? (
                      projects.relatedProjects.map((project) => {
                        // Extract project slug string safely
                        const projectSlugStr =
                          typeof project.slug === "object"
                            ? project.slug.current
                            : project.slug;

                        return (
                          <Link
                            key={project._id || projectSlugStr}
                            href={`/projects/${postSlugStr}/${projectSlugStr}`}
                            className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-lg transition"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                              {project.mainImage ? (
                                <Image
                                  src={urlFor(project.mainImage)
                                    .width(64)
                                    .height(64)
                                    .url()}
                                  alt={project.title}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-black">
                                {project.title}
                              </h4>
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <p className="text-gray-500">
                        No related projects found.
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Details - Part of the same sticky container */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-black">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <span className="font-medium text-[#C69C21]">
                        {post.categories && Array.isArray(post.categories)
                          ? post.categories.find(
                              (c) =>
                                c &&
                                c.title &&
                                ["active", "sold out", "coming soon"].includes(
                                  c.title.toLowerCase()
                                )
                            )?.title || "Active"
                          : "Active"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">
                        {post.location || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Investment</span>
                      <span className="font-medium">
                        {post.investment || "Contact for details"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Returns</span>
                      <span className="font-medium">
                        {post.returns || "Contact for details"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link href="/contact" className="block w-full">
                      <button className="w-full bg-[#FDB913] hover:bg-[#C69C21] text-black py-3 rounded-lg font-medium transition-colors">
                        Request More Information
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading project:", slug, error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-2">Error loading project</h1>
          <p className="text-gray-600">Please try again later</p>
          <Link
            href="/projects"
            className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }
}
