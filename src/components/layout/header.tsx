"use client";
import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["HOME", "ABOUT", "SPEAKERS", "TEAM", "CONTACT"];

  return (
    <header className="absolute top-0 left-0 w-full z-40 flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 md:py-6">
      {/* Centered Logo */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        <span className="text-black">TED</span><span className="text-[#E62B1E]">x</span><span className="text-black">CITBengaluru</span>
      </h1>

      {/* Menu Button (top-right) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute right-4 sm:right-6 md:right-8 top-4 md:top-6 text-black hover:text-[#E62B1E] transition p-3 rounded-xl"
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
            className="absolute top-16 md:top-20 right-4 sm:right-6 md:right-8 bg-black text-white rounded-2xl p-6 sm:p-8 md:p-10 w-56 sm:w-64 shadow-xl border border-gray-800"
          >
            <ul className="flex flex-col gap-3 md:gap-6 text-center">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 md:py-3 text-sm md:text-base font-medium tracking-wide ${link === "HOME"
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