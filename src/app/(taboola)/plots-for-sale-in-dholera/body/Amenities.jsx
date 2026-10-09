"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const amenities = [
  // Bounds [x, y, width, height] in the original 1280px atlas isolate each
  // object instead of assuming the artwork stays inside equal grid cells.
  { title: "Signature Project Boundary", bounds: [0, 335, 335, 275] },
  { title: "Controlled Access Gated Community", bounds: [0, 65, 350, 260] },
  { title: "Wide Internal Road Network", bounds: [340, 395, 325, 230] },
  { title: "24/7 Security & CCTV Surveillance", bounds: [360, 70, 265, 255] },
  { title: "App-Based Society Management", bounds: [680, 325, 225, 300] },
  { title: "Drainage System", bounds: [940, 350, 325, 280] },
  { title: "Power & Water Supply", bounds: [25, 630, 300, 285] },
  { title: "EV Charging Station", bounds: [665, 10, 240, 310] },
  { title: "Daily Essentials & Utilities Store", bounds: [330, 655, 275, 255] },
  { title: "Clubhouse Lite", bounds: [610, 650, 325, 260] },
  { title: "Yoga Deck", bounds: [940, 675, 320, 235] },
  { title: "Jogging Track", bounds: [910, 85, 355, 240] },
  { title: "Senior Citizen Zone", bounds: [0, 935, 340, 280] },
  { title: "Kids Play Area", bounds: [345, 915, 320, 305] },
];

export default function Amenities() {
  const trackRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const update = () => {
      setCanGoBack(track.scrollLeft > 2);
      setCanGoNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const scroll = (direction) => {
    const track = trackRef.current;
    const card = track.firstElementChild;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };

  return (
    <section id="amenities" aria-labelledby="amenities-heading" className="bg-[#f8f7f4] px-4 py-6 text-[13px] md:text-[17px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-[#ece5d9] bg-[#faf9f6] p-3 sm:p-4">
        <div className="mb-4 text-center">
          <p className="font-semibold uppercase tracking-[0.12em] text-[#a78337]">Project Amenities</p>
          <h2 id="amenities-heading" className="mt-2 text-[24px] font-semibold leading-tight tracking-tight text-[#252525] sm:text-[30px]">Amenities for Better Living</h2>
        </div>

        <div className="relative">
          <ul id="amenities-track" ref={trackRef} aria-label="Community amenities" tabIndex={0} className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]">
            {amenities.map(({ title, bounds: [x, y, width, height] }) => (
              <li key={title} className="flex w-[46%] shrink-0 snap-start flex-col items-center px-1 py-2 text-center sm:w-[calc((100%-32px)/3)] lg:w-[calc((100%-64px)/5)]">
                <span
                  aria-hidden="true"
                  className="mb-3 flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                >
                  <span
                    className="block bg-no-repeat"
                    style={{
                      width: `${width / Math.max(width, height) * 100}%`,
                      height: `${height / Math.max(width, height) * 100}%`,
                      backgroundImage: "url('/assets/amenities/premium-3d-icons.webp')",
                      backgroundSize: `${1280 / width * 100}% ${1280 / height * 100}%`,
                      backgroundPosition: `${x / (1280 - width) * 100}% ${y / (1280 - height) * 100}%`,
                    }}
                  />
                </span>
                <h3 className="font-semibold leading-snug text-[#303030]">{title}</h3>
              </li>
            ))}
          </ul>
          <button type="button" aria-label="Previous amenities" aria-controls="amenities-track" disabled={!canGoBack} onClick={() => scroll(-1)} className="absolute -left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6c08d] bg-[#ddbc69] text-black shadow-sm transition-opacity disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78337]">
            <ChevronLeft size={21} />
          </button>
          <button type="button" aria-label="Next amenities" aria-controls="amenities-track" disabled={!canGoNext} onClick={() => scroll(1)} className="absolute -right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6c08d] bg-[#ddbc69] text-black shadow-sm transition-opacity disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78337]">
            <ChevronRight size={21} />
          </button>
        </div>
      </div>
    </section>
  );
}
