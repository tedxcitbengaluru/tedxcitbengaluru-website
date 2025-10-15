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
            <div className="min-h-screen bg-black flex items-center justify-center section">
                <div className="container">
                    <div className="team-form-error-card animate-fade-in-up">
                        <h2 className="text-heading-2" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-red)' }}>
                            Application Session Lost
                        </h2>
                        <p className="text-body text-gray-300">
                            Please return to the{' '}
                            <button 
                                onClick={() => router.push('/joinus')} 
                                className="text-red underline hover:no-underline transition"
                            >
                                basic details page
                            </button>
                            {' '}to start your application.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!isClient) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <div className="w-full h-[2px] bg-red" style={{ background: 'var(--color-red)' }} />
            
            <div className="section flex-1 flex items-center justify-center">
                <div className="container">
                    <div className="max-w-4xl mx-auto w-full">
                        <header className="text-center animate-fade-in-up" style={{ marginBottom: 'var(--space-3xl)' }}>
                            <h1 className="text-heading-1" style={{ marginBottom: 'var(--space-lg)' }}>
                                Please answer the following questions for the <span className="text-red">{label}</span> recruitment round.
                            </h1>
                        </header>

                        <div className="team-form-video-container animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, marginBottom: 'var(--space-3xl)' }}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-xl"
                            ></iframe>
                        </div>

                        {error && (
                            <div className="form-error animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)' }}>
                                {error}
                            </div>
                        )}

                        <div className="team-form-questions animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="sp-outreach">
                                    1. How will you reach out to small or mid-sized businesses for sponsorships or stalls?
                                </label>
                                <textarea
                                    id="sp-outreach"
                                    required
                                    rows={4}
                                    value={answers.outreach}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Outline your outreach approach"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="sp-pitch">
                                    2. What will you say in a call or DM to grab a sponsor's attention?
                                </label>
                                <textarea
                                    id="sp-pitch"
                                    required
                                    rows={3}
                                    value={answers.pitch}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Write a short pitch script"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="sp-channels">
                                    3. Which channels or platforms will you use to find and contact small businesses?
                                </label>
                                <textarea
                                    id="sp-channels"
                                    required
                                    rows={3}
                                    value={answers.channels}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="e.g., Instagram, LinkedIn, local directories, WhatsApp groups"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="sp-selection">
                                    4. How will you choose which local businesses to approach for the event?
                                </label>
                                <textarea
                                    id="sp-selection"
                                    required
                                    rows={3}
                                    value={answers.selection}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Selection criteria (relevance, audience fit, locality, etc.)"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="sp-relationships">
                                    5. How will you build and maintain good relationships with sponsors?
                                </label>
                                <textarea
                                    id="sp-relationships"
                                    required
                                    rows={4}
                                    value={answers.relationships}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Follow-ups, deliverables, updates, hospitality, post-event reports"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="sp-proposal">
                                    6. What will you include in a simple and appealing sponsorship proposal?
                                </label>
                                <textarea
                                    id="sp-proposal"
                                    required
                                    rows={4}
                                    value={answers.proposal}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Benefits, audience, visibility, tiers, pricing, timelines"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="sp-objections">
                                    7. How will you handle a sponsor saying no or not responding?
                                </label>
                                <textarea
                                    id="sp-objections"
                                    required
                                    rows={3}
                                    value={answers.objections}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Objection handling and re-engagement strategy"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="sp-availability">
                                    8. How will you ensure you stay online and reachable to the team and sponsors throughout the duration of the event?
                                </label>
                                <textarea
                                    id="sp-availability"
                                    required
                                    rows={3}
                                    value={answers.availability}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Describe your plan to stay reachable"
                                />
                            </div>
                        </div>

                        <div className="team-form-submit-bar">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                disabled={isSubmitting}
                                className="btn btn-secondary"
                            >
                                ← Back to Basic Details
                            </button>
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e as any);
                                }}
                                disabled={isSubmitting}
                                className="btn btn-primary"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        SUBMITTING...
                                    </span>
                                ) : 'Submit Application'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[2px] bg-red" style={{ background: 'var(--color-red)' }} />
        </div>
    );
}