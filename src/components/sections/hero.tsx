"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SUB_THEMES = [
  {
    id: "genesis",
    title: "GENESIS",
    subtitle: "The Origin Point",
    desc: "The moment an idea becomes intention, and intention becomes action. It isn't about success, but the spark—the point where the map is drawn.",
  },
  {
    id: "vista",
    title: "VISTA",
    subtitle: "The Broad Horizon",
    desc: "The journey takes shape through perspective. Progress is not only about moving forward, but about learning to perceive the path differently.",
  },
  {
    id: "forge",
    title: "FORGE",
    subtitle: "The Crucible",
    desc: "Growth built through effort, pressure, and persistence. Potential is tested and refined into strength, shaping resilience from resistance.",
  },
  {
    id: "obscura",
    title: "OBSCURA",
    subtitle: "The Unknown Depths",
    desc: "Clarity fades and uncertainty takes over. A space of introspection and confronting the unseen, preparing the spirit for deeper transformation.",
  },
  {
    id: "kintsugi",
    title: "KINTSUGI",
    subtitle: "The Golden Repair",
    desc: "The profound beauty in healing from life's fractures. Embracing wounds as badges of endurance, celebrating the beauty in imperfection.",
  },
];

export default function CinematicJourneyHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- COUNTDOWN TIMER LOGIC ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-03-27T11:00:00+05:30").getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- SCROLL PHYSICS (Hardware Accelerated) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, { damping: 30, stiffness: 60, mass: 1 });
  const anchorLineHeight = useTransform(smoothScroll, [0, 0.9], ["0%", "100%"]);

  // --- ENVIRONMENTAL FADES (The Submersion Effect) ---
  const surfaceOpacity = useTransform(smoothScroll, [0, 0.4], [1, 0]);

  // --- INTRO SCREEN FADE ---
  const introOpacity = useTransform(smoothScroll, [0, 0.05], [1, 0]);
  const introY = useTransform(smoothScroll, [0, 0.05], [0, -100]);
  const introScale = useTransform(smoothScroll, [0, 0.05], [1, 1.05]);

  return (
    <main ref={containerRef} className="relative w-full h-[700vh] bg-[#010305] text-white font-sans selection:bg-[#E62B1E] selection:text-white">
      
      {/* =========================================
          NATIVE HEADER (Untouched)
      ========================================= */}
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-auto bg-black">
        <Header />
      </div>

      {/* =========================================
          THE STICKY VIEWPORT (The Living Canvas)
      ========================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center transform-gpu">
        
        {/* =========================================
            BACKGROUND 1: THE ABYSSAL VOID
        ========================================= */}
        <div className="absolute inset-0 w-full h-full z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#081a24] via-[#020608] to-[#000000]">
          <div className="absolute inset-0 opacity-[0.05] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
          
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <div className="marine-snow layer-1"></div>
            <div className="marine-snow layer-2"></div>
            <div className="marine-snow layer-3"></div>
          </div>
        </div>

        {/* =========================================
            BACKGROUND 2: HYPER-REALISTIC SURFACE WATER
        ========================================= */}
        <motion.div 
          style={{ opacity: surfaceOpacity }}
          className="absolute inset-0 z-10 pointer-events-none will-change-opacity transform-gpu"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[-10%] left-[10%] w-[30%] h-[150%] bg-gradient-to-b from-cyan-200/10 to-transparent blur-[60px] animate-sway-1 origin-top transform-gpu"></div>
            <div className="absolute top-[-10%] left-[50%] w-[40%] h-[150%] bg-gradient-to-b from-blue-300/10 to-transparent blur-[80px] animate-sway-2 origin-top transform-gpu"></div>
            <div className="absolute top-[-10%] left-[80%] w-[20%] h-[150%] bg-gradient-to-b from-teal-200/10 to-transparent blur-[50px] animate-sway-1 origin-top transform-gpu" style={{ animationDelay: '-3s' }}></div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full opacity-40 mix-blend-color-dodge">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <filter id="water-ripple">
                <feTurbulence type="fractalNoise" baseFrequency="0.015 0.05" numOctaves="3" result="noise">
                  <animate attributeName="baseFrequency" values="0.015 0.05; 0.02 0.07; 0.015 0.05" dur="15s" repeatCount="indefinite" />
                </feTurbulence>
                <feColorMatrix type="matrix" values="0 0 0 0 0.2   0 0 0 0 0.6   0 0 0 0 0.8   0 0 0 1 0" in="noise" />
              </filter>
              <rect width="100%" height="100%" filter="url(#water-ripple)" />
            </svg>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e3b52]/40 via-transparent to-transparent mix-blend-overlay"></div>
        </motion.div>

        {/* The Anchor Line */}
        <motion.div 
          style={{ height: anchorLineHeight }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-cyan-300/50 via-white/20 to-white/0 z-10 pointer-events-none will-change-transform"
        />

        {/* THE DRIFTING WRAPPER (Text Content) */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center animate-drift pointer-events-none">
          
          {/* --- 0. THE INTRO SCREEN --- */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4"
            style={{ opacity: introOpacity, y: introY, scale: introScale }}
          >
            {/* UPDATED: White text in a sleek glass pill */}
            <div className="bg-white/10 border border-white/20 px-6 py-2.5 rounded-full mb-6 backdrop-blur-md shadow-xl">
              <p className="text-white font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold animate-pulse drop-shadow-md">
                A drift in the unknown
              </p>
            </div>
            
            <h1 className="text-7xl sm:text-8xl md:text-[12rem] lg:text-[15rem] font-serif text-white tracking-tight drop-shadow-[0_20px_60px_rgba(0,180,255,0.2)] leading-none text-center mix-blend-screen">
              ARC
            </h1>
            <p className="mt-4 md:mt-0 text-xl md:text-3xl lg:text-4xl text-cyan-50 font-serif italic tracking-[0.2em] text-center drop-shadow-xl">
              The Wayfarer's Map
            </p>

            {/* Ultra-Minimalist Editorial Timer */}
            <div className="mt-16 md:mt-24 flex items-center justify-center gap-6 md:gap-12">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-6xl font-light text-white tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    {value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-200/60 mt-3">
                    {unit}
                  </span>
                </div>
              ))}
            </div>
            
            {/* UPDATED: Venue and Time inside a sleek box */}
            <div className="mt-16 border border-white/10 bg-[#050505]/60 backdrop-blur-md px-8 md:px-12 py-5 md:py-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
              <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-white text-center leading-relaxed">
                27th March 2026 <span className="mx-3 text-[#E62B1E]">|</span> 11 AM<br/>
                <span className="opacity-70 text-[8px] md:text-[9px] mt-2 block tracking-[0.5em]">Cambridge Institute of Technology</span>
              </p>
            </div>
          </motion.div>

          {/* --- 1-5. THE WAYPOINTS (The Descent) --- */}
          {SUB_THEMES.map((theme, index) => (
            <Waypoint 
              key={theme.id} 
              text={theme} 
              index={index} 
              scrollYProgress={smoothScroll} 
              total={SUB_THEMES.length} 
            />
          ))}
        </div>

        {/* --- 6. THE TREASURE REVEAL (Poster & Final CTA) --- */}
        {/* UPDATED: Moved outside the drifting wrapper to prevent gaps and ensure full-screen lock */}
        <PosterReveal scrollYProgress={smoothScroll} />

      </div>

      {/* =========================================
          GLOBAL STYLES & PHYSICS
      ========================================= */}
      <style dangerouslySetInnerHTML={{__html: `
        /* The Helpless Drift (Simulates being on a boat without oars) */
        @keyframes drift {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(0.5deg); }
          66% { transform: translateY(8px) rotate(-0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-drift {
          animation: drift 14s ease-in-out infinite;
        }

        /* God Rays Swaying underwater */
        @keyframes sway {
          0% { transform: rotate(15deg); opacity: 0.6; }
          50% { transform: rotate(10deg); opacity: 0.8; }
          100% { transform: rotate(15deg); opacity: 0.6; }
        }
        @keyframes sway-reverse {
          0% { transform: rotate(-12deg); opacity: 0.5; }
          50% { transform: rotate(-18deg); opacity: 0.9; }
          100% { transform: rotate(-12deg); opacity: 0.5; }
        }
        .animate-sway-1 { animation: sway 12s ease-in-out infinite alternate; }
        .animate-sway-2 { animation: sway-reverse 15s ease-in-out infinite alternate; }

        /* CTA Button Shimmer */
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        /* Parallax Marine Snow */
        .marine-snow {
          position: absolute;
          width: 2px;
          height: 2px;
          background: transparent;
          border-radius: 50%;
        }
        .layer-1 {
          animation: driftUp 25s linear infinite;
          box-shadow: 10vw 110vh 1px 0px rgba(255,255,255,0.4), 30vw 150vh 2px 1px rgba(255,255,255,0.2), 60vw 120vh 1px 0px rgba(255,255,255,0.3), 80vw 180vh 2px 0px rgba(255,255,255,0.2), 90vw 130vh 1px 1px rgba(255,255,255,0.4);
        }
        .layer-2 {
          width: 3px; height: 3px;
          animation: driftUp 35s linear infinite;
          box-shadow: 15vw 120vh 2px 1px rgba(255,255,255,0.15), 45vw 160vh 1px 0px rgba(255,255,255,0.3), 75vw 110vh 2px 1px rgba(255,255,255,0.1), 20vw 190vh 1px 0px rgba(255,255,255,0.3);
        }
        .layer-3 {
          width: 1px; height: 1px;
          animation: driftUp 45s linear infinite;
          box-shadow: 5vw 105vh 1px 0px rgba(255,255,255,0.2), 25vw 145vh 1px 0px rgba(255,255,255,0.3), 55vw 185vh 1px 0px rgba(255,255,255,0.15), 85vw 125vh 1px 0px rgba(255,255,255,0.4);
        }
        @keyframes driftUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100vh); }
        }
      `}} />
    </main>
  );
}

