export const PLOT_VISUAL_CONFIG = {
  available: {
  label: "Available",
  color: "#22C55E",
},

  premium: {
    label: "Premium",
    color: "#E8DDC6",
  },

  superPremium: {
    label: "Super Premium",
    color: "#DDBC69",
  },

  sold: {
    label: "Sold",
    color: "#DC2626",
  },
};

export const getPlotVisualState = ({
  saleStatus,
  plotTier,
}) => {
  if (saleStatus === "sold") {
    return PLOT_VISUAL_CONFIG.sold;
  }

  if (plotTier === "superPremium") {
    return PLOT_VISUAL_CONFIG.superPremium;
  }

  if (plotTier === "premium") {
    return PLOT_VISUAL_CONFIG.premium;
  }

  if (saleStatus === "available") {
    return PLOT_VISUAL_CONFIG.available;
  }

  return null;
};

export const getPlotLegendItems = ({
  usesPlotTier = true,
} = {}) => {
  if (usesPlotTier) {
    return [
      PLOT_VISUAL_CONFIG.premium,
      PLOT_VISUAL_CONFIG.superPremium,
      PLOT_VISUAL_CONFIG.sold,
    ];
  }

  return [
    PLOT_VISUAL_CONFIG.available,
    PLOT_VISUAL_CONFIG.sold,
  ];
};