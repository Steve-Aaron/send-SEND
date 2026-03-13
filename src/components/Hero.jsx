import React from "react";

/**
 * Hero Component
 * Displays the main focal point of the campaign with background patterns and text.
 */
export function Hero({ subTitle, titleWhite, titleAccent, subheading }) {
  return (
    <div className="relative bg-brand py-24 md:py-32 px-6 lg:px-12 overflow-hidden bg-gradient-to-br from-brand to-[#001436]">
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/3 translate-y-1/3">
        <div className="w-96 h-96 border-[40px] border-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-6">
          <div className="inline-block px-4 py-1.5 border border-accent/50 rounded text-xs font-bold uppercase tracking-widest text-accent mb-2">
            {subTitle}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
            {titleWhite}
            <br />
            <span className="text-accent italic">{titleAccent}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed">
            {subheading}
          </p>
        </div>
      </div>
    </div>
  );
}
