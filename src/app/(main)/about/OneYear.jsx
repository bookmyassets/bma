import React, { useState, useEffect } from "react";
import {
  Users,
  Trophy,
  TrendingUp,
  Rocket,
  Building2,
  PartyPopper,
  Award,
  Building,
} from "lucide-react";

import img1 from "@/assests/about/charan-meeting.webp";
import img2 from "@/assests/about/full-house-meeting.webp";
import img3 from "@/assests/about/full-house.webp";
import img4 from "@/assests/about/meeting.webp";
import img5 from "@/assests/about/training-back.webp";
import img6 from "@/assests/about/training-front.webp";
import Image from "next/image";

export default function BookMyAssets() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const milestones = [
    {
      date: "13 Dec 2024",
      event: "Started with 5 people as Channel Partner",
      icon: Users,
      position: "top",
    },
    {
      date: "27 Dec 2024",
      event: "First Sale",
      icon: Trophy,
      position: "bottom",
    },
    {
      date: "10 Jan 2025",
      event: "1st Viral Reel - 400 queries/day",
      icon: TrendingUp,
      position: "top",
    },
    {
      date: "Feb & Mar 2025",
      event: "Consistent Sales",
      icon: Rocket,
      position: "bottom",
    },
    {
      date: "May 2025",
      event: "1st Project Launch: Westwyn County",
      icon: Building,
      position: "top",
    },
    {
      date: "Sep 2025",
      event: "2nd Project Launch: Westwyn Estate",
      icon: Building2,
      position: "bottom",
    },
    {
      date: "Nov 2025",
      event: "1st Event: Chandigarh - Record Breaking Sales",
      icon: PartyPopper,
      position: "top",
    },
    {
      date: "13 Dec 2025",
      event: "23+ members | Both Projects 50%+ Sold Out",
      icon: Award,
      position: "bottom",
    },
  ];

  const slides = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimelineVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineSection = document.getElementById("timeline-section");
    if (timelineSection) {
      observer.observe(timelineSection);
    }

    return () => {
      if (timelineSection) {
        observer.unobserve(timelineSection);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero */}
      <div className="bg-black text-white py-8 text-center px-4">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "#deae4c" }}
        >
          BookMyAssets
        </h1>
        <p className="text-lg md:text-2xl">
          One Year. One Vision. One Unstoppable Team.
        </p>
      </div>

      {/* Horizontal Timeline */}
      <div
        className="bg-gradient-to-b from-gray-50 to-white py-4 overflow-hidden"
        id="timeline-section"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-8 "
            style={{ color: "#deae4c" }}
          >
            365 Days That Changed Everything
          </h2>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative max-w-6xl mx-auto py-16">
              {/* Center horizontal line */}
              <div
                className="absolute left-0 right-0 h-1 top-1/2 transform -translate-y-1/2"
                style={{ backgroundColor: "#e5e7eb" }}
              ></div>

              {/* Animated progress line */}
              <div
                className={`absolute left-0 h-1 top-1/2 transform -translate-y-1/2 ${timelineVisible ? "timeline-progress" : ""}`}
                style={{
                  backgroundColor: "#deae4c",
                  boxShadow: "0 0 20px rgba(222, 174, 76, 0.5)",
                }}
              ></div>

              {/* Timeline items */}
              <div className="flex justify-between items-center relative">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center group timeline-item relative ${
                      milestone.position === "top" ? "flex-col-reverse" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      flex: "1",
                      maxWidth: "120px",
                    }}
                  >
                    {/* Vertical connector line */}
                    <div
                      className="w-0.5 h-16 mx-auto"
                      style={{ backgroundColor: "#deae4c" }}
                    ></div>

                    {/* Icon circle */}
                    <div
                      className="relative w-16 h-16 rounded-full border-4 border-white flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg z-10"
                      style={{ backgroundColor: "#deae4c" }}
                    >
                      <milestone.icon
                        className="w-7 h-7 text-white"
                        strokeWidth={2.5}
                      />
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-50"
                        style={{
                          backgroundColor: "#deae4c",
                          animationDuration: "2s",
                          animationDelay: `${index * 0.3}s`,
                        }}
                      ></div>
                    </div>

                    {/* Vertical connector line */}
                    <div
                      className="w-0.5 h-16 mx-auto"
                      style={{ backgroundColor: "#deae4c" }}
                    ></div>

                    {/* Content card */}
                    <div
                      className="bg-white rounded-lg shadow-lg p-4 w-32 h-32 flex flex-col justify-center transform group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300 border-2"
                      style={{ borderColor: "#deae4c" }}
                    >
                      <p
                        className="text-xs font-bold mb-2 text-center"
                        style={{ color: "#deae4c" }}
                      >
                        {milestone.date}
                      </p>
                      <p className="text-xs text-gray-700 text-center font-semibold leading-tight">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline - Horizontal with connecting line */}
          <div className="md:hidden overflow-x-auto pb-4 hide-scrollbar">
            <div className="relative inline-flex gap-6 min-w-max py-8 px-4">
              {/* Horizontal line for mobile */}
              <div
                className="absolute left-0 right-0 h-1 top-20"
                style={{ backgroundColor: "#deae4c" }}
              ></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center group timeline-item relative"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Vertical connector to line */}
                  <div
                    className="w-0.5 h-8 mx-auto"
                    style={{ backgroundColor: "#deae4c" }}
                  ></div>

                  {/* Icon circle */}
                  <div
                    className="relative w-14 h-14 rounded-full border-4 border-white flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg mb-3 z-10"
                    style={{ backgroundColor: "#deae4c" }}
                  >
                    <milestone.icon
                      className="w-6 h-6 text-white"
                      strokeWidth={2.5}
                    />
                  </div>

                  {/* Vertical connector to card */}
                  <div
                    className="w-0.5 h-8 mx-auto"
                    style={{ backgroundColor: "#deae4c" }}
                  ></div>

                  {/* Content card */}
                  <div
                    className="bg-white rounded-lg shadow-md p-3 w-28 h-28 flex flex-col justify-center border-2"
                    style={{ borderColor: "#deae4c" }}
                  >
                    <p
                      className="text-xs font-bold mb-1 text-center"
                      style={{ color: "#deae4c" }}
                    >
                      {milestone.date}
                    </p>
                    <p className="text-xs text-gray-700 text-center font-semibold leading-tight">
                      {milestone.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Slideshow - Full Width Mobile */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-0">
        <div
          className="relative rounded-xl overflow-hidden shadow-2xl mx-auto md:hidden "
          style={{ maxWidth: "400px", height: "500px" }}
        >
          {slides.map((slide, index) => (
            <Image
              key={`slide-${index}`}
              src={slide}
              alt={`Property ${index + 1}`}
              className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: currentSlide === index ? 1 : 0,
                zIndex: currentSlide === index ? 1 : 0,
              }}
              priority={index === 0} // Add priority for first image (Next.js)
              loading={index === 0 ? "eager" : "lazy"} // Optimize loading
            />
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    currentSlide === index
                      ? "#deae4c"
                      : "rgba(255,255,255,0.5)",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section with Slideshow */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 ">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Content */}
          <div className="w-full md:w-3/5 space-y-6 md:space-y-8">
            <div>
              <section
                className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4"
                style={{ borderColor: "#deae4c" }}
              >
                <div className="grid md:grid-cols-1 gap-8">
                  {/* Left Column - The Beginning */}
                  <div>
                    <h2
                      className="text-2xl md:text-3xl font-bold mb-4"
                      style={{ color: "#deae4c" }}
                    >
                      The Beginning
                    </h2>
                    <p className="text-base text-gray-800 mb-3">
                      <span className="font-bold">On 13th December 2024,</span>{" "}
                      five people started with one small cabin. We had no fancy
                      office, no big investors, just raw hunger and an
                      unshakable belief that we could build something
                      extraordinary in real estate. Most people called it crazy.
                      We called it destiny. <br />
                      The odds were stacked against us, but we did not wait for
                      permission. Our first sale came just 14 days later. Then
                      one viral reel brought 400 queries per day. We did not
                      just handle it but we turned that momentum into our first
                      developer project, WestWyn County. While others were
                      planning, we were building.
                      <br />{" "}
                      <span className="font-bold">
                        Today, 365 days later:
                      </span>{" "}
                      A passionate team of 23, multiple thriving projects, and
                      families who trust us with their future.
                      <br />
                      Real estate is not just about land, it is about people
                      too.
                      <br />
                      Year One was our audition. Year Two? That's where we prove
                      it was not luck. It was our hunger, heart, and hustle.{" "}
                      <br />{" "}
                      <span className="font-bold">
                        {" "}
                        This is BookMyAssets. And we're just getting started.
                      </span>
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:flex justify-center items-center">
              <section className="bg-white rounded-xl shadow-lg p-6 ">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "#deae4c" }}
                >
                  What we Believe
                </h2>
                <div className="space-y-4">
                  <div
                    className="border-l-4 pl-4"
                    style={{ borderColor: "#deae4c" }}
                  >
                    <h3 className="font-bold text-base md:text-lg mb-1">
                      People Over Everything
                    </h3>
                    <p className="text-gray-700 text-xs md:text-sm">
                      You can't scale dreams without the right people dreaming
                      with you.
                    </p>
                  </div>
                  <div
                    className="border-l-4 pl-4"
                    style={{ borderColor: "#deae4c" }}
                  >
                    <h3 className="font-bold text-base md:text-lg mb-1">
                      Trust Is Earned Daily
                    </h3>
                    <p className="text-gray-700 text-xs md:text-sm">
                      Every call. Every promise. Every transparent deal.
                    </p>
                  </div>
                  <div
                    className="border-l-4 pl-4"
                    style={{ borderColor: "#deae4c" }}
                  >
                    <h3 className="font-bold text-base md:text-lg mb-1">
                      Speed Meets Wisdom
                    </h3>
                    <p className="text-gray-700 text-xs md:text-sm">
                      Lightning-fast execution. Patient where it counts.
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <section className="bg-black rounded-xl shadow-lg p-6  text-center">
              <h2
                className="text-xl md:text-3xl font-bold mb-4"
                style={{ color: "#deae4c" }}
              >
                WE'RE JUST GETTING STARTED
              </h2>
              <p className="text-white text-base md:text-lg">
                Building legacies, one family at a time.
              </p>
            </section>
          </div>

          {/* Sticky Slideshow - Desktop Only */}
          <div className="hidden md:block md:w-2/5 md:sticky md:top-24">
            <div
              className="relative rounded-xl overflow-hidden shadow-2xl"
              style={{ height: "500px" }}
            >
              {slides.map((slide, index) => (
                <Image
                  key={index}
                  src={slide}
                  alt={`Property ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: currentSlide === index ? 1 : 0 }}
                />
              ))}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        currentSlide === index
                          ? "#deae4c"
                          : "rgba(255,255,255,0.5)",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes progressLine {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        .timeline-item {
          animation: slideIn 0.8s ease-out forwards;
        }
        
        .timeline-progress {
          animation: progressLine 10s ease-in-out forwards;
          width: 0%;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
