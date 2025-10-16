"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CurationFormProps {
    label?: string;
}

interface FormAnswers {
    writingProficiency: string;
    captions: string;
    themes: string;
    resonate: string;
    philosophy: string;
    why: string;
    ai: string;
    enhance: string;
    imageDesc: string;
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
    'curation-writing-proficiency': 'writingProficiency',
    'curation-captions': 'captions',
    'curation-themes': 'themes',
    'curation-resonate': 'resonate',
    'curation-philosophy': 'philosophy',
    'curation-why': 'why',
    'curation-ai': 'ai',
    'curation-enhance': 'enhance',
    'curation-image-desc': 'imageDesc',
    'curation-other-teams': 'otherTeams',
};

export default function CurationForm({ label = "Curation" }: CurationFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState<FormAnswers>({
        writingProficiency: '',
        captions: '',
        themes: '',
        resonate: '',
        philosophy: '',
        why: '',
        ai: '',
        enhance: '',
        imageDesc: '',
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
            curationDetails: answers,
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
                                src="https://www.youtube.com/embed/M71r_Jmmsd4?autoplay=1&mute=0"
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
                                <label className="team-form-question-label" htmlFor="curation-writing-proficiency">
                                    1. How proficient are you with creative writing skills? Please describe your experience and self-assessed proficiency level.
                                </label>
                                <textarea
                                    id="curation-writing-proficiency"
                                    required
                                    rows={3}
                                    value={answers.writingProficiency}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="e.g., I have written short stories and blog posts for 2 years, self-assessed proficiency: 8/10"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="curation-captions">
                                    2. Write 3 eye-catching captions related to the image.
                                </label>

                                <div className="curation-image-grid" style={{ marginBottom: 'var(--space-lg)' }}>
                                    <div className="curation-image-wrapper">
                                        <img
                                            src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760461420/Picture3_wtdno4.png"
                                            alt="First image for captions"
                                            className="curation-image"
                                        />
                                    </div>
                                    <div className="curation-image-wrapper">
                                        <img
                                            src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760461420/Picture2_yflw5y.png"
                                            alt="Second image for captions"
                                            className="curation-image"
                                        />
                                    </div>
                                </div>

                                <textarea
                                    id="curation-captions"
                                    required
                                    rows={4}
                                    value={answers.captions}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Write three options separated by new lines"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="curation-themes">
                                    3. Based on the video, suggest at least two theme ideas for the next TEDx event along with taglines.
                                </label>
                                
                                <div className="team-form-video-container" style={{ marginBottom: 'var(--space-lg)' }}>
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/PY_kd46RfVE?autoplay=0&mute=1"
                                        title="Margaret Heffernan: Dare to Disagree"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded-xl"
                                    ></iframe>
                                </div>

                                <textarea
                                    id="curation-themes"
                                    required
                                    rows={4}
                                    value={answers.themes}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Theme idea + short tagline for each"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="curation-resonate">
                                    4. Which movie/book/music/series do you resonate with most and how did it impact you?
                                </label>
                                <textarea
                                    id="curation-resonate"
                                    required
                                    rows={4}
                                    value={answers.resonate}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Explain briefly"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="curation-philosophy">
                                    5. Share a philosophical thought or an idea that you find particularly fascinating.
                                </label>
                                <textarea
                                    id="curation-philosophy"
                                    required
                                    rows={3}
                                    value={answers.philosophy}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Your idea"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="curation-why">
                                    6. Why have you chosen curation?
                                </label>
                                <textarea
                                    id="curation-why"
                                    required
                                    rows={3}
                                    value={answers.why}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Your motivation"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="curation-ai">
                                    7. When we have AI for content, why do you think we need a team of curators?
                                </label>
                                <textarea
                                    id="curation-ai"
                                    required
                                    rows={3}
                                    value={answers.ai}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Your perspective"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="curation-enhance">
                                    8. In what aspects would you enhance a given content?
                                </label>
                                <textarea
                                    id="curation-enhance"
                                    required
                                    rows={3}
                                    value={answers.enhance}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Structure, tone, hooks, call-to-action, etc."
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="curation-image-desc">
                                    9. For a given image, give us a description based on your creativity.
                                </label>
                                
                                <div className="curation-single-image" style={{ marginBottom: 'var(--space-lg)' }}>
                                    <img
                                        src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760461419/Picture1_oel361.png"
                                        alt="Inspiring TEDx stage with vibrant lighting and an engaged audience"
                                        className="curation-image"
                                    />
                                </div>

                                <textarea
                                    id="curation-image-desc"
                                    required
                                    rows={3}
                                    value={answers.imageDesc}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Write an evocative description"
                                />
                            </div>

                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="curation-other-teams">
                                    10. Are you interested in being a part of any other team? If so, please specify which team and share why you would like to join that team.
                                </label>
                                <textarea
                                    id="curation-other-teams"
                                    required
                                    rows={3}
                                    value={answers.otherTeams}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Technical, Sponsorship, Media, Design, Curation, Event Management or type No if you aren't interested"
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