"use client";
import React from "react";
import Image from "next/image";
import Header from "@/components/layout/header"; 

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-white">
            
            {/* --- HEADER SECTION --- */}
            {/* We removed mix-blend-difference to keep the "Original" logo color.
              Added a subtle gradient and blur to ensure the white logo is visible 
              even if the background behind it is white.
            */}
            <div className="absolute top-0 left-0 w-full z-50">
                {/* Subtle dark vignette at the top to pop the white logo */}
                <div className="absolute inset-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                <Header />
            </div>
            
            {/* --- Image Layer --- */}
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
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]"></div>
            </div>
        </section>
    );
}