"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RecruitmentFAB() {
    const router = useRouter();
    const pathname = usePathname();
    const [hideOnForm, setHideOnForm] = useState(false);

    // Start near bottom-right corner, with spacing from edges
    const [position, setPosition] = useState({ x: 92, y: 88 });

    const [isDragging, setIsDragging] = useState(false);
    const dragCoords = useRef({ clientX: 0, clientY: 0, posX: position.x, posY: position.y });

    // --- Hide when form visible ---
    useEffect(() => {
        if (!pathname.startsWith("/joinus") || pathname.length > 7) {
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

    // --- Drag logic ---
    const updatePosition = useCallback((clientX: number, clientY: number) => {
        const { clientX: startX, clientY: startY, posX: startPosX, posY: startPosY } = dragCoords.current;
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        const newX = startPosX + (deltaX / window.innerWidth) * 100;
        const newY = startPosY + (deltaY / window.innerHeight) * 100;

        setPosition({
            x: Math.max(0, Math.min(100, newX)),
            y: Math.max(0, Math.min(100, newY)),
        });
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;
            updatePosition(e.clientX, e.clientY);
        },
        [isDragging, updatePosition]
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (!isDragging || e.touches.length === 0) return;
            updatePosition(e.touches[0].clientX, e.touches[0].clientY);
            e.preventDefault();
        },
        [isDragging, updatePosition]
    );

    const handleUp = useCallback(() => setIsDragging(false), []);

    const handleStartDrag = (clientX: number, clientY: number) => {
        setIsDragging(true);
        dragCoords.current = { clientX, clientY, posX: position.x, posY: position.y };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.button !== 0) return;
        handleStartDrag(e.clientX, e.clientY);
        e.preventDefault();
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
        const touch = e.touches[0];
        handleStartDrag(touch.clientX, touch.clientY);
        e.preventDefault();
    };

    useEffect(() => {
        if (!isDragging) return;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleUp);
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleUp);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleUp);
        };
    }, [isDragging, handleMouseMove, handleTouchMove, handleUp]);

    // --- Click handler ---
    const handleFABClick = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
        if (isDragging) return;
        router.push("/joinus");
    };

    // --- Render ---
    return (
        <button
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onClick={handleFABClick}
            className={`
                fixed z-50
                group inline-flex items-center gap-4
                rounded-2xl pl-7 pr-8 py-5
                bg-[#E62B1E]/95 text-white text-base sm:text-lg font-semibold tracking-tight
                shadow-[0_12px_28px_rgba(230,43,30,0.65)] ring-1 ring-white/30
                hover:bg-[#E62B1E] hover:shadow-[0_16px_35px_rgba(230,43,30,0.8)]
                active:scale-[0.97] transition-all duration-300
                ${hideOnForm ? "opacity-0 pointer-events-none" : "opacity-100"} 
                cursor-move
            `}
            aria-label="Recruitments open — Join us now"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%)`,
                transition: isDragging
                    ? "none"
                    : "opacity 300ms ease, transform 300ms ease, box-shadow 300ms ease",
            }}
            disabled={hideOnForm}
        >
            <span className="flex flex-col items-start leading-tight">
                <span className="text-xs sm:text-sm opacity-90 uppercase tracking">
                    Recruitments Open
                </span>
                <span className="text-lg sm:text-xl font-bold">Join us now</span>
            </span>

            <span className="ml-2 grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 group-hover:bg-white/25 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-1"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </span>
        </button>
    );
}
