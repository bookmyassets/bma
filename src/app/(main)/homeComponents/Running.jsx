'use client';

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
  <div className="whitespace-nowrap text-[#deae3c] animate-marquee">
    <h2 className="inline-block text-white bg-[#deae3c] px-5 py-2 rounded-lg shadow-lg text-[20px] font-semibold">
      Registry Ready Plots in Dholera Under ₹10 Lakh
    </h2>
  </div>
</div>

        </>
  );
};

export default Running;