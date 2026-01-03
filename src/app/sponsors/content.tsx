"use client";
import React from 'react';
import Image from 'next/image';

export default function PreviousSponsors() {
    // Placeholder data for 12 sponsors
    // Replace '/sponsors/logo1.png' with your actual paths
    const sponsors = [
        { name: "Sponsor 1", src: "/partners/AEV.jpg" },
        { name: "Sponsor 2", src: "/partners/BS MAX.jpg" },
        { name: "Sponsor 3", src: "/partners/Deby Studio.jpg" },
        { name: "Sponsor 4", src: "/partners/Drip Cafe.jpg" },
        { name: "Sponsor 5", src: "/partners/KA 53 MENS CLUB.jpg" },
        { name: "Sponsor 6", src: "/partners/MRS.jpg" },
        { name: "Sponsor 7", src: "/partners/Pact Central.jpg" },
        { name: "Sponsor 8", src: "/partners/TBY Fitness Studio.jpg" },
        { name: "Sponsor 9", src: "/partners/THe Biryani Cart.jpg" },
        { name: "Sponsor 10", src: "/partners/The Deby Studio.jpg" },
        { name: "Sponsor 11", src: "/partners/Unibic.jpg" },
        { name: "Sponsor 12", src: "/partners/Uvid Art and Crafts.jpg" },
    ];

    return (
        <section className='relative w-full min-h-screen overflow-hidden bg-[#1F1F1F] flex flex-col'>
            
            {/* 1. Background Particles - Made Responsive */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <Image
                    src="/images/sponsors_particles.svg"
                    alt="graphics background"
                    fill
                    className="object-cover object-right-top" // Anchors image to top-right
                    priority
                />
            </div>

            {/* 2. Main Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 py-16 flex-grow flex flex-col">
                
                {/* Heading */}
                <div className="mb-12 md:mb-20">
                    <h2 className="text-5xl md:text-7xl lg:text-[8vh] font-bold text-[#B0B0B0] leading-none tracking-tight">
                        PREVIOUS <br className="md:hidden" />
                        <span className='text-[#EB0028]'>SPONSORS</span>
                    </h2>
                    <div className="h-1 w-24 bg-[#EB0028] mt-6"></div>
                </div>

                {/* Sponsors Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-auto">
                    {sponsors.map((sponsor, index) => (
                        <div 
                            key={index}
                            className="
                                group relative aspect-[3/2] flex items-center justify-center p-6
                                bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl
                                transition-all duration-300
                                hover:bg-white/10 hover:border-[#EB0028]/50 hover:shadow-[0_0_30px_rgba(235,0,40,0.15)]
                            "
                        >
                            <div className="relative w-full h-full">
                                {/* Ideally, use actual logo images here. 
                                    I've added a fallback text in case images aren't ready yet. */}
                                <Image
                                    src={sponsor.src}
                                    alt={`${sponsor.name} Logo`}
                                    fill
                                    className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. Footer Section (Integrated at bottom of flow) */}
                <div className="mt-20 border-t border-white/10 pt-8">
                    <p className="text-xs sm:text-sm text-center text-gray-500 leading-relaxed">
                        © {new Date().getFullYear()} <span className="font-semibold text-white">TEDxCITBengaluru</span>.
                        This independent TEDx event is operated under license from TED.
                    </p>
                </div>

            </div> 
        </section>
    )
}