"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaExpand, FaXmark } from "react-icons/fa6";
import { createPortal } from "react-dom";

import planImage from "@/assests/residential/residency/westwyn-residency-inventory.svg";

const MAP_ASPECT = "aspect-[915/800]";

const InteractivePlotMap = dynamic(
  () => import("./WestWynInteractivePlotMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className={`flex ${MAP_ASPECT} items-center justify-center rounded-[24px] border border-[#2A2318] bg-[#070707] px-4 text-center text-sm text-[#D5C39A]`}
      >
        Loading live plot plan...
      </div>
    ),
  },
);

const StaticPlanPreview = ({ showAction = false, onOpen }) => (
  <div className="relative overflow-hidden rounded-[24px] border border-[#2A2318] bg-[#050505] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
    <div className={`relative w-full ${MAP_ASPECT}`}>
      <Image
        src={planImage}
        alt="WestWyn Residency master plan layout"
        fill
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain"
      />
    </div>

    {showAction && (
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-4 pb-4 pt-14">
        <button
          type="button"
          onClick={onOpen}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DDBC69] bg-[#DDBC69] px-4 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(221,188,105,0.22)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <FaExpand />
          Explore Live Plan
        </button>
      </div>
    )}
  </div>
);

const LivePlotPlan = () => {
  const desktopContainerRef = useRef(null);

  const [desktopMapReady, setDesktopMapReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const element = desktopContainerRef.current;
    if (!element) return undefined;

    const media = window.matchMedia("(min-width: 1024px)");
    if (!media.matches) return undefined;

    if (!("IntersectionObserver" in window)) {
      setDesktopMapReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDesktopMapReady(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="lg:hidden">
        <StaticPlanPreview showAction onOpen={() => setMobileOpen(true)} />
      </div>

      <div ref={desktopContainerRef} className="hidden lg:block">
        {desktopMapReady ? <InteractivePlotMap /> : <StaticPlanPreview />}
      </div>

      {mounted &&
        mobileOpen &&
        createPortal(
          <div
            className="
        fixed
        inset-0
        z-[99999]
        flex
        h-[100dvh]
        w-screen
        flex-col
        overflow-hidden
        bg-[#050505]
        lg:hidden
      "
            role="dialog"
            aria-modal="true"
            aria-label="WestWyn Residency live plot plan"
          >
            {/* HEADER */}
            <div
              className="
          flex
          shrink-0
          items-center
          justify-between
          border-b
          border-[#221D14]
          bg-[#0A0A0A]
          px-4
          py-3
        "
            >
              <div>
                <p
                  className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.24em]
              text-[#D2B56D]
            "
                >
                  WestWyn Residency
                </p>

                <h3 className="text-lg font-semibold text-white">
                  Live Plot Availability
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-[#2D261C]
            bg-[#111111]
            text-white
            transition-colors
            duration-200
            hover:border-[#DDBC69]
            hover:text-[#DDBC69]
          "
                aria-label="Close live plot plan"
              >
                <FaXmark className="text-lg" />
              </button>
            </div>

            {/* INVENTORY */}
            <div className="min-h-0 flex-1 overflow-hidden p-3">
              <InteractivePlotMap fullscreen />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default LivePlotPlan;
