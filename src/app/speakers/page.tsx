"use client";
import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Header from '@/components/layout/header'

// --- TYPE DEFINITIONS ---
interface Speaker {
    name: string;
    role: string;
    image: string;
}

interface EventsData {
    [key: string]: Speaker[];
}

// --- DATA (Moved outside to prevent re-creation on render) ---

    // --- DATA POPULATION (Kept exactly as requested) ---
    const eventsData: EventsData = {
        Epoch: [
            { name: "Dr. Muralidharan Kesavan", role: "Psychiatrist x Professor", image: "/speakers/Dr. Muralidharan Kesavan.jpg" },
            { name: "Aditi Bhonsle", role: "Fashion Designer x Entrepreneur", image: "/speakers/Aditi Bhonsle.jpg" },
            { name: "Shiji Sunil", role: "Digital Trailblazer × VFX Visionary", image: "/speakers/Shiji Sunil.jpg" },
            { name: "Dr. Shivananda Koteshwar", role: "Technologist × Educator", image: "/speakers/Dr. Shivananda Koteshwar.jpg" },
            { name: "Team Madhari", role: "Classical Music x Band", image: "/speakers/Team Madhari.jpg" },
            { name: "Dhananjay Keys", role: "Sound Engineer x Singer", image: "/speakers/Dhananjay Keys.jpg" },
            { name: "Pregos Dance Crew", role: "Performing Storytellers", image: "/speakers/Pregos Dance Crew.jpg" },
            { name: "Shankar Chugani", role: "Stand up comedian", image: "/speakers/Shankar Chugani.jpg" },
        ],
        Aether: [
            { name: "Madhuri Braganza", role: "Special Educator x Actor", image: "/speakers/Madhuri Braganza.jpg" },
            { name: "Nived Antony", role: "HR x Model x Social Activist", image: "/speakers/Nived Antony.jpg" },
            { name: "Asha Bhat", role: "Playback Classical Singer", image: "/speakers/Asha Bhat.jpg" },
            { name: "Staccato Cafe", role: "Fusion Indian Music Band", image: "/speakers/Staccato Cafe.jpg" },
            { name: "Ruby Naaz", role: "Writer x Artist x Poet", image: "/speakers/Ruby Naaz.jpg" },
            { name: "Yogabandhu Prashanth", role: "Sound Healer x Yoga Guru", image: "/speakers/Yogabandhu Prashanth.jpg" },
            { name: "Devamshi", role: "Singer x Model", image: "/speakers/Devamshi.jpg" },
            { name: "Sakshi Baid", role: "Online Educator", image: "/speakers/Sakshi Baid.jpg" },
            { name: "Ganesh Kashyap", role: "Stand-up comedian", image: "/speakers/Ganesh Kashyap.jpg" },
            { name: "Akshay Singh", role: "Illusionist x Mentalist", image: "/speakers/Akshay Singh.jpg" },
        ],
        Zenith: [
            { name: "Saptarshi Prakash", role: "Design Leader", image: "/speakers/Saptarshi Prakash.jpg" },
            { name: "Team Tarang", role: "Performers", image: "/speakers/Team Tarang.jpg" },
            { name: "Devamshi Ravivansh", role: "Artist", image: "/speakers/Devamshi Ravivansh.jpg" },
            { name: "Insync Crew", role: "Dance Crew", image: "/speakers/Insync Crew.jpg" },
            { name: "Shankar Ram Chugani", role: "Entertainer", image: "/speakers/Shankar Ram Chugani.jpg" },
            { name: "Shraddha Mishra", role: "Speaker", image: "/speakers/Shraddha Mishra.jpg" },
            { name: "Rahul Rawat", role: "Speaker", image: "/speakers/Rahul Rawat.jpg" },
            { name: "Adarsha K", role: "Speaker", image: "/speakers/Adarsha K.jpg" },
            { name: "Subhash Choudhary", role: "Entrepreneur", image: "/speakers/Subhash Choudhary.jpg" },
        ],
        Elixir: [
            { name: "Sagar And Athreyas", role: "Singer x Songwriter", image: "/speakers/Sagar And Athreyas.jpg" },
            { name: "Thermal and a Quarter", role: "Rock Band", image: "/speakers/Thermal and a Quarter.jpg" },
            { name: "Karen", role: "Standup Comedian", image: "/speakers/Karen.jpg" },
            { name: "Reshi Magada", role: "Finance Content Creator", image: "/speakers/Reshi Magada.jpg" },
            { name: "Manya Hasija", role: "Living Organ Donor", image: "/speakers/Manya Hasija.jpg" },
            { name: "Hitesh Choudhary", role: "Youtuber x Educator", image: "/speakers/Hitesh Choudhary.jpg" },
            { name: "Surabhi Bharadwaj", role: "Playback Singer", image: "/speakers/Surabhi Bharadwaj.jpg" },
            { name: "Prakash Belawadi", role: "Actor x Activist", image: "/speakers/Prakash Belawadi.jpg" },
            { name: "Spoorthi Vishwas", role: "Founder KWAA Awards", image: "/speakers/Spoorthi Vishwas.jpg" },
        ],
        Thrive: [
            { name: "Divya Madhur", role: "Brand Strategist", image: "/speakers/Divya Madhur.jpg" },
            { name: "Bhavana BP", role: "Multipod Coach", image: "/speakers/Bhavana BP.jpg" },
            { name: "Pragathi Gowda", role: "Rallyist x Travel Enthusiast", image: "/speakers/Pragathi Gowda.jpg" },
            { name: "Sonali Swami", role: "Fitness Athlete", image: "/speakers/Sonali Swami.jpg" },
            { name: "Akkai Padmashali", role: "Social Activist", image: "/speakers/Akkai Padmashali.jpg" },
            { name: "Dr. Anupama K Malagi", role: "Professor x Career Guide", image: "/speakers/Dr. Anupama K Malagi.jpg" },
        ],
        Iridescence: [
            { name: "Irfan Sait", role: "Cricket Coach", image: "/speakers/Irfan Sait.jpg" },
            { name: "Nehal Kasliwal", role: "Blogger x Influencer", image: "/speakers/Nehal Kasliwal.jpg" },
            { name: "Aravindhan A.", role: "Engineer x Educationist", image: "/speakers/Aravindhan A.jpg" },
            { name: "Subramaniyan T.N.", role: "Entrepreneur", image: "/speakers/Subramaniyan T.N.jpg" },
            { name: "Wilfred Shreyas", role: "Motivational Speaker", image: "/speakers/Wilfred Shreyas.jpg" },
            { name: "Yogesh Ojha", role: "Cyber Security Expert", image: "/speakers/Yogesh Ojha.jpg" },
            { name: "Shashi", role: "Actor x Entrepreneur", image: "/speakers/Shashi.jpg" },
        ],
    };


