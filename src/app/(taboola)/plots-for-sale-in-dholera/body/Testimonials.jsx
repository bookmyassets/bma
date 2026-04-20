"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import vikas from "@/assests/testimonials/vikas-patel.webp";
import pooja from "@/assests/testimonials/pooja-shah.webp";
import saransh from "@/assests/testimonials/saransh-pal.webp";

const testimonials = [
  {
    quote:
      "Investing in Dholera Smart City through BookMyAssets was one of the a confident decisions I made. The team guided me through every step, ensuring a hassle-free purchase. The plot prices are affordable, and I am already seeing a promising developing area. Highly recommended.",
    name: "Saransh Pal",
    location: "Gurugram",
    avatar: saransh,
  },
  {
    quote:
      "I was initially skeptical about investing in Dholera, but BookMyAssets provided me with all the necessary details and market insights. Their transparency and professionalism gave me confidence, and now I own a prime plot in Gujarat's first smart city. Excited about the future.",
    name: "Pooja Shah",
    location: "Ahmedabad",
    avatar: pooja,
  },
  {
    quote:
      "Dholera Smart City is the future, and BookMyAssets helped me secure a future-focused plot opportunity. Their team is knowledgeable and responsive and ensures a smooth transaction. I am confident my investment will yield long-term investment option in the coming years.",
    name: "Vikas Patel",
    location: "Delhi",
    avatar: vikas,
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
        <h2 className="text-center text-3xl font-bold text-[#deae3c] mb-12">
          What Our Clients Say
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
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#deae3c]">
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
                  <p className="text-sm text-[#deae3c] font-medium">
                    {testimonials[currentMobileIndex].location}
                  </p>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-6 left-0 text-5xl text-[#deae3c] opacity-20">
                    “
                  </div>
                  <p className="text-gray-600 italic text-center px-2">
                    {testimonials[currentMobileIndex].quote}
                  </p>
                  <div className="absolute -bottom-6 right-0 text-5xl text-[#deae3c] opacity-20">
                    ”
                  </div>
                </div>
              </div>

              {/* Navigation Buttons for Mobile */}
              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  onClick={prevMobileSlide}
                  className="bg-[#deae3c] hover:bg-[#deae3c] text-white rounded-full p-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Navigation Dots */}
                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMobileIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${currentMobileIndex === index ? "bg-[#deae3c]" : "bg-gray-300"}`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextMobileSlide}
                  className="bg-[#deae3c] hover:bg-[#deae3c] text-white rounded-full p-2"
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
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#deae3c] shadow-md">
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
                    <p className="text-sm text-[#deae3c] font-medium mb-4">
                      {testimonial.location}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="px-6 pb-4 relative">
                    <div className="absolute top-0 left-6 text-5xl text-[#deae3c] opacity-10">
                      “
                    </div>
                    <p className="text-gray-600 italic text-center">
                      {testimonial.quote}
                    </p>
                    <div className="absolute bottom-0 right-6 text-5xl text-[#deae3c] opacity-10">
                      ”
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialPagination;
