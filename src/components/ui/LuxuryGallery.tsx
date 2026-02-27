"use client";
import Image from "next/image";

interface LuxuryGalleryProps {
  images: string[];
}

export default function LuxuryGallery({ images }: LuxuryGalleryProps) {
  // Define unique content for each of the 6 slots
  const themes = [
    { title: "IRIDESCENCE", subtitle: "EVENT" },
    { title: "THRIVE", subtitle: "EVENT" },
    { title: "ELIXIR", subtitle: "EVENT" },
    { title: "ZENITH", subtitle: "EVENT" },
    { title: "AETHER", subtitle: "EVENT" },
    { title: "EPOCH", subtitle: "EVENT" },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
      {images.slice(0, 6).map((src, index) => {
        const isFeatured = index === 0;
        const theme = themes[index] || { title: "Gallery", subtitle: "Exhibit" };
        
        return (
          <div
            key={index}
            className={`
              group relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/5
              ${isFeatured ? 'md:col-span-2 md:row-span-2 h-[400px] md:h-full' : 'h-[300px]'}
            `}
          >
            {/* 1. The Image - Starts B&W, goes Color on hover */}
            <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={src}
                alt={theme.title}
                fill
                className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
              />
            </div>

            {/* 2. The "Obsidian" Glass Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />

            {/* 3. The "Royal" Border Glow */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-[#EB0028]/50 transition-all duration-500 rounded-xl z-20 pointer-events-none" />
            
            {/* 4. Text Content - Slides up with dignity */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="text-[#EB0028] text-xs font-bold tracking-[0.2em] uppercase mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {theme.subtitle} — 0{index + 1}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-medium tracking-tight">
                    {theme.title}
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