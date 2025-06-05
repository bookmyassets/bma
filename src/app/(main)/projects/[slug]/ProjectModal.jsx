'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getProjectBySlug, getProjectSOBySlug } from "@/sanity/lib/api";

function ProjectsModal({ isOpen, onClose, currentSlug }) {
  const [activeProjects, setActiveProjects] = useState([]);
  const [soldOutProjects, setSoldOutProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && currentSlug) {
      fetchProjects();
    }
  }, [isOpen, currentSlug]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentSlug) {
        throw new Error("No project slug provided");
      }

      console.log("Fetching projects for slug:", currentSlug);

      // Fetch active projects (not sold out)
      const activeData = await getProjectBySlug(currentSlug);
      console.log("Active data received:", activeData);
      
      // Handle different possible response structures
      if (Array.isArray(activeData)) {
        setActiveProjects(activeData);
      } else if (activeData?.relatedProjects && Array.isArray(activeData.relatedProjects)) {
        setActiveProjects(activeData.relatedProjects);
      } else if (activeData?.projects && Array.isArray(activeData.projects)) {
        setActiveProjects(activeData.projects);
      } else {
        console.log("No active projects found or unexpected structure");
        setActiveProjects([]);
      }

      // Fetch sold out projects
      const soldOutData = await getProjectSOBySlug(currentSlug);
      console.log("Sold out data received:", soldOutData);
      
      // Handle different possible response structures
      if (Array.isArray(soldOutData)) {
        setSoldOutProjects(soldOutData);
      } else if (soldOutData?.relatedProjects && Array.isArray(soldOutData.relatedProjects)) {
        setSoldOutProjects(soldOutData.relatedProjects);
      } else if (soldOutData?.projects && Array.isArray(soldOutData.projects)) {
        setSoldOutProjects(soldOutData.projects);
      } else {
        console.log("No sold out projects found or unexpected structure");
        setSoldOutProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const hasActiveProjects = activeProjects && activeProjects.length > 0;
  const hasSoldOutProjects = soldOutProjects && soldOutProjects.length > 0;
  const hasAnyProjects = hasActiveProjects || hasSoldOutProjects;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] p-6">
          {error ? (
            <div className="text-red-500 text-center py-8">
              {error}
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-500">Loading projects...</p>
            </div>
          ) : (
            <>
              {/* Active Projects */}
              {hasActiveProjects && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Active Projects ({activeProjects.length})
                  </h3>
                  <div className="space-y-3">
                    {activeProjects.map((project) => {
                      const projectSlugStr = typeof project.slug === "object" 
                        ? project.slug.current 
                        : project.slug;
                      
                      return (
                        <Link
                          key={project._id || projectSlugStr || Math.random()}
                          href={`/projects/${currentSlug}/${projectSlugStr}`}
                          onClick={onClose}
                          className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            {project.mainImage ? (
                              <Image
                                src={urlFor(project.mainImage).width(64).height(64).url()}
                                alt={project.title || 'Project image'}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {project.title || 'Untitled Project'}
                            </h4>
                            <p className="text-sm text-green-600 font-medium">Active</p>
                          </div>
                          <div className="text-gray-400">→</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sold Out Projects */}
              {hasSoldOutProjects && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Sold Out Projects ({soldOutProjects.length})
                  </h3>
                  <div className="space-y-3">
                    {soldOutProjects.map((project) => {
                      const projectSlugStr = typeof project.slug === "object" 
                        ? project.slug.current 
                        : project.slug;
                      
                      return (
                        <Link
                          key={project._id || projectSlugStr || Math.random()}
                          href={`/projects/${currentSlug}/${projectSlugStr}`}
                          onClick={onClose}
                          className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors opacity-75"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            {project.mainImage ? (
                              <Image
                                src={urlFor(project.mainImage).width(64).height(64).url()}
                                alt={project.title || 'Project image'}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {project.title || 'Untitled Project'}
                            </h4>
                            <p className="text-sm text-red-600 font-medium">Sold Out</p>
                          </div>
                          <div className="text-gray-400">→</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {!loading && !error && !hasAnyProjects && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">No projects found.</p>
                  <p className="text-sm text-gray-400">
                    Debug info: currentSlug = "{currentSlug}"
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsModalWithButton({ 
  currentSlug, 
  buttonText = "View All Projects",
  buttonClassName = "bg-[#FDB913] hover:bg-[#C69C21] text-black px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debug log to check if currentSlug is being passed
  console.log("ProjectsModalWithButton currentSlug:", currentSlug);

  // Don't render the button if no currentSlug is provided
  if (!currentSlug) {
    console.warn("ProjectsModalWithButton: currentSlug is required but not provided");
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={buttonClassName}
      >
        <span>{buttonText}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <ProjectsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentSlug={currentSlug}
      />
    </>
  );
}