// -----------------------------------------------------------------
// WAYPOINT COMPONENT (Optimized - Removed blur to fix lag)
// -----------------------------------------------------------------
function Waypoint({ text, index, scrollYProgress, total }: { text: any, index: number, scrollYProgress: any, total: number }) {
  const usableScroll = 0.70;
  const segmentLength = usableScroll / total;
  
  const start = 0.08 + (index * segmentLength);
  const end = start + segmentLength;
  
  const fadeInEnd = start + (segmentLength * 0.25);
  const fadeOutStart = end - (segmentLength * 0.25);

  const opacity = useTransform(
    scrollYProgress, 
    [start, fadeInEnd, fadeOutStart, end], 
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [start, fadeInEnd, fadeOutStart, end], 
    [0.95, 1, 1, 1.05]
  );
  
  const y = useTransform(
    scrollYProgress, 
    [start, fadeInEnd, fadeOutStart, end], 
    [80, 0, 0, -80]
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 pointer-events-none will-change-transform transform-gpu"
    >
      <div className="max-w-4xl flex flex-col items-center">
        <div className="flex flex-col items-center gap-3 mb-8 md:mb-12">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white"></div>
          {/* UPDATED: White text in a sleek glass pill */}
          <div className="bg-white/10 border border-white/20 px-5 py-2 rounded-full backdrop-blur-sm shadow-lg">
            <p className="text-white font-mono tracking-[0.5em] text-[9px] md:text-[10px] uppercase font-bold drop-shadow-md">
              Marker 0{index + 1}
            </p>
          </div>
        </div>
        
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-serif text-white tracking-tight leading-none mb-4 md:mb-6 mix-blend-screen drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {text.title}
        </h2>
        
        <h3 className="text-lg sm:text-xl md:text-3xl text-white/70 font-serif italic tracking-[0.15em] mb-8 md:mb-12">
          {text.subtitle}
        </h3>
        
        <p className="text-white/50 text-[11px] md:text-sm leading-loose md:leading-loose tracking-[0.25em] uppercase max-w-[85%] md:max-w-2xl mx-auto drop-shadow-xl">
          {text.desc}
        </p>
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------
// POSTER REVEAL & FINAL CTA (Optimized for Full Screen & No Gaps)
// -----------------------------------------------------------------
function PosterReveal({ scrollYProgress }: { scrollYProgress: any }) {
  const revealStart = 0.82;
  const revealEnd = 0.98;

  const opacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]);
  const y = useTransform(scrollYProgress, [revealStart, revealEnd], [50, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-50 pointer-events-none will-change-transform transform-gpu bg-black"
    >
      {/* UPDATED: Absolute full screen container to remove gaps */}
      <div className="absolute inset-0 w-full h-full z-10">
        <img 
          src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1773212881/1920x1080_v5fr79.png" 
          alt="ARC The Wayfarer's Map" 
          className="w-full h-full object-scale-down object-center"
        />
        {/* Gradient shadow to ensure button text is perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      {/* Button fixed to the bottom of the screen */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-24 md:pb-32 z-20 pointer-events-auto">
        <Link
          href="/tickets"
          className="
            group relative flex items-center justify-center gap-4
            px-12 py-5 md:px-16 md:py-6
            bg-white text-black
            font-bold uppercase tracking-[0.4em] text-xs md:text-sm
            transition-all duration-500 ease-out
            hover:bg-[#E62B1E] hover:text-white
            hover:shadow-[0_0_40px_rgba(230,43,30,0.5)]
            overflow-hidden
          "
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer pointer-events-none"></div>
          
          <span className="relative whitespace-nowrap">Secure Passage</span>

          <svg
            className="relative w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}