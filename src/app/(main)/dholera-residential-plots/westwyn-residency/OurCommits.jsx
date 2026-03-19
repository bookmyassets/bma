import React from "react";

export default function () {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-4 md:space-y-8 h-full p-4">
        <div
          id="counters-section"
          className="bg-black rounded-2xl overflow-hidden shadow-lg h-full"
        >
        <p className="text-white text-center text-[32px] py-4 font-semibold">Our Commitments</p>

          <div className="p-4 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { value: <>7.83 Acres</>, label: "Total Land Parcel" },
                { value: <>231</>, label: "Total Units" },
                {
                  value: (
                    <>
                      151-198{" "}
                      <span className="text-base font-semibold">sq. yd</span>
                    </>
                  ),
                  label: "Plot Sizes",
                },
                { value: <>₹ 10 Lakh</>, label: "Starting Price" },
                { value: <>Min 300%</>, label: "Returns In 5 years" },
              ].map(({ value, label }, i) => (
                <div
                  key={i}
                  className={`flex flex-col w-auto items-center justify-center text-center p-6 bg-white/5 rounded-xl min-h-[100px]
      ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                >
                  <div className="text-xl md:text-2xl font-bold text-[#deae3c] leading-tight mb-2 whitespace-nowrap">
                    {value}
                  </div>
                  <div className="text-gray-300 text-sm whitespace-nowrap">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
