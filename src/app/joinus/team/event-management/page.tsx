"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface EventManagementFormProps {
    label?: string;
}

interface FormAnswers {
    why: string;
    meaning: string;
    excites: string;
    pressure: string;
    teamwork: string;
    experience: string;
    prefer: string;
    strategies: string;
    tackle: string;
    portfolio: string;
    campaign: string;
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
    'em-why': 'why',
    'em-meaning': 'meaning',
    'em-excites': 'excites',
    'em-pressure': 'pressure',
    'em-teamwork': 'teamwork',
    'em-experience': 'experience',
    'em-prefer': 'prefer',
    'em-strategies': 'strategies',
    'em-tackle': 'tackle',
    'em-portfolio': 'portfolio',
    'em-campaign': 'campaign',
};

export default function EventManagementForm({ label = "Event Management" }: EventManagementFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState<FormAnswers>({
        why: '',
        meaning: '',
        excites: '',
        pressure: '',
        teamwork: '',
        experience: '',
        prefer: '',
        strategies: '',
        tackle: '',
        portfolio: '',
        campaign: '',
    });

    useEffect(() => {
        setIsClient(true);
        const data = sessionStorage.getItem('basicRecruitmentData');
        if (data) setBasicData(JSON.parse(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const stateKey = formFieldMap[id];
        if (stateKey) setAnswers(prev => ({ ...prev, [stateKey]: value }));
        setError("");
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const finalSubmissionPayload = {
            basicDetails: basicData,
            eventManagementDetails: answers,
        };

        try {
            const response = await fetch('/api/recruitment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalSubmissionPayload),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to submit application');

            sessionStorage.removeItem('basicRecruitmentData');
            router.push('/joinus/success');
        } catch (error) {
            console.error("Submission Error:", error);
            setError(error instanceof Error ? error.message : "An error occurred. Please try again.");
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

    if (!isClient) return null;

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
                                src="https://www.youtube.com/embed/iB5lyjPt14Y?autoplay=1&mute=0"
                                title="Event Management Introduction"
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
                            {Object.entries({
                                "em-why": "1. Why do you want to be part of TEDxCIT's Event Management team?",
                                "em-meaning": '2. What does "TEDx" mean to you?',
                                "em-excites": '3. What excites you most about working in event management?',
                                "em-pressure": '4. How do you handle work under pressure or tight deadlines?',
                                "em-teamwork": '5. Describe a time when you successfully worked as part of a team.',
                                "em-experience": '6. Do you have any prior experience in logistics, coordination, or event setup?',
                                "em-prefer": '7. What kind of tasks would you prefer taking up?',
                                "em-strategies": '8. Enlist 3 niche strategies for managing the team well in event management.',
                                "em-tackle": '9. Suppose you are the lead and some member(s) are not working, how will you tackle it?',
                                "em-portfolio": '10. Upload portfolio (if you have one)',
                                "em-campaign": '11. Mention a unique campaigning idea for the event.'
                            }).map(([id, labelText]) => (
                                <div className="team-form-question" key={id}>
                                    <label className="team-form-question-label" htmlFor={id}>{labelText}</label>
                                    {id === "em-portfolio" ? (
                                        <input
                                            id={id}
                                            type="url"
                                            required
                                            value={answers[formFieldMap[id] as keyof FormAnswers]}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="team-form-textarea"
                                            placeholder="Paste a portfolio link (Drive/Notion/Behance/etc.)"
                                        />
                                    ) : (
                                        <textarea
                                            id={id}
                                            required
                                            rows={3}
                                            value={answers[formFieldMap[id] as keyof FormAnswers]}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="team-form-textarea"
                                            placeholder="Your answer"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="team-form-submit-bar flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
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
                                onClick={(e) => { e.preventDefault(); handleSubmit(e as any); }}
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
