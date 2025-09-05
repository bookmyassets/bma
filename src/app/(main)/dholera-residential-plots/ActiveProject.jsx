import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

const ActiveProjectsSection = () => {
  const [activeProjects, setActiveProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActiveProjects() {
      try {
        const response = await fetch("/data/Residential.json");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projects = await response.json();
        // Filter only ongoing projects
        const ongoingProjects = projects.filter(project => project.status === 'ongoing');
        setActiveProjects(ongoingProjects);
      } catch (error) {
        console.error("Error fetching active projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchActiveProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeProjects.length === 0) {
    return null; // Don't render if no active projects
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#0d0d0d'}}>
            Explore Our Active Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover other premium residential developments currently available for investment
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProjects.map((project, index) => (
            <Link 
              href={`/dholera-residential-plots/${project.link}`} 
              key={index}
              className="group block"
            >
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.projectName}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-semibold text-white flex items-center gap-2"
                      style={{backgroundColor: '#deae3c'}}
                    >
                      <Clock className="w-4 h-4" />
                      Active
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-600 transition-colors duration-300" style={{color: '#0d0d0d'}}>
                    {project.projectName}
                  </h3>
                  
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#deae3c'}} />
                    <p className="text-gray-600 text-sm">{project.location}</p>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="font-semibold" style={{color: '#deae3c'}}>
                      Explore Project
                    </span>
                    <ArrowRight 
                      className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2" 
                      style={{color: '#deae3c'}} 
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link 
            href="/dholera-residential-plots" 
            className="inline-flex items-center gap-3 px-8 py-3 border-2 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            style={{
              borderColor: '#deae3c',
              color: '#deae3c'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#deae3c';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#deae3c';
            }}
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjectsSection;