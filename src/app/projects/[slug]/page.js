"use client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getPostBySlug, getProjectBySlug } from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function ProjectDetail({ params }) {
  /*  const [activeTab, setActiveTab] = useState("KeyRole"); */

  const { slug } = await params;
  const handleScroll = () => {
    window.location.href = '#footer';
  };

  const buttonStyle = (id) =>
    `px-6 py-4 rounded-lg font-semibold transition-all duration-300 shadow ${
      activeTab === id
        ? "bg-[#d8b66d] text-white"
        : "bg-white text-gray-800 hover:bg-gray-100"
    }`;

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
          Project not found
        </div>
      );
    }

    const components = {
      types: {
        image: ({ value }) => {
          if (!value?.asset?._ref) return null;
          return (
            <figure className="my-8">
              <img
                loading="lazy"
                alt={value.alt || ""}
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

    return (
      <div className="bg-white min-h-screen">
        {/* Sticky Nav Placeholder */}
        <div className="bg-white shadow-sm sticky top-0 z-30 h-16" />

        {/* Fixed Hero Section */}
        <header className="fixed top-4 left-0 w-full bg-black text-white z-20">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl translate-y-12 font-bold">
              {post.title}
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mb-6">
              {post.description}
            </p>
          </div>
        </header>

        {/* Content wrapper with padding to push below fixed header */}
        <main className="pt-[160px]  max-w-7xl mx-auto px-4 py-4">
          {/* Back link and tags */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Article */}
            <article className="lg:w-2/3">
              {post.mainImage && (
                <div className="mb-10 overflow-hidden shadow-2xl pt-8 scale-105">
                  <Image
                    src={
                      urlFor(post.mainImage).width(1200).height(900).url() || ""
                    }
                    alt={post.title}
                    width={1200}
                    height={800}
                    className="w-full h-full"
                    priority
                  />
                </div>
              )}

              {/* 👇 Move this section here — right after mainImage, before content */}
              <div className="lg:hidden mb-10">
                <h3 className="text-xl font-bold mb-4 text-black">
                  Our Dholera Projects
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                  {projects?.relatedProjects?.length > 0 ? (
                    projects.relatedProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="flex gap-3 items-center bg-white hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-black">
                            {project.title}
                          </h4>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500">No related projects found.</p>
                  )}
                </div>
              </div>

              {/* Main rich text content */}
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                <div className="text-lg leading-5 max-w-none">
                  <PortableText value={post.body} components={components} />
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              {/* Related Projects */}
              <div className="bg-white rounded-xl max-md:hidden shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-black">
                  Our Dholera Projects
                </h3>
                <div className="space-y-4">
                  {projects?.relatedProjects?.length > 0 ? (
                    projects.relatedProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-lg transition"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                          {project.mainImage && (
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
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-black">
                            {project.title}
                          </h4>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500">No related projects found.</p>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="sticky mt-8 top-32">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-black">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="font-medium text-[#C69C21]">
                        {post.categories?.find((c) =>
                          ["active", "sold out", "coming soon"].includes(
                            c.title
                          )
                        )?.title || "Active"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">
                        {post.location || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment</span>
                      <span className="font-medium">
                        {post.investment || "Contact for details"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Returns</span>
                      <span className="font-medium">
                        {post.returns || "Contact for details"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      aria-label="ContactForm"
                      onClick={handleScroll}
                      className="w-full bg-[#FDB913] hover:bg-[#C69C21] text-black py-3 rounded-lg font-medium transition-colors"
                    >
                      Request More Information
                    </button>
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
        <div className="text-center">
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
