"use client";
import React from "react";

export default function JoinUsPage() {
    return (
        <main className="bg-black text-white min-h-screen flex flex-col">
            {/* Top Accent Line */}
            <div className="w-full h-[2px] bg-red" style={{ background: 'var(--color-red)' }} />

            <section className="section flex items-center justify-center min-h-screen">
                <div className="container flex items-center justify-center">
                    <div className="max-w-4xl mx-auto w-full">
                        {/* Header */}
                        <header className="text-center animate-fade-in-up" style={{ marginBottom: 'var(--space-3xl)' }}>
                            <h1 className="text-heading-1" style={{ marginBottom: 'var(--space-xl)' }}>
                                Recruitment <span className="text-red">Closed</span>
                            </h1>
                            <div style={{ marginBottom: 'var(--space-2xl)' }}>
                                <p className="text-body-large" style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-white)' }}>
                                    Thank you for your interest in joining TEDxCITBengaluru.
                                </p>
                                <p className="text-body" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    The application period has now concluded. We have received a significant number of applications and our team is currently reviewing all submissions.
                                </p>
                            </div>
                        </header>

                        {/* Info Box */}
                        <div 
                            className="animate-fade-in-up"
                            style={{ 
                                animationDelay: '0.2s',
                                opacity: 0,
                                padding: 'var(--space-2xl)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-2xl)'
                            }}
                        >
                            <h2 className="text-heading-2" style={{ marginBottom: 'var(--space-xl)', color: 'var(--color-white)' }}>
                                What's Next?
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                                <p className="text-body" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.7' }}>
                                    Selected candidates will be contacted via email within the coming weeks.
                                </p>
                                <p className="text-body" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.7' }}>
                                    Please check both your personal email and college email regularly, including spam folders, for updates regarding your application status.
                                </p>
                                <p className="text-body" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.7' }}>
                                    Follow us on Instagram for constant updates and announcements.
                                </p>
                            </div>
                        </div>

                        {/* Closing Message */}
                        <div 
                            className="text-center animate-fade-in-up"
                            style={{ 
                                animationDelay: '0.4s',
                                opacity: 0,
                            }}
                        >
                            <p className="text-body" style={{ marginBottom: 'var(--space-md)', color: 'rgba(255, 255, 255, 0.7)' }}>
                                We appreciate the time and effort you invested in your application.
                            </p>
                            <p className="text-caption" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                For any queries, please reach out to our team through official channels.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Accent Line */}
            <div className="w-full h-[2px] bg-red" style={{ background: 'var(--color-red)' }} />
        </main>
    );
}