export const WESTWYN_SECTION_SURFACES = {
  base: "bg-[#101010]",
  alt: "bg-[#161616]",
};

export function getWestwynSectionSurface(surface = "base") {
  return (
    WESTWYN_SECTION_SURFACES[surface] ??
    WESTWYN_SECTION_SURFACES.base
  );
}