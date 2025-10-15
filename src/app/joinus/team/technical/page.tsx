"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    'tech-project': 'project',
    'tech-crazy-feature': 'crazyFeature',
    'tech-incident': 'incidentResponse',
    'tech-portfolio': 'portfolioLink',
    'tech-tools': 'toolsAndNext',
    'tech-one-word': 'oneWord',
    'tech-proof': 'proofLink',
    'tech-goals': 'goals',
};

export default function TechnicalForm() {
    const router = useRouter();
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [error, setError] = useState("");
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
            technicalDetails: answers,
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
                <div className="container-center">
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
                <div className="container-center">
                    <div className="max-w-4xl mx-auto w-full">
                        {/* Header */}
                        <header className="text-center animate-fade-in-up" style={{ marginBottom: 'var(--space-3xl)' }}>
                            <h1 className="text-heading-1" style={{ marginBottom: 'var(--space-lg)' }}>
                                Please answer the following questions for the{' '}
                                <span className="text-red">Technical</span> recruitment round.
                            </h1>
                        </header>

                        {/* Video */}
                        <div className="team-form-video-container animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, marginBottom: 'var(--space-3xl)' }}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/W9UmLw_Whxw?autoplay=1&mute=0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-xl"
                            ></iframe>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="form-error animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)' }}>
                                {error}
                            </div>
                        )}
                       
                        {/* Form */}
                        <div 
                            id="recruitment-form"
                            className="team-form-questions animate-fade-in-up"
                            style={{ animationDelay: '0.4s', opacity: 0 }}
                        >
                            {/* Question 1 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="tech-project">
                                    1. Share a tech project, website, or script you've built or contributed to. What problem did it solve?
                                </label>
                                <textarea
                                    id="tech-project"
                                    required
                                    rows={5}
                                    value={answers.project}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Describe the project, stack, and impact"
                                />
                            </div>

                            {/* Question 2 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="tech-crazy-feature">
                                    2. If you could build one crazy feature for TEDx — no budget limits — what would it be?
                                </label>
                                <textarea
                                    id="tech-crazy-feature"
                                    required
                                    rows={3}
                                    value={answers.crazyFeature}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Dream big"
                                />
                            </div>

                            {/* Question 3 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="tech-incident">
                                    3. A few hours before the event, the website backend for ticketing stops responding. What's your first move?
                                </label>
                                <textarea
                                    id="tech-incident"
                                    required
                                    rows={3}
                                    value={answers.incidentResponse}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Triage steps, comms, rollback, observability"
                                />
                            </div>

                            {/* Question 4 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="tech-portfolio">
                                    4. Portfolio / GitHub / Website Link (Required)
                                </label>
                                <input
                                    id="tech-portfolio"
                                    required
                                    type="url"
                                    value={answers.portfolioLink}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-input-url"
                                    placeholder="Paste a link"
                                />
                            </div>

                            {/* Question 5 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="tech-tools">
                                    5. What tools, languages, or frameworks do you vibe with right now — and what's on your "I want to learn this next" list?
                                </label>
                                <textarea
                                    id="tech-tools"
                                    required
                                    rows={3}
                                    value={answers.toolsAndNext}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Stacks you love + next-to-learn"
                                />
                            </div>

                            {/* Question 6 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="tech-one-word">
                                    6. In one word — what do you bring to the team?
                                </label>
                                <input
                                    id="tech-one-word"
                                    required
                                    value={answers.oneWord}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-input-short"
                                    placeholder="One word"
                                    maxLength={20}
                                />
                            </div>

                            {/* Question 7 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="tech-proof">
                                    7. Upload or link something that proves you build stuff — a repo, a design, a script, an automation, even a screenshot.
                                </label>
                                <textarea
                                    id="tech-proof"
                                    required
                                    rows={3}
                                    value={answers.proofLink}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Link(s) and short context"
                                />
                            </div>

                            {/* Question 8 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="tech-goals">
                                    8. What do you want to learn, build, or prove here?
                                </label>
                                <textarea
                                    id="tech-goals"
                                    required
                                    rows={3}
                                    value={answers.goals}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Your goals"
                                />
                            </div>
                        </div>

                        {/* Submit Bar */}
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
                                    const form = document.getElementById('recruitment-form') as HTMLFormElement;
                                    if (form) {
                                        handleSubmit(e as any);
                                    }
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