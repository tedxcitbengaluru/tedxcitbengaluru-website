'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import SocialSidebar from '@/components/layout/social-sidebar';
import Footer from '@/components/layout/footer';
import Link from 'next/link';

export default function SponsorshipRecruitmentPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        year: '',
        department: '',
        experience: '',
        skills: '',
        network: '',
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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>

                            <h1 className="text-heading-1 font-bold leading-tight mb-6">
                                Sponsorship <span className="text-red">Team</span>
                            </h1>
                            <p className="text-body-large text-white/80 leading-relaxed">
                                Join our sponsorship team and help us build meaningful partnerships,
                                secure funding, and create opportunities for our events to reach new heights.
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
                                            'Identify and reach out to potential sponsors and partners',
                                            'Develop sponsorship proposals and packages',
                                            'Maintain relationships with existing sponsors',
                                            'Coordinate sponsor benefits and deliverables',
                                            'Track sponsorship metrics and ROI'
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
                                            'Strong communication and negotiation skills',
                                            'Experience in sales, marketing, or business development',
                                            'Networking abilities and relationship building',
                                            'Understanding of sponsorship and partnership dynamics',
                                            'Goal-oriented and results-driven mindset'
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
                                Apply for <span className="text-red">Sponsorship Team</span>
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
                                        <label className="block text-white font-semibold mb-2">Business/Sales Experience *</label>
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
                                    <label className="block text-white font-semibold mb-2">Relevant Skills *</label>
                                    <textarea
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                        placeholder="List your skills: communication, negotiation, sales, marketing, networking, etc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Professional Network</label>
                                    <textarea
                                        name="network"
                                        value={formData.network}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                        placeholder="Describe your professional network, connections, or previous business relationships"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Why do you want to join the Sponsorship Team? *</label>
                                    <textarea
                                        name="motivation"
                                        value={formData.motivation}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-black border border-red/20 rounded-lg text-white placeholder-white/40 focus:border-red focus:outline-none transition-colors duration-300"
                                        placeholder="Tell us about your interest in partnerships and what you hope to achieve"
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
