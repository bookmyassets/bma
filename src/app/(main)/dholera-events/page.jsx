"use client"
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventForm from "./eventForm";

export default function page() {


    const [currentIndex, setCurrentIndex] = useState(0);

  const pastEvents = [
    {
      id: 1,
      name: "Dholera : Now or Never, Delhi ",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Dholera : Now or Never, Jaipur ",
      date: "February 28, 2024",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Dholera : Now or Never, Kanpur ",
      date: "April 10, 2024",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Dholera : Now or Never, Indore ",
      date: "January 20, 2024",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Dholera : Now or Never, Udaipur ",
      date: "May 5, 2024",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Dholera : Now or Never, Jodhpur ",
      date: "June 12, 2024",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop"
    }
  ];

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, pastEvents.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <>
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div className="absolute inset-0 ">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "black" }}
          ></div>
        </div>
        <div className="container mx-auto px-6 pt-10 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
                Dholera : <span style={{ color: "#deae3c" }}>Now or Never</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Join BookMyAssets and unlock premium opportunities in Dholera
                Smart City with guaranteed commissions and full support.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Guaranteed Commissions
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Registry Ready Inventory
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Full Support
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div
              className="rounded-2xl p-8 text-center shadow-2xl"
              style={{ backgroundColor: "#deae3c" }}
            >
              <div className="text-6xl mb-4">🤝</div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "#0d0d0d" }}
              >
                Channel Partner
              </h3>
              <p style={{ color: "#0d0d0d" }} className="opacity-80">
                Premium Partnership Program
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Upcoming Events */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-3xl font-semibold mb-6">
            Upcoming Event
          </p>
          <div className="flex gap-4">
            <div className="w-[60%] bg-gray-100 p-4 rounded-lg">
              {/* 60% section - Add your content here */}
            </div>
            <div className="w-[40%] bg-gray-200 p-4 rounded-lg">
              <EventForm />
            </div>
          </div>
        </div>
      </div>
      {/* Past Events */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-3xl font-semibold mb-6">Past Event</p>
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                }}
              >
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex-shrink-0 w-[calc(25%-12px)]"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {event.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{event.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Only show if more than 4 events */}
            {pastEvents.length > itemsPerPage && (
              <>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === maxIndex}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
