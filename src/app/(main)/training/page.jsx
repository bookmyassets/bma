"use client";
import React, { useState } from "react";
import {
  Play,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Star,
  Award,
  Users,
  BookOpen,
  Download,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

// Import your Company component
import Company from "./Company";
import RealEstate from "./RealEstate";
import DholeraSIR from "./DholeraSIR";
import WestWyn from "./WestWyn";
import Assessment from "./Assessment";

export default function NewJoineeTraining() {
  const [completedModules, setCompletedModules] = useState([]);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);

  const trainingModules = [
    {
      id: 1,
      title: "Company Overview & Culture",
      description: "Learn about our mission, values, and company culture",
      duration: "45 min",
      difficulty: "Beginner",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Real Estate",
      description: "Essential HR policies, code of conduct, and compliance",
      duration: "30 min",
      difficulty: "Beginner",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Dholera SIR",
      description: "Security protocols, system access, and digital tools",
      duration: "60 min",
      difficulty: "Intermediate",
      icon: <Award className="w-6 h-6" />,
    },
    {
      id: 4,
      title: "WestWyn County & Sales Tele-CRM",
      description: "Department-specific skills and responsibilities",
      duration: "90 min",
      difficulty: "Advanced",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      id: 5,
      title: "Mock Call Training & Assessment",
      description: "Department-specific skills and responsibilities",
      duration: "90 min",
      difficulty: "Advanced",
      icon: <BookOpen className="w-6 h-6" />,
    },
  ];

  const resources = [
    { title: "Employee Handbook", type: "PDF", size: "2.1 MB" },
    { title: "Org Chart", type: "PDF", size: "1.5 MB" },
    { title: "Benefits Guide", type: "PDF", size: "3.2 MB" },
    { title: "IT Setup Guide", type: "PDF", size: "1.8 MB" },
  ];

  const faqs = [
    {
      question: "How do I access my company email?",
      answer:
        "Your IT administrator will provide login credentials within 24 hours of your start date.",
    },
    {
      question: "When will I receive my ID card?",
      answer:
        "ID cards are typically ready within 2-3 business days. You'll be notified when it's ready for pickup.",
    },
    {
      question: "What are the working hours?",
      answer:
        "Standard working hours are 9:00 AM to 6:00 PM, Monday through Friday. Flexible arrangements may be available.",
    },
    {
      question: "How do I submit time off requests?",
      answer:
        "Use the HR portal or speak with your direct supervisor. Submit requests at least 2 weeks in advance.",
    },
  ];

  const handleStartModule = (moduleId) => {
    if (moduleId === 1) {
      // Company Overview module
      setCurrentModule("company");
    } else if (moduleId === 2) {
      setCurrentModule("RealEstate");
    } else if (moduleId === 3) {
      setCurrentModule("DholeraSIR");
    } else if (moduleId === 4) {
      setCurrentModule("Westwyn");
    } else if (moduleId === 5) {
      setCurrentModule("Assessment");
    } else {
      // For other modules, you can add more logic here
      alert(`Starting module ${moduleId}. You can add more components here.`);
    }
  };

  const handleBackToTraining = () => {
    setCurrentModule(null);
  };

  const toggleModuleCompletion = (moduleId) => {
    setCompletedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const progressPercentage =
    (completedModules.length / trainingModules.length) * 100;

  // If a module is selected, show that module's component
  if (currentModule === "company") {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        {/* Back to Training Button */}
        <div className="bg-white shadow-sm border-b sticky top-24 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBackToTraining}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Training</span>
              </button>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Company Overview & Culture
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Component */}
        <Company />
      </div>
    );
  } else if (currentModule === "RealEstate") {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        {/* Back to Training Button */}
        <div className="bg-white shadow-sm border-b sticky top-24 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBackToTraining}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Training</span>
              </button>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Real Estate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Component */}
        <RealEstate />
      </div>
    );
  } else if (currentModule === "DholeraSIR") {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        {/* Back to Training Button */}
        <div className="bg-white shadow-sm border-b sticky top-24 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBackToTraining}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Training</span>
              </button>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Dholera SIR
                </span>
              </div>
            </div>
          </div>
        </div>

        <DholeraSIR />
      </div>
    );
  } else if (currentModule === "WestWyn") {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        {/* Back to Training Button */}
        <div className="bg-white shadow-sm border-b sticky top-24 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBackToTraining}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Training</span>
              </button>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Dholera SIR
                </span>
              </div>
            </div>
          </div>
        </div>

        <WestWyn />
      </div>
    );
  } else if (currentModule === "Assessment") {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        {/* Back to Training Button */}
        <div className="bg-white shadow-sm border-b sticky top-24 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBackToTraining}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Training</span>
              </button>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Dholera SIR
                </span>
              </div>
            </div>
          </div>
        </div>

        <Assessment />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  BookMyAssets
                </h1>
                <p className="text-sm text-gray-600">New Joinee Training</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                Welcome Portal
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to BookMyAssets! 🎉
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your journey to success starts here. Let's get you up to speed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowWelcomeVideo(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Play className="w-5 h-5" />
              <span>Watch Welcome Message</span>
            </button>
            <div className="text-sm opacity-75">
              <Clock className="w-4 h-4 inline mr-1" />3 min welcome video
            </div>
          </div>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Training Progress
              </h3>
              <span className="text-sm font-medium text-gray-600">
                {completedModules.length} of {trainingModules.length} modules
                completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Just getting started</span>
              <span className="font-medium">
                {Math.round(progressPercentage)}% Complete
              </span>
              <span>Training complete! 🎓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Training Modules
            </h3>
            <p className="text-lg text-gray-600">
              Complete these modules to get fully onboarded
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {trainingModules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        {module.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {module.title}
                        </h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              module.difficulty === "Beginner"
                                ? "bg-green-100 text-green-800"
                                : module.difficulty === "Intermediate"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {module.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleModuleCompletion(module.id)}
                      className={`p-2 rounded-full transition-all duration-200 ${
                        completedModules.includes(module.id)
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <button
                    onClick={() => handleStartModule(module.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Module</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & FAQs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resource Library */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Resource Library
              </h3>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {resource.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-green-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>View All FAQs</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Need Help?</h4>
              <p className="text-gray-300 mb-4">
                Our HR team is here to support you throughout your onboarding
                journey.
              </p>
              <div className="flex space-x-4">
                <a
                  href="tel:+918130371647"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call HR</span>
                </a>
                <a
                  href="tel:+919773976404"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Trainer</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Employee Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    IT Helpdesk
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Company Directory
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Benefits Portal
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Feedback</h4>
              <p className="text-gray-300 mb-4">
                Help us improve the onboarding experience
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Share Feedback</span>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="mb-2">
              &copy; 2025 BookMyAssets. All rights reserved. | Welcome to the
              team!
            </p>
            <p className="text-xs text-gray-500">
              All code, links, modules, and components are the sole property of
              BookMyAssets (BMA) and may not be reproduced, distributed, or used
              without explicit permission.
            </p>
          </div>
        </div>
      </footer>

      {/* Welcome Video Modal */}
      {showWelcomeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Welcome Message
              </h3>
              <button
                onClick={() => setShowWelcomeVideo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Welcome to BookMyAssets!
              </h4>
              <p className="text-gray-600 mb-4">
                We're excited to have you join our team. This video would
                contain a personalized welcome message from our CEO.
              </p>
              <button
                onClick={() => setShowWelcomeVideo(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
