"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JoinUsPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [validationError, setValidationError] = useState("");
    const [isUSNValid, setIsUSNValid] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        collegeEmail: "",
        personalEmail: "",
        usn: "",
        department: "",
        semester: "",
        phone: "",
        team: "",
        otherClubs: "", // New field for clubs/communities
    });

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear general error on input change
        if (name === "usn") {
            setValidationError(""); // Clear USN-specific error
            setIsUSNValid(false); // Reset validation until checked
        }
    }

    // Validate USN against an API endpoint
    async function validateUSN(usn: string) {
        try {
            const response = await fetch(`/api/check-usn?usn=${encodeURIComponent(usn)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            return result.isUnique; // Assume API returns { isUnique: boolean }
        } catch (err) {
            console.error("USN validation error:", err);
            return false;
        }
    }

    const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const departments = [
        "CSE", "CSE-IOT", "CSE-DS", "ISE", "ECE", "AIML", "EEE", "MECH", "CIVIL", "BBA", "BCA", "BCOM", "Other"
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
        // Validate all required fields
        if (!updatedFormData.name || !updatedFormData.collegeEmail ||
            !updatedFormData.personalEmail || !updatedFormData.usn ||
            !updatedFormData.department || !updatedFormData.semester ||
            !updatedFormData.phone) {
            setError("Please fill in all required fields before selecting a team.");
            return;
        }
        // Validate USN uniqueness
        if (!isUSNValid) {
            const isUnique = await validateUSN(updatedFormData.usn);
            if (!isUnique) {
                setValidationError("This USN is already registered. Please use a different USN.");
                return;
            }
            setIsUSNValid(true); // Mark as valid after successful check
        }
        setIsSubmitting(true);
        setError("");
        try {
            if (typeof window !== "undefined") {
                sessionStorage.setItem("basicRecruitmentData", JSON.stringify(updatedFormData));
            }
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

    // Trigger USN validation on input change
    useEffect(() => {
        if (formData.usn) {
            validateUSN(formData.usn).then((isUnique) => {
                if (!isUnique && formData.usn) {
                    setValidationError("This USN is already registered. Please use a different USN.");
                } else {
                    setValidationError("");
                    setIsUSNValid(true);
                }
            });
        }
    }, [formData.usn]);

    return (
        <main className="bg-black text-white min-h-screen flex flex-col">
            {/* Top Accent Line */}
            <div className="w-full h-1 bg-red-600" />
            <section className="flex-1 flex items-center justify-center w-full px-6 sm:px-8 lg:px-12 py-20 sm:py-24 md:py-28">
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <header className="text-center mb-24">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
                            Join <span className="text-red-600">TEDxCITBengaluru</span>
                        </h1>
                        <p className="text-white text-lg sm:text-xl">
                            Fill in your details below and select your preferred team.
                        </p>
                    </header>
                    {/* Error Messages */}
                    {(error || validationError) && (
                        <div className="mb-12 p-6 bg-black border border-red-600 rounded-xl text-red-600 text-base sm:text-lg shadow-[0_4px_6px_rgba(230,43,30,0.2)]">
                            {validationError || error}
                        </div>
                    )}
                    {/* Form */}
                    <form className="space-y-16 sm:space-y-20" onSubmit={(e) => e.preventDefault()}>
                        {[
                            { name: "name", placeholder: "Full Name", type: "text" },
                            { name: "usn", placeholder: "USN", type: "text" },
                            { name: "collegeEmail", placeholder: "College Email", type: "email" },
                            { name: "personalEmail", placeholder: "Personal Email", type: "email" },
                            { name: "phone", placeholder: "Phone Number", type: "tel" },
                        ].map((input) => (
                            <div key={input.name} className="flex flex-col py-8 sm:py-10">
                                <input
                                    {...input}
                                    value={formData[input.name as keyof typeof formData]}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="bg-black text-white border-b-2 border-white focus:border-red-600 outline-none py-4 px-4 sm:px-6 text-lg sm:text-xl placeholder-white/50 transition-all duration-300 disabled:opacity-50"
                                />
                            </div>
                        ))}
                        {/* Department */}
                        <div className="flex flex-col py-8 sm:py-10">
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                                className="bg-black text-white border-b-2 border-white focus:border-red-600 outline-none py-4 px-4 sm:px-6 text-lg sm:text-xl transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50"
                            >
                                <option value="" disabled className="text-black bg-white">Department</option>
                                {departments.map((d) => (
                                    <option key={d} value={d} className="text-black bg-white">{d}</option>
                                ))}
                            </select>
                        </div>
                        {/* Semester */}
                        <div className="flex flex-col py-8 sm:py-10">
                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                                className="bg-black text-white border-b-2 border-white focus:border-red-600 outline-none py-4 px-4 sm:px-6 text-lg sm:text-xl transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50"
                            >
                                <option value="" disabled className="text-black bg-white">Semester</option>
                                {semesters.map((s) => (
                                    <option key={s} value={s} className="text-black bg-white">{s}</option>
                                ))}
                            </select>
                        </div>
                        {/* Other Clubs/Communities */}
                        <div className="flex flex-col py-8 sm:py-10">
                            <input
                                name="otherClubs"
                                placeholder="Which are the other clubs/communities you are involved in?"
                                value={formData.otherClubs}
                                onChange={handleChange}
                                className="bg-black text-white border-b-2 border-white focus:border-red-600 outline-none py-4 px-4 sm:px-6 text-lg sm:text-xl placeholder-white/50 transition-all duration-300 disabled:opacity-50"
                            />
                        </div>
                        {/* Team Selection */}
                        <div className="pt-16 sm:pt-20">
                            <label className="block text-center text-white mb-8 text-base sm:text-lg">
                                Choose your preferred team
                            </label>
                            <select
                                name="team"
                                value={formData.team}
                                onChange={handleTeamSelectAndRedirect}
                                required
                                disabled={isSubmitting}
                                className="w-full bg-black text-white border-2 border-white focus:border-red-600 rounded-xl py-5 px-6 text-lg sm:text-xl text-center outline-none cursor-pointer transition-all duration-300 hover:bg-red-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="" disabled className="bg-black text-white">
                                    {isSubmitting ? "Processing..." : "Select Your Team"}
                                </option>
                                {teams.map((t) => (
                                    <option key={t} value={t} className="bg-black text-white">{t}</option>
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