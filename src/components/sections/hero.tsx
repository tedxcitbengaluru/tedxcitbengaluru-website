"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/header";

// ─── PALETTE & DATA ──────────────────
const SPEAKER_IMAGES: Record<string, string> = {
  "Ambika J": "https://res.cloudinary.com/dkbvknwcu/image/upload/v1774334022/Group_47779_lzuluq.png",
  "Sukriti Dua": "https://res.cloudinary.com/dkbvknwcu/image/upload/v1774335358/Group_1000006087_axelic.png",
  "Lt. Gen C. Bansi Ponnappa": "https://res.cloudinary.com/dkbvknwcu/image/upload/v1774334023/Group_1000006090_m80s5o.png",
  "Vinod Naidu": "https://res.cloudinary.com/dkbvknwcu/image/upload/v1774334022/Group_47794_tibpdm.png",
  "Dr. Mayank D. Chauhan": "https://res.cloudinary.com/dkbvknwcu/image/upload/v1774334023/Group_1000006089_kzsaws.png",
};

const ENTERTAINER_IMAGES: Record<string, string> = {
  "P.S. Shravan Kumar": "https://res.cloudinary.com/dkbvknwcu/image/upload/v1774325608/Group_47798_ct32vg.png",
  "The Last Scene": "https://res.cloudinary.com/dkbvknwcu/image/upload/v1774325368/Group_1000006081_eyvjh5.png",
  "Sarah Sufi Sheikh": "https://res.cloudinary.com/dkbvknwcu/image/upload/v1774325600/Group_1000006082_cwguhd.png",
  "Sabrina Mariah": "https://res.cloudinary.com/dkbvknwcu/image/upload/v1774325600/Group_1000006088_ymvbqk.png",
};

const SUB_THEMES = [
  { id: "01", title: "GENESIS", subtitle: "The Origin Point", desc: "The moment an idea becomes intention — and intention becomes an unstoppable force of action." },
  { id: "02", title: "VISTA", subtitle: "The Broad Horizon", desc: "The journey takes shape through perspective. Progress is learning to perceive what others cannot." },
  { id: "03", title: "FORGE", subtitle: "The Crucible", desc: "True growth is never gentle. It is built through effort, sustained pressure, and quiet persistence." },
  { id: "04", title: "OBSCURA", subtitle: "The Unknown Depths", desc: "Clarity fades. A necessary space of introspection — confronting the unseen within ourselves." },
  { id: "05", title: "KINTSUGI", subtitle: "The Golden Repair", desc: "Embracing wounds as badges of endurance. Finding beauty precisely where things once broke apart." },
];

const SPEAKERS = [
  { 
    name: "Ambika J", 
    title: "Director of AI, Finastra", 
    tag: "Technology",
    desc: "AN EXECUTIVE MBA GRADUATE FROM IIM BANGALORE, SHE BRINGS 25+ YEARS OF EXPERIENCE IN TECH, LEADING 300+ PRODUCT RELEASES AND CONTRIBUTING TO ORGANIZATIONS LIKE YAHOO AND AS A SOLUTION ARCHITECT AT FINASTRA. CURRENTLY SERVING AS"
  },
  { 
    name: "Sukriti Dua", 
    title: "Trauma Informed Psychologist", 
    tag: "Psychology",
    desc: 'A trauma informed psychologist with 9+ years of experience, she brings mind-body work to the forefront as a dance movement therapy facilitator, leading "Mentally Yours" by supporting individuals, couples, and groups; along with training and supervising mental health practitioners.'
  },
  { 
    name: "Lt. Gen C. Bansi Ponnappa", 
    title: "Former Adjutant General, Indian Army", 
    tag: "Leadership",
    desc: "A former Adjutant General and Deputy Chief of the Indian Army, he brings nearly four decades of service across key operational and strategic roles, including counterinsurgency operations and United Nations missions. Having commanded at every level, he has played key leadership roles during the Galwan crisis, along the LoC in J&K, counter terrorism operations including Manipur. He has been awarded the Param Vishisht Seva Medal (PVSM) amongst other awards."
  },
  { 
    name: "Vinod Naidu", 
    title: "Founder, Nustart Ventures", 
    tag: "Innovation",
    desc: "Is a seasoned force in sports management and media, with over 25 years of shaping some of India’s most influential sporting narratives. From building powerful brand alliances to managing iconic athletes like Sachin Tendulkar, his journey reflects the unseen strategy behind the spotlight. He has also been instrumental in shaping sponsorships, media rights, and the business of sport across major platforms, including the Indian Premier League (IPL)."
  },
  { 
    name: "Dr. Mayank D. Chauhan", 
    title: "Orthopedic & Sports Medicine", 
    tag: "Science",
    desc: "Twenty-two years ago, Dr. Mayank D. Chauhan lived through a slipped disc. The setbacks, the doubts, the confusion, and the desperate attempts to get back to life. That journey transformed his dream of becoming a surgeon into becoming someone who could treat it with conservative methods. That experience became his purpose. He went on to study Osteopathy, Sports Medicine, Chiropractic Medicine, and Manual Therapy, and today as a Gold Medalist, MPT (Orthopedics & Sports Medicine), he helps patients navigate the same road he once walked, back to the life they love."
  },
];

