import React, { useState, useEffect, useRef, useCallback } from "react";

// Static data
const SHORTS_DATA = [
  { id: 1, title: "Dholera ReNew Solar Plant", youtubeId: "_PU0sn6taHQ" },
  { id: 2, title: "Brain of Dholera – ABCD Building", youtubeId: "jF2U2IWF3yk" },
  { id: 3, title: "Dholera International Airport", youtubeId: "Aih4UJppDbM" },
  { id: 4, title: "Ahmedabad – Dholera Expressway", youtubeId: "56wD3aJIEuA" },
  { id: 5, title: "Tata Semiconductor Plant – Dholera", youtubeId: "KxGgxO_GBPY" },
  { id: 6, title: "Water Treatment Plant – Dholera", youtubeId: "z40FYyoaU-Y" },
  { id: 7, title: "WestWyn County – Premium Plots", youtubeId: "iQfeBBp3g0E" },
  { id: 8, title: "Dholera Activation Area", youtubeId: "RP9hDShgxhU" },
  { id: 9, title: "Dholera Solar Park", youtubeId: "v3NNSMaVHb0" },
];

function VideoFacade({ youtubeId, title, onActivate }) {
  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <button
      className="relative w-full h-full group cursor-pointer bg-black rounded-xl overflow-hidden"
      onClick={onActivate}
      aria-label={`Play ${title}`}
      type="button"
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        width={480}
        height={270}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-14 rounded-2xl bg-red-600 group-hover:bg-red-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
          <svg className="w-9 h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function VideoPlayer({ youtubeId, title, iframeRef }) {
  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full absolute inset-0 rounded-xl"
      src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&rel=0`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

export default function ShortsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Only one active iframe at a time (big memory and performance improvement)
  const [activeIndex, setActiveIndex] = useState(null);

  const [itemsPerView, setItemsPerView] = useState(3);

  const iframeRefs = useRef({});
  const autoScrollRef = useRef(null);

  // Responsive breakpoints
  useEffect(() => {
    const update = () => {
      setItemsPerView(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto scroll pauses when video plays
  useEffect(() => {
    if (isVideoPlaying) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next >= SHORTS_DATA.length - itemsPerView + 1 ? 0 : next;
      });
    }, 4000);

    return () => clearInterval(autoScrollRef.current);
  }, [isVideoPlaying, itemsPerView]);

  const pauseAllExcept = useCallback((exceptIndex) => {
    Object.entries(iframeRefs.current).forEach(([idx, iframe]) => {
      if (parseInt(idx) === exceptIndex) return;
      iframe?.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
    });
  }, []);

  // YouTube postMessage listener only when an iframe exists
  useEffect(() => {
    if (activeIndex === null) return;

    const isAllowedOrigin = (origin) =>
      origin.includes("youtube.com") || origin.includes("youtube-nocookie.com");

    const handleMessage = (event) => {
      if (!isAllowedOrigin(event.origin)) return;

      let data;
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      // find which iframe sent message
      let sourceIndex = null;
      Object.entries(iframeRefs.current).forEach(([idx, iframe]) => {
        if (iframe?.contentWindow === event.source) sourceIndex = parseInt(idx);
      });
      if (sourceIndex === null) return;

      const state = data?.info;

      // 1 playing, 2 paused, 0 ended
      if (state === 1) {
        pauseAllExcept(sourceIndex);
        setIsVideoPlaying(true);
      } else if (state === 0 || state === 2) {
        setIsVideoPlaying(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [activeIndex, pauseAllExcept]);

  // Activate a facade
  const activateVideo = useCallback(
    (index) => {
      pauseAllExcept(index);

      // Unmount previous iframe by switching index
      setActiveIndex(index);

      // clear any old ref nodes to avoid memory bloat
      Object.keys(iframeRefs.current).forEach((k) => {
        if (parseInt(k) !== index) delete iframeRefs.current[k];
      });

      setIsVideoPlaying(true);
    },
    [pauseAllExcept]
  );

  const goToNext = () =>
    setCurrentIndex((prev) =>
      prev + 1 >= SHORTS_DATA.length - itemsPerView + 1 ? 0 : prev + 1
    );

  const goToPrev = () =>
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? Math.max(0, SHORTS_DATA.length - itemsPerView) : prev - 1
    );

  return (
    <section className="bg-black py-8 overflow-hidden" aria-label="YouTube Shorts Carousel">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-[#deae3c] font-bold text-center mb-2">
          Dholera in Motion
        </h2>
        <p className="text-center font-light text-white text-lg mb-6">
          Witness real-time progress in the Dholera smart city project
        </p>

        <div className="relative">
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
            aria-label="Previous videos"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
            aria-label="Next videos"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="overflow-hidden mx-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {SHORTS_DATA.map((short, index) => (
                <div
                  key={short.id}
                  className={`flex-shrink-0 px-2 ${
                    itemsPerView === 1 ? "w-full" : itemsPerView === 2 ? "w-1/2" : "w-1/3"
                  }`}
                  role="group"
                  aria-roledescription="Short video"
                >
                  <div className="bg-[#f3f2ef] rounded-2xl overflow-hidden shadow-xl p-3 h-[280px]">
                    <div className="w-full h-[200px] rounded-xl bg-gray-800 relative overflow-hidden">
                      {activeIndex === index ? (
                        <VideoPlayer
                          youtubeId={short.youtubeId}
                          title={short.title}
                          iframeRef={(el) => {
                            iframeRefs.current[index] = el;
                          }}
                        />
                      ) : (
                        <VideoFacade
                          youtubeId={short.youtubeId}
                          title={short.title}
                          onActivate={() => activateVideo(index)}
                        />
                      )}
                    </div>
                    <div className="p-2 text-center">
                      <h3 className="text-gray-800 font-semibold text-lg line-clamp-2">
                        {short.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.max(1, SHORTS_DATA.length - itemsPerView + 1) }).map(
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? "bg-[#deae3c] w-6" : "bg-white/30 hover:bg-white/50 w-2"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                  type="button"
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
