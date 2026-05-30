"use client";

import React, { Children, useMemo, useState } from "react";

const POSTS_PER_PAGE = 10;

export default function MobileBlogPagination({ children }) {
  const cards = useMemo(() => Children.toArray(children), [children]);
  const totalPages = Math.ceil(cards.length / POSTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visibleCards = cards.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  if (totalPages <= 1) {
    return (
      <div className="grid grid-cols-1 gap-6 ">
        {cards}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-12 gap-y-12">
        {visibleCards}
      </div>

      <nav
        className="mt-8 grid grid-cols-[auto_1fr_auto] items-center gap-3"
        aria-label="Blog pagination"
      >
        <button
          type="button"
          onClick={() => goToPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-black transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Show previous blog page"
        >
          Prev
        </button>

        <p
          className="min-w-0 text-center text-sm font-semibold text-gray-700"
          aria-live="polite"
        >
          Page {currentPage} of {totalPages}
        </p>

        <button
          type="button"
          onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-black transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Show next blog page"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
