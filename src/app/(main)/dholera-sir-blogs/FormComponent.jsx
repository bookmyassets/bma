"use client"
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
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16 border border-white/20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              🚀 Ready to Invest in Dholera SIR?
            </h2>
            <p className="text-gray-600 text-lg">
              Get expert guidance and exclusive investment opportunities
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={openContactForm} className="bg-gradient-to-r from-[#FF9933] to-[#138808] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Get Free Consultation
            </button>
            <button onClick={openBrochureForm} className="border-2 border-[#FF9933] text-[#FF9933] px-8 py-3 rounded-xl font-semibold hover:bg-[#FF9933] hover:text-white transition-all duration-300">
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
              onClose={() => setIsContactFormOpen(false)}
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
              onClose={() => setIsBrochureFormOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
