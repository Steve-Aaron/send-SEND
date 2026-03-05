import React from 'react';
import { motion } from 'framer-motion';

/**
 * AboutUs Component
 * Displays a promotional section about saveSEND's mission.
 * Includes a quote graphic and a call-to-action to read the full consultation.
 */
export function AboutUs() {
    return (
        <section className="bg-brand text-white py-24 md:py-32 relative overflow-hidden">
            {/* Decorative overlaid geometric background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.4) 55%, transparent 60%)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute left-0 top-0 opacity-20 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-96 h-96 border-[40px] border-accent rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-8">
                    <div className="inline-block px-4 py-1.5 border border-accent/50 rounded text-xs font-bold uppercase tracking-widest text-accent mb-2">
                        Why We Are Here
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                        About saveSEND
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                        We believe that every child deserves the right to an education that meets their unique needs. The proposed SEND consultation risks vital funding and critical provisions that families across the UK rely on.
                    </p>
                    <p className="text-base text-slate-400 leading-relaxed">
                        saveSEND is a neutral platform built to empower communities, schools, and independent providers to easily connect with their Members of Parliament. By lowering the barrier to entry for civic engagement, we aim to ensure that the voices of the most vulnerable are heard loud and clear in Westminster.
                    </p>

                    <div className="pt-4">
                        <a href="https://www.gov.uk/government/consultations/send-and-alternative-provision-green-paper" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent-hover text-white rounded-xl px-8 py-4 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                            Read the Full Consultation
                        </a>
                    </div>
                </div>

                <div className="md:w-5/12 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="aspect-[4/5] bg-bg-card rounded-2xl shadow-2xl border flex items-center justify-center p-8 text-center relative overflow-hidden border-white/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand to-[#001436] opacity-90"></div>
                        <div className="relative z-10 text-white/80">
                            <span className="font-serif italic text-3xl text-accent block mb-4">"The true measure of any society can be found in how it treats its most vulnerable members."</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
