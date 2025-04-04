"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ShortsSection() {
  const shortsData = useMemo(() => [
    { id: 1, title: "Bitcoin vs Real Estate", views: "150K", embedUrl: "https://www.youtube.com/embed/D3k1SWpMm5A" },
    { id: 2, title: "Residential Plots in Dholera", views: "98K", embedUrl: "https://www.youtube.com/embed/Z_eAOB62PDk" },
    { id: 3, title: "Dholera Investment", views: "210K", embedUrl: "https://www.youtube.com/embed/Zp4trZk-Hnw" },
    { id: 4, title: "Real Estate Tips", views: "85K", embedUrl: "https://www.youtube.com/embed/rHSlc1hhr8Q" },
    { id: 5, title: "Dholera Smart City", views: "120K", embedUrl: "https://www.youtube.com/embed/sMN4WychUPI" },
    { id: 6, title: "Dholera Smart City", views: "175K", embedUrl: "https://www.youtube.com/embed/sMN4WychUPI" },
  ], []);

  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef(null);
  const iframeRefs = useRef([]);

  // Check mobile view
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Setup message listener for YouTube iframes
  useEffect(() => {
    const handleMessage = (event) => {
      // Check if the message is from YouTube
      if (event.origin !== "https://www.youtube.com") return;
      
      try {
        const data = JSON.parse(event.data);
        const iframe = iframeRefs.current.find(
          (iframe) => iframe?.contentWindow === event.source
        );

        if (!iframe || !swiperRef.current) return;

        switch (data.event) {
          case "onStateChange":
            if (data.info === 1) { // Video started playing
              swiperRef.current.autoplay.stop();
            } else if (data.info === 0 || data.info === 2) { // Video ended or paused
              swiperRef.current.autoplay.start();
            }
            break;
        }
      } catch (e) {
        console.error("Error handling YouTube message:", e);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
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
                      ref={(el) => iframeRefs.current[index] = el}
                      className="w-full h-[500px] md:h-[600px] rounded-xl" 
                      src={`${short.embedUrl}?enablejsapi=1`} 
                      title={short.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
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
        </div>
      </div>
    </section>
  );
}