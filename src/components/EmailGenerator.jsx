import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, Copy, CheckCircle, Send } from 'lucide-react';

/**
 * EmailGenerator Component
 * Handles the generation, live-editing, and formatting of the email payload.
 * Provides party-specific template options and dynamically binds user data.
 * @param {Object} props - Component props containing mp data and navigation callbacks
 */
export function EmailGenerator({ mpData, postcode, onBack }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address1: '',
        address2: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Party-specific templates
    const getTemplate = (party, mpName) => {
        const defaultSubject = `Urgent: Protect SEND Provision in our Constituency`;

        // Base template parts
        const intro = `Dear ${mpName},

As your constituent, I am writing to you with deep concern regarding the current threat to SEND provision in our community.`;

        const coreMessage = `The proposed reforms fail to understand the complex needs of vulnerable children and the devastating impact these changes will have on families who already fight every day just to get basic support. We need you to stand up for those who cannot easily standalone.`;

        const signOff = `

Yours sincerely,

${formData.firstName || '[First Name]'} ${formData.lastName || '[Last Name]'}
${formData.address1 ? formData.address1 + ',' : '[Address Line 1],'}
${formData.address2 ? formData.address2 + ',' : ''}
${(postcode || '').toUpperCase()}
${formData.phone ? 'Tel: ' + formData.phone : ''}
${formData.email ? 'Email: ' + formData.email : ''}
Your Constituent in ${mpData.constituency} `;

        // Party-specific logic
        switch (party.toLowerCase()) {
            case 'labour':
                return {
                    subject: defaultSubject,
                    body: `${intro} \n\n${coreMessage} \n\nGiven the Labour Party's commitment to breaking down barriers to opportunity, I urge you to use your voice in government to ensure SEND funding is protected, not cut. We must build a system that works for all children.\n\nPlease reply to let me know what tangible steps you will take to protect SEND students in our constituency.${signOff}`
                };
            case 'conservative':
                return {
                    subject: defaultSubject,
                    body: `${intro}\n\n${coreMessage}\n\nI urge you, as a member of the opposition, to hold the government closely to account on their SEND proposals. We need strong conservative voices defending the rights of families to choose the right educational path for their children.\n\nPlease reply to let me know how you intend to challenge these reforms in Parliament.${signOff}`
                };
            case 'liberal democrat':
            case 'lib dem':
                return {
                    subject: defaultSubject,
                    body: `${intro}\n\n${coreMessage}\n\nThe Liberal Democrats have long championed fair funding for education and local community support. I urge you to use your platform to champion the rights of SEND children and oppose any top-down cuts that harm local provision.\n\nPlease reply to let me know how you will advocate for SEND families.${signOff}`
                };
            case 'green party':
            case 'green':
                return {
                    subject: defaultSubject,
                    body: `${intro}\n\n${coreMessage}\n\nIn line with Green commitments to social justice and investing in community wellbeing, I ask that you strongly oppose these regressive SEND reforms. We need an education system that is truly inclusive and sustainable.\n\nPlease let me know how you will push for a fairer SEND system.${signOff}`
                };
            case 'reform uk':
            case 'reform':
                return {
                    subject: defaultSubject,
                    body: `${intro}\n\n${coreMessage}\n\nI urge you to stand up for common sense and protect the families in our constituency who rely on this vital support. We need reform that improves services, not cuts that abandon children.\n\nPlease let me know how you plan to vote on this crucial issue.${signOff}`
                };
            case 'scottish national party':
            case 'snp':
                return {
                    subject: defaultSubject,
                    body: `${intro}\n\n${coreMessage}\n\nI urge you to stand up for SEND provision and ensure that the needs of vulnerable children are not sidelined in Westminster.\n\nPlease let me know how you will vote on this vital issue.${signOff}`
                };
            case 'plaid cymru':
                return {
                    subject: defaultSubject,
                    body: `${intro}\n\n${coreMessage}\n\nI urge you to fiercely defend the resources required for SEND education, ensuring our communities are not left behind.\n\nPlease reply outlining your planned actions to protect these provisions.${signOff}`
                };
            case 'sinn féin':
            case 'sinn fein':
            case 'democratic unionist party':
            case 'dup':
            case 'ulster unionist party':
            case 'uup':
            case 'social democratic & labour party':
            case 'sdlp':
            case 'alliance':
                return {
                    subject: defaultSubject,
                    body: `${intro}\n\n${coreMessage}\n\nWhile education policy nuances differ, the principle of protecting the most vulnerable is universal. I ask for your support in opposing these broader detrimental changes.\n\nPlease let me know your stance on this issue.${signOff}`
                };
            case 'speaker':
                return {
                    subject: `Constituent Concern: SEND Provision`,
                    body: `${intro}\n\n${coreMessage}\n\nI understand your unique position as Speaker, however as my constituency representative, I wanted to register my deep concern on this matter with your office.\n\nPlease let me know you have received this representation.${signOff}`
                };
            default:
                return {
                    subject: defaultSubject,
                    body: `${intro}\n\n${coreMessage}\n\nI urge you to support SEND education. Use your voice in the House of Commons and commit to protecting SEND funding and provision rather than cutting it.\n\nPlease reply to let me know how you intend to vote on this crucial issue and what tangible steps you will take to protect SEND students in our constituency.${signOff}`
                };
        }
    };

    const { subject, body } = getTemplate(mpData.party, mpData.name);
    const isFormValid = formData.firstName.trim() && formData.lastName.trim() && formData.email.trim() && formData.address1.trim();

    const sendEmail = (provider) => {
        if (!mpData.email) return alert("Unfortunately, we don't have an email address on file for this MP.");

        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        const to = mpData.email;

        let url = '';

        switch (provider) {
            case 'gmail':
                url = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodedSubject}&body=${encodedBody}`;
                break;
            case 'outlook':
                url = `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${encodedSubject}&body=${encodedBody}`;
                break;
            default:
                url = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
        }

        window.open(url, '_blank');
    };

    const inputClass = "w-full bg-white border border-border-strong rounded-lg px-3 py-2 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-sm";

    return (
        <div className="space-y-6 relative z-10 animate-fade-in">
            <div className="text-center mb-6">
                <h3 className="text-xl font-serif font-bold text-brand mb-2">Complete Your Details</h3>
                <p className="text-text-secondary text-sm">Review the tailored template below and add your details before sending.</p>
            </div>

            <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">First Name *</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Jane" className={inputClass} required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Last Name *</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className={inputClass} required />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane.doe@example.com" className={inputClass} required />
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Address Line 1 *</label>
                        <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="123 Example Street" className={inputClass} required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Address Line 2</label>
                        <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Apartment, suite, etc." className={inputClass} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Postcode</label>
                        <input type="text" value={postcode.toUpperCase()} disabled className={`${inputClass} bg-bg-subtle cursor-not-allowed uppercase font-medium`} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="07700 900000" className={inputClass} />
                    </div>
                </div>

                <div className="bg-bg-subtle rounded-xl border border-border-subtle p-4 relative mt-6">
                    <div className="absolute top-0 right-0 p-2 text-xs font-bold text-brand uppercase tracking-widest bg-white border-b border-l border-border-subtle rounded-bl-lg rounded-tr-xl flex items-center gap-2">
                        PREVIEW <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: mpData.partyColor }}></span>
                    </div>
                    <div className="text-text-primary text-sm whitespace-pre-wrap font-sans max-h-48 overflow-y-auto pr-2 custom-scrollbar mt-4">
                        {body}
                    </div>
                </div>

                <div className="pt-4 space-y-3 border-t border-border-subtle">
                    <p className="text-center text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Send Using Your Preferred App:</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => sendEmail('gmail')}
                            disabled={!isFormValid || !mpData.email}
                            className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl py-2.5 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-brand cursor-pointer"
                        >
                            Gmail
                        </button>
                        <button
                            onClick={() => sendEmail('outlook')}
                            disabled={!isFormValid || !mpData.email}
                            className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl py-2.5 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-brand cursor-pointer"
                        >
                            Outlook
                        </button>
                    </div>
                    <button
                        onClick={() => sendEmail('default')}
                        disabled={!isFormValid || !mpData.email}
                        className="w-full bg-accent hover:bg-accent-hover text-white shadow-lg rounded-xl py-4 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none cursor-pointer"
                    >
                        <Send className="w-5 h-5" /> Open Default App
                    </button>

                    {!mpData.email && (
                        <p className="text-red-600 text-sm text-center mt-2 font-medium">
                            This MP's email is not publicly available via the Parliament API.
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
