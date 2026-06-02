const LEAD_SOURCE_KEY = "bma_lead_source";
const DEFAULT_SOURCE = "BookMyAssets";

const getFirstTwoWords = (value = "") => {
  return value.split("-").filter(Boolean).slice(0, 2).join(" ");
};

const getPathSource = (pathname = "") => {
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "dholera-sir-blogs") {
    const slug = getFirstTwoWords(parts[1]);
    return slug ? `BookMyAssets Blogs ${slug}` : "BookMyAssets Blogs";
  }

  if (parts[0] === "dholera-sir-updates") {
    const slug = getFirstTwoWords(parts[1]);
    return slug ? `BookMyAssets Updates ${slug}` : "BookMyAssets Updates";
  }

  if (parts[0] === "about-dholera-sir") {
    const slug = getFirstTwoWords(parts[1]);
    return slug
      ? `BookMyAssets Dholera SIR ${slug}`
      : "BookMyAssets Dholera SIR";
  }

  return null;
};

const getUrlSourceDetails = (fallbackSource = DEFAULT_SOURCE) => {
  if (typeof window === "undefined") {
    return {
      source: fallbackSource,
      priority: 0,
    };
  }

  const url = new URL(window.location.href);
  const params = url.searchParams;

  const src = params.get("src")?.toLowerCase();

  if (src === "fb" || src === "facebook" || src === "meta_fb") {
    return {
      source: "BookMyAssets Meta FB",
      priority: 3,
    };
  }

  if (src === "ig" || src === "instagram" || src === "meta_ig") {
    return {
      source: "BookMyAssets Meta IG",
      priority: 3,
    };
  }

  if (src === "twitter" || src === "x") {
    return {
      source: "BookMyAssets Twitter Ads",
      priority: 3,
    };
  }

  if (src === "google") {
    return {
      source: "BookMyAssets Google Ads",
      priority: 3,
    };
  }

  if (params.has("fbclid")) {
    return {
      source: "BookMyAssets Meta Ads",
      priority: 3,
    };
  }

  if (params.has("twclid")) {
    return {
      source: "BookMyAssets Twitter Ads",
      priority: 3,
    };
  }

  if (
    params.has("gclid") ||
    params.has("gbraid") ||
    params.has("wbraid") ||
    params.has("gad_source")
  ) {
    return {
      source: "BookMyAssets Google Ads",
      priority: 3,
    };
  }

  const pathSource = getPathSource(url.pathname);

  if (pathSource) {
    return {
      source: pathSource,
      priority: 1,
    };
  }

  return {
    source: fallbackSource,
    priority: 0,
  };
};

export const captureLeadSource = (fallbackSource = DEFAULT_SOURCE) => {
  if (typeof window === "undefined") return;

  const currentSource = getUrlSourceDetails(fallbackSource);
  const savedSource = localStorage.getItem(LEAD_SOURCE_KEY);

  if (currentSource.priority === 3) {
    localStorage.setItem(LEAD_SOURCE_KEY, currentSource.source);
    return;
  }

  if (currentSource.priority === 1 && !savedSource) {
    localStorage.setItem(LEAD_SOURCE_KEY, currentSource.source);
  }
};

export const getLeadSource = (fallbackSource = DEFAULT_SOURCE) => {
  if (typeof window === "undefined") return fallbackSource;

  const currentSource = getUrlSourceDetails(fallbackSource);
  const savedSource = localStorage.getItem(LEAD_SOURCE_KEY);

  if (currentSource.priority === 3) {
    localStorage.setItem(LEAD_SOURCE_KEY, currentSource.source);
    return currentSource.source;
  }

  if (savedSource) {
    return savedSource;
  }

  if (currentSource.priority === 1) {
    return currentSource.source;
  }

  return fallbackSource;
};
