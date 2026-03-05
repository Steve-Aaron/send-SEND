import React from 'react';
import { cn } from '../lib/utils';
import { Search, User, Mail } from 'lucide-react';

/**
 * ProgressIndicator Component
 * A visual step-tracker that allows users to see their progress in the campaign funnel.
 * Supports clicking previous steps to navigate backwards.
 * @param {Object} props - currentStep and onStepClick callback
 */
export function ProgressIndicator({ currentStep, onStepClick, maxReachedStep }) {
    const steps = [
        { num: 1, label: 'Postcode', icon: Search },
        { num: 2, label: 'Your MP', icon: User },
        { num: 3, label: 'Send Email', icon: Mail }
    ];

    return (
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 pb-4 border-b border-border-subtle">
            {steps.map((step, idx) => {
                const isActive = currentStep === step.num;
                const isPast = currentStep > step.num;
                const isClickable = step.num <= maxReachedStep && currentStep !== step.num;
                const Icon = step.icon;

                return (
                    <div key={step.num} className="flex flex-col items-center gap-2 relative z-10">
                        <button
                            onClick={() => isClickable && onStepClick(step.num)}
                            disabled={!isClickable}
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-bold border-2",
                                isActive ? "bg-accent text-white border-accent shadow-md cursor-default" :
                                    isPast ? "bg-accent text-white border-accent" :
                                        "bg-white text-text-secondary border-border-subtle cursor-not-allowed",
                                isClickable ? "cursor-pointer" : ""
                            )}
                        >
                            <Icon size={18} />
                        </button>
                        <span className={cn(
                            "text-xs font-bold sm:text-sm transition-colors duration-300 uppercase tracking-widest",
                            isActive ? "text-brand" :
                                isPast ? "text-accent" : "text-text-secondary/60"
                        )}>
                            {step.label}
                        </span>

                        {/* Connecting lines between nodes */}
                        {idx < steps.length - 1 && (
                            <div
                                className={cn(
                                    "absolute left-full top-5 -mt-[1px] w-full h-[2px] -z-10",
                                    "sm:w-16 w-8",
                                    isPast ? "bg-accent/40" : "bg-border-subtle"
                                )}
                                style={{ marginLeft: '12px' }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
