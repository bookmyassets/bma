"use client";
import { useState, useRef, useCallback } from "react";

const SHORTS_DATA = [
  { id: 1, title: "Dholera ReNew Solar Plant", youtubeId: "_PU0sn6taHQ" },
  {
    id: 2,
    title: "Brain of Dholera – ABCD Building",
    youtubeId: "jF2U2IWF3yk",
  },
  { id: 3, title: "Dholera International Airport", youtubeId: "Aih4UJppDbM" },
  { id: 4, title: "Ahmedabad – Dholera Expressway", youtubeId: "56wD3aJIEuA" },
  {
    id: 5,
    title: "Tata Semiconductor Plant – Dholera",
    youtubeId: "KxGgxO_GBPY",
  },
  { id: 6, title: "Water Treatment Plant – Dholera", youtubeId: "z40FYyoaU-Y" },
  { id: 7, title: "WestWyn County – Premium Plots", youtubeId: "iQfeBBp3g0E" },
  { id: 8, title: "Dholera Activation Area", youtubeId: "RP9hDShgxhU" },
  { id: 9, title: "Dholera Solar Park", youtubeId: "v3NNSMaVHb0" },
];

function VideoFacade({ youtubeId, title, onActivate }) {
  return (
    <button
      onClick={onActivate}
      aria-label={`Play ${title}`}
      type="button"
      className="relative w-full h-full group cursor-pointer bg-black rounded-xl overflow-hidden"
    >
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        decoding="async"
        width={480}
        height={270}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-20 h-14 rounded-2xl bg-red-600 group-hover:bg-red-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
          <svg
            className="w-9 h-9 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

function VideoPlayer({ youtubeId, title }) {
  return (
    <iframe
      className="w-full h-full absolute inset-0 rounded-xl"
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

export default function ShortsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const scrollRef = useRef(null);

  // ── Scroll to card by index using scroll-snap container ──
  const scrollTo = useCallback((index) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index];
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setCurrentIndex(index);
  }, []);

  const goToNext = () => scrollTo((currentIndex + 1) % SHORTS_DATA.length);
  const goToPrev = () =>
    scrollTo((currentIndex - 1 + SHORTS_DATA.length) % SHORTS_DATA.length);

  return (
    <section
      className="bg-black py-[clamp(2rem,5vw,3.5rem)] overflow-hidden"
      aria-label="Dholera in Motion"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] text-[#deae3c] font-bold text-center mb-2">
          Dholera Drone Shorts{" "}
        </h2>
        <p className="text-center font-light text-white text-lg mb-6">
          Witness real-time progress of Dholera Smart City Project and Latest
          updates on infrastructure projects in Dholera
        </p>

        <div className="relative">
          {/* Nav buttons */}
          <button
            onClick={goToPrev}
            type="button"
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all"
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
            type="button"
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all"
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

          {/*
            ── CSS scroll-snap carousel ──
            No JS breakpoints. CSS handles 1/2/3 columns.
            scroll-snap-type ensures clean snapping on swipe/scroll.
          */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 mx-8 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {SHORTS_DATA.map((short, index) => (
              <div
                key={short.id}
                className="
                  flex-shrink-0 snap-start
                  w-full
                  sm:w-[calc(50%-0.5rem)]
                  lg:w-[calc(33.333%-0.75rem)]
                "
                role="group"
                aria-roledescription="video"
                aria-label={short.title}
              >
                <div className="bg-[#f3f2ef] rounded-2xl overflow-hidden shadow-xl p-3 h-[280px]">
                  <div className="w-full h-[200px] rounded-xl bg-gray-800 relative overflow-hidden">
                    {activeIndex === index ? (
                      <VideoPlayer
                        youtubeId={short.youtubeId}
                        title={short.title}
                      />
                    ) : (
                      <VideoFacade
                        youtubeId={short.youtubeId}
                        title={short.title}
                        onActivate={() => setActiveIndex(index)}
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

          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {SHORTS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? "bg-[#deae3c] w-6"
                    : "bg-white/30 hover:bg-white/50 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
