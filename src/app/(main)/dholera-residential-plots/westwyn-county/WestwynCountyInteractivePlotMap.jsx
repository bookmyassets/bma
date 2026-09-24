"use client";

import PlotMapViewer from "@/app/(main)/components/plot-map/PlotMapViewer";

import planImage from "@/assests/westwyn-county/westwyn-county-inventory.svg";

import { westWynCountyPlotInventory } from "./data/PlotInventoryData";

import { westwynCountyPlotGeometry } from "./data/WestwynCountyPlotGeometry";

const WestwynCountyInteractivePlotMap = ({
  fullscreen = false,
}) => {
  return (
    <PlotMapViewer
      projectSlug="westwyn-county"
      planImage={planImage}
      planAlt="WestWyn County master plan layout"
      geometry={westwynCountyPlotGeometry}
      plots={westWynCountyPlotInventory}
      fullscreen={fullscreen}
      initialFullscreenZoom={2}
      usesPlotTier={false}
    />
  );
};

export default WestwynCountyInteractivePlotMap;
