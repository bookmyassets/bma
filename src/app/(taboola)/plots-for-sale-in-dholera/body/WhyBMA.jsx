import React from "react";

export default function WhyBMA() {
  const stats = [
    "2 Lakh+ Sq. Yards Sold",
    "957+ Plots Sold",
    "561+ Happy Customers",
    "9+ Residential Projects",
  ];
  return (
    <>
      <section className="bg-white py-[clamp(0.75rem,6vw,1rem)]">
        <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2.5rem)]">
          {/* Heading */}
          <div className="flex flex-col items-center text-center mb-[clamp(0.5rem,4vw,1rem)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#deae3c]" />
              <h2 className="text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
                Why Buy With{" "}
                <span className="text-[#deae3c]"> BookMyAssets </span>
              </h2>
              <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#deae3c]" />
            </div>
          </div>

          {/* Body Copy */}
          <div className="gap-[clamp(0.25rem,3vw,2.5rem)] items-start">
            <div className="flex gap-4">
              <div className="shrink-0 mt-1 w-1 rounded-full bg-[#deae3c] self-stretch" />
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] text-gray-600 leading-relaxed">
                Many investors look at Dholera because plotted assets are easier
                to evaluate for long-term holding, family planning, and future
                ownership decisions. For buyers who prefer land-backed options,
                Dholera remains a location of interest due to ongoing
                infrastructure attention and long-term development discussions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="max-w-7xl mx-auto">

        </div>
      </section>
    </>
  );
}
