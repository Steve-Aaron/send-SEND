/**
 * Letter: Business and Trade Advocate
 * For constituents approaching the issue from an economic or trade angle.
 */

const signOff = (formData, postcode, mpData) =>
  [
    `${formData.firstName || "[First Name]"} ${formData.lastName || "[Last Name]"}`,
    formData.jobTitle ? formData.jobTitle + "," : null,
    formData.address1 ? formData.address1 + "," : "[Address Line 1],",
    formData.address2 ? formData.address2 + "," : null,
    postcode.toUpperCase(),
    formData.email ? `Email: ${formData.email}` : null,
    formData.phone ? `Tel: ${formData.phone}` : null,
    `Your constituent in ${mpData.constituency}`,
  ]
    .filter(Boolean)
    .join("\n");

export const letterNcBusiness = (mpData, formData, postcode) => `Dear ${mpData.name} MP,

I am writing to you as a constituent${formData.jobTitle ? " and " + formData.jobTitle : ""} with an interest in international trade and the economic opportunities that the United Kingdom's foreign policy can unlock.

I wish to draw your attention to an issue that represents both a significant injustice and a missed opportunity: the ongoing isolation of Northern Cyprus and the Turkish Cypriot community.

For over fifty years, Turkish Cypriots have been subject to international embargoes that prevent direct trade, direct flights, and full international engagement. This isolation harms not only Turkish Cypriots — it also limits the UK's own economic and diplomatic opportunities in the Eastern Mediterranean.

The United Kingdom is a Guarantor Power under the 1960 Treaty of Guarantee. This gives the UK a unique and recognised role in Cyprus's future — a role that comes with both responsibility and opportunity. Taking a principled stand in support of recognising Northern Cyprus, or at minimum supporting an end to the embargoes, would signal to the world that Britain remains committed to fairness, equality and open engagement.

Direct trade with Northern Cyprus, direct air routes, and proper representation in international bodies would benefit businesses, communities and families on both sides. It is entirely consistent with the UK's commitment to building new trading relationships and its founding values of fair play.

The Freedom and Fairness for Northern Cyprus campaign asks you to meet with campaign representatives and to support the call to end the isolation. I hope you will agree that this is a cause worth championing — both on grounds of principle and practical economic benefit.

I would welcome the opportunity to discuss this further, and I look forward to your response.

Yours sincerely,

${signOff(formData, postcode, mpData)}`;
