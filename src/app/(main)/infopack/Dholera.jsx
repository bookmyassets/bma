"use client"
import { projectInfoX } from '@/sanity/lib/api'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
 
export default function Dholera() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const autoPlayRef = useRef(null)
 
  /* ── Responsive slides per view ── */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(3)       // lg
      else if (window.innerWidth >= 768) setSlidesPerView(2)   // md
      else setSlidesPerView(1)                                  // mobile
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
 
  /* ── Fetch projects ── */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectInfoX()
        setProjects(data?.relatedProjects || [])
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError(err.message || "Failed to load projects")
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])
 
  const maxIndex = Math.max(0, projects.length - slidesPerView)
 
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])
 
  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])
 
  /* ── Auto-play ── */
  useEffect(() => {
    if (projects.length <= slidesPerView) return
    autoPlayRef.current = setInterval(nextSlide, 5000)
    return () => clearInterval(autoPlayRef.current)
  }, [nextSlide, projects.length, slidesPerView])
 
  const pauseAutoPlay = () => clearInterval(autoPlayRef.current)
 
  /* ── States ── */
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FDB913]" />
      <p className="text-gray-500 text-sm">Loading projects…</p>
    </div>
  )
 
  if (error) return (
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
 
  if (!projects.length) return (
    <div className="text-center py-12">
      <p className="text-gray-500">No projects available at the moment.</p>
      <Link href="/contact" className="inline-block mt-4 bg-[#FDB913] hover:bg-[#C69C21] text-black py-2 px-4 rounded transition-colors">
        Contact Us
      </Link>
    </div>
  )
 
  /* ── Helpers ── */
  const getProjectLink = (project) => {
    const slug = typeof project.slug === "object" ? project.slug.current : project.slug
    return `/about-dholera-sir/${slug}`
  }
 
  const showNav = projects.length > slidesPerView
  const slideWidthPercent = 100 / slidesPerView
 
  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-2 py-8 group"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={() => {
        if (projects.length > slidesPerView) {
          autoPlayRef.current = setInterval(nextSlide, 5000)
        }
      }}
    >
      {/* ── Slider track ── */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * slideWidthPercent}%)` }}
        >
          {projects.map((project, index) => (
            <div
              key={project._id || index}
              className="flex-shrink-0 px-3"
              style={{ width: `${slideWidthPercent}%` }}
            >
              {/* ── Card with fixed height ── */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-[420px] flex flex-col overflow-hidden">
                {/* Image — fixed height */}
                <div className="relative h-52 w-full flex-shrink-0">
                  {project.mainImage ? (
                    <Image
                      src={urlFor(project.mainImage).width(800).height(600).url()}
                      alt={project.title || 'Project image'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
 
                {/* Content — grows to fill remaining space */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 flex-1">
                    {project.metaDescription || 'Project description'}
                  </p>
 
                  {/* Footer — always at bottom */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    {project.location ? (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {project.location}
                      </span>
                    ) : <span />}
 
                    <Link
                      href={getProjectLink(project)}
                      className="inline-block bg-[#FDB913] hover:bg-[#C69C21] text-black text-sm font-semibold py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
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
 
      {/* ── Prev / Next arrows ── */}
      {showNav && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-100 p-2.5 rounded-full hover:bg-[#FDB913] transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1/2"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-100 p-2.5 rounded-full hover:bg-[#FDB913] transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-1/2"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
 
      {/* ── Dot indicators ── */}
      {showNav && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? 'bg-[#FDB913] w-6 h-2.5'
                  : 'bg-gray-300 w-2.5 h-2.5'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}