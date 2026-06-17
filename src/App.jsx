import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { CampaignSteps } from "./components/CampaignSteps";
import { Privacy } from "./components/Privacy";
import { Cookies } from "./components/Cookies";
import { AboutPage } from "./components/AboutPage";
import { Hero } from "./components/Hero";
import { WhySupportUs } from "./components/WhySupportUs";
import { Footer } from "./components/Footer";

/**
 * MainApp Component
 * Encapsulates the core campaign features: Hero, Information, and Form.
 * Served as the main root (/) component.
 */
function MainApp() {
  return (
    <>
      <Hero
        subTitle="Your voice in Parliament"
        titleWhite="Tell Parliament Why SEND Support Matters"
        subheading="The SEND consultation may have ended, but changes to the SEND system will now be shaped through Parliament. As proposals move through the House of Commons and House of Lords, MPs and Peers need to keep hearing directly from parents, carers, professionals and supporters."
      />

      {/* Two Column Content Area */}
      <main
        id="campaign"
        className="flex-1 max-w-full px-4 lg:px-12 py-12 md:py-20 bg-bg-main relative scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 xl:gap-24 relative">
          {/* Left Column: Information Section */}
          <div className="flex-1 lg:w-1/2 space-y-16">
            <WhySupportUs
              title="What happens next?"
              paragraphs={[
                "The Government will review consultation responses before bringing forward its next proposals. Any legislation must then pass through Parliament, with scrutiny in both the House of Commons and House of Lords before it can become law.",
                "That means there is still time to make sure children’s needs, legal rights and access to specialist support remain part of the discussion.",
              ]}
            />
            <WhySupportUs
              title="Why email your MP now?"
              paragraphs={[
                "MPs hear from constituents on many different issues. When parents, carers and professionals take the time to share their experiences, it helps MPs understand the real impact of SEND policy in their local area.",
                "We want them to hear your voice and to get this right.",
                "Currently the government’s approach is on track to result in a number of unintended consequences. So an email can help remind decision-makers that:",
              ]}
              listItems={[
                "Children’s needs must come first",
                "Parents and young people must be heard",
                "The right support must be available in the right setting",
                "Legal rights and routes to challenge must be protected",
                "Changes to the SEND system must avoid unintended harm",
              ]}
              cta={{ label: "Ask your MP to protect children’s SEND rights", href: "#campaign" }}
            />
          </div>

          {/* Right Column: Sticky Form Section (Desktop/Tablet) */}
          <div className="hidden lg:block w-full lg:w-[500px] xl:w-[550px] lg:shrink-0 relative">
            <div className="lg:sticky lg:top-24 mt-8 lg:mt-0 lg:-mt-32 z-20">
              <div className="bg-white rounded-3xl shadow-2xl shadow-brand/10 border border-border-subtle p-2">
                <CampaignSteps />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Closing call to action */}
      <section className="bg-brand text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 shaded-gradient"></div>
        <div className="absolute left-0 top-0 opacity-20 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border-[40px] border-accent rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
            Keep families’ voices in Parliament
          </h2>
          <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
            Continue to email your MP as changes to the SEND system move through Parliament,
            and stay up to date with the latest campaign news, resources and next steps at{" "}
            <a
              href="https://sendmatterscoalition.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-accent"
            >
              SENDMattersCoalition.com
            </a>
            .
          </p>
          <p className="text-base text-slate-400 leading-relaxed">
            Please share this page with others and on your socials - we need to stand up for
            our children.
          </p>
          <div className="pt-4">
            <a
              href="https://sendmatterscoalition.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent-hover text-white rounded-xl px-8 py-4 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              Find out more at SENDMattersCoalition.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Main App Container
 */
function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-bg-subtle text-text-primary flex flex-col font-sans">
        <Header />

        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
