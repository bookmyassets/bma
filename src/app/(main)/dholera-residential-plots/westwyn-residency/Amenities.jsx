import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Square,
  Shield,
  Camera,
  Baby,
  Wifi,
  Zap,
  User,
  Users,
  Car,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { FaRoad, FaFilter } from "react-icons/fa6";

import img1 from "@/assests/residential/residency/residency-jogging.webp";
import img2 from "@/assests/residential/residency/westwyn-residency-dholera-sir-ev-charging-station.webp";
import img3 from "@/assests/residential/residency/westwyn-residency-dholera-sir-kids-play-area.webp";

const carouselImages = [
  { src: img1, alt: "WestWyn Estates - Clubhouse" },
  { src: img2, alt: "WestWyn Estates - EV Charging Station" },
  { src: img3, alt: "WestWyn Estates - Kids Play Area" },
];

// ============================================================
// AMENITY DATA
// ============================================================

const amenities = [
  {
    id: "boundary",
    icon: <Square />,
    title: "Project Boundary",
    subtitle: "Clearly defined project limits",
    description:
      "A clearly defined project boundary provides structure, security and a well-organised community environment.",
    points: [
      "Clearly demarcated project",
      "Organised community planning",
    ],
    color: "bg-gradient-to-br from-gray-500 to-gray-700",
  },

  {
    id: "gated",
    icon: <Shield />,
    title: "Gated Community",
    subtitle: "A safer, more secure tomorrow",
    description:
      "A secure gated community with controlled access provides a safer and more peaceful environment for residents and their families.",
    points: [
      "Controlled entry & exit points",
      "Visitor management system",
    ],
    color: "bg-gradient-to-br from-indigo-500 to-purple-600",
  },

  {
    id: "security",
    icon: <Camera />,
    title: "24/7 Security & CCTV",
    subtitle: "Round-the-clock surveillance",
    description:
      "Round-the-clock security and CCTV surveillance help provide a secure environment and greater peace of mind.",
    points: [
      "24/7 on-site security",
      "CCTV at key locations",
      "Trained security personnel",
    ],
    color: "bg-gradient-to-br from-red-500 to-red-700",
  },

  {
    id: "kids",
    icon: <Baby />,
    title: "Kids Play Area",
    subtitle: "A safe space for little joys",
    description:
      "A dedicated space where children can play, enjoy outdoor activities and spend quality time within the community.",
    points: [
      "Dedicated children's area",
      "Safe recreational environment",
    ],
    color: "bg-gradient-to-br from-purple-400 to-pink-400",
  },

  {
    id: "management",
    icon: <Wifi />,
    title: "App-Based Management",
    subtitle: "Community management made simple",
    description:
      "App-based management brings important community services and everyday management needs together in one convenient platform.",
    points: [
      "Digital community management",
      "Convenient access to services",
    ],
    color: "bg-gradient-to-br from-teal-500 to-teal-700",
  },

  {
    id: "power",
    icon: <Zap />,
    title: "Power & Water Supply",
    subtitle: "Uninterrupted living, always",
    description:
      "Reliable power and water infrastructure supports a comfortable and hassle-free everyday living experience.",
    points: [
      "Reliable power infrastructure",
      "Dedicated water supply",
    ],
    color: "bg-gradient-to-br from-[#D4A84F] to-[#A8751C]",
  },

  {
    id: "yoga",
    icon: <User />,
    title: "Yoga Deck",
    subtitle: "Space for health and wellness",
    description:
      "A dedicated wellness space designed for relaxation, yoga and maintaining a healthier everyday lifestyle.",
    points: [
      "Dedicated wellness space",
      "Peaceful environment",
    ],
    color: "bg-gradient-to-br from-pink-500 to-rose-500",
  },

  {
    id: "senior",
    icon: <Users />,
    title: "Senior Citizen Zone",
    subtitle: "Comfort, care and community",
    description:
      "Thoughtfully planned spaces for senior citizens to relax, interact and enjoy meaningful community experiences.",
    points: [
      "Dedicated relaxation space",
      "Community interaction",
    ],
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
  },

  {
    id: "ev",
    icon: <Car />,
    title: "EV Charging Station",
    subtitle: "Green-ready infrastructure",
    description:
      "EV charging infrastructure supports cleaner mobility and prepares the community for an increasingly electric future.",
    points: [
      "EV-ready infrastructure",
      "Convenient charging facility",
    ],
    color: "bg-gradient-to-br from-green-600 to-green-800",
  },

  {
    id: "roads",
    icon: <FaRoad />,
    title: "Wide Internal Roads",
    subtitle: "Smooth, spacious and well-planned",
    description:
      "Wide and well-planned internal roads provide smooth movement and better accessibility throughout the community.",
    points: [
      "Spacious internal roads",
      "Planned community circulation",
    ],
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
  },

  {
    id: "drainage",
    icon: <FaFilter />,
    title: "Drainage System",
    subtitle: "Modern drainage infrastructure",
    description:
      "A planned drainage system helps maintain a cleaner, healthier and better-managed community environment.",
    points: [
      "Planned drainage infrastructure",
      "Improved water management",
    ],
    color: "bg-gradient-to-br from-amber-600 to-amber-800",
  },
];


// ============================================================
// DESKTOP AMENITY CARD
// ============================================================

const DesktopAmenityCard = ({ amenity, isActive, onClick }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
        isActive
          ? "border-[#C9A65D] bg-[#34312B] shadow-sm"
          : "border-[#4C463C] bg-[#2D2B26] hover:border-[#C9A65D]/60"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">

          {/* Colorful Icon */}
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${amenity.color} text-white shadow-sm`}
          >
            {React.cloneElement(amenity.icon, {
              className: "h-6 w-6",
            })}
          </div>

          {/* Arrow */}
          <motion.div
            animate={{
              rotate: isActive ? 90 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-[#F4EFE6]"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-[25px] font-semibold font-serif text-[#F4EFE6]">
          {amenity.title}
        </h3>

        {/* Subtitle */}
        <p className="mt-2 text-md leading-5 text-[#B9B1A5]">
          {amenity.subtitle}
        </p>
      </div>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className="border-t border-[#4C463C] px-5 pb-5 pt-4">

              {amenity.points?.length > 0 && (
                <div className="mt-4 space-y-2.5">
                  {amenity.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2.5 text-sm text-[#F4EFE6]"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C9A65D] text-white">
                        ✓
                      </span>

                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


// ============================================================
// MOBILE ACCORDION
// ============================================================

const MobileAmenityAccordion = ({
  amenity,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
        isActive
          ? "border-[#C9A65D] bg-[#34312B]"
          : "border-[#4C463C] bg-[#2D2B26]"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-3 p-4 text-left"
        aria-expanded={isActive}
      >
        {/* Colorful Icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${amenity.color} text-white`}
        >
          {React.cloneElement(amenity.icon, {
            className: "h-5 w-5",
          })}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-[#F4EFE6]">
            {amenity.title}
          </h3>

          <p className="mt-0.5 text-xs leading-5 text-[#B9B1A5]">
            {amenity.subtitle}
          </p>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{
            rotate: isActive ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-[#C9A65D]"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className="border-t border-[#4C463C] px-4 pb-4 pt-3">

              {amenity.points?.length > 0 && (
                <div className="mt-3 space-y-2">
                  {amenity.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2 text-sm text-[#F4EFE6]"
                    >
                      <span className="text-[#C9A65D]">
                        ✓
                      </span>

                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// ============================================================
// MAIN COMPONENT
// ============================================================

const ProjectAmenities = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const desktopQuery = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    let autoplayId;

    const stopAutoplay = () => {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = undefined;
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (!desktopQuery.matches) return;

      autoplayId = window.setInterval(() => {
        const firstCard = carousel.firstElementChild;
        if (!firstCard) return;

        const cardGap = 20;
        const cardWidth = firstCard.getBoundingClientRect().width + cardGap;
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
  }, []);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;

    const scrollAmount =
      window.innerWidth >= 1024
        ? container.clientWidth * 0.52
        : container.clientWidth * 0.82;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#24231F]
        px-3
        py-5

        sm:px-5
        sm:py-6

        lg:px-6
        lg:py-7
      "
    >
      {/* Subtle background glow */}
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
          bg-[#C9A65D]/[0.045]
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
          bg-[#C9A65D]/[0.035]
          blur-[120px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto max-w-[340px] text-center sm:max-w-3xl">
          <h2
            className="
              font-serif
              text-[1.7rem]
              font-medium
              leading-[1.1]
              tracking-[-0.025em]
               text-[#ca8a04]

              sm:text-[1.95rem]

              lg:text-[2.15rem]

              xl:text-[2.3rem]
            "
          >
            Thoughtful Amenities for a Better Everyday
          </h2>
        </div>

        {/* =====================================================
            CAROUSEL HEADER / CONTROLS
        ====================================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-end

            sm:mt-5

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

                transition-all
                duration-300

                hover:border-[#C9A65D]/50
                hover:bg-[#34312B]

                sm:size-10
              "
            >
              <ChevronLeft
                className="size-4"
                strokeWidth={1.8}
                aria-hidden="true"
              />
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

                transition-all
                duration-300

                hover:border-[#C9A65D]/50
                hover:bg-[#34312B]

                sm:size-10
              "
            >
              <ChevronRight
                className="size-4"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* =====================================================
            CIRCULAR AMENITIES CAROUSEL
        ====================================================== */}

        <div
          ref={carouselRef}
          className="
            mt-2

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
          {amenities.map((amenity, index) => {
            /*
              Preferred:
              amenity.image

              Fallback:
              carouselImages[index]
            */

            const amenityImage =
              amenity.image ||
              carouselImages[index % carouselImages.length]?.src;

            const amenityAlt =
              amenity.imageAlt ||
              carouselImages[index % carouselImages.length]?.alt ||
              amenity.title;

            return (
              <article
                key={amenity.id}
                className="
                  group

                  flex-none
                  snap-start

                  basis-[62%]

                  min-[430px]:basis-[43%]

                  sm:basis-[40%]

                  md:basis-[30%]

                  lg:basis-[calc(25%-18px)]
                "
              >
                <div className="flex flex-col items-center text-center">
                  {/* =============================================
                      CIRCULAR IMAGE
                  ============================================== */}

                  <div
                    className="
                      relative

                      aspect-square

                      w-full
                      max-w-[150px]

                      overflow-hidden

                      rounded-full

                      border
                      border-[#C9A65D]/25

                      bg-[#2D2B26]

                      shadow-[0_14px_35px_rgba(0,0,0,0.18)]

                      transition-transform
                      duration-500

                      group-hover:scale-[1.025]

                      min-[430px]:max-w-[160px]

                      sm:max-w-[195px]

                      md:max-w-[205px]

                      lg:max-w-[220px]

                      xl:max-w-[230px]
                    "
                  >
                    <Image
                      src={amenityImage}
                      alt={amenityAlt}
                      fill
                      loading="lazy"
                      sizes="
                        (max-width: 430px) 150px,
                        (max-width: 640px) 160px,
                        (max-width: 1024px) 205px,
                        230px
                      "
                      className="
                        object-cover

                        transition-transform
                        duration-700
                        ease-out

                        group-hover:scale-[1.06]
                      "
                    />

                    {/* Image shading */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0

                        rounded-full

                        bg-gradient-to-t
                        from-black/20
                        via-transparent
                        to-transparent
                      "
                    />

                    {/* subtle circular ring */}
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

                  {/* =============================================
                      TITLE
                  ============================================== */}

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
                </div>
              </article>
            );
          })}
        </div>

        {/* =====================================================
            MOBILE SWIPE INDICATOR
        ====================================================== */}

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

              sm:text-[#8F897F]
            "
          >
            Swipe to explore
            <ChevronRight
              className="size-3"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectAmenities;
