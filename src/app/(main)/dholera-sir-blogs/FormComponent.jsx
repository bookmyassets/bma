"use client";
import React, { useState } from "react";
import BrochureDownload from "../components/BrochureDownload";
import ContactForm from "../components/Contactform";
import { AnimatePresence } from "framer-motion";

export default function FormComponent() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };

  return (
    <div>
      <div className="flex m-2 flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className=" bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">Ready to Invest?</h3>
                  <p className="text-white/80 text-sm">Get expert guidance & exclusive opportunities</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={openContactForm} className="bg-[#deae3c] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap">
                    Free Consultation
                  </button>
                  <button onClick={openBrochureForm} className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>

      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <ContactForm
              title=""
              buttonName="Talk To Investment Advisor"
              onClose={() => closeContactForm()}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title=""
              buttonName="Download Brochure"
              onClose={() => closeBrochureForm()}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
