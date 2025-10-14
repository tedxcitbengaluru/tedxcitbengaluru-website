"use client";
import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["HOME", "ABOUT", "SPEAKERS", "TEAM", "CONTACT"];

  return (
    // make header height explicit so overlay/offset calculations are predictable
  <header className="fixed top-0 left-0 w-full z-40 flex items-center justify-center px-4 sm:px-6 md:px-8 h-16 md:h-20 glass">
      {/* Centered Logo */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        <span className="text-white">TED</span>
        <span className="text-[#E62B1E]">x</span>
        <span className="text-white">CITBengaluru</span>
      </h1>

      {/* Menu Button (top-right) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute right-4 sm:right-6 md:right-8 top-4 md:top-6 text-white hover:text-[#E62B1E] transition p-3 rounded-xl glass-strong"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
              id="site-menu"
              className="absolute top-16 md:top-20 right-4 sm:right-6 md:right-8 bg-black/40 text-white rounded-2xl p-4 sm:p-6 md:p-8 w-56 sm:w-64 shadow-xl border border-white/10 glass-strong"
          >
            <ul className="flex flex-col gap-3 md:gap-6 text-center">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 md:py-3 text-sm md:text-base font-medium tracking-wide ${
                      link === "HOME"
                        ? "text-[#E62B1E]"
                        : "text-white hover:text-[#E62B1E]"
                    } transition`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
