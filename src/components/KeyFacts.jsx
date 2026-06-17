import React from "react";

/**
 * KeyFacts Component
 * A full-width strip of campaign headline statistics and facts.
 * Provides visual impact and reinforces key talking points between hero and main content.
 *
 * data-component: "KeyFacts"
 */
export function KeyFacts() {
  const facts = [
    {
      stat: "50+",
      unit: "years",
      label: "of international isolation for Turkish Cypriots",
    },
    {
      stat: "1960",
      unit: "Treaty",
      label: "of Guarantee makes the UK a legal Guarantor Power",
    },
    {
      stat: "3",
      unit: "Guarantor",
      label: "Powers — UK, Greece, Turkey — with a duty to act",
    },
    {
      stat: "0",
      unit: "direct",
      label: "international flights into Northern Cyprus allowed",
    },
  ];

  return (
    <div
      data-component="KeyFacts"
      className="bg-white border-b border-border-subtle"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {facts.map((fact, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-1 py-4 border-r border-border-subtle last:border-0 odd:border-r even:lg:border-r"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-serif font-bold text-brand leading-none">
                  {fact.stat}
                </span>
                <span className="text-sm font-bold text-accent uppercase tracking-widest">
                  {fact.unit}
                </span>
              </div>
              <p className="text-xs md:text-sm text-text-secondary leading-snug max-w-[140px]">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
