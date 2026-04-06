import React from "react";

export default function WhyDholera() {
  return (
    <section className="bg-white py-[clamp(0.75rem,6vw,1rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2.5rem)]">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-[clamp(0.5rem,4vw,1rem)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#deae3c]" />
            <h2 className="text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
              Why Long-Term Investors Are {" "}
              <span className="text-[#deae3c]">Watching Dholera</span>
            </h2>
            <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#deae3c]" />
          </div>
        </div>

        {/* Body Copy */}
        <div className="grid md:grid-cols-2 gap-[clamp(0.25rem,3vw,2.5rem)] items-start">
          <div className="flex gap-4">
            <div className="shrink-0 mt-1 w-1 rounded-full bg-[#deae3c] self-stretch" />
            <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] text-gray-600 leading-relaxed">
              Dholera is one of the most discussed infrastructure-led locations
              for land buyers who think beyond short-term speculation. For many
              investors, the interest in Dholera investment is not only about
              current pricing - it is about entering a planned region early,
              understanding the location properly, and holding a real asset with
              patience.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 mt-1 w-1 rounded-full bg-[#deae3c] self-stretch" />
            <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] text-gray-600 leading-relaxed">
              At BookMyAssets, we help buyers explore govt approved plots in
              Dholera with practical guidance on legal clarity, project
              location, and long-term suitability - especially for buyers
              looking at Dholera residential plots as a future family asset
              instead of a rushed short-term trade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
