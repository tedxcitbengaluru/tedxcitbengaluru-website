"use client";
import React from "react";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="relative w-full overflow-hidden section" style={{ background: '#1F1F1F' }}>
      {/* Top Fade Gradient - Creates smooth transition from hero section */}
      <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-[#1F1F1F] via-[#1F1F1F]/50 to-transparent pointer-events-none z-20"></div>
      
      {/* Background Red X with Bottom Fade Overlay */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-1/2 pointer-events-none opacity-10 sm:opacity-15 md:opacity-25">
        <Image
          src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1772474908/X1_vs2rkx.svg"
          alt="Red X background"
          fill
          className="object-cover object-right rotate-180"
          priority
        />
        {/* Black Fade Overlay - Bottom Up */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-transparent to-transparent">
          
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:mx-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:pl-12">
          {/* Headline */}
          <h1 
        className="text-heading-1 text-center md:text-left animate-fade-in-up" 
        style={{ marginBottom: 'var(--space-3xl)' }}
          >
        <span className="text-[#EB0028]">EMPOWERING</span>{" "}
        <span className="text-[#9D9D9D]">MINDS TO<br></br>SHAPE TOMORROW</span>
          </h1>

          {/* Main Description */}
          <div 
        className="text-body-large text-gray-300 text-center md:text-left animate-fade-in-up content-width mx-auto"
        style={{ 
          animationDelay: '0.2s', 
          opacity: 0,
          marginBottom: 'var(--space-2xl)' 
        }}
          >
        <h1 className="text-heading-1 text-[#9D9D9D]">WHO <span className="text-[#EB0028]">WE</span> ARE ?</h1>
        <p style={{ marginBottom: 'var(--space-lg)' }}>
          TED is a global platform devoted to sharing ideas that matter, through short, powerful talks that spark reflection and inspire change. TEDx, an initiative by TED, brings this spirit to local communities worldwide, where independently organized events create spaces for ideas to be shared, challenged, and celebrated.
        </p>
        <p>
          At TEDxCITBengaluru, we bring this opportunity to our campus. Our goal is to uncover voices and ideas emerging from our community—stories that are original, thought-provoking, and capable of creating real impact.
        </p>
          </div>

          {/* Key Points Grid */}
          <div 
        className="grid grid-cols-1 gap-8 animate-fade-in-up"
        style={{ 
          animationDelay: '0.4s', 
          opacity: 0,
          marginTop: 'var(--space-3xl)' 
        }}
          >
        <div className="key-point">
          <p className="text-body text-gray-200 text-center md:text-left">
            We uncover voices and ideas that emerge from within our own community, stories that are original, thought-provoking, and capable of creating real impact.
          </p>
        </div>
        
        <div className="key-point">
          <p className="text-body text-gray-200 text-center md:text-left">
            Through every event we host, we aim to ignite curiosity, start meaningful conversations, and connect people who believe in shaping a better tomorrow through the power of ideas.
          </p>
        </div>
        
        <div className="key-point">
          <p className="text-body text-gray-200 text-center md:text-left">
            Connect with like-minded individuals and build your network.
          </p>
        </div>
          </div>
        </div>
      </div>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
    </section>
  );
}