"use client";
import React from "react";
import Image from "next/image";

export default function EventPreview() {
  return (
    <section className="relative w-full bg-[#9D9D9D] text-[#1F1F1F] section overflow-visible">
      {/* ===== TOP SLANTED DIVIDER ===== */}
      {/* White angled wedge cutting into dark section above */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -top-20 h-20 md:-top-28 md:h-28 w-full pointer-events-none"
      >
        <polygon points="0,100 100,0 100,100" fill="#9D9D9D" />
      </svg>

      {/* Red X stripes on top-right, fading into the slant */}
      <div
        aria-hidden
        className="absolute right-0 -top-28 md:-top-36 h-36 md:h-48 w-[55vw] max-w-[800px] pointer-events-none opacity-40"
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'right top',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="container relative z-10">
        {/* Mobile: Photo on top, then description */}
        {/* Desktop: Photo left, description right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start" style={{ gap: 'var(--space-3xl)' }}>

          {/* Left side - Photo/Preview box */}
          <div className="w-full lg:w-1/2 flex-shrink-0 animate-fade-in-left">
            <div className="event-image-container">
              <img
                src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760513601/_Y3A8216_1_s00m6b.png"
                alt="Event or team photo preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start animate-fade-in-right">
            <h2 className="text-heading-1" style={{ marginBottom: 'var(--space-lg)' }}>
              <span className="text-[#1F1F1F]">What if your next step</span>
              <br />
              <span className="text-[#EB0028]">defined the stage?</span>
              <br />
              <span className="text-[#1F1F1F]">Step up!!</span>
            </h2>

            <div className="w-24 h-1 bg-[#EB0028]" style={{ marginBottom: 'var(--space-xl)' }} />

            <div className="event-description">
              <p className="text-body-large text-[#1F1F1F]" style={{ marginBottom: 'var(--space-lg)' }}>
                We are the heart and hustle of TEDxCITBengaluru, a dedicated collective bringing 'ideas worth spreading' to life in the city.
              </p>

              <p className="text-body-large text-[#1F1F1F]" style={{ marginBottom: 'var(--space-lg)' }}>
                If you're looking for an extraordinary hands-on experience that challenges you, connects you with thinkers, and amplifies your impact, then step up!!
              </p>

              <p className="text-body text-gray-400 italic">
                we're waiting for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM SLANTED DIVIDER ===== */}
      {/* White angled wedge extending into the dark footer section */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-20 md:h-28 w-full pointer-events-none translate-y-full z-20"
      >
        <polygon points="0,0 100,0 0,100" fill="#9D9D9D" />
      </svg>
    </section>
  );
}