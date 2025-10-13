"use client";
import React from "react";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="relative h-screen w-full bg-[#0B0B0B] text-white flex items-center justify-center overflow-hidden">
      {/* ===========================
          BACKGROUND RED "X"
      ============================ */}
      <div className="absolute inset-0 flex justify-end items-center pointer-events-none">
        <Image
          src="/images/X1.svg" // Replace with your actual image path
          alt="Red X background"
          width={900}
          height={900}
          className="object-contain opacity-15 md:opacity-25 translate-x-12 md:translate-x-20"
        />
      </div>

      {/* ===========================
          CONTENT WRAPPER
      ============================ */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 lg:px-20 text-center md:text-left">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8">
          <span className="text-[#E62B1E]">EMPOWERING </span>
          <span className="text-gray-200">MINDS TO </span>
          <span className="text-[#E62B1E]">SHAPE </span>
          <span className="text-gray-200">TOMORROW</span>
        </h1>

        {/* Subheading */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
            WHO <span className="text-[#E62B1E]">WE</span> ARE?
          </h2>
          <div className="w-16 h-[3px] bg-[#E62B1E] mt-2 md:mt-3"></div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          repellat alias cupiditate error pariatur, iusto omnis corporis ullam
          nesciunt cumque est magni vitae aperiam doloremque deleniti dolorem
          saepe quod reprehenderit quasi debitis accusamus maxime consequuntur?
          Tempore obcaecati fugit eligendi ut eius quisquam ex, voluptate quo
          excepturi sed beatae quasi vero.
        </p>

        {/* Bullet/mission points */}
        <div className="flex flex-col gap-6 text-gray-200 max-w-2xl">
          <div className="border-l-4 border-[#E62B1E] pl-5">
            <p>
              We believe a TEDx Talk is a journey, with the idea being the
              destination.
            </p>
          </div>

          <div className="border-l-4 border-[#E62B1E] pl-5">
            <p>
              We find the most unique, thought-provoking, and impactful ideas
              within our local community and provide a platform for them to
              spread far and wide.
            </p>
          </div>

          <div className="border-l-4 border-[#E62B1E] pl-5">
            <p>
              We connect with like-minded individuals and help build your
              network.
            </p>
          </div>
        </div>
      </div>

      {/* ===========================
          BLACK OVERLAY (optional)
          helps contrast on bright screens
      ============================ */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
    </section>
  );
}
