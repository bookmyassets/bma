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
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const setupZoom = (imgRef, lensRef, srcUrl) => {
      const img = imgRef.current;
      const lens = lensRef.current;

      if (!img || !lens) return;

      const zoomLevel = 2;

      // Cache lens dimensions once (set via CSS)
      const lensW = lens.offsetWidth;
      const lensH = lens.offsetHeight;

      // Pre-set background so it's ready on first hover/touch
      lens.style.backgroundImage = `url('${srcUrl}')`;
      lens.style.backgroundRepeat = "no-repeat";

      const moveLens = (e) => {
        e.preventDefault();

        const rect = img.getBoundingClientRect();
        const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

        // Finger/cursor position relative to image
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // --- BACKGROUND POSITION ---
        // This must be clamped to image bounds so the zoomed content is always valid
        const bgSrcX = Math.max(0, Math.min(x, rect.width));
        const bgSrcY = Math.max(0, Math.min(y, rect.height));

        // --- LENS VISUAL POSITION ---
        // On mobile: show lens ABOVE the finger so thumb doesn't block it
        // On desktop: center lens on cursor
        let lensX, lensY;

        if (isMobile) {
          // Place lens above finger with a small gap
          const offset = 20; // gap between finger and lens bottom
          lensX = x - lensW / 2;
          lensY = y - lensH - offset;

          // If lens would go above the image top, flip it below the finger instead
          if (lensY < 0) {
            lensY = y + offset;
          }

          // Allow lens to go slightly outside horizontally — clamp only to prevent full overflow
          lensX = Math.max(-lensW / 4, Math.min(lensX, rect.width - lensW * 0.75));
        } else {
          // Desktop: center on cursor, clamp within image
          lensX = Math.max(0, Math.min(x - lensW / 2, rect.width - lensW));
          lensY = Math.max(0, Math.min(y - lensH / 2, rect.height - lensH));
        }

        lens.style.left = `${lensX}px`;
        lens.style.top = `${lensY}px`;
        lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;

        // Background position based on actual finger position, not lens position
        const bgX = bgSrcX * zoomLevel - lensW / 2;
        const bgY = bgSrcY * zoomLevel - lensH / 2;
        lens.style.backgroundPosition = `-${bgX}px -${bgY}px`;
      };

      const showLens = (e) => {
        e.preventDefault();
        lens.style.display = "block";
      };

      const hideLens = () => {
        lens.style.display = "none";
      };

      const attach = () => {
        img.addEventListener("mousemove", moveLens);
        img.addEventListener("touchmove", moveLens, { passive: false });
        img.addEventListener("mouseenter", showLens);
        img.addEventListener("mouseleave", hideLens);
        img.addEventListener("touchstart", showLens, { passive: false });
        img.addEventListener("touchend", hideLens);
      };

      const detach = () => {
        img.removeEventListener("mousemove", moveLens);
        img.removeEventListener("touchmove", moveLens);
        img.removeEventListener("mouseenter", showLens);
        img.removeEventListener("mouseleave", hideLens);
        img.removeEventListener("touchstart", showLens);
        img.removeEventListener("touchend", hideLens);
      };

      if (img.complete && img.naturalWidth > 0) {
        attach();
        return detach;
      } else {
        const onLoad = () => attach();
        img.addEventListener("load", onLoad, { once: true });
        return () => {
          img.removeEventListener("load", onLoad);
          detach();
        };
      }
    };

    const cleanupMobile = setupZoom(imgRefMobile, lensRefMobile, mapM.src);
    const cleanupDesktop = setupZoom(imgRefDesktop, lensRefDesktop, mapD.src);

    return () => {
      cleanupMobile?.();
      cleanupDesktop?.();
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .img-zoom-container {
          position: relative;
          display: inline-block;
          touch-action: none;
          /* Allow lens to visually overflow image edges */
          overflow: visible;
        }

        .img-zoom-lens {
          position: absolute;
          border: 3px solid #fff;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          /* Desktop size */
          width: 250px;
          height: 250px;
          cursor: none;
          pointer-events: none;
          display: none;
          z-index: 100;
          border-radius: 0%;
          overflow: hidden;
          will-change: left, top, background-position;
        }

        /* Smaller lens on mobile so it doesn't block the image */
        @media (max-width: 768px) {
          .img-zoom-lens {
            width: 160px;
            height: 160px;
          }
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
              style={{ display: "block", maxWidth: "100%", height: "auto", touchAction: "none" }}
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
              style={{ display: "block", maxWidth: "100%", height: "auto" }}
            />
            <div ref={lensRefDesktop} className="img-zoom-lens"></div>
          </div>
        </div>
      </div>
    </>
  );
}