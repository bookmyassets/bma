"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Download,
  Share2,
  FileText,
  Upload,
  Eye,
  BookOpen,
  FormInput,
  FileSpreadsheet,
  Presentation,
} from "lucide-react";

export default function Assessment() {
  // Resource data array - add your resources here
  const resources = [
    {
      id: 1,
      name: "Truliyo Digital",
      headline: "OnBoarding Form",
      link: "https://docs.google.com/forms/d/1WEAKIMoA7AMjRByHty6Lt95fsqRfi71kL1EZRK5Eff8/edit",
      icon: <FormInput className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      name: "BookMyAssets",
      headline: "Induction Assessment",
      link: "https://docs.google.com/forms/d/1sAyTdYx0XRcKjzbn8Jbxatrbw9mnoBKzDWr5c4JT4vs/edit",
      icon: <FormInput className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-800",
    },
    {
      id: 3,
      name: "BookMyAssets",
      headline: "Dholera Assessment",
      link: "https://docs.google.com/forms/d/1ZpqTgFkDfoEYOsPF-zY_4zAuAQqpGuseAZKyPF8GQU0/edit",
      icon: <FormInput className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-800",
    },
    {
      id: 4,
      name: "BookMyAssets",
      headline: "Real Estate Assessment",
      link: "https://docs.google.com/forms/d/1398Efg-Lu7c44ZR4h6ihn87pv0trW3s_2xb1CV3kujI/edit",
      icon: <FormInput className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-800",
    },
    {
      id: 5,
      name: "BookMyAssets",
      headline: "OnBoarding Form",
      link: "https://docs.google.com/forms/d/1sN_5LTFH5FODiam37xcbVHhUCeAHwHTSr8GtrBVHflc/edit",
      icon: <FormInput className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-800",
    },
    // Add more resources as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Assessments
                </h1>
                <p className="text-sm text-gray-600">Quick Access Portal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${resource.color}`}>
                    {resource.icon}
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${resource.color}`}>
                    {resource.name}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.headline}
                </h3>
                
                <div className="mt-6">
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Open Resource
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              How to Use This Portal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  <span className="text-blue-600 mr-2">1.</span>
                  Accessing Resources
                </h3>
                <p className="text-sm text-gray-600">
                  Click on any resource card to open it in a new tab. Each card represents a different form or document.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  <span className="text-blue-600 mr-2">2.</span>
                  Identifying Resources
                </h3>
                <p className="text-sm text-gray-600">
                  The colored badge shows which company the resource belongs to (Truliyo Digital or BookMyAssets).
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  <span className="text-blue-600 mr-2">3.</span>
                  Adding New Resources
                </h3>
                <p className="text-sm text-gray-600">
                  To add a new resource, edit the 'resources' array in the code with the appropriate details.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  <span className="text-blue-600 mr-2">4.</span>
                  Requesting Access
                </h3>
                <p className="text-sm text-gray-600">
                  If you can't access a resource, contact your administrator for permissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}