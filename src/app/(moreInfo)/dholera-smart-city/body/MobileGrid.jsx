import { AnimatePresence } from "framer-motion";
import {
  Home, // For "Immediate Possession"
  CheckCircle, // For "Government Approved"
  CalendarCheck, // For "365 Days Site Visit"
  FileCheck, // For "Due Diligence"
  Download, // For "Download Brochure"
} from "lucide-react";
import { useState } from "react";
import BrochureDownload from "../components/BrochureDownload";

export default function MobilePropertyGrid() {
  const [isDownload, setIsDownload] = useState(false);

  const openBrochure = () => {
    setIsDownload(true);
  };

  const closeBrochure = () => {
    setIsDownload(false);
  };

  return (
    <div className="w-full md:hidden  bg-[#deae3c] overflow-hidden">
      {/* Top row */}
      <div className="grid grid-cols-2 divide-x divide-yellow-600">
        {/* Land Parcel */}
        <div className="p-3 text-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
            <Home className="w-3 h-3 text-[#deae3c]" />
          </div>
          <h3 className="text-xs font-semibold text-white mb-1"> </h3>
          <p className="text-sm font-bold text-white">Immediate Possesion</p>
        </div>

        {/* Type */}
        <div className="p-3 text-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
            <CheckCircle className="w-3 h-3 text-[#deae3c]" />
          </div>
          <h3 className="text-xs font-semibold text-white mb-1"></h3>
          <p className="text-sm font-bold text-white">Government Approved</p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 divide-x divide-yellow-600 border-t border-yellow-600">
        {/* Amenities */}
        <div className="p-3 text-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
            <CalendarCheck className="w-3 h-3 text-[#deae3c]" />
          </div>
          <h3 className="text-xs font-semibold text-white mb-1"> </h3>
          <p className="text-sm font-bold text-white leading-tight">
            365 Days Site Visit
          </p>
        </div>

        {/* Price */}
        <div className="p-3 text-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
            <FileCheck className="w-3 h-3 text-[#deae3c]" />
          </div>
          <h3 className="text-xs font-semibold text-white mb-1"></h3>
          <p className="text-sm font-bold text-white">Due Diligence</p>
        </div>
      </div>

      {/* Download Brochure - Full width at bottom */}
      <div className="p-3 text-center bg-[#c49634] border-t border-yellow-600">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
          <Download className="w-3 h-3 text-[#deae3c]" />
        </div>
        <h3 className="text-xs font-semibold text-white" onClick={openBrochure}>
          Download Brochure
        </h3>
      </div>
      <AnimatePresence>
        {isDownload && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Want Verified Project Details?"
              buttonName="Get A Call Back"
              onClose={() => closeBrochure()}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