const ENTERTAINERS = [
  { 
    name: "P.S. Shravan Kumar", 
    title: "Mural Artist",
    desc: "He holds a Doctorate in Fine Arts with an accomplished career with an outstanding 1,600 awards. He isn't just an ordinary wall artist and entrepreneur; his work transforms the ordinary spaces into powerful visual narratives, beautifully blending creativity, culture and storytelling through wall art across India and the UAE."
  },
  { 
    name: "The Last Scene", 
    title: "Music Band",
    desc: "They don't just play music; they transform raw sound into an electrifying journey of creation and mending. Hailing from MSRIT, this powerhouse squad collectively blends rhythms with boundless energy to redefine live performances, where every tune is a celebration of culture, connection and creativity."
  },
  { 
    name: "Sarah Sufi Sheikh", 
    title: "Stand-up Comedian",
    desc: "This Bangalore-based comedian blends sharp observations with playful storytelling across India's top lineups including Late Night Sexy Jokes, Ladies Log and Queer Rated Comedy with thrilling performances across Bangalore, Mumbai and Goa. She just has one question for the audience: If given infinite time and money, would you attend her stand-up shows?"
  },
  { 
    name: "Sabrina Mariah", 
    title: "Singer",
    desc: "A Trainer, Coach and Growth Mindset Evangelist. That's what she is known for, helping people find the right words and communicate with ease. But today, she's doing the opposite. She believes life needs three things: good conversations, good energy and good music and she's bringing all three by letting the music do the talking."
  },
];

