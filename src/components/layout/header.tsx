"use client";
import React, { useState, useEffect } from "react";
import { X, Menu, User } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// --- Custom Easing Curve (Strictly typed for Framer Motion) ---
const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// --- Framer Motion Variants ---
const redWipeVariants: Variants = {
  hidden: { x: "100%" },
  visible: { 
    x: "0%", 
    transition: { duration: 0.85, ease: premiumEase } 
  },
  exit: { 
    x: "100%", 
    transition: { duration: 0.85, ease: premiumEase, delay: 0.1 } 
  }
};

const menuVariants: Variants = {
  hidden: { x: "100%" },
  visible: { 
    x: "0%", 
    transition: { duration: 0.85, ease: premiumEase, delay: 0.08 } 
  },
  exit: { 
    x: "100%", 
    transition: { duration: 0.85, ease: premiumEase } 
  }
};

const linkContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 }
  }
};

const linkItemVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { 
    y: "0%", 
    opacity: 1, 
    transition: { duration: 0.8, ease: premiumEase } 
  },
  exit: { 
    y: "50%", 
    opacity: 0,
    transition: { duration: 0.4, ease: premiumEase } 
  }
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const links = ["HOME", "ABOUT", "EVENTS", "SPEAKERS & PERFORMERS", "SPONSORS", "CONTACT"];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [menuOpen]);

  const getHref = (link: string) => {
    if (link === "HOME") return "/";
    if (link === "SPEAKERS & PERFORMERS") return "/speakers";
    return `/${link.toLowerCase()}`;
  };

  return (
    <header className="absolute top-0 left-0 w-full z-40 px-4 sm:px-6 md:px-8 py-4 md:py-6 h-24">
      
      {/* ------------------------------- */}
      {/* LEFT: SOCIAL SIDEBAR            */}
      {/* ------------------------------- */}
      <div className="absolute top-4 md:top-6 left-4 sm:left-6 md:left-8 z-50">
        {!socialOpen && (
          <button
            onClick={() => setSocialOpen(true)}
            className="bg-black/80 backdrop-blur text-white p-3 md:p-4 rounded-full hover:text-[#E62B1E] hover:bg-gray-900 transition-all duration-300 shadow-lg border border-gray-800"
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
              transition={{ duration: 0.3, ease: premiumEase }}
              className="bg-black/90 backdrop-blur text-white rounded-2xl p-5 md:p-6 w-16 md:w-20 flex flex-col items-center gap-6 shadow-2xl border border-gray-800 will-change-transform"
            >
              <button
                onClick={() => setSocialOpen(false)}
                className="text-gray-400 hover:text-[#E62B1E] transition-colors duration-200 p-1 hover:bg-gray-800 rounded-lg"
              >
                <X size={20} />
              </button>
              <div className="w-6 h-px bg-gray-700"></div>
              <nav className="flex flex-col items-center gap-5">
                <a href="https://www.instagram.com/tedxcitbengaluru/" className="text-gray-400 hover:text-[#E62B1E] hover:scale-110 transition-transform duration-200 will-change-transform"><FaInstagram size={22} /></a>
                <a href="https://www.linkedin.com/company/tedxcitbengaluru/" className="text-gray-400 hover:text-[#E62B1E] hover:scale-110 transition-transform duration-200 will-change-transform"><FaLinkedinIn size={22} /></a>
                <a href="https://www.youtube.com/@TEDxCITBengaluru/playlists" className="text-gray-400 hover:text-[#E62B1E] hover:scale-110 transition-transform duration-200 will-change-transform"><FaYoutube size={22} /></a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ------------------------------- */}
      {/* CENTER: LOGO                    */}
      {/* ------------------------------- */}
      <div className="absolute top-4 md:top-4 left-1/2 -translate-x-1/2 z-40 hover:cursor-pointer transition-transform hover:scale-105 duration-300 will-change-transform">
        <img 
          src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760616545/TEDxCITBengaluruWomenblack_300x_2_t42vvk.png" 
          alt="TEDxCITBengaluru Logo" 
          className="h-8 sm:h-10 md:h-12 drop-shadow-lg" 
          onClick={() => router.push('/')} 
        />
      </div>

      {/* ------------------------------- */}
      {/* RIGHT: HAMBURGER TRIGGER        */}
      {/* ------------------------------- */}
      <div className="absolute top-4 md:top-6 right-4 sm:right-6 md:right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(true)}
          className="text-white hover:text-[#E62B1E] p-2 rounded-xl transition-colors duration-200 drop-shadow-md will-change-transform"
          aria-label="Open Menu"
        >
          <Menu size={32} />
        </motion.button>
      </div>

      {/* ------------------------------- */}
      {/* FULL HEIGHT MENU OVERLAY        */}
      {/* ------------------------------- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.4 } }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              style={{ willChange: "opacity" }}
            />

            {/* Red Trailing Wipe */}
            <motion.div
              variants={redWipeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 w-full md:w-1/2 h-screen bg-[#E62B1E] z-[61] shadow-2xl transform-gpu will-change-transform"
            />

            {/* Main Dark Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 w-full md:w-1/2 h-screen bg-[#0A0A0A] z-[62] flex flex-col justify-center px-12 sm:px-20 border-l border-white/5 shadow-2xl transform-gpu will-change-transform"
            >
              
              {/* Close Button Inside Menu */}
              <div className="absolute top-8 right-8 md:top-10 md:right-12">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-colors duration-300 backdrop-blur-md border border-white/10 will-change-transform"
                >
                  <X size={28} />
                </motion.button>
              </div>

              {/* Staggered Navigation Links */}
              <motion.nav 
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-6 md:gap-8"
              >
                {links.map((link) => {
                  const href = getHref(link);
                  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

                  return (
                    <div key={link} className="overflow-hidden py-1">
                      <motion.div variants={linkItemVariants} className="will-change-transform">
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className={`
                            block text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase transition-colors duration-300
                            ${isActive ? "text-[#E62B1E]" : "text-white hover:text-[#E62B1E]"}
                          `}
                        >
                          {link}
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}

                {/* --- SECURE YOUR SEAT BUTTON (Right Below Contact) --- */}
                <div className="overflow-hidden py-2 mt-4 md:mt-8">
                  <motion.div variants={linkItemVariants} className="will-change-transform">
                    <Link
                      href="/tickets"
                      onClick={() => setMenuOpen(false)}
                      className="
                        group relative inline-flex items-center justify-center gap-4
                        px-8 py-4 md:px-10 md:py-5 w-fit
                        bg-white text-black
                        font-bold uppercase tracking-[0.3em] text-xs md:text-sm
                        transition-all duration-500 ease-out
                        hover:bg-[#E62B1E] hover:text-white
                        hover:shadow-[0_0_40px_rgba(230,43,30,0.5)]
                      "
                    >
                      <span className="relative whitespace-nowrap">Secure Your Seat</span>
                      <svg
                        className="relative w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.nav>

              {/* Bottom Footer Info in Menu */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6, ease: premiumEase } }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
                className="absolute bottom-10 left-12 sm:left-20 text-gray-500 text-sm font-medium tracking-wide will-change-transform"
              >
                © 2026 TEDxCITBengaluru
              </motion.div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}