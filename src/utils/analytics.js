/**
 * Analytics Utility for GA4 / GTM
 * Provides helper functions for tracking custom events.
 *
 * Events fired:
 *  - postcode_lookup  : user finds their MP
 *  - email_open       : user clicks a send button to open their email client
 */

export const trackPostcodeLookup = (postcode, mpData) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "postcode_lookup",
      postcode: postcode.toUpperCase(),
      constituency: mpData?.constituency || "Unknown",
      mp_name: mpData?.name || "Unknown",
      party: mpData?.party || "Unknown",
    });
  }
};

/**
 * Fired when the user clicks one of the three send buttons.
 *
 * @param {Object} params
 * @param {'gmail'|'outlook'|'mailto'} params.client      - Which email client was chosen
 * @param {string}  params.role                           - e.g. 'Class Teacher', 'Parent'
 * @param {string|null} params.parentSubtype              - 'general' | 'specialist-current' | 'specialist-seeking' (Parent only)
 * @param {string|null} params.schoolName                 - School name (professional roles only)
 * @param {Object}  params.mpData                         - MP data from parliament API
 * @param {boolean} params.emailEdited                    - Whether the user modified the template text
 */
export const trackEmailOpen = ({ client, role, parentSubtype, schoolName, mpData, emailEdited }) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "email_open",
      email_client: client,
      job_title: role,
      parent_subtype: parentSubtype || null,
      school_name: schoolName || null,
      constituency: mpData?.constituency || "Unknown",
      mp_name: mpData?.name || "Unknown",
      party: mpData?.party || "Unknown",
      email_edited: emailEdited,
    });
  }
};
