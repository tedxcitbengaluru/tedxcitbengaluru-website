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

  // --- SCROLL PHYSICS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- HELM (STEERING WHEEL) PHYSICS ---
  const rawRotation = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const smoothRotation = useSpring(rawRotation, { damping: 40, stiffness: 80, mass: 1.5 });

  const helmOpacity = useTransform(scrollYProgress, [0.8, 0.85], [1, 0]);
  const helmY = useTransform(scrollYProgress, [0.8, 0.85], [0, 150]);

  // --- CINEMATIC LIGHTING & BACKGROUND ---
  const oceanBackground = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8],
    [
      "radial-gradient(circle at 50% 0%, #082d40 0%, #01070a 80%)", 
      "radial-gradient(circle at 50% 20%, #051b26 0%, #000405 80%)", 
      "radial-gradient(circle at 50% 40%, #0f0404 0%, #000000 80%)", 
      "radial-gradient(circle at 50% 60%, #000000 0%, #000000 100%)", 
      "radial-gradient(circle at 50% 100%, #1a1403 0%, #000000 100%)", 
    ]
  );

  // --- INTRO SCREEN FADE ---
  const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.05], [0, -100]);
  const introScale = useTransform(scrollYProgress, [0, 0.05], [1, 1.05]);

  return (
    <main ref={containerRef} className="relative w-full h-[700vh] bg-black text-white font-sans selection:bg-[#E62B1E] selection:text-white">
      
      {/* =========================================
          THE HEADER WRAPPER
      ========================================= */}
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-auto force-header-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        <Header />
      </div>

      {/* =========================================
          THE STICKY VIEWPORT (The Living Canvas)
      ========================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Dynamic Ocean Atmosphere & Hyper-Realistic Caustics */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          style={{ background: oceanBackground }}
        >
          <div className="absolute inset-0 opacity-[0.15] mix-blend-color-dodge animate-caustics pointer-events-none"></div>
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10 pointer-events-none"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,1)] z-10 pointer-events-none"></div>
        </motion.div>

        {/* --- 0. THE INTRO SCREEN --- */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-start pt-[15vh] md:pt-[18vh] z-20 pointer-events-none px-4 w-full"
          style={{ opacity: introOpacity, y: introY, scale: introScale }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[25vh] bg-gradient-to-b from-cyan-200/30 to-transparent blur-[2px] -z-10"></div>
          
          <h1 className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-serif text-white tracking-widest drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] leading-none mix-blend-screen text-center">
            ARC
          </h1>
          <p className="mt-4 md:mt-2 text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#e0e0e0] font-serif italic tracking-[0.3em] uppercase drop-shadow-2xl text-center">
            The Wayfarer's Map
          </p>

          {/* SLEEK COUNTDOWN TIMER */}
          <div className="mt-12 md:mt-16 flex flex-col items-center max-w-full">
            <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 backdrop-blur-xl bg-white/5 border border-white/10 px-4 sm:px-8 md:px-10 py-4 md:py-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center justify-center w-10 sm:w-14 md:w-16">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-serif text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] tabular-nums">
                    {value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[7px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-[#E62B1E] mt-2">
                    {unit}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="mt-6 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-white/60 text-center leading-relaxed">
              27th March 2026 | 11 AM<br/>
              <span className="opacity-70 text-[8px] sm:text-[9px] md:text-[10px] text-white/50">Cambridge Institute of Technology, Bengaluru</span>
            </p>
          </div>
        </motion.div>

        {/* --- 1-5. THE WAYPOINTS (The Descent) --- */}
        {SUB_THEMES.map((theme, index) => (
          <Waypoint 
            key={theme.id} 
            text={theme} 
            index={index} 
            scrollYProgress={scrollYProgress} 
            total={SUB_THEMES.length} 
          />
        ))}

        {/* --- 6. THE TREASURE REVEAL (Poster & Final CTA) --- */}
        <PosterReveal scrollYProgress={scrollYProgress} />

        {/* =========================================
            THE LUXURY MAHOGANY & BRASS HELM
        ========================================= */}
        <motion.div 
          style={{ y: helmY, opacity: helmOpacity }}
          className="absolute bottom-[-10%] md:bottom-[-15%] left-1/2 -translate-x-1/2 z-40 pointer-events-none drop-shadow-[0_-30px_60px_rgba(0,0,0,1)]"
        >
          <motion.div
            style={{ rotate: smoothRotation }}
            className="relative w-[75vw] max-w-[320px] md:w-[450px] aspect-square will-change-transform"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full object-contain">
              <defs>
                <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="25%" stopColor="#aa8222" />
                  <stop offset="50%" stopColor="#f9df9f" />
                  <stop offset="75%" stopColor="#856414" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
                <linearGradient id="wood" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a0a04" />
                  <stop offset="50%" stopColor="#3d1d0c" />
                  <stop offset="100%" stopColor="#0f0502" />
                </linearGradient>
                <filter id="shadow-heavy">
                  <feDropShadow dx="0" dy="15" stdDeviation="10" floodColor="#000" floodOpacity="0.9"/>
                  <feDropShadow dx="0" dy="-2" stdDeviation="2" floodColor="#fff" floodOpacity="0.1"/>
                </filter>
              </defs>

              <g filter="url(#shadow-heavy)">
                <circle cx="100" cy="100" r="75" fill="none" stroke="url(#wood)" strokeWidth="18" />
                <circle cx="100" cy="100" r="84" fill="none" stroke="url(#brass)" strokeWidth="1.5" opacity="0.9" />
                <circle cx="100" cy="100" r="66" fill="none" stroke="url(#brass)" strokeWidth="1.5" opacity="0.9" />

                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <g key={`spoke-${deg}`} transform={`rotate(${deg} 100 100)`}>
                    <path d="M 96 15 L 104 15 L 101 66 L 99 66 Z" fill="url(#wood)" />
                    <rect x="95" y="35" width="10" height="4" fill="url(#brass)" rx="1" />
                    <path d="M 97 2 L 103 2 L 105 15 L 95 15 Z" fill="url(#wood)" />
                    <circle cx="100" cy="2" r="3" fill="url(#brass)" />
                  </g>
                ))}

                <circle cx="100" cy="100" r="18" fill="url(#wood)" stroke="#000" strokeWidth="2" />
                <circle cx="100" cy="100" r="10" fill="url(#brass)" />
                <circle cx="100" cy="100" r="4" fill="#111" />
              </g>
            </svg>
          </motion.div>
        </motion.div>

      </div>

      {/* =========================================
          GLOBAL STYLES & OVERRIDES
      ========================================= */}
      <style dangerouslySetInnerHTML={{__html: `
        .force-header-white a, 
        .force-header-white p, 
        .force-header-white span, 
        .force-header-white button {
          color: #ffffff !important;
        }
        .force-header-white svg:not(.ignore-override) {
          stroke: #ffffff;
        }
        @keyframes energy {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-energy {
          animation: energy 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1.5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-caustics {
          background-image: 
            radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%);
          background-size: 200% 200%;
          animation: causticsMove 15s ease-in-out infinite alternate;
        }
        @keyframes causticsMove {
          0% { background-position: 0% 0%; opacity: 0.1; }
          50% { opacity: 0.2; }
          100% { background-position: 100% 100%; opacity: 0.1; }
        }
      `}} />
    </main>
  );
}

// -----------------------------------------------------------------
// WAYPOINT COMPONENT (With Locking "Plateau" Physics)
// -----------------------------------------------------------------
function Waypoint({ text, index, scrollYProgress, total }: { text: any, index: number, scrollYProgress: any, total: number }) {
  const usableScroll = 0.70;
  const segmentLength = usableScroll / total;
  
  const start = 0.08 + (index * segmentLength);
  const end = start + segmentLength;
  
  const fadeInEnd = start + (segmentLength * 0.2);
  const fadeOutStart = end - (segmentLength * 0.2);

  const opacity = useTransform(
    scrollYProgress, 
    [start, fadeInEnd, fadeOutStart, end], 
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [start, fadeInEnd, fadeOutStart, end], 
    [0.9, 1, 1, 1.1]
  );
  
  const blur = useTransform(
    scrollYProgress, 
    [start, fadeInEnd, fadeOutStart, end], 
    ["blur(15px)", "blur(0px)", "blur(0px)", "blur(15px)"]
  );
  
  const y = useTransform(
    scrollYProgress, 
    [start, fadeInEnd, fadeOutStart, end], 
    [50, 0, 0, -50]
  );

  return (
    <motion.div
      style={{ opacity, scale, filter: blur, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 pointer-events-none z-20"
    >
      <div className="max-w-4xl flex flex-col items-center mt-[-10vh] md:mt-[-15vh]">
        <div className="flex items-center gap-4 mb-6 md:mb-8 opacity-70">
          <span className="w-8 md:w-12 h-px bg-white"></span>
          <p className="text-[#E62B1E] font-mono tracking-[0.4em] text-[9px] md:text-[10px] uppercase">
            MARKER 0{index + 1}
          </p>
          <span className="w-8 md:w-12 h-px bg-white"></span>
        </div>
        
        <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] font-serif text-white uppercase tracking-[0.1em] drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] mb-3 md:mb-4">
          {text.title}
        </h2>
        
        <h3 className="text-lg sm:text-xl md:text-3xl text-[#d4af37] font-serif italic tracking-[0.2em] mb-6 md:mb-10 drop-shadow-md">
          {text.subtitle}
        </h3>
        
        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-loose md:leading-loose tracking-[0.2em] md:tracking-[0.3em] uppercase max-w-[90%] md:max-w-2xl mx-auto border-t border-white/10 pt-6 md:pt-8 px-2 md:px-4">
          {text.desc}
        </p>
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------
// POSTER REVEAL & FINAL CTA (The "Treasure")
// -----------------------------------------------------------------
function PosterReveal({ scrollYProgress }: { scrollYProgress: any }) {
  const revealStart = 0.85;
  const revealEnd = 0.98;

  const opacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]);
  const y = useTransform(scrollYProgress, [revealStart, revealEnd], [150, 0]);
  const glowOpacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 0.5]);
  const scale = useTransform(scrollYProgress, [revealStart, revealEnd], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative flex flex-col items-center justify-center mt-12 pointer-events-auto w-full px-4">
        
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-[radial-gradient(ellipse,#d4af37_0%,transparent_60%)] blur-[120px] pointer-events-none"
        />

        <div className="relative z-10 p-2 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,1)] animate-float mb-10 md:mb-12 group cursor-pointer w-[80vw] max-w-[280px] md:max-w-[380px] lg:max-w-[420px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 rounded-xl"></div>
          
          <img 
            src="/poster.jpg" 
            alt="ARC The Wayfarer's Map" 
            className="w-full h-auto aspect-auto object-contain rounded-lg shadow-inner"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://res.cloudinary.com/dkbvknwcu/image/upload/v1773165730/Group_47741_ka5hcm.png";
            }}
          />
        </div>

        <div className="relative group z-20">
          <div className="absolute -inset-4 rounded-full opacity-50 blur-2xl bg-[radial-gradient(circle,rgba(230,43,30,0.7),transparent_70%)] group-hover:opacity-100 transition duration-700 pointer-events-none" />

          <Link
            href="/tickets"
            className="
              relative flex items-center justify-center gap-3 md:gap-4
              px-8 py-4 sm:px-12 md:py-5 lg:px-16 lg:py-6
              rounded-full
              text-white
              font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-sm
              overflow-hidden
              bg-gradient-to-r from-[#7a0c05] via-[#E62B1E] to-[#7a0c05]
              shadow-[0_10px_50px_rgba(230,43,30,0.5)]
              transition-all duration-500 ease-out
              hover:scale-105
              hover:shadow-[0_20px_80px_rgba(230,43,30,0.8)]
              active:scale-95
            "
          >
            <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)] animate-energy" />
            </span>
            <span className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
            
            <span className="relative drop-shadow-lg whitespace-nowrap">
              Secure Passage
            </span>

            <svg
              className="relative w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2 drop-shadow-lg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}