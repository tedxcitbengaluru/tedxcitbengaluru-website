// "use client";
// import React from "react";

// export default function EventPreview() {
//   return (
//     <section className="w-full bg-[#0B0B0B] text-white py-20 md:py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center">
//       {/* Container */}
//       <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">

//         {/* LEFT: Event Image Placeholder */}
//         <div className="w-full md:w-1/2 flex justify-center">
//           <div className="w-[90%] md:w-[80%] aspect-video bg-[#2B2B2B] rounded-md flex items-center justify-center">
//             <span className="text-gray-400 text-sm tracking-wider">
//               Event Preview
//             </span>
//           </div>
//         </div>

//         {/* RIGHT: Event Details */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
//           {/* Heading */}
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-200 mb-2">
//             OUR <span className="text-[#E62B1E]">NEXT</span> EVENT
//           </h2>

//           {/* Underline */}
//           <div className="w-20 h-[3px] bg-[#E62B1E] mb-6"></div>

//           {/* Description */}
//           <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
//             repellat alias cupiditate error pariatur, iusto omnis corporis ullam
//             nesciunt cumque est magni vitae aperiam doloremque deleniti dolorem
//             saepe quod reprehenderit quasi debitis accusamus maxime consequuntur.
//           </p>

//           {/* Buttons */}
//           <div className="flex justify-center md:justify-start gap-4">
//             <button className="bg-[#E62B1E] hover:bg-[#b91c1c] text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-all duration-300">
//               Join Us
//             </button>
//             <button className="border border-gray-400 hover:border-white hover:bg-white hover:text-black font-semibold py-2.5 px-6 rounded-md text-sm transition-all duration-300">
//               Contact Us
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import React from "react";

export default function EventPreview() {
  return (
    <section className="relative w-full bg-[#212121] text-white py-24 md:py-28">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-10">
        {/* Left side - Preview box */}
        <div className="w-full md:w-[48%]">
          <div className="w-full aspect-video bg-[#424242] rounded-xl flex items-center justify-center border border-[#2a2a2a]">
            <span className="text-gray-400 text-sm">Event Preview</span>
          </div>
        </div>

        {/* Right side - Text + Buttons */}
        <div className="w-full md:w-[48%] flex flex-col">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <span className="text-[#BDBDBD]">OUR</span> <span className="text-[#E62B1E]">NEXT</span> <span className="text-[#BDBDBD]">EVENT</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#E62B1E] mb-6" />

          <p className="text-[#BDBDBD] text-base md:text-lg leading-relaxed mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            repellat alias cupiditate error pariatur, iusto omnis corporis ullam
            nesciunt cumque est magni vitae aperiam doloremque.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#E62B1E] hover:bg-[#b91c1c] text-white font-semibold px-7 py-3 rounded-lg transition">
              Join Us
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-black text-white font-semibold px-7 py-3 rounded-lg transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
