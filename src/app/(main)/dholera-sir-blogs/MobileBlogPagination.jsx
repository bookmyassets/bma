"use client";

import React, { Children, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const POSTS_PER_PAGE = 10;

export default function MobileBlogPagination({ children }) {
  const cards = useMemo(() => Children.toArray(children), [children]);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);

  const totalPages = Math.ceil(cards.length / POSTS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (activePage - 1) * POSTS_PER_PAGE;
  const visibleCards = cards.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);

    if (nextPage === activePage) return;

    setCurrentPage(nextPage);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gridRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div>
      {/* Compact mobile grid */}
      <div
        ref={gridRef}
        className="grid scroll-mt-28 grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
      >
        {visibleCards}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4"
        >
          <button
            type="button"
            onClick={() => goToPage(activePage - 1)}
            disabled={activePage === 1}
            aria-label="Show previous blog page"
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-[10px] border border-white/20 bg-white/5 px-3 text-sm font-medium text-[#f4eee2] transition-colors hover:border-[#ddbc69]/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ddbc69] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/20 disabled:hover:bg-white/5"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Prev
          </button>

          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-center text-xs font-medium text-[#bcbab3] tabular-nums"
          >
            Page <span className="text-[#ddbc69]">{activePage}</span> of{" "}
            {totalPages}
          </p>

          <button
            type="button"
            onClick={() => goToPage(activePage + 1)}
            disabled={activePage === totalPages}
            aria-label="Show next blog page"
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-[10px] border border-white/20 bg-white/5 px-3 text-sm font-medium text-[#f4eee2] transition-colors hover:border-[#ddbc69]/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ddbc69] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/20 disabled:hover:bg-white/5"
          >
            Next
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}
