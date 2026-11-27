"use client"
import { useRouter } from "next/navigation"

export default function Footer() {
  const router = useRouter()

  const features = [
    {
      id: 1,
      title: "Performances",
      text: "Watch mesmerizing performances by our Entertainers that leave you spellbound.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Experience",
      text: "An immersive experience tailored for you to learn, grow, and connect.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Certificate",
      text: "A distinctive Certificate of Participation for you to be proud of.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Ideas",
      text: "And of course, ground-breaking Ideas for you to reflect on.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Memorabilia",
      text: "Exclusive TEDx memorabilia and merchandise for you to cherish.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    },
  ];

  return (
    <footer className="relative w-full bg-[#1F1F1F] text-white overflow-hidden font-sans">
      {/* Top accent line */}
      <div className="w-full h-[2px]" style={{ background: '#EB0028' }} />

      {/* Main Content Section */}
      <section className="section z-10 relative pt-18 pb-1 md:pb-44 lg:pb-56">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#9D9D9D] mb-12 text-center tracking-tight">
              WHAT <span className="text-[#EB0028]">YOU</span> GET FROM US ?
            </h2>

            {/* THE AWESOME GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
              {features.map((item) => (
                <div key={item.id} className="key-point">
                  {item.icon}
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <div className="py-8 relative z-10">
        <div className="container mx-auto px-6">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-white">TEDxCITBengaluru</span>.
            This independent TEDx event is operated under license from TED.
          </p>
        </div>
      </div>

      {/* BIG BACKGROUND WATERMARK */}
      <div 
        className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center items-end"
        style={{ height: '40%' }}
      >
        <h1 
          className="
            font-black 
            text-white 
            opacity-[0.07] /* Changed from 0.03 to 0.07 for better visibility */
            whitespace-nowrap 
            leading-none 
            tracking-tighter
            text-[15vw] sm:text-[15vw] md:text-[18vw] lg:text-[16vw]
            translate-y-[15%]
          "
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
          }}
        >
          TEDxCITBLR
        </h1>
      </div>

    </footer>
  )
}