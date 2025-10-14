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

const backButtonClasses = `w-full sm:w-48 bg-black hover:bg-white/20 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition duration-300 border border-white/30 disabled:opacity-50 tracking-wide shadow-lg`;
const submitButtonClasses = `w-full sm:w-48 bg-[#E62B1E] hover:bg-red-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition duration-300 shadow-lg shadow-red-900/40 disabled:opacity-50 tracking-wide`;

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
            <div className="flex justify-center min-h-screen bg-black py-12 sm:py-16">
                <div className="text-center p-8 sm:p-10 bg-red-900/20 border border-red-700 rounded-2xl max-w-md sm:max-w-lg mx-auto my-12 sm:my-16">
                    <p className="text-xl sm:text-2xl text-red-400 font-semibold">Application Session Lost</p>
                    <p className="text-white mt-4 text-sm sm:text-base">
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
        <div className="flex justify-center min-h-screen bg-black py-12 sm:py-16">
            <form
                id="recruitment-form"
                onSubmit={handleSubmit}
                className="w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32"
            >
                <header className="mb-8 sm:mb-12 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white border-b-2 border-red-700 pb-3 sm:pb-4">
                        Please answer the following questions for the <span className="text-[#E62B1E]">{label}</span> recruitment round.
                    </h1>
                </header>

                {error && (
                    <div className="mb-8 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}


                <div className="grid grid-cols-1 gap-8 sm:gap-16">
                    <div>
                        <label className="block text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5" htmlFor="des-proficiency">
                            1. How proficient are you with the following software: Figma, Adobe Photoshop, Adobe Illustrator, Canva, and any other tools? Please specify your proficiency level for each.
                        </label>
                        <textarea
                            id="des-proficiency"
                            required
                            rows={4}
                            value={answers.proficiency}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full max-w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-h-[120px] sm:min-h-[150px] resize-none transition duration-200 text-sm sm:text-base disabled:opacity-50"
                            placeholder="e.g., Figma: Advanced, Adobe Photoshop: Intermediate, Adobe Illustrator: Beginner, Canva: Expert, Sketch: Intermediate"
                        />
                    </div>

                    <div>
                        <label className="block text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5" htmlFor="des-new-tools">
                            2. How comfortable are you with trying new tools or learning on the go?
                        </label>
                        <textarea
                            id="des-new-tools"
                            required
                            rows={3}
                            value={answers.newTools}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full max-w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-h-[120px] sm:min-h-[150px] resize-none transition duration-200 text-sm sm:text-base disabled:opacity-50"
                            placeholder="Share your approach"
                        />
                    </div>

                    <div>
                        <label className="block text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5" htmlFor="des-strategies">
                            3. What strategies do you use to make an event visually and experientially engaging?
                        </label>
                        <textarea
                            id="des-strategies"
                            required
                            rows={4}
                            value={answers.strategies}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full max-w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-h-[120px] sm:min-h-[150px] resize-none transition duration-200 text-sm sm:text-base disabled:opacity-50"
                            placeholder="Share ideas across visual design and experience"
                        />
                    </div>

                    <div>
                        <label className="block text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5" htmlFor="des-project">
                            4. Tell us about a design project you're proud of and how you made it.
                        </label>
                        <textarea
                            id="des-project"
                            required
                            rows={4}
                            value={answers.project}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full max-w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-h-[120px] sm:min-h-[150px] resize-none transition duration-200 text-sm sm:text-base disabled:opacity-50"
                            placeholder="Process, tools, outcome"
                        />
                    </div>

                    <div>
                        <label className="block text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5" htmlFor="des-trends">
                            5. What latest trends in design and technology excite you, and how do you use them?
                        </label>
                        <textarea
                            id="des-trends"
                            required
                            rows={3}
                            value={answers.trends}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full max-w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-h-[120px] sm:min-h-[150px] resize-none transition duration-200 text-sm sm:text-base disabled:opacity-50"
                            placeholder="Trends and applications"
                        />
                    </div>

                    <div>
                        <label className="block text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5" htmlFor="des-inspiration">
                            6. What inspires your creative work, and how do you translate it into tangible projects?
                        </label>
                        <textarea
                            id="des-inspiration"
                            required
                            rows={3}
                            value={answers.inspiration}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full max-w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-h-[120px] sm:min-h-[150px] resize-none transition duration-200 text-sm sm:text-base disabled:opacity-50"
                            placeholder="Inspiration and execution"
                        />
                    </div>

                    <div>
                        <label className="block text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5" htmlFor="des-communication">
                            7. TEDx designs often need coordination with curation and tech — how do you communicate your ideas?
                        </label>
                        <textarea
                            id="des-communication"
                            required
                            rows={3}
                            value={answers.communication}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full max-w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-h-[120px] sm:min-h-[150px] resize-none transition duration-200 text-sm sm:text-base disabled:opacity-50"
                            placeholder="Handoffs, feedback loops, tools"
                        />
                    </div>

                    <div>
                        <label className="block text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5" htmlFor="des-links">
                            8. Share past work links (Instagram/Behance/YouTube/Pinterest/Dribbble/Figma/Other)
                        </label>
                        <textarea
                            id="des-links"
                            required
                            rows={3}
                            value={answers.links}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full max-w-full bg-transparent text-white border border-white/20 focus:border-[#E62B1E] focus:outline-none rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-h-[120px] sm:min-h-[150px] resize-none transition duration-200 text-sm sm:text-base disabled:opacity-50"
                            placeholder="Paste links here"
                        />
                    </div>
                </div>

                <div className="mt-12 sm:mt-24 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-8 sm:py-10 border-t border-white/20">
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