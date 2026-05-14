/**
 * Letter resolver — maps a user's role (and optional parent sub-type)
 * to the correct letter template function.
 */

import { getPublicLetter } from './letter-public.js';
import { getParentGeneralLetter } from './letter-parent-general.js';
import { getParentSpecialistCurrentLetter } from './letter-parent-specialist-current.js';
import { getParentSpecialistSeekingLetter } from './letter-parent-specialist-seeking.js';
import { getProfessionalLetter } from './letter-professional.js';

export const PROFESSIONAL_ROLES = [
  'Class Teacher',
  'SEN Teacher',
  'Subject Teacher',
  'Teaching Assistant',
  'Pastoral Support Worker',
];

export const PARENT_SUBTYPES = [
  { value: 'no_specialist_school_personalisation_selected', label: 'Neither of the above' },
  { value: 'child_currently_in_specialist_school', label: 'My child currently attends a specialist school' },
  { value: 'seeking_placement_for_child_in_specialist_school', label: 'I am hoping to get my child into a specialist school' },
];

export const ALL_ROLES = [
  ...PROFESSIONAL_ROLES,
  'Parent',
  'Member of the Public',
];

/**
 * Returns { subject, body } for the given role and context.
 *
 * @param {Object} params
 * @param {string} params.role         - Selected role from ALL_ROLES
 * @param {string} params.parentSubtype - 'general' | 'specialist-current' | 'specialist-seeking'
 * @param {string} params.mpName
 * @param {string} params.constituency
 * @param {Object} params.formData
 * @param {string} params.postcode
 */
export function getLetter({ role, parentSubtype = 'general', mpName, constituency, formData, postcode }) {
  if (PROFESSIONAL_ROLES.includes(role)) {
    return getProfessionalLetter({ mpName, constituency, formData, role });
  }

  if (role === 'Parent') {
    if (parentSubtype === 'child_currently_in_specialist_school') {
      return getParentSpecialistCurrentLetter({ mpName, constituency, formData, postcode });
    }
    if (parentSubtype === 'seeking_placement_for_child_in_specialist_school') {
      return getParentSpecialistSeekingLetter({ mpName, constituency, formData, postcode });
    }
    return getParentGeneralLetter({ mpName, constituency, formData, postcode });
  }

  // Default: Member of the Public (or any unrecognised role)
  return getPublicLetter({ mpName, constituency, formData, postcode });
}
