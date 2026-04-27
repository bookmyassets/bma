import React from "react";

const blocks = [
  {
    number: "01",
    title: "Airport-linked future relevance",
    body: "Planned airport-led growth often attracts long-term investor attention because better regional connectivity can strengthen location interest over time.",
    icon: "✈",
  },
  {
    number: "02",
    title: "Connectivity development",
    body: "Road and expressway connectivity can play an important role in how investors evaluate land opportunities in emerging areas.",
    icon: "🛣",
  },
  {
    number: "03",
    title: "Industrial ecosystem attention",
    body: "Dholera continues to be discussed in the context of broader industrial and infrastructure development, which adds to long-term investor interest.",
    icon: "🏭",
  },
  {
    number: "04",
    title: "Land as a family asset",
    body: "For many buyers, plotted land is not only an investment decision. It is also part of family asset planning and long-term holding strategy.",
    icon: "🏡",
  },
];

export default function WhyNCRInvestors() {
  return (
    <section
      className="w-full py-8 px-4 md:px-10 lg:px-20"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div className="max-w-7xl mx-auto space-y-4">

        {/* ── Header ── */}
        <div className="space-y-4 max-w-3xl">
          <h2
            className="text-2xl md:text-3xl font-bold leading-snug"
            style={{ color: "#deae3c" }}
          >
            Why NCR investors are evaluating Dholera now
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            Dholera is being closely watched by long-term investors because of
            its infrastructure-led development potential, planned connectivity,
            and wider regional importance. For many buyers, this is not about
            short-term movement. It is about entering a location early and
            holding land with patience.
          </p>
        </div>

        {/* ── 4 Blocks ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {blocks.map((block) => (
            <div
              key={block.number}
              className="rounded-2xl p-2 md:p-4 flex flex-col gap-4 group transition-all duration-300"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border =
                  "1px solid rgba(222,174,60,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border =
                  "1px solid rgba(255,255,255,0.07)";
              }}
            >
              {/* Top row: number + icon */}
              <div className="flex items-center justify-between">
                <span
                  className=" md:text-lg  font-bold tracking-widest"
                  style={{ color: "#deae3c" }}
                >
                  {block.number}
                </span>
                <span
                  className="text-xl w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(222,174,60,0.1)",
                    fontSize: "32px",
                  }}
                >
                  {block.icon}
                </span>
              </div>

              {/* Divider */}
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "#deae3c", opacity: 0.4 }}
              />

              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                {block.title}
              </h3>

              {/* Body */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}