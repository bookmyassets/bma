import React from 'react';
import ProjectDocuments from './ProjectDocuments';
import { client } from '@/sanity/lib/client'; // Adjust the import path as needed

// Static function to get WestWyn County project data
async function getWestWynProject() {
  try {
    const query = `
      *[_type == "project" && (title match "WestWyn*" || slug.current match "westwyn*")][0] {
        _id,
        title,
        slug,
        projectDocuments[] {
          _key,
          title,
          documentType,
          file {
            asset-> {
              _id,
              url,
              originalFilename,
              size,
              mimeType
            }
          },
          description,
          isPublic,
          uploadDate
        },
        subProjects[] -> {
          _id,
          title,
          slug,
          projectDocuments[] {
            _key,
            title,
            documentType,
            file {
              asset-> {
                _id,
                url,
                originalFilename,
                size,
                mimeType
              }
            },
            description,
            isPublic,
            uploadDate
          }
        }
      }
    `;
    
    const project = await client.fetch(query);
    return project;
  } catch (error) {
    console.error('Error fetching WestWyn project:', error);
    return null;
  }
}

// This is a Server Component in App Router
export default async function WestWynDocx() {
  const project = await getWestWynProject();

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              WestWyn County Documents
            </h1>
            <p className="text-gray-600">
              Project documents are currently not available. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Combine main project documents with subproject documents
  const allDocuments = [
    ...(project.projectDocuments || []),
    ...(project.subProjects?.flatMap(subProject => subProject.projectDocuments || []) || [])
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#deae3c] to-yellow-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title || 'WestWyn County'} Documents
            </h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Access all project documents, approvals, and important information for your investment decision
            </p>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allDocuments && allDocuments.length > 0 ? (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Project Documents
                </h2>
                <span className="bg-[#deae3c] bg-opacity-20 text-[#deae3c] text-sm font-medium px-3 py-1 rounded-full">
                  {allDocuments.length} Document{allDocuments.length !== 1 ? 's' : ''} Available
                </span>
              </div>
              
              <ProjectDocuments documents={allDocuments} />
              
              {/* Additional Info Section */}
              <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Document Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Available Document Types:</h4>
                    <ul className="space-y-1">
                      <li>• AUDA Approvals</li>
                      <li>• Master Plan</li>
                      <li>• Legal Documents</li>
                      <li>• NOC Certificates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Document Access:</h4>
                    <ul className="space-y-1">
                      <li>• All documents are verified</li>
                      <li>• Instant download available</li>
                      <li>• Regular updates provided</li>
                      <li>• Legal compliance ensured</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Documents Coming Soon
                </h3>
                <p className="text-gray-500 mb-6">
                  Project documents are being uploaded and will be available shortly.
                </p>
                <button className="bg-[#deae3c] text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                  Contact for Documents
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add metadata for SEO (App Router way)
export const metadata = {
  title: 'WestWyn County Documents - BookMyAssets',
  description: 'Access all project documents, AUDA approvals, and legal papers for WestWyn County residential plots in Dholera Smart City.',
};