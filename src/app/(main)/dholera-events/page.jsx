"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventForm from "./eventForm";
import DholeraEventSection from "./Eventdetails";
import { TrendingUp, MapPin, FileText, CheckCircle } from "lucide-react";
import eventHero from "@/assests/bma-events/bma-dholera-events-desktop-banner.webp";
import eventHeroM from "@/assests/bma-events/bma-dholera-events-mobile-banner.webp";
import Image from "next/image";

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
      <section className="relative overflow-hidden bg-[#0d0d0d]">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <div className="container pt-8 mx-auto px-6 relative z-10">
          {/* Desktop Banner */}
          <div className="hidden md:block">
            <Image
              src={eventHero}
              alt="Dholera Event - Desktop Banner"
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Mobile Banner */}
          <div className="block md:hidden">
            <Image
              src={eventHeroM}
              alt="Dholera Event - Mobile Banner"
              width={450}
              height={550}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </section>
      {/* White Section with Event Details - Overlaps the dark section */}
      <div className="relative -mt-16 z-20 ">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
            <div className="p-6 gap-6 max-sm:flex-col flex sm:justify-between sm:items-center">
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
                <a href="https://maps.app.goo.gl/EHmkHhfuSgs3L8vDA">
                      <span className="text-[#deae3c]">
                        Mercure Hotel, Chandigarh
                      </span>
                    </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-3 md:gap-6">
            <div className="flex flex-col items-center text-center">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3"
                style={{ backgroundColor: "#deae3c" }}
              >
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
              <p className="text-xs md:text-base font-medium text-black leading-tight">
                Investment Options
                <br />
                ₹10L–₹10Cr
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3"
                style={{ backgroundColor: "#deae3c" }}
              >
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
              <p className="text-xs md:text-base font-medium text-black leading-tight">
                Chandigarh Only <br />
                Booking Offer
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3"
                style={{ backgroundColor: "#deae3c" }}
              >
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
              <p className="text-xs md:text-base font-medium text-black leading-tight">
                Registry Ready
                <br />
                Plots
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3"
                style={{ backgroundColor: "#deae3c" }}
              >
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
              <p className="text-xs md:text-base font-medium text-black leading-tight">
                Government
                <br />
                Approved
              </p>
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
                    Dholera: Now or Never is a one-day investor meet for
                    individual investors, channel partners, and real-estate
                    advisors seeking clarity on Dholera’s rapid growth and
                    long-term potential. Attend to gain expert insights on
                    Dholera’s growth roadmap, review due-diligence-backed and
                    title-cleared opportunities. Also, access exclusive
                    Chandigarh-only on-spot booking offers. Investment slabs
                    range from ₹10 Lakh to ₹10 Crore. Register now to lock your
                    spot.
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
                    <a href="https://maps.app.goo.gl/EHmkHhfuSgs3L8vDA">
                      <span className="font-semibold text-gray-700">
                        Venue:
                      </span>{" "}
                      <span className="text-blue-400">
                        Mercure Hotel, Chandigarh
                      </span>
                    </a>
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
        <DholeraEventSection />
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
