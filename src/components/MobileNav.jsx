import React from 'react';
import { Home, Info, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MobileNav Component
 * Provides a bottom navigation tray exclusively for mobile devices.
 * Implements a floating Action Button (FAB) for "Contact your MP".
 */
export function MobileNav() {
    const location = useLocation();

    const handleSendClick = () => {
        if (location.pathname !== '/') {
            window.location.hash = '#/campaign-hero';
        } else {
            const element = document.getElementById('campaign-hero');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="md:hidden fixed bottom-12 left-0 right-0 z-[100] pb-safe pointer-events-none"
            >
                {/* The main tray */}
                <div className="max-w-[calc(100%-48px)] mx-auto bg-white/90 backdrop-blur-md border border-slate-200 rounded-full shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] px-8 py-3 flex justify-between items-center relative pointer-events-auto">

                    {/* Left: Home */}
                    <Link to="/" className="flex flex-col items-center gap-1 group w-12">
                        <Home className={`w-5 h-5 transition-colors ${location.pathname === '/' ? 'text-brand' : 'text-slate-400 group-hover:text-brand'}`} />
                        <span className={`text-[8px] font-bold uppercase tracking-wider ${location.pathname === '/' ? 'text-brand' : 'text-slate-400'}`}>Home</span>
                    </Link>

                    {/* Center: Floating Action Button */}
                    <div className="absolute left-1/2 -top-6 -translate-x-1/2">
                        <button
                            onClick={handleSendClick}
                            className="flex flex-col items-center justify-center w-14 h-14 bg-accent rounded-full shadow-lg shadow-accent/30 text-white transform transition-transform active:scale-95 group cursor-pointer"
                        >
                            <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="text-[8px] font-bold uppercase">Send</span>
                        </button>
                    </div>

                    {/* Right: About Us */}
                    <Link to="/about" className="flex flex-col items-center gap-1 group w-12">
                        <Info className={`w-5 h-5 transition-colors ${location.pathname === '/about' ? 'text-brand' : 'text-slate-400 group-hover:text-brand'}`} />
                        <span className={`text-[8px] font-bold uppercase tracking-wider ${location.pathname === '/about' ? 'text-brand' : 'text-slate-400'}`}>About</span>
                    </Link>

                </div>
            </motion.div>
        </AnimatePresence>
    );
}
