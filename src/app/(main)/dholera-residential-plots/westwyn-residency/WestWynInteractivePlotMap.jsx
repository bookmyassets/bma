"use client";

import PlotMapViewer from "@/app/(main)/components/plot-map/PlotMapViewer";

import planImage from "@/assests/residential/residency/westwyn-residency-inventory.svg";

import { westWynResidencyPlotInventory } from "./data/PlotInventoryData";
import { westwynPlotGeometry } from "./data/WestwynPlotGeometry";

const WestWynInteractivePlotMap = ({ fullscreen = false }) => {
  return (
    <PlotMapViewer
      projectSlug="westwyn-residency"
      planImage={planImage}
      planAlt="WestWyn Residency master plan layout"
      geometry={westwynPlotGeometry}
      plots={westWynResidencyPlotInventory}
      fullscreen={fullscreen}
    />
  );
};

export default WestWynInteractivePlotMap;
