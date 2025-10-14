"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define prop interface for consistency with other forms
interface MediaFormProps {
    label?: string; // Defaults to "Media"
}

// Define the shape for form answers
interface FormAnswers {
    proficiency: string;
    project: string;
    inspiration: string;
    tools: string;
    strategy: string;
    links: string;
}

// Define the shape for basic data (for consistency with other forms)
interface BasicFormData {
    name: string;
    team: string;
    // Add other basic fields: collegeEmail, usn, department, semester, phone, etc.
}

// Map IDs to state keys for easy handling
const formFieldMap: Record<string, string> = {
    'media-proficiency': 'proficiency',
    'media-project': 'project',
    'media-inspiration': 'inspiration',
    'media-tools': 'tools',
    'media-strategy': 'strategy',
    'media-links': 'links',
};

// --- Custom Button Classes for Polish (matching other forms) ---
const backButtonClasses = `w-full sm:w-48 bg-black hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition duration-300 border border-white/30 disabled:opacity-50 tracking-wide shadow-lg`;
const submitButtonClasses = `w-full sm:w-48 bg-[#E62B1E] hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-full transition duration-300 shadow-lg shadow-red-900/40 disabled:opacity-50 tracking-wide`;

// ----------------------------------------
export default function MediaForm({ label = "Media" }: MediaFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [answers, setAnswers] = useState<FormAnswers>({
        proficiency: '',
        project: '',
        inspiration: '',
        tools: '',
        strategy: '',
        links: '',
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
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            mediaDetails: answers,
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
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="media-proficiency">
                            1. How proficient are you with the following software: After Effects, Premiere Pro, VN App, CapCut App, and any other tools? Please specify your proficiency level for each.
                        </label>
                        <textarea
                            id="media-proficiency"
                            required
                            rows={4}
                            value={answers.proficiency}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="e.g., After Effects: Intermediate, Premiere Pro: Advanced, VN App: Beginner, CapCut: Expert, Photoshop: Intermediate"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="media-project">
                            2. Can you tell us about a media project you’re proud of?
                        </label>
                        <textarea
                            id="media-project"
                            required
                            rows={4}
                            value={answers.project}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Describe the project, goals, outcome and impact"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="media-inspiration">
                            3. What inspires you, and how do you channel that into engaging content?
                        </label>
                        <textarea
                            id="media-inspiration"
                            required
                            rows={4}
                            value={answers.inspiration}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Your sources of inspiration and creative process"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="media-tools">
                            4. How comfortable are you with exploring new tools for trending/visual content?
                        </label>
                        <textarea
                            id="media-tools"
                            required
                            rows={3}
                            value={answers.tools}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Share how you learn and adapt to new tools"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="media-strategy">
                            5. What strategies do you use to make media engaging on event day and online?
                        </label>
                        <textarea
                            id="media-strategy"
                            required
                            rows={4}
                            value={answers.strategy}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="On-ground coverage, reels, posts, captions, etc."
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="media-links">
                            6. Share past work links (Instagram/Behance/YouTube/Pinterest/Dribbble/Other)
                        </label>
                        <textarea
                            id="media-links"
                            required
                            rows={3}
                            value={answers.links}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Paste any relevant links here"
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