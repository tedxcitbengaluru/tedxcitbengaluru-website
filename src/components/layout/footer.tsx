// "use client";
// import React from "react";

// export default function FooterSection() {
//   return (
//     <footer className="relative w-full text-white overflow-hidden">
//       {/* Background gradient + wave */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#b30000] to-[#8b0000]" />
//       <svg
//         className="absolute top-0 left-0 w-full h-40 md:h-52"
//         viewBox="0 0 1440 320"
//         preserveAspectRatio="none"
//       >
//         <path
//           fill="#111111"
//           d="M0,160 C480,260 960,60 1440,160 L1440,0 L0,0 Z"
//         ></path>
//         <path
//           fill="none"
//           stroke="#111111"
//           strokeWidth="8"
//           d="M0,180 C480,280 960,80 1440,180"
//         ></path>
//         <path
//           fill="none"
//           stroke="#111111"
//           strokeWidth="8"
//           d="M0,200 C480,300 960,100 1440,200"
//         ></path>
//         <path
//           fill="none"
//           stroke="#111111"
//           strokeWidth="8"
//           d="M0,220 C480,320 960,120 1440,220"
//         ></path>
//       </svg>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 md:py-32 px-6">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black max-w-3xl">
//           Be a part of our upcoming event at{" "}
//           <span className="text-[#111111] font-extrabold">TEDxCITBengaluru</span>
//         </h2>

//         <button className="mt-8 bg-[#111111] text-white text-lg font-semibold py-3 px-8 rounded-xl hover:bg-[#333333] transition-all duration-300">
//           Register Now!
//         </button>
//       </div>

//       {/* Footer Bottom */}
//       <div className="relative z-10 bg-[#111111] text-gray-300 text-sm text-center py-3">
//         Copyright ©2023 <span className="text-white font-semibold">TEDxCITBengaluru</span> — 
//         This independent TEDx event is operated under license from TED
//       </div>
//     </footer>
//   );
// }


"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-[#212121] text-white overflow-hidden">
      {/* Wave background */}
      <div className="relative w-full">
        <svg
          className="w-full h-[220px] md:h-[280px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="footerGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#E62B1E" />
              <stop offset="100%" stopColor="#A01212" />
            </linearGradient>
          </defs>
          <path
            fill="url(#footerGradient)"
            d="M0,160 C480,260 960,60 1440,160 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* CTA (Call to Action) Section */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 pointer-events-none">
        <div className="pointer-events-auto max-w-7xl mx-auto w-full">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-snug text-left">
            Be a part of our upcoming event at{" "}
            <span className="block md:inline text-white font-extrabold">
              TEDxCITBengaluru
            </span>
          </h3>

          <button className="bg-[#424242] hover:bg-[#555555] text-white font-semibold px-8 py-3 rounded-xl transition">
            Register Now!
          </button>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="relative z-10 bg-[#212121] border-t border-[#1c1c1c] py-5 text-center text-sm text-[#BDBDBD]">
        Copyright 2023©TEDxCITBengaluru This independent TEDx event is operated under license from TED
      </div>
    </footer>
  );
}

