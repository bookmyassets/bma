export const westwynCountyInventoryStatus = [
  ...Array.from(
    { length: 126 },
    (_, index) => ({
      plotNumber: index + 1,
      saleStatus: "sold",
    }),
  ),

  {
    plotNumber: "70A",
    saleStatus: "sold",
  },
  {
    plotNumber: "70B",
    saleStatus: "sold",
  },
  {
    plotNumber: "70C",
    saleStatus: "sold",
  },
  {
    plotNumber: "70D",
    saleStatus: "sold",
  },
];

export default westwynCountyInventoryStatus;