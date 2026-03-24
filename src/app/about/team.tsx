"use client";
import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import ProfileCard from '@/components/ui/ProfileCard';

// --- TYPES ---
interface TeamMember {
    name: string;
    role: string;
}

interface TeamLead {
    id: number;
    name?: string;
    names?: string[];
    role: string;
    isDouble?: boolean;
    members?: TeamMember[];
}

interface Organizer {
    name: string;
    role: string;
}

interface EventData {
    organizers: Organizer[];
    teamLeads: TeamLead[];
    ecpTeam?: {
        name: string;
        imageSrc: string;
    };
}

interface TeamsData {
    [key: string]: EventData;
}

// --- STATIC DATA ---
const EVENT_TYPES = ["ARC", "Epoch", "Aether", "Zenith", "Elixir", "Thrive", "Iridescence"];

// Placeholder for missing images
const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231a1a1a'/%3E%3Cpath d='M50 30 C40 30 32 38 32 48 C32 58 40 66 50 66 C60 66 68 58 68 48 C68 38 60 30 50 30 Z M50 72 C35 72 22 80 22 90 L78 90 C78 80 65 72 50 72 Z' fill='%23333'/%3E%3C/svg%3E";

const TEAMS_DATA: TeamsData = {
    ARC: {
        organizers: [
            { name: "Aaron", role: "Organizer" },
            { name: "Faisal", role: "Co-Organizer" },
            { name: "Anushka", role: "Lead Coordinator" },
        ],
        teamLeads: [
            { id: 1, name: "Dilip", role: "Technical Lead", members: [
                { name: "Anik", role: "Core Team" },
                { name: "Vivek", role: "Core Team" },
                { name: "Krithik", role: "Core Team" },
                { name: "Puja", role: "Core Team" },
            ] },
            { id: 2, name: "Anarghya G", role: "Lead Curator", members: [
                { name: "Nithai", role: "Core Team" },
                { name: "Shivani Karedla", role: "Core Team" },
                { name: "Nikhil Kumar", role: "Core Team" },
                { name: "Himashree", role: "Core Team" },
                { name: "Anshika Singh", role: "Core Team" },
                { name: "Huda Seher", role: "Core Team" },
                { name: "SUDARSHAN HOSAMANI", role: "Core Team" },
            ] },
            { id: 3, name: "Shreya", role: "Event Director", members: [
                { name: "AKSHAT CHAUHAN", role: "Core Team" },
                { name: "Ankur", role: "Core Team" },
                { name: "UTKARSH TIWARI", role: "Core Team" },
                { name: "CATHERINE", role: "Core Team" },
                { name: "VISHAL", role: "Core Team" },
                { name: "INCHARA S NAIK", role: "Core Team" },
                { name: "VICTOR", role: "Core Team" },
                { name: "WAFIZA SYED", role: "Core Team" },
                { name: "TEJAS", role: "Core Team" },
                { name: "ADITYA", role: "Core Team" },
                { name: "RAKSHITHA", role: "Core Team" },
            ] },
            { id: 4, name: "Debasis Maharana", role: "Media Lead", members: [
                { name: "SHARAN TEJ", role: "Core Team" },
                { name: "KALYAN V", role: "Core Team" },
                { name: "Chethana", role: "Core Team" },
                { name: "DISHA V", role: "Core Team" },
                { name: "SUNNY HEBRON", role: "Core Team" },
            ] },
            { id: 7, name: "Shivash R", role: "Design Lead", members: [
                { name: "Daksha K", role: "Core Team" },
                { name: "Suryansh", role: "Core Team" },
                { name: "Veeresh", role: "Core Team" },
                { name: "Pramugdha", role: "Core Team" },
                { name: "MV Maahi Manvita", role: "Core Team" },
                { name: "LINA JOHN KENNEDY", role: "Core Team" },
            ] },
            { id: 5, name: "Syed Owais", role: "Sponsorship Lead", members: [
                { name: "KUNAL SENDWAL", role: "Core Team" },
                { name: "Kishan", role: "Core Team" },
                { name: "KULADEEP M N", role: "Core Team" },
                { name: "M MEGHANAA MYLAR", role: "Core Team" },
            ] },
        ],
        ecpTeam: { name: "ARC ECP Team", imageSrc: "/team/Arc/ECP.jpeg" }
    },
    Epoch: {
        organizers: [
            { name: "Bharath SBK", role: "Organizer" },
            { name: "Prajna", role: "Co-Organizer" },
            { name: "Aaron Rohan", role: "Lead Coordinator" },
        ],
        teamLeads: [
            { 
                id: 1,
                name: "Debasis Maharana", 
                role: "Lead Creator",
                members: [
                    { name: "Nandheeswaran.M", role: "Core Team" },
                    { name: "Monish B", role: "Core Team" },
                    { name: "Rohan", role: "Core Team" },
                    { name: "Pulak Mishra", role: "Core Team" },
                    { name: "Sahithi K", role: "Core Team" },
                    { name: "Veeresh R Dodamani", role: "Core Team" },
                    { name: "Sharan tej", role: "Volunteer" },
                ]
            },
            { 
                id: 2,
                name: "Roshani Bankar", 
                role: "Lead Curator",
                members: [
                    { name: "Anarghya Gunashekaran", role: "Core Team" },
                    { name: "Vidhula Shree Shankar", role: "Core Team" },
                    { name: "Lagineni Sreenithai", role: "Core Team" },
                    { name: "Palleboyina Deekshitha", role: "Core Team" },
                    { name: "Himashree Kolisetty", role: "Volunteer" },
                    { name: "Sudarshan S Hosamani", role: "Volunteer" },
                ]
            },
            { 
                id: 3,
                names: ["Akshat Chauhan", "Roseantic Gudino"], 
                role: "Event Director",
                isDouble: true,
                members: [
                    { name: "Kshitij Tiwari", role: "Core Team" },
                    { name: "Samhitha N A", role: "Core Team" },
                    { name: "Vishnupriya S", role: "Core Team" },
                    { name: "Anushka Tiwari", role: "Core Team" },
                    { name: "Faisal Imam", role: "Core Team" },
                    { name: "Navyashree R", role: "Core Team" },
                    { name: "Aditya Raut", role: "Volunteer" },
                    { name: "Rakshitha", role: "Volunteer" },
                    { name: "Shreya Upadhyay", role: "Volunteer" },
                    { name: "Ankur Bhattacharyya", role: "Volunteer" },
                    { name: "Neil Anthony", role: "Volunteer" },
                    { name: "Wafiza Syed", role: "Volunteer" },
                ]
            },
            { 
                id: 5,
                name: "Anirudh Kottakota", 
                role: "Sponshorship Lead",
                members: [
                    { name: "Anjali", role: "Core Team" },
                    { name: "Syed Owais", role: "Core Team" },
                    { name: "Kuladeep M N", role: "Volunteer" },
                    { name: "Arjun Dev", role: "Volunteer" },
                    { name: "Purvi P", role: "Volunteer" },
                ]
            },
            { 
                id: 6,
                name: "Naresh Karthigeyan", 
                role: "Technical Lead",
                members: [
                    { name: "D Manoj", role: "Core Team" },
                    { name: "Guru Swarupa", role: "Core Team" },
                    { name: "Shreya V", role: "Core Team" },
                    { name: "M Krithik", role: "Volunteer" },
                    { name: "Anik Tiwary", role: "Volunteer" },
                    { name: "Daksha K Gowda", role: "Volunteer" },
                    { name: "P L Vijaya Vittahal", role: "Volunteer" },
                ]
            },
        ],
        ecpTeam: { name: "Epoch ECP Team", imageSrc: "/team/Epoch/Epoch ECP.jpg" }
    },
    Aether: {
        organizers: [
            { name: "Bharatesh Patel", role: "Organizer" },
            { name: "Srinidhi GG", role: "Co-Organizer" },
            { name: "Snehith Reddy", role: "Lead Coordinator" }, 
        ],
        teamLeads: [
            { id: 1, name: "Mukul Singh", role: "Lead Creator" },
            { id: 2, name: "Aaron Rohan", role: "Lead Curator" },
            { id: 3, names: ["Prajna", "Bharath SBK"], role: "Event Director", isDouble: true },
            { id: 5, name: "Vishnu Singh", role: "Media Lead" },
            { id: 6, name: "Neeraj", role: "Sponsorship Lead" },
        ],
        ecpTeam: { name: "Aether ECP Team", imageSrc: "/team/Aether/Aether ECP.jpg" }
    },
    Zenith: {
        organizers: [
            { name: "Imtiyaz Ahmed", role: "Organizer" },
            { name: "Hannah Thomas", role: "Co-Organizer" },
            { name: "Bharatesh Patel", role: "Lead Coordinator" },
        ],
        teamLeads: [
            { id: 1, name: "Mukul Singh", role: "Creative Lead", members: [] },
            { id: 2, name: "Kiran S", role: "Sponsorship Lead", members: [] },
            { id: 3, names: ["Prajna", "Bhuvan L P"], role: "Event Director", isDouble: true, members: [] },
            { id: 5, name: "Akanksha", role: "Lead Curator", members: [] },
        ],
        ecpTeam: { name: "Zenith ECP Team", imageSrc: "/team/Zenith/Zenith ECP.jpg" }
    },
    Elixir: {
        organizers: [
            { name: "Poojitha Prakash", role: "Organizer" },
            { name: "Karan Desai", role: "Co-Organizer" },
            { name: "Uday Shankar", role: "Lead Coordinator" },
        ],
        teamLeads: [
            { id: 1, name: "Sai Sanjana", role: "Lead Curator", members: [] },
            { id: 2, name: "Pranav Durai", role: "Lead Design", members: [] },
            { id: 3, name: "Himanshu Agarwal", role: "Technical Lead", members: [] },
            { id: 4, name: "Bharatesh Patel", role: "Sponsorship Lead", members: [] },
            { id: 5, names: ["Ashvin", "Parijatha G S"], role: "Event Director", isDouble: true, members: [] },
        ],
        ecpTeam: { name: "Elixir ECP Team", imageSrc: "/team/Elixir/Elixir ECP.jpeg" }
    },
    Thrive: {
        organizers: [
            { name: "Kevin Alberts Daniel", role: "Organizer" },
            { name: "Sanjeevini Surendran", role: "Co-Organizer" },
        ],
        teamLeads: [
            { id: 1, name: "Ananya Agnihotri", role: "Lead Curator", members: [] },
            { id: 2, name: "Uday Shankar", role: "Lead Designer", members: [] },
            { id: 3, name: "Ishan Dubey", role: "Technical Lead", members: [] },
            { id: 4, name: "Vanishree Kulkarni", role: "Social Media Manager", members: [] },
            { id: 5, name: "Bharatesh Patel", role: "Sponsorship Head", members: [] },
            { id: 6, names: ["Lennard Mario", "Parijatha G S"], role: "Event Director", isDouble: true, members: [] },
        ],
        ecpTeam: { name: "Thrive ECP Team", imageSrc: "/team/Thrive/Thrive ECP.jpg" }
    },
    Iridescence: {
        organizers: [
            { name: "Kevin Alberts Daniel", role: "Organizer" },
            { name: "Sanjeevini Surendran", role: "Co-Organizer" },
        ],
        teamLeads: [
            { id: 1, name: "Karan Desai", role: "Lead Curator", members: [] },
            { id: 2, name: "Uday Shankar", role: "Lead Creator", members: [] },
            { id: 3, name: "Ishan Dubey", role: "Technical Lead", members: [] },
            { id: 4, name: "Nikita Saha", role: "Social Media Manager", members: [] },
            { id: 5, name: "Aditya M", role: "Sponsorship Lead", members: [] },
            { id: 6, names: ["S G Yashoda", "Poojitha Prakash"], role: "Event Director", isDouble: true, members: [] },
        ]
        // Note: No ECP team for Iridescence
    },
};

