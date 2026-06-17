/**
 * SEND Matters Coalition — letter templates.
 *
 * All four letters share an identical body; only the subject line and the
 * opening sentence differ (the teacher letter also carries role/school
 * placeholders). The shared paragraphs live in SHARED_BODY so the copy is
 * defined once.
 *
 * Each builder has the signature (mpData, formData, postcode) => { subject, body }
 * to match how EmailGenerator consumes them.
 */

/** Shared sign-off, omitting blank optional lines. */
const signOff = (formData, postcode, mpData, extraLines = []) =>
  [
    "Yours sincerely,",
    "",
    `${formData.firstName || "[Your First Name]"} ${formData.lastName || "[Your Last Name]"}`,
    ...extraLines,
    formData.address1 ? formData.address1 + "," : "[Your Address],",
    formData.address2 ? formData.address2 + "," : null,
    postcode ? postcode.toUpperCase() : "[Your Postcode]",
    formData.email ? `Email: ${formData.email}` : null,
    formData.phone ? `Tel: ${formData.phone}` : null,
    `Your constituent in ${mpData.constituency || "[Your Constituency]"}`,
  ]
    .filter(Boolean)
    .join("\n");

/** The body shared by every letter, from the second paragraph to the closing line. */
const SHARED_BODY = `The Government's consultation on changes to the SEND system has now closed. As proposals are reviewed and any legislation moves through Parliament, I hope you will help ensure that children with the most complex needs are not overlooked.

Improving support for children and families is essential. Earlier help, better mainstream support and a simpler system would be welcomed by many families.

But some children have needs that cannot be met safely or effectively in mainstream schools. Many have already experienced failed placements, exclusions, trauma or long periods out of education before finally finding specialist support that helps them feel safe, settled and able to learn.

For these children, specialist provision is not a preference. It is often the only place where they can receive the care, structure, therapy and expertise they need.

I am concerned that broad changes to the SEND system, without proper safeguards, could make some specialist placements harder to access or maintain. Specialist provision is currently delivered through a mix of state and independent schools. Independent specialist schools play a vital role, particularly in areas where there are not enough state special school places.

I understand that the Government is considering limits on what independent specialist schools can charge. While the aim may be to control costs, there is a real risk that this could make some provision financially unviable. If that leads to school closures, some of the most vulnerable children could be left without suitable education.

These schools are often important local employers, rooted in their communities. Their costs reflect the complex support many children need, including therapy, specialist equipment, high staffing levels and one-to-one care.

I completely understand that funding decisions are difficult. But failing to invest in the right support now can create far greater costs later. The Government spends almost £180,000 a year for each 15 to 17 year old placed in a male young offender institution, more than double the annual cost of many independent specialist school placements for children with the most complex needs.

In England and Wales, up to 80% of children cautioned or sentenced within the youth justice system have SEND or are neurodivergent. This is not because SEND children are predisposed to offend. It is because unmet needs can lead to crisis, exclusion and behaviour that the system then punishes.

There is also a strong positive case for investing early. Sufficient investment in provision that meets the needs of learners with complex SEND could yield an average of at least £380,000 per learner across their lifetime in value to society, after accounting for the cost of their education. Much of that value comes through the economy, but also through reduced pressure on local authorities, the NHS, police and justice services.

The impact of school closures would not only be felt by children and families. It would also place extra pressure on mainstream schools and teachers, who are already working hard to support a wide range of needs.

Mainstream inclusion is right for many children, and many children with SEND can and should flourish in mainstream education. But for those with the most complex needs, inclusion in the wrong setting can become exclusion in practice. It can leave children unable to learn, unsafe, overwhelmed and pushed further away from education, employment and society.

Please raise this issue with the Department for Education and scrutinise any legislation carefully as it moves through Parliament.

Changes to the SEND system are needed, but they must protect children's legal rights and ensure every child can access the support and setting they need.

Thank you for taking the time to read this. I would welcome your response.`;

/** Assembles a full letter from its opening sentence and sign-off. */
const compose = (mpData, opening, sign) =>
  `Dear ${mpData.name || "[MP's Name]"},

${opening}

${SHARED_BODY}

${sign}`;

/** General constituent letter. */
export const sendGeneral = (mpData, formData, postcode) => ({
  subject: "Please protect children with complex SEND needs as legislation moves through Parliament",
  body: compose(
    mpData,
    "I am writing as a constituent who cares deeply about the future of children with special educational needs and disabilities.",
    signOff(formData, postcode, mpData),
  ),
});

/** Parent with a child currently at a specialist school. */
export const sendParentCurrent = (mpData, formData, postcode) => ({
  subject: "Please protect specialist SEND provision as legislation moves through Parliament",
  body: compose(
    mpData,
    "I am writing to you as a constituent and as a parent of a child who currently attends a specialist SEND school.",
    signOff(formData, postcode, mpData),
  ),
});

/** Parent trying to secure a specialist school place. */
export const sendParentSeeking = (mpData, formData, postcode) => ({
  subject: "Please protect access to specialist SEND placements",
  body: compose(
    mpData,
    "I am writing to you as a constituent and as a parent trying to secure the right specialist education for my child.",
    signOff(formData, postcode, mpData),
  ),
});

/** Teacher / school staff letter. */
export const sendTeacher = (mpData, formData, postcode) => {
  const role = formData.jobTitle || "[teacher / teaching assistant / pastoral support worker / member of staff]";
  const school = formData.schoolName || "[School Name]";
  const constituency = mpData.constituency || "[Constituency Name]";
  return {
    subject: "Please protect specialist SEND provision for children with complex needs",
    body: compose(
      mpData,
      `I am writing to you as a ${role} at ${school}, a [specialist SEND / mainstream] school, and as a constituent in ${constituency}.`,
      signOff(formData, postcode, mpData, [role, formData.schoolName ? formData.schoolName : null].filter(Boolean)),
    ),
  };
};
