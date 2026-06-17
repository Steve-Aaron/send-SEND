/**
 * Letter: General Constituent
 * For any UK resident who supports freedom and fairness for Turkish Cypriots.
 */

/** Builds a clean sign-off, omitting blank optional lines */
const signOff = (formData, postcode, mpData) =>
  [
    `${formData.firstName || "[First Name]"} ${formData.lastName || "[Last Name]"}`,
    formData.address1 ? formData.address1 + "," : "[Address Line 1],",
    formData.address2 ? formData.address2 + "," : null,
    postcode.toUpperCase(),
    formData.email ? `Email: ${formData.email}` : null,
    formData.phone ? `Tel: ${formData.phone}` : null,
    `Your constituent in ${mpData.constituency}`,
  ]
    .filter(Boolean)
    .join("\n");

export const letterNcGeneral = (mpData, formData, postcode) => `Dear ${mpData.name} MP,

I am writing to you as a constituent who believes strongly in fairness, equality and the rule of law — and I wish to raise with you an issue that I feel has not received the attention it deserves in Parliament.

For over fifty years, Turkish Cypriots in Northern Cyprus have faced international embargoes and restrictions that prevent them from engaging fully in global trade, travel and representation. While their neighbours on the island enjoy the full benefits of European Union membership, Turkish Cypriots remain isolated — not through any fault of their own, but as a consequence of unresolved political divisions.

The United Kingdom holds a unique and important responsibility in this matter. As a Guarantor Power under the 1960 Treaty of Guarantee, the UK has both the legal standing and the moral obligation to play a constructive role in addressing the unfair treatment of Turkish Cypriots on the world stage.

I believe that recognising Northern Cyprus as a sovereign state, or at the very least supporting meaningful engagement to end the isolation, would be a significant act of principle. It would enable direct trade, direct travel, and proper representation — treating Turkish Cypriots as the equals they are, just as their Greek Cypriot neighbours are treated. This is not a radical demand: it is a demand for basic fairness.

The Freedom and Fairness for Northern Cyprus campaign is asking Members of Parliament across all parties to meet with campaign representatives and to add their voices to this call. I would be most grateful if you would agree to do so.

As my MP representing ${mpData.constituency}, I trust that you share my commitment to fairness and equality. I urge you to support this campaign and raise the issue of Northern Cyprus's isolation with the Government.

Thank you for taking the time to read this letter. I look forward to your response.

Yours sincerely,

${signOff(formData, postcode, mpData)}`;
