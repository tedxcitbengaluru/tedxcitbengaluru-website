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
{/* Left side - Photo/Preview box */}
<div className="w-full lg:w-1/2 flex-shrink-0">
            {/* The image now replaces the placeholder text */}
            <div className="w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="/images/team.jpg" // <-- Path to your image in the public folder
                alt="Event or team photo preview" // <-- Descriptive alt text
                className="w-full h-full object-cover" // Ensures image fills and crops to the container
              />
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start lg:pt-6">
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 md:mb-8">
              <span className="text-gray-300">What if your next step</span>
              <br />
              <span className="text-[#E62B1E]">defined the stage?</span>
              <br />
              <span className="text-gray-300">Step up!!</span>
            </h2>

            <div className="w-24 h-1 bg-[#E62B1E] mb-8 md:mb-10" />

            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8 content-width">
              We are the heart and hustle of TEDxCITBengaluru, a dedicated collective bringing 'ideas worth spreading' to life in the city. If you're looking for an extraordinary hands on experience that challenges you, connects you with thinkers, and amplifies your impact, then step up!!
            </p>

            <p className="text-gray-500 text-base md:text-base leading-relaxed">
              we're waiting for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}