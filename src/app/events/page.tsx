"use client";
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/header'
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- TYPES ---
interface Video {
    title: string;
    url: string;
    thumbnail: string;
}

interface EventData {
    name: string;
    date: string;
    src: string;
    videos: Video[];
}

const Page = () => {
    const [activeTab, setActiveTab] = useState('events');
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const targetPosition = contentRef.current.getBoundingClientRect().top + window.scrollY;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 100;
            let start: number | null = null;

            const animation = (currentTime: number) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function for smoother animation
                const ease = progress * (2 - progress);
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        }
    }, []);

    // --- DATA ---
    const events: EventData[] = [
        { 
            name: 'Epoch', 
            date: '28th FEBRUARY 2025', 
            src: '/events/Epoch.jpg',
            videos: [
                { title: "Standup Comedy by Shankar Chugani", url: "https://www.youtube.com/embed/DMUkJWNQhO0?autoplay=0", thumbnail: "https://img.youtube.com/vi/DMUkJWNQhO0/0.jpg" },
                { title: "Musical Performance by Dhananjay Keys", url: "https://www.youtube.com/embed/9LPhOwITmjQ?autoplay=0", thumbnail: "https://img.youtube.com/vi/9LPhOwITmjQ/0.jpg" }
            ]
        },
        { 
            name: 'Aether', 
            date: '6th MAY 2024', 
            src: '/events/Aether.jpg',
            videos: [
                { title: "Bridging Communities through Language | Sakshi Baid", url: "https://www.youtube.com/embed/wgv67rTc5pk?autoplay=0", thumbnail: "https://img.youtube.com/vi/wgv67rTc5pk/0.jpg" },
                { title: "Elements of Self-Expression | Ruby Naaz", url: "https://www.youtube.com/embed/fmZs6srNYOA?autoplay=0", thumbnail: "https://img.youtube.com/vi/fmZs6srNYOA/0.jpg" }
            ]
        },
        { 
            name: 'Zenith', 
            date: '31st MARCH 2023', 
            src: '/events/Zenith.jpg',
            videos: [
                { title: "Pursuing Excellence | Saptarshi Prakash", url: "https://www.youtube.com/embed/GVNvrxoZW8k?autoplay=0", thumbnail: "https://img.youtube.com/vi/GVNvrxoZW8k/0.jpg" }
            ]
        },
        { 
            name: 'Elixir', 
            date: '8th JULY 2022', 
            src: '/events/Elixir.jpg',
            videos: [
                { title: "Consistency and Excellence | Reshi Magada", url: "https://www.youtube.com/embed/h6olKX9BajA?autoplay=0", thumbnail: "https://img.youtube.com/vi/h6olKX9BajA/0.jpg" }
            ]
        },
        { 
            name: 'Thrive', 
            date: '11th NOVEMBER 2021', 
            src: '/events/Thrive.jpg',
            videos: [
                { title: "Struggles of Women & Sexual Minorities | Akkai Padmashali", url: "https://www.youtube.com/embed/5y7Ek2sDMu4?autoplay=0", thumbnail: "https://img.youtube.com/vi/5y7Ek2sDMu4/0.jpg" }
            ]
        },
        { 
            name: 'Iridescence', 
            date: '23rd AUGUST 2021', 
            src: '/events/Iridescence.jpg',
            videos: [
                { title: "Thinking from Another Perspective | Wilfred Shreyas", url: "https://www.youtube.com/embed/r4UeEGmOATA?autoplay=0", thumbnail: "https://img.youtube.com/vi/r4UeEGmOATA/0.jpg" }
            ]
        },
    ];

    const circles = [
        { name: 'Agree to Disagree',  src: '/circles/Agree to Disagree.jpg' },
        { name: 'Beginnings', src: '/circles/Beginnings.jpg'},
        { name: 'Brave it Out', src: '/circles/Brave it Out.jpg'},
        { name: 'Countdown', src: '/circles/Countdown.jpg'},
        { name: 'Criticism', src: '/circles/Criticism.jpg'},
        { name: 'Happiness', src: '/circles/Happiness.jpg'},
        { name: 'Humour', src: '/circles/Humour.jpg'},
        { name: 'Imagination', src: '/circles/Imagination.jpg'},
        { name: 'Irrational', src: '/circles/Irrational.jpg'},
        { name: 'Optimism', src: '/circles/Optimism.jpg'},
        { name: 'Our Bodies', src: '/circles/Our Bodies.jpg'},
        { name: 'Procrastination', src: '/circles/Procrastination.jpg'},
        { name: 'Teamwork', src: '/circles/Teamwork.jpg'},
    ];

    // --- ANIMATION VARIANTS ---
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0, scale: 0.98 },
        visible: { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            transition: { type: "spring", stiffness: 60, damping: 20 }
        }
    };

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    return (
        <div className="bg-[#050505]">
            {/* HERO SECTION - Same as About Page */}
            <section className="relative w-full h-screen overflow-hidden bg-white">
                <Header />
                
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
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]"></div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section ref={contentRef} className="relative z-20 bg-[#050505] py-20">
                <div className="container mx-auto px-6 w-full md:w-2/3 lg:w-1/2 flex flex-col items-center">
                    
                    {/* --- TOGGLE BUTTONS --- */}
                    <div className="mb-16 w-full flex justify-center">
                        <div className="inline-flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl">
                            <button
                                onClick={() => setActiveTab('events')}
                                className={`px-8 py-3 rounded-full text-base font-bold uppercase tracking-wider transition-all duration-300 ${
                                    activeTab === 'events'
                                        ? 'bg-[#EB0028] text-white shadow-lg scale-105'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Events
                            </button>
                            <button
                                onClick={() => setActiveTab('circles')}
                                className={`px-8 py-3 rounded-full text-base font-bold uppercase tracking-wider transition-all duration-300 ${
                                    activeTab === 'circles'
                                        ? 'bg-[#EB0028] text-white shadow-lg scale-105'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Circles
                            </button>
                        </div>
                    </div>

                {/* --- ANIMATED CONTENT AREA --- */}
                <div className="w-full min-h-[50vh]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'events' ?  (
                            <motion.div 
                                key="events-list"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full space-y-16"
                            >
                                {events.map((event, index) => (
                                    <motion.div 
                                        key={index} 
                                        variants={itemVariants}
                                        viewport={{ once: true, margin: "-50px" }}
                                        className="relative w-full rounded-[40px] overflow-hidden shadow-2xl border border-white/10 bg-[#0a0a0a] group"
                                    >
                                        <div className="relative w-full">
                                            <Image
                                                src={event.src}
                                                alt={`${event.name} background`}
                                                width={1920}
                                                height={1080}
                                                priority={index < 2}
                                                className="w-full h-auto object-contain grayscale-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                                            />

                                            {/* Date Badge */}
                                            <div className="absolute top-0 left-0">
                                                <div className="bg-black/60 backdrop-blur-md border-b border-r border-white/10 px-8 py-4 rounded-br-3xl">
                                                    <span className="text-white text-[13px] font-bold uppercase tracking-widest">
                                                        {event.date}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Know More Button (Opens Modal) */}
                                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-90 hover:opacity-100">
                                                <button 
                                                    onClick={() => setSelectedEvent(event)}
                                                    className="bg-[#EB0028] hover:bg-[#c4001f] text-white text-xs font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-[#EB0028]/40 transition-all duration-300 hover:scale-105 uppercase tracking-widest border border-white/10"
                                                >
                                                    Know more
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="circles-list"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                            >
                                {circles.map((circle, index) => (
                                    <motion.div 
                                        key={index} 
                                        variants={itemVariants}
                                        viewport={{ once: true }}
                                    >
                                        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-white/10 bg-[#0a0a0a] group cursor-pointer">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={circle.src}
                                                    alt={circle.name}
                                                    fill
                                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                                                
                                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                                    <p className="text-white text-center font-bold text-lg uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                                                        {circle.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            </section>

            {/* --- VIDEO MODAL --- */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEvent(null)} // Close on background click
                    >
                        <motion.div
                            className="bg-[#111] w-full max-w-5xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#1a1a1a]">
                                <div>
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{selectedEvent.name}</h3>
                                    <p className="text-[#EB0028] text-sm font-bold tracking-widest mt-1">Talks & Performances</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedEvent(null)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content - Scrollable Video Grid */}
                            <div className="p-6 overflow-y-auto">
                                {selectedEvent.videos.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {selectedEvent.videos.map((video, idx) => (
                                            <div key={idx} className="flex flex-col gap-3 group">
                                                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                                    <iframe 
                                                        src={video.url} 
                                                        title={video.title}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                                <h4 className="text-white font-medium text-lg leading-tight group-hover:text-[#EB0028] transition-colors">
                                                    {video.title}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 text-gray-500">
                                        <p>More videos coming soon.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <footer className="w-full z-50 relative bottom-0 text-center pt-4 text-[14px] text-gray-600 pb-10 bg-[#050505]">
                Copyright {new Date().getFullYear()} &copy; TEDxCITBengaluru. This independent TEDx event is operated under license from TED 
            </footer>  
        </div>
    )
}

export default Page