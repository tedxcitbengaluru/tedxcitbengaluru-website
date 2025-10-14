"use client";
import React from "react";

export default function SponsorshipForm() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("Submitted Sponsorship form. Backend submission can be wired next.");
    }

    return (
        <form id="recruitment-form" onSubmit={handleSubmit} className="p-2 sm:p-0">
            {/* Responsive YouTube embed */}
            <div className="mb-8">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
                        title="Sponsorship Team Intro"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-7">
                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="sp-outreach">
                        How will you reach out to small or mid-sized businesses for sponsorships or stalls?
                    </label>
                    <textarea id="sp-outreach" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Outline your outreach approach" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="sp-pitch">
                        What will you say in a call or DM to grab a sponsor’s attention?
                    </label>
                    <textarea id="sp-pitch" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Write a short pitch script" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="sp-channels">
                        Which channels or platforms will you use to find and contact small businesses?
                    </label>
                    <textarea id="sp-channels" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="e.g., Instagram, LinkedIn, local directories, WhatsApp groups" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="sp-selection">
                        How will you choose which local businesses to approach for the event?
                    </label>
                    <textarea id="sp-selection" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Selection criteria (relevance, audience fit, locality, etc.)" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="sp-relationships">
                        How will you build and maintain good relationships with sponsors?
                    </label>
                    <textarea id="sp-relationships" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Follow-ups, deliverables, updates, hospitality, post-event reports" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="sp-proposal">
                        What will you include in a simple and appealing sponsorship proposal?
                    </label>
                    <textarea id="sp-proposal" required rows={4} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Benefits, audience, visibility, tiers, pricing, timelines" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="sp-objections">
                        How will you handle a sponsor saying no or not responding?
                    </label>
                    <textarea id="sp-objections" required rows={3} className="w-full bg-transparent text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3" placeholder="Objection handling and re-engagement strategy" />
                </div>

                <div>
                    <label className="block text-base text-gray-200 mb-3" htmlFor="sp-availability">
                        Can you commit to staying online and reachable to the team and sponsors throughout the duration of the event?
                    </label>
                    <select id="sp-availability" required className="w-full bg-black text-white border border-gray-800 focus:border-[#E62B1E] focus:outline-none rounded-xl px-4 py-3">
                        <option value="" disabled>Select one</option>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Maybe (specify availability)</option>
                    </select>
                    <input id="sp-availability-notes" required className="mt-3 w-full bg-transparent text-white border-b border-gray-800 focus:border-[#E62B1E] focus:outline-none px-1 py-3" placeholder="If maybe, specify your availability" />
                </div>
            </div>

            <div className="mt-8 flex items-center justify-start">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
}


