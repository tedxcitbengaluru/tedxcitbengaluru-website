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
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

            <section className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-12 py-16 sm:py-20 md:py-28">
                <div className="w-full max-w-2xl">
                    
                    {/* Header */}
                    <header className="text-center mb-12 sm:mb-16">
                        {/* smaller base size so it never overflows on very small screens */}
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 sm:mb-5 leading-tight">
                            Join <span className="text-red-600">TEDxCITBengaluru</span>
                        </h1>
                        <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto">
                            Fill in your details below and select your preferred team.
                        </p>
                    </header>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-black border border-red-600 rounded-lg text-red-500 text-sm sm:text-base">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        id="recruitment-form"
                        className="space-y-6 sm:space-y-8 md:space-y-10"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {/* Input Fields (stacked) */}
                        {[
                            { name: "name", placeholder: "Full Name", type: "text" },
                            { name: "usn", placeholder: "USN", type: "text" },
                            { name: "collegeEmail", placeholder: "College Email", type: "email" },
                            { name: "personalEmail", placeholder: "Personal Email", type: "email" },
                            { name: "phone", placeholder: "Phone Number", type: "tel" },
                        ].map((input) => (
                            <div key={input.name} className="w-full">
                                <input
                                    {...input}
                                    name={input.name}
                                    value={(formData as any)[input.name]}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    // responsive font sizes and allow wrapping/truncation where necessary
                                    className="w-full min-w-0 bg-black text-white border-b border-white focus:border-red-600 outline-none py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base placeholder-white/50 transition-all duration-200 disabled:opacity-50"
                                />
                            </div>
                        ))}

                        {/* Department & Semester in a responsive two-column layout on medium+ screens */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full min-w-0 bg-black text-white border-b border-white focus:border-red-600 outline-none py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base transition-all duration-200 appearance-none cursor-pointer disabled:opacity-50"
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

                            <div>
                                <select
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full min-w-0 bg-black text-white border-b border-white focus:border-red-600 outline-none py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base transition-all duration-200 appearance-none cursor-pointer disabled:opacity-50"
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
                        </div>

                        {/* Other Clubs/Communities (textarea so long text wraps) */}
                        <div>
                            <label htmlFor="otherClubs" className="sr-only">Other clubs/communities</label>
                            <textarea
                                id="otherClubs"
                                name="otherClubs"
                                placeholder="If you are part of any other clubs or communities, mention your role and name (this field wraps automatically)"
                                value={formData.otherClubs}
                                onChange={handleChange}
                                rows={3}
                                className="w-full min-w-0 bg-black text-white border-b border-white focus:border-red-600 outline-none py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base placeholder-white/50 transition-all duration-200 resize-none disabled:opacity-50"
                            />
                        </div>

                        {/* Team Selection */}
                        <div className="pt-2 sm:pt-4">
                            <label className="block text-center text-white mb-3 sm:mb-4 text-sm sm:text-base">
                                Choose your preferred team
                            </label>
                            <select
                                name="team"
                                value={formData.team}
                                onChange={handleTeamSelectAndRedirect}
                                required
                                disabled={isSubmitting}
                                className="w-full bg-black text-white border-2 border-white focus:border-red-600 rounded-lg py-3 px-4 sm:px-6 text-sm sm:text-base text-center outline-none cursor-pointer transition-all duration-200 hover:bg-red-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="" disabled>
                                    {isSubmitting ? "Processing..." : "Select Your Team"}
                                </option>
                                {teams.map((t) => (
                                    <option key={t} value={t}>
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
