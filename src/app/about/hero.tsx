"use client";
import React from "react";
import Image from "next/image";
import Header from "@/components/layout/header"; 

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-white">
            <Header />
            
            {/* --- Image Layer --- */}
                 {/* --- Full-width Mountain Background --- */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760513189/Mask_group_qwx8ys.svg"
          alt="Mountain background"
          fill
          className="object-cover object-bottom w-full h-full"
          priority
          sizes="100vw"
        />

        {/* FADE GRADIENT - Fades mountain into the next section color */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1F1F1F]"></div>
      </div>

            {/* Optional: A Hero Title if you want one (Uncomment to use) */}
            {/* <div className="absolute inset-0 flex items-center justify-center z-10">
                <h1 className="text-white text-6xl md:text-9xl font-bold tracking-tighter uppercase text-center mix-blend-overlay opacity-80">
                    The Journey
                </h1>
            </div> 
            */}
        </section>
    );
}