import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * AboutPage Component
 * A standalone, immersive page detailing "How the consultation works".
 * Inspired by xfiner.com's #how-xf-helps section.
 * Features a 50/50 sticky split layout on desktop, stacking on mobile.
 */
export function AboutPage() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const steps = [
        {
            title: "Information Gathering",
            subtitle: "Stage I — The foundation of policy change",
            description: "The Government reviews how SEND support currently works and identifies areas where improvements may be needed. This stage helps highlight issues affecting children, young people and their families.",
            color: "text-slate-500"
        },
        {
            title: "Public Consultation",
            subtitle: "Stage II — Your opportunity to speak",
            description: "Parents, professionals and members of the public are invited to share their experiences and views on proposed reforms to the SEND system by 18 May.",
            color: "text-slate-500"
        },
        {
            title: "Policy development",
            subtitle: "Stage III — Finalizing the new framework",
            description: "The Government reviews consultation responses and other evidence before finalising policy decisions and any potential changes to SEND legislation.",
            color: "text-slate-500"
        }
    ];

    return (
        <div className="min-h-screen bg-bg-subtle flex flex-col items-center">
            <div className="w-full flex flex-col md:flex-row min-h-screen">

                {/* Left Column: Sticky Graphic */}
                <div className="w-full md:w-1/2 bg-brand md:sticky md:top-0 md:h-screen flex items-center justify-center p-12 overflow-hidden relative min-h-[50vh] md:min-h-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand to-[#001436]"></div>
                    {/* Glowing orb effect aligned with saveSEND branding */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] md:w-[120%] lg:w-[90%] aspect-square rounded-full bg-accent/10 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%] md:w-[80%] lg:w-[60%] aspect-square rounded-full bg-accent/20 blur-2xl"></div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative z-10 w-48 h-48 md:w-64 md:h-64 border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-8 shadow-2xl"
                    >
                        <Shield className="w-16 h-16 md:w-24 md:h-24 text-accent mb-4" />
                        <span className="text-white font-bold text-xl md:text-2xl font-serif">saveSEND</span>
                    </motion.div>
                </div>

                {/* Right Column: Scrollable Content */}
                <div className="w-full md:w-1/2 bg-bg-subtle px-8 py-20 md:px-16 md:py-32 flex flex-col justify-center">
                    <div className="max-w-xl mx-auto">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="mb-20"
                        >
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand leading-tight mb-6">
                                How saveSEND<br />amplifies your voice
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                We transform complex government processes into simple actions you can take in minutes. The current SEND consultation requires overwhelming public response to protect our children's future. Here's exactly how the process works and why your voice matters right now.
                            </p>
                        </motion.div>

                        <div className="space-y-24">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="border-t border-slate-300 pt-8"
                                >
                                    <h3 className={`text-xl md:text-2xl font-serif font-bold ${step.color} mb-2`}>
                                        {step.subtitle}
                                    </h3>
                                    <h4 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                                        {step.title}
                                    </h4>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="mt-24 pt-12 border-t border-slate-300"
                        >
                            <Link to="/" className="inline-block bg-accent hover:bg-accent-hover text-white rounded-xl px-8 py-4 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                                Back to Campaign
                            </Link>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
}
