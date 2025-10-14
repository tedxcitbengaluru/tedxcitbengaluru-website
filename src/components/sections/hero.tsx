"use client";
import React from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/sections/social-sidebar";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-screen bg-black text-white overflow-hidden pt-16 md:pt-20">
      <Header />
      <Sidebar />

      {/* Decorative overlay for subtle depth */}
      {/* Mountain background (subtle, behind content) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/mountain.svg"
          alt="mountain background"
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-30"
          priority
        />
      </div>

      {/* Decorative overlay for subtle depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/90 to-transparent" />
      </div>

      {/* Centered hero content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] sm:min-h-screen px-6 sm:px-8">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Ideas worth spreading
            <span className="block lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-red-500">
              local voices. global impact.
            </span>
          </h1>

          <p
            className="mt-10 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300/95 max-w-2xl px-5 mx-auto leading-relaxed"
            style={{ paddingTop: "10px" }}
          >
            A focused day of short, powerful talks and creative showcases from
            our community. Hear fresh ideas, connect with curious minds and
            leave with practical inspiration you can act on.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#tickets"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-700 px-6 py-3 text-sm font-semibold shadow-lg transition"
              aria-label="Reserve tickets"
            >
              Reserve Tickets
              <span className="sr-only"> for TEDxCITBengaluru</span>
            </a>

            <a
              href="/joinus"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white/95 hover:bg-white/5 transition"
              aria-label="Get involved"
            >
              Get Involved
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Date & venue details coming soon — stay tuned.
          </p>
        </div>
      </div>
    </section>
  );
}
