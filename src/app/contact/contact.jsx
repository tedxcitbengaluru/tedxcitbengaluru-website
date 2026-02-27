"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaInstagram, FaLinkedinIn, FaYoutube, FaEnvelope, FaArrowRight } from 'react-icons/fa'

export default function Contact() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const socialLinks = [
        {
            name: "Instagram",
            icon: <FaInstagram size={32} />,
            url: "https://www.instagram.com/tedxcitbengaluru/",
            brandColor: "group-hover:text-[#E1306C]", 
            glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(225,48,108,0.4)]",
            borderColor: "group-hover:border-[#E1306C]/50",
            subtext: "DM us @tedxcitbengaluru"
        },
        {
            name: "LinkedIn",
            icon: <FaLinkedinIn size={32} />,
            url: "https://www.linkedin.com/company/tedxcitbengaluru/",
            brandColor: "group-hover:text-[#0077B5]",
            glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(0,119,181,0.4)]",
            borderColor: "group-hover:border-[#0077B5]/50",
            subtext: "Connect with us"
        },
        {
            name: "Email",
            icon: <FaEnvelope size={32} />,
            url: "mailto:tedxcitbengaluru@cambridge.edu.in",
            brandColor: "group-hover:text-[#EA4335]",
            glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(234,67,53,0.4)]",
            borderColor: "group-hover:border-[#EA4335]/50",
            subtext: "tedxcitbengaluru@cambridge.edu.in"
        },
        {
            name: "YouTube",
            icon: <FaYoutube size={32} />,
            url: "https://www.youtube.com/@TEDxCITBengaluru/playlists",
            brandColor: "group-hover:text-[#FF0000]",
            glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(255,0,0,0.4)]",
            borderColor: "group-hover:border-[#FF0000]/50",
            subtext: "Watch our talks"
        }
    ];

    return(
        // REVERTED: Back to #1F1F1F (Charcoal) instead of Black
        <section className='relative w-full min-h-screen overflow-hidden bg-[#1F1F1F] flex flex-col font-sans'>
            
            {/* Background Particles - Increased Opacity */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src="/images/sponsors_particles.svg"
                    alt="graphics background"
                    fill
                    className="object-cover opacity-60" // Bumped up opacity so it's clearly visible
                    priority
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-20">
                
                {/* Heading */}
                <div className={`text-center mb-16 transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-5xl md:text-8xl font-black text-[#B0B0B0] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                        Get In <span className='text-[#EB0028]'>Touch</span>
                    </h2>
                    <div className="h-1 w-24 bg-[#EB0028] mx-auto rounded-full mb-6 shadow-[0_0_20px_#EB0028]" />
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Have a question, an idea, or just want to say hello? <br className="hidden md:block"/>
                        We are just one click away.
                    </p>
                </div>
                
                {/* Social Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-5xl">
                    {socialLinks.map((social, index) => (
                        <a 
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ transitionDelay: `${index * 100}ms` }}
                            className={`
                                group relative flex items-center gap-5 p-5 md:p-6
                                /* LIGHTER CARD BG: Using white/5 so it stands out against the grey bg */
                                bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl
                                transform transition-all duration-500 hover:-translate-y-2 
                                ${social.glowColor} ${social.borderColor} hover:bg-white/10
                                ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                            `}
                        >
                            {/* Icon Box */}
                            <div className={`
                                flex-shrink-0 p-4 rounded-xl bg-black/20 border border-white/5
                                text-white transition-all duration-300 group-hover:scale-110
                                ${social.brandColor}
                            `}>
                                {social.icon}
                            </div>

                            {/* Text Info */}
                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-lg md:text-xl font-bold text-white uppercase tracking-wider mb-1">
                                    {social.name}
                                </span>
                                <span className="text-sm md:text-base text-gray-400 font-medium group-hover:text-gray-200 transition-colors break-words">
                                    {social.subtext}
                                </span>
                            </div>

                            {/* Animated Arrow */}
                            <div className="flex-shrink-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out text-[#EB0028]">
                                <FaArrowRight size={20} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 py-8 border-t border-white/5 bg-[#1F1F1F]">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wide">
                        © {new Date().getFullYear()} <span className="text-gray-300">TEDxCITBengaluru</span>.
                        This independent TEDx event is operated under license from TED.
                    </p>
                </div>
            </div>
        </section>
    )
}