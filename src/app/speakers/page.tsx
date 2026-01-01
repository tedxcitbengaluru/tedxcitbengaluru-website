import React from 'react'
import Image from 'next/image'
import Header from '@/components/layout/header'

const page = () => {
    // Array for the tabs seen in the image
    const eventTypes = ["EPOCH", "AETHER", "ZENITH", "ELIXIR", "THRIVE", "IRIDESCENCE"];
    
    const speakerCards = Array(11).fill("Name Here");

    return (
    <section className="relative w-full bg-black ">
    <Header />

    {/* IMAGE SECTION — takes space */}
    <div className="relative w-full h-auto sm:min-h-screen overflow-hidden">
    <Image
        src="/images/bg-left-bird.svg"
        alt="Mountain background"
        width={1920}
        height={3000}
        priority
        className="w-full h-auto object-contain"
    />

    {/* Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>

    {/* CONTENT SECTION — starts AFTER image */}
    <div className="relative container mx-auto px-6 py-10 flex flex-col items-start">
        
        {/* Main Heading */}
        <div className="mb-4 max-w-2xl">
        <h1 className="text-6xl md:text-6xl font-black text-[#B0B0B0] leading-tight uppercase tracking-tighter">
            <span className="text-[#EB0028]">OUR</span> SPEAKERS &<br /> PERFORMERS
        </h1>
        </div>
            <div className="mb-12 w-full">
                <p className="text-[#B0B0B0] text-md md:text-base leading-relaxed py-4">
                    At TEDxCITBengaluru, we curate a diverse lineup of speakers and performers who embody the spirit of innovation, creativity, and transformative thinking. Our event features thought leaders, visionaries, and artists from various fields, each bringing unique perspectives and inspiring stories that challenge the status quo and ignite change. From groundbreaking technological advancements to compelling social initiatives, our speakers and performers are united by their passion for spreading ideas worth sharing. Join us to experience a day filled with inspiration, learning, and connection as we celebrate the power of ideas to shape a better tomorrow.
                </p>
        </div>
        {/* Event Type Tabs */}
        <div className="flex flex-wrap gap-5 mb-8 mt-4 w-full">
        {eventTypes.map((event, index) => (
            <button
            key={event}
            className={`min-h-[44px] w-auto px-10 py-3 text-sm font-semibold  rounded-full
                transition-all duration-300 flex items-center justify-center ${
                index === 0
                    ? "bg-[#EB0028] text-white shadow-lg shadow-[#EB0028]/30"
                    : "text-gray-400 border border-gray-700 hover:text-white hover:border-[#EB0028]"
                }`}
            >
            {event}
            </button>
        ))}
        </div>

        {/* Speaker Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full my-10">
        {speakerCards.map((name, idx) => (
            <div
            key={idx}
            className={`bg-[#2A2A2A] rounded-2xl aspect-[4/4] flex items-end justify-center pb-8 ${
                idx === 10 ? "md:col-span-2 lg:col-span-2 col-span-2 aspect-auto" : ""
            }`}
            >
            <span className="text-gray-500 text-sm">{name}</span>
            </div>
        ))}
        </div>

        <footer className="w-full text-center pt-4 text-[14px] text-gray-600">
            Copyright 2025 &copy; TEDxCITBengaluru. This independent TEDx event is operated under license from TED 
        </footer>
    </div>
    </section>
    )
}

export default page