"use client";
import React from "react";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="relative w-full bg-[#0B0B0B] text-white overflow-hidden section">
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
        <div className="w-full max-w-5xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-12 md:mb-16 text-center">
            <span className="text-[#E62B1E]">EMPOWERING</span>{" "}
            <span className="text-gray-200">MINDS TO SHAPE TOMORROW</span>
          </h1>

          {/* WHO WE ARE */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 tracking-tight">
              WHO <span className="text-[#E62B1E]">WE</span> ARE?
            </h2>
            <div className="w-24 h-1 bg-[#E62B1E] mx-auto"></div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-base sm:text-lg md:text-lg leading-relaxed mb-10 md:mb-12 text-center content-width mx-auto">
            We believe a TEDx Talk is a journey, with the Idea being the
            destination. We find the most unique, thought-provoking, and impactful
            ideas within our local community and provide a platform for them to
            spread far and wide. Connect with like-minded individuals and build your
            network.
          </p>

          {/* Bullets */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="border-l-4 border-[#E62B1E] pl-5 sm:pl-6 md:pl-8">
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                We believe a TEDx Talk is a journey, with the idea being the
                destination.
              </p>
            </div>

            <div className="border-l-4 border-[#E62B1E] pl-5 sm:pl-6 md:pl-8">
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                We find the most unique, thought-provoking, and impactful ideas
                within our local community and provide a platform for them to
                spread far and wide.
              </p>
            </div>

            <div className="border-l-4 border-[#E62B1E] pl-5 sm:pl-6 md:pl-8">
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
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