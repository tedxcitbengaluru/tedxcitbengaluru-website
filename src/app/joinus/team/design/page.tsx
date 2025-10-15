"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DesignFormProps {
    label?: string;
}

interface FormAnswers {
    proficiency: string;
    newTools: string;
    strategies: string;
    project: string;
    trends: string;
    inspiration: string;
    communication: string;
    links: string;
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
    'des-proficiency': 'proficiency',
    'des-new-tools': 'newTools',
    'des-strategies': 'strategies',
    'des-project': 'project',
    'des-trends': 'trends',
    'des-inspiration': 'inspiration',
    'des-communication': 'communication',
    'des-links': 'links',
};

export default function DesignForm({ label = "Design" }: DesignFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState<FormAnswers>({
        proficiency: '',
        newTools: '',
        strategies: '',
        project: '',
        trends: '',
        inspiration: '',
        communication: '',
        links: '',
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
            designDetails: answers,
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
                        <header className="text-center animate-fade-in-up" style={{ marginBottom: 'var(--space-3xl)' }}>
                            <h1 className="text-heading-1" style={{ marginBottom: 'var(--space-lg)' }}>
                                Please answer the following questions for the <span className="text-red">{label}</span> recruitment round.
                            </h1>
                        </header>

                        <div className="team-form-video-container animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, marginBottom: 'var(--space-3xl)' }}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/sKUo3XQlszU?autoplay=1&mute=0"
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
                                <label className="team-form-question-label" htmlFor="des-proficiency">
                                    1. How proficient are you with the following software: Figma, Adobe Photoshop, Adobe Illustrator, Canva, and any other tools? Please specify your proficiency level for each.
                                </label>
                                <textarea
                                    id="des-proficiency"
                                    required
                                    rows={4}
                                    value={answers.proficiency}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="e.g., Figma: Advanced, Adobe Photoshop: Intermediate, Adobe Illustrator: Beginner, Canva: Expert, Sketch: Intermediate"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="des-new-tools">
                                    2. How comfortable are you with trying new tools or learning on the go?
                                </label>
                                <textarea
                                    id="des-new-tools"
                                    required
                                    rows={3}
                                    value={answers.newTools}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Share your approach"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="des-strategies">
                                    3. What strategies do you use to make an event visually and experientially engaging?
                                </label>
                                <textarea
                                    id="des-strategies"
                                    required
                                    rows={4}
                                    value={answers.strategies}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Share ideas across visual design and experience"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="des-project">
                                    4. Tell us about a design project you're proud of and how you made it.
                                </label>
                                <textarea
                                    id="des-project"
                                    required
                                    rows={4}
                                    value={answers.project}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Process, tools, outcome"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="des-trends">
                                    5. What latest trends in design and technology excite you, and how do you use them?
                                </label>
                                <textarea
                                    id="des-trends"
                                    required
                                    rows={3}
                                    value={answers.trends}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Trends and applications"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="des-inspiration">
                                    6. What inspires your creative work, and how do you translate it into tangible projects?
                                </label>
                                <textarea
                                    id="des-inspiration"
                                    required
                                    rows={3}
                                    value={answers.inspiration}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Inspiration and execution"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="des-communication">
                                    7. TEDx designs often need coordination with curation and tech — how do you communicate your ideas?
                                </label>
                                <textarea
                                    id="des-communication"
                                    required
                                    rows={3}
                                    value={answers.communication}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Handoffs, feedback loops, tools"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="des-links">
                                    8. Share past work links (Instagram/Behance/YouTube/Pinterest/Dribbble/Figma/Other)
                                </label>
                                <textarea
                                    id="des-links"
                                    required
                                    rows={3}
                                    value={answers.links}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Paste links here"
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