export function trackEvent(eventName, data = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    landing_page: "dholera_smart_city_plots",
    ...data,
  });
}