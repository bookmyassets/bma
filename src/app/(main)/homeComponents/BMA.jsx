"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import img1 from "@/assests/taboola/icons/bookmyassets-365-days-assistance-icon.svg";
import img2 from "@/assests/taboola/icons/bookmyassets-buy-back-assistance-icon.svg";
import img3 from "@/assests/taboola/icons/bookmyassets-due-diligence-team-icon.svg";
import img4 from "@/assests/taboola/icons/bookmyassets-immediate-sale-deed-icon.svg";
import img5 from "@/assests/taboola/icons/bookmyassets-resale-support-icon.svg";

const icons = [
  { id: 1, icon: img3, label: "Due Diligence Team" },
  { id: 2, icon: img4, label: "Immediate Sale Deed" },
  { id: 3, icon: img1, label: "365 Days Site Visit" },
  { id: 4, icon: img5, label: "Resale Support" },
  { id: 5, icon: img2, label: "Buyback Assistance" },
  { id: 6, icon: img2, label: "Rental Support" },
];

const COUNTERS = [
  {
    target: 7,
    suffix: "+ Projects",
    label: "Successfully Sold Out",
  },
  {
    target: 2,
    suffix: " Lakh+ Sq. Yd",
    label: "Dholera Land Sold",
  },
  {
    target: 957,
    suffix: "+ Plots",
    label: "Registry Delivered",
  },
  {
    target: 561,
    suffix: "+ Clients",
    label: "Investor Client Base",
  },
];

function AnimatedCounter({ target, suffix, shouldStart }) {
  // Important: initial render shows the final value, not 0
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!shouldStart) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setCount(target);
      return undefined;
    }

    let animationFrame;
    const duration = 3100;
    const startTime = performance.now();

    // Animation starts only on the client, after initial HTML already has real value
    setCount(0);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextCount =
        progress === 1 ? target : Math.round(target * easedProgress);

      setCount(nextCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [shouldStart, target]);

  const finalText = `${target.toLocaleString("en-IN")}${suffix}`;

  return (
    <span
      className="inline-block min-w-[7ch] tabular-nums"
      data-final-value={finalText}
      aria-label={finalText}
    >
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function AboutBMA() {
  const counterGridRef = useRef(null);
  const [shouldStartCounters, setShouldStartCounters] = useState(false);

  useEffect(() => {
    if (shouldStartCounters) return undefined;

    const counterGrid = counterGridRef.current;
    if (!counterGrid) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldStartCounters(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "0px 0px -15% 0px", threshold: 0.25 },
    );

    observer.observe(counterGrid);

    return () => observer.disconnect();
  }, [shouldStartCounters]);

  return (
    <>
      <div
        className="bg-gray-50 px-[clamp(1rem,4vw,2rem)] py-[clamp(2rem,2vw,3rem)]"
        id="why-bma"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-[clamp(1rem,3vw,1.75rem)] flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <h2 className="mx-auto max-w-5xl text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] text-gray-900">
                Why Invest with{" "}
                <span className="text-[#ddbc69]">BookMyAssets</span>?
              </h2>
            </div>
          </div>
          <div className="mx-auto max-w-7xl text-center text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7] text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div
                  ref={counterGridRef}
                  className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1.25rem)]"
                >
                  {COUNTERS.map(({ target, suffix, label }) => (
                    <div
                      key={label}
                      className="flex shadow-black flex-col items-center justify-center rounded-2xl bg-[#ddbc69] p-[clamp(0.5rem,1.5vw,0.75rem)] shadow-md transition-shadow hover:shadow-xl"
                    >
                      <div className="mb-2 text-center text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.35] text-black">
                        <AnimatedCounter
                          target={target}
                          suffix={suffix}
                          shouldStart={shouldStartCounters}
                        />
                      </div>
                      <p className="text-center text-[0.875rem] font-normal leading-[1.5] text-black">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                {/* <p className="font-semibold pb-4 md:hidden">We Promise</p> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1rem)]">
                  {icons.map((item, index) => {
                    const isLastOdd =
                      index === icons.length - 1 && icons.length % 2 !== 0;
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col items-center shadow-lg gap-[clamp(0.5rem,1.5vw,0.75rem)] rounded-xl border border-gray-100 bg-black p-[clamp(0.75rem,2vw,1rem)] transition-shadow hover:shadow-md ${
                          isLastOdd
                            ? "col-span-2 justify-self-center w-[calc(50%-0.5rem)]"
                            : ""
                        }`}
                      >
                        <p className="text-center text-[0.875rem] font-semibold leading-[1.5] text-[#ddbc69]">
                          <span className="text-green-500 text-center px-2">✓</span>{" "}
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-[clamp(1.25rem,3vw,2rem)]">
            <div>
              <div className="pt-[clamp(1rem,2vw,1.5rem)]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
