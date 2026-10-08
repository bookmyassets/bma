"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, Cctv, Zap, Footprints, Fence, Route, Smartphone,
  Waves, Store, Building2, Flower2, Accessibility, Baby,
  ChevronLeft, ChevronRight,
} from "lucide-react";

const amenities = [
  { icon: ShieldCheck, title: "Gated Community" },
  { icon: Cctv, title: "24/7 CCTV Security" },
  { icon: Zap, title: "EV Charging Station" },
  { icon: Footprints, title: "Jogging Track" },
  { icon: Fence, title: "Project Boundary" },
  { icon: Route, title: "Internal Roads" },
  { icon: Smartphone, title: "App-Based Society Management" },
  { icon: Waves, title: "Drainage System" },
  { icon: Zap, title: "Power & Water Supply" },
  { icon: Store, title: "Daily Essentials Store" },
  { icon: Building2, title: "Clubhouse Lite" },
  { icon: Flower2, title: "Yoga Deck" },
  { icon: Accessibility, title: "Senior Citizen Zone" },
  { icon: Baby, title: "Kids Play Area" },
];

const colors = [
  "border-[#a9d8bc] text-[#299b63]",
  "border-[#b3cdf0] text-[#3479cc]",
  "border-[#e6cc90] text-[#c28c13]",
  "border-[#d6b8ee] text-[#9960ca]",
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
          <p className="font-semibold uppercase tracking-[0.12em] text-[#a78337]">Community Amenities</p>
          <h2 id="amenities-heading" className="mt-2 text-[24px] font-semibold leading-tight tracking-tight text-[#252525] sm:text-[30px]">Amenities for Better Living</h2>
        </div>

        <div className="relative">
          <ul id="amenities-track" ref={trackRef} aria-label="Community amenities" tabIndex={0} className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]">
            {amenities.map(({ icon: Icon, title }, index) => (
              <li key={title} className="flex w-[46%] shrink-0 snap-start flex-col items-center px-1 py-2 text-center sm:w-[calc((100%-32px)/3)] lg:w-[calc((100%-64px)/5)]">
                <span className={`mb-2 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border bg-transparent sm:h-20 sm:w-20 ${colors[index % colors.length]}`}>
                  <Icon aria-hidden="true" className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.8} />
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
