/**
 * Letter: Education Professional
 * Covers: Class Teacher / SEN Teacher / Subject Teacher / Teaching Assistant / Pastoral Support Worker
 *
 * Dynamic parts:
 *  - role: the selected job title (e.g. 'Class Teacher')
 *  - verb: 'teach' for teachers/TAs, 'support' for Pastoral Support Workers
 */

const SUBJECT = 'SEND reforms – protecting children with the most complex needs';

// Roles that use 'support' instead of 'teach'
const SUPPORT_VERB_ROLES = ['Pastoral Support Worker'];

export function getProfessionalLetter({ mpName, constituency, formData, role }) {
  const verb = SUPPORT_VERB_ROLES.includes(role) ? 'support' : 'teach';
  const intro = `Dear ${mpName} MP,`;

  const schoolClause = formData.schoolName ? ` at ${formData.schoolName}` : '';
  const body = `As a ${role}${schoolClause} and one of your constituents in ${constituency}, I am writing to you about the Government's consultation on SEND reform.

The consultation closes at midday on 18th May. While I support efforts to improve the system, I am deeply concerned that the most vulnerable children with the most complex needs could be put at risk.

The children I ${verb} have often experienced multiple failed placements and exclusions in other schools. For many of them, mainstream school is simply not able to meet their needs safely or effectively. Our specialist school is often their last chance to be included in and contribute to society — the only place where they feel safe, settled, and able to learn. For these children, specialist provision is not a luxury or a preference. It is a necessity.

I fully support the Government's focus on early intervention and better support in mainstream schools. However, I am worried that the consultation does not give enough attention to children with the most complex needs. If changes make it harder to secure or maintain specialist places, these children could be left without the right support. This would harm them and their families, and it would also put extra pressure on mainstream schools and teachers who are already working hard.

Specialist provision gives much better outcomes and costs far less in the long run than failing these children. A child who does not get the right support can end up costing taxpayers far more through healthcare, youth offending institutions (over £180,000 a year), or long-term benefit costs. With the right help, these children can learn, thrive, and contribute to society.

I am proud of the progress the children I ${verb} make every day, but I am concerned that important decisions about independent specialist schools could be made without proper detailed consultation. We cannot afford to lose high-quality specialist provision, especially when there are already not enough state special school places.

As a ${role} working directly with these children every day, I urge you to raise this with the Department for Education. Please ensure that the reforms protect the right, targeted and adequate specialist provision for those with the most complex needs, so that no child is left without the support they require. A one-size-fits-all approach will not work in these cases.

I would welcome any reply from you on this important issue and would be happy to meet if that would be helpful. Thank you for taking the time to read my letter.`;

  const signOff = `Yours sincerely,

${formData.firstName || '[First Name]'} ${formData.lastName || '[Last Name]'}
${role}
${formData.schoolName ? formData.schoolName : ''}
${formData.phone ? 'Tel: ' + formData.phone : ''}
${formData.email ? 'Email: ' + formData.email : ''}
Your Constituent in ${constituency}`;

  return {
    subject: SUBJECT,
    body: `${intro}\n\n${body}\n\n${signOff}`,
  };
}
