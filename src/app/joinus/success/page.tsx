"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
    const router = useRouter();

    useEffect(() => {
        // Optional: Redirect to home after 5 seconds
        const timeout = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="text-center p-10 bg-green-900/20 border border-green-700 rounded-2xl max-w-2xl mx-auto">
                <div className="mb-6">
                    <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    Application Submitted Successfully!
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                    Thank you for applying to <span className="text-[#E62B1E] font-semibold">TEDxCITBengaluru</span>
                </p>
                <p className="text-gray-400 mb-8">
                    We've received your application and will review it shortly. You'll hear from us soon. Do check your college mail for future updates!
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-[#E62B1E] hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
}