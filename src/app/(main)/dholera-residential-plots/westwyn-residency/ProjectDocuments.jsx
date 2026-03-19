// ProjectDocuments.jsx
import { FileText, Download, ExternalLink } from "lucide-react";

const ProjectDocuments = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return null;
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType) => {
    if (!mimeType) return <FileText className="w-5 h-5 text-gray-600" />;
    
    const type = mimeType.split('/')[0];
    const subtype = mimeType.split('/')[1];
    
    const iconColors = {
      pdf: 'text-red-600 bg-red-100',
      word: 'text-blue-600 bg-blue-100',
      excel: 'text-green-600 bg-green-100',
      powerpoint: 'text-orange-600 bg-orange-100',
      image: 'text-purple-600 bg-purple-100',
      default: 'text-gray-600 bg-gray-100'
    };
    
    let iconClass = iconColors.default;
    
    if (subtype === 'pdf') {
      iconClass = iconColors.pdf;
    } else if (mimeType.includes('officedocument.wordprocessingml') || subtype.includes('msword')) {
      iconClass = iconColors.word;
    } else if (mimeType.includes('officedocument.spreadsheetml') || subtype.includes('excel')) {
      iconClass = iconColors.excel;
    } else if (mimeType.includes('officedocument.presentationml') || subtype.includes('powerpoint')) {
      iconClass = iconColors.powerpoint;
    } else if (type === 'image') {
      iconClass = iconColors.image;
    }
    
    return (
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconClass.split(' ')[1]}`}>
        <FileText className={`w-5 h-5 ${iconClass.split(' ')[0]}`} />
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white via-white to-blue-50/30 rounded-2xl md:rounded-3xl shadow-sm md:shadow-xl border border-gray-200 p-4 md:p-6 lg:p-8 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
          Project Documents
        </h3>
      </div>
      
      <div className="space-y-2 md:space-y-3">
        {documents.map((doc, index) => (
          <div
            key={doc._key || index}
            className="group bg-white rounded-lg md:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm md:hover:shadow-md transition-all duration-200 p-3 md:p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {getFileIcon(doc.asset?.mimeType)}
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">
                    {doc.asset?.originalFilename || `Document ${index + 1}`}
                  </h4>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <span className="uppercase font-medium">
                      {doc.asset?.mimeType?.split('/')[1] || 'PDF'}
                    </span>
                    {doc.asset?.size && (
                      <>
                        <span>•</span>
                        <span>{formatFileSize(doc.asset.size)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end sm:justify-normal gap-2 flex-shrink-0">
                <a
                  href={doc.asset?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium rounded-md md:rounded-lg transition-colors"
                  aria-label={`Download ${doc.asset?.originalFilename}`}
                >
                  <Download className="w-5 h-5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href={doc.asset?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium rounded-md md:rounded-lg transition-colors"
                  aria-label={`View ${doc.asset?.originalFilename}`}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="hidden sm:inline">View</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDocuments;