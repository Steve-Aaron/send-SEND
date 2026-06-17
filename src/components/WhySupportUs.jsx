import React from "react";

/**
 * WhySupportUs Component
 * Long-form information section: a heading, paragraphs, and optionally a
 * numbered list of key points and a call-to-action button.
 *
 * Props:
 *  - title:      section heading
 *  - paragraphs: array of paragraph content (string or JSX)
 *  - listItems:  optional array of strings rendered as a numbered list
 *  - cta:        optional { label, href } rendered as a button
 */
export function WhySupportUs({ title = "Support SEND Education", paragraphs, listItems, cta }) {
  const defaultParagraphs = [
    <>
      The 2026 SEND consultation represents a critical juncture for vulnerable
      children across the nation.{" "}
      <strong>
        We must ensure that the government understands the real-world
        implications
      </strong>{" "}
      of their proposed reforms.
    </>,
    "We believe that every child deserves the right to an education that meets their unique needs. The proposed SEND consultation risks vital funding and critical provisions that families across the UK have relied on for decades.",
    <>
      SENDYourSay is a neutral platform built to empower communities, schools,
      and independent providers to easily connect with their Members of
      Parliament. By lowering the barrier to entry for civic engagement, we aim
      to ensure that the voices of the most vulnerable are{" "}
      <em>heard loud and clear</em> in Westminster.
    </>,
  ];

  const content = paragraphs || defaultParagraphs;

  return (
    <section className="space-y-6">
      <h3 className="text-3xl font-serif font-bold text-brand border-b-2 border-accent pb-4 inline-block">
        {title}
      </h3>
      <div className="prose prose-slate max-w-none text-text-secondary space-y-4 prose-leading-sentence">
        {content.map((item, index) => (
          <p key={index} className="leading-relaxed">
            {item}
          </p>
        ))}
      </div>

      {listItems && (
        <ol className="space-y-3 list-none p-0 m-0">
          {listItems.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-accent/15 text-brand font-serif font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <span className="text-text-secondary font-medium leading-relaxed pt-1">
                {item}
              </span>
            </li>
          ))}
        </ol>
      )}

      {cta && (
        <div className="pt-2">
          <a
            href={cta.href}
            className="inline-block bg-accent hover:bg-accent-hover text-white rounded-xl px-8 py-4 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            {cta.label}
          </a>
        </div>
      )}
    </section>
  );
}
