"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define prop interface for consistency with other forms
interface EventManagementFormProps {
    label?: string; // Defaults to "Event Management"
}

// Define the shape for form answers
interface FormAnswers {
    why: string;
    meaning: string;
    excites: string;
    pressure: string;
    teamwork: string;
    experience: string;
    prefer: string;
    strategies: string;
    tackle: string;
    portfolio: string;
    campaign: string;
}

// Define the shape for basic data (for consistency with TechnicalForm)
interface BasicFormData {
    name: string;
    team: string;
    // Add other basic fields: collegeEmail, usn, department, semester, phone, etc.
}

// Map IDs to state keys for easy handling
const formFieldMap: Record<string, string> = {
    'em-why': 'why',
    'em-meaning': 'meaning',
    'em-excites': 'excites',
    'em-pressure': 'pressure',
    'em-teamwork': 'teamwork',
    'em-experience': 'experience',
    'em-prefer': 'prefer',
    'em-strategies': 'strategies',
    'em-tackle': 'tackle',
    'em-portfolio': 'portfolio',
    'em-campaign': 'campaign',
};

// --- Custom Button Classes for Polish (matching TechnicalForm and SponsorshipForm) ---
const backButtonClasses = `w-full sm:w-48 bg-black hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition duration-300 border border-white/30 disabled:opacity-50 tracking-wide shadow-lg`;
const submitButtonClasses = `w-full sm:w-48 bg-[#E62B1E] hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-full transition duration-300 shadow-lg shadow-red-900/40 disabled:opacity-50 tracking-wide`;

// ----------------------------------------
export default function EventManagementForm({ label = "Event Management" }: EventManagementFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [answers, setAnswers] = useState<FormAnswers>({
        why: '',
        meaning: '',
        excites: '',
        pressure: '',
        teamwork: '',
        experience: '',
        prefer: '',
        strategies: '',
        tackle: '',
        portfolio: '',
        campaign: '',
    });

    // 1. Client Detection and Data Retrieval
    useEffect(() => {
        setIsClient(true); // Mark as client-side after mount
        const data = sessionStorage.getItem('basicRecruitmentData');
        if (data) {
            setBasicData(JSON.parse(data));
        }
    }, []);

    // 2. Universal Change Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const stateKey = formFieldMap[id];
       
        if (stateKey) {
            setAnswers(prev => ({ ...prev, [stateKey]: value }));
        }
    };

    // 3. Submission Handler
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const finalSubmissionPayload = {
            basicDetails: basicData,
            eventManagementDetails: answers,
        };
        try {
            console.log("Submitting Payload:", finalSubmissionPayload);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Clear data and redirect on success
            sessionStorage.removeItem('basicRecruitmentData');
            alert(`${label} application submitted successfully!`);
            router.push('/joinus/thank-you');
        } catch (error) {
            console.error("Submission Error:", error);
            alert("An error occurred during submission. Please try again.");
            setIsSubmitting(false);
        }
    }

    // 4. Fallback UI if basic data is missing (only render after client-side confirmation)
    if (!basicData && isClient) {
        return (
            <div className="flex justify-center min-h-screen bg-black py-16">
                <div className="text-center p-10 bg-red-900/20 border border-red-700 rounded-2xl max-w-lg mx-auto my-16">
                    <p className="text-2xl text-red-400 font-semibold">Application Session Lost</p>
                    <p className="text-white mt-4">
                        Please return to the <button onClick={() => router.push('/joinus')} className="text-[#E62B1E] underline hover:text-red-400 transition">basic details page</button> to start your application.
                    </p>
                </div>
            </div>
        );
    }

    // 5. Render nothing during SSR to avoid hydration mismatch
    if (!isClient) {
        return null;
    }

    return (
        <div className="flex justify-center min-h-screen bg-black py-16">
            <form
                id="recruitment-form"
                onSubmit={handleSubmit}
                className="w-full max-w-5xl px-8 sm:px-16 md:px-24 lg:px-32"
            >
                {/* Header Above YouTube Video */}
                <header className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-white border-b-2 border-red-700 pb-4">
                        Please answer the following questions for the <span className="text-[#E62B1E]">{label}</span> recruitment round.
                    </h1>
                </header>

                {/* Responsive YouTube embed */}
                <div className="mb-24">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
                            title={`${label} Team Intro`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* Form Fields Grid - Increased vertical gap */}
                <div className="grid grid-cols-1 gap-16">
                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-why">
                            1. Why do you want to be part of TEDxCIT’s Event Management team?
                        </label>
                        <textarea
                            id="em-why"
                            required
                            rows={4}
                            value={answers.why}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Your motivation"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-meaning">
                            2. What does “TEDx” mean to you?
                        </label>
                        <textarea
                            id="em-meaning"
                            required
                            rows={3}
                            value={answers.meaning}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Your understanding of TEDx"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-excites">
                            3. What excites you most about working in event management?
                        </label>
                        <textarea
                            id="em-excites"
                            required
                            rows={3}
                            value={answers.excites}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="What energizes you"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-pressure">
                            4. How do you handle work under pressure or tight deadlines?
                        </label>
                        <textarea
                            id="em-pressure"
                            required
                            rows={3}
                            value={answers.pressure}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Give examples if possible"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-teamwork">
                            5. Describe a time when you successfully worked as part of a team.
                        </label>
                        <textarea
                            id="em-teamwork"
                            required
                            rows={4}
                            value={answers.teamwork}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Your experience"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-experience">
                            6. Do you have any prior experience in logistics, coordination, or event setup?
                        </label>
                        <textarea
                            id="em-experience"
                            required
                            rows={3}
                            value={answers.experience}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Describe relevant experience"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-prefer">
                            7. What kind of tasks would you prefer taking up?
                        </label>
                        <textarea
                            id="em-prefer"
                            required
                            rows={3}
                            value={answers.prefer}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="e.g., logistics, stage, hospitality, registrations, backstage"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-strategies">
                            8. Enlist 3 niche strategies for managing the team well in event management.
                        </label>
                        <textarea
                            id="em-strategies"
                            required
                            rows={4}
                            value={answers.strategies}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Bullet points or short sentences"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-tackle">
                            9. Suppose you're the lead and some member(s) are not working, how will you tackle it?
                        </label>
                        <textarea
                            id="em-tackle"
                            required
                            rows={3}
                            value={answers.tackle}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Conflict resolution and accountability"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-portfolio">
                            10. Upload portfolio (if you have one)
                        </label>
                        <input
                            id="em-portfolio"
                            required
                            type="url"
                            value={answers.portfolio}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border-b border-white/20 focus:border-[#E62B1E] focus:outline-none px-2 py-4 transition duration-200"
                            placeholder="Paste a portfolio link (Drive/Notion/Behance/etc.)"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="em-campaign">
                            11. Mention a unique campaigning idea for the event.
                        </label>
                        <textarea
                            id="em-campaign"
                            required
                            rows={3}
                            value={answers.campaign}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Your idea"
                        />
                    </div>
                </div>

                {/* Submit/Back Bar (Centered with Increased Spacing) */}
                <div className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-12 py-10 border-t border-white/20">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        disabled={isSubmitting}
                        className={backButtonClasses}
                    >
                        &larr; Back to Basic Details
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={submitButtonClasses}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                SUBMITTING...
                            </div>
                        ) : 'Submit Application'}
                    </button>
                </div>
            </form>
        </div>
    );
}