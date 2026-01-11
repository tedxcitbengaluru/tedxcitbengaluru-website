'use client';
import React, { useEffect, useRef } from 'react'
import Hero from './hero'
import Contact from './contact'
// import { Contact } from 'lucide-react'

const page = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contactRef.current) {
      const targetPosition = contactRef.current.getBoundingClientRect().top + window.scrollY;
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
      <div ref={contactRef}>
        <Contact />
      </div>
    </div>
  )
}

export default page
