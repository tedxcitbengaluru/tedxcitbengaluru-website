'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import SocialSidebar from '@/components/layout/social-sidebar';
import Footer from '@/components/layout/footer';
import Link from 'next/link';

export default function MediaRecruitmentPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        year: '',
        department: '',
        experience: '',
        skills: '',
        portfolio: '',
        motivation: '',
        availability: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-black">
            <Header />
            <SocialSidebar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-16 bg-black border-b border-red/10">
                    <div className="container">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="flex items-center justify-center mb-6">
                                <Link
                                    href="/recruitment"
                                    className="text-white/60 hover:text-white transition-colors duration-300 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to Recruitment
                                </Link>
                            </div>

                            <div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>

                            <h1 className="text-heading-1 font-bold leading-tight mb-6">
                                Media <span className="text-red">Team</span>
                            </h1>
                            <p className="text-body-large text-white/80 leading-relaxed">
                                Join our media team and help us create compelling content, manage our digital presence,
                                and tell the stories that inspire change.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Role Description */}
                <section className="py-16 bg-black">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Responsibilities */}
                                <div>
                                    <h2 className="text-heading-2 font-bold mb-6">
                                        What You'll <span className="text-red">Do</span>
                                    </h2>
                                    <div className="space-y-4">
                                        {[
                                            'Create engaging content for social media platforms',
                                            'Design graphics, posters, and promotional materials',
                                            'Manage photography and videography for events',
                                            'Develop content strategies and campaigns',
                                            'Collaborate with speakers and team members'
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-1 h-1 bg-red rounded-full mt-3 flex-shrink-0"></div>
                                                <p className="text-body text-white/80">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Requirements */}
                                <div>
                                    <h2 className="text-heading-2 font-bold mb-6">
                                        What We're <span className="text-red">Looking For</span>
                                    </h2>
                                    <div className="space-y-4">
                                        {[
                                            'Creative thinking and visual design skills',
                                            'Experience with design tools (Photoshop, Illustrator, etc.)',
                                            'Social media management and content creation',
                                            'Photography or videography skills (preferred)',
                                            'Strong communication and storytelling abilities'
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-1 h-1 bg-red rounded-full mt-3 flex-shrink-0"></div>
                                                <p className="text-body text-white/80">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Application Form */}
                <section className="py-16 bg-black border-t border-red/10">
                    <div className="container">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-heading-2 font-bold text-center mb-12">
                                Apply for <span className="text-red">Media Team</span>
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Academic Year *</label>
                                        <select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white focus:border-red focus:outline-none transition-colors duration-300"
                                        >
                                            <option value="">Select your year</option>
                                            <option value="1st">1st Year</option>
                                            <option value="2nd">2nd Year</option>
                                            <option value="3rd">3rd Year</option>
                                            <option value="4th">4th Year</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Department *</label>
                                        <input
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                            placeholder="Enter your department"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Media Experience *</label>
                                        <select
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white focus:border-red focus:outline-none transition-colors duration-300"
                                        >
                                            <option value="">Select experience level</option>
                                            <option value="beginner">Beginner (0-1 years)</option>
                                            <option value="intermediate">Intermediate (1-3 years)</option>
                                            <option value="advanced">Advanced (3+ years)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Media Skills & Tools *</label>
                                    <textarea
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                        placeholder="List your skills: design tools, social media platforms, photography, videography, writing, etc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Portfolio/Previous Work</label>
                                    <textarea
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                        placeholder="Share links to your portfolio, previous work, or describe your creative projects"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Why do you want to join the Media Team? *</label>
                                    <textarea
                                        name="motivation"
                                        value={formData.motivation}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                        placeholder="Tell us about your passion for media and what you hope to contribute"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Availability *</label>
                                    <textarea
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                        placeholder="How many hours per week can you commit? What days/times work best for you?"
                                    />
                                </div>

                                <div className="text-center pt-6">
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-12 py-4 text-lg"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
