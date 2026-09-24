export const PLOT_INVENTORY_PROJECTS = [
  {
    title: "WestWyn Residency",
    value: "westwyn-residency",
    minPlotNumber: 1,
    maxPlotNumber: 290,
    expectedPlotCount: 290,
    usesPlotTier: true,
  },

  {
    title: "WestWyn Estates",
    value: "westwyn-estate",
    minPlotNumber: 101,
    maxPlotNumber: 229,
    expectedPlotCount: 129,
    usesPlotTier: false,
  },
  {
    title: "WestWyn County",
    value: "westwyn-county",
    minPlotNumber: 1,
    maxPlotNumber: 126,
    expectedPlotCount: 130,
    usesPlotTier: false,
  },
];

export const getPlotInventoryProject = (projectSlug) =>
  PLOT_INVENTORY_PROJECTS.find((project) => project.value === projectSlug);

export const getPlotInventoryProjectOptions = () =>
  PLOT_INVENTORY_PROJECTS.map(({ title, value }) => ({
    title,
    value,
  }));
