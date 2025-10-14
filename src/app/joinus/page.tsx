"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinUsPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        collegeEmail: "",
        personalEmail: "",
        usn: "",
        department: "",
        semester: "",
        phone: "",
        team: "",
    });

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Form constants
    const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const departments = [
        "CSE", "ISE", "ECE", "EEE", "MCA", "ME", "CE", "AIML", "DS", "BT", "MBA", "Other",
    ];
    const teams = [
        "Technical", "Event Management", "Sponsorship", "Curation", "Design", "Media",
    ];
    const teamSlugMap: Record<string, string> = {
        "Technical": "technical",
        "Event Management": "event-management",
        "Sponsorship": "sponsorship",
        "Curation": "curation",
        "Design": "design",
        "Media": "media",
    };

    function handleTeamSelectAndRedirect(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const chosen = event.target.value;
        const slug = teamSlugMap[chosen];

        // 1. Update the local form data state with the chosen team
        const updatedFormData = { ...formData, team: chosen };
        setFormData(updatedFormData);
        
        // 2. IMPORTANT: Save the basic details to sessionStorage for the next page to retrieve
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('basicRecruitmentData', JSON.stringify(updatedFormData));
        }
        
        // 3. Perform the redirection to the CORRECT dynamic route
        if (slug) {
            // FIX APPLIED HERE: The path must include the static 'team' folder segment.
            router.push(`/joinus/team/${slug}`); 
            // This will correctly route to paths like /joinus/team/curation
        }
    }

    return (
        <main className="relative bg-black text-white min-h-screen">
            <section className="section">
                <div className="container">
                    <div className="max-w-2xl mx-auto">
                        <header className="mb-8 md:mb-10 text-center">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                                Join <span className="text-[#E62B1E]">TEDxCITBengaluru</span>
                            </h1>
                            <p className="text-gray-400 mt-3 content-width mx-auto">
                                Fill in your basic details below and select a team to continue with the team-specific questions.
                            </p>
                        </header>

                        <form
                            id="recruitment-form"
                            className="p-2 sm:p-0"
                        >
                            <div className="grid grid-cols-1 gap-6 md:gap-7">
                                
                                {/* Full Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-300 mb-2" htmlFor="name">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3"
                                        placeholder="Your full name"
                                    />
                                </div>

                                {/* USN */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2" htmlFor="usn">
                                        USN
                                    </label>
                                    <input
                                        id="usn"
                                        name="usn"
                                        value={formData.usn}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3"
                                        placeholder="University Seat Number"
                                    />
                                </div>

                                {/* College Email */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2" htmlFor="collegeEmail">
                                        College Email
                                    </label>
                                    <input
                                        id="collegeEmail"
                                        name="collegeEmail"
                                        type="email"
                                        value={formData.collegeEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3"
                                        placeholder="you@cit.edu"
                                    />
                                </div>

                                {/* Personal Email */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2" htmlFor="personalEmail">
                                        Personal Email
                                    </label>
                                    <input
                                        id="personalEmail"
                                        name="personalEmail"
                                        type="email"
                                        value={formData.personalEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                {/* Department */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2" htmlFor="department">
                                        Department
                                    </label>
                                    <select
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3"
                                    >
                                        <option value="" disabled>
                                            Select department
                                        </option>
                                        {departments.map((d) => (
                                            <option key={d} value={d}>
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Semester */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2" htmlFor="semester">
                                        Semester
                                    </label>
                                    <select
                                        id="semester"
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3"
                                    >
                                        <option value="" disabled>
                                            Select semester
                                        </option>
                                        {semesters.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Phone */}
                                <div className="">
                                    <label className="block text-sm text-gray-300 mb-2" htmlFor="phone">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3"
                                        placeholder="Enter a reachable number"
                                    />
                                </div>

                                {/* Team dropdown - **This triggers the redirect** */}
                                <div className="">
                                    <label className="block text-sm text-gray-300 mb-2" htmlFor="team">
                                        Choose Your Team
                                    </label>
                                    <select
                                        id="team"
                                        name="team"
                                        value={formData.team}
                                        onChange={handleTeamSelectAndRedirect} 
                                        required
                                        className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3"
                                    >
                                        <option value="" disabled>
                                            Select a team
                                        </option>
                                        {teams.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <p className="text-sm text-gray-500">
                                    Selecting a team above will take you immediately to the team-specific application page.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}