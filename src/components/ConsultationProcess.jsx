import React, { useState, useEffect } from 'react';
import { Info, X, ChevronRight } from 'lucide-react';

/**
 * ConsultationProcess Component
 * Explains how a government consultation works across multiple stages.
 * Features an interactive step-by-step layout with detail modals.
 */
export function ConsultationProcess() {
    const [activeModal, setActiveModal] = useState(null);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [activeModal]);

    const stages = [
        {
            id: 'i',
            title: 'Information Gathering',
            desc: 'The Government reviews how SEND support currently works and identifies areas where improvements may be needed. This stage helps highlight issues affecting children, young people and their families.',
            fullDesc: 'During this stage, the Department for Education gathers evidence about how the SEND system currently operates.\n\nThis includes data from local authorities, schools, specialist providers and other organisations involved in supporting children with additional needs.\n\nThe aim is to understand how the system is working in practice and where improvements may be needed.', // make multiline.
            img: 'https://placehold.co/600x400/00245D/FFFFFF?text=Information+Gathering+Stage'
        },
        {
            id: 'ii',
            title: 'Public Consultation',
            desc: 'Parents, professionals and members of the public are invited to share their experiences and views on proposed reforms to the SEND system by 18 May.',
            fullDesc: 'During the consultation period, the Government invites parents, professionals and organisations to share their views on the proposed changes.\n\nConsultation responses help policymakers understand how proposals may affect children, families and schools in practice.\n\nResponses can be submitted by individuals or organisations and are reviewed as part of the policy process.', // make multiline.
            img: 'https://placehold.co/600x400/D4A66E/FFFFFF?text=Public+Consultation+Stage'
        },
        {
            id: 'iii',
            title: 'Policy development',
            desc: 'The Government reviews consultation responses and other evidence before finalising policy decisions and any potential changes to SEND legislation.',
            fullDesc: 'After the consultation closes, all submissions are analyzed. The government then publishes a response detailing which proposals will move forward into law (often as a White Paper or direct legislation). Strong public pushback during stage II is the only way to prevent harmful policies from reaching this final stage.',
            img: 'https://placehold.co/600x400/001436/FFFFFF?text=Policy+Formulation+Stage'
        }
    ];

    return (
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border-subtle relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-bg-subtle rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

            <h3 className="text-3xl font-serif font-bold text-brand mb-12 relative z-10">How the consultation works</h3>

            <div className="relative z-10 space-y-12">
                {/* Vertical joining line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-border-strong to-transparent"></div>

                {stages.map((stage) => (
                    <div key={stage.id} className="relative pl-16 group">
                        {/* Step Number Badge */}
                        <div className="absolute left-0 top-1 w-12 h-12 bg-white border-2 border-border-strong rounded-full flex items-center justify-center font-serif font-bold text-brand shadow-sm transition-colors group-hover:border-accent group-hover:text-accent">
                            {stage.id}
                        </div>

                        <div className="bg-bg-subtle rounded-2xl p-6 border border-border-subtle transition-all duration-300 hover:shadow-md hover:border-accent/30 relative">
                            <h4 className="text-xl font-serif font-bold text-brand mb-2 pr-10">{stage.title}</h4>
                            <p className="text-text-secondary leading-relaxed">
                                {stage.desc}
                            </p>

                            {/* Interactive Info Icon */}
                            <button
                                onClick={() => setActiveModal(stage)}
                                className="absolute right-4 top-4 w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors cursor-pointer"
                                aria-label={`More info about ${stage.title} `}
                            >
                                <Info className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Popup overlay */}
            {activeModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
                    <div className="absolute inset-0 bg-brand/80 backdrop-blur-sm transition-opacity" onClick={() => setActiveModal(null)} onKeyDown={(e) => e.key === 'Escape' && setActiveModal(null)}></div>

                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 transform transition-all animate-fade-in flex flex-col max-h-[90vh]">
                        <button
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 w-10 h-10 bg-black/10 hover:bg-black/20 text-white rounded-full flex items-center justify-center z-20 backdrop-blur-md transition-colors cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="relative h-48 sm:h-64 shrink-0">
                            <img src={activeModal.img} alt={activeModal.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="text-accent font-bold uppercase tracking-widest text-sm mb-1">Stage {activeModal.id}</div>
                                <h3 className="text-3xl font-serif font-bold text-white leading-tight">{activeModal.title}</h3>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            <p className="text-lg text-text-primary leading-relaxed font-medium mb-6">
                                {activeModal.desc}
                            </p>
                            <div className="h-px w-full bg-border-subtle mb-6"></div>
                            <p className="text-text-secondary leading-relaxed space-y-4">
                                {activeModal.fullDesc}
                            </p>
                        </div>

                        <div className="p-6 bg-bg-subtle border-t border-border-subtle shrink-0 flex justify-end">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="bg-brand hover:bg-brand-hover text-white rounded-xl px-6 py-3 font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
                            >
                                Understood <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