// --- SUB-COMPONENT FOR SPEAKER CARD (Clean Image Loading) ---
const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="group relative w-full aspect-[3/4] bg-[#111] rounded-xl overflow-hidden border border-white/5 shadow-2xl transition-transform duration-300 hover:-translate-y-2">
            
            {/* Image Container with Fade-in Effect */}
            <div className="absolute inset-0">
                <Image 
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0
                        ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'} 
                    `}
                    onLoad={() => setIsLoaded(true)}
                    onError={(e: any) => { e.target.style.display = 'none'; }}
                />
                
                {/* Fallback Placeholder */}
                <div className={`absolute inset-0 bg-[#1a1a1a] -z-10 flex items-center justify-center transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="text-white/10 text-4xl font-black uppercase tracking-tighter">TEDx</span>
                </div>
            </div>

            {/* Cinematic Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                <div className="w-8 h-1 bg-[#EB0028] mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <h3 className="text-white text-xl md:text-2xl font-bold leading-tight uppercase tracking-tight mb-1">
                    {speaker.name}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider line-clamp-2">
                    {speaker.role}
                </p>
            </div>
        </div>
    );
};

// --- INNER COMPONENT USING USE_SEARCH_PARAMS ---
const SpeakersContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    // Initialize state based on URL param, default to "Epoch"
    const initialTab = searchParams.get('tab') || "Epoch";
    const [activeTab, setActiveTab] = useState(initialTab);

    // Update state if URL changes
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && eventsData[tab]) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
        // Update URL
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', tabName);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const currentSpeakers = eventsData[activeTab] || [];
    const eventTypes = Object.keys(eventsData);

    return (
        <>
            {/* CONTENT SECTION */}
            <div className="relative container mx-auto px-6 -mt-32 z-10 flex flex-col items-start pb-20">
                
                {/* Main Heading */}
                <div className="mb-8 max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-black text-[#B0B0B0] leading-[0.9] uppercase tracking-tighter">
                        <span className="text-[#EB0028]">OUR</span> SPEAKERS <br /> & PERFORMERS
                    </h1>
                </div>

                <div className="mb-12 w-full max-w-4xl">
                    <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                        At TEDxCITBengaluru, we curate a diverse lineup of speakers and performers who embody the spirit of innovation, creativity, and transformative thinking. Our event features thought leaders, visionaries, and artists from various fields, each bringing unique perspectives that challenge the status quo.
                    </p>
                </div>

                {/* Event Type Tabs */}
                <div className="flex flex-wrap gap-3 md:gap-4 mb-12 w-full">
                    {eventTypes.map((event) => (
                        <button
                            key={event}
                            onClick={() => handleTabChange(event)}
                            className={`px-6 py-2 md:px-8 md:py-3 text-xs md:text-sm font-bold rounded-full uppercase tracking-wider transition-all duration-300 border ${
                                activeTab === event
                                    ? "bg-[#EB0028] text-white border-[#EB0028] shadow-[0_0_20px_rgba(235,0,40,0.4)]"
                                    : "bg-transparent text-gray-500 border-white/10 hover:border-white/40 hover:text-white"
                            }`}
                        >
                            {event}
                        </button>
                    ))}
                </div>

                {/* Speaker Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    {currentSpeakers.map((speaker, idx) => (
                        <SpeakerCard key={`${activeTab}-${idx}`} speaker={speaker} />
                    ))}
                </div>

                <footer className="w-full text-center pt-20 pb-10 text-[12px] md:text-[14px] text-gray-600">
                    Copyright {new Date().getFullYear()} &copy; TEDxCITBengaluru. This independent TEDx event is operated under license from TED 
                </footer>
            </div>
        </>
    );
};

// --- MAIN PAGE COMPONENT (WRAPPED IN SUSPENSE) ---
const Page = () => {
    return (
        <section className="relative w-full bg-black min-h-screen">
            <Header />

            {/* IMAGE SECTION */}
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
                <Image
                    src="/images/bg-left-bird.svg"
                    alt="Background decoration"
                    width={1920}
                    height={1080}
                    priority
                    className="w-full h-full object-cover object-top opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
            </div>

            {/* WRAP CONTENT IN SUSPENSE FOR BUILD ERROR */}
            <Suspense fallback={
                <div className="relative container mx-auto px-6 -mt-32 z-10 min-h-[50vh] flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[#EB0028] border-t-transparent rounded-full animate-spin"></div>
                </div>
            }>
                <SpeakersContent />
            </Suspense>
        </section>
    )
}

export default Page