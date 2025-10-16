"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface MediaFormProps {
    label?: string;
}

interface FormAnswers {
    proficiency: string;
    project: string;
    inspiration: string;
    tools: string;
    strategy: string;
    links: string;
    otherTeams: string;
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
    'media-proficiency': 'proficiency',
    'media-project': 'project',
    'media-inspiration': 'inspiration',
    'media-tools': 'tools',
    'media-strategy': 'strategy',
    'media-links': 'links',
    'media-other-teams': 'otherTeams',
};

export default function MediaForm({ label = "Media" }: MediaFormProps) {
    const router = useRouter();
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState<FormAnswers>({
        proficiency: '',
        project: '',
        inspiration: '',
        tools: '',
        strategy: '',
        links: '',
        otherTeams: '',
    });

    useEffect(() => {
        setIsClient(true);
        const data = sessionStorage.getItem('basicRecruitmentData');
        if (data) {
            setBasicData(JSON.parse(data));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            mediaDetails: answers,
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
            <div className="min-h-screen bg-black flex items-center justify-center section px-4 sm:px-6">
                <div className="container-center w-full max-w-[90%] sm:max-w-md">
                    <div className="team-form-error-card animate-fade-in-up p-4 sm:p-6">
                        <h2 className="text-heading-2 mb-4 sm:mb-6 text-red">
                            Application Session Lost
                        </h2>
                        <p className="text-body text-gray-300 text-sm sm:text-base">
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
            
            <div className="section flex-1 flex items-center justify-center px-4 sm:px-6 md:px-0">
                <div className="container-center max-w-4xl mx-auto w-full">
                    {/* Header */}
                    <header className="text-center animate-fade-in-up" style={{ marginBottom: 'var(--space-3xl)' }}>
                        <h1 className="text-heading-1 text-xl sm:text-2xl md:text-3xl" style={{ marginBottom: 'var(--space-lg)' }}>
                            Please answer the following questions for the{' '}
                            <span className="text-red">{label}</span> recruitment round.
                        </h1>
                    </header>

                    {/* Video */}
                    <div className="team-form-video-container animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, marginBottom: 'var(--space-3xl)' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/lQqc0ytkbKM?autoplay=1&mute=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-xl w-full aspect-video"
                        ></iframe>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="form-error animate-fade-in-up text-sm sm:text-base" style={{ marginBottom: 'var(--space-xl)' }}>
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
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="media-proficiency">
                                1. How proficient are you with the following software: After Effects, Premiere Pro, VN App, CapCut App, and any other tools? Please specify your proficiency level for each.
                            </label>
                            <textarea
                                id="media-proficiency"
                                required
                                rows={4}
                                value={answers.proficiency}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="e.g., After Effects: Intermediate, Premiere Pro: Advanced, VN App: Beginner, CapCut: Expert, Photoshop: Intermediate"
                            />
                        </div>

                        {/* Question 2 */}
                        <div className="team-form-question">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="media-project">
                                2. Can you tell us about a media project you're proud of?
                            </label>
                            <textarea
                                id="media-project"
                                required
                                rows={4}
                                value={answers.project}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Describe the project, goals, outcome and impact"
                            />
                        </div>

                        {/* Question 3 */}
                        <div className="team-form-question">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="media-inspiration">
                                3. What inspires you, and how do you channel that into engaging content?
                            </label>
                            <textarea
                                id="media-inspiration"
                                required
                                rows={4}
                                value={answers.inspiration}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Your sources of inspiration and creative process"
                            />
                        </div>

                        {/* Question 4 */}
                        <div className="team-form-question">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="media-tools">
                                4. How comfortable are you with exploring new tools for trending/visual content?
                            </label>
                            <textarea
                                id="media-tools"
                                required
                                rows={3}
                                value={answers.tools}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Share how you learn and adapt to new tools"
                            />
                        </div>

                        {/* Question 5 */}
                        <div className="team-form-question">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="media-strategy">
                                5. What strategies do you use to make media engaging on event day and online?
                            </label>
                            <textarea
                                id="media-strategy"
                                required
                                rows={4}
                                value={answers.strategy}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="On-ground coverage, reels, posts, captions, etc."
                            />
                        </div>

                        {/* Question 6 */}
                        <div className="team-form-question">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="media-links">
                                6. Share past work links (Instagram/Behance/YouTube/Pinterest/Dribbble/Other)
                            </label>
                            <textarea
                                id="media-links"
                                required
                                rows={3}
                                value={answers.links}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Paste any relevant links here"
                            />
                        </div>

                        <div className="team-form-question">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="media-other-teams">
                                7. Are you interested in being a part of any other team? If so, please specify which team and share why you would like to join that team.
                            </label>
                            <textarea
                                id="media-other-teams"
                                required
                                rows={3}
                                value={answers.otherTeams}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Technical, Sponsorship, Media, Design, Curation, Event Management or type No if you aren't interested"
                            />
                        </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="team-form-submit-bar">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                            className="btn btn-secondary w-full sm:w-auto text-sm sm:text-base"
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
                            className="btn btn-primary w-full sm:w-auto text-sm sm:text-base"
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

            <div className="w-full h-[2px] bg-red" style={{ background: 'var(--color-red)' }} />
        </div>
    );
}