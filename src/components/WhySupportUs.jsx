import React from 'react';

/**
 * WhySupportUs Component
 * Explains why the campaign is necessary in a long-form format.
 */

export function WhySupportUs({ title = "Support SEND Education", paragraphs }) {
    const defaultParagraphs = [
        <>The 2026 SEND consultation represents a critical juncture for vulnerable children across the nation. <strong>We must ensure that the government understands the real-world implications</strong> of their proposed reforms.</>,
        "We believe that every child deserves the right to an education that meets their unique needs. The proposed SEND consultation risks vital funding and critical provisions that families across the UK have relied on for decades.",
        <>saveSEND is a neutral platform built to empower communities, schools, and independent providers to easily connect with their Members of Parliament. By lowering the barrier to entry for civic engagement, we aim to ensure that the voices of the most vulnerable are <em>heard loud and clear</em> in Westminster.</>
    ];

    const content = paragraphs || defaultParagraphs;

    return (
        <section className="space-y-6">
            <h3 className="text-3xl font-serif font-bold text-brand border-b-2 border-accent pb-4 inline-block">
                {title}
            </h3>
            <div className="prose prose-slate max-w-none text-text-secondary space-y-4 prose-leading-sentence">
                {content.map((item, index) => (
                    <p key={index} className="leading-relaxed">{item}</p>
                ))}
            </div>
        </section>
    );
}