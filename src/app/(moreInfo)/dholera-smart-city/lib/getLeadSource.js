export default function getLeadSource() {
  if (typeof window === "undefined") return "BookMyAssets Twitter Ads";

  const params = new URLSearchParams(window.location.search);

  const utmSource = params.get("utm_source")?.toLowerCase();
  const utmCampaign = params.get("utm_campaign");

  if (params.has("twclid") || utmSource === "twitter" || utmSource === "x") {
    if (utmCampaign) {
      const campaign = utmCampaign
        .split("-")
        .filter(Boolean)
        .slice(0, 2)
        .join(" ");
      return campaign
        ? `BookMyAssets Twitter ${campaign}`
        : "BookMyAssets Twitter Ads";
    }
    return "BookMyAssets Twitter Ads";
  }

  return "BookMyAssets Twitter Ads";
}


;