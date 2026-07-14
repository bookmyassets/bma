"use client";

import { useState } from "react";

const Chevron = ({ isOpen }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className={`h-5 w-5 transition-transform duration-200 ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TopicList = ({ items, onNavigate, isVisible }) => (
  <ul className="space-y-1.5">
    {items.map((item) => {
      const hasChildren = item.children.length > 0;

      return (
        <li key={item.key}>
          <a
            href={`#${item.id}`}
            onClick={(event) => onNavigate(event, item.id)}
            tabIndex={isVisible ? 0 : -1}
            className="flex min-h-11 items-center rounded-lg border border-transparent px-3 py-2.5 text-sm leading-relaxed text-[#D6B85E] transition-colors hover:border-[#C69C21]/20 hover:bg-black/20 hover:text-[#FDB913] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB913]"
          >
            {item.text}
          </a>

          {hasChildren && (
            <div className="ml-3 border-l border-[#C69C21]/30 py-1 pl-3 sm:ml-4 sm:pl-4">
              <TopicList
                items={item.children}
                onNavigate={onNavigate}
                isVisible={isVisible}
              />
            </div>
          )}
        </li>
      );
    })}
  </ul>
);

export default function TableOfContents({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items?.length) return null;

  const navigateToHeading = (event, id) => {
    const heading = document.getElementById(id);
    if (!heading) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    heading.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <section className="my-6 rounded-2xl border border-[#C69C21]/20 bg-gradient-to-br from-[#C69C21]/5 to-[#FDB913]/10 p-4 shadow-lg sm:my-8 sm:p-6">
      <div className="flex min-h-11 items-center justify-between gap-3">
        <h2
          id="key-highlights-title"
          className="text-xl font-bold text-white sm:text-2xl"
        >
          Key Highlights
        </h2>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="key-highlights-list"
          aria-label={`${isOpen ? "Close" : "Open"} key highlights`}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#C69C21]/30 text-[#D6B85E] transition-colors hover:bg-[#C69C21]/15 hover:text-[#FDB913] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB913]"
        >
          <Chevron isOpen={isOpen} />
        </button>
      </div>

      <nav
        id="key-highlights-list"
        aria-labelledby="key-highlights-title"
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-200 ${
          isOpen
            ? "mt-3 grid-rows-[1fr] opacity-100 sm:mt-4"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <TopicList
            items={items}
            onNavigate={navigateToHeading}
            isVisible={isOpen}
          />
        </div>
      </nav>
    </section>
  );
}
