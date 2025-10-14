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
    });

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear error on input change
    }

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

    async function handleTeamSelectAndRedirect(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const chosen = event.target.value;
        const slug = teamSlugMap[chosen];

        const updatedFormData = { ...formData, team: chosen };
        setFormData(updatedFormData);

        // Validate all required fields before proceeding
        if (!updatedFormData.name || !updatedFormData.collegeEmail || 
            !updatedFormData.personalEmail || !updatedFormData.usn || 
            !updatedFormData.department || !updatedFormData.semester || 
            !updatedFormData.phone) {
            setError("Please fill in all required fields before selecting a team.");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            // Store in sessionStorage for team-specific form
            if (typeof window !== "undefined") {
                sessionStorage.setItem("basicRecruitmentData", JSON.stringify(updatedFormData));
            }

            // Navigate to team-specific page
            if (slug) {
                router.push(`/joinus/team/${slug}`);
            }
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

            <section className="flex-1 flex items-center justify-center w-full px-6 sm:px-8 lg:px-12 py-16 sm:py-20 md:py-24">
                <div className="w-full max-w-2xl">
                    
                    {/* Header */}
                    <header className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                            Join <span className="text-red-600">TEDxCITBengaluru</span>
                        </h1>
                        <p className="text-gray-400 text-base sm:text-lg">
                            Fill in your details below and select your preferred team.
                        </p>
                    </header>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-8 sm:space-y-10" onSubmit={(e) => e.preventDefault()}>
                        {[
                            { name: "name", placeholder: "Full Name" },
                            { name: "usn", placeholder: "USN" },
                            { name: "collegeEmail", placeholder: "College Email", type: "email" },
                            { name: "personalEmail", placeholder: "Personal Email", type: "email" },
                            { name: "phone", placeholder: "Phone Number", type: "tel" },
                        ].map((input) => (
                            <div key={input.name} className="flex flex-col">
                                <input
                                    {...input}
                                    value={(formData as any)[input.name]}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="bg-black text-white border-b border-gray-700 focus:border-red-600 outline-none py-3 placeholder-gray-500 text-base sm:text-lg transition-all duration-300 disabled:opacity-50"
                                />
                            </div>
                        ))}

                        {/* Department */}
                        <div className="flex flex-col">
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                                className="bg-black text-white border-b border-gray-700 focus:border-red-600 outline-none py-3 text-base sm:text-lg transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50"
                            >
                                <option value="" disabled>Department</option>
                                {departments.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        {/* Semester */}
                        <div className="flex flex-col">
                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                                className="bg-black text-white border-b border-gray-700 focus:border-red-600 outline-none py-3 text-base sm:text-lg transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50"
                            >
                                <option value="" disabled>Semester</option>
                                {semesters.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* Team Selection */}
                        <div className="pt-10">
                            <label className="block text-center text-gray-400 mb-3 text-sm sm:text-base">
                                Choose your preferred team
                            </label>
                            <select
                                name="team"
                                value={formData.team}
                                onChange={handleTeamSelectAndRedirect}
                                required
                                disabled={isSubmitting}
                                className="w-full bg-red-600 text-black font-semibold rounded-lg py-4 px-4 text-base sm:text-lg text-center outline-none cursor-pointer transition-all duration-300 hover:bg-red-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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