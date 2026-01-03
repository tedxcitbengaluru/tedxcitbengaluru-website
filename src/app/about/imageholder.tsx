'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageHolderProps {
  images?: string[];
  itemsPerView?: number;
  autoPlayInterval?: number;
}

export default function ImageHolder({ 
  images = [], 
  itemsPerView = 6,
  autoPlayInterval = 3000
}: ImageHolderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const maxIndex = Math.max(0, images.length - itemsPerView);
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0; // Loop back to start
      }
      return prev + 1;
    });
  };

  // Auto-play functionality
  useEffect(() => {
    if (images.length === 0 || maxIndex === 0) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, autoPlayInterval, images.length]);
  
  return (
<div className="relative w-full h-[30vh] md:h-[50vh] bg-[#4A4A4A] flex flex-col items-center justify-center mx-auto rounded-2xl z-10 overflow-hidden shadow-2xl">      {/* Large background image */}
      {images.length > 0 && (
        <div className="absolute inset-0 transition-opacity duration-500">
          <img 
            src={images[currentIndex + 2] || images[0]} 
            alt="Featured image"
            className="w-full h-full object-cover opacity-80"
          />
          
        </div>
      )}

      {/* Carousel container */}
      <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center gap-4 px-12 z-20">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous images"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        
        {/* Image boxes */}
        <div className="flex-1 overflow-hidden">
          <div 
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {images.length > 0 ? (
              images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-xl bg-[#2A2A2A] aspect-video overflow-hidden"
                  style={{ width: `calc((100% - ${(itemsPerView - 1) * 1}rem) / ${itemsPerView})` }}
                >
                  <img 
                    src={image} 
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              // Placeholder boxes when no images
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-xl bg-[#2A2A2A] aspect-video"
                  style={{ width: `calc((100% - ${(itemsPerView - 1) * 1}rem) / ${itemsPerView})` }}
                />
              ))
            )}
          </div>
        </div>
        
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next images"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}