"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SponsorshipFormProps {
    label?: string;
}

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

interface BasicFormData {
    name: string;
    team: string;
    collegeEmail: string;
    personalEmail: string;
    usn: string;
    department: string;
    semester: string;
    phone: string;
}

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

const backButtonClasses = `w-full sm:w-48 bg-black hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition duration-300 border border-white/30 disabled:opacity-50 tracking-wide shadow-lg`;
const submitButtonClasses = `w-full sm:w-48 bg-[#E62B1E] hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-full transition duration-300 shadow-lg shadow-red-900/40 disabled:opacity-50 tracking-wide`;

export default function SponsorshipForm({ label = "Sponsorship" }: SponsorshipFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [error, setError] = useState("");
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

    useEffect(() => {
        setIsClient(true);
        const data = sessionStorage.getItem('basicRecruitmentData');
        if (data) {
            setBasicData(JSON.parse(data));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const stateKey = formFieldMap[id];
       
        if (stateKey) {
            setAnswers(prev => ({ ...prev, [stateKey]: value }));
        }
        setError("");
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const finalSubmissionPayload = {
            basicDetails: basicData,
            sponsorshipDetails: answers,
        };

        try {
            const response = await fetch('/api/recruitment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalSubmissionPayload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit application');
            }

            sessionStorage.removeItem('basicRecruitmentData');
            router.push('/joinus/success');
        } catch (error) {
            console.error("Submission Error:", error);
            setError(error instanceof Error ? error.message : "An error occurred during submission. Please try again.");
            setIsSubmitting(false);
        }
    }

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
                <header className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-white border-b-2 border-red-700 pb-4">
                        Please answer the following questions for the <span className="text-[#E62B1E]">{label}</span> recruitment round.
                    </h1>
                </header>

                <div className="mb-8 sm:mb-12 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
                    <div className="aspect-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-xl shadow-lg"
                        ></iframe>
                    </div>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

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
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200 disabled:opacity-50"
                            placeholder="Outline your outreach approach"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-white mb-5" htmlFor="sp-pitch">
                            2. What will you say in a call or DM to grab a sponsor's attention?
                        </label>
                        <textarea
                            id="sp-pitch"
                            required
                            rows={3}
                            value={answers.pitch}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200 disabled:opacity-50"
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
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200 disabled:opacity-50"
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
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200 disabled:opacity-50"
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
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200 disabled:opacity-50"
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
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200 disabled:opacity-50"
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
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200 disabled:opacity-50"
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
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-5 py-4 resize-none transition duration-200 disabled:opacity-50"
                            placeholder="Describe your plan to stay reachable"
                        />
                    </div>
                </div>

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