// ─── COUNTDOWN ─────────────────────────────────────────────
const CountdownTimer = React.memo(() => {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-03-27T11:00:00+05:30").getTime();

    const tick = () => {
      const d = target - Date.now();
      if (d > 0) {
        setT({
          days: Math.floor(d / 86400000),
          hours: Math.floor((d % 86400000) / 3600000),
          minutes: Math.floor((d % 3600000) / 60000),
          seconds: Math.floor((d % 60000) / 1000),
        });
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-6 md:gap-12">
      {Object.entries(t).map(([unit, val], i) => (
        <React.Fragment key={unit}>
          <div className="flex flex-col items-center gap-1.5">
            <span
              className="tabular-nums font-black leading-none"
              style={{ fontSize: "clamp(38px,6vw,72px)", color: "#1C3D4F", letterSpacing: "-0.05em" }}
            >
              {String(val).padStart(2, "0")}
            </span>
            <span style={{ fontSize: 11, letterSpacing: "0.24em", color: "#6E8E9E", textTransform: "uppercase", fontWeight: 600 }}>
              {unit}
            </span>
          </div>
          {i < 3 && <span style={{ fontSize: "clamp(20px,3vw,36px)", color: "#A8C8D8", fontWeight: 300, marginTop: -6 }}>·</span>}
        </React.Fragment>
      ))}
    </div>
  );
});

CountdownTimer.displayName = "CountdownTimer";

// ─── MAGNETIC BUTTON ───────────────────────────────────────
const MagneticBtn = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({
          x: (e.clientX - r.left - r.width / 2) * 0.28,
          y: (e.clientY - r.top - r.height / 2) * 0.28,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group inline-flex items-center gap-3 cursor-pointer no-underline"
      style={{
        background: "#E62B1E",
        color: "#fff",
        padding: "16px 36px",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      {children}
      <svg
        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </motion.a>
  );
};

// ─── SECTION DIVIDER ───────────────────────────────────────
const Divider = ({ label }: { label: string }) => (
  <div className="w-full flex items-center gap-5 py-2" style={{ borderTop: "1px solid #A8C8D8" }}>
    <span style={{ fontSize: 11, letterSpacing: "0.28em", color: "#6E8E9E", textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap" }}>
      {label}
    </span>
    <div className="flex-1" style={{ height: 1, background: "#D6E8EF" }} />
  </div>
);

// ─── THEME ACCORDION ROW ───────────────────────────────────
const ThemeRow = ({ theme, index }: { theme: (typeof SUB_THEMES)[number]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setOpen(!open)}
      style={{ borderBottom: "1px solid #D6E8EF", cursor: "pointer" }}
      className="group"
    >
      <div className="flex items-center justify-between py-6 gap-4">
        <div className="flex items-center gap-6 md:gap-10">
          <span style={{ fontSize: 12, color: "#A8C8D8", fontWeight: 600, letterSpacing: "0.18em", fontFamily: "monospace", minWidth: 20 }}>
            {theme.id}
          </span>
          <div>
            <h3
              className="transition-colors duration-300 group-hover:text-[#4A8FA8]"
              style={{ fontSize: "clamp(24px,3.5vw,42px)", fontWeight: 800, color: "#1C3D4F", letterSpacing: "-0.03em", lineHeight: 1 }}
            >
              {theme.title}
            </h3>
            <p style={{ fontSize: 14, color: "#6E8E9E", marginTop: 4, fontStyle: "italic" }}>{theme.subtitle}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C8D8" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: 15, color: "#4A8FA8", lineHeight: 1.8, paddingBottom: 24, paddingLeft: 52, maxWidth: 600 }}>
              {theme.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── SPEAKER CARD ──────────────────────────────────────────
const SpeakerCard = ({ person, index }: { person: (typeof SPEAKERS)[number]; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
      style={{
        background: hovered ? "#1C3D4F" : "#D6E8EF",
        border: "1px solid #A8C8D8",
        transition: "background 0.5s cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer",
      }}
      className="relative overflow-hidden flex flex-col w-full group"
    >
      <div className="relative overflow-hidden" style={{ height: 280, background: "#A8C8D8" }}>
        <div
          className="absolute inset-0 transition-all duration-700 bg-cover"
          style={{
            backgroundImage: `url(${SPEAKER_IMAGES[person.name]})`,
            filter: hovered ? "grayscale(0%) brightness(0.5)" : "grayscale(20%) brightness(0.9) saturate(0.7)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: hovered
              ? "linear-gradient(to bottom, rgba(28,61,79,0.3), rgba(28,61,79,0.8))"
              : "linear-gradient(to bottom, transparent 40%, rgba(166,200,216,0.6))",
          }}
        />
        
        {/* Description Overlay */}
        <div 
          className={`absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-all duration-500 z-20 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          style={{ background: "rgba(28, 61, 79, 0.85)", backdropFilter: "blur(4px)" }}
        >
          <p className="text-white text-xs sm:text-sm leading-relaxed overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {person.desc}
          </p>
        </div>

        <div
          className={`absolute top-4 left-4 z-30 transition-all duration-400 ${hovered ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: "rgba(238,244,247,0.92)",
            color: "#4A8FA8",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "5px 12px",
          }}
        >
          {/* {person.tag} */}
        </div>
      </div>

      <div className="px-5 py-3 flex flex-col gap-0.5">
        <span style={{ fontSize: 11, color: "#6E8E9E", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>Speaker</span>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: hovered ? "#EEF4F7" : "#1C3D4F", letterSpacing: "-0.02em", lineHeight: 1.2, transition: "color 0.4s ease" }}>
          {person.name}
        </h3>
        <p style={{ fontSize: 13, color: hovered ? "#6E8E9E" : "#4A8FA8", lineHeight: 1.5, transition: "color 0.4s ease" }}>
          {person.title}
        </p>
      </div>
    </motion.div>
  );
};

// ─── ENTERTAINER CARD ──────────────────────────────────────
const EntertainerCard = ({ person, index }: { person: (typeof ENTERTAINERS)[number]; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
      className="group relative overflow-hidden flex flex-col cursor-pointer"
      style={{ background: "#1C3D4F", minHeight: 300 }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-700 opacity-20 group-hover:opacity-40"
        style={{ background: "linear-gradient(135deg, #4A8FA8 0%, #0D1E28 100%)" }}
      />
      <div
        className="absolute inset-0 bg-cover bg-bottom transition-all duration-700"
        style={{
          backgroundImage: `url(${ENTERTAINER_IMAGES[person.name]})`,
          filter: "grayscale(100%) brightness(0.6)",
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-bottom opacity-0 group-hover:opacity-100 transition-all duration-700"
        style={{
          backgroundImage: `url(${ENTERTAINER_IMAGES[person.name]})`,
        }}
      />
      
      {/* Dark overlay specifically for text readability when hovered */}
      <div 
        className={`absolute inset-0 bg-[#0D1E28]/70 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="relative z-10 mt-auto p-6 bg-gradient-to-t from-[#0D1E28] via-[#0D1E28]/80 to-transparent">
        <div className="transition-all duration-400 group-hover:w-8" style={{ width: 20, height: 2, background: "#E62B1E", marginBottom: 12 }} />
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#EEF4F7", letterSpacing: "-0.02em" }}>{person.name}</h3>
        <p style={{ fontSize: 12, color: "rgba(168,200,216,0.55)", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 4 }}>
          {person.title}
        </p>
        
        {/* Expandable Description Area */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hovered ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 mt-0 opacity-0'
          }`}
        >
          <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed overflow-y-auto" style={{ maxHeight: '160px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {person.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ─── MARQUEE ───────────────────────────────────────────────
const Marquee = () => {
  const words = ["Genesis", "Vista", "Forge", "Obscura", "Kintsugi", "Arc", "27 March 2026", "The Wayfarer's Map", "Ideas Worth Spreading"];

  return (
    <div className="w-full overflow-hidden py-4" style={{ background: "#1C3D4F", borderTop: "1px solid #0D1E28", borderBottom: "1px solid #0D1E28" }}>
      <motion.div className="flex gap-10 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(214,232,239,0.5)",
              flexShrink: 0,
            }}
          >
            {w} <span style={{ color: "#E62B1E", marginLeft: 12 }}>—</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── MAIN PAGE ──────────────────────────────────────────────────
export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <main style={{ background: "#E0F2FE", color: "#1C3D4F", overflowX: "hidden" }} className="relative font-sans">
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
        <Header />
      </div>

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "#E0F2FE" }}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, #E0F2FE 80%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to bottom, transparent, #E0F2FE)" }} />
        </div>

        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-6xl mt-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-3 mb-10">
            <div style={{ width: 24, height: 1, background: "#E62B1E" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.3em", color: "#6E8E9E", textTransform: "uppercase" }}>A Drift in the Unknown</span>
            <div style={{ width: 24, height: 1, background: "#E62B1E" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
            style={{ maxWidth: "min(680px, 88vw)", aspectRatio: "2.5/1", marginBottom: 64 }}
          >
            <Image
              src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1773288076/ARC_Title_upx1mb.svg"
              alt="ARC: The Wayfarer's Map"
              fill
              priority
              className="object-contain"
              style={{ filter: "saturate(0) brightness(0.15) contrast(1.2)" }}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            <CountdownTimer />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.75 }} className="mt-10 flex items-center gap-4">
            <div style={{ height: 1, width: 40, background: "#A8C8D8" }} />
            <span style={{ fontSize: 12, letterSpacing: "0.28em", color: "#6E8E9E", textTransform: "uppercase", fontWeight: 600 }}>
              27th March 2026 &nbsp;·&nbsp; 11 AM &nbsp;·&nbsp; Cambridge Institute of Technology
            </span>
            <div style={{ height: 1, width: 40, background: "#A8C8D8" }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }} className="mt-12">
            <MagneticBtn href="/tickets">Secure Your Seat</MagneticBtn>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span style={{ fontSize: 11, letterSpacing: "0.24em", color: "#6E8E9E", textTransform: "uppercase" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 28, background: "#A8C8D8" }}
          />
        </motion.div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────── */}
      <Marquee />

      {/* ── 2. THEMES ───────────────────────────────────────── */}
      <section className="w-full px-6 md:px-14 lg:px-20 pt-24 pb-8" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Divider label="Theme — 2026" />
            <h2 className="mt-6" style={{ fontSize: "clamp(40px,6vw,80px)", fontWeight: 800, color: "#1C3D4F", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
              The<br />Waypoints.
            </h2>
          </div>
          <p style={{ maxWidth: 340, fontSize: 15, color: "#6E8E9E", lineHeight: 1.75, borderLeft: "2px solid #4A8FA8", paddingLeft: 20 }}>
            Five stages of transformation. The map is not the territory — it is the journey itself, lived one arc at a time.
          </p>
        </div>

        <div style={{ borderTop: "1px solid #D6E8EF" }}>
          {SUB_THEMES.map((t, i) => (
            <ThemeRow key={t.id} theme={t} index={i} />
          ))}
        </div>
      </section>

      {/* ── 3. SPEAKERS ─────────────────────────────────────── */}
      <section className="w-full px-6 md:px-14 lg:px-20 py-24" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="mb-12">
          <Divider label="Speakers — 2026" />
          <h2 className="mt-6" style={{ fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 800, color: "#1C3D4F", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
            The Voices.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {SPEAKERS.slice(0, 3).map((s, i) => (
            <SpeakerCard key={i} person={s} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3 mx-auto">
          {SPEAKERS.slice(3).map((s, i) => (
            <SpeakerCard key={i + 3} person={s} index={i + 3} />
          ))}
        </div>
      </section>

      {/* ── 4. ENTERTAINERS ─────────────────────────────────── */}
      <section style={{ background: "#1C3D4F" }} className="w-full px-6 md:px-14 lg:px-20 py-24">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="mb-12">
            <div className="w-full flex items-center gap-5 py-2" style={{ borderTop: "1px solid rgba(168,200,216,0.2)" }}>
              <span style={{ fontSize: 11, letterSpacing: "0.28em", color: "rgba(168,200,216,0.4)", textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap" }}>
                Performers — 2026
              </span>
              <div className="flex-1" style={{ height: 1, background: "rgba(168,200,216,0.12)" }} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-6">
              <h2 style={{ fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 800, color: "#EEF4F7", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
                The Artists.
              </h2>
              <span style={{ color: "rgba(168,200,216,0.4)", fontSize: 13, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                4 Acts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(168,200,216,0.1)" }}>
            {ENTERTAINERS.map((a, i) => (
              <EntertainerCard key={i} person={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FINAL CTA ────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden flex flex-col">
        <div
          className="absolute top-0 left-0 w-full h-32 sm:h-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #1C3D4F, transparent)" }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="relative w-full"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1773212881/1920x1080_v5fr79.png"
            alt="ARC Poster"
            fill
            className="object-cover object-center"
          />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: "28%", background: "linear-gradient(to bottom, transparent, #0D1E28)" }}
          />
        </motion.div>

        <div className="w-full flex flex-col items-center text-center px-6 pt-12 pb-16" style={{ background: "#0D1E28" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div style={{ width: "100%", maxWidth: 520, height: 1, background: "rgba(168,200,216,0.1)", margin: "32px 0 24px" }} />
          </motion.div>
        </div>
      </section>
    </main>
  );
}