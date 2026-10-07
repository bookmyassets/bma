"use client";

import {
  Building2,
  ChevronDown,
  CircleHelp,
  Globe2,
  Handshake,
  MapPinned,
  Search,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

/* =========================================================
   CATEGORY VISUAL CONFIG
========================================================= */

const categoryDesign = {
  general: {
    icon: CircleHelp,

    color: "text-amber-300",

    bg: "bg-amber-400/10",

    border: "border-amber-400/20",

    activeBorder: "border-amber-400/40",

    glow: "bg-amber-400/10",

    numberColor: "text-amber-300",
  },

  "dholera-investment": {
    icon: Building2,

    color: "text-cyan-300",

    bg: "bg-cyan-400/10",

    border: "border-cyan-400/20",

    activeBorder: "border-cyan-400/40",

    glow: "bg-cyan-400/10",

    numberColor: "text-cyan-300",
  },

  projects: {
    icon: MapPinned,

    color: "text-violet-300",

    bg: "bg-violet-400/10",

    border: "border-violet-400/20",

    activeBorder: "border-violet-400/40",

    glow: "bg-violet-400/10",

    numberColor: "text-violet-300",
  },

  "nri-corner": {
    icon: Globe2,

    color: "text-emerald-300",

    bg: "bg-emerald-400/10",

    border: "border-emerald-400/20",

    activeBorder: "border-emerald-400/40",

    glow: "bg-emerald-400/10",

    numberColor: "text-emerald-300",
  },

  "channel-partner": {
    icon: Handshake,

    color: "text-orange-300",

    bg: "bg-orange-400/10",

    border: "border-orange-400/20",

    activeBorder: "border-orange-400/40",

    glow: "bg-orange-400/10",

    numberColor: "text-orange-300",
  },
};

/* =========================================================
   PROJECT FILTERS
========================================================= */

const projectFilters = [
  {
    id: "all",
    label: "All Projects",
  },

  {
    id: "county",
    label: "WestWyn County",
  },

  {
    id: "estate",
    label: "WestWyn Estates",
  },

  {
    id: "residency",
    label: "WestWyn Residency",
  },
];

function matchesProjectFilter(faq, filter) {
  if (filter === "all") {
    return true;
  }

  const content = `${faq.question} ${faq.answer}`.toLowerCase();

  if (filter === "county") {
    return content.includes("westwyn county");
  }

  if (filter === "estate") {
    return (
      content.includes("westwyn estate") ||
      content.includes("westwyn estates")
    );
  }

  if (filter === "residency") {
    return content.includes("westwyn residency");
  }

  return true;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function FAQExplorer({
  groups,
}) {
  const [activeGroupId, setActiveGroupId] =
    useState(groups[0]?.id || "");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [projectFilter, setProjectFilter] =
    useState("all");

  const activeGroup =
    groups.find(
      (group) => group.id === activeGroupId
    ) || groups[0];

  const design =
    categoryDesign[activeGroup.id] ||
    categoryDesign.general;

  const ActiveIcon = design.icon;

  /* =======================================================
     SEARCH RESULTS
  ======================================================= */

  const searchResults = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLowerCase();

    if (!query) {
      return [];
    }

    return groups
      .map((group) => ({
        ...group,

        items: group.items.filter(
          (faq) =>
            faq.question
              .toLowerCase()
              .includes(query) ||
            faq.answer
              .toLowerCase()
              .includes(query)
        ),
      }))
      .filter(
        (group) => group.items.length > 0
      );
  }, [groups, searchQuery]);

  /* =======================================================
     ACTIVE FAQS
  ======================================================= */

  const activeItems = useMemo(() => {
    if (!activeGroup) {
      return [];
    }

    if (
      activeGroup.id === "projects"
    ) {
      return activeGroup.items.filter(
        (faq) =>
          matchesProjectFilter(
            faq,
            projectFilter
          )
      );
    }

    return activeGroup.items;
  }, [
    activeGroup,
    projectFilter,
  ]);

  const isSearching =
    searchQuery.trim().length > 0;

  const handleCategoryChange = (id) => {
    setActiveGroupId(id);

    setSearchQuery("");

    setProjectFilter("all");
  };

  return (
    <section
      className="
        relative
        border-b
        border-white/[0.08]
        bg-[#08080a]
        px-5
        pt-[104px]
        pb-16

        sm:px-8
        sm:pt-[120px]
        sm:pb-20

        lg:px-10
        lg:pt-[134px]
        lg:pb-28
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <div
          className="
            mb-10
            grid
            gap-6

            lg:grid-cols-[1fr_auto]
            lg:items-end
          "
        >
          <div className="max-w-3xl">
            <p
              className="
                text-[14px] lg:text-[16px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-white
              "
            >
              Explore the Knowledge Centre
            </p>

            <h2
              className="
                mt-3
                font-playfair-display
                text-[25px] lg:text-[35px]
                font-medium
                leading-[1.15]
                tracking-[-0.04em]
                text-[#ddbc69]
              "
            >
              Find the answer you need.
            </h2>
          </div>

        </div>

        {/* ===================================================
            REAL SEARCH
        =================================================== */}

        <div
          className="
            relative
            z-20
            mb-10
            flex
            min-h-[58px]
            items-center
            gap-3
            rounded-2xl
            border
            border-white/[0.1]
            bg-[#0d0d10]
            px-3
            shadow-[0_20px_60px_rgba(0,0,0,0.18)]

            focus-within:border-[#ddbc69]/40
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-violet-400/20
              bg-violet-400/10
            "
          >
            <Search
              size={17}
              className="text-violet-300"
            />
          </div>

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            placeholder="Search registry, NOC, projects, prices, NRI..."
            className="
              min-w-0
              flex-1
              bg-transparent
              py-4
              text-[15px] lg:text-[17px]
              text-white
              outline-none

              placeholder:text-white/30


            "
          />

          {searchQuery ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() =>
                setSearchQuery("")
              }
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-white/40
                transition-colors

                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <X size={16} />
            </button>
          ) : null}
        </div>

        {/* ===================================================
            SEARCH MODE
        =================================================== */}

        {isSearching ? (
          <SearchResults
            groups={searchResults}
            query={searchQuery}
          />
        ) : (
          <>
            {/* ===============================================
                MOBILE CATEGORY GRID
            =============================================== */}

            <div
              className="
                mb-6
                grid
                grid-cols-2
                gap-2

                lg:hidden
              "
            >
              {groups.map((group) => {
                const itemDesign =
                  categoryDesign[group.id] ||
                  categoryDesign.general;

                const Icon =
                  itemDesign.icon;

                const active =
                  group.id ===
                  activeGroupId;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        group.id
                      )
                    }
                    className={`
                      flex
                      min-h-[64px]
                      items-center
                      gap-2
                      rounded-xl
                      border
                      px-2.5
                      py-2
                      text-left
                      transition-all

                      ${
                        active
                          ? `
                            bg-white/[0.055]
                            ${itemDesign.activeBorder}
                          `
                          : `
                            border-white/[0.07]
                            bg-white/[0.02]
                          `
                      }
                    `}
                  >
                    <div
                      className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border

                        ${itemDesign.bg}
                        ${itemDesign.border}
                      `}
                    >
                      <Icon
                        size={16}
                        className={
                          itemDesign.color
                        }
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[15px] lg:text-[17px] font-medium leading-[1.3] text-white">
                        {group.shortLabel ||
                          group.label}
                      </p>

                      <p className="mt-0.5 text-[15px] lg:text-[17px] leading-[1.3] text-white/35">
                        {group.items.length}{" "}
                        answers
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ===============================================
                DESKTOP / CONTENT GRID
            =============================================== */}

            <div
              className="
                grid
                gap-10

                lg:grid-cols-[280px_minmax(0,1fr)]
                lg:gap-16

                xl:grid-cols-[310px_minmax(0,1fr)]
                xl:gap-20
              "
            >
              {/* DESKTOP SIDEBAR */}

              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <div className="mb-5 flex items-center gap-2">
                    <span className="text-[15px] lg:text-[17px] font-semibold uppercase tracking-[0.2em] text-white/35">
                      Browse topics
                    </span>
                  </div>

                  <div className="border-t border-white/[0.08]">
                    {groups.map(
                      (group) => {
                        const itemDesign =
                          categoryDesign[
                            group.id
                          ] ||
                          categoryDesign.general;

                        const Icon =
                          itemDesign.icon;

                        const active =
                          group.id ===
                          activeGroupId;

                        return (
                          <button
                            key={group.id}
                            type="button"
                            onClick={() =>
                              handleCategoryChange(
                                group.id
                              )
                            }
                            className={`
                              group
                              flex
                              w-full
                              items-center
                              justify-between
                              gap-4
                              border-b
                              border-white/[0.08]
                              py-4
                              text-left
                              transition-all

                              ${
                                active
                                  ? "pl-2"
                                  : ""
                              }
                            `}
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div
                                className={`
                                  flex
                                  h-9
                                  w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-xl
                                  border

                                  ${
                                    active
                                      ? `${itemDesign.bg} ${itemDesign.border}`
                                      : "border-white/[0.06] bg-white/[0.025]"
                                  }
                                `}
                              >
                                <Icon
                                  size={16}
                                  className={
                                    active
                                      ? itemDesign.color
                                      : "text-white/40"
                                  }
                                />
                              </div>

                              <span
                                className={`
                                  text-[15px] lg:text-[17px]
                                  font-medium
                                  transition-colors

                                  ${
                                    active
                                      ? "text-white"
                                      : "text-white/55 group-hover:text-white"
                                  }
                                `}
                              >
                                {group.label}
                              </span>
                            </div>

                            <span
                              className={`
                                text-[15px] lg:text-[17px]
                                font-semibold

                                ${
                                  active
                                    ? itemDesign.color
                                    : "text-white/25"
                                }
                              `}
                            >
                              {String(
                                group.items
                                  .length
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </aside>

              {/* CONTENT */}

              <div className="min-w-0">
                {/* active category intro */}

                <div
                  className="
                    relative
                    mb-8
                    overflow-hidden
                    border-b
                    border-white/[0.09]
                    pb-8
                  "
                >
                  <div
                    aria-hidden="true"
                    className={`
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-52
                      w-52
                      rounded-full
                      opacity-50
                      blur-[70px]

                      ${design.glow}
                    `}
                  />

                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-2xl
                          border

                          ${design.bg}
                          ${design.border}
                        `}
                      >
                        <ActiveIcon
                          size={18}
                          className={
                            design.color
                          }
                        />
                      </div>

                      <span
                        className={`
                          text-[14px] lg:text-[16px]
                          font-semibold
                          uppercase
                          tracking-[0.2em]

                          ${design.color}
                        `}
                      >
                        {activeGroup.items.length}{" "}
                        Questions
                      </span>
                    </div>

                    <h3
                      className="
                        font-playfair-display
                        text-[25px] lg:text-[35px]
                        font-medium
                        leading-[1.15]
                        tracking-[-0.035em]
                        text-[#ddbc69]



                      "
                    >
                      {activeGroup.label}
                    </h3>

                    <p className="text-[15px] lg:text-[17px] mt-4 max-w-2xl leading-[1.75] text-white">
                      {
                        activeGroup.description
                      }
                    </p>
                  </div>
                </div>

                {/* PROJECT FILTER */}

                {activeGroup.id ===
                "projects" ? (
                  <ProjectFilter
                    selected={
                      projectFilter
                    }
                    onChange={
                      setProjectFilter
                    }
                  />
                ) : null}

                {/* ACCORDION */}

                <FAQList
                  items={activeItems}
                  numberColor={
                    design.numberColor
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   FAQ LIST
========================================================= */

function FAQList({
  items,
  numberColor,
}) {
  return (
    <div className="border-t border-white/[0.09]">
      {items.map((faq, index) => (
        <details
          key={faq.question}
          className="
            group
            border-b
            border-white/[0.09]
          "
        >
          <summary
            className="
              grid
              cursor-pointer
              list-none
              grid-cols-[30px_minmax(0,1fr)_28px]
              gap-3
              py-5
              marker:content-none

              sm:grid-cols-[44px_minmax(0,1fr)_32px]
              sm:gap-4
              sm:py-6
            "
          >
            <span
              className={`
                mt-1
                text-[15px] lg:text-[17px]
                font-semibold
                tracking-[0.08em]

                ${numberColor}
              `}
            >
              {String(
                index + 1
              ).padStart(2, "0")}
            </span>

            <span
              className="
                pr-2
                text-[15px] lg:text-[17px]
                font-medium
                leading-6
                text-white


                sm:leading-7
              "
            >
              {faq.question}
            </span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.09]
                text-lg
                font-light
                text-[#ddbc69]
                transition-all

                group-open:rotate-45
                group-open:border-[#ddbc69]/30
                group-open:bg-[#ddbc69]/[0.06]
              "
            >
              +
            </span>
          </summary>

          <div
            className="
              pb-6
              pl-[42px]
              pr-7

              sm:pb-7
              sm:pl-[60px]
              sm:pr-10
            "
          >
            <p
              className="
                max-w-3xl
                text-[15px] lg:text-[17px]
                leading-[1.75]
                text-white



              "
            >
              {faq.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}

/* =========================================================
   SEARCH RESULTS
========================================================= */

function SearchResults({
  groups,
  query,
}) {
  const totalResults =
    groups.reduce(
      (total, group) =>
        total +
        group.items.length,
      0
    );

  if (totalResults === 0) {
    return (
      <div
        className="
          border-y
          border-white/[0.08]
          py-16
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.03]
          "
        >
          <Search
            size={20}
            className="text-white/35"
          />
        </div>

        <h3 className="mt-5 text-[25px] lg:text-[35px] font-medium text-white">
          No matching questions
        </h3>

        <p className="mt-2 text-[15px] lg:text-[17px] text-white/45">
          Try a broader search term.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 border-b border-white/[0.08] pb-6">
        <p className="text-[15px] lg:text-[17px] font-semibold uppercase tracking-[0.2em] text-[#ddbc69]">
          Search Results
        </p>

        <h3
          className="
            mt-2
            font-playfair-display
            text-[25px] lg:text-[35px]
            font-medium
            leading-[1.15]
            text-white


          "
        >
          {totalResults} results for{" "}
          <span className="text-[#ddbc69]">
            “{query}”
          </span>
        </h3>
      </div>

      <div className="space-y-12">
        {groups.map((group) => {
          const design =
            categoryDesign[
              group.id
            ] ||
            categoryDesign.general;

          const Icon = design.icon;

          return (
            <div key={group.id}>
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border

                    ${design.bg}
                    ${design.border}
                  `}
                >
                  <Icon
                    size={14}
                    className={
                      design.color
                    }
                  />
                </div>

                <h4 className="text-[25px] lg:text-[35px] font-medium text-white">
                  {group.label}
                </h4>

                <span
                  className={`
                    text-[15px] lg:text-[17px]
                    font-semibold

                    ${design.color}
                  `}
                >
                  {group.items.length}
                </span>
              </div>

              <FAQList
                items={group.items}
                numberColor={
                  design.numberColor
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT FILTER
========================================================= */

function ProjectFilter({
  selected,
  onChange,
}) {
  return (
    <div className="mb-8">
      {/* MOBILE */}

      <div className="relative sm:hidden">
        <select
          value={selected}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="
            min-h-12
            w-full
            appearance-none
            rounded-xl
            border
            border-violet-400/20
            bg-violet-400/[0.06]
            px-4
            pr-11
            text-[15px] lg:text-[17px]
            text-white
            outline-none
          "
        >
          {projectFilters.map(
            (filter) => (
              <option
                key={filter.id}
                value={filter.id}
                className="bg-[#111114]"
              >
                {filter.label}
              </option>
            )
          )}
        </select>

        <ChevronDown
          size={16}
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-violet-300
          "
        />
      </div>

      {/* DESKTOP */}

      <div className="hidden flex-wrap gap-2 sm:flex">
        {projectFilters.map(
          (filter) => {
            const active =
              selected === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() =>
                  onChange(filter.id)
                }
                className={`
                  rounded-full
                  border
                  px-4
                  py-2
                  text-[15px] lg:text-[17px]
                  font-medium
                  transition-all

                  ${
                    active
                      ? `
                        border-violet-400/30
                        bg-violet-400/10
                        text-violet-200
                      `
                      : `
                        border-white/[0.08]
                        bg-white/[0.02]
                        text-white/45
                        hover:border-white/[0.15]
                        hover:text-white
                      `
                  }
                `}
              >
                {filter.label}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}
