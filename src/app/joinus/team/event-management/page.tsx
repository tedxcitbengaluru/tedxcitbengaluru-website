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
    'em-otherTeams': 'otherTeams',
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
        otherTeams: '',
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

    if (!isClient) return null;

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

                        <div 
                            id="recruitment-form"
                            className="team-form-questions animate-fade-in-up" 
                            style={{ animationDelay: '0.4s', opacity: 0 }}
                        >
                            {/* Question 1 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-why">
                                    1. Why do you want to be part of TEDxCIT's Event Management team?
                                </label>
                                <textarea
                                    id="em-why"
                                    required
                                    rows={3}
                                    value={answers.why}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Share your motivation and what draws you to event management"
                                />
                            </div>

                            {/* Question 2 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-meaning">
                                    2. What does "TEDx" mean to you?
                                </label>
                                <textarea
                                    id="em-meaning"
                                    required
                                    rows={3}
                                    value={answers.meaning}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Your understanding and perspective"
                                />
                            </div>

                            {/* Question 3 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-excites">
                                    3. What excites you most about working in event management?
                                </label>
                                <textarea
                                    id="em-excites"
                                    required
                                    rows={3}
                                    value={answers.excites}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="What aspects of event management energize you?"
                                />
                            </div>

                            {/* Question 4 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-pressure">
                                    4. How do you handle work under pressure or tight deadlines?
                                </label>
                                <textarea
                                    id="em-pressure"
                                    required
                                    rows={3}
                                    value={answers.pressure}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Describe your approach and give an example if possible"
                                />
                            </div>

                            {/* Question 5 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-teamwork">
                                    5. Describe a time when you successfully worked as part of a team.
                                </label>
                                <textarea
                                    id="em-teamwork"
                                    required
                                    rows={4}
                                    value={answers.teamwork}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Share a specific example with context and outcome"
                                />
                            </div>

                            {/* Question 6 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-experience">
                                    6. Do you have any prior experience in logistics, coordination, or event setup?
                                </label>
                                <textarea
                                    id="em-experience"
                                    required
                                    rows={3}
                                    value={answers.experience}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="List any relevant experience or type 'None' if you're starting fresh"
                                />
                            </div>

                            {/* Question 7 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-prefer">
                                    7. What kind of tasks would you prefer taking up?
                                </label>
                                <textarea
                                    id="em-prefer"
                                    required
                                    rows={3}
                                    value={answers.prefer}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="E.g., logistics, vendor coordination, on-ground execution, planning, etc."
                                />
                            </div>

                            {/* Question 8 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-strategies">
                                    8. Enlist 3 niche strategies for managing the team well in event management.
                                </label>
                                <textarea
                                    id="em-strategies"
                                    required
                                    rows={4}
                                    value={answers.strategies}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="List three specific strategies with brief explanations"
                                />
                            </div>

                            {/* Question 9 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-tackle">
                                    9. Suppose you are the lead and some member(s) are not working, how will you tackle it?
                                </label>
                                <textarea
                                    id="em-tackle"
                                    required
                                    rows={4}
                                    value={answers.tackle}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Describe your leadership approach to handling underperformance"
                                />
                            </div>

                            {/* Question 10 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-portfolio">
                                    10. Upload portfolio & attach your social handles (if you have one)
                                </label>
                                <input
                                    id="em-portfolio"
                                    type="url"
                                    required
                                    value={answers.portfolio}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-input-url"
                                    placeholder="Paste a portfolio link (Drive/Notion/Behance/etc.)"
                                />
                            </div>

                            {/* Question 11 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-campaign">
                                    11. Mention a unique campaigning idea for the event.
                                </label>
                                <textarea
                                    id="em-campaign"
                                    required
                                    rows={4}
                                    value={answers.campaign}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Share a creative and unique campaign idea for TEDxCIT"
                                />
                            </div>

                            {/* Question 12 */}
                            <div className="team-form-question">
                                <label className="team-form-question-label" htmlFor="em-otherTeams">
                                    12. Are you interested in being a part of any other team? If so, please specify which team and share why you would like to join that team.
                                </label>
                                <textarea
                                    id="em-otherTeams"
                                    required
                                    rows={3}
                                    value={answers.otherTeams}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="team-form-textarea"
                                    placeholder="Technical, Sponsorship, Media, Design, Curation, Event Management or type 'No' if you aren't interested"
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