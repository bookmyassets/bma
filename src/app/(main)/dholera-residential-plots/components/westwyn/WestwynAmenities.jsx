"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeftIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWestwynSectionSurface } from "./WestwynTheme";

export default function WestWynAmenities({
  projectName = "WestWyn Project",
  heading = "Practical Amenities Designed for Better Living",
  amenities = [],
  surface="base",
}) {
  const carouselRef = useRef(null);

  const amenityList = Array.isArray(amenities) ? amenities.filter(Boolean) : [];

  const project =
    typeof projectName === "string" && projectName.trim()
      ? projectName.trim()
      : "WestWyn Project";

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel || amenityList.length <= 1) {
      return undefined;
    }

    const desktopQuery = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );

    let autoplayId;

    const getCardWidth = () => {
      const firstCard = carousel.firstElementChild;

      if (!firstCard) return 0;

      const styles = window.getComputedStyle(carousel);

      const gap = parseFloat(styles.columnGap) || parseFloat(styles.gap) || 0;

      return firstCard.getBoundingClientRect().width + gap;
    };

    const stopAutoplay = () => {
      if (!autoplayId) return;

      window.clearInterval(autoplayId);
      autoplayId = undefined;
    };

    const startAutoplay = () => {
      stopAutoplay();

      if (!desktopQuery.matches) return;

      autoplayId = window.setInterval(() => {
        const cardWidth = getCardWidth();

        if (!cardWidth) return;

        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        const isAtEnd = carousel.scrollLeft >= maxScrollLeft - cardWidth;

        carousel.scrollTo({
          left: isAtEnd ? 0 : carousel.scrollLeft + cardWidth,

          behavior: "smooth",
        });
      }, 3500);
    };

    const handleViewportChange = () => {
      startAutoplay();
    };

    startAutoplay();

    desktopQuery.addEventListener("change", handleViewportChange);

    carousel.addEventListener("mouseenter", stopAutoplay);

    carousel.addEventListener("mouseleave", startAutoplay);

    carousel.addEventListener("focusin", stopAutoplay);

    carousel.addEventListener("focusout", startAutoplay);

    return () => {
      stopAutoplay();

      desktopQuery.removeEventListener("change", handleViewportChange);

      carousel.removeEventListener("mouseenter", stopAutoplay);

      carousel.removeEventListener("mouseleave", startAutoplay);

      carousel.removeEventListener("focusin", stopAutoplay);

      carousel.removeEventListener("focusout", startAutoplay);
    };
  }, [amenityList.length]);

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const scrollAmount =
      window.innerWidth >= 1024
        ? carousel.clientWidth * 0.52
        : carousel.clientWidth * 0.82;

    carousel.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,

      behavior: "smooth",
    });
  };

  return (
    <section
      aria-label={`${project} amenities`}
      className={cn(
        `relative
        overflow-hidden

        px-4
        py-5

        sm:px-6
        sm:py-6

        lg:px-8
        lg:py-9`,
        getWestwynSectionSurface(surface)
      )}
      
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-40
          top-0

          h-[420px]
          w-[420px]

          rounded-full

          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-44
          right-0

          h-[420px]
          w-[500px]

          rounded-full

          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* =========================================
            HEADER
        ========================================== */}

        <div
          className="
            mx-auto
            max-w-[340px]

            text-center

            sm:max-w-3xl
          "
        >
          <h2
            className="
              font-playfair-display

              text-[30px]
              font-semibold

              leading-[1.1]

              tracking-[-0.025em]

              text-[#DDBC69]

              lg:text-[40px]
            "
          >
            {heading}
          </h2>
        </div>

        {/* =========================================
            MOBILE CONTROLS
        ========================================== */}

        {amenityList.length > 1 ? (
          <div
            className="
              mt-5

              flex
              items-center
              justify-end

              lg:hidden
            "
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCarousel("prev")}
                aria-label="Previous amenities"
                className="
                  flex
                  size-9

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#4C463C]

                  bg-[#2C2A25]

                  text-[#F4EFE6]

                  sm:size-10
                "
              >
                <ChevronLeftIcon className="size-4" strokeWidth={1.8} />
              </button>

              <button
                type="button"
                onClick={() => scrollCarousel("next")}
                aria-label="Next amenities"
                className="
                  flex
                  size-9

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#4C463C]

                  bg-[#2C2A25]

                  text-[#F4EFE6]

                  sm:size-10
                "
              >
                <ChevronRight className="size-4" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        ) : null}

        {/* =========================================
            AMENITIES CAROUSEL
        ========================================== */}

        <div
          ref={carouselRef}
          className="
            mt-5

            flex

            snap-x
            snap-mandatory

            gap-1

            overflow-x-auto
            overscroll-x-contain

            pb-2

            scroll-smooth

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            min-[430px]:gap-2

            sm:gap-4

            lg:gap-5
          "
        >
          {amenityList.map((amenity, index) => {
            const Icon = amenity.Icon || Sparkles;

            const iconColor = amenity.iconColor || "text-[#DDBC69]";

            const iconBackground = amenity.iconBackground || "bg-[#DDBC69]/12";

            const iconBorder = amenity.iconBorder || "border-[#DDBC69]/30";

            const iconGlow =
              amenity.iconGlow || "shadow-[0_8px_24px_rgba(221,188,105,0.16)]";

            return (
              <article
                key={amenity.id || `${amenity.title}-${index}`}
                className="
                    flex-none
                    snap-start

                    basis-[62%]

                    min-[430px]:basis-[43%]

                    sm:basis-[40%]

                    md:basis-[30%]

                    lg:basis-[calc(25%-18px)]
                  "
              >
                <div
                  className="
                      flex
                      flex-col

                      items-center

                      text-center
                    "
                >
                  {/* ==========================
    CIRCULAR VISUAL
=========================== */}

                  <div
                    className="
    relative

    aspect-square

    w-full
    max-w-[150px]

    min-[430px]:max-w-[160px]

    sm:max-w-[195px]

    md:max-w-[205px]

    lg:max-w-[220px]

    xl:max-w-[230px]
  "
                  >
                    {/* Main circle */}

                    <div
                      className="
      relative

      h-full
      w-full

      overflow-hidden

      rounded-full

      border
      border-white/10

      bg-[#2D2B26]

      shadow-[0_18px_42px_rgba(0,0,0,0.25)]
    "
                    >
                      {amenity.image ? (
                        <>
                          <Image
                            src={amenity.image}
                            alt={
                              amenity.imageAlt ||
                              `${project} - ${amenity.title}`
                            }
                            fill
                            loading="lazy"
                            sizes="
            (max-width: 430px) 150px,
            (max-width: 640px) 160px,
            (max-width: 1024px) 205px,
            230px
          "
                            className="object-cover"
                          />

                          {/* Image overlay */}

                          <div
                            aria-hidden="true"
                            className="
            pointer-events-none

            absolute
            inset-0

            bg-black/10
          "
                          />
                        </>
                      ) : (
                        <div
                          className="
          absolute
          inset-0

          flex
          items-center
          justify-center

          bg-[#292722]
        "
                        >
                          {/* Outer decorative ring */}

                          <div
                            aria-hidden="true"
                            className={`
            absolute

            size-[106px]

            rounded-full

            border

            ${iconBorder}

            opacity-45

            sm:size-[126px]

            lg:size-[142px]
          `}
                          />

                          {/* Main icon orb */}

                          <div
                            className={`
            relative

            flex

            size-[72px]

            items-center
            justify-center

            rounded-[22px]

            border

            ${iconBorder}
            ${iconBackground}
            ${iconGlow}

            sm:size-[82px]

            lg:size-[92px]
          `}
                          >
                            <Icon
                              aria-hidden="true"
                              strokeWidth={1.6}
                              className={`
              size-8

              ${iconColor}

              sm:size-9

              lg:size-10
            `}
                            />
                          </div>
                        </div>
                      )}

                      {/* Inner circular line */}

                      <div
                        aria-hidden="true"
                        className="
        pointer-events-none

        absolute
        inset-[5px]

        rounded-full

        border
        border-white/10
      "
                      />
                    </div>

                    {/* ==========================
      FLOATING ICON BADGE
      Appears on image amenities
  =========================== */}

                    {amenity.image ? (
                      <div
                        className={`
        absolute

        bottom-1
        right-1

        z-20

        flex

        size-11

        items-center
        justify-center

        rounded-[14px]

        border

        ${iconBorder}
        ${iconBackground}
        ${iconGlow}

        backdrop-blur-md

        sm:size-12

        lg:bottom-2
        lg:right-2
        lg:size-[52px]
      `}
                      >
                        <Icon
                          aria-hidden="true"
                          strokeWidth={1.8}
                          className={`
          size-5

          ${iconColor}

          sm:size-[22px]

          lg:size-6
        `}
                        />
                      </div>
                    ) : null}
                  </div>

                  {/* ==========================
                        TITLE
                    =========================== */}

                  <h3
                    className="
                        mt-2.5

                        max-w-[230px]

                        font-serif

                        text-[17px]
                        font-semibold

                        leading-[1.25]

                        text-[#F4EFE6]

                        sm:text-[18px]

                        lg:mt-3
                        lg:text-[19px]
                      "
                  >
                    {amenity.title}
                  </h3>

                  {amenity.subtitle ? (
                    <p
                      className="
                          mt-1.5

                          max-w-[240px]

                          text-[13px]
                          leading-5

                          text-white

                          sm:text-[14px]
                        "
                    >
                      {amenity.subtitle}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        {/* =========================================
            MOBILE SWIPE LABEL
        ========================================== */}

        {amenityList.length > 1 ? (
          <div
            className="
              mt-1

              flex
              justify-center

              lg:hidden
            "
          >
            <span
              className="
                inline-flex

                items-center
                gap-1.5

                text-[10px]
                font-medium
                uppercase

                tracking-[0.12em]

                text-white
              "
            >
              Swipe to explore
              <ChevronRight className="size-3" strokeWidth={1.7} />
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
