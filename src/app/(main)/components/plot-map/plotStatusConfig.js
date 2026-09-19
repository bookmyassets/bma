export const PLOT_VISUAL_CONFIG = {
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

  return null;
};