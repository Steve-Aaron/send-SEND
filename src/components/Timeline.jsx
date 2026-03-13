import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { TimelineItem } from "./TimelineItem";

/**
 * Timeline Component
 * Wraps a set of items in a scroll-linked timeline UI.
 * Tracks the current active item and drives a vertical progress bar.
 *
 * @param {Object} props - Contains an array of items [{title, description}]
 */
export function Timeline({ items }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Determine the active item based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        items.length - 1,
        Math.floor(latest * items.length + 0.5),
      );
      if (latest > 0 && index !== activeIndex) {
        setActiveIndex(index);
      } else if (latest <= 0) {
        setActiveIndex(0);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, items.length, activeIndex]);

  return (
    <div ref={containerRef} className="relative">
      {/* The Vertical Continuous Line */}
      <div className="absolute left-8.5 md:left-14.5 top-56 bottom-56 w-1 rounded-full overflow-hidden bg-brand/10">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute top-0 left-0 right-0 bottom-0 bg-brand"
        />
      </div>

      {/* Render the items */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <TimelineItem
            key={idx}
            title={item.title}
            description={item.description}
            isActive={idx === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
