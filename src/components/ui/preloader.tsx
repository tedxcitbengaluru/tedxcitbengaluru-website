"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Simulate the loading time (or hook into real asset loading)
    const timer = setTimeout(() => {
      setLoading(false);
      // 2. Wait for the exit animation to finish before unmounting
      setTimeout(onComplete, 1000); 
    }, 2500); // 2.5 seconds of "branding" time

    return () => clearTimeout(timer);
  }, [onComplete]);

  // FIX: Added 'as const' to the array so TypeScript knows it's a valid Bezier curve
  const transition = { duration: 0.8, ease: [0.87, 0, 0.13, 1] as const };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      
      {/* --------------------------------------------------
          TOP SHUTTER (Slides UP)
          -------------------------------------------------- */}
      <motion.div
        className="absolute top-0 w-full bg-[#050505] z-20 flex items-end justify-center pb-2"
        initial={{ height: "50%" }}
        animate={loading ? { height: "50%" } : { height: "0%" }}
        transition={{ ...transition, delay: 0.2 }}
      >
        {/* Top Half of Text (Optional masked effect, or keep clean) */}
      </motion.div>


      {/* --------------------------------------------------
          BOTTOM SHUTTER (Slides DOWN)
          -------------------------------------------------- */}
      <motion.div
        className="absolute bottom-0 w-full bg-[#050505] z-20 flex items-start justify-center pt-2"
        initial={{ height: "50%" }}
        animate={loading ? { height: "50%" } : { height: "0%" }}
        transition={{ ...transition, delay: 0.2 }}
      >
        {/* Bottom Half of Text */}
      </motion.div>


      {/* --------------------------------------------------
          CENTER CONTENT (The "Brand" moment)
          -------------------------------------------------- */}
      <div className="z-30 relative overflow-hidden">
        
        {/* The Text Reveal */}
        <motion.div
          className="relative flex items-center gap-2 overflow-hidden px-4 py-2"
          initial={{ opacity: 1 }}
          animate={loading ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Red Dot */}
          <motion.div
             className="w-2 h-2 bg-[#eb0028] rounded-full"
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Staggered Letter Animation */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white flex">
            {Array.from("TEDxCITBengaluru").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + (i * 0.03), // Stagger effect
                    ease: "backOut" 
                }}
                className="block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* The Loading Line (Underline) */}
        <motion.div 
            className="h-[1px] bg-[#eb0028] mt-2 absolute bottom-0 left-0"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
        
      </div>
      
    </div>
  );
}