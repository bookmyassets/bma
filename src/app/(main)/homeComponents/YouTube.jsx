"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";

export default function ShortsSection() {
  const [origin, setOrigin] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(3); // responsive per view
  const iframeRefs = useRef({});
  const autoScrollRef = useRef(null);

  // Set window origin safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const shortsData = useMemo(() => {
    if (!origin) return [];
    return [
      {
        id: 1,
        title: "Bitcoin vs Real Estate",
        views: "150K",
        embedUrl: `https://www.youtube.com/embed/D3k1SWpMm5A?enablejsapi=1&origin=${origin}&controls=1&rel=0&modestbranding=1`,
      },
      {
        id: 2,
        title: "Residential Plots in Dholera",
        views: "98K",
        embedUrl: `https://www.youtube.com/embed/Z_eAOB62PDk?enablejsapi=1&origin=${origin}&controls=1&rel=0&modestbranding=1`,
      },
      {
        id: 3,
        title: "Dholera Investment",
        views: "210K",
        embedUrl: `https://www.youtube.com/embed/Zp4trZk-Hnw?enablejsapi=1&origin=${origin}&controls=1&rel=0&modestbranding=1`,
      },
      {
        id: 4,
        title: "Real Estate Tips",
        views: "85K",
        embedUrl: `https://www.youtube.com/embed/rHSlc1hhr8Q?enablejsapi=1&origin=${origin}&controls=1&rel=0&modestbranding=1`,
      },
      {
        id: 5,
        title: "Dholera Smart City",
        views: "120K",
        embedUrl: `https://www.youtube.com/embed/q4OuleCT67g?enablejsapi=1&origin=${origin}&controls=1&rel=0&modestbranding=1`,
      },
      {
        id: 6,
        title: "WestWyn County, Dholera",
        views: "175K",
        embedUrl: `https://www.youtube.com/embed/kF-yZZ2LVH8?enablejsapi=1&origin=${origin}&controls=1&rel=0&modestbranding=1`,
      },
    ];
  }, [origin]);

  // Auto scroll functionality
  useEffect(() => {
    if (isVideoPlaying) return; // Don't auto-scroll if video is playing

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next >= shortsData.length - itemsPerView ? 0 : next;
      });
    }, 4000); // 4 seconds

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isVideoPlaying, shortsData.length, itemsPerView]);

  // Pause all videos except the one specified
  const pauseAllVideos = (exceptIndex = null) => {
    Object.entries(iframeRefs.current).forEach(([index, iframe]) => {
      const indexNum = parseInt(index);
      if (exceptIndex !== null && indexNum === exceptIndex) return;
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        } catch (e) {
          console.error("Error pausing video:", e);
        }
      }
    });
  };

  // YouTube API setup and listener
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const handleMessage = (event) => {
      if (!event.origin.includes("youtube.com")) return;

      try {
        let data;
        if (typeof event.data === "string") {
          try {
            data = JSON.parse(event.data);
          } catch (e) {
            return;
          }
        } else if (typeof event.data === "object") {
          data = event.data;
        } else {
          return;
        }

        let sourceIframeIndex = null;
        Object.entries(iframeRefs.current).forEach(([index, iframe]) => {
          if (iframe && iframe.contentWindow === event.source) {
            sourceIframeIndex = parseInt(index);
          }
        });

        if (sourceIframeIndex === null) return;

        let playerState = null;
        if (data.event === "video-progress" || data.event === "onStateChange") {
          playerState = data.info;
        } else if (data.info !== undefined) {
          playerState = data.info;
        }

        if (playerState === 1) {
          pauseAllVideos(sourceIframeIndex);
          setIsVideoPlaying(true);
          setCurrentPlayingId(sourceIframeIndex);
        } else if (playerState === 0 || playerState === 2) {
          if (currentPlayingId === sourceIframeIndex) {
            setIsVideoPlaying(false);
            setCurrentPlayingId(null);
          }
        }
      } catch (e) {
        console.error("Error handling YouTube message:", e);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [currentPlayingId]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next >= shortsData.length - itemsPerView ? 0 : next;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      return next < 0 ? shortsData.length - itemsPerView : next;
    });
  };

  if (shortsData.length === 0) return null;

  return (
    <section
      className="bg-black py-8 overflow-hidden"
      aria-label="YouTube Shorts Carousel"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-[#deae3c] font-bold text-center mb-2">
          Dholera in Motion
        </h2>
        <p className="text-center font-light text-white text-lg mb-6">
          See India's Smart City Revolution Live
        </p>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
            aria-label="Previous videos"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
            aria-label="Next videos"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Videos Container */}
          <div className="overflow-hidden mx-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {shortsData.map((short, index) => (
                <div
                  key={short.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
                  role="group"
                  aria-roledescription="Short video"
                >
                  <div className="bg-[#f3f2ef] rounded-2xl overflow-hidden shadow-xl p-3 h-[480px]">
                    <iframe
                      ref={(el) => {
                        iframeRefs.current[index] = el;
                      }}
                      className="w-full h-[380px] rounded-xl"
                      src={short.embedUrl}
                      title={short.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                    <div className="p-2 text-center">
                      <h3 className="text-gray-800 font-semibold text-lg line-clamp-2">
                        {short.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {short.views} views
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: shortsData.length - itemsPerView + 1 }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-[#deae3c] w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}