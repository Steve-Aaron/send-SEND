/**
 * Analytics Utility for GA4 / GTM
 * Provides helper functions for tracking custom events.
 */

export const trackPostcodeLookup = (postcode, mpData) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "postcode_lookup",
      postcode: postcode.toUpperCase(),
      constituency: mpData?.constituency || "Unknown",
      mp_name: mpData?.name || "Unknown",
      party: mpData?.party || "Unknown"
    });
  }
};
