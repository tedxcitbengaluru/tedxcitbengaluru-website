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
        otherClubs: "",
        team: "",
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
        Technical: "technical",
        "Event Management": "event-management",
        Sponsorship: "sponsorship",
        Curation: "curation",
        Design: "design",
        Media: "media",
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

            <section className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-24 py-20 sm:py-28 md:py-32">
                <div className="w-full max-w-4xl">
                    {/* Header */}
                    <header className="text-center mb-10 sm:mb-14">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight">
                            Join <span className="text-red-600">TEDxCITBengaluru</span>
                        </h1>
                        <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
                            Fill the required details and pick your team to proceed.
                        </p>
                    </header>

                    {/* Error */}
                    {error && (
                        <div className="mb-8 p-4 rounded-xl bg-[#111] border border-red-600 text-red-400 text-sm sm:text-base">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        id="recruitment-form"
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-8 sm:space-y-10"
                    >
                        {/* Name & College Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Full name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Veronica Smith"
                                disabled={isSubmitting}
                            />
                            <InputField
                                label="College email"
                                name="collegeEmail"
                                type="email"
                                value={formData.collegeEmail}
                                onChange={handleChange}
                                placeholder="you@cambridge.edu.in"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Personal Email & USN */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Personal email"
                                name="personalEmail"
                                type="email"
                                value={formData.personalEmail}
                                onChange={handleChange}
                                placeholder="yourname@gmail.com"
                                disabled={isSubmitting}
                            />
                            <InputField
                                label="USN / Roll number"
                                name="usn"
                                value={formData.usn}
                                onChange={handleChange}
                                placeholder="e.g. 1CD17CS001"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Phone & Department */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 9XXXXXXXXX"
                                type="tel"
                                disabled={isSubmitting}
                            />
                            <SelectField
                                label="Department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                options={departments}
                                placeholder="Select department"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Semester */}
                        <SelectField
                            label="Semester"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            options={semesters}
                            placeholder="Select semester"
                            disabled={isSubmitting}
                        />

                        {/* Other Clubs */}
                        <div>
                            <label className="block text-sm font-medium mb-2 sm:mb-3">Other clubs / communities</label>
                            <textarea
                                name="otherClubs"
                                value={formData.otherClubs}
                                onChange={handleChange}
                                placeholder="Are you part of any clubs? Mention your role and name of the community."
                                rows={4}
                                className="w-full bg-[#0b0b0b] border border-[#262626] rounded-2xl py-4 px-6 text-base sm:text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-600 transition resize-none"
                            />
                        </div>

                        {/* Team Selection */}
                        <div className="pt-4 sm:pt-6">
                            <label className="block text-center text-white mb-3 sm:mb-4 text-base">
                                Choose your preferred team
                            </label>
                            <div className="relative">
                                <select
                                    name="team"
                                    value={formData.team}
                                    onChange={handleTeamSelectAndRedirect}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full appearance-none bg-[#0b0b0b] border border-[#262626] rounded-2xl py-4 px-6 text-lg text-center focus:outline-none focus:ring-2 focus:ring-red-600 transition cursor-pointer"
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
                                {/* Single Arrow */}
                                <span className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-white/60"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* Bottom Accent Line */}
            <div className="w-full h-1 bg-red-600" />
        </main>
    );
}

/* ✅ Small subcomponents for cleaner code */
function InputField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled = false,
}: any) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2 sm:mb-3">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                className="w-full bg-[#0b0b0b] border border-[#262626] rounded-2xl py-4 px-6 text-base sm:text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                required
                disabled={disabled}
            />
        </div>
    );
}

function SelectField({
    label,
    name,
    value,
    onChange,
    options,
    placeholder,
    disabled = false,
}: any) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2 sm:mb-3">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required
                disabled={disabled}
                className="w-full appearance-none bg-[#0b0b0b] border border-[#262626] rounded-2xl py-4 px-6 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition cursor-pointer"
            >
                <option value="">{placeholder}</option>
                {options.map((opt: string) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
