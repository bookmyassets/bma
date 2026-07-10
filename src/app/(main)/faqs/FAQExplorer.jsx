"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  ChevronDown,
  FileCheck2,
  Handshake,
  MapPinned,
  Search,
  X,
} from "lucide-react";

const topicIcons = {
  "dholera-basics": MapPinned,
  "buying-due-diligence": FileCheck2,
  "plots-documents": Building2,
  "bookmyassets-support": Handshake,
};

export default function FAQExplorer({ groups }) {
  const [activeTopic, setActiveTopic] = useState("all");
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return groups
      .filter((group) => activeTopic === "all" || group.id === activeTopic)
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (!searchTerm) return true;

          return `${item.question} ${item.answer}`
            .toLowerCase()
            .includes(searchTerm);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeTopic, groups, query]);

  const totalQuestions = groups.reduce(
    (total, group) => total + group.items.length,
    0,
  );
  const visibleQuestions = filteredGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <section
      id="faq-directory"
      aria-labelledby="faq-directory-title"
      className="w-full overflow-x-clip px-3 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <div className="grid w-full min-w-0 gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[19rem_minmax(0,1fr)]">
          <aside className="min-w-0 max-w-full lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ddbc69]">
              Browse by topic
            </p>
            <div
              className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible"
              aria-label="FAQ topics"
            >
              <button
                type="button"
                onClick={() => setActiveTopic("all")}
                aria-pressed={activeTopic === "all"}
                className={`flex min-h-12 shrink-0 items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors lg:w-full ${
                  activeTopic === "all"
                    ? "border-[#ddbc69]/60 bg-[#ddbc69] text-black"
                    : "border-white/10 bg-white/[0.035] text-white/70 hover:border-white/25 hover:text-white"
                }`}
              >
                <span>All questions</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    activeTopic === "all" ? "bg-black/10" : "bg-white/5"
                  }`}
                >
                  {totalQuestions}
                </span>
              </button>

              {groups.map((group) => {
                const Icon = topicIcons[group.id] || Building2;
                const isActive = activeTopic === group.id;

                return (
                  <button
                    type="button"
                    key={group.id}
                    onClick={() => setActiveTopic(group.id)}
                    aria-pressed={isActive}
                    className={`flex min-h-12 shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors lg:w-full ${
                      isActive
                        ? "border-[#ddbc69]/60 bg-[#ddbc69] text-black"
                        : "border-white/10 bg-white/[0.035] text-white/70 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{group.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 hidden rounded-2xl border border-white/10 bg-[#0d1014] p-5 text-sm leading-6 text-white/50 lg:block">
              <p className="font-semibold text-white/85">A useful first step</p>
              <p className="mt-2">
                Use these answers to prepare better questions for the seller,
                project team and your independent legal adviser.
              </p>
            </div>
          </aside>

          <div className="w-full min-w-0">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm text-[#ddbc69]">Frequently asked</p>
                <h2
                  id="faq-directory-title"
                  className="mt-2 text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.03em]"
                >
                  Find the answer you need
                </h2>
              </div>
              <p
                className="text-sm text-white/45"
                role="status"
                aria-live="polite"
              >
                Showing {visibleQuestions} of {totalQuestions} answers
              </p>
            </div>

            <div className="relative mt-7 w-full min-w-0">
              <label htmlFor="faq-search" className="sr-only">
                Search frequently asked questions
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35"
                aria-hidden="true"
              />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search documents, registry, RERA, site visit…"
                className="min-h-14 w-full rounded-2xl border border-white/10 bg-[#0d1014] py-3 pl-12 pr-12 text-base text-white outline-none transition placeholder:text-white/30 focus:border-[#ddbc69]/60 focus:ring-4 focus:ring-[#ddbc69]/10 [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear FAQ search"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ddbc69]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {filteredGroups.length > 0 ? (
              <div className="mt-10 min-w-0 space-y-12">
                {filteredGroups.map((group, groupIndex) => {
                  const Icon = topicIcons[group.id] || Building2;

                  return (
                    <section
                      key={group.id}
                      aria-labelledby={`${group.id}-title`}
                      className="min-w-0 scroll-mt-28"
                    >
                      <div className="mb-5 flex items-start gap-4">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ddbc69]/30 bg-[#ddbc69]/10 text-[#ddbc69]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/35">
                            0{groupIndex + 1}
                          </p>
                          <h3
                            id={`${group.id}-title`}
                            className="mt-1 break-words text-xl font-bold text-white sm:text-2xl"
                          >
                            {group.label}
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                            {group.description}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 max-w-full divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1014]">
                        {group.items.map((item) => (
                          <details
                            key={item.question}
                            className="group w-full min-w-0 open:bg-white/[0.025]"
                          >
                            <summary className="flex min-h-16 w-full min-w-0 cursor-pointer list-none items-center gap-3 px-4 py-4 text-left font-semibold leading-6 text-white transition-colors hover:text-[#ddbc69] focus:outline-none focus-visible:bg-white/5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ddbc69] sm:gap-5 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                              <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">
                                {item.question}
                              </span>
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-[#ddbc69] transition-transform duration-200 group-open:rotate-180">
                                <ChevronDown
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              </span>
                            </summary>
                            <div className="min-w-0 px-4 pb-5 sm:px-6 sm:pb-6 sm:pr-20">
                              <p className="max-w-3xl break-words text-[0.95rem] leading-7 text-white/60 [overflow-wrap:anywhere] sm:text-base">
                                {item.answer}
                              </p>
                            </div>
                          </details>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-14 text-center">
                <p className="text-lg font-semibold text-white">
                  No matching answer found
                </p>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Try a shorter phrase or browse all FAQ topics.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveTopic("all");
                  }}
                  className="mt-5 min-h-11 rounded-xl border border-[#ddbc69]/50 px-5 py-2 text-sm font-semibold text-[#ddbc69] transition-colors hover:bg-[#ddbc69] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#ddbc69]"
                >
                  Reset search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
