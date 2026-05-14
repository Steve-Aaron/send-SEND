/**
 * Letter: Parent — Hoping to get their child into a specialist school
 */

const SUBJECT = 'SEND reforms – protecting children with the most complex needs';

export function getParentSpecialistSeekingLetter({ mpName, constituency, formData, postcode }) {
  const intro = `Dear ${mpName} MP,`;

  const body = `I am writing to you as a constituent and as a parent who is fighting to get my child the specialist education they desperately need. I have a child with complex SEND and I am very worried about the current Government consultation on SEND reforms.

I know from my own experience both the good and bad sides of being wired differently. That is why I strongly support specialist provision for children whose needs cannot be met in mainstream schools.

Inclusion in mainstream school sounds good in theory, but for some children with extreme anxiety, trauma, sensory issues, and challenging behaviour, the noisy and busy environment can be overwhelming and damaging. My child has already struggled in previous settings. A specialist school is not a luxury or a preference. It is the only place where they can feel safe and make real progress.

I am worried that these reforms could make it even harder for children like mine to get the specialist places they need. Parents are already exhausted from fighting the system, including going through costly tribunals. These tribunals rule in favour of families in around 97 percent of cases. We should not be making things even harder for families.

Specialist provision gives much better outcomes and costs far less in the long run than failing these children. A child who does not get the right support can end up costing taxpayers much more through healthcare, youth offending institutions (over £180,000 a year), or long-term benefit costs and loss of tax. With the right help, these children can learn, thrive, and give back to society.

There are simply not enough state special school places. We cannot afford to lose good independent specialist provision. That would only harm the children the system is supposed to protect.

I urge you to raise this with the Department for Education. Please ensure that the reforms protect specialist placements for children with the most complex needs so families are not left without options.

I would be very grateful for your support on this important issue and look forward to your response.`;

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
