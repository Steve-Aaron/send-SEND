import React, { useState } from 'react';
import { useParliamentApi } from '../hooks/useParliamentApi';
import { trackPostcodeLookup } from '../utils/analytics';
import { ProgressIndicator } from './ProgressIndicator';
import { EmailGenerator } from './EmailGenerator';
import { MapPin, Search, ArrowRight, ArrowLeft, User } from 'lucide-react';

/**
 * CampaignSteps Component
 * Orchestrates the user flow for finding an MP and generating an email.
 * Maintains state for the current step (1: Postcode, 2: MP Found, 3: Email Edit/Send)
 * and holds data collected across steps.
 */
export function CampaignSteps() {
    const [step, setStep] = useState(1);
    const [maxReachedStep, setMaxReachedStep] = useState(1);
    const [postcode, setPostcode] = useState('');
    const [mpData, setMpData] = useState(null);
    const { lookupPostcode, loading, error } = useParliamentApi();

    const handlePostcodeSubmit = async (e) => {
        e.preventDefault();
        if (!postcode.trim()) return;

        const data = await lookupPostcode(postcode);
        if (data) {
            setMpData(data);
            trackPostcodeLookup(postcode, data);
            setStep(2);
            if (maxReachedStep < 2) setMaxReachedStep(2);
        }
    };

    const handleReset = () => {
        setStep(1);
        setMaxReachedStep(1);
        setPostcode('');
        setMpData(null);
    }

    const handleStepClick = (newStep) => {
        if (newStep <= maxReachedStep) {
            setStep(newStep);
        }
    };

    const handleContinueToEmail = () => {
        setStep(3);
        if (maxReachedStep < 3) setMaxReachedStep(3);
    };

    return (
        <div className="w-full">
            <ProgressIndicator
                currentStep={step}
                maxReachedStep={maxReachedStep}
                onStepClick={handleStepClick}
            />

            <div className="bg-bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-border-subtle relative overflow-hidden">

                {step === 1 && (
                    <div className="space-y-6 relative z-10 animate-fade-in">
                        <div className="text-center">
                            <div className="bg-brand/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="text-brand w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brand mb-2">Find Your MP</h3>
                            <p className="text-text-secondary">Enter your postcode to locate your local representative</p>
                        </div>

                        <form onSubmit={handlePostcodeSubmit} className="space-y-4 pt-4">
                            <div>
                                <input
                                    type="text"
                                    value={postcode}
                                    onChange={(e) => setPostcode(e.target.value)}
                                    placeholder="e.g. SW1A 1AA"
                                    className="w-full bg-white border-2 border-border-strong rounded-xl px-4 py-4 text-center text-xl tracking-widest text-brand placeholder:text-border-strong focus:outline-none focus:ring-0 focus:border-accent transition-all uppercase font-bold"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm text-center font-medium">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !postcode.trim()}
                                className="w-full bg-brand hover:bg-brand-hover shadow-md text-white rounded-xl py-4 font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" /> Locate MP
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && mpData && (
                    <div className="space-y-6 relative z-10 animate-fade-in">
                        <h3 className="text-2xl font-serif font-bold text-brand text-center mb-6">Your Representative</h3>

                        <div className="bg-bg-subtle rounded-2xl p-6 border border-border-subtle flex flex-col items-center text-center">
                            {mpData.portraitUrl ? (
                                <img
                                    src={mpData.portraitUrl}
                                    alt={mpData.name}
                                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 bg-white shadow-md"
                                    style={{ borderColor: mpData.partyColor }}
                                />
                            ) : (
                                <div
                                    className="w-32 h-32 rounded-full mb-4 border-4 shadow-md flex items-center justify-center bg-white"
                                    style={{ borderColor: mpData.partyColor }}
                                >
                                    <User className="w-12 h-12 text-slate-400" />
                                </div>
                            )}

                            <h4 className="text-2xl font-serif font-bold text-brand">{mpData.name}</h4>

                            <div
                                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mt-2 mb-2 shadow-sm border border-black/10"
                                style={{ backgroundColor: mpData.partyColor, color: '#ffffff' }}
                            >
                                {mpData.party}
                            </div>
                            <p className="text-text-secondary font-medium">{mpData.constituency}</p>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleReset}
                                className="flex-1 bg-white border-2 border-border-strong text-text-secondary hover:text-brand hover:border-brand rounded-xl py-4 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <ArrowLeft className="w-5 h-5" /> Back
                            </button>
                            <button
                                onClick={handleContinueToEmail}
                                className="flex-[2] bg-brand hover:bg-brand-hover shadow-md text-white rounded-xl py-4 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Continue <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && mpData && (
                    <EmailGenerator mpData={mpData} postcode={postcode} onBack={() => handleStepClick(2)} />
                )}
            </div>
        </div>
    );
}
