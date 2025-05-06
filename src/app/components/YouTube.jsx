"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ShortsSection() {
  const [origin, setOrigin] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef(null);
  const iframeRefs = useRef({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);

  // Set window origin safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Check mobile view
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
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
        embedUrl: `https://www.youtube.com/embed/sMN4WychUPI?enablejsapi=1&origin=${origin}&controls=1&rel=0&modestbranding=1`,
      },
      {
        id: 6,
        title: "Dholera Smart City",
        views: "175K",
        embedUrl: `https://www.youtube.com/embed/sMN4WychUPI?enablejsapi=1&origin=${origin}&controls=1&rel=0&modestbranding=1`,
      },
    ];
  }, [origin]);

  // Pause all videos
  const pauseAllVideos = (exceptIndex = null) => {
    Object.entries(iframeRefs.current).forEach(([index, iframe]) => {
      if (exceptIndex !== null && parseInt(index) === exceptIndex) return;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo" }),
          "*"
        );
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
        try {
          data = JSON.parse(event.data);
        } catch (e) {
          if (typeof event.data === "object") {
            data = event.data;
          } else {
            return;
          }
        }

        let sourceIframeIndex = null;
        Object.entries(iframeRefs.current).forEach(([index, iframe]) => {
          if (iframe && iframe.contentWindow === event.source) {
            sourceIframeIndex = parseInt(index);
          }
        });

        if (sourceIframeIndex === null) return;

        const playerState =
          data.info === 1
            ? 1
            : data.info === 0 || data.info === 2
            ? 0
            : data.info?.playerState;

        if (playerState === 1) {
          pauseAllVideos(sourceIframeIndex);
          setIsVideoPlaying(true);
          setCurrentPlayingId(sourceIframeIndex);
          if (swiperRef.current) swiperRef.current.autoplay.stop();
        } else if (playerState === 0 || playerState === 2) {
          if (currentPlayingId === sourceIframeIndex) {
            setIsVideoPlaying(false);
            setCurrentPlayingId(null);
            if (swiperRef.current) swiperRef.current.autoplay.start();
          }
        }
      } catch (e) {
        console.error("Error handling YouTube message:", e);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [currentPlayingId]);

  // Slide change handler
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    pauseAllVideos();
    setIsVideoPlaying(false);
    setCurrentPlayingId(null);
    swiper.autoplay.start();
  };

  return (
    <section
      className="bg-black py-12 overflow-hidden"
      aria-label="YouTube Shorts Carousel"
    >
      <div className="p-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-white font-bold text-center mb-8">
          Latest Shorts
        </h2>

        <div className="relative px-4">
          {shortsData.length > 0 && (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              slidesPerView={1}
              spaceBetween={20}
              centeredSlides={true}
              loop={true}
              grabCursor={true}
              touchRatio={1.5}
              touchAngle={45}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation, Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 25,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  centeredSlides: false,
                },
              }}
              className="mySwiper"
            >
              {shortsData.map((short, index) => (
                <SwiperSlide key={short.id}>
                  <div
                    className="w-full max-w-[350px] md:max-w-none mx-auto"
                    role="group"
                    aria-roledescription="Short video"
                  >
                    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl p-2 md:p-4 h-full">
                      <iframe
                        ref={(el) => {
                          iframeRefs.current[index] = el;
                        }}
                        className="w-full h-[500px] md:h-[600px] rounded-xl"
                        src={short.embedUrl}
                        title={short.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                      <div className="p-2 md:p-4 text-center">
                        <h3 className="text-white font-semibold text-base md:text-lg line-clamp-2">
                          {short.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">
                          {short.views} views
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
