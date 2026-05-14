/**
 * Letter: Parent — Child currently attends a specialist school
 */

const SUBJECT = 'SEND reforms – protecting children with the most complex needs';

export function getParentSpecialistCurrentLetter({ mpName, constituency, formData, postcode }) {
  const intro = `Dear ${mpName} MP,`;

  const body = `I am writing to you as a constituent and as a parent of a child who currently attends a specialist SEND school. I care deeply about the future of children with special educational needs and disabilities.

I know the Government is consulting on reforms to the SEND system. While it is important to improve support for children and families, I am worried that some of the changes could make it much harder to get and keep specialist school places, especially for children with the most complex needs.

My child has already been through several failed placements in other schools. Mainstream school is simply not able to meet their needs safely or effectively. It is only in a specialist school that they feel safe, settled, and able to learn. For these children, specialist provision is not a luxury or a preference. It is a necessity.

I am concerned that broad changes to the system, without properly understanding the needs of this small group of very vulnerable children, could reduce access to specialist places. If that happens, children who have already suffered a lot of trauma could be left without the right support. This would also put extra pressure on mainstream schools and teachers, who are already doing their best.

Specialist provision gives much better outcomes and costs far less in the long run than failing these children. I understand that a child like mine who does not get the right support can end up costing taxpayers much more through healthcare, youth offending institutions (over £180,000 a year), or long-term benefit costs and loss of tax. With the right help, these children can learn, thrive, and give back to society.

Reform is needed, but it must protect specialist provision for the children who really need it. Losing this vital support would hurt the children, their families, and schools across our area.

As my local MP, I would be grateful if you could raise these concerns with the Department for Education. Please make sure the real impact on the most vulnerable children, their families, and schools is properly considered during the consultation.

Thank you for taking the time to read my letter. I would welcome any reply on how you plan to support this issue.`;

  const signOff = `Yours sincerely,

${formData.firstName || '[First Name]'} ${formData.lastName || '[Last Name]'}
${formData.address1 ? formData.address1 + ',' : '[Address Line 1],'}
${formData.address2 ? formData.address2 + ',' : ''}
${(postcode || '').toUpperCase()}
${formData.phone ? 'Tel: ' + formData.phone : ''}
${formData.email ? 'Email: ' + formData.email : ''}
Your Constituent in ${constituency}`;

  return {
    subject: SUBJECT,
    body: `${intro}\n\n${body}\n\n${signOff}`,
  };
}
