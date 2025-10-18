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
        
        // Don't proceed if empty value selected
        if (!chosen) return;
        
        const slug = teamSlugMap[chosen];
        const updatedFormData = { ...formData, team: chosen };
        setFormData(updatedFormData);

        // Validate all required fields
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
            // Reset team selection
            setFormData(prev => ({ ...prev, team: "" }));
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
            if (slug) {
                router.push(`/joinus/team/${slug}`);
            }
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred. Please try again.");
            setFormData(prev => ({ ...prev, team: "" }));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="bg-black text-white min-h-screen flex flex-col">
            {/* Top Accent Line */}
            <div className="w-full h-[2px] bg-red" style={{ background: 'var(--color-red)' }} />

            <section className="section flex items-center justify-center min-h-screen">
                <div className="container flex items-center justify-center">
                    <div className="max-w-3xl mx-auto w-full">
                        {/* Header */}
                        <header className="text-center animate-fade-in-up" style={{ marginBottom: 'var(--space-3xl)' }}>
                            <h1 className="text-heading-1" style={{ marginBottom: 'var(--space-md)' }}>
                                Join <span className="text-red">TEDxCITBengaluru</span>
                            </h1>
                            <p className="text-body text-gray-400">
                                Fill the required details and pick your team to proceed.
                            </p>
                        </header>

                        {/* Error */}
                        {error && (
                            <div className="form-error animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)' }}>
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <div
                            id="recruitment-form"
                            className="form-container animate-fade-in-up"
                            style={{ animationDelay: '0.2s', opacity: 0 }}
                        >
                            {/* Name & College Email */}
                            <div className="form-row">
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
                            <div className="form-row">
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
                                    placeholder="Not received? drop your name & section."
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Phone & Department */}
                            <div className="form-row">
                                <InputField
                                    label="Phone number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="9XXXXXXXXX"
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
                            <div className="form-field">
                                <label className="form-label">Other clubs / communities</label>
                                <textarea
                                    name="otherClubs"
                                    value={formData.otherClubs}
                                    onChange={handleChange}
                                    placeholder="Are you part of any clubs? Mention your role and name of the community."
                                    rows={4}
                                    className="form-textarea"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Team Descriptions PDF Embed */}
                            <div className="form-field" style={{ marginBottom: 'var(--space-xl)' }}>
                                <label className="form-label">Team Descriptions & Responsibilities</label>
                                <div className="w-full" style={{ 
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                }}>
                                    <iframe
                                        src="https://drive.google.com/file/d/1ouk_5WnyNV-Sne1Vqs8uVYddrpaQGy-G/preview"
                                        width="100%"
                                        height="600"
                                        allow="autoplay"
                                        style={{ border: 'none' }}
                                    />
                                </div>
                            </div>

                            {/* Team Selection */}
                            <div className="form-team-select">
                                <label className="form-team-label">Choose your preferred team</label>
                                <div className="relative">
                                    <select
                                        name="team"
                                        value={formData.team}
                                        onChange={handleTeamSelectAndRedirect}
                                        required
                                        disabled={isSubmitting}
                                        className="form-select-team"
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
                                    <span className="form-select-arrow">
                                        <svg
                                            className="w-5 h-5"
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
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Accent Line */}
            <div className="w-full h-[2px] bg-red" style={{ background: 'var(--color-red)' }} />
        </main>
    );
}

/* Subcomponents */
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
        <div className="form-field">
            <label className="form-label">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                className="form-input"
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
        <div className="form-field">
            <label className="form-label">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required
                disabled={disabled}
                className="form-select"
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