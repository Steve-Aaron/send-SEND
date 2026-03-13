import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft, Copy, CheckCircle, Send } from "lucide-react";

/**
 * EmailGenerator Component
 * Handles the generation, live-editing, and formatting of the email payload.
 * Provides party-specific template options and dynamically binds user data.
 * @param {Object} props - Component props containing mp data and navigation callbacks
 */
export function EmailGenerator({ mpData, postcode, onBack }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    phone: "",
  });
  const [customBody, setCustomBody] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Party-specific templates
  const getTemplate = (party, mpName) => {
    const defaultSubject = `SEND reforms – protecting children with the most complex needs`;

    // Base template parts
    const intro = `Dear ${mpName} MP,`;

    const coreMessage = `I am writing to you as a constituent and as a parent who cares deeply about the future of children with special educational needs and disabilities.

I understand that the Government is consulting on reforms to the SEND system. Improving support for children and families is clearly essential, and many parents will welcome efforts to make the system work better.

At the same time, I hope reforms will recognise that some children have extremely complex needs. These are some of the most vulnerable children in our communities. Many have already struggled in several different schools before finally finding the specialist support that helps them feel safe, settled and able to learn.

For these children, mainstream school is simply not an option - it is not able to meet their needs safely or effectively. Specialist provision is not a preference. It is often the only setting where they can receive the care, structure and expertise they require.

I am concerned that overall changes to the system without understanding what these most vulnerable children need, could unintentionally make some of these placements harder to provide. If that were to happen, children who have already experienced multiple failed placements could once again find themselves without the support they need. Where will they go?

If this specialist provision is lost for these children, it would not only affect them and their families. It would also place additional pressure on mainstream schools and teachers, who are already working hard to support a wide range of needs in their classrooms.

Reform of the SEND system is clearly needed, but it must protect access to specialist provision for children with the most complex needs.

As my local MP in ${mpData.constituency}, I would be grateful if you could raise this issue with the Department for Education and ensure that the practical implications for children, families and schools are properly considered as the consultation progresses.

Thank you for taking the time to read this. I look forward to hearing from you.`;

    const signOff = `

Yours sincerely,

${formData.firstName || "[First Name]"} ${formData.lastName || "[Last Name]"}
${formData.address1 ? formData.address1 + "," : "[Address Line 1],"}
${formData.address2 ? formData.address2 + "," : ""}
${(postcode || "").toUpperCase()}
${formData.phone ? "Tel: " + formData.phone : ""}
${formData.email ? "Email: " + formData.email : ""}
Your Constituent in ${mpData.constituency} `;

    return {
      subject: defaultSubject,
      body: `${intro}\n\n${coreMessage}\n\n${signOff}`,
    };
  };

  const { subject, body: generatedBody } = getTemplate(
    mpData.party,
    mpData.name,
  );
  const currentBody = customBody !== null ? customBody : generatedBody;

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.address1.trim();

  const sendEmail = (provider) => {
    if (!mpData.email)
      return alert(
        "Unfortunately, we don't have an email address on file for this MP.",
      );

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(currentBody);
    const to = mpData.email;

    let url = "";

    switch (provider) {
      case "gmail":
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodedSubject}&body=${encodedBody}`;
        break;
      case "outlook":
        url = `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${encodedSubject}&body=${encodedBody}`;
        break;
      default:
        url = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
    }

    window.open(url, "_blank");
  };

  const inputClass =
    "w-full bg-white border border-border-strong rounded-lg px-3 py-2 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-sm";

  return (
    <div className="space-y-6 relative z-10 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-serif font-bold text-brand mb-2">
          SEND your say
        </h3>
        <p className="text-text-secondary text-sm">
          Please complete your details. We have included some email text but you
          can edit this in your email client before sending.
        </p>
      </div>

      <div className="space-y-5">
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
              placeholder="My"
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
              placeholder="MP"
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
              placeholder="Apartment, suite, etc."
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

        <div className="bg-bg-subtle rounded-xl border border-border-subtle p-4 relative mt-6">
          <div className="absolute top-0 right-0 p-2 text-xs font-bold text-brand uppercase tracking-widest bg-white border-b border-l border-border-subtle rounded-bl-lg rounded-tr-xl flex items-center gap-2 z-10">
            PREVIEW{" "}
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: mpData.partyColor }}
            ></span>
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

        <div className="pt-4 space-y-3 border-t border-border-subtle">
          <p className="text-center text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">
            Send Using Your Preferred App:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => sendEmail("gmail")}
              disabled={!isFormValid || !mpData.email}
              className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl py-2.5 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-brand cursor-pointer"
            >
              Gmail
            </button>
            <button
              onClick={() => sendEmail("outlook")}
              disabled={!isFormValid || !mpData.email}
              className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl py-2.5 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-brand cursor-pointer"
            >
              Outlook
            </button>
          </div>
          <button
            onClick={() => sendEmail("default")}
            disabled={!isFormValid || !mpData.email}
            className="w-full bg-accent hover:bg-accent-hover text-white shadow-lg rounded-xl py-4 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none cursor-pointer"
          >
            <Send className="w-5 h-5" /> Open Default App
          </button>

          {!mpData.email && (
            <p className="text-red-600 text-sm text-center mt-2 font-medium">
              This MP's email is not currently available. Please try again
              later.
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
