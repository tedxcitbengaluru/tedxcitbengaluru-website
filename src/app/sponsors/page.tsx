"use client";
import React, { useEffect, useRef } from "react";
import Hero from "./hero";
import Content from "./content";

const page = () => {
 const contentRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
     if (contentRef.current) {
       const targetPosition = contentRef.current.getBoundingClientRect().top + window.scrollY;
       const startPosition = window.scrollY;
       const distance = targetPosition - startPosition;
       const duration = 100;
       let start: number | null = null;
 
       const animation = (currentTime: number) => {
         if (start === null) start = currentTime;
         const timeElapsed = currentTime - start;
         const progress = Math.min(timeElapsed / duration, 1);
         
         // Easing function for smoother animation
         const ease = progress * (2 - progress);
         
         window.scrollTo(0, startPosition + distance * ease);
         
         if (timeElapsed < duration) {
           requestAnimationFrame(animation);
         }
       };
 
       requestAnimationFrame(animation);
     }
   }, []);

 return (
   <div>
     <Hero />
     <div ref={contentRef}>
       <Content />
     </div>
   </div>
 );
}
export default page;