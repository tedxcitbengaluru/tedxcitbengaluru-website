"use client";
import React, { useState } from "react";
import { X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function SocialSidebar() {
  const [open, setOpen] = useState(false);

  return (
    // /* ABSOLUTE inside hero: aligned with navbar */
    <div className="absolute top-4 md:top-6 left-4 sm:left-6 md:left-8 z-40">
      {/* USER ICON BUTTON - Shows when sidebar is closed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-black/80 backdrop-blur text-white p-4 md:p-5 rounded-full hover:text-red-600 hover:bg-gray-900 transition-all duration-300 shadow-lg border border-gray-800 hover:border-red-600"
          aria-label="Open social sidebar"
        >
          <User size={28} />
        </button>
      )}

      {/* SIDEBAR CONTAINER - Opens with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-black/90 backdrop-blur text-white rounded-2xl p-6 md:p-7 w-20 md:w-24 flex flex-col items-center gap-7 md:gap-8 shadow-2xl border border-gray-800"
          >
            {/* CLOSE BUTTON - X icon with proper spacing from top */}
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-red-600 transition-colors duration-200 p-2 hover:bg-gray-900 rounded-lg mt-2"
              aria-label="Close social sidebar"
            >
              <X size={22} />
            </button>

            {/* DIVIDER LINE - Visual separator */}
            <div className="w-8 h-px bg-gray-700 my-2"></div>

            {/* SOCIAL LINKS CONTAINER - Navigation with proper spacing */}
            <nav className="flex flex-col items-center gap-5 md:gap-6">
              {/* INSTAGRAM LINK */}
              <a
                href="#instagram"
                className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200 p-2 hover:bg-gray-900 rounded-lg"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>

              {/* LINKEDIN LINK */}
              <a
                href="#linkedin"
                className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200 p-2 hover:bg-gray-900 rounded-lg"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={24} />
              </a>

              {/* YOUTUBE LINK */}
              <a
                href="#youtube"
                className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200 p-2 hover:bg-gray-900 rounded-lg"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
            </nav>

            {/* DIVIDER LINE - Visual separator */}
            <div className="w-8 h-px bg-gray-700 my-2"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}