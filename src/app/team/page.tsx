"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/header'

// Define proper types
interface TeamMember {
    name: string;
    role: string;
}

interface TeamLead {
    id: number;
    name?:  string;
    names?: string[];
    role: string;
    isDouble?: boolean;
    members?:  TeamMember[];
}

interface Organizer {
    name: string;
    role: string;
}

interface EventData {
    organizers: Organizer[];
    teamLeads: TeamLead[];
}

interface TeamsData {
    [key:  string]: EventData;
}

const Page = () => {
    // State to track selected event and expanded team
    const [selectedEvent, setSelectedEvent] = useState<string>("EPOCH");
    const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

    // Event types array
    const eventTypes:  string[] = ["Epoch", "Aether", "Zenith", "Elixir", "Thrive", "Iridescence"];

    // Teams data organized by event
    const teamsData: TeamsData = {
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
                        { name:  "Nandheeswaran.M", role: "Core Team" },
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
                        { name:  "Himashree Kolisetty", role: "Volunteer" },
                        { name: "Sudarshan S Hosamani", role: "Volunteer" },
                    ]
                },
                { 
                    id: 3,
                    names: ["Akshat Chauhan", "Roseantic Gudino"], 
                    role: "Event Director",
                    isDouble: true,
                    members: [
                        { name:  "Kshitij Tiwari", role: "Core Team" },
                        { name:  "Samhitha N A", role: "Core Team" },
                        { name: "Vishnupriya S", role: "Core Team" },
                        { name: "Anushka Tiwari", role: "Core Team" },
                        { name:  "Faisal Imam", role: "Core Team" },
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
                    role:  "Technical Lead",
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
            ]
        },
        Aether: {
            organizers: [
                { name: "Bharatesh Patel", role: "Organizer" },
                { name: "Srinidhi GG", role: "Co-Organizer" },
                { name: "Snehith Reddy", role: "Lead Co-ordinator" }, 
            ],
            teamLeads: [
                { 
                    id: 1,
                    name: "Mukul Singh", 
                    role: "Lead Creator",
                },
                { 
                    id: 2,
                    name: "Aaron Rohan", 
                    role: "Lead Curator",
                },
                { 
                    id: 3,
                    names: ["Prajna", "Bharath SBK"],
                    role: "Event Director",
                    isDouble:  true,
                },
                { 
                    id: 5,
                    name: "Vishnu Singh", 
                    role: "Media Lead",
                },
                { 
                    id: 6,
                    name: "Neeraj", 
                    role: "Sponsorship Head",
                },
            ]
        },
        Zenith: {
            organizers:  [
                { name: "Imtiyaz Ahmed", role: "Organizer" },
                { name: "Hannah Thomas", role: "Co-Organizer" },
                { name:  "Bharatesh Patel", role: "Lead Co-ordinator" },
            ],
            teamLeads: [
                { id: 1, name: "Mukul Singh", role: "Creative Lead", members: [] },
                { id: 2, name: "Kiran S", role: "Sponsorship Head", members: [] },
                { 
                    id: 3,
                    names: ["Prajna", "Bhuvan L P"],
                    role: "Event Director",
                    isDouble:  true,
                    members: []
                },
                { id: 5, name: "Akanksha", role: "Lead Curator", members: [] },
                { id: 6, name: "Zenith ECP", role: "ECP Team", members: [] },
            ]
        },
        Elixir: {
            organizers:  [
                { name: "Poojitha Prakash", role: "Organizer" },
                { name: "Karan Desai", role: "Co-Organizer" },
                { name: "Uday Shankar", role: "Student Coordinator" },
            ],
            teamLeads: [
                { id: 1, name: "Sai Sanjana", role: "Lead Curator", members: [] },
                { id: 2, name: "Pranav Durai", role: "Lead Design", members: [] },
                { id: 3, name: "Himanshu Agarwal", role: "Technical Lead", members: [] },
                { id: 4, name: "Bharatesh Patel", role: "Sponsorship Head", members: [] },
                { 
                    id: 5,
                    names: ["Ashvin", "Parijatha G S"],
                    role: "Event Director",
                    isDouble:  true,
                    members: []
                },
                { id:  7, name: "Elixer ECP", role: "ECP Team", members: [] },
            ]
        },
        Thrive: {
            organizers:  [
                { name: "Kevin Alberts Daniel", role: "Organizer" },
                { name: "Sanjeevini Surendran", role: "Co-Organizer" },
            ],
            teamLeads: [
                { id: 1, name: "Ananya Agnihotri", role: "Lead Curator", members: [] },
                { id: 2, name:  "Uday Shankar", role: "Lead Designer", members: [] },
                { id: 3, name: "Ishan Dubey", role: "Technical Lead", members: [] },
                { id: 4, name: "Vanishree Kulkarni", role: "Social Media Manager", members: [] },
                { id: 5, name: "Bharatesh Patel", role:  "Sponsorship Head", members:  [] },
                { 
                    id: 6,
                    names: ["Lennard Mario", "Parijatha G S"],
                    role: "Event Director",
                    isDouble: true,
                    members: []
                },
                { id: 8, name: "Thrive ECP", role: "ECP Team", members: [] },
            ]
        },
        Iridescence: {
            organizers:  [
                { name: "Kevin Alberts Daniel", role: "Organizer" },
                { name: "Sanjeevini Surendran", role: "Co-Organizer" },
            ],
            teamLeads:  [
                { id: 1, name: "Karan Desai", role: "Lead Curator", members: [] },
                { id: 2, name: "Uday Shankar", role: "Lead Creator", members: [] },
                { id: 3, name: "Ishan Dubey", role: "Technical Lead", members: [] },
                { id: 4, name: "Nikita Saha", role: "Social Media Manager", members: [] },
                { id: 5, name: "Aditya M", role: "Sponsorship head", members: [] },
                { 
                    id: 6,
                    names: ["S G Yashoda", "Poojitha Prakash"],
                    role: "Event Director",
                    isDouble: true,
                    members: []
                },
            ]
        },
    };

    // Get current event's data
    const currentOrganizers = teamsData[selectedEvent]?.organizers || [];
    const currentTeamLeads = teamsData[selectedEvent]?.teamLeads || [];

    const handleTeamLeadClick = (teamId: number) => {
        const lead = currentTeamLeads.find((l:  TeamLead) => l.id === teamId);
        if (lead?. members && lead.members.length > 0) {
            if (expandedTeam === teamId) {
                setExpandedTeam(null);
            } else {
                setExpandedTeam(teamId);
            }
        }
    };

    const handleEventChange = (event: string) => {
        setSelectedEvent(event);
        setExpandedTeam(null); // Reset expanded team when switching events
    };

    return (
        <section className="relative w-full bg-black">
            <Header />

            {/* IMAGE SECTION */}
            <div className="relative w-full h-auto sm:min-h-screen overflow-hidden">
                <Image
                    src="/images/bg-left-bird.svg"
                    alt="Mountain background"
                    width={1920}
                    height={3000}
                    priority
                    className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
            </div>

            {/* CONTENT SECTION */}
            <div className="relative container mx-auto px-6 py-10 flex flex-col items-start">
                
                {/* Main Heading */}
                <div className="mb-4 max-w-2xl">
                    <h1 className="text-6xl md:text-6xl font-black text-[#B0B0B0] leading-tight uppercase tracking-tighter">
                        <span className="text-[#EB0028]">OUR</span> TEAM
                    </h1>
                </div>

                <div className="mb-12 w-full">
                    <p className="text-[#B0B0B0] text-md md:text-base leading-relaxed py-4">
                        At TEDxCITBengaluru, our team is a passionate collective of thinkers, creators, and organizers dedicated to bringing ideas worth spreading to life. Working behind the scenes, we collaborate across disciplines to curate meaningful experiences, foster innovation, and build a platform that inspires dialogue, connection, and positive change.
                    </p>
                </div>

                {/* Event Type Tabs */}
                <div className="flex flex-wrap gap-5 mb-8 mt-4 w-full">
                    {eventTypes.map((event) => (
                        <button
                            key={event}
                            onClick={() => handleEventChange(event)}
                            className={`min-h-[44px] w-auto px-10 py-3 text-sm font-semibold rounded-full
                                transition-all duration-300 flex items-center justify-center ${
                                selectedEvent === event
                                    ?  "bg-[#EB0028] text-white shadow-lg shadow-[#EB0028]/30 scale-105"
                                    :  "text-gray-400 border border-gray-700 hover:text-white hover:border-[#EB0028]"
                            }`}
                        >
                            {event}
                        </button>
                    ))}
                </div>

                {/* Event-specific content */}
                <div key={selectedEvent} className="w-full animate-fadeIn">
                    {/* ORGANIZERS */}
                    <div className="w-full my-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#EB0028] mb-6 uppercase tracking-wider">
                            Organizers - {selectedEvent}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                            {currentOrganizers.map((organizer, idx) => (
                                <div
                                    key={idx}
                                    className="relative bg-[#2A2A2A] rounded-2xl aspect-square overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group"
                                    style={{
                                        animation: `slideUp 0.4s ease-out ${idx * 0.1}s both`
                                    }}
                                >
                                    {/* Full Image Background */}
                                    <Image
                                        src={`/team/${selectedEvent}/${organizer.name}.jpg`}
                                        alt={organizer.name}
                                        fill
                                        className="object-cover group-hover: scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            target. style. display = 'none';
                                        }}
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                    
                                    {/* Text Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                        <span className="text-white text-base font-semibold block">{organizer.name}</span>
                                        <span className="text-gray-300 text-sm block mt-1">{organizer.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TEAM LEADS */}
                    <div className="w-full my-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#EB0028] mb-6 uppercase tracking-wider">
                            Team Leads - {selectedEvent}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                            {currentTeamLeads.map((lead, idx) => (
                                <div
                                    key={lead.id}
                                    onClick={() => handleTeamLeadClick(lead.id)}
                                    className={`relative bg-[#2A2A2A] rounded-2xl aspect-square overflow-hidden transition-all duration-300 group
                                        ${lead.isDouble ? 'md:col-span-1 lg:col-span-1' : ''}
                                        ${lead.members && lead.members.length > 0 ? 'cursor-pointer' : 'cursor-default'}
                                        ${expandedTeam === lead.id 
                                            ? 'ring-4 ring-[#EB0028] scale-105' 
                                            : 'hover:scale-105'
                                        }`}
                                    style={{
                                        animation: `slideUp 0.4s ease-out ${idx * 0.1}s both`
                                    }}
                                >
                                    {/* Expand Indicator */}
                                    {expandedTeam === lead.id && lead.members && lead.members.length > 0 && (
                                        <div className="absolute top-4 right-4 z-20 animate-bounce">
                                            <div className="w-8 h-8 bg-[#EB0028] rounded-full grid place-items-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Display single or double photos */}
                                    {lead.isDouble && lead.names ?  (
                                        <div className="relative w-full h-full grid grid-cols-2">
                                            {/* Left Half */}
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={`/team/${selectedEvent}/${lead.names[0]}.jpg`}
                                                    alt={lead.names[0]}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        const target = e.currentTarget;
                                                        target.style. display = 'none';
                                                    }}
                                                />
                                                {/* Gradient for left side */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                            </div>
                                            
                                            {/* Right Half */}
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={`/team/${selectedEvent}/${lead. names[1]}.jpg`}
                                                    alt={lead.names[1]}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        const target = e.currentTarget;
                                                        target.style.display = 'none';
                                                    }}
                                                />
                                                {/* Gradient for right side */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                            </div>
                                            
                                            {/* Text Content - Centered across both */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-center col-span-2">
                                                <span className="text-white text-sm font-semibold block">{lead.names[0]} & {lead.names[1]}</span>
                                                <span className="text-gray-300 text-sm block mt-1">{lead. role}</span>
                                                {lead.members && lead.members.length > 0 && (
                                                    <span className="text-gray-400 text-xs block mt-1">
                                                        {expandedTeam === lead.id ?  'Click to collapse' : 'Click to view team'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Single Image */}
                                            <Image
                                                src={`/team/${selectedEvent}/${lead. name}.jpg`}
                                                alt={lead.name || 'Team Lead'}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                onError={(e) => {
                                                    const target = e.currentTarget;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                            
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                            
                                            {/* Text Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                                <span className="text-white text-base font-semibold block">{lead.name}</span>
                                                <span className="text-gray-300 text-sm block mt-1">{lead.role}</span>
                                                {lead.members && lead.members.length > 0 && (
                                                    <span className="text-gray-400 text-xs block mt-1">
                                                        {expandedTeam === lead.id ? 'Click to collapse' : 'Click to view team'}
                                                    </span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TEAM MEMBERS */}
                    {expandedTeam !== null && (
                        <div className="w-full my-10 animate-fadeIn">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
                                    {currentTeamLeads.find((lead:  TeamLead) => lead.id === expandedTeam)?.role} Team - {selectedEvent}
                                </h2>
                                <button 
                                    onClick={() => setExpandedTeam(null)}
                                    className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-[#EB0028] transition-all duration-300 text-sm font-semibold"
                                >
                                    Close
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                                {currentTeamLeads.find((lead: TeamLead) => lead.id === expandedTeam)?.members?.map((member, idx) => (
                                    <div
                                        key={idx}
                                        className="relative bg-[#1A1A1A] rounded-2xl aspect-square overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-800 hover:border-[#EB0028] group"
                                        style={{
                                            animation: `slideUp 0.4s ease-out ${idx * 0.05}s both`
                                        }}
                                    >
                                        {/* Full Image */}
                                        <Image
                                            src={`/team/${selectedEvent}/${member.name}.jpg`}
                                            alt={member.name}
                                            fill
                                            className="object-cover group-hover: scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                target. style.display = 'none';
                                            }}
                                        />
                                        
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                        
                                        {/* Text Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                            <span className="text-gray-200 text-sm font-semibold block">{member.name}</span>
                                            <span className="text-gray-400 text-xs block mt-1">{member.role}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <footer className="w-full text-center pt-4 text-[14px] text-gray-600 mt-10">
                    Copyright 2023 &copy; TEDxCITBengaluru. This independent TEDx event is operated under license from TED 
                </footer>
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform:  translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                . animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </section>
    )
}

export default Page