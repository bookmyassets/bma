"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import { FaDownload } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { getWestwynSectionSurface } from "./WestwynTheme";

const DEFAULT_TONE =
  "bg-[#DDBC69] text-[#111111] ring-[#F0D58C]/70";

function getTone(location) {
  return location?.toneClass || DEFAULT_TONE;
}

function MapMarker({ location }) {
  if (
    !location ||
    typeof location.x !== "number" ||
    typeof location.y !== "number"
  ) {
    return null;
  }

  const Icon = location.Icon;
  const toneClass = getTone(location);

  return (
    <div
      aria-hidden="true"
      style={{
        left: `${location.x}%`,
        top: `${location.y}%`,
      }}
      className="
        pointer-events-none
        absolute
        z-20
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      <div className="flex flex-col items-center gap-1">
        <span
          className={`
            relative
            flex
            size-9
            items-center
            justify-center
            rounded-full
            border-2
            border-white
            shadow-[0_8px_18px_rgba(0,0,0,0.45)]
            ring-2

            sm:size-10

            ${toneClass}
          `}
        >
          {Icon ? (
            <Icon
              className="size-4 sm:size-[18px]"
              strokeWidth={1.8}
            />
          ) : null}

          <span
            className="
              absolute
              inset-[-6px]
              rounded-full
              border
              border-current/40
              motion-safe:animate-pulse
            "
          />
        </span>

        <div
          className="
            relative
            mt-1

            min-w-[120px]
            max-w-[190px]

            rounded-lg

            border
            border-[#DDBC69]

            bg-[#08243D]

            px-2.5
            py-2

            text-center
            text-[9px]
            font-semibold
            leading-[1.25]
            text-white

            shadow-[0_6px_18px_rgba(0,0,0,0.55)]

            sm:min-w-[135px]
            sm:max-w-[210px]
            sm:px-3
            sm:text-[10px]

            lg:text-[11px]
          "
        >
          <span
            className="
              absolute
              -top-[5px]
              left-1/2

              h-2.5
              w-2.5

              -translate-x-1/2
              rotate-45

              border-l
              border-t
              border-[#DDBC69]

              bg-[#08243D]
            "
          />

          <span className="relative z-10">
            {location.markerLabel || location.title}
          </span>
        </div>
      </div>
    </div>
  );
}

function MapFallbackCard({ location }) {
  if (!location) return null;

  const Icon = location.Icon;
  const toneClass = getTone(location);

  return (
    <div
      className="
        absolute
        bottom-3
        left-3
        right-3
        z-20

        rounded-xl

        border
        border-white/15

        bg-[#071018]/95

        p-3

        shadow-[0_12px_30px_rgba(0,0,0,0.45)]

        backdrop-blur-md

        sm:left-4
        sm:right-auto
        sm:max-w-[320px]
      "
    >
      <div className="flex items-center gap-3">
        <span
          className={`
            flex
            size-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ring-1

            ${toneClass}
          `}
        >
          {Icon ? (
            <Icon
              className="size-[18px]"
              strokeWidth={1.8}
            />
          ) : null}
        </span>

        <div className="min-w-0">
          <p
            className="
              text-sm
              font-semibold
              leading-[1.25]
              text-white
            "
          >
            {location.title}
          </p>

          <p
            className="
              mt-1
              text-xs
              font-semibold
              text-[#DDBC69]
            "
          >
            {location.value}
          </p>
        </div>
      </div>
    </div>
  );
}

function InteractiveMap({
  mapImage,
  mapAlt,
  activeLocation,
  mapBadge,
}) {
  const hasMarker =
    activeLocation &&
    typeof activeLocation.x === "number" &&
    typeof activeLocation.y === "number";

  return (
    <div className="group h-full">
      <div
        className="
          relative

          aspect-[4/3]
          w-full

          overflow-hidden

          rounded-[16px]

          bg-[#111111]

          sm:aspect-[5/4]

          lg:aspect-auto
          lg:h-full
          lg:min-h-[400px]
        "
      >
        <Image
          src={mapImage}
          alt={mapAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading="lazy"
          className="
            object-contain

            transition-transform
            duration-700
            ease-out

            lg:object-cover

            motion-safe:group-hover:scale-[1.02]
          "
        />

        {hasMarker ? (
          <MapMarker location={activeLocation} />
        ) : null}

        {!hasMarker && activeLocation ? (
          <MapFallbackCard location={activeLocation} />
        ) : null}

        <div
          className="
            absolute
            left-3
            top-3
            z-20

            flex
            items-center
            gap-2

            rounded-xl

            border
            border-white/15

            bg-[#071018]/90

            px-3
            py-2

            shadow-[0_8px_25px_rgba(0,0,0,0.35)]

            backdrop-blur-md

            sm:left-4
            sm:top-4
            sm:px-4
          "
        >
          <MapPin className="size-5 text-[#DDBC69]" />

          <span className="text-sm font-semibold text-white">
            {mapBadge}
          </span>
        </div>
      </div>
    </div>
  );
}

function ConnectivityRow({
  location,
  isActive,
  onSelect,
}) {
  const Icon = location.Icon;
  const toneClass = getTone(location);

  return (
    <button
      type="button"
      onClick={() => onSelect(location.id)}
      aria-pressed={isActive}
      className={`
        group

        grid

        min-h-[58px]
        w-full

        grid-cols-[36px_minmax(0,1fr)]

        items-center

        gap-x-2
        gap-y-1

        rounded-xl

        border

        px-2.5
        py-1.5

        text-left

        transition-all
        duration-300

        sm:min-h-[66px]

        ${
          isActive
            ? `
              border-[#DDBC69]
              bg-[#DDBC69]/10
              shadow-[0_8px_24px_rgba(221,188,105,0.10)]
            `
            : `
              border-white/10
              bg-[#111111]

              hover:border-[#DDBC69]/55
              hover:bg-[#151515]
            `
        }
      `}
    >
      <span
        className={`
          row-span-2

          flex
          size-9
          shrink-0
          items-center
          justify-center

          rounded-xl

          ring-1

          transition-transform
          duration-300

          motion-safe:group-hover:scale-105

          ${toneClass}
        `}
      >
        {Icon ? (
          <Icon
            className="size-[18px]"
            strokeWidth={1.7}
          />
        ) : null}
      </span>

      <span className="min-w-0">
        <span
          className="
            block
            break-words

            text-sm
            font-semibold
            leading-[1.25]
            text-white

            sm:text-[15px]
          "
        >
          {location.title}
        </span>

        {location.subtitle ? (
          <span
            className="
              mt-0.5
              block

              text-xs
              leading-[1.25]
              text-white/60

              sm:text-[13px]
            "
          >
            {location.subtitle}
          </span>
        ) : null}
      </span>

      <span
        className="
          col-start-2

          flex
          items-center
          justify-between
          gap-2

          text-left
          text-xs
          font-semibold
          leading-[1.2]
          text-[#DDBC69]

          sm:text-[13px]
        "
      >
        {location.value}

        <ChevronRight
          className={`
            size-5
            shrink-0

            transition-transform
            duration-300

            ${isActive ? "translate-x-0.5" : ""}
          `}
        />
      </span>
    </button>
  );
}

export default function WestWynProjectAbout({
  projectName = "WestWyn Project",
  surface = "base",
  overviewHeading,
  overviewDescription,

  locationHeading = "Well Positioned for Future Habitation",

  mapImage,
  mapAlt,
  mapBadge = "Strategic Location",

  locations = [],

  brochureUrl,
}) {
  const [activeLocationId, setActiveLocationId] =
    useState(null);

  const [showAllLocations, setShowAllLocations] =
    useState(false);

  const safeLocations = Array.isArray(locations)
    ? locations.filter(Boolean)
    : [];

  const activeLocation =
    safeLocations.find(
      (location) => location.id === activeLocationId,
    ) || null;

  const handleLocationSelect = (locationId) => {
    setActiveLocationId((current) =>
      current === locationId ? null : locationId,
    );
  };

  const handleBrochureDownload = () => {
    if (!brochureUrl) return;

    try {
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = `${projectName || "project"}-brochure.pdf`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading brochure:", error);
      window.open(brochureUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* ======================================================
          ABOUT / PROJECT OVERVIEW
      ====================================================== */}

      {overviewHeading || overviewDescription ? (
        <section
          id="project-overview"
          className={cn(
            `relative
            overflow-hidden

            border-t
            border-white/10

            bg-[#0B0B0B]

            text-white`,
          getWestwynSectionSurface(surface),
          )}
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              left-1/2
              top-0

              h-[500px]
              w-[900px]

              -translate-x-1/2

              rounded-full

              bg-[#DDBC69]/[0.035]

              blur-[120px]
            "
          />

          <div
            className="
              relative
              z-10

              mx-auto
              max-w-7xl

              px-4
              py-7

              sm:px-6
              sm:py-9

              lg:px-8
              lg:py-11
            "
          >
            {overviewHeading ? (
              <div className="mx-auto max-w-4xl text-center">
                <h2
                  className="
                    font-playfair-display

                    text-[30px]
                    font-semibold

                    leading-[1.1]

                    tracking-[-0.04em]

                    text-[#DDBC69]

                    lg:text-[40px]
                    lg:leading-[0.98]
                  "
                >
                  {overviewHeading}
                </h2>
              </div>
            ) : null}

            {overviewDescription ? (
              <div
                className="
                  mx-auto
                  mt-4

                  flex
                  max-w-3xl

                  items-center
                  justify-center

                  text-center

                  sm:mt-5
                  lg:mt-6
                "
              >
                <p
                  className="
                    font-inter

                    text-[16px]
                    leading-7
                    text-white

                    lg:text-[18px]
                    lg:leading-8
                  "
                >
                  {overviewDescription}
                </p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ======================================================
          PRIME LOCATION
      ====================================================== */}

      <section
        id="prime-location"
        className="
          relative
          overflow-hidden

          border-t
          border-white/10

          bg-[#0B0B0B]

          text-white
        "
      >
        <div
          className="
            relative
            z-10

            mx-auto
            max-w-7xl

            px-4
            py-7

            sm:px-6
            sm:py-9

            lg:px-8
            lg:py-11

            xl:py-12
          "
        >
          <div className="relative mx-auto max-w-4xl text-center">
            <h2
              className="
                font-playfair-display

                text-[30px]
                font-semibold

                leading-[1.1]

                tracking-[-0.04em]

                text-[#DDBC69]

                lg:text-[40px]
                lg:leading-[0.98]
              "
            >
              {locationHeading}
            </h2>
          </div>

          <div
            className="
              mt-5

              grid
              items-stretch
              gap-5

              sm:mt-6

              lg:mt-7
              lg:grid-cols-[1fr_1.02fr]
              lg:gap-5
            "
          >
            {/* MAP */}

            <div
              id="location-map"
              className="
                group
                relative
                overflow-hidden

                rounded-[22px]

                border
                border-white/10

                bg-[#111111]

                p-1.5

                shadow-[0_18px_45px_rgba(0,0,0,0.26)]

                sm:p-2
              "
            >
              <InteractiveMap
                mapImage={mapImage}
                mapAlt={mapAlt}
                activeLocation={activeLocation}
                mapBadge={mapBadge}
              />
            </div>

            {/* CONNECTIVITY */}

            <div
              className="
                flex
                flex-col

                rounded-[22px]

                border
                border-white/10

                bg-[#11100E]

                p-2

                shadow-[0_18px_45px_rgba(0,0,0,0.20)]

                sm:p-2.5

                lg:p-3
              "
            >
              <p
                className="
                  mb-2
                  px-1

                  text-xs
                  font-semibold
                  uppercase

                  tracking-[0.12em]

                  text-[#DDBC69]

                  sm:hidden
                "
              >
                {safeLocations.length} nearby connections
              </p>

              {/* TABLET / DESKTOP */}

              <div className="hidden h-full grid-cols-2 gap-2 sm:grid">
                {safeLocations.map((location) => (
                  <ConnectivityRow
                    key={location.id}
                    location={location}
                    isActive={
                      activeLocationId === location.id
                    }
                    onSelect={handleLocationSelect}
                  />
                ))}
              </div>

              {/* MOBILE */}

              <div className="grid grid-cols-1 gap-2 sm:hidden">
                {safeLocations
                  .slice(
                    0,
                    showAllLocations
                      ? safeLocations.length
                      : 5,
                  )
                  .map((location) => (
                    <ConnectivityRow
                      key={location.id}
                      location={location}
                      isActive={
                        activeLocationId === location.id
                      }
                      onSelect={handleLocationSelect}
                    />
                  ))}
              </div>

              {safeLocations.length > 5 ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowAllLocations(
                      (current) => !current,
                    )
                  }
                  aria-expanded={showAllLocations}
                  className="
                    mx-auto
                    mt-3

                    flex
                    min-h-9

                    items-center
                    justify-center
                    gap-2

                    rounded-full

                    border
                    border-[#DDBC69]/65

                    px-3.5
                    py-1.5

                    text-xs
                    font-semibold
                    text-[#DDBC69]

                    transition-all
                    duration-300

                    hover:bg-[#DDBC69]/10

                    sm:hidden
                  "
                >
                  {showAllLocations
                    ? "Show fewer connections"
                    : `View all ${safeLocations.length} connections`}

                  <ChevronRight
                    className={`
                      size-4

                      transition-transform
                      duration-300

                      ${
                        showAllLocations
                          ? "rotate-90"
                          : ""
                      }
                    `}
                    aria-hidden="true"
                  />
                </button>
              ) : null}

              {/* BROCHURE */}

              {brochureUrl ? (
                <div
                  className="
                    mt-4

                    border-t
                    border-white/10

                    pt-4

                    sm:mt-3
                    sm:pt-3
                  "
                >
                  <button
                    type="button"
                    onClick={handleBrochureDownload}
                    className="
                      group
                      gold-cta-button

                      flex
                      min-h-[46px]
                      w-full

                      items-center
                      justify-center
                      gap-2

                      rounded-xl

                      border
                      border-[#DDBC69]

                      bg-[#DDBC69]

                      px-4
                      py-2.5

                      text-[13px]
                      font-semibold
                      text-black

                      shadow-[0_8px_22px_rgba(221,188,105,0.16)]

                      transition-all
                      duration-300

                      hover:-translate-y-0.5
                      hover:bg-[#D1B15A]
                      hover:shadow-[0_12px_28px_rgba(221,188,105,0.22)]

                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#DDBC69]/40

                      sm:min-h-[48px]
                      sm:text-sm
                    "
                  >
                    <FaDownload
                      className="
                        text-[18px]
                        text-black

                        transition-transform
                        duration-300

                        group-hover:translate-y-0.5
                      "
                      aria-hidden="true"
                    />

                    Download Brochure
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
