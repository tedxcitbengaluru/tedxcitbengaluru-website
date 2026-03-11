"use client";
import Header from "@/components/layout/header";
import Image from "next/image";
import React from "react";

export default function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] sm:min-h-screen overflow-hidden bg-white">
            
            {/* --- HEADER CONTROLS --- */}
            {/* Added a subtle vignette at the top to ensure the white header 
                elements are visible against the white background. */}
            <div className="absolute top-0 left-0 w-full z-50">
                <div className="absolute inset-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                <Header />
            </div>
            
            {/* --- Full-width Mountain Background --- */}
            <div className="absolute inset-0">
                <Image
                    src="/images/bg-left-bird.svg"
                    alt="Mountain background"
                    fill
                    className="object-cover object-bottom w-full h-full"
                    priority
                    sizes="100vw"
                />
    
                {/* FADE GRADIENT - Fades mountain into the next section color */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1F1F1F]"></div>
            </div>
        </section>
    );
}