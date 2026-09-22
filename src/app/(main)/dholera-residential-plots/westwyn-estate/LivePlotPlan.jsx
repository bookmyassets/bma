"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import {
  FaExpand,
  FaXmark,
} from "react-icons/fa6";

import planImage from "@/assests/residential/estates/westwyn-estate-inventory.svg";

/*
|--------------------------------------------------------------------------
| ESTATE PLAN ASPECT
|--------------------------------------------------------------------------
|
| SVG dimensions:
|
| 2000 x 1414
|
*/

const PLAN_ASPECT_RATIO = "2000 / 1414";

/*
|--------------------------------------------------------------------------
| INTERACTIVE MAP
|--------------------------------------------------------------------------
*/

const InteractivePlotMap = dynamic(
  () =>
    import(
      "./WestwynEstateInteractivePlotMap"
    ),
  {
    ssr: false,

    loading: () => (
      <div
        className="
          flex
          w-full
          items-center
          justify-center

          rounded-[24px]

          border
          border-[#2A2318]

          bg-[#070707]

          px-4

          text-center
          text-sm
          text-[#D5C39A]
        "
        style={{
          aspectRatio: PLAN_ASPECT_RATIO,
        }}
      >
        Loading live plot plan...
      </div>
    ),
  },
);

/*
|--------------------------------------------------------------------------
| STATIC PREVIEW
|--------------------------------------------------------------------------
*/

const StaticPlanPreview = ({
  showAction = false,
  onOpen,
}) => {
  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-[24px]

        border
        border-[#2A2318]

        bg-[#050505]

        shadow-[0_24px_80px_rgba(0,0,0,0.35)]
      "
    >
      <div
        className="relative w-full"
        style={{
          aspectRatio: PLAN_ASPECT_RATIO,
        }}
      >
        <Image
          src={planImage}
          alt="WestWyn Estates master plan layout"
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
        />
      </div>

      {showAction ? (
        <div
          className="
            absolute
            inset-x-0
            bottom-0

            bg-gradient-to-t
            from-black/90
            via-black/45
            to-transparent

            px-4
            pb-4
            pt-14
          "
        >
          <button
            type="button"
            onClick={onOpen}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-[#DDBC69]

              bg-[#DDBC69]

              px-4
              py-3

              text-sm
              font-semibold
              text-black

              shadow-[0_10px_30px_rgba(221,188,105,0.22)]

              transition-transform
              duration-200

              hover:-translate-y-0.5
            "
          >
            <FaExpand />

            Explore Live Plan
          </button>
        </div>
      ) : null}
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| LIVE PLOT PLAN
|--------------------------------------------------------------------------
*/

const LivePlotPlan = () => {
  const desktopContainerRef =
    useRef(null);

  const [
    desktopMapReady,
    setDesktopMapReady,
  ] = useState(false);

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    mounted,
    setMounted,
  ] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | CLIENT MOUNT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | LAZY LOAD DESKTOP MAP
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const element =
      desktopContainerRef.current;

    if (!element) {
      return undefined;
    }

    const media =
      window.matchMedia(
        "(min-width: 1024px)",
      );

    if (!media.matches) {
      return undefined;
    }

    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      setDesktopMapReady(true);

      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting
          ) {
            setDesktopMapReady(
              true,
            );

            observer.disconnect();
          }
        },

        {
          rootMargin:
            "250px 0px",
        },
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | MOBILE MODAL BODY LOCK
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const onKeyDown = (event) => {
      if (
        event.key === "Escape"
      ) {
        setMobileOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        onKeyDown,
      );
    };
  }, [mobileOpen]);

  /*
  |--------------------------------------------------------------------------
  | MOBILE FULLSCREEN MODAL
  |--------------------------------------------------------------------------
  */

  const mobileModal =
    mounted && mobileOpen
      ? createPortal(
          <div
            className="
              fixed
              inset-0

              z-[99999]

              flex
              h-[100dvh]
              w-screen
              flex-col

              bg-[#050505]

              lg:hidden
            "
            role="dialog"
            aria-modal="true"
            aria-label="WestWyn Estates live plot plan"
          >
            {/* Header */}

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
                  WestWyn Estates
                </p>

                <h3
                  className="
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  Live Plot Availability
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(false)
                }
                aria-label="Close live plot plan"
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
              >
                <FaXmark className="text-lg" />
              </button>
            </div>

            {/* Map */}

            <div
              className="
                min-h-0
                flex-1
                overflow-hidden
                p-3
              "
            >
              <InteractivePlotMap
                fullscreen
              />
            </div>
          </div>,

          document.body,
        )
      : null;

  return (
    <>
      {/* =========================================================
          MOBILE PREVIEW
      ========================================================== */}

      <div className="lg:hidden">
        <StaticPlanPreview
          showAction
          onOpen={() =>
            setMobileOpen(true)
          }
        />
      </div>

      {/* =========================================================
          DESKTOP LIVE MAP
      ========================================================== */}

      <div
        ref={
          desktopContainerRef
        }
        className="hidden lg:block"
      >
        {desktopMapReady ? (
          <InteractivePlotMap />
        ) : (
          <StaticPlanPreview />
        )}
      </div>

      {/* =========================================================
          FULLSCREEN MOBILE MAP
      ========================================================== */}

      {mobileModal}
    </>
  );
};

export default LivePlotPlan;