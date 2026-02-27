"use client";
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TicketingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [selectedTier, setSelectedTier] = useState<string>("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");

  // --- Senior Dev Physics (Framer Motion) ---
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Springs add "weight" to the card so it doesn't snap unnaturally
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map mouse position to rotation degrees (tilt)
  const rotateX = useTransform(springY, [0, 1], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [0, 1], ["-15deg", "15deg"]);
  
  // Dynamic glare effect that moves across the card
  const glareX = useTransform(springX, [0, 1], ["-100%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["-100%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center pt-24 pb-32 px-4 md:px-6 relative overflow-hidden">
      
      {/* Ultra-subtle ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#E62B1E] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-8 items-center lg:items-start">
        
        {/* --- LEFT: FORM SECTION --- */}
        <div className="w-full lg:w-1/2 space-y-12 z-20">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-6 bg-[#E62B1E]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E62B1E]">ARK 07 • 2026</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
              Secure Your Access.
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
              Initialize your credentials below to generate your physical ARK 07 clearance badge.
            </p>
          </div>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
              className="py-16 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-full bg-[#E62B1E]/10 flex items-center justify-center mb-6 border border-[#E62B1E]/30 shadow-[0_0_30px_rgba(230,43,30,0.2)]">
                <svg className="w-5 h-5 text-[#E62B1E]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Clearance Granted</h2>
              <p className="text-gray-400 text-sm">
                Your encrypted payment module has been dispatched to your inbox.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Premium Input Fields */}
              <div className="space-y-4">
                {["Name", "Email", "Phone"].map((field) => (
                  <div key={field} className="relative group">
                    <input
                      type={field === "Email" ? "email" : field === "Phone" ? "tel" : "text"}
                      required
                      placeholder=" "
                      value={field === "Name" ? name : field === "Email" ? email : phone}
                      onChange={(e) => field === "Name" ? setName(e.target.value) : field === "Email" ? setEmail(e.target.value) : setphone(e.target.value)}
                      className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 pt-7 pb-3 text-lg font-medium text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.05] focus:outline-none transition-all duration-300"
                    />
                    {/* Inner floating label */}
                    <label className="absolute left-5 top-5 text-gray-500 text-sm uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#E62B1E] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">
                      {field}
                    </label>
                  </div>
                ))}
              </div>

              {/* Sleek Tier Selection */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 ml-1">Clearance Tier</label>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: 'student', title: 'Student Pass', price: '₹143', desc: 'Aaron access + Required ID' },
                    { id: 'general', title: 'General Admission', price: '₹987654321', desc: 'Faisal access + Networking' }
                  ].map((tier) => (
                    <label 
                      key={tier.id}
                      className={`block p-5 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${selectedTier === tier.id ? 'border-[#E62B1E] bg-[#E62B1E]/5 shadow-[0_0_20px_rgba(230,43,30,0.1)]' : 'border-white/10 hover:border-white/30 bg-white/[0.03]'}`}
                    >
                      <input type="radio" name="tier" value={tier.id} className="hidden" onChange={() => setSelectedTier(tier.id)} checked={selectedTier === tier.id} />
                      <div className="flex justify-between items-center relative z-10">
                        <div>
                          <h3 className="text-base font-bold text-white tracking-wide">{tier.title}</h3>
                          <p className="text-xs text-gray-500 mt-1 transition-colors group-hover:text-gray-400">{tier.desc}</p>
                        </div>
                        <span className={`text-lg font-bold transition-colors ${selectedTier === tier.id ? 'text-[#E62B1E]' : 'text-white'}`}>{tier.price}</span>
                      </div>
                      {/* Active state ambient glow */}
                      {selectedTier === tier.id && <div className="absolute inset-0 bg-gradient-to-r from-[#E62B1E]/10 to-transparent opacity-50 pointer-events-none" />}
                    </label>
                  ))}
                </div>
              </div>

              {/* Glowing Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-14 rounded-xl bg-[#E62B1E] text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#ff3526] hover:shadow-[0_0_30px_rgba(230,43,30,0.3)] transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none"
                >
                  {status === "loading" ? "Encrypting..." : "Initialize Payment"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* --- RIGHT: THE 3D HOLOGRAPHIC LANYARD --- */}
        <div className="w-full lg:w-1/2 flex items-start justify-center pt-8">
          <div 
            className="w-full max-w-[400px] relative cursor-grab active:cursor-grabbing [perspective:1200px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            
            {/* 1. Engineered SVG Lanyard Strap with Text on Path */}
            <svg width="100%" height="160" viewBox="0 0 340 160" className="mx-auto relative z-0 drop-shadow-2xl">
              <defs>
                {/* Paths for the text to follow */}
                <path id="leftStrap" d="M 120 -20 Q 60 80 155 150" />
                <path id="rightStrap" d="M 220 -20 Q 280 80 185 150" />
              </defs>
              
              {/* Thick dark strap bases */}
              <path d="M 120 -20 Q 60 80 155 150" stroke="#111" strokeWidth="32" fill="none" strokeLinecap="round" />
              <path d="M 220 -20 Q 280 80 185 150" stroke="#111" strokeWidth="32" fill="none" strokeLinecap="round" />
              
              {/* Red glowing accent lines */}
              <path d="M 120 -20 Q 60 80 155 150" stroke="#E62B1E" strokeWidth="3" strokeOpacity="0.4" fill="none" />
              <path d="M 220 -20 Q 280 80 185 150" stroke="#E62B1E" strokeWidth="3" strokeOpacity="0.4" fill="none" />

              {/* Text mapped perfectly along the curves */}
              <text fontSize="9" fill="#555" fontWeight="bold" letterSpacing="2" className="select-none pointer-events-none">
                <textPath href="#leftStrap" startOffset="10%">TEDxCIT • ARK 07 • TEDxCIT</textPath>
              </text>
              <text fontSize="9" fill="#555" fontWeight="bold" letterSpacing="2" className="select-none pointer-events-none">
                <textPath href="#rightStrap" startOffset="15%">ARK 07 • TEDxCIT • ARK 07</textPath>
              </text>

              {/* Ultra-realistic metallic clip */}
              <rect x="145" y="4" width="50" height="26" rx="4" fill="url(#metalGrad)" stroke="#333" strokeWidth="1" />
              <rect x="150" y="11" width="40" height="6" rx="2" fill="#111" />
              <circle cx="170" cy="148" r="16" stroke="url(#metalGrad)" strokeWidth="5" fill="none" />
              
              <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#888" />
                <stop offset="50%" stopColor="#444" />
                <stop offset="100%" stopColor="#222" />
              </linearGradient>
            </svg>

            {/* 2. The 3D Framer Motion Badge */}
            <motion.div 
              className="relative -mt-10 mx-auto w-[340px] h-[480px] rounded-none bg-[#0A0A0A] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8),_0_0_40px_rgba(230,43,30,0.1)] overflow-hidden [transform-style:preserve-3d]"
              style={{ rotateX, rotateY }}
            >
              
              {/* The Glare (Moving Light Reflection) */}
              <motion.div 
                className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
                style={{ 
                  opacity: useTransform(springX, [0, 1], [0, 0.15]),
                  x: glareX,
                  y: glareY,
                  width: "200%", height: "200%"
                }}
              />

              {/* Top Branding Section */}
              <div className="h-28 bg-gradient-to-b from-[#E62B1E] to-[#991b14] p-6 flex flex-col items-center justify-between relative overflow-hidden">
                {/* Lanyard Hole Punch Cutout */}
                <div className="w-16 h-3 rounded-full bg-[#050505] shadow-inner absolute top-4 z-10" />
                
                {/* Faded background text graphic */}
                <div className="absolute -right-4 -top-8 text-7xl font-black text-white opacity-10 select-none tracking-tighter">
                  ARK
                </div>
                
                <div className="mt-auto w-full flex justify-between items-end">
                  <span className="text-white text-xl font-black tracking-tighter">TED<sup className="text-sm">x</sup>CIT</span>
                  <span className="text-white/80 text-[10px] font-bold tracking-[0.3em]">ARK 07</span>
                </div>
              </div>

              {/* Card Body - Content sits inside a translated Z-layer for 3D depth */}
              <div className="p-8 h-[calc(100%-7rem)] flex flex-col relative [transform:translateZ(30px)]">
                
                {/* Attendee Name (Dynamic) */}
                <div className="mb-auto">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#E62B1E] font-bold mb-2">Authenticated User</p>
                  <p className="text-3xl font-bold leading-none tracking-tight text-white line-clamp-2">
                    {name || "GUEST PROTOCOL"}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Selected Tier Badge */}
                  <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-none backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                      {selectedTier} ACCESS
                    </p>
                  </div>

                  {/* Scifi Abstract "Authentication" Visual (Replaces Barcode) */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-[7px] text-gray-500 tracking-[0.3em]">NETWORK STATUS</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-none bg-[#E62B1E] animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-none bg-[#E62B1E]" />
                        <div className="w-1.5 h-1.5 rounded-none bg-[#E62B1E]/30" />
                        <div className="w-6 h-1.5 rounded-none bg-[#E62B1E]/30" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[9px] text-gray-400">ID: TX-ARK07</div>
                      <div className="text-[8px] text-[#E62B1E] tracking-widest mt-1 uppercase font-bold">Encrypted</div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-8 text-center text-[10px] uppercase text-gray-600 tracking-[0.3em] pointer-events-none">
            Interact to inspect badge
          </div>
        </div>
      </div>
    </main>
  );
}