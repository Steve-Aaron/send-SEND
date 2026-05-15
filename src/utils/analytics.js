/**
 * Analytics Utility for GA4
 * Provides helper functions for tracking custom events via gtag().
 *
 * Events fired:
 *  - postcode_lookup  : user finds their MP
 *  - email_open       : user clicks a send button to open their email client
 */

export const trackPostcodeLookup = (postcode, mpData) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "postcode_lookup", {
      postcode: postcode.toUpperCase(),
      constituency: mpData?.constituency || "Unknown",
      mp_name: mpData?.name || "Unknown",
      party: mpData?.party || "Unknown",
    });
  }
};

const LETTER_VARIANT_LABELS = {
  0: "general",
  1: "parent_child_in_specialist_school",
  2: "parent_seeking_specialist_school",
  3: "teaching_professional",
};

/**
 * Fired when the user clicks one of the three send buttons.
 *
 * @param {Object}  params
 * @param {'gmail'|'outlook'|'mailto'} params.client
 * @param {0|1|2|3} params.selectedLetter
 * @param {Object}  params.mpData
 * @param {boolean} params.emailEdited  - true if the user modified the template text
 * @param {string}  params.jobTitle     - populated for teaching professionals only
 * @param {string}  params.schoolName   - populated for teaching professionals only
 */
export const trackEmailOpen = ({ client, selectedLetter, mpData, emailEdited, jobTitle, schoolName }) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "email_open", {
      email_client: client,
      letter_variant: LETTER_VARIANT_LABELS[selectedLetter] ?? "general",
      constituency: mpData?.constituency || "Unknown",
      mp_name: mpData?.name || "Unknown",
      party: mpData?.party || "Unknown",
      email_edited: emailEdited,
      job_title: jobTitle || null,
      school_name: schoolName || null,
    });
  }
};
