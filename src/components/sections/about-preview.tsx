"use client";
import React from "react";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="relative w-full bg-[#0B0B0B] text-white overflow-hidden section py-16 md:py-20">
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

      {/* Content Wrapper */}
      <div className="relative z-10 w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-20 md:mb-24 text-center">
            <span className="text-[#E62B1E]">EMPOWERING</span>{" "}
            <span className="text-gray-200">MINDS TO SHAPE TOMORROW</span>
          </h1>

          {/* Description */}
          <div className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-center mb-10 md:mb-12">
            <p>
              TED is a global platform devoted to sharing ideas that matter, through short, powerful talks that spark reflection and inspire change. TEDx, an initiative by TED, brings this spirit to local communities worldwide, where independently organized events create spaces for ideas to be shared, challenged, and celebrated.
            </p>
            <p className="mt-6 mb-10 md:mb-12">
              At TEDxCITBengaluru, we bring this opportunity to our campus. Our goal is to uncover voices and ideas emerging from our community—stories that are original, thought-provoking, and capable of creating real impact.
            </p>
          </div>

          {/* Bullets */}
          <div className="flex flex-col gap-12 md:gap-14 justify-center text-center">
            <p className="text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed">
              We uncover voices and ideas that emerge from within our own community, stories that are original, thought-provoking, and capable of creating real impact.
            </p>
            <p className="text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed">
              Through every event we host, we aim to ignite curiosity, start meaningful conversations, and connect people who believe in shaping a better tomorrow through the power of ideas.
            </p>
            <p className="text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed">
              Connect with like-minded individuals and build your network.
            </p>
          </div>
        </div>
      </div>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
    </section>
  );
}