export default function Team() {
    const [selectedEvent, setSelectedEvent] = useState<string>("ARC"); 
    const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

    // Get current event's data
    const currentOrganizers = useMemo(() => TEAMS_DATA[selectedEvent]?.organizers || [], [selectedEvent]);
    const currentTeamLeads = useMemo(() => TEAMS_DATA[selectedEvent]?.teamLeads || [], [selectedEvent]);
    const currentEcpTeam = useMemo(() => TEAMS_DATA[selectedEvent]?.ecpTeam || null, [selectedEvent]);

    const shouldShowViewTeam = useMemo(() => {
        return selectedEvent === "Epoch" || selectedEvent === "ARC";
    }, [selectedEvent]);

    const handleTeamLeadClick = useCallback((teamId: number) => {
        const lead = currentTeamLeads.find((l: TeamLead) => l.id === teamId);
        if (lead?.members && lead.members.length > 0) {
            setExpandedTeam(prev => {
                const newValue = prev === teamId ? null : teamId;
                if (newValue !== null) {
                    setTimeout(() => {
                        document.getElementById('team-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
                return newValue;
            });
        }
    }, [currentTeamLeads]);

    const handleEventChange = useCallback((event: string) => {
        setSelectedEvent(event);
        setExpandedTeam(null);
    }, []);

    const isPerformanceMode = selectedEvent === "ARC";

    return (
        <section className="relative w-full bg-black text-white">
            <div className="relative container mx-auto px-6 py-10 flex flex-col items-start -mt-32 z-10">
                
                {/* Main Heading */}
                <div className="mb-4 max-w-2xl">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#B0B0B0] leading-tight uppercase tracking-tighter">
                        <span className="text-[#EB0028]">OUR</span> TEAM
                    </h1>
                </div>

                <div className="mb-12 w-full max-w-4xl">
                    <p className="text-[#B0B0B0] text-md md:text-lg leading-relaxed py-4">
                        At TEDxCITBengaluru, our team is a passionate collective of thinkers, creators, and organizers dedicated to bringing ideas worth spreading to life. Working behind the scenes, we collaborate across disciplines to curate meaningful experiences, foster innovation, and build a platform that inspires dialogue, connection, and positive change.
                    </p>
                </div>

                {/* Event Type Tabs */}
                <div className="flex flex-wrap gap-4 mb-12 mt-4 w-full justify-center md:justify-start">
                    {EVENT_TYPES.map((event) => (
                        <button
                            key={event}
                            onClick={() => handleEventChange(event)}
                            className={`min-h-[44px] px-8 py-3 text-sm font-semibold rounded-full transition-all duration-300 flex items-center justify-center ${
                                selectedEvent === event
                                    ?  "bg-[#EB0028] text-white shadow-[0_0_20px_rgba(235,0,40,0.4)] scale-105"
                                    :  "text-gray-400 border border-gray-700 hover:text-white hover:border-[#EB0028] hover:bg-[#EB0028]/10"
                            }`}
                        >
                            {event}
                        </button>
                    ))}
                </div>

                {/* Event-specific content */}
                <div key={selectedEvent} className="w-full animate-fadeIn">
                    
                    {/* ORGANIZERS */}
                    <div className="w-full mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#EB0028] mb-8 uppercase tracking-wider flex items-center gap-3">
                            <span className="w-2 h-8 bg-[#EB0028] rounded-full"></span>
                            Organizers
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                            {currentOrganizers.map((organizer, idx) => (
                                <div 
                                    key={`${selectedEvent}-org-${idx}`} 
                                    style={{ animation: `slideUp 0.4s ease-out ${idx * 0.1}s both` }}
                                >
                                    <ProfileCard
                                        name={organizer.name}
                                        title={organizer.role}
                                        handle={selectedEvent}
                                        status="Organizer"
                                        avatarUrl={organizer.name === "Coming Soon" ? PLACEHOLDER_IMG : `/team/${selectedEvent}/${organizer.name}.jpg`}
                                        enableTilt={!isPerformanceMode}
                                        enableMobileTilt={!isPerformanceMode}
                                        behindGlowEnabled={!isPerformanceMode}
                                        innerGradient="linear-gradient(145deg, #2a0a0f 0%, #000000 100%)"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TEAM LEADS */}
                    <div className="w-full mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#EB0028] mb-8 uppercase tracking-wider flex items-center gap-3">
                            <span className="w-2 h-8 bg-[#EB0028] rounded-full"></span>
                            Team Leads
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                            {currentTeamLeads.map((lead, idx) => {
                                if (lead.isDouble && lead.names) {
                                    return (
                                        <React.Fragment key={`${selectedEvent}-lead-${lead.id}`}>
                                            <div style={{ animation: `slideUp 0.4s ease-out ${idx * 0.1}s both` }}>
                                                <ProfileCard
                                                    name={lead.names[0]}
                                                    title={lead.role}
                                                    handle={selectedEvent}
                                                    status="Team Lead"
                                                    avatarUrl={`/team/${selectedEvent}/${lead.names[0]}.jpg`}
                                                    contactText={shouldShowViewTeam ? "View Team" : undefined}
                                                    onContactClick={shouldShowViewTeam ? () => handleTeamLeadClick(lead.id) : undefined}
                                                    enableTilt={!isPerformanceMode}
                                                    enableMobileTilt={!isPerformanceMode}
                                                />
                                            </div>
                                            <div style={{ animation: `slideUp 0.4s ease-out ${idx * 0.1 + 0.1}s both` }}>
                                                <ProfileCard
                                                    name={lead.names[1]}
                                                    title={lead.role}
                                                    handle={selectedEvent}
                                                    status="Team Lead"
                                                    avatarUrl={`/team/${selectedEvent}/${lead.names[1]}.jpg`}
                                                    contactText={shouldShowViewTeam ? "View Team" : undefined}
                                                    onContactClick={shouldShowViewTeam ? () => handleTeamLeadClick(lead.id) : undefined}
                                                    enableTilt={!isPerformanceMode}
                                                    enableMobileTilt={!isPerformanceMode}
                                                />
                                            </div>
                                        </React.Fragment>
                                    );
                                }
                                return (
                                    <div 
                                        key={`${selectedEvent}-lead-${lead.id}`} 
                                        style={{ animation: `slideUp 0.4s ease-out ${idx * 0.1}s both` }}
                                    >
                                        <ProfileCard
                                            name={lead.name || "Unknown"}
                                            title={lead.role}
                                            handle={selectedEvent}
                                            status="Team Lead"
                                            avatarUrl={lead.name === "Coming Soon" ? PLACEHOLDER_IMG : `/team/${selectedEvent}/${lead.name}.jpg`}
                                            contactText={shouldShowViewTeam ? "View Team" : undefined}
                                            onContactClick={shouldShowViewTeam ? () => handleTeamLeadClick(lead.id) : undefined}
                                            enableTilt={!isPerformanceMode}
                                            enableMobileTilt={!isPerformanceMode}
                                            behindGlowEnabled={!isPerformanceMode}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* EXPANDED TEAM MEMBERS GRID */}
                    {expandedTeam !== null && (
                        <div className="w-full my-10 animate-fadeIn scroll-mt-20" id="team-grid">
                            <div className="flex items-center justify-between mb-8 bg-[#111] p-6 rounded-2xl border border-white/5">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">
                                        {currentTeamLeads.find((lead: TeamLead) => lead.id === expandedTeam)?.role}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">Core Team & Volunteers</p>
                                </div>
                                <button 
                                    onClick={() => setExpandedTeam(null)}
                                    className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-[#EB0028] transition-all duration-300 text-sm font-semibold flex items-center gap-2"
                                >
                                    <span>Close</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full">
                                {currentTeamLeads.find((lead: TeamLead) => lead.id === expandedTeam)?.members?.map((member, idx) => (
                                    <div key={`${expandedTeam}-mem-${idx}`} style={{ animation: `slideUp 0.4s ease-out ${idx * 0.05}s both` }}>
                                        <ProfileCard
                                            name={member.name}
                                            title={member.role}
                                            handle={selectedEvent}
                                            status="Member"
                                            avatarUrl={`/team/${selectedEvent}/${member.name}.jpg`}
                                            enableTilt={false} 
                                            enableMobileTilt={false}
                                            behindGlowEnabled={false}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

{/* ECP TEAM IMAGE SECTION */}
{currentEcpTeam && (
                        <div className="w-full mt-24 mb-16 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#EB0028] mb-8 uppercase tracking-wider flex items-center gap-3">
                                <span className="w-2 h-8 bg-[#EB0028] rounded-full"></span>
                                ECP Team
                            </h2>
                            {/* Removed the forced ultra-wide aspect ratio and heavy padding. Now it tightly wraps the image. */}
                            <div className="relative w-full max-w-2xl mx-auto rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group bg-[#0a0a0a]">
                                <Image
                                    src={currentEcpTeam.imageSrc}
                                    alt={currentEcpTeam.name}
                                    width={1600}
                                    height={900}
                                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Soft glow effect behind the image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 pointer-events-none"></div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform:  translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </section>
    )
}