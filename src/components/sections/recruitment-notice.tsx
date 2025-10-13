'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RecruitmentNotice() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <section className="relative bg-red border-y border-red/20">
            <div className="container py-6">
                <div className="flex items-center justify-between">
                    {/* Notice Content */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-white font-semibold text-body tracking-wider uppercase">
                                Recruitment Open
                            </span>
                        </div>
                        <span className="text-white/80 text-body">
                            Join our team and be part of something extraordinary
                        </span>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/recruitment"
                            className="btn bg-white text-red hover:bg-white/90 font-semibold px-6 py-2 text-sm tracking-wider uppercase transition-all duration-300"
                        >
                            Join Us Now
                        </Link>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-white/80 hover:text-white transition-colors duration-300 p-1"
                            aria-label="Close notice"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
