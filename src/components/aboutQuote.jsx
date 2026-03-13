export function AboutQuote({
  title,
  heading,
  p1,
  p2,
  followupText,
  cta,
  quote,
  link,
}) {
  return (
    <section className="bg-brand text-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 shaded-gradient"></div>
      <div className="absolute left-0 top-0 opacity-20 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-96 h-96 border-[40px] border-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <div className="inline-block px-4 py-1.5 border border-accent/50 rounded text-xs font-bold uppercase tracking-widest text-accent mb-2">
            {title}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
            {p1}
          </p>
          <p className="text-base text-slate-400 leading-relaxed">{p2}</p>
          <div className="pt-4">
            <a
              href={
                link ||
                "https://www.gov.uk/government/consultations/send-and-alternative-provision-green-paper"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent-hover text-white rounded-xl px-8 py-4 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {cta || "Read the Full Consultation"}
            </a>
          </div>
          <div className="text-base text-slate-300 leading-relaxed">
            {followupText.map((item, index) => (
              <p
                key={index}
                className="text-base text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </div>
        </div>
        <div className="md:w-5/12 relative">
          <div className="aspect-[4/5] bg-bg-card rounded-2xl shadow-2xl border flex items-center justify-center p-8 text-center relative overflow-hidden border-white/10 opacity-100 transform-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand to-[#001436] opacity-90"></div>
            <div className="relative z-10 text-white/80">
              <span className="font-serif italic text-3xl text-accent block mb-4">
                {quote ||
                  "The true measure of any society can be found in how it treats its most vulnerable members."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
