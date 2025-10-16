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
    'des-proficiency': 'proficiency',
    'des-new-tools': 'newTools',
    'des-strategies': 'strategies',
    'des-project': 'project',
    'des-trends': 'trends',
    'des-inspiration': 'inspiration',
    'des-communication': 'communication',
    'des-links': 'links',
    'des-otherTeams': 'otherTeams',
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
            <div className="min-h-screen bg-black flex items-center justify-center section px-4 sm:px-6 md:px-0">
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
                    <header className="text-center animate-fade-in-up" style={{ marginBottom: 'var(--space-3xl)' }}>
                        <h1 className="text-heading-1 text-xl sm:text-2xl md:text-3xl" style={{ marginBottom: 'var(--space-lg)' }}>
                            Please answer the following questions for the <span className="text-red">{label}</span> recruitment round.
                        </h1>
                    </header>

                    <div className="team-form-video-container animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, marginBottom: 'var(--space-3xl)' }}>
                        <iframe
                            width="100%"
                            className="rounded-xl w-full aspect-video max-h-[250px] sm:max-h-[350px] md:max-h-[500px]"
                            src="https://www.youtube.com/embed/sKUo3XQlszU?autoplay=1&mute=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {error && (
                        <div className="form-error animate-fade-in-up text-sm sm:text-base" style={{ marginBottom: 'var(--space-xl)' }}>
                            {error}
                        </div>
                    )}

                    <form 
                        id="recruitment-form"
                        className="team-form-questions animate-fade-in-up"
                        style={{ animationDelay: '0.4s', opacity: 0 }}
                        onSubmit={handleSubmit}
                    >
                        <div className="team-form-question mb-6 sm:mb-8">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="des-proficiency">
                                1. How proficient are you with the following software: Figma, Adobe Photoshop, Adobe Illustrator, Canva, and any other tools? Please specify your proficiency level for each.
                            </label>
                            <textarea
                                id="des-proficiency"
                                required
                                rows={4}
                                value={answers.proficiency}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="e.g., Figma: Advanced, Adobe Photoshop: Intermediate, Adobe Illustrator: Beginner, Canva: Expert, Sketch: Intermediate"
                            />
                        </div>

                        <div className="team-form-question mb-6 sm:mb-8">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="des-new-tools">
                                2. How comfortable are you with trying new tools or learning on the go?
                            </label>
                            <textarea
                                id="des-new-tools"
                                required
                                rows={3}
                                value={answers.newTools}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Share your approach"
                            />
                        </div>

                        <div className="team-form-question mb-6 sm:mb-8">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="des-strategies">
                                3. What strategies do you use to make an event visually and experientially engaging?
                            </label>
                            <textarea
                                id="des-strategies"
                                required
                                rows={4}
                                value={answers.strategies}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Share ideas across visual design and experience"
                            />
                        </div>

                        <div className="team-form-question mb-6 sm:mb-8">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="des-project">
                                4. Tell us about a design project you're proud of and how you made it.
                            </label>
                            <textarea
                                id="des-project"
                                required
                                rows={4}
                                value={answers.project}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Process, tools, outcome"
                            />
                        </div>

                        <div className="team-form-question mb-6 sm:mb-8">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="des-trends">
                                5. What latest trends in design and technology excite you, and how do you use them?
                            </label>
                            <textarea
                                id="des-trends"
                                required
                                rows={3}
                                value={answers.trends}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Trends and applications"
                            />
                        </div>

                        <div className="team-form-question mb-6 sm:mb-8">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="des-inspiration">
                                6. What inspires your creative work, and how do you translate it into tangible projects?
                            </label>
                            <textarea
                                id="des-inspiration"
                                required
                                rows={3}
                                value={answers.inspiration}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Inspiration and execution"
                            />
                        </div>

                        <div className="team-form-question mb-6 sm:mb-8">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="des-communication">
                                7. TEDx designs often need coordination with curation and tech — how do you communicate your ideas?
                            </label>
                            <textarea
                                id="des-communication"
                                required
                                rows={3}
                                value={answers.communication}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Handoffs, feedback loops, tools"
                            />
                        </div>

                        <div className="team-form-question mb-6 sm:mb-8">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="des-links">
                                8. Share past work links (Instagram/Behance/YouTube/Pinterest/Dribbble/Figma/Other)
                            </label>
                            <textarea
                                id="des-links"
                                required
                                rows={3}
                                value={answers.links}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Paste links here"
                            />
                        </div>

                        <div className="team-form-question mb-6 sm:mb-8">
                            <label className="team-form-question-label text-base sm:text-lg md:text-xl" htmlFor="des-otherTeams">
                                9. Are you interested in being a part of any other team? If so, please specify which team and share why you would like to join that team.
                            </label>
                            <textarea
                                id="des-otherTeams"
                                required
                                rows={3}
                                value={answers.otherTeams}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="team-form-textarea w-full text-sm sm:text-base"
                                placeholder="Technical, Sponsorship, Media, Design, Curation, Event Management or type No if you aren't interested"
                            />
                        </div>

                        <div className="team-form-submit-bar flex flex-col sm:flex-row sm:gap-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                disabled={isSubmitting}
                                className="btn btn-secondary w-full sm:w-auto text-sm sm:text-base mb-4 sm:mb-0"
                            >
                                ← Back to Basic Details
                            </button>
                            <button
                                type="submit"
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
                    </form>
                </div>
            </div>

            <div className="w-full h-[2px] bg-red" style={{ background: 'var(--color-red)' }} />
        </div>
    );
}