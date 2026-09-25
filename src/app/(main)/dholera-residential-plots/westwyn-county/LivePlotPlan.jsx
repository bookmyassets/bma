"use client";

import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

import {
  FaExpand,
  FaXmark,
} from "react-icons/fa6";

import WestwynCountyInteractivePlotMap from "./WestwynCountyInteractivePlotMap";

const PLAN_ASPECT_RATIO = "2000 / 1411";

/*
|--------------------------------------------------------------------------
| STATIC PLAN PREVIEW
|--------------------------------------------------------------------------
|
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
       <WestwynCountyInteractivePlotMap />
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
  const [planOpen, setPlanOpen] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

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
  | FULLSCREEN BODY LOCK + ESCAPE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!planOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setPlanOpen(false);
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
  }, [planOpen]);

  /*
  |--------------------------------------------------------------------------
  | FULLSCREEN PLAN
  |--------------------------------------------------------------------------
  */

  const fullscreenPlan =
    mounted && planOpen
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
            "
            role="dialog"
            aria-modal="true"
            aria-label="WestWyn County master plan"
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

                sm:px-6
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
                  WestWyn County
                </p>

                <h3
                  className="
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  Master Plot Plan
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setPlanOpen(false)
                }
                aria-label="Close WestWyn County plan"
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

            {/* Plan */}

            <div
              className="
                min-h-0
                flex-1

                overflow-hidden

                p-3

                sm:p-5
                lg:p-8
              "
            >
              <WestwynCountyInteractivePlotMap fullscreen />
            </div>
          </div>,

          document.body,
        )
      : null;

  return (
    <>
      {/* =========================================================
          MOBILE
      ========================================================== */}

      <div className="lg:hidden">
        <StaticPlanPreview
          showAction
          onOpen={() =>
            setPlanOpen(true)
          }
        />
      </div>

      {/* =========================================================
          DESKTOP
      ========================================================== */}

      <div className="hidden lg:block">
        <div
          role="button"
          tabIndex={0}
          onClick={() =>
            setPlanOpen(true)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              setPlanOpen(true);
            }
          }}
          className="
            cursor-zoom-in
            outline-none

            focus-visible:ring-2
            focus-visible:ring-[#DDBC69]
          "
        >
          <StaticPlanPreview />
        </div>
      </div>

      {/* =========================================================
          FULLSCREEN PLAN
      ========================================================== */}

      {fullscreenPlan}
    </>
  );
};

export default LivePlotPlan;
