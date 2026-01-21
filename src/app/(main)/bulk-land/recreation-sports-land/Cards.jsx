"use client"
import { useState } from 'react';
import {
  Trophy,
  FerrisWheel,
  Theater,
  BedDouble,
  HeartPulse,
  Users,
  Plane,
  Landmark,
  Layers,
  Train,
} from "lucide-react";

export default function RecreationZoneCards() {
  const [activeBenefit, setActiveBenefit] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const benefits = [
    {
      id: 'footfall',
      icon: Users,
      color: 'blue',
      title: 'High Footfall Potential',
      description: 'The zone attracts visitors, residents, and large event audiences.'
    },
    {
      id: 'tourism',
      icon: Plane,
      color: 'red',
      title: 'Tourism & Hospitality Growth',
      description: 'Supports tourism and leisure activities linked to city development.'
    },
    {
      id: 'community',
      icon: Landmark,
      color: 'green',
      title: 'Community & Cultural Hub',
      description: 'Designed for social events, sports, and cultural activities.'
    },
    {
      id: 'diverse',
      icon: Layers,
      color: 'purple',
      title: 'Diverse Development Options',
      description: 'Suitable for sports facilities, entertainment projects, and hospitality uses.'
    },
    {
      id: 'infrastructure',
      icon: Train,
      color: 'orange',
      title: 'Future-Ready Infrastructure',
      description: 'Planned with smart utilities, transport access, and event-ready facilities.'
    }
  ];

  const projects = [
    {
      id: 'sports',
      icon: Trophy,
      color: 'blue',
      title: 'Sports Infrastructure',
      description: 'Suitable for stadiums, indoor arenas, training centers, and gymnasiums.'
    },
    {
      id: 'amusement',
      icon: FerrisWheel,
      color: 'green',
      title: 'Amusement & Theme Parks',
      description: 'Can be developed for water parks, adventure parks, and entertainment complexes.'
    },
    {
      id: 'cultural',
      icon: Theater,
      color: 'purple',
      title: 'Cultural & Event Venues',
      description: 'Suitable for auditoriums, convention halls, theatres, and exhibition grounds.'
    },
    {
      id: 'hospitality',
      icon: BedDouble,
      color: 'orange',
      title: 'Hospitality & Tourism',
      description: 'Can be used for resorts, hotels, restaurants, and leisure clubs.'
    },
    {
      id: 'wellness',
      icon: HeartPulse,
      color: 'red',
      title: 'Wellness & Lifestyle Facilities',
      description: 'Suitable for fitness centers, spas, community clubs, and recreational spaces.'
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
      {/* Benefits Section */}
      <div className="mb-8">
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-900">
          Benefits of Buying Bulk Land in Recreation, Sports & Entertainment Zone
        </h2>
        
        <div className="flex flex-col items-center gap-8">
          {/* First row - 3 cards */}
          <div className="flex justify-center gap-8 w-full">
            {benefits.slice(0, 3).map((benefit) => {
              const Icon = benefit.icon;
              const isFlipped = activeBenefit === benefit.id;
              const colors = colorClasses[benefit.color];
              
              return (
                <div
                  key={benefit.id}
                  className="relative h-44 cursor-pointer w-56"
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
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-3 p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Icon className={`w-12 h-12 ${colors.icon}`} />
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {benefit.title}
                      </p>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second row - 2 cards */}
          <div className="flex justify-center gap-8 w-full">
            {benefits.slice(3, 5).map((benefit) => {
              const Icon = benefit.icon;
              const isFlipped = activeBenefit === benefit.id;
              const colors = colorClasses[benefit.color];
              
              return (
                <div
                  key={benefit.id}
                  className="relative h-44 cursor-pointer w-56"
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
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-3 p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Icon className={`w-12 h-12 ${colors.icon}`} />
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {benefit.title}
                      </p>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="pb-8 pt-8">
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-900">
          Types of Recreation, Sports & Entertainment Projects Allowed
        </h2>

        <div className="flex flex-col items-center gap-8">
          {/* First row - 3 cards */}
          <div className="flex justify-center gap-8 w-full">
            {projects.slice(0, 3).map((project) => {
              const Icon = project.icon;
              const isFlipped = activeProject === project.id;
              const colors = colorClasses[project.color];
              
              return (
                <div
                  key={project.id}
                  className="relative h-44 cursor-pointer w-56"
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
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-3 p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Icon className={`w-12 h-12 ${colors.icon}`} />
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {project.title}
                      </p>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second row - 2 cards */}
          <div className="flex justify-center gap-8 w-full">
            {projects.slice(3, 5).map((project) => {
              const Icon = project.icon;
              const isFlipped = activeProject === project.id;
              const colors = colorClasses[project.color];
              
              return (
                <div
                  key={project.id}
                  className="relative h-44 cursor-pointer w-56"
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
                      className={`absolute w-full h-full flex flex-col items-center justify-center text-center space-y-3 p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Icon className={`w-12 h-12 ${colors.icon}`} />
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {project.title}
                      </p>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`absolute w-full h-full flex items-center justify-center p-6 ${colors.bg} rounded-xl shadow-sm hover:shadow-md transition-all`}
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
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