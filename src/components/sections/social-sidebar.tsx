"use client";
import React, { useState } from "react";
import { X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function SocialSidebar() {
  const [open, setOpen] = useState(false);

  return (
    // Sidebar positioned at the top-left corner, aligned with header
    <div className="fixed top-6 left-6 z-50">
      {/* --- User Icon (visible when closed) --- */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white p-4 md:p-5 rounded-2xl hover:text-[#E62B1E] transition-all shadow-xl"
          aria-label="Open social sidebar"
        >
          <User size={24} />
        </button>
      )}

      {/* --- Sidebar (visible when open) --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-black text-white rounded-2xl p-5 md:p-6 w-16 md:w-20 flex flex-col items-center gap-6 md:gap-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white transition"
              aria-label="Close social sidebar"
            >
              <X size={20} />
            </button>

            {/* Social Links */}
            <nav className="flex flex-col items-center gap-6 md:gap-8">
              <a
                href="#"
                className="hover:text-[#E62B1E] transition"
                aria-label="Instagram"
              >
                <FaInstagram size={22} className="md:size-24" />
              </a>
              <a
                href="#"
                className="hover:text-[#E62B1E] transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={22} className="md:size-24" />
              </a>
              <a
                href="#"
                className="hover:text-[#E62B1E] transition"
                aria-label="YouTube"
              >
                <FaYoutube size={22} className="md:size-24" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
