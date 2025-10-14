"use client";
import React from "react";

export default function EventPreview() {
  return (
    <section className="relative w-full bg-black text-white section">
      <div className="container">
        {/* Mobile: Photo on top, then description */}
        {/* Desktop: Photo left, description right */}
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-20 items-center lg:items-start">

          {/* Left side - Photo/Preview box */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="w-full aspect-video bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <span className="text-gray-600 text-sm">Event Preview</span>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start lg:pt-6">
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 md:mb-8">
              <span className="text-gray-300">EXPERIENCE</span>
              <br />
              <span className="text-[#E62B1E]">SOMETHING</span>
              <br />
              <span className="text-gray-300">EXTRAORDINARY</span>
            </h2>

            <div className="w-24 h-1 bg-[#E62B1E] mb-8 md:mb-10" />

            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8 content-width">
              Join us for an unforgettable gathering of innovators, thinkers, and changemakers.
              Be part of a community dedicated to spreading ideas worth sharing and inspiring
              positive change in the world.
            </p>

            <p className="text-gray-500 text-base md:text-base leading-relaxed">
              Limited spots available. Secure your place today and become part of something bigger.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}