"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventForm from "./eventForm";
import { FaCalendar, FaCalendarAlt } from "react-icons/fa";

export default function page() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pastEvents = [
    {
      id: 1,
      name: "Dholera : Now or Never, Delhi ",
      date: "March 15, 2024",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Dholera : Now or Never, Jaipur ",
      date: "February 28, 2024",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Dholera : Now or Never, Kanpur ",
      date: "April 10, 2024",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Dholera : Now or Never, Indore ",
      date: "January 20, 2024",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Dholera : Now or Never, Udaipur ",
      date: "May 5, 2024",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Dholera : Now or Never, Jodhpur ",
      date: "June 12, 2024",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
    },
  ];

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, pastEvents.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <>
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div className="absolute inset-0">
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
                Join our sessions, webinars, and on-ground events to explore
                India's emerging smart city opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Personalized Consultation
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Verified Location and Venue Assitance
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Connect With Verified Dholera Advisiors
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Meet Industry Leaders
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div
              className="rounded-2xl p-8 text-center shadow-2xl"
              style={{ backgroundColor: "#deae3c" }}
            >
              <div className="text-6xl mb-4 text-white flex justify-center">
                <FaCalendarAlt />
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "#0d0d0d" }}
              >
                Dholera Events
              </h3>
              <p style={{ color: "#0d0d0d" }} className="opacity-80">
                Check the Event Calendar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* White Section with Event Details - Overlaps the dark section */}
      <div className="relative -mt-16 z-20 ">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Event Name</p>
                <p className="font-semibold text-gray-900">
                  Dholera : Now or Never
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Event Date</p>
                <p className="font-semibold text-gray-900">
                  15th November 2025
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Event Location</p>
                <p className="font-semibold text-gray-900">Chandigarh</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-3xl font-semibold mb-6">
            Upcoming Event
          </p>
          <div className="md:flex gap-4">
            <div className="md:w-[60%] bg-gray-100 p-4 rounded-lg">
              {/* About the Event */}
              <div className="mb-6 pt-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  About the Event
                </h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    What's Happening:
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dholera: Now or Never is a one-day investor meetup hosted by
                    BookMyAssets, designed for professionals and investors
                    seeking clarity on Dholera's rapid growth and long-term
                    potential. The session highlights the city's evolving
                    infrastructure, strong policy framework, and the industrial
                    investments that are shaping its future.
                  </p>
                </div>
              </div>

              {/* Event Details */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Event Details
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <span className="font-semibold text-gray-700">
                      Event Name:
                    </span>{" "}
                    Dholera: Now or Never - One-Day Investor Meetup
                  </li>
                  <li>
                    <span className="font-semibold text-gray-700">Dates:</span>{" "}
                    15th November
                  </li>
                  <li>
                    <span className="font-semibold text-gray-700">Time:</span>{" "}
                    11:00 AM - 8:00 PM
                  </li>
                  <li>
                    <span className="font-semibold text-gray-700">Venue:</span>{" "}
                    Mercure Hotel, Tribune Chowk, Chandigarh
                  </li>
                  <li>
                    <span className="font-semibold text-gray-700">
                      Hosted by:
                    </span>{" "}
                    BookMyAssets
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-[40%]  p-4 rounded-lg">
              <EventForm />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <div className="md:flex bg-gray-100 p-4 rounded-lg">
          {/* Why Attend */}
          <div className="mb-6  pt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Why Attend
            </h2>
            <p className="text-gray-600 mb-2">
              Gain valuable insights from experts on:
            </p>
            <ul className="space-y-1 text-gray-600 ml-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Dholera's infrastructure, policy, and industrial landscape
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Documentation and due diligence essentials</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Access to verified, government-approved inventory</span>
              </li>
            </ul>
          </div>

          {/* Key Takeaways */}
          <div className="mb-6 pt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Key Takeaways
            </h2>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Understand how Dholera's growth momentum can create long-term
                  value.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Explore upcoming infrastructure developments and policy
                  initiatives.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Network with leading professionals, channel partners, and
                  advisors.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Learn from on-ground experts and industry speakers.</span>
              </li>
            </ul>
          </div>

          {/* Who Should Attend */}
          <div className="pt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Who Should Attend
            </h2>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Individual investors exploring secure land opportunities
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Channel partners and real estate advisors seeking verified
                  projects
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Professionals looking to understand India's next growth
                  corridor
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Past Events */}
      <div className="py-8 hidden">
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
