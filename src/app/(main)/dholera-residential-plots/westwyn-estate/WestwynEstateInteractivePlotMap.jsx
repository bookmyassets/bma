"use client";

import PlotMapViewer from "@/app/(main)/components/plot-map/PlotMapViewer";

import planImage from "@/assests/residential/estates/westwyn-estate-inventory.svg";

import { westWynEstatePlotInventory } from "./data/PlotInventoryData";

import { westwynEstatePlotGeometry } from "./data/WestwynEstatePlotGeometry";

const WestwynEstateInteractivePlotMap = ({
  fullscreen = false,
}) => {
  return (
    <PlotMapViewer
      projectSlug="westwyn-estate"
      planImage={planImage}
      planAlt="WestWyn Estates master plan layout"
      geometry={
        westwynEstatePlotGeometry
      }
      plots={
        westWynEstatePlotInventory
      }
      fullscreen={fullscreen}
      usesPlotTier={false}
    />
  );
};

export default WestwynEstateInteractivePlotMap;