"use client"
import React, { useState } from 'react';
import {
  TrendingUp,
  Plug,
  Users,
  Landmark,
  ShoppingBag,
  UtensilsCrossed,
  HeartPulse,
  GraduationCap,
  Home,
} from "lucide-react";

export default function ResidentialZoneCards() {
  const [activeBenefit, setActiveBenefit] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const benefits = [
    {
      id: 'appreciation',
      icon: TrendingUp,
      color: 'blue',
      title: 'High Appreciation Potential',
      description: 'Land value may increase due to planned development in the area.'
    },
    {
      id: 'flexibility',
      icon: Home,
      color: 'green',
      title: 'Mixed-Use Flexibility',
      description: 'The land can be used for residential, commercial, and service purposes.'
    },
    {
      id: 'infrastructure',
      icon: Plug,
      color: 'purple',
      title: 'Plug & Play Infrastructure',
      description: 'Basic infrastructure, like roads and utilities, is already planned or available.'
    },
    {
      id: 'community',
      icon: Users,
      color: 'orange',
      title: 'Community-Centric Planning',
      description: 'The zone is designed with shared spaces and organized layouts.'
    },
    {
      id: 'government',
      icon: Landmark,
      color: 'red',
      title: 'Government-Backed Development',
      description: 'Development is supported by government planning and policies.'
    }
  ];

  const projects = [
    {
      id: 'retail',
      icon: ShoppingBag,
      color: 'blue',
      title: 'Retail & Commercial Services',
      description: 'Space can be used for shops, showrooms, and local businesses.'
    },
    {
      id: 'hospitality',
      icon: UtensilsCrossed,
      color: 'red',
      title: 'Hospitality & Food Services',
      description: 'Suitable for hotels, restaurants, cafés, and food outlets.'
    },
    {
      id: 'healthcare',
      icon: HeartPulse,
      color: 'green',
      title: 'Healthcare & Wellness',
      description: 'Land can be used for clinics, wellness centers, and medical services.'
    },
    {
      id: 'education',
      icon: GraduationCap,
      color: 'purple',
      title: 'Education & Community Facilities',
      description: 'Suitable for schools, training centers, and community spaces.'
    },
    {
      id: 'residential',
      icon: Home,
      color: 'orange',
      title: 'Residential & Housing Projects',
      description: 'Can be developed for homes, apartments, or residential buildings.'
    }
  ];

  const handleBenefitFlip = (id) => {
    setActiveBenefit(activeBenefit === id ? null : id);
  };

  const handleProjectFlip = (id) => {
    setActiveProject(activeProject === id ? null : id);
  };

  const colorClasses = {
    blue: { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50', hover: 'hover:bg-green-100', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-50', hover: 'hover:bg-purple-100', icon: 'text-purple-600' },
    orange: { bg: 'bg-orange-50', hover: 'hover:bg-orange-100', icon: 'text-orange-600' },
    red: { bg: 'bg-red-50', hover: 'hover:bg-red-100', icon: 'text-red-600' }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
  
    <div className="p-4">
      {/* Benefits Section */}
      <div className="mb-8">
        <p className="text-center text-3xl font-semibold mb-8">
          Benefits of Buying Land in This Zone
        </p>
        
        <div className={`flex flex-wrap justify-center gap-8 pt-4`}>
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            const isFlipped = activeBenefit === benefit.id;
            const colors = colorClasses[benefit.color];
            
            return (
              <div
                key={benefit.id}
                className="relative h-64 cursor-pointer w-full sm:w-5/12 md:w-64"
                style={{ perspective: '1000px' }}
                onClick={() => handleBenefitFlip(benefit.id)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of card */}
                  <div
                    className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Icon className={`w-16 h-16 ${colors.icon}`} />
                    <p className="text-lg font-medium text-gray-800">
                      {benefit.title}
                    </p>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} ${colors.hover} rounded-lg transition-colors`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <p className="text-base text-gray-700 text-center leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Projects Section */}
      <div className="pb-8 pt-4">
        <p className="text-center text-3xl font-semibold mb-8">
          Types of Projects Allowed
        </p>

        <div className={`flex flex-wrap justify-center gap-8`}>
          {projects.map((project) => {
            const Icon = project.icon;
            const isFlipped = activeProject === project.id;
            const colors = colorClasses[project.color];
            
            return (
              <div
                key={project.id}
                className="relative h-64 cursor-pointer w-full sm:w-5/12 md:w-64"
                style={{ perspective: '1000px' }}
                onClick={() => handleProjectFlip(project.id)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of card */}
                  <div
                    className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-4 p-6 ${colors.bg} rounded-lg ${colors.hover} transition-colors`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Icon className={`w-16 h-16 ${colors.icon}`} />
                    <p className="text-lg font-medium text-gray-800">
                      {project.title}
                    </p>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} ${colors.hover} rounded-lg transition-colors`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <p className="text-base text-gray-700 text-center leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}