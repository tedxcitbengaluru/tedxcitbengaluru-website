"use client";
import React from 'react';
import Image from 'next/image';

export default function Footer() {
  
  const features = [
    {
      id: 1,
      title: "Performances",
      text: "Watch mesmerizing performances by our Entertainers that leave you spellbound.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Experience",
      text: "An immersive experience tailored for you to learn, grow, and connect.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Certificate",
      text: "A distinctive Certificate of Participation for you to be proud of.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Ideas",
      text: "And of course, ground-breaking Ideas for you to reflect on.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Memorabilia",
      text: "Exclusive TEDx memorabilia and merchandise for you to cherish.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#000000] to-[#1F1F1F]">
      
      {/* 1. BACKGROUND TEXTURE */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 mix-blend-soft-light z-0">
        <Image
          src="/images/about_content_bg.svg"
          alt="Background texture"
          fill
          className="object-cover object-center"
          priority={false}
        />
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="relative z-10 w-full px-6 md:px-16 py-20 md:py-32 max-w-[1400px] mx-auto flex flex-col flex-grow h-full">


        {/* --- SECTION B: ABOUT TEDx --- */}
        <div className="flex flex-col mb-auto">
            <h2 className="text-5xl md:text-7xl lg:text-[8vh] font-bold text-[#B0B0B0] mb-10 leading-none uppercase tracking-tight">
                About <span className='text-[#EB0028]'>TEDx</span>
            </h2>

            <div className="w-full max-w-5xl">
                <p className="text-[#B0B0B0] text-base md:text-xl lg:text-[24px] font-normal leading-relaxed text-justify md:text-left">
                    TEDx began as an extension of the TED conference, which was founded in California in 1984. TED's mission was to share "ideas worth spreading" across technology, entertainment, and design. In 2009, TEDx was created to allow independent, locally organized events to bring the TED experience to communities worldwide. Each TEDx event follows TED's format and values, offering inspiring talks and fostering meaningful discussions. From its roots in California, TEDx has grown into a global movement. Today, thousands of TEDx events take place around the world. This initiative continues to empower communities to engage with diverse ideas and voices.
                </p>
            </div>
        </div>
        
        {/* --- SECTION C: COPYRIGHT --- */}
        <div className="w-full border-t border-white/10 pt-8 mt-16 md:mt-24 relative z-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <p className="text-sm md:text-base text-white font-light">
                    © {new Date().getFullYear()} <span className="font-semibold text-white">TEDxCITBengaluru</span>.
                </p>
                <p className="text-xs md:text-sm text-white">
                    This independent TEDx event is operated under license from TED.
                </p>
            </div>
        </div>

      </div>

      {/* 3. BIG BACKGROUND WATERMARK */}
      <div 
        className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center items-end z-0"
        style={{ height: '40%' }}
      >
        <h1 
          className="
            font-black 
            text-white 
            opacity-[0.07]
            whitespace-nowrap 
            leading-none 
            tracking-tighter
            text-[15vw] sm:text-[15vw] md:text-[18vw] lg:text-[16vw]
            translate-y-[15%]
          "
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
          }}
        >
          TEDxCITBLR
        </h1>
      </div>

    </section>
  );
}