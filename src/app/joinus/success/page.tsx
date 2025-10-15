"use client";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <div className="w-full h-[2px]" style={{ background: 'var(--color-red)' }} />
            
            <div className="section flex-1 flex items-center justify-center">
                <div className="container-center">
                    <div className="max-w-3xl mx-auto w-full text-center">
                        {/* Success Icon */}
                        <div className="animate-fade-in-up mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 mb-6" style={{ backgroundColor: 'rgba(230, 43, 30, 0.1)', borderColor: 'var(--color-red)' }}>
                                <svg 
                                    className="w-12 h-12" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    style={{ color: 'var(--color-red)' }}
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2.5} 
                                        d="M5 13l4 4L19 7" 
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
                            <h1 className="text-heading-1" style={{ marginBottom: 'var(--space-lg)', color: 'white' }}>
                                Application Submitted <span className="text-red">Successfully!</span>
                            </h1>
                            
                            <div className="text-body" style={{ marginBottom: 'var(--space-2xl)', color: '#d1d5db' }}>
                                <p style={{ marginBottom: 'var(--space-md)' }}>
                                    Thank you for applying to <span className="text-red font-semibold">TEDxCITBengaluru</span>.
                                </p>
                                <p style={{ marginBottom: 'var(--space-md)' }}>
                                    We've received your application and our team will review it carefully. 
                                    You'll hear from us soon regarding the next steps.
                                </p>
                                <p className="text-sm" style={{ color: '#9ca3af' }}>
                                    <strong style={{ color: 'white' }}>Important:</strong> Please check your college email regularly for updates and further instructions.
                                </p>
                            </div>

                            {/* Action Button */}
                            <div className="flex items-center justify-center" style={{ marginBottom: 'var(--space-xl)' }}>
                                <button
                                    onClick={() => router.push('/')}
                                    className="btn btn-primary"
                                >
                                    Return to Home
                                </button>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div 
                            className="animate-fade-in-up mt-16 pt-8"
                            style={{ animationDelay: '0.4s', opacity: 0, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
                        >
                            <p className="text-sm" style={{ color: '#6b7280' }}>
                                Questions? Reach out to us at{' '}
                                <a 
                                    href="mailto:tedxcitbengaluru@cambridge.edu.in" 
                                    className="text-red hover:underline transition"
                                >
                                    tedxcitbengaluru@cambridge.edu.in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[2px]" style={{ background: 'var(--color-red)' }} />
        </div>
    );
}