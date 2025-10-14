"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define prop interface for consistency with TechnicalForm
interface SponsorshipFormProps {
    label?: string; // Defaults to "Sponsorship"
}

// Define the shape for form answers
interface FormAnswers {
    outreach: string;
    pitch: string;
    channels: string;
    selection: string;
    relationships: string;
    proposal: string;
    objections: string;
    availability: string;
}

// Map IDs to state keys for easy handling
const formFieldMap: Record<string, string> = {
    'sp-outreach': 'outreach',
    'sp-pitch': 'pitch',
    'sp-channels': 'channels',
    'sp-selection': 'selection',
    'sp-relationships': 'relationships',
    'sp-proposal': 'proposal',
    'sp-objections': 'objections',
    'sp-availability': 'availability',
};

// --- Custom Button Classes for Polish (matching TechnicalForm) ---
const backButtonClasses = `w-full sm:w-48 bg-black hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition duration-300 border border-white/30 disabled:opacity-50 tracking-wide shadow-lg`;
const submitButtonClasses = `w-full sm:w-48 bg-[#E62B1E] hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-full transition duration-300 shadow-lg shadow-red-900/40 disabled:opacity-50 tracking-wide`;

// ----------------------------------------
export default function SponsorshipForm({ label = "Sponsorship" }: SponsorshipFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [answers, setAnswers] = useState<FormAnswers>({
        outreach: '',
        pitch: '',
        channels: '',
        selection: '',
        relationships: '',
        proposal: '',
        objections: '',
        availability: '',
    });

    // 1. Client Detection (for hydration safety)
    useEffect(() => {
        setIsClient(true); // Mark as client-side after mount
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
        try {
            console.log("Submitting Payload:", answers);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert(`${label} application submitted successfully!`);
            router.push('/joinus/thank-you');
        } catch (error) {
            console.error("Submission Error:", error);
            alert("An error occurred during submission. Please try again.");
            setIsSubmitting(false);
        }
    }

    // 4. Render nothing during SSR to avoid hydration mismatch
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
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="sp-outreach">
                            1. How will you reach out to small or mid-sized businesses for sponsorships or stalls?
                        </label>
                        <textarea
                            id="sp-outreach"
                            required
                            rows={4}
                            value={answers.outreach}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Outline your outreach approach"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="sp-pitch">
                            2. What will you say in a call or DM to grab a sponsor’s attention?
                        </label>
                        <textarea
                            id="sp-pitch"
                            required
                            rows={3}
                            value={answers.pitch}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Write a short pitch script"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="sp-channels">
                            3. Which channels or platforms will you use to find and contact small businesses?
                        </label>
                        <textarea
                            id="sp-channels"
                            required
                            rows={3}
                            value={answers.channels}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="e.g., Instagram, LinkedIn, local directories, WhatsApp groups"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="sp-selection">
                            4. How will you choose which local businesses to approach for the event?
                        </label>
                        <textarea
                            id="sp-selection"
                            required
                            rows={3}
                            value={answers.selection}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Selection criteria (relevance, audience fit, locality, etc.)"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="sp-relationships">
                            5. How will you build and maintain good relationships with sponsors?
                        </label>
                        <textarea
                            id="sp-relationships"
                            required
                            rows={4}
                            value={answers.relationships}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Follow-ups, deliverables, updates, hospitality, post-event reports"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="sp-proposal">
                            6. What will you include in a simple and appealing sponsorship proposal?
                        </label>
                        <textarea
                            id="sp-proposal"
                            required
                            rows={4}
                            value={answers.proposal}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Benefits, audience, visibility, tiers, pricing, timelines"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="sp-objections">
                            7. How will you handle a sponsor saying no or not responding?
                        </label>
                        <textarea
                            id="sp-objections"
                            required
                            rows={3}
                            value={answers.objections}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Objection handling and re-engagement strategy"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="sp-availability">
                            8. How will you ensure you stay online and reachable to the team and sponsors throughout the duration of the event?
                        </label>
                        <textarea
                            id="sp-availability"
                            required
                            rows={3}
                            value={answers.availability}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200"
                            placeholder="Describe your plan to stay reachable"
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