/**
 * Letter: British Cypriot Community Member
 * For people with personal or family ties to the Turkish Cypriot community.
 */

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

export const letterNcCypriot = (mpData, formData, postcode) => `Dear ${mpData.name} MP,

I am writing to you as a constituent with personal ties to the Turkish Cypriot community in Northern Cyprus, and I am reaching out because I believe this is a matter of both personal and national importance.

For more than fifty years, my family and community in Northern Cyprus have lived under international embargoes that restrict trade, travel and representation. They are unable to access the same opportunities enjoyed by Greek Cypriots in the Republic of Cyprus, who benefit from full European Union membership. This disparity is not the result of any wrongdoing — it is the product of political division and decades of diplomatic inaction.

As a UK resident, I am proud of this country's commitment to fairness and the rule of law. That is why I find it difficult to reconcile the ongoing isolation of Turkish Cypriots with Britain's values — particularly given that the United Kingdom is a Guarantor Power under the 1960 Treaty of Guarantee, with a legally recognised role in Cyprus's future.

I am not asking for anything beyond what fairness demands. Recognising Northern Cyprus as a sovereign state — or taking meaningful steps to ease the isolation — would allow Turkish Cypriots to trade directly with the world, to travel freely, and to be properly represented in international institutions. It would treat them as the equals they are.

The Freedom and Fairness for Northern Cyprus campaign asks you to meet with campaign representatives and to publicly support the call to end the isolation. I hope you will agree that this is a cause worth championing — both on grounds of principle and for the many British Cypriots who look to their elected representatives for support.

Please raise this matter with the Foreign, Commonwealth and Development Office and use your voice to support a long-overdue act of fairness.

Thank you sincerely for your time and consideration.

Yours sincerely,

${signOff(formData, postcode, mpData)}`;
