"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define prop interface (matches the expected prop from a linker page, even if this is a static page)
interface TechnicalFormProps {
    label?: string; // Passed from parent if dynamically routed, defaults to "Technical"
}

// Define the shape for the initial data retrieved from sessionStorage
interface BasicFormData {
    name: string;
    team: string;
    // Include other basic fields you saved: collegeEmail, usn, etc.
}

// Map IDs to state keys for easy handling
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


export default function TechnicalForm({ label = "Technical" }: TechnicalFormProps) {
    const router = useRouter();
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    // 1. Data Retrieval (Runs once on load)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = sessionStorage.getItem('basicRecruitmentData');
            if (data) {
                setBasicData(JSON.parse(data));
            }
        }
    }, []);

    // 2. Universal Change Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const stateKey = formFieldMap[id];
        
        if (stateKey) {
            setAnswers(prev => ({ ...prev, [stateKey]: value }));
        }
    };

    // 3. Submission Handler
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const finalSubmissionPayload = {
            basicDetails: basicData,
            technicalDetails: answers,
            // Add a timestamp or unique ID here
        };

        try {
            // --- ACTUAL BACKEND CALL WOULD GO HERE ---
            // Example:
            // const response = await fetch('/api/submit-technical-form', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(finalSubmissionPayload),
            // });
            // if (!response.ok) throw new Error('Submission failed');
            
            console.log("Submitting Payload:", finalSubmissionPayload);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Clear data and redirect on success
            sessionStorage.removeItem('basicRecruitmentData');
            alert(`${label} application submitted successfully!`);
            router.push('/joinus/thank-you'); // Redirect to a success page

        } catch (error) {
            console.error("Submission Error:", error);
            alert("An error occurred during submission. Please try again.");
            setIsSubmitting(false);
        }
    }

    // 4. Fallback UI if basic data is missing
    if (!basicData && typeof window !== 'undefined') {
        return (
            <div className="text-center p-8 bg-red-900/20 border border-red-700 rounded-xl">
                <p className="text-xl text-red-400">Application Session Lost</p>
                <p className="text-gray-300 mt-2">
                    Please return to the <button onClick={() => router.push('/joinus')} className="text-[#E62B1E] underline">basic details page</button> to start your application.
                </p>
            </div>
        );
    }
    
    return (
        <form id="recruitment-form" onSubmit={handleSubmit} className="p-2 sm:p-0">
            
            {/* Responsive YouTube embed */}
            <div className="mb-8">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
                        title={`${label} Team Intro`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-7">
                
                {/* 1. Project */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="tech-project">
                        Share a tech project, website, or script you’ve built or contributed to. What problem did it solve?
                    </label>
                    <textarea 
                        id="tech-project" 
                        required 
                        rows={4} 
                        value={answers.project}
                        onChange={handleChange}
                        className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3 resize-none" 
                        placeholder="Describe the project, stack, and impact" 
                    />
                </div>

                {/* 2. Crazy Feature */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="tech-crazy-feature">
                        If you could build one crazy feature for TEDx — no budget limits — what would it be?
                    </label>
                    <textarea 
                        id="tech-crazy-feature" 
                        required 
                        rows={3} 
                        value={answers.crazyFeature}
                        onChange={handleChange}
                        className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3 resize-none" 
                        placeholder="Dream big" 
                    />
                </div>

                {/* 3. Incident Response */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="tech-incident">
                        A few hours before the event, the website backend for ticketing stops responding. What’s your first move?
                    </label>
                    <textarea 
                        id="tech-incident" 
                        required 
                        rows={3} 
                        value={answers.incidentResponse}
                        onChange={handleChange}
                        className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3 resize-none" 
                        placeholder="Triage steps, comms, rollback, observability" 
                    />
                </div>

                {/* 4. Portfolio Link */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="tech-portfolio">
                        Portfolio / GitHub / Website Link (Required)
                    </label>
                    <input 
                        id="tech-portfolio" 
                        required 
                        type="url" 
                        value={answers.portfolioLink}
                        onChange={handleChange}
                        className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3" 
                        placeholder="Paste a link" 
                    />
                </div>

                {/* 5. Tools and Next Steps */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="tech-tools">
                        What tools, languages, or frameworks do you vibe with right now — and what’s on your “I want to learn this next” list?
                    </label>
                    <textarea 
                        id="tech-tools" 
                        required 
                        rows={3} 
                        value={answers.toolsAndNext}
                        onChange={handleChange}
                        className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3 resize-none" 
                        placeholder="Stacks you love + next-to-learn" 
                    />
                </div>

                {/* 6. One Word */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="tech-one-word">
                        In one word — what do you bring to the team?
                    </label>
                    <input 
                        id="tech-one-word" 
                        required 
                        value={answers.oneWord}
                        onChange={handleChange}
                        className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3" 
                        placeholder="One word" 
                        maxLength={20} // Added max length for "one word" constraint
                    />
                </div>

                {/* 7. Proof Link */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="tech-proof">
                        Upload or link something that proves you build stuff — a repo, a script, an automation, even a screenshot.
                    </label>
                    <textarea 
                        id="tech-proof" 
                        required 
                        rows={3} 
                        value={answers.proofLink}
                        onChange={handleChange}
                        className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3 resize-none" 
                        placeholder="Link(s) and short context" 
                    />
                </div>

                {/* 8. Goals */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="tech-goals">
                        What do you want to learn, build, or prove here?
                    </label>
                    <textarea 
                        id="tech-goals" 
                        required 
                        rows={3} 
                        value={answers.goals}
                        onChange={handleChange}
                        className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3 resize-none" 
                        placeholder="Your goals" 
                    />
                </div>
            </div>

            {/* Submit/Back Bar */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button 
                    type="button" 
                    onClick={() => router.back()} 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gray-700/50 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-150 border border-gray-700 disabled:opacity-50"
                >
                    Back to Basic Details
                </button>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#E62B1E] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition duration-150 shadow-lg shadow-red-900/50 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <div className="flex items-center">
                            {/* Simple inline spinner/loader */}
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </div>
                    ) : 'Submit Application'}
                </button>
            </div>
        </form>
    );
}