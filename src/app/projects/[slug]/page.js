import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getPostBySlug, getProjectBySlug } from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function ProjectDetail({ params }) {
  // Properly destructure params without await
  const { slug } = await params;

  if (!slug) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  try {
    // Fetch both post and related projects using the same slug
    const [post, projects] = await Promise.all([
      getPostBySlug(slug),
      getProjectBySlug(slug)
    ]);

    if (!post) {
      return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
    }

    // Calculate read time (rough estimate)
    const wordCount = JSON.stringify(post.body).split(" ").length;
    const readTime = Math.ceil(wordCount / 200);

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
        link: ({ children, value }) => {
          return (
            <a
              href={value.href}
              rel="noopener noreferrer"
              className="text-[#C69C21] hover:text-[#FDB913] underline decoration-[#FDB913]/30 hover:decoration-[#FDB913] transition-colors"
            >
              {children}
            </a>
          );
        },
      },
      block: {
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold mt-12 mb-6 text-black">{children}</h2>
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
        {/* Navigation Bar */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-[#C69C21]">←</span>
                <span className="font-medium text-black">Back to Projects</span>
              </Link>
              <div className="flex gap-2">
                {post.categories &&
                  post.categories.length > 0 &&
                  post.categories.map((category) => (
                    <span
                      key={category.title}
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        category.title === "sold out"
                          ? "bg-red-600 text-white"
                          : category.title === "active"
                            ? "bg-[#FDB913] text-black"
                            : category.title === "coming soon"
                              ? "bg-black text-[#FDB913]"
                              : "bg-[#FDB913] text-black"
                      }`}
                    >
                      {category.title}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-gray-300 max-w-3xl mb-6">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-[#FDB913]">
              <span>Read time: {readTime} min</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Article Content */}
            <div className="lg:w-2/3">
              {/* Main Image */}
              {post.mainImage && (
                <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={
                      urlFor(post.mainImage).width(1200).height(800).url() || ""
                    }
                    alt={post.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <article className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                <div className="prose prose-lg max-w-none">
                  <PortableText value={post.body} components={components} />
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                {/* Project Info Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-black">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="font-medium text-[#C69C21]">
                        {post.categories?.find((c) =>
                          ["active", "sold out", "coming soon"].includes(c.title)
                        )?.title || "Active"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">{post.location || "—"}</span>
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
                    <button className="w-full bg-[#FDB913] hover:bg-[#C69C21] text-black py-3 rounded-lg font-medium transition-colors">
                      Request More Information
                    </button>
                  </div>
                </div>

                {/* Related Projects Section */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-black">
                    Our Dholera Projects
                  </h3>
                  <div className="space-y-4">
                    {projects?.relatedProjects && projects.relatedProjects.length > 0 ? (
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
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="bg-black text-white py-16 mt-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Interested in this Project?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Our investment experts are ready to answer your questions and guide
              you through the process.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-[#FDB913] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#C69C21] transition-colors shadow-lg">
                Schedule a Call
              </button>
              <button className="bg-transparent text-[#FDB913] border-2 border-[#FDB913] px-8 py-3 rounded-lg font-bold hover:bg-[#FDB913]/10 transition-colors">
                Download Brochure
              </button>
            </div>
          </div>
        </div> */}
      </div>
    );
  } catch (error) {
    console.error("Error loading project:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error loading project</h1>
          <p className="text-gray-600">Please try again later</p>
          <Link href="/projects" className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }
}