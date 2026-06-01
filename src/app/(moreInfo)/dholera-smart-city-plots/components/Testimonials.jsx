"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import vikas from "@/assests/testimonials/vikas-patel.webp";
import amit from "@/assests/testimonials/amit-khurana.webp";
import anjali from "@/assests/testimonials/anjali-mehta.webp";
import pooja from "@/assests/testimonials/pooja-shah.webp";
import vikram from "@/assests/testimonials/vikram-singh.webp";
import saransh from "@/assests/testimonials/saransh-pal.webp";

const testimonials = [
  {
    quote:
      "I am very satisfied with my investment in Westwyn Residency near the Dholera Activation Area in Dholera. Its proximity to the Dholera Solar Park and Dholera Special Investment Region gives me strong confidence in future growth. The buying process was smooth and transparent.",
    name: "Saransh Pal",
    location: "Gurugram",
    avatar: saransh,
  },
  {
    quote:
      "I had a great experience with BookMyAssets! The team was highly professional, responsive, and knowledgeable about the real estate market. They made the entire process from property shortlisting to final documentation, smooth and hassle-free.",
    name: "Pooja Shah",
    location: "Ahmedabad",
    avatar: pooja,
  },
  {
    quote:
      "Excellent Experience with BookMyAssets... Highly Recommended!!  The team at BookMyAssets was extremely supportive and professional throughout the entire process. Special thanks to the CRM team for being kind, responsive, and always helpful. Truly appreciate the service and would definitely recommend them.",
    name: "Vikas Patel",
    location: "Delhi",
    avatar: vikas,
  },
  {
    quote:
      "Had a great experience with BookMyAssets in Gurugram. The team was professional, transparent, and guided me to the right plot in Dholera without any pressure. They handled everything smoothly, from site visits to paperwork. If you are looking for genuine developers in Dholera, they are the ones to trust!",
    name: "Amit Khurana",
    location: "Ghaziabad",
    avatar: amit,
  },
  {
    quote:
      "Best services in Dholera real estate, thanks BookMyAssets for helping me. I was able to invest my money in better location plots with maximum profits, with BookMyAssets. Highly recommend them for plots in Dholera.",
    name: "Anjali Mehta",
    location: "Delhi",
    avatar: anjali,
  },
  {
    quote:
      "Big shoutout to the BookMyAssets team for their excellent support and honest dealings. Unlike many agents, they genuinely care about finding the right fit for you. I resold my plots to them and they helped me get good returns on my investment.",
    name: "Vikram Singh",
    location: "Ludhiana",
    avatar: vikram,
  },
];

const TestimonialPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Desktop pagination setup
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Mobile slider navigation
  const prevMobileSlide = () => {
    setCurrentMobileIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextMobileSlide = () => {
    setCurrentMobileIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-[#ddbc69] mb-12">
          #1 Choice of 561+ Families Across India and Globe
        </h2>

        {/* Mobile Slider View */}
        {isMobile && (
          <div className="relative px-4">
            <motion.div
              key={`mobile-${currentMobileIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                {/* Avatar */}
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#ddbc69]">
                    <Image
                      src={testimonials[currentMobileIndex].avatar}
                      alt={testimonials[currentMobileIndex].name}
                    />
                  </div>
                </div>

                {/* Name and Location */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {testimonials[currentMobileIndex].name}
                  </h3>
                  <p className="text-sm text-[#ddbc69] font-medium">
                    {testimonials[currentMobileIndex].location}
                  </p>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-6 left-0 text-5xl text-[#ddbc69] opacity-20">
                    “
                  </div>
                  <p className="text-gray-600 italic text-center px-2">
                    {testimonials[currentMobileIndex].quote}
                  </p>
                  <div className="absolute -bottom-6 right-0 text-5xl text-[#ddbc69] opacity-20">
                    ”
                  </div>
                </div>
              </div>

              {/* Navigation Buttons for Mobile */}
              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  onClick={prevMobileSlide}
                  className="bg-[#ddbc69] hover:bg-[#ddbc69] text-white rounded-full p-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Navigation Dots */}
                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMobileIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${currentMobileIndex === index ? "bg-[#ddbc69]" : "bg-gray-300"}`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextMobileSlide}
                  className="bg-[#ddbc69] hover:bg-[#ddbc69] text-white rounded-full p-2"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Desktop Grid View */}
        {!isMobile && (
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#ddbc69] hover:bg-[#ddbc69] hover:text-white"}`}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#ddbc69] hover:bg-[#ddbc69] hover:text-white"}`}
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Avatar */}
                  <div className="flex justify-center mt-4 mb-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#ddbc69] shadow-md">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  {/* Name and Location */}
                  <div className="text-center px-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-[#ddbc69] font-medium mb-4">
                      {testimonial.location}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="px-6 pb-4 relative">
                    <div className="absolute top-0 left-6 text-5xl text-[#ddbc69] opacity-10">
                      “
                    </div>
                    <p className="text-gray-600 italic text-center">
                      {testimonial.quote}
                    </p>
                    <div className="absolute bottom-0 right-6 text-5xl text-[#ddbc69] opacity-10">
                      ”
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentPage === index + 1 ? "bg-[#ddbc69]" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialPagination;

