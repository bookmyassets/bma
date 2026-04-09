import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
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

// Lazy load images with priority hints
const images = [
  { src: () => import("@/assests/about/charan-meeting.webp"), priority: true },
  {
    src: () => import("@/assests/about/full-house-meeting.webp"),
    priority: false,
  },
  { src: () => import("@/assests/about/full-house.webp"), priority: false },
  { src: () => import("@/assests/about/meeting.webp"), priority: false },
  { src: () => import("@/assests/about/training-back.webp"), priority: false },
  { src: () => import("@/assests/about/training-front.webp"), priority: false },
];

// Image component with native lazy loading
const OptimizedImage = ({ src, alt, className, priority = false }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
    fetchPriority={priority ? "high" : "auto"}
  />
);

export default function BookMyAssets() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);
  const timelineRef = useRef(null);

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

  // Load images progressively
  useEffect(() => {
    const loadImages = async () => {
      const loaded = await Promise.all(
        images.map(async (img, idx) => {
          const module = await img.src();
          return module.default;
        }),
      );
      setLoadedImages(loaded);
    };
    loadImages();
  }, []);

  // Optimized carousel with requestAnimationFrame
  useEffect(() => {
    if (loadedImages.length === 0) return;
    let frameId;
    let lastTimestamp = 0;
    const interval = 3000;

    const animate = (timestamp) => {
      if (timestamp - lastTimestamp >= interval) {
        setCurrentSlide((prev) => (prev + 1) % loadedImages.length);
        lastTimestamp = timestamp;
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [loadedImages.length]);

  // Intersection Observer for timeline
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setTimelineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "100px" },
    );

    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  if (loadedImages.length === 0) {
    return <div className="min-h-screen bg-gray-50" />; // Skeleton loader
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="hero-bg text-white py-8 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gold-text">
          BookMyAssets
        </h1>
        <p className="text-lg md:text-2xl">
          One Year. One Vision. One Unstoppable Team.
        </p>
      </div>

      {/* Timeline Section */}
      <div
        ref={timelineRef}
        className="bg-gradient-to-b from-gray-50 to-white py-4 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 gold-text">
            365 Days That Changed Everything
          </h2>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative max-w-6xl mx-auto py-16">
              <div className="absolute left-0 right-0 h-1 top-1/2 transform -translate-y-1/2 bg-gray-200" />
              {timelineVisible && (
                <div
                  className="absolute left-0 h-1 top-1/2 transform -translate-y-1/2 timeline-progress"
                  style={{ backgroundColor: "#deae4c" }}
                />
              )}

              <div className="flex justify-between items-center relative">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center group flex-1 max-w-[120px] ${milestone.position === "top" ? "flex-col-reverse" : ""}`}
                  >
                    <div
                      className="w-0.5 h-16 mx-auto"
                      style={{ backgroundColor: "#deae4c" }}
                    />
                    <div className="relative w-16 h-16 rounded-full border-4 border-white flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg z-10 bg-[#deae4c]">
                      <milestone.icon
                        className="w-7 h-7 text-white"
                        strokeWidth={2.5}
                      />
                      {timelineVisible && (
                        <div className="absolute inset-0 rounded-full animate-ping-slow opacity-50 bg-[#deae4c]" />
                      )}
                    </div>
                    <div
                      className="w-0.5 h-16 mx-auto"
                      style={{ backgroundColor: "#deae4c" }}
                    />
                    <div className="bg-white rounded-lg shadow-lg p-4 w-32 h-32 flex flex-col justify-center transform group-hover:-translate-y-2 transition-all duration-300 border-2 border-[#deae4c]">
                      <p className="text-xs font-bold mb-2 text-center gold-text">
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

          {/* Mobile Timeline */}
          <div className="md:hidden overflow-x-auto pb-4 hide-scrollbar">
            <div className="relative inline-flex gap-6 min-w-max py-8 px-4">
              <div className="absolute left-0 right-0 h-1 top-20 bg-[#deae4c]" />
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center group relative"
                >
                  <div className="w-0.5 h-8 mx-auto bg-[#deae4c]" />
                  <div className="relative w-14 h-14 rounded-full border-4 border-white flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg mb-3 z-10 bg-[#deae4c]">
                    <milestone.icon
                      className="w-6 h-6 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="w-0.5 h-8 mx-auto bg-[#deae4c]" />
                  <div className="bg-white rounded-lg shadow-md p-3 w-28 h-28 flex flex-col justify-center border-2 border-[#deae4c]">
                    <p className="text-xs font-bold mb-1 text-center gold-text">
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

      {/* Slideshow Section - With native lazy loading */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-0">
        <div
          className="relative rounded-xl overflow-hidden shadow-2xl mx-auto md:hidden"
          style={{ maxWidth: "400px", height: "500px" }}
        >
          {loadedImages.map((src, index) => (
            <OptimizedImage
              key={index}
              src={src}
              alt={`Property ${index + 1}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              priority={index === 0}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {loadedImages.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    currentSlide === index
                      ? "#deae4c"
                      : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Section - Restructured for better CLS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-3/5 space-y-6 md:space-y-8">
            <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-[#deae4c]">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gold-text">
                The Beginning
              </h2>
              <div className="text-base text-gray-800 space-y-3">
                <p>
                  <span className="font-bold">On 13th December 2024,</span> five
                  people started with one small cabin. We had no fancy office,
                  no big investors, just raw hunger and an unshakable belief
                  that we could build something extraordinary in real estate.
                  Most people called it crazy. We called it destiny.
                </p>
                <p>
                  The odds were stacked against us, but we did not wait for
                  permission. Our first sale came just 14 days later. Then one
                  viral reel brought 400 queries per day. We did not just handle
                  it but we turned that momentum into our first developer
                  project, WestWyn County. While others were planning, we were
                  building.
                </p>
                <p>
                  <span className="font-bold">Today, 365 days later:</span> A
                  passionate team of 23, multiple thriving projects, and
                  families who trust us with their future.
                </p>
                <p>
                  Real estate is not just about land, it is about people too.
                </p>
                <p>
                  Year One was our audition. Year Two? That's where we prove it
                  was not luck. It was our hunger, heart, and hustle.
                </p>
                <p className="font-bold">
                  This is BookMyAssets. And we're just getting started.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 gold-text">
                What we Believe
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "People Over Everything",
                    desc: "You can't scale dreams without the right people dreaming with you.",
                  },
                  {
                    title: "Trust Is Earned Daily",
                    desc: "Every call. Every promise. Every transparent deal.",
                  },
                  {
                    title: "Speed Meets Wisdom",
                    desc: "Lightning-fast execution. Patient where it counts.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-4 pl-4 border-[#deae4c]">
                    <h3 className="font-bold text-base md:text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-xs md:text-sm">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-black rounded-xl shadow-lg p-6 text-center">
              <h2 className="text-xl md:text-3xl font-bold mb-4 gold-text">
                WE'RE JUST GETTING STARTED
              </h2>
              <p className="text-white text-base md:text-lg">
                Building legacies, one family at a time.
              </p>
            </section>
          </div>

          {/* Desktop Slideshow */}
          <div className="hidden md:block md:w-2/5 md:sticky md:top-24">
            <div
              className="relative rounded-xl overflow-hidden shadow-2xl"
              style={{ height: "500px" }}
            >
              {loadedImages.map((src, index) => (
                <OptimizedImage
                  key={index}
                  src={src}
                  alt={`Property ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
                  priority={index === 0}
                />
              ))}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {loadedImages.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        currentSlide === index
                          ? "#deae4c"
                          : "rgba(255,255,255,0.5)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
