"use client";
import React from 'react'
import Image from 'next/image'
import LuxuryGallery from '@/components/ui/LuxuryGallery'

export default function AboutUs() {
    return(
        <section className='relative w-full min-h-screen flex flex-col justify-center bg-[#050505] text-white py-24'>
            
            {/* Subtle Royal Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
                <Image
                    src="/images/about_content_bg.svg"
                    alt="texture"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-[1600px]">
                
                {/* 1. Header Section - The "Magazine Spread" Layout */}
                <div className="border-t border-white/20 pt-12 mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* Title Column */}
                        <div className="lg:col-span-7">
                            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase">
                                About <br />
                                <span className='text-[#EB0028]'>Us</span>
                            </h2>
                        </div>
                        
                        {/* Legacy Text Column */}
                        <div className="lg:col-span-5 flex flex-col justify-end pb-2">
                            <div className="w-12 h-1 bg-[#EB0028] mb-6"></div>
                            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed text-justify">
                                <span className="text-white font-semibold">TEDxCITBengaluru</span> is not just an event; it is a legacy. An independently organized collective based in Cambridge Institute of Technology, striving to curate top-tier intellectual experiences.
                            </p>
                        </div>

                    </div>
                </div>

                {/* 2. The "Solid" Gallery */}
                <div className="w-full">
                    <LuxuryGallery 
                        images={[
                            '/about/image1.jpg',
                            '/about/image1.jpg',
                            '/about/image1.jpg',
                            '/about/image1.jpg',
                            '/about/image1.jpg',
                        ]} 
                    />
                </div>
                
            </div>  
        </section>
    )
}