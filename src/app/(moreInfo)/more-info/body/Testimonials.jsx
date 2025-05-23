"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Investing in Dholera Smart City through Book My Assets was one of the best decisions I made. The team guided me through every step, ensuring a hassle-free purchase. The plot prices are affordable, and I am already seeing a great appreciation in value. Highly recommended.",
    name: "Rahul Mehta",
    location: "Gurugram",
    avatar: "/api/placeholder/80/80"
  },
  {
    quote: "I was initially skeptical about investing in Dholera, but Book My Assets provided me with all the necessary details and market insights. Their transparency and professionalism gave me confidence, and now I own a prime plot in Gujarat's first smart city. Excited about the future.",
    name: "Pooja Shah",
    location: "Ahmedabad",
    avatar: "/api/placeholder/80/80"
  },
  {
    quote: "Dholera Smart City is the future, and Book My Assets helped me secure a great investment opportunity. Their team is knowledgeable and responsive and ensures a smooth transaction. I am confident my investment will yield high returns in the coming years.",
    name: "Vikas Patel",
    location: "Delhi",
    avatar: "/api/placeholder/80/80"
  },

];

const TestimonialPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  
  // Handle responsive layout detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
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

  // Custom styles based on the color scheme
  const styles = {
    background: "bg-white",
    heading: "text-black",
    cardBorder: "border-2 border-[#FDB913]",
    quote: "text-black",
    name: "text-black font-semibold",
    location: "text-[#C69C21]",
    activeButton: "bg-[#FDB913] hover:bg-[#C69C21] text-white",
    inactiveButton: "border-[#FDB913] text-[#FDB913] hover:bg-[#FDB913] hover:text-white"
  };

  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-semibold text-[#FDB913] mb-10">Our Clients</h2>
        
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
              <div className={`bg-white shadow-md rounded-lg p-6 ${styles.cardBorder} w-full mb-8`}>
                <p className={`italic ${styles.quote} mb-6`}>
                  "{testimonials[currentMobileIndex].quote}"
                </p>
                <div className="flex items-center border-t border-[#FDB913] pt-4">
                  <div className="w-1 h-12 bg-[#FDB913] mr-3 rounded-full"></div>
                  <div>
                    <h3 className={styles.name}>
                      {testimonials[currentMobileIndex].name}
                    </h3>
                    <p className={`text-sm ${styles.location}`}>
                      {testimonials[currentMobileIndex].location}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center space-x-4 mt-4">
                <Button 
                  onClick={prevMobileSlide}
                  className={`${styles.inactiveButton} rounded-full`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full ${currentMobileIndex === index ? 'bg-[#FDB913]' : 'bg-gray-300'}`}
                      onClick={() => setCurrentMobileIndex(index)}
                    />
                  ))}
                </div>
                
                <Button 
                  onClick={nextMobileSlide}
                  className={`${styles.inactiveButton} rounded-full`}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Desktop Grid View */}
        {!isMobile && (
          <>
            <motion.div 
              key={currentPage} 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-8 mb-8"
            >
              {currentTestimonials.map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className={`bg-white shadow-md rounded-lg p-6 ${styles.cardBorder} hover:shadow-lg transition-shadow duration-300`}
                  whileHover={{ scale: 1.03 }}
                >
                  <p className={`italic ${styles.quote} mb-6 min-h-48`}>
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center border-t border-[#FDB913] pt-4">
                    <div className="w-1 h-12 bg-[#FDB913] mr-3 rounded-full"></div>
                    <div>
                      <h3 className={styles.name}>
                        {testimonial.name}
                      </h3>
                      <p className={`text-sm ${styles.location}`}>
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div transition={{ duration: 0.5 }}>
              <div className="flex justify-center items-center space-x-4">
                <Button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${styles.inactiveButton} rounded-full`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`w-10 h-10 rounded-full ${currentPage === index + 1 ? styles.activeButton : styles.inactiveButton}`}
                  >
                    {index + 1}
                  </Button>
                ))}

                <Button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${styles.inactiveButton} rounded-full`}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonialPagination;