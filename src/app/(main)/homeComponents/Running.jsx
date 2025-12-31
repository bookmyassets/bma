'use client';

import React, { useEffect, useState } from "react";
import './marquee.css';

const Running = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="scrolling-container" role="marquee" aria-label="Promotional banner">
      <div 
        className={`scrolling-text ${animate ? 'animated' : ''}`}
        aria-live="off"
      >
        <h2>Registry Ready Plots in Dholera Under ₹10 Lakh</h2>
      </div>
    </div>
  );
};

export default Running;