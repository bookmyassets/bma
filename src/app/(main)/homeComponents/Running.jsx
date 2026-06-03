"use client";

import React, { useEffect, useState } from "react";

const Running = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="w-full overflow-hidden bg-black py-2 relative">
        <div className="whitespace-nowrap text-[#ddbc69] animate-marquee">
          <p className="inline-block text-white bg-[#ddbc69] px-5 py-2 rounded-lg shadow-lg text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.35]">
            Registry Ready Plots in Dholera Starting from ₹8 Lakh
          </p>
        </div>
      </div>
    </>
  );
};

export default Running;
