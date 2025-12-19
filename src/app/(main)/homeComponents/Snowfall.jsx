"use client";
import { useEffect, useState } from 'react';

const Snowfall = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true); // Add visibility state

  useEffect(() => {
    setMounted(true);
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted || !visible) return null; // Check visibility

  // Reduce snowflakes on mobile for better performance
  const snowflakeCount = isMobile ? 20 : 50;

  const snowflakes = Array.from({ length: snowflakeCount }, (_, i) => {
    const left = Math.random() * 100;
    const animationDuration = 10 + Math.random() * 15; // Slightly faster
    const opacity = 0.3 + Math.random() * 0.5;
    const size = isMobile ? 4 + Math.random() * 3 : 5 + Math.random() * 5;
    const delay = -(Math.random() * 20);
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${left}%`,
          top: '-10px',
          color: 'white',
          fontSize: `${size}px`,
          opacity: opacity,
          animation: `fall ${animationDuration}s linear ${delay}s infinite`,
          userSelect: 'none',
          pointerEvents: 'none',
          willChange: 'transform', // Optimize for GPU acceleration
        }}
      >
        ❄
      </div>
    );
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fall {
            0% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            100% {
              transform: translate3d(0, 100vh, 0) rotate(360deg);
            }
          }
        `
      }} />
      
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        {snowflakes}
      </div>
    </>
  );
};

export default Snowfall;