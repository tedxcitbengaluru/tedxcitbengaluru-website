"use client";
import React from "react";

export default function EventManagementForm() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("Submitted Event Management form. Backend submission can be wired next.");
    }

    return (
        <form id="recruitment-form" onSubmit={handleSubmit} className="p-2 sm:p-0">
            {/* Responsive YouTube embed */}
            <div className="mb-8">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
                        title="Event Management Team Intro"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-7">
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-why">
                        Why do you want to be part of TEDxCIT’s Event Management team?
                    </label>
                    <textarea id="em-why" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Your motivation" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-meaning">
                        What does “TEDx” mean to you?
                    </label>
                    <textarea id="em-meaning" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Your understanding of TEDx" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-excites">
                        What excites you most about working in event management?
                    </label>
                    <textarea id="em-excites" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="What energizes you" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-pressure">
                        How do you handle work under pressure or tight deadlines?
                    </label>
                    <textarea id="em-pressure" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Give examples if possible" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-teamwork">
                        Describe a time when you successfully worked as part of a team.
                    </label>
                    <textarea id="em-teamwork" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Your experience" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-experience">
                        Do you have any prior experience in logistics, coordination, or event setup?
                    </label>
                    <textarea id="em-experience" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Describe relevant experience" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-prefer">
                        What kind of tasks would you prefer taking up?
                    </label>
                    <textarea id="em-prefer" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="e.g., logistics, stage, hospitality, registrations, backstage" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-strategies">
                        Enlist 3 niche strategies for managing the team well in event management.
                    </label>
                    <textarea id="em-strategies" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Bullet points or short sentences" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-tackle">
                        Suppose you're the lead and some member(s) are not working, how will you tackle it?
                    </label>
                    <textarea id="em-tackle" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Conflict resolution and accountability" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-portfolio">
                        Upload portfolio (if you have one)
                    </label>
                    <input id="em-portfolio" required type="url" className="w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3" placeholder="Paste a portfolio link (Drive/Notion/Behance/etc.)" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="em-campaign">
                        Mention a unique campaigning idea for the event.
                    </label>
                    <textarea id="em-campaign" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Your idea" />
                </div>
            </div>

            <div className="mt-8 flex items-center justify-start">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
}


