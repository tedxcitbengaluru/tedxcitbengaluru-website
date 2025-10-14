"use client";
import React from "react";

export default function MediaForm() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("Submitted Media form. Backend submission can be wired next.");
    }

    return (
        <form id="recruitment-form" onSubmit={handleSubmit} className="p-2 sm:p-0">
            {/* Responsive YouTube embed */}
            <div className="mb-8">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
                        title="Media Team Intro"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-7">
                {/* 1. Proficiency */}
                <div>
                    <label className="block text-base text-gray-200 mb-3">
                        How proficient are you with the following software?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2" htmlFor="prof-after-effects">After Effects</label>
                            <select id="prof-after-effects" required className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3">
                                <option value="" disabled>Choose level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2" htmlFor="prof-premiere">Premiere Pro</label>
                            <select id="prof-premiere" required className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3">
                                <option value="" disabled>Choose level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2" htmlFor="prof-vn">VN App</label>
                            <select id="prof-vn" required className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3">
                                <option value="" disabled>Choose level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2" htmlFor="prof-capcut">CapCut App</label>
                            <select id="prof-capcut" required className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3">
                                <option value="" disabled>Choose level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm text-gray-400 mb-2" htmlFor="prof-others">Any more? Please specify</label>
                        <input id="prof-others" required className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3" placeholder="List tools and your proficiency" />
                    </div>
                </div>

                {/* 2. Project */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="media-project">
                        Can you tell us about a media project you’re proud of?
                    </label>
                    <textarea id="media-project" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Describe the project, goals, outcome and impact" />
                </div>

                {/* 3. Inspiration */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="media-inspiration">
                        What inspires you, and how do you channel that into engaging content?
                    </label>
                    <textarea id="media-inspiration" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Your sources of inspiration and creative process" />
                </div>

                {/* 4. Exploring new tools */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="media-tools">
                        How comfortable are you with exploring new tools for trending/visual content?
                    </label>
                    <textarea id="media-tools" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Share how you learn and adapt to new tools" />
                </div>

                {/* 5. Engagement strategies */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="media-strategy">
                        What strategies do you use to make media engaging on event day and online?
                    </label>
                    <textarea id="media-strategy" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="On-ground coverage, reels, posts, captions, etc." />
                </div>

                {/* 6. Portfolio links */}
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="media-links">
                        Share past work links (Instagram/Behance/YouTube/Pinterest/Dribbble/Other)
                    </label>
                    <textarea id="media-links" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Paste any relevant links here" />
                </div>
            </div>

            <div className="mt-8 flex items-center justify-start">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
}


