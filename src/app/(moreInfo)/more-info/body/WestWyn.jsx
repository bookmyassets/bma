import React, { useEffect, useMemo, useRef, useState } from "react";

export default function WestWyn() {
  const wrapRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  const sections = useMemo(
    () => [
      {
        title: "About WestWyn Estate",
        content:
          "WestWyn Estate redefines luxury living with contemporary architecture and world-class design. Nestled in a prime location, it offers spacious residences crafted for comfort and elegance. Experience a lifestyle where sophistication meets serenity in every corner.",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      },
      {
        title: "Amenities",
        content:
          "Indulge in premium amenities including a state-of-the-art fitness center, infinity pool, and landscaped gardens. Enjoy clubhouse facilities, children's play area, and 24/7 security. Every feature is designed to elevate your living experience to extraordinary heights.",
        image:
          "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
      },
      {
        title: "Location Advantage",
        content:
          "Strategically positioned with excellent connectivity to business hubs, schools, and hospitals. Quick access to major highways and metro stations ensures seamless commuting. Surrounded by retail centers and entertainment options, everything you need is within reach.",
        image:
          "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80",
      },
    ],
    []
  );

  useEffect(() => {
    let rafId = 0;

    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

    const updateFromScroll = () => {
      if (!wrapRef.current) return;

      const rect = wrapRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // progress: 0 when wrapper top hits top of viewport, 1 after 1 screen, etc
      const progress = -rect.top / vh;

      // Use rounding so each "screen" feels like a step, but still works with fast scroll
      const nextIndex = clamp(Math.round(progress), 0, sections.length - 1);

      setActiveSection((prev) => (prev === nextIndex ? prev : nextIndex));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateFromScroll);
    };

    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateFromScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // initial sync
    updateFromScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [sections.length]);

  const scrollToSection = (index) => {
    if (!wrapRef.current) return;

    const vh = window.innerHeight || 1;
    const top =
      window.scrollY + wrapRef.current.getBoundingClientRect().top + index * vh;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="w-full">
      {/* This wrapper creates the scrollable "timeline" */}
      <section
        ref={wrapRef}
        className="relative bg-gray-100"
        style={{ height: `${sections.length * 100}vh` }}
      >
        {/* This stays pinned while wrapper scrolls */}
        <div className="sticky top-0 min-h-screen flex items-center py-16 px-4">
          <div className="max-w-7xl mx-auto w-full">
            {/* Tabs */}
            <div className="flex justify-center gap-2 mb-12 flex-wrap">
              {sections.map((section, index) => (
                <button
                  key={section.title}
                  onClick={() => scrollToSection(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeSection === index
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/50 scale-105"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="order-2 md:order-1">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
                  <img
                    src={sections[activeSection].image}
                    alt={sections[activeSection].title}
                    className="w-full h-full object-cover transition-all duration-700"
                    key={activeSection}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>

              {/* Text */}
              <div className="order-1 md:order-2">
                <div className="min-h-[300px] flex flex-col justify-center px-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight transition-all duration-500">
                    {sections[activeSection].title}
                  </h2>
                  <p className="text-lg leading-relaxed transition-all duration-500">
                    {sections[activeSection].content}
                  </p>

                  {/* Progress */}
                  <div className="mt-8 flex items-center gap-2">
                    {sections.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === activeSection
                            ? "w-12 bg-amber-500"
                            : "w-6 bg-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
