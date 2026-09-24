"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaMinus, FaPlus, FaRotateLeft } from "react-icons/fa6";

import { getPlotLegendItems, getPlotVisualState } from "./plotStatusConfig";

const DEFAULT_VIEWBOX = "0 0 915 916";

const getViewBoxDimensions = (viewBox) => {
  const values = String(viewBox).trim().split(/\s+/).map(Number);

  if (values.length !== 4 || values.some((value) => !Number.isFinite(value))) {
    return { width: 915, height: 916 };
  }

  const width = values[2];
  const height = values[3];

  if (width <= 0 || height <= 0) {
    return { width: 915, height: 916 };
  }

  return { width, height };
};

const getViewBoxAspectRatio = (viewBox) => {
  const { width, height } = getViewBoxDimensions(viewBox);

  return `${width} / ${height}`;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizePlotNumber = (value) =>
  String(value ?? "")
    .trim()
    .toUpperCase();

const PlotMapViewer = ({
  projectSlug,
  planImage,
  planAlt,
  geometry,
  plots,
  fullscreen = false,
  initialFullscreenZoom = 2,
  usesPlotTier = true,
}) => {
  const scrollRef = useRef(null);
  const svgRef = useRef(null);
  const mapContainerRef = useRef(null);
  const hoverShowTimerRef = useRef(null);
  const hoverHideTimerRef = useRef(null);
  const fullscreenZoom = clamp(initialFullscreenZoom, MIN_ZOOM, MAX_ZOOM);

  const [inventory, setInventory] = useState([]);
  const [loadError, setLoadError] = useState(false);

  const [hoveredPlotNumber, setHoveredPlotNumber] = useState(null);

  const [tooltipPosition, setTooltipPosition] = useState(null);

  const [selectedPlotNumber, setSelectedPlotNumber] = useState(null);

  const [zoom, setZoom] = useState(fullscreen ? fullscreenZoom : 1);
  const [mapViewportSize, setMapViewportSize] = useState({
    width: 0,
    height: 0,
  });

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipAnimationKey, setTooltipAnimationKey] = useState(0);

  const geometryPlots = geometry?.plots ?? [];

  const viewBox = geometry?.viewBox ?? DEFAULT_VIEWBOX;

  const viewBoxDimensions = getViewBoxDimensions(viewBox);
  const mapAspectRatioValue =
    viewBoxDimensions.width / viewBoxDimensions.height;
  const mapAspectRatio = getViewBoxAspectRatio(viewBox);

  const legendItems = getPlotLegendItems({
    usesPlotTier,
  });

  const hasGeometry = geometryPlots.length > 0;

  useEffect(() => {
    const controller = new AbortController();

    const loadInventory = async () => {
      try {
        setLoadError(false);

        const response = await fetch(`/api/plot-inventory/${projectSlug}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Inventory request failed");
        }

        const data = await response.json();

        setInventory(Array.isArray(data?.plots) ? data.plots : []);
      } catch (error) {
        if (error?.name !== "AbortError") {
          setLoadError(true);
          setInventory([]);
        }
      }
    };

    loadInventory();

    return () => controller.abort();
  }, [projectSlug]);

  useEffect(() => {
    return () => {
      if (hoverShowTimerRef.current) {
        clearTimeout(hoverShowTimerRef.current);
      }

      if (hoverHideTimerRef.current) {
        clearTimeout(hoverHideTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!fullscreen || !scrollRef.current) {
      return undefined;
    }

    const viewport = scrollRef.current;
    const updateViewportSize = () => {
      setMapViewportSize({
        width: viewport.clientWidth,
        height: viewport.clientHeight,
      });
    };

    updateViewportSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateViewportSize);

      return () => window.removeEventListener("resize", updateViewportSize);
    }

    const resizeObserver = new ResizeObserver(updateViewportSize);
    resizeObserver.observe(viewport);

    return () => resizeObserver.disconnect();
  }, [fullscreen]);

  /*
   * Sanity inventory lookup
   *
   * plotNumber =>
   * {
   *   saleStatus,
   *   plotTier
   * }
   */
  const inventoryByPlot = useMemo(
    () =>
      new Map(
        inventory.map((item) => [normalizePlotNumber(item.plotNumber), item]),
      ),
    [inventory],
  );

  /*
   * Static plot information
   *
   * areaSqYd
   * areaSqFt
   * plcPerSqYd
   */
  const plotByNumber = useMemo(
    () =>
      new Map(
        (plots ?? []).map((plot) => [
          normalizePlotNumber(plot.plotNumber),
          plot,
        ]),
      ),
    [plots],
  );

  const selectedPlot = selectedPlotNumber
    ? plotByNumber.get(selectedPlotNumber)
    : null;

  const selectedInventory = selectedPlotNumber
    ? inventoryByPlot.get(selectedPlotNumber)
    : null;

  const selectedVisualConfig = selectedInventory
    ? getPlotVisualState(selectedInventory)
    : null;

  const hoveredPlot = hoveredPlotNumber
    ? plotByNumber.get(hoveredPlotNumber)
    : null;

  const hoveredInventory = hoveredPlotNumber
    ? inventoryByPlot.get(hoveredPlotNumber)
    : null;

  const hoveredVisualConfig = hoveredInventory
    ? getPlotVisualState(hoveredInventory)
    : null;

  const centerPlotInViewport = (plotNumber) => {
    if (!fullscreen || !scrollRef.current || !svgRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      const plotElement = svgRef.current.querySelector(
        `[data-plot-number="${plotNumber}"]`,
      );

      if (!plotElement) return;

      const plotRect = plotElement.getBoundingClientRect();

      const scrollRect = scrollRef.current.getBoundingClientRect();

      const nextLeft =
        scrollRef.current.scrollLeft +
        plotRect.left -
        scrollRect.left -
        scrollRect.width / 2 +
        plotRect.width / 2;

      const nextTop =
        scrollRef.current.scrollTop +
        plotRect.top -
        scrollRect.top -
        scrollRect.height / 2 +
        plotRect.height / 2;

      scrollRef.current.scrollTo({
        left: Math.max(0, nextLeft),
        top: Math.max(0, nextTop),
        behavior: "smooth",
      });
    });
  };

  const selectPlot = (plotNumber) => {
    const normalizedPlotNumber = normalizePlotNumber(plotNumber);

    if (!plotByNumber.has(normalizedPlotNumber)) {
      return;
    }

    if (!fullscreen) {
      setHoveredPlotNumber(normalizedPlotNumber);
      return;
    }

    setSelectedPlotNumber(normalizedPlotNumber);

    centerPlotInViewport(normalizedPlotNumber);
  };

  const handleSvgClick = (event) => {
    if (!fullscreen) return;

    const target = event.target.closest?.("[data-plot-number]");

    if (!target) return;

    selectPlot(target.dataset.plotNumber);
  };

  const handlePlotMouseMove = (event) => {
    if (fullscreen || !mapContainerRef.current) return;

    const target = event.target.closest?.("[data-plot-number]");

    if (!target) {
      handlePlotMouseLeave();
      return;
    }

    const plotNumber = normalizePlotNumber(target.dataset.plotNumber);

    if (!plotByNumber.has(plotNumber)) return;

    // Keep the card stationary while moving inside the same plot.
    if (hoveredPlotNumber === plotNumber && tooltipVisible) {
      return;
    }

    if (hoverShowTimerRef.current) {
      clearTimeout(hoverShowTimerRef.current);
    }

    if (hoverHideTimerRef.current) {
      clearTimeout(hoverHideTimerRef.current);
    }

    const mapRect = mapContainerRef.current.getBoundingClientRect();
    const plotRect = target.getBoundingClientRect();

    const tooltipWidth = 340;
    const tooltipHeight = 265;
    const gap = 18;

    const plotRight = plotRect.right - mapRect.left;
    const plotLeft = plotRect.left - mapRect.left;
    const plotTop = plotRect.top - mapRect.top;

    const plotCenterY = plotTop + plotRect.height / 2;

    const hasRoomOnRight = plotRight + gap + tooltipWidth <= mapRect.width - 16;

    let left = hasRoomOnRight ? plotRight + gap : plotLeft - tooltipWidth - gap;

    left = clamp(left, 16, Math.max(16, mapRect.width - tooltipWidth - 16));

    const top = clamp(
      plotCenterY - tooltipHeight / 2,
      16,
      Math.max(16, mapRect.height - tooltipHeight - 16),
    );

    // Close the previous card first.
    setTooltipVisible(false);

    hoverShowTimerRef.current = window.setTimeout(() => {
      setHoveredPlotNumber(plotNumber);

      setTooltipPosition({
        left,
        top,
      });

      setTooltipAnimationKey((value) => value + 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTooltipVisible(true);
        });
      });
    }, 70);
  };

  const handlePlotMouseLeave = () => {
    if (fullscreen) return;

    if (hoverShowTimerRef.current) {
      clearTimeout(hoverShowTimerRef.current);
    }

    setTooltipVisible(false);

    hoverHideTimerRef.current = window.setTimeout(() => {
      setHoveredPlotNumber(null);
      setTooltipPosition(null);
    }, 180);
  };

  const updateZoom = (nextZoom) => {
    setZoom(clamp(nextZoom, MIN_ZOOM, MAX_ZOOM));
  };

  const resetView = () => {
    setZoom(fullscreen ? fullscreenZoom : 1);

    setSelectedPlotNumber(null);
    setHoveredPlotNumber(null);
    setTooltipPosition(null);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const canvasWidth =
    fullscreen && mapViewportSize.width > 0
      ? `${Math.round(
          mapViewportSize.width * zoom,
        )}px`
      : "100%";

  const canvasHeight =
    fullscreen && mapViewportSize.width > 0
      ? `${Math.round(
          (mapViewportSize.width * zoom) / mapAspectRatioValue,
        )}px`
      : undefined;

  return (
    <div
      className={
        fullscreen
          ? "relative flex h-full min-h-0 flex-col gap-2.5"
          : "space-y-4"
      }
    >
      {/* STATUS LEGEND */}
      <div
        className={`
    border border-[#241E15]
    bg-[#090909]
    shadow-[0_18px_60px_rgba(0,0,0,0.35)]
    ${fullscreen ? "rounded-2xl p-2" : "rounded-[22px] p-3"}
  `}
      >
        <div
          className={
            fullscreen
              ? "flex flex-nowrap items-center gap-1.5"
              : "flex flex-wrap items-center gap-3"
          }
        >
          {legendItems.map((config) => (
            <div
              key={config.label}
              className={`
      inline-flex
      shrink-0
      items-center
      whitespace-nowrap
      rounded-full
      border
      font-semibold
      text-white
      backdrop-blur-md
      transition-all
      duration-200

      ${
        fullscreen
          ? "gap-1.5 px-2.5 py-1.5 text-[11px]"
          : "gap-2.5 px-4 py-2 text-sm lg:hover:-translate-y-0.5"
      }
    `}
              style={{
                borderColor: `${config.color}75`,
                backgroundColor: `${config.color}18`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <span
                className={
                  fullscreen
                    ? "h-2 w-2 shrink-0 rounded-full"
                    : "h-2.5 w-2.5 shrink-0 rounded-full"
                }
                style={{
                  backgroundColor: config.color,
                }}
              />

              <span className="text-white">{config.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE ZOOM */}
      {fullscreen && (
        <div>
          <div
            className="
              ml-auto
              flex
              w-fit
              shrink-0
              items-center
              gap-1
              rounded-xl
              border
              border-[#2C251A]
              bg-[#0C0C0C]
              p-1
              shadow-[0_12px_30px_rgba(0,0,0,0.28)]
            "
          >
            <button
              type="button"
              onClick={() => updateZoom(zoom - ZOOM_STEP)}
              disabled={zoom <= MIN_ZOOM}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-[#D7C39A]
                transition-colors
                duration-200
                hover:bg-[#171717]
                disabled:opacity-35
              "
              aria-label="Zoom out"
            >
              <FaMinus />
            </button>

            <span className="min-w-[58px] text-center text-xs font-semibold text-white">
              {Math.round(zoom * 100)}%
            </span>

            <button
              type="button"
              onClick={() => updateZoom(zoom + ZOOM_STEP)}
              disabled={zoom >= MAX_ZOOM}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-[#D7C39A]
                transition-colors
                duration-200
                hover:bg-[#171717]
                disabled:opacity-35
              "
              aria-label="Zoom in"
            >
              <FaPlus />
            </button>

            <button
              type="button"
              onClick={resetView}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-[#D7C39A]
                transition-colors
                duration-200
                hover:bg-[#171717]
              "
              aria-label="Reset map view"
            >
              <FaRotateLeft />
            </button>
          </div>
        </div>
      )}

      {/* MAP */}
      <div
        ref={scrollRef}
        className={`
    relative
    min-h-0
    min-w-0
    overflow-auto
    ${fullscreen && !canvasHeight ? "flex-1" : ""}
    ${fullscreen ? "flex items-center justify-center" : ""}
    ${fullscreen ? "rounded-[20px]" : "rounded-[24px]"}
    border
    border-[#241E15]
    bg-[#050505]
  `}
        style={
          fullscreen
            ? {
                alignItems: "safe center",
                justifyContent: "safe center",
                ...(canvasHeight
                  ? {
                      height: canvasHeight,
                      flex: "0 1 auto",
                    }
                  : {}),
              }
            : undefined
        }
      >
        <div
          ref={mapContainerRef}
    className="
    relative
    shrink-0
    overflow-hidden
  "
          style={{
            width: canvasWidth,
            aspectRatio: mapAspectRatio,
          }}
        >
          <Image
            src={planImage}
            alt={planAlt}
            fill
            priority={false}
            sizes={fullscreen ? "100vw" : "(max-width: 1024px) 100vw, 100vw"}
            className="select-none object-contain object-center"
            draggable={false}
          />

          {hasGeometry && (
            <svg
              ref={svgRef}
              viewBox={viewBox}
              preserveAspectRatio="xMidYMid meet"
              onClick={handleSvgClick}
              onMouseMove={handlePlotMouseMove}
              onMouseLeave={handlePlotMouseLeave}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={`${planAlt} interactive plot availability map`}
            >
              {geometryPlots.map((shape) => {
                const plotNumber = normalizePlotNumber(shape.plotNumber);

                const inventoryItem = inventoryByPlot.get(plotNumber);

                const visualConfig = inventoryItem
                  ? getPlotVisualState(inventoryItem)
                  : null;

                const isActive = fullscreen
                  ? selectedPlotNumber === plotNumber
                  : hoveredPlotNumber === plotNumber;

                return (
                  <path
                    key={plotNumber}
                    data-plot-number={plotNumber}
                    d={shape.d}
                    fill={visualConfig?.color ?? "transparent"}
                    fillOpacity={visualConfig ? 0.38 : 0}
                    stroke={
                      isActive ? "#F1D28B" : (visualConfig?.color ?? "#8B8175")
                    }
                    strokeWidth={isActive ? 4.5 : 1.6}
                    vectorEffect="non-scaling-stroke"
                    className="
        cursor-pointer
        transition-[fill-opacity,stroke-width]
        duration-200
      "
                    style={{
                      filter: isActive
                        ? "drop-shadow(0 0 10px rgba(221,188,105,0.28))"
                        : "none",
                    }}
                    aria-label={`Plot ${plotNumber}${
                      visualConfig ? `, ${visualConfig.label}` : ""
                    }`}
                  />
                );
              })}
            </svg>
          )}

          {/* DESKTOP HOVER CARD */}
          {!fullscreen && hoveredPlotNumber && tooltipPosition && (
            <div
              key={`${hoveredPlotNumber}-${tooltipAnimationKey}`}
              className={`
        pointer-events-none
        absolute
        z-30
        w-[340px]
        overflow-hidden
        rounded-[26px]
        border
        border-[#DDBC69]/30
        bg-[#0A0A0A]/95
        text-white
        shadow-[0_28px_90px_rgba(0,0,0,0.5)]
        backdrop-blur-xl

        transition-[opacity,transform]
        duration-300
        ease-[cubic-bezier(0.16,1,0.3,1)]

        ${
          tooltipVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-5 scale-[0.96] opacity-0"
        }
      `}
              style={{
                left: tooltipPosition.left,
                top: tooltipPosition.top,
                transformOrigin: "top center",
              }}
              role="status"
            >
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#DDBC69] to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#BDA778]">
                      Plot
                    </p>

                    <h4 className="mt-1 text-[34px] font-semibold leading-none tracking-[-0.03em] text-white">
                      {hoveredPlot?.plotNumber ?? hoveredPlotNumber}
                    </h4>
                  </div>

                  {hoveredVisualConfig && (
                    <span
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold text-white"
                      style={{
                        borderColor: `${hoveredVisualConfig.color}70`,
                        backgroundColor: `${hoveredVisualConfig.color}18`,
                      }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: hoveredVisualConfig.color,
                        }}
                      />

                      {hoveredVisualConfig.label}
                    </span>
                  )}
                </div>

                <div className="my-5 h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5" />

                <dl className="space-y-3.5 text-sm">
                  <div className="flex items-center justify-between gap-5">
                    <dt className="text-[#999187]">Availability</dt>

                    <dd className="font-semibold text-white">
                      {hoveredInventory?.saleStatus === "sold"
                        ? "Sold"
                        : hoveredInventory
                          ? "Available"
                          : "—"}
                    </dd>
                  </div>

                  {usesPlotTier && (
                    <div className="flex items-center justify-between gap-5">
                      <dt className="text-[#999187]">Plot Type</dt>

                      <dd className="font-semibold text-white">
                        {hoveredInventory?.saleStatus === "sold"
                          ? "—"
                          : (hoveredVisualConfig?.label ?? "—")}
                      </dd>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-5">
                    <dt className="text-[#999187]">Area</dt>

                    <dd className="font-semibold text-white">
                      {hoveredPlot?.areaSqYd ?? "—"} sq. yd.
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-5">
                    <dt className="text-[#999187]">Sq Ft</dt>

                    <dd className="font-semibold text-white">
                      {hoveredPlot?.areaSqFt ?? "—"} sq. ft.
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-5">
                    <dt className="text-[#999187]">PLC</dt>

                    <dd className="font-semibold text-white">
                      {hoveredPlot?.plcPerSqYd == null
                        ? "—"
                        : `₹${hoveredPlot.plcPerSqYd}/sq. yd.`}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {!hasGeometry && (
            <div className="pointer-events-none absolute inset-x-3 bottom-3 rounded-lg bg-black/70 px-3 py-2 text-center text-xs text-white">
              Interactive plot boundaries are not available.
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SELECTED CARD */}
      {fullscreen && selectedPlot && (
        <div
          className="
              rounded-[26px]
              border
              border-[#DDBC69]/25
              bg-[#0B0B0B]
              p-4
              text-white
              shadow-[0_18px_60px_rgba(0,0,0,0.35)]
            "
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="mt-1 text-[30px] font-semibold font-inter leading-none">
                Plot {selectedPlot.plotNumber}
              </h4>
            </div>

            {selectedVisualConfig ? (
              <span
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-white
                  "
                style={{
                  borderColor: `${selectedVisualConfig.color}70`,

                  backgroundColor: `${selectedVisualConfig.color}18`,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: selectedVisualConfig.color,
                  }}
                />

                {selectedVisualConfig.label}
              </span>
            ) : (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white">
                Status unavailable
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-white/10 bg-[#121212] p-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#9F988D]">
                Area
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                {selectedPlot.areaSqYd} sq. yd.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121212] p-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#9F988D]">
                Sq Ft
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                {selectedPlot.areaSqFt} sq. ft.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121212] p-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#9F988D]">
                PLC
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                ₹{selectedPlot.plcPerSqYd}
                /sq. yd.
              </p>
            </div>
          </div>
        </div>
      )}

      {loadError && (
        <p className="text-xs text-[#F87171]">
          Live plot status could not be loaded. The plan remains available for
          viewing.
        </p>
      )}
    </div>
  );
};

export default PlotMapViewer;
