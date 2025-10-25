"use client";
import React from "react";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export default function JoinUsPage() {
    return (
        <main className="bg-black text-white min-h-screen flex flex-col">
            {/* Top Accent Line */}
            <div className="w-full h-[2px] bg-red" />

            <section className="section flex items-center justify-center min-h-screen">
                <div className="container max-w-4xl">
                    
                    {/* Header */}
                    <header className="text-center animate-fade-in-up" style={{ marginBottom: 'var(--space-3xl)' }}>
                        {/* <div className="hero-badge" style={{ marginBottom: 'var(--space-xl)' }}>
                            <span className="hero-badge-text">Applications Closed</span>
                        </div> */}
                        
                        <h1 className="text-display" style={{ marginBottom: 'var(--space-lg)' }}>
                            Recruitment <span className="text-red">Closed</span>
                        </h1>
                        
                        <p className="text-body-large" style={{ 
                            color: 'rgba(255, 255, 255, 0.85)',
                            marginBottom: 'var(--space-md)'
                        }}>
                            Thank you for your interest in TEDxCITBengaluru
                        </p>
                        
                        <p className="text-body content-width" style={{ 
                            color: 'rgba(255, 255, 255, 0.6)',
                            margin: '0 auto'
                        }}>
                            We are carefully reviewing all applications. Selected candidates will be notified via email.
                        </p>
                    </header>

                    {/* Timeline Section */}
                    <div 
                        className="animate-fade-in-up"
                        style={{ 
                            animationDelay: '0.2s',
                            opacity: 0,
                            marginBottom: 'var(--space-3xl)',
                            position: 'relative'
                        }}
                    >
                        <h2 className="text-heading-2" style={{ marginBottom: 'var(--space-2xl)' }}>
                            Next Steps
                        </h2>
                        
                        <div style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-xl)',
                            position: 'relative'
                        }}>
                            {/* Vertical Timeline Line */}
                            <div style={{
                                position: 'absolute',
                                left: '11px',
                                top: '32px',
                                bottom: '32px',
                                width: '2px',
                                background: 'linear-gradient(180deg, var(--color-red) 0%, rgba(220, 38, 38, 0.3) 100%)'
                            }} />
                            
                            {/* Timeline Item 1 */}
                            <div style={{ 
                                display: 'flex',
                                gap: 'var(--space-lg)',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: 'var(--color-red)',
                                    border: '4px solid var(--color-black)',
                                    flexShrink: 0,
                                    position: 'relative',
                                    zIndex: 1
                                }} />
                                <div style={{ flex: 1, paddingTop: '2px' }}>
                                    <h3 className="text-body-large" style={{ 
                                        fontWeight: 600,
                                        marginBottom: 'var(--space-sm)',
                                        color: 'var(--color-white)'
                                    }}>
                                        Review in Progress
                                    </h3>
                                    <p className="text-body" style={{ 
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        lineHeight: 1.7
                                    }}>
                                        Our team is evaluating all submissions with care and attention.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline Item 2 */}
                            <div style={{ 
                                display: 'flex',
                                gap: 'var(--space-lg)',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: 'var(--color-red)',
                                    border: '4px solid var(--color-black)',
                                    flexShrink: 0,
                                    position: 'relative',
                                    zIndex: 1
                                }} />
                                <div style={{ flex: 1, paddingTop: '2px' }}>
                                    <h3 className="text-body-large" style={{ 
                                        fontWeight: 600,
                                        marginBottom: 'var(--space-sm)',
                                        color: 'var(--color-white)'
                                    }}>
                                        Email Notifications
                                    </h3>
                                    <p className="text-body" style={{ 
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        lineHeight: 1.7
                                    }}>
                                        Check both your personal and college email regularly, including spam folders.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline Item 3 */}
                            <div style={{ 
                                display: 'flex',
                                gap: 'var(--space-lg)',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: 'rgba(220, 38, 38, 0.4)',
                                    border: '4px solid var(--color-black)',
                                    flexShrink: 0,
                                    position: 'relative',
                                    zIndex: 1
                                }} />
                                <div style={{ flex: 1, paddingTop: '2px' }}>
                                    <h3 className="text-body-large" style={{ 
                                        fontWeight: 600,
                                        marginBottom: 'var(--space-sm)',
                                        color: 'var(--color-white)'
                                    }}>
                                        Stay Connected
                                    </h3>
                                    <p className="text-body" style={{ 
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        lineHeight: 1.7
                                    }}>
                                        Follow us for updates, announcements, and behind-the-scenes content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div 
                        className="animate-fade-in-up"
                        style={{ 
                            animationDelay: '0.4s',
                            opacity: 0,
                            padding: 'var(--space-2xl) 0',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            marginBottom: 'var(--space-2xl)'
                        }}
                    >
                        <h3 className="text-heading-2" style={{ 
                            textAlign: 'center',
                            marginBottom: 'var(--space-xl)'
                        }}>
                            Stay Updated
                        </h3>
                        
                        <div style={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 'var(--space-2xl)',
                            flexWrap: 'wrap'
                        }}>
                            <a
                                href="https://www.instagram.com/tedxcitbengaluru/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    textDecoration: 'none',
                                    color: 'var(--color-white)',
                                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                className="social-link"
                                aria-label="Follow us on Instagram"
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}>
                                    <Instagram size={28} />
                                </div>
                                <span className="text-caption" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    Instagram
                                </span>
                            </a>
                            
                            <a
                                href="https://www.linkedin.com/company/tedxcitbengaluru/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    textDecoration: 'none',
                                    color: 'var(--color-white)',
                                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                className="social-link"
                                aria-label="Follow us on LinkedIn"
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}>
                                    <Linkedin size={28} />
                                </div>
                                <span className="text-caption" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    LinkedIn
                                </span>
                            </a>
                            
                            <a
                                href="https://youtube.com/@tedxcitbengaluru?si=-nGEuzBrCFst98i6"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    textDecoration: 'none',
                                    color: 'var(--color-white)',
                                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                className="social-link"
                                aria-label="Subscribe on YouTube"
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}>
                                    <Youtube size={28} />
                                </div>
                                <span className="text-caption" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    YouTube
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <div 
                        className="text-center animate-fade-in-up"
                        style={{ 
                            animationDelay: '0.6s',
                            opacity: 0,
                            paddingTop: 'var(--space-xl)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                    >
                        <p className="text-body" style={{ 
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginBottom: 'var(--space-sm)'
                        }}>
                            We appreciate the time and effort you invested in your application
                        </p>
                        <p className="text-caption" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                            For queries, reach out through our official channels
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom Accent Line */}
            <div className="w-full h-[2px] bg-red" />

            <style jsx>{`
                .social-link:hover {
                    transform: translateY(-4px);
                }
                
                .social-link:hover > div {
                    border-color: rgba(220, 38, 38, 0.5);
                    background: rgba(220, 38, 38, 0.1);
                }
            `}</style>
        </main>
    );
}