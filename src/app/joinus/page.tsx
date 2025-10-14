"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinUsPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        collegeEmail: "",
        personalEmail: "",
        usn: "",
        department: "",
        semester: "",
        phone: "",
        team: "",
        otherClubs: "",
    });

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    }

    const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const departments = [
        "CSE", "CSE-IOT", "CSE-DS", "ISE", "ECE", "AIML",
        "EEE", "MECH", "CIVIL", "BBA", "BCA", "BCOM", "Other"
    ];
    const teams = [
        "Technical", "Event Management", "Sponsorship",
        "Curation", "Design", "Media",
    ];
    const teamSlugMap: Record<string, string> = {
        "Technical": "technical",
        "Event Management": "event-management",
        "Sponsorship": "sponsorship",
        "Curation": "curation",
        "Design": "design",
        "Media": "media",
    };

    async function handleTeamSelectAndRedirect(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const chosen = event.target.value;
        const slug = teamSlugMap[chosen];
        const updatedFormData = { ...formData, team: chosen };
        setFormData(updatedFormData);

        if (
            !updatedFormData.name ||
            !updatedFormData.collegeEmail ||
            !updatedFormData.personalEmail ||
            !updatedFormData.usn ||
            !updatedFormData.department ||
            !updatedFormData.semester ||
            !updatedFormData.phone
        ) {
            setError("Please fill in all required fields before selecting a team.");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            if (typeof window !== "undefined") {
                sessionStorage.setItem(
                    "basicRecruitmentData",
                    JSON.stringify(updatedFormData)
                );
            }

            if (slug) router.push(`/joinus/team/${slug}`);
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="bg-black text-white min-h-screen flex flex-col">
            {/* Top Accent Line */}
            <div className="w-full h-1 bg-red-600" />

            <section className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20 sm:py-28 md:py-32">
                <div className="w-full max-w-2xl">
                    
                    {/* Header */}
                    <header className="text-center mb-16 sm:mb-20">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
                            Join <span className="text-red-600">TEDxCITBengaluru</span>
                        </h1>
                        <p className="text-base sm:text-lg text-white/90">
                            Fill in your details below and select your preferred team.
                        </p>
                    </header>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-10 p-5 bg-black border border-red-600 rounded-lg text-red-500 text-sm sm:text-base">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        id="recruitment-form"
                        className="space-y-10 sm:space-y-12 md:space-y-14"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {/* Input Fields */}
                        {[
                            { name: "name", placeholder: "Full Name" },
                            { name: "usn", placeholder: "USN" },
                            { name: "collegeEmail", placeholder: "College Email", type: "email" },
                            { name: "personalEmail", placeholder: "Personal Email", type: "email" },
                            { name: "phone", placeholder: "Phone Number", type: "tel" },
                        ].map((input) => (
                            <div key={input.name}>
                                <input
                                    {...input}
                                    value={(formData as any)[input.name]}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full bg-black text-white border-b border-white focus:border-red-600 outline-none py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg placeholder-white/50 transition-all duration-300 disabled:opacity-50"
                                />
                            </div>
                        ))}

                        {/* Department */}
                        <div>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                                className="w-full bg-black text-white border-b border-white focus:border-red-600 outline-none py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50"
                            >
                                <option value="" disabled className="text-black bg-white">
                                    Department
                                </option>
                                {departments.map((d) => (
                                    <option key={d} value={d} className="text-black bg-white">
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Semester */}
                        <div>
                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                                className="w-full bg-black text-white border-b border-white focus:border-red-600 outline-none py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50"
                            >
                                <option value="" disabled className="text-black bg-white">
                                    Semester
                                </option>
                                {semesters.map((s) => (
                                    <option key={s} value={s} className="text-black bg-white">
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Other Clubs/Communities */}
                        <div>
                            <input
                                name="otherClubs"
                                placeholder="If you are part of any other clubs or communities, mention your role and name"
                                value={formData.otherClubs}
                                onChange={handleChange}
                                className="w-full bg-black text-white border-b border-white focus:border-red-600 outline-none py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg placeholder-white/50 transition-all duration-300 disabled:opacity-50"
                            />
                        </div>

                        {/* Team Selection */}
                        <div className="pt-8 sm:pt-10">
                            <label className="block text-center text-white mb-4 sm:mb-6 text-sm sm:text-base">
                                Choose your preferred team
                            </label>
                            <select
                                name="team"
                                value={formData.team}
                                onChange={handleTeamSelectAndRedirect}
                                required
                                disabled={isSubmitting}
                                className="w-full bg-black text-white border-2 border-white focus:border-red-600 rounded-xl py-4 px-6 sm:px-8 text-base sm:text-lg text-center outline-none cursor-pointer transition-all duration-300 hover:bg-red-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="" disabled className="bg-black text-white">
                                    {isSubmitting ? "Processing..." : "Select Your Team"}
                                </option>
                                {teams.map((t) => (
                                    <option key={t} value={t} className="bg-black text-white">
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            </section>

            {/* Bottom Accent Line */}
            <div className="w-full h-1 bg-red-600" />
        </main>
    );
}
