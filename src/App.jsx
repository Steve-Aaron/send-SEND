import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CampaignSteps } from './components/CampaignSteps';
import { InformationSection } from './components/InformationSection';
import { AboutUs } from './components/AboutUs';
import { Privacy } from './components/Privacy';
import { Cookies } from './components/Cookies';
import { MobileNav } from './components/MobileNav';
import { AboutPage } from './components/AboutPage';

/**
 * MainApp Component
 * Encapsulates the core campaign features: Hero, Information, and Form.
 * Served as the main root (/) component.
 */
function MainApp() {
    return (
        <>
            {/* Hero Section */}
            <div className="relative bg-brand py-24 md:py-32 px-6 lg:px-12 overflow-hidden bg-gradient-to-br from-brand to-[#001436]">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/3 translate-y-1/3">
                    <div className="w-96 h-96 border-[40px] border-accent rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="max-w-3xl space-y-6">
                        <div className="inline-block px-4 py-1.5 border border-accent/50 rounded text-xs font-bold uppercase tracking-widest text-accent mb-2">
                            National Campaign
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
                            Tell Your MP<br />
                            <span className="text-accent italic">To Protect SEND.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.
                        </p>
                    </div>
                </div>
            </div>

            {/* Two Column Content Area */}
            <main id="campaign" className="flex-1 max-w-full px-4 lg:px-12 py-12 md:py-20 bg-bg-main relative scroll-mt-24">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 xl:gap-24 relative">

                    {/* Left Column: Information Section */}
                    <div className="flex-1 lg:w-1/2">
                        <InformationSection />
                    </div>

                    {/* Right Column: Sticky Form Section */}
                    <div className="w-full lg:w-[500px] xl:w-[550px] lg:shrink-0 relative">
                        <div className="lg:sticky lg:top-24 mt-8 lg:mt-0 lg:-mt-32 z-20">
                            {/* Decorative shadow layer */}
                            <div className="absolute inset-0 bg-brand/5 rotate-2 rounded-3xl -z-10 translate-y-4 translate-x-3 hidden lg:block"></div>

                            <div className="bg-white rounded-3xl shadow-2xl shadow-brand/10 border border-border-subtle p-2">
                                <CampaignSteps />
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <AboutUs />
        </>
    );
}

/**
 * Main App Container
 * Handles all routing logic, global headers (desktop), and global footers.
 * Initializes the mobile navigation tray component.
 */
function App() {
    return (
        <BrowserRouter basename="/send-SEND">
            <div className="min-h-screen bg-bg-subtle text-text-primary flex flex-col font-sans pb-20 md:pb-0">
                {/* Minimal Header - Hidden on mobile, visible on desktop */}
                <header className="h-20 hidden md:flex items-center justify-between px-6 md:px-12 bg-white border-b border-border-subtle z-50 sticky top-0">
                    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                        {/* Placeholder Logo Image */}
                        <img
                            src="https://placehold.co/150x50/00245D/FFFFFF?text=saveSEND&font=Merriweather"
                            alt="saveSEND Logo"
                            className="h-10 object-contain transition-transform group-hover:scale-105"
                        />
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/about" className="text-sm font-bold text-text-secondary hover:text-brand transition-colors cursor-pointer uppercase tracking-widest">About</Link>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<MainApp />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookies" element={<Cookies />} />
                </Routes>

                <MobileNav />

                <footer className="bg-brand text-white/60 py-12 px-6 lg:px-12 text-sm text-center md:text-left">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                                <img
                                    src="https://placehold.co/120x40/FFFFFF/00245D?text=saveSEND"
                                    alt="saveSEND Logo"
                                    className="h-8 object-contain opacity-50"
                                />
                            </div>
                            <p>A neutral campaign platform designed to allow independent schools and providers to safely engage their communities.</p>
                        </div>
                        <div className="flex flex-col md:items-end justify-center gap-2">
                            <Link to="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
                            <Link to="/cookies" className="hover:text-white transition-colors cursor-pointer">Cookie Policy</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    )
}

export default App;
