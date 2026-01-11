'use client';
import React, { useEffect, useRef } from 'react'
import Header from '../../components/layout/header'
import Hero from './hero'
import AboutUs from './aboutus'
import Mission from './mission'
import Team from './team'
import Footer from './footer'

const page = () => {
  const aboutUsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutUsRef.current) {
      const targetPosition = aboutUsRef.current.getBoundingClientRect().top + window.scrollY;
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
      <div ref={aboutUsRef}>
        <AboutUs />
      </div>
      <Mission />
      <Team />
      <Footer />
    </div>
  )
}

export default page
