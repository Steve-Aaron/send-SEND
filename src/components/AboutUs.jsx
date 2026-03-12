import React from "react";
import { Timeline } from "./Timeline";
import { Quote } from "./Quote";
import { ViewConsultation } from "./ViewConsultation";

/**
 * AboutUs Component
 * Redesigned as a modular container for the campaign narrative components.
 */
export function AboutUs() {
  const campaignPillars = [
    {
      title: "Our Mission",
      description:
        "saveSEND is a neutral platform built to empower communities, schools, and independent providers to easily connect with their Members of Parliament. By lowering the barrier to entry for civic engagement, we aim to ensure that the voices of the most vulnerable are heard.",
    },
    {
      title: "The Challenge",
      description:
        "We believe that every child deserves the right to an education that meets their unique needs. The proposed SEND consultation risks vital funding and critical provisions that families across the UK have relied on for decades.",
    },
    {
      title: "The Solution",
      description:
        "By providing pre-vetted, high-impact templates and automatic MP identification, we make it effortless for concerned parents and educators to participate in the democratic process and protect SEND education.",
    },
    {
      title: "The Impact",
      description:
        "Ensuring that the voices of the most vulnerable are heard loud and clear in Westminster. Our goal is to protect the future of SEND education through direct, meaningful constituent engagement.",
    },
  ];

  return (
    <section
      id="about-us"
      className="bg-white text-text-primary py-24 md:py-32 relative overflow-hidden"
    >
      {/* Header Content Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center md:text-left">
        <div className="inline-block px-4 py-1.5 border border-accent/50 rounded text-xs font-bold uppercase tracking-widest text-accent mb-4">
          The Campaign
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-brand leading-tight">
          Protecting the
          <br />
          <span className="text-accent italic">Future of SEND.</span>
        </h2>
        <div className="mt-8 flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          <p className="flex-1 text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-3xl">
            The 2026 SEND consultation represents a pivotal moment for thousands
            of children. We are here to ensure that their parents and providers
            are not silenced.
          </p>
          <div className="w-full lg:w-auto">
            <ViewConsultation />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
