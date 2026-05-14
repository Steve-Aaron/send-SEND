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

  const subject = selectedLetter === 3
    ? `Urgent concerns about the impact of SEND reforms on children with complex needs`
    : `SEND reforms – protecting children with the most complex needs`;

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

  const letterBodies = {
    // Default — general constituent
    0: `Dear ${mpData.name} MP,

I am writing to you as a constituent who cares deeply about the future of children with special educational needs and disabilities.

I understand that the Government is consulting on reforms to the SEND system. Improving support for children and families is clearly essential, and many people will welcome efforts to make the system work better.

At the same time, I hope reforms will recognise that some children have extremely complex needs. These are some of the most vulnerable children in our communities. Many have already struggled in several different schools before finally finding the specialist support that helps them feel safe, settled and able to learn.

For these children, mainstream school is simply not an option — it is not able to meet their needs safely or effectively. Specialist provision is not a preference. It is often the only setting where they can receive the care, structure and expertise they require.

I am concerned that overall changes to the system, without properly understanding what these most vulnerable children need, could unintentionally make some of these placements harder to provide. If that were to happen, children who have already experienced multiple failed placements could once again find themselves without the support they need.

If this specialist provision is lost for these children, it would not only affect them and their families. It would also place additional pressure on mainstream schools and teachers, who are already working hard to support a wide range of needs in their classrooms.

Reform of the SEND system is clearly needed, but it must protect access to specialist provision for children with the most complex needs.

As my local MP in ${mpData.constituency}, I would be grateful if you could raise this issue with the Department for Education and ensure that the practical implications for children, families and schools are properly considered as the consultation progresses.

Thank you for taking the time to read this. I look forward to hearing from you.

${signOff}`,

    // Option 1 — parent, child currently in specialist school
    1: `Dear ${mpData.name} MP,

I am writing to you as a constituent and as a parent of a child who currently attends a specialist SEND school. I care deeply about the future of children with special educational needs and disabilities.

I know the Government is consulting on reforms to the SEND system. While it is important to improve support for children and families, I am worried that some of the changes could make it much harder to get and keep specialist school places, especially for children with the most complex needs.

My child has already been through several failed placements in other schools. Mainstream school is simply not able to meet their needs safely or effectively. It is only in a specialist school that they feel safe, settled, and able to learn. For these children, specialist provision is not a luxury or a preference. It is a necessity.

I am concerned that broad changes to the system, without properly understanding the needs of this small group of very vulnerable children, could reduce access to specialist places. If that happens, children who have already suffered a lot of trauma could be left without the right support. This would also put extra pressure on mainstream schools and teachers, who are already doing their best.

Specialist provision gives much better outcomes and costs far less in the long run than failing these children. I understand that a child like mine who does not get the right support can end up costing taxpayers much more through healthcare, youth offending institutions (over £180,000 a year), or long-term benefit costs and loss of tax. With the right help, these children can learn, thrive, and give back to society.

Reform is needed, but it must protect specialist provision for the children who really need it. Losing this vital support would hurt the children, their families, and schools across our area.

As my local MP, I would be grateful if you could raise these concerns with the Department for Education. Please make sure the real impact on the most vulnerable children, their families, and schools is properly considered during the consultation.

Thank you for taking the time to read my letter. I would welcome any reply on how you plan to support this issue.

${signOff}`,

    // Option 2 — parent, hoping to get child into specialist school
    2: `Dear ${mpData.name} MP,

I am writing to you as a constituent and as a parent who is fighting to get my child the specialist education they desperately need. I have a child with complex SEND and I am very worried about the current Government consultation on SEND reforms.

I know from my own experience both the good and bad sides of being wired differently. That is why I strongly support specialist provision for children whose needs cannot be met in mainstream schools.

Inclusion in mainstream school sounds good in theory, but for some children with extreme anxiety, trauma, sensory issues, and challenging behaviour, the noisy and busy environment can be overwhelming and damaging. My child has already struggled in previous settings. A specialist school is not a luxury or a preference. It is the only place where they can feel safe and make real progress.

I am worried that these reforms could make it even harder for children like mine to get the specialist places they need. Parents are already exhausted from fighting the system, including going through costly tribunals. These tribunals rule in favour of families in around 97 percent of cases. We should not be making things even harder for families.

Specialist provision gives much better outcomes and costs far less in the long run than failing these children. A child who does not get the right support can end up costing taxpayers much more through healthcare, youth offending institutions (over £180,000 a year), or long-term benefit costs and loss of tax. With the right help, these children can learn, thrive, and give back to society.

There are simply not enough state special school places. We cannot afford to lose good independent specialist provision. That would only harm the children the system is supposed to protect.

I urge you to raise this with the Department for Education. Please ensure that the reforms protect specialist placements for children with the most complex needs so families are not left without options.

I would be very grateful for your support on this important issue and look forward to your response.

${signOff}`,

    // Option 3 — teaching professional
    3: `Dear ${mpData.name} MP,

I am a ${formData.jobTitle || "[Job Title]"} at ${formData.schoolName || "[School Name]"}, a specialist SEND school, and a constituent in ${mpData.constituency}.

The Government's consultation on SEND reforms closes at midday on 18 May. While I support efforts to improve the system, I am deeply concerned that the most vulnerable children with the most complex needs could be put at risk.

The children I teach have often experienced multiple failed placements and exclusions in other schools. For many of them, mainstream school is simply not able to meet their needs safely or effectively. Our specialist school is often their last chance to be included in and contribute to society; the only place where they feel safe, settled, and able to learn. For these children, specialist provision is not a luxury or a preference. It is a necessity.

I fully support the Government's focus on early intervention and better support in mainstream schools. However, I am worried that the consultation does not give enough attention to children with the most complex needs. If changes make it harder to secure or maintain specialist places, these children could be left without the right support. This would harm them and their families, and it would also put extra pressure on mainstream schools and teachers who are already working hard.

Specialist provision gives much better outcomes and costs far less in the long run than failing these children. A child who does not get the right support can end up costing taxpayers far more through healthcare, youth offending institutions (over £180,000 a year), or long-term benefit costs. With the right help, these children can learn, thrive, and contribute to society.

I am proud of the progress the children in my class make every day, but I am concerned that important decisions about independent specialist schools could be made without proper detailed consultation. We cannot afford to lose high-quality specialist provision, especially when there are already not enough state special school places.

As a ${formData.jobTitle || "[Job Title]"} working directly with these children every day, I urge you to raise this with the Department for Education. Please ensure that the reforms protect the right, targeted and adequate specialist provision for those with the most complex needs, so that no child is left without the support they require. The one size fits all approach will not work in these cases.

I would welcome any reply from you on this important issue and would be happy to meet if that would be helpful.
Thank you for taking the time to read my letter.

${signOff}`,
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
