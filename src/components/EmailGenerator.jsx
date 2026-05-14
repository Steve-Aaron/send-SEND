import React, { useState, useEffect } from 'react';
import { Send, ArrowLeft, ChevronDown } from 'lucide-react';
import { getLetter, ALL_ROLES, PROFESSIONAL_ROLES, PARENT_SUBTYPES } from '../letters/index.js';
import { trackEmailOpen } from '../utils/analytics.js';

/**
 * EmailGenerator Component
 * Handles role selection, parent sub-type selection, user details form,
 * live email preview, and mailto/Gmail/Outlook launch links.
 */
export function EmailGenerator({ mpData, postcode, onBack }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [parentSubtype, setParentSubtype] = useState('no_specialist_school_personalisation_selected');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    phone: '',
    schoolName: '',
  });
  const [customBody, setCustomBody] = useState(null);

  const isProfessional = PROFESSIONAL_ROLES.includes(selectedRole);
  const isParent = selectedRole === 'Parent';

  // Reset custom edits whenever the template changes
  useEffect(() => {
    setCustomBody(null);
  }, [selectedRole, parentSubtype]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Generate letter from current state
  const { subject, body: generatedBody } = selectedRole
    ? getLetter({
        role: selectedRole,
        parentSubtype,
        mpName: mpData.name,
        constituency: mpData.constituency,
        formData,
        postcode,
      })
    : { subject: '', body: '' };

  const currentBody = customBody !== null ? customBody : generatedBody;

  // Validation — professionals don't need an address; everyone needs name + email + role
  const isFormValid =
    selectedRole.trim() &&
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    (isProfessional || formData.address1.trim());

  const handleEmailOpen = (client) => {
    trackEmailOpen({
      client,
      role: selectedRole,
      parentSubtype: isParent ? parentSubtype : null,
      schoolName: isProfessional ? formData.schoolName : null,
      mpData,
      emailEdited: customBody !== null,
    });
  };

  const inputClass =
    'w-full bg-white border border-border-strong rounded-lg px-3 py-2 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-sm';

  const selectClass =
    'w-full bg-white border border-border-strong rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-sm appearance-none cursor-pointer';

  return (
    <div className="space-y-6 relative z-10 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-serif font-bold text-brand mb-2">SEND your say</h3>
        <p className="text-text-secondary text-sm">
          Complete your details and we will prepare a personalised email for you to send.
        </p>
      </div>

      <div className="space-y-5">

        {/* ── Role selector ── */}
        <div>
          <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
            I am a... *
          </label>
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setParentSubtype('no_specialist_school_personalisation_selected');
              }}
              className={selectClass}
              required
            >
              <option value="" disabled>Select your role</option>
              {ALL_ROLES.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          </div>
        </div>

        {/* ── Parent sub-type (conditional) ── */}
        {isParent && (
          <div className="bg-brand/5 border border-brand/20 rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-brand">Which best describes your situation?</p>
            {PARENT_SUBTYPES.map((opt) => (
              <label key={opt.value} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="parentSubtype"
                  value={opt.value}
                  checked={parentSubtype === opt.value}
                  onChange={() => setParentSubtype(opt.value)}
                  className="mt-0.5 shrink-0 w-4 h-4 accent-brand cursor-pointer"
                />
                <span className="text-sm text-text-primary group-hover:text-brand transition-colors leading-snug">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* ── Name ── */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Surname"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* ── Email ── */}
        <div>
          <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane.doe@example.com"
            className={inputClass}
            required
          />
        </div>

        {/* ── School name (professionals only) ── */}
        {isProfessional && (
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
              School Name
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="Your school or setting"
              className={inputClass}
            />
          </div>
        )}

        {/* ── Address (parents and public only) ── */}
        {!isProfessional && selectedRole && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Address Line 1 *
              </label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                placeholder="123 Example Street"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="Town or city"
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* ── Postcode + Phone ── */}
        {selectedRole && (
          <div className="grid grid-cols-2 gap-3">
            {!isProfessional && (
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                  Postcode
                </label>
                <input
                  type="text"
                  value={postcode.toUpperCase()}
                  disabled
                  className={`${inputClass} bg-bg-subtle cursor-not-allowed uppercase font-medium`}
                />
              </div>
            )}
            <div className={isProfessional ? 'col-span-2' : ''}>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="07700 900000"
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* ── Letter preview (only shown once a role is selected) ── */}
        {selectedRole && (
          <div className="bg-bg-subtle rounded-xl border border-border-subtle p-4 relative mt-2">
            <div className="absolute top-0 right-0 p-2 text-xs font-bold text-brand uppercase tracking-widest bg-white border-b border-l border-border-subtle rounded-bl-lg rounded-tr-xl flex items-center gap-2 z-10">
              PREVIEW
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: mpData.partyColor }}
              />
            </div>
            <textarea
              value={currentBody}
              onChange={(e) => setCustomBody(e.target.value)}
              className="w-full bg-transparent text-text-primary text-sm font-sans h-64 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white border border-transparent focus:border-accent hover:border-border-strong rounded-lg p-3 resize-y custom-scrollbar mt-6 transition-all"
            />
            {customBody !== null && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setCustomBody(null)}
                  className="text-xs text-text-secondary hover:text-accent font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  ↺ Reset to template
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Send buttons ── */}
        {selectedRole && (
          <div className="pt-4 space-y-3 border-t border-border-subtle">
            <p className="text-center text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">
              Send Using Your Preferred App:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={
                  mpData.email
                    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${mpData.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(currentBody)}`
                    : '#'
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleEmailOpen('gmail')}
                className={`bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl py-2.5 font-bold transition-all flex items-center justify-center gap-2 ${!isFormValid || !mpData.email ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
              >
                Gmail
              </a>
              <a
                href={
                  mpData.email
                    ? `https://outlook.live.com/mail/0/deeplink/compose?to=${mpData.email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(currentBody)}`
                    : '#'
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleEmailOpen('outlook')}
                className={`bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl py-2.5 font-bold transition-all flex items-center justify-center gap-2 ${!isFormValid || !mpData.email ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
              >
                Outlook
              </a>
            </div>
            <a
              href={
                mpData.email
                  ? `mailto:${mpData.email}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(currentBody.trim())}`
                  : '#'
              }
              onClick={() => handleEmailOpen('mailto')}
              className={`w-full bg-accent hover:bg-accent-hover text-white shadow-lg rounded-xl py-4 font-bold transition-all flex items-center justify-center gap-2 ${!isFormValid || !mpData.email ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
            >
              <Send className="w-5 h-5" /> Open Default App
            </a>

            {!mpData.email && (
              <p className="text-red-600 text-sm text-center mt-2 font-medium">
                This MP's email is not currently available. Please try again later.
              </p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        className="text-text-secondary hover:text-brand text-sm font-medium transition-colors flex items-center justify-center gap-2 w-full mt-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Start again
      </button>
    </div>
  );
}
