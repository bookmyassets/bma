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
  const [count, setCount] = useState(0);

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
    const duration = 1100;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [shouldStart, target]);

  return (
    <span className="inline-block min-w-[7ch] tabular-nums">
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
        className="bg-gray-50 px-[clamp(1rem,5vw,2rem)] py-[clamp(2rem,5vw,3.5rem)] pt-8"
        id="why-bma"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-[clamp(1rem,4vw,2rem)] flex flex-col items-center text-center">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="mx-auto max-w-5xl text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-tight text-gray-900">
                <span className="text-[#deae3c]">BookMyAssets</span> : Trusted
                Developers in Dholera{" "}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <p className="space-y-6 text-[clamp(0.875rem,2vw,1.125rem)]">
              BookMyAssets brings prime location residential plots in Dholera
              for sale with strong growth potential, registry ready
              documentation, clear guidance, and complete support before and
              after booking.
            </p>

            <div className="mx-auto max-w-7xl px-[calc(0.5rem_+_1vw)]">
              <div
                ref={counterGridRef}
                className="grid grid-cols-2 gap-[calc(0.75rem_+_0.5vw)] lg:grid-cols-4"
              >
                {COUNTERS.map(({ target, suffix, label }) => (
                  <div
                    key={label}
                    className="flex min-h-[8rem] flex-col items-center justify-center rounded-2xl bg-white p-[calc(0.75rem_+_0.2vw)] shadow-md transition-shadow hover:shadow-xl"
                  >
                    <div className="mb-2 text-center text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-[#deae3c]">
                      <AnimatedCounter
                        target={target}
                        suffix={suffix}
                        shouldStart={shouldStartCounters}
                      />
                    </div>
                    <p className="text-center text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-gray-700">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="">
              {/* CTA Buttons */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <Link
                  href="/about"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#deae3c] px-6 py-3 text-[clamp(0.875rem,1.5vw,1rem)] font-semibold text-white shadow-md transition-all hover:bg-[#c99a2e] hover:shadow-lg sm:w-auto"
                >
                  Know More About Us
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <div className="mx-auto max-w-7xl text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-tight text-gray-900">
                <p>Why Invest with BookMyAssets</p>
              </div>
              <div className="pt-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {icons.map((item, index) => {
                    const isLastOdd =
                      index === icons.length - 1 && icons.length % 2 !== 0;
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col items-center gap-3 rounded-xl border border-gray-100 p-2 shadow-sm transition-shadow hover:shadow-md ${
                          isLastOdd ? "col-span-2 sm:col-span-1" : ""
                        }`}
                      >
                        <div className="relative h-[clamp(7rem,8vw,9rem)] w-[clamp(7rem,8vw,9rem)]">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-center text-[clamp(0.75rem,1.5vw,0.95rem)] font-medium text-gray-700">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
