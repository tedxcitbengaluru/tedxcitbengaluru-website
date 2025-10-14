"use client";
import React from "react";

export default function CurationForm() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("Submitted Curation form. Backend submission can be wired next.");
    }

    return (
        <form id="recruitment-form" onSubmit={handleSubmit} className="p-2 sm:p-0">
            {/* Responsive YouTube embed */}
            <div className="mb-8">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
                        title="Curation Team Intro"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-7">
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="curation-writing-proficiency">
                        On a scale of 1–10, how proficient are you with creative writing skills?
                    </label>
                    <input id="curation-writing-proficiency" required type="number" min={1} max={10} className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3" placeholder="Enter a number from 1 to 10" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="curation-captions">
                        Write 3 eye-catching captions related to the image.
                    </label>
                    <textarea id="curation-captions" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Write three options separated by new lines" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="curation-themes">
                        Based on the video, suggest at least two theme ideas for the next TEDx event along with taglines.
                    </label>
                    <textarea id="curation-themes" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Theme idea + short tagline for each" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="curation-resonate">
                        Which movie/book/music/series do you resonate with most and how did it impact you?
                    </label>
                    <textarea id="curation-resonate" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Explain briefly" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="curation-philosophy">
                        Share a philosophical thought or an idea that you find particularly fascinating.
                    </label>
                    <textarea id="curation-philosophy" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Your idea" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="curation-why">
                        Why have you chosen curation?
                    </label>
                    <textarea id="curation-why" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Your motivation" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="curation-ai">
                        When we have AI for content, why do you think we need a team of curators?
                    </label>
                    <textarea id="curation-ai" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Your perspective" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="curation-enhance">
                        In what aspects would you enhance a given content?
                    </label>
                    <textarea id="curation-enhance" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Structure, tone, hooks, call-to-action, etc." />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="curation-image-desc">
                        For a given image, give us a description based on your creativity.
                    </label>
                    <textarea id="curation-image-desc" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Write an evocative description" />
                </div>
            </div>

            <div className="mt-8 flex items-center justify-start">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
}


