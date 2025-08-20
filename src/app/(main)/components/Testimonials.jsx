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
      "Investing in Dholera Smart City through Book My Assets was one of the best decisions I made. The team guided me through every step, ensuring a hassle-free purchase. The plot prices are affordable, and I am already seeing a great appreciation in value. Highly recommended.",
    name: "Saransh Pal",
    location: "Gurugram",
    avatar: saransh,
  },
  {
    quote:
      "I was initially skeptical about investing in Dholera, but Book My Assets provided me with all the necessary details and market insights. Their transparency and professionalism gave me confidence, and now I own a prime plot in Gujarat's first smart city. Excited about the future.",
    name: "Pooja Shah",
    location: "Ahmedabad",
    avatar: pooja,
  },
  {
    quote:
      "Dholera Smart City is the future, and Book My Assets helped me secure a great investment opportunity. Their team is knowledgeable and responsive and ensures a smooth transaction. I am confident my investment will yield high returns in the coming years.",
    name: "Vikas Patel",
    location: "Delhi",
    avatar: vikas,
  },
  {
    quote:
      "I invested ₹25 lakhs in a plot at Dholera Smart City three years ago through Book My Assets. Today, my investment has already appreciated by 10%, and I can see the future growth potential is even higher. The team provided excellent support throughout the buying process, making it a seamless experience. I highly recommend Book My Assets to anyone looking for a profitable real estate investment.",
    name: "Amit Khurana",
    location: "Ghaziabad",
    avatar: amit,
  },
  {
    quote:
      "This was my first real estate investment, and I had many doubts. Book My Assets patiently guided me through every detail, helping me choose the best plot within my budget. The property value has already been appreciated, and I feel confident about my decision. Great service and a trustworthy team.",
    name: "Anjali Mehta",
    location: "Delhi",
    avatar: anjali,
  },
  {
    quote:
      "I wanted to invest in a futuristic city with strong growth potential, and Dholera Smart City was the perfect choice. The infrastructure development, government support, and upcoming projects make it a great investment hub. Thanks to Book My Assets for their expert advice and smooth transaction process.",
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
        <h2 className="text-center text-3xl font-bold text-[#FDB913] mb-12">
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
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#FDB913]">
                    <Image 
                      src={testimonials[currentMobileIndex].avatar} 
                      alt={testimonials[currentMobileIndex].name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                
                {/* Name and Location */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {testimonials[currentMobileIndex].name}
                  </h3>
                  <p className="text-sm text-[#C69C21] font-medium">
                    {testimonials[currentMobileIndex].location}
                  </p>
                </div>
                
                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-6 left-0 text-5xl text-[#FDB913] opacity-20">“</div>
                  <p className="text-gray-600 italic text-center px-2">
                    {testimonials[currentMobileIndex].quote}
                  </p>
                  <div className="absolute -bottom-6 right-0 text-5xl text-[#FDB913] opacity-20">”</div>
                </div>
              </div>
              
              {/* Navigation Buttons for Mobile */}
              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  onClick={prevMobileSlide}
                  className="bg-[#FDB913] hover:bg-[#e5a711] text-white rounded-full p-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                {/* Navigation Dots */}
                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMobileIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${currentMobileIndex === index ? 'bg-[#FDB913]' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                
                <Button
                  onClick={nextMobileSlide}
                  className="bg-[#FDB913] hover:bg-[#e5a711] text-white rounded-full p-2"
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
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#FDB913] hover:bg-[#FDB913] hover:text-white"}`}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#FDB913] hover:bg-[#FDB913] hover:text-white"}`}
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
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#FDB913] shadow-md">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>

                  {/* Name and Location */}
                  <div className="text-center px-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-[#C69C21] font-medium mb-4">
                      {testimonial.location}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="px-6 pb-4 relative">
                    <div className="absolute top-0 left-6 text-5xl text-[#FDB913] opacity-10">
                      “
                    </div>
                    <p className="text-gray-600 italic text-center">
                      {testimonial.quote}
                    </p>
                    <div className="absolute bottom-0 right-6 text-5xl text-[#FDB913] opacity-10">
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
                  className={`w-3 h-3 rounded-full transition-colors ${currentPage === index + 1 ? "bg-[#FDB913]" : "bg-gray-300"}`}
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