"use client";
import React from 'react';
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack"; 

const stats = [
    { label: "Minutes Of Talks", value: "300+" },
    { label: "Speakers", value: "30+" },
    { label: "TED Circles", value: "12+" },
    { label: "Social Followers", value: "2000+" },
];

export default function Mission() {
    return (
        <section className='relative w-full min-h-screen bg-black text-white'>
            
            {/* --- PART 1: The Text Content --- */}
            <div className="relative z-10 flex flex-col px-6 md:px-16 pt-20 pb-10 max-w-7xl mx-auto">
                {/* Responsive Heading */}
                <h2 className="text-[40px] md:text-[60px] lg:text-[8vh] font-bold text-[#B0B0B0] mb-4 leading-none">
                    <span className='text-[#EB0028]'>OUR </span>MISSION
                </h2>
                <div className='w-24 md:w-[302px] h-[4px] md:h-[6px] bg-[#EB0028] mb-12 rounded-full'></div>
                
                {/* Text List - No scrollbar, just flows naturally */}
                <div className="space-y-8 md:space-y-10">
                    {[
                        "To build a community of like-minded individuals who are eager to learn, share and grow.",
                        "To create a culture that can be carried forward and can continue inspiring the community.",
                        "To touch upon different aspects of life and society through our carefully created events.",
                        "To nurture and spread ideas on a large scale as possible.",
                        "To make every event, one worth remembering and looking up to."
                    ].map((text, idx) => (
                        <div key={idx} className="flex items-start gap-4 md:gap-6 group">
                            {/* Animated Red Bar */}
                            <div className="w-1 md:w-1.5 h-8 md:h-[35px] bg-[#EB0028] flex-shrink-0 mt-1.5 transition-all duration-300 group-hover:h-[60px] group-hover:bg-white"></div>
                            <p className="text-gray-200 text-lg md:text-2xl lg:text-[28px] font-light leading-relaxed break-words">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- PART 2: The Scroll Stack (Blended) --- */}
            {/* We add padding-bottom to ensure the last card has room to un-pin before the next section */}
            <div className="relative w-full pb-32 md:pb-48">
                <ScrollStack 
                    itemDistance={50} // Distance between cards before stacking
                    itemScale={0.05}  // How much they shrink
                    itemStackDistance={20} // Visible stack offset
                    useWindowScroll={true} // <--- KEY: Blends with page scroll
                    stackPosition="15%" // Cards stick when they reach 15% from top
                >
                    {stats.map((stat, index) => (
                        <ScrollStackItem key={index}>
                            {/* Card Design */}
                            <div className="w-full h-full bg-gradient-to-br from-[#EB0028] to-[#99001a] rounded-3xl flex flex-col items-center justify-center shadow-2xl border border-white/10 p-6 md:p-10 transition-transform hover:scale-[1.02]">
                                
                                {/* Responsive Label */}
                                <div className="text-black/80 text-lg md:text-3xl font-bold mb-2 md:mb-4 uppercase tracking-widest text-center">
                                    {stat.label}
                                </div>
                                
                                {/* Responsive Number */}
                                <div className="text-white text-[80px] md:text-[140px] lg:text-[180px] font-black leading-none tracking-tighter drop-shadow-lg">
                                    {stat.value}
                                </div>
                            </div>
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>
            
        </section>
    );
}