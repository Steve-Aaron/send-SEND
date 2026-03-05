import React, { useState, useEffect } from 'react';
import { Home, Info, Mail, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CampaignSteps } from './CampaignSteps';

/**
 * MobileNav Component
 * Provides a bottom navigation tray exclusively for mobile devices.
 * Implements a floating Action Button (FAB) for "Contact your MP".
 */
export function MobileNav() {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="md:hidden fixed bottom-0 left-0 right-0 z-[100] pb-safe"
                    >
                        {/* The main tray */}
                        <div className="bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] px-6 py-3 flex justify-between items-center relative">

                            {/* Left: Home */}
                            <Link to="/" className="flex flex-col items-center gap-1 group w-16">
                                <Home className={`w-6 h-6 transition-colors ${location.pathname === '/' ? 'text-brand' : 'text-slate-400 group-hover:text-brand'}`} />
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${location.pathname === '/' ? 'text-brand' : 'text-slate-400'}`}>Home</span>
                            </Link>

                            {/* Center: Floating Action Button */}
                            <div className="absolute left-1/2 -top-6 -translate-x-1/2">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center justify-center w-16 h-16 bg-accent rounded-full shadow-lg shadow-accent/30 text-white transform transition-transform active:scale-95 group cursor-pointer"
                                >
                                    <Mail className="w-7 h-7 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>

                            {/* Right: About Us */}
                            <Link to="/about" className="flex flex-col items-center gap-1 group w-16">
                                <Info className={`w-6 h-6 transition-colors ${location.pathname === '/about' ? 'text-brand' : 'text-slate-400 group-hover:text-brand'}`} />
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${location.pathname === '/about' ? 'text-brand' : 'text-slate-400'}`}>About</span>
                            </Link>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Email Form Popup Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-4 z-[200] flex flex-col md:hidden overflow-y-auto"
                    >
                        <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-sm">
                            <span className="font-serif font-bold text-brand text-lg">Contact Your MP</span>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 bg-bg-main h-75vh">
                            <CampaignSteps />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
