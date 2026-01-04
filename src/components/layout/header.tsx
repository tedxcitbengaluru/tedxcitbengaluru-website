"use client";
import React, { useState } from "react";
import { X, Menu, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";  
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const links = ["ABOUT","EVENTS", "SPEAKERS & PERFORMERS", "SPONSORS", "CONTACT"];

  const getHref = (link: string) => {
    if (link === "HOME") return "/";
    if (link === "SPEAKERS & PERFORMERS") return "/speakers";
    return `/${link.toLowerCase()}`;
  };


  return (
    <header className="absolute top-0 left-0 w-full z-40 px-4 sm:px-6 md:px-8 py-4 md:py-6 h-24">
      
      {/* ------------------------------- */}
      {/* LEFT: SOCIAL SIDEBAR SECTION    */}
      {/* ------------------------------- */}
      <div className="absolute top-4 md:top-6 left-4 sm:left-6 md:left-8 z-50">
        {!socialOpen && (
          <button
            onClick={() => setSocialOpen(true)}
            className="bg-black/80 backdrop-blur text-white p-3 md:p-4 rounded-full hover:text-red-600 hover:bg-gray-900 transition-all duration-300 shadow-lg border border-gray-800 hover:border-red-600"
            aria-label="Open social sidebar"
          >
            <User size={24} />
          </button>
        )}

        <AnimatePresence>
          {socialOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-black/90 backdrop-blur text-white rounded-2xl p-5 md:p-6 w-16 md:w-20 flex flex-col items-center gap-6 shadow-2xl border border-gray-800"
            >
              <button
                onClick={() => setSocialOpen(false)}
                className="text-gray-400 hover:text-red-600 transition-colors duration-200 p-1 hover:bg-gray-800 rounded-lg"
              >
                <X size={20} />
              </button>
              <div className="w-6 h-px bg-gray-700"></div>
              <nav className="flex flex-col items-center gap-5">
                <a href="https://www.instagram.com/tedxcitbengaluru/" className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200"><FaInstagram size={22} /></a>
                <a href="https://www.linkedin.com/company/tedxcitbengaluru/" className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200"><FaLinkedinIn size={22} /></a>
                <a href="https://youtube.com/@tedxcitbengaluru?si=-nGEuzBrCFst98i6" className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200"><FaYoutube size={22} /></a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* ------------------------------- */}
      {/* CENTER: LOGO                    */}
      {/* ------------------------------- */}
      <div className="absolute top-4 md:top-4 left-1/2 -translate-x-1/2 z-40 hover:cursor-pointer">
        <img 
          src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1766846025/1c4a732edd17da65e8739683d472d6fa5ed0162c_plrnph.png" 
          alt="TEDxCITBengaluru Logo" 
          className="h-8 sm:h-10 md:h-12" onClick={() => router.push('/')} 
        />
      </div>


      {/* ------------------------------- */}
      {/* RIGHT: NAVIGATION MENU          */}
      {/* ------------------------------- */}
      <div className="absolute top-4 md:top-6 right-4 sm:right-6 md:right-8 z-50">
        
        {/* HAMBURGER BUTTON (Only visible when menu is CLOSED) */}
        {!menuOpen && (
          <button
            onClick={() => setMenuOpen(true)}
            className="text-black hover:text-[#E62B1E] transition p-2 rounded-xl"
          >
            <Menu size={32} />
          </button>
        )}

        {/* MENU DROPDOWN CARD */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 right-0 bg-[#121212] text-white rounded-2xl p-4 w-74 shadow-2xl border border-white/10 flex flex-col"
            >
              
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:text-[#E62B1E] transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Links */}
              <ul className="flex flex-col gap-5 text-right">
                {links.map((link) => {
                  const href = getHref(link);
                  const isActive =
                    pathname === href ||
                    (href !== "/" && pathname.startsWith(href));

                  return (
                    <li key={link}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`
                          block text-lg font-bold tracking-wider transition-colors duration-200
                          ${
                            isActive
                              ? "text-[#E62B1E] underline underline-offset-4"
                              : "text-white hover:text-[#E62B1E]"
                          }
                        `}
                      >
                        {link}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </header>
  );
}