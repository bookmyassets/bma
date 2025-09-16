import { AnimatePresence } from 'framer-motion';
import { Home, MapPin, Wifi, IndianRupee, Download } from 'lucide-react';
import { useState } from 'react';
import BrochureDownload from '../components/BrochureDownload';

export default function MobilePropertyGrid() {

  const [isDownload, setIsDownload] = useState(false);
  
  const openBrochure = () => {
    setIsDownload(true);
  }
  
  const closeBrochure = () => {
    setIsDownload(false);
  }

  return (
    <div className="w-full md:hidden  bg-[#deae3c] overflow-hidden">
      {/* Top row */}
      <div className="grid grid-cols-2 divide-x divide-yellow-600">
        {/* Land Parcel */}
        <div className="p-3 text-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
            <Home className="w-3 h-3 text-[#deae3c]" />
          </div>
          <h3 className="text-xs font-semibold text-white mb-1">Land Parcel</h3>
          <p className="text-sm font-bold text-white">150 Sq.Yd.</p>
        </div>

        {/* Type */}
        <div className="p-3 text-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
            <MapPin className="w-3 h-3 text-[#deae3c]" />
          </div>
          <h3 className="text-xs font-semibold text-white mb-1">Type</h3>
          <p className="text-sm font-bold text-white">Plots</p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 divide-x divide-yellow-600 border-t border-yellow-600">
        {/* Amenities */}
        <div className="p-3 text-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
            <Wifi className="w-3 h-3 text-[#deae3c]" />
          </div>
          <h3 className="text-xs font-semibold text-white mb-1">Amenities</h3>
          <p className="text-xs font-bold text-white leading-tight">
            Infrastructure & Connectivity
          </p>
        </div>

        {/* Price */}
        <div className="p-3 text-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
            <IndianRupee className="w-3 h-3 text-[#deae3c]" />
          </div>
          <h3 className="text-xs font-semibold text-white mb-1">Price</h3>
          <p className="text-sm font-bold text-white">₹ 15 Lacs*</p>
        </div>
      </div>

      {/* Download Brochure - Full width at bottom */}
      <div className="p-3 text-center bg-[#c49634] border-t border-yellow-600">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
          <Download className="w-3 h-3 text-[#deae3c]" />
        </div>
        <h3 className="text-xs font-semibold text-white">Download Brochure</h3>
      </div>
      <AnimatePresence>
{isDownload && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title=""
              buttonName="Download Brochure"
              onClose={() => closeBrochure()}
              />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}