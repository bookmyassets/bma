import Link from "next/link";
import { getPosts } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "next-sanity";
import hero from "@/assests/dholera-project.webp";

export async function generateMetadata() {
  return {
    title: "Discover Premium Real Estate Projects | BookMyAssets", 
    description:
      "Explore a curated selection of premium residential and commercial real estate projects with BookMyAssets. Find your ideal property investment today.", // Same for description
    keywords:
      "Dholera Smart City, Dholera Smart City Project, Dholera Gujarat India, Dholera SIR, Dholera Residential Plots, Dholera SIR Residential Plots, Special Investment Region, Dholera Land Price, Investment in Dholera Smart City",
  };
}

export default async function Projects() {
  const posts = await getPosts();
  const canonicalUrl = `https://www.bookmyassets.com/projects`
  return (
    <>
    <link rel="canonical" href={canonicalUrl}/>

    <div className="min-h-screen bg-white">
      {/* Hero Section with Black Background */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative w-full h-[400px]">
        <Image
          src={hero}
          alt="hero"
          fill
          className="object-cover brightness-50"
          />
        <div className="absolute inset-0 max-w-6xl mx-auto flex items-center">
          <h1 className="text-5xl px-4 font-bold text-left text-white">Dholera Smart City <br /> <span className="text-[#ddb954]"> Projects</span></h1>
        </div>
      </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                href={post.slug?.current ? `/projects/${post.slug.current}` : "#"}
                key={post._id}
                className="group"
                >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
                  {/* Project Image */}
                  <div className="relative h-52">
                    {post.mainImage ? (
                      <Image
                      src={
                        urlFor(post.mainImage).width(800).height(400).url() ||
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
                    <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>

                    {/* Key Info */}
                    <div className="border-t border-gray-200 pt-4 mt-auto">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#FDB913] mr-2"></span>
                          <span className="text-black font-medium">
                            View Details
                          </span>
                        </div>
                        <span className="text-[#C69C21] font-medium">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p className="text-lg">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Invest in Our Projects?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of investors who have already secured their financial
            future with us.
          </p>
          <a href="tel:+918130371647" className="bg-[#FDB913] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#C69C21] transition-colors shadow-lg">
            Call Now
          </a>
        </div>
      </div>
    </div>
          </>
  );
}
