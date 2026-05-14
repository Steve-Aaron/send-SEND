/**
 * Letter: Parent — General (neither currently in nor seeking a specialist school)
 * For parents who care about SEND provision but don't have a specialist school context.
 */

const SUBJECT = 'SEND reforms – protecting children with the most complex needs';

export function getParentGeneralLetter({ mpName, constituency, formData, postcode }) {
  const intro = `Dear ${mpName} MP,`;

  const body = `I am writing to you as a constituent and as a parent who cares deeply about the future of children with special educational needs and disabilities.

I understand that the Government is consulting on reforms to the SEND system. Improving support for children and families is clearly essential, and many parents will welcome efforts to make the system work better.

At the same time, I hope reforms will recognise that some children have extremely complex needs. These are some of the most vulnerable children in our communities. Many have already struggled in several different schools before finally finding the specialist support that helps them feel safe, settled and able to learn.

For these children, mainstream school is simply not an option — it is not able to meet their needs safely or effectively. Specialist provision is not a preference. It is often the only setting where they can receive the care, structure and expertise they require.

I am concerned that overall changes to the system, without properly understanding what these most vulnerable children need, could unintentionally make some of these placements harder to provide. If that were to happen, children who have already experienced multiple failed placements could once again find themselves without the support they need. Where will they go?

If this specialist provision is lost for these children, it would not only affect them and their families. It would also place additional pressure on mainstream schools and teachers, who are already working hard to support a wide range of needs in their classrooms.

Reform of the SEND system is clearly needed, but it must protect access to specialist provision for children with the most complex needs.

As my local MP in ${constituency}, I would be grateful if you could raise this issue with the Department for Education and ensure that the practical implications for children, families and schools are properly considered as the consultation progresses.

Thank you for taking the time to read this. I look forward to hearing from you.`;

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
