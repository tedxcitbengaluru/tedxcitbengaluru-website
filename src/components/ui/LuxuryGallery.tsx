"use client";
import Image from "next/image";

interface LuxuryGalleryProps {
  images: string[];
}

export default function LuxuryGallery({ images }: LuxuryGalleryProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
      {images.map((src, index) => {
        // Create a bento effect: First item spans 2 columns/rows on desktop
        const isFeatured = index === 0;
        
        return (
          <div
            key={index}
            className={`
              group relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/5
              ${isFeatured ? 'md:col-span-2 md:row-span-2 h-[300px] md:h-full' : 'h-[300px]'}
            `}
          >
            {/* 1. The Image - Starts B&W, goes Color on hover */}
            <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={src}
                alt={`Gallery ${index}`}
                fill
                className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
              />
            </div>

            {/* 2. The "Obsidian" Glass Overlay */}
            {/* Darkens the image slightly to make text pop, fades on hover for clarity */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />

            {/* 3. The "Royal" Border Glow */}
            {/* A subtle red line that traces the box on hover */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-[#EB0028]/50 transition-all duration-500 rounded-xl z-20 pointer-events-none" />
            
            {/* 4. Text Content - Slides up with dignity */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="text-[#EB0028] text-xs font-bold tracking-[0.2em] uppercase mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Exhibit 0{index + 1}
                </span>
                <h3 className="text-white text-xl font-medium tracking-tight">
                    {isFeatured ? "The Main Event" : "Moments in Time"}
                </h3>
            </div>

            {/* 5. The "Shine" Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent" />
          </div>
        );
      })}
    </div>
  );
}