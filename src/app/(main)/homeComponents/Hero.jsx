import React from "react";

export default function Hero() {
  return (
    <>
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="object-cover inset-0 w-full h-full z-0 max-sm:hidden"
        >
          <source src="/video/bma-homepage-video-2.mp4" type="video/mp4" />
        </video>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="object-cover inset-0 w-full h-full z-0 md:hidden"
        >
          <source src="/video/bma-home-portrait-video.webm" type="video/mp4" />
        </video>
      </div>
      
      {/* White gradient overlay at bottom */}
      <div 
        className="absolute inset-x-0 bottom-0 h-1/5 z-20"
        style={{
          background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          opacity: 1
        }}
      ></div>
      
      <div className="relative flex items-center justify-center h-screen"></div>
    </>
  );
}