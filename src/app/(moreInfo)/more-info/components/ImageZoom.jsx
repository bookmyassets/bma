"use client";

import React, { useEffect, useRef } from "react";
import mapD from "@/assests/ad-page/dholera-sir-latest-map-2026-desktop-v2.webp";
import mapM from "@/assests/ad-page/dholera-sir-latest-map-2026-mobile-v2.webp";

export default function ImageZoom() {
  const imgRefMobile = useRef(null);
  const imgRefDesktop = useRef(null);
  const lensRefMobile = useRef(null);
  const lensRefDesktop = useRef(null);

  useEffect(() => {
    const setupZoom = (imgRef, lensRef) => {
      const img = imgRef.current;
      const lens = lensRef.current;

      if (!img || !lens) return;

      const initZoom = () => {
        if (!img.complete || img.naturalWidth === 0) {
          setTimeout(initZoom, 200);
          return;
        }

        const zoomLevel = 2; // 2x zoom - aap isko badha ya kam kar sakte ho

        const moveLens = (e) => {
          e.preventDefault();
          
          const rect = img.getBoundingClientRect();
          const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
          const clientY = e.clientY || e.touches?.[0]?.clientY || 0;
          
          const x = clientX - rect.left;
          const y = clientY - rect.top;

          let lensX = x - (lens.offsetWidth / 2);
          let lensY = y - (lens.offsetHeight / 2);

          // Keep lens within bounds
          if (lensX > rect.width - lens.offsetWidth) lensX = rect.width - lens.offsetWidth;
          if (lensX < 0) lensX = 0;
          if (lensY > rect.height - lens.offsetHeight) lensY = rect.height - lens.offsetHeight;
          if (lensY < 0) lensY = 0;

          // Position lens
          lens.style.left = lensX + 'px';
          lens.style.top = lensY + 'px';
          
          // Set zoomed image as lens background
          lens.style.backgroundImage = `url('${img.src}')`;
          lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
          lens.style.backgroundRepeat = 'no-repeat';
          
          // Calculate background position to show zoomed portion
          const bgX = (lensX + lens.offsetWidth / 2) * zoomLevel - lens.offsetWidth / 2;
          const bgY = (lensY + lens.offsetHeight / 2) * zoomLevel - lens.offsetHeight / 2;
          
          lens.style.backgroundPosition = `-${bgX}px -${bgY}px`;
        };

        const showLens = () => {
          lens.style.display = 'block';
        };

        const hideLens = () => {
          lens.style.display = 'none';
        };

        img.addEventListener('mousemove', moveLens);
        img.addEventListener('touchmove', moveLens);
        img.addEventListener('mouseenter', showLens);
        img.addEventListener('mouseleave', hideLens);
        img.addEventListener('touchstart', showLens);
        img.addEventListener('touchend', hideLens);

        return () => {
          img.removeEventListener('mousemove', moveLens);
          img.removeEventListener('touchmove', moveLens);
          img.removeEventListener('mouseenter', showLens);
          img.removeEventListener('mouseleave', hideLens);
          img.removeEventListener('touchstart', showLens);
          img.removeEventListener('touchend', hideLens);
        };
      };

      return initZoom();
    };

    const cleanupMobile = setupZoom(imgRefMobile, lensRefMobile);
    const cleanupDesktop = setupZoom(imgRefDesktop, lensRefDesktop);

    return () => {
      if (typeof cleanupMobile === 'function') cleanupMobile();
      if (typeof cleanupDesktop === 'function') cleanupDesktop();
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .img-zoom-container {
          position: relative;
          display: inline-block;
        }
        
        .img-zoom-lens {
          position: absolute;
          border: 3px solid #fff;
          box-shadow: 0 0 15px rgba(0,0,0,0.5);
          width: 250px;
          height: 250px;
          cursor: none;
          pointer-events: none;
          display: none;
          z-index: 100;
          border-radius: 50%;
          overflow: hidden;
        }
      `}</style>

      <div>
        {/* Mobile View */}
        <div className="md:hidden p-4 flex flex-col items-center gap-4">
          <div className="img-zoom-container">
            <img
              ref={imgRefMobile}
              src={mapM.src}
              alt="Map"
              className="rounded-2xl"
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
            />
            <div ref={lensRefMobile} className="img-zoom-lens"></div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="max-sm:hidden p-4 flex justify-center items-start gap-4">
          <div className="img-zoom-container">
            <img
              ref={imgRefDesktop}
              src={mapD.src}
              alt="Map"
              className="rounded-2xl"
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
            />
            <div ref={lensRefDesktop} className="img-zoom-lens"></div>
          </div>
        </div>
      </div>
    </>
  );
}