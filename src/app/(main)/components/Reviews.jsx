"use client";
import React, { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

export default function Reviews() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({
    testimonials: false,
  });
  const testimonialsRef = useRef(null);

  useEffect(() => {
    // Setup testimonial rotation
    const testimonialTimer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Setup intersection observer for animations
    const observerOptions = {
      threshold: 0.2,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === testimonialsRef.current) {
            setIsVisible((prev) => ({ ...prev, testimonials: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (testimonialsRef.current) observer.observe(testimonialsRef.current);

    return () => {
      clearInterval(timer);
      clearInterval(testimonialTimer);
      observer.disconnect();
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Anil Mehra",
      location: "Gurugram, Haryana",
      comment:
        "As a businessman, I’ve seen many projects that overpromise and underdeliver. But WestWyn County truly stood out. The way the BMA team handled my concerns, explained the location benefits, and helped me with all paperwork was impressive. For me, this isn’t just a plot — it’s a solid asset for my family's future.",
    },
    {
      id: 2,
      name: "Gurcharan Singh",
      location: "Ludhiana, Punjab",
      comment:
        "We Punjabis always believe in owning land. I was looking for something with long-term value, and Dholera seemed promising. When I visited WestWyn County, I was amazed at the planning and future scope. The staff was honest and helped like friends. I now feel I’ve done something great for my next generation.",
    },
    {
      id: 3,
      name: "Maninder Kaur",
      location: "Chandigarh",
      comment:
        "Owning a plot in WestWyn County is not just about land — it’s about being part of something premium, futuristic, and exclusive. I see it as a badge of pride. The way BMA presented the future roadmap and ROI potential, I knew I couldn’t miss this. I’m confident this is going to be one of the smartest decisions of my life.",
    },
    {
      id: 4,
      name: "Arvind Goel",
      location: "Delhi",
      comment:
        "WestWyn County isn’t just a project, it’s a lifestyle choice. We chose it because it reflects our aspirations and status. It's not for everyone, and that’s exactly what makes it so valuable. With the kind of development planned in Dholera, we’re sure this investment will give us high returns in the next 5–10 years.",
    },
    {
      id: 5,
      name: "Sanjeev Gupta",
      location: "Noida",
      comment:
        "I have invested in other places before, but this one felt special. WestWyn is not just about money — it’s about being part of a group of people who think ahead. Dholera is growing very fast, and I’m sure this plot will give me 3 to 5 times returns in the coming years. But more than the profit, I feel proud to be part of something big and important.",
    },
  ];

  return (
    <div ref={testimonialsRef} className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">What Our Clients Say</h2>
          <div className="flex items-center justify-center mt-2">
            <div className="w-16 h-px bg-gray-600"></div>
            <div className="mx-2 text-yellow-500">★</div>
            <div className="w-16 h-px bg-gray-600"></div>
          </div>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-opacity duration-500 ${isVisible.testimonials ? "opacity-100" : "opacity-0"}`}
        >
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl relative">
            <div className="flex items-center mb-6">
              <div>
                <h4 className="text-xl font-semibold">
                  {testimonials[testimonialIndex].name}
                </h4>
                <p className="text-yellow-500">
                  {testimonials[testimonialIndex].role}
                </p>
              </div>
            </div>
            <p className="text-lg italic">
              "{testimonials[testimonialIndex].comment}"
            </p>
            <div className="text-yellow-500 flex mt-6">
              <Star size={20} fill="#facc15" />
              <Star size={20} fill="#facc15" />
              <Star size={20} fill="#facc15" />
              <Star size={20} fill="#facc15" />
              <Star size={20} fill="#facc15" />
            </div>
            <div className="absolute top-4 right-4 text-6xl text-gray-700 opacity-20">
              "
            </div>
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setTestimonialIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 ${index === testimonialIndex ? "bg-yellow-500" : "bg-gray-600"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
