"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define prop interface (matches the expected prop from a linker page, even if this is a static page)
interface TechnicalFormProps {
    label?: string; // Passed from parent if dynamically routed, defaults to "Technical"
}

// Define the shape for the initial data retrieved from sessionStorage
interface BasicFormData {
    name: string;
    team: string;
    // Add all other basic fields saved: collegeEmail, usn, department, semester, phone, etc.
}

// Map IDs to state keys for easy handling
const formFieldMap: Record<string, string> = {
    'tech-project': 'project',
    'tech-crazy-feature': 'crazyFeature',
    'tech-incident': 'incidentResponse',
    'tech-portfolio': 'portfolioLink',
    'tech-tools': 'toolsAndNext',
    'tech-one-word': 'oneWord',
    'tech-proof': 'proofLink',
    'tech-goals': 'goals',
};

// --- Custom Button Classes for Polish ---
const backButtonClasses = `w-full sm:w-48 bg-black hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition duration-300 border border-white/30 disabled:opacity-50 tracking-wide shadow-lg`;
const submitButtonClasses = `w-full sm:w-48 bg-[#E62B1E] hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-full transition duration-300 shadow-lg shadow-red-900/40 disabled:opacity-50 tracking-wide`;

// ----------------------------------------
export default function TechnicalForm({ label = "Technical" }: TechnicalFormProps) {
    const router = useRouter();
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [answers, setAnswers] = useState({
        project: '',
        crazyFeature: '',
        incidentResponse: '',
        portfolioLink: '',
        toolsAndNext: '',
        oneWord: '',
        proofLink: '',
        goals: '',
    });

    // 1. Data Retrieval and Client Detection
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
            technicalDetails: answers,
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

    // 5. Main Form (render a loading state or nothing during SSR to avoid mismatch)
    if (!isClient) {
        return null; // Avoid rendering during SSR to prevent hydration mismatch
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

                {/* Responsive YouTube embed (Stretched Full Width within Form Container) */}
                <div className="mb-24">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                            title={`${label} Team Intro`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
               
                {/* Form Fields Grid - Increased vertical gap for breathing space */}
                <div className="grid grid-cols-1 gap-16">
                    {/* 1. Project */}
                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="tech-project">
                            1. Share a tech project, website, or script you’ve built or contributed to. What problem did it solve?
                        </label>
                        <textarea
                            id="tech-project"
                            required
                            rows={5}
                            value={answers.project}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Describe the project, stack, and impact"
                        />
                    </div>
                    {/* 2. Crazy Feature */}
                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="tech-crazy-feature">
                            2. If you could build one crazy feature for TEDx — no budget limits — what would it be?
                        </label>
                        <textarea
                            id="tech-crazy-feature"
                            required
                            rows={3}
                            value={answers.crazyFeature}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Dream big"
                        />
                    </div>
                    {/* 3. Incident Response */}
                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="tech-incident">
                            3. A few hours before the event, the website backend for ticketing stops responding. What’s your first move?
                        </label>
                        <textarea
                            id="tech-incident"
                            required
                            rows={3}
                            value={answers.incidentResponse}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Triage steps, comms, rollback, observability"
                        />
                    </div>
                    {/* 4. Portfolio Link */}
                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="tech-portfolio">
                            4. Portfolio / GitHub / Website Link (Required)
                        </label>
                        <input
                            id="tech-portfolio"
                            required
                            type="url"
                            value={answers.portfolioLink}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border-b border-white/20 focus:border-[#E62B1E] focus:outline-none px-2 py-4 transition duration-200"
                            placeholder="Paste a link"
                        />
                    </div>
                    {/* 5. Tools and Next Steps */}
                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="tech-tools">
                            5. What tools, languages, or frameworks do you vibe with right now — and what’s on your “I want to learn this next” list?
                        </label>
                        <textarea
                            id="tech-tools"
                            required
                            rows={3}
                            value={answers.toolsAndNext}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Stacks you love + next-to-learn"
                        />
                    </div>
                    {/* 6. One Word */}
                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="tech-one-word">
                            6. In one word — what do you bring to the team?
                        </label>
                        <input
                            id="tech-one-word"
                            required
                            value={answers.oneWord}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border-b border-white/20 focus:border-[#E62B1E] focus:outline-none px-2 py-4 transition duration-200"
                            placeholder="One word"
                            maxLength={20}
                        />
                    </div>
                    {/* 7. Proof Link */}
                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="tech-proof">
                            7. Upload or link something that proves you build stuff — a repo, a design, a script, an automation, even a screenshot.
                        </label>
                        <textarea
                            id="tech-proof"
                            required
                            rows={3}
                            value={answers.proofLink}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Link(s) and short context"
                        />
                    </div>
                    {/* 8. Goals */}
                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="tech-goals">
                            8. What do you want to learn, build, or prove here?
                        </label>
                        <textarea
                            id="tech-goals"
                            required
                            rows={3}
                            value={answers.goals}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Your goals"
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
                                {/* Simple inline spinner/loader */}
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