"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Grid2X2,
  Layers3,
  Search,
  Tag,
  X,
} from "lucide-react";

const numberFormatter = new Intl.NumberFormat("en-IN");

const formatNumber = (value) => {
  return numberFormatter.format(value);
};

const formatCurrency = (value) => {
  return `₹${numberFormatter.format(value)}`;
};

export default function PlotInventory({
  plots = [],
  title = "Plot Inventory & PLC Details",
  description = "Explore individual plot sizes and applicable PLC details.",
}) {
  //STATE MANAGEMENT
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedPLC, setSelectedPLC] = useState("all");

  const [sortConfig, setSortConfig] = useState({
    key: "plotNumber",
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const plotsPerPage = 10;

  const plotSizes = useMemo(() => {
    return [...new Set(plots.map((plot) => plot.areaSqYd))].sort(
      (a, b) => a - b,
    );
  }, [plots]);

  const plcValues = useMemo(() => {
    return [...new Set(plots.map((plot) => plot.plcPerSqYd))].sort(
      (a, b) => a - b,
    );
  }, [plots]);

  /*
   * ============================================================
   * FILTERED DATA AND SORTED DATA
   * ============================================================
   */

  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      const normalizedSearch = searchQuery.trim();

      const matchesSearch =
        normalizedSearch === "" ||
        String(plot.plotNumber).includes(normalizedSearch);

      const matchesArea =
        selectedArea === "all" || plot.areaSqYd === Number(selectedArea);

      const matchesPLC =
        selectedPLC === "all" || plot.plcPerSqYd === Number(selectedPLC);

      return matchesSearch && matchesArea && matchesPLC;
    });
  }, [plots, searchQuery, selectedArea, selectedPLC]);

  const sortedPlots = useMemo(() => {
    const sorted = [...filteredPlots];

    sorted.sort((a, b) => {
      const firstValue = a[sortConfig.key];
      const secondValue = b[sortConfig.key];

      if (firstValue === secondValue) {
        return a.plotNumber - b.plotNumber;
      }

      if (sortConfig.direction === "asc") {
        return firstValue - secondValue;
      }

      return secondValue - firstValue;
    });

    return sorted;
  }, [filteredPlots, sortConfig]);

  //PAGINATION
  const totalPages = Math.ceil(sortedPlots.length / plotsPerPage);

  const startIndex = (currentPage - 1) * plotsPerPage;

  const endIndex = startIndex + plotsPerPage;

  const visiblePlots = sortedPlots.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedArea, selectedPLC]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  //ADDED FILTERS
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedArea !== "all" ||
    selectedPLC !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedArea("all");
    setSelectedPLC("all");
  };

  const handleSort = (key) => {
    setSortConfig((currentSort) => {
      if (currentSort.key === key) {
        return {
          key,
          direction: currentSort.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        key,
        direction: "asc",
      };
    });
  };

  const handleMobileSort = (value) => {
    const [key, direction] = value.split("-");

    setSortConfig({
      key,
      direction,
    });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <ArrowUpDown size={14} aria-hidden="true" className="text-white/50" />
      );
    }

    if (sortConfig.direction === "asc") {
      return (
        <ArrowUp size={14} aria-hidden="true" className="text-[#DDBC69]" />
      );
    }

    return (
      <ArrowDown size={14} aria-hidden="true" className="text-[#DDBC69]" />
    );
  };

  //PAGINATION
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis-right", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "ellipsis-left",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis-left",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis-right",
      totalPages,
    ];
  };

  return (
  <section
    aria-labelledby="plot-inventory-title"
    className="
      w-full
      mt-10
      bg-transparent
      pb-16
      md:pb-20
      lg:pb-24
    "
  >
    <div
      className="
        mx-auto
        w-full
        max-w-[1240px]
        px-4
        font-inter
        sm:px-6
        lg:px-8
      "
    >
      {/* =====================================================
          SECTION HEADING
      ====================================================== */}

      <div className="mb-7 lg:mb-9">
        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* Heading */}
          <div className="max-w-[650px]">
            <p
              className="
                mb-2
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#DDBC69]
              "
            >
              Plot Details
            </p>

            <h2
              id="plot-inventory-title"
              className="
                font-playfair-display
                text-[32px]
                font-semibold
                leading-[1.08]
                tracking-[-0.03em]
                text-white
                sm:text-[38px]
                lg:text-[44px]
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-3
                max-w-[620px]
                text-[14px]
                font-normal
                leading-6
                text-white/[0.55]
                sm:text-[15px]
              "
            >
              {description}
            </p>
          </div>

          {/* Project summary */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:min-w-[390px]">
            <div
              className="
                flex min-h-[72px]
                items-center
                rounded-2xl
                border
                border-white/10
                bg-[#111111]
                px-3
                py-1.5
                text-[12px]
                font-medium
                text-white/[0.55]
              "
            >
              <Grid2X2
                aria-hidden="true"
                className="mr-2 size-6 shrink-0 text-[#DDBC69]"
              />
              <div>
                <strong className="block text-[18px] font-semibold leading-5 text-white">
                  {plots.length}
                </strong>
                <span className="text-[12px] text-white/60">Plots</span>
              </div>
            </div>

            <div
              className="
                flex min-h-[72px]
                items-center
                rounded-2xl
                border
                border-white/10
                bg-[#111111]
                px-3
                py-1.5
                text-[12px]
                font-medium
                text-white/[0.55]
              "
            >
              <Layers3
                aria-hidden="true"
                className="mr-2 size-6 shrink-0 text-[#DDBC69]"
              />
              <div>
                <strong className="block text-[18px] font-semibold leading-5 text-white">
                  {plotSizes.length}
                </strong>
                <span className="text-[12px] text-white/60">Plot Sizes</span>
              </div>
            </div>

            <div
              className="
                flex min-h-[72px]
                items-center
                rounded-2xl
                border
                border-white/10
                bg-[#111111]
                px-3
                py-1.5
                text-[12px]
                font-medium
                text-white/[0.55]
              "
            >
              <Tag
                aria-hidden="true"
                className="mr-2 size-6 shrink-0 text-[#DDBC69]"
              />
              <span>
                PLC
                <strong className="block font-semibold text-white">
                {plcValues.length > 0
                  ? `${formatCurrency(plcValues[0])}–${formatCurrency(
                      plcValues[plcValues.length - 1],
                    )}`
                  : "—"}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH + FILTER TOOLBAR
      ====================================================== */}

      <div
        className="
          mb-4
          grid
          grid-cols-2
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/[0.035]
          p-2
          md:flex
          md:items-center
          md:gap-2
        "
      >
        {/* Search */}
        <div className="relative col-span-2 flex-1">
          <Search
            aria-hidden="true"
            size={17}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-white/[0.35]
            "
          />

          <label htmlFor="plot-search" className="sr-only">
            Search plot number
          </label>

          <input
            id="plot-search"
            type="text"
            inputMode="numeric"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search plot number..."
            className="
              h-11
              w-full
              rounded-lg
              border
              border-white/10
              bg-[#111111]
              pl-11
              pr-4
              text-[13px]
              font-medium
              text-white
              outline-none
              transition
              placeholder:text-white/[0.35]
              hover:border-white/20
              focus:border-[#DDBC69]/60
              focus:ring-2
              focus:ring-[#DDBC69]/10
            "
          />
        </div>

        {/* Area Filter */}
        <div className="relative w-full md:w-[180px]">
          <label htmlFor="plot-area-filter" className="sr-only">
            Filter by plot area
          </label>

          <select
            id="plot-area-filter"
            value={selectedArea}
            onChange={(event) => setSelectedArea(event.target.value)}
            className="
              h-11
              w-full
              cursor-pointer
              appearance-none
              rounded-lg
              border
              border-white/10
              bg-[#111111]
              pl-10
              pr-10
              text-[13px]
              font-medium
              text-white
              outline-none
              transition
              hover:border-white/20
              focus:border-[#DDBC69]/60
              focus:ring-2
              focus:ring-[#DDBC69]/10
            "
          >
            <option value="all">All plot sizes</option>

            {plotSizes.map((size) => (
              <option key={size} value={size}>
                {formatNumber(size)} sq. yd.
              </option>
            ))}
          </select>

          <Layers3
            aria-hidden="true"
            size={14}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#DDBC69]
            "
          />

          <ChevronDown
            aria-hidden="true"
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
          />
        </div>

        {/* PLC Filter */}
        <div className="relative w-full md:w-[180px]">
          <label htmlFor="plot-plc-filter" className="sr-only">
            Filter by PLC
          </label>

          <select
            id="plot-plc-filter"
            value={selectedPLC}
            onChange={(event) => setSelectedPLC(event.target.value)}
            className="
              h-11
              w-full
              cursor-pointer
              appearance-none
              rounded-lg
              border
              border-white/10
              bg-[#111111]
              pl-10
              pr-10
              text-[13px]
              font-medium
              text-white
              outline-none
              transition
              hover:border-white/20
              focus:border-[#DDBC69]/60
              focus:ring-2
              focus:ring-[#DDBC69]/10
            "
          >
            <option value="all">All PLC</option>

            {plcValues.map((plc) => (
              <option key={plc} value={plc}>
                {plc === 0
                  ? "No PLC"
                  : `${formatCurrency(plc)} / sq. yd.`}
              </option>
            ))}
          </select>

          <Tag
            aria-hidden="true"
            size={14}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#DDBC69]
            "
          />

          <ChevronDown
            aria-hidden="true"
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="
              col-span-2
              inline-flex
              h-10
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-white/10
              bg-white/[0.04]
              px-3
              text-[12px]
              font-semibold
              text-white/[0.55]
              transition
              hover:border-white/20
              hover:bg-white/[0.07]
              hover:text-white
              md:col-auto
              md:h-11
            "
          >
            <X size={14} aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {/* Active filter result count */}
      {hasActiveFilters && (
        <div className="mb-3 px-1" aria-live="polite">
          <p className="text-[12px] font-medium text-white/[0.4]">
            <span className="font-semibold text-white/[0.75]">
              {filteredPlots.length}
            </span>{" "}
            {filteredPlots.length === 1 ? "plot" : "plots"} found
          </p>
        </div>
      )}

      {/* =====================================================
          DESKTOP TABLE
      ====================================================== */}

      <div className="hidden md:block">
        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-[#0D0D0D]
          "
        >
          <table className="w-full border-collapse">
            <thead>
              <tr
                className="
                  border-b
                  border-white/10
                  bg-white/[0.06]
                "
              >
                {/* Plot Number */}
                <th
                  scope="col"
                  aria-sort={
                    sortConfig.key === "plotNumber"
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className="px-6 py-3.5 text-left"
                >
                  <button
                    type="button"
                    onClick={() => handleSort("plotNumber")}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-white/[0.65]
                      transition-colors
                      hover:text-white
                    "
                  >
                    Plot No.
                    {renderSortIcon("plotNumber")}
                  </button>
                </th>

                {/* Sq. Yd. */}
                <th
                  scope="col"
                  aria-sort={
                    sortConfig.key === "areaSqYd"
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className="px-6 py-3.5 text-right"
                >
                  <button
                    type="button"
                    onClick={() => handleSort("areaSqYd")}
                    className="
                      ml-auto
                      inline-flex
                      items-center
                      gap-1.5
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-white/[0.65]
                      transition-colors
                      hover:text-white
                    "
                  >
                    Area (Sq. Yd.)
                    {renderSortIcon("areaSqYd")}
                  </button>
                </th>

                {/* Sq. Ft. */}
                <th
                  scope="col"
                  aria-sort={
                    sortConfig.key === "areaSqFt"
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className="px-6 py-3.5 text-right"
                >
                  <button
                    type="button"
                    onClick={() => handleSort("areaSqFt")}
                    className="
                      ml-auto
                      inline-flex
                      items-center
                      gap-1.5
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-white/[0.65]
                      transition-colors
                      hover:text-white
                    "
                  >
                    Area (Sq. Ft.)
                    {renderSortIcon("areaSqFt")}
                  </button>
                </th>

                {/* PLC */}
                <th
                  scope="col"
                  aria-sort={
                    sortConfig.key === "plcPerSqYd"
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className="px-6 py-3.5 text-right"
                >
                  <button
                    type="button"
                    onClick={() => handleSort("plcPerSqYd")}
                    className="
                      ml-auto
                      inline-flex
                      items-center
                      gap-1.5
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-white/[0.65]
                      transition-colors
                      hover:text-white
                    "
                  >
                    PLC / Sq. Yd.
                    {renderSortIcon("plcPerSqYd")}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {visiblePlots.map((plot) => (
                <tr
                  key={plot.plotNumber}
                  className="
                    h-[72px]
                    border-b
                    border-white/[0.07]
                    transition-colors
                    duration-150
                    last:border-b-0
                    hover:bg-white/[0.035]
                  "
                >
                  <td className="px-6 py-[13px]">
                    <span
                      className="
                        text-[13px]
                        font-semibold
                        tabular-nums
                        text-white
                      "
                    >
                      {String(plot.plotNumber).padStart(3, "0")}
                    </span>
                  </td>

                  <td className="px-6 py-[13px] text-right">
                    <span
                      className="
                        text-[13px]
                        font-medium
                        tabular-nums
                        text-white/[0.7]
                      "
                    >
                      {formatNumber(plot.areaSqYd)}
                    </span>
                  </td>

                  <td className="px-6 py-[13px] text-right">
                    <span
                      className="
                        text-[13px]
                        font-medium
                        tabular-nums
                        text-white/[0.7]
                      "
                    >
                      {formatNumber(plot.areaSqFt)}
                    </span>
                  </td>

                  <td className="px-6 py-[13px] text-right">
                    {plot.plcPerSqYd === 0 ? (
                      <span
                        className="
                          inline-flex
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.05]
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          text-white/[0.55]
                        "
                      >
                        No PLC
                      </span>
                    ) : (
                      <span
                        className="
                          text-[13px]
                          font-semibold
                          tabular-nums
                          text-white
                        "
                      >
                        {formatCurrency(plot.plcPerSqYd)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {visiblePlots.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-14 text-center">
                    <p className="text-[14px] font-semibold text-white">
                      No matching plots found
                    </p>

                    <p className="mt-1 text-[13px] text-white/[0.45]">
                      Try changing your search or filters.
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="
                        mt-4
                        text-[13px]
                        font-semibold
                        text-[#DDBC69]
                        transition-colors
                        hover:text-white
                      "
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Desktop Pagination */}
          {sortedPlots.length > 0 && (
            <div
              className="
                flex
                flex-col
                gap-4
                border-t
                border-white/10
                bg-white/[0.025]
                px-5
                py-3.5
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <p className="text-[12px] font-medium text-white/[0.4]">
                Showing{" "}
                <span className="font-semibold text-white/[0.75]">
                  {startIndex + 1}–
                  {Math.min(endIndex, sortedPlots.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-white/[0.75]">
                  {sortedPlots.length}
                </span>{" "}
                plots
              </p>

              {totalPages > 1 && (
                <nav
                  aria-label="Plot inventory pagination"
                  className="flex items-center gap-1"
                >
                  {/* Previous */}
                  <button
                    type="button"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                    className="
                      inline-flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-[12px]
                      font-medium
                      text-white/[0.6]
                      transition
                      hover:border-white/20
                      hover:bg-white/[0.07]
                      hover:text-white
                      disabled:pointer-events-none
                      disabled:opacity-25
                    "
                  >
                    <ChevronLeft size={17} aria-hidden="true" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPaginationItems().map((item) => {
                      if (
                        item === "ellipsis-left" ||
                        item === "ellipsis-right"
                      ) {
                        return (
                          <span
                            key={item}
                            className="
                              inline-flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              text-[12px]
                              text-white/[0.35]
                            "
                          >
                            …
                          </span>
                        );
                      }

                      const isActive = currentPage === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => goToPage(item)}
                          aria-current={isActive ? "page" : undefined}
                          className={`
                            inline-flex
                            h-10
                            min-w-10
                            items-center
                            justify-center
                            rounded-md
                            px-0
                            text-[12px]
                            font-semibold
                            transition
                            ${
                              isActive
                                ? "bg-[#DDBC69] text-[#111111]"
                                : "text-white/[0.45] hover:bg-white/[0.06] hover:text-white"
                            }
                          `}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next */}
                  <button
                    type="button"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                    className="
                      inline-flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-[12px]
                      font-medium
                      text-white/[0.6]
                      transition
                      hover:border-white/20
                      hover:bg-white/[0.07]
                      hover:text-white
                      disabled:pointer-events-none
                      disabled:opacity-25
                    "
                  >
                    <ChevronRight size={17} aria-hidden="true" />
                  </button>
                </nav>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          MOBILE INVENTORY
      ====================================================== */}

      <div className="md:hidden">
        {/* Mobile Sort */}
        {sortedPlots.length > 0 && (
          <div className="mb-3 flex items-center justify-between gap-3">
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-white/[0.55]
              "
            >
              Sort plots
            </p>

            <div className="relative">
              <label htmlFor="mobile-plot-sort" className="sr-only">
                Sort plots
              </label>

              <select
                id="mobile-plot-sort"
                value={`${sortConfig.key}-${sortConfig.direction}`}
                onChange={(event) =>
                  handleMobileSort(event.target.value)
                }
                className="
                  h-9
                  appearance-none
                  rounded-lg
                  border
                  border-white/10
                  bg-[#111111]
                  pl-3
                  pr-8
                  text-[11px]
                  font-semibold
                  text-white/[0.8]
                  outline-none
                  transition
                  focus:border-[#DDBC69]/60
                  focus:ring-2
                  focus:ring-[#DDBC69]/10
                "
              >
                <option value="plotNumber-asc">
                  Plot no.: Low to high
                </option>

                <option value="plotNumber-desc">
                  Plot no.: High to low
                </option>

                <option value="areaSqYd-asc">
                  Plot size: Small to large
                </option>

                <option value="areaSqYd-desc">
                  Plot size: Large to small
                </option>

                <option value="plcPerSqYd-asc">
                  PLC: Low to high
                </option>

                <option value="plcPerSqYd-desc">
                  PLC: High to low
                </option>
              </select>

              <ArrowUpDown
                size={13}
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-white/[0.35]
                "
              />
            </div>
          </div>
        )}

        {/* Mobile Plot List */}
        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-[#0D0D0D]
          "
        >
          {visiblePlots.length > 0 ? (
            <div>
              {visiblePlots.map((plot) => (
                <article
                  key={plot.plotNumber}
                  className="
                    border-b
                    border-white/[0.07]
                    bg-white/[0.02]
                    px-4
                    py-4
                    last:border-b-0
                  "
                >
                  {/* Primary row */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-white/[0.5]
                        "
                      >
                        Plot
                      </p>

                      <p
                        className="
                          mt-1
                          text-[14px]
                          font-semibold
                          tabular-nums
                          text-white
                        "
                      >
                        {String(plot.plotNumber).padStart(3, "0")}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-white/[0.5]
                        "
                      >
                        Plot Size
                      </p>

                      <p
                        className="
                          mt-1
                          text-[14px]
                          font-semibold
                          tabular-nums
                          text-white
                        "
                      >
                        {formatNumber(plot.areaSqYd)} sq. yd.
                      </p>
                    </div>
                  </div>

                  {/* Secondary row */}
                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-t
                      border-white/[0.06]
                      pt-3
                    "
                  >
                    <p
                      className="
                        text-[13px]
                        font-medium
                        tabular-nums
                        text-white/[0.55]
                      "
                    >
                      {formatNumber(plot.areaSqFt)} sq. ft.
                    </p>

                    {plot.plcPerSqYd === 0 ? (
                      <span
                        className="
                          inline-flex
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.05]
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          text-white/[0.55]
                        "
                      >
                        No PLC
                      </span>
                    ) : (
                      <p
                        className="
                          text-[13px]
                          font-semibold
                          tabular-nums
                          text-white
                        "
                      >
                        {formatCurrency(plot.plcPerSqYd)}

                        <span className="ml-1 font-normal text-white/[0.4]">
                          / sq. yd.
                        </span>
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <p className="text-[14px] font-semibold text-white">
                No matching plots found
              </p>

              <p className="mt-1 text-[12px] leading-5 text-white/[0.45]">
                Try changing your plot number, size, or PLC filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="
                  mt-4
                  text-[12px]
                  font-semibold
                  text-[#DDBC69]
                "
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Mobile Pagination */}
          {sortedPlots.length > 0 && (
            <div
              className="
                border-t
                border-white/10
                bg-white/[0.025]
                px-4
                py-4
              "
            >
              <p
                className="
                  mb-3
                  text-center
                  text-[11px]
                  font-medium
                  text-white/[0.4]
                "
              >
                Showing{" "}
                <span className="font-semibold text-white/[0.75]">
                  {startIndex + 1}–
                  {Math.min(endIndex, sortedPlots.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-white/[0.75]">
                  {sortedPlots.length}
                </span>{" "}
                plots
              </p>

              {totalPages > 1 && (
                <nav
                  aria-label="Mobile plot inventory pagination"
                  className="
                    grid
                    grid-cols-[1fr_auto_1fr]
                    items-center
                    gap-3
                  "
                >
                  {/* Previous */}
                  <button
                    type="button"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="
                      inline-flex
                      h-9
                      items-center
                      justify-center
                      gap-1
                      rounded-lg
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-3
                      text-[11px]
                      font-semibold
                      text-white/[0.6]
                      transition
                      disabled:pointer-events-none
                      disabled:opacity-25
                    "
                  >
                    <ChevronLeft size={14} aria-hidden="true" />
                    Previous
                  </button>

                  {/* Current Page */}
                  <span
                    className="
                      min-w-[52px]
                      text-center
                      text-[11px]
                      font-semibold
                      tabular-nums
                      text-white/[0.6]
                    "
                  >
                    {currentPage} / {totalPages}
                  </span>

                  {/* Next */}
                  <button
                    type="button"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="
                      inline-flex
                      h-9
                      items-center
                      justify-center
                      gap-1
                      rounded-lg
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-3
                      text-[11px]
                      font-semibold
                      text-white/[0.6]
                      transition
                      disabled:pointer-events-none
                      disabled:opacity-25
                    "
                  >
                    Next
                    <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </nav>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);
}
