"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";
import CommonForm from "../components/CommonForm";

export default function CTAsection() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => setIsContactFormOpen(true);
  const closeContactForm = () => setIsContactFormOpen(false);

  return (
    <>
      <div className="relative py-16 px-4 overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
        {/* Decorative blobs */}
        <div
          className="absolute top-10 left-10 w-24 h-24 rounded-full blur-2xl animate-pulse"
          style={{ backgroundColor: "#deae3c22" }}
        />
        <div
          className="absolute bottom-10 right-10 w-36 h-36 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ backgroundColor: "#deae3c11" }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Expert Guidance for{" "}
              <span style={{ color: "#deae3c" }}>Smart Investors</span>
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{ backgroundColor: "#deae3c" }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm mb-12 leading-relaxed"
            style={{ color: "#cccccc" }}
          >
            Have questions about Dholera investments? Our team is here to guide
            you every step of the way.
          </motion.p>

          {/* Call + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8"
          >
            {/* Call Now */}
            <motion.a
              href="tel:+918130371647"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative text-black px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 min-w-[200px]"
              style={{
                backgroundColor: "#deae3c",
                border: "1px solid #deae3c",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now
              </span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/918130371647"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative text-black px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 min-w-[200px]"
              style={{
                backgroundColor: "#deae3c",
                border: "1px solid #deae3c",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z" />
                </svg>
                WhatsApp Now
              </span>
            </motion.a>
          </motion.div>

          {/* Get Callback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={openContactForm}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 min-w-[250px]"
              style={{
                backgroundColor: "transparent",
                border: "2px solid #deae3c",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#deae3c1a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: "#deae3c" }}>
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Get A Call Back
              </span>
            </motion.button>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm mt-8"
            style={{ color: "#888888" }}
          >
            Our investment advisors are available 24/7 to help you make the right choice
          </motion.p>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.80)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactForm}
          >
            <motion.div
              className="rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: "#111111",
                border: "1px solid #deae3c55",
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={closeContactForm}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{
                    backgroundColor: "#deae3c22",
                    border: "1px solid #deae3c55",
                    color: "#deae3c",
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Get A Call Back</h3>
                    <div
                      className="w-16 h-1 mx-auto rounded-full"
                      style={{ backgroundColor: "#deae3c" }}
                    />
                  </div>
                  <CommonForm
                    title="Buy Residential Plots in Dholera Just 5 Min from SIR"
                    buttonName="Talk To Our Investment Advisor"
                    onClose={closeContactForm}
                    id="faq-form"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}