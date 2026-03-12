import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { CampaignSteps } from "./components/CampaignSteps";
import { AboutUs } from "./components/AboutUs";
import { Privacy } from "./components/Privacy";
import { Cookies } from "./components/Cookies";
import { MobileNav } from "./components/MobileNav";
import { AboutPage } from "./components/AboutPage";
import { Hero } from "./components/Hero";
import { WhySupportUs } from "./components/WhySupportUs";
import { ConsultationProcess } from "./components/ConsultationProcess";
import { Footer } from "./components/Footer";
import { AboutQuote } from "./components/aboutUsHomepage";
import { Timeline } from "./components/Timeline";
import { Quote } from "./components/Quote";

/**
 * MainApp Component
 * Encapsulates the core campaign features: Hero, Information, and Form.
 * Served as the main root (/) component.
 */
function MainApp() {
  return (
    <>
      <Hero
        subTitle="Your views on SEND reform"
        titleWhite="Email your MP" // and those who will determine our children’s future
        titleAccent="To Protect SEND"
        subheading="The Government has published much-needed proposals to reform the Special Educational Needs and Disabilities (SEND) system. Whilst we welcome much that is proposed, there are clear dangers that change will bring. Together, we aim to ensure that these dangers are avoided. The consequences for the future provision of our children’s future could be catastrophic if not understood and addressed by the Government in its Consultation.
Parents, teachers and professionals can contribute their views during the consultation period.
"
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
              title="SEND Reform Consultation"
              paragraphs={[
                "The Government has proposed reforms to the Special Educational Needs and Disabilities (SEND) system.",
                "These proposals could affect how support is delivered in schools, how funding works, and how children with different levels of need are supported.",
                "The consultation process allows parents, teachers and members of the public to share their experiences and views before policy decisions are finalised.",
                "Many children with additional needs are supported successfully in mainstream schools.",
                "Others require more specialist support because of the complexity of their needs.",
                "The current consultation includes proposals that could affect how support is provided across the system, which is why many families and professionals are taking part in the discussion.",
              ]}
            />
            <ConsultationProcess />
          </div>

          {/* Right Column: Sticky Form Section */}
          <div className="w-full lg:w-[500px] xl:w-[550px] lg:shrink-0 relative">
            <div className="lg:sticky lg:top-24 mt-8 lg:mt-0 lg:-mt-32 z-20">
              <div className="bg-white rounded-3xl shadow-2xl shadow-brand/10 border border-border-subtle p-2">
                <CampaignSteps />
              </div>
            </div>
          </div>
        </div>
      </main>
      <AboutQuote
        title="Your views matter"
        heading="Write to your MP"
        p1="Members of Parliament represent the concerns of families in their constituencies. Writing to your MP is one way to ensure that your experience of SEND support is part of the national discussion."
        p2="Use our ‘Find Your MP’ Tool to send your local MP your views by email. You can edit the email, adding personal arguments, before you send.’"
        cta="Read the Full Consultation"
        quote="Decisions about SEND policy affect children, families and schools across the country. The consultation process is an opportunity for parents and professionals to share their experiences and explain what works well and what needs to improve."
        link="https://consult.education.gov.uk/send-strategy-division/send-reform-putting-children-and-young-people-firs/"
      />

      {/* </><AboutUs /> */}
      <Quote
        quote="Decisions about SEND policy affect children, families and schools across the country. The consultation process is an opportunity for parents and professionals to share their experiences and explain what works well and what needs to improve."
        speaker="Test Testerson"
      />
      <div className="pb-20"></div>
    </>
  );
}

/**
 * Main App Container
 */
function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-bg-subtle text-text-primary flex flex-col font-sans pb-20 md:pb-0">
        {/* Global Header */}
        <header className="h-20 hidden md:flex items-center justify-between px-6 md:px-12 bg-white border-b border-border-subtle z-50 sticky top-0">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="https://placehold.co/150x50/00245D/FFFFFF?text=saveSEND&font=Merriweather"
              alt="saveSEND Logo"
              className="h-10 object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/about"
              className="text-sm font-bold text-text-secondary hover:text-brand transition-colors cursor-pointer uppercase tracking-widest"
            >
              About
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>

        <MobileNav />
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
