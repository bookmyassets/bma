"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "This product completely changed how we approach our workflow. What used to take days now takes just hours. The team's support has been nothing short of exceptional.",
    name: "Sarah Thompson",
    title: "CEO, Innovative Tech Solutions",
    avatar: "/api/placeholder/80/80"
  },
  {
    quote: "I've worked with many services over the years, but none compare to the consistency and quality delivered here. They don't just meet expectations—they exceed them every single time.",
    name: "Michael Rodriguez",
    title: "Chief Operations Officer, Global Logistics Inc.",
    avatar: "/api/placeholder/80/80"
  },
  {
    quote: "As a startup, we needed a partner who could scale with us. Not only did they provide cutting-edge solutions, but they also became an integral part of our growth strategy.",
    name: "Elena Kovacs",
    title: "Founder, GreenTech Innovations",
    avatar: "/api/placeholder/80/80"
  },
  {
    quote: "In an industry where trust is everything, these professionals have proven themselves time and again. Their integrity and expertise are unmatched.",
    name: "Rachel Williams",
    title: "Senior Director, Financial Strategies Consulting",
    avatar: "/api/placeholder/80/80"
  },
  {
    quote: "Incredible attention to detail and a deep understanding of our complex needs. They've been a true strategic partner.",
    name: "David Chen",
    title: "Research Director, Advanced Analytics Group",
    avatar: "/api/placeholder/80/80"
  },
  {
    quote: "Transformative technology combined with exceptional customer support. They've helped us reimagine what's possible.",
    name: "Jennifer Lee",
    title: "Innovation Lead, TechFrontiers",
    avatar: "/api/placeholder/80/80"
  }
];

const TestimonialPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div className="container mx-auto px-4 py-12">
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
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <p className="italic text-gray-700 mb-4">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div transition={{ duration: 0.5 }}>
        <div className="flex justify-center items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => paginate(index + 1)}
              className="w-10 h-10"
            >
              {index + 1}
            </Button>
          ))}

          <Button 
            variant="outline" 
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialPagination;