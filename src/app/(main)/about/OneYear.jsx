"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Trophy,
  TrendingUp,
  Building,
  Building2,
  PartyPopper,
  Award,
  Rocket,
  Users,
  ShieldCheck,
  Zap,
} from "lucide-react";

import img1 from "@/assests/about/charan-meeting.webp";
import img2 from "@/assests/about/full-house-meeting.webp";
import img3 from "@/assests/about/full-house.webp";
import img4 from "@/assests/about/meeting.webp";
import img5 from "@/assests/about/training-back.webp";
import img6 from "@/assests/about/training-front.webp";
import img7 from "@/assests/samarth-gupta-cofounder-bookmyassets-dholera.webp";
import img8 from "@/assests/jivjot-singh-cofounder-bookmyassets-dholera.webp";

const slides = [
  { image: img1, alt: "BookMyAssets team meeting" },
  { image: img2, alt: "BookMyAssets team gathered for a meeting" },
  { image: img3, alt: "The BookMyAssets team together" },
  { image: img4, alt: "A discussion with the BookMyAssets team" },
  { image: img5, alt: "BookMyAssets team training session" },
  { image: img6, alt: "The team learning and growing together" },
];

const timelineMilestones = [
  {
    date: "13 Dec 2024",
    event: "Started with 5 people as Channel Partners",
    icon: Users,
    position: "top",
  },
  {
    date: "27 Dec 2024",
    event: "First Sale",
    icon: Trophy,
    position: "bottom",
  },
  {
    date: "10 Jan 2025",
    event: "1st Viral Reel - 400 queries/day",
    icon: TrendingUp,
    position: "top",
  },
  {
    date: "May 2025",
    event: "1st In-house Project Launch: Westwyn County",
    icon: Building,
    position: "bottom",
  },
  {
    date: "Sep 2025",
    event: "2nd Project Launch: Westwyn Estate",
    icon: Building2,
    position: "top",
  },
  {
    date: "Nov 2025",
    event: "1st Event: Chandigarh - Record Breaking Sales",
    icon: PartyPopper,
    position: "bottom",
  },
  {
    date: "13 Dec 2025",
    event: "23+ members | Both Projects 50%+ Sold Out",
    icon: Award,
    position: "top",
  },
  {
    date: "May 2026",
    event: "Launch: BMA Constructions",
    icon: Rocket,
    position: "bottom",
  },
];

const beliefs = [
  {
    number: "01",
    icon: Users,
    title: "People Over Everything",
    description:
      "You can't scale dreams without the right people dreaming with you.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Trust Is Earned Daily",
    description: "Every call. Every promise. Every transparent deal.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Speed Meets Wisdom",
    description: "Lightning-fast execution. Patient where it counts.",
  },
];

const founders = [
  {
    name: "Sam Gupta",
    title: "Chairman",
    tag: "Finance & Legal",
    image: img7,
    expandable: true,
    introduction:
      "Sam Gupta brings over 15 years of US digital venture leadership and cross-border investment experience to BMA, guiding its corporate governance, financial stewardship, and expansion strategy.",
    bio: (
      <div className="space-y-4">
        <p>
          A serial entrepreneur and cross-border investor, Sam Gupta brings over
          15 years of high-stakes US digital venture leadership, engineering
          precision (B.Tech), and strategic business mastery (MBA) to India’s
          real estate ecosystem. Returning to the domestic market after more
          than a decade in the United States, he leverages an international
          perspective to revolutionize institutional-grade land acquisition,
          capital security, and large-scale asset development—most notably
          across the mega-landscape of Dholera SIR.
        </p>

        <p>
          As Chairman, Mr. Gupta serves as the ultimate anchor of BMA’s corporate
          governance, financial stewardship, and macro-expansion strategy. He
          specializes in bridging the gap between raw land banking and secure,
          high-yield investment realities. By pairing predictive market
          intelligence with bulletproof legal, financial, and regulatory
          frameworks, he ensures that complex, large-scale acquisitions are
          executed with absolute transparency and uncompromising capital
          protection.
        </p>

        <p>
          Steering multiple high-growth enterprises globally, Mr. Gupta acts as
          the organization&apos;s economic compass. His disciplined approach to
          venture building and capital allocation calibrates ambitious land
          development with institutional prudence—reinforcing global investor
          confidence, elevating industry benchmarks, and actively shaping the
          future of real estate.
        </p>
      </div>
    ),
  },
  {
    name: "Jivjot Singh",
    title: "Co-Founder & CEO",
    tag: "Vision & Leadership",
    image: img8,
    expandable: false,
    introduction: (
      <>
        A dynamic leader focused on{" "}
        <strong className="font-medium text-[#e8e2d6]">
          trust, teamwork, and customer experience.
        </strong>{" "}
        His mission is to make investing in Dholera simple, transparent, and
        reliable for every client.
      </>
    ),
  },
];

const focusClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69]";

export default function BookMyAssets() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [expandedFounder, setExpandedFounder] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasCarouselFocus, setHasCarouselFocus] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (
      isPaused ||
      isHovered ||
      hasCarouselFocus ||
      prefersReducedMotion
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [
    isPaused,
    isHovered,
    hasCarouselFocus,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    const timelineSection = document.getElementById("timeline-section");
    if (!timelineSection) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTimelineVisible(true);
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(timelineSection);

    return () => observer.disconnect();
  }, []);

  const changeSlide = (direction) => {
    setIsPaused(true);
    setCurrentSlide(
      (previous) => (previous + direction + slides.length) % slides.length,
    );
  };

  const selectSlide = (index) => {
    setIsPaused(true);
    setCurrentSlide(index);
  };

  const autoplayEnabled = !isPaused && !prefersReducedMotion;

  return (
    <>
      {/* FOUNDERS */}
      <section
        aria-labelledby="bma-founders-heading"
        className="relative overflow-hidden bg-[#0c0c0b] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(221,188,105,0.07),transparent_65%)]"
        />

        <div className="relative mx-auto max-w-[960px]">
          <header className="mb-9 text-center md:mb-12">
            <p className="mb-4 flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#ddbc69] sm:text-xs">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#ddbc69]/40 sm:w-10"
              />
              The Visionaries Behind BMA
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#ddbc69]/40 sm:w-10"
              />
            </p>

            <h2
              id="bma-founders-heading"
              className="font-playfair-display text-[36px] font-normal leading-[1.1] tracking-[-0.035em] text-[#ddbc69] sm:text-[44px] lg:text-[54px]"
            >
              Meet Our Founders
            </h2>
          </header>

          <div className="mx-auto grid max-w-[460px] auto-rows-fr grid-cols-1 items-stretch gap-8 md:max-w-none md:grid-cols-2 md:gap-8 lg:gap-10">
            {founders.map((founder, index) => {
              const isExpanded = expandedFounder === index;
              const profileId = `bma-founder-profile-${index}`;
              const nameId = `bma-founder-name-${index}`;

              return (
                <article
                  key={founder.name}
                  aria-labelledby={nameId}
                  className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-[#ddbc69]/30 bg-gradient-to-b from-[#171714] to-[#0f0f0d] p-2.5 shadow-[0_14px_36px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-white/[0.06] transition-colors duration-300 hover:border-[#ddbc69]/65 motion-reduce:transition-none sm:p-3"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#f0d996] to-transparent"
                  />

                  <div className="relative aspect-[4/5] overflow-hidden rounded-[15px] border border-[#ddbc69]/15 bg-gradient-to-br from-[#26231b] via-[#171715] to-[#101010]">
                    <Image
                      src={founder.image}
                      alt={`${founder.name}, ${founder.title}`}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1159px) 46vw, 508px"
                      className="object-contain object-center transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
                    />

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0c0c0b]/70 to-transparent"
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="h-px w-full bg-gradient-to-r from-[#ddbc69]/80 via-[#ddbc69]/30 to-transparent"
                  />

                  <div className="flex flex-1 flex-col px-2 pb-2 pt-4 sm:px-3 sm:pb-3 sm:pt-5">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                      <div>
                        <h3
                          id={nameId}
                          className="font-playfair-display text-[26px] font-normal leading-[1.15] tracking-[-0.025em] text-[#f5f1e8] lg:text-[30px]"
                        >
                          {founder.name}
                        </h3>

                        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#ddbc69] sm:text-xs">
                          {founder.title}
                        </p>
                      </div>

                      <span className="mt-1 rounded-full border border-[#ddbc69]/20 bg-[#ddbc69]/[0.04] px-3 py-1.5 text-xs tracking-[0.025em] text-[#d5c7a4] lg:text-sm">
                        {founder.tag}
                      </span>
                    </div>

                    <div className="mt-4 text-[14px] leading-[1.75] text-[#bcbab3] sm:text-[15px]">
                      {founder.introduction}
                    </div>

                    {founder.expandable && (
                      <>
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={profileId}
                          onClick={() =>
                            setExpandedFounder((current) =>
                              current === index ? null : index,
                            )
                          }
                          className={`mt-auto inline-flex min-h-11 items-center gap-2 rounded-sm pt-5 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#ddbc69] transition-colors hover:text-[#f0d996] motion-reduce:transition-none ${focusClass}`}
                        >
                          {isExpanded
                            ? "Close full profile"
                            : "Read full profile"}

                          {isExpanded ? (
                            <ChevronUp
                              aria-hidden="true"
                              size={16}
                              strokeWidth={1.7}
                            />
                          ) : (
                            <ChevronDown
                              aria-hidden="true"
                              size={16}
                              strokeWidth={1.7}
                            />
                          )}
                        </button>

                        <div
                          id={profileId}
                          hidden={!isExpanded}
                          className="mt-4 border-t border-white/10 pt-5 text-sm leading-[1.85] text-[#bcbab3] sm:text-[15px]"
                        >
                          {founder.bio}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ANNIVERSARY */}
      <div className="bg-[#faf9f6]">
        <header className="border-t border-[#ddbc69]/15 bg-black px-5 py-10 text-center sm:py-12">
          <h1 className="font-playfair-display text-4xl font-normal tracking-[-0.035em] text-[#ddbc69] md:text-5xl">
            BookMyAssets
          </h1>

          <p className="mt-4 font-playfair-display text-lg text-[#eee7da] md:text-2xl">
            One Year. One Vision. One Unstoppable Team.
          </p>
        </header>

        {/* Initial horizontal timeline */}
        <div
          className="overflow-hidden bg-gradient-to-b from-gray-50 to-white py-4"
          id="timeline-section"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2
              className="mb-8 text-center text-3xl font-bold md:text-4xl"
              style={{ color: "#ddbc69" }}
            >
              365 Days That Changed Everything
            </h2>

            <div className="hidden md:block">
              <div className="relative mx-auto max-w-6xl py-16">
                <div
                  className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2"
                  style={{ backgroundColor: "#e5e7eb" }}
                />

                <div
                  className={`absolute left-0 top-1/2 h-1 -translate-y-1/2 ${
                    timelineVisible ? "timeline-progress" : ""
                  }`}
                  style={{
                    backgroundColor: "#ddbc69",
                    boxShadow: "0 0 20px rgba(222, 174, 76, 0.5)",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  {timelineMilestones.map((milestone, index) => {
                    const Icon = milestone.icon;

                    return (
                      <div
                        key={milestone.date}
                        className={`timeline-item group relative flex flex-1 flex-col items-center ${
                          milestone.position === "top" ? "flex-col-reverse" : ""
                        }`}
                        style={{
                          animationDelay: `${index * 0.15}s`,
                          maxWidth: "120px",
                        }}
                      >
                        <div
                          className="mx-auto h-16 w-0.5"
                          style={{ backgroundColor: "#ddbc69" }}
                        />

                        <div
                          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: "#ddbc69" }}
                        >
                          <Icon
                            className="h-7 w-7 text-white"
                            strokeWidth={2.5}
                          />
                          <div
                            className="absolute inset-0 animate-ping rounded-full opacity-50"
                            style={{
                              backgroundColor: "#ddbc69",
                              animationDuration: "2s",
                              animationDelay: `${index * 0.3}s`,
                            }}
                          />
                        </div>

                        <div
                          className="mx-auto h-16 w-0.5"
                          style={{ backgroundColor: "#ddbc69" }}
                        />

                        <div
                          className="flex h-32 w-32 transform flex-col justify-center rounded-lg border-2 bg-white p-4 shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl"
                          style={{ borderColor: "#ddbc69" }}
                        >
                          <p
                            className="mb-2 text-center text-xs font-bold"
                            style={{ color: "#ddbc69" }}
                          >
                            {milestone.date}
                          </p>
                          <p className="text-center text-xs font-semibold leading-tight text-gray-700">
                            {milestone.event}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="hide-scrollbar overflow-x-auto pb-4 md:hidden">
              <div className="relative inline-flex min-w-max gap-6 px-4 py-8">
                <div
                  className="absolute left-0 right-0 top-20 h-1"
                  style={{ backgroundColor: "#ddbc69" }}
                />

                {timelineMilestones.map((milestone, index) => {
                  const Icon = milestone.icon;

                  return (
                    <div
                      key={milestone.date}
                      className="timeline-item group relative flex flex-col items-center"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div
                        className="mx-auto h-8 w-0.5"
                        style={{ backgroundColor: "#ddbc69" }}
                      />

                      <div
                        className="relative z-10 mb-3 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: "#ddbc69" }}
                      >
                        <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                      </div>

                      <div
                        className="mx-auto h-8 w-0.5"
                        style={{ backgroundColor: "#ddbc69" }}
                      />

                      <div
                        className="flex h-28 w-28 flex-col justify-center rounded-lg border-2 bg-white p-3 shadow-md"
                        style={{ borderColor: "#ddbc69" }}
                      >
                        <p
                          className="mb-1 text-center text-xs font-bold"
                          style={{ color: "#ddbc69" }}
                        >
                          {milestone.date}
                        </p>
                        <p className="text-center text-xs font-semibold leading-tight text-gray-700">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* OUR STORY */}
        <section
          aria-labelledby="bma-story-heading"
          className="relative overflow-hidden bg-[#10100f] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(221,188,105,0.08),transparent_60%)]"
          />

          <div className="relative mx-auto max-w-[1180px]">
            {/* Story and carousel */}
            <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
              <div className="min-w-0">
                <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#ddbc69] sm:text-xs">
                  <span
                    aria-hidden="true"
                    className="h-px w-9 bg-[#ddbc69]/60"
                  />
                  Our First Chapter
                </p>

                <h2
                  id="bma-story-heading"
                  className="font-playfair-display text-[42px] font-normal leading-[1.06] tracking-[-0.04em] text-[#ddbc69] sm:text-[52px] lg:text-[60px]"
                >
                  The Beginning
                </h2>

                <p className="mt-5 max-w-lg font-playfair-display text-[23px] leading-[1.4] text-[#f2eee5] sm:text-[27px]">
                  Five people. One small cabin.
                  <br />
                  A belief bigger than both.
                </p>

                <div className="mt-7 space-y-5 text-[15px] leading-[1.85] text-[#bcbab3] sm:text-base">
                  <p>
                    <strong className="font-medium text-[#f2eee5]">
                      On 13th December 2024,
                    </strong>{" "}
                    five people started with one small cabin. We had no fancy
                    office, no big investors, just raw hunger and an unshakable
                    belief that we could build something extraordinary in real
                    estate. Most people called it crazy. We called it destiny.
                  </p>

                  <p>
                    The odds were stacked against us, but we did not wait for
                    permission. Our first sale came just{" "}
                    <strong className="font-medium text-[#f2eee5]">
                      14 days later.
                    </strong>{" "}
                    Then one viral reel brought 400 queries per day. We did not
                    just handle it; we turned that momentum into our first
                    developer project,{" "}
                    <strong className="font-medium text-[#f2eee5]">
                      WestWyn County.
                    </strong>{" "}
                    While others were planning, we were building.
                  </p>

                  <p>
                    <strong className="font-medium text-[#f2eee5]">
                      By the end of our first year:
                    </strong>{" "}
                    a passionate team of 23, multiple thriving projects, and
                    families who trust us with their future.
                  </p>
                </div>

              </div>

              {/* Visible on desktop and mobile */}
              <div className="min-w-0 lg:max-w-lg lg:justify-self-end lg:pt-3">
                <div
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="BookMyAssets team photographs"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onFocusCapture={() => setHasCarouselFocus(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setHasCarouselFocus(false);
                    }
                  }}
                  className="overflow-hidden rounded-[22px] border border-[#ddbc69]/20 bg-[#191916] sm:rounded-[26px]"
                >
                  <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5]">
                    {slides.map((slide, index) => (
                      <div
                        key={slide.alt}
                        aria-hidden={currentSlide !== index}
                        className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
                          currentSlide === index
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          fill
                          sizes="(max-width: 1023px) 100vw, 550px"
                          className="object-cover"
                        />
                      </div>
                    ))}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"
                    />

                    <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f4eee0] backdrop-blur-md sm:left-6 sm:top-6">
                      Behind the journey
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#ddbc69]">
                        The people behind BMA
                      </p>
                      <p className="max-w-sm font-playfair-display text-[26px] leading-[1.2] text-white sm:text-[32px]">
                        Built together.
                        <br />
                        Growing together.
                      </p>
                    </div>
                  </div>

                  {/* Carousel controls */}
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-white/10 px-3 py-2 sm:px-5 sm:py-3">
                    <div className="flex items-center gap-1">
                      {slides.map((slide, index) => (
                        <button
                          key={slide.alt}
                          type="button"
                          aria-label={`Show team photograph ${index + 1}`}
                          aria-current={
                            currentSlide === index ? "true" : undefined
                          }
                          onClick={() => selectSlide(index)}
                          className={`flex min-h-11 min-w-6 items-center justify-center rounded-sm sm:min-w-7 ${focusClass}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${
                              currentSlide === index
                                ? "w-5 bg-[#ddbc69]"
                                : "w-1.5 bg-white/30"
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <span
                        aria-live="off"
                        className="mr-2 text-xs tabular-nums text-[#bcbab3]"
                      >
                        {String(currentSlide + 1).padStart(2, "0")}
                        <span className="mx-1 text-white/25">/</span>
                        {String(slides.length).padStart(2, "0")}
                      </span>

                      <button
                        type="button"
                        aria-label="Previous team photograph"
                        onClick={() => changeSlide(-1)}
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-[#eee7da] transition-colors hover:bg-white/10 ${focusClass}`}
                      >
                        <ChevronLeft size={19} aria-hidden="true" />
                      </button>

                      {!prefersReducedMotion && (
                        <button
                          type="button"
                          aria-label={
                            autoplayEnabled
                              ? "Pause slideshow"
                              : "Resume slideshow"
                          }
                          onClick={() => setIsPaused((previous) => !previous)}
                          className={`flex h-11 w-11 items-center justify-center rounded-full text-[#ddbc69] transition-colors hover:bg-white/10 ${focusClass}`}
                        >
                          {autoplayEnabled ? (
                            <Pause size={16} aria-hidden="true" />
                          ) : (
                            <Play size={16} aria-hidden="true" />
                          )}
                        </button>
                      )}

                      <button
                        type="button"
                        aria-label="Next team photograph"
                        onClick={() => changeSlide(1)}
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-[#eee7da] transition-colors hover:bg-white/10 ${focusClass}`}
                      >
                        <ChevronRight size={19} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
