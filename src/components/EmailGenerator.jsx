import React, { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { trackEmailOpen } from "../utils/analytics.js";

/**
 * EmailGenerator Component
 * Handles letter selection, user details form, live preview, and email launch links.
 * Three personalisation options via radio buttons; defaults to a general letter.
 */
export function EmailGenerator({ mpData, postcode, onBack }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    phone: "",
    jobTitle: "",
    schoolName: "",
  });

  const [selectedLetter, setSelectedLetter] = useState(0);
  const [customBody, setCustomBody] = useState(null);

  const isProfessional = selectedLetter === 3;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLetterSelect = (id) => {
    setSelectedLetter(id);
    setCustomBody(null);
  };

  // ── Letter templates ────────────────────────────────────────────────────────

  const subjects = {
    0: "Please protect children with complex SEND needs as legislation moves through Parliament",
    1: "Please protect specialist SEND provision as legislation moves through Parliament",
    2: "Please protect access to specialist SEND placements",
    3: "Please protect specialist SEND provision for children with complex needs",
  };
  const subject = subjects[selectedLetter] || subjects[0];

  const signOff = isProfessional
    ? `Yours sincerely,

${formData.firstName || "[First Name]"} ${formData.lastName || "[Last Name]"},
${formData.jobTitle || "[Job Title]"} at ${formData.schoolName || "[School Name]"},
${formData.address1 ? formData.address1 + "," : "[Address Line 1]"}
${formData.address2 ? formData.address2 + "," : ""}
${(postcode || "").toUpperCase()}

${formData.email ? "Email: " + formData.email : ""}
${formData.phone ? "Tel: " + formData.phone : ""}
Your Constituent in ${mpData.constituency}`
    : `Yours sincerely,

${formData.firstName || "[First Name]"} ${formData.lastName || "[Last Name]"}
${formData.address1 ? formData.address1 + "," : "[Address Line 1],"}
${formData.address2 ? formData.address2 + "," : ""}
${(postcode || "").toUpperCase()}
${formData.phone ? "Tel: " + formData.phone : ""}
${formData.email ? "Email: " + formData.email : ""}
Your Constituent in ${mpData.constituency}`;

  // Shared body — identical across all four letters; only the opening line and
  // subject differ (the teacher letter also carries role/school placeholders).
  const sharedBody = `The Government's consultation on changes to the SEND system has now closed. As proposals are reviewed and any legislation moves through Parliament, I hope you will help ensure that children with the most complex needs are not overlooked.

Improving support for children and families is essential. Earlier help, better mainstream support and a simpler system would be welcomed by many families.

But some children have needs that cannot be met safely or effectively in mainstream schools. Many have already experienced failed placements, exclusions, trauma or long periods out of education before finally finding specialist support that helps them feel safe, settled and able to learn.

For these children, specialist provision is not a preference. It is often the only place where they can receive the care, structure, therapy and expertise they need.

I am concerned that broad changes to the SEND system, without proper safeguards, could make some specialist placements harder to access or maintain. Specialist provision is currently delivered through a mix of state and independent schools. Independent specialist schools play a vital role, particularly in areas where there are not enough state special school places.

I understand that the Government is considering limits on what independent specialist schools can charge. While the aim may be to control costs, there is a real risk that this could make some provision financially unviable. If that leads to school closures, some of the most vulnerable children could be left without suitable education.

These schools are often important local employers, rooted in their communities. Their costs reflect the complex support many children need, including therapy, specialist equipment, high staffing levels and one-to-one care.

I completely understand that funding decisions are difficult. But failing to invest in the right support now can create far greater costs later. The Government spends almost £180,000 a year for each 15 to 17 year old placed in a male young offender institution, more than double the annual cost of many independent specialist school placements for children with the most complex needs.

In England and Wales, up to 80% of children cautioned or sentenced within the youth justice system have SEND or are neurodivergent. This is not because SEND children are predisposed to offend. It is because unmet needs can lead to crisis, exclusion and behaviour that the system then punishes.

There is also a strong positive case for investing early. Sufficient investment in provision that meets the needs of learners with complex SEND could yield an average of at least £380,000 per learner across their lifetime in value to society, after accounting for the cost of their education. Much of that value comes through the economy, but also through reduced pressure on local authorities, the NHS, police and justice services.

The impact of school closures would not only be felt by children and families. It would also place extra pressure on mainstream schools and teachers, who are already working hard to support a wide range of needs.

Mainstream inclusion is right for many children, and many children with SEND can and should flourish in mainstream education. But for those with the most complex needs, inclusion in the wrong setting can become exclusion in practice. It can leave children unable to learn, unsafe, overwhelmed and pushed further away from education, employment and society.

Please raise this issue with the Department for Education and scrutinise any legislation carefully as it moves through Parliament.

Changes to the SEND system are needed, but they must protect children's legal rights and ensure every child can access the support and setting they need.

Thank you for taking the time to read this. I would welcome your response.`;

  const openings = {
    0: "I am writing as a constituent who cares deeply about the future of children with special educational needs and disabilities.",
    1: "I am writing to you as a constituent and as a parent of a child who currently attends a specialist SEND school.",
    2: "I am writing to you as a constituent and as a parent trying to secure the right specialist education for my child.",
    3: `I am writing to you as a ${formData.jobTitle || "[teacher / teaching assistant / pastoral support worker / member of staff]"} at ${formData.schoolName || "[School Name]"}, a [specialist SEND / mainstream] school, and as a constituent in ${mpData.constituency}.`,
  };

  const buildLetter = (id) =>
    `Dear ${mpData.name},\n\n${openings[id]}\n\n${sharedBody}\n\n${signOff}`;

  const letterBodies = {
    0: buildLetter(0),
    1: buildLetter(1),
    2: buildLetter(2),
    3: buildLetter(3),
  };

  const generatedBody = letterBodies[selectedLetter];
  const currentBody = customBody !== null ? customBody : generatedBody;

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.address1.trim();

  const inputClass =
    "w-full bg-white border border-border-strong rounded-lg px-3 py-2 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-sm";

  const letterOptions = [
    { id: 1, label: "For parents with a child currently at a specialist school" },
    { id: 2, label: "For parents hoping to get their child into a specialist school" },
    { id: 3, label: "A teaching professional" },
  ];

  return (
    <div className="space-y-6 relative z-10 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-serif font-bold text-brand mb-2">
          SEND your say
        </h3>
        <p className="text-text-secondary text-sm">
          Please complete your details. You can edit the email in your email
          client before sending.
        </p>
      </div>

      <div className="space-y-5">

        {/* ── Personal details ── */}
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

        {/* ── Professional fields ── */}
        {isProfessional && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Class Teacher"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                School Name *
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
          </div>
        )}

        {/* ── Address ── */}
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

        <div className="grid grid-cols-2 gap-3">
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
          <div>
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

        {/* ── Letter personalisation ── */}
        <div className="bg-brand/5 border border-brand/20 rounded-xl p-5 mt-6">
          <p className="text-sm text-text-primary mb-4 font-medium leading-relaxed">
            Select the option that best describes you to personalise your email,
            or leave unselected to use the general letter.
          </p>
          <div className="space-y-3">
            {letterOptions.map((opt) => (
              <label key={opt.id} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="letterType"
                  checked={selectedLetter === opt.id}
                  onChange={() => handleLetterSelect(opt.id)}
                  className="w-4 h-4 mt-0.5 shrink-0 accent-brand cursor-pointer"
                />
                <span className="text-sm font-medium text-text-primary group-hover:text-brand transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Letter preview ── */}
        <div className="bg-bg-subtle rounded-xl border border-border-subtle p-4 relative mt-6">
          <div className="absolute top-0 right-0 p-2 text-xs font-bold text-brand uppercase tracking-widest bg-white border-b border-l border-border-subtle rounded-bl-lg rounded-tr-xl flex items-center gap-2 z-10">
            PREVIEW{" "}
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

        {/* ── Send buttons ── */}
        <div className="pt-4 space-y-3 border-t border-border-subtle">
          <p className="text-center text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">
            Send Using Your Preferred App:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={
                mpData.email
                  ? `https://mail.google.com/mail/?view=cm&fs=1&to=${mpData.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(currentBody)}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEmailOpen({ client: "gmail", selectedLetter, mpData, emailEdited: customBody !== null, jobTitle: formData.jobTitle, schoolName: formData.schoolName })}
              className={`bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl py-2.5 font-bold transition-all flex items-center justify-center gap-2 ${!isFormValid || !mpData.email ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
            >
              Gmail
            </a>
            <a
              href={
                mpData.email
                  ? `https://outlook.live.com/mail/0/deeplink/compose?to=${mpData.email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(currentBody)}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEmailOpen({ client: "outlook", selectedLetter, mpData, emailEdited: customBody !== null, jobTitle: formData.jobTitle, schoolName: formData.schoolName })}
              className={`bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl py-2.5 font-bold transition-all flex items-center justify-center gap-2 ${!isFormValid || !mpData.email ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
            >
              Outlook
            </a>
          </div>
          <a
            href={
              mpData.email
                ? `mailto:${mpData.email}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(currentBody.trim())}`
                : "#"
            }
            onClick={() => trackEmailOpen({ client: "mailto", selectedLetter, mpData, emailEdited: customBody !== null, jobTitle: formData.jobTitle, schoolName: formData.schoolName })}
            className={`w-full bg-accent hover:bg-accent-hover text-white shadow-lg rounded-xl py-4 font-bold transition-all flex items-center justify-center gap-2 ${!isFormValid || !mpData.email ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
          >
            <Send className="w-5 h-5" /> Open Default App
          </a>

          {!mpData.email && (
            <p className="text-red-600 text-sm text-center mt-2 font-medium">
              This MP's email is not currently available. Please try again later.
            </p>
          )}
        </div>
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
