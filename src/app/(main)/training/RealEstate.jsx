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
} from "lucide-react";
import Link from "next/link";

export default function RealEstate() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Placeholder for your PPT slides - replace with your actual slide content
  const slides = [
    {
      id: 1,
      title: "Company Overview",
      content: "Your PPT slide content will be displayed here",
    },
    {
      id: 2,
      title: "Our Mission & Vision",
      content: "Slide 2 content",
    },
    {
      id: 3,
      title: "Our Services",
      content: "Slide 3 content",
    },
    {
      id: 4,
      title: "Team & Culture",
      content: "Slide 4 content",
    },
    {
      id: 5,
      title: "Contact Us",
      content: "Slide 5 content",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

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
                  Company Overview
                </h1>
                <p className="text-sm text-gray-600">Presentation Mode</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleAutoplay}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                title={isPlaying ? "Pause slideshow" : "Start slideshow"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <Link href="https://docs.google.com/presentation/d/e/2PACX-1vQ7kl3aVMbQpi4uKDI-LDfH5M89H1RXQ1JUYGTobbx6FsyIVIzYd13dVyyTplZL4UpBQ_U9U3Vnv1JT/pub?start=false&loop=false&delayms=2000" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Download className="w-5 h-5" />
              </Link>
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Presentation Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Slide Display Area */}
          <div
            className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-black" : "aspect-video bg-gray-50"}`}
          >
            {/* Embedded Google Slides Presentation */}
            <div className="w-full h-full">
              <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vQ7kl3aVMbQpi4uKDI-LDfH5M89H1RXQ1JUYGTobbx6FsyIVIzYd13dVyyTplZL4UpBQ_U9U3Vnv1JT/embed?start=false&loop=false&delayms=2000"
                frameBorder="0"
                width="100%"
                height="100%"
                allowFullScreen
                className="rounded-lg"
              />
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg p-2 shadow-lg transition-all duration-200 z-10"
            >
              <Maximize2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Slide Navigation & Controls */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Google Slides Presentation
                </span>
                <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Live
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="https://docs.google.com/presentation/d/e/2PACX-1vQ7kl3aVMbQpi4uKDI-LDfH5M89H1RXQ1JUYGTobbx6FsyIVIzYd13dVyyTplZL4UpBQ_U9U3Vnv1JT/pub?start=false&loop=false&delayms=2000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View in Google Slides</span>
                </a>
              </div>
            </div>

            {/* Presentation Info */}
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Embedded Google Slides Presentation
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Navigate through slides using the controls within the presentation
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Success Message */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            ✅ Google Slides Successfully Integrated!
          </h3>
          <div className="space-y-2 text-sm text-green-700">
            <p>
              <strong>✓ Embedded:</strong> Your Google Slides presentation is now embedded and ready to view
            </p>
            <p>
              <strong>✓ Interactive:</strong> Users can navigate through slides directly within the embed
            </p>
            <p>
              <strong>✓ Responsive:</strong> The presentation adapts to different screen sizes
            </p>
            <p>
              <strong>✓ Fullscreen:</strong> Click the fullscreen button for an immersive viewing experience
            </p>
          </div>
        </div>


        {/* Usage Instructions */}
        <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-800 mb-3">
            🎯 How to Use This Component
          </h3>
          <div className="space-y-4 text-sm text-indigo-700">
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="font-medium mb-2">1. Navigation:</p>
              <p>Use the controls within the embedded presentation to navigate between slides</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="font-medium mb-2">2. Fullscreen Mode:</p>
              <p>Click the maximize button (top-right corner) for immersive fullscreen viewing</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="font-medium mb-2">3. External Access:</p>
              <p>Use the "View in Google Slides" button to open the presentation in a new tab</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="font-medium mb-2">4. Sharing:</p>
              <p>Share this page URL with your audience for consistent viewing experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}