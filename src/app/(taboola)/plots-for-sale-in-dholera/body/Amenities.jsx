"use client";

import { useEffect, useRef, useState } from "react";
import {
  BatteryCharging,
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Footprints,
  Gamepad2,
  Leaf,
  LockKeyhole,
  Route,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";

const amenities = [
  { title: "Signature Project Boundary", icon: ShieldCheck },
  { title: "Controlled Access Gated Community", icon: LockKeyhole },
  { title: "Wide Internal Road Network", icon: Route },
  { title: "24/7 Security & CCTV Surveillance", icon: Camera },
  { title: "App-Based Society Management", icon: Smartphone },
  { title: "Drainage System", icon: Droplets },
  { title: "Power & Water Supply", icon: Zap },
  { title: "EV Charging Station", icon: BatteryCharging },
  { title: "Daily Essentials & Utilities Store", icon: ShoppingBag },
  { title: "Clubhouse Lite", icon: Building2 },
  { title: "Yoga Deck", icon: Leaf },
  { title: "Jogging Track", icon: Footprints },
  { title: "Senior Citizen Zone", icon: Users },
  { title: "Kids Play Area", icon: Gamepad2 },
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
            {amenities.map(({ title, icon: Icon }) => (
              <li key={title} className="flex w-[46%] shrink-0 snap-start flex-col items-center px-1 py-2 text-center sm:w-[calc((100%-32px)/3)] lg:w-[calc((100%-64px)/5)]">
                <span
                  aria-hidden="true"
                  className="mb-3 flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-[#ead9ad] bg-white text-[#a78337] shadow-sm sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                >
                  <Icon aria-hidden="true" className="h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14" strokeWidth={1.7} />
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
