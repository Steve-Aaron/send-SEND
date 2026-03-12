import React from "react";

/**
 * ViewConsultation Component
 * A call-to-action block for users to view the government consultation document.
 */
export function ViewConsultation() {
  return (
    <section className="bg-bg-subtle py-12 px-6 rounded-3xl border border-border-subtle text-center">
      <h3 className="text-2xl font-serif font-bold text-brand mb-4">
        Official Consultation Details
      </h3>
      <p className="text-text-secondary max-w-2xl mx-auto mb-8">
        The 2026 SEND consultation represents a pivotal moment for thousands of
        children. We encourage all stakeholders to read the full proposal to
        understand the proposed legislative changes.
      </p>
      <a
        href="https://consult.education.gov.uk/send-strategy-division/send-reform-putting-children-and-young-people-firs/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-accent hover:bg-accent-hover text-white rounded-xl px-12 py-5 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      >
        View Official Consultation
      </a>
    </section>
  );
}
