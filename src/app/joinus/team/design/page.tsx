"use client";
import React from "react";

export default function DesignForm() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("Submitted Design form. Backend submission can be wired next.");
    }

    return (
        <form id="recruitment-form" onSubmit={handleSubmit} className="p-2 sm:p-0">
            {/* Responsive YouTube embed */}
            <div className="mb-8">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
                        title="Design Team Intro"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-7">
                <div>
                    <label className="block text-base text-gray-200 mb-3">
                        How proficient are you with the following software?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2" htmlFor="des-figma">Figma</label>
                            <select id="des-figma" required className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3">
                                <option value="" disabled>Choose level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2" htmlFor="des-ps">Adobe Photoshop</label>
                            <select id="des-ps" required className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3">
                                <option value="" disabled>Choose level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2" htmlFor="des-ai">Adobe Illustrator</label>
                            <select id="des-ai" required className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3">
                                <option value="" disabled>Choose level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2" htmlFor="des-canva">Canva</label>
                            <select id="des-canva" required className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3">
                                <option value="" disabled>Choose level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="des-new-tools">
                        How comfortable are you with trying new tools or learning on the go?
                    </label>
                    <textarea id="des-new-tools" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Share your approach" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="des-strategies">
                        What strategies do you use to make an event visually and experientially engaging?
                    </label>
                    <textarea id="des-strategies" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Share ideas across visual design and experience" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="des-project">
                        Tell us about a design project you’re proud of and how you made it.
                    </label>
                    <textarea id="des-project" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Process, tools, outcome" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="des-trends">
                        What latest trends in design and technology excite you, and how do you use them?
                    </label>
                    <textarea id="des-trends" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Trends and applications" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="des-inspiration">
                        What inspires your creative work, and how do you translate it into tangible projects?
                    </label>
                    <textarea id="des-inspiration" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Inspiration and execution" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="des-communication">
                        TEDx designs often need coordination with curation and tech — how do you communicate your ideas?
                    </label>
                    <textarea id="des-communication" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Handoffs, feedback loops, tools" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="des-links">
                        Share past work links (Instagram/Behance/YouTube/Pinterest/Dribbble/Figma/Other)
                    </label>
                    <textarea id="des-links" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Paste links here" />
                </div>
            </div>

            <div className="mt-8 flex items-center justify-start">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
}


