"use client";
import React from "react";

export default function EventPreview() {
  return (
    <section className="relative w-full bg-black text-white section">
      <div className="container">
        {/* Mobile: Photo on top, then description */}
        {/* Desktop: Photo left, description right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start" style={{ gap: 'var(--space-3xl)' }}>

          {/* Left side - Photo/Preview box */}
          <div className="w-full lg:w-1/2 flex-shrink-0 animate-fade-in-left">
            <div className="event-image-container">
              <img
                src="/images/team.jpg"
                alt="Event or team photo preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start animate-fade-in-right">
            <h2 className="text-heading-1" style={{ marginBottom: 'var(--space-lg)' }}>
              <span className="text-gray-300">What if your next step</span>
              <br />
              <span className="text-red">defined the stage?</span>
              <br />
              <span className="text-gray-300">Step up!!</span>
            </h2>

            <div className="w-24 h-1 bg-red" style={{ marginBottom: 'var(--space-xl)' }} />

            <div className="event-description">
              <p className="text-body-large text-gray-300" style={{ marginBottom: 'var(--space-lg)' }}>
                We are the heart and hustle of TEDxCITBengaluru, a dedicated collective bringing 'ideas worth spreading' to life in the city.
              </p>

              <p className="text-body-large text-gray-300" style={{ marginBottom: 'var(--space-lg)' }}>
                If you're looking for an extraordinary hands-on experience that challenges you, connects you with thinkers, and amplifies your impact, then step up!!
              </p>

              <p className="text-body text-gray-400 italic">
                we're waiting for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}