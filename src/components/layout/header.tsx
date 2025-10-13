"use client";
import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["HOME", "ABOUT", "SPEAKERS", "TEAM", "CONTACT"];

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-center py-6">
      {/* Centered Logo */}
      <h1 className="text-4xl font-bold text-[#E62B1E]">
        TED<span className="text-black">x</span>CITBengaluru
      </h1>

      {/* Menu Button (top-right) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute right-8 top-7 text-black hover:text-[#E62B1E] transition"
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
            className="absolute top-20 right-6 bg-black text-white rounded-2xl p-6 w-48 shadow-xl"
          >
            <ul className="flex flex-col gap-4 text-right">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`text-sm font-medium tracking-wide ${link === "HOME"
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
