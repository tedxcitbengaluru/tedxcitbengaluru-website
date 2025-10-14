"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RecruitmentFAB() {
    const router = useRouter();
    const pathname = usePathname();
    const [hideOnForm, setHideOnForm] = useState(false);

    useEffect(() => {
        if (pathname !== "/joinus") {
            setHideOnForm(false);
            return;
        }
        const form = document.getElementById("recruitment-form");
        if (!form) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setHideOnForm(entry.isIntersecting);
            },
            { root: null, threshold: 0.2 }
        );
        observer.observe(form);
        return () => observer.disconnect();
    }, [pathname]);

    const isOnJoinPage = pathname === "/joinus";

    return (
        <button
            onClick={() => router.push("/joinus")}
            className="
        fixed right-4 sm:right-5 bottom-4 sm:bottom-5 z-40
        group inline-flex items-center gap-3
        rounded-full pl-6 pr-6 sm:pl-7 sm:pr-7 py-4 sm:py-4.5 min-h-[3.25rem]
        bg-gradient-to-r from-[#E62B1E] to-[#8B1E15]
        text-white text-sm sm:text-base font-semibold tracking-tight whitespace-nowrap
        shadow-[0_6px_16px_rgba(230,43,30,0.32)] ring-1 ring-white/10
        hover:shadow-[0_10px_20px_rgba(230,43,30,0.38)] hover:translate-y-[-1px]
        active:translate-y-0 transition-all duration-200
        disabled:opacity-70
      "
            aria-label="Recruitments open — Join us now"
            style={{
                opacity: hideOnForm ? 0 : 1,
                pointerEvents: hideOnForm ? "none" : "auto",
                transform: hideOnForm ? "translateY(8px)" : "translateY(0)",
                transition: "opacity 160ms ease, transform 160ms ease",
            }}
        >
            <span className="flex flex-col items-start leading-tight">
                <span className="text-[11px] sm:text-xs opacity-90">Recruitments Open</span>
                <span className="text-sm sm:text-base font-bold">Join us now</span>
            </span>
            <span className="ml-1.5 sm:ml-2 grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 group-hover:bg-white/15 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.4"
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </span>
        </button>
    );
}


