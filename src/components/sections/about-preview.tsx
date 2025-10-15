"use client";
import React from "react";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="relative w-full overflow-hidden section" style={{ background: '#0B0B0B' }}>
      {/* Background Red X with Bottom Fade Overlay */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-1/2 pointer-events-none opacity-10 sm:opacity-15 md:opacity-25">
        <Image
          src="/images/X1.svg"
          alt="Red X background"
          fill
          className="object-cover object-right"
          priority
        />
        {/* Black Fade Overlay - Bottom Up */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <h1 
            className="text-heading-1 text-center animate-fade-in-up" 
            style={{ marginBottom: 'var(--space-3xl)' }}
          >
            <span className="text-red">EMPOWERING</span>{" "}
            <span className="text-gray-200">MINDS TO SHAPE TOMORROW</span>
          </h1>

          {/* Main Description */}
          <div 
            className="text-body-large text-gray-300 text-center animate-fade-in-up content-width mx-auto"
            style={{ 
              animationDelay: '0.2s', 
              opacity: 0,
              marginBottom: 'var(--space-2xl)' 
            }}
          >
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
              <p className="text-body text-gray-200 text-center">
                We uncover voices and ideas that emerge from within our own community, stories that are original, thought-provoking, and capable of creating real impact.
              </p>
            </div>
            
            <div className="key-point">
              <p className="text-body text-gray-200 text-center">
                Through every event we host, we aim to ignite curiosity, start meaningful conversations, and connect people who believe in shaping a better tomorrow through the power of ideas.
              </p>
            </div>
            
            <div className="key-point">
              <p className="text-body text-gray-200 text-center">
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