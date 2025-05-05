"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NotFound from "./ui/NotFound";
import { PortableText } from "next-sanity";
import { getPosts } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";


const BrowsePropertiesSection = () => {
  
  const brandColors = {
    maroon: "#650000", 
    gold: "#FDB913",
  };

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getPosts()
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-24 px-6 md:px-36" style={{ minHeight: "60vh" }}>
        <div className="container">
          <div className="flex justify-center items-center" style={{ minHeight: "40vh" }}>
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin mx-auto mb-4"
                style={{ borderColor: `${brandColors.gold}`, borderTopColor: brandColors.maroon }}></div>
              <p className="text-lg" style={{ color: brandColors.maroon }}>Loading projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show only 3 projects for the featured section
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-12 md:py-24 px-6 md:px-36 bg-gray-50">
      <div className="container mx-auto">
        <div className="w-full px-2 mb-10 text-center">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-3 relative inline-block pb-2"
              style={{ color: brandColors.maroon }}>
            Featured Projects
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 rounded-full" 
                  style={{ backgroundColor: brandColors.gold }}></span>
          </h1>
          <p className="text-sm md:text-base max-w-2xl mx-auto text-gray-600 mt-4">
            Discover some of our top projects in Dholera. Exclusive opportunities await.
          </p>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project._id}
                className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: "white" }}
              >
                <div className="relative h-64">
                {project.mainImage && (
                    <img
                      src={urlFor(project.mainImage).width(600).height(400).url()}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-end opacity-0 hover:opacity-100 transition-opacity duration-300"
                       style={{ background: `linear-gradient(to top, ${brandColors.maroon}CC, transparent)` }}>
                    <div className="p-4 text-white w-full">
                      <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3" style={{ color: brandColors.maroon }}>{project.title}</h3>
                  <div className="text-sm mb-4 line-clamp-3 text-gray-600">
                    <PortableText value={project.body} />
                  </div>
                  <Link href={`/posts/${project.slug?.current}`} passHref>
                    <button className="w-full px-4 py-2 text-white transition-colors duration-300 rounded-md" 
                            style={{ backgroundColor: brandColors.gold }}>
                      View Project
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NotFound />
        )}

        {projects.length > 3 && (
          <div className="mt-10 flex justify-center">
            <Link href="/posts/projects">
              <button className="px-6 py-3 text-white rounded-md transition-transform hover:scale-105"
                      style={{ backgroundColor: brandColors.maroon, boxShadow: `0 4px 0 ${brandColors.gold}` }}>
                Browse More Projects
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowsePropertiesSection;