import React from "react";
import { motion } from "framer-motion";
import { QuoteIcon } from "lucide-react";

/**
 * Quote Component
 * Displays the high-impact final quote and call to action.
 */
export function Quote({ quote, speaker }) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative p-12 md:p-20 bg-brand rounded-[3rem] overflow-hidden text-center shadow-2xl"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_1px)] bg-[length:32px_32px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-accent font-serif text-2xl md:text-3xl text-white mb-4 block select-none opacity-100">
            {quote}
          </span>
          <h3 className="text-2xl md:text-4xl font-serif italic text-white leading-relaxed"></h3>
          <p className="text-accent font-bold uppercase tracking-widest text-sm pt-4">
            {speaker}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
