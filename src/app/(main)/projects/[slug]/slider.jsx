"use client"
import { getProjectBySlug, projectInfoX } from '@/sanity/lib/api'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

export default function ProjectSlider() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Get the current URL path to extract the slug
        const pathSegments = window.location.pathname.split('/')
        // Extract the slug from URL (assuming URL structure is /projects/[slug])
        const slug = pathSegments[pathSegments.length - 1]
        
        if (!slug) {
          throw new Error("No project slug found in URL")
        }

        const data = await projectInfoX()
        
        // Check if relatedProjects exists and use it, otherwise use empty array
        const projectsData = data?.relatedProjects || []
        setProjects(projectsData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError(err.message || "Failed to load projects")
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Auto-advance slides (optional)
  useEffect(() => {
    if (projects.length > 1) {
      const timer = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [currentIndex, projects.length])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
        <p>Loading projects...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error loading projects: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No projects available at the moment.</p>
        <Link href="/contact" className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
          Contact Us
        </Link>
      </div>
    )
  }

  // Get URL parameters to construct proper links
  const getProjectLink = (project) => {
    try {
      const pathSegments = window.location.pathname.split('/')
      // Extract the parent slug from URL (assuming URL structure is /projects/[parentSlug])
      const parentSlug = pathSegments[pathSegments.length - 1]
      
      // Extract project slug string safely
      const projectSlugStr = typeof project.slug === "object" ? project.slug.current : project.slug
      
      return `/projects/${parentSlug}/${projectSlugStr}`
    } catch (e) {
      // Fallback to direct project link if there's an error
      return `/projects/${project.slug?.current || ''}`
    }
  }
  
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8 group">
      <h3 className="text-2xl font-bold mb-6 text-black">About Dholera</h3>
      <div className="relative overflow-hidden rounded-lg">
        {/* Slider container */}
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div 
              key={project._id || index}
              className="w-full flex-shrink-0 px-2"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                {project.mainImage && (
                  <div className="relative h-64 w-full">
                    <Image
                      src={urlFor(project.mainImage).width(800).height(600).url()}
                      alt={project.title || 'Project image'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.excerpt || 'Project description'}
                  </p>
                  <div className="flex justify-between items-center">
                    {project.location && (
                      <span className="text-sm text-gray-500">
                        {project.location}
                      </span>
                    )}
                    <Link 
                      href={getProjectLink(project)}
                      className="inline-block bg-[#FDB913] hover:bg-[#C69C21] text-black py-2 px-4 rounded transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - only show if more than one project */}
      {projects.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots indicator - only show if more than one project */}
      {projects.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === index ? 'bg-[#FDB913] w-4' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}