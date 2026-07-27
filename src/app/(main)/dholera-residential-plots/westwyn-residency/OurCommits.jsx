import React from "react";

export default function () {
  const items = [
    "NA/NOC/Title Clear",
    "Plan Pass Approved",
    "Registry Ready",
    "ReSale Support",
    "Rental Support",
    "Site Visit Assistance",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-4 md:space-y-8 h-full p-4">
        <div
          id="counters-section"
          className="bg-black/90 rounded-2xl overflow-hidden shadow-lg h-full"
        >
          <p className="text-white text-center text-[32px] py-4 font-semibold">
            Our Commitments
          </p>

          <div className="p-4 md:p-8">
            <div className="flex flex-wrap justify-center gap-4">
              {items.map((value, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-center p-6 bg-white/15 rounded-xl min-h-[100px]
                             w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.7rem)]"
                >
                  <div className="text-xl lg:text-2xl font-bold text-[#ddbc69] leading-tight">
                    {value}
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