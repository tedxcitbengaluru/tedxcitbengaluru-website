"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RecruitmentFAB() {
    const router = useRouter();
    const pathname = usePathname();
    const [hideOnForm, setHideOnForm] = useState(false);
    
    // Initial position changed to bottom-right corner (better standard UX)
    const [position, setPosition] = useState({ x: 90, y: 85 }); 
    
    const [isDragging, setIsDragging] = useState(false);
    
    // Use ref to store coordinates to avoid complex dependency arrays
    const dragCoords = useRef({ clientX: 0, clientY: 0, posX: position.x, posY: position.y });

    // --- Intersection Observer (Hiding Logic) ---
    useEffect(() => {
        // Correct check for the base joinus page
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


    // --- Draggable Logic: Handlers (Native DOM versions created via useCallback) ---

    // Function to calculate and update position
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

    // Native Mouse Move Handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        updatePosition(e.clientX, e.clientY);
    }, [isDragging, updatePosition]);

    // Native Touch Move Handler
    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging || e.touches.length === 0) return;
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault(); // Prevent scrolling
    }, [isDragging, updatePosition]);

    // Native End Drag Handler
    const handleUp = useCallback(() => {
        setIsDragging(false);
    }, []);
    
    // React Start Drag Handler
    const handleStartDrag = (clientX: number, clientY: number) => {
        setIsDragging(true);
        // Store current position state for calculation reference
        dragCoords.current = { clientX, clientY, posX: position.x, posY: position.y };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent accidental navigation if the click intent was to drag
        if (e.button !== 0) return; 
        handleStartDrag(e.clientX, e.clientY);
        e.preventDefault();
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
        const touch = e.touches[0];
        handleStartDrag(touch.clientX, touch.clientY);
        e.preventDefault();
    };
    
    // --- Draggable Logic: Event Listener Management ---

    useEffect(() => {
        if (!isDragging) return;

        // Attach listeners globally using native functions
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleUp);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleUp);
        
        // Cleanup function removes listeners reliably
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleUp);
        };
    }, [isDragging, handleMouseMove, handleTouchMove, handleUp]);


    // --- Render ---

    const handleFABClick = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
        // If the click started and ended at the same approximate location, treat it as a click/navigation.
        // We use a small threshold to allow minor jitters, but since handleUp/handleEnd already
        // set isDragging to false, we just need to prevent navigation during drag start.
        
        if (isDragging) return;
        router.push("/joinus");
    };
    
    return (
        <button
            // Use pointerDown/TouchStart to manage drag state
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            // Use onClick for navigation, which fires only if there wasn't a significant drag
            onClick={handleFABClick}
            
            className={`
                fixed z-50
                group inline-flex items-center gap-3
                rounded-xl pl-5 pr-6 sm:pl-6 sm:pr-7 py-3 sm:py-3.5 min-h-[3rem] sm:min-h-[3.25rem]
                bg-[#E62B1E]/90 text-white text-sm sm:text-base font-semibold tracking-tight whitespace-nowrap
                shadow-[0_8px_20px_rgba(230,43,30,0.6)] ring-1 ring-white/20
                hover:bg-[#E62B1E] hover:shadow-[0_12px_25px_rgba(230,43,30,0.8)] 
                active:scale-[0.98] transition-all duration-200
                ${hideOnForm ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
                cursor-move
            `}
            aria-label="Recruitments open — Join us now"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%)`,
                // Remove the complex opacity/pointerEvents style from here, now handled by the class template literal
                transition: isDragging 
                    ? "none" 
                    : "opacity 300ms ease, transform 300ms ease, box-shadow 300ms ease", 
            }}
            disabled={hideOnForm}
        >
            <span className="flex flex-col items-start leading-none">
                <span className="text-[11px] sm:text-xs opacity-90">Recruitments Open</span>
                <span className="text-sm sm:text-base font-bold">Join us now</span>
            </span>
            <span className="ml-1.5 sm:ml-2 grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.4"
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </span>
        </button>
    );
}