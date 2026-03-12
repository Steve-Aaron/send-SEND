import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '../utils/cn';

/**
 * TimelineItem Component
 * Animates text based on its position in the viewport relative to the scroll.
 * 
 * @param {Object} props - Item data: title, description, and isActive.
 */
export function TimelineItem({ title, description, isActive }) {
    return (
        <div className="relative py-24 md:py-32 flex gap-8 md:gap-16 group">
            <div className="relative flex flex-col items-center">
                <motion.div
                    animate={{
                        backgroundColor: isActive ? "var(--color-accent)" : "#ffffff",
                        borderColor: isActive ? "var(--color-accent)" : "rgba(148, 163, 184, 0.3)",
                        scale: isActive ? 1.2 : 1
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-5 h-5 rounded-full border-2 z-10 sticky top-1/2 -mt-2.5 bg-white shadow-sm"
                />
            </div>

            <div className="flex-1 space-y-4 pt-0">
                <motion.h3
                    animate={{
                        opacity: isActive ? 1 : 0.3,
                        scale: isActive ? 1.05 : 1,
                        x: isActive ? 10 : 0
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-serif font-bold text-brand origin-left"
                >
                    {title}
                </motion.h3>

                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 24 : 0
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                >
                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                        {description}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default TimelineItem;
